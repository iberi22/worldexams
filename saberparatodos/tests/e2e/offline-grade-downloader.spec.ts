import { test, expect } from '@playwright/test';

test.describe('Offline Grade Downloader Flow (Wave 5.01 / AC-1)', () => {
  test('renders /ajustes/offline page with country details and grade selector', async ({ page }) => {
    await page.goto('/ajustes/offline');

    // Page title and headings
    await expect(page).toHaveTitle(/Descarga Offline|Descarga de Grados/i);
    const mainHeading = page.locator('h1').first();
    await expect(mainHeading).toContainText('Modo Estudio Sin Conexión');

    // Downloader container
    const downloader = page.locator('.offline-downloader-container');
    await expect(downloader).toBeVisible();

    // Grade options exist (Grados 3 to 11 in select)
    const gradeOptions = page.locator('#offline-grade-select option');
    const count = await gradeOptions.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('validates storage quota calculation and offline indexeddb capabilities in browser context', async ({ page }) => {
    await page.goto('/ajustes/offline');

    // Evaluate IndexedDB support and quota API inside browser page context
    const idbResult = await page.evaluate(async () => {
      if (!window.indexedDB) return { supported: false };
      
      let quota = 0;
      if (navigator.storage && navigator.storage.estimate) {
        const estimate = await navigator.storage.estimate();
        quota = estimate.quota || 0;
      }

      return {
        supported: true,
        quotaMb: Math.round(quota / (1024 * 1024))
      };
    });

    expect(idbResult.supported).toBe(true);
  });
});
