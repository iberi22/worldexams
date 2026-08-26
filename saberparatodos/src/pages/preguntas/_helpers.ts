// Helper for hierarchical /preguntas routes — discovery via import.meta.glob
// Island-only logic, no external dependencies.

export interface BundleInfo {
  country: string; // slug lower, normalized hyphen
  countryRaw: string; // raw folder
  subject: string; // slug lower
  subjectRaw: string;
  grade: number;
  week: string; // W01
  tema: string;
  id: string;
  filePath: string;
  total_questions: number;
  difficulty_band?: string;
  alignment?: string;
  title?: string;
}

// Glob all bundles raw
const rawBundles = import.meta.glob('../../../../questions_data/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Fallback if glob empty (should not happen in build)
export const LANG_MAP: Record<string, string> = {
  colombia: 'es-CO',
  mexico: 'es-MX',
  brasil: 'pt-BR',
  argentina: 'es-AR',
  chile: 'es-CL',
  peru: 'es-PE',
  ecuador: 'es-EC',
  panama: 'es-PA',
  costarica: 'es-CR',
  'costa-rica': 'es-CR',
  guatemala: 'es-GT',
  'dominican_republic': 'es-DO',
  'dominican-republic': 'es-DO',
  'republica-dominicana': 'es-DO',
  'el-salvador': 'es-SV',
  elsalvador: 'es-SV',
  honduras: 'es-HN',
  nicaragua: 'es-NI',
  spain: 'es-ES',
  españa: 'es-ES',
  'puerto-rico': 'es-PR',
  'guinea-ecuatorial': 'es-GQ',
  uruguay: 'es-UY',
  paraguay: 'es-PY',
  bolivia: 'es-BO',
};

export const COUNTRY_DISPLAY: Record<string, { name: string; flag: string; lang: string }> = {
  colombia: { name: 'Colombia', flag: '🇨🇴', lang: 'es-CO' },
  mexico: { name: 'México', flag: '🇲🇽', lang: 'es-MX' },
  brasil: { name: 'Brasil', flag: '🇧🇷', lang: 'pt-BR' },
  argentina: { name: 'Argentina', flag: '🇦🇷', lang: 'es-AR' },
  chile: { name: 'Chile', flag: '🇨🇱', lang: 'es-CL' },
  peru: { name: 'Perú', flag: '🇵🇪', lang: 'es-PE' },
  ecuador: { name: 'Ecuador', flag: '🇪🇨', lang: 'es-EC' },
  panama: { name: 'Panamá', flag: '🇵🇦', lang: 'es-PA' },
  costarica: { name: 'Costa Rica', flag: '🇨🇷', lang: 'es-CR' },
  'costa-rica': { name: 'Costa Rica', flag: '🇨🇷', lang: 'es-CR' },
  guatemala: { name: 'Guatemala', flag: '🇬🇹', lang: 'es-GT' },
  dominican_republic: { name: 'República Dominicana', flag: '🇩🇴', lang: 'es-DO' },
  'dominican-republic': { name: 'República Dominicana', flag: '🇩🇴', lang: 'es-DO' },
  'el-salvador': { name: 'El Salvador', flag: '🇸🇻', lang: 'es-SV' },
  elsalvador: { name: 'El Salvador', flag: '🇸🇻', lang: 'es-SV' },
  honduras: { name: 'Honduras', flag: '🇭🇳', lang: 'es-HN' },
  nicaragua: { name: 'Nicaragua', flag: '🇳🇮', lang: 'es-NI' },
  spain: { name: 'España', flag: '🇪🇸', lang: 'es-ES' },
  'puerto-rico': { name: 'Puerto Rico', flag: '🇵🇷', lang: 'es-PR' },
  'guinea-ecuatorial': { name: 'Guinea Ecuatorial', flag: '🇬🇶', lang: 'es-GQ' },
  uruguay: { name: 'Uruguay', flag: '🇺🇾', lang: 'es-UY' },
  paraguay: { name: 'Paraguay', flag: '🇵🇾', lang: 'es-PY' },
  bolivia: { name: 'Bolivia', flag: '🇧🇴', lang: 'es-BO' },
};

function normalizeCountrySlug(raw: string): string {
  const lower = raw.toLowerCase().trim();
  // merge aliases
  if (lower === 'elsalvador') return 'el-salvador';
  if (lower === 'costarica') return 'costarica'; // keep but map
  if (lower === 'dominican_republic') return 'dominican_republic';
  return lower.replace(/_/g, '-');
}

function parseFrontmatter(raw: string): Record<string, string> {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    if (k) data[k] = v;
  }
  // handle calibration difficulty_band inline object like {difficulty_band: "D3-D4", ...}
  const calibMatch = m[1].match(/calibration:\s*\{[^}]*difficulty_band:\s*["']([^"']+)["']/);
  if (calibMatch) data['difficulty_band'] = calibMatch[1];
  return data;
}

let cachedBundles: BundleInfo[] | null = null;

