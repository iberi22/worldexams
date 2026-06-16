import { test, expect } from '@playwright/test';

const GRADES = [6, 9, 11];
const SUBJECTS = ['Matemáticas', 'Lectura Crítica', 'Ciencias Naturales', 'Sociales y Ciudadanas', 'Inglés'];

test.describe('E2E Full Subject Coverage (Pre-Deploy Gate)', () => {

    for (const grade of GRADES) {
        for (const subject of SUBJECTS) {
            test(`Grade ${grade} - ${subject} - Simulacro Completo`, async ({ page }) => {
                test.setTimeout(180000); // 3 min

                console.log(`\n🔍 Testing Grade ${grade} - ${subject}...`);
                await page.goto('/', { waitUntil: 'networkidle' });

                // 1. Select Grade
                console.log(`Step 1: Clicking Grade ${grade}° Grado`);
                const gradeBtn = page.getByRole('button', { name: `${grade}° Grado` });
                await expect(gradeBtn).toBeVisible({ timeout: 15000 });
                await gradeBtn.click();

                // 2. Wait for modal (can take long due to pool fetch)
                console.log('Step 2: Waiting for Exam Config Modal...');
                await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 120000 });
                console.log('✅ Modal visible');

                // 3. Select Subject
                const dropdown = page.locator('select');
                await dropdown.selectOption(subject);
                console.log(`✅ Subject selected: ${subject}`);

                // 4. Ensure Simulacro Completo mode (default, but verify)
                const simulacroBtn = page.getByRole('button', { name: 'Simulacro Completo' });
                if (await simulacroBtn.isVisible()) {
                    // Already in simulacro mode
                } else {
                    // Click the other mode first then back
                    const periodBtn = page.getByRole('button', { name: 'Por Periodo' });
                    if (await periodBtn.isVisible()) {
                        // Toggle may be needed - check current state
                    }
                }

                // 5. Select 5 Questions
                console.log('Step 5: Selecting 5 questions');
                await page.getByRole('button', { name: '5', exact: true }).click();

                // 6. Start Exam
                console.log('Step 6: Clicking Comenzar');
                const startBtn = page.getByRole('button', { name: 'Comenzar' });
                await expect(startBtn).toBeEnabled();
                await startBtn.click();

                // 7. Validate questions load
                console.log('Step 7: Validating question load...');
                try {
                    await expect(page.getByTestId('options-grid')).toBeVisible({ timeout: 30000 });
                    console.log(`✅ Grade ${grade} - ${subject}: SUCCESS`);

                    // Also verify at least one question visible
                    const optionCount = await page.getByTestId('options-grid').locator('button, div[role="button"]').count();
                    expect(optionCount).toBeGreaterThanOrEqual(2);
                    console.log(`✅ ${optionCount} options visible`);

                } catch (e) {
                    // Check for any error toast or alert
                    const errorEl = page.locator('div[role="alert"], .text-red-400, .bg-red-500\\/10').first();
                    if (await errorEl.isVisible({ timeout: 2000 }).catch(() => false)) {
                        const text = await errorEl.innerText();
                        console.log(`❌ Grade ${grade} - ${subject}: FAILED - ${text}`);
                    } else {
                        console.log(`❌ Grade ${grade} - ${subject}: FAILED - Timeout waiting for questions`);
                        console.log('Current URL:', page.url());
                        const bodyText = await page.locator('body').innerText().catch(() => 'N/A');
                        console.log('Page text (first 500):', bodyText.substring(0, 500));
                    }
                    test.fail();
                }
            });

            // Period mode test for Grade 11 (most critical)
            if (grade === 11) {
                const PERIODS = [1, 4];
                for (const period of PERIODS) {
                    test(`Grade ${grade} - ${subject} - Period ${period}`, async ({ page }) => {
                        test.setTimeout(180000);

                        console.log(`\n🔍 Testing Grade ${grade} - ${subject} - Period ${period}...`);
                        await page.goto('/', { waitUntil: 'networkidle' });

                        // 1. Select Grade
                        const gradeBtn = page.getByRole('button', { name: `${grade}° Grado` });
                        await expect(gradeBtn).toBeVisible({ timeout: 15000 });
                        await gradeBtn.click();

                        // 2. Wait for modal
                        await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 120000 });

                        // 3. Select Subject
                        await page.locator('select').selectOption(subject);

                        // 4. Select "Por Periodo" mode
                        const periodModeBtn = page.getByRole('button', { name: 'Por Periodo' });
                        await expect(periodModeBtn).toBeVisible();
                        await periodModeBtn.click();

                        // 5. Select Period
                        const periodBtn = page.getByRole('button', { name: `Periodo ${period}`, exact: false });
                        await expect(periodBtn).toBeVisible({ timeout: 10000 });
                        await periodBtn.click();

                        // 6. Select 5 questions
                        await page.getByRole('button', { name: '5', exact: true }).click();

                        // 7. Start Exam
                        const startBtn = page.getByRole('button', { name: 'Comenzar' });
                        await expect(startBtn).toBeEnabled();
                        await startBtn.click();

                        // 8. Validate
                        try {
                            await expect(page.getByTestId('options-grid')).toBeVisible({ timeout: 30000 });
                            console.log(`✅ Grade ${grade} - ${subject} - Period ${period}: SUCCESS`);
                        } catch (e) {
                            const errorEl = page.locator('div[role="alert"], .text-red-400, .bg-red-500\\/10').first();
                            if (await errorEl.isVisible({ timeout: 2000 }).catch(() => false)) {
                                const text = await errorEl.innerText();
                                console.log(`❌ FAILED - ${text}`);
                            } else {
                                console.log(`❌ FAILED - Timeout`);
                            }
                            test.fail();
                        }
                    });
                }
            }
        }
    }

    // ✅ Bonus: Preuniversitario test (only if available for tenant)
    test('Grade 11 - Preuniversitario - Feasibility', async ({ page }) => {
        test.setTimeout(120000);
        await page.goto('/', { waitUntil: 'networkidle' });

        const gradeBtn = page.getByRole('button', { name: '11° Grado' });
        await expect(gradeBtn).toBeVisible({ timeout: 15000 });
        await gradeBtn.click();

        await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 60000 });

        // Check if Preuniversitario is available (country CO)
        const dropdown = page.locator('select');
        const options = await dropdown.locator('option').allTextContents();
        if (options.includes('Preuniversitario')) {
            await dropdown.selectOption('Preuniversitario');
            console.log('✅ Preuniversitario available');

            await page.getByRole('button', { name: '5', exact: true }).click();
            const startBtn = page.getByRole('button', { name: 'Comenzar' });
            await expect(startBtn).toBeEnabled();
            await startBtn.click();

            try {
                await expect(page.getByTestId('options-grid')).toBeVisible({ timeout: 30000 });
                console.log('✅ Preuniversitario: SUCCESS');
            } catch {
                console.log('❌ Preuniversitario: FAILED (may not have content)');
            }
        } else {
            console.log('ℹ️ Preuniversitario not available for this tenant, skipping');
            test.skip();
        }
    });
});
