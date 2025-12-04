<script lang="ts">
  /**
   * ExamView.svelte
   *
   * Main exam interface with:
   * - Timer (optional)
   * - LocalStorage persistence
   * - FlashlightCard for options
   * - ResultsView integration
   */
  import { onMount, onDestroy } from 'svelte';
  import type { Question, UserAnswers, ExamResult } from '../lib/types';
  import FlashlightCard from './FlashlightCard.svelte';
  import ResultsView from './ResultsView.svelte';

  // ============================================
  // Props
  // ============================================
  interface Props {
    questions: Question[];
    countryName?: string;
    countryFlag?: string;
    countryCode?: string;
    showTimer?: boolean;
    timerMinutes?: number;
    onFinish?: (result: ExamResult) => void;
  }

  let {
    questions = [],
    countryName = '',
    countryFlag = '🌍',
    countryCode = '',
    showTimer = false,
    timerMinutes = 5,
    onFinish,
  }: Props = $props();

  // ============================================
  // State
  // ============================================
  let currentIndex = $state(0);
  let selectedAnswer = $state<string | null>(null);
  let showExplanation = $state(false);
  let userAnswers = $state<UserAnswers>({});
  let finished = $state(false);
  let showResults = $state(false);

  // Timer state
  let timeRemaining = $state(timerMinutes * 60); // in seconds
  let timerInterval: ReturnType<typeof setInterval> | null = null;

  // Storage key for this exam
  const STORAGE_KEY = `worldexams_progress_${countryCode || 'default'}`;

  // ============================================
  // Derived State
  // ============================================
  const currentQuestion = $derived(questions[currentIndex]);
  const progress = $derived(((currentIndex + 1) / questions.length) * 100);
  const answeredCount = $derived(Object.keys(userAnswers).length);
  const score = $derived(
    Object.entries(userAnswers).reduce((acc, [qId, answer]) => {
      const q = questions.find(q => q.id === qId);
      if (!q) return acc;
      const isCorrect = q.options.find(o => o.letter === answer || o.id === answer)?.isCorrect;
      return acc + (isCorrect ? 1 : 0);
    }, 0)
  );

  // Format time for display
  const formattedTime = $derived(() => {
    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  });

  // ============================================
  // Lifecycle
  // ============================================
  onMount(() => {
    // Try to restore progress
    restoreProgress();

    // Start timer if enabled
    if (showTimer) {
      startTimer();
    }
  });

  onDestroy(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  });

  // ============================================
  // Timer Functions
  // ============================================
  function startTimer() {
    timerInterval = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        // Save progress periodically (every 10 seconds)
        if (timeRemaining % 10 === 0) {
          saveProgress();
        }
      } else {
        // Time's up - auto-finish
        finishExam();
      }
    }, 1000);
  }

  // ============================================
  // LocalStorage Persistence
  // ============================================
  function saveProgress() {
    if (typeof window === 'undefined') return;

    const progress = {
      currentIndex,
      userAnswers,
      timeRemaining,
      timestamp: Date.now(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Could not save progress:', e);
    }
  }

  function restoreProgress() {
    if (typeof window === 'undefined') return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const progress = JSON.parse(saved);

      // Only restore if less than 1 hour old
      const age = Date.now() - progress.timestamp;
      if (age > 60 * 60 * 1000) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }

      currentIndex = progress.currentIndex || 0;
      userAnswers = progress.userAnswers || {};
      if (showTimer && progress.timeRemaining) {
        timeRemaining = progress.timeRemaining;
      }

      // If we already answered current question, show explanation
      if (userAnswers[currentQuestion?.id]) {
        selectedAnswer = userAnswers[currentQuestion.id];
        showExplanation = true;
      }
    } catch (e) {
      console.warn('Could not restore progress:', e);
    }
  }

  function clearProgress() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }

  // ============================================
  // Question Navigation
  // ============================================
  function selectAnswer(letter: string) {
    if (selectedAnswer) return;

    selectedAnswer = letter;
    showExplanation = true;
    userAnswers[currentQuestion.id] = letter;

    saveProgress();
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      currentIndex++;

      // Check if already answered
      const prevAnswer = userAnswers[questions[currentIndex].id];
      if (prevAnswer) {
        selectedAnswer = prevAnswer;
        showExplanation = true;
      } else {
        selectedAnswer = null;
        showExplanation = false;
      }

      saveProgress();
    } else {
      finishExam();
    }
  }

  function prevQuestion() {
    if (currentIndex > 0) {
      currentIndex--;
      const prevAnswer = userAnswers[questions[currentIndex].id];
      selectedAnswer = prevAnswer || null;
      showExplanation = !!prevAnswer;
    }
  }

  function goToQuestion(index: number) {
    if (index >= 0 && index < questions.length) {
      currentIndex = index;
      const prevAnswer = userAnswers[questions[index].id];
      selectedAnswer = prevAnswer || null;
      showExplanation = !!prevAnswer;
    }
  }

  // ============================================
  // Exam Completion
  // ============================================
  function finishExam() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }

    finished = true;
    showResults = true;
    clearProgress();

    // Call onFinish callback if provided
    if (onFinish) {
      const result: ExamResult = {
        score,
        total: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        answers: { ...userAnswers },
        timeSpent: (timerMinutes * 60) - timeRemaining,
        completedAt: new Date(),
      };
      onFinish(result);
    }
  }

  function restart() {
    currentIndex = 0;
    selectedAnswer = null;
    showExplanation = false;
    userAnswers = {};
    finished = false;
    showResults = false;
    timeRemaining = timerMinutes * 60;

    clearProgress();

    if (showTimer) {
      startTimer();
    }
  }

  // ============================================
  // Option Styling
  // ============================================
  function getOptionState(letter: string): { isActive: boolean; isCorrect: boolean; isWrong: boolean } {
    if (!selectedAnswer) {
      return { isActive: false, isCorrect: false, isWrong: false };
    }

    const option = currentQuestion.options.find(o => o.letter === letter);
    const isThisCorrect = option?.isCorrect ?? false;
    const isSelected = letter === selectedAnswer;

    return {
      isActive: isSelected,
      isCorrect: isThisCorrect,
      isWrong: isSelected && !isThisCorrect,
    };
  }
