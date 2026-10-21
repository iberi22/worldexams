<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import FlashlightCard from './FlashlightCard.svelte';
  import PartyScoreboard from '../modules/exam-room/components/PartyScoreboard.svelte';
  import PartyPodium from '../modules/exam-room/components/PartyPodium.svelte';
  import {
    PartyPlayerSession,
    type PlayerState,
    type SavedPlayerSession,
  } from '../modules/exam-room/party/playerSession';
  import { createDefaultPartyTransport } from '../modules/exam-room/party/transport';
  import { isValidRoomCode, normalizeRoomCode, PartyError } from '../modules/exam-room/party/protocol';

  /**
   * Cliente del estudiante en /party: un único jugador por pestaña.
   * La configuración de la sala llega del host al unirse (nunca es local).
   */
  interface Props {
    partyCode?: string;
    resume?: SavedPlayerSession | null;
    onExit: () => void;
  }

  let { partyCode = '', resume = null, onExit }: Props = $props();

  let code = $state('');
  let nickname = $state('');
  let joining = $state(false);
  let player = $state<PlayerState | null>(null);
  let now = $state(Date.now());
  let session: PartyPlayerSession | null = null;
  let ticker: ReturnType<typeof setInterval> | null = null;

  let secondsLeft = $derived(player?.deadline ? Math.max(0, Math.ceil((player.deadline - now) / 1000)) : 0);
  let codeIsValid = $derived(isValidRoomCode(normalizeRoomCode(code)));

  function newSession(): PartyPlayerSession {
    session?.dispose();
    const s = new PartyPlayerSession({ transport: createDefaultPartyTransport('player'), storage: sessionStorage });
    s.subscribe((state) => (player = state));
    session = s;
    return s;
  }

  async function join(roomCode: string, name: string, playerId?: string) {
    joining = true;
    try {
      await newSession().join(roomCode, name, playerId);
    } catch (err) {
      if (!(err instanceof PartyError)) console.error('[Party] Error al unirse:', err);
    } finally {
      joining = false;
    }
  }

  onMount(() => {
    code = normalizeRoomCode(partyCode || resume?.room || '');
    nickname = resume?.nickname ?? '';
    ticker = setInterval(() => (now = Date.now()), 250);
    // Recarga dentro de la misma sala: reconectar con la misma identidad.
    if (resume && (!partyCode || normalizeRoomCode(partyCode) === resume.room)) {
      void join(resume.room, resume.nickname, resume.playerId);
    }
  });

  onDestroy(() => {
    if (ticker) clearInterval(ticker);
    session?.dispose();
  });

  function submitJoin() {
    if (!codeIsValid || !nickname.trim() || joining) return;
    void join(code, nickname);
  }

  function retry() {
    player = null;
  }

  function leave() {
    session?.leave();
    session = null;
    player = null;
    onExit();
  }

  function optionClass(optionId: string): string {
    if (!player) return '';
    const correct = player.reveal?.correctOptionId;
    if (player.phase === 'reveal' && correct) {
      if (optionId === correct) return 'bg-emerald-500/30 border-emerald-400';
      if (optionId === player.selected) return 'bg-red-500/20 border-red-400';
      return 'bg-white/5 border-white/10 opacity-50';
    }
    if (player.selected === optionId) return 'bg-emerald-500 text-white border-emerald-500';
    if (player.selected) return 'bg-white/5 border-white/10 opacity-50';
    return 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20';
  }
</script>

