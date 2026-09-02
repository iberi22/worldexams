<script lang="ts">
  import { t, normalizeLang, type I18nLang } from '../../lib/i18n';
  import { formatAccuracy, formatAvgTime, type BundlePerformance } from '../../lib/analytics/usage-aggregator';

  interface Props {
    lang?: string;
    rows: BundlePerformance[];
  }

  let { lang = 'es', rows = [] }: Props = $props();

  const L: I18nLang = $derived(normalizeLang(lang));

  type SortKey = 'bundleId' | 'country' | 'grade' | 'uses' | 'accuracy' | 'avgTimeMs';
  let sortKey = $state<SortKey>('uses');
  let sortDir = $state<'asc' | 'desc'>('desc');

  const sorted = $derived.by(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp =
        typeof av === 'string' && typeof bv === 'string'
          ? av.localeCompare(bv)
          : Number(av) - Number(bv);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return copy;
  });

  function toggleSort(key: SortKey) {
    if (sortKey === key) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    else {
      sortKey = key;
      sortDir = 'desc';
    }
  }

  const COUNTRY_DIR_BY_CODE: Record<string, string> = {
    CO: 'colombia',
    MX: 'mexico',
    AR: 'argentina',
    BR: 'brasil',
    CL: 'chile',
    PE: 'peru',
    EC: 'ecuador',
  };

  const bundleHref = (row: BundlePerformance): string => {
    const dir = COUNTRY_DIR_BY_CODE[row.country.toUpperCase()] ?? row.country.toLowerCase();
    return `/preguntas/${dir}/grado-${row.grade}/`;
  };
</script>

<div class="overflow-x-auto rounded-2xl border border-slate-700/70">
  <table class="w-full text-sm text-left">
    <caption class="sr-only">{t('analytics.bundleTable', L)}</caption>
    <thead class="bg-slate-800/80 text-xs uppercase text-slate-400">
      <tr>
        {#each [
            ['bundleId', t('analytics.bundle', L)],
            ['country', t('analytics.country', L)],
            ['grade', t('analytics.grade', L)],
            ['uses', t('analytics.uses', L)],
            ['accuracy', t('analytics.accuracy', L)],
            ['avgTimeMs', t('analytics.avgTime', L)],
          ] as [key, label] (key)}
          <th scope="col" class="px-4 py-3">
            <button
              type="button"
              class="font-bold hover:text-emerald-300 transition uppercase"
              onclick={() => toggleSort(key as SortKey)}
              aria-label={`Ordenar por ${label}`}
            >
              {label}{#if sortKey === key} {sortDir === 'asc' ? '▲' : '▼'}{/if}
            </button>
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-800">
      {#each sorted as row (row.bundleId)}
        <tr class="bg-slate-900/40 hover:bg-slate-800/60 transition">
          <td class="px-4 py-3 font-mono text-xs text-emerald-300 break-all max-w-[24rem]">
            <a href={bundleHref(row)} class="hover:underline">{row.bundleId}</a>
          </td>
          <td class="px-4 py-3">{row.country}</td>
          <td class="px-4 py-3">{row.grade}</td>
          <td class="px-4 py-3 font-semibold">{row.uses}</td>
          <td class="px-4 py-3" class:text-rose-400={row.accuracy < 0.5} class:text-emerald-400={row.accuracy >= 0.8}>
            {formatAccuracy(row.accuracy)}
          </td>
          <td class="px-4 py-3">{formatAvgTime(row.avgTimeMs)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
