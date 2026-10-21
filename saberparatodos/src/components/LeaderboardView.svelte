<script lang="ts">
  import RankedLeaderboard from "./leaderboard/RankedLeaderboard.svelte";

  // Props
  export let onBack: () => void;
  export let onRegister: (() => void) | null = null;
</script>

<div class="w-full max-w-4xl mx-auto p-4 animate-fade-in-up pb-20">
  <RankedLeaderboard />

  <div class="flex justify-end mt-6">
    <button
      on:click={onBack}
      class="px-4 py-2 border border-white/20 hover:bg-white/10 rounded-lg
             transition-colors uppercase text-xs tracking-widest
             opacity-60 hover:opacity-100"
    >
      [ Volver ]
    </button>
  </div>

  {#if onRegister}
    <div class="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="text-2xl">🎭</span>
          <div>
            <p class="text-sm font-bold text-blue-300">¿Quieres aparecer aquí?</p>
            <p class="text-xs text-white/60">Crea tu identidad anónima para guardar tus puntajes</p>
          </div>
        </div>
        <button
          on:click={onRegister}
          class="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30
                 border border-blue-500/50 rounded-lg text-blue-300
                 text-xs uppercase tracking-widest transition-colors shrink-0"
        >
          Crear ID
        </button>
      </div>
    </div>
  {/if}
</div>
