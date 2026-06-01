import { test, expect } from '@playwright/test';

test.describe('Production CEFR Filtering & E2E Validation', () => {

  test('Backend Pack Validation - Verify CEFR levels exist in production JSON', async ({ request }) => {
    console.log('--- Checking Deployed Production Pack JSON ---');
    const response = await request.get('https://saberparatodos.space/api/packs/week-1-grade-11-subject-ingles.json');
    expect(response.ok()).toBe(true);

    const pack = await response.json();
    expect(pack).toHaveProperty('questions');
    expect(Array.isArray(pack.questions)).toBe(true);
    expect(pack.questions.length).toBeGreaterThan(0);

    // Count questions per CEFR level
    const dist: Record<string, number> = {};
    pack.questions.forEach((q: any) => {
      const level = q.cefr_level || 'null';
      dist[level] = (dist[level] || 0) + 1;
    });

    console.log('Production CEFR distribution:', dist);

    // Assert C1 and C2 questions exist and are populated
    expect(dist['C1']).toBeGreaterThan(0);
    expect(dist['C2']).toBeGreaterThan(0);
    expect(dist['null']).toBeUndefined(); // There should be 0 nulls now!
    console.log('✅ Production JSON contains valid, non-null CEFR levels (C1 & C2 verified)');
  });

  test('UI E2E Flow - Configure English exam with C1 level and start', async ({ page }) => {
    test.setTimeout(60000);
    console.log('--- Navigating directly to Production Homepage ---');
    await page.goto('https://saberparatodos.space/');
    await page.waitForLoadState('networkidle');

    // 1. Wait for hydration and dismiss local notice
    console.log('Waiting for hydration...');
    await page.waitForTimeout(2000);
    console.log('Dismissing local notice...');
    const localNoticeBtn = page.getByRole('button', { name: /ENTENDIDO/i }).first();
    await expect(localNoticeBtn).toBeVisible({ timeout: 15000 });
    await localNoticeBtn.click({ force: true });
    await expect(localNoticeBtn).toBeHidden({ timeout: 10000 });

    // 2. Click "11° Grado" to open modal
    console.log('Clicking 11° Grado button...');
    const grade11Btn = page.getByRole('button', { name: '11° Grado' });
    await expect(grade11Btn).toBeVisible({ timeout: 15000 });
    await grade11Btn.click({ force: true });

    // 3. Verify modal opened
    console.log('Waiting for modal to open...');
    await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 15000 });

    // 4. Select English subject
    console.log('Selecting English subject via select dropdown...');
    const selectDropdown = page.locator('select');
    await expect(selectDropdown).toBeVisible({ timeout: 15000 });
    await selectDropdown.selectOption('Inglés');

    // 4. Force CEFR Level selection to C1
    console.log('Configuring CEFR Level to C1...');
    const changeBtn = page.getByRole('button', { name: 'Cambiar' });
    if (await changeBtn.isVisible().catch(() => false)) {
      await changeBtn.click({ force: true });
    }

    const c1Option = page.getByRole('button', { name: /C1 - Avanzado/i });
    await expect(c1Option).toBeVisible({ timeout: 10000 });
    await c1Option.click({ force: true });

    // 5. Verify UI updated the selection to C1
    const baseIndicator = page.locator('text=Base:');
    await expect(baseIndicator).toContainText('C1', { timeout: 10000 });
    console.log('✅ UI successfully registered: Base: C1');

    // 6. Start the exam
    console.log('Starting exam...');
    const startBtn = page.getByRole('button', { name: /Comenzar|Empezar|Iniciar/i }).first();
    await expect(startBtn).toBeVisible({ timeout: 15000 });
    await startBtn.click({ force: true });

    // 7. Verify first question loaded
    console.log('Verifying first question...');
    await expect(page.locator('text=Pregunta 1 /').first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('[data-testid="options-grid"]')).toBeVisible({ timeout: 20000 });

    console.log('✅ Exam successfully started in C1 diagnostic mode on production');
  });

});
