// Minimal persistent job/artifact store (in-memory for now, can be swapped for file/db)

export type JobId = string;
export type ArtifactId = string;
export type JobStatus = 'pending' | 'running' | 'succeeded' | 'failed';

/**
 * Represents a generic artifact produced by a job.
 * The 'data' property is intentionally 'any' to support various artifact types,
 * but could be narrowed down with a more specific generic type if needed.
 */
export interface Artifact {
  data: any;
  type: string; // e.g., 'file', 'log', 'simulation_result'
}

export interface Job {
  id: JobId;
  name: string;
  status: JobStatus;
  createdAt: number;
  artifacts?: { artifactId: ArtifactId }[];
}

const jobs = new Map<JobId, Job>();
const artifacts = new Map<ArtifactId, Artifact>();

export function updateJobStatus(id: JobId, status: JobStatus): void {
  const job = jobs.get(id);
  if (job) {
    job.status = status;
  }
}

export function recordArtifact(jobId: JobId, artifact: Artifact): void {
  const id: ArtifactId = `${jobId}-${Date.now()}`;
  artifacts.set(id, artifact);
  const job = jobs.get(jobId);
  if (job) {
    job.artifacts = job.artifacts || [];
    job.artifacts.push({ artifactId: id });
  }
}

export function createJob(job: Job): void {
  jobs.set(job.id, job);
}

export function getJob(id: JobId): Job | undefined {
  return jobs.get(id);
}

export function getArtifact(id: ArtifactId): Artifact | undefined {
  return artifacts.get(id);
}