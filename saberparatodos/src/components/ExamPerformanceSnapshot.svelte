<script lang="ts">
  import type { ExamPerformanceSnapshot } from '../lib/local-intelligence';
  import type { IcfesBenchmarkConfig } from '../config/icfes-benchmarks';
  import { countryConfig as defaultCountryConfig, type CountryConfig as RuntimeCountryConfig } from '../config';
  import { getPracticeEstimateSemantics } from '../lib/practice-estimate';

  interface Props {
    snapshot: ExamPerformanceSnapshot | null;
    benchmark: IcfesBenchmarkConfig;
    runtimeCountry?: RuntimeCountryConfig;
  }

  let { snapshot, benchmark, runtimeCountry = defaultCountryConfig }: Props = $props();

  function formatSession(ts: number | null): string {
    if (!ts) return 'Sin historial reciente';
    return new Date(ts).toLocaleString('es-CO', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function formatDelta(delta: number | null): string {
    if (delta === null) return '--';
    return `${delta > 0 ? '+' : ''}${delta}`;
  }

  function getDeltaTone(delta: number | null): string {
    if (delta === null) return 'text-white/60';
    if (delta >= 0) return 'text-emerald-300';
    if (delta >= -20) return 'text-amber-300';
    return 'text-rose-300';
  }

  const scoreSemantics = getPracticeEstimateSemantics(runtimeCountry);
</script>

{#if snapshot?.hasHistory}
  <div class="space-y-3" data-testid="exam-performance-snapshot">
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
        <div class="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">Ultima sesion</div>
        <div class="mt-1 text-sm font-semibold text-white">{formatSession(snapshot.latestSessionAt)}</div>
        <div class="mt-1 text-xs text-white/55">{snapshot.latestSubject || 'Simulacro general'}</div>
      </div>

      <div class="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
        <div class="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">Ultimo puntaje</div>
        <div class="mt-1 text-2xl font-black tracking-tight text-white">{snapshot.latestScore ?? '--'}</div>
        <div class="mt-1 text-xs text-white/55">{snapshot.rankTitle || 'Perfil local activo'}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div class="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.08] px-4 py-3">
        <div class="flex items-baseline justify-between gap-3">
          <div>
            <div class="text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-200/70">{benchmark.label}</div>
            <div class="mt-1 text-2xl font-black tracking-tight text-white">
              {snapshot.icfesEstimate?.score ?? '--'}<span class="ml-1 text-sm text-white/45">{scoreSemantics.rangeSuffix}</span>
            </div>
          </div>
          <div class={`text-sm font-bold ${getDeltaTone(snapshot.benchmarkDelta)}`}>
            {formatDelta(snapshot.benchmarkDelta)}
          </div>
        </div>
        <div class="mt-1 text-xs text-white/60">
          {snapshot.icfesEstimate?.label || 'Resultado provisional'} · {scoreSemantics.benchmarkSummary} {benchmark.benchmarkScore}{scoreSemantics.rangeSuffix}
        </div>
        <div class="mt-1 text-[10px] text-amber-200/60">
          {snapshot.icfesEstimate?.disclaimer || scoreSemantics.disclaimer}
        </div>
      </div>

      <div class="rounded-2xl border border-amber-400/20 bg-amber-400/[0.08] px-4 py-3">
        <div class="flex items-baseline justify-between gap-3">
          <div>
            <div class="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-100/70">Meta actual</div>
            <div class="mt-1 text-2xl font-black tracking-tight text-white">
              {snapshot.goalScore}<span class="ml-1 text-sm text-white/45">{scoreSemantics.rangeSuffix}</span>
            </div>
          </div>
          <div class={`text-sm font-bold ${getDeltaTone(snapshot.goalDelta)}`}>
            {formatDelta(snapshot.goalDelta)}
          </div>
        </div>
        <div class="mt-1 text-xs text-white/60">Distancia desde tu estimado local</div>
      </div>
    </div>
  </div>
{:else}
  <div class="rounded-[1.75rem] border border-dashed border-white/15 bg-white/[0.03] px-5 py-6 text-left" data-testid="exam-performance-empty">
    <div class="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">Primer arranque</div>
    <div class="mt-2 text-lg font-bold tracking-tight text-white">Todavia no hay historial local.</div>
    <p class="mt-2 max-w-md text-sm leading-relaxed text-white/60">
      Este examen arrancara igual. Cuando termines tus primeras sesiones, aqui veras {scoreSemantics.emptyHistorySummary}.
    </p>
  </div>
{/if}
