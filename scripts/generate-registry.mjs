
import { exec } from 'child_process';
import { writeFile, existsSync, mkdirSync } from 'fs';
import { join, sep } from 'path';

// Function to parse port from a script string
const parsePort = (script) => {
  if (!script) return null;
  const portMatch = script.match(/-p\s+(\d+)|--port\s+(\d+)/);
  return portMatch ? parseInt(portMatch[1] || portMatch[2], 10) : null;
};

// Execute the pnpm ls command
exec('pnpm m ls --json --depth -1', { cwd: process.cwd() }, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error.message}`);
    process.exit(1);
  }
  if (stderr) {
    // pnpm sometimes outputs warnings to stderr, so we'll log it but not exit
    console.warn(`pnpm stderr: ${stderr}`);
  }

  try {
    // pnpm might return multiple JSON objects or other text, find the valid JSON array
    const jsonOutput = stdout.substring(stdout.indexOf('['));
    const packages = JSON.parse(jsonOutput);
    
    const registry = packages
      .filter(pkg => pkg.path && (pkg.path.startsWith(`apps${sep}`) || pkg.path.startsWith(`infra${sep}`)))
      .map(pkg => {
          const scripts = pkg.scripts || {};
          return {
            name: pkg.name,
            path: pkg.path,
            scripts: scripts,
            port: parsePort(scripts.dev),
            health_check_command: scripts.health_check || null,
          }
      });

    const studioDir = join(process.cwd(), '.studio');
    if (!existsSync(studioDir)) {
      mkdirSync(studioDir, { recursive: true });
    }

    const registryPath = join(studioDir, 'registry.json');
    writeFile(registryPath, JSON.stringify(registry, null, 2), (err) => {
      if (err) {
        console.error('Error writing registry file:', err);
        process.exit(1);
      } else {
        console.log(`Service registry generated successfully at ${registryPath}`);
      }
    });
  } catch (parseError) {
    console.error('Error parsing pnpm output:', parseError);
    console.error('Received stdout:', stdout);
    process.exit(1);
  }
});
