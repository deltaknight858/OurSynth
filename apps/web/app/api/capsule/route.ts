import { buildCapsule } from '@oursynth/oai/src/capsule';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  // TODO: Validate and build capsule from request
  const manifest = await buildCapsule(body);
  // TODO: Save capsule to disk or DB if needed
  return NextResponse.json({ ok: true, manifest });
}
