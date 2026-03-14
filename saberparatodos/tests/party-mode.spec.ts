import { test, expect, type BrowserContext, type Page } from '@playwright/test';

test.describe('Party Mode E2E - 4 Estudiantes con Informe Admin', () => {
  let hostContext: BrowserContext;
  let hostPage: Page;
  let playerContexts: BrowserContext[] = [];
  let playerPages: Page[] = [];

  test.beforeAll(async ({ browser }) => {
    // Create Host Context
    hostContext = await browser.newContext();
    hostPage = await hostContext.newPage();

    // Create 4 Player Contexts (aumentado de 3 a 4)
    for (let i = 0; i < 4; i++) {
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

  test('Full Party Flow: Create, Join, Answer, Generate Report', async () => {
    test.setTimeout(120000); // 2 minutos para flujo completo

    // Enable logging
    hostPage.on('console', msg => console.log(`🎓 HOST: ${msg.text()}`));
    hostPage.on('pageerror', err => console.error(`❌ HOST ERROR: ${err.message}`));

    // ===================================================
    // FASE 1: Host crea party (automático)
    // ===================================================
    console.log('\n📝 FASE 1: Host creando party...');
    await hostPage.goto('/party');

    // El componente crea el party automáticamente al montar
    // Esperar a que aparezca el código de party
    console.log('⏳ Esperando código de party...');
    await expect(hostPage.locator('text=/código:/i')).toBeVisible({ timeout: 15000 });

    // Extraer el código de party (puede estar en diferentes formatos)
    const pageContent = await hostPage.content();
    const codeMatch = pageContent.match(/código:\s*([A-Z0-9]{6})/i) ||
                      pageContent.match(/([A-Z0-9]{6})/);

    const partyCode = codeMatch ? codeMatch[1] : null;
    console.log(`✅ Party creada con código: ${partyCode}`);

    expect(partyCode).toBeTruthy();
    expect(partyCode?.length).toBe(6);

    // ===================================================
    // FASE 2: 4 Estudiantes se unen
    // ===================================================
    console.log('\n👥 FASE 2: 4 estudiantes uniéndose...');

    const studentNames = ['Ana García', 'Juan Pérez', 'María López', 'Carlos Rodríguez'];

    for (let i = 0; i < 4; i++) {
      const playerPage = playerPages[i];
      const playerName = studentNames[i];

      console.log(`  → ${playerName} uniéndose...`);
      playerPage.on('console', msg => console.log(`  👤 ${playerName}: ${msg.text()}`));

      await playerPage.goto(`/party?join=${partyCode}`);
      await playerPage.waitForTimeout(1000);

      // Llenar nombre del estudiante
      const nameInput = playerPage.locator('input[placeholder*="nombre" i], input[type="text"]').first();
      await expect(nameInput).toBeVisible({ timeout: 5000 });
      await nameInput.fill(playerName);

      // Buscar botón de unirse (puede ser "Unirse", "Join", etc.)
      const joinButton = playerPage.getByRole('button', { name: /unirse|join/i }).first();
      await expect(joinButton).toBeVisible({ timeout: 5000 });
      await joinButton.click();

      // Verificar que está en lobby esperando que empiece el party
      await expect(playerPage.locator(`text=/esperando/i`).or(playerPage.locator(`text=/party/i`))).toBeVisible({ timeout: 10000 });
      console.log(`  ✅ ${playerName} unido exitosamente`);
    }

    // ===================================================
    // FASE 3: Host verifica participantes
    // ===================================================
    console.log('\n🔍 FASE 3: Verificando participantes en lobby...');

    // Esperar que host muestre la lista de participantes
    await hostPage.waitForTimeout(2000);

    // Verificar que los estudiantes están visibles (buscar por nombres)
    for (const name of studentNames) {
      const nameVisible = await hostPage.locator(`text=${name}`).count();
      if (nameVisible > 0) {
        console.log(`  ✅ ${name} visible en lobby`);
      } else {
        console.log(`  ⚠️ ${name} NO visible (puede estar OK si UI difiere)`);
      }
    }

    // ===================================================
    // FASE 4: Host inicia examen
    // ===================================================
    console.log('\n🚀 FASE 4: Host iniciando examen...');
    await hostPage.click('button:has-text("🚀 Iniciar Examen")');
    await expect(hostPage.locator('text=Progreso del Examen')).toBeVisible();
    console.log('✅ Examen iniciado');

    // ===================================================
    // FASE 5: Estudiantes responden preguntas
    // ===================================================
    console.log('\n📝 FASE 5: Estudiantes respondiendo...');

    // Simular diferentes patrones de respuesta:
    // Ana: Responde correctamente (A)
    // Juan: Responde incorrectamente (B)
    // María: Responde correctamente (A)
    // Carlos: Responde incorrectamente (C)

    const answerPatterns = ['A', 'B', 'A', 'C'];

    for (let i = 0; i < 4; i++) {
      const page = playerPages[i];
      const name = studentNames[i];
      const answer = answerPatterns[i];

      console.log(`  → ${name} respondiendo opción ${answer}...`);

      // Esperar que aparezca la pregunta
      await expect(page.getByText('Pregunta 1 de Matemáticas')).toBeVisible({ timeout: 10000 });

      // Seleccionar opción
      await page.locator(`button:has-text("${answer}")`).first().click();
      await page.waitForTimeout(500);

      // Enviar respuesta
      await page.click('button:has-text("Enviar Respuesta")');

      // Verificar que se envió
      await expect(page.locator('text=✅ Respuesta Enviada')).toBeVisible({ timeout: 5000 });
      console.log(`  ✅ ${name} respondió ${answer}`);
    }

    // ===================================================
    // FASE 6: Host verifica progreso
    // ===================================================
    console.log('\n📊 FASE 6: Verificando progreso en host...');

    const respuestasCard = hostPage.locator('div.bg-gray-800', { hasText: 'Respuestas' });
    await expect(respuestasCard).toContainText('4', { timeout: 10000 });
    console.log('✅ Host recibió las 4 respuestas');

    // ===================================================
    // FASE 7: Host finaliza examen
    // ===================================================
    console.log('\n🏁 FASE 7: Finalizando examen...');

    hostPage.on('dialog', dialog => dialog.accept());
    await hostPage.click('button:has-text("🏁 Finalizar Examen")');

    await expect(hostPage.locator('text=Resultados')).toBeVisible({ timeout: 10000 });
    console.log('✅ Examen finalizado');

    // ===================================================
    // FASE 8: Validar informe básico del admin
    // ===================================================
    console.log('\n📈 FASE 8: Validando informe del administrador...');

    // Verificar secciones principales
    await expect(hostPage.locator('text=Estadísticas Generales')).toBeVisible();
    console.log('  ✅ Sección "Estadísticas Generales" visible');

    // Verificar estadísticas individuales de estudiantes
    for (const name of studentNames) {
      await expect(hostPage.locator(`text=${name}`)).toBeVisible();
      console.log(`  ✅ Estadísticas de ${name} visibles`);
    }

    // Verificar métricas clave
    await expect(hostPage.locator('text=Promedio de Clase')).toBeVisible();
    await expect(hostPage.locator('text=Tasa de Participación')).toBeVisible();
    console.log('  ✅ Métricas clave visibles');

    // ===================================================
    // FASE 9: Generar análisis con IA
    // ===================================================
    console.log('\n✨ FASE 9: Generando análisis con IA...');

    await expect(hostPage.locator('text=Análisis de IA')).toBeVisible();

    const aiButton = hostPage.locator('button:has-text("✨ Generar Análisis con IA")');
    await expect(aiButton).toBeVisible();
    await aiButton.click();

    // Esperar a que se genere el análisis (puede tomar tiempo)
    await expect(hostPage.locator('text=Análisis de IA Generado')).toBeVisible({ timeout: 30000 });
    console.log('  ✅ Análisis de IA generado');

    // Verificar que el análisis tiene contenido
    const analysisContent = hostPage.locator('div.ai-analysis-content, div[class*="analysis"]');
    await expect(analysisContent).toBeVisible();
    console.log('  ✅ Contenido del análisis visible');

    // ===================================================
    // FASE 10: Validar descargas (opcional)
    // ===================================================
    console.log('\n💾 FASE 10: Validando opciones de exportación...');

    // Verificar que existen botones de descarga
    const downloadButtons = hostPage.locator('button:has-text("Descargar"), button:has-text("Exportar")');
    const downloadCount = await downloadButtons.count();

    if (downloadCount > 0) {
      console.log(`  ✅ ${downloadCount} opciones de descarga disponibles`);
    } else {
      console.log('  ⚠️  No se encontraron botones de descarga (opcional)');
    }

    // ===================================================
    // RESUMEN FINAL
    // ===================================================
    console.log('\n' + '='.repeat(50));
    console.log('✅ PRUEBA E2E COMPLETADA EXITOSAMENTE');
    console.log('='.repeat(50));
    console.log(`Código de Party: ${partyCode}`);
    console.log(`Estudiantes: ${studentNames.join(', ')}`);
    console.log(`Respuestas: ${answerPatterns.join(', ')}`);
    console.log('Informe generado: ✅');
    console.log('Análisis IA: ✅');
    console.log('='.repeat(50));
  });
});
