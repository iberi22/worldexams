const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://saberparatodos.space', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: '3° Grado' }).click();
  await page.waitForTimeout(2000);
  const options = await page.locator('select').locator('option').allTextContents();
  console.log("Options in production for Grade 3:", options);
  await browser.close();
})();
