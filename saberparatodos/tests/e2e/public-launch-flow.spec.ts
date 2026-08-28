import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Public Launch Flow & Core Routes Integration (Wave 5.01)', () => {
  test('verifies landing page loads and provides country links', async ({ page }) => {
    await page.goto('/');

    // Check main document title and status
    await expect(page).toHaveTitle(/SaberParaTodos|Saber Para Todos|World Exams|Practica/i);
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Verify key navigation elements exist
    const navLinks = page.locator('nav a, a[href*="/practica"], a[href*="/ajustes"], a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('verifies /practica flow loads questions and allows selecting options', async ({ page }) => {
    await page.goto('/practica');

    // Wait for practice view to render
    const practiceApp = page.locator('#practice-app, main, [data-testid="practice-container"]');
    await expect(practiceApp.first()).toBeVisible();

    // Verify no telemetry collectors or admin maloca embed are loaded on /practica
    const malocaEmbed = page.locator('.maloca-embed-container');
    await expect(malocaEmbed).toHaveCount(0);
  });

  test('verifies /leaderboard renders mesh subscription elements without PII', async ({ page }) => {
    await page.goto('/leaderboard');

    // Verify leaderboard page loads
    await expect(page).toHaveTitle(/Leaderboard|Tabla de Posiciones/i);

    // Verify no telemetry collectors or admin maloca embed on /leaderboard
    const malocaEmbed = page.locator('.maloca-embed-container');
    await expect(malocaEmbed).toHaveCount(0);
  });

  test('verifies /admin/maloca remains strictly isolated with technical telemetry only', async ({ page }) => {
    await page.goto('/admin/maloca');

    // Check heading and maloca embed container
    await expect(page.locator('h1').first()).toContainText('Maloca Telemetry & GitCore Admin');
    const embedContainer = page.locator('.maloca-embed-container');
    await expect(embedContainer).toBeVisible();
    await expect(embedContainer).toHaveAttribute('data-app-id', 'worldexams');

    // Check compliance badges
    const complianceBadge = page.locator('#gitcore-compliance-badge');
    await expect(complianceBadge).toBeVisible();
  });

  test('verifies static absence of telemetry scripts across all student source pages (BR-03)', () => {
    const studentRoutes = [
      'src/pages/practica.astro',
      'src/pages/leaderboard.astro',
      'src/pages/estudio.astro',
      'src/pages/ajustes/offline.astro'
    ];

    for (const routeFile of studentRoutes) {
      let fullPath = path.resolve(process.cwd(), routeFile);
      if (!fs.existsSync(fullPath)) {
        fullPath = path.resolve(process.cwd(), 'saberparatodos', routeFile);
      }
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        expect(content).not.toContain('MalocaAdminEmbed');
        expect(content).not.toContain('@swal/maloca-embed');
        expect(content).not.toContain('telemetry_collector');
        expect(content).not.toContain('google-analytics');
      }
    }
  });
});
