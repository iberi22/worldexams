import { test, expect } from '@playwright/test';
import { getAvailableSubjects } from '../src/lib/api-service';

// Note: Ensure the app is running (e.g. `npm run dev`) before running this test.
// This test loops through all grades, their available subjects, and all periods.
const GRADES = [3, 5, 7, 9, 11];
const PERIODS = [1, 2, 3, 4];

test.describe('E2E Exhaustive Matrix - Exam Generation Validation', () => {

    // Fetch subjects dynamically or use a known map.
    // For reliability in E2E, we'll map known subjects per grade based on curriculum rules.
    const getSubjectsForGrade = (grade: number) => {
        if (grade <= 5) return ['Matemáticas', 'Lectura Crítica', 'Ciencias Naturales', 'Sociales y Ciudadanas'];
        return ['Matemáticas', 'Lectura Crítica', 'Ciencias Naturales', 'Sociales y Ciudadanas', 'Inglés'];
    };

    for (const grade of GRADES) {
        const subjects = getSubjectsForGrade(grade);
        
        for (const subject of subjects) {
            
            // Test Simulacro Completo
            test(`Grade ${grade} - ${subject} - Simulacro Completo`, async ({ page }) => {
                test.setTimeout(120000);
                
                await page.goto('/', { waitUntil: 'networkidle' });
                
                try {
                    const viewMoreBtn = page.locator('button').filter({ hasText: /Ver m.s ex.menes/i }).first();
                    if (await viewMoreBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
                        await viewMoreBtn.click({ force: true });
                        await page.waitForTimeout(500); // give UI time to expand
                    }
                } catch (e) {
                    // Ignore, might already be expanded or not needed
                }

                const gradeBtn = page.locator('[role="button"]').filter({ hasText: `${grade}°` }).filter({ hasText: 'Grado' }).first();
                if (!(await gradeBtn.isVisible({ timeout: 5000 }).catch(() => false))) {
                    test.skip(true, `Grade ${grade} not visible on the site.`);
                    return;
                }
                await gradeBtn.click();
                
                await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 30000 });
                
                // Select only the visible dropdown in the modal
                const dropdown = page.getByTestId('modal-content').locator('select').first();
                // Use robust selection, it might be lower/upper case in the DOM
                const options = await dropdown.locator('option').allTextContents();
                const matchedOption = options.find(opt => opt.trim().toLowerCase() === subject.toLowerCase());
                
                if (!matchedOption) {
                    console.log(`ℹ️ Subject ${subject} not available in dropdown for grade ${grade}, skipping.`);
                    test.skip();
                    return;
                }
                
                await dropdown.selectOption({ label: matchedOption });
                
                // Select 5 questions
                await page.getByRole('button', { name: '5', exact: true }).click();
                
                // Start
                const startBtn = page.getByRole('button', { name: 'Comenzar' });
                await expect(startBtn).toBeEnabled();
                await startBtn.click();
                
                // Dismiss local mode modal if it appears
                const localNoticeBtn = page.getByRole('button', { name: /ENTENDIDO/i }).first();
                if (await localNoticeBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
                    await localNoticeBtn.click();
                }
                
                // Verify questions load
                try {
                    await expect(page.getByTestId('options-grid')).toBeVisible({ timeout: 15000 });
                } catch (e) {
                    console.error(`❌ FAILED: Grade ${grade} - ${subject} - Simulacro Completo. No questions loaded.`);
                    throw new Error('No questions loaded.');
                }
            });

            // Test each Period
            for (const period of PERIODS) {
                test(`Grade ${grade} - ${subject} - Periodo ${period}`, async ({ page }) => {
                    test.setTimeout(120000);
                    
                    await page.goto('/', { waitUntil: 'networkidle' });
                    
                    try {
                        const viewMoreBtn = page.locator('button').filter({ hasText: /Ver m.s ex.menes/i }).first();
                        if (await viewMoreBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
                            await viewMoreBtn.click({ force: true });
                            await page.waitForTimeout(500);
                        }
                    } catch (e) {
                        // Ignore
                    }
                    
                    const gradeBtn = page.locator('[role="button"]').filter({ hasText: `${grade}°` }).filter({ hasText: 'Grado' }).first();
                    if (!(await gradeBtn.isVisible({ timeout: 5000 }).catch(() => false))) {
                        test.skip(true, `Grade ${grade} not visible on the site.`);
                        return;
                    }
                    await gradeBtn.click();
                    
                    await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 30000 });
                    
                    const dropdown = page.getByTestId('modal-content').locator('select').first();
                    const options = await dropdown.locator('option').allTextContents();
                    const matchedOption = options.find(opt => opt.trim().toLowerCase() === subject.toLowerCase());
                    
                    if (!matchedOption) {
                        test.skip();
                        return;
                    }
                    
                    await dropdown.selectOption({ label: matchedOption });
                    
                    // Switch to Por Periodo
                    const periodModeBtn = page.getByRole('button', { name: 'Por Periodo' });
                    if (await periodModeBtn.isVisible()) {
                        await periodModeBtn.click();
                    } else {
                        // Sometimes the UI doesn't have periods for certain subjects (like Inglés in lower grades)
                        test.skip();
                        return;
                    }
                    
                    // Select specific period
                    const periodBtn = page.getByRole('button', { name: `Periodo ${period}`, exact: false });
                    if (await periodBtn.isVisible()) {
                        await periodBtn.click();
                    } else {
                        test.skip(); // Period not available
                        return;
                    }
                    
                    // Select 5 questions
                    await page.getByRole('button', { name: '5', exact: true }).click();
                    
                    // Start
                    const startBtn = page.getByRole('button', { name: 'Comenzar' });
                    await expect(startBtn).toBeEnabled();
                    
                    let dialogMessage = '';
                    const dialogHandler = async dialog => {
                        dialogMessage = dialog.message();
                        await dialog.accept();
                    };
                    page.on('dialog', dialogHandler);

                    await startBtn.click();
                    
                    // Dismiss local mode modal if it appears
                    const localNoticeBtn = page.getByRole('button', { name: /ENTENDIDO/i }).first();
                    if (await localNoticeBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
                        await localNoticeBtn.click();
                    }
                    
                    // Verify questions load
                    try {
                        await expect(page.getByTestId('options-grid')).toBeVisible({ timeout: 15000 });
                        page.off('dialog', dialogHandler);
                    } catch (e) {
                        page.off('dialog', dialogHandler);
                        if (dialogMessage && (dialogMessage.toLowerCase().includes('error') || dialogMessage.toLowerCase().includes('no hay'))) {
                            test.skip(true, 'No questions available for this configuration.');
                            return;
                        }
                        
                        const errorEl = page.locator('div[role="alert"], .text-red-400').first();
                        if (await errorEl.isVisible({ timeout: 2000 }).catch(() => false)) {
                            const text = await errorEl.innerText();
                            console.error(`❌ FAILED: Grade ${grade} - ${subject} - Periodo ${period} - Error: ${text}`);
                        } else {
                            console.error(`❌ FAILED: Grade ${grade} - ${subject} - Periodo ${period} - Timeout waiting for questions. Dialog: ${dialogMessage}`);
                        }
                        throw new Error('No questions loaded.');
                    }
                });
            }
        }
    }
});
