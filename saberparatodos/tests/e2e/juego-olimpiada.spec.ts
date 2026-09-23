import { test, expect } from '@playwright/test';
import { seasonKey, ventanaEstado } from '../../src/lib/juego/olimpiada';

test.describe.configure({ mode: 'serial' });

test.describe('Olimpiada E2E - Elegibilidad, Opt-In y Hall of Fame', () => {
  test('1. Seed xpWeekly=100 (Bronce) -> Muestra temporada YYYY-QN y motivos de ineligibilidad', async ({ page }) => {
    const expectedSeason = seasonKey();

    await page.addInitScript(() => {
      localStorage.setItem('spt_xp_weekly', '100');
    });

    await page.goto('/juego/olimpiada');
    await page.waitForLoadState('domcontentloaded');

    const seasonLocator = page.locator('[data-testid="oli-season"]');
    await expect(seasonLocator).toBeVisible();
    await expect(seasonLocator).toHaveText(expectedSeason);

    const motivosLocator = page.locator('[data-testid="oli-motivos"]');
    await expect(motivosLocator).toBeVisible();
    await expect(motivosLocator).toContainText('Requiere al menos 2 semanas en rango Oro+');
    await expect(motivosLocator).toContainText('Requiere haber completado al menos 1 simulacro oficial');
  });

  test('2. Seed xpWeekly=1500 (Oro) -> Sigue siendo inelegible por evidencia parcial (falta simulacro)', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('spt_xp_weekly', '1500');
    });

    await page.goto('/juego/olimpiada');
    await page.waitForLoadState('domcontentloaded');

    const motivosLocator = page.locator('[data-testid="oli-motivos"]');
    await expect(motivosLocator).toBeVisible();
    // Documents partial-evidence behavior: only 1 Oro week + 0 mocks -> mock motive visible
    await expect(motivosLocator).toContainText('Requiere haber completado al menos 1 simulacro oficial');
  });

  test('3. Opt-in button es ausente cuando es inelegible & wx-juego-olimpiada-optin persiste en localStorage', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('spt_xp_weekly', '100');
      localStorage.setItem('wx-juego-olimpiada-optin', '1');
    });

    await page.goto('/juego/olimpiada');
    await page.waitForLoadState('domcontentloaded');

    // Button "Quiero competir" should be absent when ineligible
    const optInBtn = page.locator('button[data-testid="oli-optin"]');
    await expect(optInBtn).toHaveCount(0);

    // Verify localStorage key roundtrip persistence upon reload
    const storedOptIn = await page.evaluate(() => localStorage.getItem('wx-juego-olimpiada-optin'));
    expect(storedOptIn).toBe('1');

    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    const storedOptInAfterReload = await page.evaluate(() => localStorage.getItem('wx-juego-olimpiada-optin'));
    expect(storedOptInAfterReload).toBe('1');
  });

  test('4. Hall of Fame renderiza entradas sembradas via wx-juego-hall-v1 y estado vacío', async ({ page }) => {
    // First, verify empty state
    await page.goto('/juego/olimpiada');
    await page.waitForLoadState('domcontentloaded');

    const hallLocator = page.locator('[data-testid="oli-hall"]');
    await expect(hallLocator).toBeVisible();
    await expect(hallLocator).toContainText('No hay campeones registrados aún para este período.');

    // Now seed Hall entry in localStorage
    await page.evaluate(() => {
      localStorage.setItem(
        'wx-juego-hall-v1',
        JSON.stringify([{ alias: 'Estudiante_7', pais: 'co', season: '2026-Q1' }])
      );
    });

    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    await expect(hallLocator).toContainText('Estudiante_7 · CO · 2026-Q1');
  });

  test('5. Ventana badge coincide con el estado computado (abierta/futura) y seasonKey', async ({ page }) => {
    const computedState = ventanaEstado();
    const computedSeason = seasonKey();

    await page.goto('/juego/olimpiada');
    await page.waitForLoadState('domcontentloaded');

    const estadoLocator = page.locator('[data-testid="oli-estado"]');
    await expect(estadoLocator).toBeVisible();

    // Assert text pattern match: abierta, futura, or cerrada
    await expect(estadoLocator).toHaveText(new RegExp(`Ventana\\s+${computedState}`, 'i'));
    await expect(estadoLocator).toHaveText(/(abierta|futura|cerrada)/i);

    const seasonLocator = page.locator('[data-testid="oli-season"]');
    await expect(seasonLocator).toHaveText(computedSeason);
  });
});
