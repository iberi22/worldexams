<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { calculateLocalMMR, generateShareText, type MMRStats } from '../lib/mmr-service';

  export let onClose: () => void;

  let stats: MMRStats | null = null;
  let loading = true;
  let copied = false;

  onMount(async () => {
    try {
      // Simulate "Analysing" delay for dramatic effect
      setTimeout(async () => {
        stats = await calculateLocalMMR();
        loading = false;
      }, 800);
    } catch (e) {
      console.error(e);
      loading = false;
    }
  });

  async function shareProgress() {
    if (!stats) return;

    const text = generateShareText(stats);

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Progreso WorldExams',
          text: text,
          url: 'https://saberparatodos.space'
        });
      } catch (err) {
        // Fallback to clipboard if share deemed 'aborted' or failed
        copyToClipboard(text);
      }
    } else {
      copyToClipboard(text);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      copied = true;
      setTimeout(() => copied = false, 2000);
    });
  }
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" transition:fade>
  <div class="w-full max-w-lg relative">

    <!-- Pattern Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl blur-xl"></div>

    <div class="bg-[#121212] border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">

      <!-- Close Button -->
      <button
        on:click={onClose}
        class="absolute top-4 right-4 p-2 text-white/40 hover:text-white z-10 transition-colors"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {#if loading}
        <div class="p-12 flex flex-col items-center justify-center space-y-4">
          <div class="relative w-20 h-20">
            <div class="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
            <div class="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p class="text-emerald-400 font-bold uppercase tracking-widest text-sm animate-pulse">
            Calibrando Nivel...
          </p>
        </div>
      {:else if stats}
        <!-- Profile Header -->
        <div class="p-8 pb-0 text-center space-y-2">
          <div class="inline-block px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
            Perfil Offline
          </div>

          <h2 class={`text-4xl sm:text-5xl font-bold uppercase tracking-tighter ${stats.rankColor} drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
            {stats.rank}
          </h2>
          <div class="flex justify-center items-center gap-2 opacity-60">
            <span class="text-xl font-mono">{stats.mmr}</span>
            <span class="text-xs uppercase tracking-widest">MMR</span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="px-8 py-6 space-y-2">
          <div class="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60">
            <span>Progreso</span>
            <span>{stats.nextRank}</span>
          </div>
          <div class="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
            <div
              class="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-1000 ease-out relative overflow-hidden"
              style="width: {stats.progressToNext}%"
            >
              <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <p class="text-[10px] text-center opacity-40">
            Sigue practicando para subir de rango. La consistencia es clave.
          </p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 gap-px bg-white/5 border-y border-white/5">
          <div class="p-6 text-center bg-[#121212] hover:bg-white/5 transition-colors">
            <div class="text-2xl font-bold text-white mb-1">{stats.totalExams}</div>
            <div class="text-[10px] uppercase tracking-widest text-white/40">Exámenes</div>
          </div>
          <div class="p-6 text-center bg-[#121212] hover:bg-white/5 transition-colors">
            <div class="text-2xl font-bold text-emerald-400 mb-1">{stats.avgAccuracy}%</div>
            <div class="text-[10px] uppercase tracking-widest text-white/40">Precisión Avg</div>
          </div>
          <div class="p-6 text-center bg-[#121212] hover:bg-white/5 transition-colors col-span-2">
            <div class="text-lg font-bold text-teal-400 mb-1 line-clamp-1">{stats.strongestSubject}</div>
            <div class="text-[10px] uppercase tracking-widest text-white/40">Mejor Área</div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-8">
          <button
            on:click={shareProgress}
            class="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold uppercase tracking-widest text-sm rounded-xl shadow-lg shadow-emerald-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {#if copied}
              <span>✅ Copiado</span>
            {:else}
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Compartir Estadísticas</span>
            {/if}
          </button>
        </div>

      {/if}
    </div>
  </div>
</div>
