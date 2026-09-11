<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. -->
<script lang="ts">
  import './tokens.css';
  import type { Hotspot } from './EscenaSVG.svelte';

  export interface EscenaCapas {
    fondo: string;
    medio: string;
    frente: string;
  }

  export interface Props {
    fondo?: string;
    medio?: string;
    frente?: string;
    escenaCapas?: EscenaCapas;
    hotspots?: Hotspot[];
    tituloAccesible?: string;
    descripcionAccesible?: string;
    className?: string;
    onHotspotTrigger?: (hotspot: Hotspot) => void;
    onTapReaction?: () => void;
  }

  let {
    fondo = '',
    medio = '',
    frente = '',
    escenaCapas,
    hotspots = [],
    tituloAccesible = 'Escena parallax 2.5D',
    descripcionAccesible = '',
    className = '',
    onHotspotTrigger,
    onTapReaction
  }: Props = $props();

  let containerEl = $state<HTMLDivElement | null>(null);
  let isBouncing = $state(false);
  let isReducedMotion = $state(false);

  // Motion positions (lerped)
  let currX = $state(0);
  let currY = $state(0);
  let targetX = 0;
  let targetY = 0;

  // Derived plane html contents
  const rawFondo = $derived(escenaCapas?.fondo || fondo);
  const rawMedio = $derived(escenaCapas?.medio || medio);
  const rawFrente = $derived(escenaCapas?.frente || frente);

  // Derived depth offsets (Transform-only 60fps parallax)
  const fondoTransform = $derived(
    isReducedMotion ? 'none' : `translate3d(${(currX * -4).toFixed(2)}px, ${(currY * -4).toFixed(2)}px, 0px)`
  );
  const medioTransform = $derived(
    isReducedMotion ? 'none' : `translate3d(${(currX * 8).toFixed(2)}px, ${(currY * 8).toFixed(2)}px, 0px)`
  );
  const frenteTransform = $derived(
    isReducedMotion ? 'none' : `translate3d(${(currX * 16).toFixed(2)}px, ${(currY * 16).toFixed(2)}px, 0px)`
  );

  /**
   * Generates a WebAudio blip sound with zero audio files or external network requests.
   * Suppressed under prefers-reduced-motion: reduce.
   */
  function playWebAudioBlip(frequency = 659.25) {
    if (typeof window === 'undefined') return;
    if (isReducedMotion) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.4, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Ignore if WebAudio context is restricted
    }
  }

  function handlePointerMove(e: PointerEvent) {
    if (isReducedMotion || !containerEl) return;
    const rect = containerEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    targetX = Math.max(-1, Math.min(1, normX));
    targetY = Math.max(-1, Math.min(1, normY));
  }

  function handleTouchMove(e: TouchEvent) {
    if (isReducedMotion || !containerEl || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = containerEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (touch.clientX - centerX) / (rect.width / 2);
    const normY = (touch.clientY - centerY) / (rect.height / 2);

    targetX = Math.max(-1, Math.min(1, normX));
    targetY = Math.max(-1, Math.min(1, normY));
  }

  function handleDeviceOrientation(e: DeviceOrientationEvent) {
    if (isReducedMotion) return;
    if (e.gamma !== null && e.beta !== null) {
      // Clamp gamma (-45 to 45 deg) and beta (-45 to 45 deg)
      const normX = Math.max(-1, Math.min(1, e.gamma / 45));
      const normY = Math.max(-1, Math.min(1, e.beta / 45));
      targetX = normX;
      targetY = normY;
    }
  }

  function triggerSceneTapReaction() {
    if (isBouncing) return;
    isBouncing = true;
    playWebAudioBlip();

    if (onTapReaction) {
      onTapReaction();
    }

    setTimeout(() => {
      isBouncing = false;
    }, 600);
  }

  // Single rAF lerp loop & event listener management
  $effect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion = mediaQuery.matches;

    function handleMediaChange(e: MediaQueryListEvent) {
      isReducedMotion = e.matches;
      if (isReducedMotion) {
        targetX = 0;
        targetY = 0;
        currX = 0;
        currY = 0;
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleMediaChange);
    }

    // If prefers-reduced-motion is active, DO NOT schedule rAF or attach motion listeners
    if (isReducedMotion) {
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleMediaChange);
        } else if (mediaQuery.removeListener) {
          mediaQuery.removeListener(handleMediaChange);
        }
      };
    }

    let rafId: number | null = null;

    function loop() {
      if (!isReducedMotion) {
        // Lerp factor
        currX += (targetX - currX) * 0.1;
        currY += (targetY - currY) * 0.1;
      } else {
        currX = 0;
        currY = 0;
      }
      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    // Optional deviceorientation tilt listener (guarded with feature-detect)
    if (typeof window.DeviceOrientationEvent !== 'undefined') {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (typeof window.DeviceOrientationEvent !== 'undefined') {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  });
</script>

<div
  bind:this={containerEl}
  class="cuento-parallax-container {className}"
  role="region"
  aria-label={tituloAccesible}
  onpointermove={handlePointerMove}
  ontouchmove={handleTouchMove}
  onclick={triggerSceneTapReaction}
  onkeydown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerSceneTapReaction();
    }
  }}
  tabindex="0"
