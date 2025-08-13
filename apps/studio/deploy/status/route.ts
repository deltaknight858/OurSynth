// Status poll for deploy run
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // TODO: Accept deployId, return status/logs/URL
  const { searchParams } = new URL(req.url!);
  const deployId = searchParams.get('deployId');
  if (!deployId) return NextResponse.json({ error: 'deployId required' }, { status: 400 });
  // Simulate status
  const status = 'done';
  const url = 'https://staging.oursynth.app/' + deployId;
  return NextResponse.json({ ok: true, status, url, logs: ['Build started', 'Build complete'] });
}
