<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition'; // 🆕 Transition
  import type { Question, QuestionResultData, ExamCompletionData } from '../types';
  import { supabase } from '../lib/supabase'; // 🆕 Import Supabase
  import { p2pService } from '../lib/p2p-service'; // 🆕 P2P Service
  import FlashlightCard from './FlashlightCard.svelte';
  import MathRenderer from './MathRenderer.svelte';
  import { reportQuestionAnomaly } from '../lib/api-service'; // Import reporting function
  import type { APIQuestion } from '../lib/api-service'; // 🆕 APIQuestion type
  import { createFocusTracker, type FocusTracker } from '../lib/focus-tracker'; // 🆕 Focus Tracker

  // Props
  export let onFinish: (data: ExamCompletionData, answers: Record<string | number, string>) => void;
  export let onCancel: () => void = () => {};
  export let questions: Question[] = [];
  export let grade: number = 0;
  export let subject: string = 'General';

  // Exam Room Mode Props
  export let roomCode: string | null = null;
  export let roomChannel: any | null = null;
  export let isHost: boolean = false;
  export let sessionId: string | null = null; // 🆕 Local session ID
  export let timeLimitSeconds: number = 0; // 🆕 Time limit from config
  export let startedAt: string | null = null; // 🆕 Explicit start time for sync
  export let totalQuestions: number = 0; // 🆕 Expected total questions for sync

  // 🆕 Focus Tracker for exam integrity monitoring
  let focusTracker: FocusTracker | null = null;
  let focusWarningVisible = false;

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

  // Safely handle undefined/null questions prop
  $: safeQuestions = Array.isArray(questions) ? questions : [];
  $: activeQuestions = safeQuestions.length > 0 ? safeQuestions : MOCK_QUESTIONS;

  // Basic state
  let currentIdx = 0;
  let selectedOption: string | null = null;
  let answers: Record<string | number, string> = {};
  let timer: any;

  // 🆕 Exam Room Mode: synced countdown (use DB started_at as anchor)
  let roomSyncChannel: any | null = null;
  let roomStartedAtMs: number | null = null;
  let roomEndedAtMs: number | null = null;
  let roomCurrentQuestion: number | null = null;
  let finishTriggered = false;

  // 🆕 Exam Room Mode: per-question countdown (UI)
  let questionTimeLeft = 0;

  // 🆕 Focus Alerts for Host
  let focusAlerts: {id: number, text: string}[] = [];

  // Time tracking
  // Time tracking
  // Smart default: 2 minutes per question, minimum 5 minutes
  $: smartDefaultTime = Math.max(300, activeQuestions.length * 120);
  $: EXAM_TIME_SECONDS = timeLimitSeconds > 0 ? timeLimitSeconds : smartDefaultTime;

  $: effectiveQuestionCount = totalQuestions > 0 ? totalQuestions : Math.max(activeQuestions.length, 1);
  $: TIME_PER_QUESTION_MS = (EXAM_TIME_SECONDS * 1000) / effectiveQuestionCount;

  // Initialize timeLeft using specific logic to handle the initial state clearly
  let timeLeft = 0;

  // Reactive synchronization of timeLeft when timer is not running
  $: if (!timer && EXAM_TIME_SECONDS > 0) {
      timeLeft = EXAM_TIME_SECONDS;
      console.log('⏱️ TimeLeft initialized to:', timeLeft, '(Questions:', activeQuestions.length, ')');
  }

  let examStartTime = 0;
  let questionStartTime = 0;

  // Scoring tracking
  let questionResults: QuestionResultData[] = [];
  let currentStreak = 0;

  const STORAGE_KEY = 'saberparatodos_exam_progress';

  $: question = activeQuestions[currentIdx] || MOCK_QUESTIONS[0];

  // Ensure question has valid options array with guaranteed IDs
  const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  $: safeOptions = (question?.options || []).map((opt, idx) => ({
    ...opt,
    id: opt.id ?? OPTION_LETTERS[idx] ?? `opt-${idx}` // Ensure every option has an id
  }));
  $: hasValidQuestion = question && Array.isArray(question.options) && question.options.length > 0;

  // Map the correct answer to the normalized option ID
  $: correctAnswerId = (() => {
    // If correctOptionId exists and matches a safeOption, use it directly
    if (question?.correctOptionId && safeOptions.some(o => o.id === question.correctOptionId)) {
      return question.correctOptionId;
    }
    // Try to find by index if correctOptionId is a number (0-based index)
    if (typeof question?.correctOptionId === 'number') {
      return safeOptions[question.correctOptionId]?.id;
    }
    // Fallback: assume first option is correct (shouldn't happen in prod)
    return safeOptions[0]?.id;
  })();

  // 🆕 Exam Room Mode Broadcast Logic
  async function broadcastRoomState(status: 'active' | 'finished', index: number) {
      if (!isHost || !roomCode) return;

      const broadcastPayload = {
        status,
        current_question_index: index,
        question_data: activeQuestions[index] || null
      };

      // 1. Update Database (only real columns)
      const updatePayload: Record<string, any> = { status, current_question: index };
      if (status === 'finished') {
        updatePayload.finished_at = new Date().toISOString();
      }

      try {
        const { error } = await supabase
          .from('party_sessions')
          .update(updatePayload)
          .eq('party_code', roomCode);

        if (error) {
          // 🆕 Handle RLS policy violations gracefully
          if (error.code === '42501') {
            console.warn('⚠️ RLS policy blocked update (anonymous user). Using P2P fallback.');
          } else {
            console.error('Error updating room state:', error);
          }
        }
      } catch (dbErr) {
        console.warn('⚠️ DB update failed, using P2P fallback:', dbErr);
      }

      // 2. Broadcast Event (Realtime) - Always attempt even if DB fails
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

    // Derive per-question duration from total/questions.
    // In Exam Room Mode this should match host's time_option.
    const timePerQuestionMs = Math.max(1, Math.ceil((timeLimitSeconds * 1000) / effectiveQuestionCount));

    if (timer) clearInterval(timer);

    // Update at sub-second precision so UI feels responsive, but use ceil() so everyone hits 0 together.
    timer = setInterval(() => {
      const remainingMs = Math.max(0, (roomEndedAtMs ?? 0) - Date.now());
      const nextSeconds = Math.ceil(remainingMs / 1000);
      timeLeft = nextSeconds;

      // Per-question countdown (UI-only)
      // Uses the shared started_at anchor + current question index.
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

  // Effect to broadcast whenever currentIdx changes
  $: if (isHost && roomCode && activeQuestions.length > 0) {
      // Create a dedicated effect for broadcasting index changes
      // Using a reactive statement that depends on currentIdx
      // De-bounce slightly if needed, but here immediate is fine
      // Avoid broadcasting on initial mount inside this reactive block if called manually in onMount
  }

  // Persistencia
  // Persistencia reactiva
  $: {
    // Dependencias explícitas para gatillar guardado
    const _deps = [answers, currentIdx, timeLeft, questionResults, currentStreak];
    if (activeQuestions.length > 0) {
      saveProgress();
    }
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
    // Disabled console log for storage to reduce noise
    // console.log('💾 ExamView: Saving progress to storage', STORAGE_KEY, state);
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

  // Reporting State
  let showReportModal = false;
  let isReporting = false;
  let reportType = '';
  let reportDetails = '';
  let showReportToast = false;

  async function handleReport() {
      if (!reportType) return;

      isReporting = true;
      const currentQ = activeQuestions[currentIdx];

      const result = await reportQuestionAnomaly(
          currentQ.id,
          reportType as any,
          reportDetails
      );

      isReporting = false;
      showReportModal = false;
      reportType = '';
      reportDetails = '';

      if (result.success) {
          showReportToast = true;
          setTimeout(() => showReportToast = false, 3000);
      } else {
          alert('Error enviando reporte via Supabase. (La tabla question_reports podría no existir)');
      }
  }

  // --- Constants ---
  onMount(() => {
    loadProgress();

    // 🆕 Initial synchronization with prop startedAt
    if (startedAt) {
      const ms = Date.parse(startedAt);
      if (!Number.isNaN(ms)) {
        roomStartedAtMs = ms;
        examStartTime = ms;
        console.log('🏁 ExamView synced via prop startedAt:', startedAt);
      }
    }

    // Initialize times if new exam
    if (examStartTime === 0) {
      examStartTime = Date.now();
    }
    questionStartTime = Date.now();

    // 🆕 Exam Room Mode: Subscribe to DB updates to sync countdown + forced finish
    if (roomCode) {
      roomSyncChannel = supabase
        .channel(`party-exam:${roomCode}`)
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'party_sessions',
          filter: `party_code=eq.${roomCode}`
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

            // Guests follow host's current_question to stay synchronized.
            if (!isHost && nextIdx !== currentIdx) {
              currentIdx = nextIdx;
              questionStartTime = Date.now();
              selectedOption = answers[activeQuestions[currentIdx]?.id] || null;
            }
          }

          if (next.status === 'finished') {
            handleFinish('db-finished');
          }
        })
        .subscribe();

      // Fetch current started_at/status once (covers refresh / late mount)
      supabase
        .from('party_sessions')
        .select('started_at,status,current_question')
        .eq('party_code', roomCode)
        .maybeSingle()
        .then(({ data, error }) => {
          if (error || !data) return;

          if (data.started_at) {
            const startedMs = Date.parse(data.started_at);
            if (!Number.isNaN(startedMs)) {
              roomStartedAtMs = startedMs;
              examStartTime = startedMs;
            }
          }

          if (data.status === 'finished') {
            handleFinish('db-finished-initial');
            return;
          }

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

    // 🆕 Initial Broadcast for Exam Room Mode
    if (isHost && roomCode) {
      broadcastRoomState('active', currentIdx);
    }

    // Timer
    if (roomCode && timeLimitSeconds > 0) {
      // Room: timer will be started once we get started_at
      // Keep a conservative fallback in case started_at never arrives
      if (!roomStartedAtMs) {
        timer = setInterval(() => {
          // If we still don't have started_at after a short while, use local clock as last resort.
          // This is suboptimal but prevents the exam from never finishing.
          if (!roomStartedAtMs) {
            roomStartedAtMs = examStartTime || Date.now();
            startSyncedRoomTimerIfReady();
          }
        }, 1500);
      }
    } else {
      // Solo / unlimited: local countdown
      timer = setInterval(() => {
        if (timeLeft <= 1) {
          clearInterval(timer);
          timer = null;
          timeLeft = 0;
          handleFinish('timer-expired-local');
        } else {
          timeLeft -= 1;
        }
      }, 1000);
    }

    // 🆕 Initialize Focus Tracker for Exam Room Mode
    if (roomCode && sessionId) {
      focusTracker = createFocusTracker(sessionId, (event) => {
          // Broadcast violation to Anfitrión
          if (!isHost) {
              p2pService.sendToHost('FOCUS_EVENT', event);
          }
      });

      // Show warning when focus is lost
      const handleBlur = () => {
        focusWarningVisible = true;
        setTimeout(() => focusWarningVisible = false, 3000);
      };
      window.addEventListener('blur', handleBlur);
    }

    // 🆕 Host Monitoring
    if (isHost) {
        p2pService.onData((msg) => {
             if (msg.type === 'FOCUS_EVENT') {
                 const peers = p2pService.getPeers();
                 const name = peers[msg.senderId]?.name || 'Estudiante';
                 const id = Date.now();
                 focusAlerts = [...focusAlerts, { id, text: `⚠️ ${name} perdió el foco!` }];
                 setTimeout(() => {
                     focusAlerts = focusAlerts.filter(a => a.id !== id);
                 }, 4000);
             }
        });
    }
  });

  onDestroy(() => {
    clearInterval(timer);
    if (roomSyncChannel) {
      supabase.removeChannel(roomSyncChannel);
      roomSyncChannel = null;
    }

    // 🆕 Cleanup focus tracker
    if (focusTracker) {
      focusTracker.destroy();
    }

    // If Host, perhaps mark as paused or finished?
    // Usually user handles finish via handleFinish, but if unmounted abruptly:
    // We don't do anything specific here to avoid accidental closures.
  });

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  let nextButton: HTMLButtonElement | undefined = undefined;

  function handleSelect(optionId: string) {
    selectedOption = optionId;
    answers = { ...answers, [question.id]: optionId };

    // Auto-focus Next button for keyboard navigation
    // This allows users to press ENTER immediately after selecting an option
    if (nextButton) {
       // Small timeout to ensure DOM selection state is updated first
       setTimeout(() => nextButton?.focus(), 50);
    }
  }

  function recordQuestionResult() {
    if (!selectedOption) return;

    const isCorrect = selectedOption === correctAnswerId;
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
      question: question, // 🆕 Persist full question for offline history
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
      const nextIndex = currentIdx + 1;
      currentIdx = nextIndex;
      questionStartTime = Date.now(); // Reset for next question
      selectedOption = answers[activeQuestions[currentIdx].id] || null;

      // 🆕 Broadcast update
      if (isHost && roomCode) {
          broadcastRoomState('active', nextIndex);
      }
    } else {
      handleFinish('end-of-questions');
    }
  }

  function handleFinish(reason: string = 'manual') {
    if (finishTriggered) return;
    finishTriggered = true;
    console.log(`✅ Finishing exam (${reason})`);

    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }

    // Record final answer if not yet recorded
    if (selectedOption) {
      answers = { ...answers, [question.id]: selectedOption };
      recordQuestionResult();
    }

    // 🆕 Broadcast Finish (host marks DB as finished, forcing all clients to finish)
    if (isHost && roomCode) {
      broadcastRoomState('finished', currentIdx);
      // Note: Results aggregation usually happens in ResultsView or RoomResultsView.
      // We just signal finish here.
    }

    // Ensure all answered questions have results
    activeQuestions.forEach((q, qIdx) => {
      const answer = answers[q.id];
      if (answer && !questionResults.find(r => r.questionId === q.id)) {
        // Normalize correctOptionId for this question
        const qOptions = (q.options || []).map((opt, idx) => ({
          ...opt,
          id: opt.id ?? OPTION_LETTERS[idx] ?? `opt-${idx}`
        }));
        const qCorrectId = q.correctOptionId && qOptions.some(o => o.id === q.correctOptionId)
          ? q.correctOptionId
          : qOptions[0]?.id;

        questionResults = [...questionResults, {
          questionId: q.id,
          question: q, // 🆕 Persist full question for offline history
          isCorrect: answer === qCorrectId,
          difficulty: q.difficulty || 3,
          timeSpentMs: TIME_PER_QUESTION_MS, // Default if not tracked
          maxTimeMs: TIME_PER_QUESTION_MS,
          streakCount: 0
        }];
      }
    });

    const totalTimeMs = Date.now() - examStartTime;

    // 🆕 Get focus events if tracker exists
    const focusEvents = focusTracker ? focusTracker.getEvents() : [];
    const focusViolations = focusTracker ? focusTracker.getViolationCount() : 0;

    const completionData: ExamCompletionData = {
      questions: questionResults,
      totalTimeMs,
      maxTotalTimeMs: EXAM_TIME_SECONDS * 1000,
      grade: grade || activeQuestions[0]?.grade || 0,
      subject: subject || activeQuestions[0]?.category?.split('::')[0]?.trim() || 'General',
      // 🆕 Exam Room Mode extras
      roomCode: roomCode || undefined,
      sessionId: sessionId || undefined,
      isHost: isHost, // 🆕 Pass host status
      focusEvents: focusEvents.length > 0 ? focusEvents : undefined,
      focusViolations: focusViolations > 0 ? focusViolations : undefined
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
  <!-- Header -->
  <div class="shrink-0 px-4 sm:px-6 lg:px-8 pt-4 pb-4 border-b border-white/10 bg-[#121212]/95 backdrop-blur-md z-30">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-row items-center justify-between mb-4 gap-4">
        <!-- Subject Title -->
        <div class="flex items-center space-x-2 min-w-0 flex-1">
          <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shrink-0"></span>
          <h2 class="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-emerald-500 truncate leading-tight">
            {question.category}
          </h2>
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
             <span class="i-lucide-book-open w-4 h-4"></span>
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
              <MathRenderer content={question.text?.trim()} />
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
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="text-[10px] sm:text-xs font-mono opacity-40">
        Pregunta {currentIdx + 1} de {activeQuestions.length}
      </div>
      <button
        on:click={() => showReportModal = true}
        class="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm font-bold active:scale-95 flex items-center gap-2 mr-2"
        title="Reportar anomalía"
      >
        <span class="i-lucide-alert-triangle w-4 h-4"></span>
        <span class="hidden sm:inline">Reportar</span>
      </button>

      <button
        bind:this={nextButton}
        on:click={handleNext}
        class="px-6 sm:px-8 py-2 sm:py-3 bg-emerald-900/20 border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500 hover:text-[#121212] transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm font-bold active:scale-95"
      >
        {currentIdx === activeQuestions.length - 1 ? 'Finalizar' : 'Siguiente >>'}
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
    <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" transition:fade>
      <div
         class="bg-[#1E1E1E] border border-yellow-500/30 rounded-2xl p-6 shadow-2xl max-w-md w-full relative overflow-hidden"
         transition:scale
      >
        <!-- Header -->
        <h3 class="text-xl font-bold text-yellow-500 mb-4 flex items-center gap-2">
            <span class="i-lucide-alert-triangle"></span>
            Reportar Anomalía
        </h3>

        <p class="text-gray-400 text-sm mb-6">Esta pregunta tiene un problema. Tu reporte ayuda a mejorar la calidad.</p>

        <!-- Options -->
        <div class="space-y-3 mb-6">
            {#each [
                { id: 'contexto', label: 'Sin contexto / Contexto incompleto' },
                { id: 'errada', label: 'Respuesta errada / incorrecta' },
                { id: 'simbolos', label: 'Símbolos extraños / Mala renderización' },
                { id: 'otro', label: 'Otro problema' }
            ] as opt}
               <label class="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-white/5 transition-colors {reportType === opt.id ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10'}">
                   <input type="radio" name="reportType" value={opt.id} bind:group={reportType} class="text-yellow-500 focus:ring-yellow-500" />
                   <span class="text-gray-200 text-sm">{opt.label}</span>
               </label>
            {/each}

             <textarea
               bind:value={reportDetails}
               placeholder="Detalles adicionales (opcional)..."
               class="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:border-yellow-500 outline-none resize-none h-24 mt-2"
            ></textarea>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 justify-end">
            <button
              on:click={() => showReportModal = false}
              class="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
                Cancelar
            </button>
            <button
              on:click={handleReport}
              disabled={!reportType || isReporting}
              class="px-6 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                {#if isReporting}
                   <span class="animate-spin i-lucide-loader-2 w-4 h-4"></span>
                {/if}
                Enviar Reporte
            </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Success Toast -->
  {#if showReportToast}
     <div class="fixed bottom-20 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 z-[70]" transition:fly={{ y: 20 }}>
         <span class="i-lucide-check-circle"></span>
         Reporte enviado exisotamente
     </div>
  {/if}
</div>
