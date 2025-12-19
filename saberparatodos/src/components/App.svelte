<script>
  import { onMount } from 'svelte';
  import { AppView } from '../types';
  import { fade, fly } from 'svelte/transition';
  import ExamView from './ExamView.svelte';
  import Leaderboard from './Leaderboard.svelte';
  import LeaderboardView from './LeaderboardView.svelte';
  import IdentityRegistration from './IdentityRegistration.svelte';
  import FlashlightCard from './FlashlightCard.svelte';
  import GradeSelector from './GradeSelector.svelte';
  import SubjectSelector from './SubjectSelector.svelte';
  import ResultsView from './ResultsView.svelte';
  import AdvancedSearch from './AdvancedSearch.svelte';
  import MemoryStatus from './MemoryStatus.svelte';
  import Login from './Login.svelte';
  import ExamConfigModal from './ExamConfigModal.svelte'; // New import

  import { supabase } from '../lib/supabase';
  import { getLocalIdentity } from '../lib/identity';
  import {
    filterUnansweredQuestions,
    markQuestionsAnswered,
    getMemoryStats
  } from '../lib/question-memory';

  import BlogView from './BlogView.svelte';
  import ArticleView from './ArticleView.svelte';
  import { fetchAllQuestionsForGrade, getAvailableSubjects, fetchQuestions } from '../lib/api-service'; // Added fetchQuestions
  import { cacheService, generateRandomExam, getRecommendedExamSize } from '../lib/cache-service'; // Cache service
  import { filterByPlan } from '../utils/questionParser';
  import { generateSmartExam } from '../lib/smart-exam-service'; // Smart Service
  import IntegrityIntro from './IntegrityIntro.svelte'; // New Component
  import { getPWAStatus, getRecommendedCacheSize, getCacheExpiryHours } from '../lib/pwa-detector'; // PWA Detection
  import packageInfo from '../../package.json';

  // Normalize subject name for comparison (removes accents, replaces separators)
  function normalizeSubject(subject) {
    if (!subject) return '';
    return subject
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[-_]/g, ' ')           // Replace hyphens/underscores with space
      .trim();
  }

  // Check if two subjects match (handles different naming conventions)
  function subjectsMatch(categorySubject, selectedSubject) {
    if (!selectedSubject) return true;
    const normalizedCategory = normalizeSubject(categorySubject.split(' :: ')[0]);
    const normalizedSelected = normalizeSubject(selectedSubject);
    return normalizedCategory === normalizedSelected ||
           normalizedCategory.startsWith(normalizedSelected) ||
           normalizedSelected.startsWith(normalizedCategory);
  }

  export let questions = [];
  export let universalPool = null; // New prop for universal questions pool

  // Internal state that can be updated
  let loadedQuestions = questions || []; // Safety check
  let availableSubjects = []; // New state
  let isLoadingQuestions = false;
  let loadError = null;
  let showExamConfigModal = false; // New state
  let isIntegrityCheck = false; // Integrity check state
  let generatedExamQuestions = null; // Store smart generated questions
  let examConfig = { count: 10, mode: 'SOLO' }; // New state

  console.log('App received questions:', questions?.length || 0);
  console.log('App received universalPool:', universalPool?.totalQuestions || 0);

  let view = AppView.LANDING;
  let lastExamData = null; // Changed from lastScore
  let userAnswers = {};
  let selectedSubject = null;
  let selectedGrade = null;
  let selectedArticle = null;
  let user = null;
  let showRegistrationModal = false;
  let cacheWasCleared = false; // Track if cache was just cleared
  let isPWA = false; // PWA detection state
  let pwaStatus = { isPWA: false, displayMode: 'browser', isInstallable: false }; // PWA status
  let memoryStats = { answeredCount: 0, totalAvailable: 0, percentAnswered: 0 };
  let isGuest = true; // Guest status (true if user is not authenticated)
  let buildInfo = null; // Build info (version, commit, date)

  // User plan (free or institutional)
  // TODO: Integrar con Supabase user_metadata cuando se implemente backend auth
  let userPlan = 'free'; // Por defecto, usuarios son free (solo v1)

  // Configurable percentage of universal questions (0-100)
  const UNIVERSAL_QUESTION_PERCENTAGE = 30;
  const MIN_LOCAL_QUESTIONS = 5;
  let MAX_EXAM_QUESTIONS = 10; // Max questions per exam (now dynamic)

  // Load subjects from API when grade is selected
  async function loadSubjectsFromAPI(grade) {
    try {
      console.log(`🌐 Loading subjects for grade ${grade}...`);
      const subjects = await getAvailableSubjects(grade);
      availableSubjects = subjects.map(s => s.toUpperCase()); // Normalize
      console.log(`✅ Loaded ${subjects.length} subjects`);
    } catch (err) {
      console.error('Error loading subjects:', err);
    }
  }

  // Load questions from API (Lazy load)
  async function loadQuestionsForExam(grade, subject) {
    if (isLoadingQuestions) return;

    isLoadingQuestions = true;
    loadError = null;

    try {
      console.log(`🔍 Checking cache for grade ${grade}...`);

      // 1️⃣ Try to load from IndexedDB cache first
      const cachedPool = await cacheService.getQuestionPool(grade);

      if (cachedPool && cachedPool.questions.length > 0) {
        console.log(`✅ Using ${cachedPool.questionCount} cached questions`);
        loadedQuestions = cachedPool.questions;

        // Show cache info to user
        const cacheAge = Math.floor((Date.now() - cachedPool.timestamp) / 1000 / 60);
        console.log(`📦 Cache age: ${cacheAge} minutes`);

        isLoadingQuestions = false;
        return;
      }

      // 2️⃣ No cache found - fetch from API
      console.log(`🌐 Loading questions from API for grade ${grade}...`);

      // Calculate cache size based on context
      const cacheSize = getRecommendedCacheSize(!isGuest, isPWA);
      const expiryHours = getCacheExpiryHours(isPWA);

      console.log(`📊 Cache Strategy: ${!isGuest ? (isPWA ? '📱 PWA+Auth' : '🔓 Auth') : '🔒 Guest'} → ${cacheSize} questions (${expiryHours}h expiry)`);

      // Fetch with intelligent limit
      const apiQuestions = await fetchAllQuestionsForGrade(grade, isGuest, cacheSize);

      if (apiQuestions && apiQuestions.length > 0) {
        loadedQuestions = apiQuestions;

        // 3️⃣ Save to cache for future use (with context-aware settings)
        await cacheService.saveQuestionPool(grade, apiQuestions, isGuest, isPWA, cacheSize, expiryHours);

        console.log(`✅ Loaded and cached ${apiQuestions.length} questions`);
        if (isPWA && !isGuest) {
          console.log('📱 PWA Mode: Cached 420 questions for 7 days of exams!');
        } else if (!isGuest) {
          console.log('🔓 Auth Mode: Cached 200 questions for practice');
        } else {
          console.log('🔒 Guest Mode: Limited to 100 questions');
        }
      } else {
        console.warn(`⚠️ No questions found for grade ${grade}`);
        loadError = `No se encontraron preguntas para el grado ${grade}`;
      }
    } catch (err) {
      console.error('Error loading questions:', err);
      loadError = 'Error al cargar las preguntas. Por favor intenta de nuevo.';
    } finally {
      isLoadingQuestions = false;
    }
  }

  onMount(async () => {
    // Load build info (with timeout and error handling)
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout

      const response = await fetch('/build-info.json', {
        signal: controller.signal,
        cache: 'no-cache' // Always fresh
      });

      clearTimeout(timeout);

      if (response.ok) {
        buildInfo = await response.json();
        console.log('✅ Build info loaded:', buildInfo?.commit?.substring(0, 7));
      } else {
        console.log('⚠️ Build info not available (status:', response.status, ')');
      }
    } catch (e) {
      if (e.name === 'AbortError') {
        console.warn('⏱️ Build info request timeout (3s)');
      } else {
        console.warn('❌ Could not load build info:', e.message);
      }
    }

    // Check for active session
    const { data: { session } } = await supabase.auth.getSession();
    user = session?.user || null;
    isGuest = !user; // Update guest status based on authentication

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      user = session?.user || null;
      isGuest = !user; // Update guest status when auth state changes
    });

    // Check localStorage for grade preference
    const savedGrade = localStorage.getItem('saberparatodos_grade');
    if (savedGrade) {
      selectedGrade = parseInt(savedGrade);
    } else {
      selectedGrade = 11; // Default
    }

    // Load subjects for the selected grade
    await loadSubjectsFromAPI(selectedGrade);

    // Load memory stats
    memoryStats = getMemoryStats(loadedQuestions.length);

    return () => subscription.unsubscribe();
  });

  // Filter loaded questions by grade and subject (handles naming variations)
  $: filteredLocalQuestions = loadedQuestions.filter(q => {
    if (!q) return false;
    const gradeMatch = selectedGrade ? q.grade === selectedGrade : true;
    const subjectMatch = subjectsMatch(q.category, selectedSubject);
    return gradeMatch && subjectMatch;
  });

  // Filter by user plan (free = solo v1, institutional = v1-v7)
  $: planFilteredQuestions = filterByPlan(filteredLocalQuestions, userPlan);

  // Mix local and universal questions, then filter out already answered ones
  // Usar planFilteredQuestions en lugar de filteredLocalQuestions para respetar licencias
  // If we have generatedExamQuestions (Smart Service), use them. Otherwise fallback to legacy logic.
  $: examQuestions = generatedExamQuestions || prepareExamQuestions(planFilteredQuestions, universalPool, selectedGrade, selectedSubject, MAX_EXAM_QUESTIONS);

  /**
   * Prepare exam questions: mix local with universal, then filter already answered
   */
  function prepareExamQuestions(localQuestions, pool, grade, subject, maxQuestions) {
    const mixed = mixQuestionsForExam(localQuestions, pool, grade, subject);

    // Filter out already answered questions (prioritize unanswered)
    const { filtered, hadToRepeat } = filterUnansweredQuestions(mixed, maxQuestions);

    if (hadToRepeat) {
      console.log('⚠️ Some questions are repeated (not enough new ones)');
    }

    return filtered;
  }

  /**
   * Mix local questions with universal questions from the pool
   */
  function mixQuestionsForExam(localQuestions, pool, grade, subject) {
    // If no pool or no local questions, return local only
    if (!pool || !pool.all || pool.all.length === 0 || localQuestions.length === 0) {
      return shuffleArray([...localQuestions]);
    }

    // Don't mix universal questions for subjects that require local context
    const excludedSubjects = ['SOCIALES', 'CIUDADANAS', 'HISTORIA'];
    if (subject && excludedSubjects.some(s => subject.toUpperCase().includes(s))) {
      console.log('Subject excluded from universal mixing:', subject);
      return shuffleArray([...localQuestions]);
    }

    // Calculate how many universal questions to add
    const targetCount = localQuestions.length;
    const maxUniversal = Math.floor(targetCount * (UNIVERSAL_QUESTION_PERCENTAGE / 100));
    const minLocal = Math.max(MIN_LOCAL_QUESTIONS, targetCount - maxUniversal);

    // Filter universal questions by criteria
    let universalCandidates = [...pool.all];

    // Filter by grade if specified
    if (grade && pool.byGrade && pool.byGrade[grade]) {
      universalCandidates = pool.byGrade[grade];
    }

    // Filter by subject if specified (case insensitive)
    if (subject && pool.bySubject) {
      const subjectKey = Object.keys(pool.bySubject).find(
        k => k.toUpperCase().includes(subject.toUpperCase()) ||
             subject.toUpperCase().includes(k.toUpperCase())
      );
      if (subjectKey) {
        universalCandidates = pool.bySubject[subjectKey];
      }
    }

    // Get IDs of local questions to avoid duplicates
    const localIds = new Set(localQuestions.map(q => q.id));
    universalCandidates = universalCandidates.filter(q => !localIds.has(q.id));

    // Shuffle and select universal questions
    const shuffledUniversal = shuffleArray(universalCandidates);
    const universalToAdd = shuffledUniversal.slice(0, maxUniversal);

    console.log(`Mixing: ${localQuestions.length} local + ${universalToAdd.length} universal`);

    // Combine and shuffle
    const mixed = [...localQuestions, ...universalToAdd];
    return shuffleArray(mixed);
  }

  /**
   * Fisher-Yates shuffle
   */
  function shuffleArray(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  // Updated to receive ExamCompletionData and save to memory
  async function handleExamFinish(examData, answers) {
    lastExamData = examData;
    userAnswers = answers;
    view = AppView.RESULTS;

    // Null-safe access to questions array
    const safeQuestions = examData?.questions || [];

    // Save answered questions to memory (for avoiding repetition)
    const questionsForMemory = safeQuestions.map(q => ({
      id: q?.questionId,
      isCorrect: q?.isCorrect || false,
      subject: examData?.subject || 'GENERAL',
      grade: examData?.grade,
      difficulty: q?.difficulty || 3
    }));

    const memoryResult = markQuestionsAnswered(questionsForMemory, loadedQuestions.length);

    if (memoryResult.cacheCleared) {
      cacheWasCleared = true;
      console.log('🔄 Cache cleared! User has answered >70% of questions. Fresh start!');
    }

    // Update memory stats
    memoryStats = getMemoryStats(loadedQuestions.length);

    // Save to Supabase ONLY if logged in
    if (user) {
      try {
        const correctCount = safeQuestions.filter(q => q?.isCorrect).length;
        const { error } = await supabase.from('exam_results').insert({
          user_id: user.id,
          user_name: user.email?.split('@')[0] || 'Anonymous',
          score: correctCount * 100, // Simple score for DB
          total_questions: safeQuestions.length,
          subject: examData?.subject || 'GENERAL',
          grade: examData?.grade
        });

        if (error) console.error('Error saving result:', error);
      } catch (e) {
        console.error('Error saving result:', e);
      }
    } else {
      console.log('Guest user finished exam. Results not saved to cloud.');
    }
  }

  function setView(newView) {
    view = newView;
  }

  async function handleGradeSelect(grade) {
    selectedGrade = grade;
    localStorage.setItem('saberparatodos_grade', grade.toString());

    // Load subjects for the new grade
    await loadSubjectsFromAPI(grade);

    setView(AppView.SUBJECT_SELECTION);
  }

  function handleSubjectSelect(subject) {
    if (subject === 'CHANGE_GRADE') {
      localStorage.removeItem('saberparatodos_grade');
      selectedGrade = null;
      setView(AppView.GRADE_SELECTION);
      return;
    }

    // Set subject and open config modal
    selectedSubject = subject;
    showExamConfigModal = true;
  }

  async function handleExamConfigStart(config) {
    showExamConfigModal = false;
    examConfig = config;
    MAX_EXAM_QUESTIONS = config.count;

    if (config.mode === 'PARTY') {
      // Redirect to Party Mode
      window.location.href = '/party';
      return;
    }

    // SOLO Mode: Start Integrity Check + Smart Fetch
    isIntegrityCheck = true;
    // Note: isLoadingQuestions is managed by loadQuestionsForExam internally
    generatedExamQuestions = null; // Reset

    // Minimum time for animation (3.5s to read messages)
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 3500));

    try {
      console.log(`🤖 Starting Exam Generation (Count: ${config.count})...`);

      // 1️⃣ Load questions from cache (or API if first time)
      await loadQuestionsForExam(selectedGrade, selectedSubject);

      // 2️⃣ Generate random exam from cached pool (NO API CALLS)
      const availableQuestions = loadedQuestions.filter(q => {
        if (!q) return false;
        const gradeMatch = selectedGrade ? q.grade === selectedGrade : true;
        // Use subjectsMatch helper for proper accent normalization
        const subjectMatch = subjectsMatch(q.category, selectedSubject);
        return gradeMatch && subjectMatch;
      });

      console.log(`📊 Available questions in pool: ${availableQuestions.length}`);

      // Use cache service to generate random exam (pool is already filtered above)
      const examQuestions = generateRandomExam(
        availableQuestions,
        config.count
      );

      // Wait for animation to finish
      await minTimePromise;

      if (examQuestions && examQuestions.length > 0) {
        generatedExamQuestions = examQuestions;
        console.log(`✅ Exam Ready: ${examQuestions.length} questions (0 API calls)`);
        // IntegrityIntro will detect loading=false and dispatch complete
        isLoadingQuestions = false;
      } else {
        console.warn("⚠️ No questions available for this subject/grade combination");
        throw new Error("No hay preguntas disponibles. Por favor, intenta con otra asignatura.");
      }
    } catch (error) {
      console.error('Error generating exam:', error);
      alert(error.message || 'Error al generar el examen. Por favor intenta de nuevo.');
      isIntegrityCheck = false;
      isLoadingQuestions = false;
      setView(AppView.SUBJECT_SELECTION);
    }
  }



  function handleArticleSelect(article) {
    selectedArticle = article;
    setView(AppView.ARTICLE);
  }

  function handleStart() {
    if (selectedGrade) {
      setView(AppView.SUBJECT_SELECTION);
    } else {
      setView(AppView.GRADE_SELECTION);
    }
  }

  function handleRegistrationComplete() {
    showRegistrationModal = false;
  }
