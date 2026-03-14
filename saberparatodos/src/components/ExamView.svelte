<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import type { Question, QuestionResultData, ExamCompletionData } from '../types';
  import { supabase } from '../lib/supabase';
  import { p2pService } from '../lib/p2p-service';
  import FlashlightCard from './FlashlightCard.svelte';
  import MathRenderer from './MathRenderer.svelte';
  import type { APIQuestion } from '../lib/api-service';
  import { createFocusTracker, type FocusTracker } from '../lib/focus-tracker';
  import ReportModal from './ReportModal.svelte';
  import { getNextAdaptiveQuestion } from '../lib/adaptive-engine';

  // Props (Svelte 5 Runes)
  interface Props {
    onFinish: (data: ExamCompletionData, answers: Record<string | number, string>) => void;
    onCancel?: () => void;
    questions?: Question[];
    grade?: number;
    subject?: string;
    // Exam Room Mode Props
    roomCode?: string | null;
    roomChannel?: any | null;
    isHost?: boolean;
    sessionId?: string | null;
    timeLimitSeconds?: number;
    startedAt?: string | null;
    totalQuestions?: number;
    // Adaptive Testing
    isAdaptiveMode?: boolean;
    adaptivePool?: any[];
  }

  let {
    onFinish,
    onCancel = () => {},
    questions = [],
    grade = 0,
    subject = 'General',
    roomCode = null,
    roomChannel = null,
    isHost = false,
    sessionId = null,
    timeLimitSeconds = 0,
    startedAt = null,
    totalQuestions = 0,
    isAdaptiveMode = false,
    adaptivePool = []
  }: Props = $props();

  // 🆕 Focus Tracker
  let focusTracker = $state<FocusTracker | null>(null);
  let focusWarningVisible = $state(false);

  // Mock Data
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

  // Derived state into mutable state for adaptive injection
  let activeQuestions = $state<Question[]>([]);
  let hasInitialized = false;

  $effect(() => {
    if (!hasInitialized) {
      if (questions && questions.length > 0) {
        activeQuestions = [...questions];
      } else {
        activeQuestions = [...MOCK_QUESTIONS];
      }
      hasInitialized = true;
    }
  });

  // Basic state
  let currentIdx = $state(0);
  let selectedOption = $state<string | null>(null);
  let answers = $state<Record<string | number, string>>({});
  let timer: any = $state(null);

  // Exam Room Mode State
  let roomSyncChannel: any | null = null; // Non-reactive ref
  let roomStartedAtMs = $state<number | null>(null);
  let roomEndedAtMs = $state<number | null>(null);
  let roomCurrentQuestion = $state<number | null>(null);
  let finishTriggered = $state(false);

  // UI Countdown
  let questionTimeLeft = $state(0);

  // Host Alerts
  let focusAlerts = $state<{id: number, text: string}[]>([]);

  // Time tracking logic
  let smartDefaultTime = $derived(Math.max(300, activeQuestions.length * 120));
  let EXAM_TIME_SECONDS = $derived(timeLimitSeconds > 0 ? timeLimitSeconds : smartDefaultTime);

  let effectiveQuestionCount = $derived(totalQuestions > 0 ? totalQuestions : Math.max(activeQuestions.length, 1));
  let TIME_PER_QUESTION_MS = $derived((EXAM_TIME_SECONDS * 1000) / effectiveQuestionCount);

  let timeLeft = $state(0);

  // Initialize timeLeft
  $effect(() => {
    if (!timer && EXAM_TIME_SECONDS > 0 && timeLeft === 0) {
       timeLeft = EXAM_TIME_SECONDS;
       console.log('⏱️ TimeLeft initialized to:', timeLeft);
    }
  });

  let examStartTime = $state(0);
  let questionStartTime = $state(0);

  // Scoring tracking
  let questionResults = $state<QuestionResultData[]>([]);
  let currentStreak = $state(0);

  const STORAGE_KEY = 'saberparatodos_exam_progress';

  let question = $derived(activeQuestions[currentIdx] || MOCK_QUESTIONS[0]);

  // Options Logic
  const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  let safeOptions = $derived((question?.options || []).map((opt, idx) => ({
    ...opt,
    id: opt.id ?? OPTION_LETTERS[idx] ?? `opt-${idx}`
  })));

  let hasValidQuestion = $derived(question && Array.isArray(question.options) && question.options.length > 0);

  let correctAnswerId = $derived.by(() => {
    if (question?.correctOptionId && safeOptions.some(o => o.id === question.correctOptionId)) {
      return question.correctOptionId;
    }
    if (typeof question?.correctOptionId === 'number') {
      return safeOptions[question.correctOptionId]?.id;
    }
    return safeOptions[0]?.id;
  });

  // Methods
  async function broadcastRoomState(status: 'active' | 'finished', index: number) {
      if (!isHost || !roomCode) return;

      const broadcastPayload = {
        status,
        current_question_index: index,
        question_data: activeQuestions[index] || null
      };

      const updatePayload: Record<string, any> = { status, current_question: index };
      if (status === 'finished') {
        updatePayload.finished_at = new Date().toISOString();
      }

      try {
        const { error } = await supabase
          .from('party_sessions')
          .update(updatePayload)
          .eq('party_code', roomCode);

        if (error?.code === '42501') {
           console.warn('⚠️ RLS policy blocked update (anonymous user). Using P2P fallback.');
        } else if (error) {
           console.error('Error updating room state:', error);
        }
      } catch (dbErr) {
        console.warn('⚠️ DB update failed, using P2P fallback:', dbErr);
      }

      if (roomChannel) {
        try {
          roomChannel.send({
            type: 'broadcast',
            event: 'game_state_update',
            payload: broadcastPayload
          });
        } catch (e) {
          console.warn('⚠️ Realtime broadcast failed:', e);
        }
      }
  }

  function startSyncedRoomTimerIfReady() {
    if (!roomCode) return;
    if (!(timeLimitSeconds > 0)) return;
    if (!roomStartedAtMs) return;

    roomEndedAtMs = roomStartedAtMs + (timeLimitSeconds * 1000);
    const timePerQuestionMs = Math.max(1, Math.ceil((timeLimitSeconds * 1000) / effectiveQuestionCount));

    if (timer) clearInterval(timer);

    timer = setInterval(() => {
      const remainingMs = Math.max(0, (roomEndedAtMs ?? 0) - Date.now());
      const nextSeconds = Math.ceil(remainingMs / 1000);
      timeLeft = nextSeconds;

      const qIndex = Math.max(0, Math.min(activeQuestions.length - 1, roomCurrentQuestion ?? currentIdx));
      const questionStartMs = (roomStartedAtMs ?? Date.now()) + (qIndex * timePerQuestionMs);
      const questionEndMs = questionStartMs + timePerQuestionMs;
      const qRemainingMs = Math.max(0, questionEndMs - Date.now());
      questionTimeLeft = Math.ceil(qRemainingMs / 1000);

      if (nextSeconds <= 0) {
        clearInterval(timer);
        timer = null;
        handleFinish('timer-expired');
      }
    }, 250);
  }

  // Persistence Effect
  $effect(() => {
     if (activeQuestions.length > 0) {
         // Auto-track dependencies
         saveProgress();
     }
  });

  function saveProgress() {
    if (typeof window === 'undefined') return;
    const state = {
      currentIdx, answers, timeLeft, questionResults, currentStreak,
      examStartTime, timestamp: Date.now(), questionCount: activeQuestions.length
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
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }

  // Reporting State
  let showReportModal = $state(false);

  onMount(() => {
    loadProgress();

    if (startedAt) {
      const ms = Date.parse(startedAt);
      if (!Number.isNaN(ms)) {
        roomStartedAtMs = ms;
        examStartTime = ms;
      }
    }

    if (examStartTime === 0) examStartTime = Date.now();
    questionStartTime = Date.now();

    if (roomCode) {
      roomSyncChannel = supabase
        .channel(`party-exam:${roomCode}`)
        .on('postgres_changes', {
          event: 'UPDATE', schema: 'public', table: 'party_sessions', filter: `party_code=eq.${roomCode}`
        }, (payload) => {
          const next = payload?.new as any;
          if (!next) return;

          if (next.started_at) {
             const startedMs = Date.parse(next.started_at);
             if (!Number.isNaN(startedMs)) {
                roomStartedAtMs = startedMs;
                examStartTime = startedMs;
                startSyncedRoomTimerIfReady();
             }
          }

          if (typeof next.current_question === 'number') {
            const nextIdx = Math.max(0, Math.min(activeQuestions.length - 1, next.current_question));
            roomCurrentQuestion = nextIdx;
            if (!isHost && nextIdx !== currentIdx) {
              currentIdx = nextIdx;
              questionStartTime = Date.now();
              selectedOption = answers[activeQuestions[currentIdx]?.id] || null;
            }
          }

          if (next.status === 'finished') handleFinish('db-finished');
        })
        .subscribe();

      supabase.from('party_sessions').select('started_at,status,current_question')
        .eq('party_code', roomCode).maybeSingle()
        .then(({ data, error }) => {
           if (error || !data) return;
           if (data.started_at) {
              const ms = Date.parse(data.started_at);
              if (!Number.isNaN(ms)) { roomStartedAtMs = ms; examStartTime = ms; }
           }
           if (data.status === 'finished') { handleFinish('db-finished-initial'); return; }
           if (typeof (data as any).current_question === 'number') {
               const nextIdx = Math.max(0, Math.min(activeQuestions.length - 1, (data as any).current_question));
               roomCurrentQuestion = nextIdx;
               if (!isHost && nextIdx !== currentIdx) {
                   currentIdx = nextIdx;
                   questionStartTime = Date.now();
                   selectedOption = answers[activeQuestions[currentIdx]?.id] || null;
               }
           }
           startSyncedRoomTimerIfReady();
        });
    }

    if (isHost && roomCode) {
      broadcastRoomState('active', currentIdx);
    }

    if (roomCode && timeLimitSeconds > 0) {
      if (!roomStartedAtMs) {
        timer = setInterval(() => {
          if (!roomStartedAtMs) {
            roomStartedAtMs = examStartTime || Date.now();
            startSyncedRoomTimerIfReady();
          }
        }, 1500);
      }
    } else {
      timer = setInterval(() => {
        if (timeLeft <= 1) {
           clearInterval(timer); timer = null; timeLeft = 0; handleFinish('timer-expired-local');
        } else {
           timeLeft -= 1;
        }
      }, 1000);
    }

    if (roomCode && sessionId) {
      focusTracker = createFocusTracker(sessionId, (event) => {
          if (!isHost) p2pService.sendToHost('FOCUS_EVENT', event);
      });
      window.addEventListener('blur', () => {
         focusWarningVisible = true;
         setTimeout(() => focusWarningVisible = false, 3000);
      });
    }

    if (isHost) {
        p2pService.onData((msg) => {
             if (msg.type === 'FOCUS_EVENT') {
                 const peers = p2pService.getPeers();
                 const name = peers[msg.senderId]?.name || 'Estudiante';
                 const id = Date.now();
                 focusAlerts = [...focusAlerts, { id, text: `⚠️ ${name} perdió el foco!` }];
                 setTimeout(() => focusAlerts = focusAlerts.filter(a => a.id !== id), 4000);
             }
        });
    }
  });

  onDestroy(() => {
    clearInterval(timer);
    if (roomSyncChannel) supabase.removeChannel(roomSyncChannel);
    if (focusTracker) focusTracker.destroy();
  });

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  let nextButton: HTMLButtonElement | undefined = $state();

  function handleSelect(optionId: string) {
    selectedOption = optionId;
    answers[question.id] = optionId; // Direct mutation ok in Runes via proxy

    if (nextButton) {
       setTimeout(() => nextButton?.focus(), 50);
    }
  }

  function recordQuestionResult() {
    if (!selectedOption) return;
    const isCorrect = selectedOption === correctAnswerId;
    const timeSpentMs = Date.now() - questionStartTime;
    if (isCorrect) currentStreak += 1; else currentStreak = 0;

    const result: QuestionResultData = {
      questionId: question.id,
      question: question,
      isCorrect,
      difficulty: question.difficulty || 3,
      timeSpentMs,
      maxTimeMs: TIME_PER_QUESTION_MS,
      streakCount: isCorrect ? currentStreak : 0
    };

    const existingIdx = questionResults.findIndex(r => r.questionId === question.id);
    if (existingIdx >= 0) questionResults[existingIdx] = result;
    else questionResults.push(result);
  }

  function handleNext() {
    if (selectedOption) {
      // answers already updated in handleSelect
      recordQuestionResult();
    }

    if (currentIdx < activeQuestions.length - 1) {
      // Adaptive Logic: Inject the next question on the fly if enabled
      if (isAdaptiveMode && adaptivePool && adaptivePool.length > 0) {
        console.log('🧠 Adaptive Engine: Evaluating next best question...');
        const usedIds = new Set(activeQuestions.map(q => String(q.id)));
        const nextQ = getNextAdaptiveQuestion(
          adaptivePool as any,
          questionResults as any,
          usedIds
        );

        if (nextQ) {
          console.log(`🧠 Adaptive Engine: Selected question ${nextQ.id} (CEFR: ${nextQ.cefr_level || (nextQ as any).cefrLevel || 'Unknown'}, Diff: ${nextQ.difficulty})`);
          // Overwrite the upcoming question with the adaptively selected one
          activeQuestions[currentIdx + 1] = nextQ as any;
        } else {
          console.log('🧠 Adaptive Engine: Pool exhausted, using original question.');
        }
      }

      currentIdx += 1;
      questionStartTime = Date.now();
      selectedOption = answers[activeQuestions[currentIdx].id] || null;

      if (isHost && roomCode) {
          broadcastRoomState('active', currentIdx);
      }
    } else {
      handleFinish('end-of-questions');
    }
  }

  function handleFinish(reason: string = 'manual') {
    if (finishTriggered) return;
    finishTriggered = true;
    console.log(`✅ Finishing exam (${reason})`);

    if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);

    if (selectedOption) {
      answers[question.id] = selectedOption;
      recordQuestionResult();
    }

    if (isHost && roomCode) {
      broadcastRoomState('finished', currentIdx);
    }

    activeQuestions.forEach((q) => {
      const answer = answers[q.id];
      if (answer && !questionResults.find(r => r.questionId === q.id)) {
        // Normalize logic...
        const qOptions = (q.options || []).map((opt, idx) => ({
          ...opt, id: opt.id ?? OPTION_LETTERS[idx] ?? `opt-${idx}`
        }));
        const qCorrectId = q.correctOptionId && qOptions.some(o => o.id === q.correctOptionId)
          ? q.correctOptionId : qOptions[0]?.id;

        questionResults.push({
          questionId: q.id, question: q, isCorrect: answer === qCorrectId,
          difficulty: q.difficulty || 3, timeSpentMs: TIME_PER_QUESTION_MS,
          maxTimeMs: TIME_PER_QUESTION_MS, streakCount: 0
        });
      }
    });

    const completionData: ExamCompletionData = {
      questions: questionResults,
      totalTimeMs: Date.now() - examStartTime,
      maxTotalTimeMs: EXAM_TIME_SECONDS * 1000,
      grade: grade || activeQuestions[0]?.grade || 0,
      subject: subject || activeQuestions[0]?.category?.split('::')[0]?.trim() || 'General',
      roomCode: roomCode || undefined,
      sessionId: sessionId || undefined,
      isHost: isHost,
      focusEvents: focusTracker ? focusTracker.getEvents() : undefined,
      focusViolations: focusTracker ? focusTracker.getViolationCount() : undefined
    };

    onFinish(completionData, answers);
  }
