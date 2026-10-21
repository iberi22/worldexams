<script lang="ts">
  import { onMount } from 'svelte';
  import FlashlightCard from './FlashlightCard.svelte';
  import AdBlock from './AdBlock.svelte';
  import MathRenderer from './MathRenderer.svelte';
  import type { Question } from '../types';
  import { loadVideoManifest, getVideoManifestDefaults, type VideoManifestEntry } from '../lib/video-manifest';
  import ThreadedExplanation from './community/ThreadedExplanation.svelte';
  import CorrectionThread from './corrections/CorrectionThread.svelte';
  import BancoPractice from './banco/BancoPractice.svelte';
  import { buildPublicQuestionUrl } from '../lib/banco/permalink';
  import { adIntervalFor, withAds, MOBILE_MAX_WIDTH } from '../lib/banco/practice';
  import { focusTrap } from '../lib/banco/focus-trap';

  export let questions: Question[] = [];
  export let onSelect: (question: Question) => void = () => {};
  export let onBack: () => void;
  export let initialSubjectFilter: string | null = null; // 🆕 Pre-filter from LocalReportsView
  export let onGradeChange: ((grade: number | null) => Promise<void>) | null = null; // 🆕 Callback for dynamic grade loading
  export let isLoading: boolean = false; // 🆕 Loading state from parent
  export let loadError: string | null = null; // Error message when the bank could not be loaded

  let searchTerm = "";
  let debouncedSearchTerm = "";
  let searchTimeout: ReturnType<typeof setTimeout>;

  function updateDebouncedSearchTerm(val: string) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      debouncedSearchTerm = val;
    }, 300);
  }

  $: updateDebouncedSearchTerm(searchTerm);

  let selectedGrade: number | null = 11; // 🆕 Default to grade 11
  let selectedDifficulty: number | null = null;
  let selectedSubject: string | null = null; // 🆕 Will be set reactively after subjects load

  // 🆕 Modal state for viewing question details
  let selectedQuestion: Question | null = null;
  let modalTab = 'official'; // 'official' | 'community' | 'correction'
  let videoByQuestionId: Record<string, VideoManifestEntry> = {};
  let videoDefaults: { youtube_channel_url?: string; instagram_url?: string; tiktok_url?: string } = {};
  let commentCounts: Record<string, number> = {};

  function normalizeQuestionId(questionId: string | number): string {
    return String(questionId || '').trim().toLowerCase();
  }

  function getVideoForQuestion(questionId: string | number): VideoManifestEntry | null {
    const key = normalizeQuestionId(questionId);
    return videoByQuestionId[key] || null;
  }

  async function hydrateCommentCounts(ids: Array<string | number>) {
    const unique = [...new Set(ids.map((id) => String(id)).filter(Boolean))].slice(0, 80);
    if (unique.length === 0) return;
    try {
      const res = await fetch(`/api/comments?counts=${encodeURIComponent(unique.join(','))}`);
      if (!res.ok) return;
      const body = await res.json();
      commentCounts = { ...commentCounts, ...(body.counts || {}) };
    } catch (err) {
      console.warn('BlogView: comment counts unavailable', err);
    }
  }

  // Ads: 1 per 6 cards on desktop, never more than 1 per 12 cards on mobile.
  // Start with the mobile-safe interval until the viewport is known.
  let isMobileViewport = true;

  onMount(() => {
    let mql: MediaQueryList | null = null;
    const syncViewport = () => { isMobileViewport = mql ? mql.matches : false; };
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      mql = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
      mql.addEventListener?.('change', syncViewport);
    }
    syncViewport();

    void (async () => {
      try {
        const manifest = await loadVideoManifest();
        videoDefaults = await getVideoManifestDefaults();
        const lookup: Record<string, VideoManifestEntry> = {};
        for (const [key, value] of manifest.entries()) {
          lookup[key] = value;
        }
        videoByQuestionId = lookup;
      } catch (err) {
        console.error('BlogView: video manifest unavailable', err);
      }
    })();

    return () => mql?.removeEventListener?.('change', syncViewport);
  });

  function openQuestion(question: Question) {
    selectedQuestion = question;
    modalTab = 'official';
  }

  function closeModal() {
    selectedQuestion = null;
  }

  // Normalize subject for comparison (removes accents, standardizes separators)
  // Handles ALL variants: "lectura-critica", "lectura_critica", "lectura crítica"
  function normalizeSubject(subject: string): string {
    if (!subject) return '';
    let norm = String(subject || '')
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[-_\s]+/g, ' ')        // Standardize separators
      .trim();

    // Grouping variants — explicit checks for all forms
    if (norm === 'MATEMATICAS' || norm === 'MATEMATICA' || norm === 'MATH') return 'MATEMATICAS';
    if (norm === 'LECTURA CRITICA' || norm === 'LECTURA' || norm === 'LENGUAJE' || norm === 'ESPANOL' || norm === 'ESPAÑOL') return 'LECTURA CRITICA';
    if (norm === 'CIENCIAS NATURALES' || norm === 'CIENCIAS') return 'CIENCIAS NATURALES';
    if (norm === 'SOCIALES Y CIUDADANAS' || norm === 'SOCIALES CIUDADANAS' || norm === 'SOCIALES' || norm === 'CIUDADANAS') return 'SOCIALES Y CIUDADANAS';
    if (norm === 'INGLES' || norm === 'INGLÉS') return 'INGLES';
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
    // Lenguaje / Lectura
    'LENGUAJE': ['LECTURA CRITICA', 'LECTURA_CRITICA', 'LECTURA-CRITICA', 'LECTURA', 'ESPAÑOL', 'ESPANOL'],
    'ESPAÑOL': ['LECTURA CRITICA', 'LECTURA_CRITICA', 'LENGUAJE', 'LECTURA'],
    'LECTURA': ['LECTURA CRITICA', 'LECTURA_CRITICA', 'ESPAÑOL', 'ESPANOL', 'LENGUAJE'],
    // Matemáticas
    'MATEMATICAS': ['MATEMATICA', 'MATH'],
    'MATEMATICA': ['MATEMATICAS', 'MATH'],
    'MATH': ['MATEMATICAS', 'MATEMATICA'],
    // Ciencias
    'CIENCIAS NATURALES': ['CIENCIAS', 'CIENCIAS_NATURALES', 'CIENCIAS-NATURALES'],
    'CIENCIAS': ['CIENCIAS NATURALES', 'CIENCIAS_NATURALES'],
    // Sociales
    'SOCIALES Y CIUDADANAS': ['SOCIALES CIUDADANAS', 'SOCIALES_Y_CIUDADANAS', 'SOCIALES', 'CIUDADANAS'],
    'SOCIALES': ['SOCIALES Y CIUDADANAS', 'SOCIALES CIUDADANAS', 'SOCIALES_Y_CIUDADANAS'],
    'SOCIALES CIUDADANAS': ['SOCIALES Y CIUDADANAS', 'SOCIALES', 'SOCIALES_Y_CIUDADANAS'],
    'CIUDADANAS': ['SOCIALES Y CIUDADANAS', 'SOCIALES CIUDADANAS', 'SOCIALES'],
    // Inglés
    'INGLES': ['INGLÉS'],
    'INGLÉS': ['INGLES'],
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
      if (aliasMatch) return aliasMatch;
    }

    // Partial match (contains)
    const partialMatch = availableSubjects.find(s =>
      normalizeSubject(s).includes(normalizedFilter) ||
      normalizedFilter.includes(normalizeSubject(s))
    );
    if (partialMatch) return partialMatch;

    return null; // No match found, clear filter
  }

  // Extract unique subjects with display names (filter out invalid questions first)
  $: rawSubjects = [...new Set(questions
    .filter(q => q && q.category && typeof q.category === 'string')
    .map(q => q.category.split('::')[0].trim())
  )];
  $: subjects = [...new Map(rawSubjects.map(s => [normalizeSubject(String(s)), String(s)])).values()].sort();

  // 🆕 Map initialSubjectFilter to a valid subject once subjects are available
  let hasAppliedInitialFilter = false;
  $: if (initialSubjectFilter && subjects.length > 0 && !hasAppliedInitialFilter) {
    // No match: show all subjects
    selectedSubject = findMatchingSubject(initialSubjectFilter, subjects);
    hasAppliedInitialFilter = true;
  }

  // Check if subjects match (handles naming variations)
  function subjectsMatch(category: string | undefined, selected: string | null): boolean {
    if (!selected) return true;
    if (!category) return false;
    const categorySubject = String(category || '').split('::')[0].trim();
    return normalizeSubject(categorySubject) === normalizeSubject(String(selected || ''));
  }

  // Normalize string for search (remove accents, lowercase)
  function normalizeForSearch(str: string): string {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  $: normalizedSearchTerm = normalizeForSearch(debouncedSearchTerm);

  $: filteredQuestions = (() => {
    // ⚡ Bolt Optimization: Use an external Set for O(1) tracking instead of O(N^2) array.findIndex() in loop
    // This dramatically improves search/filtering responsiveness on large question banks
    const seenIds = new Set<string>();
    return questions.filter((q) => {
    // Skip invalid questions
    if (!q || !q.category) return false;

    // Deduplicate by ID
    if (seenIds.has(q.id)) return false;
    seenIds.add(q.id);

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

    const matchesSearch = !debouncedSearchTerm || searchTarget.includes(normalizedSearchTerm);

    return matchesSearch && matchesGrade && matchesDifficulty && matchesPeriod && matchesSubject;
    });
  })();

  function clearSearch() {
    searchTerm = "";
  }

  $: itemsToRender = withAds(filteredQuestions, adIntervalFor(isMobileViewport));

  // Pagination logic
  let visibleCount = 30;

  // Reset pagination when filters change
  $: {
    debouncedSearchTerm; selectedGrade; selectedDifficulty; selectedSubject; selectedPeriod;
    visibleCount = 30;
  }

  $: visibleItems = itemsToRender.slice(0, visibleCount);

  $: {
    const ids = visibleItems
      .filter((item) => item.type === 'question' && item.data?.id)
      .map((item) => item.data!.id);
    if (ids.length > 0) {
      void hydrateCommentCounts(ids);
    }
  }

  function loadMore() {
    visibleCount += 30;
  }

  const grades = [3, 5, 6, 7, 8, 9, 10, 11];
  const difficulties = [1, 2, 3, 4, 5];
  const periods = [1, 2, 3, 4];
  let selectedPeriod: number | null = null;
  const skeletonCards = Array.from({ length: 6 }, (_, i) => i);

  $: selectedPermalink = selectedQuestion ? buildPublicQuestionUrl(selectedQuestion) : null;
  $: selectedVideo = selectedQuestion ? getVideoForQuestion(selectedQuestion.id) : null;
</script>

<div class="w-full max-w-6xl mx-auto p-4 animate-fade-in-up pb-20">
  <div class="flex items-center justify-between mb-8">
    <h2 class="text-4xl font-bold uppercase tracking-tighter text-[#F5F5DC]">
      Revisar / <span class="text-emerald-500">Banco social</span>
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
        <span id="grade-label" class="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1 block">Grado Escolar</span>
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
        <span id="difficulty-label" class="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1 block">Nivel de Complejidad</span>
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
        <span id="period-label" class="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1 block">Período Académico</span>
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
    <div class="text-sm text-white/40 uppercase tracking-widest" aria-live="polite">
      {#if isLoading}
        Cargando preguntas…
      {:else}
        {filteredQuestions.length} {filteredQuestions.length === 1 ? 'resultado' : 'resultados'}
      {/if}
    </div>
  </div>

  {#if isLoading}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true" aria-label="Cargando banco social">
      {#each skeletonCards as i (i)}
        <div class="h-64 p-6 rounded-xl border border-white/10 bg-[#1E1E1E]/40 animate-pulse flex flex-col gap-4" data-testid="banco-skeleton">
          <div class="h-3 w-1/3 rounded bg-white/10"></div>
          <div class="h-4 w-full rounded bg-white/10"></div>
          <div class="h-4 w-5/6 rounded bg-white/10"></div>
          <div class="h-4 w-2/3 rounded bg-white/10"></div>
          <div class="mt-auto h-3 w-1/2 rounded bg-white/5"></div>
        </div>
      {/each}
    </div>
  {:else if loadError}
    <div class="text-center py-20 border border-red-500/30 rounded-2xl bg-red-500/5" role="alert" data-testid="banco-error">
      <div class="text-6xl mb-4 opacity-40" aria-hidden="true">⚠️</div>
      <h3 class="text-xl font-bold text-white/70 mb-2">No pudimos cargar el banco de preguntas</h3>
      <p class="text-white/50 max-w-md mx-auto">{loadError}</p>
      <p class="text-white/40 max-w-md mx-auto mt-2 text-sm">Revisa tu conexión e inténtalo de nuevo en unos minutos.</p>
    </div>
  {:else if questions.length === 0}
    <div class="text-center py-20 border border-white/10 rounded-2xl bg-[#1E1E1E]/30 border-dashed" data-testid="banco-empty">
      <div class="text-6xl mb-4 opacity-20" aria-hidden="true">📚</div>
      <h3 class="text-xl font-bold text-white/60 mb-2">Aún no hay preguntas para mostrar</h3>
      <p class="text-white/40 max-w-md mx-auto">
        Este banco todavía no tiene preguntas para tu selección. Prueba con otro grado o vuelve pronto.
      </p>
    </div>
  {:else if filteredQuestions.length === 0}
    <div class="text-center py-20 border border-white/10 rounded-2xl bg-[#1E1E1E]/30 border-dashed" data-testid="banco-no-results">
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
          {@const permalink = buildPublicQuestionUrl(item.data)}
          <div class="flex flex-col gap-2" data-testid="banco-card">
            <FlashlightCard
              onClick={() => openQuestion(item.data)}
              className="p-6 flex flex-col justify-between group h-64 hover:border-emerald-500/50 transition-transform duration-300 hover:scale-[1.02]"
            >
              <div class="flex flex-col h-full">
                <div class="flex justify-between items-start mb-2">
                  <div class="text-xs font-bold uppercase tracking-widest text-emerald-500">
                    {item.data?.category}
                  </div>
                  <div class="flex items-center gap-2">
                    <span
                      class="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-mono"
                      data-testid="badge-contributions"
                    >
                      {commentCounts[String(item.data?.id)] || 0} aportes
                    </span>
                    <div class="text-[10px] font-mono text-white/30">
                      {item.data?.id}
                    </div>
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
                  <button
                    type="button"
                    onclick={(e) => {
                      e.stopPropagation();
                      if (item.data) {
                        onSelect(item.data);
                      }
                    }}
                    class="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1 cursor-pointer"
                    data-testid="btn-debatir-comunidad"
                  >
                    Debatir en Comunidad
                  </button>
                </div>
              </div>
            </FlashlightCard>
            {#if permalink}
              <a
                href={permalink}
                class="self-end text-[11px] font-bold uppercase tracking-wider text-white/50 hover:text-emerald-400 underline-offset-4 hover:underline transition-colors"
                data-testid="banco-permalink"
              >
                Abrir página pública ↗
              </a>
            {/if}
          </div>
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
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    onclick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
  >
    <div
      class="bg-[#1E1E1E] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden focus:outline-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="question-modal-title"
      tabindex="-1"
      data-testid="banco-modal"
      use:focusTrap={{ onEscape: closeModal }}
    >
      <!-- Modal Header -->
      <div class="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-emerald-900/30 to-transparent shrink-0">
        <div class="flex items-center gap-3">
          <span id="question-modal-title" class="text-xs font-bold uppercase tracking-widest text-emerald-500">
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
            onclick={closeModal}
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
        <!-- Context (reading passage) is needed to answer, so it goes first -->
        {#if selectedQuestion.context}
          <div class="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl">
            <h3 class="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
              <span aria-hidden="true">📖</span> Contexto
            </h3>
            <div class="text-white/70 leading-relaxed whitespace-pre-line text-sm">
              <MathRenderer content={selectedQuestion.context} />
            </div>
          </div>
        {/if}

        <!-- Question Text -->
        <div class="text-xl md:text-2xl font-bold leading-relaxed text-[#F5F5DC]">
          <MathRenderer content={selectedQuestion.text || '(Sin contenido)'} />
        </div>

        <!-- Modal Tabs Selector -->
        <div class="flex flex-wrap gap-2 border-b border-white/10 pb-3" data-testid="modal-tabs">
          <button
            type="button"
            onclick={() => (modalTab = 'official')}
            class={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              modalTab === 'official'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
            data-testid="modal-tab-official"
          >
            📝 Practicar
          </button>
          <button
            type="button"
            onclick={() => (modalTab = 'community')}
            class={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              modalTab === 'community'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
            data-testid="modal-tab-community"
          >
            💬 Debate Comunitario
          </button>
          <button
            type="button"
            onclick={() => (modalTab = 'correction')}
            class={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              modalTab === 'correction'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
            data-testid="modal-tab-correction"
          >
            🛠️ Proponer Corrección
          </button>
        </div>

        {#if modalTab === 'official'}
          <!-- Practice-first: options start neutral; answer + explanation appear after choosing or revealing -->
          {#key selectedQuestion.id}
            <BancoPractice question={selectedQuestion} />
          {/key}

          {#if selectedVideo?.youtube_url}
            <div class="bg-red-500/10 border border-red-500/20 p-5 rounded-xl">
              <h3 class="text-sm font-bold text-red-300 mb-3 flex items-center gap-2">
                <span aria-hidden="true">🎬</span> Explicación en Video
              </h3>
              <div class="flex flex-wrap items-center gap-3">
                <a
                  href={selectedVideo.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                >
                  Ver en YouTube
                </a>
                {#if selectedVideo.instagram_url || videoDefaults.instagram_url}
                  <a
                    href={selectedVideo.instagram_url || videoDefaults.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-4 py-2 bg-pink-600/80 hover:bg-pink-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                  >
                    Instagram
                  </a>
                {/if}
                {#if selectedVideo.tiktok_url || videoDefaults.tiktok_url}
                  <a
                    href={selectedVideo.tiktok_url || videoDefaults.tiktok_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-4 py-2 bg-black/70 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-white/20 transition-colors"
                  >
                    TikTok
                  </a>
                {/if}
              </div>
            </div>
          {/if}
        {:else if modalTab === 'community'}
          <div data-testid="modal-content-community">
            <ThreadedExplanation
              explanationId={`exp-${selectedQuestion.id}`}
              questionId={String(selectedQuestion.id)}
              explanationContent={selectedQuestion.explanation || ''}
            />
          </div>
        {:else if modalTab === 'correction'}
          <div data-testid="modal-content-correction">
            <CorrectionThread
              initialQuestionId={String(selectedQuestion.id)}
              initialBundlePath={selectedQuestion.bundleId ? `questions_data/bundle-${selectedQuestion.bundleId}.md` : `questions_data/bundle-${selectedQuestion.id}.md`}
            />
          </div>
        {/if}
      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t border-white/10 flex flex-col sm:flex-row sm:justify-end sm:items-center gap-3 shrink-0">
        {#if selectedPermalink}
          <a
            href={selectedPermalink}
            class="sm:mr-auto px-4 py-2 text-center text-white/60 hover:text-emerald-400 font-bold text-xs uppercase tracking-widest rounded-lg border border-white/10 hover:border-emerald-500/40 transition-all"
            data-testid="banco-modal-permalink"
          >
            Abrir página pública ↗
          </a>
        {/if}
        <button
          onclick={closeModal}
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
          {#if (commentCounts[String(selectedQuestion.id)] || 0) > 0}
            Discutir ({commentCounts[String(selectedQuestion.id)]})
          {:else}
            Abrir discusión
          {/if}
        </button>
      </div>
    </div>
  </div>
{/if}
