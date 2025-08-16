import { spawn } from 'node:child_process';
import path from 'node:path';

import { recordArtifact, updateJobStatus, createJob } from './store';

export async function runJob(job) {
  updateJobStatus(job.id, 'running');

  // Map action → command(s)
  const commands = {
    'scaffold-component': ['pnpm', ['workspace', 'ui-components', 'gen', job.payload.name]],
    'add-route': ['pnpm', ['workspace', 'web-app', 'gen-route', job.payload.route]],
  };

  const [cmd, args] = commands[job.action] || [];
  if (!cmd) throw new Error(`Unknown action: ${job.action}`);

  const child = spawn(cmd, args, { cwd: path.resolve(process.cwd()) });

  let output = '';
  child.stdout.on('data', (chunk) => (output += chunk));
  child.stderr.on('data', (chunk) => (output += chunk));

  child.on('close', (code) => {
    recordArtifact(job.id, {
      type: 'log',
      content: output,
      exitCode: code,
    });
    updateJobStatus(job.id, code === 0 ? 'completed' : 'failed');
  });
}

export function queueJob(action, payload) {
  const id = `${action}-${Date.now()}`;
  const job = { id, action, payload, status: 'pending', artifacts: [] };
  createJob(job);
  runJob(job);
  return id;
}
