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

  // 1. In local development or node runtime, check local disk first for ultra-fast zero-latency offline response
  try {
    const sanitizedSlug = path.basename(slug);
    const candidatePaths = [
      path.resolve(process.cwd(), 'public/api/packs', sanitizedSlug),
      path.resolve(process.cwd(), 'public/packs', sanitizedSlug),
      path.resolve(process.cwd(), '../apps/worldexams-api/public/v1/packs', sanitizedSlug),
      path.resolve(process.cwd(), '../../apps/worldexams-api/public/v1/packs', sanitizedSlug),
      path.resolve(process.cwd(), 'apps/worldexams-api/public/v1/packs', sanitizedSlug),
    ];

    for (const candidate of candidatePaths) {
      if (fs.existsSync(candidate)) {
        const fileContent = fs.readFileSync(candidate, 'utf-8');
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
  } catch {
    // If filesystem is not available (e.g. strict edge workers), continue to upstream fetch
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
    return new Response(JSON.stringify({ error: 'Failed to fetch upstream pack.', details: String(error) }), {
      status: 502,
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
