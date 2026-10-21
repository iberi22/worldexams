/**
 * Sitemap de las páginas públicas de preguntas, por host.
 *
 * `@astrojs/sitemap` solo incluye rutas prerenderizadas; las páginas de bundle
 * se renderizan en el Worker, así que se listan aquí desde el índice embebido.
 * Cada host sirve solo sus URLs canónicas (ver lib/preguntas/canonical.ts):
 * saberparatodos.space → exámenes en español; worldexam.swal.network → el resto.
 */
import type { APIRoute } from 'astro';
import { bundleUrl, getAllBundles } from '../../lib/preguntas/bundle-fetcher';
import { hostForRequest } from '../../lib/preguntas/canonical';
import { buildPreguntasSitemap } from '../../lib/preguntas/sitemap';

export const GET: APIRoute = async ({ url }) => {
  const entries = await getAllBundles();
  const xml = buildPreguntasSitemap(hostForRequest(url), entries, bundleUrl);
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
};