<div class="w-full max-w-lg mx-auto" data-testid="party-player">
  {#if !player || player.status === 'idle' || (player.status === 'joining' && !player.config)}
    <div class="animate-fade-in-up">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-2">
          PARTY MODE
        </h1>
        <p class="text-sm uppercase tracking-widest opacity-60">Únete y compite</p>
      </div>

      <FlashlightCard className="p-8 text-left">
        <label class="block text-xs uppercase tracking-widest opacity-60 mb-2" for="party-code">Código de la sala</label>
        <input
          id="party-code"
          type="text"
          value={code}
          oninput={(e) => (code = normalizeRoomCode((e.currentTarget as HTMLInputElement).value))}
          placeholder="Ej: K7PX2M"
          autocomplete="off"
          class="w-full px-4 py-4 bg-black/50 border border-white/10 rounded-lg text-white font-mono text-xl text-center uppercase tracking-widest mb-5 focus:outline-none focus:border-emerald-500"
          maxlength="6"
          data-testid="player-code"
        />
        <label class="block text-xs uppercase tracking-widest opacity-60 mb-2" for="party-nickname">Tu apodo</label>
        <input
          id="party-nickname"
          type="text"
          bind:value={nickname}
          placeholder="Ej: Juli"
          maxlength="20"
          onkeydown={(e) => e.key === 'Enter' && submitJoin()}
          class="w-full px-4 py-4 bg-black/50 border border-white/10 rounded-lg text-white mb-6 focus:outline-none focus:border-emerald-500"
          data-testid="player-nickname"
        />
        <button
          type="button"
          onclick={submitJoin}
          disabled={!codeIsValid || !nickname.trim() || joining}
          class="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold uppercase tracking-widest rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="player-join"
        >
          {joining ? 'Buscando la sala…' : 'Entrar'}
        </button>
        <button type="button" onclick={onExit} class="w-full py-2 mt-2 text-sm opacity-60 hover:opacity-100">← Volver</button>
      </FlashlightCard>
    </div>
  {:else if player.status === 'error' && player.error}
    <FlashlightCard className="p-8 text-center">
      <div class="text-5xl mb-4">⚠️</div>
      <p class="text-red-200 mb-6" role="alert" data-testid="player-error">{player.error.message}</p>
      {#if player.error.code === 'host_left' && player.config}
        <p class="text-xs opacity-60 mb-4">Si el docente vuelve a abrir la sala, te reconectaremos automáticamente.</p>
      {/if}
      <div class="flex justify-center gap-3">
        <button type="button" onclick={retry} class="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 font-bold" data-testid="player-retry">
          Intentar de nuevo
        </button>
        <button type="button" onclick={leave} class="px-6 py-3 rounded-lg border border-white/20">Salir</button>
      </div>
    </FlashlightCard>
  {:else if player.config}
    {@const config = player.config}
    <header class="flex items-center justify-between text-xs uppercase tracking-widest opacity-70 mb-6">
      <span data-testid="player-room-info">{config.asignaturaLabel} · Grado {config.grado} · Sala {config.code}</span>
      <span class="font-mono" data-testid="player-score">{player.me?.score ?? 0} pts</span>
    </header>

    {#if player.phase === 'lobby'}
      <div class="text-center">
        <h2 class="text-3xl font-bold text-emerald-400 mb-2" data-testid="player-welcome">¡Hola, {player.nickname}!</h2>
        <p class="text-sm opacity-70 mb-8">
          {config.hostName} va a empezar pronto: {config.totalQuestions} preguntas de {config.secondsPerQuestion} segundos.
        </p>
        <div class="inline-block w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-8"></div>
        <FlashlightCard className="p-6">
          <p class="text-sm opacity-70 mb-3">{player.players.filter((p) => p.online).length} en la sala</p>
          <ul class="flex flex-wrap justify-center gap-2" data-testid="player-lobby-list">
            {#each player.players as p (p.id)}
              <li class="px-3 py-1 rounded-full text-sm border {p.id === player.playerId ? 'border-emerald-500' : 'border-white/10'} {p.online ? '' : 'opacity-40'}">
                {p.nickname}
              </li>
            {/each}
          </ul>
        </FlashlightCard>
      </div>
    {:else if (player.phase === 'question' || player.phase === 'reveal') && player.question}
      <div class="space-y-5">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-bold text-emerald-400 uppercase tracking-widest" data-testid="player-question-index">
            Pregunta {player.question.index + 1} de {player.question.total}
          </h2>
          {#if player.phase === 'question'}
            <span class="text-2xl font-mono font-black text-amber-300" data-testid="player-countdown">{secondsLeft}</span>
          {/if}
        </div>
        <FlashlightCard className="p-6">
          {#if player.question.question.context}
            <p class="text-sm opacity-70 mb-3">{player.question.question.context}</p>
          {/if}
          <p class="text-lg leading-relaxed" data-testid="player-question-text">{player.question.question.text}</p>
        </FlashlightCard>
        <div class="space-y-3">
          {#each player.question.question.options as option (option.id)}
            <button
              type="button"
              onclick={() => session?.answer(option.id)}
              disabled={player.phase !== 'question' || player.selected !== null || secondsLeft === 0}
              class="w-full p-4 rounded-lg text-left font-medium border transition-all {optionClass(option.id)}"
              data-testid="player-option-{option.id}"
            >
              <strong class="text-emerald-400">{option.id})</strong> {option.text}
            </button>
          {/each}
        </div>

        {#if player.phase === 'question' && player.selected}
          <p class="text-center text-sm uppercase tracking-widest opacity-60" data-testid="player-answer-sent">
            Respuesta enviada ✓ ({player.answeredCount} de {player.expectedCount})
          </p>
        {/if}

        {#if player.phase === 'reveal'}
          <div class="text-center" data-testid="player-reveal">
            {#if player.lastResult?.correct}
              <p class="text-2xl font-bold text-emerald-300">¡Correcto! +{player.lastResult.gained}</p>
            {:else if player.selected}
              <p class="text-2xl font-bold text-red-300">Incorrecto</p>
            {:else}
              <p class="text-2xl font-bold text-amber-300">Se acabó el tiempo</p>
            {/if}
            {#if player.me}
              <p class="text-sm opacity-70 mt-1">Vas en el puesto {player.me.rank}</p>
            {/if}
          </div>
          <PartyScoreboard entries={player.scoreboard} highlightId={player.playerId} limit={5} />
        {/if}
      </div>
    {:else if player.phase === 'finished'}
      <PartyPodium entries={player.scoreboard} highlightId={player.playerId} />
      <div class="mt-8 text-center">
        <button type="button" onclick={leave} class="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 font-bold" data-testid="player-exit">
          Salir
        </button>
      </div>
    {:else}
      <p class="text-center text-sm opacity-70 mb-6">Esperando la siguiente pregunta…</p>
      <PartyScoreboard entries={player.scoreboard} highlightId={player.playerId} limit={5} />
    {/if}
  {/if}
</div>
