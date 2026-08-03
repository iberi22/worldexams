#!/usr/bin/env node
/**
 * generate-jules-issue-matrix.mjs
 * Builds atomic Jules issue markdown (≤15 bundles) with skill links + agent-state.
 *
 * Usage:
 *   node scripts/generate-jules-issue-matrix.mjs --country PE --grade 11 --subject matematicas --from 1 --to 10
 *   node scripts/generate-jules-issue-matrix.mjs --country CL --grade 11 --subject lenguaje --from 1 --to 10 --write
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const COUNTRY_META = {
  PE: { name: 'Peru', folder: 'peru', subjCode: { matematicas: 'MAT', comunicacion: 'COM', ciencia: 'CIE', sociales: 'SOC', ingles: 'ING' } },
  CL: { name: 'Chile', folder: 'chile', subjCode: { matematicas: 'MAT', lenguaje: 'LEN', 'ciencias-naturales': 'CIE', historia: 'HIS', ingles: 'ING' } },
  MX: { name: 'Mexico', folder: 'mexico', subjCode: { matematicas: 'MAT', lengua: 'LEN', 'lectura-critica': 'LC', 'ciencias-naturales': 'CIE', 'sociales-ciudadanas': 'SOC', ingles: 'ING' } },
  AR: { name: 'Argentina', folder: 'argentina', subjCode: { matematicas: 'MAT', lengua: 'LEN', ciencias: 'CIE', sociales: 'SOC', ingles: 'ING' } },
  EC: { name: 'Ecuador', folder: 'ecuador', subjCode: { matematicas: 'MAT', lengua: 'LEN', ciencias: 'CIE', sociales: 'SOC', ingles: 'ING' } },
  BR: { name: 'Brasil', folder: 'brasil', subjCode: { matematica: 'MAT', portugues: 'POR' } },
  CO: { name: 'Colombia', folder: 'colombia', subjCode: { matematicas: 'MAT', 'lectura-critica': 'LC', 'ciencias-naturales': 'CN', 'sociales-ciudadanas': 'SOC', ingles: 'ING', lengua: 'LEN' } },
  UY: { name: 'Uruguay', folder: 'uruguay', subjCode: { matematicas: 'MAT', lengua: 'LEN', 'ciencias-naturales': 'CIE', sociales: 'SOC', ingles: 'ING' } },
  PY: { name: 'Paraguay', folder: 'paraguay', subjCode: { matematicas: 'MAT', lengua: 'LEN', 'ciencias-naturales': 'CIE', sociales: 'SOC', ingles: 'ING' } },
  SV: { name: 'El Salvador', folder: 'el-salvador', subjCode: { matematicas: 'MAT', lengua: 'LEN', 'ciencias-naturales': 'CIE', sociales: 'SOC', ingles: 'ING' } },
  PR: { name: 'Puerto Rico', folder: 'puerto-rico', subjCode: { matematicas: 'MAT', espanol: 'ESP', ciencias: 'CIE', sociales: 'SOC', ingles: 'ING' } },
  BO: { name: 'Bolivia', folder: 'bolivia', subjCode: { matematicas: 'MAT', lengua: 'LEN', 'ciencias-naturales': 'CIE', sociales: 'SOC', ingles: 'ING' } },
  CR: { name: 'Costa Rica', folder: 'costarica', subjCode: { matematicas: 'MAT', lengua: 'LEN', 'ciencias-naturales': 'CIE', 'estudios-sociales': 'SOC', ingles: 'ING' } },
  HN: { name: 'Honduras', folder: 'honduras', subjCode: { matematicas: 'MAT', lengua: 'LEN', 'ciencias-naturales': 'CIE', sociales: 'SOC', ingles: 'ING' } },
  ES: { name: 'Espana', folder: 'spain', subjCode: { matematicas: 'MAT', lengua: 'LEN', 'ciencias-naturales': 'CIE', sociales: 'SOC', ingles: 'ING' } },
};

function parseArgs(argv) {
  const out = { country: 'PE', grade: 11, subject: 'matematicas', from: 1, to: 10, write: false, year: 2026 };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const n = argv[i + 1];
    if (a === '--country') { out.country = String(n).toUpperCase(); i++; }
    else if (a === '--grade') { out.grade = Number(n); i++; }
    else if (a === '--subject') { out.subject = String(n); i++; }
    else if (a === '--from') { out.from = Number(n); i++; }
    else if (a === '--to') { out.to = Number(n); i++; }
    else if (a === '--year') { out.year = Number(n); i++; }
    else if (a === '--write') { out.write = true; }
  }
  return out;
}

function questionsPerBundle(grade) {
  if (grade <= 5) return 8;
  if (grade <= 7) return 10;
  if (grade <= 10) return 12;
  return 20;
}

function weekTopic(w) {
  return `tema-w${String(w).padStart(2, '0')}`;
}

function buildIssue(opts) {
  const meta = COUNTRY_META[opts.country];
  if (!meta) throw new Error(`Unknown country ${opts.country}. Add to COUNTRY_META.`);

  // Validation: Check if the subject folder exists in questions_data/[country_folder]/
  const subjectPath = path.resolve(root, 'questions_data', meta.folder, opts.subject);
  if (!fs.existsSync(subjectPath)) {
    throw new Error(`[VALIDATION BLOCKED] Subject '${opts.subject}' does not exist under questions_data/${meta.folder}/. Please ensure the directory exists first.`);
  }

  const from = Math.max(1, opts.from);
  const to = Math.min(40, opts.to);
  const count = to - from + 1;
  if (count < 1) throw new Error('Invalid week range');
  if (count > 15) throw new Error(`Max 15 bundles/issue (got ${count}). Split the range.`);

  const subjCode = meta.subjCode[opts.subject] || opts.subject.slice(0, 3).toUpperCase();
  const qn = questionsPerBundle(opts.grade);
  const gradeToken = opts.grade === '3EM' ? '3EM' : String(opts.grade);
  const wFrom = `W${String(from).padStart(2, '0')}`;
  const wTo = `W${String(to).padStart(2, '0')}`;
  const title = `[JULES] ${meta.name} - ${opts.subject} ${gradeToken} - ${wFrom}-${wTo} (${count} bundles)`;
  const route = `questions_data/${meta.folder}/${opts.subject}/grado-${opts.grade}/${opts.year}/weekly/`;

  const rows = [];
  for (let w = from; w <= to; w++) {
    const ww = `W${String(w).padStart(2, '0')}`;
    const topic = weekTopic(w);
    const file = `${opts.country}-${subjCode}-${gradeToken}-${opts.year}-${ww}-${topic}-001-MASTERY-bundle.md`;
    rows.push(`| ${w - from + 1} | ${ww} | ${topic} | \`${file}\` |`);
  }

  const body = `---
title: "${title}"
labels: ["jules", "generate-questions", "ai-agent", "stage:planning"]
---

## Reglas criticas para Jules

- Maximo 15 bundles; este lote tiene **${count}**.
- No regenerar existentes salvo \`REPLACE\`.
- Solo archivos \`.md\` en \`${route}\`.
- Validar: \`npm run validate -- {archivos}\` en **0 fallos** antes de comentar.
- Comentar: \`[OK] Generados N bundles: ...\`.

## Anti-errores (purga 2026-07-28 — docs/specs/CONTENT_ERRORS.md)

1. Eje por pregunta: ${opts.country === 'CO' ? '`**ICFES:**` (solo Colombia)' : '`**EJE:**` — ICFES PROHIBIDO fuera de Colombia'}.
2. \`alignment\`: entidad oficial del país (ver regla ${opts.country}); NUNCA ICFES/Saber/DBA.
3. Ruta EXACTA \`${route}\` — carpeta = nombre completo del país; no crear variantes.
4. Frontmatter: 15 campos de AGENTS.md; \`week: "WNN"\` (nunca \`semana:\`); \`id\` = filename sin \`.md\`.
5. \`## Question N [D#]\` (nunca \`## Pregunta\`); \`### Enunciado/Opciones/Explicacion Pedagogica\`; \`**Contexto:**\` (nunca \`Context\`).
6. Sin placeholders ("Distractor N", "Opcion correcta", "tema-semana-NN"); opciones únicas; feedback en las 4 opciones.
7. Tras validar: \`node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only\` + \`npm run audit:country-readiness\`.

## Skills y protocolo (obligatorio)

1. \`AGENTS.md\` (v5.2)
2. \`skills/worldexams-bundle-generator/SKILL.md\`
3. \`skills/bundle-creator/SKILL.md\`
4. \`skills/bundle-creator/rules/${opts.country}.md\` (incluye Anti-Error Checklist del país)
5. \`docs/specs/curriculums/${meta.folder}/README.md\` (si existe)
6. \`docs/HERMES_JULES_WORKFLOW.md\`
7. \`docs/specs/ACTIVE_PROTOCOLS.md\`
8. \`docs/specs/CONTENT_ERRORS.md\`

## Configuracion

| Campo | Valor |
|-------|-------|
| Pais | ${meta.name} |
| Codigo | ${opts.country} |
| Asignatura | ${opts.subject} |
| Subject code | ${subjCode} |
| Grado | ${gradeToken} |
| Ano | ${opts.year} |
| Protocolo | v5.2 |
| Preguntas/bundle | ${qn} |
| Ruta | \`${route}\` |

## Bundles a generar

| # | Week | Tema | Archivo |
|---|------|------|---------|
${rows.join('\n')}

## Ownership path (anti-conflicto)

Jules solo toca archivos listados bajo \`${route}\`. No mezclar otros paises/materias/grados.

<agent-state>
  <intent>Generate ${opts.country} ${opts.subject} G${gradeToken} ${wFrom}-${wTo}</intent>
  <step>planning</step>
  <plan>
    - [pending] Read skills + country rule
    - [pending] Generate ${count} weekly MASTERY bundles
    - [pending] npm run validate
    - [pending] Comment [OK] and open PR
  </plan>
</agent-state>
`;

  return { title, body, count };
}

const opts = parseArgs(process.argv);
const { title, body } = buildIssue(opts);
console.log(title);
console.log('---');
console.log(body);

if (opts.write) {
  const dir = path.join(root, '.gitcore/planning/jules-wave0');
  fs.mkdirSync(dir, { recursive: true });
  const safe = `${opts.country}-${opts.subject}-G${opts.grade}-W${opts.from}-W${opts.to}.md`.replace(/[^a-zA-Z0-9._-]/g, '-');
  const file = path.join(dir, safe);
  fs.writeFileSync(file, body, 'utf8');
  console.error(`Wrote ${file}`);
}
