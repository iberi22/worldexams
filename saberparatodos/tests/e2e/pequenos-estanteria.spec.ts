import { test, expect } from '@playwright/test';

test.describe('Pequeños: Estantería 3D y Fallback Accesible (Fase 4)', () => {
  test('1. Reduced motion -> fallback accesible activo y 3D oculto', async ({ page }) => {
    // Emular preferencia de usuario por movimiento reducido
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/pequenos');

    // El contenedor 3D debe estar oculto (aplica class:hidden={status === 'unsupported'})
    const shelf3d = page.locator('.pequenos-shelf-3d');
    await expect(shelf3d).toBeHidden();

    // La sección de respaldo 2D debe ser visible y contener enlaces a los cuentos
    const fallback = page.locator('[data-pequenos-fallback]');
    await expect(fallback).toBeVisible();

    const bookLinks = fallback.locator('a[href*="/leer/"]');
    await expect(bookLinks.first()).toBeVisible();
    const count = await bookLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('2. Sin soporte WebGL -> mismo resultado que reduced motion (fallback accesible)', async ({ page }) => {
    // Simular ausencia de WebGL interceptando getContext antes de navegar
    await page.addInitScript(() => {
      const orig = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type: string, ...args: any[]) {
        if (typeof type === 'string' && type.includes('webgl')) {
          return null;
        }
        return orig.apply(this, [type, ...args]);
      };
    });

    await page.goto('/pequenos');

    // Al no haber WebGL, status pasa a 'unsupported' -> .pequenos-shelf-3d debe estar oculto
    const shelf3d = page.locator('.pequenos-shelf-3d');
    await expect(shelf3d).toBeHidden();

    // El fallback 2D permanece sin el atributo hidden y completamente operable
    const fallback = page.locator('[data-pequenos-fallback]');
    await expect(fallback).toBeVisible();

    const bookLinks = fallback.locator('a[href*="/leer/"]');
    await expect(bookLinks.first()).toBeVisible();
    const count = await bookLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('3. Con soporte normal -> el 3D toma el control', async ({ page }) => {
    await page.goto('/pequenos');

    const shelf3d = page.locator('.pequenos-shelf-3d');
    const fallback = page.locator('[data-pequenos-fallback]');

    // Con soporte WebGL y sin reduced-motion, Three.js se importa dinámicamente y el renderer se inicializa
    // Usamos timeout generoso (10000ms) para tolerar la carga asíncrona del bundle 3D
    await expect(shelf3d).toBeVisible({ timeout: 10000 });
    await expect(fallback).toBeHidden({ timeout: 10000 });

    // Verificar que el canvas 3D está montado dentro del contenedor de la estantería
    const canvas = shelf3d.locator('canvas');
    await expect(canvas).toBeVisible();
  });
});
