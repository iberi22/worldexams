/**
 * Bundle fetcher para rutas jerárquicas /preguntas/ (issue #1023).
 *
 * Fuente de datos:
 *  - `preguntas-index.json`: índice derivado de `questions_data/**\2026/weekly/*.md`
 *    (metadata de frontmatter v5.2), embebido para funcionar en Cloudflare Workers.
 *  - En contexto Node (dev/build) se intenta un re-escaneo con `fs` para
 *    recoger bundles más recientes que el índice commiteado.
 *  - En runtime edge sin `fs`, el detalle de preguntas se obtiene de los
 *    packs estáticos del API (`/v1/packs/{pack}.json`) vía fetch.
 */
import bakedIndex from './preguntas-index.json';
import { getCountryManifest } from '../country-manifest-loader';
import { scanQuestionsData } from './index-builder.mjs';
import { packIdCandidates, packUrl, selectBundleQuestions, type ApiPackQuestion } from './pack-source';

export interface BundleEntry {
  id: string;
  countryDir: string;
  country: string;
  code: string;
  subject: string;
  grade: number | null;
  gradeSlug: string;
  week: string;
  tema: string;
  total: number;
  alignment: string;
  /** Clave del pack estático (ver index-builder.mjs); ausente en índices antiguos. */
  packId?: string;
}

export interface BundleQuestionOption {
  letter: string;
  text: string;
  correct: boolean;
  feedback: string;
}

export interface BundleQuestion {
  id: string;
  number: number;
  difficulty: string;
  bloom: string;
  context?: string;
  statement: string;
  options: BundleQuestionOption[];
  explanation: string;
}

export interface CountryDisplay {
  name: string;
  flag: string;
  examName: string;
  language: string;
}

let cachedEntries: BundleEntry[] | null = null;

function isNodeContext(): boolean {
  return (
    typeof process !== 'undefined' &&
    typeof process.versions?.node === 'string' &&
    typeof process.cwd === 'function'
  );
}

/** Devuelve true cuando hay acceso a filesystem (dev server / build). */
export function hasFileSystemAccess(): boolean {
  return isNodeContext();
}

async function rescanFromDisk(): Promise<BundleEntry[] | null> {
  if (!isNodeContext()) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fs: any = await import('node:fs/promises');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodePath: any = await import('node:path');
    const root = nodePath.resolve(process.cwd(), '..', 'questions_data');
    try {
      await fs.stat(root);
    } catch {
      return null;
    }
    const entries: BundleEntry[] = await scanQuestionsData(root, fs, nodePath);
    return entries.length >= bakedIndex.bundles.length ? entries : null;
  } catch {
    return null;
  }
}

/** Índice completo de bundles weekly 2026 (ordenado por id). */
export async function getAllBundles(): Promise<BundleEntry[]> {
  if (cachedEntries) return cachedEntries;
  const fresh = await rescanFromDisk();
  cachedEntries = fresh ?? (bakedIndex.bundles as BundleEntry[]);
  return cachedEntries;
}

export function normalizeGradeSlug(raw: string): string | null {
  const value = raw.toLowerCase();
  if (/^grado-\d+$/.test(value)) return value;
  if (/^\d+$/.test(value)) return `grado-${value}`;
  if (/^\d+em$/.test(value) || value === '3o-ano') return '3o-ano';
  return null;
}

export function findCountryBundles(entries: BundleEntry[], countrySlug: string): BundleEntry[] {
  const needle = countrySlug.toLowerCase();
  return entries.filter(
    (e) => e.country === needle || e.code.toLowerCase() === needle || e.countryDir === needle
  );
}

export function findGradeBundles(
  entries: BundleEntry[],
  countrySlug: string,
  gradeRaw: string
): BundleEntry[] {
  const countryBundles = findCountryBundles(entries, countrySlug);
  const slug = normalizeGradeSlug(gradeRaw);
  if (slug) return countryBundles.filter((e) => e.gradeSlug === slug);
  return countryBundles.filter((e) => e.gradeSlug === gradeRaw.toLowerCase());
}

export function findSubjectBundles(
  entries: BundleEntry[],
  countrySlug: string,
  gradeRaw: string,
  subjectSlug: string
): BundleEntry[] {
  return findGradeBundles(entries, countrySlug, gradeRaw).filter(
    (e) => e.subject === subjectSlug.toLowerCase()
  );
}

export async function findBundleById(entries: BundleEntry[], bundleId: string): Promise<BundleEntry | undefined> {
  return entries.find((e) => e.id === bundleId);
}

export function gradeBundlesToGradeSlugs(bundles: BundleEntry[]): string[] {
  return [...new Set(bundles.map((b) => b.gradeSlug))].sort((a, b) => {
    const na = a.match(/\d+/)?.[0] ?? '0';
    const nb = b.match(/\d+/)?.[0] ?? '0';
    return Number(na) - Number(nb);
  });
}

export function gradeBundlesToSubjectSlugs(bundles: BundleEntry[]): string[] {
  return [...new Set(bundles.map((b) => b.subject))].sort();
}

export function bundleUrl(entry: BundleEntry): string {
  return `/preguntas/${entry.country}/${entry.gradeSlug}/${entry.subject}/${entry.id}/`;
}

export function getCountryDisplay(countrySlug: string): CountryDisplay {
  const manifest = getCountryManifest(countrySlug) ?? getCountryManifest(countrySlug.replace(/-/g, '_'));
  if (manifest) {
    return {
      name: manifest.name,
      flag: manifest.flag,
      examName: manifest.examName,
      language: manifest.language,
    };
  }
  return { name: toTitleCase(countrySlug), flag: '🌎', examName: '', language: 'es' };
}

