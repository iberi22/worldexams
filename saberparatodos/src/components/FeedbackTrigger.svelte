<script lang="ts">
  import ReportModal from './ReportModal.svelte';
  import { fade, fly } from 'svelte/transition';

  interface Props {
    label?: string;
    description?: string;
    icon?: string;
    variant?: 'button' | 'card';
    userContext?: string;
  }

  let {
    label = 'Enviar Feedback',
    description = 'Cuéntanos qué piensas o reporta un problema.',
    icon = '💬',
    variant = 'button',
    userContext = 'FeedbackTrigger'
  }: Props = $props();

  let showModal = $state(false);
</script>

{#if variant === 'button'}
  <button
    onclick={() => showModal = true}
    class="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-[#F5F5DC] font-semibold rounded-lg hover:bg-white/5 transition-all active:scale-95 group"
  >
    <span class="group-hover:scale-110 transition-transform">{icon}</span>
    {label}
  </button>
{:else}
  <button
    onclick={() => showModal = true}
    class="w-full text-left bg-[#1a1a1a] border border-white/10 rounded-xl p-6 hover:border-emerald-500/50 hover:bg-emerald-500/[0.02] transition-all group relative overflow-hidden"
  >
    <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity text-4xl">
      {icon}
    </div>
    <div class="relative z-10">
      <div class="text-2xl mb-2">{icon}</div>
      <h3 class="text-lg font-bold mb-1 group-hover:text-emerald-400 transition-colors">{label}</h3>
      <p class="text-sm text-white/50 leading-relaxed">{description}</p>
      <div class="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-500/70 uppercase tracking-widest">
        <span>Abrir formulario</span>
        <svg class="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  </button>
{/if}

{#if showModal}
  <ReportModal
    show={showModal}
    onClose={() => showModal = false}
    questionId={null}
    userContext={userContext}
  />
{/if}
