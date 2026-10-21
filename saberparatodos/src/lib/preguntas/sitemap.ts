import type { BundleEntry } from './bundle-fetcher';
import { SPANISH_HOST, bundleLanguage, canonicalHostFor, countryLanguage } from './canonical';

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** URLs canónicas de /preguntas/: índice, listados por país/grado/materia y cada bundle. */
export function preguntasCanonicalUrls(
  entries: BundleEntry[],
  bundleUrl: (entry: BundleEntry) => string
): string[] {
  const urls = new Set<string>([`${SPANISH_HOST}/preguntas/`]);
  for (const e of entries) {
    const countryHost = canonicalHostFor(e.country, countryLanguage(e.country));
    const subjectHost = canonicalHostFor(e.country, bundleLanguage(e));
    urls.add(`${countryHost}/preguntas/${e.country}/`);
    urls.add(`${countryHost}/preguntas/${e.country}/${e.gradeSlug}/`);
    urls.add(`${subjectHost}/preguntas/${e.country}/${e.gradeSlug}/${e.subject}/`);
  }
  for (const e of entries) urls.add(`${canonicalHostFor(e.country, bundleLanguage(e))}${bundleUrl(e)}`);
  return [...urls];
}

/**
 * `<urlset>` de un solo host: un sitemap no mezcla hosts, así que cada host
 * (español / internacional) publica solo sus propias URLs canónicas.
 */
export function buildPreguntasSitemap(
  host: string,
  entries: BundleEntry[],
  bundleUrl: (entry: BundleEntry) => string
): string {
  const prefix = `${host.replace(/\/+$/, '')}/`;
  const urls = preguntasCanonicalUrls(entries, bundleUrl)
    .filter((u) => u.startsWith(prefix))
    .map((u) => `  <url><loc>${escapeXml(u)}</loc></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}
