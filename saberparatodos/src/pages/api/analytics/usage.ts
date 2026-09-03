/**
 * saberparatodos/src/pages/api/analytics/usage.ts
 * T9 — feat-premium-api 85→95% wire analytics dashboard real.
 *
 * Real-time usage analytics endpoint para el dashboard de premium-api.
 * Devuelve métricas agregadas de uso por API key (último N días).
 *
 * GET /api/analytics/usage?key=KEY&days=30
 */
import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

interface UsageRecord {
  key_id: string;
  endpoint: string;
  status: number;
  duration_ms: number;
  ts: number;
}

interface AnalyticsSummary {
  key_id: string;
  period_days: number;
  total_requests: number;
  successful_requests: number;
  rate_limited_requests: number;
  error_requests: number;
  avg_duration_ms: number;
  p95_duration_ms: number;
  top_endpoints: Array<{ endpoint: string; count: number }>;
  hourly_distribution: number[];
  quota_remaining: number;
  quota_limit: number;
  reset_at: number;
}

export const GET: APIRoute = async ({ url }) => {
  const keyId = url.searchParams.get('key') || '';
  const days = Math.min(90, Math.max(1, parseInt(url.searchParams.get('days') || '30', 10)));

  if (!keyId) {
    return new Response(
      JSON.stringify({ error: 'Missing required query param: key' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    if (!supabase) {
      return new Response(
        JSON.stringify({ error: 'Analytics not configured (no Supabase client)' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const since = Date.now() - days * 24 * 60 * 60 * 1000;
    // Cast to any because api_usage table isn't in database.types.ts yet
    // (will be added after migration deploys)
    const query = (supabase as any)
      .from('api_usage')
      .select('endpoint,status,duration_ms,ts')
      .eq('key_id', keyId)
      .gte('ts', since)
      .order('ts', { ascending: true });

    const { data, error } = await query;

    if (error) {
      return new Response(
        JSON.stringify({ error: `Supabase query failed: ${error.message}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const records: UsageRecord[] = (data || []) as UsageRecord[];

    // Aggregate
    const total = records.length;
    const success = records.filter((r) => r.status >= 200 && r.status < 300).length;
    const rateLimited = records.filter((r) => r.status === 429).length;
    const errors = records.filter((r) => r.status >= 500).length;
    const durations = records.map((r) => r.duration_ms).filter((d) => d > 0).sort((a, b) => a - b);
    const avg = durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0;
    const p95 = durations.length > 0 ? durations[Math.floor(durations.length * 0.95)] || 0 : 0;

    // Top endpoints
    const endpointCounts = new Map<string, number>();
    for (const r of records) {
      endpointCounts.set(r.endpoint, (endpointCounts.get(r.endpoint) || 0) + 1);
    }
    const topEndpoints = Array.from(endpointCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([endpoint, count]) => ({ endpoint, count }));

    // Hourly distribution (24 buckets, UTC)
    const hourly = new Array(24).fill(0);
    for (const r of records) {
      const h = new Date(r.ts).getUTCHours();
      hourly[h]++;
    }

    // Quota (assuming 10000/day default; keyed by api_keys table if available)
    const quotaLimit = 10000;
    const quotaRemaining = Math.max(0, quotaLimit - total);

    const summary: AnalyticsSummary = {
      key_id: keyId,
      period_days: days,
      total_requests: total,
      successful_requests: success,
      rate_limited_requests: rateLimited,
      error_requests: errors,
      avg_duration_ms: avg,
      p95_duration_ms: p95,
      top_endpoints: topEndpoints,
      hourly_distribution: hourly,
      quota_remaining: quotaRemaining,
      quota_limit: quotaLimit,
      reset_at: since + days * 24 * 60 * 60 * 1000,
    };

    return new Response(JSON.stringify(summary), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Internal: ${(err as Error).message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
