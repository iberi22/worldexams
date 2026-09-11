// © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados.
import { test, expect } from '@playwright/test';

test.describe('Cuentos Door Page (PuertaLibro - Ola C7.02)', () => {
  test('renders door spotlight cover, blurb, meta chips, and actions without full story text on desktop & mobile', async ({
    page,
  }) => {
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
    await page.goto(`/cuentos/${targetSlug}/`);
    await page.waitForLoadState('networkidle');

    // Asserts page title and door elements
    await expect(page).toHaveTitle(/Tana la tucán que aprendió a compartir/i);

    // Spotlight cover frame and image
    const coverImage = page.locator('.cover-frame img');
    await expect(coverImage).toBeVisible();

    // Meta chips
    await expect(page.locator('.chip-edad')).toContainText('3-4 años');
    await expect(page.locator('.chip-valor')).toHaveText(/compartir/i);
    await expect(page.locator('.chip-habitat')).toHaveText(/selva/i);

    // Title & Characters
    await expect(page.locator('.book-title')).toHaveText('Tana la tucán que aprendió a compartir');
    await expect(page.locator('.characters-list')).toContainText('tana, tito, lila');

    // Blurb card
    const blurb = page.locator('.blurb-box');
    await expect(blurb).toBeVisible();
    await expect(blurb).toContainText('Tana la tucán que aprendió a compartir es un relato ilustrado sobre compartir');

    // Primary Action "Abrir el cuento"
    const primaryCta = page.locator('a.btn-primary-toy');
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toContainText('Abrir el cuento');
    await expect(primaryCta).toHaveAttribute('href', `/cuentos/${targetSlug}/leer/`);

    // Secondary Action "Volver al estante"
    const secondaryLink = page.locator('a.btn-secondary-shelf');
    await expect(secondaryLink).toBeVisible();
    await expect(secondaryLink).toContainText('Volver al estante');
    await expect(secondaryLink).toHaveAttribute('href', '/cuentos/');

    // Assert full story text is NOT present on the door page
    const fullStoryText = page.locator('text=Tana se acercó despacio');
    await expect(fullStoryText).toHaveCount(0);

    // Save screenshots to review/ for PR evidence
    const isMobile = page.viewportSize() ? page.viewportSize()!.width < 600 : false;
    const screenshotName = isMobile ? 'puerta-mobile.png' : 'puerta-desktop.png';
    await page.screenshot({ path: `review/${screenshotName}`, fullPage: true });

    // Console and page error assertions
    expect(consoleErrors).toHaveLength(0);
    expect(pageErrors).toHaveLength(0);
  });

  test('CTA label updates based on saved reading progress', async ({ page }) => {
    const targetSlug = 'tana-tucan-comparte';

    // Seed localStorage with progress before navigating
    await page.addInitScript(({ slug }) => {
      const profile = { id: 'test-child-uuid-1234', nickname: 'Explorador Curioso' };
      localStorage.setItem('worldexams_cuento_profile', JSON.stringify(profile));

      const progressRecords = {
        [slug]: {
          slug,
          lastPage: 4,
          finished: false,
          quizBest: 0,
          updatedAt: new Date().toISOString(),
        },
      };
      localStorage.setItem(`worldexams_cuento_progreso_${profile.id}`, JSON.stringify(progressRecords));
    }, { slug: targetSlug });

    await page.goto(`/cuentos/${targetSlug}/`);
    await page.waitForLoadState('domcontentloaded');

    const primaryCta = page.locator('a.btn-primary-toy');
    await expect(primaryCta).toContainText('Seguir en la página 4');
  });

  test('door renders and links work with JavaScript disabled (zero-JS baseline)', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    const targetSlug = 'tana-tucan-comparte';
    await page.goto(`/cuentos/${targetSlug}/`);

    // Verify SSR cover, title, blurb, and actions exist
    await expect(page.locator('.book-title')).toHaveText('Tana la tucán que aprendió a compartir');
    await expect(page.locator('.blurb-box')).toBeVisible();

    const primaryCta = page.locator('a.btn-primary-toy');
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toHaveAttribute('href', `/cuentos/${targetSlug}/leer/`);

    const secondaryLink = page.locator('a.btn-secondary-shelf');
    await expect(secondaryLink).toBeVisible();
    await expect(secondaryLink).toHaveAttribute('href', '/cuentos/');

    await context.close();
  });
});
