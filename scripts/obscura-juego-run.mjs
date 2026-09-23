/**
 * Obscura E2E runner — área /juego (Ola Juego, 9 flujos).
 * Usa Obscura (CDP :9322) + playwright-core del repo. Sin instalar nada.
 * Nota quirks Obscura: URLs absolutas; contar con evaluate (no locator.count).
 */
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const rootRequire = createRequire(path.join(path.dirname(fileURLToPath(import.meta.url)), '../package.json'));
const { chromium } = rootRequire('playwright-core');

const APP = 'http://127.0.0.1:4399';
const API = 'http://127.0.0.1:8787';

function weekKey(ts = Date.now()) {
  const d = new Date(new Date(ts).setHours(0, 0, 0, 0));
  const day = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - day);
  const year = d.getFullYear();
  const jan4 = new Date(year, 0, 4);
  const week = 1 + Math.round((d.getTime() - jan4.getTime()) / 604800000);
  return `${year}-W${String(week).padStart(2, '0')}`;
}
function dayKey(ts = Date.now()) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function gameState(over = {}) {
  return JSON.stringify({
    v: 1, elo: 1800, xpWeekly: 0, weekKey: weekKey(), streakDays: 0,
    lastActiveDay: null, questionElo: {}, updatedAt: Date.now(), ...over,
  });
}
async function newSeededPage(browser, path, seeds = {}) {
  const ctx = await browser.newContext();
  await ctx.addInitScript(({ seeds }) => {
    const pad = (n) => String(n).padStart(2, '0');
    const d = new Date();
    const today = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const yd = new Date(Date.now() - 86400000);
    const yesterday = `${yd.getFullYear()}-${pad(yd.getMonth() + 1)}-${pad(yd.getDate())}`;
    for (let [k, v] of Object.entries(seeds)) {
      if (typeof v === 'string') {
        v = v.replaceAll('__TODAY__', today).replaceAll('__YESTERDAY__', yesterday);
      }
      localStorage.setItem(k, v);
    }
  }, { seeds });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror:' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console:' + m.text()); });
  await page.goto(APP + path, { waitUntil: 'domcontentloaded', timeout: 45000 });
  return { ctx, page, errors };
}
const results = [];
function rec(flow, ok, detail = '') {
  results.push({ flow, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${flow}${detail ? ' — ' + detail : ''}`);
}
const txt = async (page, sel) => (await page.locator(sel).first().textContent()) || '';
// Obscura: locator.waitFor roto (CDP) → espera por función sobre selector CSS
async function waitSel(page, css, timeout = 20000) {
  await page.waitForFunction((s) => !!document.querySelector(s), css, { timeout });
}
// Obscura: los contextos COMPARTEN localStorage (sin partición) y la TZ del
// navegador difiere del sistema → aislamiento explícito por flujo + fechas
// computadas IN-PAGE. Semillas addInitScript SÍ aplican (overwrite total).
async function waitHooks(page, timeout = 20000) {
  await page.waitForFunction(() => !!window.__wxJuego, null, { timeout });
}
async function clearAndGoto(browser, path) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror:' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console:' + m.text()); });
  await page.goto(APP + path, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await waitHooks(page).catch(() => undefined);
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 45000 });
  await waitHooks(page);
  return { ctx, page, errors };
}

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9322');

  // F1 hub-routes
  try {
    for (const [path, h1] of [['/juego', 'Juego'], ['/juego/liga', 'Mi liga'], ['/juego/olimpiada', 'Olimpiada']]) {
      const { ctx, page, errors } = await newSeededPage(browser, path);
      const h = await page.locator('h1', { hasText: h1 }).isVisible();
      if (!h) throw new Error(`${path} sin h1 ${h1}`);
      if (errors.length) throw new Error(`${path} errores: ${errors[0].slice(0, 120)}`);
      await ctx.close();
    }
    rec('hub-routes', true, '3 rutas + 0 errores');
  } catch (e) { rec('hub-routes', false, e.message); }

  // F2 progreso
  try {
    let r = await newSeededPage(browser, '/juego');
    let t = await txt(r.page, '[data-testid="juego-elo"]');
    if (!/1800/.test(t)) throw new Error('Elo inicial no 1800: ' + t);
    await r.ctx.close();
    const today = '__TODAY__';
    r = await newSeededPage(browser, '/juego', {
      'wx-juego-v1': gameState({ elo: 1500, xpWeekly: 1300, streakDays: 4, lastActiveDay: today }),
      'wx-juego-insignias-v1': JSON.stringify({ 'goat-2026-q3-co': { id: 'goat-2026-q3-co', desbloqueadoEn: new Date().toISOString() } }),
    });
    await waitSel(r.page, '[data-testid="juego-tier"]');
    t = await txt(r.page, '[data-testid="juego-tier"]');
    if (!/Oro/.test(t)) throw new Error('tier no Oro: ' + t);
    t = await txt(r.page, '[data-testid="juego-racha"]');
    if (!/4/.test(t)) throw new Error('racha no 4: ' + t);
    const badge = await r.page.locator('[data-testid="juego-insignias"]').textContent();
    if (!/goat-2026-q3-co/.test(badge || '')) throw new Error('insignia ausente');
    await r.ctx.close();
    rec('progreso', true, 'fresco + seed + insignia');
  } catch (e) { rec('progreso', false, e.message); }

  // F3 liga
  try {
    let r = await newSeededPage(browser, '/juego/liga', { 'wx-juego-v1': gameState({ xpWeekly: 1300 }) });
    await waitSel(r.page, '[data-testid="liga-title"]');
    let title = await txt(r.page, '[data-testid="liga-title"]');
    if (!/Oro/.test(title)) throw new Error('no Oro: ' + title);
    const rows = await r.page.evaluate(() => document.querySelectorAll('[data-testid="liga-row"]').length);
    if (rows !== 5) throw new Error('filas=' + rows);
    await r.ctx.close();
    r = await newSeededPage(browser, '/juego/liga', { 'wx-juego-v1': gameState({ xpWeekly: 99999 }) });
    const puesto = await txt(r.page, '[data-testid="liga-puesto"]');
    if (!/1\/30/.test(puesto.replace(/\s/g, ''))) throw new Error('puesto no 1/30: ' + puesto);
    await r.ctx.close();
    rec('liga', true, 'Oro + 5 filas + puesto 1');
  } catch (e) { rec('liga', false, e.message); }

  // F4 harness
  try {
    const { ctx, page } = await newSeededPage(browser, '/juego/harness');
    for (const [sel, rx] of [
      ['[data-testid="harness-semaforo"]', /simplificacion.*2 de 3/],
      ['[data-testid="harness-victoria"]', /\+150 XP/],
      ['[data-testid="harness-boletin"]', /Competente/],
    ]) {
      const t = await txt(page, sel);
      if (!rx.test(t)) throw new Error(`${sel} sin ${rx}`);
    }
    const hooks = await page.evaluate(() => {
      const h = window.__wxJuego;
      return h ? { e: Object.keys(h.engine).length, m: Object.keys(h.mesh), s: Object.keys(h.store) } : null;
    });
    if (!hooks || hooks.e < 15) throw new Error('hooks incompletos: ' + JSON.stringify(hooks));
    await ctx.close();
    rec('harness', true, `hooks engine:${hooks.e} mesh:${hooks.m} store:${hooks.s}`);
  } catch (e) { rec('harness', false, e.message); }

  // F5 4-nodos (BC entre páginas del MISMO contexto; cross-context es informativo)
  try {
    const xps = [200, 900, 1500, 6000];
    const tiers = ['Bronce', 'Plata', 'Oro', 'Diamante'];
    const seen = [];
    for (let i = 0; i < 4; i++) {
      const { ctx, page } = await newSeededPage(browser, '/juego/liga', { 'wx-juego-v1': gameState({ xpWeekly: xps[i] }) });
      await waitSel(page, '[data-testid="liga-title"]');
      const title = await txt(page, '[data-testid="liga-title"]');
      if (!new RegExp(tiers[i]).test(title)) throw new Error(`nodo${i} no ${tiers[i]}: ${title}`);
      seen.push(ctx);
    }
    // directorio: host + guest en la MISMA página (2 pages por contexto es
    // inestable en el CDP de Obscura 0.2.2; BC same-page probado en F6)
    const { ctx, page: dp } = await clearAndGoto(browser, '/juego/harness');
    await dp.evaluate(() => {
      const hook = window.__wxJuego.mesh;
      const host = hook.createDirectory({ peerId: 'p_obscura_host' });
      const guest = hook.createDirectory({ peerId: 'p_obscura_guest' });
      window.__wxDirHost = host;
      window.__wxDirGuest = guest;
      host.listen();
      guest.listen();
      host.host({ codigo: 'obscura-sala-01-xxxx', nombre: 'Sala Obscura', hostNodoId: 'n_h', hostPeerId: 'p_obscura_host', createdAt: Date.now() });
    });
    await new Promise((r) => setTimeout(r, 1500));
    const found = await dp.evaluate(() => window.__wxDirGuest.buscar('obscura-sala-01-xxxx'));
    if (!found || found.nombre !== 'Sala Obscura') throw new Error('directorio no propagó por BC');
    const bad = await dp.evaluate(() => {
      try {
        window.__wxDirGuest.host({ codigo: 'x', nombre: 'Bad', hostNodoId: 'n', hostPeerId: 'p', createdAt: 1, email: 'x@y.co' });
        return 'aceptado?';
      } catch { return 'rechazado'; }
    });
    if (bad !== 'rechazado') throw new Error('BR-04 no rechazó PII');
    for (const c of [...seen, ctx]) await c.close();
    rec('4-nodos', true, '4 tiers + directorio BC + BR-04');
  } catch (e) { rec('4-nodos', false, e.message); }

  // F6 mesh-transport (A→B misma página por BC + outbox + gate)
  try {
    const { ctx, page } = await clearAndGoto(browser, '/juego/harness');
    await waitHooks(page);
    const r = await page.evaluate(() => new Promise((resolve) => {
      const out = {};
      const A = window.__wxJuego.mesh.createTransport({ peerId: 'p_obscura_a2' });
      const B = window.__wxJuego.mesh.createTransport({ peerId: 'p_obscura_b3' });
      B.onEnvelope((env) => {
        out.got = env.from + ':' + env.blob;
        try {
          // outbox: transporte con backend inalcanzable
          const C = window.__wxJuego.mesh.createTransport({ peerId: 'p_obscura_c', backendBase: 'https://mesh.invalid' });
          C.start('obscura-room-outbox-01');
          C.send('delta', 'Y2lwaGVy');
          setTimeout(() => {
            out.outbox = C.getOutboxCount();
            const T = window.__wxJuego.mesh.createTransport({ peerId: 'p_obscura_g' });
            T.start('obscura-room-gate-01');
            out.gate = T.send('delta', 'mi nota es 5');
            resolve(out);
          }, 2500);
        } catch (e) { out.err = String(e); resolve(out); }
      });
      A.start('obscura-room-transporte-01');
      B.start('obscura-room-transporte-01');
      setTimeout(() => { out.sent = !!A.send('delta', 'Y2lwaGVyLW9wYXF1ZQ'); }, 800);
      setTimeout(() => resolve({ ...out, timeout: !out.got }), 12000);
    }));
    if (!r.got || !/Y2lwaGVyLW9wYXF1ZQ/.test(r.got)) throw new Error('B no recibió: ' + JSON.stringify(r));
    if (!(r.outbox >= 1)) throw new Error('outbox vacío: ' + JSON.stringify(r));
    if (r.gate !== null) throw new Error('BR-04 no rechazó');
    await ctx.close();
    rec('mesh-transport', true, 'A→B BC + outbox + gate');
  } catch (e) { rec('mesh-transport', false, e.message); }

  // F7 reintentos/elo (aislado: clear + estado fresco grado 6)
  try {
    const { ctx, page } = await clearAndGoto(browser, '/juego/harness');
    await waitHooks(page);
    const r = await page.evaluate(() => {
      const { recordAttempt, addActionXp, openRetry, retryStatus, closeAttempt, applyAttempt } = window.__wxJuego.engine;
      const { loadState, saveState } = window.__wxJuego.store;
      // Semilla explícita grado 6 (elo 1000): inmune a storage compartido
      localStorage.setItem('wx-juego-v1', JSON.stringify({ v: 1, elo: 1000, xpWeekly: 0, weekKey: 'seed', streakDays: 0, lastActiveDay: null, questionElo: {}, updatedAt: 1 }));
      localStorage.removeItem('wx-juego-reintentos-v1');
      const out = {};
      const s = loadState(6);
      const xp0 = s.xpWeekly;
      recordAttempt(s, { questionId: 'e2e-q1', questionElo: 900, correct: true });
      out.eloSubio = s.elo > 1000;
      out.qBajo = s.questionElo['e2e-q1'] < 900;
      out.xpIntacto = s.xpWeekly === xp0;
      addActionXp(s, 'respuesta'); addActionXp(s, 'respuesta'); addActionXp(s, 'respuesta');
      out.xp30 = s.xpWeekly === xp0 + 30;
      saveState(s);
      out.delta31 = applyAttempt(1200, 1800, true).playerDelta === 31;
      openRetry('e2e-quiz-1', 60, 'simplificacion');
      const st = retryStatus('e2e-quiz-1');
      out.cool = !st.allowed && st.waitMs > 0 && st.focusTema === 'simplificacion';
      out.fin = closeAttempt('e2e-quiz-1', 85).finalSoFar === 85;
      return out;
    });
    const bad = Object.entries(r).filter(([, v]) => v !== true);
    if (bad.length) throw new Error('fallos: ' + bad.map(([k]) => k).join(',') + ' full=' + JSON.stringify(r));
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 45000 });
    const elo = await page.evaluate(() => window.__wxJuego.store.loadState(6).elo);
    if (!(elo > 1000)) throw new Error('sin persistencia tras reload');
    await ctx.close();
    rec('reintentos-elo', true, 'separación XP/Elo + cooldown + max + persistencia');
  } catch (e) { rec('reintentos-elo', false, e.message); }

  // F8 olimpiada
  try {
    const { ctx, page } = await newSeededPage(browser, '/juego/olimpiada', {
      'wx-juego-v1': gameState({ xpWeekly: 100 }),
      'wx-juego-hall-v1': JSON.stringify([{ alias: 'Estudiante_7', pais: 'co', season: '2026-Q1' }]),
    });
    await page.waitForFunction(() => /Oro/.test(document.body.innerText), null, { timeout: 20000 });
    const body = await page.locator('body').textContent();
    if (!/Oro/.test(body || '')) throw new Error('sin motivos de elegibilidad');
    if (!/Estudiante_7/.test(body || '')) throw new Error('hall ausente');
    await ctx.close();
    rec('olimpiada', true, 'motivos + hall');
  } catch (e) { rec('olimpiada', false, e.message); }

  // F9 cf-relay (wrangler dev live)
  try {
    const h = await (await fetch(API + '/v1/mesh/health')).json();
    if (h.mode !== 'mesh-first') throw new Error('health inesperado');
    const room = 'obscura-room-' + Date.now().toString(36);
    const inbox = 'obscura-inbox-' + Date.now().toString(36);
    let res = await (await fetch(API + '/v1/mesh/announce', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ room_hash: room, peer_id: 'p_obscura_1' }) })).json();
    if (!res.ok) throw new Error('announce: ' + JSON.stringify(res));
    res = await (await fetch(API + '/v1/mesh/discover?room=' + room)).json();
    if (res.count !== 1) throw new Error('discover count=' + res.count);
    const env = { v: 1, from: 'p_obscura_1', seq: 0, t: Date.now(), kind: 'delta', blob: 'Y2lwaGVy' };
    res = await (await fetch(API + '/v1/mesh/relay', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ inbox_hash: inbox, envelope: env }) })).json();
    if (!res.ok) throw new Error('relay: ' + JSON.stringify(res));
    res = await (await fetch(API + '/v1/mesh/relay?inbox=' + inbox)).json();
    if (res.count !== 1) throw new Error('drain 1ro=' + res.count);
    res = await (await fetch(API + '/v1/mesh/relay?inbox=' + inbox)).json();
    if (res.count !== 0) throw new Error('drain 2do=' + res.count);
    res = await (await fetch(API + '/v1/mesh/announce', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ room_hash: room, peer_id: 'p1', email: 'x@y.co' }) }));
    if (res.status !== 400) throw new Error('BR-04 no 400');
    rec('cf-relay', true, 'health+announce+discover+relay destructivo+BR-04');
  } catch (e) { rec('cf-relay', false, e.message); }

  await browser.close();
  const fails = results.filter((r) => !r.ok);
  console.log(`\n==== OBSCURA /juego: ${results.length - fails.length}/${results.length} PASS ====`);
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error('RUNNER FAIL:', e.message); process.exit(2); });
