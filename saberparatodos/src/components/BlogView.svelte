<script lang="ts">
  import { onMount } from 'svelte';
  import FlashlightCard from './FlashlightCard.svelte';
  import AdBlock from './AdBlock.svelte';
  import MathRenderer from './MathRenderer.svelte';
  import type { Question } from '../types';
  import { loadVideoManifest, getVideoManifestDefaults, type VideoManifestEntry } from '../lib/video-manifest';

  export let questions: Question[] = [];
  export let onSelect: (question: Question) => void = () => {};
  export let onBack: () => void;
  export let initialSubjectFilter: string | null = null; // 🆕 Pre-filter from LocalReportsView
  export let onGradeChange: ((grade: number | null) => Promise<void>) | null = null; // 🆕 Callback for dynamic grade loading
  export let isLoading: boolean = false; // 🆕 Loading state from parent

  let searchTerm = "";
  let selectedGrade: number | null = 11; // 🆕 Default to grade 11
  let selectedDifficulty: number | null = null;
  let selectedSubject: string | null = null; // 🆕 Will be set reactively after subjects load

  // 🆕 Modal state for viewing question details
  let selectedQuestion: Question | null = null;
  let videoByQuestionId: Record<string, VideoManifestEntry> = {};
  let videoDefaults: { youtube_channel_url?: string; instagram_url?: string; tiktok_url?: string } = {};

  function normalizeQuestionId(questionId: string | number): string {
    return String(questionId || '').trim().toLowerCase();
  }

  function getVideoForQuestion(questionId: string | number): VideoManifestEntry | null {
    const key = normalizeQuestionId(questionId);
    return videoByQuestionId[key] || null;
  }

  onMount(async () => {
    const manifest = await loadVideoManifest();
    videoDefaults = await getVideoManifestDefaults();
    const lookup: Record<string, VideoManifestEntry> = {};
    for (const [key, value] of manifest.entries()) {
      lookup[key] = value;
    }
    videoByQuestionId = lookup;
  });

  // 🆕 Close modal on ESC key
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && selectedQuestion) {
      selectedQuestion = null;
    }
  }

  // Normalize subject for comparison (removes accents, standardizes separators)
  // Handles ALL variants: "lectura-critica", "lectura_critica", "lectura crítica"
  function normalizeSubject(subject: string): string {
    if (!subject) return '';
    let norm = subject
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[-_\s]+/g, ' ')        // Standardize separators
      .trim();

    // Grouping variants
    if (norm.includes('MATEMATICA') || norm.includes('MATH')) return 'MATEMATICAS';
    if (norm.includes('LECTURA') || norm.includes('LENGU') || norm.includes('ESPANOL') || norm.includes('FILOSOF')) return 'LECTURA CRITICA';
    if (norm.includes('CIENCIA') || norm.includes('FISICA') || norm.includes('QUIMICA') || norm.includes('BIOLOG')) return 'CIENCIAS NATURALES';
    if (norm.includes('SOCIAL') || norm.includes('CIUDADAN') || norm.includes('HISTORIA') || norm.includes('GEOGRAF')) return 'SOCIALES Y CIUDADANAS';
    if (norm.includes('INGLE')) return 'INGLES';
    if (norm.includes('INFORMATIC') || norm.includes('TECNOLOG')) return 'TECNOLOGIA E INFORMATICA';

    return norm;
  }

  // Map API names to display names
  // Includes ALL variants found in API folders (guiones, guiones bajos)
  const subjectDisplayMap: Record<string, string> = {
    'MATEMATICAS': 'MATEMÁTICAS',
    'LECTURA CRITICA': 'LECTURA CRÍTICA',
    'CIENCIAS NATURALES': 'CIENCIAS NATURALES',
    'SOCIALES Y CIUDADANAS': 'SOCIALES Y CIUDADANAS',
    'INGLES': 'INGLÉS',
    'TECNOLOGIA E INFORMATICA': 'TECNOLOGÍA E INFORMÁTICA',
  };

  // 🆕 Map aliases from LocalReportsView to actual API category names
  // This fixes navigation from "Preguntas de LENGUAJE" links
  const subjectAliasMap: Record<string, string[]> = {
    'LENGUAJE': ['LECTURA CRITICA', 'LECTURA_CRITICA', 'LECTURA-CRITICA', 'ESPAÑOL', 'ESPANOL'],
    'ESPAÑOL': ['LECTURA CRITICA', 'LECTURA_CRITICA', 'LENGUAJE'],
    'MATEMATICAS': ['MATEMATICAS', 'MATH'],
    'CIENCIAS': ['CIENCIAS NATURALES', 'CIENCIAS_NATURALES'],
    'SOCIALES': ['SOCIALES CIUDADANAS', 'SOCIALES_Y_CIUDADANAS', 'SOCIALES Y CIUDADANAS'],
    'CIUDADANAS': ['SOCIALES CIUDADANAS', 'SOCIALES_Y_CIUDADANAS', 'SOCIALES Y CIUDADANAS'],
  };

  function getDisplayName(subject: string): string {
    const normalized = normalizeSubject(subject);
    return subjectDisplayMap[normalized] || subject;
  }

  // 🆕 Find matching subject from the actual subjects list
  function findMatchingSubject(filterName: string | null, availableSubjects: string[]): string | null {
    if (!filterName) return null;

    const normalizedFilter = normalizeSubject(filterName);

    // Direct match
    const directMatch = availableSubjects.find(s => normalizeSubject(s) === normalizedFilter);
    if (directMatch) return directMatch;

    // Check aliases
    const aliases = subjectAliasMap[normalizedFilter] || [];
    for (const alias of aliases) {
      const aliasMatch = availableSubjects.find(s =>
        normalizeSubject(s) === normalizeSubject(alias) ||
        normalizeSubject(s).includes(normalizeSubject(alias)) ||
        normalizeSubject(alias).includes(normalizeSubject(s))
      );
      if (aliasMatch) {
        console.log(`📋 BlogView: Mapped filter "${filterName}" to "${aliasMatch}" via alias`);
        return aliasMatch;
      }
    }

    // Partial match (contains)
    const partialMatch = availableSubjects.find(s =>
      normalizeSubject(s).includes(normalizedFilter) ||
      normalizedFilter.includes(normalizeSubject(s))
    );
    if (partialMatch) {
      console.log(`📋 BlogView: Mapped filter "${filterName}" to "${partialMatch}" via partial match`);
      return partialMatch;
    }

    console.warn(`⚠️ BlogView: No match found for filter "${filterName}". Available: ${availableSubjects.join(', ')}`);
    return null; // No match found, clear filter
  }

  // Extract unique subjects with display names (filter out invalid questions first)
  $: rawSubjects = [...new Set(questions.filter(q => q && q.category).map(q => q.category.split('::')[0].trim()))];
  $: subjects = [...new Map(rawSubjects.map(s => [normalizeSubject(s), s])).values()].sort();

  // 🆕 Map initialSubjectFilter to a valid subject once subjects are available
  let hasAppliedInitialFilter = false;
  $: if (initialSubjectFilter && subjects.length > 0 && !hasAppliedInitialFilter) {
    const matchedSubject = findMatchingSubject(initialSubjectFilter, subjects);
    if (matchedSubject) {
      console.log(`📋 BlogView: Applied initial filter "${initialSubjectFilter}" → "${matchedSubject}"`);
      selectedSubject = matchedSubject;
    } else {
      console.warn(`⚠️ BlogView: Could not map initial filter "${initialSubjectFilter}", showing all subjects`);
      selectedSubject = null;
    }
    hasAppliedInitialFilter = true;
  }

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
  function subjectsMatch(category: string | undefined, selected: string | null): boolean {
    if (!selected) return true;
    if (!category) return false;
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

  $: filteredQuestions = questions.filter((q, index, self) => {
    // Skip invalid questions
    if (!q || !q.category) return false;

    // Deduplicate by ID
    const isFirst = self.findIndex(item => item.id === q.id) === index;
    if (!isFirst) return false;

    // Debug: log first question to see structure
    if (index === 0) {
      console.log('📋 First question structure:', q);
    }

    const matchesGrade = selectedGrade ? q.grade === selectedGrade : true;
    const matchesDifficulty = selectedDifficulty ? q.difficulty === selectedDifficulty : true;
    const matchesPeriod = selectedPeriod ? q.period === selectedPeriod : true;
    const matchesSubject = subjectsMatch(q.category, selectedSubject);

    // 🆕 Safely build search target with null checks
    const searchTarget = [
      q.id || '',
      q.text || '',
      q.category || '',
      q.bundleId || '',
      q.grade?.toString() || '',
      q.difficulty?.toString() || ''
    ].map(s => normalizeForSearch(String(s))).join(' ');

    const matchesSearch = !searchTerm || searchTarget.includes(normalizedSearchTerm);

    return matchesSearch && matchesGrade && matchesDifficulty && matchesPeriod && matchesSubject;
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
    searchTerm; selectedGrade; selectedDifficulty; selectedSubject; selectedPeriod;
    visibleCount = 30;
  }

  $: visibleItems = itemsToRender.slice(0, visibleCount);

  function loadMore() {
    visibleCount += 30;
  }

  const grades = [3, 5, 6, 7, 8, 9, 10, 11];
  const difficulties = [1, 2, 3, 4, 5];
  const periods = [1, 2, 3, 4];
  let selectedPeriod: number | null = null;
</script>

<!-- 🆕 Loading Overlay for Grade Changes -->
{#if isLoading}
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
    <div class="flex flex-col items-center gap-4 text-center">
      <div class="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
      <p class="text-lg font-bold text-white uppercase tracking-widest">Accediendo al Banco</p>
      <p class="text-xs text-white/50">Cargando preguntas...</p>
    </div>
  </div>
{/if}

<div class="w-full max-w-6xl mx-auto p-4 animate-fade-in-up pb-20">
  <div class="flex items-center justify-between mb-8">
    <h2 class="text-4xl font-bold uppercase tracking-tighter text-[#F5F5DC]">
      Blog / <span class="text-emerald-500">Artículos</span>
    </h2>
    <button
      onclick={onBack}
      class="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/50 transition-all text-xs font-bold uppercase tracking-widest text-white/60 hover:text-emerald-400"
      aria-label="Volver"
    >
      <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Volver
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
          aria-label="Limpiar búsqueda"
          class="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white transition-colors"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      {/if}
    </div>

    <!-- Filters Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      <!-- Subject Filter -->
      <div class="space-y-2">
        <label for="subject-select" class="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Asignatura</label>
        <div class="relative">
          <select
            id="subject-select"
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
        <label id="grade-label" class="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Grado Escolar</label>
        <div class="flex bg-[#121212] rounded-lg p-1 border border-white/10" role="group" aria-labelledby="grade-label">
          <button
            class="flex-1 py-2 text-xs font-medium rounded-md transition-all {selectedGrade === null ? 'bg-emerald-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}"
            onclick={async () => {
              if (selectedGrade !== null && onGradeChange) {
                await onGradeChange(null);
              }
              selectedGrade = null;
            }}
            aria-label="Todos los grados"
            disabled={isLoading}
          >
            {isLoading && selectedGrade === null ? '...' : 'Todos'}
          </button>
          {#each grades as grade}
            <button
              class="flex-1 py-2 text-xs font-medium rounded-md transition-all {selectedGrade === grade ? 'bg-emerald-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}"
              onclick={async () => {
                if (selectedGrade !== grade && onGradeChange) {
                  await onGradeChange(grade);
                }
                selectedGrade = grade;
              }}
              aria-label="Grado {grade}"
              disabled={isLoading}
            >
              {isLoading && selectedGrade === grade ? '...' : `${grade}°`}
            </button>
          {/each}
        </div>
      </div>

      <!-- Difficulty Filter -->
      <div class="space-y-2">
        <label id="difficulty-label" class="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Nivel de Complejidad</label>
        <div class="flex bg-[#121212] rounded-lg p-1 border border-white/10" role="group" aria-labelledby="difficulty-label">
          <button
            class="flex-1 py-2 text-xs font-medium rounded-md transition-all {selectedDifficulty === null ? 'bg-emerald-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}"
            onclick={() => selectedDifficulty = null}
            aria-label="Todos los niveles"
          >
            Todos
          </button>
          {#each difficulties as diff}
            <button
              class="flex-1 py-2 text-xs font-medium rounded-md transition-all {selectedDifficulty === diff ? 'bg-emerald-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}"
              onclick={() => selectedDifficulty = diff}
              aria-label="Nivel {diff}"
            >
              {diff}
            </button>
          {/each}
        </div>
      </div>

      <!-- Period Filter -->
      <div class="space-y-2">
        <label id="period-label" class="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Período Académico</label>
        <div class="flex bg-[#121212] rounded-lg p-1 border border-white/10" role="group" aria-labelledby="period-label">
          <button
            class="flex-1 py-2 text-xs font-medium rounded-md transition-all {selectedPeriod === null ? 'bg-emerald-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}"
            onclick={() => selectedPeriod = null}
            aria-label="Todos los períodos"
          >
            Todos
          </button>
          {#each periods as period}
            <button
              class="flex-1 py-2 text-xs font-medium rounded-md transition-all {selectedPeriod === period ? 'bg-emerald-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}"
              onclick={() => selectedPeriod = period}
              aria-label="Período {period}"
            >
              P{period}
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
            onClick={() => {
              if (item.data) {
                selectedQuestion = item.data;
                // Removed immediate navigation: onSelect(item.data);
              }
            }}
            className="p-6 flex flex-col justify-between group h-64 hover:border-emerald-500/50 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div class="flex flex-col h-full">
              <div class="flex justify-between items-start mb-2">
                <div class="text-xs font-bold uppercase tracking-widest text-emerald-500">
                  {item.data?.category}
                </div>
                <div class="text-[10px] font-mono text-white/30">
                  {item.data?.id}
                </div>
              </div>

              <div class="text-lg font-light leading-relaxed line-clamp-3 mb-4 flex-grow">
                <MathRenderer content={item.data?.text || '(Sin contenido)'} />
              </div>

              <div class="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <div class="flex gap-3 text-[10px] uppercase tracking-widest text-white/50">
                  <span>Grado {item.data?.grade}°</span>
                  <span>Nivel {item.data?.difficulty}</span>
                  {#if item.data?.period}
                    <span>P{item.data?.period}</span>
                  {/if}
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

<!-- 🆕 Question Detail Modal -->
{#if selectedQuestion}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    onclick={(e) => { if (e.target === e.currentTarget) selectedQuestion = null; }}
    onkeydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    aria-labelledby="question-modal-title"
    tabindex="-1"
  >
    <div class="bg-[#1E1E1E] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
      <!-- Modal Header -->
      <div class="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-emerald-900/30 to-transparent shrink-0">
        <div class="flex items-center gap-3">
          <span class="text-xs font-bold uppercase tracking-widest text-emerald-500">
            {selectedQuestion.category?.split(' :: ')[0] || 'Pregunta'}
          </span>
          <span class="text-[10px] font-mono text-white/30">{selectedQuestion.id}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[10px] bg-white/5 px-2 py-1 rounded">Grado {selectedQuestion.grade}°</span>
          <span class="text-[10px] bg-white/5 px-2 py-1 rounded">Nivel {selectedQuestion.difficulty}</span>
          {#if selectedQuestion.period}
            <span class="text-[10px] bg-white/5 px-2 py-1 rounded">P{selectedQuestion.period}</span>
          {/if}
          <button
            onclick={() => selectedQuestion = null}
            class="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white ml-2"
            aria-label="Cerrar"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <!-- Question Text -->
        <div class="text-xl md:text-2xl font-bold leading-relaxed text-[#F5F5DC]">
          <MathRenderer content={selectedQuestion.text || '(Sin contenido)'} />
        </div>

        <!-- Options -->
        <div class="bg-black/30 border border-white/10 p-5 rounded-xl">
          <h3 class="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Opciones de Respuesta</h3>
          <ul class="space-y-3">
            {#each selectedQuestion.options || [] as option}
              <li class="flex items-start gap-3 p-3 rounded-lg {option.id === selectedQuestion.correctOptionId ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-white/5 border border-transparent'}">
                <span class="font-bold text-lg {option.id === selectedQuestion.correctOptionId ? 'text-emerald-400' : 'text-white/40'}">
                  {option.id})
                </span>
                <span class="{option.id === selectedQuestion.correctOptionId ? 'text-emerald-300' : 'text-white/80'}">
                  <MathRenderer content={option.text || ''} />
                </span>
                {#if option.id === selectedQuestion.correctOptionId}
                  <span class="ml-auto text-emerald-400 text-xs uppercase tracking-widest">✓ Correcta</span>
                {/if}
              </li>
            {/each}
          </ul>
        </div>

        <!-- Explanation -->
        {#if selectedQuestion.explanation}
          <div class="bg-indigo-500/10 border border-indigo-500/20 p-5 rounded-xl">
            <h3 class="text-sm font-bold text-indigo-400 mb-3 flex items-center gap-2">
              <span>💡</span> Explicación
            </h3>
            <div class="text-white/80 leading-relaxed whitespace-pre-line">
              <MathRenderer content={selectedQuestion.explanation} />
            </div>
          </div>
        {/if}

        {#if true}
          {@const videoMeta = getVideoForQuestion(selectedQuestion.id)}
          {@const youtubeTarget = videoMeta?.youtube_url || videoDefaults.youtube_channel_url}
          {#if youtubeTarget}
            <div class="bg-red-500/10 border border-red-500/20 p-5 rounded-xl">
              <h3 class="text-sm font-bold text-red-300 mb-3 flex items-center gap-2">
                <span>🎬</span> Explicación en Video
              </h3>
              <div class="flex flex-wrap items-center gap-3">
                <a
                  href={youtubeTarget}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                >
                  {videoMeta?.youtube_url ? 'Ver en YouTube' : 'Ver Canal en YouTube'}
                </a>
                {#if videoMeta?.instagram_url || videoDefaults.instagram_url}
                  <a
                    href={videoMeta?.instagram_url || videoDefaults.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-4 py-2 bg-pink-600/80 hover:bg-pink-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                  >
                    Instagram
                  </a>
                {/if}
                {#if videoMeta?.tiktok_url || videoDefaults.tiktok_url}
                  <a
                    href={videoMeta?.tiktok_url || videoDefaults.tiktok_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-4 py-2 bg-black/70 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-white/20 transition-colors"
                  >
                    TikTok
                  </a>
                {/if}
              </div>
            </div>
          {:else}
            <div class="bg-white/5 border border-white/10 p-5 rounded-xl">
              <h3 class="text-sm font-bold text-white/70 mb-2 flex items-center gap-2">
                <span>🎬</span> Explicación en Video
              </h3>
              <p class="text-xs text-white/50">Video en generación para esta pregunta.</p>
            </div>
          {/if}
        {/if}

        <!-- Context if available -->
        {#if selectedQuestion.context}
          <div class="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl">
            <h3 class="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
              <span>📖</span> Contexto
            </h3>
            <div class="text-white/70 leading-relaxed whitespace-pre-line text-sm">
              <MathRenderer content={selectedQuestion.context} />
            </div>
          </div>
        {/if}
      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t border-white/10 flex justify-end gap-3 shrink-0">
        <button
          onclick={() => selectedQuestion = null}
          class="px-4 py-2 hover:bg-white/10 text-white/60 hover:text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all"
        >
          Cerrar
        </button>
        <button
          onclick={() => {
            if (selectedQuestion) {
              onSelect(selectedQuestion);
              selectedQuestion = null;
            }
          }}
          class="px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-emerald-500/20"
        >
          Ver Pantalla Completa
        </button>
      </div>
    </div>
  </div>
{/if}
