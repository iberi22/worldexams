<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. -->
<script lang="ts">
  import type { QuizPregunta, QuizOpcion } from '../../../lib/cuentos/cuento-schema';

  interface Props {
    quiz: readonly QuizPregunta[] | QuizPregunta[];
    explicacion?: string;
    onComplete?: (score: { total: number; correctFirstTry: number }) => void;
  }

  let { quiz = [], explicacion = '', onComplete }: Props = $props();

  let currentIndex = $state(0);
  let selectedOptionIndex = $state<number | null>(null);
  let feedbackMessage = $state('');
  let isCorrect = $state(false);
  let attemptsCount = $state<number[]>([]);
  let firstTryCorrect = $state<boolean[]>([]);
  let isFinished = $state(false);

  // Initialize tracking state when quiz changes or mounts
  $effect(() => {
    if (quiz.length > 0 && attemptsCount.length !== quiz.length) {
      attemptsCount = new Array(quiz.length).fill(0);
      firstTryCorrect = new Array(quiz.length).fill(false);
    }
  });

  const currentQuestion = $derived(
    quiz.length > 0 && currentIndex < quiz.length ? quiz[currentIndex] : null
  );

  function handleSelectOption(optIndex: number) {
    if (!currentQuestion || isFinished) return;

    const option = currentQuestion.opciones[optIndex];
    if (!option) return;

    selectedOptionIndex = optIndex;

    if (attemptsCount[currentIndex] === 0 && option.correcta) {
      firstTryCorrect[currentIndex] = true;
    }

    attemptsCount[currentIndex] += 1;

    if (option.correcta) {
      isCorrect = true;
      feedbackMessage = option.feedback || '¡Muy bien!';
    } else {
      isCorrect = false;
      feedbackMessage = option.feedback || '¡Casi, intenta otra vez!';
    }
  }

  function handleNextQuestion() {
    if (!isCorrect) return;

    if (currentIndex + 1 < quiz.length) {
      currentIndex += 1;
      selectedOptionIndex = null;
      feedbackMessage = '';
      isCorrect = false;
    } else {
      isFinished = true;
      const correctFirstTryCount = firstTryCorrect.filter(Boolean).length;
      if (onComplete) {
        onComplete({
          total: quiz.length,
          correctFirstTry: correctFirstTryCount
        });
      }
    }
  }

  function handleRestart() {
    currentIndex = 0;
    selectedOptionIndex = null;
    feedbackMessage = '';
    isCorrect = false;
    isFinished = false;
    attemptsCount = new Array(quiz.length).fill(0);
    firstTryCorrect = new Array(quiz.length).fill(false);
  }
</script>

