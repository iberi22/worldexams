<script lang="ts">
  import { onMount } from 'svelte';
  import FlashlightCard from './FlashlightCard.svelte';
  import CommentsSection from './CommentsSection.svelte';
  import QuestionFeedback from './QuestionFeedback.svelte';
  import MemoryStatus from './MemoryStatus.svelte';
  import AdBanner from './AdBanner.svelte';
  import ScoreDisplay from './ScoreDisplay.svelte';
  import MathRenderer from './MathRenderer.svelte';

  import { supabase } from '../lib/supabase';
  import { getUser } from '../lib/auth';
  import type { User } from '@supabase/supabase-js';
  import type { ExamCompletionData } from '../types';

  // Scoring imports
  import { calculateExamScore, type ExamScore, type ExamResult, type QuestionResult } from '../lib/scoring';
  import { getLocalIdentity, type LocalIdentity } from '../lib/identity';
  import { submitScoreInput, getSubmissionUrl, type ScoreSubmissionInput } from '../lib/leaderboard-service';
  import { createScoreIssue, hasGitHubAuth, getManualSubmissionUrl } from '../lib/github-api';
  import { generateQuickChecksum } from '../lib/score-hash';

  // Props - Now accepts ExamCompletionData
  export let examData: ExamCompletionData;
  export let questions: any[] = [];
  export let userAnswers: Record<string | number, string> = {};
  export let onHome: () => void;
  export let onLeaderboard: () => void;
  export let onLogin: () => void;
  export let onRegister: () => void;

  // State
  let user: User | null = null;
  let identity: LocalIdentity | null = null;
  let isSaving = false;
  let saved = false;
  let leaderboardSubmitted = false;
  let examScore: ExamScore | null = null;

  // Leaderboard submission state
  let isSubmittingToLeaderboard = false;
  let leaderboardSubmitResult: { success: boolean; issueUrl?: string; error?: string } | null = null;
  let hasGitHub = false;
  let currentSubmission: ScoreSubmissionInput | null = null;

  // Convert ExamCompletionData to ExamResult for scoring
  function toExamResult(data: ExamCompletionData): ExamResult {
    const questionResults: QuestionResult[] = data.questions.map(q => ({
      questionId: String(q.questionId),
      difficulty: Math.max(1, Math.min(5, q.difficulty)) as 1 | 2 | 3 | 4 | 5,
      isCorrect: q.isCorrect,
      timeSeconds: Math.round(q.timeSpentMs / 1000),
      currentStreak: q.streakCount
    }));

    return {
      questions: questionResults,
      totalTimeSeconds: Math.round(data.totalTimeMs / 1000),
      startedAt: new Date(Date.now() - data.totalTimeMs).toISOString(),
      completedAt: new Date().toISOString()
    };
  }

  // Calculate score on mount
  $: if (examData && !examScore) {
    const examResult = toExamResult(examData);
    examScore = calculateExamScore(examResult);
  }

  $: correctCount = examData.questions.filter(q => q.isCorrect).length;
  $: percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  function getOptionText(q: any, optionId: string) {
    const opt = q.options.find((o: any) => o.id === optionId);
    return opt ? opt.text : 'Sin respuesta';
  }

  onMount(async () => {
    // Load identity
    identity = getLocalIdentity();

    // Load user
    user = await getUser();
    if (user) {
      saveScoreToSupabase();
    }

    // Check if user has GitHub auth for auto-submission
    hasGitHub = await hasGitHubAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      user = session?.user ?? null;
      if (user && !saved && !isSaving) {
        saveScoreToSupabase();
      }
      // Re-check GitHub auth on auth change
      hasGitHub = await hasGitHubAuth();
    });

    return () => {
      subscription.unsubscribe();
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar');
      }

      saved = true;
    } catch (e) {
      console.error('Error saving score:', e);
    } finally {
      isSaving = false;
    }
  }

  // Build the submission for the leaderboard
  let submissionUrl = '';

  $: if (identity && examScore) {
    // Generate checksum for anti-cheat validation
    const checksum = generateQuickChecksum(
      examScore.totalScore,
      questions.length,
      correctCount,
      examData.totalTimeMs
    );

    const submission: ScoreSubmissionInput = {
      anonymousId: identity.anonymousId,
      displayName: identity.displayName,
      grade: examData.grade,
      region: identity.ciudad?.substring(0, 3).toUpperCase() || 'CO',
      totalPoints: examScore.totalScore,
      questionsAnswered: questions.length,
      correctAnswers: correctCount,
      averageDifficulty: examData.questions.reduce((sum, q) => sum + q.difficulty, 0) / examData.questions.length,
      examDurationMs: examData.totalTimeMs,
      timestamp: Date.now(),
      checksum
    };
    currentSubmission = submission;
    submissionUrl = getSubmissionUrl(submission);
    submitScoreInput(submission); // Save locally
  }

  async function submitToLeaderboard() {
    if (!currentSubmission || isSubmittingToLeaderboard || leaderboardSubmitted) return;

    isSubmittingToLeaderboard = true;
    leaderboardSubmitResult = null;

    if (hasGitHub) {
      // Auto-submit via GitHub API
      const result = await createScoreIssue(currentSubmission);
      leaderboardSubmitResult = result;
      if (result.success) {
        leaderboardSubmitted = true;
      }
    } else {
      // Fallback: open manual submission URL
      const url = getManualSubmissionUrl(currentSubmission);
      window.open(url, '_blank');
      leaderboardSubmitResult = { success: true };
      leaderboardSubmitted = true;
    }

    isSubmittingToLeaderboard = false;
  }

  function openLeaderboardSubmission() {
    submitToLeaderboard();
  }
