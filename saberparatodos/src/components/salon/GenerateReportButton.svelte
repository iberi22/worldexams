<script lang="ts">
  import { generateMarkdownReport, type ReportInput } from '$lib/mesh/salon-report';
  import { t } from '$lib/i18n';

  interface Props {
    input: ReportInput;
    onReport: (markdown: string) => void;
  }

  let { input, onReport }: Props = $props();

  function generate() {
    onReport(generateMarkdownReport(input));
  }
</script>

<button
  class="rounded bg-violet-700 px-3 py-1.5 text-sm font-semibold text-white"
  onclick={generate}
>
  {t('salon.report.button', input.locale ?? 'es-CO')}
</button>
