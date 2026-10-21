<script lang="ts">
  /**
   * NeuroTrainingSession.svelte
   * Contenedor común de los juegos de entrenamiento de NeuroGym:
   * instrucciones (es) → ronda de práctica (no puntúa) → ronda puntuada con
   * dificultad adaptativa 2-up/1-down → resumen de resultados → historial local.
   *
   * Hook de fin de sesión: `onSessionComplete(summary: NeuroSessionSummary)`.
   * Se llama una vez por ronda puntuada, después de guardar en el dispositivo.
   * El resumen solo contiene agregados (sin ensayos individuales ni datos
   * personales); quien lo reciba decide si lo comparte y con qué consentimiento.
   */
  import CorsiBlockBoard from './stimuli/CorsiBlockBoard.svelte';
  import StroopColorBoard from './stimuli/StroopColorBoard.svelte';
  import ReactionMotorPad from './stimuli/ReactionMotorPad.svelte';
  import DualNBackStimulus from './stimuli/DualNBackStimulus.svelte';
  import CardSortingStimulus from './stimuli/CardSortingStimulus.svelte';
  import TrailMakingBoard from './stimuli/TrailMakingBoard.svelte';
  import ArithmeticStimulus from './stimuli/ArithmeticStimulus.svelte';
  import VocabularyStimulus from './stimuli/VocabularyStimulus.svelte';
  import WebGPUMentalRotation from './stimuli/WebGPUMentalRotation.svelte';
  import { generateStroopTrial } from '../../lib/neurogym/secure-items-vault';
  import { getArithmeticItem } from '../../lib/neurogym/arithmetic-bank';
  import { getVocabItem, type VocabDifficulty } from '../../lib/neurogym/vocabulary-bank';
  import { neuroAudio } from '../../lib/neurogym/audio-synthesizer';
  import { stepStaircase, type StaircaseState } from '../../lib/neurogym/adaptive-staircase';
  import {
    SKILL_LABELS,
    blockPassed,
    cardSortSwitchAfter,
    corsiSpanForLevel,
    getTrainingGame,
    rotationTargetFor,
    scoreCardSort,
    scoreNBack,
    scoreTrail,
    scoreTrials,
    stroopSeedFor,
    type NBackBlockResult,
    type SessionScore,
    type TrainingGameId,
    type TrialOutcome
  } from '../../lib/neurogym/training-catalog';
  import {
    buildSessionRecord,
    getGameLevel,
    loadLevels,
    loadTrainingHistory,
    saveGameLevel,
    saveTrainingSession,
    toSessionSummary,
    type NeuroSessionSummary,
    type TrainingSessionRecord
  } from '../../lib/neurogym/training-history';

  interface Props {
    gameId: TrainingGameId;
    onSessionComplete?: (summary: NeuroSessionSummary) => void;
    onExit?: () => void;
    /** Texto del botón de salida en la pantalla de resultados. */
    exitLabel?: string;
  }

  let { gameId, onSessionComplete, onExit, exitLabel = 'Volver al catálogo' }: Props = $props();

  type Phase = 'intro' | 'practice' | 'scored' | 'results';
  const TRAIL_NODES = 10;
  const PRACTICE_NBACK_TRIALS = 10;
  const SCORED_NBACK_TRIALS = 20;
  const PRACTICE_CARDSORT_TRIALS = 6;
  const SCORED_CARDSORT_TRIALS = 15;

  const def = $derived(getTrainingGame(gameId));

  let phase = $state<Phase>('intro');
  let staircase = $state<StaircaseState>({ level: 1, correctStreak: 0 });
  let startLevel = $state(1);
  let trialIndex = $state(0);
  let trialKey = $state(0);
  let outcomes = $state<TrialOutcome[]>([]);
  let feedback = $state<'correct' | 'incorrect' | null>(null);
  let sessionSeed = $state(1);
  let trialStartedAt = 0;
  let deadlineTimer: ReturnType<typeof setTimeout> | null = null;
  let advanceTimer: ReturnType<typeof setTimeout> | null = null;
  let resolved = false;

  let history = $state<TrainingSessionRecord[]>([]);
  let lastRecord = $state<TrainingSessionRecord | null>(null);
  let previousRecord = $state<TrainingSessionRecord | null>(null);
  let lastScore = $state<SessionScore | null>(null);

  const gameHistory = $derived(history.filter((r) => r.gameId === gameId));
  const hasPlayedBefore = $derived(gameHistory.length > 0);
  const isPractice = $derived(phase === 'practice');
  /** En práctica se usa el nivel mínimo para aprender la mecánica sin presión. */
  const currentLevel = $derived(isPractice ? def.bounds.minLevel : staircase.level);
  const totalTrials = $derived(isPractice ? def.practiceTrials : def.scoredTrials);

  function refresh() {
    history = loadTrainingHistory();
    staircase = getGameLevel(gameId, loadLevels());
  }

  $effect(() => {
    void gameId;
    refresh();
    phase = 'intro';
    return clearTimers;
  });

  function clearTimers() {
    if (deadlineTimer) clearTimeout(deadlineTimer);
    if (advanceTimer) clearTimeout(advanceTimer);
    deadlineTimer = null;
    advanceTimer = null;
  }

  function begin(withPractice: boolean) {
    clearTimers();
    refresh();
    startLevel = staircase.level;
    sessionSeed = Math.floor(Date.now() / 1000) % 100000;
    outcomes = [];
    lastScore = null;
    lastRecord = null;
    if (withPractice) {
      phase = 'practice';
    } else {
      phase = 'scored';
    }
    startTrial(0);
  }

  function startTrial(index: number) {
    trialIndex = index;
    trialKey++;
    feedback = null;
    resolved = false;
    trialStartedAt = performance.now();
    if (deadlineTimer) clearTimeout(deadlineTimer);
    deadlineTimer = null;
    // El panel de reacción gestiona su propia ventana de respuesta.
    if (def.mode !== 'trials' || gameId === 'reaction') return;
    const limit = trialDeadline();
    if (limit) {
      deadlineTimer = setTimeout(() => resolveTrial(false, null), limit);
    }
  }

  function trialDeadline(): number | null {
    if (gameId === 'arithmetic') return arithmeticItem?.timePressureMs ?? def.deadlineMs(currentLevel);
    return def.deadlineMs(currentLevel);
  }

  /** Registra un ensayo (modo trials) y avanza. */
  function resolveTrial(correct: boolean, rtMs: number | null) {
    if (resolved || (phase !== 'practice' && phase !== 'scored')) return;
    resolved = true;
    if (deadlineTimer) clearTimeout(deadlineTimer);
    feedback = correct ? 'correct' : 'incorrect';
    if (gameId !== 'corsi' && gameId !== 'rotation') {
      if (correct) neuroAudio.playSuccess();
      else neuroAudio.playError();
    }

    if (phase === 'scored') {
      outcomes = [...outcomes, { correct, rtMs, level: staircase.level, deadlineMs: trialDeadline() }];
      staircase = stepStaircase(staircase, correct, def.bounds);
    }

    advanceTimer = setTimeout(() => {
      const next = trialIndex + 1;
      if (next < totalTrials) {
        startTrial(next);
      } else if (phase === 'practice') {
        phase = 'scored';
        outcomes = [];
        startTrial(0);
      } else {
        finish(scoreTrials(outcomes), staircase);
      }
    }, 700);
  }

  /** Cierra un bloque completo (modo block). */
  function resolveBlock(score: SessionScore) {
    if (phase === 'practice') {
      feedback = blockPassed(score) ? 'correct' : 'incorrect';
      advanceTimer = setTimeout(() => {
        phase = 'scored';
        startTrial(0);
      }, 1200);
      return;
    }
    if (phase !== 'scored') return;
    finish(score, stepStaircase(staircase, blockPassed(score), def.bounds));
  }

  function finish(score: SessionScore, endState: StaircaseState) {
    clearTimers();
    staircase = endState;
    saveGameLevel(gameId, endState);
    previousRecord = gameHistory[0] ?? null;
    const record = buildSessionRecord(gameId, score, startLevel, endState.level, Date.now());
    history = saveTrainingSession(record);
    lastRecord = record;
    lastScore = score;
    phase = 'results';
    try {
      onSessionComplete?.(toSessionSummary(record));
    } catch {
      // un consumidor externo nunca debe romper el juego
    }
  }

  // --- Estímulos derivados por ensayo -------------------------------------
  const stroopItem = $derived(
    gameId === 'stroop' ? generateStroopTrial(stroopSeedFor(trialIndex + trialKey, currentLevel, sessionSeed)) : null
  );
  const arithmeticItem = $derived(
    gameId === 'arithmetic'
      ? getArithmeticItem(sessionSeed + trialKey * 13, currentLevel as 1 | 2 | 3 | 4 | 5)
      : null
  );
  const vocabItem = $derived(
    gameId === 'vocabulary' ? getVocabItem(sessionSeed + trialKey * 17, currentLevel as VocabDifficulty) : null
  );

  function onStroop(key: string) {
    if (!stroopItem) return;
    resolveTrial(key === stroopItem.correctColorKey, Math.round(performance.now() - trialStartedAt));
  }

  function onNBack(stats: NBackBlockResult) {
    resolveBlock(
      scoreNBack({
        nLevel: stats.nLevel,
        accuracy: stats.accuracy,
        combinedF1: stats.combinedF1,
        totalOpportunities: stats.totalOpportunities
      })
    );
  }

  function formatMs(ms: number | null): string {
    if (ms === null) return '—';
    return ms >= 1000 ? `${(ms / 1000).toFixed(1)} s` : `${ms} ms`;
  }

  const levelChange = $derived(lastRecord ? lastRecord.endLevel - lastRecord.startLevel : 0);
