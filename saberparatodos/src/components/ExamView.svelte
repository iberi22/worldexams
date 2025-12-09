<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Question, QuestionResultData, ExamCompletionData } from '../types';
  import FlashlightCard from './FlashlightCard.svelte';
  import AdPlaceholder from './AdPlaceholder.svelte';
  import MathRenderer from './MathRenderer.svelte';

  // Props
  export let onFinish: (data: ExamCompletionData, answers: Record<string | number, string>) => void;
  export let questions: Question[] = [];
  export let grade: number = 0;
  export let subject: string = 'General';

  // Mock Data (Fallback)
  const MOCK_QUESTIONS: Question[] = [
    {
      id: 1,
      category: "MATEMÁTICAS :: ÁLGEBRA",
      text: "Dada la función f(x) = 2x² - 4x + 1, encuentra la coordenada del vértice.",
      options: [
        { id: 'A', text: "(1, -1)" },
        { id: 'B', text: "(1, 1)" },
        { id: 'C', text: "(-1, -1)" },
        { id: 'D', text: "(2, 1)" }
      ],
      correctOptionId: 'A',
      grade: 11,
      difficulty: 3
    },
  ];

  $: activeQuestions = questions.length > 0 ? questions : MOCK_QUESTIONS;

  // Basic state
  let currentIdx = 0;
  let selectedOption: string | null = null;
  let answers: Record<string | number, string> = {};
  let timer: any;

  // Time tracking
  const EXAM_TIME_SECONDS = 300; // 5 minutes total
  const TIME_PER_QUESTION_MS = (EXAM_TIME_SECONDS * 1000) / Math.max(activeQuestions.length, 1);
  let timeLeft = EXAM_TIME_SECONDS;
  let examStartTime = 0;
  let questionStartTime = 0;

  // Scoring tracking
  let questionResults: QuestionResultData[] = [];
  let currentStreak = 0;

  const STORAGE_KEY = 'openicfes_exam_progress';

  $: question = activeQuestions[currentIdx] || MOCK_QUESTIONS[0];

  // Persistencia
  $: if (activeQuestions.length > 0) {
    saveProgress();
  }

  function saveProgress() {
    if (typeof window === 'undefined') return;

    const state = {
      currentIdx,
      answers,
      timeLeft,
      questionResults,
      currentStreak,
      examStartTime,
      timestamp: Date.now(),
      questionCount: activeQuestions.length
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function loadProgress() {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const state = JSON.parse(saved);
        const isRecent = (Date.now() - state.timestamp) < 24 * 60 * 60 * 1000;

        if (isRecent && state.questionCount === activeQuestions.length) {
          currentIdx = state.currentIdx;
          answers = state.answers || {};
          timeLeft = state.timeLeft;
          questionResults = state.questionResults || [];
          currentStreak = state.currentStreak || 0;
          examStartTime = state.examStartTime || Date.now();

          if (answers[activeQuestions[currentIdx]?.id]) {
            selectedOption = answers[activeQuestions[currentIdx].id];
          }
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        console.error("Error loading progress", e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }

  onMount(() => {
    loadProgress();

    // Initialize times if new exam
    if (examStartTime === 0) {
      examStartTime = Date.now();
    }
    questionStartTime = Date.now();

    timer = setInterval(() => {
      if (timeLeft <= 1) {
        clearInterval(timer);
        handleFinish();
        timeLeft = 0;
      } else {
        timeLeft -= 1;
      }
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(timer);
  });

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function handleSelect(optionId: string) {
    selectedOption = optionId;
    answers = { ...answers, [question.id]: optionId };
  }

  function recordQuestionResult() {
    if (!selectedOption) return;

    const isCorrect = selectedOption === question.correctOptionId;
    const timeSpentMs = Date.now() - questionStartTime;

    // Update streak
    if (isCorrect) {
      currentStreak += 1;
    } else {
      currentStreak = 0;
    }

    // Record result
    const result: QuestionResultData = {
      questionId: question.id,
      isCorrect,
      difficulty: question.difficulty || 3, // Default to medium
      timeSpentMs,
      maxTimeMs: TIME_PER_QUESTION_MS,
      streakCount: isCorrect ? currentStreak : 0
    };

    // Check if already recorded (editing previous answer)
    const existingIdx = questionResults.findIndex(r => r.questionId === question.id);
    if (existingIdx >= 0) {
      questionResults[existingIdx] = result;
    } else {
      questionResults = [...questionResults, result];
    }
  }

  function handleNext() {
    if (selectedOption) {
      answers = { ...answers, [question.id]: selectedOption };
      recordQuestionResult();
    }

    if (currentIdx < activeQuestions.length - 1) {
      currentIdx += 1;
      questionStartTime = Date.now(); // Reset for next question
      selectedOption = answers[activeQuestions[currentIdx].id] || null;
    } else {
      handleFinish();
    }
  }

  function handleFinish() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }

    // Record final answer if not yet recorded
    if (selectedOption) {
      answers = { ...answers, [question.id]: selectedOption };
      recordQuestionResult();
    }

    // Ensure all answered questions have results
    activeQuestions.forEach(q => {
      const answer = answers[q.id];
      if (answer && !questionResults.find(r => r.questionId === q.id)) {
        questionResults = [...questionResults, {
          questionId: q.id,
          isCorrect: answer === q.correctOptionId,
          difficulty: q.difficulty || 3,
          timeSpentMs: TIME_PER_QUESTION_MS, // Default if not tracked
          maxTimeMs: TIME_PER_QUESTION_MS,
          streakCount: 0
        }];
      }
    });

    const totalTimeMs = Date.now() - examStartTime;

    const completionData: ExamCompletionData = {
      questions: questionResults,
      totalTimeMs,
      maxTotalTimeMs: EXAM_TIME_SECONDS * 1000,
      grade: grade || activeQuestions[0]?.grade || 0,
      subject: subject || activeQuestions[0]?.category?.split('::')[0]?.trim() || 'General'
    };

    onFinish(completionData, answers);
  }
</script>

<div class="w-full h-screen flex flex-col animate-fade-in-up">
  <!-- Header -->
  <div class="shrink-0 px-4 sm:px-6 lg:px-8 pt-4 pb-3 border-b border-white/10">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-2">
          <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <h2 class="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-emerald-500 truncate">
            {question.category}
          </h2>
        </div>
        <div class="text-right">
          <span class="text-lg sm:text-xl font-mono font-bold text-[#F5F5DC] tabular-nums">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <!-- Timer Progress Bar -->
      <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          class="h-full bg-emerald-500 transition-all duration-1000 ease-linear"
          style="width: {(timeLeft / 300) * 100}%"
        ></div>
      </div>
    </div>
  </div>

  <!-- Main Content Area - No scroll on desktop, optimized for mobile -->
  <div class="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
    <div class="max-w-4xl mx-auto min-h-full flex flex-col justify-center space-y-4 sm:space-y-6 py-4">
      <!-- Question Card - Flexible Height -->
      <div class="bg-[#1E1E1E]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col min-h-[10rem] max-h-[35vh] sm:min-h-[12rem] transition-all duration-300 relative overflow-hidden group">
        <!-- Decorative gradient -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-50"></div>

        <div class="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent">
          <div class="flex items-start gap-4 sm:gap-5 lg:gap-6">
            <div class="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-500/20 leading-none select-none shrink-0 sticky top-0 font-mono">
              {(currentIdx + 1).toString().padStart(2, '0')}
            </div>
            <div class="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-gray-100 font-sans tracking-wide">
              <MathRenderer content={question.text} />
            </div>
          </div>
        </div>
      </div>

      <!-- Options Grid - More Compact & Aligned -->
      <div class="grid grid-cols-1 gap-2 sm:gap-3 w-full">
        {#each question.options as option (option.id)}
          <FlashlightCard
            isActive={selectedOption === option.id}
            onclick={() => handleSelect(option.id)}
            className="cursor-pointer hover:border-emerald-500/40 transition-all duration-200 rounded-xl overflow-hidden group"
          >
            <div class="py-3 px-4 sm:py-3.5 sm:px-5 flex items-center gap-3 sm:gap-4">
              <div class={`
                w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 shrink-0 border
                ${selectedOption === option.id
                  ? 'border-emerald-500 bg-emerald-500 text-[#121212] shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'border-white/10 bg-white/5 text-gray-400 group-hover:border-emerald-500/30 group-hover:text-emerald-400'}
              `}>
                {option.id}
              </div>
              <span class={`
                text-sm sm:text-base font-sans leading-snug flex-1 transition-colors duration-200
                ${selectedOption === option.id ? 'text-white font-medium' : 'text-gray-300 font-normal group-hover:text-white'}
              `}>
                <MathRenderer content={option.text} />
              </span>
            </div>
          </FlashlightCard>
        {/each}
      </div>

      <!-- Ad Placeholder - Hidden on small screens to save space -->
      <div class="hidden lg:block max-w-4xl mx-auto w-full opacity-50 hover:opacity-100 transition-opacity">
        <AdPlaceholder className="mt-2 scale-90 origin-center" />
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="shrink-0 px-4 sm:px-6 lg:px-8 py-4 border-t border-white/10 bg-[#121212]/80 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="text-[10px] sm:text-xs font-mono opacity-40">
        Pregunta {currentIdx + 1} de {activeQuestions.length}
      </div>
      <button
        on:click={handleNext}
        class="px-6 sm:px-8 py-2 sm:py-3 bg-emerald-900/20 border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500 hover:text-[#121212] transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm font-bold active:scale-95"
      >
        {currentIdx === activeQuestions.length - 1 ? 'Finalizar' : 'Siguiente >>'}
      </button>
    </div>
  </div>
</div>
