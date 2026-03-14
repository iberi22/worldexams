import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Period Metrics & Tracker E2E', () => {

    test.beforeAll(async () => {
        const evidenceDir = path.join(process.cwd(), 'tests', 'evidence');
        if (!fs.existsSync(evidenceDir)) {
            fs.mkdirSync(evidenceDir, { recursive: true });
        }
    });

    test('Should complete an exam with Period 1 and verify Report & Tracker', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes timeout

        // Enable console filtering to debug browser errors
        page.on('console', msg => {
            if (msg.type() === 'error') console.log(`BROWSER ERROR: ${msg.text()}`);
        });
        page.on('pageerror', err => console.log(`BROWSER ERROR: ${err.message}`));

        try {
            console.log('🌍 Navigating to home...');
            await page.goto('/');

            // 1. Clear IndexedDB
            console.log('🧹 Clearing IndexedDB...');
            await page.evaluate(async () => {
                const req = indexedDB.deleteDatabase('saberparatodos-local');
                return new Promise((resolve) => {
                    req.onsuccess = resolve;
                    req.onerror = resolve;
                });
            });
            await page.reload();

            // 2. Configure Exam
            console.log('🔘 Selecting Grade 11...');

            // Wait for Home to settle
            await page.waitForTimeout(2000);

            // Relaxed selector: match button with "11" AND "GRADO" but NOT "INGLÉS"
            // The English button has "Grados 3-11" which triggers false positive
            const gradeBtn = page.getByRole('button')
                .filter({ hasText: '11' })
                .filter({ hasText: 'GRADO' })
                .filter({ hasNotText: /INGL.S/i }) // Exclude English button
                .first();

            await expect(gradeBtn).toBeVisible({ timeout: 10000 });
            console.log('Found Grade Button:', await gradeBtn.innerText());
            await gradeBtn.click();

            // Wait for Config Modal
            await expect(page.getByText('Configurar Examen')).toBeVisible({ timeout: 15000 });

            console.log('📚 Selecting Subject: Ciencias Naturales...');
            const subjectSelect = page.locator('select').first();
            await subjectSelect.selectOption({ label: 'Ciencias Naturales' });

            // Wait for UI update
            await page.waitForTimeout(1000);

            // Check for "Por Periodo" toggle/tab
            const periodTab = page.getByRole('button', { name: /Por Periodo/i });
            if (await periodTab.isVisible()) {
                console.log('🔘 Clicking "Por Periodo" tab...');
                await periodTab.click();
                await page.waitForTimeout(500);
            }

            console.log('📅 Selecting Period 1...');
            const p1Btn = page.getByRole('button', { name: /Periodo 1/i }).first();
            if (await p1Btn.isVisible()) {
                await p1Btn.click();
            } else {
                 await page.getByText('Periodo 1').click();
            }

            console.log('🔢 Selecting 5 questions...');
            await page.getByRole('button', { name: '5', exact: true }).click();

            console.log('🚀 Starting Exam...');
            await page.getByRole('button', { name: 'Comenzar' }).click();

            // 3. Complete Exam
            console.log('📝 Answering questions...');
            // Loop answer 5 questions
            for (let i = 0; i < 5; i++) {

                const optionsGrid = page.getByTestId('options-grid');

                // Wait for options or results
                try {
                    await expect(optionsGrid).toBeVisible({ timeout: 10000 });
                } catch (e) {
                     if (await page.getByRole('heading', { name: /Resultados/i }).isVisible()) {
                         console.log('✅ Exam finished early.');
                         break;
                     }
                     throw e;
                }

                // Click option
                await page.getByTestId('options-grid').locator('> *').first().click();

                // Handle feedback/next - FORCE click to bypass toasts
                const nextBtn = page.getByRole('button', { name: /Responder|Siguiente|Finalizar/i });
                if (await nextBtn.isVisible()) {
                    await nextBtn.click({ force: true });
                }

                await page.waitForTimeout(500);
                const nextNextBtn = page.getByRole('button', { name: /Siguiente/i });
                if (await nextNextBtn.isVisible()) {
                    await nextNextBtn.click({ force: true });
                }
            }

            // 4. Results
            console.log('📊 Waiting for results...');
            const resultsHeader = page.getByRole('heading', { name: /Resultados/i });
            await expect(resultsHeader).toBeVisible({ timeout: 20000 });

            console.log('🏠 Returning home...');
            await page.goto('/');

            // 5. Check Report
            console.log('📈 Checking Local Intelligence Report...');
            await page.getByText('Mis Métricas').click();
            await expect(page.getByText('Inteligencia Local')).toBeVisible(); // title

            // Verify new card
            console.log('🃏 Verifying Period Card...');
            const periodCard = page.getByText('Rendimiento por Periodo');
            await expect(periodCard).toBeVisible();

            // Period 1 data check
            const p1Stat = page.locator('.grid-cols-4 > div').first();
            const p1StatText = await p1Stat.innerText();
            console.log('Period 1 Stat Value:', p1StatText);

            await expect(p1Stat).not.toContainText('Sin datos');

            console.log('✅ TEST PASSED');

        } catch (error) {
            console.error('⚠️ TEST FAILED:', error);
            await page.screenshot({ path: 'tests/evidence/debug_failure_v5.png', fullPage: true });

            // Dump HTML
            const html = await page.content();
            fs.writeFileSync('tests/evidence/debug_failure_body_v5.html', html);

            throw error;
        }
    });

});
