import { test, expect, type BrowserContext, type Page } from '@playwright/test';

test.describe('Party Mode - Anti-Cheat & Focus Tracking', () => {
  let hostContext: BrowserContext;
  let hostPage: Page;
  let guestContext: BrowserContext;
  let guestPage: Page;

  test.beforeAll(async ({ browser }) => {
    hostContext = await browser.newContext();
    hostPage = await hostContext.newPage();
    guestContext = await browser.newContext();
    guestPage = await guestContext.newPage();
  });

  test.afterAll(async () => {
    await hostContext.close();
    await guestContext.close();
  });

  test('Detects focus loss and reports to Host', async () => {
    test.setTimeout(120000);

    // 1. Host Creates Party
    console.log('🎓 Host creating party...');
    await hostPage.goto('/');

    // Wait for landing load
    await expect(hostPage.locator('h1')).toContainText('Saber', { timeout: 30000 });

    // Open Config Modal
    await hostPage.getByText('Iniciar Examen').click();
    await expect(hostPage.locator('text=Configuración')).toBeVisible();

    // Enable Party Mode
    const partySwitch = hostPage.getByRole('switch');
    await partySwitch.click();

    // Ensure "Crear Party" tab is selected (default)
    await hostPage.getByRole('button', { name: /crear party/i }).click();

    // Generate Code
    await hostPage.getByRole('button', { name: /generar código/i }).click();

    // Wait for code
    await expect(hostPage.locator('text=Código de Sesión')).toBeVisible({ timeout: 15000 });
    // We might need to be more specific if there are other 6-char strings, but usually the code is prominent
    // Let's try to get it from the element text
    const codeElement = hostPage.locator('.text-4xl.font-black.font-mono');
    const partyCode = await codeElement.innerText();

    expect(partyCode).toBeTruthy();
    console.log(`✅ Party Code: ${partyCode}`);

    // 2. Guest Joins
    console.log('👤 Guest joining...');
    await guestPage.goto('/');
    await guestPage.getByText('Iniciar Examen').click();
    await guestPage.getByRole('switch').click();
    await guestPage.getByRole('button', { name: /unirse/i }).click();

    await guestPage.fill('input[placeholder*="código" i]', partyCode);
    await guestPage.fill('input[placeholder*="nombre" i]', 'Cheater John');
    await guestPage.getByRole('button', { name: /unirse/i }).last().click(); // .last() because there might be other buttons

    await expect(guestPage.locator('text=Conectado a Sala')).toBeVisible();

    // 3. Host Starts Exam
    console.log('🚀 Host starting exam...');
    await hostPage.getByRole('button', { name: /iniciar/i }).click();

    // Wait for exam to start on both
    await expect(hostPage.locator('.i-lucide-book-open')).toBeVisible({ timeout: 10000 });
    await expect(guestPage.locator('.i-lucide-book-open')).toBeVisible({ timeout: 10000 });

    // 4. Simulate Cheating (Focus Loss) on Guest
    console.log('👀 Simulating focus loss on Guest...');

    // Trigger blur event manually since Playwright focus management can be tricky
    await guestPage.evaluate(() => {
        window.dispatchEvent(new Event('blur'));
    });

    // 5. Verify Host Alert
    console.log('⚠️ Verifying alert on Host...');
    // The alert text is "⚠️ Cheater John perdió el foco!"
    await expect(hostPage.locator('text=Cheater John perdió el foco')).toBeVisible({ timeout: 5000 });
    console.log('✅ Host received focus alert!');

    // 6. Finish Exam
    console.log('🏁 Finishing exam...');
    // Answer one question to ensure result is recorded
    await guestPage.locator('[data-testid="options-grid"] > button').first().click();
    await guestPage.getByRole('button', { name: /siguiente/i }).click();

    // Host finishes for everyone
    await hostPage.getByRole('button', { name: /finalizar/i }).click();
    // Confirm finish if modal appears
    if (await hostPage.locator('button:has-text("Sí, finalizar")').isVisible()) {
        await hostPage.locator('button:has-text("Sí, finalizar")').click();
    }

    // 7. Verify Results
    console.log('📊 Verifying results...');
    await expect(hostPage.locator('text=Resultados de Party')).toBeVisible({ timeout: 10000 });

    // Check for "Usuarios Distraídos" count
    // We expect at least 1 distracted user
    const distractedCount = hostPage.locator('text=Usuarios Distraídos').locator('..').locator('.text-4xl');
    await expect(distractedCount).toHaveText('1');

    console.log('✅ Anti-Cheat System Verified!');
  });
});