</script>

<section
  class="p-5 sm:p-6 bg-black/60 border border-white/15 rounded-3xl space-y-5 shadow-xl"
  aria-labelledby="ng-session-title-{gameId}"
>
  <header class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
    <div class="flex items-center gap-3">
      <span class="text-2xl" aria-hidden="true">{def.icon}</span>
      <div>
        <h3 id="ng-session-title-{gameId}" class="text-sm font-bold uppercase tracking-wider text-white">{def.name}</h3>
        <p class="text-[10px] text-white/50">Habilidad: {SKILL_LABELS[def.skill]}</p>
      </div>
    </div>
    <div class="flex items-center gap-2 text-[10px] font-mono">
      <span class="px-2 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
        Nivel {currentLevel}/{def.bounds.maxLevel}
      </span>
      {#if phase === 'practice'}
        <span class="px-2 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300">Práctica</span>
      {:else if phase === 'scored'}
        <span class="px-2 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">Puntuada</span>
      {/if}
      {#if (phase === 'practice' || phase === 'scored') && def.mode === 'trials'}
        <span class="px-2 py-1 rounded-lg bg-white/5 border border-white/15 text-white/70">
          {trialIndex + 1}/{totalTrials}
        </span>
      {/if}
    </div>
  </header>

  {#if phase === 'intro'}
    <div class="space-y-4">
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Cómo se juega</h4>
        <ol class="list-decimal list-inside space-y-1 text-sm text-white/80">
          {#each def.instructions as line}
            <li>{line}</li>
          {/each}
        </ol>
      </div>
      <p class="text-xs text-white/60"><strong class="text-white/80">Controles:</strong> {def.controls}</p>
      <p class="text-xs text-white/60">
        <strong class="text-white/80">Tu nivel actual:</strong> {staircase.level} — {def.levelHint(staircase.level)}
        La dificultad sube tras 2 aciertos seguidos y baja con 1 error.
      </p>
      <p class="text-xs text-white/50">
        Primero harás {def.mode === 'trials' ? `${def.practiceTrials} ${def.practiceTrials === 1 ? 'ensayo' : 'ensayos'} de práctica` : 'un bloque corto de práctica'} que no cuenta para tu puntaje.
      </p>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          onclick={() => begin(true)}
          class="py-3 px-6 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider text-xs rounded-xl cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          ▶ Empezar con práctica
        </button>
        {#if hasPlayedBefore}
          <button
            type="button"
            onclick={() => begin(false)}
            class="py-3 px-6 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold uppercase tracking-wider text-xs rounded-xl cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Saltar práctica
          </button>
        {/if}
        {#if onExit}
          <button
            type="button"
            onclick={onExit}
            class="py-3 px-4 text-white/60 hover:text-white text-xs underline cursor-pointer"
          >
            Volver
          </button>
        {/if}
      </div>
    </div>
  {:else if phase === 'practice' || phase === 'scored'}
    <div class="space-y-3">
      {#if phase === 'practice'}
        <p class="text-[11px] text-amber-300/90 text-center">Ronda de práctica: no cuenta para tu puntaje.</p>
      {/if}

      {#key `${phase}-${trialKey}`}
        {#if gameId === 'stroop' && stroopItem}
          <StroopColorBoard trial={stroopItem} onAnswer={onStroop} disabled={feedback !== null} />
        {:else if gameId === 'reaction'}
          <ReactionMotorPad
            maxResponseMs={def.deadlineMs(currentLevel)}
            onCompleteTrial={(ms, ok) => resolveTrial(ok, ok ? ms : null)}
          />
        {:else if gameId === 'corsi'}
          <CorsiBlockBoard
            spanLength={corsiSpanForLevel(currentLevel)}
            seed={sessionSeed + trialKey}
            allowReplay={false}
            onComplete={(ok) => resolveTrial(ok, null)}
          />
        {:else if gameId === 'arithmetic' && arithmeticItem}
          <ArithmeticStimulus
            item={arithmeticItem}
            onAnswer={(idx, ms) => resolveTrial(idx === arithmeticItem?.correctIndex, ms)}
          />
        {:else if gameId === 'vocabulary' && vocabItem}
          <VocabularyStimulus
            item={vocabItem}
            onSelectOption={(_idx, ok) => resolveTrial(ok, Math.round(performance.now() - trialStartedAt))}
          />
        {:else if gameId === 'rotation'}
          <WebGPUMentalRotation
            targetAngle={rotationTargetFor(trialIndex, currentLevel)}
            onComplete={(ok, ms) => resolveTrial(ok, ms)}
          />
        {:else if gameId === 'nback'}
          <DualNBackStimulus
            embedded
            nLevel={currentLevel}
            totalTrials={phase === 'practice' ? PRACTICE_NBACK_TRIALS : SCORED_NBACK_TRIALS}
            onComplete={onNBack}
          />
        {:else if gameId === 'cardsort'}
          <CardSortingStimulus
            totalTrials={phase === 'practice' ? PRACTICE_CARDSORT_TRIALS : SCORED_CARDSORT_TRIALS}
            switchAfter={cardSortSwitchAfter(currentLevel)}
            onComplete={(s) =>
              resolveBlock(
                scoreCardSort(
                  {
                    correctTrials: s.correctTrials,
                    totalTrials: s.totalRuleTrials,
                    ruleSwitches: s.ruleSwitchesSuccess,
                    perseverativeErrors: s.perseverativeErrors
                  },
                  currentLevel
                )
              )}
          />
        {:else if gameId === 'trail'}
          <TrailMakingBoard
            part={currentLevel >= 2 ? 'B' : 'A'}
            onComplete={(ms, errors) => resolveBlock(scoreTrail({ totalTimeMs: ms, errors, nodes: TRAIL_NODES }, currentLevel))}
          />
        {/if}
      {/key}

      <p class="text-center text-sm font-bold min-h-6" aria-live="polite">
        {#if feedback === 'correct'}
          <span class="text-emerald-400">✓ {def.mode === 'block' ? '¡Bloque de práctica superado!' : '¡Correcto!'}</span>
        {:else if feedback === 'incorrect'}
          <span class="text-rose-400">
            ✗ {def.mode === 'block' ? 'Práctica terminada: ahora va la ronda puntuada.' : 'Incorrecto o fuera de tiempo'}
          </span>
        {/if}
      </p>
    </div>
  {:else if phase === 'results' && lastRecord && lastScore}
    <div class="space-y-4">
      <h4 class="text-lg font-black text-white text-center">Resultados de la sesión</h4>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div class="p-3 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[10px] uppercase text-white/50 font-mono block">Precisión</span>
          <span class="text-xl font-black text-emerald-400">{Math.round(lastScore.accuracy * 100)}%</span>
          <span class="text-[10px] text-white/40 block">{lastScore.correct}/{lastScore.total}</span>
        </div>
        <div class="p-3 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[10px] uppercase text-white/50 font-mono block">Puntos</span>
          <span class="text-xl font-black text-amber-300">{lastScore.points}</span>
        </div>
        <div class="p-3 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[10px] uppercase text-white/50 font-mono block">{gameId === 'trail' ? 'Tiempo/nodo' : 'Tiempo medio'}</span>
          <span class="text-xl font-black text-cyan-300">{formatMs(lastScore.meanRtMs)}</span>
        </div>
        <div class="p-3 bg-white/5 border border-white/10 rounded-xl">
          <span class="text-[10px] uppercase text-white/50 font-mono block">Nivel</span>
          <span class="text-xl font-black text-white">{lastRecord.startLevel} → {lastRecord.endLevel}</span>
          <span class="text-[10px] block {levelChange > 0 ? 'text-emerald-400' : levelChange < 0 ? 'text-rose-300' : 'text-white/40'}">
            {levelChange > 0 ? 'Subes de nivel' : levelChange < 0 ? 'Bajas un nivel para consolidar' : 'Mantienes el nivel'}
          </span>
        </div>
      </div>

      {#if previousRecord}
        <p class="text-xs text-white/60 text-center">
          Sesión anterior ({previousRecord.dateStr}): {Math.round(previousRecord.accuracy * 100)}% de precisión,
          índice {previousRecord.index} → hoy índice {lastRecord.index}.
        </p>
      {:else}
        <p class="text-xs text-white/60 text-center">Primera sesión registrada: será tu línea base.</p>
      {/if}

      <div>
        <h5 class="text-[10px] uppercase tracking-wider text-white/50 font-bold mb-2">Historial reciente (en este dispositivo)</h5>
        <ul class="space-y-1">
          {#each gameHistory.slice(0, 5) as r (r.id)}
            <li class="flex items-center justify-between text-xs px-3 py-2 bg-white/5 border border-white/10 rounded-lg">
              <span class="text-white/70 font-mono">{r.dateStr}</span>
              <span class="text-white/80">{Math.round(r.accuracy * 100)}% · nivel {r.endLevel} · {r.points} pts</span>
            </li>
          {/each}
        </ul>
      </div>

      <div class="flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          onclick={() => begin(false)}
          class="py-2.5 px-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-xs rounded-xl cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Jugar otra vez
        </button>
        {#if onExit}
          <button
            type="button"
            onclick={onExit}
            class="py-2.5 px-5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-wider text-xs rounded-xl cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {exitLabel}
          </button>
        {/if}
      </div>
    </div>
  {/if}
</section>
