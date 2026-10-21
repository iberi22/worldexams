<script lang="ts">
  /**
   * Ranked horizontal bar list rendered as a real <table>: the bar is decoration
   * inside the value cell, so screen readers get the table as-is.
   */
  import { formatNumber } from '../../lib/stats/traffic-client';

  interface Row {
    key: string;
    label: string;
    prefix?: string;
    value: number;
    pct?: number;
  }

  let { caption, rows, labelHeader, valueHeader = 'Páginas vistas', emptyText = 'Sin datos en este periodo.' } = $props<{
    caption: string;
    rows: Row[];
    labelHeader: string;
    valueHeader?: string;
    emptyText?: string;
  }>();

  const max = $derived(Math.max(1, ...rows.map((r: Row) => r.value)));
</script>

<section class="stats-card" aria-label={caption}>
  <h2 class="stats-card-title">{caption}</h2>
  {#if rows.length === 0}
    <p class="text-sm text-white/50">{emptyText}</p>
  {:else}
    <table class="w-full text-sm border-separate border-spacing-y-1.5">
      <caption class="sr-only">{caption}</caption>
      <thead class="sr-only">
        <tr>
          <th scope="col">{labelHeader}</th>
          <th scope="col">{valueHeader}</th>
          {#if rows.some((r: Row) => r.pct !== undefined)}<th scope="col">Porcentaje</th>{/if}
        </tr>
      </thead>
      <tbody>
        {#each rows as row (row.key)}
          <tr class="group" title={`${row.label}: ${formatNumber(row.value)}${row.pct !== undefined ? ` (${row.pct}%)` : ''}`}>
            <th scope="row" class="text-left font-normal text-white/80 pr-3 align-middle w-[45%] max-w-0">
              <span class="block truncate">
                {#if row.prefix}<span aria-hidden="true" class="mr-1.5">{row.prefix}</span>{/if}{row.label}
              </span>
            </th>
            <td class="align-middle">
              <div class="flex items-center gap-2">
                <div class="flex-1 h-2.5 rounded-full bg-white/5 overflow-hidden" aria-hidden="true">
                  <div
                    class="h-full rounded-full bg-emerald-400/80 group-hover:bg-emerald-300 transition-colors"
                    style={`width: ${Math.max(2, (row.value / max) * 100)}%`}
                  ></div>
                </div>
                <span class="tabular-nums text-white/90 min-w-[3ch] text-right">{formatNumber(row.value)}</span>
              </div>
            </td>
            {#if row.pct !== undefined}
              <td class="align-middle tabular-nums text-white/50 text-right pl-2 w-[4.5rem]">{row.pct}%</td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</section>
