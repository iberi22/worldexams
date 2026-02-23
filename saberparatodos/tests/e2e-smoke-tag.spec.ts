import { test, expect } from '@playwright/test';

test('Smoke Test: Grade 11 Period 3 (Sociales) - Tag Verification', async ({ page }) => {
    // Enable browser logging
    page.on('console', msg => {
        console.log(`BROWSER LOG: ${msg.text()}`);
    });

    test.setTimeout(180000); // 3 min

    console.log('🚀 Starting Smoke Test...');
    await page.goto('/');

    // 1. Select Grade 11
    console.log('Searching for Grade 11 button...');
    const grade11Btn = page.getByRole('button', { name: '11° Grado' });
    await expect(grade11Btn).toBeVisible({ timeout: 15000 });

    console.log('Clicking Grade 11 button...');
    console.log('HTML of button:', await grade11Btn.innerHTML());
    await grade11Btn.evaluate(node => node.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window })));

    // 2. Wait for Modal
    console.log('Waiting for Config Modal (loading questions)...');
    await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 90000 });
    console.log('Modal visible!');

    // 3. Select Sociales
    console.log('Selecting Sociales y Ciudadanas...');
    await page.getByRole('combobox').selectOption('Sociales y Ciudadanas');

    // 4. Select Period 3 (Constitucion is in P3)
    console.log('Selecting Por Periodo -> Periodo 3...');
    await page.getByRole('button', { name: 'Por Periodo' }).click();
    await page.getByRole('button', { name: 'Periodo 3', exact: false }).click();

    // 5. Select 5 questions
    console.log('Selecting 5 questions...');
    await page.getByRole('button', { name: '5', exact: true }).click();

    // 6. Start
    console.log('Clicking Comenzar...');
    await page.getByRole('button', { name: 'Comenzar' }).click();

    // 7. Validate questions
    console.log('Waiting for questions to load...');
    await expect(page.getByTestId('options-grid')).toBeVisible({ timeout: 30000 });
    console.log('✅ SUCCESS: Questions loaded for Period 3!');
});
