<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. -->
<script lang="ts">
  import type { Cuento, CuentoPagina } from '../../../lib/cuentos/cuento-schema';
  import { saveProgress, getAllProgress } from '../../../lib/cuentos/progreso';
  import { evaluarYDesbloquearLogros, type Logro } from '../../../lib/cuentos/logros';
  import CelebracionLogro from './CelebracionLogro.svelte';
  import '../arte/tokens.css';

  export interface Props {
    cuento: Cuento | {
      slug: string;
      titulo: string;
      paginas: readonly CuentoPagina[] | CuentoPagina[];
      [key: string]: any;
    };
    onComplete?: () => void;
    className?: string;
  }

  export const SPEED_INTERVALS = {
    normal: 6000,
    lento: 10000
  };

  let { cuento, onComplete, className = '' }: Props = $props();

  let currentPageIndex = $state(0);
  let isAutoplay = $state(false);
  let speed = $state<'normal' | 'lento'>('normal');
  let imageError = $state(false);
  let unlockedLogros = $state<Logro[]>([]);

  const paginas = $derived(cuento?.paginas || []);
  const totalPaginas = $derived(paginas.length);
  const currentPage = $derived(paginas[currentPageIndex] || null);
  const isFirstPage = $derived(currentPageIndex <= 0);
  const isLastPage = $derived(currentPageIndex >= totalPaginas - 1);

  // Reset image error state and save progress / evaluate achievements on page change
  $effect(() => {
    if (currentPageIndex !== undefined && cuento?.slug) {
      imageError = false;
      const isFinished = currentPageIndex >= totalPaginas - 1;
      saveProgress(cuento.slug, currentPageIndex + 1, isFinished);
      const nuevos = evaluarYDesbloquearLogros(getAllProgress(), cuento.slug);
      if (nuevos.length > 0) {
        unlockedLogros = nuevos;
      }
    }
  });

  // Autoplay timer effect
  $effect(() => {
    if (!isAutoplay || totalPaginas === 0) return;

    // Check prefers-reduced-motion: reduce
    if (typeof window !== 'undefined' && window.matchMedia) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) {
        isAutoplay = false;
        return;
      }
    }

    const intervalTime = SPEED_INTERVALS[speed];
    const timer = setInterval(() => {
      if (currentPageIndex < totalPaginas - 1) {
        currentPageIndex += 1;
      } else {
        isAutoplay = false;
        if (onComplete) onComplete();
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
    };
  });

  // Global keydown effect for ArrowLeft and ArrowRight
  $effect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === 'ArrowLeft') {
        goToPrev();
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeydown);
      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    }
  });

  function goToNext() {
    isAutoplay = false; // Pause autoplay on manual navigation
    if (currentPageIndex < totalPaginas - 1) {
      currentPageIndex += 1;
    } else if (isLastPage && onComplete) {
      onComplete();
    }
  }

  function goToPrev() {
    isAutoplay = false; // Pause autoplay on manual navigation
    if (currentPageIndex > 0) {
      currentPageIndex -= 1;
    }
  }

  function toggleAutoplay() {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) {
        isAutoplay = false;
        return;
      }
    }
    isAutoplay = !isAutoplay;
  }

  function setSpeed(newSpeed: 'normal' | 'lento') {
    speed = newSpeed;
  }

  function resolveImageUrl(slug: string, imagen: string): string {
    if (!imagen) return '';
    if (imagen.startsWith('/') || imagen.startsWith('http')) return imagen;
    return `/v1/cuentos/${slug}/${imagen}`;
  }

  function handleImageError() {
    imageError = true;
  }
</script>

<div
  class="cuento-reader-container {className}"
  role="region"
  aria-label="Lector de cuentos"
