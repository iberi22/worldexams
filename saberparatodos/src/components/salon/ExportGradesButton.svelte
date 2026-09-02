<script lang="ts">
  import { exportGradesCsv, downloadCsv } from '$lib/mesh/salon-export';
  import type { SalonResult, SalonTenant } from '$lib/mesh/salon-shared';
  import { t, type SalonLocale } from '$lib/i18n';

  interface Props {
    tenant: SalonTenant;
    results: SalonResult[];
    locale?: SalonLocale;
    onExported?: (csv: string) => void;
  }

  let { tenant, results, locale = 'es-CO', onExported }: Props = $props();

  const hasData = $derived(results.length > 0);

  function exportNow() {
    if (!hasData) return;
    const csv = exportGradesCsv(tenant, results);
    const filename = `${tenant.country}-${tenant.examId}-calificaciones`;
    downloadCsv(filename, csv);
    onExported?.(csv);
  }
</script>

<button
  class="rounded bg-sky-700 px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-40"
  disabled={!hasData}
  title={!hasData ? t('salon.export.empty', locale) : undefined}
  onclick={exportNow}
>
  {t('salon.export.button', locale)}
</button>
