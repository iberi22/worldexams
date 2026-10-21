<script lang="ts">
  /** Daily page-load trend: SVG line (y from 0) with hover readout + table fallback. */
  import { formatDay, formatNumber, pointsToPath, sparklinePoints } from '../../lib/stats/traffic-client';

  let { days } = $props<{ days: Array<{ date: string; pageLoads: number }> }>();

  const W = 600;
  const H = 140;
  const points = $derived(sparklinePoints(days.map((d: { pageLoads: number }) => d.pageLoads), W, H, 8));
  const path = $derived(pointsToPath(points));
  const area = $derived(points.length ? `${path} L${points[points.length - 1].x} ${H - 8} L${points[0].x} ${H - 8} Z` : '');
  const max = $derived(Math.max(0, ...days.map((d: { pageLoads: number }) => d.pageLoads)));
  const total = $derived(days.reduce((s: number, d: { pageLoads: number }) => s + d.pageLoads, 0));

  let hover = $state<number | null>(null);

  function onMove(e: PointerEvent) {
    const svg = e.currentTarget as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    if (!rect.width || points.length === 0) return;
    const x = ((e.clientX - rect.left) / rect.width) * W;
    let best = 0;
    for (let i = 1; i < points.length; i++) {
      if (Math.abs(points[i].x - x) < Math.abs(points[best].x - x)) best = i;
    }
    hover = best;
  }
</script>

<section class="stats-card" aria-label="Tendencia diaria de páginas vistas">
  <div class="flex items-baseline justify-between gap-3">
    <h2 class="stats-card-title">Tendencia diaria</h2>
    <p class="text-xs text-white/60 tabular-nums" aria-live="polite">
      {#if hover !== null && days[hover]}
        {formatDay(days[hover].date)}: <strong class="text-white">{formatNumber(days[hover].pageLoads)}</strong> páginas vistas
      {:else}
        Máximo diario: {formatNumber(max)}
      {/if}
    </p>
  </div>

  {#if days.length === 0}
    <p class="text-sm text-white/50">Sin datos en este periodo.</p>
  {:else}
    <div class="relative mt-3">
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      class="block w-full h-36 touch-none"
      role="img"
      aria-label={`Páginas vistas por día: ${formatNumber(total)} en ${days.length} días, máximo ${formatNumber(max)} en un día.`}
      onpointermove={onMove}
      onpointerleave={() => (hover = null)}
    >
      <line x1="8" x2={W - 8} y1={H - 8} y2={H - 8} stroke="currentColor" class="text-white/15" stroke-width="1" />
      <path d={area} class="fill-emerald-400/10" />
      <path d={path} fill="none" class="stroke-emerald-400" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" />
      {#if hover !== null && points[hover]}
        <line x1={points[hover].x} x2={points[hover].x} y1="8" y2={H - 8} class="stroke-white/30" stroke-width="1" vector-effect="non-scaling-stroke" />
      {/if}
    </svg>
    {#if hover !== null && points[hover]}
      <!-- HTML dot: the SVG is stretched (preserveAspectRatio=none), a circle there would turn oval. -->
      <span
        aria-hidden="true"
        class="pointer-events-none absolute w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-emerald-300 ring-2 ring-[#1a1a1a]"
        style={`left: ${(points[hover].x / W) * 100}%; top: ${(points[hover].y / H) * 100}%`}
      ></span>
    {/if}
    </div>
    <div class="flex justify-between text-[11px] text-white/40 mt-1" aria-hidden="true">
      <span>{formatDay(days[0].date)}</span>
      <span>{formatDay(days[days.length - 1].date)}</span>
    </div>

    <details class="mt-3 text-sm">
      <summary class="cursor-pointer text-white/60 hover:text-white/90">Ver tabla por día</summary>
      <div class="max-h-64 overflow-y-auto mt-2">
        <table class="w-full text-left">
          <caption class="sr-only">Páginas vistas por día</caption>
          <thead>
            <tr class="text-white/50 text-xs">
              <th scope="col" class="py-1 font-medium">Día</th>
              <th scope="col" class="py-1 font-medium text-right">Páginas vistas</th>
            </tr>
          </thead>
          <tbody>
            {#each days as d (d.date)}
              <tr class="border-t border-white/5">
                <th scope="row" class="py-1 font-normal text-white/80"><time datetime={d.date}>{formatDay(d.date)}</time></th>
                <td class="py-1 text-right tabular-nums text-white/90">{formatNumber(d.pageLoads)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </details>
  {/if}
</section>