export function toTitleCase(str: string): string {
  return str.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function gradeLabel(entry: BundleEntry): string {
  if (entry.grade != null) return `Grado ${entry.grade}`;
  if (entry.gradeSlug === '3o-ano') return '3º ano — Ensino Médio';
  return toTitleCase(entry.gradeSlug);
}

export function weekLabel(week: string): string {
  const n = week.replace(/^W/i, '');
  return `Semana ${Number(n) || n}`;
}

/**
 * Explicación publicable: sin la regla `---` final ni notas internas de
 * revisión (`[//]: # (QUALITY_REVIEW)` + tabla) que algunos bundles arrastran.
 */
export function cleanExplanation(text: string): string {
  return text
    .split(/^\s*\[\/\/\]: #/m)[0]
    .replace(/\n+---\s*$/, '')
    .trim();
}

export function parseMarkdownQuestions(md: string): BundleQuestion[] {
  const questions: BundleQuestion[] = [];
  const blocks = md.split(/^## Question /m).slice(1);
  for (const block of blocks) {
    const header = block.split('\n', 1)[0];
    const number = Number(header.match(/^(\d+)/)?.[1] ?? 0);
    const difficulty = header.match(/\[(D[^\]]+)\]/)?.[1] ?? '';
    const id = block.match(/\*\*ID:\*\*\s*(\S+)/)?.[1] ?? `q-${number}`;
    const bloom = block.match(/\*\*Bloom:\*\*\s*([^\n]+)/)?.[1].trim() ?? '';
    const context = block.match(/\*\*Contexto:\*\*\s*([^\n]+)/)?.[1].trim() ?? '';
    const statement = block.match(/### Enunciado\n([\s\S]*?)(?=\n### |$)/)?.[1].trim() ?? '';
    const optionsBlock = block.match(/### Opciones\n([\s\S]*?)(?=\n### |$)/)?.[1] ?? '';
    const options: BundleQuestionOption[] = [];
    const optionRegex = /^- \[( |x)\] ([A-D])\)\s*([^\n]+)(?:\n\s*<!--\s*feedback:\s*([\s\S]*?)\s*-->)?/gm;
    let m: RegExpExecArray | null;
    while ((m = optionRegex.exec(optionsBlock)) !== null) {
      options.push({
        letter: m[2],
        text: m[3].trim(),
        correct: m[1].toLowerCase() === 'x',
        feedback: (m[4] ?? '').replace(/\n\s*/g, ' ').trim(),
      });
    }
    const explanation = cleanExplanation(
      block.match(/### Explicaci[oó]n Pedag[oó]gica\n([\s\S]*?)(?=\n## |\n---|$)/)?.[1] ?? ''
    );
    questions.push({ id, number, difficulty, bloom, context, statement, options, explanation });
  }
  return questions;
}

export function packIdForBundle(entry: BundleEntry): string {
  return packIdCandidates(entry)[0];
}

function difficultyLabel(raw: string | number | undefined): string {
  const value = String(raw ?? '').trim();
  if (!value) return '';
  return /^\d+$/.test(value) ? `D${value}` : value;
}

async function questionsFromPack(entry: BundleEntry): Promise<BundleQuestion[] | null> {
  const envUrl =
    typeof import.meta !== 'undefined' ? (import.meta.env?.PUBLIC_API_BASE_URL as string | undefined) : undefined;
  for (const packId of packIdCandidates(entry)) {
    try {
      const res = await fetch(packUrl(envUrl, packId));
      if (!res.ok) continue;
      const json = (await res.json()) as { questions?: ApiPackQuestion[] };
      if (!Array.isArray(json.questions)) continue;
      const selected = selectBundleQuestions(json.questions, entry.id);
      if (!selected.length) continue;
      return selected.map((q, i) => ({
        id: q.id,
        number: i + 1,
        difficulty: difficultyLabel(q.difficulty),
        bloom: q.bloom ?? '',
        context: q.context ?? '',
        statement: q.statement ?? '',
        // Algunos packs guardan las opciones desordenadas (B, A, C, D).
        options: [...(q.options ?? [])]
          .sort((a, b) => String(a.letter).localeCompare(String(b.letter)))
          .map((o) => ({
            letter: o.letter,
            text: o.text,
            correct: Boolean(o.is_correct),
            feedback: o.feedback ?? '',
          })),
        explanation: cleanExplanation(q.explanation ?? ''),
      }));
    } catch {
      // try next candidate
    }
  }
  return null;
}

/** Preguntas de un bundle: markdown en Node, pack del API en runtime edge. */
export async function getBundleQuestions(entry: BundleEntry): Promise<BundleQuestion[] | null> {
  if (isNodeContext()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fs: any = await import('node:fs/promises');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodePath: any = await import('node:path');
      const file = nodePath.resolve(
        process.cwd(),
        '..',
        'questions_data',
        entry.countryDir,
        entry.subject,
        entry.gradeSlug,
        '2026',
        'weekly',
        `${entry.id}.md`
      );
      try {
        const md = await fs.readFile(file, 'utf8');
        return parseMarkdownQuestions(md);
      } catch {
        // fall through to pack fetch
      }
    } catch {
      // fall through to pack fetch
    }
  }
  return questionsFromPack(entry);
}
