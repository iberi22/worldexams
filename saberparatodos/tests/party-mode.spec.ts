import { test, expect, type BrowserContext, type Page } from '@playwright/test';

test.describe('Party Mode E2E', () => {
  let hostContext: BrowserContext;
  let hostPage: Page;
  let playerContexts: BrowserContext[] = [];
  let playerPages: Page[] = [];

  test.beforeAll(async ({ browser }) => {
    // Create Host Context
    hostContext = await browser.newContext();
    hostPage = await hostContext.newPage();

    // Create 3 Player Contexts
    for (let i = 0; i < 3; i++) {
      const context = await browser.newContext();
      const page = await context.newPage();
      playerContexts.push(context);
      playerPages.push(page);
    }
  });

  test.afterAll(async () => {
    await hostContext.close();
    for (const context of playerContexts) {
      await context.close();
    }
  });

  test('Full Party Flow: Create and Join', async () => {
    test.setTimeout(60000);
    hostPage.on('console', msg => console.log(`HOST LOG: ${msg.text()}`));
    hostPage.on('pageerror', err => console.log(`BROWSER ERROR: ${err.message}`));

    // 1. Host creates party
    console.log('Host creating party...');
    await hostPage.goto('/party');
    
    // Debug: Check what's on the page
    await hostPage.waitForTimeout(2000);
    const content = await hostPage.content();
    if (content.includes('Detectando servidor...')) {
        console.log('Still detecting server...');
    } else {
        console.log('Server detection finished.');
    }
    
    // Check if "Crear Party" is visible
    const createButton = hostPage.getByRole('button', { name: 'Crear Party' });
    if (await createButton.isVisible()) {
        console.log('Create Party button is visible');
    } else {
        console.log('Create Party button is NOT visible');
        // console.log('Page content preview:', content.substring(0, 1000));
    }

    await createButton.click();
    await hostPage.fill('input[placeholder="Ej: Profesor García"]', 'Profesor X');
    await hostPage.fill('input[placeholder="Ej: Examen Final Matemáticas 11°"]', 'Examen E2E');
    await hostPage.click('text=🚀 Crear Party');

    // Wait for Lobby and get Code
    await expect(hostPage.locator('text=Código:')).toBeVisible({ timeout: 10000 });
    const codeElement = hostPage.locator('text=Código: >> span');
    const partyCode = await codeElement.textContent();
    console.log(`Party created with code: ${partyCode}`);
    expect(partyCode).toBeTruthy();
    expect(partyCode?.length).toBe(6);

    // 2. Players join party
    for (let i = 0; i < 3; i++) {
      const playerPage = playerPages[i];
      const playerName = `Estudiante ${i + 1}`;
      console.log(`${playerName} joining party...`);
      playerPage.on('console', msg => console.log(`PLAYER ${i+1} LOG: ${msg.text()}`));

      await playerPage.goto('/party');
      await playerPage.waitForTimeout(1000); // Wait for backend detection

      const joinButton = playerPage.getByRole('button', { name: 'Unirse a Party' });
      await joinButton.click();
      
      await playerPage.fill('input[placeholder="Ej: Juan Pérez"]', playerName);
      await playerPage.fill('input[placeholder="Ej: ABC123"]', partyCode!);
      await playerPage.click('text=🎓 Unirse a Party');

      // Verify player is in lobby
      await expect(playerPage.locator(`text=${partyCode}`)).toBeVisible({ timeout: 10000 });
      await expect(playerPage.locator('text=Participantes')).toBeVisible();
    }

    // 3. Verify Host sees all players
    console.log('Verifying players in host lobby...');

    // Host + 3 Players = 4 participants
    await expect(hostPage.locator('text=Participantes (4/100)')).toBeVisible();

    for (let i = 0; i < 3; i++) {
      await expect(hostPage.locator(`text=Estudiante ${i + 1}`)).toBeVisible();
    }

    // 4. Host starts game
    console.log('Host starting game...');
    await hostPage.click('button:has-text("🚀 Iniciar Examen")');
    await expect(hostPage.locator('text=Progreso del Examen')).toBeVisible();

    // 5. Players see game view and answer
    console.log('Players answering questions...');
    for (let i = 0; i < 3; i++) {
      const page = playerPages[i];
      // Use exact text to avoid ambiguity with "Pregunta 1/20"
      await expect(page.getByText('Pregunta 1 de Matemáticas')).toBeVisible();
      
      // Player 1 answers correctly (A), others randomly
      const option = i === 0 ? 'A' : 'B'; 
      // Click the option button (it contains the letter)
      await page.locator(`button:has-text("${option}")`).first().click();
      
      // Click submit
      await page.click('button:has-text("Enviar Respuesta")');
      
      // Verify answer submitted
      await expect(page.locator('text=✅ Respuesta Enviada')).toBeVisible();
    }

    // 6. Host sees progress
    // Wait for answers to be received
    // Find the container that has "Respuestas" and check the number inside it
    const respuestasCard = hostPage.locator('div.bg-gray-800', { hasText: 'Respuestas' });
    await expect(respuestasCard).toContainText('3', { timeout: 5000 });

    // 7. Host finishes game
    console.log('Host finishing game...');
    hostPage.on('dialog', dialog => dialog.accept());
    await hostPage.click('button:has-text("🏁 Finalizar Examen")');

    // 8. Verify Results
    console.log('Verifying results...');
    await expect(hostPage.locator('text=Resultados')).toBeVisible();
    
    // Check if Host specific stats are visible
    await expect(hostPage.locator('text=Estadísticas Generales')).toBeVisible();
    
    // Check AI Analysis section
    await expect(hostPage.locator('text=Análisis de IA')).toBeVisible();

    // 9. Request AI Analysis
    console.log('Requesting AI Analysis...');
    await hostPage.click('button:has-text("✨ Generar Análisis con IA")');
    await expect(hostPage.locator('text=Análisis de IA Generado')).toBeVisible();
    
    console.log('Full flow test completed successfully!');
  });
});
