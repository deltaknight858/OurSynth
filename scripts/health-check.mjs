
import { exec } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

const registryPath = join(process.cwd(), '.studio', 'registry.json');

if (!readFileSync(registryPath)) {
  console.error('Error: .studio/registry.json not found.');
  console.log('Please run "pnpm registry:generate" first.');
  process.exit(1);
}

const registry = JSON.parse(readFileSync(registryPath, 'utf-8'));
const healthChecks = registry
  .filter(service => service.health_check_command)
  .map(service => {
    return new Promise((resolve, reject) => {
      console.log(`Running health check for ${service.name}...`);
      exec(service.health_check_command, { cwd: join(process.cwd(), service.path) }, (error, stdout, stderr) => {
        if (error) {
          console.error(`Health check for ${service.name} FAILED:`);
          console.error(stderr || stdout);
          reject({ name: service.name, status: 'FAIL' });
        } else {
          console.log(`Health check for ${service.name} PASSED.`);
          resolve({ name: service.name, status: 'PASS' });
        }
      });
    });
  });

Promise.allSettled(healthChecks)
  .then(results => {
    const failedChecks = results.filter(result => result.status === 'rejected' || result.value?.status === 'FAIL');
    if (failedChecks.length > 0) {
      console.error(`
${failedChecks.length} health check(s) failed.`);
      process.exit(1);
    } else {
      console.log('\nAll health checks passed successfully!');
      process.exit(0);
    }
  });

