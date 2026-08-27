/**
 * Bundle export — canonical v5.2 markdown builder for estudio studio.
 * Pure, testable — no DOM, no FS. Used by ExportButton.astro.
 */

import type { LocalGeneratedQuestion } from '../ai/exam-generator';

/** Override-able metadata for the .md frontmatter */
export interface BundleExportMeta {
  country: string; // e.g. "colombia"
  countryCode: string; // e.g. "CO"
  grado: number | string; // 6 or "3EM"
  asignatura: string; // e.g. "matematicas" (slug, lower, no accents)
  tema: string; // kebab-case ASCII e.g. "numeros-enteros"
  week: string; // e.g. "W01" (must be WNN)
  subjectCode?: string; // e.g. "MAT" (optional, inferred from asignatura)
  alignment?: string; // e.g. "DBA MEN Colombia"
  bundle_index?: number;
  total_questions?: number; // inferred from questions if omitted
  license?: string;
  tier?: string;
  creador?: string; // default local-llm
}

export interface EditableQuestion {
  id?: string;
  number?: number;
  statement: string;
  context?: string;
  options: { letter: string; text: string; is_correct: boolean; feedback?: string }[];
  correct_answer?: string;
  explanation: string;
  difficulty: string; // D3, D5-D6, etc — normalized to range
  bloom?: string;
  icfesOrEje?: string;
  expected_success?: number;
}

