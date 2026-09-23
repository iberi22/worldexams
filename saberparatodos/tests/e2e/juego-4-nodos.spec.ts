import { test, expect, type BrowserContext, type Page } from '@playwright/test';

/**
 * [Ola Juego.05] juego-4-nodos — 4 estudiantes simultáneos (liga + directorio)
 *
 * E2E test suite simulating 4 simultaneous student nodes (1 host + 3 students)
 * in separate Playwright browser contexts, validating multi-node league view,
 * deterministic ranking, and salon directory discovery via window.__wxJuego.
 *
 * Blocker dependency: Issue #4 (window.__wxJuego.mesh.createDirectory contract).
 */

test.describe.configure({ mode: 'serial' });

test.describe('[Ola Juego.05] juego-4-nodos E2E Suite', () => {
  let hostContext: BrowserContext;
  let hostPage: Page;
  let studentContexts: BrowserContext[] = [];
  let studentPages: Page[] = [];

  test.beforeAll(async ({ browser }) => {
    // Context 0: Host node (Estudiante 0)
    hostContext = await browser.newContext();
    hostPage = await hostContext.newPage();

    // Contexts 1, 2, 3: Student nodes (Estudiantes 1, 2, 3)
    const ctx1 = await browser.newContext();
    const ctx2 = await browser.newContext();
    const ctx3 = await browser.newContext();

    studentContexts = [ctx1, ctx2, ctx3];
    studentPages = [
      await ctx1.newPage(),
      await ctx2.newPage(),
      await ctx3.newPage(),
    ];

    // Verify window.__wxJuego.mesh.createDirectory hook surface from issue #4
    await hostPage.goto('/juego/harness').catch(() => hostPage.goto('/'));
    const hasHookSurface = await hostPage.evaluate(() => {
      return typeof (window as any).__wxJuego?.mesh?.createDirectory === 'function';
    });

    if (!hasHookSurface) {
      // Blocker on issue #4: window.__wxJuego.mesh.createDirectory is not yet merged or exposed on harness route
      console.warn('BLOCKER: Issue #4 hook surface window.__wxJuego.mesh.createDirectory is absent');
    }
  });

  test.afterAll(async () => {
    await hostPage?.close().catch(() => {});
    await hostContext?.close().catch(() => {});
    for (const page of studentPages) {
      await page?.close().catch(() => {});
    }
    for (const context of studentContexts) {
      await context?.close().catch(() => {});
    }
  });

  test('Test 1: 4 nodes open /juego/liga with distinct seeded XP and view respective tiers', async () => {
    const pages = [hostPage, ...studentPages];
    const seeds = [
      { name: 'Estudiante_0_Bronce', xp: 200, expectedTier: 'Bronce' },
      { name: 'Estudiante_1_Plata', xp: 900, expectedTier: 'Plata' },
      { name: 'Estudiante_2_Oro', xp: 1500, expectedTier: 'Oro' },
      { name: 'Estudiante_3_Diamante', xp: 6000, expectedTier: 'Diamante' },
    ];

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const seed = seeds[i];

      await page.addInitScript((s) => {
        window.localStorage.setItem(
          'wx-juego-v1',
          JSON.stringify({
            alias: s.name,
            xp: s.xp,
            streak: 3,
            nodeHash: `node_${s.name}`,
          })
        );
      }, seed);

      const response = await page.goto('/juego/liga').catch(() => null);

      if (!response || response.status() === 404) {
        test.skip(true, 'Route /juego/liga is not present yet (depends on #4/#6)');
        return;
      }

      await page.waitForLoadState('domcontentloaded');

      const tierVisible = await page.evaluate((expected) => {
        const text = document.body.innerText || '';
        return text.includes(expected) || document.querySelector(`[data-tier="${expected}"]`) !== null;
      }, seed.expectedTier);

      expect(tierVisible).toBe(true);
    }
  });

  test('Test 2: Two contexts with identical seed exhibit deterministic rank matching', async () => {
    const pageA = hostPage;
    const pageB = studentPages[0];

    const sameSeed = {
      alias: 'Estudiante_Par_Identico',
      xp: 1200,
      weekKey: '2026-W12',
      tier: 'Plata',
      nodeHash: 'n_same_hash_123',
    };

    for (const page of [pageA, pageB]) {
      await page.addInitScript((s) => {
        window.localStorage.setItem('wx-juego-v1', JSON.stringify(s));
      }, sameSeed);
      const res = await page.goto('/juego/liga').catch(() => null);
      if (!res || res.status() === 404) {
        test.skip(true, 'Route /juego/liga is not present yet (depends on #4/#6)');
        return;
      }
    }

    const rankA = await pageA.evaluate(() => {
      const el = document.querySelector('[data-puesto]') || document.querySelector('.puesto-tu');
      return el ? el.textContent?.trim() : null;
    });

    const rankB = await pageB.evaluate(() => {
      const el = document.querySelector('[data-puesto]') || document.querySelector('.puesto-tu');
      return el ? el.textContent?.trim() : null;
    });

    expect(rankA).not.toBeNull();
    expect(rankB).not.toBeNull();
    expect(rankA).toEqual(rankB);
  });

  test('Test 3: SalonDirectory host creates ad and guest lists active sala via createDirectory', async () => {
    await hostPage.goto('/juego/harness').catch(() => hostPage.goto('/'));
    const guestPage = studentPages[0];
    await guestPage.goto('/juego/harness').catch(() => guestPage.goto('/'));

    const hasHook = await hostPage.evaluate(() => typeof (window as any).__wxJuego?.mesh?.createDirectory === 'function');
    if (!hasHook) {
      test.skip(true, 'BLOCKER: window.__wxJuego.mesh.createDirectory from issue #4 is not merged yet');
      return;
    }

    await hostPage.evaluate(() => {
      const dir = (window as any).__wxJuego.mesh.createDirectory({ peerId: 'p_e2e_host' });
      dir.listen();
      dir.host({
        codigo: 'e2e-sala-01-xxxx',
        nombre: 'Sala E2E',
        hostNodoId: 'n_host',
        hostPeerId: 'p_e2e_host',
        createdAt: Date.now(),
      });
    });

    const guestList = await guestPage.evaluate(async () => {
      const dir = (window as any).__wxJuego.mesh.createDirectory({ peerId: 'p_e2e_guest' });
      dir.listen();
      return dir.listar();
    });

    expect(Array.isArray(guestList)).toBe(true);
    expect(guestList.some((ad: any) => ad.codigo === 'e2e-sala-01-xxxx')).toBe(true);
  });

  test('Test 4: Guest directory buscar returns active ad or null for unknown code', async () => {
    const page = hostPage;
    await page.goto('/juego/harness').catch(() => page.goto('/'));

    const hasHook = await page.evaluate(() => typeof (window as any).__wxJuego?.mesh?.createDirectory === 'function');
    if (!hasHook) {
      test.skip(true, 'BLOCKER: window.__wxJuego.mesh.createDirectory from issue #4 is not merged yet');
      return;
    }

    const searchResults = await page.evaluate(() => {
      const dir = (window as any).__wxJuego.mesh.createDirectory({ peerId: 'p_e2e_searcher' });
      dir.listen();
      dir.host({
        codigo: 'e2e-sala-01-xxxx',
        nombre: 'Sala E2E',
        hostNodoId: 'n_host',
        hostPeerId: 'p_e2e_host',
        createdAt: Date.now(),
      });

      const foundAd = dir.buscar('e2e-sala-01-xxxx');
      const notFoundAd = dir.buscar('no-existe-xyz');
      return { foundAd, notFoundAd };
    });

    expect(searchResults.foundAd).not.toBeNull();
    expect(searchResults.foundAd?.codigo).toBe('e2e-sala-01-xxxx');
    expect(searchResults.notFoundAd).toBeNull();
  });

  test('Test 5: BR-04 security guard rejects illegal unknown keys in host ad payload', async () => {
    const page = hostPage;
    await page.goto('/juego/harness').catch(() => page.goto('/'));

    const hasHook = await page.evaluate(() => typeof (window as any).__wxJuego?.mesh?.createDirectory === 'function');
    if (!hasHook) {
      test.skip(true, 'BLOCKER: window.__wxJuego.mesh.createDirectory from issue #4 is not merged yet');
      return;
    }

    const threwError = await page.evaluate(() => {
      const dir = (window as any).__wxJuego.mesh.createDirectory({ peerId: 'p_e2e_validator' });
      try {
        dir.host({
          codigo: 'e2e-sala-01-xxxx',
          nombre: 'Sala E2E',
          hostNodoId: 'n_host',
          hostPeerId: 'p_e2e_host',
          createdAt: Date.now(),
          email: 'x@y.co', // BR-04 forbidden extra field (unknown key injection)
        });
        return false;
      } catch (err) {
        return true;
      }
    });

    expect(threwError).toBe(true);
  });
});
