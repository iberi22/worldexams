import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Maloca Admin Embed & Telemetry Isolation (MS-022 / BR-03)', () => {
  test('renders /admin/maloca clean interface with app_id="worldexams" metadata', async ({ page }) => {
    await page.goto('/admin/maloca');

    // Page title and heading checks
    await expect(page).toHaveTitle(/Maloca Embed & GitCore Telemetry/i);
    await expect(page.locator('h1')).toContainText('Maloca Telemetry & GitCore Admin');

    // Maloca Svelte embed component rendered
    const embedContainer = page.locator('.maloca-embed-container');
    await expect(embedContainer).toBeVisible();
    await expect(embedContainer).toHaveAttribute('data-app-id', 'worldexams');

    // GitCore compliance badge
    const complianceBadge = page.locator('#gitcore-compliance-badge');
    await expect(complianceBadge).toBeVisible();
    await expect(complianceBadge).toContainText('GitCore COMPLIANT');
    await expect(complianceBadge).toContainText('MS-022');

    // Telemetry isolation disclaimer (BR-03 / REQ-009)
    const disclaimer = page.locator('#telemetry-isolation-disclaimer');
    await expect(disclaimer).toBeVisible();
    await expect(disclaimer).toContainText('Strict Telemetry Isolation (BR-03 / REQ-009)');

    // Feature status panel
    const featurePanel = page.locator('#feature-status-panel');
    await expect(featurePanel).toBeVisible();
    await expect(featurePanel).toContainText('Feature Compliance Status');

    // CI/CD feed panel
    const cicdPanel = page.locator('#cicd-feed-panel');
    await expect(cicdPanel).toBeVisible();
    await expect(cicdPanel).toContainText('CI/CD Pipeline Runs');

    // Recent commits panel
    const commitsPanel = page.locator('#recent-commits-panel');
    await expect(commitsPanel).toBeVisible();
    await expect(commitsPanel).toContainText('GitCore Recent Commits');
  });

  test('verifies zero telemetry collector imports in student routes (BR-03 / REQ-009 static check)', async () => {
    const studentRoutes = [
      'saberparatodos/src/pages/practica.astro',
      'saberparatodos/src/pages/leaderboard.astro'
    ];

    for (const routeFile of studentRoutes) {
      const fullPath = path.resolve(process.cwd(), routeFile);
      expect(fs.existsSync(fullPath)).toBe(true);
      const content = fs.readFileSync(fullPath, 'utf-8');

      // Ensure no telemetry collector or Maloca embed imports exist in student views
      expect(content).not.toContain('MalocaAdminEmbed');
      expect(content).not.toContain('@swal/maloca-embed');
      expect(content).not.toContain('telemetry_collector');
    }
  });
});
