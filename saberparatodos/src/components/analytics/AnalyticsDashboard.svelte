<script lang="ts">
  /**
   * AnalyticsDashboard.svelte — T9 feat-premium-api 85→95% analytics dashboard.
   * Renders real usage metrics (no synthetic data) for premium API.
   */
  import { onMount } from 'svelte';

  interface Props {
    apiKey: string;
    days: number;
  }
  let { apiKey, days }: Props = $props();

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

  let summary = $state<AnalyticsSummary | null>(null);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let liveUpdating = $state(false);

  async function loadSummary() {
    try {
      const res = await fetch(`/api/analytics/usage?key=${encodeURIComponent(apiKey)}&days=${days}`);
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(errBody.error || `HTTP ${res.status}`);
      }
      summary = await res.json();
      error = null;
    } catch (e) {
      error = (e as Error).message;
    } finally {
      loading = false;
    }
  }

  function formatNumber(n: number): string {
    return n.toLocaleString('es-CO');
  }

  function successRate(s: AnalyticsSummary): number {
    return s.total_requests > 0 ? (s.successful_requests / s.total_requests) * 100 : 0;
  }

  function errorRate(s: AnalyticsSummary): number {
    return s.total_requests > 0 ? (s.error_requests / s.total_requests) * 100 : 0;
  }

  function quotaUsedPct(s: AnalyticsSummary): number {
    return s.quota_limit > 0 ? ((s.quota_limit - s.quota_remaining) / s.quota_limit) * 100 : 0;
  }

  function hourlyMax(s: AnalyticsSummary): number {
    return Math.max(...s.hourly_distribution, 1);
  }

  onMount(async () => {
    await loadSummary();
    // Live updates every 30s
    const interval = setInterval(async () => {
      liveUpdating = true;
      await loadSummary();
      liveUpdating = false;
    }, 30000);
    return () => clearInterval(interval);
  });
</script>

{#if loading}
  <div class="text-center py-12">
    <div class="inline-block animate-pulse text-amber-300">Cargando analytics...</div>
  </div>
{:else if error}
  <div class="bg-rose-900/30 border border-rose-700 rounded-xl p-4 text-rose-200">
    <strong>Error:</strong> {error}
  </div>
{:else if summary}
  <div class="space-y-6">
    <!-- KPI cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div class="text-xs uppercase tracking-wider text-slate-500">Total Requests</div>
        <div class="text-3xl font-extrabold text-amber-300 mt-2">{formatNumber(summary.total_requests)}</div>
        <div class="text-xs text-slate-400 mt-1">last {summary.period_days} days</div>
      </div>
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div class="text-xs uppercase tracking-wider text-slate-500">Success Rate</div>
        <div class="text-3xl font-extrabold text-emerald-300 mt-2">{successRate(summary).toFixed(1)}%</div>
        <div class="text-xs text-slate-400 mt-1">{formatNumber(summary.successful_requests)} OK</div>
      </div>
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div class="text-xs uppercase tracking-wider text-slate-500">Error Rate</div>
        <div class="text-3xl font-extrabold text-rose-300 mt-2">{errorRate(summary).toFixed(1)}%</div>
        <div class="text-xs text-slate-400 mt-1">{formatNumber(summary.error_requests)} 5xx</div>
      </div>
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div class="text-xs uppercase tracking-wider text-slate-500">Rate Limited</div>
        <div class="text-3xl font-extrabold text-amber-300 mt-2">{formatNumber(summary.rate_limited_requests)}</div>
        <div class="text-xs text-slate-400 mt-1">429s</div>
      </div>
    </div>

    <!-- Latency -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div class="text-xs uppercase tracking-wider text-slate-500">Avg Latency</div>
        <div class="text-2xl font-bold text-cyan-300 mt-2">{summary.avg_duration_ms} ms</div>
      </div>
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div class="text-xs uppercase tracking-wider text-slate-500">P95 Latency</div>
        <div class="text-2xl font-bold text-cyan-300 mt-2">{summary.p95_duration_ms} ms</div>
      </div>
    </div>

    <!-- Quota -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs uppercase tracking-wider text-slate-500">Quota Usage</span>
        <span class="text-sm font-mono text-slate-300">
          {formatNumber(summary.quota_limit - summary.quota_remaining)} / {formatNumber(summary.quota_limit)}
        </span>
      </div>
      <div class="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
        <div
          class="h-3 rounded-full transition-all"
          class:bg-emerald-400={quotaUsedPct(summary) < 60}
          class:bg-amber-400={quotaUsedPct(summary) >= 60 && quotaUsedPct(summary) < 85}
          class:bg-rose-500={quotaUsedPct(summary) >= 85}
          style:width="{quotaUsedPct(summary)}%"
        ></div>
      </div>
      <div class="text-xs text-slate-400 mt-1.5">
        {summary.quota_remaining.toLocaleString('es-CO')} requests remaining
      </div>
    </div>

    <!-- Hourly distribution -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <h2 class="text-sm font-bold mb-3 text-slate-300">Hourly distribution (UTC)</h2>
      <div class="flex items-end gap-0.5 h-24">
        {#each summary.hourly_distribution as count, h}
          <div
            class="flex-1 bg-amber-500/70 hover:bg-amber-400 transition-colors rounded-t"
            title="{h}:00 — {count} requests"
            style:height="{(count / hourlyMax(summary)) * 100}%"
          ></div>
        {/each}
      </div>
      <div class="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
        <span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>23h</span>
      </div>
    </div>

    <!-- Top endpoints -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <h2 class="text-sm font-bold mb-3 text-slate-300">Top Endpoints</h2>
      <div class="space-y-1.5">
        {#each summary.top_endpoints as ep}
          <div class="flex items-center gap-3 text-sm">
            <code class="text-amber-300 font-mono text-xs flex-1 truncate">{ep.endpoint}</code>
            <div class="w-32 bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                class="h-1.5 bg-amber-400 rounded-full"
                style:width="{(ep.count / summary.top_endpoints[0]?.count || 1) * 100}%"
              ></div>
            </div>
            <span class="text-slate-300 font-mono text-xs w-12 text-right">{formatNumber(ep.count)}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Status footer -->
    <div class="text-center text-xs text-slate-500 mt-4">
      {#if liveUpdating}
        <span class="text-amber-300">⟳ live updating...</span>
      {:else}
        Auto-refresh every 30s · data reset at {new Date(summary.reset_at).toLocaleString('es-CO')}
      {/if}
    </div>
  </div>
{/if}
