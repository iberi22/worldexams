import { test, expect } from '@playwright/test';

test.describe('Cuentos PWA Offline Suite (Wave C5.03)', () => {
  test('verifies offline reading and offline fallback notice', async ({ page, context }, testInfo) => {
    // 1. Visit online to register SW and cache tana-tucan-comparte
    await page.goto('/cuentos/tana-tucan-comparte');
    await expect(page).toHaveTitle(/Tana la tucán que aprendió a compartir/i);

    // Wait for Service Worker registration and active controller
    await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        await navigator.serviceWorker.ready;
      }
    });

    // Give time for cache put of HTML & pack assets
    await page.waitForTimeout(1000);

    // Take online screenshot
    const onlineScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('online-story', { body: onlineScreenshot, contentType: 'image/png' });

    // 2. Go offline
    await context.setOffline(true);

    // Reload the visited story page offline
    await page.reload();
    await expect(page.locator('main h1').first()).toContainText('Tana la tucán que aprendió a compartir');
    await expect(page.locator('text=Página 1 de 8').first()).toBeVisible();

    // Take offline reload screenshot
    const offlineScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('offline-story-reload', { body: offlineScreenshot, contentType: 'image/png' });

    // 3. Visit UNCACHED story offline -> expect fallback notice
    await page.goto('/cuentos/cuento-no-guardado-ejemplo');
    await expect(page.locator('h1')).toContainText('Sin conexión a internet');
    await expect(page.locator('text=Este cuento no está guardado')).toBeVisible();

    // Take offline fallback notice screenshot
    const fallbackScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('offline-fallback-notice', { body: fallbackScreenshot, contentType: 'image/png' });

    // Re-enable network
    await context.setOffline(false);
  });
});
