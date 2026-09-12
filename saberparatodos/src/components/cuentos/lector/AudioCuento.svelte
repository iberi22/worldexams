<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. -->
<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import {
    speak,
    stop as stopSpeech,
    pause as pauseSpeech,
    resume as resumeSpeech,
    isPaused as isSpeechPaused,
    isSpeechSynthesisSupported
  } from './read-aloud';
  import {
    splitWords,
    computeTimings,
    estimateDuration,
    highlightIndexAt,
    charRangeForWord,
    DEFAULT_NARRATION_RATE,
    type CharRange
  } from '../../../lib/cuentos/audio-timings';

  export interface PaginaNarrable {
    n: number;
    texto: string;
    audio?: string | null;
    timings?: readonly number[] | null;
  }

  export interface Props {
    slug: string;
    pagina: PaginaNarrable;
    onHighlight?: (range: CharRange | null) => void;
    onEnd?: () => void;
    className?: string;
  }

  let { slug, pagina, onHighlight, onEnd, className = '' }: Props = $props();

  type Mode = 'mp3' | 'voz';
  type PlayState = 'idle' | 'playing' | 'paused';

  // Modo por página: MP3 presente -> <audio> + timings; ausente -> Web Speech.
  let mode = $state<Mode>(pagina?.audio ? 'mp3' : 'voz');
  let playState = $state<PlayState>('idle');
  let rate = $state<number>(DEFAULT_NARRATION_RATE);
  let audioEl = $state<HTMLAudioElement | null>(null);
  let rootEl = $state<HTMLDivElement | null>(null);

  // Marcador de hidratación (solo corre en cliente): los e2e esperan
  // `.audio-cuento[data-hydrated="true"]` antes de clickear, porque el SSR
  // es visible antes de que Svelte hidrate los handlers.

  const texto = $derived(pagina?.texto || '');
  const words = $derived(splitWords(texto));
  // Timings del pack cuando son 1:1; si no, se derivan en vivo (nunca se rompe).
  const timings = $derived(
    pagina?.timings && pagina.timings.length === words.length
      ? pagina.timings
      : computeTimings(words, estimateDuration(words))
  );

  const statusCopy = $derived(
    playState === 'playing' ? 'Narrando…' : playState === 'paused' ? 'Pausado' : 'Toca para escuchar'
  );

  function emitHighlight(range: CharRange | null) {
    if (onHighlight) onHighlight(range);
  }

  function finishNaturally() {
    playState = 'idle';
    emitHighlight(null);
    if (onEnd) onEnd();
  }

  function stopAll() {
    try {
      audioEl?.pause();
    } catch {
      // Limpieza best-effort
    }
    stopSpeech();
    playState = 'idle';
    emitHighlight(null);
  }

  onDestroy(() => {
    stopAll();
  });

  onMount(() => {
    if (rootEl) rootEl.dataset.hydrated = 'true';
  });

  // NOTA: sin $effect de reset aquí. El padre remonta con {#key} al cambiar
  // de página o entrar al quiz; onDestroy detiene audio/voz. Un $effect que
  // lea `pagina` se re-dispararía con cada render paterno (nuevo objeto
  // literal) y pausaría la narración en curso (bug verificado en e2e).

  function currentWordRange(): CharRange | null {
    if (!audioEl || words.length === 0) return null;
    const idx = highlightIndexAt(timings, audioEl.currentTime || 0);
    return charRangeForWord(texto, idx);
  }

  function handleTimeUpdate() {
    if (playState !== 'playing') return;
    emitHighlight(currentWordRange());
  }

  function handleAudioEnded() {
    finishNaturally();
  }

  function handleAudioError() {
    // MP3 ausente o ilegible en runtime -> fallback Web Speech sin romper.
    if (mode === 'mp3') {
      mode = 'voz';
      playState = 'idle';
      emitHighlight(null);
      startVoz();
    }
  }

  function startMp3(fromStart: boolean) {
    if (!audioEl || typeof window === 'undefined') {
      mode = 'voz';
      startVoz();
      return;
    }
    try {
      if (fromStart) audioEl.currentTime = 0;
      audioEl.playbackRate = rate;
      const p = audioEl.play();
      if (p && typeof (p as Promise<void>).catch === 'function') {
        (p as Promise<void>).catch(() => {
          // Autoplay bloqueado o audio ilegible -> fallback voz.
          mode = 'voz';
          playState = 'idle';
          startVoz();
        });
      }
      playState = 'playing';
      emitHighlight(currentWordRange());
    } catch {
      mode = 'voz';
      playState = 'idle';
      startVoz();
    }
  }

  function startVoz() {
    mode = 'voz';
    if (!isSpeechSynthesisSupported()) {
      playState = 'idle';
      return;
    }
    const utter = speak(texto, {
      rate,
      onStart: () => {
        playState = 'playing';
      },
      onEnd: () => {
        finishNaturally();
      },
      onError: () => {
        playState = 'idle';
        emitHighlight(null);
      },
      onBoundary: (charIndex, charLength) => {
        if (playState === 'playing') emitHighlight({ start: charIndex, length: charLength });
      }
    });
    if (!utter) {
      playState = 'idle';
      emitHighlight(null);
    }
  }

  function togglePlay() {
    if (playState === 'playing') {
      try {
        audioEl?.pause();
      } catch {
        // best-effort
      }
      pauseSpeech();
      playState = 'paused';
      return;
    }
    if (playState === 'paused' && mode === 'mp3' && audioEl) {
      try {
        audioEl.playbackRate = rate;
        const p = audioEl.play();
        if (p && typeof (p as Promise<void>).catch === 'function') {
          (p as Promise<void>).catch(() => startVoz());
        }
        playState = 'playing';
        return;
      } catch {
        startVoz();
        return;
      }
    }
    if (playState === 'paused' && mode === 'voz' && typeof window !== 'undefined') {
      if (isSpeechPaused()) {
        resumeSpeech();
        playState = 'playing';
        return;
      }
    }
    if (mode === 'mp3' && pagina?.audio) startMp3(false);
    else startVoz();
  }

  function replay() {
    if (mode === 'mp3' && pagina?.audio) startMp3(true);
    else {
      stopSpeech();
      startVoz();
    }
  }

  function cycleRate() {
    const order = [0.8, 0.9, 1.0];
    const idx = order.indexOf(rate);
    rate = order[(idx + 1) % order.length];
    if (audioEl) {
      try {
        audioEl.playbackRate = rate;
      } catch {
        // best-effort
      }
    }
    // En modo voz el nuevo rate aplica al reiniciar; si está narrando, se reinicia.
    if (mode === 'voz' && playState === 'playing') {
      stopSpeech();
      startVoz();
    }
  }
