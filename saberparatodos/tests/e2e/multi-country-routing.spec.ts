import { test, expect } from '@playwright/test';

test.describe('Multi-Country Geo-Routing & Fallback Tenant Smoke Suite (Wave 5.02)', () => {
  test('verifies query parameter tenant overrides for MX, AR, CL, PE', async ({ page }) => {
    // Mexico (MX)
    await page.goto('/?country=mx');
    await expect(page).toHaveTitle(/México|EXANI|WorldExams|Saber/i);
    const bodyMX = await page.locator('body').innerText();
    expect(bodyMX).toMatch(/CENEVAL|SEP|EXANI|COMIPEMS/i);

    // Argentina (AR)
    await page.goto('/?country=ar');
    await expect(page).toHaveTitle(/Argentina|Aprender|WorldExams|Saber/i);
    const bodyAR = await page.locator('body').innerText();
    expect(bodyAR).toMatch(/Aprender|Ministerio de Educación/i);

    // Chile (CL)
    await page.goto('/?country=cl');
    await expect(page).toHaveTitle(/Chile|PAES|WorldExams|Saber/i);
    const bodyCL = await page.locator('body').innerText();
    expect(bodyCL).toMatch(/PAES|DEMRE|MINEDUC/i);

    // Perú (PE)
    await page.goto('/?country=pe');
    await expect(page).toHaveTitle(/Perú|Peru|ECE|WorldExams|Saber/i);
    const bodyPE = await page.locator('body').innerText();
    expect(bodyPE).toMatch(/ECE|MINEDU|UMC/i);
  });

  test('verifies navigating to /practica with country parameter loads country-specific subjects', async ({ page, context }) => {
    // Set cookie for Chile or navigate directly with query param
    await context.addCookies([{ name: 'spt_country', value: 'CL', domain: 'localhost', path: '/' }]);
    await page.goto('/practica?country=cl');
    const bodyCL = await page.locator('body').innerText();
    expect(bodyCL).toMatch(/PAES|DEMRE|Lenguaje|Historia|Matemática/i);

    // Set cookie for Peru or navigate directly with query param
    await context.addCookies([{ name: 'spt_country', value: 'PE', domain: 'localhost', path: '/' }]);
    await page.goto('/practica?country=pe');
    const bodyPE = await page.locator('body').innerText();
    expect(bodyPE).toMatch(/ECE|Comunicación|Ciencia y Tecnología/i);
  });

  test('verifies default fallback to Colombia when visiting / without query params', async ({ page }) => {
    await page.goto('/');
    const bodyCO = await page.locator('body').innerText();
    expect(bodyCO).toMatch(/ICFES|Saber 11|M\.E\.N\.|Colombia/i);
  });
});