>
  <!-- Barra superior de controles y velocidad -->
  <header class="reader-header">
    <div class="header-title">
      <h2 class="title-text">{cuento?.titulo || 'Cuento'}</h2>
    </div>

    <div class="header-controls">
      <!-- Selector de velocidad -->
      <div class="speed-control" role="group" aria-label="Control de velocidad de lectura">
        <span class="speed-label">Velocidad:</span>
        <button
          type="button"
          class="speed-btn {speed === 'normal' ? 'active' : ''}"
          onclick={() => setSpeed('normal')}
          aria-label="Velocidad normal"
        >
          Normal
        </button>
        <button
          type="button"
          class="speed-btn {speed === 'lento' ? 'active' : ''}"
          onclick={() => setSpeed('lento')}
          aria-label="Velocidad lenta"
        >
          Lenta
        </button>
      </div>

      <!-- Botón Autoplay -->
      <button
        type="button"
        class="autoplay-btn {isAutoplay ? 'active' : ''}"
        onclick={toggleAutoplay}
        aria-label={isAutoplay ? 'Pausar reproducción automática' : 'Iniciar reproducción automática'}
      >
        <span class="btn-icon">{isAutoplay ? '⏸️' : '▶️'}</span>
        <span class="btn-text">{isAutoplay ? 'Pausar' : 'Autoplay'}</span>
      </button>
    </div>
  </header>

  <!-- Escenario principal de la página -->
  <main class="reader-stage">
    {#if currentPage}
      <!-- Imagen de la escena SVG -->
      <div class="scene-frame">
        {#if !imageError}
          <img
            src={resolveImageUrl(cuento.slug, currentPage.imagen)}
            alt={currentPage.alt || `Escena de la página ${currentPage.n}`}
            class="scene-image"
            loading="eager"
            onerror={handleImageError}
          />
        {:else}
          <div class="scene-fallback" aria-label={currentPage.alt || `Escena de la página ${currentPage.n}`}>
            <span class="fallback-icon">📖</span>
            <span class="fallback-alt">{currentPage.alt}</span>
          </div>
        {/if}
      </div>

      <!-- Texto de la página -->
      <div class="story-text-card">
        <p class="story-text">{currentPage.texto}</p>
      </div>
    {:else}
      <div class="story-text-card">
        <p class="story-text">Cargando cuento...</p>
      </div>
    {/if}
  </main>

  <!-- Barra de navegación inferior -->
  <footer class="reader-footer">
    <button
      type="button"
      class="nav-btn prev-btn"
      disabled={isFirstPage}
      onclick={goToPrev}
      aria-label="Página anterior"
    >
      <span class="nav-icon">‹</span>
      <span class="nav-label">Anterior</span>
    </button>

    <div class="page-counter" aria-live="polite">
      Página {currentPageIndex + 1} de {totalPaginas}
    </div>

    <button
      type="button"
      class="nav-btn next-btn"
      disabled={isLastPage}
      onclick={goToNext}
      aria-label="Página siguiente"
    >
      <span class="nav-label">Siguiente</span>
      <span class="nav-icon">›</span>
    </button>
  </footer>
  {#if unlockedLogros.length > 0}
    <CelebracionLogro logros={unlockedLogros} onClose={() => (unlockedLogros = [])} />
  {/if}
</div>

<style>
  .cuento-reader-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 860px;
    margin: 0 auto;
    padding: 1.25rem;
    background-color: var(--cuento-bg-hueso, #FDF6EC);
    color: var(--cuento-tinta, #3A2E2A);
    border-radius: 1.25rem;
    box-shadow: 0 8px 24px rgba(58, 46, 42, 0.08);
    box-sizing: border-box;
    font-family: var(--font-cuentos-cuerpo, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  }

  .reader-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid rgba(58, 46, 42, 0.1);
    margin-bottom: 1rem;
  }

  .header-title {
    flex: 1;
    min-width: 200px;
  }

  .title-text {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--cuento-tinta, #3A2E2A);
    font-family: var(--font-cuentos-display, system-ui, sans-serif);
  }

  .header-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .speed-control {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background-color: rgba(58, 46, 42, 0.05);
    padding: 0.25rem;
    border-radius: 0.75rem;
  }

  .speed-label {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0 0.4rem;
  }

  .speed-btn {
    min-height: 48px;
    min-width: 48px;
    padding: 0.4rem 0.75rem;
    border: none;
    border-radius: 0.5rem;
    background: transparent;
    color: var(--cuento-tinta, #3A2E2A);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .speed-btn.active {
    background-color: var(--cuento-agua, #4FB6A3);
    color: #FFFFFF;
    box-shadow: 0 2px 6px rgba(79, 182, 163, 0.3);
  }

  .autoplay-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 48px;
    min-width: 48px;
    padding: 0.5rem 1rem;
    border: 2px solid var(--cuento-mango, #FF9F43);
    border-radius: 0.75rem;
    background-color: transparent;
    color: var(--cuento-tinta, #3A2E2A);
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .autoplay-btn.active {
    background-color: var(--cuento-mango, #FF9F43);
    color: #FFFFFF;
    box-shadow: 0 3px 8px rgba(255, 159, 67, 0.35);
  }

  .btn-icon {
    font-size: 1.1rem;
  }

  .reader-stage {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 1.25rem;
  }

  .scene-frame {
    width: 100%;
    min-height: 220px;
    max-height: 420px;
    background-color: #FFFFFF;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(58, 46, 42, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .scene-image {
    width: 100%;
    height: auto;
    max-height: 420px;
    object-fit: contain;
    display: block;
  }

  .scene-fallback {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 2rem;
    background-color: #FDF6EC;
    color: var(--cuento-tinta, #3A2E2A);
    width: 100%;
    height: 100%;
    min-height: 220px;
    text-align: center;
  }

  .fallback-icon {
    font-size: 3rem;
  }

  .fallback-alt {
    font-size: 0.95rem;
    font-weight: 600;
    color: rgba(58, 46, 42, 0.7);
    max-width: 400px;
  }

  .story-text-card {
    background-color: #FFFFFF;
    padding: 1.5rem 1.75rem;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(58, 46, 42, 0.05);
    border-left: 6px solid var(--cuento-mango, #FF9F43);
  }

  .story-text {
    margin: 0;
    font-size: 1.4rem;
    line-height: 1.75;
    color: var(--cuento-tinta, #3A2E2A);
    font-weight: 500;
    font-family: var(--font-cuentos-cuerpo, system-ui, sans-serif);
  }

  .reader-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 0.75rem;
    border-top: 2px solid rgba(58, 46, 42, 0.1);
  }

  .nav-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 48px;
    min-width: 120px;
    padding: 0.6rem 1.25rem;
    border: none;
    border-radius: 0.85rem;
    background-color: var(--cuento-mango, #FF9F43);
    color: #FFFFFF;
    font-size: 1.05rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.15s ease, background-color 0.2s ease, opacity 0.2s ease;
    box-shadow: 0 3px 8px rgba(255, 159, 67, 0.3);
  }

  .nav-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    background-color: #f08e33;
  }

  .nav-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .nav-icon {
    font-size: 1.3rem;
    line-height: 1;
  }

  .page-counter {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--cuento-tinta, #3A2E2A);
    padding: 0.4rem 0.8rem;
    background-color: rgba(58, 46, 42, 0.05);
    border-radius: 0.5rem;
  }

  @media (max-width: 640px) {
    .cuento-reader-container {
      padding: 0.85rem;
      border-radius: 0.85rem;
    }

    .story-text {
      font-size: 1.2rem;
      line-height: 1.6;
    }

    .nav-btn {
      min-width: 48px;
      padding: 0.5rem 0.75rem;
    }

    .nav-label {
      display: none;
    }

    .reader-header {
      flex-direction: column;
      align-items: stretch;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-btn, .speed-btn, .autoplay-btn {
      transition: none !important;
      transform: none !important;
    }
  }
</style>
