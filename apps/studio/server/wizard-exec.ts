// Minimal in-memory job runner for Wizard API
import { randomUUID } from 'crypto';

interface WizardInvocation {
  invocationId: string;
  actionId: string;
  inputs: any;
  status: 'pending' | 'succeeded' | 'failed';
  logs: string[];
  artifacts: { artifactId: string }[];
}

const invocations = new Map<string, WizardInvocation>();
const artifacts = new Map<string, any>();

export async function queueInvocation(actionId: string, inputs: any): Promise<string> {
  const invocationId = randomUUID();
  const invocation: WizardInvocation = {
    invocationId,
    actionId,
    inputs,
    status: 'pending',
    logs: ['Invocation queued.'],
    artifacts: [],
  };
  invocations.set(invocationId, invocation);
  // Simulate work (replace with real logic)
  setTimeout(() => {
    invocation.status = 'succeeded';
    invocation.logs.push('Invocation succeeded.');
    // Example artifact
    const artifactId = randomUUID();
    const artifact = {
      artifactId,
      kind: 'diff',
      text: '--- a\n+++ b\n',
      origin: { serviceId: 'studio', actionId, invocationId },
      inputsHash: '',
      contentHash: '',
      createdAt: new Date().toISOString(),
    };
    artifacts.set(artifactId, artifact);
    invocation.artifacts.push({ artifactId });
  }, 1000);
  return invocationId;
}

export function getInvocation(invocationId: string) {
  return invocations.get(invocationId) || null;
}

export function getArtifact(artifactId: string) {
  return artifacts.get(artifactId) || null;
}
