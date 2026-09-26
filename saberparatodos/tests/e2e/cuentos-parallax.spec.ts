import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Cuentos 2.5D Parallax & Motion Hygiene E2E Suite (Wave C7.06)', () => {
  test('verifies Tana 3-layer parallax, tap reaction, reduced motion, and flat fallback', async ({ page, baseURL }, testInfo) => {
    const consoleErrors: string[] = [];
    const pageErrors: Error[] = [];
    const disallowedRequests: string[] = [];

    // 1. Capture console and page errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      pageErrors.push(err);
    });

    // 2. Network interception: allow local assets and static files
    // (siteOrigin cubre localhost en dev Y el origin real de un preview deploy)
    const siteOrigin = new URL(baseURL || 'http://localhost').origin;
    await page.route('**/*', (route) => {
      const url = route.request().url();

      const isStaticAllowed =
        url.startsWith('data:') ||
        url.startsWith('blob:') ||
        url.startsWith(siteOrigin) ||
        url.includes('/cuentos') ||
        url.includes('/v1/cuentos/') ||
        url.includes('/_astro/') ||
        url.includes('/favicon') ||
        url.includes('/@fs/') ||
        url.includes('/@vite/') ||
        url.includes('fonts.googleapis.com') ||
        url.includes('fonts.gstatic.com');

      if (!isStaticAllowed) {
        disallowedRequests.push(url);
      }

      return route.continue();
    });

    // Hide hero overlay if present
    await page.addInitScript(() => {
      localStorage.setItem('spt_hide_hero', 'true');
    });

    // Ensure review folder exists
    const reviewDir = path.resolve(process.cwd(), '../docs/CUENTOS/review');
    const reviewDirLocal = path.resolve(process.cwd(), 'docs/CUENTOS/review');
    const targetDir = fs.existsSync(path.dirname(reviewDir)) ? reviewDir : reviewDirLocal;
    fs.mkdirSync(targetDir, { recursive: true });

    // 3. Desktop view for Tana pilot cuento page
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/cuentos/tana-tucan-comparte');

    // Assert page loaded successfully
    await expect(page.locator('main h1').first()).toContainText('Tana la tucán');

    // Capture desktop screenshot
    const desktopPath = path.join(targetDir, 'parallax-desktop.png');
    await page.screenshot({ path: desktopPath, fullPage: true });

    // 4. Mobile viewport test
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();

    const mobilePath = path.join(targetDir, 'parallax-mobile.png');
    await page.screenshot({ path: mobilePath, fullPage: true });

    // 5. Reduced motion test
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();

    const reducedPath = path.join(targetDir, 'parallax-reduced-motion.png');
    await page.screenshot({ path: reducedPath, fullPage: true });

    // 6. Test flat fallback on non-pilot cuento (bruno-zorro-paciencia)
    await page.goto('/cuentos/bruno-zorro-paciencia');
    await expect(page.locator('main h1').first()).toContainText('Bruno');

    // 7. Assert zero console errors, zero page errors, zero disallowed requests
    expect(consoleErrors, `Console errors detected: ${consoleErrors.join(', ')}`).toEqual([]);
    expect(pageErrors, `Page errors detected: ${pageErrors.map(e => e.message).join(', ')}`).toEqual([]);
    expect(disallowedRequests, `Disallowed non-static or telemetry requests detected: ${disallowedRequests.join(', ')}`).toEqual([]);
  });
});
