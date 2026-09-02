<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import QuestionHeatmap from './QuestionHeatmap.svelte';
  import BundlePerformanceTable from './BundlePerformanceTable.svelte';
  import { t, normalizeLang, type I18nLang } from '../../lib/i18n';
  import {
    aggregateUsage,
    formatAccuracy,
    formatAvgTime,
    type UsageEvent,
    type UsageSummary,
  } from '../../lib/analytics/usage-aggregator';

  interface Props {
    lang?: string;
    events: UsageEvent[];
    windowDays?: number;
    /** demo: usar la fecha del último evento como "ahora" */
    anchorToLatestEvent?: boolean;
  }

  let {
    lang = 'es',
    events = [],
    windowDays = 30,
    anchorToLatestEvent = true,
  }: Props = $props();

  const L: I18nLang = $derived(normalizeLang(lang));

  const summary: UsageSummary = $derived.by(() => {
    let now: Date | undefined;
    if (anchorToLatestEvent && events.length) {
      const maxTs = Math.max(...events.map((e) => Date.parse(e.usedAt) || 0));
      if (Number.isFinite(maxTs) && maxTs > 0) now = new Date(maxTs);
    }
    return aggregateUsage(events, { windowDays, now });
  });

  const uniqueQuestions = $derived(new Set(summary.topUsed.map((q) => q.questionId)).size);

  let chartCanvas: HTMLCanvasElement | undefined = $state();
  let chart: { destroy: () => void } | null = null;
  let chartFailed = $state(false);

  async function renderChart(current: UsageSummary) {
    if (!chartCanvas || !current.hasData || current.topUsed.length === 0) return;
    try {
      const { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } = await import('chart.js');
      Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);
      chart?.destroy();
      chart = new Chart(chartCanvas, {
        type: 'bar',
        data: {
          labels: current.topUsed.map((q, i) => `P${i + 1}`),
          datasets: [
            {
              label: t('analytics.uses', L),
              data: current.topUsed.map((q) => q.uses),
              backgroundColor: 'rgba(16, 185, 129, 0.6)',
              borderColor: 'rgb(16, 185, 129)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                title: (items: { dataIndex: number }[]) =>
                  current.topUsed[items[0].dataIndex]?.questionId ?? '',
              },
            },
          },
          scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,0.1)' } },
            y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,0.1)' }, beginAtZero: true },
          },
        },
      });
    } catch {
      chartFailed = true;
    }
  }

  onMount(() => {
    void renderChart(summary);
  });

  onDestroy(() => {
    chart?.destroy();
    chart = null;
  });
</script>

<section class="space-y-10">
  {#if !summary.hasData}
    <div class="bg-slate-800/60 border border-slate-700 rounded-2xl p-10 text-center" role="status">
      <p class="text-lg font-bold text-slate-200">{t('analytics.noData', L)}</p>
      <p class="text-sm text-slate-400 mt-2">
        {summary.totalEvents} {t('analytics.uses', L).toLowerCase()} registrados en los últimos {summary.windowDays} días.
      </p>
    </div>
  {:else}
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-slate-800/60 border border-slate-700 rounded-2xl p-4">
        <p class="text-2xl font-extrabold text-emerald-300">{summary.totalEvents}</p>
        <p class="text-xs text-slate-400 mt-1">{t('analytics.uses', L)} ({summary.windowDays}d)</p>
      </div>
      <div class="bg-slate-800/60 border border-slate-700 rounded-2xl p-4">
        <p class="text-2xl font-extrabold text-emerald-300">{uniqueQuestions}</p>
        <p class="text-xs text-slate-400 mt-1">{t('analytics.questionsUsed', L)}</p>
      </div>
      <div class="bg-slate-800/60 border border-slate-700 rounded-2xl p-4">
        <p class="text-2xl font-extrabold text-emerald-300">{summary.bundles.length}</p>
        <p class="text-xs text-slate-400 mt-1">{t('analytics.bundlesTracked', L)}</p>
      </div>
      <div class="bg-slate-800/60 border border-slate-700 rounded-2xl p-4">
        <p class="text-2xl font-extrabold text-emerald-300">
          {formatAccuracy(summary.bundles.reduce((a, b) => a + b.accuracy * b.uses, 0) / Math.max(1, summary.totalEvents))}
        </p>
        <p class="text-xs text-slate-400 mt-1">{t('analytics.accuracy', L)}</p>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-white mb-4">{t('analytics.topUsed', L)}</h2>
      {#if !chartFailed}
        <div class="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 h-72">
          <canvas
            bind:this={chartCanvas}
            role="img"
            aria-label={t('analytics.aria.topUsedChart', L)}
          >
            {t('analytics.aria.topUsedChart', L)} — {t('analytics.bundleTable', L)} a continuación.
          </canvas>
        </div>
      {/if}
      <!-- Tabla alternativa accesible del gráfico -->
      <div class="overflow-x-auto mt-3 rounded-xl border border-slate-700/60">
        <table class="w-full text-xs">
          <caption class="sr-only">{t('analytics.topUsed', L)}</caption>
          <thead class="bg-slate-800/80 text-slate-400 uppercase">
            <tr>
              <th scope="col" class="px-3 py-2 text-left">#</th>
              <th scope="col" class="px-3 py-2 text-left">{t('analytics.bundle', L)}</th>
              <th scope="col" class="px-3 py-2 text-right">{t('analytics.uses', L)}</th>
              <th scope="col" class="px-3 py-2 text-right">{t('analytics.accuracy', L)}</th>
              <th scope="col" class="px-3 py-2 text-right">{t('analytics.avgTime', L)}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            {#each summary.topUsed as q, i (q.questionId)}
              <tr>
                <td class="px-3 py-2 text-slate-400">{i + 1}</td>
                <td class="px-3 py-2 font-mono text-emerald-300 break-all max-w-md">{q.questionId}</td>
                <td class="px-3 py-2 text-right font-bold">{q.uses}</td>
                <td class="px-3 py-2 text-right">{formatAccuracy(q.accuracy)}</td>
                <td class="px-3 py-2 text-right">{formatAvgTime(q.avgTimeMs)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-white mb-4">{t('analytics.topMissed', L)}</h2>
      {#if summary.topMissed.length === 0}
        <p class="text-sm text-slate-400">{t('analytics.noData', L)}</p>
      {:else}
        <ol class="space-y-2 list-none p-0 m-0">
          {#each summary.topMissed as q, i (q.questionId)}
            <li class="bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 flex items-center justify-between gap-4 text-sm">
              <span class="font-mono text-xs text-slate-300 break-all">{i + 1}. {q.questionId}</span>
              <span class="shrink-0 flex items-center gap-3">
                <span class="text-xs text-slate-400">{q.uses} {t('analytics.uses', L).toLowerCase()}</span>
                <span class="font-bold text-rose-400" class:text-emerald-400={q.accuracy >= 0.7}>
                  {formatAccuracy(q.accuracy)}
                </span>
              </span>
            </li>
          {/each}
        </ol>
      {/if}
    </div>

    <div>
      <h2 class="text-xl font-bold text-white mb-4">{t('analytics.heatmap', L)}</h2>
      <QuestionHeatmap cells={summary.heatmap} lang={lang} />
    </div>

    <div>
      <h2 class="text-xl font-bold text-white mb-4">{t('analytics.bundleTable', L)}</h2>
      <BundlePerformanceTable rows={summary.bundles} lang={lang} />
    </div>
  {/if}
</section>
