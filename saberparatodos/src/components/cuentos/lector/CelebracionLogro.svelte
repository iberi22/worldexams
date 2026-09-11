<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. -->
<script lang="ts">
  import type { Logro } from '../../../lib/cuentos/logros';
  import '../arte/tokens.css';

  interface Props {
    logros: readonly Logro[] | Logro[];
    onClose?: () => void;
  }

  let { logros = [], onClose }: Props = $props();

  let currentIndex = $state(0);

  const currentLogro = $derived(
    logros.length > 0 && currentIndex < logros.length ? logros[currentIndex] : null
  );

  function handleNext() {
    if (currentIndex + 1 < logros.length) {
      currentIndex += 1;
    } else {
      if (onClose) onClose();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
      handleNext();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if currentLogro}
  <div
    class="celebration-backdrop"
    role="dialog"
    aria-modal="true"
    aria-label="¡Insignia Desbloqueada!"
  >
    <div
      class="celebration-modal cuento-aparece"
      role="status"
      aria-live="polite"
    >
      <!-- Confetti SVG overlay (12 pieces per 01_DIRECCION_ARTE.md §5) -->
      <div class="confetti-container" aria-hidden="true">
        <svg viewBox="0 0 300 200" class="confetti-svg">
          <!-- 12 colorful confetti shapes -->
          <circle cx="40" cy="30" r="5" fill="#FF9F43" class="confetti-piece p1" />
          <rect x="80" y="20" width="8" height="8" rx="2" fill="#4FB6A3" class="confetti-piece p2" />
          <circle cx="130" cy="40" r="6" fill="#5B6FD6" class="confetti-piece p3" />
          <polygon points="180,25 186,37 174,37" fill="#E26D5A" class="confetti-piece p4" />
          <circle cx="230" cy="30" r="4" fill="#FF9F43" class="confetti-piece p5" />
          <rect x="270" y="45" width="7" height="7" rx="2" fill="#4FB6A3" class="confetti-piece p6" />

          <rect x="30" y="140" width="8" height="8" rx="2" fill="#5B6FD6" class="confetti-piece p7" />
          <circle cx="75" cy="160" r="5" fill="#E26D5A" class="confetti-piece p8" />
          <polygon points="125,145 131,157 119,157" fill="#FF9F43" class="confetti-piece p9" />
          <circle cx="175" cy="150" r="6" fill="#4FB6A3" class="confetti-piece p10" />
          <rect x="220" y="155" width="8" height="8" rx="2" fill="#5B6FD6" class="confetti-piece p11" />
          <circle cx="265" cy="140" r="5" fill="#E26D5A" class="confetti-piece p12" />
        </svg>
      </div>

      <!-- Badge Icon Frame -->
      <div class="badge-frame cuento-bote">
        <span class="badge-icon" aria-hidden="true">{currentLogro.icono || '🏆'}</span>
      </div>

      <!-- Logro Text Header -->
      <span class="unlock-tag">¡Insignia Desbloqueada!</span>
      <h3 class="logro-title">{currentLogro.nombre}</h3>
      <p class="logro-description">{currentLogro.descripcion}</p>

      <!-- Counter if multiple achievements unlocked -->
      {#if logros.length > 1}
        <div class="multiple-counter">
          Insignia {currentIndex + 1} de {logros.length}
        </div>
      {/if}

      <!-- Action Button -->
      <button
        type="button"
        class="celebration-btn cuento-respira"
        onclick={handleNext}
        aria-label={currentIndex + 1 < logros.length ? 'Ver siguiente insignia' : 'Continuar'}
      >
        {currentIndex + 1 < logros.length ? 'Siguiente Insignia ➔' : '¡Genial! 🎉'}
      </button>
    </div>
  </div>
{/if}

<style>
  .celebration-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(58, 46, 42, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1rem;
    box-sizing: border-box;
    backdrop-filter: blur(4px);
  }

  .celebration-modal {
    position: relative;
    background-color: var(--cuento-bg-hueso, #FDF6EC);
    color: var(--cuento-tinta, #3A2E2A);
    border: 4px solid var(--cuento-tinta, #3A2E2A);
    border-radius: 2rem;
    padding: 2.25rem 2rem;
    max-width: 440px;
    width: 100%;
    text-align: center;
    box-shadow: 0 12px 0 var(--cuento-tinta, #3A2E2A);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    box-sizing: border-box;
  }

  .confetti-container {
    position: absolute;
    top: -30px;
    left: -20px;
    right: -20px;
    bottom: -30px;
    pointer-events: none;
    overflow: hidden;
  }

  .confetti-svg {
    width: 100%;
    height: 100%;
  }

  /* Confetti animations */
  .confetti-piece {
    animation: confetti-float 1.2s ease-out infinite alternate;
  }

  .p1 { animation-delay: 0.1s; }
  .p2 { animation-delay: 0.2s; }
  .p3 { animation-delay: 0.3s; }
  .p4 { animation-delay: 0.15s; }
  .p5 { animation-delay: 0.25s; }
  .p6 { animation-delay: 0.35s; }
  .p7 { animation-delay: 0.05s; }
  .p8 { animation-delay: 0.18s; }
  .p9 { animation-delay: 0.28s; }
  .p10 { animation-delay: 0.12s; }
  .p11 { animation-delay: 0.22s; }
  .p12 { animation-delay: 0.32s; }

  @keyframes confetti-float {
    0% {
      transform: translateY(0) scale(0.9);
      opacity: 0.8;
    }
    100% {
      transform: translateY(-8px) scale(1.1);
      opacity: 1;
    }
  }

  .badge-frame {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #FFFFFF;
    border: 4px solid var(--cuento-mango, #FF9F43);
    box-shadow: 0 6px 0 var(--cuento-tinta, #3A2E2A);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.25rem;
  }

  .badge-icon {
    font-size: 3.5rem;
    line-height: 1;
  }

  .unlock-tag {
    display: inline-block;
    padding: 0.35rem 0.85rem;
    background-color: var(--cuento-agua, #4FB6A3);
    color: #FFFFFF;
    font-size: 0.85rem;
    font-weight: 800;
    border-radius: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .logro-title {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--cuento-tinta, #3A2E2A);
  }

  .logro-description {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.5;
    color: rgba(58, 46, 42, 0.85);
    font-weight: 600;
  }

  .multiple-counter {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--cuento-mango, #FF9F43);
    background-color: rgba(255, 159, 67, 0.15);
    padding: 0.25rem 0.75rem;
    border-radius: 0.5rem;
  }

  .celebration-btn {
    min-height: 52px;
    width: 100%;
    margin-top: 0.5rem;
    padding: 0.85rem 1.5rem;
    background-color: var(--cuento-mango, #FF9F43);
    color: #FFFFFF;
    border: 3px solid var(--cuento-tinta, #3A2E2A);
    border-radius: 1.25rem;
    font-size: 1.2rem;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 5px 0 var(--cuento-tinta, #3A2E2A);
    transition: transform 0.15s ease, background-color 0.15s ease;
  }

  .celebration-btn:hover {
    background-color: #FF8F26;
    transform: translateY(-2px);
  }

  .celebration-btn:focus-visible {
    outline: 3px solid var(--cuento-cometa, #5B6FD6);
    outline-offset: 3px;
  }

  @media (max-width: 480px) {
    .celebration-modal {
      padding: 1.75rem 1.25rem;
      border-radius: 1.5rem;
    }

    .logro-title {
      font-size: 1.35rem;
    }

    .logro-description {
      font-size: 1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .confetti-piece,
    .cuento-bote,
    .cuento-aparece,
    .cuento-respira,
    .celebration-btn {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
</style>
