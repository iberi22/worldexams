/**
 * robots.txt dinámico: saberparatodos.space y worldexam.swal.network comparten
 * Worker, y cada host debe anunciar solo sus propios sitemaps.
 */
import type { APIRoute } from 'astro';
import { hostForRequest } from '../lib/preguntas/canonical';
import { buildRobotsTxt } from '../lib/preguntas/robots';

export const GET: APIRoute = ({ url, site }) =>
  new Response(buildRobotsTxt(hostForRequest(url), site), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
