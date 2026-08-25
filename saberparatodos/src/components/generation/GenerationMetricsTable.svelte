<script lang="ts">
  // Tabla de métricas de generación por país (Laboratorio Abierto)
  interface CountryMetrics {
    code: string;
    name: string;
    flag: string;
    bundles: number;
    errors: number;
    warnings: number;
    contentErrors: number;
    okPct: number;
    issues: string[];
    promptPath: string;
    promptUrl: string;
  }

  export let countries: CountryMetrics[] = [];

  const ISSUE_LABELS: Record<string, string> = {
    bundle_index: 'bundle_index',
    question_count: 'conteo preguntas',
    difficulty_marker: 'marcador dificultad',
    calibration: 'calibration',
    validator_error: 'error validador',
  };

  function issueBadge(issue: string): string {
    return ISSUE_LABELS[issue] || issue;
  }

  function okColor(pct: number): string {
    if (pct >= 95) return 'text-emerald-400';
    if (pct >= 70) return 'text-amber-400';
    return 'text-red-400';
  }

  // ⚡ Bolt Optimization: Pre-sort countries by bundles instead of sorting inline in template
  $: sortedCountriesByBundles = [...countries].sort((a, b) => b.bundles - a.bundles);
</script>

<div class="overflow-x-auto rounded-2xl border border-white/10 bg-[#0e0f13]">
  <table class="w-full text-left text-sm">
    <thead>
      <tr class="border-b border-white/10 text-xs uppercase tracking-wider text-white/50">
        <th class="px-4 py-3">País</th>
        <th class="px-4 py-3 text-right">Bundles</th>
        <th class="px-4 py-3 text-right">Validez</th>
        <th class="px-4 py-3 text-right">Errores contenido</th>
        <th class="px-4 py-3 text-right">Warnings</th>
        <th class="px-4 py-3">Problemas detectados</th>
        <th class="px-4 py-3">Prompt</th>
      </tr>
    </thead>
    <tbody>
      {#each sortedCountriesByBundles as c (c.code)}
        <tr class="border-b border-white/5 transition-colors hover:bg-white/5">
          <td class="px-4 py-3">
            <span class="mr-2">{c.flag}</span>
            <span class="font-semibold text-[#F5F5DC]">{c.code}</span>
            <span class="ml-2 text-xs text-white/40">{c.name}</span>
          </td>
          <td class="px-4 py-3 text-right font-mono text-white/80">{c.bundles}</td>
          <td class="px-4 py-3 text-right font-mono {okColor(c.okPct)}">{c.okPct}%</td>
          <td class="px-4 py-3 text-right font-mono {c.contentErrors > 0 ? 'text-red-400' : 'text-emerald-400'}">
            {c.contentErrors}
          </td>
          <td class="px-4 py-3 text-right font-mono text-amber-400/80">{c.warnings}</td>
          <td class="px-4 py-3">
            <div class="flex flex-wrap gap-1">
              {#each c.issues as issue}
                <span class="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/60">
                  {issueBadge(issue)}
                </span>
              {/each}
              {#if c.issues.length === 0}
                <span class="text-xs text-emerald-400">limpio</span>
              {/if}
            </div>
          </td>
          <td class="px-4 py-3">
            <a
              href={c.promptUrl}
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/20"
            >
              Ver prompt
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
