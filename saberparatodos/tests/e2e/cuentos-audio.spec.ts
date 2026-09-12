// © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados.
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const REVIEW_DIR = path.join(process.cwd(), '..', 'docs', 'CUENTOS', 'review');

function collectErrors(page: any) {
  const consoleErrors: string[] = [];
  const pageErrors: Error[] = [];
  page.on('console', (msg: any) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err: Error) => pageErrors.push(err));
  return { consoleErrors, pageErrors };
}

async function gotoLeer(page: any) {
  await page.addInitScript(() => {
    localStorage.setItem('spt_hide_hero', 'true');
  });
  // El dev-server Astro a veces 500ea la primera petición tras arrancar
  // ("unable to find a component instance for route"): reintentar hasta 3x.
  for (let attempt = 1; attempt <= 3; attempt++) {
    const resp = await page.goto('/cuentos/tana-tucan-comparte/leer/');
    if (resp && resp.status() === 200) break;
    if (attempt === 3) throw new Error(`leer/ devolvió ${resp?.status()} tras 3 intentos`);
    await page.waitForTimeout(2000);
  }
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('.lector-inmersivo-shell')).toBeVisible({ timeout: 20000 });
  // El SSR es visible antes de hidratar: esperar handlers vivos (onMount marca).
  await expect(page.locator('.audio-cuento[data-hydrated="true"]')).toBeVisible({ timeout: 20000 });
}

test.describe('AudioCuento C7.07 — matriz WITH / WITHOUT MP3', () => {
  test('WITH mp3s: play resalta palabra en 10s + controles + captura', async ({
    page,
    isMobile
  }, testInfo) => {
    const { consoleErrors, pageErrors } = collectErrors(page);
    await gotoLeer(page);

    const player = page.locator('.audio-cuento');
    await expect(player).toBeVisible();
    const playBtn = player.locator('.read-aloud-btn');
    await expect(playBtn).toBeVisible();
    await expect(player.locator('.player-status')).toContainText('Toca para escuchar');

    await playBtn.click();
    // Karaoke por timings del MP3: palabra resaltada en <= 10s
    const highlight = page.locator('mark.karaoke-highlight');
    await expect(highlight.first()).toBeVisible({ timeout: 10000 });
    await expect(player.locator('.player-status')).toContainText('Narrando');

    // Controles: replay + rate
    await expect(player.getByRole('button', { name: 'Repetir narración' })).toBeVisible();
    const rateBtn = player.getByRole('button', { name: /Velocidad de narración/ });
    await expect(rateBtn).toBeVisible();
    await expect(rateBtn).toContainText('0.9x');
    await rateBtn.click();
    await expect(rateBtn).toContainText('1.0x');

    // Captura paridad (palabra resaltada + controles) desktop + móvil
    const shot = await page.screenshot({ fullPage: false });
    await testInfo.attach(isMobile ? 'audio-mobile.png' : 'audio-desktop.png', {
      body: shot,
      contentType: 'image/png'
    });
    if (!fs.existsSync(REVIEW_DIR)) fs.mkdirSync(REVIEW_DIR, { recursive: true });
    fs.writeFileSync(path.join(REVIEW_DIR, isMobile ? 'audio-mobile.png' : 'audio-desktop.png'), shot);

    // Pausa: segundo click
    await playBtn.click();
    await expect(player.locator('.player-status')).toContainText('Pausado');

    expect(consoleErrors, `Console errors: ${consoleErrors.join(' | ')}`).toEqual([]);
    expect(pageErrors, `Page errors: ${pageErrors.map((e) => e.message).join(' | ')}`).toEqual([]);
  });

  test('WITHOUT mp3s (audio bloqueado): fallback sin crash + player visible', async ({ page }) => {
    const { consoleErrors, pageErrors } = collectErrors(page);
    // Simula checkout sin MP3s: el player debe caer a Web Speech sin romperse
    await page.route('**/audio/cuentos/**', (route) => route.abort());
    await gotoLeer(page);

    const player = page.locator('.audio-cuento');
    await expect(player).toBeVisible();
    const playBtn = player.locator('.read-aloud-btn');
    await playBtn.click();

    // Sin crash: o narra por fallback o vuelve a idle; el player sigue operativo
    await expect(player.locator('.player-status')).not.toBeEmpty({ timeout: 10000 });
    await expect(playBtn).toBeEnabled();
    // Replay no rompe en fallback
    await player.getByRole('button', { name: 'Repetir narración' }).click();
    await expect(player).toBeVisible();

    const hardErrors = consoleErrors.filter(
      (m) => !m.includes('net::ERR_FAILED') && !m.includes('Failed to load resource')
    );
    expect(hardErrors, `Console errors: ${hardErrors.join(' | ')}`).toEqual([]);
    expect(pageErrors, `Page errors: ${pageErrors.map((e) => e.message).join(' | ')}`).toEqual([]);
  });
});
