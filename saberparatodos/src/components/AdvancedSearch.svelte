<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  // Props
  export let questions: any[] = [];
  export let onSelectQuestion: (question: any) => void = () => {};

  // State
  let isOpen = false;
  let query = '';
  let showFilters = false;

  // Filters
  let selectedGrade: number | null = null;
  let selectedSubject: string | null = null;
  let selectedDifficulty: number | null = null;
  let selectedCompetencia: string | null = null;

  // Derived data
  $: grades = [...new Set(questions.map(q => q.grade).filter(Boolean))].sort((a, b) => a - b);
  $: subjects = [...new Set(questions.map(q => q.category?.split(' > ')[0]).filter(Boolean))];
  $: competencias = [...new Set(questions.map(q => q.competencia).filter(Boolean))];

  // Filter results
  $: filteredQuestions = questions.filter(q => {
    // Text search
    const matchesQuery = !query ||
      q.text?.toLowerCase().includes(query.toLowerCase()) ||
      q.category?.toLowerCase().includes(query.toLowerCase()) ||
      q.explanation?.toLowerCase().includes(query.toLowerCase());

    // Grade filter
    const matchesGrade = !selectedGrade || q.grade === selectedGrade;

    // Subject filter
    const matchesSubject = !selectedSubject || q.category?.startsWith(selectedSubject);

    // Difficulty filter
    const matchesDifficulty = !selectedDifficulty || q.difficulty === selectedDifficulty;

    // Competencia filter
    const matchesCompetencia = !selectedCompetencia || q.competencia === selectedCompetencia;

    return matchesQuery && matchesGrade && matchesSubject && matchesDifficulty && matchesCompetencia;
  });

  // Group results by category
  $: groupedResults = filteredQuestions.reduce((acc, q) => {
    const category = q.category?.split(' > ')[0] || 'Sin categoría';
    if (!acc[category]) acc[category] = [];
    acc[category].push(q);
    return acc;
  }, {} as Record<string, any[]>);

  $: activeFiltersCount = [selectedGrade, selectedSubject, selectedDifficulty, selectedCompetencia].filter(Boolean).length;

  function toggleSearch() {
    isOpen = !isOpen;
    if (isOpen) {
      setTimeout(() => document.getElementById('advanced-search-input')?.focus(), 100);
    } else {
      clearFilters();
    }
  }

  function clearFilters() {
    query = '';
    selectedGrade = null;
    selectedSubject = null;
    selectedDifficulty = null;
    selectedCompetencia = null;
  }

  function handleQuestionClick(question: any) {
    onSelectQuestion(question);
    toggleSearch();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      toggleSearch();
    }
  }

  const difficultyLabels: Record<number, string> = {
    1: 'Muy Fácil',
    2: 'Fácil',
    3: 'Media',
    4: 'Difícil',
    5: 'Muy Difícil'
  };

  const subjectEmojis: Record<string, string> = {
    'Matemáticas': '📐',
    'Lenguaje': '📖',
    'Ciencias': '🔬',
    'Sociales': '🏛️',
    'Inglés': '🌐',
    'Lectura Crítica': '📚',
    'Informática': '💻'
  };
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="relative z-50">
  <!-- Search Button -->
  <button
    on:click={toggleSearch}
    class="p-2 text-emerald-500 hover:text-emerald-400 transition-colors opacity-80 hover:opacity-100 relative"
    aria-label="Búsqueda avanzada"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    {#if activeFiltersCount > 0}
      <span class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-[10px] font-bold text-black rounded-full flex items-center justify-center">
        {activeFiltersCount}
      </span>
    {/if}
  </button>

  {#if isOpen}
    <div
      transition:fade={{ duration: 200 }}
      class="fixed inset-0 bg-black/90 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto"
      on:click|self={toggleSearch}
    >
      <div
        class="w-full max-w-4xl bg-[#1a1a1a] border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden mb-8"
        role="dialog"
        aria-modal="true"
        in:fly={{ y: -20, duration: 300 }}
      >
        <!-- Search Header -->
        <div class="p-4 sm:p-6 border-b border-white/10">
          <div class="flex items-center gap-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="advanced-search-input"
              type="text"
              bind:value={query}
              placeholder="Buscar preguntas, temas, conceptos..."
              class="flex-1 bg-transparent border-none outline-none text-lg text-[#F5F5DC] placeholder-white/30"
              autocomplete="off"
            />
            <button
              on:click={toggleSearch}
              class="px-3 py-1 text-xs uppercase tracking-widest text-white/40 hover:text-white border border-white/20 hover:border-white/40 rounded transition-colors"
            >
              ESC
            </button>
          </div>

          <!-- Filter Toggle -->
          <button
            on:click={() => showFilters = !showFilters}
            class="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
            {#if activeFiltersCount > 0}
              <span class="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px]">
                {activeFiltersCount} activo{activeFiltersCount > 1 ? 's' : ''}
              </span>
            {/if}
          </button>
        </div>

        <!-- Filters Panel -->
        {#if showFilters}
          <div class="p-4 sm:p-6 border-b border-white/10 bg-white/5" transition:slide={{ duration: 200 }}>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- Grade Filter -->
              <div>
                <label class="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Grado</label>
                <select
                  bind:value={selectedGrade}
                  class="w-full bg-[#121212] border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value={null}>Todos</option>
                  {#each grades as grade}
                    <option value={grade}>{grade}°</option>
                  {/each}
                </select>
              </div>

              <!-- Subject Filter -->
              <div>
                <label class="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Asignatura</label>
                <select
                  bind:value={selectedSubject}
                  class="w-full bg-[#121212] border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value={null}>Todas</option>
                  {#each subjects as subject}
                    <option value={subject}>{subjectEmojis[subject] || '📋'} {subject}</option>
                  {/each}
                </select>
              </div>

              <!-- Difficulty Filter -->
              <div>
                <label class="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Dificultad</label>
                <select
                  bind:value={selectedDifficulty}
                  class="w-full bg-[#121212] border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value={null}>Todas</option>
                  {#each [1, 2, 3, 4, 5] as diff}
                    <option value={diff}>{difficultyLabels[diff]}</option>
                  {/each}
                </select>
              </div>

              <!-- Competencia Filter -->
              <div>
                <label class="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Competencia</label>
                <select
                  bind:value={selectedCompetencia}
                  class="w-full bg-[#121212] border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none truncate"
                >
                  <option value={null}>Todas</option>
                  {#each competencias as comp}
                    <option value={comp}>{comp}</option>
                  {/each}
                </select>
              </div>
            </div>

            {#if activeFiltersCount > 0}
              <button
                on:click={clearFilters}
                class="mt-4 text-xs uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
              >
                ✕ Limpiar filtros
              </button>
            {/if}
          </div>
        {/if}

        <!-- Results -->
        <div class="max-h-[60vh] overflow-y-auto">
          {#if filteredQuestions.length === 0}
            <div class="p-8 text-center">
              <div class="text-4xl mb-4 opacity-20">🔍</div>
              <p class="text-white/40 text-sm">
                {query || activeFiltersCount > 0 ? 'No se encontraron resultados' : 'Escribe para buscar o usa los filtros'}
              </p>
            </div>
          {:else}
            <!-- Results Summary -->
            <div class="px-4 sm:px-6 py-3 bg-emerald-500/5 border-b border-emerald-500/20">
              <p class="text-xs text-emerald-500">
                <span class="font-bold">{filteredQuestions.length}</span> pregunta{filteredQuestions.length !== 1 ? 's' : ''} encontrada{filteredQuestions.length !== 1 ? 's' : ''}
              </p>
            </div>

            <!-- Grouped Results -->
            {#each Object.entries(groupedResults) as [category, categoryQuestions]}
              <div class="border-b border-white/5 last:border-0">
                <div class="px-4 sm:px-6 py-2 bg-white/5 sticky top-0">
                  <h4 class="text-xs font-bold uppercase tracking-widest text-white/60 flex items-center gap-2">
                    <span>{subjectEmojis[category] || '📋'}</span>
                    {category}
                    <span class="text-white/30">({categoryQuestions.length})</span>
                  </h4>
                </div>

                {#each categoryQuestions.slice(0, 5) as question}
                  <button
                    on:click={() => handleQuestionClick(question)}
                    class="w-full text-left p-4 sm:px-6 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors group"
                  >
                    <div class="flex items-start gap-3">
                      <div class="shrink-0 mt-1">
                        <span class={`
                          w-6 h-6 flex items-center justify-center rounded text-[10px] font-bold
                          ${question.difficulty <= 2 ? 'bg-green-500/20 text-green-400' :
                            question.difficulty === 3 ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'}
                        `}>
                          {question.difficulty || '?'}
                        </span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm text-white/90 group-hover:text-white line-clamp-2 mb-1">
                          {question.text}
                        </p>
                        <div class="flex flex-wrap items-center gap-2 text-[10px] text-white/40">
                          {#if question.grade}
                            <span class="px-1.5 py-0.5 bg-white/5 rounded">{question.grade}°</span>
                          {/if}
                          {#if question.competencia}
                            <span class="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded truncate max-w-[150px]">
                              {question.competencia}
                            </span>
                          {/if}
                          <span class="text-white/20">ID: {question.id}</span>
                        </div>
                      </div>
                      <svg class="w-4 h-4 text-white/20 group-hover:text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                {/each}

                {#if categoryQuestions.length > 5}
                  <div class="px-4 sm:px-6 py-2 text-xs text-white/30 text-center">
                    +{categoryQuestions.length - 5} más en {category}
                  </div>
                {/if}
              </div>
            {/each}
          {/if}
        </div>

        <!-- Footer -->
        <div class="p-4 bg-white/5 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
          <span>Total: {questions.length} preguntas en el banco</span>
          <span class="flex items-center gap-2">
            <kbd class="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">↑↓</kbd> navegar
            <kbd class="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">Enter</kbd> seleccionar
          </span>
        </div>
      </div>
    </div>
  {/if}
</div>
