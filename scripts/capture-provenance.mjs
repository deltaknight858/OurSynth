import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import os from 'os';

const rootDir = process.cwd();
const provenanceDir = join(rootDir, '.oursynth', 'provenance');

const log = (message) => console.log(`[Provenance Capture] ${message}`);
const error = (message) => console.error(`[Provenance Capture Error] ${message}`);

const runCommand = (command) => {
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'pipe' }).trim();
  } catch (e) {
    error(`Command failed: ${command}\n${e.message}`);
    return null;
  }
};

async function captureProvenance() {
  log('Starting provenance capture...');

  // Ensure provenance directory exists
  if (!existsSync(provenanceDir)) {
    mkdirSync(provenanceDir, { recursive: true });
    log(`Created provenance directory: ${provenanceDir}`);
  }

  // 1. Get Git commit hash
  const commitHash = runCommand('git rev-parse HEAD');
  if (!commitHash) {
    error('Could not get Git commit hash. Is this a Git repository?');
    process.exit(1);
  }
  log(`Git Commit Hash: ${commitHash}`);

  // 2. Get Node.js version
  const nodeVersion = process.version;
  log(`Node.js Version: ${nodeVersion}`);

  // 3. Get pnpm version
  const pnpmVersion = runCommand('pnpm -v');
  if (!pnpmVersion) {
    error('Could not get pnpm version. Is pnpm installed?');
    process.exit(1);
  }
  log(`pnpm Version: ${pnpmVersion}`);

  // 4. Get OS details
  const osPlatform = os.platform();
  const osArch = os.arch();
  log(`OS: ${osPlatform} (${osArch})`);

  // 5. Get timestamp
  const timestamp = new Date().toISOString();
  log(`Timestamp: ${timestamp}`);

  // Construct provenance data
  const provenanceData = {
    commitHash,
    nodeVersion,
    pnpmVersion,
    osPlatform,
    osArch,
    timestamp,
    // Add more fields here as needed, e.g., input/output hashes
  };

  // Write provenance data to file
  const filename = `${commitHash.substring(0, 7)}_${new Date().getTime()}.json`;
  const filePath = join(provenanceDir, filename);
  writeFileSync(filePath, JSON.stringify(provenanceData, null, 2), 'utf8');
  log(`Provenance data saved to: ${filePath}`);

  log('Provenance capture completed successfully.');
}

captureProvenance();