export function getAllBundles(): BundleInfo[] {
  if (cachedBundles) return cachedBundles;
  const out: BundleInfo[] = [];
  for (const [filePath, raw] of Object.entries(rawBundles)) {
    // filter legacy/test noise? keep only weekly valid? but include all .md under questions_data
    if (!filePath.includes('questions_data/')) continue;
    const fm = parseFrontmatter(raw as string);
    const parts = filePath.split('/questions_data/')[1]?.split('/') || [];
    if (parts.length < 2) continue;
    const countryRaw = parts[0];
    const subjectRaw = parts[1];
    const country = normalizeCountrySlug(countryRaw).toLowerCase();
    const subject = subjectRaw.toLowerCase();
    // only include files that look like bundle (contain -bundle.md or have id)
    if (!filePath.toLowerCase().endsWith('.md')) continue;
    // try to get week/tema from fm else from filename
    const filename = filePath.split('/').pop() || '';
    const week = (fm.week || fm.semana || filename.match(/W\d{2}/)?.[0] || 'W00').toUpperCase();
    const tema = (fm.tema || fm.topic || filename.match(/W\d{2}-(.+?)-001/)?.[1] || 'tema-general').toLowerCase();
    const grade = Number(fm.grado || fm.grade || parts.find(p => p.startsWith('grado-'))?.replace('grado-','')?.replace('3o-ano','12') || 11);
    const id = fm.id || filename.replace(/\.md$/,'');
    const total = Number(fm.total_questions || fm.bundle_size || 10);
    const difficulty_band = fm.difficulty_band || fm['calibration.difficulty_band'];
    out.push({
      country,
      countryRaw,
      subject,
      subjectRaw,
      grade,
      week,
      tema,
      id,
      filePath,
      total_questions: total,
      difficulty_band,
      alignment: fm.alignment,
      title: tema.replace(/-/g, ' '),
    });
  }
  // sort by country, subject, week numeric
  out.sort((a,b) => {
    if (a.country !== b.country) return a.country.localeCompare(b.country);
    if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
    const wa = Number(a.week.replace('W','')) || 0;
    const wb = Number(b.week.replace('W','')) || 0;
    if (wa !== wb) return wa - wb;
    return a.id.localeCompare(b.id);
  });
  cachedBundles = out;
  return out;
}

export function getCountries(): { slug: string; display: { name: string; flag: string; lang: string }; count: number }[] {
  const bundles = getAllBundles();
  const map = new Map<string, number>();
  for (const b of bundles) map.set(b.country, (map.get(b.country) || 0) + 1);
  const result: { slug: string; display: { name: string; flag: string; lang: string }; count: number }[] = [];
  for (const [slug, count] of map.entries()) {
    // prefer normalized display key
    const key = slug in COUNTRY_DISPLAY ? slug : slug.replace(/-/g, '');
    const display = COUNTRY_DISPLAY[slug] || COUNTRY_DISPLAY[key] || { name: slug.charAt(0).toUpperCase()+slug.slice(1), flag: '🌎', lang: LANG_MAP[slug] || 'es' };
    result.push({ slug, display, count });
  }
  // also ensure countries with zero bundles but in DISPLAY are not added unless they have content (per task, solo disponibles)
  result.sort((a,b) => a.display.name.localeCompare(b.display.name));
  return result;
}

export function getSubjectsForCountry(country: string): { slug: string; count: number; bundles: BundleInfo[] }[] {
  const norm = normalizeCountrySlug(country).toLowerCase();
  const bundles = getAllBundles().filter(b => b.country === norm);
  const map = new Map<string, { count: number; bundles: BundleInfo[] }>();
  for (const b of bundles) {
    const s = b.subject;
    if (!map.has(s)) map.set(s, { count: 0, bundles: [] });
    const entry = map.get(s)!;
    entry.count++;
    entry.bundles.push(b);
  }
  return Array.from(map.entries()).map(([slug, v]) => ({ slug, ...v })).sort((a,b)=> a.slug.localeCompare(b.slug));
}

export function getBundlesForCountrySubject(country: string, subject: string): BundleInfo[] {
  const c = normalizeCountrySlug(country).toLowerCase();
  const s = subject.toLowerCase();
  return getAllBundles().filter(b => b.country === c && b.subject === s);
}

export function getBundleByWeek(country: string, subject: string, week: string): BundleInfo | undefined {
  const c = normalizeCountrySlug(country).toLowerCase();
  const s = subject.toLowerCase();
  const w = week.toUpperCase();
  // week param may be like W01 or 01 or semana-1
  const normalizedWeek = w.startsWith('W') ? w : `W${w.padStart(2,'0')}`;
  return getAllBundles().find(b => b.country === c && b.subject === s && b.week.toUpperCase() === normalizedWeek);
}

export function getLangForCountry(country: string): string {
  const norm = normalizeCountrySlug(country).toLowerCase();
  return LANG_MAP[norm] || COUNTRY_DISPLAY[norm]?.lang || 'es';
}

export function getDisplayForCountry(country: string) {
  const norm = normalizeCountrySlug(country).toLowerCase();
  return COUNTRY_DISPLAY[norm] || { name: country.charAt(0).toUpperCase()+country.slice(1).replace(/-/g,' '), flag: '🌎', lang: getLangForCountry(norm) };
}

export function toTitleCase(str: string): string {
  return str.replace(/[-_]/g,' ').replace(/\b\w/g, c => c.toUpperCase());
}

export function canonicalFor(path: string, siteUrl?: string): string {
  const base = (siteUrl || 'https://saberparatodos.space').replace(/\/$/,'');
  const p = path.startsWith('/') ? path : `/${path}`;
  const withSlash = p.endsWith('/') ? p : `${p}/`;
  return `${base}${withSlash}`;
}
