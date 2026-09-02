<script lang="ts">
  import { t, normalizeLang, type I18nLang } from '../../lib/i18n';
  import { formatAccuracy, type HeatmapCell } from '../../lib/analytics/usage-aggregator';

  interface Props {
    lang?: string;
    cells: HeatmapCell[];
    /** códigos de país para las filas (defecto CO, MX, AR, BR) */
    countries?: string[];
    /** grados para las columnas (defecto 3-11) */
    grades?: number[];
  }

  let {
    lang = 'es',
    cells = [],
    countries = ['CO', 'MX', 'AR', 'BR'],
    grades = [3, 4, 5, 6, 7, 8, 9, 10, 11],
  }: Props = $props();

  const L: I18nLang = $derived(normalizeLang(lang));

  const COUNTRY_DIR: Record<string, string> = {
    CO: 'colombia',
    MX: 'mexico',
    AR: 'argentina',
    BR: 'brasil',
  };
  const COUNTRY_NAME: Record<string, string> = {
    CO: 'Colombia',
    MX: 'México',
    AR: 'Argentina',
    BR: 'Brasil',
  };

  const index = $derived(new Map(cells.map((c) => [`${c.country}/${c.grade}`, c])));
  const maxUses = $derived(Math.max(1, ...cells.map((c) => c.uses)));

  function intensity(cell: HeatmapCell | undefined): number {
    if (!cell) return 0;
    return Math.min(1, cell.uses / maxUses);
  }

  function cellStyle(cell: HeatmapCell | undefined): string {
    const i = intensity(cell);
    if (!cell) return 'background: rgba(30,41,59,0.5); color: rgb(100,116,139)';
    return `background: rgba(16, 185, 129, ${0.08 + i * 0.75}); color: ${i > 0.55 ? '#022c22' : '#d1fae5'}`;
  }
</script>

<div class="overflow-x-auto rounded-2xl border border-slate-700/70">
  <table class="w-full text-xs" aria-label={t('analytics.aria.heatmap', L)}>
    <caption class="sr-only">
      {t('analytics.heatmap', L)}. {t('analytics.drilldown', L)}.
    </caption>
    <thead>
      <tr class="bg-slate-800/80 text-slate-400">
        <th scope="col" class="px-3 py-2 text-left font-bold">{t('analytics.country', L)}</th>
        {#each grades as g (g)}
          <th scope="col" class="px-3 py-2 text-center font-bold">G{g}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each countries as code (code)}
        <tr class="border-t border-slate-800">
          <th scope="row" class="px-3 py-2 text-left font-semibold text-slate-200">
            {COUNTRY_NAME[code] ?? code} ({code})
          </th>
          {#each grades as g (g)}
            {@const cell = index.get(`${code}/${g}`)}
            <td class="px-1.5 py-1.5 text-center">
              {#if cell}
                <a
                  href={`/preguntas/${COUNTRY_DIR[code] ?? code.toLowerCase()}/grado-${g}/`}
                  class="block rounded-lg px-2 py-2 font-bold transition hover:ring-2 hover:ring-emerald-400"
                  style={cellStyle(cell)}
                  aria-label={`${COUNTRY_NAME[code] ?? code} grado ${g}: ${cell.uses} usos, ${formatAccuracy(cell.accuracy)}, ${cell.bundles.length} bundles. ${t('analytics.drilldown', L)}`}
                  title={`${cell.uses} usos · ${formatAccuracy(cell.accuracy)}`}
                >
                  {cell.uses}
                </a>
              {:else}
                <span class="block rounded-lg px-2 py-2" style={cellStyle(undefined)} aria-label={`${code} grado ${g}: sin datos`}>
                  –
                </span>
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
<p class="text-[11px] text-slate-500 mt-2">
  {t('analytics.drilldown', L)} — el número indica usos y el color la intensidad; el tooltip muestra la tasa de acierto.
</p>