</script>

<div class="max-w-3xl mx-auto">
  {#if showResults}
    <!-- Results View -->
    <ResultsView
      score={{ score, total: questions.length }}
      {questions}
      {userAnswers}
      {countryName}
      {countryFlag}
      onRestart={restart}
      onHome={() => window.location.href = '/'}
    />
  {:else if questions.length === 0}
    <!-- No Questions -->
    <div class="bg-bg-card rounded-2xl p-8 border border-white/5 text-center">
      <div class="text-6xl mb-4">📚</div>
      <h2 class="text-2xl font-bold mb-2">No hay preguntas disponibles</h2>
      <p class="text-text-secondary mb-6">Este examen aún no tiene preguntas cargadas.</p>
      <a href="/" class="btn-primary inline-block">
        🌍 Volver al Inicio
      </a>
    </div>
  {:else}
    <!-- Timer (optional) -->
    {#if showTimer}
      <div class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-2xl">⏱️</span>
          <span class="text-2xl font-mono font-bold {timeRemaining < 60 ? 'text-red-500 animate-pulse' : 'text-accent-cyan'}">
            {formattedTime()}
          </span>
        </div>
        <div class="text-sm text-text-secondary">
          {answeredCount}/{questions.length} respondidas
        </div>
      </div>
    {/if}

    <!-- Progress Bar -->
    <div class="mb-8">
      <div class="flex justify-between text-sm text-text-secondary mb-2">
        <span>Pregunta {currentIndex + 1} de {questions.length}</span>
        <span>Puntaje: {score}/{answeredCount}</span>
      </div>
      <div class="h-2 bg-bg-card rounded-full overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-accent-cyan to-accent-gold transition-all duration-300"
          style="width: {progress}%"
        ></div>
      </div>

      <!-- Question Navigation Dots -->
      <div class="flex flex-wrap gap-1 mt-3 justify-center">
        {#each questions as q, i}
          {@const isAnswered = !!userAnswers[q.id]}
          {@const isCurrent = i === currentIndex}
          <button
            onclick={() => goToQuestion(i)}
            class="w-6 h-6 rounded-full text-xs font-bold transition-all {
              isCurrent
                ? 'bg-accent-cyan text-bg-primary scale-110'
                : isAnswered
                  ? 'bg-emerald-500/30 text-emerald-400 hover:bg-emerald-500/50'
                  : 'bg-white/10 text-white/50 hover:bg-white/20'
            }"
          >
            {i + 1}
          </button>
        {/each}
      </div>
    </div>

    <!-- Question Card -->
    <div class="bg-bg-card rounded-2xl p-6 sm:p-8 border border-white/5">
      <!-- Tags -->
      <div class="flex items-center gap-2 text-sm text-text-secondary mb-4 flex-wrap">
        <span class="px-2 py-1 bg-accent-cyan/10 text-accent-cyan rounded text-xs">
          {currentQuestion.subject}
        </span>
        <span class="px-2 py-1 bg-white/5 rounded text-xs">
          {currentQuestion.topic}
        </span>
      </div>

      <!-- Question Content -->
      <h2 class="text-lg sm:text-xl font-medium mb-8 leading-relaxed">
        {@html currentQuestion.content}
      </h2>

      <!-- Options with FlashlightCard -->
      <div class="space-y-3">
        {#each currentQuestion.options as option}
          {@const state = getOptionState(option.letter)}
          <FlashlightCard
            className="w-full"
            isActive={state.isActive}
            isCorrect={state.isCorrect}
            isWrong={state.isWrong}
          >
            <button
              class="w-full p-4 text-left flex items-start gap-3 disabled:cursor-not-allowed"
              onclick={() => selectAnswer(option.letter)}
              disabled={!!selectedAnswer}
            >
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-center font-semibold shrink-0 {
                state.isCorrect ? 'bg-emerald-500/20 text-emerald-400' :
                state.isWrong ? 'bg-red-500/20 text-red-400' : ''
              }">
                {option.letter}
              </span>
              <span class="flex-1">
                {@html option.text}
              </span>
              {#if state.isCorrect}
                <span class="text-emerald-500">✓</span>
              {:else if state.isWrong}
                <span class="text-red-500">✗</span>
              {/if}
            </button>
          </FlashlightCard>
        {/each}
      </div>

      <!-- Explanation -->
      {#if showExplanation && currentQuestion.explanation}
        <div class="mt-8 p-4 sm:p-6 bg-accent-cyan/5 rounded-xl border border-accent-cyan/20 animate-fade-in">
          <h3 class="font-semibold text-accent-cyan mb-2 text-sm uppercase tracking-widest">
            Explicación
          </h3>
          <p class="text-text-secondary leading-relaxed text-sm sm:text-base">
            {@html currentQuestion.explanation}
          </p>
        </div>
      {/if}

      <!-- Navigation Buttons -->
      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        {#if currentIndex > 0}
          <button
            class="btn-secondary flex-1 order-2 sm:order-1"
            onclick={prevQuestion}
          >
            ← Anterior
          </button>
        {/if}

        {#if showExplanation}
          <button
            class="btn-primary flex-1 order-1 sm:order-2"
            onclick={nextQuestion}
          >
            {currentIndex < questions.length - 1 ? 'Siguiente Pregunta →' : 'Ver Resultados 🏆'}
          </button>
        {/if}
      </div>
    </div>

    <!-- Quick Finish Button (only if all questions answered) -->
    {#if answeredCount === questions.length && !finished}
      <div class="mt-6 text-center">
        <button
          class="px-6 py-3 bg-accent-gold/20 border border-accent-gold/50 text-accent-gold hover:bg-accent-gold hover:text-bg-primary transition-colors rounded-lg font-bold uppercase text-xs tracking-widest"
          onclick={finishExam}
        >
          🏆 Finalizar Examen
        </button>
      </div>
    {/if}
  {/if}
</div>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
</style>
