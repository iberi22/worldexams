<script>
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';

  let query = '';
  let results = [];
  let loading = false;
  let pagefind;
  let isOpen = false;

  onMount(async () => {
    // Pagefind is only available in production build
    try {
      // @ts-ignore
      const baseUrl = import.meta.env.BASE_URL;
      const pagefindUrl = `${baseUrl === '/' ? '' : baseUrl}/pagefind/pagefind.js`;
      pagefind = await import(/* @vite-ignore */ pagefindUrl);
      await pagefind.init();
    } catch (e) {
      console.log('Pagefind not loaded (dev mode?)');
    }
  });

  async function handleSearch() {
    if (!pagefind || !query.trim()) {
      results = [];
      return;
    }
    loading = true;
    const search = await pagefind.search(query);
    // Get top 5 results
    results = await Promise.all(search.results.slice(0, 5).map(r => r.data()));
    loading = false;
  }

  function toggleSearch() {
    isOpen = !isOpen;
    if (isOpen) {
      setTimeout(() => document.getElementById('search-input')?.focus(), 100);
    }
  }
</script>

<div class="relative z-50">
  <button
    on:click={toggleSearch}
    class="p-2 text-emerald-500 hover:text-emerald-400 transition-colors opacity-80 hover:opacity-100"
    aria-label="Buscar preguntas"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </button>

  {#if isOpen}
    <div
      transition:fade={{ duration: 200 }}
      class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
      on:click|self={toggleSearch}
    >
      <div
        class="w-full max-w-2xl bg-[#1a1a1a] border border-emerald-500/30 rounded-lg shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <div class="p-4 border-b border-white/10 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="search-input"
            type="text"
            bind:value={query}
            on:input={handleSearch}
            placeholder="Buscar preguntas, temas o conceptos..."
            class="flex-1 bg-transparent border-none outline-none text-[#F5F5DC] placeholder-white/20"
            autocomplete="off"
          />
          <button on:click={toggleSearch} class="text-xs uppercase tracking-widest text-white/40 hover:text-white">
            ESC
          </button>
        </div>

        {#if loading}
          <div class="p-4 text-center text-white/40 text-sm">
            Buscando...
          </div>
        {:else if results.length > 0}
          <div class="max-h-[60vh] overflow-y-auto">
            {#each results as result}
              <a
                href={result.url}
                class="block p-4 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors group"
              >
                <h4 class="text-emerald-500 font-bold text-sm mb-1 group-hover:text-emerald-400">
                  {result.meta.title || 'Pregunta'}
                </h4>
                <p class="text-xs text-white/60 line-clamp-2">
                  {@html result.excerpt}
                </p>
              </a>
            {/each}
          </div>
        {:else if query}
          <div class="p-8 text-center text-white/40 text-sm">
            No se encontraron resultados para "{query}"
          </div>
        {/if}

        {#if !query}
           <div class="p-4 bg-white/5 text-xs text-white/30 text-center">
             Escribe para buscar en el banco de preguntas
           </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
