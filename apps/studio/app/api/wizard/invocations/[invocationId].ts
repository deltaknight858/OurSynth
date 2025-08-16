import type { NextApiRequest, NextApiResponse } from 'next';

import { getJob } from '../../../../../src/jobs/store';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { invocationId } = req.query;
  const state = getJob(String(invocationId));
  if (!state) return res.status(404).json({ error: 'not found' });
  res.json(state);
}
