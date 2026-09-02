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

function parseFrontmatterField(block: string, key: string): string {
  const m = block.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?\\s*$`, 'm'));
  return m ? m[1].trim() : '';
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
    const entries: BundleEntry[] = [];
    const countryDirs = await fs.readdir(root);
    for (const countryDir of countryDirs) {
      const cdir = nodePath.join(root, countryDir);
      if (!(await fs.stat(cdir)).isDirectory()) continue;
      const subjects = await fs.readdir(cdir);
      for (const subject of subjects) {
        const sdir = nodePath.join(cdir, subject);
        if (!(await fs.stat(sdir)).isDirectory()) continue;
        const gradeDirs = await fs.readdir(sdir);
        for (const gradeDir of gradeDirs) {
          const weekly = nodePath.join(sdir, gradeDir, '2026', 'weekly');
          let files: string[] = [];
          try {
            files = await fs.readdir(weekly);
          } catch {
            continue;
          }
          for (const f of files) {
            if (!f.endsWith('-bundle.md')) continue;
            const txt = await fs.readFile(nodePath.join(weekly, f), 'utf8');
            const fm = txt.match(/^---\n([\s\S]*?)\n---/);
            if (!fm) continue;
            const id = parseFrontmatterField(fm[1], 'id') || f.replace(/\.md$/, '');
            const gradeMatch = gradeDir.match(/^grado-(\d+)$/);
            entries.push({
              id,
              countryDir,
              country: countryDir.replace(/_/g, '-'),
              code: id.split('-')[0].toUpperCase(),
              subject,
              grade: gradeMatch ? Number(gradeMatch[1]) : null,
              gradeSlug: gradeDir,
              week: parseFrontmatterField(fm[1], 'week'),
              tema: parseFrontmatterField(fm[1], 'tema'),
              total: Number(parseFrontmatterField(fm[1], 'total_questions') || 0),
              alignment: parseFrontmatterField(fm[1], 'alignment'),
            });
          }
        }
      }
    }
    if (entries.length >= bakedIndex.bundles.length) {
      return entries.sort((a, b) => a.id.localeCompare(b.id));
    }
    return null;
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

function parseMarkdownQuestions(md: string): BundleQuestion[] {
  const questions: BundleQuestion[] = [];
  const blocks = md.split(/^## Question /m).slice(1);
  for (const block of blocks) {
    const header = block.split('\n', 1)[0];
    const number = Number(header.match(/^(\d+)/)?.[1] ?? 0);
    const difficulty = header.match(/\[(D[^\]]+)\]/)?.[1] ?? '';
    const id = block.match(/\*\*ID:\*\*\s*(\S+)/)?.[1] ?? `q-${number}`;
    const bloom = block.match(/\*\*Bloom:\*\*\s*([^\n]+)/)?.[1].trim() ?? '';
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
    const explanation = block.match(/### Explicacion Pedagogica\n([\s\S]*?)(?=\n## |\n---|$)/)?.[1].trim() ?? '';
    questions.push({ id, number, difficulty, bloom, statement, options, explanation });
  }
  return questions;
}

export function packIdForBundle(entry: BundleEntry): string {
  const weekNum = Number(entry.week.replace(/^W/i, '')) || 1;
  const grade = entry.grade ?? '3em';
  return `${entry.code.toLowerCase()}-week-${weekNum}-grade-${grade}-subject-${entry.subject}`;
}

interface ApiPackQuestion {
  id: string;
  statement: string;
  options: { letter: string; text: string; is_correct: boolean; feedback?: string }[];
  explanation?: string;
}

async function questionsFromPack(entry: BundleEntry): Promise<BundleQuestion[] | null> {
  const envUrl =
    typeof import.meta !== 'undefined' ? (import.meta.env?.PUBLIC_API_BASE_URL as string | undefined) : undefined;
  const apiBase = envUrl || '/api';
  try {
    const res = await fetch(`${apiBase}/v1/packs/${packIdForBundle(entry)}.json`);
    if (!res.ok) return null;
    const json = (await res.json()) as { questions?: ApiPackQuestion[] };
    if (!Array.isArray(json.questions)) return null;
    return json.questions.map((q, i) => ({
      id: q.id,
      number: i + 1,
      difficulty: '',
      bloom: '',
      statement: q.statement ?? '',
      options: (q.options ?? []).map((o) => ({
        letter: o.letter,
        text: o.text,
        correct: Boolean(o.is_correct),
        feedback: o.feedback ?? '',
      })),
      explanation: q.explanation ?? '',
    }));
  } catch {
    return null;
  }
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
