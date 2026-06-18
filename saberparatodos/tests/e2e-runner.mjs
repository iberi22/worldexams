import { chromium } from 'playwright';

const BASE_URL = 'https://saberparatodos.space';
const COMBOS = [];

[6, 9, 11].forEach(g => {
  ['Matematicas', 'LecturaCritica', 'CienciasNaturales', 'SocialesCiudadanas', 'Ingles'].forEach(s => {
    const labelMap = {
      Matematicas: 'Matemáticas',
      LecturaCritica: 'Lectura Crítica',
      CienciasNaturales: 'Ciencias Naturales',
      SocialesCiudadanas: 'Sociales y Ciudadanas',
      Ingles: 'Inglés'
    };
    COMBOS.push({ grade: g, subject: labelMap[s], label: `G${g}_${s}` });
  });
});

['Matematicas', 'Ingles', 'SocialesCiudadanas'].forEach(s => {
  const labelMap = {
    Matematicas: 'Matemáticas',
    Ingles: 'Inglés',
    SocialesCiudadanas: 'Sociales y Ciudadanas'
  };
  COMBOS.push({ grade: 11, subject: labelMap[s], mode: 'period', label: `G11_${s}_P1` });
});

async function runTest(combo, browser) {
  const page = await browser.newPage();
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.text().includes('Error')) {
      console.log(`  [BROWSER] ${msg.text().substring(0, 200)}`);
    }
  });

  const { grade, subject, mode, label } = combo;
  process.stdout.write(`\n🔍 ${label}${mode === 'period' ? ' (Periodo 1)' : ''}... `);

  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });

    const gradeBtn = page.locator('button').filter({ hasText: `${grade}\u00B0 Grado` }).first();
    await gradeBtn.waitFor({ state: 'visible', timeout: 15000 });
    await gradeBtn.click();

    await page.getByTestId('modal-content').waitFor({ state: 'visible', timeout: 60000 });

    const dropdown = page.locator('select');
    await dropdown.waitFor({ state: 'visible', timeout: 5000 });
    await dropdown.selectOption({ label: subject });

    if (mode === 'period') {
      await page.locator('button').filter({ hasText: 'Por Periodo' }).first().click();
      await page.locator('button').filter({ hasText: 'Periodo 1' }).first().waitFor({ timeout: 10000 });
      await page.locator('button').filter({ hasText: 'Periodo 1' }).first().click();
    }

    const btn30 = page.locator('button').filter({ hasText: '30' }).first();
    await btn30.waitFor({ state: 'visible', timeout: 5000 });
    await btn30.click();

    const startBtn = page.locator('button').filter({ hasText: 'Comenzar' }).first();
    await startBtn.waitFor({ state: 'visible', timeout: 10000 });
    await startBtn.click();

    await page.getByTestId('options-grid').waitFor({ state: 'visible', timeout: 60000 });

    const count = await page.locator('[data-testid="options-grid"] button, [data-testid="options-grid"] div[role="button"]').count();
    
    if (count >= 2) {
      console.log(`\u2705 PASS (${count} options)`);
      return { pass: true, label };
    }
    console.log(`\u274C FAIL (only ${count} options)`);
    return { pass: false, label, error: `Only ${count} options` };
  } catch (e) {
    let errText = e.message?.substring(0, 150) || 'Unknown';
    const errorEl = page.locator('div[role="alert"], .text-red-400, .bg-red-500\\/10').first();
    if (await errorEl.isVisible({ timeout: 3000 }).catch(() => false)) {
      errText = await errorEl.innerText();
    }
    console.log(`\u274C FAIL (${errText.substring(0, 200)})`);
    return { pass: false, label, error: errText };
  } finally {
    await page.close();
  }
}

(async () => {
  console.log(`🚀 Running ${COMBOS.length} E2E tests vs ${BASE_URL}`);
  console.log('='.repeat(60));

  const browser = await chromium.launch({ headless: true });
  let passed = 0, failed = 0;
  const results = [];

  for (const combo of COMBOS) {
    const r = await runTest(combo, browser);
    results.push(r);
    if (r.pass) passed++; else failed++;
  }

  await browser.close();

  console.log('\n' + '='.repeat(60));
  console.log(`📊 RESULTS: ${passed} ✅ / ${failed} ❌ / ${results.length} Total`);

  if (failed > 0) {
    console.log('\n❌ FAILED:');
    results.filter(r => !r.pass).forEach(r => console.log(`  - ${r.label}: ${r.error?.substring(0, 120)}`));
  }

  if (failed === 0) console.log('\n✅ ALL PASSED!');
  process.exit(failed > 0 ? 1 : 0);
})();
