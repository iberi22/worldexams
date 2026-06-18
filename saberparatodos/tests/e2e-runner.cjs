const { chromium } = require('E:\\scripts-python\\worldexams\\node_modules\\.pnpm\\playwright@1.61.0\\node_modules\\playwright\\index.js');

const BASE_URL = 'https://saberparatodos.space';

const COMBOS = [
  // G11 all 5 subjects (critical for Inglés fix)
  { label: 'G11_Matematicas', grade: 11, subject: 'Matematicas', mode: 'simulacro' },
  { label: 'G11_LecturaCritica', grade: 11, subject: 'Lectura Critica', mode: 'simulacro' },
  { label: 'G11_CienciasNaturales', grade: 11, subject: 'Ciencias Naturales', mode: 'simulacro' },
  { label: 'G11_Sociales', grade: 11, subject: 'Sociales y Ciudadanas', mode: 'simulacro' },
  { label: 'G11_Ingles', grade: 11, subject: 'Ingl\u00e9s', mode: 'simulacro' },
  // G9 all 5
  { label: 'G9_Matematicas', grade: 9, subject: 'Matematicas', mode: 'simulacro' },
  { label: 'G9_Ingles', grade: 9, subject: 'Ingl\u00e9s', mode: 'simulacro' },
  // G7 all 5
  { label: 'G7_Matematicas', grade: 7, subject: 'Matematicas', mode: 'simulacro' },
  { label: 'G7_Ingles', grade: 7, subject: 'Ingl\u00e9s', mode: 'simulacro' },
  // Period mode
  { label: 'G11_Ingles_P1', grade: 11, subject: 'Ingl\u00e9s', mode: 'period' },
  { label: 'G11_Matematicas_P1', grade: 11, subject: 'Matematicas', mode: 'period' },
];

const SUBJ_MAP = {
  'Matematicas': 'Matem\u00e1ticas',
  'Lectura Critica': 'Lectura Cr\u00edtica',
  'Ciencias Naturales': 'Ciencias Naturales',
  'Sociales y Ciudadanas': 'Sociales y Ciudadanas',
  'Ingl\u00e9s': 'Ingl\u00e9s'
};

async function runTest(c) {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  process.stdout.write(`\n${c.label}... `);

  try {
    await p.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await p.waitForTimeout(5000);
    for (let i = 0; i < 3; i++) {
      const btn = p.locator('button').filter({ hasText: 'Entendido' }).first();
      if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) { await btn.click(); await p.waitForTimeout(500); }
    }
    await p.waitForTimeout(1000);
    const card = p.locator('[role="button"]').filter({ hasText: `${c.grade}\u00b0 Grado` }).first();
    await card.waitFor({ state: 'visible', timeout: 15000 }); await card.click();
    await p.getByTestId('modal-content').waitFor({ state: 'visible', timeout: 15000 });
    await p.waitForTimeout(500);
    const subjLabel = SUBJ_MAP[c.subject] || c.subject;
    await p.locator('select').selectOption({ label: subjLabel });
    if (c.mode === 'period') {
      await p.waitForTimeout(300);
      await p.locator('button').filter({ hasText: 'Por Periodo' }).first().click();
      await p.waitForTimeout(300);
      await p.locator('button').filter({ hasText: 'Periodo 1' }).first().click();
    }
    await p.waitForTimeout(300);
    await p.locator('button').filter({ hasText: '30' }).first().click();
    await p.waitForTimeout(300);
    await p.locator('button').filter({ hasText: 'Comenzar' }).first().click();
    let found = false;
    const deadline = Date.now() + 60000;
    while (Date.now() < deadline) {
      const t = await p.evaluate(() => document.body.innerText);
      if (t.includes('SIGUIENTE') && t.includes('Opciones')) { found = true; break; }
      await p.waitForTimeout(500);
    }
    if (found) { console.log('PASS'); return true; }
    console.log('FAIL (no questions loaded)');
    return false;
  } catch (e) {
    console.log('FAIL (' + (e.message||'').substring(0,80) + ')');
    return false;
  } finally { await b.close(); }
}

(async () => {
  console.log('E2E 30-question matrix vs', BASE_URL);
  console.log('='.repeat(50));
  let pass = 0, fail = 0;
  for (const c of COMBOS) {
    const r = await runTest(c);
    if (r) pass++; else fail++;
    await new Promise(r => setTimeout(r, 500));
  }
  console.log('\n' + '='.repeat(50));
  console.log(`RESULT: ${pass}/${COMBOS.length} passed`);
  if (fail === 0) console.log('ALL 30-QUESTION TESTS PASSED');
  else console.log(fail + ' FAILED');
  process.exit(fail > 0 ? 1 : 0);
})();
