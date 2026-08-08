import { test, expect } from '@playwright/test';

test('verify MX tenant-aware pages', async ({ page }) => {
  // 1. Guia Examen
  await page.goto('http://localhost:4321/guia-examen');
  await expect(page.locator('text=EXANI-II en detalle')).toBeVisible();
  await page.screenshot({ path: 'verify_mx_guia.png', fullPage: true });

  // 2. NotebookLM
  await page.goto('http://localhost:4321/notebooklm');
  await expect(page.locator('text=EXANI-II').first()).toBeVisible();
  await expect(page.locator('text=CENEVAL').first()).toBeVisible();
  await page.screenshot({ path: 'verify_mx_notebooklm.png', fullPage: true });

  // 3. Normas MEN (should be Normas CENEVAL for MX)
  await page.goto('http://localhost:4321/normas-men');
  await expect(page.locator('text=LINEAMIENTOS CENEVAL').first()).toBeVisible();
  // Competencies should be visible
  await expect(page.locator('text=Pensamiento Matemático').first()).toBeVisible();
  await page.screenshot({ path: 'verify_mx_normas.png', fullPage: true });

  // 4. Sistema Inteligencia
  await page.goto('http://localhost:4321/faq/sistema-inteligencia');
  // It should mention EXANI-II in the text if scoreSemantics was updated correctly
  await expect(page.locator('text=Estimacion de practica EXANI-II').first()).toBeVisible();
  await page.screenshot({ path: 'verify_mx_sistema.png', fullPage: true });
});
