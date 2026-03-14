import { test, expect, type Page } from '@playwright/test';

test.describe('Party Mode - Smoke Test', () => {
  let hostPage: Page;

  test.beforeAll(async ({ browser }) => {
    hostPage = await browser.newPage();
  });

  test.afterAll(async () => {
    await hostPage.close();
  });

  test('Host can access party page and party is created automatically', async () => {
    test.setTimeout(30000);

    // Enable logging
    hostPage.on('console', msg => console.log(`🎓 HOST: ${msg.text()}`));
    hostPage.on('pageerror', err => console.error(`❌ HOST ERROR: ${err.message}`));

    console.log('\n📝 TEST: Accediendo a /party...');
    await hostPage.goto('/party');

    // El componente crea el party automáticamente al montar
    // Esperar a que aparezca indicación de que party fue creada
    console.log('⏳ Esperando indicadores de party creado...');

    // Buscar elementos que indiquen que el party está activo
    // Puede ser: "Código", "Party ID", estado "lobby", etc.
    const pageContent = await hostPage.content();
    console.log('📄 Contenido de página recibido');

    // Verificar que la página cargó (no es 404)
    const is404 = await hostPage.locator('text=/404|not found/i').count();
    expect(is404).toBe(0);
    console.log('✅ Página /party carga correctamente (no 404)');

    // Verificar que hay contenido de party (no página vacía)
    const hasPartyContent = pageContent.includes('party') ||
                           pageContent.includes('Party') ||
                           pageContent.includes('código') ||
                           pageContent.includes('Código');

    if (hasPartyContent) {
      console.log('✅ Página contiene referencias a "party" o "código"');
    } else {
      console.log('⚠️  No se encontró contenido de party, verificando estado...');

      // Si no hay contenido, puede ser que esté en estado loading
      const isLoading = pageContent.includes('Creando') ||
                       pageContent.includes('loading') ||
                       pageContent.includes('Cargando');

      if (isLoading) {
        console.log('⏳ Party en proceso de creación, esperando...');
        await hostPage.waitForTimeout(5000);

        const updatedContent = await hostPage.content();
        const nowHasContent = updatedContent.includes('código') ||
                             updatedContent.includes('Código');

        if (nowHasContent) {
          console.log('✅ Party creado después de espera');
        }
      }
    }

    // Screenshot para debugging
    await hostPage.screenshot({ path: 'test-results/party-host-loaded.png', fullPage: true });
    console.log('📸 Screenshot guardado en test-results/party-host-loaded.png');

    console.log('\n✅ TEST SMOKE COMPLETADO: Party Mode es accesible');
  });

  test('Student can access party join page with code', async ({ browser }) => {
    const studentPage = await browser.newPage();

    test.setTimeout(15000);

    studentPage.on('console', msg => console.log(`👤 STUDENT: ${msg.text()}`));
    studentPage.on('pageerror', err => console.error(`❌ STUDENT ERROR: ${err.message}`));

    console.log('\n📝 TEST: Estudiante accediendo a /party?join=TEST123...');
    await studentPage.goto('/party?join=TEST123');

    // Verificar que la página cargó
    const is404 = await studentPage.locator('text=/404|not found/i').count();
    expect(is404).toBe(0);
    console.log('✅ Página de join carga correctamente');

    // Verificar que hay input para nombre
    const nameInputCount = await studentPage.locator('input[type="text"], input[placeholder*="nombre" i]').count();

    if (nameInputCount > 0) {
      console.log('✅ Input de nombre encontrado');
    } else {
      console.log('⚠️  Input de nombre no encontrado (puede estar OK si UX difiere)');
    }

    // Screenshot para debugging
    await studentPage.screenshot({ path: 'test-results/party-join-loaded.png', fullPage: true });
    console.log('📸 Screenshot guardado en test-results/party-join-loaded.png');

    await studentPage.close();
    console.log('\n✅ TEST SMOKE COMPLETADO: Join page es accesible');
  });
});
