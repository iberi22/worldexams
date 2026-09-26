/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */
import { test, expect } from '@playwright/test';

test.describe('Módulo Cuentos - Tipografías Locales (Andika & Fredoka)', () => {
  test('Verifica tipografías cargadas, estilos computados y cero peticiones CDN externas', async ({ page, baseURL }, testInfo) => {
    const isMobile = testInfo.project.name.includes('mobile');
    const screenshotName = isMobile ? 'fuentes-mobile.png' : 'fuentes-desktop.png';

    const consoleErrors: string[] = [];
    const pageErrors: Error[] = [];
    const cuentosFontCdnRequests: string[] = [];

    // Monitorear errores en consola y errores no capturados
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      pageErrors.push(err);
    });

    // Listener de red: detectar cualquier intento de llamada a CDN de fuentes para Andika o Fredoka o fontsource externo.
    // Comparado contra el origin real de baseURL (no un localhost hardcodeado), para que
    // siga siendo válido corriendo contra un preview deploy real, no solo dev local.
    const siteOrigin = new URL(baseURL || 'http://localhost').origin;
    page.on('request', (request) => {
      const url = request.url();
      if (/andika|fredoka/i.test(url) && /https?:\/\//i.test(url) && !url.startsWith(siteOrigin)) {
        cuentosFontCdnRequests.push(url);
      }
    });

    // 1. Navegar a la página de lectura del cuento
    await page.goto('/cuentos/tana-tucan-comparte/', { waitUntil: 'networkidle' });

    // 2. Verificar que las fuentes Andika y Fredoka están disponibles en document.fonts
    const fontsLoaded = await page.evaluate(async () => {
      await document.fonts.ready;
      return {
        andikaLoaded: document.fonts.check('400 16px Andika'),
        fredokaLoaded: document.fonts.check('800 16px Fredoka') || document.fonts.check('700 16px Fredoka') || document.fonts.check('500 16px Fredoka')
      };
    });

    expect(fontsLoaded.andikaLoaded).toBe(true);
    expect(fontsLoaded.fredokaLoaded).toBe(true);

    // 3. Assert el font-family computado en el texto del cuento (Andika)
    const storyText = page.locator('.story-text').first();
    await expect(storyText).toBeVisible();
    const computedBodyFont = await storyText.evaluate((el) => window.getComputedStyle(el).fontFamily);
    expect(computedBodyFont.toLowerCase()).toContain('andika');

    // 4. Assert el font-family computado en el título del cuento (Fredoka)
    const titleText = page.locator('.cuento-fuente-display').first();
    await expect(titleText).toBeVisible();
    const computedDisplayFont = await titleText.evaluate((el) => window.getComputedStyle(el).fontFamily);
    expect(computedDisplayFont.toLowerCase()).toContain('fredoka');

    // 5. Assert cero llamadas externas a CDNs para fuentes de cuentos (Andika/Fredoka)
    expect(cuentosFontCdnRequests).toEqual([]);

    // 6. Assert cero errores de consola o excepciones no capturadas
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);

    // 7. Capturar captura de pantalla de evidencia
    await page.screenshot({ path: `tests/e2e/${screenshotName}`, fullPage: true });
  });
});
