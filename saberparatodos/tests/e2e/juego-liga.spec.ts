import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('E2E Liga Semanal', () => {
  test('Seed xpWeekly=1300 (Oro) muestra Liga Oro, Puesto N/30 y exactamente 5 filas', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/juego/liga');
    await page.evaluate(() => {
      localStorage.setItem('spt_xp_weekly', '1300');
    });
    await page.reload();

    const ligaTitle = page.locator('[data-testid="liga-title"]');
    await expect(ligaTitle).toContainText('Liga Oro');

    const puestoElement = page.locator('[data-testid="liga-puesto"]');
    await expect(puestoElement).toContainText('/30');

    const rows = page.locator('[data-testid="liga-row"]');
    await expect(rows).toHaveCount(5);

    await context.close();
  });

  test('Puesto 1/30 muestra ascenso banner ▲ y puesto 30/30 muestra descenso banner ▼', async ({ browser }) => {
    // Seed 1: xpWeekly=99999 -> puesto 1/30 y ▲
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    await page1.goto('/juego/liga');
    await page1.evaluate(() => {
      localStorage.setItem('spt_xp_weekly', '99999');
    });
    await page1.reload();

    const puestoJugador1 = page1.locator('[data-testid="liga-puesto"]');
    await expect(puestoJugador1).toContainText('#1');

    const movimiento1 = page1.locator('[data-testid="liga-movimiento"]');
    await expect(movimiento1).toContainText('▲');
    await context1.close();

    // Seed 2: xpWeekly=0 -> puesto 30/30 y ▼
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.goto('/juego/liga');
    await page2.evaluate(() => {
      localStorage.setItem('spt_xp_weekly', '0');
    });
    await page2.reload();

    const puestoJugador2 = page2.locator('[data-testid="liga-puesto"]');
    await expect(puestoJugador2).toContainText('#30');

    const movimiento2 = page2.locator('[data-testid="liga-movimiento"]');
    await expect(movimiento2).toContainText('▼');
    await context2.close();
  });

  test('Fila del jugador TÚ es visible con su propio XP y resto de filas corresponden a Estudiante_NNN', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/juego/liga');
    await page.evaluate(() => {
      localStorage.setItem('spt_xp_weekly', '1300');
    });
    await page.reload();

    const playerRow = page.locator('[data-testid="liga-row"]', { hasText: 'TÚ' });
    await expect(playerRow).toBeVisible();
    await expect(playerRow).toContainText('1300 XP');

    const allRows = page.locator('[data-testid="liga-row"]');
    const count = await allRows.count();

    for (let i = 0; i < count; i++) {
      const text = await allRows.nth(i).innerText();
      if (!text.includes('TÚ')) {
        expect(text).toMatch(/Estudiante_\d{3}/);
      }
    }

    await context.close();
  });

  test('Reload mantiene exactamente el mismo puesto y los mismos alias deterministas', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/juego/liga');
    await page.evaluate(() => {
      localStorage.setItem('spt_xp_weekly', '1300');
    });
    await page.reload();

    const initialPuesto = await page.locator('[data-testid="liga-puesto"]').innerText();
    const initialRowsText = await page.locator('[data-testid="liga-row"]').allInnerTexts();

    await page.reload();

    const reloadedPuesto = await page.locator('[data-testid="liga-puesto"]').innerText();
    const reloadedRowsText = await page.locator('[data-testid="liga-row"]').allInnerTexts();

    expect(reloadedPuesto).toBe(initialPuesto);
    expect(reloadedRowsText).toEqual(initialRowsText);

    await context.close();
  });

  test('Consistencia de banners y movimiento entre reloads en límites de liga', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/juego/liga');
    await page.evaluate(() => {
      localStorage.setItem('spt_xp_weekly', '1300');
    });
    await page.reload();

    const movimientoBefore = await page.locator('[data-testid="liga-movimiento"]').isVisible();

    await page.reload();

    const movimientoAfter = await page.locator('[data-testid="liga-movimiento"]').isVisible();

    expect(movimientoAfter).toBe(movimientoBefore);

    await context.close();
  });
});