</script>

<div class="min-h-screen bg-[#121212] text-[#F5F5DC] font-mono selection:bg-emerald-500/30 overflow-x-hidden">
  <!-- Noise Overlay -->
  <div class="bg-noise"></div>

  <!-- Global Header -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-sm border-b border-white/5">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button
          on:click={() => setView(AppView.LANDING)}
          class="text-sm font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors"
        >
          SaberParaTodos
        </button>
        <div class="flex items-center gap-1.5 text-[10px] font-mono border border-white/10 px-2 py-0.5 rounded">
          <span class="text-yellow-400/80">v{packageInfo.version}</span>
          {#if buildInfo}
            <span class="text-white/20">|</span>
            <span class="text-emerald-500/70" title="Git commit">{buildInfo.commit?.substring(0, 7) || '?'}</span>
            <span class="text-white/20">|</span>
            <span class="text-white/50">{new Date(buildInfo.timestamp).toLocaleDateString('es-CO', { month: 'short', day: 'numeric' })}</span>
          {/if}
        </div>
      </div>
      <div class="flex items-center gap-4">
        {#if user}
          <div class="text-xs text-emerald-500 opacity-80 hidden sm:block">
            {user.email}
          </div>
          <button
            on:click={() => supabase.auth.signOut()}
            class="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-red-400 transition-colors"
          >
            Salir
          </button>
        {:else}
          <button
            on:click={() => setView(AppView.LOGIN)}
            class="px-3 py-1.5 text-xs uppercase tracking-widest border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 transition-colors rounded"
          >
            Ingresar
          </button>
        {/if}
        <AdvancedSearch questions={loadedQuestions} />
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="relative z-10 container mx-auto px-4 py-8 pt-20">
    {#if user}
      <!-- Training Room Announcement Banner (Logged in only) -->
      <div class="mb-8 bg-gradient-to-r from-[#fcd116] to-[#ff6b6b] rounded-lg p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-black font-mono border border-white/10">
        <div class="flex items-center gap-3 text-center sm:text-left">
          <span class="text-2xl">🚀</span>
          <div class="text-sm md:text-base">
            <strong>¡Nuevo!</strong> Sala de Entrenamiento con IA Adaptativa
          </div>
        </div>
        <a href="/training" class="bg-[#003893] text-white px-6 py-2 rounded-lg hover:bg-[#0052cc] transition-colors text-sm font-bold whitespace-nowrap shadow-md">
          Probar ahora →
        </a>
      </div>
    {/if}

    {#if view === AppView.LANDING}
      <div
        in:fly={{ y: 20, duration: 500, delay: 200 }}
        out:fade={{ duration: 200 }}
        class="flex flex-col items-center min-h-screen text-center px-4 pt-8 pb-32 w-full overflow-hidden relative"
      >
        <!-- Colombia Flag Gradient Background -->
        <div class="hero-gradient"></div>

        <!-- Floating Particles -->
        <div class="particles">
          <div class="particle particle-1"></div>
          <div class="particle particle-2"></div>
          <div class="particle particle-3"></div>
        </div>

        <div class="space-y-4 relative z-10">
          <div class="flex items-center justify-center gap-2 mb-4">
            <!-- Colombia Flag SVG -->
            <svg class="w-8 h-5" viewBox="0 0 32 20" fill="none">
              <rect y="0" width="32" height="10" fill="#FCD116"/>
              <rect y="10" width="32" height="5" fill="#003893"/>
              <rect y="15" width="32" height="5" fill="#CE1126"/>
            </svg>
            <span class="text-xs font-bold uppercase tracking-[0.3em] text-[#FCD116]">Colombia</span>
          </div>
          <p class="text-xs font-bold uppercase tracking-[0.4em] text-emerald-500 animate-pulse-slow">
            Sistema Listo :: v{packageInfo.version}
          </p>
          <h1 class="text-6xl md:text-8xl font-bold tracking-tighter uppercase text-[#F5F5DC] relative">
            Saber <span class="text-white/20">Para Todos</span>
            <span class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#FCD116] via-[#003893] to-[#CE1126] rounded-full"></span>
          </h1>
          <p class="max-w-md mx-auto text-sm font-light leading-relaxed opacity-60 mt-6">
            Interfaz preparatoria avanzada para pruebas estandarizadas.
            Entorno ciber-minimalista optimizado para enfoque y eficiencia.
          </p>

          <!-- Quick Stats -->
          <div class="flex items-center justify-center gap-6 mt-6 text-xs opacity-50">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>130+ preguntas</span>
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>5 asignaturas</span>
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>100% gratis</span>
            </div>
          </div>
        </div>

        <!-- Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl relative z-10 mt-12">
          <FlashlightCard
            onClick={handleStart}
            className="p-8 flex flex-col items-center justify-center group h-48 hover:border-emerald-500/50 transition-transform duration-300 hover:scale-105"
          >
            <div class="mb-4 text-emerald-500 opacity-80 group-hover:opacity-100">
              <svg class="w-10 h-10" viewBox="0 0 40 40" fill="none">
                <rect x="4" y="4" width="32" height="32" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M12 20h16M20 12v16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <circle cx="20" cy="20" r="6" fill="currentColor" opacity="0.2"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold uppercase tracking-widest mb-2">Iniciar Examen</h3>
            <p class="text-xs opacity-40">
              {selectedGrade ? `Continuar Grado ${selectedGrade}°` : 'Comenzar secuencia estándar'}
            </p>
          </FlashlightCard>

          <FlashlightCard
            onClick={() => setView(AppView.LEADERBOARD)}
            className="p-8 flex flex-col items-center justify-center group h-48 hover:border-[#FCD116]/40 transition-transform duration-300 hover:scale-105"
          >
            <div class="mb-4 text-[#FCD116] opacity-60 group-hover:opacity-100">
              <svg class="w-10 h-10" viewBox="0 0 40 40" fill="none">
                <rect x="6" y="18" width="8" height="18" rx="1" fill="currentColor" opacity="0.3"/>
                <rect x="16" y="8" width="8" height="28" rx="1" fill="currentColor" opacity="0.6"/>
                <rect x="26" y="14" width="8" height="22" rx="1" fill="currentColor" opacity="0.4"/>
                <path d="M20 4l2 4h-4l2-4z" fill="currentColor"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold uppercase tracking-widest mb-2">Datos Globales</h3>
            <p class="text-xs opacity-40">Ver métricas de rendimiento</p>
          </FlashlightCard>

          <FlashlightCard
            onClick={async () => {
              // Use NEW bulk endpoint for Blog view (1 request instead of 50+)
              if (loadedQuestions.length === 0) {
                console.log('📚 Loading questions for Blog view using bulk endpoint...');
                const allGrades = [3, 5, 7, 9, 11];

                // Import bulk function
                const { fetchBulkQuestions } = await import('../lib/api-service');

                // Single bulk request for all grades
                loadedQuestions = await fetchBulkQuestions(allGrades, 150);

                console.log(`✅ Loaded ${loadedQuestions.length} questions in 1 bulk request`);
                console.log(`📊 Performance: Reduced from 50+ requests to 1 request (98% improvement)`);
              }
              setView(AppView.BLOG);
            }}
            className="p-8 flex flex-col items-center justify-center group h-48 hover:border-[#003893]/40 transition-transform duration-300 hover:scale-105"
          >
            <div class="mb-4 text-[#003893] opacity-60 group-hover:opacity-100">
              <svg class="w-10 h-10" viewBox="0 0 40 40" fill="none">
                <path d="M6 8h28v28H6V8z" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M6 8l14 10 14-10" stroke="currentColor" stroke-width="2" fill="none"/>
                <rect x="12" y="22" width="16" height="2" fill="currentColor" opacity="0.5"/>
                <rect x="12" y="27" width="12" height="2" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold uppercase tracking-widest mb-2">Blog / Artículos</h3>
            <p class="text-xs opacity-40">Explorar banco de preguntas</p>
          </FlashlightCard>
        </div>

        <!-- CTA Button -->
        <div class="flex flex-col items-center gap-4 relative z-10 mt-10">
          <a
            href="/guia-examen"
            class="px-6 py-3 bg-gradient-to-r from-[#FCD116] via-[#003893] to-[#CE1126] text-white font-bold uppercase tracking-widest text-sm rounded hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Guía Completa ICFES
          </a>
          <p class="text-xs opacity-30">Conoce la estructura del examen y tips de estudio</p>
        </div>
        <!-- Footer - Fixed at Bottom -->
        <footer class="fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-white/5 z-50">
          <div class="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs">
            <!-- Left: Made in Colombia -->
            <span class="flex items-center gap-1 text-white/40">
              <span>🇨🇴</span>
              <span class="text-[#FCD116]">Hecho en Colombia</span>
            </span>

            <!-- Center/Middle Links -->
            <div class="flex items-center gap-3 sm:gap-4">
              <a
                href="https://patreon.com/elberi"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1 text-white/40 hover:text-[#FF424D] transition-colors"
              >
                <span>❤️</span>
                <span class="hidden sm:inline">Apoyar</span>
              </a>
              <a
                href="https://github.com/world-exams"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1 text-white/40 hover:text-emerald-500 transition-colors"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span class="hidden sm:inline">GitHub</span>
              </a>
            </div>

            <!-- Right: Copyright -->
            <span class="text-white/20 text-center">
              © {new Date().getFullYear()} World Exams
            </span>
          </div>

          <!-- Colombian flag stripe -->
          <div class="w-full h-0.5 flex">
            <div class="flex-[2] bg-[#FCD116]"></div>
            <div class="flex-1 bg-[#003893]"></div>
            <div class="flex-1 bg-[#CE1126]"></div>
          </div>
        </footer>
      </div>
    {:else if view === AppView.LOGIN}
      <div in:fly={{ x: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <Login
          onBack={() => setView(AppView.LANDING)}
        />
      </div>
    {:else if view === AppView.GRADE_SELECTION}
      <div in:fly={{ x: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <GradeSelector
          onSelect={handleGradeSelect}
          onBack={() => setView(AppView.LANDING)}
        />
      </div>
    {:else if view === AppView.SUBJECT_SELECTION}
      <div in:fly={{ x: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <SubjectSelector
          questions={filteredLocalQuestions}
          availableSubjects={availableSubjects}
          onSelect={handleSubjectSelect}
          onBack={() => setView(AppView.LANDING)}
        />
      </div>
    {:else if view === AppView.EXAM}
      <div in:fly={{ x: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <ExamView
          onFinish={handleExamFinish}
          questions={examQuestions}
          grade={selectedGrade}
          subject={selectedSubject}
        />
      </div>
    {:else if view === AppView.LEADERBOARD}
      <div in:fly={{ x: -50, duration: 500 }} out:fade={{ duration: 200 }}>
        <LeaderboardView
          onBack={() => setView(AppView.LANDING)}
        />
      </div>
    {:else if view === AppView.RESULTS}
      <div in:fly={{ y: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <ResultsView
          examData={lastExamData}
          questions={examQuestions}
          {userAnswers}
          onHome={() => setView(AppView.LANDING)}
          onLeaderboard={() => setView(AppView.LEADERBOARD)}
          onLogin={() => setView(AppView.LOGIN)}
          onRegister={() => { showRegistrationModal = true; }}
        />
      </div>
    {:else if view === AppView.BLOG}
      <div in:fly={{ x: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <BlogView
          questions={loadedQuestions}
          onSelect={handleArticleSelect}
          onBack={() => setView(AppView.LANDING)}
        />
      </div>
    {:else if view === AppView.ARTICLE}
      <div in:fly={{ x: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <ArticleView
          question={selectedArticle}
          onBack={() => setView(AppView.BLOG)}
        />
      </div>
    {/if}
  </main>

  <!-- Registration Modal -->
  {#if showRegistrationModal}
    <div
      class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      on:click|self={() => showRegistrationModal = false}
      transition:fade={{ duration: 200 }}
    >
      <div class="max-w-md w-full" in:fly={{ y: 20, duration: 300 }}>
        <IdentityRegistration
          onComplete={handleRegistrationComplete}
          onCancel={() => showRegistrationModal = false}
        />
      </div>
    </div>
  {/if}

  <!-- Exam Config Modal -->
  {#if showExamConfigModal}
    <ExamConfigModal
      subject={selectedSubject}
      onStart={handleExamConfigStart}
      onCancel={() => { showExamConfigModal = false; selectedSubject = null; }}
    />
  {/if}

  <!-- Integrity Check Animation -->
  {#if isIntegrityCheck}
    <IntegrityIntro loading={isLoadingQuestions} on:complete={() => {
      isIntegrityCheck = false;
      if (generatedExamQuestions && generatedExamQuestions.length > 0) {
        setView(AppView.EXAM);
      }
    }} />
  {/if}

  <!-- Loading Overlay -->
  {#if isLoadingQuestions}
    <div class="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center" transition:fade>
      <div class="relative w-24 h-24 mb-8">
        <div class="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-2xl">⚡</span>
        </div>
      </div>
      <h2 class="text-2xl font-bold uppercase tracking-widest text-emerald-500 animate-pulse">Generando Examen</h2>
      <p class="text-white/40 mt-2 text-sm">Descargando preguntas y calibrando dificultad...</p>
    </div>
  {/if}
</div>
