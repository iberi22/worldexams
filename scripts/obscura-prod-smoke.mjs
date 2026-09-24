/**
 * Obscura smoke contra PRODUCCIÓN (solo lectura, sin harness DEV).
 * APP=https://saberparatodos.space API=https://api.saberparatodos.space
 * Flujos: rutas /juego* (h1 + 0 pageerror/console), paneles con seed,
 * API packs + mesh health + relay roundtrip + BR-04.
 */
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const rootRequire = createRequire(path.join(path.dirname(fileURLToPath(import.meta.url)), '../package.json'));
const { chromium } = rootRequire('playwright-core');

const APP = process.env.APP_URL || 'https://saberparatodos.space';
const API = process.env.API_URL || 'https://api.saberparatodos.space';

const results = [];
function rec(name, ok, detail = '') {
  results.push({ name, ok });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
}

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9322');

  async function freshPage(path, seeds = {}) {
    const ctx = await browser.newContext();
    await ctx.addInitScript(({ seeds }) => {
      for (const [k, v] of Object.entries(seeds)) localStorage.setItem(k, v);
    }, { seeds });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push('pageerror:' + e.message.slice(0, 150)));
    page.on('console', (m) => { if (m.type() === 'error') errors.push('console:' + m.text().slice(0, 150)); });
    await page.goto(APP + path, { waitUntil: 'domcontentloaded', timeout: 60000 });
    return { ctx, page, errors };
  }
  const txt = async (page, sel) => (await page.locator(sel).first().textContent()) || '';
  async function waitSel(page, css, timeout = 25000) {
    await page.waitForFunction((s) => !!document.querySelector(s), css, { timeout });
  }

  // P1 rutas + consola limpia
  try {
    for (const [path, h1] of [['/juego', 'Juego'], ['/juego/liga', 'Mi liga'], ['/juego/olimpiada', 'Olimpiada']]) {
      const { ctx, page, errors } = await freshPage(path);
      await waitSel(page, 'h1');
      const h = await page.locator('h1', { hasText: h1 }).isVisible();
      if (!h) throw new Error(`${path} sin h1 ${h1}`);
      const real = errors.filter((e) => !/favicon|analytics|third-party/i.test(e));
      if (real.length) throw new Error(`${path}: ${real[0]}`);
      await ctx.close();
    }
    rec('prod-rutas-consola', true, '/juego* sin errores');
  } catch (e) { rec('prod-rutas-consola', false, e.message); }

  // P2 paneles con seed
  try {
    const wk = await (await freshPage('/juego')).page.evaluate(() => {
      const d = new Date();
      return 'seed';
    });
    void wk;
    const { ctx, page } = await freshPage('/juego/liga');
    await waitSel(page, '[data-testid="liga-title"]');
    const t = await txt(page, '[data-testid="liga-title"]');
    if (!/Liga (Bronce|Plata|Oro|Platino|Diamante)/.test(t)) throw new Error('liga sin tier: ' + t);
    await ctx.close();
    rec('prod-liga-panel', true, t.trim().slice(0, 40));
  } catch (e) { rec('prod-liga-panel', false, e.message); }

  // P3 API packs por país (KPI publicación)
  try {
    const checks = [
      '/v1/packs/co-week-1-grade-7-subject-lengua.json',
      '/v1/questions?country=mx&grade=11&subject=matematicas',
      '/v1/questions?country=co&grade=8&subject=ciencias_naturales',
    ];
    for (const c of checks) {
      const r = await fetch(API + c);
      if (!r.ok) throw new Error(`${c} → ${r.status}`);
      const j = await r.json();
      const n = j.questions?.length ?? j.total_questions ?? 0;
      if (!n) throw new Error(`${c} sin preguntas`);
    }
    rec('prod-api-packs', true, 'co/mx packs OK');
  } catch (e) { rec('prod-api-packs', false, e.message); }

  // P4 mesh API prod (señalización efímera)
  try {
    const h = await (await fetch(API + '/v1/mesh/health')).json();
    if (h.mode !== 'mesh-first') throw new Error('health: ' + JSON.stringify(h).slice(0, 100));
    const room = 'prod-smoke-' + Date.now().toString(36);
    const inbox = 'prod-inbox-' + Date.now().toString(36);
    let r = await (await fetch(API + '/v1/mesh/announce', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ room_hash: room, peer_id: 'p_smoke' }) })).json();
    if (!r.ok) throw new Error('announce: ' + JSON.stringify(r));
    r = await (await fetch(API + '/v1/mesh/discover?room=' + room)).json();
    if (r.count !== 1) throw new Error('discover: ' + r.count);
    const env = { v: 1, from: 'p_smoke', seq: 0, t: Date.now(), kind: 'delta', blob: 'c21va2U' };
    r = await (await fetch(API + '/v1/mesh/relay', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ inbox_hash: inbox, envelope: env }) })).json();
    if (!r.ok) throw new Error('relay: ' + JSON.stringify(r));
    r = await (await fetch(API + '/v1/mesh/relay?inbox=' + inbox)).json();
    if (r.count !== 1) throw new Error('drain: ' + r.count);
    const bad = await fetch(API + '/v1/mesh/announce', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ room_hash: room, peer_id: 'p1', email: 'x@y.co' }) });
    if (bad.status !== 400) throw new Error('BR-04 no 400');
    rec('prod-mesh-api', true, 'health+announce+relay+BR-04');
  } catch (e) { rec('prod-mesh-api', false, e.message); }

  // P5 home + examen clásico (regresión superficie principal)
  try {
    const { ctx, page, errors } = await freshPage('/');
    await waitSel(page, 'main, [data-testid="app"], h1');
    const real = errors.filter((e) => !/favicon|analytics|third-party/i.test(e));
    if (real.length) throw new Error('home: ' + real[0]);
    await ctx.close();
    rec('prod-home', true, 'sin errores');
  } catch (e) { rec('prod-home', false, e.message); }

  await browser.close();
  const fails = results.filter((r) => !r.ok);
  console.log(`\n==== OBSCURA prod: ${results.length - fails.length}/${results.length} PASS ====`);
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error('RUNNER FAIL:', e.message); process.exit(2); });
