<script>
  import { onMount } from 'svelte';
  import { AppView } from '../types';
  import { fade, fly } from 'svelte/transition';
  import ExamView from './ExamView.svelte';

  import LeaderboardView from './LeaderboardView.svelte';
  import IdentityRegistration from './IdentityRegistration.svelte';
  import FlashlightCard from './FlashlightCard.svelte';
  import GradeSelector from './GradeSelector.svelte';
  import SubjectSelector from './SubjectSelector.svelte';
  import ResultsView from './ResultsView.svelte';
  import AdvancedSearch from './AdvancedSearch.svelte';
  import MemoryStatus from './MemoryStatus.svelte';
  import LocalReportsView from './LocalReportsView.svelte';
  import Login from './Login.svelte';
  import ExamConfigModal from './ExamConfigModal.svelte'; // New import

  import { supabase } from '../lib/supabase';
  import { getLocalIdentity } from '../lib/identity';
  import {
    filterUnansweredQuestions,
    markQuestionsAnswered,
    getMemoryStats
  } from '../lib/question-memory';
  import { saveExamResultLocal } from '../lib/idb-storage'; // Persist local results
  import { clearPackStorage } from '../lib/pack-storage'; // Clear pack storage

  import BlogView from './BlogView.svelte';
  import ArticleView from './ArticleView.svelte';
  import { fetchAllQuestionsForGrade, getAvailableSubjects, fetchQuestions } from '../lib/api-service'; // Added fetchQuestions
  import { cacheService, generateRandomExam, getRecommendedExamSize } from '../lib/cache-service'; // Cache service
  import { filterByPlan } from '../utils/questionParser';
  import { generateSmartExam } from '../lib/smart-exam-service'; // Smart Service
  import IntegrityIntro from './IntegrityIntro.svelte'; // New Component
  import { getPWAStatus, getRecommendedCacheSize, getCacheExpiryHours } from '../lib/pwa-detector'; // PWA Detection
  import packageInfo from '../../package.json';
  // Removed static import to avoid Vite warning
  import LocalModeNotice from './LocalModeNotice.svelte';
  import OfflineProfile from './OfflineProfile.svelte';

  import PartyLobby from './PartyLobby.svelte'; // New import

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

  let { questions = [], universalPool = null } = $props();

  // Internal state that can be updated
  let loadedQuestions = $state(questions || []); // Safety check
  let availableSubjects = $state([]); // New state
  let isLoadingQuestions = $state(false);
  let loadError = $state(null);
  let showExamConfigModal = $state(false); // New state
  let isIntegrityCheck = $state(false); // Integrity check state
  let isPreparingExam = $state(false); // Controls IntegrityIntro loading state
  let generatedExamQuestions = $state(null); // Store smart generated questions
  let examConfig = $state({ count: 10, mode: 'SOLO' }); // New state
  let showLocalReports = $state(false); // Modal for local reports
  let showOfflineProfile = $state(false); // Modal for offline profile
  let blogSubjectFilter = $state(null); // 🆕 Pre-filter for BlogView from LocalReportsView
  let isNavigatingToBlog = $state(false); // 🆕 Loading state for Blog navigation
  let buildInfo = $state(null); // Dynamic build info

  // Party Mode State
  let partyCode = $state('');
  let partyChannel = $state(null);
  let user = $state(null); // Auth user

  // View State
  let view = $state(AppView.LANDING);
  let selectedGrade = $state(null);
  let selectedSubject = $state(null);
  let selectedArticle = $state(null);
  let showRegistrationModal = $state(false);
  let lastExamData = $state(null);
  let userAnswers = $state({});

  function setView(newView) {
    view = newView;
  }

  // Derived: Filtered questions for current grade
  let filteredLocalQuestions = $derived(
    loadedQuestions.filter(q => selectedGrade ? q.grade === selectedGrade : true)
  );

  // Derived: Exam questions based on generatedExamQuestions or filtered
  let examQuestions = $derived(generatedExamQuestions || filteredLocalQuestions);

  console.log('App received questions:', questions?.length || 0);
  console.log('App received universalPool:', universalPool?.totalQuestions || 0);


  // Auth & Lifecycle
  onMount(async () => {
    // Fetch build info dynamically
    try {
      const res = await fetch('/build-info.json');
      if (res.ok) buildInfo = await res.json();
    } catch (e) {
      console.warn('Failed to load build info', e);
    }

    const { data: { session } } = await supabase.auth.getSession();
    user = session?.user || null;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      user = session?.user || null;
    });

    // PWA & Updates Logic (Restored if needed or just minimal)
    if (typeof window !== 'undefined') {
       // Check for updates
    }

    return () => subscription.unsubscribe();
  });

  // ... (previous imports and setup)

  async function handleExamConfigStart(config) {
    showExamConfigModal = false;
    examConfig = config;
    MAX_EXAM_QUESTIONS = config.count;

    if (config.mode === 'PARTY') {
      try {
        // Create Party Session directly from App
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();

        // Ensure subject is loaded
        if (loadedQuestions.length === 0 || selectedGrade) {
           await loadQuestionsForExam(selectedGrade || 11, selectedSubject);
        }

        const { error } = await supabase.from('party_sessions').insert({
          party_code: code,
          host_name: user?.email?.split('@')[0] || 'Host', // Use logged in user if available
          exam_config: {
             subject: selectedSubject,
             grade: selectedGrade || 11,
             num_questions: config.count,
             difficulty: 'NORMAL',
             time_per_question: 120
          },
          students: [], // Initialize empty array driven by JSONB
          max_students: 50,
          status: 'lobby'
        });

        if (error) throw error;

        partyCode = code;
        partyChannel = supabase.channel(`party:${code}`);
        partyChannel.subscribe();

        setView(AppView.PARTY_LOBBY);
      } catch (err) {
        console.error('Error creating party:', err);
        alert('Error al crear la party. Intenta de nuevo.');
      }
      return;
    }

    // SOLO Mode Logic continues below...
    // SOLO Mode: Start Integrity Check + Smart Fetch
    isIntegrityCheck = true;
    isPreparingExam = true;

    // Note: isLoadingQuestions is managed by loadQuestionsForExam internally
    generatedExamQuestions = null; // Reset

    // Minimum time for animation (3.5s to read messages)
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 3500));

    try {
      console.log(`🤖 Starting Exam Generation (Count: ${config.count}, Diagnostic: ${config.useDiagnostic})...`);

      // 1️⃣ Load questions for current grade (Base)
      // We ensure we have the main grade loaded
      if (loadedQuestions.length === 0 || selectedGrade) {
         await loadQuestionsForExam(selectedGrade || 11, selectedSubject);
      }

      // ... (rest of smart fetch logic)
      // (Keep existing logic, just truncating for replace clarity, but will include full original logic in replacement if needed,
      // or rely on previous code if not changing it. Wait, I must include content to match context if I replace a large block.)

       // 2️⃣ If Diagnostic Mode: Load questions from lower grades
      if (config.useDiagnostic && selectedGrade > 3) {
         console.log('🩺 Diagnostic Mode Active: Fetching foundational questions...');
         const diagnosticGrades = [3, 5, 7, 9].filter(g => g < selectedGrade);
         try {
           const { fetchBulkQuestions } = await import('../lib/api-service');
           const diagQuestions = await fetchBulkQuestions(diagnosticGrades, 50);

           if (diagQuestions.length > 0) {
              const currentIds = new Set(loadedQuestions.map(q => q.id));
              const newDiag = diagQuestions.filter(q => !currentIds.has(q.id));
              loadedQuestions = [...loadedQuestions, ...newDiag];
           }
         } catch (e) {
            console.error('Error fetching diagnostic questions:', e);
         }
      }

      // 3️⃣ Generate random exam from cached pool (NO API CALLS)
      // Filter logic needs to be aware of Diagnostic Mode
      const availableQuestions = loadedQuestions.filter(q => {
        if (!q) return false;
        const subjectMatch = subjectsMatch(q.category, selectedSubject);
        if (!subjectMatch) return false;
        if (config.useDiagnostic) {
           return q.grade === selectedGrade || (q.grade < selectedGrade && [3,5,7,9].includes(q.grade));
        } else {
           return selectedGrade ? q.grade === selectedGrade : true;
        }
      });

      console.log(`📊 Available questions in pool for exam: ${availableQuestions.length}`);

      // 🚨 FIX: Deep Search if insufficient questions
      if (availableQuestions.length < config.count) {
         console.warn(`⚠️ Insufficient questions (${availableQuestions.length}/${config.count}). Starting Deep Search...`);
         const searchGrades = config.useDiagnostic && selectedGrade > 3
             ? [selectedGrade, ...[3, 5, 7, 9].filter(g => g < selectedGrade)]
             : [selectedGrade];

         const { fetchQuestions } = await import('../lib/api-service');
         const promises = searchGrades.map(g => fetchQuestions(g, selectedSubject, 1));
         const results = await Promise.all(promises);

         const currentIds = new Set(loadedQuestions.map(q => q.id));
         results.forEach(questions => {
            if (questions && questions.length > 0) {
                const uniqueNew = questions.filter(q => !currentIds.has(q.id));
                if (uniqueNew.length > 0) {
                    loadedQuestions = [...loadedQuestions, ...uniqueNew];
                    uniqueNew.forEach(q => currentIds.add(q.id));
                }
            }
         });
      }

      // Re-evaluate available questions after Deep Search
      const finalAvailableQuestions = loadedQuestions.filter(q => {
         if (!q) return false;
         const subjectMatch = subjectsMatch(q.category, selectedSubject);
         if (!subjectMatch) return false;
         if (config.useDiagnostic) {
            return q.grade === selectedGrade || (q.grade < selectedGrade && [3,5,7,9].includes(q.grade));
         } else {
            return selectedGrade ? q.grade === selectedGrade : true;
         }
      });

      if (finalAvailableQuestions.length === 0) {
         throw new Error("No hay preguntas disponibles para esta configuración.");
      }

      const { filtered, hadToRepeat } = filterUnansweredQuestions(
        finalAvailableQuestions,
        config.count
      );
      const examQuestions = filtered;

      await minTimePromise;

      if (examQuestions && examQuestions.length > 0) {
        generatedExamQuestions = examQuestions;
        isPreparingExam = false;
      } else {
        throw new Error("Error generando el examen. Intenta de nuevo.");
      }
    } catch (error) {
      console.error('Error generating exam:', error);
      alert(error.message);
      isIntegrityCheck = false;
      isPreparingExam = false;
      setView(AppView.SUBJECT_SELECTION);
    }
  }

  // Handle Host Starting the Party Exam
  async function handlePartyStart() {
      // 1. Generate Questions using local logic (reusing prepareExamQuestions/filter logic)
      const availableQuestions = loadedQuestions.filter(q => subjectsMatch(q.category, selectedSubject) && q.grade === selectedGrade);

      // We can use the same logic as SOLO mode or simplified
      const { filtered } = filterUnansweredQuestions(availableQuestions, examConfig.count);
      generatedExamQuestions = filtered;

      // 2. Upload Questions to Supabase (so joiners can fetch or we broadcast)
      // Actually, we will broadcast question by question. But let's set status to active.
      await supabase.from('party_sessions')
          .update({ status: 'active', current_question_index: 0, started_at: new Date().toISOString() })
          .eq('party_code', partyCode);

      // 3. Switch View to EXAM
      setView(AppView.EXAM);

      // 4. Initial broadcast handled by ExamView or here?
      // ExamView will need to handle "Party Mode"
  }


  // ... (handleArticleSelect, etc)

