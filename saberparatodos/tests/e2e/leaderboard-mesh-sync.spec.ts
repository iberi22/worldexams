import { test, expect } from '@playwright/test';

test.describe('Leaderboard Live Mesh Peer Discovery & Cross-Tab State Sync (Wave 5.11)', () => {
  test('verifies P2P peer discovery, BroadcastChannel message propagation, and Zero-PII payload presentation across concurrent tabs', async ({ browser }) => {
    // 1. Open Context with two simultaneous pages (tabs)
    const context = await browser.newContext();
    const pageA = await context.newPage();
    await pageA.goto('/leaderboard');

    // Wait for leaderboard live mesh to render in Page A
    const liveMeshA = pageA.locator('[data-testid="leaderboard-live-mesh"]');
    await expect(liveMeshA).toBeVisible();

    const peerCountBadgeA = pageA.locator('[data-testid="peer-count"]');
    await expect(peerCountBadgeA).toBeVisible();

    // 2. Open Page B in same Context (simulating second peer node tab)
    const pageB = await context.newPage();
    await pageB.goto('/leaderboard');

    const liveMeshB = pageB.locator('[data-testid="leaderboard-live-mesh"]');
    await expect(liveMeshB).toBeVisible();

    // 3. Verify peer node count increments to >= 2 upon second client joining
    await expect(pageA.locator('[data-testid="peer-count"]')).toHaveText(/👥 [2-9] nodos/);
    await expect(pageB.locator('[data-testid="peer-count"]')).toHaveText(/👥 [2-9] nodos/);

    // 4. Trigger mock score broadcast from Page A and verify live reactive update in Page B
    const broadcastPayload = {
      node_hash: 'wx-peer-alpha',
      subject: 'matematicas',
      week: 'W05',
      score: 98,
      avg: 98
    };

    await pageA.evaluate((data) => {
      window.dispatchEvent(new CustomEvent('wx:mesh:share', { detail: data }));
    }, broadcastPayload);

    // Page B should reactively receive the BroadcastChannel message and display the node
    const cellHashInB = pageB.locator('[data-testid="node-hash-cell"]', { hasText: broadcastPayload.node_hash });
    await expect(cellHashInB).toBeVisible({ timeout: 10000 });

    // 5. Verify that all broadcast payloads contain node_hash and zero PII (no usernames, emails, or personal identifiers)
    const rowInB = pageB.locator('[data-testid="ranking-row"]', { hasText: broadcastPayload.node_hash });
    const rowText = await rowInB.textContent();

    expect(rowText).not.toBeNull();
    expect(rowText).toContain('wx-peer-alpha');
    expect(rowText).toContain('matematicas');
    expect(rowText).toContain('W05');
    expect(rowText).toContain('98.0');

    // Strict PII Key/Value verification
    const disallowedTerms = ['email', 'password', 'user', 'fullname', 'phone', 'address', 'student'];
    for (const term of disallowedTerms) {
      expect(rowText?.toLowerCase()).not.toContain(term);
    }

    // Cleanup context
    await context.close();
  });
});