>
  <svg
    viewBox="0 0 800 450"
    role="img"
    aria-label={tituloAccesible}
    class="cuento-parallax-svg"
  >
    <title>{tituloAccesible}</title>
    {#if descripcionAccesible}
      <desc>{descripcionAccesible}</desc>
    {/if}

    <!-- Defs for shared piece symbols if needed -->
    <defs>
      <rect id="parallax-canvas" width="800" height="450" fill="#FDF6EC" rx="12" />
    </defs>

    <!-- Base Canvas -->
    <use href="#parallax-canvas" />

    <!-- Plano 1: Fondo -->
    <g
      id="plano-fondo"
      data-plane="fondo"
      class="parallax-plane plane-fondo"
      style="transform: {fondoTransform};"
    >
      {@html rawFondo}
    </g>

    <!-- Plano 2: Medio -->
    <g
      id="plano-medio"
      data-plane="medio"
      class="parallax-plane plane-medio"
      style="transform: {medioTransform};"
    >
      {@html rawMedio}
    </g>

    <!-- Plano 3: Frente (Comprehends tap bounce reaction) -->
    <g
      id="plano-frente"
      data-plane="frente"
      class="parallax-plane plane-frente {isBouncing ? 'cuento-frente-bounce' : ''}"
      style="transform: {frenteTransform};"
    >
      {@html rawFrente}
    </g>

    <!-- Hotspots Overlay Layer -->
    {#if hotspots.length > 0}
      <g id="hotspots-parallax-layer">
        {#each hotspots as hs (hs.id)}
          <g
            class="cuento-hotspot-marker"
            data-hotspot-id={hs.id}
            transform={`translate(${hs.x}, ${hs.y})`}
            role="button"
            tabindex="0"
            aria-label={hs.etiqueta}
            onclick={(e) => {
              e.stopPropagation();
              if (onHotspotTrigger) onHotspotTrigger(hs);
            }}
          >
            <circle cx="0" cy="0" r="22" fill="#FF9F43" opacity="0.35" class="cuento-respira" />
            <circle cx="0" cy="0" r="14" fill="#FF9F43" stroke="#FFFFFF" stroke-width="3" />
            <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
          </g>
        {/each}
      </g>
    {/if}
  </svg>
</div>

<style>
  .cuento-parallax-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    background-color: var(--cuento-bg-hueso, #FDF6EC);
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px rgba(58, 46, 42, 0.08);
    overflow: hidden;
    cursor: pointer;
    touch-action: pan-y;
    outline: none;
  }

  .cuento-parallax-container:focus-visible {
    ring: 3px solid var(--cuento-cometa, #5B6FD6);
  }

  .cuento-parallax-svg {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 800 / 450;
  }

  .parallax-plane {
    will-change: transform;
    transform-origin: center center;
  }

  .cuento-frente-bounce {
    animation: cuento-frente-bounce-kf var(--t-bote, 0.6s) cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes cuento-frente-bounce-kf {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-18px);
    }
  }

  .cuento-hotspot-marker {
    cursor: pointer;
  }

  @media (prefers-reduced-motion: reduce) {
    .parallax-plane {
      will-change: auto !important;
      transform: none !important;
      transition: none !important;
    }

    .cuento-frente-bounce {
      animation: none !important;
    }
  }
</style>
