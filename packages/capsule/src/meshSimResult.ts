import { z } from 'zod';

export const MeshSimResult = z.object({
  simId: z.string(),
  capsuleHash: z.string(),
  params: z.object({
    nodes: z.number(),
    latencyMs: z.tuple([z.number(), z.number()]),
    packetLoss: z.number(),
    chaosMode: z.boolean().optional(),
  }),
  nodeReports: z.array(
    z.object({
      nodeId: z.string(),
      phases: z.array(
        z.object({
          name: z.string(),
          start: z.string(),
          end: z.string(),
          status: z.enum(['ok', 'error']),
          details: z.string().optional(),
        }),
      ),
      signatureVerified: z.boolean(),
    }),
  ),
  latencyMatrix: z.array(z.array(z.number())),
  outcome: z.enum(['pass', 'fail']),
  startedAt: z.string(),
  endedAt: z.string(),
  signedBy: z.string(),
  signature: z.string(),
});
export type MeshSimResult = z.infer<typeof MeshSimResult>;
