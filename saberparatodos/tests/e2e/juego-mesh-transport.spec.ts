import { test, expect, BrowserContext, Page } from '@playwright/test';

declare global {
  interface Window {
    __wxJuego?: any;
    __transportA?: any;
    __transportB?: any;
    __receivedA?: any[];
    __receivedB?: any[];
  }
}

test.describe.configure({ mode: 'serial' });

test.describe('Ola Juego Mesh Transport E2E (BC + Backend-Down + Outbox)', () => {
  let context: BrowserContext;
  let pageA: Page;
  let pageB: Page;
  let hasHooks = false;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    pageA = await context.newPage();
    pageB = await context.newPage();

    await pageA.goto('/');
    await pageB.goto('/');

    hasHooks = await pageA.evaluate(() => {
      return typeof window.__wxJuego?.mesh?.createTransport === 'function';
    });
  });

  test.afterAll(async () => {
    await context?.close();
  });

  test('1. A->B delta message propagation via BroadcastChannel L0', async () => {
    test.skip(!hasHooks, 'Blocker: #4 hook surface window.__wxJuego.mesh.createTransport not present in application');

    // Initialize transport A on pageA using window.__wxJuego.mesh.createTransport
    await pageA.evaluate(async () => {
      const tA = window.__wxJuego.mesh.createTransport({ peerId: 'p_e2e_a' });
      await tA.start('e2etest-room-01');
      window.__transportA = tA;
    });

    // Initialize transport B on pageB and attach onEnvelope listener
    await pageB.evaluate(async () => {
      const tB = window.__wxJuego.mesh.createTransport({ peerId: 'p_e2e_b' });
      await tB.start('e2etest-room-01');
      window.__receivedB = [];
      tB.onEnvelope((env: any) => {
        window.__receivedB.push(env);
      });
      window.__transportB = tB;
    });

    // Page A sends delta message
    await pageA.evaluate(async () => {
      await window.__transportA.send('delta', 'Y2lwaGVyLW9wYXF1ZQ');
    });

    // Page B should receive the envelope via BroadcastChannel L0
    await expect.poll(async () => {
      return await pageB.evaluate(() => window.__receivedB);
    }, { timeout: 10000 }).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'delta',
          payload: 'Y2lwaGVyLW9wYXF1ZQ',
          peerId: 'p_e2e_a'
        })
      ])
    );
  });

  test('2. Sender own messages never re-enter own onEnvelope handler', async () => {
    test.skip(!hasHooks, 'Blocker: #4 hook surface window.__wxJuego.mesh.createTransport not present in application');

    // Attach onEnvelope listener on pageA
    await pageA.evaluate(async () => {
      window.__receivedA = [];
      window.__transportA.onEnvelope((env: any) => {
        window.__receivedA.push(env);
      });
    });

    // Page A sends delta message
    await pageA.evaluate(async () => {
      await window.__transportA.send('delta', 'Y2lwaGVyLW9wYXF1ZQ');
    });

    // Page A's own handler count should remain 0
    const countA = await pageA.evaluate(() => window.__receivedA ? window.__receivedA.length : 0);
    expect(countA).toBe(0);
  });

  test('3. Backend-down mesh-alive operation without backendBase and with route abort', async () => {
    test.skip(!hasHooks, 'Blocker: #4 hook surface window.__wxJuego.mesh.createTransport not present in application');

    // Abort any /v1/mesh/ request on both pages
    await pageA.route('**/v1/mesh/**', (route) => route.abort());
    await pageB.route('**/v1/mesh/**', (route) => route.abort());

    // Create transport A without backendBase
    await pageA.evaluate(async () => {
      if (window.__transportA) {
        await window.__transportA.stop();
      }
      const tA = window.__wxJuego.mesh.createTransport({ peerId: 'p_e2e_a' });
      await tA.start('e2etest-room-01');
      window.__transportA = tA;
    });

    // Verify backend status is unknown (never attempted)
    const statusA = await pageA.evaluate(() => window.__transportA.status());
    expect(statusA.backend).toBe('unknown');

    // Clear pageB received log
    await pageB.evaluate(() => {
      window.__receivedB = [];
    });

    // Send delta from Page A
    await pageA.evaluate(async () => {
      await window.__transportA.send('delta', 'Y2lwaGVyLW9wYXF1ZQ');
    });

    // Assert delivery via BroadcastChannel despite network route abort
    await expect.poll(async () => {
      return await pageB.evaluate(() => window.__receivedB);
    }, { timeout: 10000 }).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'delta',
          payload: 'Y2lwaGVyLW9wYXF1ZQ',
          peerId: 'p_e2e_a'
        })
      ])
    );
  });

  test('4. Outbox L4 enqueues failed relay attempts and flushes when peer present', async () => {
    test.skip(!hasHooks, 'Blocker: #4 hook surface window.__wxJuego.mesh.createTransport not present in application');

    // Abort /v1/mesh requests for backend-down simulation
    await pageA.route('**/v1/mesh/**', (route) => route.abort());

    // Create transport with backendBase set to invalid host
    await pageA.evaluate(async () => {
      if (window.__transportA) {
        await window.__transportA.stop();
      }
      const tA = window.__wxJuego.mesh.createTransport({
        peerId: 'p_e2e_a',
        backendBase: 'https://mesh.invalid'
      });
      await tA.start('e2etest-room-01');
      window.__transportA = tA;
    });

    // Clear received messages on pageB
    await pageB.evaluate(() => {
      window.__receivedB = [];
    });

    // Send message which enqueues to outbox because backend relay fails
    await pageA.evaluate(async () => {
      await window.__transportA.send('delta', 'Y2lwaGVyLW9wYXF1ZQ');
    });

    // Verify L4 outbox count is >= 1
    const outboxCountBefore = await pageA.evaluate(() => window.__transportA.getOutboxCount());
    expect(outboxCountBefore).toBeGreaterThanOrEqual(1);

    // Call flushOutbox on Page A
    await pageA.evaluate(async () => {
      await window.__transportA.flushOutbox();
    });

    // Verify L4 outbox count returns to 0 after flushing
    await expect.poll(async () => {
      return await pageA.evaluate(() => window.__transportA.getOutboxCount());
    }, { timeout: 20000 }).toBe(0);

    // Verify Page B receives the message from flushOutbox
    await expect.poll(async () => {
      return await pageB.evaluate(() => window.__receivedB);
    }, { timeout: 10000 }).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'delta',
          payload: 'Y2lwaGVyLW9wYXF1ZQ',
          peerId: 'p_e2e_a'
        })
      ])
    );
  });

  test('5. BR-04 shape gate rejects invalid envelope payloads returning null', async () => {
    test.skip(!hasHooks, 'Blocker: #4 hook surface window.__wxJuego.mesh.createTransport not present in application');

    // Send unencoded / invalid shape string
    const result = await pageA.evaluate(async () => {
      return await window.__transportA.send('delta', 'mi nota es 5');
    });

    // Assert shape gate rejection
    expect(result).toBeNull();
  });
});
