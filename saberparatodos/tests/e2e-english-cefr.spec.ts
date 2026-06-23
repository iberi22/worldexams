import { test, expect } from '@playwright/test';

test.describe('E2E English Exam Flow - CEFR Levels (C1 & A1)', () => {

  test('UI E2E Flow - Configure English exam with C1', async ({ page }) => {
    test.setTimeout(60000);
    console.log('--- Navigating to Local Site ---');
    await page.goto('http://localhost:4321/');
    await page.waitForLoadState('networkidle');

    console.log('Waiting for hydration...');
    await page.waitForTimeout(2000);
    console.log('Dismissing local notice...');
    const localNoticeBtn = page.getByRole('button', { name: /ENTENDIDO/i }).first();
    await expect(localNoticeBtn).toBeVisible({ timeout: 15000 });
    await localNoticeBtn.click({ force: true });
    await expect(localNoticeBtn).toBeHidden({ timeout: 10000 });

    // Click "11° Grado"
    console.log('Clicking 11° Grado button...');
    const grade11Btn = page.getByRole('button', { name: '11° Grado' }).first();
    await expect(grade11Btn).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(1000);
    await grade11Btn.click({ force: true });

    // Verify modal opened
    console.log('Waiting for modal to open...');
    await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 15000 });

    // Select English subject
    console.log('Selecting English subject via select dropdown...');
    const selectDropdown = page.locator('select').first();
    await expect(selectDropdown).toBeVisible({ timeout: 15000 });
    await selectDropdown.selectOption('Inglés');

    // Force CEFR Level selection to C1
    console.log('Configuring CEFR Level to C1...');
    const changeBtn = page.getByRole('button', { name: 'Cambiar' });
    if (await changeBtn.isVisible().catch(() => false)) {
      await changeBtn.click({ force: true });
    }

    const c1Option = page.getByRole('button', { name: /C1 - Avanzado/i });
    await expect(c1Option).toBeVisible({ timeout: 10000 });
    await c1Option.click({ force: true });

    // Start the exam
    console.log('Starting C1 exam...');
    const startBtn = page.getByRole('button', { name: /Comenzar|Empezar|Iniciar/i }).first();
    await expect(startBtn).toBeVisible({ timeout: 15000 });
    await startBtn.click({ force: true });

    // Verify first question loaded
    console.log('Verifying first question...');
    await expect(page.locator('text=Pregunta 1 /').first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('[data-testid="options-grid"]')).toBeVisible({ timeout: 20000 });
    console.log('✅ Exam successfully started in C1 mode');
  });

  test('UI E2E Flow - Configure English exam with A1', async ({ page }) => {
    test.setTimeout(60000);
    console.log('--- Navigating to Local Site ---');
    await page.goto('http://localhost:4321/');
    await page.waitForLoadState('networkidle');

    console.log('Waiting for hydration...');
    await page.waitForTimeout(2000);
    console.log('Dismissing local notice...');
    const localNoticeBtn = page.getByRole('button', { name: /ENTENDIDO/i }).first();
    await expect(localNoticeBtn).toBeVisible({ timeout: 15000 });
    await localNoticeBtn.click({ force: true });
    await expect(localNoticeBtn).toBeHidden({ timeout: 10000 });

    // Click "11° Grado"
    console.log('Clicking 11° Grado button...');
    const grade11Btn = page.getByRole('button', { name: '11° Grado' }).first();
    await expect(grade11Btn).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(1000);
    await grade11Btn.click({ force: true });

    // Verify modal opened
    console.log('Waiting for modal to open...');
    await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 15000 });

    // Select English subject
    console.log('Selecting English subject via select dropdown...');
    const selectDropdown = page.locator('select').first();
    await expect(selectDropdown).toBeVisible({ timeout: 15000 });
    await selectDropdown.selectOption('Inglés');

    const changeBtnA1 = page.getByRole('button', { name: 'Cambiar' });
    if (await changeBtnA1.isVisible().catch(() => false)) {
      await changeBtnA1.click({ force: true });
    }

    const a1Option = page.getByRole('button', { name: /A1 - Principiante/i });
    await expect(a1Option).toBeVisible({ timeout: 10000 });
    await a1Option.click({ force: true });

    console.log('Starting A1 exam...');
    const startBtnA1 = page.getByRole('button', { name: /Comenzar|Empezar|Iniciar/i }).first();
    await startBtnA1.click({ force: true });

    console.log('Verifying first question in A1...');
    await expect(page.locator('text=Pregunta 1 /').first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('[data-testid="options-grid"]')).toBeVisible({ timeout: 20000 });
    console.log('✅ Exam successfully started in A1 mode');
  });

});
