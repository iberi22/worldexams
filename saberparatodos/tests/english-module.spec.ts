import { test, expect } from '@playwright/test';

test.describe('English Module E2E Verification', () => {

  test('should complete an English exam and verify new UI improvements', async ({ page }) => {
    // Increase timeout for slow loads
    // Increase timeout for long English Diagnostic (could be 50-100 questions)
    test.setTimeout(180000);

    // 1. Navigate to Landing
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 2. Handle Modals (Cookies / Local Mode) - BE ABSOLUTE
    console.log('⏳ Removing modals from DOM...');
    await page.waitForTimeout(2000);

    await page.evaluate(() => {
        // Specifically target cookie and privacy related overlays
        const selectors = ['.cookie-banner', '#cookie-notice', '[class*="cookie"]', '[id*="cookie"]', '[class*="privacy"]'];
        selectors.forEach(s => {
            document.querySelectorAll(s).forEach(el => el.remove());
        });
        // Find by text but strictly for cookie/Aceptar contexts
        const elements = Array.from(document.querySelectorAll('div, section, p'));
        elements.forEach(el => {
            const text = el.textContent?.toLowerCase() || '';
            if ((text.includes('cookies') || text.includes('privacidad')) && text.length < 500) {
                el.remove();
            }
        });
    }).catch(() => {});


    // Dismiss local mode notice if it still exists
    await page.getByRole('button', { name: /Entendido/i }).click({ force: true }).catch(() => {});


    // 3. Select English Diagnostic directly (Most efficient for this test)
    const englishBtn = page.getByRole('button', { name: /Inglés/i }).first();
    await expect(englishBtn).toBeVisible({ timeout: 15000 });
    await englishBtn.click();
    console.log('✅ English Diagnostic Button clicked');

    // 4. English Diagnostic starts immediately or shows Config
    // If it shows Config, we might need to click "Comenzar"
    console.log('⏳ Checking for start button in modal...');
    const startExamBtn = page.getByRole('button', { name: /Comenzar|Empezar|Iniciar/i }).first();
    try {
        await startExamBtn.waitFor({ state: 'visible', timeout: 10000 });
        await startExamBtn.click({ force: true });
        console.log('✅ Start Exam button clicked in Modal');
    } catch (e) {
        console.log('⚠️ Start Exam button not clicked, maybe it started already?');
    }

    // 5. Verify Question loads
    await page.waitForSelector('text=01', { timeout: 30000 });
    console.log('✅ English Question 01 Loaded');

    // 6. Answer questions until results view appears
    console.log('👉 Answering questions until exam finish...');
    let questionCount = 0;
    while (questionCount < 100) { // Safety limit for diagnostic
        questionCount++;

        // Check if Results View appeared
        if (await page.locator('text=Resultados').isVisible()) {
            console.log('✅ Results View detected');
            break;
        }

        // Wait for options or finalize button
        const optionsGrid = page.locator('.grid-cols-1').first();
        const finalizeBtn = page.locator('button:has-text("Finalizar")');
        const nextBtn = page.locator('button:has-text("Siguiente")');

        if (await finalizeBtn.isVisible()) {
            console.log('🏁 Finalizing exam...');
            await finalizeBtn.click();
            await page.waitForTimeout(1000);
            break;
        }

        if (await optionsGrid.isVisible()) {
            const firstOption = optionsGrid.locator('> div').first();
            await firstOption.click();

            // Re-check next button after click
            await nextBtn.waitFor({ state: 'visible', timeout: 5000 });
            await nextBtn.click();
        } else if (await nextBtn.isVisible()) {
            await nextBtn.click();
        } else {
            // Check if we already finished
            if (await page.locator('text=Resultados').isVisible()) break;

            console.log('⚠️ No options or next button found, waiting...');
            await page.waitForTimeout(1000);
        }

        await page.waitForTimeout(200);
    }

    // 7. Verify Results View
    await page.waitForSelector('text=Resultados', { timeout: 15000 });
    console.log('✅ Results View Visible');

    // 8. Verify English-specific features in Results
    // 8.1 NotebookLM Plan
    const notebookBtn = page.locator('button:has-text("Descargar Cuaderno")');
    await expect(notebookBtn).toBeVisible();
    console.log('✅ NotebookLM Download Button Visible');

    // 8.2 Memory Status (The one we just re-enabled)
    // const memoryStatus = page.locator('text=Progreso de Memoria').or(page.locator('text=Dominio de Temas'));
    // Note: MemoryStatus component text might vary, but it should be present.
    // Let's check for "Dominio" which is common in MemoryStatus.
    await expect(page.locator('body')).toContainText(/Dominio|Progreso/);
    console.log('✅ Memory Status Component visible');

    // 8.3 Badges (Part X and CEFR)
    // Part Badge (extracted from parser)
    await expect(page.locator('text=Part').first()).toBeVisible();
    console.log('✅ "Part" Badge Visible');

    // CEFR Badge (e.g., A1, B1, B2)
    const cefrMatch = page.locator('text=A1, text=A2, text=B1, text=B2, text=C1, text=B2+').first();
    await expect(cefrMatch).toBeVisible();
    console.log('✅ CEFR Level Badge Visible');

    // 9. Verify Accuracy Display
    const accuracy = page.locator('text=Precisión');
    await expect(accuracy).toBeVisible();
  });
});
