<script lang="ts">
  import BarTable from './BarTable.svelte';
  import TrendChart from './TrendChart.svelte';
  import {
    STATS_PERIODS,
    countryLabel,
    deviceLabel,
    fetchTrafficStats,
    flagEmoji,
    formatNumber,
    type StatsPeriod,
    type TrafficResult,
  } from '../../lib/stats/traffic-client';

  let period = $state<StatsPeriod>(30);
  let result = $state<TrafficResult | null>(null);
  let loading = $state(true);
  let requestId = 0;

  async function load(days: StatsPeriod) {
    const id = ++requestId;
    loading = true;
    const res = await fetchTrafficStats(days);
    if (id !== requestId) return; // a newer period was selected meanwhile
    result = res;
    loading = false;
  }

  $effect(() => {
    load(period);
  });

  const data = $derived(result?.status === 'ok' ? result.data : null);

  const countryRows = $derived(
    (data?.byCountry ?? []).map((c) => ({
      key: c.country,
      label: countryLabel(c),
      prefix: flagEmoji(c.iso2),
      value: c.pageLoads,
      pct: c.pct,
    })),
  );
  const pathRows = $derived((data?.topPaths ?? []).map((p) => ({ key: p.path, label: p.path, value: p.pageLoads })));
  const deviceRows = $derived(
    (data?.byDevice ?? []).map((d) => ({ key: d.device, label: deviceLabel(d.device), value: d.pageLoads, pct: d.pct })),
  );
  const referrerRows = $derived((data?.topReferrers ?? []).map((r) => ({ key: r.host, label: r.host, value: r.pageLoads })));
  const countriesCount = $derived((data?.byCountry ?? []).filter((c) => c.iso2).length);

  const updated = $derived(
    data
      ? new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(data.generatedAt))
      : '',
  );
</script>

<div class="max-w-5xl mx-auto px-4 pb-12" data-testid="traffic-dashboard">
  <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
    <div role="radiogroup" aria-label="Periodo" class="inline-flex rounded-full bg-white/5 border border-white/10 p-1">
      {#each STATS_PERIODS as p (p)}
        <button
          type="button"
          role="radio"
          aria-checked={period === p}
          class="px-4 py-1.5 text-sm rounded-full transition-colors {period === p
            ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/40'
            : 'text-white/60 hover:text-white border border-transparent'}"
          onclick={() => (period = p)}
        >
          {p} días
        </button>
      {/each}
    </div>
    {#if updated}
      <p class="text-xs text-white/40">Actualizado: {updated} · se renueva cada hora</p>
    {/if}
  </div>

  {#if loading && !result}
    <div class="grid gap-4 sm:grid-cols-3" aria-busy="true" aria-label="Cargando estadísticas">
      {#each [0, 1, 2] as i (i)}
        <div class="stats-card h-28 animate-pulse"></div>
      {/each}
    </div>
  {:else if result?.status === 'not_configured'}
    <div class="stats-card text-center py-10" role="status">
      <p class="text-lg font-semibold text-white/90">Estadísticas aún no configuradas</p>
      <p class="text-sm text-white/50 mt-2">Pronto publicaremos aquí el tráfico del sitio. Vuelve más tarde.</p>
    </div>
  {:else if result?.status === 'error'}
    <div class="stats-card text-center py-10" role="alert">
      <p class="text-lg font-semibold text-white/90">No se pudieron cargar las estadísticas</p>
      <button type="button" class="mt-4 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-sm" onclick={() => load(period)}>
        Reintentar
      </button>
    </div>
  {:else if data}
    <div class="space-y-4 transition-opacity {loading ? 'opacity-60' : ''}" aria-busy={loading}>
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="stats-card">
          <p class="text-xs uppercase tracking-wide text-white/50">Visitas reales</p>
          <p class="text-4xl font-bold text-[#F5F5DC] tabular-nums mt-1">{formatNumber(data.totals.visits)}</p>
          <p class="text-xs text-white/40 mt-1">Sesiones de navegadores en {data.days} días</p>
        </div>
        <div class="stats-card">
          <p class="text-xs uppercase tracking-wide text-white/50">Páginas vistas</p>
          <p class="text-4xl font-bold text-[#F5F5DC] tabular-nums mt-1">{formatNumber(data.totals.pageLoads)}</p>
          <p class="text-xs text-white/40 mt-1">Cargas de página de navegadores reales</p>
        </div>
        <div class="stats-card">
          <p class="text-xs uppercase tracking-wide text-white/50">Países</p>
          <p class="text-4xl font-bold text-[#F5F5DC] tabular-nums mt-1">{formatNumber(countriesCount)}</p>
          <p class="text-xs text-white/40 mt-1">Con al menos una visita</p>
        </div>
      </div>

      <TrendChart days={data.byDay} />

      <BarTable caption="Países" labelHeader="País" rows={countryRows} />

      <div class="grid gap-4 md:grid-cols-2">
        <BarTable caption="Páginas más vistas" labelHeader="Página" rows={pathRows} />
        <div class="space-y-4">
          <BarTable caption="Dispositivos" labelHeader="Dispositivo" rows={deviceRows} />
          <BarTable
            caption="Sitios de referencia"
            labelHeader="Sitio"
            rows={referrerRows}
            emptyText="Sin referencias externas: las visitas llegaron directamente o desde buscadores sin referencia."
          />
        </div>
      </div>
    </div>
  {/if}

  <p class="text-xs text-white/40 leading-relaxed" style="margin-top: 2rem">
    Datos de Cloudflare Web Analytics; solo navegadores reales, muestreados; sin cookies ni datos personales.
    Solo se publican agregados (por país, día, página, dispositivo y sitio de referencia). Las cifras de solicitudes
    del servidor, que incluyen bots, no se usan aquí.
  </p>
</div>

<style>
  :global(.stats-card) {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 1.25rem;
  }
  :global(.stats-card-title) {
    font-size: 0.95rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 0.75rem;
  }
</style>
