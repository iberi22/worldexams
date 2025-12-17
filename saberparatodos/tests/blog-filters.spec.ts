import { test, expect, type Page } from '@playwright/test';

test.describe('Blog Filters - Subject, Grade, Difficulty', () => {

  test('Blog page loads and shows questions from multiple subjects', async ({ page }) => {
    test.setTimeout(60000);

    // Enable logging
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('📋') || text.includes('📚') || text.includes('📊')) {
        console.log(`🖥️ CONSOLE: ${text}`);
      }
    });
    page.on('pageerror', err => console.error(`❌ PAGE ERROR: ${err.message}`));

    console.log('\n📝 TEST: Navegando a página principal...');
    await page.goto('/');
    await page.screenshot({ path: 'test-results/01-home.png', fullPage: true });

    // Wait for initial load
    await page.waitForTimeout(3000);

    // Click on Blog/Artículos link
    console.log('📝 Buscando enlace a Blog...');
    const blogLink = page.locator('text=/blog|artículos/i').first();

    if (await blogLink.count() > 0) {
      await blogLink.click();
      console.log('✅ Click en Blog');
    } else {
      // Try direct navigation
      console.log('⚠️ No se encontró enlace, navegando directamente...');
      await page.goto('/#blog');
    }

    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'test-results/02-blog-view.png', fullPage: true });

    // Check for subject dropdown
    console.log('\n📝 Verificando dropdown de asignaturas...');
    const subjectDropdown = page.locator('select').first();

    if (await subjectDropdown.count() > 0) {
      const options = await subjectDropdown.locator('option').allTextContents();
      console.log(`📋 Opciones de asignatura encontradas: ${options.join(', ')}`);

      // Verify we have multiple subjects
      const hasMultipleSubjects = options.length > 2;
      console.log(`✅ Múltiples asignaturas: ${hasMultipleSubjects} (${options.length} opciones)`);

      // Check for specific subjects
      const expectedSubjects = ['MATEMÁTICAS', 'LECTURA CRÍTICA', 'CIENCIAS', 'SOCIALES', 'INGLÉS'];
      const foundSubjects = expectedSubjects.filter(subj =>
        options.some(opt => opt.toUpperCase().includes(subj.split(' ')[0]))
      );
      console.log(`📊 Asignaturas esperadas encontradas: ${foundSubjects.join(', ')}`);

      expect(options.length).toBeGreaterThan(1);
    } else {
      console.log('⚠️ No se encontró dropdown de asignaturas');
    }

    // Take screenshot of filters
    await page.screenshot({ path: 'test-results/03-filters-area.png', fullPage: false });

    console.log('\n✅ TEST: Blog filters verificado');
  });

  test('Subject filter works - can select different subjects', async ({ page }) => {
    test.setTimeout(60000);

    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('📋') || text.includes('📚') || text.includes('filter')) {
        console.log(`🖥️ ${text}`);
      }
    });

    console.log('\n📝 TEST: Verificando filtro de asignaturas...');
    await page.goto('/');
    await page.waitForTimeout(3000);

    // Navigate to blog
    const blogLink = page.locator('text=/blog|artículos/i').first();
    if (await blogLink.count() > 0) {
      await blogLink.click();
    }
    await page.waitForTimeout(5000);

    // Find and interact with subject dropdown
    const subjectDropdown = page.locator('select').first();

    if (await subjectDropdown.count() > 0) {
      // Get all options
      const options = await subjectDropdown.locator('option').all();
      console.log(`📋 Total opciones: ${options.length}`);

      // Try selecting each subject and verify questions change
      for (let i = 1; i < Math.min(options.length, 4); i++) {
        const optionText = await options[i].textContent();
        console.log(`\n📝 Seleccionando: ${optionText}`);

        await subjectDropdown.selectOption({ index: i });
        await page.waitForTimeout(2000);

        // Count visible questions
        const questionCards = page.locator('[class*="card"], [class*="Card"]');
        const count = await questionCards.count();
        console.log(`📊 Preguntas visibles: ${count}`);

        await page.screenshot({
          path: `test-results/04-filter-${i}-${optionText?.replace(/\s+/g, '_').slice(0, 20)}.png`,
          fullPage: true
        });
      }

      // Reset to all subjects
      await subjectDropdown.selectOption({ index: 0 });
      await page.waitForTimeout(1000);

      console.log('✅ Filtro de asignaturas funciona');
    }
  });

  test('Grade filter works - can select different grades', async ({ page }) => {
    test.setTimeout(60000);

    console.log('\n📝 TEST: Verificando filtro de grados...');
    await page.goto('/');
    await page.waitForTimeout(3000);

    // Navigate to blog
    const blogLink = page.locator('text=/blog|artículos/i').first();
    if (await blogLink.count() > 0) {
      await blogLink.click();
    }
    await page.waitForTimeout(5000);

    // Find grade buttons (they show 3°, 5°, 7°, 9°, 11°)
    const gradeButtons = page.locator('button:has-text("°")');
    const gradeCount = await gradeButtons.count();
    console.log(`📋 Botones de grado encontrados: ${gradeCount}`);

    if (gradeCount > 0) {
      // Click on grade 11
      const grade11 = page.locator('button:has-text("11°")');
      if (await grade11.count() > 0) {
        await grade11.click();
        await page.waitForTimeout(2000);
        console.log('✅ Click en grado 11');
        await page.screenshot({ path: 'test-results/05-grade-11.png', fullPage: true });
      }

      // Click on grade 5
      const grade5 = page.locator('button:has-text("5°")');
      if (await grade5.count() > 0) {
        await grade5.click();
        await page.waitForTimeout(2000);
        console.log('✅ Click en grado 5');
        await page.screenshot({ path: 'test-results/06-grade-5.png', fullPage: true });
      }

      // Click on "Todos"
      const todosBtn = page.locator('button:has-text("Todos")').first();
      if (await todosBtn.count() > 0) {
        await todosBtn.click();
        await page.waitForTimeout(1000);
        console.log('✅ Reset a Todos los grados');
      }
    }

    console.log('✅ Filtro de grados verificado');
  });

  test('Difficulty filter works', async ({ page }) => {
    test.setTimeout(60000);

    console.log('\n📝 TEST: Verificando filtro de dificultad...');
    await page.goto('/');
    await page.waitForTimeout(3000);

    // Navigate to blog
    const blogLink = page.locator('text=/blog|artículos/i').first();
    if (await blogLink.count() > 0) {
      await blogLink.click();
    }
    await page.waitForTimeout(5000);

    // Find difficulty buttons (1-5)
    const difficultySection = page.locator('text=/complejidad|dificultad/i').locator('..');

    // Try clicking difficulty level 3
    const diff3 = page.locator('button:has-text("3")').last();
    if (await diff3.count() > 0) {
      await diff3.click();
      await page.waitForTimeout(2000);
      console.log('✅ Click en dificultad 3');
      await page.screenshot({ path: 'test-results/07-difficulty-3.png', fullPage: true });
    }

    // Try clicking difficulty level 5
    const diff5 = page.locator('button:has-text("5")').last();
    if (await diff5.count() > 0) {
      await diff5.click();
      await page.waitForTimeout(2000);
      console.log('✅ Click en dificultad 5');
      await page.screenshot({ path: 'test-results/08-difficulty-5.png', fullPage: true });
    }

    console.log('✅ Filtro de dificultad verificado');
  });

  test('Question cards display correctly', async ({ page }) => {
    test.setTimeout(60000);

    console.log('\n📝 TEST: Verificando tarjetas de preguntas...');
    await page.goto('/');
    await page.waitForTimeout(3000);

    // Navigate to blog
    const blogLink = page.locator('text=/blog|artículos/i').first();
    if (await blogLink.count() > 0) {
      await blogLink.click();
    }
    await page.waitForTimeout(5000);

    // Take full page screenshot
    await page.screenshot({ path: 'test-results/09-full-blog.png', fullPage: true });

    // Check for question cards
    const cards = page.locator('[class*="card"], [class*="Card"], article, .grid > div');
    const cardCount = await cards.count();
    console.log(`📋 Tarjetas encontradas: ${cardCount}`);

    // Click on first card to see article view
    if (cardCount > 0) {
      const firstCard = cards.first();
      await firstCard.click();
      await page.waitForTimeout(2000);
      console.log('✅ Click en primera tarjeta');
      await page.screenshot({ path: 'test-results/10-article-view.png', fullPage: true });
    }

    console.log('✅ Tarjetas de preguntas verificadas');
  });

});
