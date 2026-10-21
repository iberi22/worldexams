import type { BundleEntry } from './bundle-fetcher';

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** `<urlset>` con /preguntas/, listados por país/grado/materia y cada bundle. */
export function buildPreguntasSitemap(
  siteUrl: string,
  entries: BundleEntry[],
  bundleUrl: (entry: BundleEntry) => string
): string {
  const base = siteUrl.replace(/\/+$/, '');
  const paths = new Set<string>(['/preguntas/']);
  for (const e of entries) {
    paths.add(`/preguntas/${e.country}/`);
    paths.add(`/preguntas/${e.country}/${e.gradeSlug}/`);
    paths.add(`/preguntas/${e.country}/${e.gradeSlug}/${e.subject}/`);
  }
  for (const e of entries) paths.add(bundleUrl(e));
  const urls = [...paths].map((p) => `  <url><loc>${escapeXml(`${base}${p}`)}</loc></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}
