import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test('dump page', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  await page.waitForTimeout(2000);
  const html = await page.content();
  fs.writeFileSync('page-dump.html', html);
});
