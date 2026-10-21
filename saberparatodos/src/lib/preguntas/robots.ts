/**
 * robots.txt por host. Las reglas son las mismas en ambos hosts; cada uno
 * anuncia solo sitemaps de su propio origen:
 *  - `/preguntas/sitemap.xml` (URLs canónicas de ese host, ver canonical.ts),
 *  - `/sitemap-index.xml` de @astrojs/sitemap solo en el host del `site` del
 *    build, porque ese índice lista URLs de ese host.
 */
export function buildRobotsTxt(host: string, buildSite?: string | URL | null): string {
  const origin = host.replace(/\/+$/, '');
  let siteOrigin = '';
  try {
    siteOrigin = buildSite ? new URL(String(buildSite)).origin : '';
  } catch {
    siteOrigin = '';
  }
  const lines = [
    '# WorldExams SEO robots.txt',
    'User-agent: *',
    'Allow: /',
    'Allow: /preguntas/',
    'Disallow: /tutor/',
    'Disallow: /institucion/',
    'Disallow: /instituciones/',
    'Disallow: /api/',
    '',
  ];
  if (siteOrigin === origin) lines.push(`Sitemap: ${origin}/sitemap-index.xml`);
  lines.push(`Sitemap: ${origin}/preguntas/sitemap.xml`);
  return `${lines.join('\n')}\n`;
}
