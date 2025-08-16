import type { NextApiRequest, NextApiResponse } from 'next';

import { getArtifact } from '../../../../../src/jobs/store';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { artifactId } = req.query;
  const artifact = getArtifact(String(artifactId));
  if (!artifact) return res.status(404).json({ error: 'not found' });
  res.json(artifact);
}
