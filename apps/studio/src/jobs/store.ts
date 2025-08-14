// Minimal persistent job/artifact store (in-memory for now, can be swapped for file/db)
const jobs = new Map();
const artifacts = new Map();

export function updateJobStatus(id, status) {
  const job = jobs.get(id);
  if (job) job.status = status;
}

export function recordArtifact(jobId, artifact) {
  const id = `${jobId}-${Date.now()}`;
  artifacts.set(id, artifact);
  const job = jobs.get(jobId);
  if (job) {
    job.artifacts = job.artifacts || [];
    job.artifacts.push({ artifactId: id });
  }
}

export function createJob(job) {
  jobs.set(job.id, job);
}

export function getJob(id) {
  return jobs.get(id);
}

export function getArtifact(id) {
  return artifacts.get(id);
}
