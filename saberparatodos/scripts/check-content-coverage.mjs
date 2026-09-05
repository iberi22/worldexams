#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * check-content-coverage.mjs — Gate de cobertura de contenido (grado, materia, periodo 1-4)
 *
 * Mide la matriz de cobertura para la Fase 4b del protocolo de despliegue.
 * Agrupa el contenido por (grado, materia, periodo) y verifica que cada combinación
 * requerida cumpla el umbral de preguntas mínimas.
 *
 * Aproximación del umbral --min-questions=20:
 * En el currículo de 40 semanas, 1 periodo académico comprende 10 semanas (W01-W10 -> P1,
 * W11-W20 -> P2, W21-W30 -> P3, W31-W40 -> P4). Cada semana típicamente contiene ~20
 * preguntas para Grado 11, por lo que 20 preguntas es el mínimo representativo de 1 semana
 * de contenido activo dentro del periodo.
 *
 * Mapeo W -> periodo:
 * Copia exacta de mapPeriodoToPeriod en `saberparatodos/src/lib/questions/pool-activation.ts`:
 * - Periodos 1-4 explícitos -> 1-4
 * - Semanas curriculares W (>4) -> ceil(W / 10) acotado a [1, 4]
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

const COUNTRY_MAP = {
  colombia: 'co',
  co: 'co',
  mexico: 'mx',
  mx: 'mx',
  peru: 'pe',
  pe: 'pe',
  chile: 'cl',
  cl: 'cl',
  ecuador: 'ec',
  ec: 'ec',
  argentina: 'ar',
  ar: 'ar',
  guatemala: 'gt',
  gt: 'gt',
  brasil: 'br',
  brazil: 'br',
  br: 'br',
  spain: 'es',
  espana: 'es',
  es: 'es',
};

const DEFAULT_GRADES = [3, 5, 6, 7, 8, 9, 10, 11];
const DEFAULT_SUBJECTS = [
  'matematicas',
  'lectura-critica',
  'ingles',
  'ciencias-naturales',
  'sociales-ciudadanas',
];
const DEFAULT_PERIODS = [1, 2, 3, 4];

/**
 * Mapea el campo `periodo` o semana W al periodo académico 1–4.
 * Fuente canónica: saberparatodos/src/lib/questions/pool-activation.ts
 */
export function mapPeriodoToPeriod(periodo) {
  const raw = Number(periodo);
  if (!Number.isFinite(raw) || raw <= 0) return null;
  if (raw >= 1 && raw <= 4) return raw;
  return Math.min(4, Math.max(1, Math.ceil(raw / 10)));
}

/**
 * Normaliza asignaturas a claves canónicas de materia.
 */
export function normalizeSubject(subj) {
  const s = String(subj || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');

  if (['matematicas', 'matematica', 'math', 'matematicasyrazonamiento'].includes(s)) return 'matematicas';
  if (['lecturacritica', 'lengua', 'lenguaje', 'espanol'].includes(s)) return 'lectura-critica';
  if (['ingles', 'english', 'ing'].includes(s)) return 'ingles';
  if (['cienciasnaturales', 'ciencias'].includes(s)) return 'ciencias-naturales';
  if (['socialesciudadanas', 'socialesyciudadanas', 'sociales'].includes(s)) return 'sociales-ciudadanas';
  return s;
}

export function parseArgs(argv = process.argv.slice(2)) {
  const options = {
    country: 'colombia',
    minQuestions: 20,
    json: false,
    source: 'packs',
    dir: null,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--country=')) {
      options.country = arg.split('=')[1];
    } else if (arg === '--country' && argv[i + 1]) {
      options.country = argv[++i];
    } else if (arg.startsWith('--min-questions=')) {
      options.minQuestions = parseInt(arg.split('=')[1], 10) || 20;
    } else if (arg === '--min-questions' && argv[i + 1]) {
      options.minQuestions = parseInt(argv[++i], 10) || 20;
    } else if (arg === '--json') {
      options.json = true;
    } else if (arg.startsWith('--source=')) {
      options.source = arg.split('=')[1];
    } else if (arg === '--source' && argv[i + 1]) {
      options.source = argv[++i];
    } else if (arg.startsWith('--dir=')) {
      options.dir = arg.split('=')[1];
    } else if (arg === '--dir' && argv[i + 1]) {
      options.dir = argv[++i];
    }
  }

  return options;
}

