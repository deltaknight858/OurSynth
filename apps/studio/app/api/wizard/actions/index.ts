import fs from 'node:fs';
import path from 'node:path';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  const registryPath = path.resolve(process.cwd(), '.studio/registry.json');
  const actions = fs.existsSync(registryPath)
    ? JSON.parse(fs.readFileSync(registryPath, 'utf8'))
    : [];
  res.json(actions);
}
