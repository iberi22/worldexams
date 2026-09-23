import { test, expect } from '@playwright/test';

test.describe('Juego harness DEV (Ola Juego.04)', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/juego/harness');
    await expect(page.locator('[data-testid="juego-harness"]')).toBeVisible();
  });

  test('1. semáforo muestra 🟢🟡🔴 + narrativa del peor nodo', async ({ page }) => {
    const section = page.locator('[data-testid="harness-semaforo"]');
    await expect(section.getByText('multiplicacion')).toBeVisible();
    await expect(section.getByText('suma-denominador')).toBeVisible();
    await expect(section.getByText('simplificacion')).toBeVisible();
    await expect(section.getByText('Dominado')).toBeVisible();
    await expect(section.getByText('En desarrollo')).toBeVisible();
    await expect(section.getByText('Por mejorar')).toBeVisible();
    await expect(section.getByText(/simplificacion.*2 de 3/)).toBeVisible();
  });

  test('2. victoria muestra XP/Elo/racha/liga', async ({ page }) => {
    const section = page.locator('[data-testid="harness-victoria"]');
    await expect(section.getByText('+150 XP')).toBeVisible();
    await expect(section.getByText(/1420.*1445/)).toBeVisible();
    await expect(section.getByText(/5 días/)).toBeVisible();
    await expect(section.getByText(/Liga Oro/)).toBeVisible();
  });

  test('3. botones victoria emiten marcadores', async ({ page }) => {
    const markers: string[] = [];
    page.on('console', (msg) => {
      if (msg.text().startsWith('victoria:')) markers.push(msg.text());
    });
    await page.locator('[data-testid="victoria-otra"]').click();
    await page.locator('[data-testid="victoria-revisar"]').click();
    await expect.poll(() => markers.length, { timeout: 10000 }).toBe(2);
    expect(markers).toContain('victoria:otra');
    expect(markers).toContain('victoria:revisar');
  });

  test('4. boletín muestra los 4 campos + enlace', async ({ page }) => {
    const section = page.locator('[data-testid="harness-boletin"]');
    await expect(section.getByText('Competente')).toBeVisible();
    await expect(section.getByText(/Multiplicación/)).toBeVisible();
    await expect(section.getByText(/Simplificación/)).toBeVisible();
    await expect(section.getByText(/números primos/)).toBeVisible();
    const link = section.locator('a[href="/estudio?tema=simplificacion"]');
    await expect(link).toBeVisible();
  });

  test('5. hook surface window.__wxJuego completa', async ({ page }) => {
    const names = await page.evaluate(() => {
      const hook = (window as any).__wxJuego;
      if (!hook) return null;
      return {
        engine: Object.keys(hook.engine || {}).sort(),
        mesh: Object.keys(hook.mesh || {}).sort(),
        store: Object.keys(hook.store || {}).sort(),
      };
    });
    expect(names).not.toBeNull();
    for (const fn of [
      'computeSemaforo', 'narrar', 'recordAttempt', 'addActionXp', 'openRetry',
      'retryStatus', 'closeAttempt', 'finalScore', 'awardXp', 'applyAttempt',
      'esElegible', 'coronar', 'leerHall', 'buildLiga', 'buildTorneoSet',
    ]) {
      expect(names!.engine).toContain(fn);
    }
    expect(names!.mesh).toEqual(['createDirectory', 'createTransport']);
    expect(names!.store).toEqual(['loadState', 'saveState']);
  });
});
