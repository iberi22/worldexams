#!/usr/bin/env node
/**
 * generate-generation-metrics.mjs
 * Genera public/generation-metrics.json — métricas de generación por país
 * (bundles, validación, calidad) para la página /generacion (Laboratorio Abierto).
 *
 * Uso:
 *   node scripts/generate-generation-metrics.mjs            # desde saberparatodos/
 *   node saberparatodos/scripts/generate-generation-metrics.mjs  # desde la raíz
 *
 * Salida: saberparatodos/public/generation-metrics.json
 * Esquema:
 * {
 *   "generatedAt": "ISO",
 *   "validatorVersion": "5.2",
 *   "countries": [
 *     { "code": "CO", "name": "colombia", "flag": "🇨🇴", "bundles": 397,
 *       "errors": 754, "warnings": 3715, "contentErrors": 714,
 *       "okPct": 10, "promptPath": "skills/bundle-creator/rules/CO.md",
 *       "promptUrl": "https://github.com/iberi22/worldexams/blob/main/skills/bundle-creator/rules/CO.md",
 *       "issues": ["bundle_index", "question_count"] }
 *   ],
 *   "totals": { "bundles": 1358, "errors": 1694, "warnings": 20281, "contentErrors": 824 }
 * }
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const QUESTIONS_DIR = join(REPO_ROOT, 'questions_data');
// src/generated/ para import en build de Astro; public/ para acceso runtime/API
const SRC_GENERATED_DIR = join(__dirname, '..', 'src', 'generated');
const SRC_GENERATED_FILE = join(SRC_GENERATED_DIR, 'generation-metrics.json');
const OUT_DIR = join(__dirname, '..', 'public');
const OUT_FILE = join(OUT_DIR, 'generation-metrics.json');

const FLAGS = {
  CO: '🇨🇴', MX: '🇲🇽', AR: '🇦🇷', BR: '🇧🇷', CL: '🇨🇱', PE: '🇵🇪',
  EC: '🇪🇨', UY: '🇺🇾', PY: '🇵🇾', BO: '🇧🇴', CR: '🇨🇷', SV: '🇸🇻',
  HN: '🇭🇳', ES: '🇪🇸', PR: '🇵🇷', PA: '🇵🇦', GT: '🇬🇹', DO: '🇩🇴',
  NI: '🇳🇮', GQ: '🇬🇶',
};

function countBundles(countryDir) {
  if (!existsSync(countryDir)) return 0;
  let n = 0;
  for (const entry of readdirSync(countryDir, { withFileTypes: true })) {
    const p = join(countryDir, entry.name);
    if (entry.isDirectory()) n += countBundles(p);
    else if (entry.name.endsWith('MASTERY-bundle.md')) n += 1;
  }
  return n;
}

// Mapear carpeta de país → código de país (para la URL del prompt)
const COUNTRY_CODES = {
  colombia: 'CO', mexico: 'MX', argentina: 'AR', brasil: 'BR', chile: 'CL',
  peru: 'PE', ecuador: 'EC', uruguay: 'UY', paraguay: 'PY', bolivia: 'BO',
  costarica: 'CR', 'el-salvador': 'SV', honduras: 'HN', spain: 'ES',
  'puerto-rico': 'PR', panama: 'PA', guatemala: 'GT', 'dominican_republic': 'DO',
  nicaragua: 'NI', 'guinea-ecuatorial': 'GQ',
};

async function main() {
  const countries = [];
  const totals = { bundles: 0, errors: 0, warnings: 0, contentErrors: 0 };

  const entries = readdirSync(QUESTIONS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  for (const countryDir of entries) {
    const code = COUNTRY_CODES[countryDir];
    if (!code) continue; // solo países mapeados

    const bundles = countBundles(join(QUESTIONS_DIR, countryDir));
    if (bundles === 0) continue;

    // Correr el validador por país
    let errors = 0, warnings = 0, contentErrors = 0;
    const issues = [];
    try {
      const out = execFileSync('node', [
        join(__dirname, 'validate_content.js'), `--country=${countryDir}`,
      ], { cwd: join(__dirname, '..'), encoding: 'utf8', timeout: 120000 });

      const mErr = out.match(/Errores:\s*(\d+)/);
      const mWarn = out.match(/Warnings:\s*(\d+)/);
      errors = mErr ? parseInt(mErr[1], 10) : 0;
      warnings = mWarn ? parseInt(mWarn[1], 10) : 0;

      const biCount = (out.match(/bundle_index/g) || []).length;
      contentErrors = Math.max(errors - biCount, 0);
      if (biCount > 0) issues.push('bundle_index');
      if (out.includes('MASTERY debe tener')) issues.push('question_count');
      if (out.includes('sin marcador de dificultad')) issues.push('difficulty_marker');
      if (out.includes('calibration')) issues.push('calibration');
    } catch (e) {
      errors = -1; // validador falló
      issues.push('validator_error');
    }

    // OK% (heurística: bundles sin errores de contenido)
    const okPct = bundles > 0
      ? Math.round(((bundles - Math.min(contentErrors, bundles)) / bundles) * 100)
      : 0;

    totals.bundles += bundles;
    totals.errors += Math.max(errors, 0);
    totals.warnings += warnings;
    totals.contentErrors += contentErrors;

    countries.push({
      code,
      name: countryDir,
      flag: FLAGS[code] || '🌎',
      bundles,
      errors: Math.max(errors, 0),
      warnings,
      contentErrors,
      okPct,
      issues: [...new Set(issues)],
      promptPath: `skills/bundle-creator/rules/${code}.md`,
      promptUrl: `https://github.com/iberi22/worldexams/blob/main/skills/bundle-creator/rules/${code}.md`,
    });
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    validatorVersion: '5.2',
    countries,
    totals,
  };

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  if (!existsSync(SRC_GENERATED_DIR)) mkdirSync(SRC_GENERATED_DIR, { recursive: true });
  const json = JSON.stringify(payload, null, 2);
  writeFileSync(OUT_FILE, json);
  writeFileSync(SRC_GENERATED_FILE, json);
  console.log(`✅ generation-metrics.json generado: ${countries.length} países, ${totals.bundles} bundles`);
  console.log(`   → ${OUT_FILE}`);
  console.log(`   → ${SRC_GENERATED_FILE} (build-time import)`);
}

main().catch((e) => {
  console.error('❌ Error generando métricas:', e.message);
  process.exit(1);
});
