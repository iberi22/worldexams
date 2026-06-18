import { test, expect } from '@playwright/test';

const BASE_URL = 'https://saberparatodos.space';

async function closeModals(page: any) {
  await page.waitForTimeout(6000); // hero auto-dismiss
  for (let i = 0; i < 5; i++) {
    const btn = page.locator('button').filter({ hasText: 'Entendido' }).first();
    if (await btn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await btn.click({ force: true, timeout: 5000 });
      await page.waitForTimeout(500);
    } else break;
  }
}

test.describe('Context Panel Layout tests', () => {
  test.setTimeout(300_000);

  test('Mobile drawer opens correctly when Ver Lectura is clicked', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    console.log('▶ [1] Navigate home...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(2000);

    console.log('▶ [2] Close overlays...');
    await closeModals(page);

    console.log('▶ [3] Click 11° Grado...');
    const grade11Btn = page.getByRole('button', { name: /^11[°º].*Ruta/i });
    await expect(grade11Btn).toBeVisible({ timeout: 15000 });
    await grade11Btn.click();

    console.log('▶ [4] Wait for config modal...');
    await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 30000 });
    await page.waitForTimeout(1500);

    console.log('▶ [5] Select Inglés...');
    const subjectSelect = page.locator('select').first();
    if (await subjectSelect.isVisible({ timeout: 5000 }).catch(() => false)) {
      const options = await subjectSelect.locator('option').all();
      let inglesValue = '';
      for (const opt of options) {
        const text = await opt.innerText();
        if (/inglés/i.test(text)) {
          inglesValue = await opt.getAttribute('value') || text;
          break;
        }
      }
      if (inglesValue) {
        await subjectSelect.selectOption(inglesValue);
        await page.waitForTimeout(500);
      }
    }

    const btn30 = page.locator('button').filter({ hasText: '30' }).first();
    if (await btn30.isVisible({ timeout: 3000 }).catch(() => false)) {
      await btn30.click();
      await page.waitForTimeout(300);
    }

    console.log('▶ [6] Click Comenzar...');
    const comenzar = page.locator('button').filter({ hasText: /Comenzar/i }).first();
    await expect(comenzar).toBeVisible({ timeout: 10000 });
    await comenzar.click();

    console.log('▶ [7] Wait for exam...');
    await page.waitForTimeout(5000);
    const sigBtn = page.getByRole('button', { name: /Siguiente|SIGUIENTE/i });
    await expect(sigBtn).toBeVisible({ timeout: 120000 });
    await page.waitForTimeout(2000);

    let foundContext = false;
    for (let i = 0; i < 20; i++) {
      // Look for mobile "Ver Lectura" button
      const verLecturaBtn = page.locator('button').filter({ hasText: /Ver Lectura/i }).first();
      
      if (await verLecturaBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        console.log(`  Q${i + 1}: ✅ Encontrado botón "Ver Lectura" en móvil`);
        foundContext = true;
        
        // Clic para abrir el drawer
        await verLecturaBtn.click();
        await page.waitForTimeout(500);
        
        // Validar que el drawer con el contenido del contexto esté visible
        const drawerHeader = page.locator('.z-50 h3').filter({ hasText: /Contexto de Lectura/i }).first();
        await expect(drawerHeader).toBeVisible({ timeout: 5000 });
        
        const closeBtn = page.locator('button').filter({ hasText: /Cerrar Lectura/i }).first();
        await expect(closeBtn).toBeVisible({ timeout: 5000 });
        
        // Cerrar el drawer
        await closeBtn.click();
        await page.waitForTimeout(500);
        break;
      }
      
      const sig = page.getByRole('button', { name: /Siguiente|SIGUIENTE/i }).first();
      if (await sig.isVisible({ timeout: 5000 }).catch(() => false)) {
        await sig.click();
        await page.waitForTimeout(1500);
      } else {
        break;
      }
    }
    
    expect(foundContext).toBeTruthy();
  });
});
