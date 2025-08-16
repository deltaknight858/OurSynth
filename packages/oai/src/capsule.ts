import { randomUUID } from 'crypto';

import { CapsuleManifest } from '@oursynth/types/capsule';

// Dummy sign function for Ed25519 (replace with real signing in production)
async function sign(data: string, key: string): Promise<string> {
  // In production, use a real Ed25519 signing library and private key
  return Buffer.from(data + key)
    .toString('base64')
    .slice(0, 64);
}

export async function buildCapsule({
  name,
  version,
  createdBy,
  build,
  services,
  seeds,
  rights,
  attestations,
}: Omit<CapsuleManifest, 'id' | 'createdAt' | 'signature'>): Promise<CapsuleManifest> {
  const manifest: CapsuleManifest = {
    id: randomUUID(),
    name,
    version,
    createdAt: new Date().toISOString(),
    createdBy,
    build,
    services,
    seeds,
    rights,
    attestations,
    signature: '',
  };
  // Hash and sign the manifest (excluding signature)
  const toSign = JSON.stringify({ ...manifest, signature: undefined });
  manifest.signature = await sign(toSign, createdBy); // sign with dev/org key
  return manifest;
}
