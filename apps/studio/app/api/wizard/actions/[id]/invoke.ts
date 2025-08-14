import type { NextApiRequest, NextApiResponse } from 'next';
import { queueJob } from '../../../../../src/jobs/runner';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { id } = req.query;
  const inputs = req.body?.inputs ?? {};
  const invocationId = queueJob(String(id), inputs);
  res.json({ invocationId });
}
