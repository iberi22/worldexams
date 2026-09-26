// © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados.
import { test, expect, type Page } from '@playwright/test';

/**
 * "Escena viva" (motor genérico escenas-capas/{slug}/pN.svg) sobre el cuento
 * insignia tana-tucan-comparte, dentro del lector real /cuentos/[slug]/leer/.
 * Las escenas tienen idle continuo, así que los clicks usan { force: true }
 * (Playwright nunca ve estables a los personajes que respiran: es lo buscado).
 */

async function prepararPagina(page: Page, baseURL?: string) {
  const errores: string[] = [];
  const noPermitidas: string[] = [];
  // Comparado contra el origin real (no un localhost hardcodeado), para que
  // siga siendo válido corriendo contra un preview deploy real, no solo dev local.
  const siteOrigin = new URL(baseURL || 'http://localhost').origin;
  page.on('console', (m) => m.type() === 'error' && errores.push(m.text()));
  page.on('pageerror', (e) => errores.push(e.message));
  await page.route('**/*', (route) => {
    const url = route.request().url();
    const ok =
      url.startsWith('data:') ||
      url.startsWith('blob:') ||
      url.startsWith(siteOrigin) ||
      url.includes('fonts.googleapis.com') ||
      url.includes('fonts.gstatic.com');
    if (!ok) noPermitidas.push(url);
    return route.continue();
  });
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('spt_hide_hero', 'true');
    window.addEventListener('DOMContentLoaded', () => {
      const s = document.createElement('style');
      s.textContent = 'astro-dev-toolbar{display:none!important}';
      document.head?.appendChild(s);
    });
  });
  return { errores, noPermitidas };
}

/** Espera a que las islas client:load hidraten (antes, el markup SSR no tiene handlers). */
async function esperarHidratacion(page: Page) {
  await page.waitForFunction(() => document.querySelectorAll('astro-island[ssr]').length === 0);
}

test.describe('Cuentos · escena viva (parallax + hotspots + idle + zoom + conteo)', () => {
  test('tana: capas reales, reacciones, mirar de cerca y contar mangos', async ({ page, baseURL }) => {
    const { errores, noPermitidas } = await prepararPagina(page, baseURL);
    await page.goto('/cuentos/tana-tucan-comparte/leer/');
    await esperarHidratacion(page);

    const escena = page.locator('.cuento-escena-interactiva');
    await expect(escena).toHaveAttribute('data-escena-modo', 'capas');
    const tana = page.locator('[data-hotspot="tana"]');
    await expect(tana).toHaveAttribute('role', 'button');
    await expect(tana).toHaveAttribute('aria-label', 'Tana la tucán');

    // 3 planos con contenido completo (regresión: grupos anidados + defs)
    for (const plano of ['fondo', 'medio', 'frente']) {
      expect(await page.locator(`#plano-${plano} > *`).count()).toBeGreaterThan(0);
    }
    expect(await page.locator('#plano-fondo path').count()).toBe(2); // nubes
    expect(await page.locator('#plano-frente > path').count()).toBe(1); // rama
    await expect(page.locator('svg linearGradient#bg1')).toHaveCount(1);

    // Idle: Tana respira aunque nadie toque
    const idle = tana.locator('[data-idle]').first();
    expect(await idle.evaluate((e) => getComputedStyle(e).animationName)).toBe('cuento-idle-respira');

    // Toque sobre el personaje: reacción + globo
    await tana.click({ force: true });
    await expect(tana).toHaveAttribute('data-reaccion', 'salto');
    await expect(page.getByTestId('globo-escena')).toHaveText('¡Hola! Soy Tana');

    // Mirar de cerca el árbol y contar 5 mangos
    const contenedor = page.locator('.cuento-parallax-container');
    await page.locator('[data-hotspot="arbol"] rect').first().click({ force: true });
    await expect(contenedor).toHaveAttribute('data-zoom', 'arbol');
    await page.waitForTimeout(600); // transición de cámara
    const mangos = page.locator('[data-contable]');
    await expect(mangos).toHaveCount(5);
    for (let i = 0; i < 5; i++) {
      await mangos.nth(i).click({ force: true });
      await expect(page.getByTestId('contador-cuento')).toHaveAttribute('data-n', String(i + 1));
    }
    await expect(page.getByTestId('contador-cuento')).toContainText('¡mangos!');
    await expect(page.locator('.cuento-numero-contado')).toHaveCount(5);

    // Escape sale del zoom
    await page.keyboard.press('Escape');
    await expect(contenedor).not.toHaveAttribute('data-zoom', /.+/);

    // Teclado: Enter sobre un hotspot enfocado
    await page.locator('[data-hotspot="sol"]').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-hotspot="sol"]')).toHaveAttribute('data-reaccion', 'giro');

    // Cambio de página: estado de juego reiniciado, nuevos hotspots
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('[data-hotspot="nido"]')).toHaveCount(1);
    await expect(page.getByTestId('contador-cuento')).toHaveCount(0);

    expect(errores, errores.join('\n')).toEqual([]);
    expect(noPermitidas, noPermitidas.join('\n')).toEqual([]);
  });

  test('prefers-reduced-motion: escena estática (sin idle ni parallax) pero tocable', async ({ page, baseURL }) => {
    const { errores } = await prepararPagina(page, baseURL);
    // OJO: la opción es `reducedMotion` (con "d"); `reduceMotion` se ignora en silencio.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/cuentos/tana-tucan-comparte/leer/');
    await esperarHidratacion(page);
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
    const tana = page.locator('[data-hotspot="tana"]');
    await expect(tana).toHaveCount(1);
    expect(await tana.locator('[data-idle]').first().evaluate((e) => getComputedStyle(e).animationName)).toBe('none');
    expect(await page.locator('#plano-frente').evaluate((e) => getComputedStyle(e).transform)).toBe('none');
    await tana.click();
    await expect(page.getByTestId('globo-escena')).toHaveText('¡Hola! Soy Tana');
    expect(errores, errores.join('\n')).toEqual([]);
  });

  test('cuento sin arte por capas mantiene la escena plana', async ({ page, baseURL }) => {
    const { errores } = await prepararPagina(page, baseURL);
    await page.goto('/cuentos/bruno-zorro-paciencia/leer/');
    await esperarHidratacion(page);
    await expect(page.locator('.cuento-escena-interactiva')).toHaveAttribute('data-escena-modo', 'plana');
    await expect(page.locator('.cuento-parallax-container')).toHaveCount(0);
    expect(errores, errores.join('\n')).toEqual([]);
  });
});
