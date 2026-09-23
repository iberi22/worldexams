import { test, expect } from '@playwright/test';
import { seasonKey, ventanaEstado } from '../../src/lib/juego/olimpiada';

const GAME_STORAGE_KEY = 'wx-juego-v1';
const OPTIN_KEY = 'wx-juego-olimpiada-optin';
const HALL_STORAGE_KEY = 'wx-juego-hall-v1';

function computeWeekKey(ts: number): string {
  const d = new Date(new Date(ts).setHours(0, 0, 0, 0));
  const day = (d.getDay() + 6) % 7; // lunes=0
  d.setDate(d.getDate() - day);
  const year = d.getFullYear();
  const jan4 = new Date(year, 0, 4);
  const week = 1 + Math.round((d.getTime() - jan4.getTime()) / 604800000);
  return `${year}-W${String(week).padStart(2, '0')}`;
}

function createGameState(xpWeekly: number, now: number = Date.now()) {
  return {
    v: 1,
    elo: 1800,
    xpWeekly,
    weekKey: computeWeekKey(now),
    streakDays: 0,
    lastActiveDay: null,
    questionElo: {},
    updatedAt: now,
  };
}

test.describe.configure({ mode: 'serial' });

test.describe('Olimpiada trimestral E2E (/juego/olimpiada)', () => {
  test('1. shows expected season label and ineligibility motives when seeded with low XP (Bronce)', async ({ page }) => {
    const now = Date.now();
    const expectedSeason = seasonKey(now);
    const state = createGameState(100, now);

    await page.addInitScript(
      ({ key, gameState }) => {
        localStorage.setItem(key, JSON.stringify(gameState));
      },
      { key: GAME_STORAGE_KEY, gameState: state },
    );

    await page.goto('/juego/olimpiada');

    const seasonHeading = page.getByTestId('oli-season');
    await expect(seasonHeading).toBeVisible();
    await expect(seasonHeading).toContainText(`Olimpiada ${expectedSeason}`);

    const motivos = page.getByTestId('oli-motivos');
    await expect(motivos).toBeVisible();
    await expect(motivos).toContainText('Necesitas Oro+ en 2 semanas (llevas 0).');
    await expect(motivos).toContainText('Necesitas 1 simulacro oficial');
  });

  test('2. shows partial-evidence ineligibility motives when seeded with Oro XP (1500 XP)', async ({ page }) => {
    const now = Date.now();
    const state = createGameState(1500, now);

    await page.addInitScript(
      ({ key, gameState }) => {
        localStorage.setItem(key, JSON.stringify(gameState));
      },
      { key: GAME_STORAGE_KEY, gameState: state },
    );

    await page.goto('/juego/olimpiada');

    const motivos = page.getByTestId('oli-motivos');
    await expect(motivos).toBeVisible();
    await expect(motivos).toContainText('Necesitas Oro+ en 2 semanas (llevas 1).');
    await expect(motivos).toContainText('Necesitas 1 simulacro oficial');
  });

  test('3. asserts opt-in button is absent when ineligible, and verifies opt-in localStorage key wx-juego-olimpiada-optin roundtrip', async ({ page }) => {
    const now = Date.now();
    const state = createGameState(100, now);

    await page.addInitScript(
      ({ key, gameState }) => {
        localStorage.setItem(key, JSON.stringify(gameState));
      },
      { key: GAME_STORAGE_KEY, gameState: state },
    );

    await page.goto('/juego/olimpiada');

    const optInElement = page.getByTestId('oli-optin');
    await expect(optInElement).toHaveCount(0);

    // Verify localStorage key wx-juego-olimpiada-optin setting
    await page.evaluate(
      ({ key }) => {
        localStorage.setItem(key, '1');
      },
      { key: OPTIN_KEY },
    );

    await page.reload();

    const storedValue = await page.evaluate(
      ({ key }) => localStorage.getItem(key),
      { key: OPTIN_KEY },
    );
    expect(storedValue).toBe('1');
  });

  test('4. renders seeded Hall of Fame entries wx-juego-hall-v1 and displays empty state when hall is empty', async ({ page }) => {
    await page.goto('/juego/olimpiada');

    const hallSection = page.getByTestId('oli-hall');
    await expect(hallSection).toBeVisible();
    await expect(hallSection).toContainText('Aún sin campeones registrados en este dispositivo.');

    const mockHallData = [{ alias: 'Estudiante_7', pais: 'co', season: '2026-Q1' }];

    // Seed Hall of Fame using key wx-juego-hall-v1
    await page.evaluate(
      ({ key, data }) => {
        localStorage.setItem(key, JSON.stringify(data));
      },
      { key: HALL_STORAGE_KEY, data: mockHallData },
    );

    await page.reload();

    await expect(hallSection).toContainText('Estudiante_7 · CO · 2026-Q1');
  });

  test('5. verifies status badge text matches computed ventanaEstado and seasonKey calendar rule', async ({ page }) => {
    const now = Date.now();
    const expectedSeason = seasonKey(now);
    const expectedEstado = ventanaEstado(expectedSeason, now);

    await page.goto('/juego/olimpiada');

    const seasonBadge = page.getByTestId('oli-season');
    await expect(seasonBadge).toContainText(`Olimpiada ${expectedSeason}`);

    const estadoBadge = page.getByTestId('oli-estado');
    await expect(estadoBadge).toBeVisible();

    const text = await estadoBadge.innerText();
    expect(text).toMatch(/(ventana abierta|abre al cierre|temporada cerrada)/);

    if (expectedEstado === 'abierta') {
      expect(text).toContain('ventana abierta');
    } else if (expectedEstado === 'futura') {
      expect(text).toContain('abre al cierre');
    } else {
      expect(text).toContain('temporada cerrada');
    }
  });
});
