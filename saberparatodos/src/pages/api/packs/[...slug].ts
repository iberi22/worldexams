import type { APIRoute } from 'astro';
import { getRuntimeEnvObject, type RuntimeLocals } from '../../../lib/server-runtime';

const PUBLIC_WORKER_BASE_URL = "https://api.saberparatodos.space";

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
  'Access-Control-Max-Age': '86400',
};

function getPublicWorkerBaseUrl(locals?: RuntimeLocals) {
  const runtimeEnv = getRuntimeEnvObject(locals);
  const configured = String(
    runtimeEnv.PUBLIC_API_BASE_URL ||
      import.meta.env.PUBLIC_API_BASE_URL ||
      "",
  ).trim();

  if (configured && configured !== "/api") {
    return configured.replace(/\/+$/, "").replace(/\/v1$/, "");
  }

  return PUBLIC_WORKER_BASE_URL;
}

async function proxyPack(request: Request, slug: string | undefined, locals?: RuntimeLocals) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }

  if (!slug || !/^[a-z0-9_-]+\.json$/.test(slug)) {
    return new Response(JSON.stringify({ error: 'Invalid pack path.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS
      },
    });
  }

  const upstreamBase = getPublicWorkerBaseUrl(locals);
  const upstreamUrl = `${upstreamBase}/v1/packs/${slug}`;

  return new Response(null, {
    status: 307,
    headers: {
      Location: upstreamUrl,
      'Cache-Control': 'public, max-age=300',
      ...CORS_HEADERS
    }
  });
}

export const GET: APIRoute = async ({ params, request, locals }) => proxyPack(request, params.slug, locals as RuntimeLocals);
export const HEAD: APIRoute = async ({ params, request, locals }) => proxyPack(request, params.slug, locals as RuntimeLocals);
export const OPTIONS: APIRoute = async ({ params, request, locals }) => proxyPack(request, params.slug, locals as RuntimeLocals);
