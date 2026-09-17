import { test, expect } from '@playwright/test';

test.describe('New Host Country Routing Smoke Suite (@newhost @remote-host)', () => {
  const targetBaseURL = process.env.PLAYWRIGHT_BASE_URL || 'https://worldexam.swal.network';
  const isLocalDefaultRun = !process.env.PLAYWRIGHT_BASE_URL && !process.env.RUN_NEW_HOST_TESTS;

  test.beforeEach(async () => {
    test.skip(
      isLocalDefaultRun,
      'Skipping new host country routing spec on local default run. Set PLAYWRIGHT_BASE_URL or RUN_NEW_HOST_TESTS=1 to execute.'
    );
  });

  test('verifies query parameter tenant overrides for MX, AR, CL, PE on new host', async ({ page }) => {
    // Mexico (MX)
    await page.goto('/?country=mx');
    await expect(page).toHaveTitle(/México|Mexico|EXANI|WorldExams|Saber/i);
    const bodyMX = await page.locator('body').innerText();
    expect(bodyMX).toMatch(/CENEVAL|SEP|EXANI|COMIPEMS|México|Mexico/i);

    // Argentina (AR)
    await page.goto('/?country=ar');
    await expect(page).toHaveTitle(/Argentina|Aprender|WorldExams|Saber/i);
    const bodyAR = await page.locator('body').innerText();
    expect(bodyAR).toMatch(/Aprender|Ministerio de Educación|Argentina/i);

    // Chile (CL)
    await page.goto('/?country=cl');
    await expect(page).toHaveTitle(/Chile|PAES|WorldExams|Saber/i);
    const bodyCL = await page.locator('body').innerText();
    expect(bodyCL).toMatch(/PAES|DEMRE|MINEDUC|Chile/i);

    // Perú (PE)
    await page.goto('/?country=pe');
    await expect(page).toHaveTitle(/Perú|Peru|ECE|WorldExams|Saber/i);
    const bodyPE = await page.locator('body').innerText();
    expect(bodyPE).toMatch(/ECE|MINEDU|UMC|Perú|Peru/i);
  });

  test('verifies default fallback to Colombia (CO) when visiting / without query params', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/ICFES|SaberParaTodos|Colombia|Saber 11/i);
    const bodyCO = await page.locator('body').innerText();
    expect(bodyCO).toMatch(/ICFES|Saber 11|M\.E\.N\.|Colombia|SaberParaTodos/i);
  });

  test('verifies spt_country cookie persistence across page navigations', async ({ page, context }) => {
    const hostDomain = new URL(targetBaseURL).hostname;

    // Set cookie for Chile and navigate to / without query parameter
    await context.addCookies([{ name: 'spt_country', value: 'CL', domain: hostDomain, path: '/' }]);
    await page.goto('/');
    await expect(page).toHaveTitle(/Chile|PAES|WorldExams/i);
    const bodyCL = await page.locator('body').innerText();
    expect(bodyCL).toMatch(/PAES|DEMRE|MINEDUC|Chile/i);

    // Set cookie for Peru and navigate to / without query parameter
    await context.addCookies([{ name: 'spt_country', value: 'PE', domain: hostDomain, path: '/' }]);
    await page.goto('/');
    await expect(page).toHaveTitle(/Perú|Peru|ECE|WorldExams/i);
    const bodyPE = await page.locator('body').innerText();
    expect(bodyPE).toMatch(/ECE|MINEDU|UMC|Perú|Peru/i);

    // Set cookie for Mexico and navigate to / without query parameter
    await context.addCookies([{ name: 'spt_country', value: 'MX', domain: hostDomain, path: '/' }]);
    await page.goto('/');
    await expect(page).toHaveTitle(/México|Mexico|EXANI|WorldExams/i);
    const bodyMX = await page.locator('body').innerText();
    expect(bodyMX).toMatch(/CENEVAL|SEP|EXANI|COMIPEMS|México|Mexico/i);
  });
});
