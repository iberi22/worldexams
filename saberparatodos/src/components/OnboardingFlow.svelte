<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  interface Step {
    id: string;
    title: string;
    body: string;
    href?: string;
  }

  const steps: Step[] = [
    {
      id: 'step-1',
      title: 'Sin cuenta',
      body: 'La plataforma se usa sin registro y sin cuenta obligatoria; crear una cuenta es opcional.'
    },
    {
      id: 'step-2',
      title: 'Tu progreso vive en este dispositivo',
      body: 'Los resultados y el historial de práctica se guardan localmente para que la app siga funcionando sin conexión.'
    },
    {
      id: 'step-3',
      title: 'Caja fuerte cifrada local',
      body: 'Existe una caja fuerte cifrada (AES-256-GCM) que protege tus notas y progreso en este dispositivo. Ningún servidor los almacena.'
    },
    {
      id: 'step-4',
      title: 'IA en tu dispositivo',
      body: 'Modelos de IA locales, sin cuotas diarias y sin necesidad de cuenta. Puedes configurarlos en ajustes.',
      href: '/ajustes/ia'
    },
    {
      id: 'step-5',
      title: 'Protección del dispositivo',
      body: 'Próximamente: El navegador podrá usar la biometría o passkey de tu dispositivo para proteger tus datos locales. Esto todavía no bloquea la aplicación.'
    }
  ];

  let visible = $state(false);
  let currentStepIndex = $state(0);

  onMount(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        const seen = localStorage.getItem('worldexams_onboarding_seen');
        if (seen !== 'true') {
          setTimeout(() => {
            visible = true;
          }, 500);
        }
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  });

  function dismiss() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('worldexams_onboarding_seen', 'true');
      }
    } catch (e) {
      // Ignore
    }
    visible = false;
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

{#if visible && typeof localStorage !== 'undefined' && localStorage.getItem('worldexams_onboarding_seen') !== 'true'}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class="fixed inset-0 z-[250] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="onboarding-title"
    data-testid="onboarding-flow"
    transition:fade={{ duration: 200 }}
  >
    <div
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
        <p class="text-sm text-white/80 leading-relaxed">
          {steps[currentStepIndex].body}
          {#if steps[currentStepIndex].href}
             <a href={steps[currentStepIndex].href} class="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 ml-1" target="_blank">
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
          Saltar
        </button>

        <div class="flex gap-2">
          {#if currentStepIndex > 0}
            <button
              onclick={prev}
              class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-md border border-white/10 transition-all active:scale-95"
            >
              Anterior
            </button>
          {/if}
          <button
            onclick={next}
            class="px-5 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold text-xs uppercase tracking-widest rounded-md border border-emerald-500/20 transition-all active:scale-95"
          >
            {currentStepIndex === steps.length - 1 ? 'Empezar' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