async function collectQuestionsFromPacks(packsDir, countryCode) {
  const matrix = new Map(); // key: grade|subject|period -> count

  let files = [];
  try {
    files = await fs.readdir(packsDir);
  } catch {
    return matrix;
  }

  const prefix = `${countryCode}-`;

  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    if (countryCode && !file.startsWith(prefix)) continue;

    // Patrón esperado: co-week-12-grade-11-subject-matematicas.json
    const match = file.match(/^(?:[a-z]{2}-)?week-(\d+)-grade-(\d+)-subject-(.+)\.json$/i);
    let weekFromFile = null;
    let gradeFromFile = null;
    let subjectFromFile = null;

    if (match) {
      weekFromFile = parseInt(match[1], 10);
      gradeFromFile = parseInt(match[2], 10);
      subjectFromFile = match[3];
    }

    const filePath = path.join(packsDir, file);
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(content);

      if (Array.isArray(data.questions)) {
        for (const q of data.questions) {
          const rawGrade = q.grade !== undefined ? q.grade : (data.metadata?.grade || gradeFromFile);
          const rawSubj = q.subject || q.category || data.metadata?.subject || subjectFromFile;
          const rawPeriod = q.periodo !== undefined ? q.periodo : (data.metadata?.week || weekFromFile);

          const grade = Number(rawGrade);
          const subject = normalizeSubject(rawSubj);
          const period = mapPeriodoToPeriod(rawPeriod);

          if (!Number.isFinite(grade) || !subject || !period) continue;

          const key = `${grade}|${subject}|${period}`;
          matrix.set(key, (matrix.get(key) || 0) + 1);
        }
      } else if (match) {
        // Pack vacío o sin lista de preguntas explícita
        const grade = gradeFromFile;
        const subject = normalizeSubject(subjectFromFile);
        const period = mapPeriodoToPeriod(weekFromFile);
        if (grade && subject && period) {
          const key = `${grade}|${subject}|${period}`;
          if (!matrix.has(key)) matrix.set(key, 0);
        }
      }
    } catch {
      // Ignorar pack ilegible
    }
  }

  return matrix;
}

