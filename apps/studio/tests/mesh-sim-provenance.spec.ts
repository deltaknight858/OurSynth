import { test, expect } from '@playwright/test';

// Playwright test: Capsule pack, mesh-sim run, provenance artifact, replay

test('MeshSim provenance artifact appears in timeline and can be replayed', async ({ page }) => {
  // 1. Go to Studio timeline
  await page.goto('/studio');
  await page.getByText('Time Machine').waitFor();

  // 2. Simulate mesh-sim event (stub: inject event)
  await page.evaluate(() => {
    window.dispatchEvent(
      new CustomEvent('oai:event', {
        detail: {
          id: 'sim-123',
          ts: Date.now(),
          source: 'deploy',
          type: 'deploy.meshSim',
          data: {
            meshSimResult: {
              simId: 'sim-123',
              capsuleHash: 'abc123',
              params: { nodes: 3, latencyMs: [10, 50], packetLoss: 0.1, chaosMode: true },
              nodeReports: [
                {
                  nodeId: 'n1',
                  phases: [{ name: 'start', start: 't1', end: 't2', status: 'ok' }],
                  signatureVerified: true,
                },
                {
                  nodeId: 'n2',
                  phases: [{ name: 'start', start: 't1', end: 't2', status: 'ok' }],
                  signatureVerified: true,
                },
                {
                  nodeId: 'n3',
                  phases: [{ name: 'start', start: 't1', end: 't2', status: 'ok' }],
                  signatureVerified: true,
                },
              ],
              latencyMatrix: [
                [0, 12, 15],
                [12, 0, 18],
                [15, 18, 0],
              ],
              outcome: 'pass',
              startedAt: '2025-08-13T12:00:00Z',
              endedAt: '2025-08-13T12:01:00Z',
              signedBy: 'pubkey',
              signature: 'sig',
            },
          },
        },
      }),
    );
  });

  // 3. Badge should appear
  await expect(page.getByText('Simulation Evidence')).toBeVisible();

  // 4. Click badge, evidence pane appears
  await page.getByText('Simulation Evidence').click();
  await expect(page.getByText('Replay Simulation')).toBeVisible();
  await expect(page.getByText('Chaos Mode: ON')).toBeVisible();

  // 5. Export link present
  await expect(page.getByText('Export Evidence (.capsim)')).toBeVisible();

  // 6. (Optional) Click replay (stub)
  // await page.getByText('Replay Simulation').click();
});
