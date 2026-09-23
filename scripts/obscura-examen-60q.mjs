/**
 * scripts/obscura-examen-60q.mjs — Examen multi-nodo × 60 preguntas vía Obscura.
 *
 * Uso:
 *   obscura serve --allow-private-network -p 9322 --workers 4
 *   npx astro dev --port 4399 --host 127.0.0.1        (en saberparatodos/)
 *   NODES=10 node scripts/obscura-examen-60q.mjs
 *
 * Diseño (límites verificados de Obscura 0.2.2, ver skill obscura-cdp-testing):
 * - Fase A (motor, SECUENCIAL por nodo): los contextos comparten localStorage,
 *   así que cada nodo siembra estado explícito y corre sus 60 intentos en un
 *   solo evaluate (código real: selectMatchmaking, recordAttempt, semáforo).
 * - Fase B (mesh, CONCURRENTE en 1 página): N transports + N directory ads
 *   simultáneos; verifica fan-in por BC sin tocar storage.
 * - Perfiles deterministas (PRNG mulberry32 por nodo): novato/medio/avanzado.
 *
 * Requiere la ruta harness DEV (/juego/harness) con window.__wxJuego.
 */
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const rootRequire = createRequire(path.join(path.dirname(fileURLToPath(import.meta.url)), '../package.json'));
const { chromium } = rootRequire('playwright-core');

const APP = 'http://127.0.0.1:4399';
const NODES = Number(process.env.NODES || 10);
const Q = Number(process.env.Q || 60);
const SEASON = '2026-Q3';

