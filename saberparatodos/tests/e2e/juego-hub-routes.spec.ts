import { test, expect } from '@playwright/test';

/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

test.describe.serial('Juego Hub Routes E2E Suite (Ola Juego.01)', () => {
  test('1. /juego renders h1 "Juego" + links to /juego/liga and /juego/olimpiada', async ({ page }) => {
    await page.goto('/juego');
    await page.waitForLoadState('domcontentloaded');

    const hubContainer = page.locator('[data-testid="juego-hub"]');
    await expect(hubContainer).toBeVisible();

    const heading = page.locator('h1', { hasText: 'Juego' });
    await expect(heading).toBeVisible();

    const linkLiga = page.locator('a[href="/juego/liga"]');
    await expect(linkLiga).toBeVisible();

    const linkOlimpiada = page.locator('a[href="/juego/olimpiada"]');
    await expect(linkOlimpiada).toBeVisible();
  });

  test('2. /juego/liga renders h1 "Mi liga" + back link to /juego', async ({ page }) => {
    await page.goto('/juego/liga');
    await page.waitForLoadState('domcontentloaded');

    const ligaContainer = page.locator('[data-testid="juego-liga-page"]');
    await expect(ligaContainer).toBeVisible();

    const heading = page.locator('h1', { hasText: 'Mi liga' });
    await expect(heading).toBeVisible();

    const backLink = page.locator('a[href="/juego"]', { hasText: 'Volver al juego' });
    await expect(backLink).toBeVisible();
  });

  test('3. /juego/olimpiada renders h1 "Olimpiada" + back link to /juego', async ({ page }) => {
    await page.goto('/juego/olimpiada');
    await page.waitForLoadState('domcontentloaded');

    const olimpiadaContainer = page.locator('[data-testid="juego-olimpiada-page"]');
    await expect(olimpiadaContainer).toBeVisible();

    const heading = page.locator('h1', { hasText: 'Olimpiada' });
    await expect(heading).toBeVisible();

    const backLink = page.locator('a[href="/juego"]', { hasText: 'Volver al juego' });
    await expect(backLink).toBeVisible();
  });

  test('4. No pageerror and no console.error on /juego, /juego/liga, /juego/olimpiada', async ({ page }) => {
    const routes = ['/juego', '/juego/liga', '/juego/olimpiada'];

    for (const route of routes) {
      const consoleErrors: string[] = [];
      const pageErrors: Error[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('pageerror', (err) => {
        pageErrors.push(err);
      });

      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');

      expect(consoleErrors, `Console errors detected on ${route}: ${consoleErrors.join(', ')}`).toEqual([]);
      expect(pageErrors, `Page errors detected on ${route}: ${pageErrors.map((e) => e.message).join(', ')}`).toEqual([]);
    }
  });

  test('5. Mobile viewport /juego renders without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/juego');
    await page.waitForLoadState('domcontentloaded');

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(391);
  });
});
