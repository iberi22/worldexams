<script lang="ts">
  import { onMount } from 'svelte';
  import { getAllLocalResults, getKnownQuestion } from '../lib/idb-storage';
  import { generateUserProfile, generateInsights, type UserProfile, getLatestMMR } from '../lib/local-intelligence';
  import { fade, slide } from 'svelte/transition';
  import MathRenderer from './MathRenderer.svelte';
  import AdBlock from './AdBlock.svelte';
  import type { AppQuestion } from '../lib/api-service';
  import { defaultQuestionRepository, findQuestionById } from '../lib/questions';
  import ReportModal from './ReportModal.svelte';
  import CommentsSection from './CommentsSection.svelte';
  import { countryConfig } from '../config';
  import RadarChart from './RadarChart.svelte';
  import SimpleChart from './SimpleChart.svelte';
  import PerformanceLevels from './dashboard/PerformanceLevels.svelte';
  import PercentileRank from './dashboard/PercentileRank.svelte';

  // Define interface locally with details support
  interface QuestionDetail {
    questionId: string | number;  // Matches QuestionResultData
    question?: AppQuestion;       // 🆕 Full question data for offline viewing
    isCorrect: boolean;
    difficulty?: number;
    grade?: number;
    category?: string;
  }

  interface ExamResultRecord {
    id?: number;
    timestamp: number;
    grade: number;
    subject: string;
    score: number;
    totalQuestions: number;
    correctCount: number;
    timeSpentSeconds: number;
    details?: QuestionDetail[];
  }

  const {
    onClose,
    onStartExam = undefined,
    onNavigateToBlog = undefined,
    onViewFullResult = undefined
  } = $props<{
    onClose: () => void;
    onStartExam?: () => void;
    onNavigateToBlog?: (subject?: string) => void;
    onViewFullResult?: (examRecord: ExamResultRecord) => void;
  }>();

  let activeTab: 'dashboard' | 'history' = $state('dashboard');
  let historyResults: ExamResultRecord[] = $state([]);
  let userProfile: UserProfile | null = $state(null);
  let insights: string[] = $state([]);
  let loading = $state(true);

  // 🆕 Track which exams are expanded
  let expandedExams: Set<number> = $state(new Set());

  // 🆕 Help modal state for MMR explanation
  let showHelpModal = $state(false);

  // 🆕 Study prompt modal state
  let showStudyPromptModal = $state(false);
  let generatedStudyPrompt = $state('');
  let notebookLMPrompt = $state('');
  let notebookLMUpdatePrompt = $state('');
  let chatgptStudyPrompt = $state('');
  let studyTipsPrompt = $state(''); // 🆕
  let notebookLMPromptType: 'setup' | 'update' = $state('setup');

  // Import prompt service functions
  import {
    generateImprovementPrompt,
    generateNotebookLMPrompt,
    generateNotebookLMUpdatePrompt,
    generateChatGPTStudyPrompt,
    generateStudyTipsPrompt, // 🆕
    type UserProfileData
  } from '../lib/prompt-service';

  let loadingQuestion = $state(false);
  let selectedQuestionId: string | null = $state(null); // 🆕 Fix for ReferenceError
  let selectedQuestionData: AppQuestion | null = $state(null); // 🆕 Added missing state

  // 🆕 Full exam detail view state
  let selectedExam: ExamResultRecord | null = $state(null);

  function openExamDetail(exam: ExamResultRecord) {
    selectedExam = exam;
  }

  function closeExamDetail() {
    selectedExam = null;
  }

  function getOptionText(q: any, optionId: string | undefined): string {
    if (!optionId || !q?.options) return 'Sin respuesta';
    const opt = q.options.find((o: any) => o.id === optionId);
    return opt ? opt.text : 'Sin respuesta';
  }

  // 🆕 Generate study prompt based on weak areas
  function generateStudyPrompt() {
    console.log('🎓 generateStudyPrompt called!');
    if (!userProfile) return;

    const areasToUse = weakAreas.length > 0
      ? weakAreas
      : Object.values(userProfile.subjects || {})
          .filter(s => s.questionsAnswered > 0)
          .map(s => ({
            name: s.name,
            seen: s.questionsAnswered,
            correct: Math.round(s.accuracy * s.questionsAnswered),
            mmr: s.mmr
          }))
          .sort((a, b) => (a.correct / a.seen) - (b.correct / b.seen))
          .slice(0, 5);

    const profileData: UserProfileData = {
      globalMMR: userProfile.globalMMR,
      rankTitle: userProfile.rankTitle,
      globalAccuracy: userProfile.globalAccuracy,
      totalQuestions: userProfile.totalQuestions,
      weakAreas: areasToUse.map(a => ({
        name: a.name,
        accuracy: a.correct / a.seen || 0
      })),
      strongAreas: Object.entries(userProfile.subjects || {})
        .filter(([_, s]) => (s.questionsAnswered > 0 && (s.accuracy >= 0.7)))
        .map(([name, s]) => ({
          name,
          accuracy: s.accuracy
        })),
      advancedMetrics: userProfile.advancedMetrics
    };

    generatedStudyPrompt = generateImprovementPrompt(profileData);
    notebookLMPrompt = generateNotebookLMPrompt(profileData);
    notebookLMUpdatePrompt = generateNotebookLMUpdatePrompt(profileData);
    chatgptStudyPrompt = generateChatGPTStudyPrompt(profileData);
    studyTipsPrompt = generateStudyTipsPrompt(profileData); // 🆕

    showStudyPromptModal = true;
  }

  // 🆕 Copy prompt to clipboard
  async function copyPromptToClipboard() {
    try {
      await navigator.clipboard.writeText(generatedStudyPrompt);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  function toggleExpand(examId: number | undefined) {
    if (examId === undefined) return;
    if (expandedExams.has(examId)) {
      expandedExams.delete(examId);
    } else {
      expandedExams.add(examId);
    }
    expandedExams = expandedExams; // Trigger reactivity
  }

  // 🆕 Open question modal
  async function openQuestionModal(questionId: string | number) {
    const qid = String(questionId);
    selectedQuestionId = qid;
    loadingQuestion = true;
    selectedQuestionData = null;

    // 🆕 Step 1: Check if we already have this question in our history records
    // This is the fastest and most reliable way for previously taken exams
    for (const record of historyResults) {
      if (record.details && Array.isArray(record.details)) {
        const foundInHistory = record.details.find(d => String(d.questionId) === qid);
        if (foundInHistory && foundInHistory.question) {
          console.log(`🧠 Found question data in local history for: ${qid}`);
          selectedQuestionData = foundInHistory.question;
          loadingQuestion = false;
          return;
        }
      }
    }

    try {
      selectedQuestionData = await findQuestionById({
        questionId: qid,
        repository: defaultQuestionRepository,
        getKnownQuestion
      });

      if (!selectedQuestionData) {
        console.warn(`❌ Question truly not found: ${qid}`);
        console.warn('💡 This question may be from an older weekly rotation that is no longer available.');
      }
    } catch (err) {
      console.error('Error loading question:', err);
    } finally {
      loadingQuestion = false;
      console.log(`🏁 Final state - selectedQuestionData:`, selectedQuestionData ? `ID: ${selectedQuestionData.id}` : 'NULL');
    }
  }

  function closeQuestionModal() {
    selectedQuestionId = null;
    selectedQuestionData = null;
  }

  onMount(async () => {
    try {
      // Load raw history for list view
      const data = await getAllLocalResults();
      historyResults = data.sort((a, b) => b.timestamp - a.timestamp);

      // Generate intelligent profile
      userProfile = await generateUserProfile();
      insights = generateInsights(userProfile);

    } catch (e) {
      console.error('Error loading local intelligence:', e);
    } finally {
      loading = false;
    }
  });

  function formatDate(ts: number) {
    return new Date(ts).toLocaleDateString('es-CO', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function getGradeColor(score: number): string {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  }

  function getRankColor(mmr: number): string {
    if (mmr < 800) return 'text-gray-400';
    if (mmr < 1000) return 'text-emerald-400';
    if (mmr < 1200) return 'text-blue-400';
    if (mmr < 1400) return 'text-purple-400';
    return 'text-yellow-400'; // GM
  }

  function handleGoToExams() {
    onClose();
    if (onStartExam) {
      onStartExam();
    }
  }

  // Derived data for charts
  let mmrHistory = $derived(historyResults.length >= 2
    ? historyResults.slice(0, 10).reverse().map((r, i) => 1000 + (i * 20) + (r.score - 50) * 2)
    : []);

  let accuracyHistory = $derived(historyResults.length >= 2
    ? historyResults.slice(0, 10).reverse().map(r => r.score)
    : []);

  // 🆕 Minimum thresholds for showing metrics
  const MIN_COMPETENCY_QUESTIONS = 3; // Minimum questions per competency to be considered
  const MIN_TOTAL_FOR_METRICS = 10;   // Minimum total questions to show fortalezas/debilidades

  // 🆕 Metrics Progress
  let metricsProgress = $derived({
    totalQuestions: (userProfile as UserProfile | null)?.totalQuestions || 0,
    neededTotal: MIN_TOTAL_FOR_METRICS,
    remainingTotal: Math.max(0, MIN_TOTAL_FOR_METRICS - ((userProfile as UserProfile | null)?.totalQuestions || 0)),
    isUnlocked: ((userProfile as UserProfile | null)?.totalQuestions || 0) >= MIN_TOTAL_FOR_METRICS
  });

  // Weak areas for improvement plan - uses topics first, then competencies/subjects
  let weakAreas = $derived((() => {
    const profile = userProfile as UserProfile | null;
    // 🆕 Weighted Score Helper (Laplace Smoothing)
    const getWeightedScore = (correct: number, seen: number) => (correct + 1) / (seen + 2);

    // 🆕 Try granular topics first (Best for specific feedback)
    if (profile?.topics) {
      const topicAreas = Object.values(profile.topics)
        .filter(t => (t as any).seen >= 3)
        .map(t => ({
          ...(t as any),
          weightedScore: getWeightedScore((t as any).correct, (t as any).seen)
        }))
        .sort((a, b) => a.weightedScore - b.weightedScore)
        .slice(0, 5)
        .map(t => ({
          name: t.name,
          seen: t.seen,
          correct: t.correct,
          mmr: 0
        }));
      if (topicAreas.length > 0) return topicAreas;
    }

    // Fallback to competencies
    if (profile?.competencies) {
      const compAreas = Object.values(profile.competencies)
        .filter(c => (c as any).seen >= 2)
        .map(c => ({
          ...(c as any),
          weightedScore: getWeightedScore((c as any).correct, (c as any).seen)
        }))
        .sort((a, b) => a.weightedScore - b.weightedScore)
        .slice(0, 3);
      if (compAreas.length > 0) return compAreas;
    }

    // Fallback to subjects
    if (profile?.subjects) {
      return Object.values(profile.subjects)
        .filter(s => (s as any).questionsAnswered >= 1)
        .map(s => {
            const subj = s as any;
            return {
                name: subj.name,
                seen: subj.questionsAnswered,
                correct: Math.round(subj.accuracy * subj.questionsAnswered),
                mmr: subj.mmr,
                weightedScore: getWeightedScore(Math.round(subj.accuracy * subj.questionsAnswered), subj.questionsAnswered)
            }
        })
        .sort((a, b) => a.weightedScore - b.weightedScore)
        .slice(0, 3);
    }
    return [];
  })());

  // 🆕 Heatmap Data Generation
  let activityDays = $derived((() => {
    const days = [];
    const today = new Date();
    // Generate last 60 days
    for (let i = 59; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = userProfile?.dailyActivity?.[dateStr] || 0;

      let level = 0;
      if (count > 0) level = 1;
      if (count > 5) level = 2;
      if (count > 10) level = 3;
      if (count > 20) level = 4;

      days.push({ date: dateStr, count, level });
    }
    return days;
  })());

  // 🆕 Reactive lists for UI with Weighted Scoring
  const getWeightedScore = (correct: number, seen: number) => (correct + 1) / (seen + 2);

  let competencyStats = $derived(userProfile?.competencies
    ? Object.values(userProfile.competencies)
        .filter(c => c.seen > 0)
        .map(c => ({
          ...c,
          weightedScore: getWeightedScore(c.correct, c.seen)
        }))
    : []);

  let subjectStats = $derived(userProfile?.subjects
    ? Object.values(userProfile.subjects)
        .filter(s => s.questionsAnswered > 0)
        .map(s => ({
          ...s,
          correct: Math.round(s.accuracy * s.questionsAnswered),
          seen: s.questionsAnswered,
          weightedScore: getWeightedScore(Math.round(s.accuracy * s.questionsAnswered), s.questionsAnswered)
        }))
    : []);

  // Top Strengths (Highest Weighted Score)
  let topStrengths = $derived(competencyStats.length > 0
      ? [...competencyStats].sort((a,b) => b.weightedScore - a.weightedScore).slice(0, 3)
      : [...subjectStats].sort((a,b) => b.weightedScore - a.weightedScore).slice(0, 3));

  // Top Weaknesses (Lowest Weighted Score) - Only show if seen > MIN_THRESHOLD to avoid noise?
  // User wanted coherence, so let's stick to strict sorting but maybe filter extremely low samples if needed.
  // For now, weighted score handles 0/1 vs 0/5 well (0/5 is lower score).
  let topWeaknesses = $derived(competencyStats.length > 0
      ? [...competencyStats].sort((a,b) => (a.weightedScore ?? 0) - (b.weightedScore ?? 0)).slice(0, 3)
      : [...subjectStats].sort((a,b) => (a.weightedScore ?? 0) - (b.weightedScore ?? 0)).slice(0, 3));

  let seenCompetencies = $derived(competencyStats); // Keep for compatibility if used elsewhere
  let seenSubjects = $derived(subjectStats);        // Keep for compatibility

  // Report Modal State
  let showReportModal = $state(false);
</script>

{#if showReportModal}
  <ReportModal
    show={showReportModal}
    onClose={() => showReportModal = false}
    questionId={null}
  />
{/if}

<div class="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md" transition:fade>
  <div class="bg-[#121212] border-t sm:border border-white/10 rounded-t-[2.5rem] sm:rounded-2xl w-full max-w-5xl h-[94vh] sm:h-[90vh] flex flex-col shadow-2xl overflow-hidden relative mb-[env(safe-area-inset-bottom)]">

    <!-- Mobile Drag Handle -->
    <div class="w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-3 mb-1 sm:hidden"></div>

    <!-- Header -->
    <div class="px-5 py-4 sm:p-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 bg-gradient-to-b from-white/5 to-transparent">
      <div class="flex items-center gap-4 w-full sm:w-auto">
        <div class="w-12 h-12 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20">
          🧠
        </div>
        <div>
          <h2 class="text-xl font-black text-white flex items-center gap-2">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Inteligencia Local</span>
            <span class="text-[10px] bg-emerald-500 text-black font-black px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">BETA</span>
          </h2>
          <p class="text-[10px] sm:text-xs text-white/40 font-medium uppercase tracking-widest mt-0.5">
            Análisis de rendimiento • {historyResults.length} exámenes
          </p>
        </div>

        <button
          onclick={() => showReportModal = true}
          class="ml-auto p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white/40 hover:text-white mr-2 sm:hidden"
          aria-label="Reportar problema"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8l-6-3l-6 3l-6-3z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 13V5a2 2 0 012-2h14a2 2 0 012 2v8" />
          </svg>
        </button>

        <button
          onclick={onClose}
          class="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white/40 hover:text-white sm:hidden"
          aria-label="Cerrar reporte"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <div class="flex bg-white/5 p-1 rounded-2xl border border-white/5 flex-1 sm:flex-none backdrop-blur-xl">
          <button
            class={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            onclick={() => activeTab = 'dashboard'}
          >
            Dashboard
          </button>
          <button
            class={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            onclick={() => activeTab = 'history'}
          >
            Historial
          </button>
        </div>

        <button
          onclick={() => showReportModal = true}
          class="hidden sm:flex p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white/40 hover:text-white border border-white/5 mr-2 items-center gap-2"
          aria-label="Reportar problema"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8l-6-3l-6 3l-6-3z" />
          </svg>
          <span class="text-xs font-bold uppercase tracking-widest hidden lg:inline">Reportar</span>
        </button>

        <button
          onclick={onClose}
          class="hidden sm:flex p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white/40 hover:text-white border border-white/5"
          aria-label="Cerrar reporte"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      {#if loading}
        <div class="flex flex-col items-center justify-center py-20 gap-4">
          <div class="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-sm text-white/40 animate-pulse">Analizando redes neuronales locales...</p>
        </div>
      {:else}

        <!-- DASHBOARD VIEW -->
        {#if activeTab === 'dashboard'}
          {#if !userProfile || userProfile.totalQuestions < 5}
            <div class="text-center py-16 space-y-8 max-w-lg mx-auto">
              <div class="relative">
                <div class="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto text-4xl shadow-2xl animate-pulse">
                  🎓
                </div>
                <div class="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
              </div>
              <div class="relative z-10">
                <h3 class="text-2xl font-black text-white mb-2 leading-tight">Forjando tu Inteligencia</h3>
                <p class="text-white/40 text-sm leading-relaxed px-6">
                  Estamos analizando tus patrones. Completa 5 exámenes para desbloquear tu <span class="text-emerald-400 font-bold">MMR</span> y perfil detallado.
                </p>
              </div>
              <div class="px-10">
                <div class="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5 p-0.5">
                  <div class="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(52,211,153,0.3)]" style="width: {(userProfile?.totalQuestions || 0) / 5 * 100}%"></div>
                </div>
                <p class="text-[10px] text-emerald-400 font-black uppercase tracking-widest mt-3">
                  Progreso: {userProfile?.totalQuestions || 0} / 5 preguntas completadas
                </p>
              </div>

              <button
                onclick={handleGoToExams}
                class="mt-4 px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
              >
                Comenzar Entrenamiento
              </button>
            </div>
          {:else}
            <div class="space-y-6 pb-10" in:fade={{duration: 400}}>

              <!-- 0. Activity Heatmap -->
              <div class="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 backdrop-blur-md">
                 <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-5 flex items-center justify-between">
                   <span class="flex items-center gap-2">
                     <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                     Racha de Actividad
                   </span>
                   <span class="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-lg text-[9px]">Últimos 60 días</span>
                 </h3>
                 <div class="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">
                   {#each activityDays as day}
                     <div
                       class={`w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-md transition-all duration-300 hover:scale-125 hover:z-10 relative group border
                         ${day.level === 0 ? 'bg-white/5 border-white/5' : ''}
                         ${day.level === 1 ? 'bg-emerald-950/40 border-emerald-500/20' : ''}
                         ${day.level === 2 ? 'bg-emerald-800/60 border-emerald-500/40' : ''}
                         ${day.level === 3 ? 'bg-emerald-600/80 border-emerald-400/60' : ''}
                         ${day.level === 4 ? 'bg-emerald-400 border-white shadow-[0_0_15px_rgba(52,211,153,0.4)]' : ''}
                       `}
                     >
                       <div class="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-3 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-20 transition-all scale-75 group-hover:scale-100 shadow-2xl">
                         {day.count} <span class="font-medium">preguntas</span>
                         <div class="text-[8px] opacity-40 font-medium">{day.date}</div>
                         <div class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                       </div>
                     </div>
                   {/each}
                 </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                <!-- 1. Stats Card -->
                <div class="bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden group shadow-2xl">
                  <div class="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-[60px] group-hover:bg-emerald-500/10 transition-colors"></div>

                  <div class="flex items-center justify-between mb-8">
                    <div class="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">SIMULADO ICFES</div>
                    <div class="flex gap-2">
                        <button
                          class="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white/10 hover:text-emerald-400 border border-white/5"
                          onclick={(e) => {
                            e.stopPropagation();
                            const score = userProfile?.simulatedIcfesScore || 0;
                            const text = `¡Mi Puntaje Simulado ICFES es ${score}/500 en SaberParaTodos! 🚀`;
                            navigator.clipboard.writeText(text);
                          }}
                        >
                         <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                         </svg>
                        </button>

                        <button
                          class="p-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl transition-all text-emerald-500 border border-emerald-500/20"
                          onclick={(e) => { e.stopPropagation(); showHelpModal = true; }}
                          aria-label="Ayuda sobre el puntaje"
                        >
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                    </div>
                  </div>

                  <div class="flex items-end gap-3 mb-2">
                    <div class={`text-7xl font-black tracking-tighter ${getRankColor(userProfile.globalMMR)} drop-shadow-2xl`}>
                      {userProfile.simulatedIcfesScore}
                    </div>
                    <div class="text-xl font-black text-white/20 mb-3 tracking-widest">/500</div>
                  </div>

                  <div class="mb-8">
                    <div class="text-xl font-black text-white tracking-tight flex items-center gap-2 mb-2">
                      {userProfile.rankTitle}
                      <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    </div>
                    <div class="text-[10px] text-white/40 font-medium uppercase tracking-[0.1em] leading-relaxed">
                      El puntaje simulado se basa en tu MMR actual ({userProfile.globalMMR}) y precisión global.
                    </div>
                  </div>

                  <div class="space-y-4 pt-6 border-t border-white/5">
                     <div class="flex justify-between items-center group/item">
                       <span class="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em]">Technical Rating</span>
                       <span class="text-sm font-black text-emerald-400">{userProfile.globalMMR} <span class="text-[10px] opacity-40">MMR</span></span>
                     </div>
                     <div class="flex justify-between items-center group/item">
                       <span class="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em]">Knowledge Base</span>
                       <span class="text-sm font-black text-white">{userProfile.totalQuestions} <span class="text-[10px] opacity-40">Q</span></span>
                     </div>
                     <div class="flex justify-between items-center group/item">
                        <span class="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em]">Global Accuracy</span>
                        <span class="text-sm font-black text-white">{Math.round(userProfile.globalAccuracy * 100)}%</span>
                      </div>
                  </div>

                  <!-- 🆕 Percentile Rank Integration -->
                  <div class="mt-8 pt-8 border-t border-white/5">
                    <PercentileRank 
                      percentile={Math.min(99, Math.max(1, (userProfile.globalMMR - 800) / 800 * 100))} 
                    />
                  </div>
                </div>

                <!-- 2. Insights & AI Prompt Panel -->
                <div class="md:col-span-2 flex flex-col gap-6">
                   <!-- Advanced Metrics -->
                   <div class="grid grid-cols-2 gap-4">
                      <div class="bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center text-center group hover:bg-white/[0.07] transition-all">
                        <div class="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Consistencia</div>
                        <div class="text-3xl font-black text-emerald-400 drop-shadow-lg">{userProfile.advancedMetrics.consistencyScore}</div>
                        <div class="w-12 h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                          <div class="h-full bg-emerald-500" style="width: {userProfile.advancedMetrics.consistencyScore}%"></div>
                        </div>
                      </div>

                      <div class="bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center text-center group hover:bg-white/[0.07] transition-all">
                        <div class="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Respuesta</div>
                        {#if userProfile.advancedMetrics.avgTimeCorrect > 0}
                          {@const seconds = Math.round(userProfile.advancedMetrics.avgTimeCorrect / 1000)}
                          <div class="text-3xl font-black {seconds > 120 ? 'text-red-400' : 'text-emerald-400'} drop-shadow-lg">
                            {seconds}s
                          </div>
                        {:else}
                          <div class="text-3xl font-black text-white/10">--</div>
                        {/if}
                        <div class="text-[9px] font-bold text-white/20 mt-2 uppercase">Promedio p/ Pregunta</div>
                      </div>
                   </div>

                   <!-- Analysis List -->
                   <div class="flex-1 bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-[2.5rem] p-8 relative overflow-hidden group">
                     <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-[60px]"></div>

                     <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-6 flex items-center gap-3">
                       <span class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                       Análisis Cognitivo
                     </h3>

                     <div class="space-y-4">
                       {#each insights as insight}
                         <div class="flex gap-4 items-start bg-white/5 hover:bg-white/[0.08] p-5 rounded-2xl border border-white/5 transition-all transform hover:translate-x-1">
                           <div class="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-lg shrink-0">
                             💡
                           </div>
                           <p class="text-[13px] text-indigo-50/70 leading-relaxed font-medium">{@html insight}</p>
                         </div>
                       {/each}
                       {#if insights.length === 0}
                         <div class="flex flex-col items-center justify-center py-10 opacity-20">
                            <div class="text-4xl mb-4">🔍</div>
                            <div class="text-xs font-black uppercase tracking-widest">Calculando patrones...</div>
                         </div>
                       {/if}
                     </div>
                   </div>
                </div>

                <!-- 3. Progress Charts -->
                <div class="md:col-span-3 bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
                  <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-8 flex items-center gap-3">
                    <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Evolución Estratégica
                  </h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- MMR Progression -->
                    <div class="bg-black/40 rounded-3xl p-6 border border-white/5 backdrop-blur-xl">
                      <div class="text-[10px] font-black text-white/20 uppercase tracking-[0.15em] mb-6">Tendencia MMR</div>
                      {#if mmrHistory.length >= 2}
                        <SimpleChart 
                          data={mmrHistory} 
                          type="line" 
                          color="#10b981" 
                          referenceValue={1200}
                          height={160}
                        />
                        <div class="flex justify-between items-center mt-6">
                            <div class="flex flex-col">
                              <span class="text-[9px] font-black text-white/20 uppercase tracking-widest">Apertura</span>
                              <span class="text-sm font-black text-white/60">{Math.round(mmrHistory[0])}</span>
                            </div>
                            <div class="flex flex-col items-end">
                              <span class="text-[9px] font-black text-white/20 uppercase tracking-widest">Actual</span>
                              <span class={`text-lg font-black ${mmrHistory[mmrHistory.length-1] >= mmrHistory[0] ? 'text-emerald-400' : 'text-red-400'}`}>
                                {Math.round(mmrHistory[mmrHistory.length-1])}
                                <span class="text-xs">{mmrHistory[mmrHistory.length-1] >= mmrHistory[0] ? '▲' : '▼'}</span>
                              </span>
                            </div>
                        </div>
                      {:else}
                        <div class="h-40 flex flex-col items-center justify-center gap-4 opacity-20">
                          <div class="text-3xl">📉</div>
                          <div class="text-[10px] font-black uppercase tracking-widest text-center px-10 leading-relaxed">Secuencia interrumpida. Completa 2 exámenes continuos.</div>
                        </div>
                      {/if}
                    </div>

                    <!-- Accuracy Trend -->
                    <div class="bg-black/40 rounded-3xl p-6 border border-white/5 backdrop-blur-xl">
                      <div class="text-[10px] font-black text-white/20 uppercase tracking-[0.15em] mb-6">Precisión de Fuego</div>
                      {#if accuracyHistory.length >= 2}
                        <SimpleChart 
                          data={accuracyHistory} 
                          type="bar" 
                          color="#f59e0b" 
                          referenceValue={60}
                          height={160}
                        />
                        <div class="flex justify-between items-center mt-6">
                            <div class="flex flex-col">
                              <span class="text-[9px] font-black text-white/20 uppercase tracking-widest">Promedio</span>
                              <span class="text-sm font-black text-white/60">{Math.round(accuracyHistory.reduce((a,b) => a+b, 0) / accuracyHistory.length)}%</span>
                            </div>
                            <div class="flex flex-col items-end">
                              <span class="text-[9px] font-black text-white/20 uppercase tracking-widest">Peak</span>
                              <span class="text-lg font-black text-emerald-400">{Math.max(...accuracyHistory)}%</span>
                            </div>
                        </div>
                      {:else}
                        <div class="h-40 flex flex-col items-center justify-center gap-4 opacity-20">
                          <div class="text-3xl">🎯</div>
                          <div class="text-[10px] font-black uppercase tracking-widest text-center px-10 leading-relaxed">No hay ráfagas de datos suficientes.</div>
                        </div>
                      {/if}
                    </div>
                  </div>
                </div>

                <!-- 4. Subject Performance -->
                <div class="md:col-span-3 bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
                  <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-8 flex items-center justify-between">
                    <span>Cluster de Asignaturas</span>
                    <span class="text-[8px] bg-white/5 px-2 py-1 rounded">Ordenado por Dominio</span>
                  </h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each Object.values(userProfile.subjects).sort((a,b) => b.mmr - a.mmr) as subj}
                      <div class="bg-black/30 rounded-3xl p-5 border border-white/5 hover:border-emerald-500/30 transition-all group overflow-hidden relative">
                        <div class="absolute -right-4 -bottom-4 text-6xl opacity-[0.03] grayscale transition-all group-hover:scale-110 group-hover:opacity-[0.08] pointer-events-none">
                          {subj.name.substring(0, 2).toUpperCase()}
                        </div>

                        <div class="flex justify-between items-center mb-4">
                          <span class="text-[11px] font-black text-white truncate max-w-[60%] uppercase tracking-tight">{subj.name}</span>
                          <span class="text-[10px] font-black bg-emerald-500 text-black px-2 py-0.5 rounded-sm">{Math.round(subj.mmr)}</span>
                        </div>

                        <div class="space-y-4">
                          <PerformanceLevels 
                            score={subj.accuracy * 100} 
                            subject={subj.name} 
                          />
                          
                          <div class="text-[9px] font-bold text-white/20 flex justify-between">
                            <span>RECORRIDO</span>
                            <span>{subj.questionsAnswered} PREGUNTAS</span>
                          </div>
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
                <!-- 🆕 4.0 Competency Radar -->
                {#if competencyStats.length >= 3}
                  <div class="md:col-span-3 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8">
                    <div class="flex-1">
                      <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2 flex items-center gap-3">
                        <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        Radar de Competencias
                      </h3>
                      <p class="text-xs text-white/50 leading-relaxed mb-6">
                        Visualización holística de tus habilidades cognitivas. Un gráfico equilibrado indica un aprendizaje integral.
                      </p>

                      <div class="grid grid-cols-2 gap-4">
                         <div class="bg-black/20 rounded-xl p-3 border border-white/5">
                            <div class="text-[9px] text-white/30 uppercase tracking-widest mb-1">Mejor Desempeño</div>
                            <div class="text-sm font-black text-emerald-400">
                              {competencyStats.sort((a,b) => b.correct/b.seen - a.correct/a.seen)[0]?.name || '-'}
                            </div>
                         </div>
                         <div class="bg-black/20 rounded-xl p-3 border border-white/5">
                            <div class="text-[9px] text-white/30 uppercase tracking-widest mb-1">Área de Oportunidad</div>
                            <div class="text-sm font-black text-yellow-400">
                              {competencyStats.sort((a,b) => a.correct/a.seen - b.correct/b.seen)[0]?.name || '-'}
                            </div>
                         </div>
                      </div>
                    </div>

                    <div class="shrink-0">
                      <RadarChart
                        data={competencyStats.slice(0, 6).map(c => ({
                          label: c.name,
                          value: (c.correct / c.seen) * 100,
                          fullMark: 100
                        }))}
                        size={320}
                      />
                    </div>
                  </div>
                {/if}

    <!-- 4. Competency Gaps -->
              <div class="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <!-- Strongest -->
                 <div class="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-5">
                   <h3 class="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">Fortalezas (Top 3)</h3>
                   <div class="space-y-2">
                     {#if topStrengths.length > 0}
                       {#each topStrengths as item}
                         <div class="flex items-center justify-between text-sm py-2 border-b border-emerald-500/10 last:border-0 pl-2">
                           <span class="text-emerald-100/80">{item.name}</span>
                           <span class="font-mono text-emerald-400">{Math.round((item.correct/item.seen)*100)}%</span>
                         </div>
                       {/each}
                     {:else}
                        <div class="space-y-3">
                          <p class="text-xs text-white/40 italic">Datos insuficientes para determinar fortalezas.</p>
                          {#if !metricsProgress.isUnlocked}
                            <div class="bg-emerald-900/20 rounded-lg p-3 border border-emerald-500/10">
                              <div class="flex items-center gap-2 mb-2">
                                <span class="text-lg">🔓</span>
                                <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest">Desbloquear Métricas</span>
                              </div>
                              <div class="text-xs text-white/60 mb-2">
                                Completa <span class="font-bold text-emerald-400">{metricsProgress.remainingTotal}</span> preguntas más para ver tus fortalezas.
                              </div>
                              <div class="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                                <div
                                  class="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full transition-all duration-500"
                                  style="width: {Math.min(100, (metricsProgress.totalQuestions / metricsProgress.neededTotal) * 100)}%"
                                ></div>
                              </div>
                            </div>
                          {:else}
                            <div class="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/10 text-[10px] text-white/50 leading-relaxed italic text-center">
                              Análisis en curso... Sigue practicando para que el sistema identifique tus fortalezas por competencia.
                            </div>
                          {/if}
                        </div>
                     {/if}
                   </div>
                 </div>

                 <!-- Weakest -->
                 <div class="bg-red-900/10 border border-red-500/20 rounded-xl p-5">
                   <h3 class="text-xs font-bold uppercase tracking-widest text-red-400 mb-4">Áreas de Mejora (Top 3)</h3>
                    <div class="space-y-2">
                     {#if topWeaknesses.length > 0}
                       {#each topWeaknesses as item}
                         <div class="flex items-center justify-between text-sm py-2 border-b border-red-500/10 last:border-0 pl-2">
                           <span class="text-red-100/80">{item.name}</span>
                           <span class="font-mono text-red-400">{Math.round((item.correct/item.seen)*100)}%</span>
                         </div>
                       {/each}
                     {:else}
                        <div class="space-y-3">
                          <p class="text-xs text-white/40 italic">Datos insuficientes para determinar debilidades.</p>
                          {#if !metricsProgress.isUnlocked}
                            <div class="bg-red-900/20 rounded-lg p-3 border border-red-500/10">
                              <div class="flex items-center gap-2 mb-2">
                                <span class="text-lg">🎯</span>
                                <span class="text-xs font-bold text-red-400 uppercase tracking-widest">Identificar Áreas de Mejora</span>
                              </div>
                              <div class="text-xs text-white/60 mb-2">
                                Responde <span class="font-bold text-red-400">{metricsProgress.remainingTotal}</span> preguntas más para identificar dónde mejorar.
                              </div>
                              <div class="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                                <div
                                  class="bg-gradient-to-r from-red-600 to-red-400 h-full transition-all duration-500"
                                  style="width: {Math.min(100, (metricsProgress.totalQuestions / metricsProgress.neededTotal) * 100)}%"
                                ></div>
                              </div>
                            </div>
                          {:else}
                            <div class="bg-red-900/20 rounded-lg p-4 border border-red-500/10 text-[10px] text-white/50 leading-relaxed italic text-center">
                              Diversifica tus prácticas para permitirle a la IA mapear tus áreas de mejora con precisión.
                            </div>
                          {/if}
                        </div>
                     {/if}
                   </div>
                 </div>
              </div>

              <!-- 🆕 4.5. Temas Críticos (Critical Topics Graph) -->
              {#if userProfile.topics}
                {@const critTopics = Object.values(userProfile.topics).filter(t => t.seen >= 3 && t.accuracy < 0.6).sort((a,b) => a.accuracy - b.accuracy).slice(0, 5)}
                {#if critTopics.length > 0}
                  <div class="md:col-span-3 bg-gradient-to-r from-red-900/10 to-transparent border border-red-500/20 rounded-xl p-6">
                    <h3 class="text-sm font-bold uppercase tracking-widest text-red-400 mb-6 flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      Temas Críticos (Alta Prioridad)
                    </h3>
                    <div class="space-y-4">
                      {#each critTopics as topic}
                        <div>
                          <div class="flex justify-between items-center text-xs mb-1">
                            <span class="text-white font-bold">{topic.name}</span>
                            <span class="text-red-400 font-mono">{Math.round(topic.accuracy * 100)}%</span>
                          </div>
                          <div class="h-2 bg-black/40 rounded-full overflow-hidden flex">
                            <!-- Correct part -->
                            <div class="h-full bg-red-500" style="width: {topic.accuracy * 100}%"></div>
                            <!-- Incorrect part (implied by gaps) -->
                          </div>
                          <div class="text-[10px] text-white/30 text-right mt-0.5">
                            Basado en {topic.seen} preguntas
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}
              {/if}

              <!-- 5. Plan de Mejora Personalizado -->
              <div class="md:col-span-3 bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/20 rounded-xl p-6 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

                <h3 class="text-sm font-bold uppercase tracking-widest text-blue-400 mb-6 flex items-center gap-2 relative z-10">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Plan de Mejora Personalizado
                </h3>

                {#if weakAreas.length > 0}
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                    <!-- Step 1: Identificar -->
                    <div class="bg-black/20 rounded-lg p-5 border border-blue-500/10 relative group hover:border-blue-500/30 transition-all">
                      <div class="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        1
                      </div>
                      <h4 class="text-sm font-bold text-blue-300 mb-3 mt-2">Identificar Debilidades</h4>
                      <div class="space-y-2">
                        {#each weakAreas as area}
                          <div class="flex items-center gap-2 text-xs">
                            <div class="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                            <span class="text-white/70">{area.name}</span>
                            <span class="ml-auto text-red-400 font-mono">{Math.round((area.correct/area.seen)*100)}%</span>
                          </div>
                        {/each}
                      </div>
                    </div>

                    <!-- Step 2: Practicar -->
                    <div class="bg-black/20 rounded-lg p-5 border border-blue-500/10 relative group hover:border-blue-500/30 transition-all">
                      <div class="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        2
                      </div>
                      <h4 class="text-sm font-bold text-blue-300 mb-3 mt-2">Práctica Dirigida</h4>
                      <div class="space-y-3">
                        <div class="flex items-start gap-2 text-xs">
                          <svg class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span class="text-white/70">Realiza 5 exámenes enfocados en tus áreas débiles</span>
                        </div>
                        <div class="flex items-start gap-2 text-xs">
                          <svg class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span class="text-white/70">Revisa las explicaciones de cada pregunta fallada</span>
                        </div>
                        <div class="flex items-start gap-2 text-xs">
                          <svg class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span class="text-white/70">Toma notas de conceptos clave</span>
                        </div>
                      </div>
                    </div>

                    <!-- Step 3: Evaluar -->
                    <div class="bg-black/20 rounded-lg p-5 border border-blue-500/10 relative group hover:border-blue-500/30 transition-all">
                      <div class="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        3
                      </div>
                      <h4 class="text-sm font-bold text-blue-300 mb-3 mt-2">Evaluar Progreso</h4>
                      <div class="space-y-3">
                        <div class="text-xs text-white/70">
                          Meta de mejora:
                        </div>
                        {#each weakAreas as area}
                          {@const currentAcc = Math.round((area.correct/area.seen)*100)}
                          {@const targetAcc = Math.min(currentAcc + 20, 90)}
                          <div class="space-y-1">
                            <div class="flex justify-between text-[10px]">
                              <span class="text-white/50">{area.name.substring(0, 15)}...</span>
                              <span class="text-blue-400 font-mono">{currentAcc}% → {targetAcc}%</span>
                            </div>
                            <div class="h-1 bg-black/40 rounded-full overflow-hidden">
                              <div class="h-full bg-gradient-to-r from-red-500 to-emerald-500" style="width: {(currentAcc/targetAcc)*100}%"></div>
                            </div>
                          </div>
                        {/each}
                      </div>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="mt-6 flex flex-wrap justify-center gap-3 relative z-10">
                    <!-- Generate Study Prompt -->
                    <button
                      onclick={generateStudyPrompt}
                      class="px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                      Generar Guía de Estudio
                    </button>

                    <!-- Start Practice -->
                    <button
                      onclick={onClose}
                      class="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      Practicar Ahora
                    </button>
                  </div>

                                    {#if countryConfig.features?.blog}
<!-- Blog Links for each weak area -->
                  <div class="mt-4 flex flex-wrap justify-center gap-2 relative z-10">
                    {#each weakAreas as area}
                      <button
                        onclick={() => {
                          if (onNavigateToBlog) {
                            onNavigateToBlog(area.name);
                            onClose();
                          }
                        }}
                        class="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-full text-white/60 hover:text-blue-400 transition-colors flex items-center gap-1"
                      >
                        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        Preguntas de {area.name}
                      </button>
                    {/each}
                  </div>
                                  {/if}
{:else}
                  <div class="text-center py-8 text-white/30 text-sm relative z-10">
                    Completa más exámenes para generar tu plan de mejora personalizado
                  </div>
                {/if}
              </div>

              <!-- IA Disclaimer and Feedback -->
              <div class="md:col-span-3 mt-12 py-8 border-t border-white/5 text-center px-6">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-black text-amber-500 uppercase tracking-widest mb-4">
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Contenido Generado por IA
                </div>
                <p class="text-xs text-white/40 leading-relaxed max-w-md mx-auto italic">
                  Este análisis y las preguntas utilizadas son generadas por modelos de IA. Aunque buscamos la máxima precisión, pueden contener errores o desajustes.
                </p>
                <button
                  onclick={() => window.open('https://t.me/sabercol_bot', '_blank')}
                  class="mt-6 text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2 mx-auto border border-emerald-500/20 px-4 py-2 rounded-xl bg-emerald-500/5 hover:bg-emerald-500/10"
                >
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
                  Déjanos tu feedback para mejorar
                </button>
              </div>

            </div>
          </div>
        {/if}

        <!-- HISTORY VIEW -->
        {:else}
          {#if historyResults.length === 0}
            <div class="text-center py-12 space-y-4">
              <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-3xl opacity-30">
                📭
              </div>
              <p class="text-white/40">No hay exámenes guardados aún.</p>
            </div>
          {:else}
            <div class="space-y-3" in:fade={{duration: 200}}>
              {#each historyResults as result (result.id || result.timestamp)}
                <div class="bg-white/5 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all overflow-hidden">
                  <!-- Exam Entry Row -->
                  <button
                    class="w-full p-4 flex items-center justify-between gap-4 group text-left"
                    onclick={() => openExamDetail(result)}
                  >
                    <div class="min-w-0">
                      <div class="flex items-center gap-2 mb-1">
                        <span class="text-xs font-bold uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded text-white/70 group-hover:text-white transition-colors">
                          {result.subject || 'General'}
                        </span>
                        {#if result.grade}
                          <span class="text-[10px] opacity-50 border border-white/10 px-1.5 rounded">
                            Grado {result.grade}°
                          </span>
                        {/if}
                      </div>
                      <div class="text-xs text-white/40 font-mono">
                        {formatDate(result.timestamp)} • {Math.round(result.timeSpentSeconds / 60)} min
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="text-right shrink-0">
                        <div class={`text-xl font-bold ${getGradeColor(result.score)}`}>
                          {result.score}%
                        </div>
                        <div class="text-[10px] text-white/30 uppercase tracking-widest">
                          {result.correctCount}/{result.totalQuestions}
                        </div>
                      </div>
                      <!-- Arrow to indicate it opens detail -->
                      <svg class="w-4 h-4 text-white/20 group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              {/each}
            </div>
          {/if}
        {/if}
      {/if}
    </div>

    <!-- Footer -->
    <div class="p-4 border-t border-white/5 bg-black/20 text-center shrink-0 flex justify-between items-center text-[10px] text-white/20">
       <span>v2.1 Intelligence Engine</span>
       <span>Los datos se procesan localmente. Privacidad 100%.</span>
    </div>

  </div>
</div>

<!-- 🆕 Full Exam Detail Overlay -->
{#if selectedExam}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[1050] flex flex-col bg-[#0d0d0d]"
    transition:fade={{ duration: 200 }}
    role="dialog"
    aria-modal="true"
    aria-label="Informe del examen"
  >
    <!-- Top bar -->
    <div class="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-white/10 bg-[#121212]/80 backdrop-blur-sm shrink-0">
      <button
        onclick={closeExamDetail}
        class="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white/50 hover:text-white flex items-center gap-2"
        aria-label="Volver al historial"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="text-xs font-bold uppercase tracking-widest hidden sm:inline">Historial</span>
      </button>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-sm font-black text-white uppercase tracking-tight">{selectedExam.subject || 'Examen General'}</span>
          {#if selectedExam.grade}
            <span class="text-[10px] text-white/30 border border-white/10 px-1.5 py-0.5 rounded">Grado {selectedExam.grade}°</span>
          {/if}
        </div>
        <div class="text-[10px] text-white/30 font-mono">{formatDate(selectedExam.timestamp)}</div>
      </div>
    </div>

    <!-- Scrollable content -->
    <div class="flex-1 overflow-y-auto">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-16">

        <!-- Score Hero -->
        <div class="text-center space-y-4">
          <div class="relative w-36 h-36 mx-auto">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle class="text-white/5 stroke-current" stroke-width="7" cx="50" cy="50" r="40" fill="transparent"></circle>
              <circle
                class="{selectedExam.score >= 60 ? 'text-emerald-500' : selectedExam.score >= 40 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out stroke-current"
                stroke-width="7"
                stroke-linecap="round"
                cx="50" cy="50" r="40"
                fill="transparent"
                stroke-dasharray="251.2"
                stroke-dashoffset={251.2 - (251.2 * selectedExam.score) / 100}
              ></circle>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-4xl font-black text-white">{selectedExam.score}%</span>
              <span class="text-[10px] uppercase tracking-widest opacity-40">Precisión</span>
            </div>
          </div>
          <p class="text-xs uppercase tracking-widest opacity-50">
            {selectedExam.correctCount} de {selectedExam.totalQuestions} Correctas • {Math.round(selectedExam.timeSpentSeconds / 60)} min
          </p>
        </div>

        <!-- Questions Detail -->
        {#if selectedExam.details && selectedExam.details.length > 0}
          <div class="space-y-4">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
              <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Revisión pregunta por pregunta
            </h3>

            {#each selectedExam.details as q, i}
              {@const question = q.question || null}
              {@const userAnswerId = selectedExam.answers ? selectedExam.answers[String(q.questionId)] : undefined}
              {@const isCorrect = q.isCorrect}

              <div class="border rounded-xl overflow-hidden {isCorrect ? 'border-emerald-500/25 bg-emerald-900/5' : 'border-red-500/25 bg-red-900/5'}">
                <!-- Question header -->
                <div class="p-4 sm:p-5 border-b border-white/5">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs font-bold text-white/50">Pregunta {i + 1}</span>
                    <div class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border rounded {isCorrect ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : 'border-red-500 text-red-500 bg-red-500/10'}">
                      {isCorrect ? '✓ Correcta' : '✗ Incorrecta'}
                    </div>
                    {#if q.difficulty}
                      <span class="text-[10px] text-white/20 border border-white/10 px-1.5 rounded">Nivel {q.difficulty}</span>
                    {/if}
                  </div>

                  {#if question?.context}
                    <div class="bg-emerald-900/10 border border-emerald-500/20 rounded-lg p-3 sm:p-4 mb-3 overflow-y-auto max-h-[25vh] scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent">
                       <div class="text-[10px] font-bold text-emerald-400 mb-1.5 uppercase tracking-wider flex items-center gap-2">
                         <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                         </svg>
                         Contexto / Lectura
                       </div>
                       <div class="text-xs sm:text-sm text-gray-300 font-serif leading-relaxed space-y-2">
                         <MathRenderer content={question.context.trim()} />
                       </div>
                    </div>
                  {/if}

                  {#if question?.text}
                    <div class="text-sm sm:text-base text-white/90 leading-relaxed">
                      <MathRenderer content={question.text} />
                    </div>
                  {:else}
                    <div class="font-mono text-xs text-white/30 italic">{q.questionId}</div>
                  {/if}
                </div>

                <!-- Options & answers -->
                <div class="p-4 sm:p-5 space-y-3">
                  {#if question?.options && question.options.length > 0}
                    <!-- Show all options with highlights -->
                    <div class="space-y-2">
                      {#each question.options as opt}
                        {@const isTheCorrect = opt.id === question.correctOptionId}
                        {@const isUserAnswer = opt.id === userAnswerId}
                        <div class="flex items-start gap-3 p-3 rounded-lg border transition-all
                          {isTheCorrect ? 'bg-emerald-500/10 border-emerald-500/30' :
                           isUserAnswer && !isCorrect ? 'bg-red-500/10 border-red-500/30' :
                           'bg-white/3 border-white/5'}"
                        >
                          <span class="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold
                            {isTheCorrect ? 'bg-emerald-500 text-white' :
                             isUserAnswer && !isCorrect ? 'bg-red-500/70 text-white' :
                             'bg-white/10 text-white/40'}"
                          >
                            {opt.id}
                          </span>
                          <div class="flex-1 text-sm {isTheCorrect ? 'text-emerald-100' : isUserAnswer && !isCorrect ? 'text-red-100/80' : 'text-white/50'}">
                            <MathRenderer content={opt.text} />
                          </div>
                          {#if isTheCorrect}
                            <span class="text-emerald-400 text-sm shrink-0">✓</span>
                          {:else if isUserAnswer && !isCorrect}
                            <span class="text-red-400 text-sm shrink-0">✗</span>
                          {/if}
                        </div>
                      {/each}
                    </div>
                  {:else}
                    <!-- Fallback if question data lost (old exam) -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div class="p-3 bg-white/5 border border-white/5 rounded-lg">
                        <span class="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Tu Respuesta</span>
                        <span class="{isCorrect ? 'text-emerald-400' : 'text-red-400'} font-bold">{userAnswerId || '-'}</span>
                      </div>
                      {#if !isCorrect && q.correctOptionId}
                        <div class="p-3 bg-white/5 border border-emerald-500/20 rounded-lg">
                          <span class="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Respuesta Correcta</span>
                          <span class="text-emerald-400 font-bold">{q.correctOptionId}</span>
                        </div>
                      {/if}
                    </div>
                  {/if}

                  <!-- Explanation -->
                  {#if question?.explanation}
                    <div class="mt-2 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div class="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Explicación</div>
                      <div class="text-sm text-blue-100/80 leading-relaxed">
                        <MathRenderer content={question.explanation} />
                      </div>
                    </div>
                  {/if}

                  <!-- View question button if no full data -->
                  {#if !question?.text}
                    <button
                      class="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 mt-1"
                      onclick={() => openQuestionModal(q.questionId)}
                    >
                      <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Buscar pregunta en cache
                    </button>
                  {/if}

                  <!-- Comments (saved to Supabase) -->
                  <div class="pt-3 border-t border-white/5 mt-2">
                    <CommentsSection questionId={String(q.questionId)} />
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div class="text-center py-16 space-y-4">
            <div class="text-5xl opacity-20">📋</div>
            <p class="text-white/30 text-sm">No hay detalles de preguntas guardados para este examen.</p>
            <p class="text-white/20 text-xs max-w-sm mx-auto">
              Los exámenes nuevos guardarán los detalles automáticamente para revisión completa.
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<!-- Question Detail Modal -->
{#if selectedQuestionId}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    transition:fade
    onclick={closeQuestionModal}
    role="dialog"
    aria-modal="true"
    aria-labelledby="question-modal-title"
    tabindex="-1"
  >
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div
      class="bg-[#1E1E1E] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      onclick={(e) => e.stopPropagation()}
    >
      <!-- Modal Header -->
      <div class="p-4 border-b border-white/5 flex items-center justify-between bg-[#121212]/50">
        <div class="flex items-center gap-2">
          <span class="text-lg">📖</span>
          <div>
            <h3 class="font-bold text-white text-sm">Detalle de Pregunta</h3>
            <span class="text-[10px] font-mono text-emerald-400">{selectedQuestionId}</span>
          </div>
        </div>
        <button
          onclick={closeQuestionModal}
          class="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
          aria-label="Cerrar detalle"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        {#if loadingQuestion}
          <div class="flex flex-col items-center justify-center py-12 gap-4">
            <div class="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p class="text-sm text-white/40">Cargando pregunta...</p>
          </div>
        {:else if selectedQuestionData}
          <!-- Question Card -->
          <div class="bg-white/5 rounded-xl p-6 border border-white/10">
            <!-- Category & Difficulty -->
            <div class="flex flex-wrap justify-between items-start gap-2 mb-4">
              <span class="text-xs font-bold uppercase tracking-widest text-emerald-500">
                {selectedQuestionData.category}
              </span>
              <div class="flex gap-2 text-[10px] uppercase tracking-widest text-white/40">
                <span class="px-2 py-0.5 bg-white/5 rounded border border-white/10">Grado {selectedQuestionData.grade}°</span>
                <span class="px-2 py-0.5 bg-white/5 rounded border border-white/10">Nivel {selectedQuestionData.difficulty}</span>
              </div>
            </div>

            <!-- Question Text -->
            <div class="text-lg text-white leading-relaxed mb-6">
              <MathRenderer content={selectedQuestionData.text} />
            </div>

            <!-- Options -->
            <div class="space-y-3">
              {#each selectedQuestionData.options as option, i}
                {@const isCorrect = option.id === selectedQuestionData.correctOptionId}
                <div class="flex items-start gap-3 p-3 rounded-lg {isCorrect ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-white/5 border border-white/10'}">
                  <span class="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full {isCorrect ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/50'} text-sm font-bold">
                    {option.id}
                  </span>
                  <div class="flex-1 text-sm {isCorrect ? 'text-emerald-100' : 'text-white/70'}">
                    <MathRenderer content={option.text} />
                  </div>
                  {#if isCorrect}
                    <span class="text-emerald-400 text-sm">✓</span>
                  {/if}
                </div>
              {/each}
            </div>

            <!-- Explanation -->
            {#if selectedQuestionData.explanation}
              <div class="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div class="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Explicación</div>
                <div class="text-sm text-blue-100/80 leading-relaxed">
                  <MathRenderer content={selectedQuestionData.explanation} />
                </div>
              </div>
            {/if}
          </div>

          <!-- Question Context / Metadata -->
          {#if selectedQuestionData.context}
            <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <div class="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Texto de Referencia
              </div>
              <div class="text-sm text-amber-100/80 leading-relaxed italic">
                "{selectedQuestionData.context}"
              </div>
            </div>
          {/if}

          <!-- Question Metadata Card -->
          <div class="bg-white/5 border border-white/10 rounded-xl p-4">
            <div class="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Información Adicional</div>
            <div class="grid grid-cols-2 gap-3 text-xs">
              {#if selectedQuestionData.topic}
                <div class="bg-white/5 rounded-lg p-2">
                  <span class="text-white/40">Tema:</span>
                  <span class="text-emerald-400 font-bold ml-1">{selectedQuestionData.topic}</span>
                </div>
              {/if}
              {#if selectedQuestionData.bundleId}
                <div class="bg-white/5 rounded-lg p-2">
                  <span class="text-white/40">Bundle:</span>
                  <span class="text-white/60 font-mono ml-1">{selectedQuestionData.bundleId}</span>
                </div>
              {/if}
              <div class="bg-white/5 rounded-lg p-2">
                <span class="text-white/40">ID:</span>
                <span class="text-white/60 font-mono ml-1 truncate">{selectedQuestionData.id}</span>
              </div>
              <div class="bg-white/5 rounded-lg p-2">
                <span class="text-white/40">Variante:</span>
                <span class="text-white/60 font-mono ml-1">{selectedQuestionData.variant || 'v1'}</span>
              </div>
            </div>
          </div>
        {:else}
          <!-- Not Found -->
          <div class="text-center py-12 px-6">
            <div class="text-4xl mb-4 opacity-30">🔍</div>
            <h4 class="text-lg font-bold text-white/60 mb-3">Pregunta no disponible</h4>
            <div class="text-sm text-white/40 space-y-2 max-w-md mx-auto">
              <p>
                Esta pregunta es de un examen anterior y ya no está disponible en la rotación actual de preguntas.
              </p>
              <p class="text-xs text-white/30 mt-4">
                💡 <strong>Buenas noticias:</strong> A partir de ahora, todos los exámenes nuevos guardarán las preguntas completas localmente, así siempre podrás revisarlas.
              </p>
            </div>
          </div>
        {/if}
      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t border-white/5 bg-black/20 flex justify-end">
        <button
          onclick={closeQuestionModal}
          class="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white/70 hover:text-white transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- MMR Help Modal -->
{#if showHelpModal}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    transition:fade
    onclick={() => showHelpModal = false}
    role="dialog"
    aria-modal="true"
    aria-labelledby="help-modal-title"
    tabindex="-1"
  >
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div
      class="bg-[#1E1E1E] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      onclick={(e) => e.stopPropagation()}
    >
      <!-- Modal Header -->
      <div class="p-4 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-emerald-900/30 to-transparent">
        <div class="flex items-center gap-2">
          <span class="text-2xl">📊</span>
          <div>
            <h3 id="help-modal-title" class="font-bold text-white text-lg">Sistema de Calificaciones MMR</h3>
            <span class="text-xs text-white/40">Matchmaking Rating adaptado para educación</span>
          </div>
        </div>
        <button
          onclick={() => showHelpModal = false}
          class="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
          aria-label="Cerrar"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">

        <!-- What is MMR -->
        <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <h4 class="text-emerald-400 font-bold mb-2 flex items-center gap-2">
            <span>🎯</span> ¿Qué es el MMR?
          </h4>
          <p class="text-sm text-white/70 leading-relaxed">
            <strong>MMR (Matchmaking Rating)</strong> es un sistema de puntuación adaptado del algoritmo <strong>ELO</strong>
            usado en ajedrez y videojuegos competitivos. Mide tu nivel de habilidad basándose en tu rendimiento real,
            no solo en el porcentaje de respuestas correctas.
          </p>
        </div>

        <!-- How it works -->
        <div class="space-y-3">
          <h4 class="text-white font-bold flex items-center gap-2">
            <span>⚙️</span> Cómo Funciona
          </h4>
          <div class="grid gap-3">
            <div class="bg-white/5 border border-white/10 rounded-lg p-3 flex gap-3">
              <span class="text-xl">📈</span>
              <div>
                <div class="font-bold text-white text-sm">Ganar puntos</div>
                <p class="text-xs text-white/50">Responde correctamente para subir tu rating. Preguntas más difíciles dan más puntos.</p>
              </div>
            </div>
            <div class="bg-white/5 border border-white/10 rounded-lg p-3 flex gap-3">
              <span class="text-xl">📉</span>
              <div>
                <div class="font-bold text-white text-sm">Perder puntos</div>
                <p class="text-xs text-white/50">Al equivocarte pierdes puntos, pero menos si la pregunta era muy difícil para tu nivel.</p>
              </div>
            </div>
            <div class="bg-white/5 border border-white/10 rounded-lg p-3 flex gap-3">
              <span class="text-xl">⚖️</span>
              <div>
                <div class="font-bold text-white text-sm">Sistema balanceado</div>
                <p class="text-xs text-white/50">Si tu rating es alto, se espera que aciertes más. Si es bajo, equivocarte penaliza menos.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Ranks Table -->
        <div class="space-y-3">
          <h4 class="text-white font-bold flex items-center gap-2">
            <span>🏆</span> Rangos y Niveles
          </h4>
          <div class="bg-black/30 rounded-xl border border-white/10 overflow-hidden">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/10 bg-white/5">
                  <th class="text-left p-3 text-white/40 font-normal uppercase text-xs">Rango</th>
                  <th class="text-center p-3 text-white/40 font-normal uppercase text-xs">MMR</th>
                  <th class="text-left p-3 text-white/40 font-normal uppercase text-xs">Descripción</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <tr class="hover:bg-white/5">
                  <td class="p-3 text-red-400 font-bold">Iniciado</td>
                  <td class="p-3 text-center font-mono text-white/70">0-599</td>
                  <td class="p-3 text-white/50 text-xs">Comenzando el camino de aprendizaje</td>
                </tr>
                <tr class="hover:bg-white/5">
                  <td class="p-3 text-orange-400 font-bold">Aprendiz</td>
                  <td class="p-3 text-center font-mono text-white/70">600-799</td>
                  <td class="p-3 text-white/50 text-xs">Construyendo bases sólidas</td>
                </tr>
                <tr class="hover:bg-white/5">
                  <td class="p-3 text-yellow-400 font-bold">Estudiante</td>
                  <td class="p-3 text-center font-mono text-white/70">800-999</td>
                  <td class="p-3 text-white/50 text-xs">Nivel promedio esperado</td>
                </tr>
                <tr class="hover:bg-white/5">
                  <td class="p-3 text-green-400 font-bold">Avanzado</td>
                  <td class="p-3 text-center font-mono text-white/70">1000-1199</td>
                  <td class="p-3 text-white/50 text-xs">Dominio sólido de conceptos</td>
                </tr>
                <tr class="hover:bg-white/5">
                  <td class="p-3 text-blue-400 font-bold">Experto</td>
                  <td class="p-3 text-center font-mono text-white/70">1200-1399</td>
                  <td class="p-3 text-white/50 text-xs">Rendimiento superior al promedio</td>
                </tr>
                <tr class="hover:bg-white/5">
                  <td class="p-3 text-purple-400 font-bold">Maestro</td>
                  <td class="p-3 text-center font-mono text-white/70">1400-1599</td>
                  <td class="p-3 text-white/50 text-xs">Dominio excepcional</td>
                </tr>
                <tr class="hover:bg-white/5">
                  <td class="p-3 text-emerald-400 font-bold">Gran Maestro</td>
                  <td class="p-3 text-center font-mono text-white/70">1600+</td>
                  <td class="p-3 text-white/50 text-xs">¡Élite académica!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tips -->
        <div class="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <h4 class="text-blue-400 font-bold mb-2 flex items-center gap-2">
            <span>💡</span> Consejos para subir tu MMR
          </h4>
          <ul class="text-xs text-white/60 space-y-1">
            <li>• Practica constantemente - la consistencia importa más que las rachas</li>
            <li>• No te desanimes por las pérdidas - son oportunidades de aprendizaje</li>
            <li>• Enfrenta preguntas difíciles - aunque pierdas, el sistema recompensa el intento</li>
            <li>• Revisa tus errores - entender por qué fallaste mejora más que repetir lo que ya sabes</li>
          </ul>
        </div>

      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t border-white/5 bg-black/20 flex justify-end">
        <button
          onclick={() => showHelpModal = false}
          class="px-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Study Prompt Generator Modal -->
{#if showStudyPromptModal}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    transition:fade
    onclick={() => showStudyPromptModal = false}
    role="dialog"
    aria-modal="true"
    aria-labelledby="study-prompt-title"
    tabindex="-1"
  >
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div
      class="bg-[#1E1E1E] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      onclick={(e) => e.stopPropagation()}
    >
      <!-- Modal Header -->
      <div class="p-4 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-purple-900/30 to-transparent">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🎓</span>
          <div>
            <h3 id="study-prompt-title" class="font-bold text-white text-lg">Guía de Estudio Personalizada</h3>
            <span class="text-xs text-white/40">Copia este prompt y úsalo en ChatGPT, Gemini o Claude</span>
          </div>
        </div>
        <button
          onclick={() => showStudyPromptModal = false}
          class="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
          aria-label="Cerrar"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="flex-1 overflow-y-auto p-6 space-y-4">
        <!-- Instructions -->
        <div class="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
          <h4 class="text-purple-400 font-bold mb-2 flex items-center gap-2">
            <span>💡</span> Cómo usar este prompt
          </h4>
          <ol class="text-sm text-white/70 space-y-1 list-decimal list-inside">
            <li>Copia el texto de abajo</li>
            <li>Abre <a href="https://chat.openai.com" target="_blank" class="text-purple-400 hover:underline">ChatGPT</a>, <a href="https://gemini.google.com" target="_blank" class="text-purple-400 hover:underline">Gemini</a> o <a href="https://claude.ai" target="_blank" class="text-purple-400 hover:underline">Claude</a></li>
            <li>Pega el prompt y envía</li>
            <li>¡Obtén tu guía de estudio personalizada!</li>
          </ol>
        </div>

        <!-- Prompt Text -->
        <div class="bg-black/40 rounded-xl border border-white/10 p-4">
          <div class="flex justify-between items-center mb-3">
            <span class="text-xs text-white/40 uppercase tracking-widest">Tu prompt personalizado</span>
            <button
              onclick={copyPromptToClipboard}
              class="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copiar
            </button>
          </div>
          <pre class="text-sm text-white/80 whitespace-pre-wrap font-mono leading-relaxed max-h-64 overflow-y-auto">{generatedStudyPrompt}</pre>
        </div>

        <!-- ChatGPT Study Mode (🆕) -->
        <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <h4 class="text-emerald-400 font-bold mb-3 flex items-center gap-2">
            <span>💬</span> ChatGPT: Modo Estudio
          </h4>
          <p class="text-xs text-white/60 mb-4">
            Ideal para sesiones interactivas de preguntas y respuestas. ChatGPT actuará como un tutor socrático.
          </p>

          <div class="bg-black/30 rounded-lg p-3">
            <div class="flex justify-between items-center mb-2">
              <span class="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Prompt de Configuración</span>
              <button
                onclick={async () => {
                  try { await navigator.clipboard.writeText(chatgptStudyPrompt); } catch (err) {}
                }}
                class="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar
              </button>
            </div>
            <pre class="text-[10px] text-white/70 whitespace-pre-wrap font-mono leading-relaxed max-h-32 overflow-y-auto">{chatgptStudyPrompt}</pre>
          </div>
        </div>

        <!-- Meta-cognitive Study Tips (🆕) -->
        <div class="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <h4 class="text-blue-400 font-bold mb-3 flex items-center gap-2">
            <span>🧠</span> Consejos Meta-cognitivos
          </h4>
          <p class="text-xs text-white/60 mb-4">
            Mejora tu "Mentalidad de Examen". Este prompt analiza tu velocidad y consistencia para darte tácticas psicológicas.
          </p>

          <div class="bg-black/30 rounded-lg p-3">
            <div class="flex justify-between items-center mb-2">
              <span class="text-[10px] text-blue-400 font-black uppercase tracking-widest">Prompt de Mentoría</span>
              <button
                onclick={async () => {
                  try { await navigator.clipboard.writeText(studyTipsPrompt); } catch (err) {}
                }}
                class="px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
              >
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar
              </button>
            </div>
            <pre class="text-[10px] text-white/70 whitespace-pre-wrap font-mono leading-relaxed max-h-32 overflow-y-auto">{studyTipsPrompt}</pre>
          </div>
        </div>

        <!-- NotebookLM Setup Guide -->
        <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
          <h4 class="text-amber-400 font-bold mb-3 flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span>📓</span> NotebookLM <span class="text-[9px] bg-amber-500 text-black px-1 rounded ml-1">RECOMENDADO</span>
            </div>
            <!-- Toggle -->
            <div class="flex bg-black/40 rounded-lg p-0.5 border border-white/10 text-[10px] font-mono">
              <button
                class={`px-2 py-1 rounded transition-colors ${notebookLMPromptType === 'setup' ? 'bg-amber-500 text-black font-bold' : 'text-white/40 hover:text-white'}`}
                onclick={() => notebookLMPromptType = 'setup'}
              >
                NUEVO
              </button>
              <button
                class={`px-2 py-1 rounded transition-colors ${notebookLMPromptType === 'update' ? 'bg-amber-500 text-black font-bold' : 'text-white/40 hover:text-white'}`}
                onclick={() => notebookLMPromptType = 'update'}
              >
                ACTUALIZAR
              </button>
            </div>
          </h4>

          <!-- Instructions -->
          {#if notebookLMPromptType === 'setup'}
            <ol class="text-sm text-white/70 space-y-3 list-decimal list-inside mb-4">
              <li>
                Abre <a href="https://notebooklm.google.com" target="_blank" class="text-amber-400 hover:underline">NotebookLM</a> y crea un cuaderno.
              </li>
              <li>
                Agrega esta fuente (URL):
                <div class="mt-2 flex items-center gap-2">
                  <code class="bg-black/40 px-3 py-2 rounded text-amber-300 text-xs flex-1 truncate">https://saberparatodos.space/notebooklm</code>
                  <button
                    onclick={async () => {
                      try { await navigator.clipboard.writeText('https://saberparatodos.space/notebooklm'); } catch (err) {}
                    }}
                    class="px-2 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded text-xs text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Copiar
                  </button>
                </div>
              </li>
              <li>Pega el prompt de abajo en el chat para inicializar.</li>
            </ol>
          {:else}
            <!-- Update Instructions -->
            <ol class="text-sm text-white/70 space-y-3 list-decimal list-inside mb-4">
              <li>Abre tu cuaderno existente en NotebookLM.</li>
              <li>
                Copia el texto de abajo y pégalo <strong>en el chat</strong> (o crea una nueva nota).
              </li>
              <li>El asistente actualizará tu plan de estudio con tus nuevos fallos.</li>
            </ol>
          {/if}

          <!-- Prompt Display -->
          <div class="bg-black/30 rounded-lg p-3">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs text-amber-400 font-bold uppercase tracking-widest">
                {notebookLMPromptType === 'setup' ? 'Prompt de Inicio' : 'Prompt de Actualización'}
              </span>
              <button
                onclick={async () => {
                  try {
                    await navigator.clipboard.writeText(notebookLMPromptType === 'setup' ? notebookLMPrompt : notebookLMUpdatePrompt);
                  } catch (err) {
                    console.error('Failed to copy:', err);
                  }
                }}
                class="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded text-xs text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
              >
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar
              </button>
            </div>
            <pre class="text-xs text-white/70 whitespace-pre-wrap font-mono leading-relaxed max-h-32 overflow-y-auto">{notebookLMPromptType === 'setup' ? notebookLMPrompt : notebookLMUpdatePrompt}</pre>
          </div>

          <a
            href="/notebooklm"
            target="_blank"
            class="inline-flex mt-4 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-lg text-sm text-amber-400 hover:text-amber-300 transition-colors items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            Ver Página de Fuentes
          </a>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t border-white/5 bg-black/20 flex justify-between items-center">
        <div class="flex gap-2">
          <a href="https://chat.openai.com" target="_blank" class="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white/60 hover:text-white transition-colors">
            ChatGPT →
          </a>
          <a href="https://gemini.google.com" target="_blank" class="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white/60 hover:text-white transition-colors">
            Gemini →
          </a>
        </div>
        <button
          onclick={() => showStudyPromptModal = false}
          class="px-6 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- 🆕 Help Modal for MMR / Stats -->
{#if showHelpModal}
  <div class="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" transition:fade>
    <div
      class="bg-[#181818] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
      in:slide={{ axis: 'y' }}
    >
      <div class="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-emerald-600/10 to-transparent">
        <h3 class="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
          <span class="text-emerald-400">📊</span> Entendiendo tu Rating (MMR)
        </h3>
        <button onclick={() => showHelpModal = false} class="text-white/40 hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div class="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
        <section class="space-y-3">
          <h4 class="text-xs font-black text-emerald-400 uppercase tracking-tighter">¿Qué es el MMR?</h4>
          <p class="text-sm text-white/70 leading-relaxed">
            El <span class="text-white font-bold">Rating Técnico (MMR)</span> es un sistema de puntuación dinámico (estilo ELO) que mide tu habilidad real basándose en la dificultad de las preguntas que respondes.
          </p>
        </section>

        <section class="space-y-3">
          <h4 class="text-xs font-black text-emerald-400 uppercase tracking-tighter">¿Cómo se calcula?</h4>
          <ul class="text-xs text-white/60 space-y-2 list-disc list-inside">
            <li>Subes puntos al responder correctamente <span class="text-emerald-400 font-bold">preguntas difíciles</span>.</li>
            <li>Bajas puntos si fallas <span class="text-red-400 font-bold">preguntas fáciles</span>.</li>
            <li>El sistema se estabiliza después de <span class="text-white font-bold">20-30 preguntas</span>.</li>
          </ul>
        </section>

        <section class="space-y-3">
          <h4 class="text-xs font-black text-emerald-400 uppercase tracking-tighter">Puntaje Simulado ICFES</h4>
          <p class="text-sm text-white/70 leading-relaxed">
            Convertimos tu MMR a una escala de <span class="text-white font-bold">0 a 500 puntos</span> equivalente al examen real. Es una estimación estadística basada en tu desempeño actual.
          </p>
        </section>

        <div class="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
          <p class="text-[11px] text-emerald-300 italic text-center">
            "Tu rating no define quién eres, sino cuánto has practicado hoy."
          </p>
        </div>
      </div>

      <div class="p-4 bg-black/20 flex justify-end">
        <button
          onclick={() => showHelpModal = false}
          class="px-8 py-2 bg-emerald-600 text-white font-black text-xs uppercase tracking-widest rounded-lg shadow-lg hover:bg-emerald-500 transition-all uppercase"
        >
          Entendido
        </button>
      </div>
    </div>
  </div>
{/if}
