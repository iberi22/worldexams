<script lang="ts">
  import FlashlightCard from './FlashlightCard.svelte';
  import AdBlock from './AdBlock.svelte';
  import MathRenderer from './MathRenderer.svelte';
  import type { Question } from '../types';

  export let questions: Question[] = [];
  export let onSelect: (question: Question) => void;
  export let onBack: () => void;

  let searchTerm = "";
  let selectedGrade: number | null = null;
  let selectedDifficulty: number | null = null;
  let selectedSubject: string | null = null;

  // Normalize subject for comparison (removes accents, standardizes separators)
  // Handles ALL variants: "lectura-critica", "lectura_critica", "lectura crítica"
  function normalizeSubject(subject: string): string {
    if (!subject) return '';
    return subject
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents: á→a, í→i, etc.
      .replace(/[-_\s]+/g, ' ')        // Replace hyphens, underscores, spaces with single space
      .replace(/Y\s+CIUDADANAS?/g, 'CIUDADANAS') // "sociales y ciudadanas" → "sociales ciudadanas"
      .replace(/NATURALES?/g, 'NATURALES') // Normalize plural/singular
      .trim();
  }

  // Map API names to display names
  // Includes ALL variants found in API folders (guiones, guiones bajos)
  const subjectDisplayMap: Record<string, string> = {
    'MATEMATICAS': 'MATEMÁTICAS',
    'LECTURA CRITICA': 'LECTURA CRÍTICA',
    'CIENCIAS NATURALES': 'CIENCIAS NATURALES',
    'SOCIALES CIUDADANAS': 'SOCIALES Y CIUDADANAS', // Normalized form
    'SOCIALES Y CIUDADANAS': 'SOCIALES Y CIUDADANAS',
    'INGLES': 'INGLÉS',
    'INFORMATICA': 'INFORMÁTICA',
    'TECNOLOGIA INFORMATICA': 'TECNOLOGÍA E INFORMÁTICA',
    'TECNOLOGIA E INFORMATICA': 'TECNOLOGÍA E INFORMÁTICA',
    'FILOSOFIA': 'FILOSOFÍA',
    'LENGUAJE': 'LENGUAJE',
  };

  function getDisplayName(subject: string): string {
    const normalized = normalizeSubject(subject);
    return subjectDisplayMap[normalized] || subject;
  }

  // Extract unique subjects with display names
  $: rawSubjects = [...new Set(questions.map(q => q.category.split('::')[0].trim()))];
  $: subjects = [...new Map(rawSubjects.map(s => [normalizeSubject(s), s])).values()].sort();

  // Debug: log available subjects when questions change
  $: if (questions.length > 0) {
    console.log(`📋 BlogView: ${questions.length} questions loaded`);
    console.log(`📋 BlogView: Unique subjects: ${subjects.join(', ')}`);
    const gradeDistribution = questions.reduce((acc, q) => {
      acc[q.grade] = (acc[q.grade] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    console.log(`📋 BlogView: Grade distribution:`, gradeDistribution);
  }

  // Check if subjects match (handles naming variations)
  function subjectsMatch(category: string, selected: string | null): boolean {
    if (!selected) return true;
    const categorySubject = category.split('::')[0].trim();
    return normalizeSubject(categorySubject) === normalizeSubject(selected);
  }

  // Normalize string for search (remove accents, lowercase)
  function normalizeForSearch(str: string): string {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  $: normalizedSearchTerm = normalizeForSearch(searchTerm);

  $: filteredQuestions = questions.filter(q => {
    // Debug: log first question to see structure
    if (questions.indexOf(q) === 0) {
      console.log('📋 First question structure:', q);
    }

    const matchesGrade = selectedGrade ? q.grade === selectedGrade : true;
    const matchesDifficulty = selectedDifficulty ? q.difficulty === selectedDifficulty : true;
    const matchesSubject = subjectsMatch(q.category, selectedSubject);

    const searchTarget = [
      q.id,
      q.text,
      q.category,
      q.bundleId || '',
      q.grade.toString(),
      q.difficulty.toString()
    ].map(s => normalizeForSearch(s.toString())).join(' ');

    const matchesSearch = !searchTerm || searchTarget.includes(normalizedSearchTerm);

    return matchesSearch && matchesGrade && matchesDifficulty && matchesSubject;
  });

  function clearSearch() {
    searchTerm = "";
  }

  // Function to inject ads into the list
  function getItemsWithAds(items: Question[]) {
    const result = [];
    for (let i = 0; i < items.length; i++) {
        result.push({ type: 'question', id: items[i].id, data: items[i] });
      // Insert ad every 6 items
      if ((i + 1) % 6 === 0) {
        result.push({ type: 'ad', id: `ad-${i}`, data: null });
      }
    }
    return result;
  }

  $: itemsToRender = getItemsWithAds(filteredQuestions);

  // Pagination logic
  let visibleCount = 30;

  // Reset pagination when filters change
  $: {
    searchTerm; selectedGrade; selectedDifficulty; selectedSubject;
    visibleCount = 30;
  }

  $: visibleItems = itemsToRender.slice(0, visibleCount);

  function loadMore() {
    visibleCount += 30;
  }

  const grades = [3, 5, 7, 9, 11];
  const difficulties = [1, 2, 3, 4, 5];
</script>

<div class="w-full max-w-6xl mx-auto p-4 animate-fade-in-up pb-20">
  <div class="flex items-center justify-between mb-8">
    <h2 class="text-4xl font-bold uppercase tracking-tighter text-[#F5F5DC]">
      Blog / <span class="text-emerald-500">Artículos</span>
    </h2>
    <button
      onclick={onBack}
      class="px-4 py-2 border border-white/20 hover:bg-white/10 transition-colors uppercase text-xs tracking-widest opacity-60 hover:opacity-100"
    >
      [ Volver ]
    </button>
  </div>

  <!-- Filters Section -->
  <div class="bg-[#1E1E1E]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-10 shadow-2xl">
    <!-- Search Bar -->
    <div class="relative mb-6 group">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-white/30 group-focus-within:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Buscar por ID, contenido o tema..."
        class="w-full bg-[#121212] border border-white/10 rounded-xl py-4 pl-12 pr-12 text-lg text-white placeholder:text-white/20 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none transition-all"
      />

      {#if searchTerm}
        <button
          onclick={clearSearch}
          class="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white transition-colors"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      {/if}
    </div>

    <!-- Filters Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

      <!-- Subject Filter -->
      <div class="space-y-2">
        <label class="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Asignatura</label>
        <div class="relative">
          <select
            bind:value={selectedSubject}
            class="w-full appearance-none bg-[#121212] border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:border-emerald-500/50 focus:outline-none transition-colors cursor-pointer hover:border-white/20"
          >
            <option value={null}>Todas las asignaturas</option>
            {#each subjects as subject}
              <option value={subject}>{getDisplayName(subject)}</option>
            {/each}
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-white/30">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Grade Filter -->
      <div class="space-y-2">
        <label class="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Grado Escolar</label>
        <div class="flex bg-[#121212] rounded-lg p-1 border border-white/10">
          <button
            class="flex-1 py-2 text-xs font-medium rounded-md transition-all {selectedGrade === null ? 'bg-emerald-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}"
            onclick={() => selectedGrade = null}
          >
            Todos
          </button>
          {#each grades as grade}
            <button
              class="flex-1 py-2 text-xs font-medium rounded-md transition-all {selectedGrade === grade ? 'bg-emerald-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}"
              onclick={() => selectedGrade = grade}
            >
              {grade}°
            </button>
          {/each}
        </div>
      </div>

      <!-- Difficulty Filter -->
      <div class="space-y-2">
        <label class="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Nivel de Complejidad</label>
        <div class="flex bg-[#121212] rounded-lg p-1 border border-white/10">
          <button
            class="flex-1 py-2 text-xs font-medium rounded-md transition-all {selectedDifficulty === null ? 'bg-emerald-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}"
            onclick={() => selectedDifficulty = null}
          >
            Todos
          </button>
          {#each difficulties as diff}
            <button
              class="flex-1 py-2 text-xs font-medium rounded-md transition-all {selectedDifficulty === diff ? 'bg-emerald-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}"
              onclick={() => selectedDifficulty = diff}
            >
              {diff}
            </button>
          {/each}
        </div>
      </div>

    </div>
  </div>

  <!-- Results Count -->
  <div class="mb-6 flex items-center justify-between px-2">
    <div class="text-sm text-white/40 uppercase tracking-widest">
      {filteredQuestions.length} {filteredQuestions.length === 1 ? 'resultado' : 'resultados'}
    </div>
  </div>

  {#if filteredQuestions.length === 0}
    <div class="text-center py-20 border border-white/10 rounded-2xl bg-[#1E1E1E]/30 border-dashed">
      <div class="text-6xl mb-4 opacity-20">🔍</div>
      <h3 class="text-xl font-bold text-white/60 mb-2">No encontramos resultados</h3>
      <p class="text-white/40 max-w-md mx-auto">
        Intenta ajustar tu búsqueda o los filtros seleccionados.
        Prueba buscando temas generales como "álgebra" o "historia".
      </p>
      <button
        onclick={clearSearch}
        class="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm uppercase tracking-widest transition-colors"
      >
        Limpiar búsqueda
      </button>
    </div>
  {:else}
    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each visibleItems as item (item.id)}
        {#if item.type === 'question'}
          <FlashlightCard
            onClick={() => onSelect(item.data)}
            className="p-6 flex flex-col justify-between group h-64 hover:border-emerald-500/50 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div class="flex flex-col h-full">
              <div class="flex justify-between items-start mb-2">
                <div class="text-xs font-bold uppercase tracking-widest text-emerald-500">
                  {item.data.category}
                </div>
                <div class="text-[10px] font-mono text-white/30">
                  {item.data.id}
                </div>
              </div>

              <div class="text-lg font-light leading-relaxed line-clamp-3 mb-4 flex-grow">
                <MathRenderer content={item.data.text} />
              </div>

              <div class="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <div class="flex gap-3 text-[10px] uppercase tracking-widest text-white/50">
                  <span>Grado {item.data.grade}°</span>
                  <span>Nivel {item.data.difficulty}</span>
                </div>
                <div class="flex items-center gap-2 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity">
                  <span class="text-xs uppercase tracking-widest">Leer</span>
                  <span class="text-xl">-></span>
                </div>
              </div>
            </div>
          </FlashlightCard>
        {:else}
          <!-- Ad Block -->
          <AdBlock className="h-64" />
        {/if}
      {/each}
    </div>
  {/if}

  <!-- Load More Button -->
  {#if visibleCount < itemsToRender.length}
    <div class="flex justify-center mt-12">
      <button
        onclick={loadMore}
        class="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest text-sm rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-emerald-500/20"
      >
        Cargar más preguntas
      </button>
    </div>
  {/if}
</div>
