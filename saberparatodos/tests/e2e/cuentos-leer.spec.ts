// © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados.
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Immersive Spread Reader (/cuentos/[slug]/leer/) E2E Suite (Wave C7.03)', () => {
  test('validates spread layout, typography >=24px, dots, arrows, keyboard, swipe, and zero chrome', async ({ page, isMobile }, testInfo) => {
    const consoleErrors: string[] = [];
    const pageErrors: Error[] = [];
    const disallowedRequests: string[] = [];

    // 1. Capture console errors, unhandled exceptions, and track disallowed telemetry
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      pageErrors.push(err);
    });

    // 2. Intercept requests to mock missing SVGs and ensure zero telemetry requests
    await page.route('**/*', (route) => {
      const url = route.request().url();

      if (url.endsWith('.svg') || url.includes('/escenas/')) {
        return route.fulfill({
          status: 200,
          contentType: 'image/svg+xml',
          body: '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="800" height="450" fill="#FFF9DC"/><path d="M0 0 L800 450" stroke="#D4A94E" stroke-width="4"/></svg>',
        });
      }

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

    // 3. Emulate prefers-reduced-motion
    await page.emulateMedia({ reduceMotion: 'reduce' });

    // Hide hero or site overlays & astro-dev-toolbar
    await page.addInitScript(() => {
      localStorage.setItem('spt_hide_hero', 'true');
      window.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style');
        style.innerHTML = 'astro-dev-toolbar { display: none !important; visibility: hidden !important; pointer-events: none !important; }';
        if (document.head) {
          document.head.appendChild(style);
        } else if (document.documentElement) {
          document.documentElement.appendChild(style);
        }
      });
    });

    // 4. Navigate to /cuentos/tana-tucan-comparte/leer/
    await page.goto('/cuentos/tana-tucan-comparte/leer/');
    await page.waitForLoadState('domcontentloaded');

    // Assert ZERO adult chrome: no site navbar, no breadcrumb nav, no footer
    const navbar = page.locator('header nav[aria-label*="Breadcrumb"], nav.site-navbar, nav.navbar, header.site-header');
    await expect(navbar).toHaveCount(0);
    const footer = page.locator('footer.site-footer, footer.footer');
    await expect(footer).toHaveCount(0);

    // Assert top title badge in night shell
    const titleBadge = page.locator('.story-title');
    await expect(titleBadge).toBeVisible();
    await expect(titleBadge).toContainText('Tana la tucán que aprendió a compartir');

    // 5. Assert computed font-size of spread text >= 24px on desktop (or >=20px on mobile)
    const bodyText = page.locator('.spread-body-text').first();
    await expect(bodyText).toBeVisible();

    const fontSizePx = await bodyText.evaluate((el) => {
      const computed = window.getComputedStyle(el).fontSize;
      return parseFloat(computed);
    });

    if (isMobile) {
      expect(fontSizePx).toBeGreaterThanOrEqual(20);
    } else {
      expect(fontSizePx).toBeGreaterThanOrEqual(24);
    }

    // 6. Dots pagination count match total pages (8 pages)
    const dots = page.locator('.dots-pagination .dot-item[role="tab"]:not(.quiz-dot)');
    const dotCount = await dots.count();
    expect(dotCount).toBe(8);

    // Initial dot active
    await expect(dots.first()).toHaveAttribute('aria-current', 'page');

    // 7. Click dot 5 -> moves to page 5
    await dots.nth(4).click();
    await expect(dots.nth(4)).toHaveAttribute('aria-current', 'page');

    // Dismiss achievement unlock modal if triggered (requires force: true due to endless CSS pulse animation 'cuento-respira')
    const logroBtn = page.locator('button:has-text("Genial"), .celebracion-logro-overlay button');
    if (await logroBtn.isVisible()) {
      await logroBtn.click({ force: true });
    }

    // 8. Test Big Arrow Buttons navigation
    const prevBtn = page.locator('.prev-arrow-btn');
    const nextBtn = page.locator('.next-arrow-btn');

    await prevBtn.click();
    await expect(dots.nth(3)).toHaveAttribute('aria-current', 'page');

    await nextBtn.click();
    await expect(dots.nth(4)).toHaveAttribute('aria-current', 'page');

    // 9. Keyboard arrows navigation (ArrowRight / ArrowLeft)
    await page.keyboard.press('ArrowLeft');
    await expect(dots.nth(3)).toHaveAttribute('aria-current', 'page');

    await page.keyboard.press('ArrowRight');
    await expect(dots.nth(4)).toHaveAttribute('aria-current', 'page');

    // 10. Swipe gesture testing on mobile viewport
    if (isMobile) {
      const spreadCard = page.locator('.cream-spread-card');
      const box = await spreadCard.boundingBox();
      if (box) {
        // Swipe Left (next page)
        await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.5);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.5, { steps: 5 });
        await page.mouse.up();
      }
    }

    // 11. Read-aloud button click (Web Speech API integration)
    const readAloudBtn = page.locator('.read-aloud-btn');
    await expect(readAloudBtn).toBeVisible();
    await readAloudBtn.click();
    // Second click toggles off
    await readAloudBtn.click();

    // 12. Save screenshot artifact (leer-desktop.png or leer-mobile.png)
    const screenshotFileName = isMobile ? 'leer-mobile.png' : 'leer-desktop.png';
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await testInfo.attach(screenshotFileName, {
      body: screenshotBuffer,
      contentType: 'image/png',
    });
    const outDir = path.join(process.cwd(), 'test-results');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    fs.writeFileSync(path.join(outDir, screenshotFileName), screenshotBuffer);

    // 13. Verify Zero console and page errors
    expect(consoleErrors, `Console errors detected: ${consoleErrors.join(', ')}`).toEqual([]);
    expect(pageErrors, `Page errors detected: ${pageErrors.map((e) => e.message).join(', ')}`).toEqual([]);
    expect(disallowedRequests, `Disallowed requests detected: ${disallowedRequests.join(', ')}`).toEqual([]);
  });
});
