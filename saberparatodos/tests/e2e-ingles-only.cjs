const { chromium } = require('E:\\scripts-python\\worldexams\\node_modules\\.pnpm\\playwright@1.61.0\\node_modules\\playwright\\index.js');

const BASE = 'https://saberparatodos.space';
const SUBJ = { In: 'Ingl\u00e9s', Ma: 'Matem\u00e1ticas', Le: 'Lectura Cr\u00edtica', Ci: 'Ciencias Naturales', So: 'Sociales y Ciudadanas' };

// Only Inglés across 3 grades + period mode (the critical fix)
const TESTS = [
  { label: 'G11_Ingles30', g: 11, s: SUBJ.In },
  { label: 'G9_Ingles30', g: 9, s: SUBJ.In },
  { label: 'G7_Ingles30', g: 7, s: SUBJ.In },
  { label: 'G11_InglesP1_30', g: 11, s: SUBJ.In, period: true },
];

async function run(t) {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  process.stdout.write(t.label + '... ');
  try {
    await p.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
    await p.waitForTimeout(5000);
    for (let i = 0; i < 3; i++) {
      const btn = p.locator('button').filter({ hasText: 'Entendido' }).first();
      if (await btn.isVisible({ timeout: 1500 }).catch(() => false)) { await btn.click(); await p.waitForTimeout(500); }
    }
    await p.waitForTimeout(1000);
    await p.locator('[role="button"]').filter({ hasText: t.g + '\u00b0 Grado' }).first().waitFor({ state: 'visible', timeout: 15000 });
    await p.locator('[role="button"]').filter({ hasText: t.g + '\u00b0 Grado' }).first().click();
    await p.getByTestId('modal-content').waitFor({ state: 'visible', timeout: 15000 });
    await p.waitForTimeout(500);
    await p.locator('select').selectOption({ label: t.s });
    if (t.period) {
      await p.waitForTimeout(300); await p.locator('button').filter({ hasText: 'Por Periodo' }).first().click();
      await p.waitForTimeout(300); await p.locator('button').filter({ hasText: 'Periodo 1' }).first().click();
    }
    await p.waitForTimeout(300); await p.locator('button').filter({ hasText: '30' }).first().click();
    await p.waitForTimeout(300); await p.locator('button').filter({ hasText: 'Comenzar' }).first().click();
    const deadline = Date.now() + 60000;
    let ok = false;
    while (Date.now() < deadline) {
      if ((await p.evaluate(() => document.body.innerText)).includes('SIGUIENTE')) { ok = true; break; }
      await p.waitForTimeout(500);
    }
    if (ok) { console.log('PASS'); return true; }
    console.log('FAIL'); return false;
  } catch (e) {
    console.log('FAIL (' + (e.message||'e').substring(0,60) + ')');
    return false;
  } finally { await b.close(); }
}

(async () => {
  console.log('INGLES E2E 30-QUESTION TESTS vs ' + BASE);
  console.log('='.repeat(50));
  let pass = 0;
  for (const t of TESTS) { if (await run(t)) pass++; await new Promise(r => setTimeout(r, 500)); }
  console.log('\n' + '='.repeat(50));
  console.log('INGLES: ' + pass + '/' + TESTS.length + ' passed');
  if (pass === TESTS.length) console.log('INGLES FIX CONFIRMED: Normalization works for all grades + period mode');
  process.exit(pass === TESTS.length ? 0 : 1);
})();
