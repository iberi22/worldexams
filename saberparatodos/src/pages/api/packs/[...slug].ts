import type { APIRoute } from 'astro';

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

  const upstreamUrl = new URL(`${getUpstreamBaseUrl()}/packs/${slug}`);
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
}

export const GET: APIRoute = async ({ params, request }) => proxyPack(request, params.slug);
export const HEAD: APIRoute = async ({ params, request }) => proxyPack(request, params.slug);
export const OPTIONS: APIRoute = async ({ params, request }) => proxyPack(request, params.slug);