// In the template area:
/*
  {:else if view === AppView.PARTY_LOBBY}
    <PartyLobby
      partyCode={partyCode}
      onStart={handlePartyStart}
      onCancel={() => setView(AppView.SUBJECT_SELECTION)}
    />
*/



  function handleArticleSelect(article) {
    selectedArticle = article;
    setView(AppView.ARTICLE);
  }

  async function handleGradeSelect(grade) {
    selectedGrade = grade;
    isLoadingQuestions = true;
    try {
      const questions = await fetchAllQuestionsForGrade(grade, true, 150);
      loadedQuestions = questions;
      availableSubjects = getAvailableSubjects(questions);
      setView(AppView.SUBJECT_SELECTION);
    } catch (err) {
      console.error('Error loading questions for grade:', err);
      loadError = err;
    } finally {
      isLoadingQuestions = false;
    }
  }

  async function handleSubjectSelect(subject) {
    selectedSubject = subject;
    showExamConfigModal = true;
  }

  async function loadQuestionsForExam(grade, subject) {
    isLoadingQuestions = true;
    try {
      const questions = await fetchAllQuestionsForGrade(grade, true, 150);
      const currentIds = new Set(loadedQuestions.map(q => q.id));
      const newQuestions = questions.filter(q => !currentIds.has(q.id));
      if (newQuestions.length > 0) {
        loadedQuestions = [...loadedQuestions, ...newQuestions];
      }
    } catch (err) {
      console.error('Error loading questions:', err);
    } finally {
      isLoadingQuestions = false;
    }
  }

  function handleExamFinish(examData, answers) {
    lastExamData = examData;
    userAnswers = answers;

    // Mark questions as answered in memory
    if (examData?.questions) {
      markQuestionsAnswered(examData.questions);
    }

    // Save to local storage
    try {
      saveExamResultLocal({
        ...examData,
        completedAt: new Date().toISOString(),
        grade: selectedGrade,
        subject: selectedSubject
      });
    } catch (err) {
      console.warn('Error saving local exam result:', err);
    }

    // Reset party state if applicable
    if (partyCode) {
      partyCode = '';
      partyChannel = null;
    }

    generatedExamQuestions = null;
    setView(AppView.RESULTS);
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
  <LocalModeNotice />

  {#if showLocalReports}
    <LocalReportsView
      onClose={() => showLocalReports = false}
      onStartExam={handleStart}
      onNavigateToBlog={async (subject) => {
        isNavigatingToBlog = true;
        const startTime = Date.now();

        try {
          // 🆕 Load only grade 11 by default (optimized)
          if (loadedQuestions.length === 0) {
            const { fetchQuestionsForGrade, prefetchAllGrades } = await import('../lib/api-service');
            loadedQuestions = await fetchQuestionsForGrade(11, 150);

            // 🆕 Pre-fetch all other grades in background for instant switching
            prefetchAllGrades(150).catch(e => console.warn('Background prefetch error:', e));
          }
          // 🆕 Save subject filter to pass to BlogView
          blogSubjectFilter = subject || null;
          showLocalReports = false;
          setView(AppView.BLOG);
        } finally {
          // Ensure spinner is visible for at least 400ms
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, 400 - elapsed);
          if (remaining > 0) {
            await new Promise(resolve => setTimeout(resolve, remaining));
          }
          isNavigatingToBlog = false;
        }
      }}
    />
  {/if}

  {#if showOfflineProfile}
    <OfflineProfile onClose={() => showOfflineProfile = false} />
  {/if}

  <!-- Noise Overlay -->
  <div class="bg-noise"></div>

  <!-- Global Header -->
  <header class="fixed top-0 left-0 right-0 z-50 border-b border-white/5">
    <!-- Header Background with Blur -->
    <div class="absolute inset-0 bg-[#121212]/80 backdrop-blur-sm pointer-events-none"></div>

    <div class="container mx-auto px-4 py-3 flex items-center justify-between relative z-10">
      <div class="flex items-center gap-3">
        <button
          onclick={() => setView(AppView.LANDING)}
          class="text-sm font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors"
        >
          SaberParaTodos
        </button>
        <div class="hidden sm:flex items-center gap-1.5 text-[10px] font-mono border border-white/10 px-2 py-0.5 rounded">
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
            onclick={() => supabase.auth.signOut()}
            class="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-red-400 transition-colors"
          >
            Salir
          </button>
        {:else}
          <!--
          <button
            on:click={() => setView(AppView.LOGIN)}
            class="px-3 py-1.5 text-xs uppercase tracking-widest border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 transition-colors rounded"
          >
            Ingresar
          </button>
          -->
        {/if}
        <!-- Header Icons -->
        <div class="flex items-center gap-2">
          <!-- Profile Icon - Opens OfflineProfile modal -->
          <button
            onclick={() => showOfflineProfile = true}
            class="p-2 text-white/40 hover:text-indigo-400 transition-colors"
            title="Mi Perfil Offline"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <!-- Local Reports Icon - Opens LocalReportsView modal -->
          <button
            onclick={() => showLocalReports = true}
            class="p-2 text-white/40 hover:text-emerald-500 transition-colors"
            title="Ver Historial Local"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
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
          <div class="flex items-center justify-center gap-6 mt-6 text-xs opacity-50 relative z-20">
            <!-- Dynamic Questions Counter with Tooltip -->
            <div class="flex items-center gap-1 group relative cursor-help">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>4000+ preguntas</span>

              <!-- Updates tooltip -->
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 bg-[#0a0a0a]/95 text-emerald-100 text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 pointer-events-none border border-emerald-500/20 shadow-2xl z-50 w-64 text-center backdrop-blur-xl">
                 <div class="font-bold text-emerald-400 mb-1.5 uppercase tracking-wider text-[10px]">Banco Dinámico</div>
                 <p class="leading-relaxed mb-2 text-white/90">
                   Las preguntas rotan <span class="text-white font-bold border-b border-emerald-500/50">semanalmente</span>.
                 </p>
                 <div class="bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/10 text-left relative overflow-hidden">
                   <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent"></div>
                   <p class="text-[10px] text-emerald-200/90 leading-tight relative z-10">
                     <strong class="text-emerald-400">💡 Tip:</strong> Si no borras la app, acumularás todas las preguntas en tu dispositivo <strong class="text-white">GRATIS</strong>.
                   </p>
                 </div>
                 <div class="mt-2 text-[10px] text-white/20 font-mono uppercase tracking-widest">Total Global: 1,800+</div>

                 <!-- Arrow -->
                 <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0a]/95 border-r border-b border-emerald-500/20 rotate-45 backdrop-blur-xl"></div>
              </div>
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
            onClick={() => showLocalReports = true}
            className="p-8 flex flex-col items-center justify-center group h-48 hover:border-emerald-500/50 transition-transform duration-300 hover:scale-105"
          >
            <div class="mb-4 text-[#FCD116] opacity-60 group-hover:opacity-100">
              <svg class="w-10 h-10" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="14" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M30 10l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold uppercase tracking-widest mb-2">Mis Métricas</h3>
            <p class="text-xs opacity-40">Ver rendimiento local</p>
          </FlashlightCard>

          <FlashlightCard
            onClick={async () => {
              isNavigatingToBlog = true;
              try {
                // 🆕 Use NEW grade-specific endpoint for Blog view
                // Load only grade 11 by default (1 small request instead of 1 large request with all grades)
                if (loadedQuestions.length === 0) {
                  console.log('📚 Loading questions for Blog view using grade-specific endpoint...');

                  // Import grade-specific function
                  const { fetchQuestionsForGrade, prefetchAllGrades } = await import('../lib/api-service');

                  // Single request for grade 11 only (default for ICFES)
                  loadedQuestions = await fetchQuestionsForGrade(11, 150);

                  console.log(`✅ Loaded ${loadedQuestions.length} questions for grade 11`);
                  console.log(`📊 Performance: ~40KB instead of ~150KB (73% smaller)`);

                  // 🆕 Pre-fetch all other grades in background for instant switching
                  prefetchAllGrades(150).catch(e => console.warn('Background prefetch error:', e));
                }
                setView(AppView.BLOG);
              } finally {
                // Use a small delay for smoother transition
                setTimeout(() => { isNavigatingToBlog = false; }, 300);
              }
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
    {:else if view === AppView.PARTY_LOBBY}
      <div in:fly={{ x: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <PartyLobby
          partyCode={partyCode}
          onStart={handlePartyStart}
           onCancel={() => setView(AppView.SUBJECT_SELECTION)}
        />
      </div>
    {:else if view === AppView.EXAM}
      <div in:fly={{ x: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <ExamView
          onFinish={handleExamFinish}
          questions={examQuestions}
          grade={selectedGrade}
          subject={selectedSubject}
          partyCode={partyCode}
          partyChannel={partyChannel}
          isHost={!!partyCode}
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
          onViewReports={() => showLocalReports = true}
          onLogin={() => setView(AppView.LOGIN)}
          onRegister={() => { showRegistrationModal = true; }}
        />
      </div>
    {:else if view === AppView.BLOG}
      <div in:fly={{ x: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <BlogView
          questions={loadedQuestions}
          onSelect={handleArticleSelect}
          onBack={() => { blogSubjectFilter = null; setView(AppView.LANDING); }}
          initialSubjectFilter={blogSubjectFilter}
          isLoading={isNavigatingToBlog}
          onGradeChange={async (grade) => {
            const { fetchQuestionsForGrade, fetchBulkQuestions } = await import('../lib/api-service');

            // 🆕 Always show spinner for feedback (prevents "blocked" feel)
            isNavigatingToBlog = true;
            const startTime = Date.now();

            try {
              let newToStore = [];
              if (grade === null) {
                newToStore = await fetchBulkQuestions([3, 5, 6, 7, 8, 9, 10, 11], 300);
              } else {
                newToStore = await fetchQuestionsForGrade(grade, 150);
              }

              // Merge only if we found new questions to avoid redundant reactivity
              const existingIds = new Set(loadedQuestions.map(q => q.id));
              const uniqueNew = newToStore.filter(q => !existingIds.has(q.id));

              if (uniqueNew.length > 0) {
                loadedQuestions = [...loadedQuestions, ...uniqueNew];
                console.log(`✅ Added ${uniqueNew.length} new questions to pool (${loadedQuestions.length} total)`);
              }
            } catch (err) {
              console.error('Error changing grade:', err);
            } finally {
              // Ensure spinner is visible for at least 300ms for solid feedback
              const elapsed = Date.now() - startTime;
              const remaining = Math.max(0, 300 - elapsed);
              if (remaining > 0) {
                await new Promise(resolve => setTimeout(resolve, remaining));
              }
              isNavigatingToBlog = false;
            }
          }}
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
      class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 outline-none"
      onclick={(e) => { if (e.target === e.currentTarget) showRegistrationModal = false; }}
      onkeydown={(e) => { if (e.key === 'Escape') showRegistrationModal = false; }}
      role="presentation"
      tabindex="-1"
      transition:fade={{ duration: 200 }}
    >
      <div class="max-w-md w-full cursor-default" in:fly={{ y: 20, duration: 300 }}>
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
      currentGrade={selectedGrade || 11}
      availableQuestions={loadedQuestions}
      onStart={handleExamConfigStart}
      onCancel={() => { showExamConfigModal = false; selectedSubject = null; }}
    />
  {/if}

  {#if isIntegrityCheck}
    <IntegrityIntro loading={isPreparingExam} on:complete={() => {
      isIntegrityCheck = false;
      if (generatedExamQuestions && generatedExamQuestions.length > 0) {
        setView(AppView.EXAM);
      }
    }} />
  {/if}

  <!-- Loading Overlay -->
  {#if isLoadingQuestions || isNavigatingToBlog}
    <div class="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center text-center px-6" transition:fade>
      <div class="relative w-24 h-24 mb-8">
        <div class="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-2xl">{isNavigatingToBlog ? '🔍' : '⚡'}</span>
        </div>
      </div>
      <h2 class="text-2xl font-bold uppercase tracking-widest text-emerald-500 animate-pulse">
        {isNavigatingToBlog ? 'Accediendo al Banco' : 'Generando Examen'}
      </h2>
      <p class="text-white/40 mt-2 text-sm max-w-xs">
        {isNavigatingToBlog ? 'Preparando artículos y categorizando temas...' : 'Descargando preguntas y calibrando dificultad...'}
      </p>
    </div>
  {/if}
</div>
