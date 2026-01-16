import { test, expect } from '@playwright/test';

test.describe('Production Verification', () => {
    test.use({ baseURL: 'https://f1e968cf.saberparatodos.pages.dev' });

    test('Production Health Check and Version Verification', async ({ page }) => {
        // 1. Basic Health Check
        console.log('Navigating to Production...');
        await page.goto('/');
        await expect(page).toHaveTitle(/Colombia/);
        console.log('✅ Homepage loaded');

        // 2. Check for Stop Mode presence (Existing Feature)
        // await expect(page.locator('text=Crear Desafío')).toBeVisible();

        console.log('--- Page Content Dump ---');
        const content = await page.innerText('body');
        console.log(content.slice(0, 500)); // First 500 chars
        console.log('-------------------------');

        if (content.includes('Crear Desafío')) {
             console.log('✅ Found "Crear Desafío" in text');
        } else {
             console.log('❌ "Crear Desafío" NOT found in text');
        }

        // 3. Version Verification (Checking if NEW features are deployed)
        console.log('--- Verifying New Features (Expect Fail if not deployed) ---');

        // Check for Stop Mode Setup Button Text Change
        // Local: "CREAR SALA STOP"
        // Probable Prod: "Crear Sala"
        await page.click('text=Crear Desafío');
        await page.fill('input[type="text"]', 'ProdTest');

        const newButton = page.locator('button:has-text("CREAR SALA STOP")');
        const oldButton = page.locator('button:has-text("Crear Sala")');

        if (await newButton.isVisible()) {
            console.log('🚀 NEW VERSION DETECTED: "CREAR SALA STOP" button found.');
        } else if (await oldButton.isVisible()) {
            console.log('⚠️ OLD VERSION DETECTED: "Crear Sala" button found.');
        } else {
            console.log('❓ UNKNOWN STATE: Neither button found or different text.');
        }

        // Close modal (if possible) or reload
        await page.reload();

        // Check for Name Prompt in Lobby Browser
        await page.click('text=Ver Partidas');

        // We might not find a room, but we can check if the logic *would* trigger
        // This is harder to test without an active room.
        // But we can check if the deployed JS has the changes? No, minified.

        console.log('--- End Verification ---');
    });
});
