// Create a deploy run, return id
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // TODO: Accept Capsule or runId, create deploy run, return id
  const { capsuleId, runId } = await req.json();
  if (!capsuleId && !runId) return NextResponse.json({ error: 'capsuleId or runId required' }, { status: 400 });
  // Simulate run creation
  const deployId = 'deploy-' + Date.now();
  return NextResponse.json({ ok: true, deployId });
}
