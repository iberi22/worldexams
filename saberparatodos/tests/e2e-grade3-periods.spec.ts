
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('E2E Grade 3 Period Functionality', () => {

    test.beforeAll(async () => {
        const evidenceDir = path.join(process.cwd(), 'tests', 'evidence', 'grade3');
        if (!fs.existsSync(evidenceDir)) {
            fs.mkdirSync(evidenceDir, { recursive: true });
        }
    });

    // We can run this as a looped test or separate tests. Looped is fine.
    const PERIODS = [1, 2, 3, 4];

    for (const period of PERIODS) {
        test(`Grade 3 Math - Period ${period} Exam Generation`, async ({ page }) => {
            test.setTimeout(120000); // 2 mins per period

            const log = (msg: string) => console.log(`[P${period}] ${msg}`);

            log('🌍 Navigating to home...');
            await page.goto('/');

            // 1. Select Grade 3
            log('🔘 Clicking Grade 3...');
            const gradeCard = page.locator('text=3°').first();
            await expect(gradeCard).toBeVisible({ timeout: 10000 });
            await gradeCard.click();

            // 2. Configure Exam
            log('⚙️ Waiting for Config Modal...');
            await expect(page.getByText('Configurar Examen')).toBeVisible({ timeout: 30000 });

            // Select Subject: Matemáticas
            const subjectSelect = page.locator('select').filter({ hasNotText: 'Dev Toolbar' }).first();
            await expect(subjectSelect).toBeVisible();
            // Try selecting by label 'Matemáticas'
            // Depending on implementation, it might be auto-selected or need selection
            // We'll force select it to be sure
            await subjectSelect.selectOption({ label: 'Matemáticas' });
            log('✅ Subject Selected: Matemáticas');

            await page.waitForTimeout(1000);

            // Select Mode: "Por Periodo"
            // Note: The UI might use buttons or a toggle. Assuming Buttons from previous context.
            // Look for "Por Periodo" text or button
            const periodModeBtn = page.getByRole('button', { name: /Por Periodo/i });
            if (await periodModeBtn.isVisible()) {
                await periodModeBtn.click();
                log('🔘 Mode "Por Periodo" selected');
            } else {
                 // Check if it's already in period mode or different UI
                 log('⚠️ "Por Periodo" button not found, checking if period buttons are directly visible');
            }

            await page.waitForTimeout(1000);

            // Select Specific Period
            const periodBtn = page.getByRole('button', { name: `Periodo ${period}`, exact: false });
            // Exact false matches "Periodo 1: Números..."

            await expect(periodBtn).toBeVisible();
            await periodBtn.click();
            log(`✅ Period ${period} Selected`);

            // Select Question Count: 5 (to be safe and fast)
            await page.getByRole('button', { name: '5', exact: true }).click();

            // Start Exam
            log('🚀 Starting Exam...');
            const launchBtn = page.getByRole('button', { name: 'Comenzar' });
            await launchBtn.click();

            // 3. Verify Questions Load
            log('📝 Verifying question load...');
            const optionsGrid = page.getByTestId('options-grid');
            await expect(optionsGrid).toBeVisible({ timeout: 20000 });

            // 4. Answer 1 Question to confirm interactivity
            const option = optionsGrid.locator('> *').first();
            await option.click();

            const responderBtn = page.getByRole('button', { name: /Responder|Siguiente/i });
            await responderBtn.click();

            // Wait for feedback or next (just confirming no crash)
            await page.waitForTimeout(1000);

            // Screenshot evidence
            await page.screenshot({ path: `tests/evidence/grade3/g3-p${period}-success.png` });
            log('✅ Test Passed');
        });
    }
});