</script>

<div class="min-h-screen w-full flex flex-col animate-fade-in-up">
  <!-- Main Content -->
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
            <span class="text-[10px] sm:text-xs uppercase tracking-widest opacity-40 mt-1">Precisión</span>
          </div>
        </div>

        <p class="text-xs sm:text-sm uppercase tracking-widest opacity-60">
          {correctCount} de {questions.length} Correctas
        </p>
      </div>

      <!-- Score Display - Complete breakdown -->
      {#if examScore}
        <ScoreDisplay
          {examScore}
          questionResults={examData.questions}
          totalQuestions={questions.length}
        />
      {/if}

      <!-- Memory Progress Status -->
      <div class="max-w-2xl mx-auto">
        <MemoryStatus totalQuestions={questions.length} compact={false} />
      </div>

      <!-- Leaderboard Status -->
      <div class="max-w-md mx-auto">
        {#if identity}
          <div class="bg-[#1E1E1E]/60 border border-emerald-500/20 rounded-xl p-4 sm:p-6">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div>
                <p class="text-xs uppercase tracking-widest opacity-50">Tu identidad</p>
                <p class="font-bold text-emerald-400">{identity.displayName}</p>
              </div>
            </div>
            {#if leaderboardSubmitted}
              <div class="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-3 py-2 rounded-lg">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-xs font-bold uppercase tracking-widest">Puntaje enviado al ranking</span>
              </div>
            {:else}
              <div class="text-xs opacity-60 animate-pulse">Enviando al ranking...</div>
            {/if}
          </div>
        {:else}
          <div class="bg-[#1E1E1E]/60 border border-yellow-500/20 rounded-xl p-4 sm:p-6">
            <div class="flex items-center gap-3 text-yellow-500 mb-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span class="text-sm font-bold uppercase tracking-widest">Sin registro anónimo</span>
            </div>
            <p class="text-sm opacity-70 mb-4">
              Regístrate de forma anónima para competir en el ranking semanal, mensual y anual.
            </p>
            <button
              on:click={onRegister}
              class="w-full px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded-lg text-yellow-500 font-bold uppercase tracking-widest text-xs transition-all"
            >
              Crear identidad anónima
            </button>
          </div>
        {/if}
      </div>

      <!-- Supabase Save Status (for logged in users) -->
      <div class="flex justify-center">
        {#if user}
          {#if saved}
            <div class="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span class="text-xs font-bold uppercase tracking-widest">Historial guardado en tu cuenta</span>
            </div>
          {:else if isSaving}
            <div class="text-xs font-bold uppercase tracking-widest opacity-60 animate-pulse">
              Guardando en tu cuenta...
            </div>
          {/if}
        {:else if !identity}
          <div class="flex flex-col items-center gap-3 max-w-md">
            <p class="text-xs text-center opacity-50">
              ¿Quieres guardar tu historial completo? Inicia sesión con tu cuenta.
            </p>
            <button
              on:click={onLogin}
              class="px-4 py-2 border border-white/20 hover:bg-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
            >
              Iniciar sesión
            </button>
          </div>
        {/if}
      </div>

      <!-- Detailed Review -->
      <div class="space-y-4 sm:space-y-6">
        {#each questions as q, i}
          {@const isCorrect = userAnswers[q.id] === q.correctOptionId}
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

            <!-- Answers Section -->
            <div class="p-4 sm:p-5 lg:p-6 space-y-4">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <!-- User Answer -->
                <div class="p-3 sm:p-4 bg-[#1E1E1E]/30 border border-white/5 rounded-lg">
                  <span class="block text-[10px] sm:text-xs uppercase tracking-widest opacity-40 mb-2">Tu Respuesta</span>
                  <div class="flex items-start gap-2 sm:gap-3">
                    <span class={`
                      font-bold text-sm sm:text-base shrink-0
                      ${isCorrect ? 'text-emerald-500' : 'text-red-500'}
                    `}>
                      {userAnswer || '-'}
                    </span>
                    <span class="opacity-80 text-xs sm:text-sm"><MathRenderer content={getOptionText(q, userAnswer)} /></span>
                  </div>
                </div>

                <!-- Correct Answer (only if incorrect) -->
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

              <!-- Explanation -->
              {#if q.explanation}
                <div class="pt-4 border-t border-white/5">
                  <span class="block text-xs font-bold uppercase tracking-widest text-emerald-500 mb-2">Explicación</span>
                  <div class="text-xs sm:text-sm font-normal leading-relaxed opacity-80 font-sans">
                    <MathRenderer content={q.explanation} />
                  </div>
                </div>
              {/if}

              <!-- Feedback & Voting -->
              <div class="pt-4 border-t border-white/5">
                <QuestionFeedback
                  questionId={q.id}
                  questionText={q.text}
                  bundleId={q.bundleId || ''}
                />
              </div>

              <!-- Comments Section -->
              <div class="pt-4 border-t border-white/5">
                <CommentsSection questionId={q.id} />
              </div>
            </div>
          </div>

          <!-- Ad Banner every 2 questions -->
          {#if (i + 1) % 2 === 0 && i < questions.length - 1}
            <AdBanner {user} className="my-8" />
          {/if}
        {/each}

        <!-- Bottom Ad Banner -->
        <div class="pt-4">
          <AdBanner {user} className="max-w-4xl mx-auto" />
        </div>
      </div>
    </div>
  </div>

  <!-- Fixed Footer Actions -->
  <div class="shrink-0 px-4 sm:px-6 lg:px-8 py-4 bg-[#121212]/95 backdrop-blur-md border-t border-white/10">
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
      <button
        on:click={onHome}
        class="px-6 py-3 border border-white/20 hover:bg-white/10 transition-colors uppercase text-xs tracking-widest font-bold"
      >
        Volver al Inicio
      </button>
      {#if currentSubmission && !leaderboardSubmitted}
        <button
          on:click={openLeaderboardSubmission}
          disabled={isSubmittingToLeaderboard}
          class="px-6 py-3 bg-yellow-900/20 border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-[#121212] transition-colors uppercase text-xs tracking-widest font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {#if isSubmittingToLeaderboard}
            ⏳ Enviando...
          {:else if hasGitHub}
            🚀 Enviar al Ranking (Auto)
          {:else}
            📤 Enviar al Ranking
          {/if}
        </button>
      {:else if leaderboardSubmitResult?.success}
        <div class="px-6 py-3 bg-emerald-900/20 border border-emerald-500/50 text-emerald-500 uppercase text-xs tracking-widest font-bold flex items-center gap-2">
          ✅ Enviado al Ranking
          {#if leaderboardSubmitResult.issueUrl}
            <a href={leaderboardSubmitResult.issueUrl} target="_blank" class="underline hover:text-emerald-300">Ver</a>
          {/if}
        </div>
      {:else if leaderboardSubmitResult?.error}
        <button
          on:click={openLeaderboardSubmission}
          class="px-6 py-3 bg-red-900/20 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-[#121212] transition-colors uppercase text-xs tracking-widest font-bold"
        >
          ❌ Error - Reintentar
        </button>
      {/if}
      <button
        on:click={onLeaderboard}
        class="px-6 py-3 bg-emerald-900/20 border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500 hover:text-[#121212] transition-colors uppercase text-xs tracking-widest font-bold"
      >
        Ver Tabla de Posiciones
      </button>
    </div>
  </div>
</div>