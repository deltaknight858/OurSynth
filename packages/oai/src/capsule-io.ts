import { CapsuleManifest } from '@oursynth/types/capsule';
import fs from 'fs/promises';
import path from 'path';

export async function saveCapsule(manifest: CapsuleManifest, dir: string) {
  const file = path.join(dir, `${manifest.name}-${manifest.version}.capsule.json`);
  await fs.writeFile(file, JSON.stringify(manifest, null, 2), 'utf-8');
  return file;
}

export async function loadCapsule(file: string): Promise<CapsuleManifest> {
  const data = await fs.readFile(file, 'utf-8');
  return JSON.parse(data) as CapsuleManifest;
}