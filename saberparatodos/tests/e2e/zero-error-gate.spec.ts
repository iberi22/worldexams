import { test, expect } from '@playwright/test';

/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

test.describe('Zero Error Gate E2E Suite - Landing & Practica', () => {
  const routes = [
    '/',
    '/practica',
    '/practica?country=mx',
  ];

  for (const route of routes) {
    test(`verifies 0 console.error and 0 pageerror on ${route}`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const pageErrors: Error[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('pageerror', (err) => {
        pageErrors.push(err);
      });

      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');

      expect(consoleErrors, `Console errors detected on ${route}: ${consoleErrors.join(', ')}`).toEqual([]);
      expect(pageErrors, `Page errors detected on ${route}: ${pageErrors.map((e) => e.message).join(', ')}`).toEqual([]);
    });
  }
});
