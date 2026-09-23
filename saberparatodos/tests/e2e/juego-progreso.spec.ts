import { test, expect } from '@playwright/test';

/**
 * juego-progreso.spec.ts — E2E test suite for /juego hub state.
 *
 * Verifies Elo, tier, streak, XP, badges, and navigation links.
 */

function dayKey(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function weekKey(ts: number): string {
  const d = new Date(new Date(ts).setHours(0, 0, 0, 0));
  const day = (d.getDay() + 6) % 7; // lunes=0
  d.setDate(d.getDate() - day);
  const year = d.getFullYear();
  const jan4 = new Date(year, 0, 4);
  const week = 1 + Math.round((d.getTime() - jan4.getTime()) / 604800000);
  return `${year}-W${String(week).padStart(2, '0')}`;
}

test.describe('juego-progreso — E2E hub state', () => {
  test.describe.configure({ mode: 'serial' });

  test('fresh profile shows default Elo 1800, Bronce tier, 50 XP and 1d streak', async ({ page, context }) => {
    await context.addInitScript(() => {
      window.localStorage.removeItem('wx-juego-v1');
      window.localStorage.removeItem('wx-juego-insignias-v1');
    });

    await page.goto('/juego');

    await expect(page.getByTestId('juego-elo')).toHaveText('1800');
    await expect(page.getByTestId('juego-tier')).toHaveText('Liga Bronce');
    await expect(page.getByTestId('juego-xp')).toHaveText('50');
    await expect(page.getByTestId('juego-racha')).toContainText('1d');
  });

  test('seeded state shows Elo 1500, Oro tier, 1300 XP and 4d streak', async ({ page, context }) => {
    const now = Date.now();
    const today = dayKey(now);
    const currentWeek = weekKey(now);

    const seededState = {
      v: 1,
      elo: 1500,
      xpWeekly: 1300,
      weekKey: currentWeek,
      streakDays: 4,
      lastActiveDay: today,
      questionElo: {},
      updatedAt: now,
    };

    await context.addInitScript(({ state }) => {
      window.localStorage.setItem('wx-juego-v1', JSON.stringify(state));
    }, { state: seededState });

    await page.goto('/juego');

    await expect(page.getByTestId('juego-elo')).toHaveText('1500');
    await expect(page.getByTestId('juego-tier')).toHaveText('Liga Oro');
    await expect(page.getByTestId('juego-xp')).toHaveText('1300');
    await expect(page.getByTestId('juego-racha')).toContainText('4d');
  });

  test('streak continuation from yesterday increments streak to 5d and adds 50 XP', async ({ page, context }) => {
    const now = Date.now();
    const yesterday = dayKey(now - 86_400_000);
    const currentWeek = weekKey(now);

    const seededState = {
      v: 1,
      elo: 1500,
      xpWeekly: 1300,
      weekKey: currentWeek,
      streakDays: 4,
      lastActiveDay: yesterday,
      questionElo: {},
      updatedAt: now - 86_400_000,
    };

    await context.addInitScript(({ state }) => {
      window.localStorage.setItem('wx-juego-v1', JSON.stringify(state));
    }, { state: seededState });

    await page.goto('/juego');

    await expect(page.getByTestId('juego-elo')).toHaveText('1500');
    await expect(page.getByTestId('juego-tier')).toHaveText('Liga Oro');
    await expect(page.getByTestId('juego-xp')).toHaveText('1350');
    await expect(page.getByTestId('juego-racha')).toContainText('5d');
  });

  test('seeded badges display unlocked goat badge', async ({ page, context }) => {
    const seededBadges = {
      'goat-2026-q3-co': {
        id: 'goat-2026-q3-co',
        desbloqueadoEn: new Date().toISOString(),
      },
    };

    await context.addInitScript(({ badges }) => {
      window.localStorage.setItem('wx-juego-insignias-v1', JSON.stringify(badges));
    }, { badges: seededBadges });

    await page.goto('/juego');

    const badgesContainer = page.getByTestId('juego-insignias');
    await expect(badgesContainer).toBeVisible();
    await expect(badgesContainer).toContainText('goat-2026-q3-co');
  });

  test('navigation links for liga and olimpiada work correctly', async ({ page }) => {
    await page.goto('/juego');

    await page.click('a[href="/juego/liga"]');
    await page.waitForURL('**/juego/liga');
    expect(page.url()).toContain('/juego/liga');

    await page.goto('/juego');
    await page.click('a[href="/juego/olimpiada"]');
    await page.waitForURL('**/juego/olimpiada');
    expect(page.url()).toContain('/juego/olimpiada');
  });
});
