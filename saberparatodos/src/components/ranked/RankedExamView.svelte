<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import MathRenderer from '../MathRenderer.svelte';
  import FlashlightCard from '../FlashlightCard.svelte';
  import { startRanked, submitRanked, RANKED_MIN_ANSWERED, RANKED_TOTAL_QUESTIONS, RANKED_DURATION_S, expiresAtMs, loadActiveRankedSession, clearActiveRankedSession, saveActiveRankedSession, type RankedQuestion, type ActiveRankedSession, type RankedAnswer, type RankedSubmitResponse, type IntegritySummary } from '../../lib/ranked/ranked-client';
  import { BehaviorAnalyzer } from '../../lib/anti-cheat/behavior-analysis';
  import { createFocusTracker, type FocusTracker } from '../../lib/focus-tracker';

  // State Machine Type
  type Phase = 'rules' | 'exam' | 'submitting' | 'result';

  interface Props {
    nickname: string;
    onExit: () => void;
    onOpenLeaderboard: () => void;
  }

  let { nickname, onExit, onOpenLeaderboard }: Props = $props();

  let phase = $state<Phase>('rules');

  // Exam state
  let questions = $state<RankedQuestion[]>([]);
  let currentIdx = $state(0);
  let answers = $state<Record<string, RankedAnswer>>({});

  let sessionId = $state('');

  // Timer state
  let timeLeft = $state(60 * 60); // 60 minutes
  let timer: ReturnType<typeof setInterval> | null = null;
  let questionStartTime = $state(Date.now());

  let currentQuestion = $derived(questions[currentIdx]);
  let selectedOption = $derived(answers[currentQuestion?.id]?.letter || null);

  // Anti-cheat state
  let behaviorAnalyzer = $state<BehaviorAnalyzer | null>(null);
  let focusTracker = $state<FocusTracker | null>(null);
  let showFullscreenWarning = $state(false);
  let focusWarningVisible = $state(false);
  let fullscreenExits = $state(0);
  let focusWarningTimeout: ReturnType<typeof setTimeout> | null = null;

  // Submit & Result state
  let submitConfirmVisible = $state(false);
  let isSubmitting = $state(false);
  let submitError = $state<string | null>(null);
  let submitResult = $state<RankedSubmitResponse | null>(null);

  function formatTime(s: number) {
    if (s <= 0) return '00:00';
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function handleFullscreenChange() {
    if (phase !== 'exam') return;
    if (!document.fullscreenElement) {
       fullscreenExits++;
       showFullscreenWarning = true;
    }
  }

  async function requestFullscreenAgain() {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      showFullscreenWarning = false;
    } catch (err) {
      console.warn("Fullscreen request failed", err);
      showFullscreenWarning = false;
    }
  }

  async function startExam() {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen API not available or blocked, continuing anyway.", err);
    }

    try {
      let session = loadActiveRankedSession();
      if (session) {
        questions = session.questions;
        sessionId = session.sessionId;

        session.answers.forEach(a => {
           answers[a.questionId] = a;
        });

        const expiresAt = expiresAtMs(session.expiresAt);
        const now = Date.now();
        timeLeft = Math.max(0, Math.min(RANKED_DURATION_S, Math.floor((expiresAt - now) / 1000)));
      } else {
        const startRes = await startRanked(nickname);
        questions = startRes.questions;
        sessionId = startRes.sessionId;

        const expiresAt = expiresAtMs(startRes.expiresAt);
        const now = Date.now();
        timeLeft = Math.max(0, Math.min(RANKED_DURATION_S, Math.floor((expiresAt - now) / 1000)));

        saveActiveRankedSession({
           sessionId: startRes.sessionId,
           expiresAt: startRes.expiresAt,
           questions: startRes.questions,
           answers: []
        });
      }

      questionStartTime = Date.now();

      if (timeLeft > 0) {
        timer = setInterval(() => {
          timeLeft -= 1;
          if (timeLeft <= 0) {
            handleTimeUp();
          }
        }, 1000);
      } else {
        handleTimeUp();
      }

      behaviorAnalyzer = new BehaviorAnalyzer(sessionId);
      behaviorAnalyzer.start();

      focusTracker = createFocusTracker(sessionId, (evt) => {
         if (evt.type === 'blur' || evt.type === 'hidden') {
            focusWarningVisible = true;
            if (focusWarningTimeout) clearTimeout(focusWarningTimeout);
            focusWarningTimeout = setTimeout(() => focusWarningVisible = false, 3000);
         }
      });

      document.addEventListener('fullscreenchange', handleFullscreenChange);

      phase = 'exam';
    } catch (e) {
      console.error("Failed to start ranked exam", e);
      alert("Error al iniciar el examen. Intenta de nuevo.");
    }
  }

  function handleTimeUp() {
    if (timer) clearInterval(timer);
    triggerSubmit(true);
  }

  function handleSelect(letter: string) {
     const now = Date.now();
     const ms = now - questionStartTime;
     answers[currentQuestion.id] = { questionId: currentQuestion.id, letter, ms };

     if (behaviorAnalyzer) {
       behaviorAnalyzer.recordAnswer(letter, now);
     }

     let session = loadActiveRankedSession();
     if (session) {
        session.answers = Object.values(answers);
        saveActiveRankedSession(session);
     }
  }

  function goPrev() {
     if (currentIdx > 0) {
        currentIdx--;
        questionStartTime = Date.now();
     }
  }

  function goNext() {
     if (currentIdx < questions.length - 1) {
        currentIdx++;
        questionStartTime = Date.now();
     } else {
        triggerSubmit(false);
     }
  }

  function triggerSubmit(auto: boolean) {
    const answeredCount = Object.keys(answers).length;
    if (!auto && answeredCount < RANKED_MIN_ANSWERED) {
      submitConfirmVisible = true;
    } else {
      doSubmit();
    }
  }

  async function doSubmit() {
    submitConfirmVisible = false;
    phase = 'submitting';
    isSubmitting = true;
    submitError = null;

    if (timer) clearInterval(timer);

    let integritySummary: IntegritySummary = {
       tabSwitches: 0,
       focusLoss: 0,
       fullscreenExits: fullscreenExits,
       copyPaste: 0,
       rightClick: 0,
       devtools: 0
    };

    if (behaviorAnalyzer) {
       const score = behaviorAnalyzer.getIntegrityScore();
       integritySummary.copyPaste = score.copyPasteEvents;
       integritySummary.rightClick = score.rightClickEvents;
       integritySummary.devtools = score.devtoolsEvents;
       integritySummary.tabSwitches = score.tabSwitchEvents;
       integritySummary.focusLoss = score.focusLossEvents;
       behaviorAnalyzer.stop();
    }

    if (focusTracker) {
       focusTracker.destroy();
    }

    try {
      const answersArr = Object.values(answers);
      const res = await submitRanked(sessionId, answersArr, integritySummary);
      submitResult = res;
      clearActiveRankedSession();

      if (document.fullscreenElement && document.exitFullscreen) {
         await document.exitFullscreen().catch(() => {});
      }

      phase = 'result';
    } catch (err: any) {
      console.error('Submit error:', err);
      submitError = err.message || 'Error al enviar el examen.';
      isSubmitting = false;
      // if fail, stay in submitting to show error and retry
    }
  }

  function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
  }

  function handleCopy(e: ClipboardEvent) {
    e.preventDefault();
  }

  function handleContextMenu(e: Event) {
    e.preventDefault();
  }

  $effect(() => {
    if (phase === 'exam') {
       document.addEventListener('paste', handlePaste);
       document.addEventListener('copy', handleCopy);
       document.addEventListener('contextmenu', handleContextMenu);
    } else {
       document.removeEventListener('paste', handlePaste);
       document.removeEventListener('copy', handleCopy);
       document.removeEventListener('contextmenu', handleContextMenu);
    }
  });

  $effect(() => {
    return () => {
      if (timer) clearInterval(timer);
      if (behaviorAnalyzer) behaviorAnalyzer.stop();
      if (focusTracker) focusTracker.destroy();
      if (focusWarningTimeout) clearTimeout(focusWarningTimeout);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  });
</script>

<div
  class="min-h-screen w-full bg-[#1E1E1E] text-white flex flex-col items-center select-none"
  style="user-select: none;"
  oncontextmenu={(e) => e.preventDefault()}
  onpaste={(e) => e.preventDefault()}
  oncopy={(e) => e.preventDefault()}
  oncut={(e) => e.preventDefault()}
>
  {#if phase === 'rules'}
    <div class="flex-1 flex flex-col justify-center max-w-2xl px-6 w-full gap-4">
      <h1 class="text-3xl font-bold text-emerald-400">Examen Clasificatorio</h1>
      <ul class="list-disc pl-5 text-lg text-gray-300 space-y-2">
        <li>40 preguntas mezcladas (5 áreas)</li>
        <li>60 minutos de duración máxima</li>
        <li>Pantalla completa obligatoria</li>
        <li>No copiar/pegar ni cambiar de pestaña (será reportado)</li>
        <li>Solo cuentan para el ranking los intentos con <span class="font-bold text-emerald-400">más de 30</span> preguntas respondidas</li>
        <li>Solo se publican puntajes iguales o superiores al promedio</li>
      </ul>
      <button
        onclick={startExam}
        class="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-bold transition">
        Comenzar ranked
      </button>
    </div>

  {:else if phase === 'exam'}
    <!-- Confirm Submit Overlay -->
    {#if submitConfirmVisible}
       <div class="fixed inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center p-6 backdrop-blur-sm">
         <div class="bg-[#2A2A2A] border border-white/10 p-6 rounded-2xl max-w-md w-full shadow-2xl">
           <h3 class="text-2xl font-bold text-yellow-400 mb-4">Confirmar Envío</h3>
           <p class="text-gray-300 mb-6 text-lg">
             Has respondido {Object.keys(answers).length} de {RANKED_TOTAL_QUESTIONS} preguntas.
             <br/><br/>
             <strong class="text-red-400">No será elegible para el ranking (se necesitan más de 30 respuestas).</strong>
             <br/><br/>
             ¿Estás seguro que deseas terminar y enviar el examen?
           </p>
           <div class="flex justify-end gap-4">
             <button
               onclick={() => submitConfirmVisible = false}
               class="px-5 py-2 rounded-xl border border-white/20 text-white hover:bg-white/10 transition">
               Cancelar
             </button>
             <button
               onclick={doSubmit}
               class="px-5 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 transition">
               Enviar
             </button>
           </div>
         </div>
       </div>
    {/if}

    <!-- Fullscreen Warning Overlay -->
    {#if showFullscreenWarning}
       <div class="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-6 backdrop-blur-sm">
         <div class="text-red-500 mb-4">
           <svg class="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
           </svg>
         </div>
         <h2 class="text-3xl font-bold text-white mb-2">Saliste de pantalla completa</h2>
         <p class="text-gray-300 text-center mb-8 max-w-md">
           El examen clasificatorio requiere pantalla completa. Esto ha sido registrado en tu reporte de integridad.
         </p>
         <button
           onclick={requestFullscreenAgain}
           class="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-bold text-lg shadow-lg transition transform hover:scale-105">
           Vuelve a pantalla completa
         </button>
       </div>
    {/if}

    <div class="w-full flex flex-col h-screen overflow-hidden animate-fade-in-up">
      <!-- Focus Warning Toast -->
      {#if focusWarningVisible}
        <div class="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white py-3 px-4 text-center animate-pulse shadow-lg">
          <div class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <span class="font-bold uppercase tracking-wider text-sm">⚠️ Saliste de la pestaña - Esto quedará registrado</span>
          </div>
        </div>
      {/if}

      <!-- Header -->
      <div class="shrink-0 px-4 sm:px-6 lg:px-8 pt-4 pb-4 border-b border-white/10 bg-[#121212]/95 backdrop-blur-md z-30">
        <div class="max-w-7xl mx-auto flex justify-between items-center mb-4">
          <div class="flex items-center space-x-2">
            <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">
              {currentQuestion?.subject}
            </h2>
          </div>
          <div class="bg-white/5 px-3 py-1 rounded-md border border-white/10 flex items-center gap-2">
            <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-xl font-mono font-bold text-[#F5F5DC] tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {#if currentQuestion}
          <div class="max-w-4xl mx-auto min-h-full flex flex-col justify-center space-y-4 sm:space-y-6">

            {#if currentQuestion.context}
              <div class="bg-white/5 p-4 rounded-xl border border-white/10 prose prose-invert max-w-none text-gray-300">
                 <MathRenderer content={currentQuestion.context} />
              </div>
            {/if}

            <div class="bg-[#1E1E1E]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden group p-6">
              <div class="flex gap-4">
                <div class="text-3xl font-bold text-emerald-500/20 leading-none shrink-0 font-mono">
                  {(currentIdx + 1).toString().padStart(2, '0')}
                </div>
                <div class="text-lg text-gray-100">
                  <MathRenderer content={currentQuestion.statement} />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-2 sm:gap-3 w-full">
              {#each currentQuestion.options as option}
                <FlashlightCard
                  isActive={selectedOption === option.letter}
                  onClick={() => handleSelect(option.letter)}
                  className="cursor-pointer hover:border-emerald-500/40 transition-all rounded-xl overflow-hidden group"
                >
                  <div class="py-4 px-5 flex items-center gap-4">
                    <div class={`
                      w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold border shrink-0
                      ${selectedOption === option.letter
                        ? 'border-emerald-500 bg-emerald-500 text-[#121212] shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                        : 'border-white/10 bg-white/5 text-gray-400'}
                    `}>
                      {option.letter}
                    </div>
                    <span class="text-base text-gray-300">
                      <MathRenderer content={option.text} />
                    </span>
                  </div>
                </FlashlightCard>
              {/each}
            </div>

            <!-- Navigation Controls -->
            <div class="flex justify-between mt-8">
               <button
                 onclick={goPrev}
                 disabled={currentIdx === 0}
                 class="px-6 py-2 border border-white/20 rounded-xl hover:bg-white/5 disabled:opacity-50 transition">
                 Anterior
               </button>

               <button
                 onclick={goNext}
                 class="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-bold transition">
                 {currentIdx === questions.length - 1 ? 'Terminar' : 'Siguiente'}
               </button>
            </div>

            <!-- Question Grid -->
            <div class="mt-8 grid grid-cols-10 gap-2 border-t border-white/10 pt-4">
               {#each questions as q, idx}
                 <button
                   onclick={() => { currentIdx = idx; questionStartTime = Date.now(); }}
                   class={`w-8 h-8 flex items-center justify-center rounded text-xs font-mono
                     ${currentIdx === idx ? 'ring-2 ring-emerald-500' : ''}
                     ${answers[q.id] ? 'bg-emerald-600/30 border border-emerald-500/50' : 'bg-white/5 border border-white/10 text-gray-500'}
                   `}>
                   {idx + 1}
                 </button>
               {/each}
            </div>

          </div>
        {/if}
      </div>
    </div>

  {:else if phase === 'submitting'}
    <div class="flex flex-col items-center justify-center min-h-screen text-center px-4 w-full">
      {#if isSubmitting}
         <div class="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-6"></div>
         <h2 class="text-2xl font-bold text-white mb-2">Enviando resultados...</h2>
         <p class="text-gray-400">Verificando integridad y calculando puntaje.</p>
      {:else if submitError}
         <div class="text-red-500 mb-6">
           <svg class="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
           </svg>
         </div>
         <h2 class="text-3xl font-bold text-red-400 mb-4">Error al enviar</h2>
         <p class="text-gray-300 max-w-md mx-auto mb-8">{submitError}</p>
         <button
           onclick={doSubmit}
           class="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-bold transition mb-4 block w-full max-w-xs mx-auto">
           Intentar de nuevo
         </button>
         <button
           onclick={onExit}
           class="px-6 py-3 border border-white/20 hover:bg-white/5 rounded-xl text-white transition block w-full max-w-xs mx-auto">
           Salir sin guardar
         </button>
      {/if}
    </div>

  {:else if phase === 'result'}
    <div class="w-full flex flex-col h-screen overflow-hidden">
      <!-- Result Header -->
      <div class="shrink-0 px-4 py-8 border-b border-white/10 bg-[#121212]/95 backdrop-blur-md z-30 text-center">
         <h1 class="text-4xl font-black text-white mb-2">Resultado</h1>

         {#if submitResult?.status === 'valid'}
            <p class="text-emerald-400 font-bold text-lg">Publicado si estás sobre el promedio</p>
         {:else if submitResult?.status === 'flagged'}
            <p class="text-red-400 font-bold text-lg">Intento marcado por integridad</p>
         {:else if submitResult?.status === 'not_eligible_min_questions'}
            <p class="text-yellow-400 font-bold text-lg">No elegible (menos de 31 preguntas)</p>
         {/if}

         <div class="flex items-center justify-center gap-8 mt-6">
            <div class="text-center">
               <p class="text-sm text-gray-400 uppercase tracking-wider mb-1">Puntaje</p>
               <p class="text-5xl font-black text-emerald-400 font-mono">{submitResult?.score} <span class="text-lg text-white/40">/1000</span></p>
            </div>
            <div class="text-center">
               <p class="text-sm text-gray-400 uppercase tracking-wider mb-1">Correctas</p>
               <p class="text-3xl font-bold text-white font-mono">{submitResult?.correct} <span class="text-lg text-white/40">/ {submitResult?.answered}</span></p>
            </div>
         </div>

         <div class="flex justify-center gap-4 mt-8">
            <button
               onclick={onOpenLeaderboard}
               class="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-bold transition">
               Ver leaderboard
            </button>
            <button
               onclick={onExit}
               class="px-6 py-3 border border-white/20 hover:bg-white/5 rounded-xl text-white transition">
               Salir
            </button>
         </div>
      </div>

      <!-- Review List -->
      <div class="flex-1 overflow-y-auto px-4 sm:px-6 py-8">
         <div class="max-w-4xl mx-auto space-y-6">
            <h3 class="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Revisión de Preguntas</h3>

            {#if submitResult?.review}
               {#each submitResult.review as rev, i}
                  <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
                     <div class="flex items-start gap-4">
                        <div class="w-8 h-8 rounded bg-white/10 flex items-center justify-center font-bold text-white shrink-0">
                           {i + 1}
                        </div>
                        <div class="flex-1">
                           <!-- In a real scenario we might match rev.questionId to question.statement -->
                           <div class="text-sm text-gray-400 mb-2">Respuesta correcta: <strong class="text-emerald-400">{rev.correctLetter}</strong></div>
                           <div class="text-gray-200 mb-4 font-bold">{rev.feedback}</div>
                           <div class="bg-[#121212] p-4 rounded-xl border border-white/5 text-gray-300">
                              <MathRenderer content={rev.explanation} />
                           </div>
                        </div>
                     </div>
                  </div>
               {/each}
            {/if}
         </div>
      </div>
    </div>
  {/if}
</div>