function slugifyUpper(s: string): string {
  return String(s || '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '');
}

function toKebabAscii(s: string): string {
  return String(s || '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function inferSubjectCode(asignatura: string): string {
  const key = String(asignatura || '').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
  if (key.includes('mat')) return 'MAT';
  if (key.includes('leng') || key.includes('espanol') || key.includes('lectura')) return 'LEN';
  if (key.includes('cien') || key.includes('natur') || key.includes('biolog')) return 'CIE';
  if (key.includes('socia') || key.includes('histo')) return 'SOC';
  if (key.includes('ingl')) return 'ING';
  if (key.includes('quim')) return 'QUI';
  if (key.includes('fisi')) return 'FIS';
  return slugifyUpper(asignatura).slice(0, 3) || 'GEN';
}

function normalizeWeek(w: string): string {
  const raw = String(w || '').toUpperCase().trim();
  const m = raw.match(/W?0*(\d{1,2})/);
  const n = m ? Number(m[1]) : 1;
  const clamped = Math.min(40, Math.max(1, n));
  return `W${String(clamped).padStart(2, '0')}`;
}

function normalizeDifficultyRange(d: string, index: number, total: number): string {
  const raw = String(d || '').toUpperCase().replace(/–/g, '-').trim();
  const allowed = new Set(['D3-D4', 'D5-D6', 'D7-D8', 'D9-D10']);
  if (allowed.has(raw)) return raw;
  if (/^D(3|4)$/.test(raw)) return 'D3-D4';
  if (/^D(5|6)$/.test(raw)) return 'D5-D6';
  if (/^D(7|8)$/.test(raw)) return 'D7-D8';
  if (/^D(9|10)$/.test(raw)) return 'D9-D10';
  // infer from position
  const ratio = (index + 1) / total;
  if (ratio <= 0.2) return 'D3-D4';
  if (ratio <= 0.5) return 'D5-D6';
  if (ratio <= 0.8) return 'D7-D8';
  return 'D9-D10';
}

function bloomForIndex(index: number, total: number, explicit?: string): string {
  if (explicit && String(explicit).trim()) return String(explicit).trim();
  const r = (index + 1) / total;
  if (r <= 0.2) return index % 2 === 0 ? 'Remember' : 'Understand';
  if (r <= 0.5) return 'Apply';
  if (r <= 0.8) return 'Analyze';
  return 'Evaluate';
}

function expectedSuccessForDifficulty(range: string): string {
  if (range === 'D3-D4') return '0.90';
  if (range === 'D5-D6') return '0.75';
  if (range === 'D7-D8') return '0.60';
  return '0.45';
}

function ejeLabelForCountry(countryCode: string): string {
  return countryCode.toUpperCase() === 'CO' ? 'ICFES' : 'EJE';
}

function defaultAlignment(country: string, countryCode: string): string {
  const c = String(country || '').toLowerCase();
  if (c.includes('colombia') || countryCode.toUpperCase() === 'CO') return 'DBA MEN Colombia';
  if (countryCode.toUpperCase() === 'MX') return 'SEP/NEM México';
  if (countryCode.toUpperCase() === 'AR') return 'NAP Aprender Argentina';
  if (countryCode.toUpperCase() === 'BR') return 'BNCC ENEM Brasil';
  if (countryCode.toUpperCase() === 'CL') return 'Bases Curriculares MINEDUC Chile';
  if (countryCode.toUpperCase() === 'PE') return 'CNEB MINEDU Perú';
  return `Marco curricular ${country}`;
}

export function buildBundleFileName(meta: BundleExportMeta): string {
  const code = String(meta.countryCode || 'CO').toUpperCase();
  const subj = String(meta.subjectCode || inferSubjectCode(meta.asignatura)).toUpperCase();
  const gradeRaw = String(meta.grado ?? '6').toUpperCase();
  // Preserve 3EM exactly (brasil), else numeric
  const gradePart = gradeRaw === '3EM' ? '3EM' : String(Number(String(meta.grado).match(/\d+/)?.[0] || 6));
  const week = normalizeWeek(meta.week);
  const topic = toKebabAscii(meta.tema);
  return `${code}-${subj}-${gradePart}-2026-${week}-${topic}-001-MASTERY-bundle.md`;
}

export function generateBundleMarkdown(
  meta: BundleExportMeta,
  questions: EditableQuestion[],
): { fileName: string; content: string } {
  const code = String(meta.countryCode || 'CO').toUpperCase();
  const subjCode = String(meta.subjectCode || inferSubjectCode(meta.asignatura)).toUpperCase();
  const gradeRaw = String(meta.grado ?? 6).toUpperCase();
  const week = normalizeWeek(meta.week);
  const topic = toKebabAscii(meta.tema || 'tema-generado');
  const fileName = buildBundleFileName({ ...meta, subjectCode: subjCode, week, tema: topic });
  const id = fileName.replace(/\.md$/, '');
  const total = questions.length;
  const countryName = String(meta.country || 'colombia').toLowerCase();
  // keep original slug for frontmatter asignatura: lower, no accents? we store as passed but normalized
  const asignaturaFront = String(meta.asignatura || 'matematicas').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
  const alignment = String(meta.alignment || defaultAlignment(countryName, code));
  const bundleIndex = Number(meta.bundle_index ?? 1);
  const license = String(meta.license || 'FREE');
  const tier = String(meta.tier || 'legacy');
  const creador = String(meta.creador || 'local-llm');

  // grade numeric for frontmatter grado
  const gradoNum: number | string = gradeRaw === '3EM' ? '3EM' : Number(String(meta.grado).match(/\d+/)?.[0] || 6);

  const frontmatter = [
    '---',
    `id: "${id}"`,
    `country: "${countryName}"`,
    `grado: ${typeof gradoNum === 'string' ? `"${gradoNum}"` : gradoNum}`,
    `asignatura: "${asignaturaFront}"`,
    `tema: "${topic}"`,
    `periodo: "weekly"`,
    `week: "${week}"`,
    `year: 2026`,
    `bundle_type: "weekly"`,
    `protocol_version: "5.2"`,
    `total_questions: ${total}`,
    `bundle_size: ${total}`,
    `alignment: "${alignment.replace(/"/g, "'")}"`,
    `bundle_index: ${bundleIndex}`,
    `calibration: {difficulty_band: "D3-D4", expected_success: 0.8}`,
    `license: "${license}"`,
    `tier: "${tier}"`,
    `creador: "${creador}"`,
    '---',
    '',
  ].join('\n');

  const ejeKey = ejeLabelForCountry(code);

  const body = questions
    .map((q, i) => {
      const n = i + 1;
      const range = normalizeDifficultyRange(q.difficulty, i, total);
      const bloom = bloomForIndex(i, total, q.bloom);
      const expSucc = q.expected_success != null ? String(q.expected_success) : expectedSuccessForDifficulty(range);
      const qid = String(q.id || `${id}-v${n}`).replace(/\s+/g, '-');
      const contexto = String(q.context || `Situación del tema ${topic} útil para resolver la pregunta.`).trim();
      const enunciado = String(q.statement || '').trim();
      const explicacion = String(q.explanation || 'Explicación pedagógica.').trim();
      const icfesVal = String(q.icfesOrEje || (code === 'CO' ? 'Numerico' : 'Eje tematico')).trim();
      // options: ensure 4, A-D, single correct
      const opts = (q.options || []).slice(0, 4);
      while (opts.length < 4) {
        const L = String.fromCharCode(65 + opts.length);
        opts.push({ letter: L, text: `Opción ${L}`, is_correct: false, feedback: 'Distractor.' });
      }
      // ensure exactly one correct
      if (!opts.some((o) => o.is_correct)) opts[0].is_correct = true;
      if (opts.filter((o) => o.is_correct).length > 1) {
        let first = true;
        for (const o of opts) {
          if (o.is_correct) {
            if (first) first = false;
            else o.is_correct = false;
          }
        }
      }
      const optLines = opts
        .map((o, oi) => {
          const L = String.fromCharCode(65 + oi);
          const mark = o.is_correct ? 'x' : ' ';
          const fb = String(o.feedback || (o.is_correct ? 'Opción correcta.' : 'Distractor.')).replace(/-->/g, '—');
          return `- [${mark}] ${L}) ${String(o.text).trim()}\n  <!-- feedback: ${fb} -->`;
        })
        .join('\n');

      return [
        `## Question ${n} [${range}]`,
        `**ID:** ${qid}`,
        `**Bloom:** ${bloom}`,
        `**${ejeKey}:** ${icfesVal}`,
        `**Expected_Success:** ${expSucc}`,
        `**Contexto:** ${contexto}`,
        `### Enunciado`,
        enunciado,
        ``,
        `### Opciones`,
        optLines,
        ``,
        `### Explicacion Pedagogica`,
        explicacion,
        ``,
      ].join('\n');
    })
    .join('\n');

  const content = frontmatter + body.trimEnd() + '\n';
  return { fileName, content };
}

/** Download helper — safe to call only in browser */
export function downloadMarkdown(fileName: string, content: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 800);
}

/** Adapter from LocalGeneratedQuestion to EditableQuestion */
export function fromLocalGenerated(q: LocalGeneratedQuestion, index: number): EditableQuestion {
  return {
    id: q.id,
    number: q.number || index + 1,
    statement: q.statement,
    context: q.context,
    options: q.options.map((o) => ({ ...o })),
    correct_answer: q.correct_answer,
    explanation: q.explanation,
    difficulty: q.difficulty,
    bloom: q.bloom,
  };
}
