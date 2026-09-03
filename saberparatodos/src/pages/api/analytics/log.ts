/**
 * saberparatodos/src/pages/api/analytics/log.ts
 * T9 — analytics log endpoint (ingest usage from middleware).
 *
 * POST /api/analytics/log
 * Body: { key_id, endpoint, status, duration_ms }
 * Records to api_usage table for later aggregation by /api/analytics/usage.
 */
import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { key_id, endpoint, status, duration_ms } = body || {};

    if (!key_id || !endpoint || typeof status !== 'number') {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: key_id, endpoint, status' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!supabase) {
      console.warn('[analytics] no Supabase client; record dropped', { key_id, endpoint, status });
      return new Response(JSON.stringify({ ok: true, persisted: false }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Cast to any because api_usage table isn't in database.types.ts yet
    const { error } = await (supabase as any).from('api_usage').insert({
      key_id,
      endpoint,
      status,
      duration_ms: duration_ms || 0,
      ts: Date.now(),
    });

    if (error) {
      return new Response(
        JSON.stringify({ error: `Insert failed: ${error.message}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ ok: true, persisted: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Internal: ${(err as Error).message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
