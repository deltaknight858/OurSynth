import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

import { NextRequest, NextResponse } from 'next/server';

import { sha256, sign } from '../../../../packages/capsule/src/crypto';
import { MeshSimResult } from '../../../../packages/capsule/src/meshSimResult';

const SIM_DIR = process.env.MESH_SIM_DIR || './mesh-sim-artifacts';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = MeshSimResult.parse(body);
  const hash = sha256(JSON.stringify(parsed));
  const sk = process.env.CAPSULE_SECRET!;
  const signature = sign(Buffer.from(hash, 'utf8'), sk).toString('base64');
  const signedResult = { ...parsed, signature };
  const filePath = join(SIM_DIR, `${parsed.simId}.capsim`);
  writeFileSync(filePath, JSON.stringify(signedResult, null, 2));
  return NextResponse.json({ ok: true, simId: parsed.simId, filePath });
}

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
