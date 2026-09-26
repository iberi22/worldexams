import { test, expect } from '@playwright/test';

test.describe('Cuentos Infantil Lector & Quiz E2E Suite (Wave C2.06)', () => {
  test('drives tana-tucan-comparte flow end to end with zero console/page errors', async ({ page }, testInfo) => {
    const consoleErrors: string[] = [];
    const pageErrors: Error[] = [];
    const disallowedRequests: string[] = [];

    // 1. Fail on console errors and unhandled exceptions
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      pageErrors.push(err);
    });

    // 2. Intercept requests: mock missing scene SVG images and assert zero telemetry / unauthorized requests
    await page.route('**/*', (route) => {
      const url = route.request().url();

      // Fulfill image assets to prevent 404 console errors when static files are missing in test server
      if (url.endsWith('.svg') || url.includes('/escenas/')) {
        return route.fulfill({
          status: 200,
          contentType: 'image/svg+xml',
          body: '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#4FB6A3"/></svg>',
        });
      }

      // Check for allowed static content requests (local pages/packs, fonts, local vite/astro assets)
      const isStaticAllowed =
        url.startsWith('data:') ||
        url.startsWith('blob:') ||
        url.includes('localhost') ||
        url.includes('127.0.0.1') ||
        url.includes('/cuentos') ||
        url.includes('/v1/cuentos/') ||
        url.includes('/_astro/') ||
        url.includes('/@fs/') ||
        url.includes('/@vite/') ||
        url.includes('fonts.googleapis.com') ||
        url.includes('fonts.gstatic.com');

      if (!isStaticAllowed) {
        disallowedRequests.push(url);
      }

      return route.continue();
    });

    // 3. Emulate prefers-reduced-motion for accessibility compliance
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Hide hero overlay if present
    await page.addInitScript(() => {
      localStorage.setItem('spt_hide_hero', 'true');
    });

    // 4. Open seed cuento /cuentos/tana-tucan-comparte
    await page.goto('/cuentos/tana-tucan-comparte');

    // Assert neutral Spanish title and page header
    await expect(page).toHaveTitle(/Tana la tucán que aprendió a compartir/i);
    const mainHeading = page.locator('main h1').first();
    await expect(mainHeading).toContainText('Tana la tucán que aprendió a compartir');

    // Screenshot 1: First Page / Entry
    const firstPageScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('first-page', {
      body: firstPageScreenshot,
      contentType: 'image/png',
    });

    // 5. Paginate through all 8 pages
    const pageSections = page.locator('article section');
    const totalPages = await pageSections.count();
    expect(totalPages).toBe(8);

    for (let i = 1; i <= 8; i++) {
      const pageBadge = page.locator(`text=Página ${i} de 8`).first();
      await expect(pageBadge).toBeVisible();
      // Ensure page section is visible/scrollable
      await pageSections.nth(i - 1).scrollIntoViewIfNeeded();
    }

    // Assert final page counter text is visible
    const finalPageBadge = page.locator('text=Página 8 de 8').first();
    await expect(finalPageBadge).toBeVisible();

    // 6. Read-aloud / speech controls (if present in C2.01/C2.02 UI, toggle safely without erroring)
    const readAloudBtn = page.locator('button[aria-label*="lectura"], button:has-text("Leer"), button:has-text("Escuchar"), [data-testid="read-aloud-toggle"]').first();
    if (await readAloudBtn.isVisible()) {
      await readAloudBtn.click();
      // Click again or adjust rate if controls exist
      const speedBtn = page.locator('button:has-text("1x"), button:has-text("Velocidad"), [data-testid="speed-toggle"]').first();
      if (await speedBtn.isVisible()) {
        await speedBtn.click();
      }
    }

    // 7. Interactive Hotspot (if present in C2.04 UI, tap safely)
    const hotspot = page.locator('[data-testid="hotspot"], .hotspot, button[aria-label*="hotspot"]').first();
    if (await hotspot.isVisible()) {
      await hotspot.tap().catch(() => hotspot.click());
    }

    // 8. Quiz Completion (3 questions)
    const quizSection = page.locator('section:has-text("Actividad de Comprensión"), [data-testid="cuento-quiz"]').first();
    await expect(quizSection).toBeVisible();
    await quizSection.scrollIntoViewIfNeeded();

    // Answer Question 1: Option A (Cinco)
    const q1OptionA = page.locator('text=Cinco').first();
    await expect(q1OptionA).toBeVisible();
    await q1OptionA.click();

    // Answer Question 2: Option A (Tito y Lila juntos)
    const q2OptionA = page.locator('text=Tito y Lila juntos').first();
    await expect(q2OptionA).toBeVisible();
    await q2OptionA.click();

    // Answer Question 3: Option A (Que lo compartido sabe mejor)
    const q3OptionA = page.locator('text=Que lo compartido sabe mejor').first();
    await expect(q3OptionA).toBeVisible();
    await q3OptionA.click();

    // Screenshot 2: Quiz
    const quizScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('quiz', {
      body: quizScreenshot,
      contentType: 'image/png',
    });

    // 9. Celebration & Moraleja State
    const moraleja = page.locator('text=Para Reflexionar en Familia').first();
    await expect(moraleja).toBeVisible();

    // Screenshot 3: Celebration
    const celebrationScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('celebration', {
      body: celebrationScreenshot,
      contentType: 'image/png',
    });

    // 10. Reload and confirm progress restore or clean state re-render
    await page.reload();
    await expect(page.locator('main h1').first()).toContainText('Tana la tucán que aprendió a compartir');
    await expect(page.locator('text=Página 8 de 8').first()).toBeVisible();

    // 11. Assert ZERO console errors, ZERO page errors, ZERO disallowed telemetry requests
    expect(consoleErrors, `Console errors detected: ${consoleErrors.join(', ')}`).toEqual([]);
    expect(pageErrors, `Page errors detected: ${pageErrors.map(e => e.message).join(', ')}`).toEqual([]);
    expect(disallowedRequests, `Disallowed non-static or telemetry requests detected: ${disallowedRequests.join(', ')}`).toEqual([]);
  });
});