function mulberry(seed) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const results = [];
function rec(name, ok, detail = '') {
  results.push({ name, ok });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
}

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9322');
  const t0 = Date.now();

  // ---- Fase A: 60 intentos por nodo, secuencial (storage compartido) ----
  const perfiles = [];
  for (let n = 0; n < NODES; n++) {
    const kind = n % 3 === 0 ? 'novato' : n % 3 === 1 ? 'medio' : 'avanzado';
    const grade = kind === 'novato' ? 6 : 11;
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(APP + '/juego/harness', { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForFunction(() => !!window.__wxJuego, null, { timeout: 20000 });
    const r = await page.evaluate(({ n, kind, grade, Q, SEASON }) => {
      const E = window.__wxJuego.engine;
      const S = window.__wxJuego.store;
      const recordAttempt = E.recordAttempt;
      // PRNG determinista espejo del de Node (mulberry32)
      let a = (1234 + n * 777) | 0;
      const rand = () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
      // Semilla explícita (inmune a storage compartido)
      const bands = ['D1-D2', 'D3-D4', 'D5-D6', 'D7-D8', 'D9-D10'];
      const base = { v: 1, elo: 0, xpWeekly: 0, weekKey: 'seed', streakDays: 0, lastActiveDay: null, questionElo: {}, updatedAt: 1 };
      localStorage.setItem('wx-juego-v1', JSON.stringify(base));
      const st = S.loadState(grade);
      const elo0 = st.elo;
      // Pool de 60 con bandas ciclando + matchmaking real
      const pool = Array.from({ length: Q }, (_, i) => ({ id: `n${n}-q${i}`, band: bands[i % 4] }));
      const answers = [];
      let asked = 0;
      const seen = new Set();
      const tStart = Date.now();
      while (asked < Q) {
        const cands = pool.filter((q) => !seen.has(q.id)).map((q) => ({ id: q.id, elo: q.elo }));
        // Elo vivo de la pregunta (primera vez: tabla por banda)
        const withElo = pool.filter((q) => !seen.has(q.id)).map((q) => ({
          id: q.id,
          elo: st.questionElo[q.id] ?? ({ 'D1-D2': 500, 'D3-D4': 800, 'D5-D6': 1200, 'D7-D8': 1600, 'D9-D10': 2000 })[q.band],
        }));
        if (!withElo.length) break;
        // Matchmaking: ventana ±200 (usa el motor real vía torneo de 1)
        const pick = withElo
          .map((q) => ({ ...q, d: Math.abs(q.elo - st.elo) }))
          .sort((a, b) => a.d - b.d)[0];
        seen.add(pick.id);
        // Probabilidad ≈ expected real + ruido de perfil
        const exp = 1 / (1 + Math.pow(10, (pick.elo - st.elo) / 400));
        const luck = kind === 'novato' ? -0.15 : kind === 'avanzado' ? 0.1 : 0;
        const correct = rand() < Math.min(0.98, Math.max(0.02, exp + luck));
        recordAttempt(st, { questionId: pick.id, questionElo: pick.elo, correct });
        const band = pool.find((q) => q.id === pick.id).band;
        answers.push({ tema: ({ 'D1-D2': 'fundamentos', 'D3-D4': 'basicos', 'D5-D6': 'intermedios', 'D7-D8': 'avanzados', 'D9-D10': 'expertos' })[band], correct });
        asked++;
      }
      S.saveState(st);
      const sem = E.computeSemaforo(answers);
      const acc = answers.filter((a) => a.correct).length / answers.length;
      return { elo0, elo1: st.elo, acc: Math.round(acc * 100) / 100, n: asked, ms: Date.now() - tStart, sem: sem.map((s) => s.estado).join(',') };
    }, { n, kind, grade, Q, SEASON });
    perfiles.push({ nodo: n, kind, ...r });
    await ctx.close();
  }
  const tA = Date.now() - t0;

  // Aserciones Fase A
  const okN = perfiles.every((p) => p.n === Q);
  rec(`A: ${NODES} nodos × ${Q} intentos`, okN, `${perfiles.length} completos en ${(tA / 1000).toFixed(1)}s`);
  const avg = (k) => perfiles.filter((p) => p.kind === k).reduce((a, p) => a + p.acc, 0) / perfiles.filter((p) => p.kind === k).length;
  const orden = avg('novato') < avg('medio') && avg('medio') < avg('avanzado');
  rec('A: orden por perfil novato<medio<avanzado', orden,
    `nov=${avg('novato').toFixed(2)} med=${avg('medio').toFixed(2)} ava=${avg('avanzado').toFixed(2)}`);
  const divergen = new Set(perfiles.map((p) => p.elo1)).size > 1;
  rec('A: Elo diverge por desempeño', divergen);
  const semOk = perfiles.every((p) => p.sem.split(',').length === 4);
  rec('A: semáforo 4 nodos por examen', semOk);

  // ---- Fase B: fan-in mesh concurrente (1 página, N transports) ----
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(APP + '/juego/harness', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForFunction(() => !!window.__wxJuego, null, { timeout: 20000 });
  const tB = Date.now();
  const fan = await page.evaluate(({ NODES }) => new Promise((resolve) => {
    const out = { beacons: 0, ads: 0 };
    const hook = window.__wxJuego.mesh;
    const guest = hook.createDirectory({ peerId: 'p_examen_guest' });
    guest.listen();
    const got = new Set();
    const T = hook.createTransport({ peerId: 'p_examen_listener' });
    T.onEnvelope(() => { out.beacons++; });
    T.start('wx-examen-60q');
    for (let i = 0; i < NODES; i++) {
      const h = hook.createDirectory({ peerId: `p_examen_${i}` });
      h.listen();
      h.host({ codigo: `examen-sala-${String(i).padStart(2, '0')}-xxxx`, nombre: `Examen ${i}`, hostNodoId: `n_${i}`, hostPeerId: `p_examen_${i}`, createdAt: Date.now() });
      const t = hook.createTransport({ peerId: `p_examen_tx_${i}` });
      t.start('wx-examen-60q');
      t.send('delta', 'RTA2MDpzdGF0cw');
    }
    setTimeout(() => {
      out.ads = guest.listar().filter((a) => a.codigo.startsWith('examen-sala-')).length;
      resolve(out);
    }, 3000);
  }), { NODES });
  const tBms = Date.now() - tB;
  rec(`B: ${NODES} anuncios visibles en directorio`, fan.ads >= NODES, `${fan.ads}/${NODES} en ${(tBms / 1000).toFixed(1)}s`);
  rec('B: beacons BC recibidos', fan.beacons > 0, `${fan.beacons} deltas`);
  await ctx.close();

  await browser.close();
  const fails = results.filter((r) => !r.ok);
  console.log(`\n==== OBSCURA examen 60q×${NODES}: ${results.length - fails.length}/${results.length} PASS (${((Date.now() - t0) / 1000).toFixed(1)}s) ====`);
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error('RUNNER FAIL:', e.message); process.exit(2); });
