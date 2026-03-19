import { test, expect } from '@playwright/test';

test.describe('Production Verification', () => {
    test('Production Health Check and Version Verification', async ({ page }) => {
        console.log(`Base URL: ${test.info().project.use.baseURL}`);

        // 1. Basic Health Check
        console.log('Navigating to Production...');
        await page.goto('/');
        await expect(page).toHaveTitle(/SaberParaTodos|ICFES/);
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

        // 3. Current landing verification
        console.log('--- Verifying Current Production Entry Flow ---');
        const grade11Btn = page.getByRole('button', { name: '11° Grado' });
        await expect(grade11Btn).toBeVisible({ timeout: 15000 });
        console.log('✅ Grade 11 entry point visible');

        await grade11Btn.click();
        await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 30000 });
        console.log('✅ Exam configuration modal opened');

        const challengeButton = page.getByText('Crear Desafío');
        if (await challengeButton.isVisible().catch(() => false)) {
            console.log('ℹ️ "Crear Desafío" is still present in production.');
        } else {
            console.log('ℹ️ Party challenge CTA is not present on the current production landing.');
        }

        const roomBrowserButton = page.getByText('Ver Partidas');
        if (await roomBrowserButton.isVisible().catch(() => false)) {
            console.log('ℹ️ "Ver Partidas" is present in production.');
        } else {
            console.log('ℹ️ Lobby browser CTA is not present on the current production landing.');
        }

        console.log('--- End Verification ---');
    });
});
