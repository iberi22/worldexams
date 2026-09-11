<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import '../arte/tokens.css';

  interface Props {
    lineas?: string[];
    nota?: string;
  }

  const DEFAULT_LINEAS = [
    'Ordenando los colores…',
    'Despertando a la luna…',
    'Acomodando a los personajes…',
    'Afilando los lápices mágicos…'
  ];

  const DEFAULT_NOTA = 'Mejor con sonido · Toca todo para descubrir sorpresas';

  let { lineas = DEFAULT_LINEAS, nota = DEFAULT_NOTA }: Props = $props();

  let activeIndex = $state(0);

  onMount(() => {
    if (!lineas || lineas.length <= 1) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      activeIndex = (activeIndex + 1) % lineas.length;
    }, 2500);

    return () => clearInterval(interval);
  });
</script>

<div class="cargando-cuento-root" aria-live="polite" aria-label="Cargando historia">
  <div class="sky-stage">
    <!-- Starburst & Twinkle layer -->
    <svg class="stars-layer" viewBox="0 0 300 200" aria-hidden="true">
      <!-- Star 1 (Top Left) -->
      <g class="star star-1">
        <circle cx="50" cy="40" r="16" fill="#F2C14E" opacity="0.25" />
        <path d="M 50 28 Q 52 38 62 40 Q 52 42 50 52 Q 48 42 38 40 Q 48 38 50 28 Z" fill="#F2C14E" />
      </g>
      <!-- Star 2 (Top Right Small) -->
      <g class="star star-2">
        <circle cx="240" cy="30" r="12" fill="#F2C14E" opacity="0.2" />
        <path d="M 240 22 Q 241.5 28.5 248 30 Q 241.5 31.5 240 38 Q 238.5 31.5 232 30 Q 238.5 28.5 240 22 Z" fill="#F2C14E" />
      </g>
      <!-- Star 3 (Bottom Left Sparkle) -->
      <g class="star star-3">
        <path d="M 40 140 Q 40 146 46 146 Q 40 146 40 152 Q 40 146 34 146 Q 40 146 40 140 Z" fill="#FFF9DC" opacity="0.8" />
      </g>
      <!-- Star 4 (Bottom Right Glow) -->
      <g class="star star-4">
        <circle cx="220" cy="150" r="18" fill="#F2C14E" opacity="0.25" />
        <path d="M 220 136 Q 222 148 234 150 Q 222 152 220 164 Q 218 152 206 150 Q 218 148 220 136 Z" fill="#F2C14E" />
      </g>
    </svg>

    <!-- Centerpiece Sleeping Moon -->
    <div class="moon-wrapper">
      <svg class="sleeping-moon-svg" viewBox="0 0 160 160" aria-hidden="true">
        <!-- Crescent shape in Cream #FFF9DC -->
        <path
          d="M 95 20 C 135 20 150 60 130 100 C 110 140 60 150 30 125 C 75 125 110 95 95 20 Z"
          fill="#FFF9DC"
          stroke="#D4A94E"
          stroke-width="3"
        />
        <!-- Sleeping eyes with lashes -->
        <path d="M 72 70 Q 82 80 92 70" fill="none" stroke="#3A2E2A" stroke-width="3" stroke-linecap="round" />
        <!-- Soft rosy cheek -->
        <circle cx="86" cy="84" r="6" fill="#E26D5A" opacity="0.5" />
        <!-- Night cap accent -->
        <path d="M 95 20 Q 120 10 115 35 C 105 30 98 25 95 20 Z" fill="#5B6FD6" />
        <circle cx="116" cy="36" r="6" fill="#FFF9DC" />
      </svg>
    </div>
  </div>

  <!-- Rotating Playful Copy -->
  <div class="copy-box">
    {#key activeIndex}
      <p class="loader-line">
        {lineas[activeIndex] || lineas[0] || 'Cargando cuento…'}
      </p>
    {/key}

    {#if nota}
      <span class="loader-note">
        ✨ {nota}
      </span>
    {/if}
  </div>
</div>

<style>
  .cargando-cuento-root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 1.5rem;
    background-color: #121832; /* Night background */
    color: #FFF9DC; /* Cream text */
    border-radius: 1.5rem;
    max-width: 480px;
    margin: 2rem auto;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    border: 2px solid rgba(212, 169, 78, 0.3);
    box-sizing: border-box;
  }

  .sky-stage {
    position: relative;
    width: 220px;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stars-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .star {
    transform-origin: center;
  }

  .star-1 {
    animation: twinkle 2.2s ease-in-out infinite alternate;
  }

  .star-2 {
    animation: twinkle 1.8s ease-in-out infinite alternate 0.6s;
  }

  .star-3 {
    animation: twinkle 2.5s ease-in-out infinite alternate 1.1s;
  }

  .star-4 {
    animation: twinkle 2s ease-in-out infinite alternate 0.3s;
  }

  .moon-wrapper {
    width: 110px;
    height: 110px;
    animation: floatMoon 3.6s ease-in-out infinite alternate;
  }

  .sleeping-moon-svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 6px 16px rgba(242, 193, 78, 0.25));
  }

  .copy-box {
    margin-top: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    min-height: 4.5rem;
  }

  .loader-line {
    font-family: var(--font-cuentos-display, Fredoka, 'Fredoka', 'Baloo 2', system-ui, sans-serif);
    font-size: 1.25rem;
    font-weight: 700;
    color: #FFF9DC;
    margin: 0;
    letter-spacing: 0.02em;
    animation: textFadeIn 0.4s ease-out forwards;
  }

  .loader-note {
    font-family: var(--font-cuentos-cuerpo, Andika, 'Andika', system-ui, sans-serif);
    font-size: 0.875rem;
    color: #D4A94E;
    font-weight: 600;
  }

  @keyframes floatMoon {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    100% {
      transform: translateY(-10px) rotate(4deg);
    }
  }

  @keyframes twinkle {
    0% {
      opacity: 0.35;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1.15);
    }
  }

  @keyframes textFadeIn {
    0% {
      opacity: 0;
      transform: translateY(6px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .moon-wrapper,
    .star-1,
    .star-2,
    .star-3,
    .star-4,
    .loader-line {
      animation: none !important;
      transform: none !important;
    }
  }
</style>
