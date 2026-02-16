import { test, expect } from '@playwright/test';


// Focus primarily on Grade 11 where we did the fixes
const GRADES = [11];
const PERIODS = [1, 2, 3, 4];

test.describe('E2E Matrix Coverage (Post-Fix)', () => {

    for (const grade of GRADES) {
        for (const period of PERIODS) {
            test(`Grade ${grade} Period ${period} - Feasibility Check`, async ({ page }) => {
                test.setTimeout(120000); // 2 min

                console.log(`\n🔎 Checking Grade ${grade} Period ${period}...`);
                await page.goto('/', { waitUntil: 'networkidle' });

                // 1. Select Grade (e.g., 11° Grado)
                console.log(`Step 1: Clicking Grade ${grade}° Grado`);
                const gradeBtn = page.getByRole('button', { name: `${grade}° Grado` });
                await expect(gradeBtn).toBeVisible({ timeout: 15000 });
                await gradeBtn.click();

                // 2. Select Subject (using <select> in modal)
                console.log('Step 2: Waiting for Exam Config Modal (can take long due to pool fetch)...');
                await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 60000 });
                console.log('✅ Modal visible');

                const dropdown = page.locator('select');
                await dropdown.selectOption('Sociales y Ciudadanas');
                console.log('✅ Subject selected');

                // 3. Select "Por Periodo" mode
                console.log('Step 3: Selecting "Por Periodo" mode');
                const periodModeBtn = page.getByRole('button', { name: 'Por Periodo' });
                await expect(periodModeBtn).toBeVisible();
                await periodModeBtn.click();

                // 4. Select Period (e.g., Periodo 1)
                console.log(`Step 4: Selecting Period ${period}`);
                const periodBtn = page.getByRole('button', { name: `Periodo ${period}`, exact: false });
                await expect(periodBtn).toBeVisible();
                await periodBtn.click();

                // 5. Select 5 Questions
                console.log('Step 5: Selecting 5 questions');
                await page.getByRole('button', { name: '5', exact: true }).click();

                // 6. Start Exam (button "Comenzar")
                console.log('Step 6: Clicking Comenzar');
                const startBtn = page.getByRole('button', { name: 'Comenzar' });
                await expect(startBtn).toBeEnabled();
                await startBtn.click();

                // 7. Validation
                console.log('Step 7: Validating question load...');
                try {
                    // Check for Question
                    await expect(page.getByTestId('options-grid')).toBeVisible({ timeout: 20000 });
                    console.log(`✅ Grade ${grade} Period ${period}: SUCCESS`);
                } catch (e) {
                    const toast = page.locator('div[role="alert"]');
                    if (await toast.isVisible()) {
                        const text = await toast.innerText();
                        console.log(`❌ Grade ${grade} Period ${period}: FAILED - ${text}`);
                        test.fail();
                    } else {
                       console.log(`❌ Grade ${grade} Period ${period}: FAILED - Unknown State (Timeout)`);
                       test.fail();
                    }
                }
            });
        }
    }
});