</script>

<div bind:this={rootEl} class="audio-cuento {className}" role="group" aria-label="Narración de la página">
  {#if mode === 'mp3' && pagina?.audio}
    <!-- svelte-ignore media_has_caption -->
    <audio
      bind:this={audioEl}
      src={pagina.audio}
      preload="metadata"
      ontimeupdate={handleTimeUpdate}
      onended={handleAudioEnded}
      onerror={handleAudioError}
    ></audio>
  {/if}

  <button
    type="button"
    class="read-aloud-btn {playState === 'playing' ? 'narrating' : ''}"
    onclick={togglePlay}
    aria-label={playState === 'playing' ? 'Pausar lectura en voz alta' : 'Escuchar lectura en voz alta'}
  >
    <span class="btn-icon">{playState === 'playing' ? '🔊' : '🔈'}</span>
    <span class="btn-label">{playState === 'playing' ? 'Leyendo...' : 'Escuchar'}</span>
  </button>

  <button
    type="button"
    class="player-mini-btn"
    onclick={replay}
    aria-label="Repetir narración"
    title="Repetir"
  >
    ↻
  </button>

  <button
    type="button"
    class="player-mini-btn"
    onclick={cycleRate}
    aria-label={`Velocidad de narración ${rate}x, toca para cambiar`}
    title="Velocidad"
  >
    {rate.toFixed(1)}x
  </button>

  <span class="player-status" aria-live="polite">{statusCopy}</span>
</div>

<style>
  .audio-cuento {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .read-aloud-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 48px;
    padding: 0.5rem 1rem;
    background-color: #D4A94E;
    color: #121832;
    border: 2px solid #FFF9DC;
    border-radius: 1.5rem;
    font-weight: 800;
    font-size: 0.95rem;
    cursor: pointer;
    box-shadow: 0 4px 0 #8C6A23;
    transition: transform 0.15s ease, background-color 0.2s ease;
  }

  .read-aloud-btn:hover {
    transform: translateY(-2px);
    background-color: #e5ba5e;
  }

  .read-aloud-btn.narrating {
    background-color: #FF9F43;
    color: #FFFFFF;
    box-shadow: 0 4px 0 #3A2E2A;
  }

  .player-mini-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    min-width: 48px;
    padding: 0.4rem 0.6rem;
    background-color: rgba(255, 249, 220, 0.12);
    color: #FFF9DC;
    border: 1.5px solid rgba(212, 169, 78, 0.5);
    border-radius: 1rem;
    font-weight: 800;
    font-size: 0.9rem;
    cursor: pointer;
    transition: transform 0.15s ease, background-color 0.2s ease;
  }

  .player-mini-btn:hover {
    transform: translateY(-2px);
    background-color: rgba(255, 249, 220, 0.22);
  }

  .player-status {
    font-size: 0.8rem;
    font-weight: 600;
    color: rgba(255, 249, 220, 0.75);
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    .read-aloud-btn, .player-mini-btn {
      transition: none !important;
      transform: none !important;
    }
  }
</style>