async function collectQuestionsFromMarkdown(qDataDir, countryCode) {
  const matrix = new Map(); // key: grade|subject|period -> count

  async function walk(dir) {
    let entries = [];
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.name.endsWith('.md')) {
        try {
          const content = await fs.readFile(fullPath, 'utf8');
          const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
          if (!frontmatterMatch) continue;

          const frontmatter = {};
          for (const line of frontmatterMatch[1].split(/\r?\n/)) {
            const sep = line.indexOf(':');
            if (sep === -1) continue;
            const k = line.slice(0, sep).trim();
            const v = line.slice(sep + 1).trim().replace(/^["']|["']$/g, '');
            frontmatter[k] = v;
          }

          const rawGrade = frontmatter.grado || frontmatter.grade || '11';
          const grade = rawGrade.toUpperCase() === '3EM' ? 11 : parseInt(rawGrade, 10);
          const rawSubj = frontmatter.asignatura || frontmatter.subject;
          const subject = normalizeSubject(rawSubj);
          const rawWeek = frontmatter.week || frontmatter.semana || '';
          const weekMatch = String(rawWeek).match(/W?(\d+)/i);
          const rawPeriod = weekMatch ? Number(weekMatch[1]) : (frontmatter.periodo || frontmatter.period);
          const period = mapPeriodoToPeriod(rawPeriod);

          // Contar preguntas (## Pregunta N o ### Pregunta N)
          const qMatches = content.match(/^#{2,3}\s+Pregunta\s+\d+/gim) || [];
          const count = qMatches.length || 1;

          if (!Number.isFinite(grade) || !subject || !period) continue;

          const key = `${grade}|${subject}|${period}`;
          matrix.set(key, (matrix.get(key) || 0) + count);
        } catch {
          // Ignorar md ilegible
        }
      }
    }
  }

  await walk(qDataDir);
  return matrix;
}

export async function runCoverageCheck(options = {}) {
  const countryInput = (options.country || 'colombia').toLowerCase();
  const countryCode = COUNTRY_MAP[countryInput] || countryInput;
  const minQuestions = options.minQuestions || 20;
  const source = options.source || 'packs';

  let dataDir = options.dir;
  if (!dataDir) {
    if (source === 'md') {
      dataDir = path.join(repoRoot, '..', 'questions_data', countryInput);
    } else {
      dataDir = path.join(repoRoot, '..', 'apps', 'worldexams-api', 'public', 'v1', 'packs');
    }
  }

  const matrix = source === 'md'
    ? await collectQuestionsFromMarkdown(dataDir, countryCode)
    : await collectQuestionsFromPacks(dataDir, countryCode);

  const results = [];
  const gaps = [];

  for (const grade of DEFAULT_GRADES) {
    for (const subject of DEFAULT_SUBJECTS) {
      for (const period of DEFAULT_PERIODS) {
        const key = `${grade}|${subject}|${period}`;
        const count = matrix.get(key) || 0;
        const ok = count >= minQuestions;

        const cell = {
          grade,
          subject,
          period,
          count,
          minQuestions,
          status: ok ? 'OK' : 'HUECO',
        };

        results.push(cell);
        if (!ok) {
          gaps.push(cell);
        }
      }
    }
  }

  return {
    country: countryInput,
    countryCode,
    source,
    dataDir,
    minQuestions,
    totalCells: results.length,
    gapCount: gaps.length,
    okCount: results.length - gaps.length,
    results,
    gaps,
    success: gaps.length === 0,
  };
}

export function formatAsciiTable(report) {
  const lines = [];
  lines.push(`=== Matrix Content Coverage Report (${report.country.toUpperCase()}) ===`);
  lines.push(`Origen: ${report.source} (${report.dataDir})`);
  lines.push(`Umbral mínimo por celda: ${report.minQuestions} preguntas`);
  lines.push('');
  lines.push('| Grado | Materia             | Periodo | Preguntas | Mínimo | Estado |');
  lines.push('|-------|---------------------|---------|-----------|--------|--------|');

  for (const r of report.results) {
    const g = String(r.grade).padEnd(5);
    const s = r.subject.padEnd(19);
    const p = String(r.period).padEnd(7);
    const c = String(r.count).padEnd(9);
    const m = String(r.minQuestions).padEnd(6);
    const st = r.status.padEnd(6);
    lines.push(`| ${g} | ${s} | ${p} | ${c} | ${m} | ${st} |`);
  }

  lines.push('');
  if (report.success) {
    lines.push(`OK Cobertura completa: ${report.okCount}/${report.totalCells} combinaciones cumplen el mínimo.`);
  } else {
    lines.push(`FAIL Cobertura incompleta: ${report.gapCount}/${report.totalCells} combinaciones presentan huecos.`);
    lines.push('Huecos detectados:');
    for (const gap of report.gaps) {
      lines.push(`  - Grado ${gap.grade}, Materia ${gap.subject}, Periodo ${gap.period}: ${gap.count}/${gap.minQuestions} preguntas`);
    }
  }

  return lines.join('\n');
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const report = await runCoverageCheck(options);

  if (options.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(formatAsciiTable(report));
  }

  process.exit(report.success ? 0 : 1);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch((err) => {
    console.error('Fatal error in check-content-coverage:', err);
    process.exit(1);
  });
}
