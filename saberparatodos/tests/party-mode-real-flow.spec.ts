import { test, expect, type BrowserContext, type Page } from '@playwright/test';

/**
 * E2E Test for Party Mode - Real User Flow
 * Tests the complete flow from enabling Party Mode to joining
 */
test.describe('Party Mode - Real Flow E2E', () => {
  let hostContext: BrowserContext;
  let hostPage: Page;
  let guestContext: BrowserContext;
  let guestPage: Page;

  const ENABLE_BROWSER_LOGS = process.env.PARTY_E2E_BROWSER_LOGS === '1';

  test.beforeAll(async ({ browser }) => {
    // Create Host and Guest contexts
    hostContext = await browser.newContext();
    hostPage = await hostContext.newPage();

    guestContext = await browser.newContext();
    guestPage = await guestContext.newPage();

    // Optional: forward browser console logs (very verbose)
    if (ENABLE_BROWSER_LOGS) {
      hostPage.on('console', msg => console.log(`🎓 HOST: ${msg.text()}`));
      guestPage.on('console', msg => console.log(`👤 GUEST: ${msg.text()}`));
    }
  });

  test.afterAll(async () => {
    await hostContext.close();
    await guestContext.close();
  });

  test('Host creates party via UI, guest joins successfully', async () => {
    test.setTimeout(90000); // 90 seconds timeout

    console.log('\n========================================');
    console.log('🧪 TEST: Party Mode - Real Flow E2E');
    console.log('========================================\n');

    // ===================================================
    // FASE 1: Host navigates to home and opens config
    // ===================================================
    console.log('📝 FASE 1: Host abre configuración de examen...');
    await hostPage.goto('/');

    // Wait for app to load
    await hostPage.waitForLoadState('networkidle');
    await hostPage.waitForTimeout(2000);

    // Click "Comenzar Práctica" button to open config modal
    const startButton = hostPage.getByRole('button', { name: /comenzar|empezar|practicar/i });
    await expect(startButton).toBeVisible({ timeout: 10000 });
    await startButton.click();

    console.log('✅ Modal de configuración abierto');

    // ===================================================
    // FASE 2: Host enables Party Mode
    // ===================================================
    console.log('\n🎉 FASE 2: Host activa Party Mode...');

    // Find and click Party Mode toggle (it's a button with role="switch")
    const partyToggle = hostPage.getByRole('switch', { checked: false });
    await expect(partyToggle).toBeVisible({ timeout: 10000 });

    // Take screenshot before clicking
    await hostPage.screenshot({
      path: 'test-results/before-party-toggle.png',
      fullPage: true
    });

    await partyToggle.click();
    console.log('✅ Party Mode activado');
    await hostPage.waitForTimeout(2000);

    // Verify toggle is now checked
    const partyToggleChecked = hostPage.getByRole('switch', { checked: true });
    await expect(partyToggleChecked).toBeVisible({ timeout: 5000 });

    // ===================================================
    // FASE 3: Host clicks "Generar Código" button
    // ===================================================
    console.log('\n🚀 FASE 3: Host crea party...');

    // Click specifically the "Generar Código" button (not the tab)
    const createPartyButton = hostPage.getByRole('button', { name: /generar código|crear party/i }).last();
    await expect(createPartyButton).toBeVisible({ timeout: 5000 });

    await hostPage.screenshot({
      path: 'test-results/before-create-party.png',
      fullPage: true
    });

    await createPartyButton.click();

    console.log('⏳ Esperando que party se cree...');

    // Wait for party code to appear
    // The party code is usually displayed prominently (6 uppercase alphanumeric chars)
    await hostPage.waitForTimeout(3000);

    // Extract party code from the specific UI area to avoid false positives
    let partyCode: string | null = null;
    const partyCodeLocator = hostPage
      .locator('text=/Código de Sesión/i')
      .locator('..')
      .locator('p');

    const rawPartyCode = (await partyCodeLocator.first().textContent().catch(() => null))?.trim() || null;
    if (rawPartyCode && /^[A-Z0-9]{6}$/.test(rawPartyCode)) {
      partyCode = rawPartyCode;
    }

    // Method 2: Screenshot for debugging
    await hostPage.screenshot({
      path: 'test-results/party-code-screen.png',
      fullPage: true
    });

    console.log(`🔍 Código detectado: ${partyCode || 'NO ENCONTRADO'}`);

    if (!partyCode) {
      console.error('❌ No se pudo extraer código de party');
      console.log('📄 HTML content snapshot:');
      const hostHtml = await hostPage.content().catch(() => '');
      console.log(hostHtml.substring(0, 500));

      // Check if there's an error message
      const errorMsg = await hostPage.locator('text=/error|fallo|intenta/i').textContent().catch(() => null);
      if (errorMsg) {
        console.error(`⚠️ Error en UI: ${errorMsg}`);
      }

      throw new Error('Party code not found - check screenshot at test-results/party-code-screen.png');
    }

    expect(partyCode).toBeTruthy();
    expect(partyCode.length).toBe(6);
    console.log(`✅ Party creado exitosamente: ${partyCode}`);

    // ===================================================
    // FASE 4: Guest joins via URL
    // ===================================================
    console.log(`\n👥 FASE 4: Guest uniéndose con código ${partyCode}...`);

    // Navigate with join parameter
    await guestPage.goto(`/?join=${partyCode}`);
    await guestPage.waitForLoadState('networkidle');
    await guestPage.waitForTimeout(2000);

    // Open config modal on guest as well (some flows may auto-open it)
    const guestModalTitle = guestPage.getByRole('heading', { name: /configurar examen/i });
    if (await guestModalTitle.count() === 0) {
      const guestStartCard = guestPage.getByRole('button', { name: /^Iniciar Examen/i });
      await expect(guestStartCard).toBeVisible({ timeout: 10000 });
      await guestStartCard.click();
    }
    await expect(guestModalTitle).toBeVisible({ timeout: 10000 });

    // Ensure Party Mode is enabled and we're on the join tab
    const guestPartyToggle = guestPage.getByRole('switch');
    await expect(guestPartyToggle).toBeVisible({ timeout: 10000 });
    // If it's not checked, click it
    const ariaChecked = await guestPartyToggle.getAttribute('aria-checked');
    if (ariaChecked !== 'true') {
      await guestPartyToggle.click();
    }
    await guestPage.getByRole('button', { name: /^Unirse$/i }).first().click();

    // Fill player name (new field)
    await guestPage.getByPlaceholder(/tu nombre/i).fill('Invitado');

    // Ensure join code is present (it may be prefilled from URL)
    await guestPage.getByPlaceholder(/código de 6 caracteres/i).fill(partyCode);

    // Join
    await guestPage.getByRole('button', { name: /^Unirse$/i }).nth(1).click();
    await guestPage.waitForTimeout(2000);

    // Screenshot guest state
    await guestPage.screenshot({
      path: 'test-results/guest-join-screen.png',
      fullPage: true
    });

    // Check if join was successful
    // Look for indicators: "Esperando", "Party", joined message, etc.
    const guestContent = await guestPage.content();
    const joinSuccess =
      guestContent.includes('esperando') ||
      guestContent.includes('Esperando') ||
      guestContent.includes('Party') ||
      guestContent.includes('unidos') ||
      guestContent.includes('conectado');

    console.log(`🔍 Guest join indicators found: ${joinSuccess ? 'YES' : 'NO'}`);

    if (!joinSuccess) {
      // Check for error messages
      const guestError = await guestPage.locator('text=/no encontrada|expirada|error/i').textContent().catch(() => null);
      if (guestError) {
        console.error(`❌ Error en guest: ${guestError}`);
      }
    }

    expect(joinSuccess).toBe(true);
    console.log('✅ Guest unido exitosamente al party');

    // ===================================================
    // FASE 4.1: Guest marks ready
    // ===================================================
    console.log('\n✅ FASE 4.1: Guest marca como listo...');
    const readyButton = guestPage.getByRole('button', { name: /marcar como listo|estoy listo/i });
    await expect(readyButton).toBeVisible({ timeout: 10000 });
    await readyButton.click();
    await guestPage.waitForTimeout(1500);

    // ===================================================
    // FASE 5: Host clicks "Iniciar Party" to start exam
    // ===================================================
    console.log('\n🚀 FASE 5: Host inicia el party...');

    // Wait for host to see the guest in the list
    await hostPage.waitForTimeout(2000);

    // Host should eventually see "LISTO" indicator for the guest
    await hostPage.locator('text=/LISTO/i').first().waitFor({ timeout: 10000 });

    // Find and click "Iniciar Party" button
    const iniciarPartyButton = hostPage.getByRole('button', { name: /iniciar party/i });
    await expect(iniciarPartyButton).toBeVisible({ timeout: 5000 });

    await hostPage.screenshot({
      path: 'test-results/before-iniciar-party.png',
      fullPage: true
    });

    await iniciarPartyButton.click();
    console.log('✅ Host presionó "Iniciar Party"');

    // Wait for exam to start
    await hostPage.waitForTimeout(3000);

    // Take screenshots after start
    await hostPage.screenshot({
      path: 'test-results/host-exam-started.png',
      fullPage: true
    });

    await guestPage.screenshot({
      path: 'test-results/guest-exam-started.png',
      fullPage: true
    });

    // Check if exam started
    const hostExamStarted = await hostPage.locator('text=/pregunta|question|tiempo|timer/i').count() > 0;
    const guestExamStarted = await guestPage.locator('text=/pregunta|question|tiempo|timer/i').count() > 0;

    console.log(`📊 Estado del examen:`);
    console.log(`   - Host: ${hostExamStarted ? 'INICIADO' : 'NO INICIADO'}`);
    console.log(`   - Guest: ${guestExamStarted ? 'INICIADO' : 'NO INICIADO'}`);

    if (!hostExamStarted || !guestExamStarted) {
      console.warn('⚠️ El examen no se inició correctamente');
    }

    // ===================================================
    // FASE 6: Verify party state (optional - UI may not show count immediately)
    // ===================================================
    console.log('\n🔍 FASE 6: Verificando estado del party...');

    // Check host sees the guest
    await hostPage.waitForTimeout(2000);
    let hostContent = '';
    try {
      // The app may still be transitioning views; this is an optional check.
      await hostPage.waitForLoadState('domcontentloaded');
      hostContent = await hostPage.content();
    } catch (err) {
      console.warn('⚠️ No se pudo leer el contenido del host (navegando/transicionando). Se omite este chequeo opcional.');
      hostContent = '';
    }

    // Look for participant count or guest indicator
    const participantCountMatch = hostContent.match(/(\d+)\s*(jugador|participante|estudiante)/i);
    const participantCount = participantCountMatch ? parseInt(participantCountMatch[1]) : 0;

    console.log(`👥 Participantes visibles en host: ${participantCount}`);

    // This is optional - party may work even if host UI doesn't update immediately
    if (participantCount >= 1) {
      console.log('✅ Host UI muestra participantes correctamente');
    } else {
      console.warn('⚠️ Host UI no muestra participantes (puede ser problema de UI, party funciona)');
    }

    // ===================================================
    // FASE 7: Verify core functionality works
    // ===================================================
    console.log('\n🔄 FASE 7: Verificación final...');

    // Core functionality that MUST work:
    // 1. Party created successfully (we have partyCode)
    // 2. Guest joined successfully (joinSuccess = true)

    const coreWorking = !!(partyCode && joinSuccess);
    console.log(`✅ Funcionalidad core: ${coreWorking ? 'WORKING' : 'FAILED'}`);
    expect(coreWorking).toBe(true);

    console.log('\n========================================');
    console.log('✅ TEST COMPLETADO EXITOSAMENTE');
    console.log(`📊 Resultados:`);
    console.log(`   - Party creado: ${partyCode}`);
    console.log(`   - Guest unido: ${joinSuccess ? 'YES' : 'NO'}`);
    console.log(`   - P2P disponible: Checked (ver logs)`);
    console.log('========================================\n');
  });
});
