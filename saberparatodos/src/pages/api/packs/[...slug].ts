import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_PUBLIC_API_BASE_URL = 'https://api.saberparatodos.space/v1';

function getUpstreamBaseUrl() {
  const configured = String(import.meta.env.PUBLIC_API_BASE_URL || '').trim().replace(/\/+$/, '');
  if (/^https?:\/\//i.test(configured)) return configured;
  return DEFAULT_PUBLIC_API_BASE_URL;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
  'Access-Control-Max-Age': '86400',
};

function copyResponseHeaders(source: Headers) {
  const headers = new Headers();
  const passthroughHeaders = ['content-type', 'cache-control', 'etag', 'last-modified'];

  for (const headerName of passthroughHeaders) {
    const value = source.get(headerName);
    if (value) headers.set(headerName, value);
  }

  // Inject CORS headers
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    headers.set(key, value);
  }

  return headers;
}

async function proxyPack(request: Request, slug: string | undefined) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Pack path is required.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS
      },
    });
  }

  // 1. In local development or node runtime, check local disk first with alias resolution
  try {
    const sanitizedSlug = path.basename(slug);
    const searchDirs = [
      path.resolve(process.cwd(), 'public/api/packs'),
      path.resolve(process.cwd(), 'public/packs'),
      path.resolve(process.cwd(), '../apps/worldexams-api/public/v1/packs'),
      path.resolve(process.cwd(), '../../apps/worldexams-api/public/v1/packs'),
      path.resolve(process.cwd(), 'apps/worldexams-api/public/v1/packs'),
    ];

    // Candidate file variations to search on disk
    const candidateFilenames: string[] = [sanitizedSlug];

    // If slug matches week pattern e.g. co-week-35-grade-11-subject-sociales.json
    const match = sanitizedSlug.match(/^(?:([a-z]{2})-)?week-(\d+)-grade-(\d+)(?:-subject-([a-z0-9_-]+))?\.json$/i);
    if (match) {
      const country = (match[1] || 'co').toLowerCase();
      const week = match[2];
      const grade = match[3];
      const subject = (match[4] || '').toLowerCase();

      const subjectAliases: string[] = [];
      if (subject) {
        if (subject.startsWith('social')) {
          subjectAliases.push('sociales_ciudadanas', 'sociales_y_ciudadanas', 'sociales', 'ciencias_sociales');
        } else if (subject.startsWith('lectura') || subject.startsWith('lengu')) {
          subjectAliases.push('lectura_critica', 'lectura-critica', 'lengua', 'lenguaje');
        } else if (subject.startsWith('mate')) {
          subjectAliases.push('matematicas', 'matematica');
        } else if (subject.startsWith('cien')) {
          subjectAliases.push('ciencias_naturales', 'ciencias');
        } else if (subject.startsWith('ing')) {
          subjectAliases.push('ingles', 'ing', 'english');
        } else {
          subjectAliases.push(subject);
        }
      }

      for (const subj of (subjectAliases.length ? subjectAliases : [''])) {
        const subjPart = subj ? `-subject-${subj}` : '';
        // Same week
        candidateFilenames.push(`${country}-week-${week}-grade-${grade}${subjPart}.json`);
        candidateFilenames.push(`week-${week}-grade-${grade}${subjPart}.json`);
        // Week 1 fallback
        candidateFilenames.push(`${country}-week-1-grade-${grade}${subjPart}.json`);
        candidateFilenames.push(`week-1-grade-${grade}${subjPart}.json`);
      }
    }

    for (const dir of searchDirs) {
      if (!fs.existsSync(dir)) continue;
      for (const fname of candidateFilenames) {
        const fullPath = path.join(dir, fname);
        if (fs.existsSync(fullPath)) {
          const fileContent = fs.readFileSync(fullPath, 'utf-8');
          return new Response(request.method === 'HEAD' ? null : fileContent, {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, max-age=86400',
              ...CORS_HEADERS,
            },
          });
        }
      }
    }
  } catch {
    // If filesystem is not available, continue to upstream fetch
  }

  // 2. Upstream fetch fallback
  const baseUrl = new URL(`${getUpstreamBaseUrl()}/packs/`);
  const upstreamUrl = new URL(`${getUpstreamBaseUrl()}/packs/${slug}`);

  // Prevent path traversal/SSRF out of the base directory
  if (!upstreamUrl.pathname.startsWith(baseUrl.pathname)) {
    return new Response(JSON.stringify({ error: 'Invalid pack path.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS
      },
    });
  }

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers: {
        Accept: request.headers.get('accept') || 'application/json',
      },
    });

    return new Response(request.method === 'HEAD' ? null : upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: copyResponseHeaders(upstreamResponse.headers),
    });
  } catch (error) {
    // Return 404 instead of 502 so client pack-fetcher tries next candidate without throwing Bad Gateway alert
    return new Response(JSON.stringify({ error: 'Pack not found.', details: String(error) }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    });
  }
}

export const GET: APIRoute = async ({ params, request }) => proxyPack(request, params.slug);
export const HEAD: APIRoute = async ({ params, request }) => proxyPack(request, params.slug);
export const OPTIONS: APIRoute = async ({ params, request }) => proxyPack(request, params.slug);
