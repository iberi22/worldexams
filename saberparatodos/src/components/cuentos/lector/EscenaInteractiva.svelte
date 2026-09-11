<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. -->
<script lang="ts">
  import '../arte/tokens.css';
  import EscenaSVG, { type PiezaInstancia, type EscenaPlanos } from '../arte/EscenaSVG.svelte';
  import EscenaParallax, { type EscenaCapas } from '../arte/EscenaParallax.svelte';
  import { getTanaLayeredPlanes, hasLayeredScene } from '../arte/escenas-capas/tana';

  export interface Hotspot {
    id: string;
    x: number;
    y: number;
    etiqueta: string;
    accion?: string;
    icono?: string;
  }

  export interface Props {
    hotspots?: Hotspot[];
    piezas?: PiezaInstancia[];
    escena?: EscenaPlanos;
    cuentoSlug?: string;
    paginaNumero?: number;
    escenaCapas?: EscenaCapas;
    tituloAccesible?: string;
    descripcionAccesible?: string;
    className?: string;
    onHotspotTrigger?: (hotspot: Hotspot) => void;
  }

  let {
    hotspots = [],
    piezas = [],
    escena = {},
    cuentoSlug,
    paginaNumero,
    escenaCapas,
    tituloAccesible = 'Escena interactiva',
    descripcionAccesible = '',
    className = '',
    onHotspotTrigger
  }: Props = $props();

  let activeHotspotId = $state<string | null>(null);
  let activeReaction = $state<string | null>(null);

  // Determine whether layered planes exist for this page or prop
  const activeLayeredPlanes = $derived.by(() => {
    if (escenaCapas && escenaCapas.fondo && escenaCapas.medio && escenaCapas.frente) {
      return escenaCapas;
    }
    if (cuentoSlug && paginaNumero && hasLayeredScene(cuentoSlug, paginaNumero)) {
      return getTanaLayeredPlanes(paginaNumero);
    }
    return null;
  });

  /**
   * Generates a WebAudio blip sound with zero audio files or external network requests.
   * Suppressed under prefers-reduced-motion: reduce.
   */
  function playWebAudioBlip(frequency = 587.33) {
    if (typeof window === 'undefined') return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Silently handle if WebAudio policy or browser audio context is unavailable
    }
  }

  function getReactionClass(accion?: string): string {
    const act = (accion || '').toLowerCase();
    if (act === 'giro' || act === 'spin' || act === 'meneo') {
      return 'cuento-hotspot-spin';
    }
    return 'cuento-hotspot-jump';
  }

  function triggerHotspot(hs: Hotspot) {
    activeHotspotId = hs.id;
    const reactionClass = getReactionClass(hs.accion);
    activeReaction = reactionClass;

    playWebAudioBlip(hs.accion === 'giro' || hs.accion === 'spin' ? 783.99 : 587.33);

    if (onHotspotTrigger) {
      onHotspotTrigger(hs);
    }

    setTimeout(() => {
      if (activeHotspotId === hs.id) {
        activeHotspotId = null;
        activeReaction = null;
      }
    }, 700);
  }
</script>

<div class="cuento-escena-interactiva {className}">
  {#if activeLayeredPlanes}
    <!-- 2.5D Parallax Scene Path (Pilot cuentos e.g. Tana) -->
    <EscenaParallax
      escenaCapas={activeLayeredPlanes}
      {hotspots}
      {tituloAccesible}
      {descripcionAccesible}
      {onHotspotTrigger}
    />
  {:else}
    <!-- Flat Scene SVG Path (Fallback for non-pilot cuentos) -->
    <div class="cuento-escena-wrapper">
      <EscenaSVG
        {piezas}
        {escena}
        {tituloAccesible}
        {descripcionAccesible}
        hotspots={[]}
      />

      <!-- Interactive Hotspots Layer SVG Overlay -->
      <svg
        viewBox="0 0 800 450"
        class="cuento-hotspots-overlay"
        aria-hidden="false"
      >
        <g id="interactive-hotspots-layer">
          {#each hotspots as hs (hs.id)}
            <g
              class="cuento-hotspot-zone {activeHotspotId === hs.id ? activeReaction : ''}"
              data-hotspot-id={hs.id}
              data-reaction={hs.accion || 'salto'}
              data-active={activeHotspotId === hs.id ? 'true' : 'false'}
              transform={`translate(${hs.x}, ${hs.y})`}
              role="button"
              tabindex="0"
              aria-label={hs.etiqueta}
              onclick={() => triggerHotspot(hs)}
              onkeydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  triggerHotspot(hs);
                }
              }}
            >
              <circle cx="0" cy="0" r="50" fill="transparent" class="cuento-hitbox" />
              <circle cx="0" cy="0" r="22" fill="#FF9F43" opacity="0.35" class="cuento-respira" />
              <circle cx="0" cy="0" r="14" fill="#FF9F43" stroke="#FFFFFF" stroke-width="3" class="cuento-marker-outer" />
              <circle cx="0" cy="0" r="5" fill="#FFFFFF" class="cuento-marker-inner" />
            </g>
          {/each}
        </g>
      </svg>
    </div>
  {/if}
</div>

<style>
  .cuento-escena-interactiva {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }

  .cuento-escena-wrapper {
    position: relative;
    width: 100%;
    border-radius: 0.75rem;
    overflow: hidden;
  }

  .cuento-hotspots-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    aspect-ratio: 800 / 450;
    pointer-events: none;
  }

  .cuento-hotspot-zone {
    pointer-events: auto;
    cursor: pointer;
    outline: none;
    transform-origin: center center;

    /* WCAG 2.1 Target Size compliance */
    min-width: 48px;
    min-height: 48px;
  }

  .cuento-hotspot-zone:focus-visible .cuento-marker-outer {
    stroke: var(--cuento-cometa, #5B6FD6);
    stroke-width: 5px;
    filter: drop-shadow(0 0 6px rgba(91, 111, 214, 0.8));
  }

  .cuento-hotspot-jump {
    animation: cuento-bote-kf var(--t-bote, 0.6s) cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .cuento-hotspot-spin {
    animation: cuento-meneo-kf var(--t-meneo, 0.8s) ease-in-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .cuento-hotspot-jump,
    .cuento-hotspot-spin,
    .cuento-respira {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
</style>
