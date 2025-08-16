import { execSync } from 'child_process';
import { readFileSync, rmSync, existsSync } from 'fs';
import { join } from 'path';

const rootDir = process.cwd();

const log = (message) => console.log(`[Clean Build] ${message}`);
const error = (message) => console.error(`[Clean Build Error] ${message}`);

const runCommand = (command, cwd = rootDir) => {
  log(`Executing: ${command} in ${cwd}`);
  try {
    execSync(command, { stdio: 'inherit', cwd });
  } catch (e) {
    error(`Command failed: ${command}\n${e.message}`);
    process.exit(1);
  }
};

const deletePath = (path) => {
  const fullPath = join(rootDir, path);
  if (existsSync(fullPath)) {
    log(`Deleting: ${fullPath}`);
    rmSync(fullPath, { recursive: true, force: true });
  } else {
    log(`Skipping: ${fullPath} (does not exist)`);
  }
};

async function cleanBuild() {
  log('Starting clean build process...');

  // 1. Node.js Version Check
  log('Checking Node.js version...');
  try {
    const rootPackageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
    const packageManager = rootPackageJson.packageManager; // e.g., "pnpm@8.6.12"
    if (packageManager) {
      const expectedNodeVersionMatch = packageManager.match(/pnpm@(\d+\.\d+\.\d+)/);
      // This is a simplified check. A more robust check would parse pnpm's version
      // and then check the Node.js version required by that pnpm version.
      // For now, we'll just log the pnpm version.
      log(`Project uses packageManager: ${packageManager}`);
    }
    log(`Current Node.js version: ${process.version}`);
  } catch (e) {
    error(`Could not read root package.json for version check: ${e.message}`);
    process.exit(1);
  }

  // 2. Clean environment
  log('Cleaning build artifacts and node_modules...');
  const pathsToClean = [
    'node_modules',
    'dist',
    '.next',
    '.turbo',
    'test-results',
    '.studio', // Our generated registry
  ];

  for (const path of pathsToClean) {
    deletePath(path);
  }
  
  // Use pnpm's own clean commands for better monorepo cleaning
  runCommand('pnpm recursive clean'); // Cleans node_modules in all packages
  runCommand('pnpm store prune'); // Cleans pnpm content-addressable store

  // 3. Reinstall dependencies
  log('Reinstalling dependencies...');
  runCommand('pnpm install');

  // 4. Full build
  log('Running full monorepo build...');
  runCommand('pnpm -r --if-present build');

  log('Clean build process completed successfully.');
}

cleanBuild();
