<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { t } from '../lib/i18n';

  interface Step {
    id: string;
    title: string;
    body: string;
    href?: string;
  }

  let { ondismiss }: { ondismiss?: () => void } = $props();

  const steps: Step[] = [
    {
      id: 'step-1',
      title: t('onboarding.step1.title'),
      body: t('onboarding.step1.body')
    },
    {
      id: 'step-2',
      title: t('onboarding.step2.title'),
      body: t('onboarding.step2.body')
    },
    {
      id: 'step-3',
      title: t('onboarding.step3.title'),
      body: t('onboarding.step3.body')
    },
    {
      id: 'step-4',
      title: t('onboarding.step4.title'),
      body: t('onboarding.step4.body'),
      href: '/ajustes/ia'
    },
    {
      id: 'step-5',
      title: t('onboarding.step5.title'),
      body: t('onboarding.step5.body')
    }
  ];

  let visible = $state(false);
  let currentStepIndex = $state(0);
  let dialogEl: HTMLElement | null = $state(null);
  let previouslyFocused: HTMLElement | null = null;

  function getFocusableElements(): HTMLElement[] {
    if (!dialogEl) return [];
    return Array.from(
      dialogEl.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  onMount(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        const seen = localStorage.getItem('worldexams_onboarding_seen');
        if (seen !== 'true') {
          previouslyFocused = (typeof document !== 'undefined' ? document.activeElement : null) as HTMLElement | null;
          const timer = setTimeout(async () => {
            visible = true;
            await tick();
            const focusables = getFocusableElements();
            if (focusables.length > 0) {
              focusables[0].focus();
            }
          }, 500);
          return () => clearTimeout(timer);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  });

  function dismiss() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('worldexams_onboarding_seen', 'true');
      }
    } catch {
      // Ignore localStorage errors
    }
    visible = false;
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
      previouslyFocused.focus();
    }
    ondismiss?.();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      dismiss();
      return;
    }

    if (event.key === 'Tab') {
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
  }

  function next() {
    if (currentStepIndex < steps.length - 1) {
      currentStepIndex++;
    } else {
      dismiss();
    }
  }

  function prev() {
    if (currentStepIndex > 0) {
      currentStepIndex--;
    }
  }
</script>

<svelte:window onkeydown={visible ? handleKeydown : undefined} />

{#if visible}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class="fixed inset-0 z-[250] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="onboarding-title"
    aria-describedby="onboarding-body"
    data-testid="onboarding-flow"
    transition:fade={{ duration: 200 }}
  >
    <div
      bind:this={dialogEl}
      class="relative w-full max-w-md bg-[#1a1a1a] border border-emerald-500/20 rounded-xl shadow-2xl overflow-hidden"
      transition:fly={{ y: 20, duration: 400 }}
      role="document"
    >
      <!-- Header / Progress -->
      <div class="px-6 pt-6 pb-2 flex items-center justify-between">
        <h2 id="onboarding-title" class="text-emerald-400 font-bold text-sm uppercase tracking-wider">
          {steps[currentStepIndex].title}
        </h2>
        <div class="flex gap-1.5" aria-label="Progreso">
          {#each steps as _, idx}
            <div
              class="h-1.5 rounded-full transition-all duration-300 {idx === currentStepIndex ? 'w-4 bg-emerald-500' : 'w-1.5 bg-white/20'}"
            ></div>
          {/each}
        </div>
      </div>

      <!-- Body -->
      <div class="px-6 py-4 min-h-[100px]">
        <p id="onboarding-body" class="text-sm text-white/80 leading-relaxed">
          {steps[currentStepIndex].body}
          {#if steps[currentStepIndex].href}
             <a href={steps[currentStepIndex].href} class="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 ml-1" target="_blank" rel="noopener noreferrer">
               Ver Ajustes IA
             </a>
          {/if}
        </p>
      </div>

      <!-- Footer / Actions -->
      <div class="px-6 py-4 bg-black/40 border-t border-white/5 flex items-center justify-between gap-3">
        <button
          onclick={dismiss}
          class="px-3 py-2 text-xs font-bold text-white/40 hover:text-white uppercase tracking-wider transition-colors"
        >
          {t('onboarding.skip')}
        </button>

        <div class="flex gap-2">
          {#if currentStepIndex > 0}
            <button
              onclick={prev}
              class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-md border border-white/10 transition-all active:scale-95"
            >
              {t('onboarding.prev')}
            </button>
          {/if}
          <button
            onclick={next}
            class="px-5 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold text-xs uppercase tracking-widest rounded-md border border-emerald-500/20 transition-all active:scale-95"
          >
            {currentStepIndex === steps.length - 1 ? t('onboarding.start') : t('onboarding.next')}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
