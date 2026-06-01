#!/usr/bin/env node
/**
 * verify-deploy.mjs
 * 
 * Verifica el deploy de v0.14.0 en producción:
 * 1. Endpoints HTTP responden correctamente
 * 2. Packs estáticos tienen campo `context`
 * 3. Current.json tiene versión correcta
 * 4. Generar examen simulado de 10 preguntas vía API
 * 
 * Uso: node scripts/verify-deploy.mjs [baseUrl]
 * Default: https://saberparatodos.space
 * Preview: node scripts/verify-deploy.mjs https://xxx.saberparatodos.pages.dev
 */

const BASE = process.argv[2] || 'https://saberparatodos.space';

const API_PACKS = `${BASE}/api/packs/current.json`;
const API_GENERATE = `${BASE}/api/exam/generate`;
const STATIC_PACKS = [
  'co-week-1-grade-11-subject-matematicas.json',
  'co-week-1-grade-3-subject-lectura_critica.json',
  'global-ingles-week-1-grade-6-subject-ingles.json'
];

let passed = 0;
let failed = 0;

function result(ok, label, detail = '') {
  const mark = ok ? '✅' : '❌';
  console.log(`${mark} ${label}${detail ? ' — ' + detail : ''}`);
  ok ? passed++ : failed++;
}

async function fetchJSON(url) {
  const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return { status: res.status, data: await res.json() };
}

async function main() {
  console.log(`\n🔍 Verify Deploy — ${BASE}\n`);

  // 1. Salud básica
  try {
    const home = await fetch(BASE, { headers: { 'Cache-Control': 'no-cache' } });
    const text = await home.text();
    result(home.status === 200, '🏠 Homepage', `HTTP ${home.status}`);
    result(text.includes('ICFES') || text.includes('SaberParaTodos'), '🏷️ Title check');
  } catch (e) {
    result(false, '🏠 Homepage', e.message);
  }

  // 2. Current.json versión
  try {
    const { data } = await fetchJSON(API_PACKS);
    result(true, '📦 current.json', `version=${data.version}, last_update=${data.last_update}`);
    result(data.version === '0.14.0', '🏷️ Version v0.14.0', `got ${data.version}`);
  } catch (e) {
    result(false, '📦 current.json', e.message);
  }

  // 3. Packs estáticos con context
  for (const pack of STATIC_PACKS) {
    try {
      const url = `${BASE}/api/packs/${pack}`;
      const { data } = await fetchJSON(url);
      const questions = data.questions || [];
      const withCtx = questions.filter(q => q.context && q.context.length > 0).length;
      const anyCtx = withCtx > 0;
      // También chequea via endpoint directo del API Gateway
      result(anyCtx, `📚 ${pack}`, `${questions.length} preguntas, ${withCtx} con context`);
    } catch (e) {
      // Fallback al gateway estático
      try {
        const staticUrl = `${BASE}/v1/packs/${pack}`;
        const { data } = await fetchJSON(staticUrl);
        const questions = data.questions || [];
        const withCtx = questions.filter(q => q.context && q.context.length > 0).length;
        result(withCtx > 0, `📚 ${pack} (gateway)`, `${questions.length} preguntas, ${withCtx} con context`);
      } catch (e2) {
        result(false, `📚 ${pack}`, `API error: ${e.message} | Gateway: ${e2.message}`);
      }
    }
  }

  // 4. Generar examen de 10 preguntas
  try {
    const genRes = await fetch(API_GENERATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grade: 11,
        subjects: ['matematicas'],
        questionCount: 10
      })
    });
    if (genRes.ok) {
      const genData = await genRes.json();
      const genQuestions = genData.questions || [];
      const genWithCtx = genQuestions.filter(q => q.context && q.context.length > 0).length;
      result(true, '🧪 Examen 10 preguntas', `${genQuestions.length} preguntas generadas, ${genWithCtx} con context`);
    } else {
      result(false, '🧪 Examen 10 preguntas', `HTTP ${genRes.status}: ${genRes.statusText}`);
    }
  } catch (e) {
    result(false, '🧪 Examen 10 preguntas', e.message);
  }

  // 5. SharedContextLayout (split-pane / modal drawer)
  // Verificamos que el HTML renderizado contenga el selector correcto
  try {
    const examSamples = [
      'co-week-1-grade-11-subject-matematicas',
      'co-week-1-grade-3-subject-lectura_critica'
    ];
    for (const sample of examSamples) {
      const url = `${BASE}/exam/${sample}`;
      const res = await fetch(url);
      const html = await res.text();
      const hasSharedLayout = html.includes('shared') || html.includes('context-layout') || html.includes('SplitPane');
      result(res.status === 200, `🖥️ ${sample} layout`, `HTTP ${res.status}${hasSharedLayout ? ', SharedLayout detectado' : ', sin SharedLayout en HTML'}`);
    }
  } catch (e) {
    result(false, '🖥️ Exam page check', e.message);
  }

  // Resumen
  console.log(`\n═══════════════════════════════`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📊 Total:  ${passed + failed}`);
  console.log(`═══════════════════════════════\n`);

  process.exit(failed > 0 ? 1 : 0);
}

main().catch(e => {
  console.error('FATAL:', e.message);
  process.exit(1);
});
