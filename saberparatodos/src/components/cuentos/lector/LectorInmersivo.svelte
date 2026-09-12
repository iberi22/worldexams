<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. -->
<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import type { Cuento, CuentoPagina } from '../../../lib/cuentos/cuento-schema';
  import { saveProgress, getAllProgress } from '../../../lib/cuentos/progreso';
  import { evaluarYDesbloquearLogros, type Logro } from '../../../lib/cuentos/logros';
  import CelebracionLogro from './CelebracionLogro.svelte';
  import EscenaInteractiva from './EscenaInteractiva.svelte';
  import QuizCuento from './QuizCuento.svelte';
  import AudioCuento from './AudioCuento.svelte';
  import '../arte/tokens.css';

  export interface Props {
    cuento: any;
    onComplete?: () => void;
    className?: string;
  }

  let { cuento, onComplete, className = '' }: Props = $props();

  let currentPageIndex = $state(0);
  let showQuiz = $state(false);
  let unlockedLogros = $state<Logro[]>([]);
  let isNarrating = $state(false);
  let highlightCharRange = $state<{ start: number; length: number } | null>(null);
  let touchStartX = $state<number | null>(null);

  const paginas = $derived(
    Array.isArray(cuento?.paginasList)
      ? cuento.paginasList
      : Array.isArray(cuento?.paginas)
        ? cuento.paginas
        : []
  );

  const totalPaginas = $derived(paginas.length);
  const currentPage = $derived(paginas[currentPageIndex] || null);
  const isFirstPage = $derived(currentPageIndex <= 0);
  const isLastPage = $derived(currentPageIndex >= totalPaginas - 1);

  // Restore progress on initial mount
  onMount(() => {
    if (cuento?.slug) {
      const all = getAllProgress();
      const stored = all[cuento.slug];
      if (stored && typeof stored.lastPage === 'number' && stored.lastPage > 0) {
        const restoredIdx = Math.min(stored.lastPage - 1, totalPaginas - 1);
        if (restoredIdx >= 0) {
          currentPageIndex = restoredIdx;
        }
      }
    }
  });

  // Save progress & evaluate achievements whenever page index or quiz mode changes
  $effect(() => {
    const pageToSave = currentPageIndex;
    const quizState = showQuiz;

    if (cuento?.slug && totalPaginas > 0) {
      untrack(() => {
        stopNarrating();
        const isFinished = quizState || (isLastPage && pageToSave === totalPaginas - 1);
        saveProgress(cuento.slug, pageToSave + 1, isFinished);
        const recienDesbloqueados = evaluarYDesbloquearLogros(getAllProgress(), cuento.slug);
        if (recienDesbloqueados.length > 0) {
          unlockedLogros = recienDesbloqueados;
        }
      });
    }
  });

  // Global keydown effect for ArrowLeft and ArrowRight navigation
  $effect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (showQuiz) return;
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

  // La narración vive en AudioCuento (C7.07, dual MP3/Web Speech) remontado
  // por página vía {#key}: al navegar, onDestroy detiene el audio/voz.
  // Aquí solo se resetea el estado visual de resaltado.
  function stopNarrating() {
    isNarrating = false;
    highlightCharRange = null;
  }

  function goToNext() {
    stopNarrating();
    if (showQuiz) return;

    if (currentPageIndex < totalPaginas - 1) {
      currentPageIndex += 1;
    } else {
      showQuiz = true;
      if (onComplete) onComplete();
    }
  }

  function goToPrev() {
    stopNarrating();
    if (showQuiz) {
      showQuiz = false;
      return;
    }
    if (currentPageIndex > 0) {
      currentPageIndex -= 1;
    }
  }

  function jumpToPage(index: number) {
    stopNarrating();
    showQuiz = false;
    if (index >= 0 && index < totalPaginas) {
      currentPageIndex = index;
    }
  }

  function handleTouchStart(e: TouchEvent) {
    if (e.touches && e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
    }
  }

  function handleTouchEnd(e: TouchEvent) {
    if (touchStartX === null || !e.changedTouches || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    touchStartX = null;

    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  }

  function resolveScenePath(slug: string, escenaPath?: string): string {
    if (!escenaPath) return '';
    if (escenaPath.startsWith('/') || escenaPath.startsWith('http')) return escenaPath;
    return `/v1/cuentos/${slug}/${escenaPath.replace(/^\.\//, '')}`;
  }

  // Quiz adapter for QuizCuento component
  const quizData = $derived(() => {
    if (!cuento?.quiz) return { preguntas: [], explicacion: '' };
    if (Array.isArray(cuento.quiz.preguntas)) {
      return cuento.quiz;
    }
    if (Array.isArray(cuento.quiz)) {
      return { preguntas: cuento.quiz, explicacion: cuento.explicacion || '' };
    }
    return { preguntas: [], explicacion: '' };
  });

  const adaptedQuizPreguntas = $derived(() => {
    const qData = quizData();
    return (qData.preguntas || []).map((q: any) => ({
      id: q.id,
      texto: q.pregunta || q.texto || '',
      opciones: (q.opciones || []).map((opt: any) => ({
        letra: opt.id || opt.letra || 'A',
        texto: opt.texto || '',
        correcta: opt.esCorrecta ?? opt.correcta ?? false,
        feedback: opt.feedback || ''
      }))
    }));
  });
</script>

<div
  class="lector-inmersivo-shell {className}"
  role="region"
  aria-label={`Lector inmersivo del cuento ${cuento?.titulo || ''}`}
  ontouchstart={handleTouchStart}
  ontouchend={handleTouchEnd}
>
  <!-- Barra superior del Lector Inmersivo (Sin Chrome de Adulto) -->
  <header class="lector-top-bar">
    <div class="story-title-badge">
      <span class="star-icon" aria-hidden="true">⭐</span>
      <h1 class="story-title">{cuento?.titulo || 'Cuento'}</h1>
    </div>

    <!-- Player de narración dual MP3/Web Speech (C7.07 AudioCuento) -->
    {#key `${cuento?.slug}-p${currentPageIndex}-${showQuiz}`}
      {#if !showQuiz && currentPage}
        <AudioCuento
          slug={cuento.slug}
          pagina={{
            n: currentPage.n ?? currentPage.numero ?? currentPageIndex + 1,
            texto: currentPage.texto || '',
            audio: currentPage.audio ?? null,
            timings: currentPage.timings ?? null
          }}
          onHighlight={(range) => {
            highlightCharRange = range;
            isNarrating = range !== null;
          }}
          onEnd={() => {
            isNarrating = false;
            highlightCharRange = null;
          }}
        />
      {/if}
    {/key}
  </header>

  <!-- Tarjeta Crema Spread Principal -->
  <main class="spread-card-container">
    <div class="cream-spread-card">
      <!-- Esquinas de filigrana dorada #D4A94E (Vector Puro) -->
      <svg class="filigree-corner filigree-top-left" viewBox="0 0 60 60" aria-hidden="true">
        <path d="M 6 6 Q 30 6 30 30 Q 6 30 6 6 Z" fill="#D4A94E" opacity="0.3" />
        <path d="M 4 4 Q 40 4 40 40" fill="none" stroke="#D4A94E" stroke-width="2.5" stroke-linecap="round" />
        <path d="M 12 12 Q 32 12 32 32" fill="none" stroke="#D4A94E" stroke-width="1.5" stroke-linecap="round" />
        <circle cx="8" cy="8" r="3" fill="#D4A94E" />
      </svg>

      <svg class="filigree-corner filigree-top-right" viewBox="0 0 60 60" aria-hidden="true">
        <path d="M 6 6 Q 30 6 30 30 Q 6 30 6 6 Z" fill="#D4A94E" opacity="0.3" />
        <path d="M 4 4 Q 40 4 40 40" fill="none" stroke="#D4A94E" stroke-width="2.5" stroke-linecap="round" />
        <path d="M 12 12 Q 32 12 32 32" fill="none" stroke="#D4A94E" stroke-width="1.5" stroke-linecap="round" />
        <circle cx="8" cy="8" r="3" fill="#D4A94E" />
      </svg>

      <svg class="filigree-corner filigree-bottom-left" viewBox="0 0 60 60" aria-hidden="true">
        <path d="M 6 6 Q 30 6 30 30 Q 6 30 6 6 Z" fill="#D4A94E" opacity="0.3" />
        <path d="M 4 4 Q 40 4 40 40" fill="none" stroke="#D4A94E" stroke-width="2.5" stroke-linecap="round" />
        <path d="M 12 12 Q 32 12 32 32" fill="none" stroke="#D4A94E" stroke-width="1.5" stroke-linecap="round" />
        <circle cx="8" cy="8" r="3" fill="#D4A94E" />
      </svg>

      <svg class="filigree-corner filigree-bottom-right" viewBox="0 0 60 60" aria-hidden="true">
        <path d="M 6 6 Q 30 6 30 30 Q 6 30 6 6 Z" fill="#D4A94E" opacity="0.3" />
        <path d="M 4 4 Q 40 4 40 40" fill="none" stroke="#D4A94E" stroke-width="2.5" stroke-linecap="round" />
        <path d="M 12 12 Q 32 12 32 32" fill="none" stroke="#D4A94E" stroke-width="1.5" stroke-linecap="round" />
        <circle cx="8" cy="8" r="3" fill="#D4A94E" />
      </svg>

      {#if !showQuiz && currentPage}
        <!-- Escena Ilustrada -->
        <div class="scene-container">
          {#if currentPage.escena || currentPage.imagen}
            <EscenaInteractiva
              escena={{
                frente: resolveScenePath(cuento.slug, currentPage.escena || currentPage.imagen)
              }}
              tituloAccesible={currentPage.alt || `Escena de la página ${currentPageIndex + 1}`}
              hotspots={(currentPage as any).hotspots || []}
            />
          {:else}
            <div class="scene-placeholder" aria-label={currentPage.alt || 'Escena del cuento'}>
              <span class="placeholder-icon">📖</span>
            </div>
          {/if}
        </div>

        <!-- Texto de la Historia en Andika 24px -->
        <div class="text-andika-spread">
          <p class="spread-body-text">
            {#if isNarrating && highlightCharRange && currentPage.texto}
              {@const { start, length } = highlightCharRange}
              {currentPage.texto.slice(0, start)}<mark class="karaoke-highlight">{currentPage.texto.slice(start, start + length)}</mark>{currentPage.texto.slice(start + length)}
            {:else}
              {currentPage.texto}
            {/if}
          </p>

          <!-- Slots tolerantes para Hint y Words (Contenido v2, Opcional) -->
          {#if (currentPage as any).hint}
            <div class="parent-hint-slot cuento-aparece">
              <span class="hint-icon">💡</span>
              <span class="hint-text">{(currentPage as any).hint}</span>
            </div>
          {/if}

          {#if (currentPage as any).words && Array.isArray((currentPage as any).words) && (currentPage as any).words.length > 0}
            <div class="words-vocab-slot cuento-aparece">
              <span class="words-label">🏷️ Vocabulario:</span>
              <div class="words-tags">
                {#each (currentPage as any).words as word}
                  <span class="vocab-tag">{word}</span>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {:else if showQuiz}
        <!-- Quiz de Comprensión Lúdico -->
        <div class="quiz-spread-wrapper">
          <QuizCuento
            quiz={adaptedQuizPreguntas()}
            explicacion={quizData().explicacion}
            slug={cuento.slug}
            personajes={cuento.personajes}
            onComplete={() => {
              if (onComplete) onComplete();
            }}
          />
        </div>
      {/if}
    </div>
  </main>

  <!-- Controles Inferiores de Navegación (Flechas Grandes >=56px + Dots) -->
  <footer class="lector-bottom-nav">
    <button
      type="button"
      class="nav-arrow-btn prev-arrow-btn"
      disabled={isFirstPage && !showQuiz}
      onclick={goToPrev}
      aria-label="Página anterior"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path d="M 20 6 L 10 16 L 20 26" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <!-- Paginación por Puntos (Dots Pagination) -->
    <div class="dots-pagination" role="tablist" aria-label="Navegación de páginas">
      {#each paginas as _, idx}
        <button
          type="button"
          role="tab"
          class="dot-item {idx === currentPageIndex && !showQuiz ? 'active' : ''}"
          aria-selected={idx === currentPageIndex && !showQuiz ? 'true' : 'false'}
          aria-current={idx === currentPageIndex && !showQuiz ? 'page' : undefined}
          aria-label={`Ir a la página ${idx + 1}`}
          onclick={() => jumpToPage(idx)}
        ></button>
      {/each}

      {#if adaptedQuizPreguntas().length > 0}
        <button
          type="button"
          role="tab"
          class="dot-item quiz-dot {showQuiz ? 'active' : ''}"
          aria-selected={showQuiz ? 'true' : 'false'}
          aria-current={showQuiz ? 'page' : undefined}
          aria-label="Ir al quiz de comprensión"
          onclick={() => {
            stopNarrating();
            showQuiz = true;
          }}
        >
          🧩
        </button>
      {/if}
    </div>

    <button
      type="button"
      class="nav-arrow-btn next-arrow-btn"
      disabled={showQuiz}
      onclick={goToNext}
      aria-label={isLastPage ? 'Ver quiz de comprensión' : 'Página siguiente'}
    >
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path d="M 12 6 L 22 16 L 12 26" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </footer>

  {#if unlockedLogros.length > 0}
    <CelebracionLogro logros={unlockedLogros} onClose={() => (unlockedLogros = [])} />
  {/if}
</div>

<style>
  .lector-inmersivo-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    background-color: #121832; /* Shell Nocturno C7.01 */
    color: #3A2E2A;
    box-sizing: border-box;
    padding: 1rem;
    align-items: center;
    justify-content: space-between;
    font-family: var(--font-cuentos-cuerpo, Andika, 'Andika', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  }

  .lector-top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 900px;
    padding: 0.5rem 0.25rem;
  }

  .story-title-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.4rem 0.9rem;
    border-radius: 2rem;
    border: 1.5px solid rgba(212, 169, 78, 0.4);
    backdrop-filter: blur(4px);
  }

  .star-icon {
    font-size: 1.2rem;
  }

  .story-title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    color: #FFF9DC;
  }

  .spread-card-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 900px;
    margin: 1rem 0;
  }

  /* Tarjeta Crema Spread */
  .cream-spread-card {
    position: relative;
    width: 100%;
    background-color: #FFF9DC; /* Crema C7.03 */
    border: 4px solid #D4A94E; /* Filigrana Dorada C7.03 */
    border-radius: 1.75rem;
    padding: 2rem;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(212, 169, 78, 0.15);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    min-height: 480px;
  }

  /* Filigrana Dorada SVG en las Esquinas */
  .filigree-corner {
    position: absolute;
    width: 50px;
    height: 50px;
    pointer-events: none;
  }

  .filigree-top-left {
    top: 8px;
    left: 8px;
  }

  .filigree-top-right {
    top: 8px;
    right: 8px;
    transform: scaleX(-1);
  }

  .filigree-bottom-left {
    bottom: 8px;
    left: 8px;
    transform: scaleY(-1);
  }

  .filigree-bottom-right {
    bottom: 8px;
    right: 8px;
    transform: scale(-1, -1);
  }

  .scene-container {
    width: 100%;
    max-height: 380px;
    border-radius: 1.25rem;
    overflow: hidden;
    background-color: #FFFFFF;
    box-shadow: 0 4px 12px rgba(58, 46, 42, 0.08);
  }

  .scene-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 220px;
    background-color: #FDF6EC;
    font-size: 3rem;
  }

  /* Texto de Cuerpo en Andika 24px */
  .text-andika-spread {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem 0.5rem;
  }

  .spread-body-text {
    margin: 0;
    font-family: var(--font-cuentos-cuerpo, Andika, 'Andika', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    font-size: 1.5rem; /* 24px */
    line-height: 1.65;
    color: #3A2E2A;
    font-weight: 500;
  }

  .karaoke-highlight {
    background-color: #FFE3B3;
    color: #3A2E2A;
    border-radius: 0.3rem;
    padding: 0 0.2rem;
    font-weight: 700;
  }

  /* Hint y Words Slots */
  .parent-hint-slot {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.75rem 1rem;
    background-color: rgba(212, 169, 78, 0.15);
    border-left: 4px solid #D4A94E;
    border-radius: 0.75rem;
    font-size: 0.95rem;
    color: #3A2E2A;
  }

  .words-vocab-slot {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    padding: 0.5rem 0.75rem;
    background-color: rgba(79, 182, 163, 0.15);
    border-radius: 0.75rem;
    font-size: 0.9rem;
  }

  .words-label {
    font-weight: 700;
    color: #3A2E2A;
  }

  .words-tags {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .vocab-tag {
    background-color: #4FB6A3;
    color: #FFFFFF;
    padding: 0.2rem 0.6rem;
    border-radius: 1rem;
    font-weight: 700;
    font-size: 0.85rem;
  }

  .quiz-spread-wrapper {
    width: 100%;
  }

  /* Barra de Navegación Inferior */
  .lector-bottom-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 900px;
    gap: 1rem;
    padding-top: 0.5rem;
  }

  /* Flechas Grandes de Madera/Juguete >=56px */
  .nav-arrow-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 56px;
    min-height: 56px;
    width: 56px;
    height: 56px;
    background-color: #FF9F43; /* Mango C7.03 */
    color: #FFFFFF;
    border: 3px solid #3A2E2A;
    border-radius: 1.25rem;
    cursor: pointer;
    box-shadow: 0 6px 0 #3A2E2A;
    transition: transform 0.15s ease, background-color 0.2s ease, opacity 0.2s ease;
  }

  .nav-arrow-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    background-color: #f08e33;
  }

  .nav-arrow-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  /* Dots Pagination */
  .dots-pagination {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.5rem 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 2rem;
    border: 1.5px solid rgba(212, 169, 78, 0.3);
    backdrop-filter: blur(4px);
  }

  .dot-item {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: rgba(255, 249, 220, 0.4);
    border: 2px solid #FFF9DC;
    cursor: pointer;
    padding: 0;
    transition: transform 0.2s ease, background-color 0.2s ease;
  }

  .dot-item.active {
    background-color: #FF9F43;
    border-color: #FFF9DC;
    transform: scale(1.4);
    box-shadow: 0 0 8px rgba(255, 159, 67, 0.8);
  }

  .quiz-dot {
    width: auto;
    height: auto;
    background: transparent;
    border: none;
    font-size: 1.1rem;
    line-height: 1;
    border-radius: 0;
  }

  @media (max-width: 640px) {
    .cream-spread-card {
      padding: 1.25rem;
      border-radius: 1.25rem;
    }

    .spread-body-text {
      font-size: 1.25rem; /* ~20px en movil */
      line-height: 1.5;
    }

    .filigree-corner {
      width: 36px;
      height: 36px;
    }

    .dots-pagination {
      gap: 0.4rem;
      padding: 0.4rem 0.75rem;
    }

    .dot-item {
      width: 10px;
      height: 10px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-arrow-btn,
    .dot-item {
      transition: none !important;
      transform: none !important;
      animation: none !important;
    }
  }
</style>
