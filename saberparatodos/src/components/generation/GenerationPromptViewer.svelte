<script lang="ts">
  // Visor de prompts de generación por país + discusión Giscus (Laboratorio Abierto)
  import { onMount } from 'svelte';

  interface CountryMetrics {
    code: string;
    name: string;
    flag: string;
    bundles: number;
    okPct: number;
    promptPath: string;
    promptUrl: string;
  }

  export let countries: CountryMetrics[] = [];

  // ⚡ Bolt Optimization: Pre-sort countries by name instead of sorting inline in template
  $: sortedCountriesByName = [...countries].sort((a, b) => a.name.localeCompare(b.name));

  let selected: CountryMetrics | null = null;
  let promptContent = '';
  let isLoadingPrompt = false;
  let promptError = '';

  // Giscus (GitHub Discussions) — misma infra que CommentsSection
  const GISCUS_REPO = 'iberi22/worldexams';
  const GISCUS_REPO_ID = 'R_kgDONXw98Q';
  const GISCUS_CATEGORY = 'Announcements';
  const GISCUS_CATEGORY_ID = 'DIC_kwDONXw98c4Ckz9-';

  async function selectCountry(code: string) {
    selected = countries.find((c) => c.code === code) || null;
    if (!selected) return;
    promptError = '';
    promptContent = '';
    isLoadingPrompt = true;

    // Cargar el prompt desde el repo (raw.githubusercontent.com)
    const rawUrl = `https://raw.githubusercontent.com/iberi22/worldexams/main/${selected.promptPath}`;
    try {
      const res = await fetch(rawUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      promptContent = await res.text();
    } catch (e) {
      promptError = `No se pudo cargar el prompt: ${e instanceof Error ? e.message : 'error'}`;
    } finally {
      isLoadingPrompt = false;
    }

    // Cargar Giscus para el país (thread dedicado por país)
    loadGiscus(selected.code);
  }

  function loadGiscus(countryCode: string) {
    // Limpiar contenedor anterior
    const container = document.getElementById('giscus-generation');
    if (!container) return;
    container.innerHTML = '';

    // Configuración Giscus con término único por país
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', GISCUS_REPO);
    script.setAttribute('data-repo-id', GISCUS_REPO_ID);
    script.setAttribute('data-category', GISCUS_CATEGORY);
    script.setAttribute('data-category-id', GISCUS_CATEGORY_ID);
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', `generacion-prompt-${countryCode}`);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'dark');
    script.setAttribute('data-lang', 'es');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    container.appendChild(script);
  }

  onMount(() => {
    // Seleccionar el primer país con más bundles por defecto
    if (countries.length > 0) {
      const top = [...countries].sort((a, b) => b.bundles - a.bundles)[0];
      selectCountry(top.code);
    }
  });
</script>

<div class="grid gap-6 lg:grid-cols-2">
  <!-- Selector de país -->
  <div class="rounded-2xl border border-white/10 bg-[#0e0f13] p-5">
    <label class="mb-3 block text-xs font-semibold uppercase tracking-wider text-white/50">
      Selecciona un país
    </label>
    <div class="flex flex-wrap gap-2">
      {#each sortedCountriesByName as c (c.code)}
        <button
          on:click={() => selectCountry(c.code)}
          class="rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors {selected?.code === c.code
            ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-300'
            : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'}"
        >
          {c.flag} {c.code}
        </button>
      {/each}
    </div>

    {#if selected}
      <div class="mt-5 border-t border-white/10 pt-4">
        <div class="mb-3 flex items-center justify-between">
          <h3 class="text-lg font-bold text-[#F5F5DC]">
            {selected.flag} Prompt de {selected.name}
          </h3>
          <a
            href={selected.promptUrl}
            target="_blank"
            rel="noopener"
            class="text-xs text-emerald-300 underline"
          >
            Ver en GitHub
          </a>
        </div>
        <div class="mb-3 flex gap-4 text-xs text-white/50">
          <span><span class="font-mono text-white/80">{selected.bundles}</span> bundles</span>
          <span>Validez <span class="font-mono text-emerald-400">{selected.okPct}%</span></span>
        </div>

        {#if isLoadingPrompt}
          <p class="text-sm text-white/40">Cargando prompt...</p>
        {:else if promptError}
          <p class="text-sm text-red-400">{promptError}</p>
          <a
            href={selected.promptUrl}
            target="_blank"
            rel="noopener"
            class="mt-2 inline-block text-sm text-emerald-300 underline"
          >
            Abrir prompt en GitHub
          </a>
        {:else}
          <pre class="max-h-96 overflow-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs leading-relaxed text-emerald-100/80 whitespace-pre-wrap">{promptContent}</pre>
        {/if}
      </div>
    {/if}
  </div>

  <!-- Discusión -->
  <div class="rounded-2xl border border-white/10 bg-[#0e0f13] p-5">
    <h3 class="mb-2 text-lg font-bold text-[#F5F5DC]">
      {selected ? `${selected.flag} Discusión — mejora del prompt de ${selected.name}` : 'Discusión'}
    </h3>
    <p class="mb-4 text-xs text-white/50">
      Propón mejoras al prompt, reporta errores en las preguntas generadas o comparte flujos nuevos.
      Los cambios se pueden enviar como Pull Request al repositorio.
    </p>
    <div id="giscus-generation" class="min-h-40"></div>
  </div>
</div>