</script>

<div class="w-full h-screen flex flex-col animate-fade-in-up">
  <!-- 🆕 Focus Lost Warning Banner (Exam Room Mode) -->
  {#if focusWarningVisible && roomCode}
    <div class="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white py-3 px-4 text-center animate-pulse shadow-lg">
      <div class="flex items-center justify-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
        <span class="font-bold uppercase tracking-wider text-sm">⚠️ Saliste de la app - Esto quedará registrado</span>
      </div>
    </div>
  {/if}

  <!-- Header -->
  <div class="shrink-0 px-4 sm:px-6 lg:px-8 pt-4 pb-4 border-b border-white/10 bg-[#121212]/95 backdrop-blur-md z-30">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-row items-center justify-between mb-4 gap-4">
        <!-- Subject Title -->
        <div class="flex items-center space-x-2 min-w-0 flex-1">
          <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shrink-0"></span>
          <h2 class="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-emerald-500 truncate leading-tight">
            {question.category?.split(' :: ')[0] || question.category}
          </h2>
          <!-- Question Metadata: Grade, Level, Period -->
          <div class="flex items-center gap-2 text-[10px] text-white/40 shrink-0">
            <span class="bg-white/5 px-2 py-0.5 rounded border border-white/10">Grado {question.grade}°</span>
            {#if question.difficulty <= 5}
              <span class="bg-white/5 px-2 py-0.5 rounded border border-white/10">Nivel {question.difficulty}</span>
            {/if}
            {#if question.period}
              <span class="bg-white/5 px-2 py-0.5 rounded border border-white/10">P{question.period}</span>
            {/if}
          </div>
        </div>

        <!-- Timer -->
        <div class="text-right shrink-0 flex flex-col items-end gap-1 bg-white/5 px-3 py-1 rounded-md border border-white/10">
          <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-base sm:text-xl font-mono font-bold text-[#F5F5DC] tabular-nums">
            {formatTime(timeLeft)}
          </span>
          </div>

          {#if roomCode && timeLimitSeconds > 0}
            <div class="text-[10px] uppercase tracking-widest opacity-60">
              Pregunta: <span class="font-mono font-bold tabular-nums text-emerald-400">{formatTime(questionTimeLeft)}</span>
            </div>
          {/if}
        </div>
      </div>

      <!-- Timer Progress Bar -->
      <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden shadow-inner">
        <div
          class="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          style="width: {(timeLeft / EXAM_TIME_SECONDS) * 100}%"
        ></div>
      </div>
    </div>
  </div>

  <!-- Main Content Area - No scroll on desktop, optimized for mobile -->
  <div class="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
    <div class="max-w-4xl mx-auto min-h-full flex flex-col justify-center space-y-4 sm:space-y-6 py-4">
      <!-- Question Card - Flexible Height -->
      {#if question.context}
        <div class="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-4 sm:p-5 mb-2 overflow-y-auto max-h-[30vh] scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent">
           <div class="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider flex items-center gap-2">
             <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
             </svg>
             Contexto  / Lectura
           </div>
           <div class="text-sm sm:text-base text-gray-300 font-serif leading-relaxed space-y-2">
             <MathRenderer content={question.context?.trim()} />
           </div>
        </div>
      {/if}

      <div class="bg-[#1E1E1E]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[45vh] transition-all duration-300 relative overflow-hidden group">
        <!-- Decorative gradient -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-50"></div>

        <div class="overflow-y-auto p-5 sm:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent">
          <div class="flex items-start gap-4 sm:gap-5 lg:gap-6">
            <div class="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-500/20 leading-none select-none shrink-0 sticky top-0 font-mono">
              {(currentIdx + 1).toString().padStart(2, '0')}
            </div>
            <div class="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-gray-100 font-sans tracking-wide">
              <MathRenderer content={
                question.text?.trim()
                  .replace(/^##\s*Pregunta\s*\d+.*$/gim, '') // Remove internal header markers
                  .replace(/^#\s*Pregunta\s*\d+.*$/gim, '')
                  .trim()
              } />
            </div>
          </div>
        </div>
      </div>

      <!-- Options Grid - More Compact & Aligned -->
      <div class="grid grid-cols-1 gap-2 sm:gap-3 w-full" data-testid="options-grid">
        {#if hasValidQuestion}
          {#each safeOptions as option, idx (option.id ?? `opt-${idx}`)}
            <FlashlightCard
              isActive={selectedOption === option.id}
              onClick={() => handleSelect(option.id)}
              className="cursor-pointer hover:border-emerald-500/40 transition-all duration-200 rounded-xl overflow-hidden group"
            >
              <div class="py-4 px-5 sm:py-5 sm:px-6 flex items-center gap-4"> <!-- 📱 Increased padding for touch -->
                <div class={`
                  w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-300 shrink-0 border
                  ${selectedOption === option.id
                    ? 'border-emerald-500 bg-emerald-500 text-[#121212] shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'border-white/10 bg-white/5 text-gray-400 group-hover:border-emerald-500/30 group-hover:text-emerald-400'}
                `}>
                  {option.id}
                </div>
                <span class={`
                  text-base sm:text-lg font-sans leading-snug flex-1 transition-colors duration-200 <!-- 📱 Increased font size -->
                  ${selectedOption === option.id ? 'text-white font-medium' : 'text-gray-300 font-normal group-hover:text-white'}
                `}>
                  <MathRenderer content={option.text} />
                </span>
              </div>
            </FlashlightCard>
          {/each}
        {:else}
          <div class="col-span-full text-center p-8 border border-dashed border-red-500/30 bg-red-500/5 rounded-xl">
            <div class="text-red-400 text-lg mb-2">⚠️ Error cargando pregunta</div>
            <p class="text-sm text-white/60">Esta pregunta no tiene opciones válidas. Por favor continúa al siguiente.</p>
          </div>
        {/if}
      </div>

    </div>
  </div>

  <!-- Footer -->
  <div class="shrink-0 px-4 sm:px-6 lg:px-8 py-4 border-t border-white/10 bg-[#121212]/80 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      <!-- Left: Report -->
      <button
        onclick={() => showReportModal = true}
        class="flex items-center justify-center p-2.5 sm:px-6 sm:py-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 uppercase tracking-widest text-[9px] sm:text-xs font-bold active:scale-95 rounded-lg shrink-0"
        title="Reportar anomalía"
      >
        <svg class="w-5 h-5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span class="hidden sm:inline ml-2">Reportar</span>
      </button>

      <!-- Center: Status -->
      <div class="text-[10px] sm:text-xs font-mono opacity-40 shrink-0 text-center">
        <span class="hidden xs:inline">Pregunta</span> {currentIdx + 1} / {activeQuestions.length}
      </div>

      <!-- Right: Next -->
      <button
        bind:this={nextButton}
        onclick={handleNext}
        class="px-5 sm:px-8 py-2.5 sm:py-3 bg-emerald-900/20 border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500 hover:text-[#121212] transition-all duration-300 uppercase tracking-widest text-[10px] sm:text-sm font-bold active:scale-95 rounded-lg min-w-[90px] sm:min-w-[140px] shrink-0"
      >
        {currentIdx === activeQuestions.length - 1 ? 'Finalizar' : 'Siguiente'}
      </button>
    </div>
  </div>

  <!-- Focus Alerts (Host Only) -->
  {#if focusAlerts.length > 0}
    <div class="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {#each focusAlerts as alert (alert.id)}
        <div
          transition:fly={{ x: 20, duration: 300 }}
          class="bg-red-500/90 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm text-sm font-medium flex items-center gap-2"
        >
          <span class="i-lucide-alert-triangle w-4 h-4"></span>
          {alert.text}
        </div>
      {/each}
    </div>
  {/if}

  <!-- Report Modal -->
  {#if showReportModal}
    <ReportModal
      show={showReportModal}
      onClose={() => showReportModal = false}
      questionId={question.id}
      userContext="ExamView"
      questionData={question}
    />
  {/if}

</div>
