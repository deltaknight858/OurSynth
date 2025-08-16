import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

import { NextRequest, NextResponse } from 'next/server';

const SIM_DIR = process.env.MESH_SIM_DIR || './mesh-sim-artifacts';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const simId = url.pathname.split('/').pop();
  const filePath = join(SIM_DIR, `${simId}.capsim`);
  if (!existsSync(filePath)) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  }
  const artifact = JSON.parse(readFileSync(filePath, 'utf8'));
  return NextResponse.json({ ok: true, artifact });
}
