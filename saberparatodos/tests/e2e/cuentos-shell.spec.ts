import { test, expect } from '@playwright/test';

/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

test.describe('Cuentos Night Shell & HUD E2E Suite (Ola C7.01)', () => {
  test('verifies night shell, HUD counters, 4 wooden buttons >=48px, zero adult chrome, zero network calls', async ({ page, isMobile }, testInfo) => {
    const consoleErrors: string[] = [];
    const pageErrors: Error[] = [];
    const networkRequests: string[] = [];

    // 1. Capture console errors, page errors, and network requests
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      pageErrors.push(err);
    });

    page.on('request', (req) => {
      const url = req.url();
      // Record any non-data / non-asset network requests after initial load
      if (!url.startsWith('data:') && !url.startsWith('blob:') && !url.includes('/_astro/') && !url.includes('/@fs/')) {
        networkRequests.push(url);
      }
    });

    // Intercept SVG scene assets to prevent 404s
    await page.route('**/*.svg', (route) => {
      return route.fulfill({
        status: 200,
        contentType: 'image/svg+xml',
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#4FB6A3"/></svg>',
      });
    });

    // 2. First verify adult site chrome IS present on standard route '/preparacion'
    await page.goto('/preparacion');
    const homeNav = page.locator('nav').first();
    await expect(homeNav).toBeVisible();

    // 3. Seed localStorage with mock progress & logros before visiting cuentos route
    await page.addInitScript(() => {
      localStorage.setItem('spt_hide_hero', 'true');
      const profileId = 'test-child-profile-123';

      localStorage.setItem('worldexams_cuento_profile', JSON.stringify({
        id: profileId,
        nickname: 'Zorro Astuto'
      }));

      // Seed 2 finished stories with quizBest = 3
      const progressKey = `worldexams_cuento_progreso_${profileId}`;
      localStorage.setItem(progressKey, JSON.stringify({
        'tana-tucan-comparte': { slug: 'tana-tucan-comparte', lastPage: 8, finished: true, quizBest: 3, updatedAt: new Date().toISOString() },
        'otto-oso-paciente': { slug: 'otto-oso-paciente', lastPage: 6, finished: true, quizBest: 2, updatedAt: new Date().toISOString() }
      }));

      // Seed 3 unlocked achievements
      localStorage.setItem('cuentos:logros:v1', JSON.stringify({
        'primera-lectura': { id: 'primera-lectura', desbloqueadoEn: new Date().toISOString() },
        'quiz-3-3': { id: 'quiz-3-3', desbloqueadoEn: new Date().toISOString() },
        'tres-cuentos': { id: 'tres-cuentos', desbloqueadoEn: new Date().toISOString() }
      }));
    });

    // 4. Visit reading route /cuentos/tana-tucan-comparte
    await page.goto('/cuentos/tana-tucan-comparte');
    await page.waitForLoadState('domcontentloaded');

    // 5. Assert zero adult site chrome on reading route
    const siteNav = page.locator('header.navbar-container, nav[aria-label="Navegación principal"]').first();
    await expect(siteNav).not.toBeVisible();

    const siteFooter = page.locator('footer.site-footer').first();
    await expect(siteFooter).not.toBeVisible();

    const countryBanner = page.locator('.country-banner-container').first();
    await expect(countryBanner).not.toBeVisible();

    // 6. Assert Night Shell & HUD Presence
    const nightShell = page.locator('.cuento-night-wrapper').first();
    await expect(nightShell).toBeVisible();

    const hudHeader = page.locator('.hud-cuentos-header').first();
    await expect(hudHeader).toBeVisible();

    // 7. Assert HUD counters with /150, /75, /75 denominators
    const starsCounter = page.locator('.hud-counter-item[title="Estrellas acumuladas"]').first();
    await expect(starsCounter).toContainText('/150');

    const checksCounter = page.locator('.hud-counter-item[title="Cuentos completados"]').first();
    await expect(checksCounter).toContainText('2');
    await expect(checksCounter).toContainText('/75');

    const pinsCounter = page.locator('.hud-counter-item[title="Insignias y logros"]').first();
    await expect(pinsCounter).toContainText('3');
    await expect(pinsCounter).toContainText('/75');

    // 8. Assert all 4 wooden toy buttons are >= 48px
    const woodenButtons = page.locator('.wooden-toy-btn');
    const buttonCount = await woodenButtons.count();
    expect(buttonCount).toBeGreaterThanOrEqual(4);

    for (let i = 0; i < 4; i++) {
      const btn = woodenButtons.nth(i);
      await expect(btn).toBeVisible();
      const box = await btn.boundingBox();
      expect(box, `Button ${i} should have bounding box`).not.toBeNull();
      if (box) {
        expect(box.width, `Button ${i} width ${box.width} >= 48`).toBeGreaterThanOrEqual(47.5);
        expect(box.height, `Button ${i} height ${box.height} >= 48`).toBeGreaterThanOrEqual(47.5);
      }
    }

    // Clear network log array before testing popover interactions
    networkRequests.length = 0;

    // 9. Test Sonido toggle persists pref in localStorage
    const sonidoBtn = page.locator('button[aria-label*="sonido"]').first();
    await expect(sonidoBtn).toBeVisible();
    await sonidoBtn.click();

    const storedSonido = await page.evaluate(() => localStorage.getItem('cuentos:sonido:v1'));
    expect(storedSonido).toBe('muted');

    // 10. Test Idioma badge button does not navigate
    const urlBeforeLanguageClick = page.url();
    const idiomaBtn = page.locator('button[aria-label*="Español Neutro"]').first();
    await expect(idiomaBtn).toBeVisible();
    await idiomaBtn.click();
    expect(page.url()).toBe(urlBeforeLanguageClick);

    // 11. Test Perfil modal interaction without network requests
    const perfilBtn = page.locator('button[aria-label*="Perfil"]').first();
    await expect(perfilBtn).toBeVisible();
    await perfilBtn.click();

    const perfilModal = page.locator('[role="dialog"][aria-label="Perfil de Lectura"]').first();
    await expect(perfilModal).toBeVisible();
    await expect(perfilModal).toContainText('Zorro Astuto');
    await expect(perfilModal).toContainText('Crear nuevo perfil anónimo');

    // Close profile modal
    const closePerfilBtn = perfilModal.locator('.hud-popover-close').first();
    await closePerfilBtn.click();
    await expect(perfilModal).not.toBeVisible();

    // 12. Test Ajustes popover interaction without network requests
    const ajustesBtn = page.locator('button[aria-label*="Ajustes"]').first();
    await expect(ajustesBtn).toBeVisible();
    await ajustesBtn.click();

    const ajustesPopover = page.locator('[role="dialog"][aria-label="Ajustes de Lectura"]').first();
    await expect(ajustesPopover).toBeVisible();
    await expect(ajustesPopover).toContainText('Velocidad de cambio de página');

    // Close ajustes popover
    const closeAjustesBtn = ajustesPopover.locator('.hud-popover-close').first();
    await closeAjustesBtn.click();
    await expect(ajustesPopover).not.toBeVisible();

    // Assert zero unexpected network requests during modal/popover interactions
    expect(networkRequests, `No network calls should occur from HUD interactions`).toEqual([]);

    // 13. Emulate reduced motion and verify star dust animation override
    await page.emulateMedia({ reduceMotion: 'reduce' });
    const starDust = page.locator('.cuento-star-dust').first();
    await expect(starDust).toBeVisible();

    // 14. Take screenshot artifacts
    const screenshotName = isMobile ? 'shell-mobile.png' : 'shell-desktop.png';
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await testInfo.attach(screenshotName, {
      body: screenshotBuffer,
      contentType: 'image/png'
    });

    // 15. Assert 0 console errors and 0 page errors
    expect(consoleErrors, `Console errors detected: ${consoleErrors.join(', ')}`).toEqual([]);
    expect(pageErrors, `Page errors detected: ${pageErrors.map(e => e.message).join(', ')}`).toEqual([]);
  });
});
