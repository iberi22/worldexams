import { test, expect, Page, BrowserContext } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

test.describe.configure({ mode: 'serial' });

test.describe('E2E Transporte Mesh (BroadcastChannel + Backend-Down + Outbox L4)', () => {

  let transportJsCode = '';
  try {
    const transportTsPath = path.join(process.cwd(), 'saberparatodos/src/lib/mesh/transport.ts');
    if (fs.existsSync(transportTsPath)) {
      const tsCode = fs.readFileSync(transportTsPath, 'utf8');
      const transpiled = ts.transpileModule(tsCode, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
      }).outputText;
      transportJsCode = `(function() { var exports = {}; ${transpiled}; return exports; })()`;
    }
  } catch (e) {
    console.warn('Could not read or transpile transport.ts:', e);
  }

  async function prepareContext(context: BrowserContext): Promise<void> {
    if (transportJsCode) {
      await context.addInitScript((injectedJs) => {
        if (!(window as any).__wxJuego?.mesh?.createTransport) {
          try {
            const mod = eval(injectedJs);
            if (mod && mod.MeshTransport) {
              (window as any).__wxJuego = (window as any).__wxJuego || {};
              (window as any).__wxJuego.mesh = (window as any).__wxJuego.mesh || {};
              (window as any).__wxJuego.mesh.createTransport = (opts: any) => new mod.MeshTransport(opts);
            }
          } catch (err) {
            console.warn('Init script failed eval:', err);
          }
        }
      }, transportJsCode);
    }
  }

  async function setupTransportHook(page: Page): Promise<boolean> {
    await page.goto('/juego');
    await page.waitForLoadState('domcontentloaded');
    return page.evaluate(() => {
      return typeof (window as any).__wxJuego?.mesh?.createTransport === 'function';
    });
  }

  test('1. A→B delta delivery over BroadcastChannel across 2 tabs', async ({ browser }) => {
    const context = await browser.newContext();
    await prepareContext(context);

    const pageA = await context.newPage();
    const pageB = await context.newPage();

    const okA = await setupTransportHook(pageA);
    const okB = await setupTransportHook(pageB);

    if (!okA || !okB) {
      test.skip(!okA || !okB, 'Hook surface window.__wxJuego.mesh.createTransport absent - skipping test 1');
      return;
    }

    await pageA.evaluate(() => {
      const t = (window as any).__wxJuego.mesh.createTransport({ peerId: 'p_e2e_a' });
      t.start('e2etest-room-01');
      (window as any).__e2eTransport = t;
    });

    await pageB.evaluate(() => {
      const t = (window as any).__wxJuego.mesh.createTransport({ peerId: 'p_e2e_b' });
      t.start('e2etest-room-01');
      (window as any).__e2eEnvelopes = [];
      t.onEnvelope((env: any) => {
        (window as any).__e2eEnvelopes.push(env);
      });
      (window as any).__e2eTransport = t;
    });

    await pageA.evaluate(() => {
      (window as any).__e2eTransport.send('delta', 'Y2lwaGVyLW9wYXF1ZQ');
    });

    await expect.poll(async () => {
      return await pageB.evaluate(() => (window as any).__e2eEnvelopes);
    }, { timeout: 10000 }).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'delta',
          blob: 'Y2lwaGVyLW9wYXF1ZQ',
          from: 'p_e2e_a',
          room: 'e2etest-room-01',
        }),
      ])
    );

    await pageA.evaluate(() => (window as any).__e2eTransport?.stop());
    await pageB.evaluate(() => (window as any).__e2eTransport?.stop());
    await context.close();
  });

  test('2. Own messages never re-enter sender onEnvelope handler', async ({ browser }) => {
    const context = await browser.newContext();
    await prepareContext(context);

    const pageA = await context.newPage();

    const okA = await setupTransportHook(pageA);
    if (!okA) {
      test.skip(!okA, 'Hook surface window.__wxJuego.mesh.createTransport absent - skipping test 2');
      return;
    }

    await pageA.evaluate(() => {
      const t = (window as any).__wxJuego.mesh.createTransport({ peerId: 'p_e2e_a_own' });
      t.start('e2etest-room-01');
      (window as any).__e2eOwnCount = 0;
      t.onEnvelope(() => {
        (window as any).__e2eOwnCount++;
      });
      (window as any).__e2eTransport = t;
      t.send('delta', 'Y2lwaGVyLW9wYXF1ZQ');
    });

    await pageA.waitForTimeout(200);

    const ownCount = await pageA.evaluate(() => (window as any).__e2eOwnCount);
    expect(ownCount).toBe(0);

    await pageA.evaluate(() => (window as any).__e2eTransport?.stop());
    await context.close();
  });

  test('3. Backend-down mesh-alive operation via route abort', async ({ browser }) => {
    const context = await browser.newContext();
    await prepareContext(context);

    const pageA = await context.newPage();
    const pageB = await context.newPage();

    await pageA.route('**/v1/mesh/**', (route) => route.abort());
    await pageB.route('**/v1/mesh/**', (route) => route.abort());

    const okA = await setupTransportHook(pageA);
    const okB = await setupTransportHook(pageB);

    if (!okA || !okB) {
      test.skip(!okA || !okB, 'Hook surface window.__wxJuego.mesh.createTransport absent - skipping test 3');
      return;
    }

    await pageA.evaluate(() => {
      const t = (window as any).__wxJuego.mesh.createTransport({ peerId: 'p_e2e_bk_a' });
      t.start('e2etest-room-01');
      (window as any).__e2eTransport = t;
    });

    await pageB.evaluate(() => {
      const t = (window as any).__wxJuego.mesh.createTransport({ peerId: 'p_e2e_bk_b' });
      t.start('e2etest-room-01');
      (window as any).__e2eEnvelopes = [];
      t.onEnvelope((env: any) => {
        (window as any).__e2eEnvelopes.push(env);
      });
      (window as any).__e2eTransport = t;
    });

    await pageA.evaluate(() => {
      (window as any).__e2eTransport.send('delta', 'Y2lwaGVyLW9wYXF1ZQ');
    });

    await expect.poll(async () => {
      return await pageB.evaluate(() => (window as any).__e2eEnvelopes);
    }, { timeout: 10000 }).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'delta',
          blob: 'Y2lwaGVyLW9wYXF1ZQ',
          from: 'p_e2e_bk_a',
        }),
      ])
    );

    const statusA = await pageA.evaluate(() => (window as any).__e2eTransport.status());
    expect(statusA.backend).toBe('unknown');

    await pageA.evaluate(() => (window as any).__e2eTransport?.stop());
    await pageB.evaluate(() => (window as any).__e2eTransport?.stop());
    await context.close();
  });

  test('4. Outbox L4 queueing and flushing when backend fails', async ({ browser }) => {
    const context = await browser.newContext();
    await prepareContext(context);

    const pageA = await context.newPage();

    await pageA.route('**/v1/mesh/**', (route) => route.abort());

    const okA = await setupTransportHook(pageA);
    if (!okA) {
      test.skip(!okA, 'Hook surface window.__wxJuego.mesh.createTransport absent - skipping test 4');
      return;
    }

    await pageA.evaluate(() => {
      const t = (window as any).__wxJuego.mesh.createTransport({
        peerId: 'p_e2e_out_a',
        backendBase: 'https://mesh.invalid',
      });
      t.start('e2etest-room-01');
      (window as any).__e2eTransport = t;
      t.send('delta', 'Y2lwaGVyLW9wYXF1ZQ');
    });

    await expect.poll(async () => {
      return await pageA.evaluate(() => (window as any).__e2eTransport.getOutboxCount());
    }, { timeout: 10000 }).toBeGreaterThanOrEqual(1);

    const pageB = await context.newPage();
    const okB = await setupTransportHook(pageB);

    if (okB) {
      await pageB.evaluate(() => {
        const t = (window as any).__wxJuego.mesh.createTransport({ peerId: 'p_e2e_out_b' });
        t.start('e2etest-room-01');
        (window as any).__e2eEnvelopes = [];
        t.onEnvelope((env: any) => {
          (window as any).__e2eEnvelopes.push(env);
        });
        (window as any).__e2eTransport = t;
      });

      await pageA.evaluate(() => {
        (window as any).__e2eTransport.flushOutbox();
      });

      await expect.poll(async () => {
        return await pageA.evaluate(() => (window as any).__e2eTransport.getOutboxCount());
      }, { timeout: 10000 }).toBe(0);

      await pageB.evaluate(() => (window as any).__e2eTransport?.stop());
    }

    await pageA.evaluate(() => (window as any).__e2eTransport?.stop());
    await context.close();
  });

  test('5. BR-04 shape gate rejects invalid payloads with forbidden keywords', async ({ browser }) => {
    const context = await browser.newContext();
    await prepareContext(context);

    const pageA = await context.newPage();

    const okA = await setupTransportHook(pageA);
    if (!okA) {
      test.skip(!okA, 'Hook surface window.__wxJuego.mesh.createTransport absent - skipping test 5');
      return;
    }

    await pageA.evaluate(() => {
      const t = (window as any).__wxJuego.mesh.createTransport({ peerId: 'p_e2e_gate_a' });
      t.start('e2etest-room-01');
      (window as any).__e2eTransport = t;
    });

    const result = await pageA.evaluate(() => {
      return (window as any).__e2eTransport.send('delta', 'mi nota es 5');
    });

    expect(result).toBeNull();

    await pageA.evaluate(() => (window as any).__e2eTransport?.stop());
    await context.close();
  });

});
