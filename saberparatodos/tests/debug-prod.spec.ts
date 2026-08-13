import { test, expect } from '@playwright/test';
import * as fs from 'fs';
test('dump prod', async ({ page }) => {
  await page.goto('https://saberparatodos.space/');
  await page.waitForTimeout(3000);
  const html = await page.content();
  fs.writeFileSync('prod-dump.html', html);
});
