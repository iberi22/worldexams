<script lang="ts">
  import { onMount } from 'svelte';
  import FlashlightCard from './FlashlightCard.svelte';
  import CommentsSection from './CommentsSection.svelte';
  import QuestionFeedback from './QuestionFeedback.svelte';
  import MemoryStatus from './MemoryStatus.svelte';
  import AdBanner from './AdBanner.svelte';
  import ScoreDisplay from './ScoreDisplay.svelte';
  import MathRenderer from './MathRenderer.svelte';
  import ExamRoomResultsView from './ExamRoomResultsView.svelte';

  import { supabase } from '../lib/supabase';
  import {
    saveExamResultLocal,
    getCorrectlyAnsweredIds,
    getAnsweredStats
  } from '../lib/idb-storage';
  import { getUser } from '../lib/auth';
  import type { User } from '@supabase/supabase-js';
  import type { ExamCompletionData } from '../types';

  // Scoring imports
  import { calculateExamScore, type ExamScore, type ExamResult, type QuestionResult } from '../lib/scoring';
  import { getLocalIdentity, type LocalIdentity } from '../lib/identity';
  import { submitScoreInput, getSubmissionUrl, type ScoreSubmissionInput } from '../lib/leaderboard-service';
  import { createScoreIssue, hasGitHubAuth, getManualSubmissionUrl } from '../lib/github-api';
  import { generateQuickChecksum } from '../lib/score-hash';
  import {
    calculateEnglishProficiencyV2,
    generateStudyPlan,
    examResultsToQuestionResults,
    saveEnglishProficiencyLevel,
    getSavedEnglishProficiencyLevel,
    type EnglishProficiencyResult
  } from '../lib/api-service';

  // Props (Svelte 5 Runes)
  interface Props {
    examData: ExamCompletionData;
    questions?: any[];
    userAnswers?: Record<string | number, string>;
    onHome: () => void;
    onLeaderboard: () => void;
    onViewReports?: () => void;
    onLogin: () => void;
    onRegister: () => void;
  }

  let {
    examData,
    questions = [],
    userAnswers = {},
    onHome,
    onLeaderboard,
    onViewReports = undefined,
    onLogin,
    onRegister
  }: Props = $props();

  // State
  let user = $state<User | null>(null);
  let identity = $state<LocalIdentity | null>(null);
  let isSaving = $state(false);
  let saved = $state(false);
  let leaderboardSubmitted = $state(false);
  let examScore = $state<ExamScore | null>(null);
  let activeTab = $state<'individual' | 'room'>('individual');
  let roomResults = $state<any[]>([]);

  // Leaderboard submission state
  let isSubmittingToLeaderboard = $state(false);
  let leaderboardSubmitResult = $state<{ success: boolean; issueUrl?: string; error?: string } | null>(null);
  let hasGitHub = $state(false);
  let currentSubmission = $state<ScoreSubmissionInput | null>(null);

  // NotebookLM State
  let proficiencyResult = $state<EnglishProficiencyResult | null>(null);
  let isEnglishExam = $state(false);
  let isGeneratingPlan = $state(false);

  // Derived
  let safeExamQuestions = $derived(examData?.questions || []);
  let safeQuestions = $derived(Array.isArray(questions) ? questions : []);
  let totalQuestions = $derived(safeQuestions.length);

  let correctCount = $derived(safeQuestions.filter(q => {
    const u = String(userAnswers[q.id] || '').trim().toLowerCase();
    const c = String(q.correctOptionId || '').trim().toLowerCase();
    return u === c && u !== '';
  }).length);

  let percentage = $derived(totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0);

  // Helper function for ExamResult conversion
  function toExamResult(data: ExamCompletionData, questionsList: any[], answers: Record<string | number, string>): ExamResult {
    const safeQ = questionsList && questionsList.length > 0 ? questionsList : (data?.questions || []);
    const questionResults: QuestionResult[] = safeQ.map((q: any, index: number) => {
      const userAnswer = answers[q.id];
      const normalizedUser = String(userAnswer || '').trim().toLowerCase();
      const normalizedCorrect = String(q.correctOptionId || '').trim().toLowerCase();
      const isCorrect = normalizedUser === normalizedCorrect && normalizedUser !== '';
      const examQ = data?.questions?.[index];

      return {
        questionId: String(q?.id || q?.questionId || 'unknown'),
        difficulty: Math.max(1, Math.min(5, q?.difficulty || 3)) as 1 | 2 | 3 | 4 | 5,
        isCorrect: isCorrect,
        timeSeconds: Math.round((examQ?.timeSpentMs || 0) / 1000),
        currentStreak: examQ?.streakCount || 0
      };
    });

    return {
      questions: questionResults,
      totalTimeSeconds: Math.round((data?.totalTimeMs || 0) / 1000),
      startedAt: new Date(Date.now() - (data?.totalTimeMs || 0)).toISOString(),
      completedAt: new Date().toISOString()
    };
  }

  // Calculate Score Effect
  $effect(() => {
    if (examData && safeQuestions.length > 0 && !examScore) {
       const examResult = toExamResult(examData, safeQuestions, userAnswers);
       examScore = calculateExamScore(examResult);
    }
  });

  // NotebookLM / English Profiling Effect
  $effect(() => {
    if (examData && questions.length > 0 && !proficiencyResult) {
      isEnglishExam =
        (examData.subject?.toLowerCase().includes('ingl') || false) ||
        questions.some(q => q.cefr_level || q.cefrLevel || q.englishLevel || q.part?.includes('Part'));

      if (isEnglishExam) {
         const resultInputs = questions.map(q => ({
            id: String(q.id),
            userAnswer: userAnswers[q.id],
            correctOptionId: q.correctOptionId,
            cefrLevel: q.cefrLevel || q.cefr_level || q.englishLevel,
            grade: q.grade || examData.grade
         }));

         const qResults = examResultsToQuestionResults(resultInputs);
         const res = calculateEnglishProficiencyV2(qResults);
         proficiencyResult = res;

         if (res) {
             const existingLevel = getSavedEnglishProficiencyLevel();
             const shouldUpdate = res.confidence >= 60 || (existingLevel && res.estimatedLevelNum > existingLevel.levelNum);
             if (shouldUpdate) {
                saveEnglishProficiencyLevel(res.estimatedLevel, res.estimatedLevelNum, res.confidence);
                if (existingLevel && res.estimatedLevelNum > existingLevel.levelNum) {
                    console.log(`🎉 Level upgraded: ${existingLevel.level} → ${res.estimatedLevel}`);
                }
             }
         }
      }
    }
  });

  // Build Leaderboard Submission Effect
  $effect(() => {
     if (identity && examScore && !currentSubmission) {
         const checksum = generateQuickChecksum(
             examScore.totalScore,
             questions.length,
             correctCount,
             examData.totalTimeMs
         );

         const submission: ScoreSubmissionInput = {
             anonymousId: identity.identity.id,
             displayName: identity.identity.displayName,
             grade: examData.grade,
             region: identity.identity.region?.substring(0, 3).toUpperCase() || 'CO',
             totalPoints: examScore.totalScore,
             questionsAnswered: questions.length,
             correctAnswers: correctCount,
             averageDifficulty: safeExamQuestions.length > 0
                 ? safeExamQuestions.reduce((sum, q) => sum + (q?.difficulty || 0), 0) / safeExamQuestions.length
                 : 0,
             examDurationMs: examData.totalTimeMs,
             timestamp: Date.now(),
             checksum
         };
         currentSubmission = submission;
         submitScoreInput(submission); // Save locally
     }
  });

  function getOptionText(q: any, optionId: string) {
    const opt = q.options.find((o: any) => o.id === optionId);
    return opt ? opt.text : 'Sin respuesta';
  }

  onMount(() => {
    (async () => {
        identity = getLocalIdentity();
        user = await getUser();
        if (user) await saveScoreToSupabase();

        const localAnswers: Record<string, string> = {};
        for (const [qId, optId] of Object.entries(userAnswers)) {
          localAnswers[qId] = optId;
        }

        await saveExamResultLocal(examData, localAnswers);
        hasGitHub = await hasGitHubAuth();
    })();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      user = session?.user ?? null;
      if (user && !saved && !isSaving) {
        saveScoreToSupabase();
      }
      hasGitHub = await hasGitHubAuth();
    });

    let cleanupRoom = () => {};
    if (examData?.roomCode) {
      activeTab = examData.isHost ? 'room' : 'individual';
      try {
          roomResults = JSON.parse(sessionStorage.getItem('room_results') || '[]');
      } catch (e) { console.error(e); }

      const handleResult = (e: CustomEvent) => {
          roomResults = [...roomResults, e.detail];
      };
      const handleLeaderboard = (e: CustomEvent) => {
          roomResults = e.detail;
      };

      window.addEventListener('room-result-received', handleResult as EventListener);
      window.addEventListener('room-leaderboard-update', handleLeaderboard as EventListener);

      cleanupRoom = () => {
          window.removeEventListener('room-result-received', handleResult as EventListener);
          window.removeEventListener('room-leaderboard-update', handleLeaderboard as EventListener);
      };
    }

    return () => {
        subscription.unsubscribe();
        cleanupRoom();
    };
  });

  async function saveScoreToSupabase() {
    if (!user || saved || isSaving) return;
    isSaving = true;
    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_SUPABASE_URL}/functions/v1/submit-exam`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            result: {
              user_name: user.user_metadata?.user_name || user.email?.split('@')[0] || 'Anonymous',
              score: examScore?.totalScore || 0,
              total_questions: questions.length,
              subject: examData.subject || 'General',
              grade: examData.grade || null,
            }
          }),
        }
      );
      if (!response.ok) throw new Error('Error saving');
      saved = true;
    } catch (e) {
      console.error('Error saving score:', e);
    } finally {
      isSaving = false;
    }
  }

  async function submitToLeaderboard() {
    if (!currentSubmission || isSubmittingToLeaderboard || leaderboardSubmitted) return;
    isSubmittingToLeaderboard = true;
    leaderboardSubmitResult = null;

    if (hasGitHub) {
      const result = await createScoreIssue(currentSubmission);
      leaderboardSubmitResult = result;
      if (result.success) leaderboardSubmitted = true;
    } else {
      const url = getManualSubmissionUrl(currentSubmission);
      window.open(url, '_blank');
      leaderboardSubmitResult = { success: true };
      leaderboardSubmitted = true;
    }
    isSubmittingToLeaderboard = false;
  }

  async function handleDownloadNotebook() {
    if (isGeneratingPlan) return;
    isGeneratingPlan = true;
    try {
      const { generateHistoricalEnglishProficiency } = await import('../lib/api-service');
      const globalResult = await generateHistoricalEnglishProficiency();
      const finalResult = globalResult && globalResult.totalQuestions > 0 ? globalResult : proficiencyResult;
      if (!finalResult) return;

      const plan = generateStudyPlan(finalResult);
      const blob = new Blob([plan.sourceContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Plan_Estudio_NotebookLM_${new Date().toISOString().split('T')[0]}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Error generating plan:', e);
    } finally {
      isGeneratingPlan = false;
    }
  }
</script>

<div class="min-h-screen w-full flex flex-col animate-fade-in-up">

  <!-- 🆕 Tabs Navigation (Only if Room Mode) -->
  {#if examData?.roomCode}
      <div class="flex justify-center border-b border-white/10 bg-[#121212]/50 backdrop-blur-md sticky top-0 z-40">
          <button
              class={`px-6 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'individual' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-white/40 hover:text-white/70'}`}
              onclick={() => activeTab = 'individual'}
          >
              Mis Resultados
          </button>
          <button
              class={`px-6 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'room' ? 'border-purple-500 text-purple-400' : 'border-transparent text-white/40 hover:text-white/70'}`}
              onclick={() => activeTab = 'room'}
          >
              Resultados Sala
          </button>
      </div>
  {/if}

  {#if activeTab === 'room' && examData?.roomCode}
       <!-- Room Leaderboard View -->
      <ExamRoomResultsView
        roomCode={examData.roomCode}
        currentSession={{
          sessionId: examData.sessionId || 'unknown',
          roomCode: examData.roomCode,
          isHost: examData.isHost || false,
          userName: user?.email?.split('@')[0] || 'Tú',
          grade: examData.grade,
          subject: examData.subject,
          startedAt: 0,
          questions: [],
          answers: {},
          focusEvents: examData.focusEvents || [],
          focusViolations: examData.focusViolations,
          score: examScore ? Math.round(examScore.stats.accuracy * 100) : 0,
          synced: true
        }}
        externalResults={roomResults}
        onClose={() => activeTab = 'individual'}
      />
  {:else}
      <!-- Main Content (Individual Results) -->
      <div class="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div class="max-w-6xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12 pb-24">

      <!-- Header Score -->
      <div class="text-center space-y-6">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tighter">Resultados</h2>

        <div class="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <!-- Background Circle -->
            <circle
              class="text-white/5 stroke-current"
              stroke-width="6"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <!-- Progress Circle -->
            <circle
              class="text-emerald-500 transition-all duration-1000 ease-out stroke-current"
              stroke-width="6"
              stroke-linecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke-dasharray="251.2"
              stroke-dashoffset={251.2 - (251.2 * percentage) / 100}
            ></circle>
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">{percentage}%</span>
            <span class="text-xs uppercase tracking-widest opacity-40 mt-1">Precisión</span>
          </div>
        </div>

        <p class="text-xs sm:text-sm uppercase tracking-widest opacity-60">
          {correctCount} de {questions.length} Correctas
        </p>
      </div>

      <!-- Score Display -->
      {#if examScore}
        <ScoreDisplay {examScore} />
      {/if}

      <!-- Detailed Review -->
      <div class="space-y-4 sm:space-y-6">
        {#each questions as q, i}
          {@const u = String(userAnswers[q.id] || '').trim().toLowerCase()}
          {@const c = String(q.correctOptionId || '').trim().toLowerCase()}
          {@const isCorrect = u === c && u !== ''}
          {@const userAnswer = userAnswers[q.id]}

          <div class={`
            border rounded-lg sm:rounded-xl overflow-hidden
            ${isCorrect ? 'border-emerald-500/30 bg-emerald-900/5' : 'border-red-500/30 bg-red-900/5'}
          `}>
            <!-- Question Header -->
            <div class="p-4 sm:p-5 lg:p-6 border-b border-white/5">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div class="space-y-2 flex-1">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold uppercase tracking-widest opacity-60">
                      Pregunta {i + 1}
                    </span>
                    <div class={`
                      px-2 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest border rounded
                      ${isCorrect ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : 'border-red-500 text-red-500 bg-red-500/10'}
                    `}>
                      {isCorrect ? '✓ Correcta' : '✗ Incorrecta'}
                    </div>
                  </div>
                  <h3 class="text-sm sm:text-base lg:text-lg font-normal leading-relaxed font-sans">
                    <MathRenderer content={q.text} />
                  </h3>
                </div>
              </div>
            </div>

            <!-- Answers -->
            <div class="p-4 sm:p-5 lg:p-6 space-y-4">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <div class="p-3 sm:p-4 bg-[#1E1E1E]/30 border border-white/5 rounded-lg">
                  <span class="block text-[10px] sm:text-xs uppercase tracking-widest opacity-40 mb-2">Tu Respuesta</span>
                  <div class="flex items-start gap-2 sm:gap-3">
                    <span class={`font-bold text-sm sm:text-base shrink-0 ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                      {userAnswer || '-'}
                    </span>
                    <span class="opacity-80 text-xs sm:text-sm"><MathRenderer content={getOptionText(q, userAnswer)} /></span>
                  </div>
                </div>

                {#if !isCorrect}
                  <div class="p-3 sm:p-4 bg-[#1E1E1E]/30 border border-emerald-500/20 rounded-lg">
                    <span class="block text-[10px] sm:text-xs uppercase tracking-widest opacity-40 mb-2">Respuesta Correcta</span>
                    <div class="flex items-start gap-2 sm:gap-3">
                      <span class="font-bold text-emerald-500 text-sm sm:text-base shrink-0">{q.correctOptionId}</span>
                      <span class="opacity-80 text-xs sm:text-sm"><MathRenderer content={getOptionText(q, q.correctOptionId)} /></span>
                    </div>
                  </div>
                {/if}
              </div>

               <!-- Feedback & Voting -->
              <div class="pt-4 border-t border-white/5">
                <QuestionFeedback
                  questionId={q.id}
                  questionText={q.text}
                  bundleId={q.bundleId || ''}
                />
              </div>

              <!-- Comments -->
              <div class="pt-4 border-t border-white/5">
                <CommentsSection questionId={q.id} />
              </div>
            </div>
          </div>
        {/each}

        <!-- NotebookLM Plan -->
        {#if proficiencyResult}
          <div class="max-w-4xl mx-auto mt-8 mb-8">
            <div class="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/30 rounded-xl p-6 relative overflow-hidden group text-center">
               <div class="relative z-10 flex flex-col items-center">
                 <h3 class="text-xl font-bold text-emerald-300 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                   <span class="text-2xl">🎓</span> Plan de Estudio AI
                 </h3>

                 <p class="text-sm text-emerald-200/80 mb-6 max-w-2xl">
                    Próximos pasos: Hemos generado un plan de estudio personalizado basado en tu nivel ({proficiencyResult.estimatedLevel}).
                    Descárgalo y úsalo con <strong>NotebookLM</strong> para tener un tutor de inglés personal.
                 </p>

                 <div class="flex flex-wrap justify-center gap-4">
                   <button
                     onclick={handleDownloadNotebook}
                     disabled={isGeneratingPlan}
                     class="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-[#121212] font-bold uppercase tracking-widest text-xs rounded-lg shadow-lg shadow-emerald-900/20 transition-all transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {#if isGeneratingPlan}
                       <div class="w-4 h-4 border-2 border-[#121212]/30 border-t-[#121212] rounded-full animate-spin"></div>
                       Analizando Historia...
                     {:else}
                       <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                       </svg>
                       Descargar Cuaderno (.md)
                     {/if}
                   </button>

                   <a
                      href="https://notebooklm.google.com/"
                      target="_blank"
                      class="px-6 py-3 border border-white/10 hover:bg-white/5 text-white/60 hover:text-white text-xs uppercase tracking-widest font-bold rounded-lg transition-all flex items-center gap-2"
                   >
                     Ir a NotebookLM ↗
                   </a>
                 </div>
               </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
  {/if}
</div>