/**
 * Sitemap de las páginas públicas de preguntas.
 *
 * `@astrojs/sitemap` solo incluye rutas prerenderizadas; las páginas de bundle
 * se renderizan en el Worker, así que se listan aquí desde el índice embebido.
 */
import type { APIRoute } from 'astro';
import { bundleUrl, getAllBundles } from '../../lib/preguntas/bundle-fetcher';
import { buildPreguntasSitemap } from '../../lib/preguntas/sitemap';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = String(import.meta.env.PUBLIC_SITE_URL || site || 'https://worldexam.swal.network');
  const entries = await getAllBundles();
  const xml = buildPreguntasSitemap(siteUrl, entries, bundleUrl);
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
};
