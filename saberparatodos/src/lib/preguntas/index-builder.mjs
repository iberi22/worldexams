/**
 * Índice de bundles weekly 2026 para las rutas públicas /preguntas/.
 *
 * Módulo JS puro (sin imports de Node) para que lo compartan:
 *  - `scripts/generate-preguntas-index.mjs` (genera `preguntas-index.json` en prebuild),
 *  - `bundle-fetcher.ts` (re-escaneo en dev/build, con `fs` inyectado).
 *
 * `packIdFor` replica la clave de pack de `scripts/generate-static-packs.js`
 * (país/asignatura/grado del frontmatter, no de la carpeta): el pack de
 * `ciencias-naturales` se llama `...-subject-ciencias_naturales`.
 */

/** Mismo mapa que generate-static-packs.js. */
const PACK_COUNTRY_CODES = {
  colombia: 'co',
  mexico: 'mx',
  peru: 'pe',
  chile: 'cl',
  ecuador: 'ec',
  argentina: 'ar',
  guatemala: 'gt',
  brasil: 'br',
  brazil: 'br',
  spain: 'es',
  espana: 'es',
  panama: 'pa',
  'guinea-ecuatorial': 'gq',
  nicaragua: 'ni',
  dominican_republic: 'do',
  'costa-rica': 'cr',
  costa_rica: 'cr',
  costarica: 'cr',
  honduras: 'hn',
  uruguay: 'uy',
  paraguay: 'py',
  'puerto-rico': 'pr',
  puerto_rico: 'pr',
  'el-salvador': 'sv',
  el_salvador: 'sv',
  elsalvador: 'sv',
  bolivia: 'bo',
  global: '',
};

/**
 * @param {string} block frontmatter sin delimitadores
 * @param {string} key
 * @returns {string}
 */
export function parseFrontmatterField(block, key) {
  const m = block.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+?)["']?\\s*$`, 'm'));
  return m ? m[1].trim() : '';
}

/**
 * Clave del pack estático que contiene el bundle (sin `.json`).
 * @param {{ country: string; subject: string; grado: string; week: string }} input
 *   valores crudos del frontmatter (con fallback a carpeta ya aplicado)
 * @returns {string}
 */
export function packIdFor({ country, subject, grado, week }) {
  const rawCountry = String(country || '').toLowerCase();
  const code = PACK_COUNTRY_CODES[rawCountry] !== undefined ? PACK_COUNTRY_CODES[rawCountry] : rawCountry;
  const rawGrade = String(grado || '11');
  const grade = rawGrade.toUpperCase() === '3EM' ? 11 : parseInt(rawGrade, 10);
  const weekMatch = String(week || '').match(/^W(\d+)$/i);
  const period = weekMatch ? Number(weekMatch[1]) : parseInt(String(week), 10) || 1;
  const fold = (/** @type {string} */ s) =>
    s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const clean = fold(String(subject || '')).replace(/[^a-z0-9]/g, '');
  const safeSubject =
    clean === 'ingles' || clean === 'english'
      ? 'ingles'
      : fold(String(subject || ''))
          .replace(/[/\s-]/g, '_')
          .replace(/[^a-z0-9_]/g, '');
  const prefix = code ? `${code}-` : '';
  return `${prefix}week-${period}-grade-${grade}-subject-${safeSubject}`;
}

/**
 * @typedef {object} IndexEntry
 * @property {string} id
 * @property {string} countryDir
 * @property {string} country
 * @property {string} code
 * @property {string} subject
 * @property {number | null} grade
 * @property {string} gradeSlug
 * @property {string} week
 * @property {string} tema
 * @property {number} total
 * @property {string} alignment
 * @property {string} packId
 */

/**
 * Entrada del índice a partir del markdown de un bundle, o null si no tiene frontmatter.
 * @param {{ countryDir: string; subjectDir: string; gradeDir: string; fileName: string; text: string }} input
 * @returns {IndexEntry | null}
 */
export function entryFromBundle({ countryDir, subjectDir, gradeDir, fileName, text }) {
  const fm = text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return null;
  const block = fm[1];
  const id = parseFrontmatterField(block, 'id') || fileName.replace(/\.md$/, '');
  const gradeMatch = gradeDir.match(/^grado-(\d+)$/);
  const week = parseFrontmatterField(block, 'week') || parseFrontmatterField(block, 'semana');
  return {
    id,
    countryDir,
    country: countryDir.replace(/_/g, '-'),
    code: id.split('-')[0].toUpperCase(),
    subject: subjectDir,
    grade: gradeMatch ? Number(gradeMatch[1]) : null,
    gradeSlug: gradeDir,
    week,
    tema: parseFrontmatterField(block, 'tema'),
    total: Number(parseFrontmatterField(block, 'total_questions') || 0),
    alignment: parseFrontmatterField(block, 'alignment'),
    packId: packIdFor({
      country: parseFrontmatterField(block, 'country') || countryDir,
      subject: parseFrontmatterField(block, 'asignatura') || parseFrontmatterField(block, 'subject') || subjectDir,
      grado: parseFrontmatterField(block, 'grado') || (gradeMatch ? gradeMatch[1] : '11'),
      week,
    }),
  };
}

/**
 * Recorre `questions_data/{country}/{subject}/{grade}/2026/weekly/*-bundle.md`.
 * `fs` es `node:fs/promises` y `path` es `node:path` (inyectados para no
 * arrastrar módulos de Node al bundle del Worker).
 * @param {string} root ruta absoluta de questions_data
 * @param {any} fs
 * @param {any} path
 * @returns {Promise<IndexEntry[]>} ordenado por id
 */
export async function scanQuestionsData(root, fs, path) {
  /** @type {IndexEntry[]} */
  const entries = [];
  const isDir = async (/** @type {string} */ p) => {
    try {
      return (await fs.stat(p)).isDirectory();
    } catch {
      return false;
    }
  };
  for (const countryDir of (await fs.readdir(root)).sort()) {
    const cdir = path.join(root, countryDir);
    if (!(await isDir(cdir))) continue;
    for (const subjectDir of (await fs.readdir(cdir)).sort()) {
      const sdir = path.join(cdir, subjectDir);
      if (!(await isDir(sdir))) continue;
      for (const gradeDir of (await fs.readdir(sdir)).sort()) {
        const weekly = path.join(sdir, gradeDir, '2026', 'weekly');
        /** @type {string[]} */
        let files = [];
        try {
          files = await fs.readdir(weekly);
        } catch {
          continue;
        }
        for (const fileName of files) {
          if (!fileName.endsWith('-bundle.md')) continue;
          const text = await fs.readFile(path.join(weekly, fileName), 'utf8');
          const entry = entryFromBundle({ countryDir, subjectDir, gradeDir, fileName, text });
          if (entry) entries.push(entry);
        }
      }
    }
  }
  return entries.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}
