import { z } from 'zod';

export const CapsuleManifest = z.object({
  id: z.string(), // UUID or slug
  name: z.string(),
  version: z.string(),
  createdAt: z.string(),
  createdBy: z.string(), // user/org id or public key
  build: z.object({
    recipe: z.string(), // e.g. turbo/pnpm/next build steps
    env: z.record(z.string()),
    dependencies: z.record(z.string()),
  }),
  services: z.array(z.string()), // e.g. ['web', 'api', 'db']
  seeds: z.array(z.string()).optional(), // paths to seed data or CRDT snapshots
  rights: z.object({
    license: z.string(),
    resale: z.boolean(),
    usage: z.string().optional(),
  }),
  attestations: z.array(z.object({
    type: z.string(),
    by: z.string(),
    at: z.string(),
    hash: z.string(),
    diff: z.string().optional(),
  })),
  signature: z.string(), // Ed25519 or similar
});

export type CapsuleManifest = z.infer<typeof CapsuleManifest>;