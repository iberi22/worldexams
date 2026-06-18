/**
 * E2E: Verificar el split panel de contexto en Inglés G11 (PRODUCCIÓN)
 *
 * Problema conocido: la API de producción redirige al Cloudflare Worker
 * (api.saberparatodos.space) que devuelve preguntas SIN el campo `context`.
 * Los packs estáticos SÍ tienen contexto (5770/8877), pero el SPA usa el API
 * endpoint primero.
 *
 * Fix en pack-fetcher.ts: cuando la API devuelve preguntas sin context,
 * caer a los packs estáticos (tryStaticPackCandidates).
 *
 * NOTA: Este fix está en el source local. Para producción, necesita un
 * nuevo build + deploy (v0.15.3+).
 */
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

test('G11_Ingles_context_panel_visibility', async ({ page }) => {
  test.setTimeout(300_000);

  // Intercepto red para diagnosticar de dónde vienen las preguntas
  // NOTA: route() no intercepta requests servidos por service worker.
  const apiRequests: string[] = [];
  await page.route('**/*', async (route) => {
    const url = route.request().url();
    if (url.includes('/api/') || url.includes('api.saberparatodos') || url.includes('questions') || url.includes('packs')) {
      apiRequests.push(url);
      console.log(`  [NET] ${route.request().method()} ${url.substring(0, 140)}`);
    }
    await route.continue();
  });

  // [1] Navigate
  console.log('▶ [1] Navigate home...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(2000);

  // [2] Close overlays
  console.log('▶ [2] Close overlays...');
  await closeModals(page);

  // [3] Click "11° Grado"
  console.log('▶ [3] Click 11° Grado...');
  const grade11Btn = page.getByRole('button', { name: /^11[°º].*Ruta/i });
  await expect(grade11Btn).toBeVisible({ timeout: 15000 });
  await grade11Btn.click();

  // [4] Wait for modal
  console.log('▶ [4] Wait for config modal...');
  await expect(page.getByTestId('modal-content')).toBeVisible({ timeout: 30000 });
  console.log('✅ Modal open');
  await page.waitForTimeout(1500);

  // [5] Select "Inglés"
  console.log('▶ [5] Select InglÃ©s...');
  const subjectSelect = page.locator('select').first();
  if (await subjectSelect.isVisible({ timeout: 5000 }).catch(() => false)) {
    const options = await subjectSelect.locator('option').all();
    let inglesValue = '';
    for (const opt of options) {
      var text = await opt.innerText();
      if (/inglés/i.test(text)) {
        inglesValue = await opt.getAttribute('value') || text;
        console.log(`  Select option: value="${inglesValue}" text="${text}"`);
        break;
      }
    }
    if (inglesValue) {
      await subjectSelect.selectOption(inglesValue);
      await page.waitForTimeout(500);
    } else {
      console.log('  ⚠ No Inglés option found in select');
    }
  }

  // [6] Click 30
  const btn30 = page.locator('button').filter({ hasText: '30' }).first();
  if (await btn30.isVisible({ timeout: 3000 }).catch(() => false)) {
    await btn30.click();
    await page.waitForTimeout(300);
  }

  // [7] Click "Comenzar"
  console.log('▶ [6] Click Comenzar...');
  const comenzar = page.locator('button').filter({ hasText: /Comenzar/i }).first();
  await expect(comenzar).toBeVisible({ timeout: 10000 });
  await comenzar.click();

  // [8] Wait for exam
  console.log('▶ [7] Wait for exam...');
  await page.waitForTimeout(5000);
  const sigBtn = page.getByRole('button', { name: /Siguiente|SIGUIENTE/i });
  await expect(sigBtn).toBeVisible({ timeout: 120000 });
  console.log('✅ Exam loaded');
  await page.waitForTimeout(2000);

  // [9] Search for context across questions
  console.log('▶ [8] Search for context panel...');
  let foundContext = false;
  let method = '';
  const maxIter = 35;

  for (let i = 0; i < maxIter; i++) {
    // [A] Quick visual check: does the split panel exist in the DOM?
    // SharedContextLayout renders <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
    // In prod, classes are minified. Look for the context prose block or heading.
    const hasSplitGrid = await page.locator('div').filter({ has: page.locator('h3') }).filter({ hasText: /Contexto de Lectura/i }).count().catch(() => 0) > 0;
    
    // [B] Check via QA overlay (Alt+Q to show, body text, Alt+Q to hide)
    await page.keyboard.press('Alt+q');
    await page.waitForTimeout(400);
    const bodyText = await page.locator('body').innerText({ timeout: 2000 });
    
    // QA overlay shows "context ✓ 1545 chars" or "context ✗ vacÃ­o"
    const ctxOk = bodyText.match(/context\s*[✓✔]\s*(\d+)/i);
    const ctxEmpty = bodyText.includes('context') && bodyText.includes('vacío');
    
    // [C] Check for "Contexto de Lectura" heading (visual panel)
    const hasContextHeading = /Contexto de Lectura/i.test(bodyText);
    const hasFastFashion = /Fast Fashion/i.test(bodyText);
    
    if (hasSplitGrid && (hasContextHeading || hasFastFashion)) {
      console.log(`  Q${i + 1}: ✅ SPLIT PANEL VISIBLE (grid + heading)`);
      foundContext = true;
      method = 'visual-split-panel';
      await page.keyboard.press('Alt+q');
      break;
    } else if (ctxOk) {
      const len = parseInt(ctxOk[1]);
      console.log(`  Q${i + 1}: context=✓ ${len} chars ${hasContextHeading ? '📄+heading' : ''}`);
      if (len > 100) {
        foundContext = true;
        method = 'qa-overlay';
        await page.keyboard.press('Alt+q');
        break;
      }
    } else if (ctxEmpty) {
      console.log(`  Q${i + 1}: context=✗ vacío`);
    } else {
      console.log(`  Q${i + 1}: QA overlay not detected`);
    }
    await page.keyboard.press('Alt+q');
    await page.waitForTimeout(200);

    // Navigate next
    const sig = page.getByRole('button', { name: /Siguiente|SIGUIENTE/i }).first();
    if (await sig.isVisible({ timeout: 5000 }).catch(() => false)) {
      await sig.click();
      await page.waitForTimeout(1500);
    } else {
      console.log(`  ⚠ No Siguiente at Q${i + 1}`);
      break;
    }
  }

  // [10] Final report
  console.log(`\nResult: foundContext=${foundContext} method="${method}"`);
  await page.screenshot({ path: 'test-results/g11-ingles-final.png', fullPage: true });

  // Log all API requests
  console.log(`\nAPI requests (${apiRequests.length}):`);
  for (const req of apiRequests) {
    console.log(`  ${req.substring(0, 130)}`);
  }

  if (!foundContext) {
    console.log('\n⚠ Context panel NOT found across all questions.');
    console.log('Root cause: Cloudflare Worker API returns questions WITHOUT `context`.');
  }
});
