<script lang="ts">
  import MathRenderer from '../MathRenderer.svelte';
  import { evaluateChoice, isCorrectOption, type PracticeQuestion } from '../../lib/banco/practice';

  interface Props {
    question: PracticeQuestion & { id: string | number; explanation?: string };
  }

  let { question }: Props = $props();

  // Estado de práctica: la respuesta permanece oculta hasta elegir o revelar.
  let chosenId = $state<string | null>(null);
  let revealed = $state(false);
  let focusIndex = $state(0);
  let optionButtons: HTMLButtonElement[] = $state([]);

  const options = $derived(question.options || []);
  const result = $derived(chosenId ? evaluateChoice(question, chosenId) : null);
  const showAnswer = $derived(revealed || chosenId !== null);

  function choose(optionId: string) {
    if (showAnswer) return;
    chosenId = optionId;
  }

  function reveal() {
    revealed = true;
  }

  function retry() {
    chosenId = null;
    revealed = false;
    focusIndex = 0;
    optionButtons[0]?.focus();
  }

  function handleOptionKeydown(event: KeyboardEvent, index: number) {
    const count = options.length;
    if (count === 0) return;
    let next = -1;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % count;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + count) % count;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = count - 1;
    if (next >= 0) {
      event.preventDefault();
      focusIndex = next;
      optionButtons[next]?.focus();
    }
  }

  function optionState(optionId: string): 'neutral' | 'correct' | 'wrong' | 'dimmed' {
    if (!showAnswer) return 'neutral';
    if (isCorrectOption(question, optionId)) return 'correct';
    if (chosenId === optionId) return 'wrong';
    return 'dimmed';
  }

  const optionClasses: Record<string, string> = {
    neutral: 'bg-white/5 border-white/10 hover:border-emerald-500/50 hover:bg-white/10 cursor-pointer',
    correct: 'bg-emerald-500/10 border-emerald-500/40',
    wrong: 'bg-red-500/10 border-red-500/40',
    dimmed: 'bg-white/5 border-transparent opacity-60',
  };
</script>

<div class="bg-black/30 border border-white/10 p-5 rounded-xl space-y-4">
  <div class="flex items-center justify-between gap-3">
    <h3 id="banco-options-label-{question.id}" class="text-xs font-bold uppercase tracking-widest text-white/40">
      Elige tu respuesta
    </h3>
    {#if !showAnswer}
      <button
        type="button"
        onclick={reveal}
        class="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
        data-testid="banco-reveal"
      >
        Mostrar respuesta
      </button>
    {:else}
      <button
        type="button"
        onclick={retry}
        class="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
        data-testid="banco-retry"
      >
        Intentar de nuevo
      </button>
    {/if}
  </div>

  <div role="radiogroup" aria-labelledby="banco-options-label-{question.id}" class="space-y-3">
    {#each options as option, index (option.id)}
      {@const state = optionState(option.id)}
      <button
        type="button"
        role="radio"
        aria-checked={chosenId === option.id}
        aria-disabled={showAnswer}
        tabindex={index === focusIndex ? 0 : -1}
        bind:this={optionButtons[index]}
        onclick={() => { focusIndex = index; choose(option.id); }}
        onkeydown={(e) => handleOptionKeydown(e, index)}
        class="w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 {optionClasses[state]}"
        data-testid="banco-option"
        data-option-id={option.id}
        data-state={state}
      >
        <span class="font-bold text-lg {state === 'correct' ? 'text-emerald-400' : state === 'wrong' ? 'text-red-400' : 'text-white/40'}">
          {option.id})
        </span>
        <span class="flex-1 {state === 'correct' ? 'text-emerald-300' : state === 'wrong' ? 'text-red-300' : 'text-white/80'}">
          <MathRenderer content={option.text || ''} />
        </span>
        {#if state === 'correct'}
          <span class="ml-auto text-emerald-400 text-xs uppercase tracking-widest shrink-0">✓ Correcta</span>
        {:else if state === 'wrong'}
          <span class="ml-auto text-red-400 text-xs uppercase tracking-widest shrink-0">✗ Tu respuesta</span>
        {/if}
      </button>
    {/each}
  </div>

  <div aria-live="polite" aria-atomic="true" data-testid="banco-result">
    {#if result}
      <div class="p-4 rounded-lg border {result.isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}">
        <p class="font-bold {result.isCorrect ? 'text-emerald-400' : 'text-red-400'}">
          {result.isCorrect ? '¡Correcto!' : `Incorrecto. La respuesta correcta es la ${result.correctOptionId}.`}
        </p>
        {#if result.feedback}
          <div class="mt-2 text-sm text-white/80" data-testid="banco-feedback">
            <MathRenderer content={result.feedback} />
          </div>
        {/if}
      </div>
    {:else if revealed}
      <p class="p-4 rounded-lg border bg-emerald-500/10 border-emerald-500/30 font-bold text-emerald-400">
        Respuesta correcta: {String(question.correctOptionId || '').toUpperCase()}
      </p>
    {/if}
  </div>

  {#if showAnswer && question.explanation}
    <div class="bg-indigo-500/10 border border-indigo-500/20 p-5 rounded-xl" data-testid="banco-explanation">
      <h3 class="text-sm font-bold text-indigo-400 mb-3 flex items-center gap-2">
        <span aria-hidden="true">💡</span> Explicación
      </h3>
      <div class="text-white/80 leading-relaxed whitespace-pre-line">
        <MathRenderer content={question.explanation} />
      </div>
    </div>
  {/if}
</div>
