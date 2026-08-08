import { test, expect } from '@playwright/test';

const it = test;
const describe = test.describe;

describe('verify MX tenant-aware pages', () => {
  it('should verify Guia Examen', async ({ page }) => {
    await page.goto('http://localhost:4321/guia-examen');
    await expect(page.locator('text=EXANI-II en detalle')).toBeVisible();
    await page.screenshot({ path: 'verify_mx_guia.png', fullPage: true });
  });

  it('should verify NotebookLM', async ({ page }) => {
    await page.goto('http://localhost:4321/notebooklm');
    await expect(page.locator('text=EXANI-II')).toBeVisible();
    await expect(page.locator('text=CENEVAL')).toBeVisible();
    await page.screenshot({ path: 'verify_mx_notebooklm.png', fullPage: true });
  });

  it('should verify Normas CENEVAL for MX', async ({ page }) => {
    await page.goto('http://localhost:4321/normas-men');
    await expect(page.locator('text=LINEAMIENTOS CENEVAL')).toBeVisible();
    await expect(page.locator('text=Pensamiento Matemático')).toBeVisible();
    await page.screenshot({ path: 'verify_mx_normas.png', fullPage: true });
  });

  it('should verify Sistema Inteligencia', async ({ page }) => {
    await page.goto('http://localhost:4321/faq/sistema-inteligencia');
    await expect(page.locator('text=Estimación EXANI-II')).toBeVisible();
    await page.screenshot({ path: 'verify_mx_sistema.png', fullPage: true });
  });
});
