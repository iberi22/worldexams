<script lang="ts">
  /**
   * ResultsView.svelte
   *
   * Displays exam results with detailed review of each question.
   * Simplified version without Supabase auth - stores results in localStorage.
   */
  import type { Question, UserAnswers, STORAGE_KEYS } from '../lib/types';
  import FlashlightCard from './FlashlightCard.svelte';

  interface Props {
    score: { score: number; total: number };
    questions: Question[];
    userAnswers: UserAnswers;
    countryName?: string;
    countryFlag?: string;
    onRestart?: () => void;
    onHome?: () => void;
  }

  let {
    score,
    questions,
    userAnswers,
    countryName = '',
    countryFlag = '🌍',
    onRestart,
    onHome,
  }: Props = $props();

  // Calculate percentage
  const percentage = $derived(Math.round((score.score / score.total) * 100));

  // Get performance message
  const performanceMessage = $derived(
    percentage >= 90 ? '¡Excelente! 🌟' :
    percentage >= 70 ? '¡Muy bien! 👏' :
    percentage >= 50 ? 'Buen intento 💪' :
    'Sigue practicando 📚'
  );

  // Get option text by id/letter
  function getOptionText(q: Question, optionId: string): string {
    const opt = q.options.find(o => o.id === optionId || o.letter === optionId);
    return opt ? opt.text : 'Sin respuesta';
  }

  // Check if answer is correct
  function isAnswerCorrect(q: Question, answer: string): boolean {
    const option = q.options.find(o => o.id === answer || o.letter === answer);
    return option?.isCorrect ?? false;
  }

  // Get correct option letter
  function getCorrectLetter(q: Question): string {
    const correct = q.options.find(o => o.isCorrect);
    return correct?.letter || correct?.id || '-';
  }

  // Navigate home
  function handleHome() {
    if (onHome) {
      onHome();
    } else {
      window.location.href = '/';
    }
  }

  // Restart exam
  function handleRestart() {
    if (onRestart) {
      onRestart();
    }
  }

  // Share Results
  async function shareResults() {
    const shareText = `📚 ${countryName}\n\n🏆 Mi puntaje: ${score.score}/${score.total} (${percentage}%)\n${performanceMessage}\n\nPrueba tus conocimientos en:\nhttps://worldexams.github.io`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Resultados - ${countryName}`,
          text: shareText,
          url: 'https://worldexams.github.io',
        });
      } catch (e) {
        console.log('Error sharing:', e);
      }
    } else {
      // Fallback copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        alert('¡Resultado copiado al portapapeles!');
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  }
</script>

<div class="min-h-screen w-full flex flex-col animate-fade-in">
  <!-- Main Content -->
  <div class="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
    <div class="max-w-4xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12 pb-24">

      <!-- Header Score -->
      <div class="text-center space-y-6">
        <div class="text-6xl mb-4">{countryFlag}</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tighter">
          {performanceMessage}
        </h2>
        {#if countryName}
          <p class="text-text-secondary">{countryName}</p>
        {/if}

        <!-- Circular Progress -->
        <div class="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <!-- Background Circle -->
            <circle
              class="text-white/5 stroke-current"
              stroke-width="6"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <!-- Progress Circle -->
            <circle
              class="text-accent-cyan transition-all duration-1000 ease-out stroke-current"
              stroke-width="6"
              stroke-linecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke-dasharray="251.2"
              stroke-dashoffset={251.2 - (251.2 * percentage) / 100}
            ></circle>
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">{percentage}%</span>
            <span class="text-[10px] sm:text-xs uppercase tracking-widest opacity-40 mt-1">Precisión</span>
          </div>
        </div>

        <p class="text-xs sm:text-sm uppercase tracking-widest opacity-60">
          {score.score} de {score.total} Correctas
        </p>

        <!-- Quick Summary Dots -->
        <div class="flex flex-wrap justify-center gap-2 mt-4">
          {#each questions as q, i}
            {@const isCorrect = isAnswerCorrect(q, userAnswers[q.id] || '')}
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors {isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}"
            >
              {i + 1}
            </div>
          {/each}
        </div>
      </div>

      <!-- Detailed Review -->
      <div class="space-y-4 sm:space-y-6">
        <h3 class="text-xl font-bold uppercase tracking-widest text-center opacity-60">
          Revisión Detallada
        </h3>

        {#each questions as q, i}
          {@const userAnswer = userAnswers[q.id] || ''}
          {@const isCorrect = isAnswerCorrect(q, userAnswer)}

          <div class={`
            border rounded-lg sm:rounded-xl overflow-hidden
            ${isCorrect ? 'border-emerald-500/30 bg-emerald-900/5' : 'border-red-500/30 bg-red-900/5'}
          `}>
            <!-- Question Header -->
            <div class="p-4 sm:p-5 lg:p-6 border-b border-white/5">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div class="space-y-2 flex-1">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold uppercase tracking-widest opacity-60">
                      Pregunta {i + 1}
                    </span>
                    <div class={`
                      px-2 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest border rounded
                      ${isCorrect ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : 'border-red-500 text-red-500 bg-red-500/10'}
                    `}>
                      {isCorrect ? '✓ Correcta' : '✗ Incorrecta'}
                    </div>
                  </div>
                  <h4 class="text-sm sm:text-base lg:text-lg font-normal leading-relaxed">
                    {@html q.content || q.text}
                  </h4>
                </div>
              </div>
            </div>

            <!-- Answers Section -->
            <div class="p-4 sm:p-5 lg:p-6 space-y-4">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <!-- User Answer -->
                <div class="p-3 sm:p-4 bg-bg-card/30 border border-white/5 rounded-lg">
                  <span class="block text-[10px] sm:text-xs uppercase tracking-widest opacity-40 mb-2">
                    Tu Respuesta
                  </span>
                  <div class="flex items-start gap-2 sm:gap-3">
                    <span class={`
                      font-bold text-sm sm:text-base shrink-0
                      ${isCorrect ? 'text-emerald-500' : 'text-red-500'}
                    `}>
                      {userAnswer || '-'}
                    </span>
                    <span class="opacity-80 text-xs sm:text-sm">
                      {userAnswer ? getOptionText(q, userAnswer) : 'Sin responder'}
                    </span>
                  </div>
                </div>

                <!-- Correct Answer (only if incorrect) -->
                {#if !isCorrect}
                  <div class="p-3 sm:p-4 bg-bg-card/30 border border-emerald-500/20 rounded-lg">
                    <span class="block text-[10px] sm:text-xs uppercase tracking-widest opacity-40 mb-2">
                      Respuesta Correcta
                    </span>
                    <div class="flex items-start gap-2 sm:gap-3">
                      <span class="font-bold text-emerald-500 text-sm sm:text-base shrink-0">
                        {getCorrectLetter(q)}
                      </span>
                      <span class="opacity-80 text-xs sm:text-sm">
                        {getOptionText(q, getCorrectLetter(q))}
                      </span>
                    </div>
                  </div>
                {/if}
              </div>

              <!-- Explanation -->
              {#if q.explanation}
                <div class="pt-4 border-t border-white/5">
                  <span class="block text-xs font-bold uppercase tracking-widest text-accent-cyan mb-2">
                    Explicación
                  </span>
                  <p class="text-xs sm:text-sm font-normal leading-relaxed opacity-80">
                    {@html q.explanation}
                  </p>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Fixed Footer Actions -->
  <div class="shrink-0 px-4 sm:px-6 lg:px-8 py-4 bg-bg-primary/95 backdrop-blur-md border-t border-white/10">
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
      {#if onRestart}
        <button
          onclick={handleRestart}
          class="px-6 py-3 bg-accent-cyan/20 border border-accent-cyan/50 text-accent-cyan hover:bg-accent-cyan hover:text-bg-primary transition-colors uppercase text-xs tracking-widest font-bold rounded-lg"
        >
          🔄 Intentar de Nuevo
        </button>
      {/if}
      <button
        onclick={shareResults}
        class="px-6 py-3 bg-accent-gold/20 border border-accent-gold/50 text-accent-gold hover:bg-accent-gold hover:text-bg-primary transition-colors uppercase text-xs tracking-widest font-bold rounded-lg"
      >
        📤 Compartir Resultado
      </button>
      <button
        onclick={handleHome}
        class="px-6 py-3 border border-white/20 hover:bg-white/10 transition-colors uppercase text-xs tracking-widest font-bold rounded-lg"
      >
        🌍 Volver al Inicio
      </button>
    </div>
  </div>
</div>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }
</style>