<div class="quiz-container cuentos-theme-root" aria-label="Quiz del cuento">
  <!-- Progress Header -->
  <header class="quiz-header">
    <h2 class="quiz-title">
      {#if isFinished}
        🎉 ¡Preguntas completadas!
      {:else}
        Pregunta {currentIndex + 1} de {quiz.length}
      {/if}
    </h2>

    <div class="progress-dots" role="group" aria-label="Progreso del quiz">
      {#each quiz as _, idx}
        <span
          class="dot"
          class:active={idx === currentIndex && !isFinished}
          class:completed={idx < currentIndex || isFinished}
          aria-label="Pregunta {idx + 1} {idx < currentIndex || isFinished ? 'completada' : idx === currentIndex ? 'actual' : 'pendiente'}"
        >
          {#if idx < currentIndex || isFinished}
            ✓
          {:else}
            {idx + 1}
          {/if}
        </span>
      {/each}
    </div>
  </header>

  {#if !isFinished && currentQuestion}
    <!-- Active Question Body -->
    <main class="question-card cuento-aparece">
      <p class="question-text">{currentQuestion.texto}</p>

      <div class="options-grid" role="radiogroup" aria-label="Opciones de respuesta">
        {#each currentQuestion.opciones as opcion, idx}
          {@const isSelected = selectedOptionIndex === idx}
          {@const optionState = isSelected ? (isCorrect ? 'correct' : 'wrong') : 'idle'}

          <button
            type="button"
            class="option-btn option-{idx} {optionState === 'correct' ? 'cuento-quiz-correcta' : ''} {optionState === 'wrong' ? 'cuento-quiz-incorrecta' : ''}"
            class:selected={isSelected}
            aria-pressed={isSelected}
            aria-label="Opción {opcion.letra}: {opcion.texto}"
            onclick={() => handleSelectOption(idx)}
          >
            <!-- Face Button SVG Icon -->
            <span class="face-icon" aria-hidden="true">
              {#if idx === 0}
                <!-- Happy Face SVG (Mango/Joy #FF9F43) -->
                <svg viewBox="0 0 48 48" width="40" height="40">
                  <circle cx="24" cy="24" r="21" fill="#FF9F43" stroke="#3A2E2A" stroke-width="3" />
                  <!-- Eyes -->
                  <circle cx="16" cy="18" r="4" fill="#FFFFFF" />
                  <circle cx="16" cy="18" r="2" fill="#3A2E2A" />
                  <circle cx="17" cy="17" r="0.8" fill="#FFFFFF" />
                  <circle cx="32" cy="18" r="4" fill="#FFFFFF" />
                  <circle cx="32" cy="18" r="2" fill="#3A2E2A" />
                  <circle cx="33" cy="17" r="0.8" fill="#FFFFFF" />
                  <!-- Smile -->
                  <path d="M 15 28 Q 24 38 33 28" fill="none" stroke="#3A2E2A" stroke-width="3" stroke-linecap="round" />
                </svg>
              {:else if idx === 1}
                <!-- Thinking/Curious Face SVG (Water Green/Calm #4FB6A3) -->
                <svg viewBox="0 0 48 48" width="40" height="40">
                  <circle cx="24" cy="24" r="21" fill="#4FB6A3" stroke="#3A2E2A" stroke-width="3" />
                  <!-- Eyes looking up/side -->
                  <circle cx="16" cy="18" r="4" fill="#FFFFFF" />
                  <circle cx="17" cy="16" r="2" fill="#3A2E2A" />
                  <circle cx="18" cy="15" r="0.8" fill="#FFFFFF" />
                  <circle cx="32" cy="18" r="4" fill="#FFFFFF" />
                  <circle cx="33" cy="16" r="2" fill="#3A2E2A" />
                  <circle cx="34" cy="15" r="0.8" fill="#FFFFFF" />
                  <!-- Curious mouth -->
                  <path d="M 18 30 Q 24 27 30 30" fill="none" stroke="#3A2E2A" stroke-width="3" stroke-linecap="round" />
                </svg>
              {:else}
                <!-- Friendly Neutral Face SVG (Comet/Magic #5B6FD6) -->
                <svg viewBox="0 0 48 48" width="40" height="40">
                  <circle cx="24" cy="24" r="21" fill="#5B6FD6" stroke="#3A2E2A" stroke-width="3" />
                  <!-- Eyes -->
                  <circle cx="16" cy="18" r="4" fill="#FFFFFF" />
                  <circle cx="16" cy="18" r="2" fill="#3A2E2A" />
                  <circle cx="17" cy="17" r="0.8" fill="#FFFFFF" />
                  <circle cx="32" cy="18" r="4" fill="#FFFFFF" />
                  <circle cx="32" cy="18" r="2" fill="#3A2E2A" />
                  <circle cx="33" cy="17" r="0.8" fill="#FFFFFF" />
                  <!-- Friendly line mouth -->
                  <path d="M 17 30 Q 24 33 31 30" fill="none" stroke="#3A2E2A" stroke-width="3" stroke-linecap="round" />
                </svg>
              {/if}
            </span>

            <span class="option-badge">{opcion.letra}</span>
            <span class="option-text">{opcion.texto}</span>
          </button>
        {/each}
      </div>

      <!-- Feedback Banner -->
      {#if feedbackMessage}
        <div
          class="feedback-banner {isCorrect ? 'feedback-correct cuento-bote' : 'feedback-wrong cuento-meneo'}"
          role="status"
          aria-live="polite"
        >
          <span class="feedback-icon">{isCorrect ? '🌟' : '💡'}</span>
          <p class="feedback-text">{feedbackMessage}</p>
        </div>
      {/if}

      <!-- Advance Action -->
      {#if isCorrect}
        <div class="action-footer">
          <button
            type="button"
            class="next-btn cuento-respira"
            onclick={handleNextQuestion}
          >
            {currentIndex + 1 < quiz.length ? 'Siguiente pregunta ➔' : 'Ver resultado 🎉'}
          </button>
        </div>
      {/if}
    </main>
  {:else if isFinished}
    <!-- Celebration Final Screen -->
    <main class="celebration-card cuento-aparece">
      <div class="celebration-badge cuento-bote">
        <svg viewBox="0 0 80 80" width="80" height="80">
          <circle cx="40" cy="40" r="36" fill="#FF9F43" stroke="#3A2E2A" stroke-width="4" />
          <!-- Big happy celebration eyes -->
          <circle cx="28" cy="30" r="6" fill="#FFFFFF" />
          <circle cx="28" cy="30" r="3" fill="#3A2E2A" />
          <circle cx="30" cy="28" r="1.2" fill="#FFFFFF" />
          <circle cx="52" cy="30" r="6" fill="#FFFFFF" />
          <circle cx="52" cy="30" r="3" fill="#3A2E2A" />
          <circle cx="54" cy="28" r="1.2" fill="#FFFFFF" />
          <!-- Starry cheeks -->
          <path d="M 22 46 L 24 50 L 28 50 L 25 53 L 26 57 L 22 54 L 18 57 L 19 53 L 16 50 L 20 50 Z" fill="#E26D5A" />
          <path d="M 58 46 L 60 50 L 64 50 L 61 53 L 62 57 L 58 54 L 54 57 L 55 53 L 52 50 L 56 50 Z" fill="#E26D5A" />
          <!-- Wide Smile -->
          <path d="M 22 42 Q 40 60 58 42" fill="none" stroke="#3A2E2A" stroke-width="4" stroke-linecap="round" />
        </svg>
      </div>

      <h3 class="celebration-title">¡Lo hiciste de maravilla!</h3>
      <p class="celebration-subtitle">
        Respondiste correctamente las {quiz.length} preguntas.
      </p>

      {#if explicacion}
        <div class="moraleja-box">
          <span class="moraleja-icon">💬</span>
          <div class="moraleja-content">
            <strong>Para conversar en familia:</strong>
            <p>{explicacion}</p>
          </div>
        </div>
      {/if}

      <button type="button" class="restart-btn" onclick={handleRestart}>
        🔄 Volver a intentar
      </button>
    </main>
  {/if}
</div>

<style>
  .quiz-container {
    background-color: var(--cuento-bg-hueso, #FDF6EC);
    color: var(--cuento-tinta, #3A2E2A);
    border: 3px solid var(--cuento-tinta, #3A2E2A);
    border-radius: 1.5rem;
    padding: 1.5rem;
    max-width: 640px;
    margin: 1.5rem auto;
    box-shadow: 0 8px 0 var(--cuento-tinta, #3A2E2A);
    box-sizing: border-box;
  }

  .quiz-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    border-bottom: 2px dashed rgba(58, 46, 42, 0.2);
    padding-bottom: 1rem;
  }

  .quiz-title {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 800;
    text-align: center;
    color: var(--cuento-tinta, #3A2E2A);
  }

  .progress-dots {
    display: flex;
    gap: 0.75rem;
  }

  .dot {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    border: 2px solid var(--cuento-tinta, #3A2E2A);
    background-color: #FFFFFF;
    color: var(--cuento-tinta, #3A2E2A);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.95rem;
    transition: all 0.2s ease;
  }

  .dot.active {
    background-color: var(--cuento-mango, #FF9F43);
    color: #FFFFFF;
    transform: scale(1.15);
    box-shadow: 0 3px 0 var(--cuento-tinta, #3A2E2A);
  }

  .dot.completed {
    background-color: var(--cuento-agua, #4FB6A3);
    color: #FFFFFF;
  }

  .question-card {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .question-text {
    font-size: 1.25rem;
    line-height: 1.6;
    font-weight: 700;
    margin: 0;
    text-align: center;
  }

  .options-grid {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .option-btn {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-height: 54px;
    padding: 0.75rem 1rem;
    background-color: #FFFFFF;
    border: 2.5px solid var(--cuento-tinta, #3A2E2A);
    border-radius: 1rem;
    color: var(--cuento-tinta, #3A2E2A);
    font-size: 1.1rem;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    box-shadow: 0 4px 0 var(--cuento-tinta, #3A2E2A);
    transition: transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
  }

  .option-btn:hover {
    transform: translateY(-2px);
    background-color: #FFFDF9;
  }

  .option-btn:focus-visible {
    outline: 3px solid var(--cuento-cometa, #5B6FD6);
    outline-offset: 3px;
  }

  .option-btn.selected.option-0 {
    border-color: var(--cuento-mango, #FF9F43);
  }

  .option-btn.selected.option-1 {
    border-color: var(--cuento-agua, #4FB6A3);
  }

  .option-btn.selected.option-2 {
    border-color: var(--cuento-cometa, #5B6FD6);
  }

  .face-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .option-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background-color: var(--cuento-bg-hueso, #FDF6EC);
    border: 2px solid var(--cuento-tinta, #3A2E2A);
    border-radius: 50%;
    font-weight: 800;
    font-size: 0.95rem;
    flex-shrink: 0;
  }

  .option-text {
    flex: 1;
    line-height: 1.4;
  }

  .feedback-banner {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1rem;
    border-radius: 1rem;
    border: 2px solid var(--cuento-tinta, #3A2E2A);
    box-shadow: 0 4px 0 var(--cuento-tinta, #3A2E2A);
  }

  .feedback-banner.feedback-correct {
    background-color: rgba(79, 182, 163, 0.2);
    border-color: var(--cuento-agua, #4FB6A3);
  }

  .feedback-banner.feedback-wrong {
    background-color: rgba(226, 109, 90, 0.2);
    border-color: var(--cuento-terracota, #E26D5A);
  }

  .feedback-icon {
    font-size: 1.75rem;
    flex-shrink: 0;
  }

  .feedback-text {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 700;
    line-height: 1.4;
  }

  .action-footer {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .next-btn {
    min-height: 50px;
    padding: 0.85rem 1.75rem;
    background-color: var(--cuento-mango, #FF9F43);
    color: #FFFFFF;
    border: 2.5px solid var(--cuento-tinta, #3A2E2A);
    border-radius: 1rem;
    font-size: 1.15rem;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 5px 0 var(--cuento-tinta, #3A2E2A);
    transition: transform 0.15s ease, background-color 0.15s ease;
  }

  .next-btn:hover {
    background-color: #FF8F26;
    transform: translateY(-2px);
  }

  .celebration-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.25rem;
    padding: 1rem 0;
  }

  .celebration-badge {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .celebration-title {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--cuento-tinta, #3A2E2A);
  }

  .celebration-subtitle {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 600;
  }

  .moraleja-box {
    display: flex;
    gap: 1rem;
    padding: 1.1rem;
    background-color: #FFFFFF;
    border: 2px solid var(--cuento-tinta, #3A2E2A);
    border-radius: 1rem;
    text-align: left;
    box-shadow: 0 4px 0 var(--cuento-tinta, #3A2E2A);
  }

  .moraleja-icon {
    font-size: 1.75rem;
    flex-shrink: 0;
  }

  .moraleja-content strong {
    display: block;
    font-size: 1rem;
    color: var(--cuento-mango, #FF9F43);
    margin-bottom: 0.35rem;
  }

  .moraleja-content p {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.5;
  }

  .restart-btn {
    min-height: 48px;
    padding: 0.75rem 1.5rem;
    background-color: #FFFFFF;
    border: 2.5px solid var(--cuento-tinta, #3A2E2A);
    border-radius: 1rem;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--cuento-tinta, #3A2E2A);
    cursor: pointer;
    box-shadow: 0 4px 0 var(--cuento-tinta, #3A2E2A);
    transition: transform 0.15s ease;
  }

  .restart-btn:hover {
    transform: translateY(-2px);
    background-color: #FFFDF9;
  }

  @media (prefers-reduced-motion: reduce) {
    .cuento-bote,
    .cuento-meneo,
    .cuento-aparece,
    .cuento-respira,
    .cuento-quiz-correcta,
    .cuento-quiz-incorrecta {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
</style>
