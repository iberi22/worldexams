<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import MenGuidelinesContent from './MenGuidelinesContent.svelte';

  let { onClose, grade = 11, subject = 'Matemáticas', period = 1 } = $props();
</script>

<div
  class="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
  transition:fade={{ duration: 200 }}
  onclick={(e) => { if (e.target === e.currentTarget) onClose(); }}
  role="presentation"
>
  <div
    class="bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] w-full max-w-lg max-h-[90vh] shadow-[0_0_80px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col"
    in:fly={{ y: 40, duration: 400, opacity: 0 }}
  >
    <!-- Background Accents -->
    <div class="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
    <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>

    <!-- Header / Close button -->
    <div class="flex items-center justify-end p-6 pb-0 relative z-10">
      <button 
        onclick={onClose} 
        class="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/50 hover:text-white transition-all hover:rotate-90"
        aria-label="Cerrar"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto custom-scrollbar p-6 pt-0 relative z-10">
      <MenGuidelinesContent {grade} {subject} {period} />
    </div>

    <!-- Footer decoration -->
    <div class="p-6 pt-2 text-center relative z-10">
       <div class="h-1.5 w-12 bg-white/5 rounded-full mx-auto"></div>
    </div>
  </div>
</div>

<style>
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
</style>
