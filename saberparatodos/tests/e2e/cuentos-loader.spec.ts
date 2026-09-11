// © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados.
import { test, expect } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';

test.describe('Cuentos Loader & Quiz Option Portraits (Ola C7.08)', () => {
  test('renders CargandoCuento component and option portraits in quiz with zero console errors', async ({ page }) => {
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

    const targetSlug = 'tana-tucan-comparte';

    // 1. Check door page loader slot reachability
    await page.goto(`/cuentos/${targetSlug}/`);
    await page.waitForLoadState('networkidle');

    const loaderSlot = page.locator('#cargando-cuento-door-slot');
    await expect(loaderSlot).toHaveCount(1);
    const loaderRoot = loaderSlot.locator('.cargando-cuento-root');
    await expect(loaderRoot).toHaveCount(1);

    // Assert loader moon & playful copy line structure
    await expect(loaderSlot.locator('.sleeping-moon-svg')).toHaveCount(1);
    await expect(loaderSlot.locator('.loader-line')).toContainText(/Ordenando|Despertando|Acomodando|Afilando|Cargando/);

    // 2. Navigate to immersive reader
    await page.goto(`/cuentos/${targetSlug}/leer/`);
    await page.waitForLoadState('networkidle');
    await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });

    // Click quiz dot in bottom navigation to switch to Quiz mode
    const quizDot = page.locator('.dots-pagination .quiz-dot');
    await expect(quizDot).toBeVisible();
    await quizDot.click({ force: true });

    // Dismiss any achievement modals if unlocked
    const celebrationBtn = page.locator('.celebration-modal .celebration-btn');
    while (await celebrationBtn.isVisible()) {
      await celebrationBtn.click({ force: true });
      await page.waitForTimeout(200);
    }

    // Assert Quiz component is mounted
    const quizContainer = page.locator('.quiz-container');
    await expect(quizContainer).toBeVisible();

    // 3. Question 1 has numerical options (Cinco, Tres, Dos) -> renders generic SVG motifs
    const optionBtnsQ1 = page.locator('.options-grid .option-btn');
    await expect(optionBtnsQ1).toHaveCount(3);

    // Select correct option (Option A "Cinco")
    await optionBtnsQ1.nth(0).click({ force: true });

    // Click "Siguiente pregunta ➔" button which appears inside action-footer when option is correct
    const nextBtn = page.locator('.next-btn');
    await expect(nextBtn).toBeVisible();
    await nextBtn.click({ force: true });

    // Question 2 is: "¿Quién ayudó a Tana a recuperar los mangos?"
    // Option A: "Tito y Lila juntos", Option B: "Solo Tito", Option C: "Nadie, los perdió"
    // Options A and B name personajes ("tito" / "lila"), rendering character portrait img
    const portraitImages = page.locator('.options-grid .option-portrait');
    await expect(portraitImages.first()).toBeVisible();
    const portraitCount = await portraitImages.count();
    expect(portraitCount).toBeGreaterThan(0);

    // Verify accessibility attributes on portraits
    for (let i = 0; i < portraitCount; i++) {
      const img = portraitImages.nth(i);
      await expect(img).toHaveAttribute('alt', '');
      await expect(img).toHaveAttribute('aria-hidden', 'true');
    }

    // Capture Quiz screenshot for visual review
    const isMobile = page.viewportSize() ? page.viewportSize()!.width < 600 : false;
    const reviewDir = path.resolve(process.cwd(), 'docs/CUENTOS/review');
    if (!fs.existsSync(reviewDir)) {
      fs.mkdirSync(reviewDir, { recursive: true });
    }

    const screenshotQuizName = isMobile ? 'quiz-loader-mobile.png' : 'quiz-loader-desktop.png';
    await page.screenshot({ path: path.join(reviewDir, screenshotQuizName), fullPage: true });

    // 4. Test right/wrong feedback banner logic on option selection in Question 2
    const firstOptionQ2 = page.locator('.options-grid .option-btn').nth(0);
    await firstOptionQ2.click({ force: true });

    const feedbackBannerQ2 = page.locator('.feedback-banner');
    await expect(feedbackBannerQ2).toBeVisible();

    // Assert no console or runtime page errors occurred
    expect(consoleErrors).toHaveLength(0);
    expect(pageErrors).toHaveLength(0);
  });
});
