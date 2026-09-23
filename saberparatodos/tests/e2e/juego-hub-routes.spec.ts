import { test, expect } from '@playwright/test';

test.describe.serial('E2E Smoke Suite for /juego Hub Routes [Ola Juego.01]', () => {
  test('1. /juego renders root container, h1 "Juego", and navigation links to liga and olimpiada', async ({ page }) => {
    await page.goto('/juego');

    const rootHub = page.locator('[data-testid="juego-hub"]');
    await expect(rootHub).toBeVisible();

    const mainHeading = page.locator('h1', { hasText: 'Juego' });
    await expect(mainHeading).toBeVisible();

    const ligaLink = page.locator('a[href="/juego/liga"]');
    await expect(ligaLink).toBeVisible();

    const olimpiadaLink = page.locator('a[href="/juego/olimpiada"]');
    await expect(olimpiadaLink).toBeVisible();
  });

  test('2. /juego/liga renders root container, h1 "Mi liga", and back link to /juego', async ({ page }) => {
    await page.goto('/juego/liga');

    const rootLiga = page.locator('[data-testid="juego-liga-page"]');
    await expect(rootLiga).toBeVisible();

    const mainHeading = page.locator('h1', { hasText: 'Mi liga' });
    await expect(mainHeading).toBeVisible();

    const backLink = page.locator('a[href="/juego"]');
    await expect(backLink).toBeVisible();
  });

  test('3. /juego/olimpiada renders root container, h1 "Olimpiada", and back link to /juego', async ({ page }) => {
    await page.goto('/juego/olimpiada');

    const rootOlimpiada = page.locator('[data-testid="juego-olimpiada-page"]');
    await expect(rootOlimpiada).toBeVisible();

    const mainHeading = page.locator('h1', { hasText: 'Olimpiada' });
    await expect(mainHeading).toBeVisible();

    const backLink = page.locator('a[href="/juego"]');
    await expect(backLink).toBeVisible();
  });

  test('4. Zero pageerror and console.error events across all 3 /juego routes', async ({ page }) => {
    const pageErrors: Error[] = [];
    const consoleErrors: string[] = [];

    page.on('pageerror', (err) => {
      pageErrors.push(err);
    });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const routes = ['/juego', '/juego/liga', '/juego/olimpiada'];

    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');
    }

    expect(pageErrors, `Expected zero pageerror events across routes but found ${pageErrors.length}`).toEqual([]);
    expect(consoleErrors, `Expected zero console.error events across routes but found ${consoleErrors.length}`).toEqual([]);
  });

  test('5. Mobile viewport on /juego renders without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/juego');
    await page.waitForLoadState('domcontentloaded');

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(391);
  });
});
