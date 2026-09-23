<script lang="ts">
  // LigaPanel.svelte — Panel de clasificación y divisiones de Liga
</script>

<div class="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
  <div class="flex items-center justify-between">
    <h2 class="text-xl font-bold text-white">Clasificación de Liga</h2>
    <span class="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-mono">
      Semana activa
    </span>
  </div>
  <p class="text-sm text-white/70">
    Los mejores 5 jugadores ascienden a la siguiente división al finalizar la semana.
  </p>
  <div class="space-y-2 pt-2">
    <div class="p-3 bg-black/20 rounded-xl border border-white/5 flex items-center justify-between text-sm">
      <div class="flex items-center gap-3">
        <span class="text-amber-400 font-bold">1</span>
        <span class="text-white/80">wx-jugador-top</span>
      </div>
      <span class="font-mono text-emerald-400">1,250 pts</span>
    </div>
  </div>
</div>
