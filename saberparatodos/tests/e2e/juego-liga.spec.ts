import { test, expect, type BrowserContext } from '@playwright/test';
import { buildLiga } from '../../src/lib/juego/ligas';

/**
 * juego-liga-30 — E2E liga semanal (puesto/movimiento/ventana)
 *
 * Validates deterministic on-device weekly league behavior:
 * - Seeding xpWeekly, tier resolution, and 5-row window rendering.
 * - Ascenso (▲) and descenso (▼) banner conditions for top/bottom ranks.
 * - Zero-PII simulated aliases matching Estudiante_\d{3} and player row TÚ.
 * - State determinism across page reload.
 * - Boundary conditions for rank 5 (ascenso) vs rank 6 (no movement banner).
 */

function getWeekKey(now = Date.now()): string {
  const d = new Date(new Date(now).setHours(0, 0, 0, 0));
  const day = (d.getDay() + 6) % 7; // lunes=0
  d.setDate(d.getDate() - day);
  const year = d.getFullYear();
  const jan4 = new Date(year, 0, 4);
  const week = 1 + Math.round((d.getTime() - jan4.getTime()) / 604800000);
  return `${year}-W${String(week).padStart(2, '0')}`;
}

function getTodayKey(now = Date.now()): string {
  const d = new Date(now);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

async function seedGameState(context: BrowserContext, xpWeekly: number, nodeHash = 'local') {
  const now = Date.now();
  const weekKey = getWeekKey(now);
  const today = getTodayKey(now);

  const state = {
    v: 1,
    elo: 1800,
    xpWeekly,
    weekKey,
    streakDays: 1,
    lastActiveDay: today,
    questionElo: {},
    updatedAt: now,
  };

  await context.addInitScript(({ stateJson, instanceId }) => {
    window.localStorage.setItem('wx-juego-v1', stateJson);
    if (instanceId) {
      window.localStorage.setItem('swal.worldexams.instanceId', instanceId);
    }
  }, { stateJson: JSON.stringify(state), instanceId: nodeHash });
}

test.describe.serial('Liga Semanal E2E (Wave Juego.03)', () => {
  test('1. Seed xpWeekly=1300 (Oro) renders Liga Oro, Puesto N/30, and exactly 5 mini-table rows', async ({ browser }) => {
    const context = await browser.newContext();
    await seedGameState(context, 1300);
    const page = await context.newPage();

    await page.goto('/juego/liga');

    const titleLocator = page.locator('[data-testid="liga-title"]');
    await expect(titleLocator).toBeVisible();
    await expect(titleLocator).toContainText('Liga Oro');

    const puestoLocator = page.locator('[data-testid="liga-puesto"]');
    await expect(puestoLocator).toBeVisible();
    await expect(puestoLocator).toHaveText(/Puesto \d+\/30/);

    const rowsLocator = page.locator('[data-testid="liga-row"]');
    await expect(rowsLocator).toHaveCount(5);

    await context.close();
  });

  test('2. Seed xpWeekly=99999 shows puesto 1/30 with ascenso banner ▲; seed xpWeekly=0 shows puesto 30/30 with descenso banner ▼', async ({ browser }) => {
    // Context A: High XP (puesto 1/30 + ascenso banner)
    const contextA = await browser.newContext();
    await seedGameState(contextA, 99999);
    const pageA = await contextA.newPage();
    await pageA.goto('/juego/liga');

    const puestoA = pageA.locator('[data-testid="liga-puesto"]');
    await expect(puestoA).toHaveText('Puesto 1/30');

    const movimientoA = pageA.locator('[data-testid="liga-movimiento"]');
    await expect(movimientoA).toBeVisible();
    await expect(movimientoA).toContainText('▲');
    await contextA.close();

    // Context B: Zero XP (puesto 30/30 + descenso banner)
    const contextB = await browser.newContext();
    await seedGameState(contextB, 0);
    const pageB = await contextB.newPage();
    await pageB.goto('/juego/liga');

    const puestoB = pageB.locator('[data-testid="liga-puesto"]');
    await expect(puestoB).toHaveText('Puesto 30/30');

    const movimientoB = pageB.locator('[data-testid="liga-movimiento"]');
    await expect(movimientoB).toBeVisible();
    await expect(movimientoB).toContainText('▼');
    await contextB.close();
  });

  test('3. Player row (TÚ) visible with own XP, other rows match Estudiante_\\d{3} aliases with zero PII', async ({ browser }) => {
    const context = await browser.newContext();
    await seedGameState(context, 1300);
    const page = await context.newPage();

    await page.goto('/juego/liga');

    const rowsLocator = page.locator('[data-testid="liga-row"]');
    await expect(rowsLocator).toHaveCount(5);

    const playerRow = page.locator('[data-testid="liga-row"]', { hasText: 'TÚ' });
    await expect(playerRow).toBeVisible();
    await expect(playerRow).toContainText('1300 XP');

    const rowTexts = await rowsLocator.allTextContents();
    for (const text of rowTexts) {
      if (!text.includes('TÚ')) {
        expect(text).toMatch(/Estudiante_\d{3}/);
      }
    }

    await context.close();
  });

  test('4. Page reload preserves identical puestoJugador position and row aliases deterministically', async ({ browser }) => {
    const context = await browser.newContext();
    await seedGameState(context, 1300);
    const page = await context.newPage();

    await page.goto('/juego/liga');

    const puestoBefore = await page.locator('[data-testid="liga-puesto"]').textContent();
    const rowsBefore = await page.locator('[data-testid="liga-row"]').allTextContents();

    await page.reload();

    const puestoAfter = await page.locator('[data-testid="liga-puesto"]').textContent();
    const rowsAfter = await page.locator('[data-testid="liga-row"]').allTextContents();

    expect(puestoAfter).toBe(puestoBefore);
    expect(rowsAfter).toEqual(rowsBefore);

    await context.close();
  });

  test('5. Ascenso boundary: player placed 5th shows ▲ movimiento banner, player placed 6th shows no banner', async ({ browser }) => {
    const weekKey = getWeekKey();
    const dummyLiga = buildLiga(weekKey, 0, 'local');
    const simMembers = dummyLiga.miembros.filter((m) => !m.esJugador);

    // simMembers[4].xp sets player to puestoJugador = 5 (ascenso zone)
    const xp5th = simMembers[4].xp;
    // simMembers[4].xp - 1 sets player to puestoJugador = 6 (neutral zone)
    const xp6th = simMembers[4].xp - 1;

    // Context A: 5th rank (puestoJugador = 5)
    const contextA = await browser.newContext();
    await seedGameState(contextA, xp5th);
    const pageA = await contextA.newPage();
    await pageA.goto('/juego/liga');

    await expect(pageA.locator('[data-testid="liga-puesto"]')).toHaveText('Puesto 5/30');
    const movimientoA = pageA.locator('[data-testid="liga-movimiento"]');
    await expect(movimientoA).toBeVisible();
    await expect(movimientoA).toContainText('▲');
    await contextA.close();

    // Context B: 6th rank (puestoJugador = 6)
    const contextB = await browser.newContext();
    await seedGameState(contextB, xp6th);
    const pageB = await contextB.newPage();
    await pageB.goto('/juego/liga');

    await expect(pageB.locator('[data-testid="liga-puesto"]')).toHaveText('Puesto 6/30');
    const movimientoB = pageB.locator('[data-testid="liga-movimiento"]');
    await expect(movimientoB).toHaveCount(0);
    await contextB.close();
  });
});
