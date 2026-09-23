<script lang="ts">
  // ProgresoJuego.svelte — Panel de progreso principal de Juego
</script>

<div class="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
  <div class="flex items-center justify-between">
    <h2 class="text-xl font-bold text-white">Tu progreso en Juego</h2>
    <span class="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-mono">
      Nivel 1
    </span>
  </div>
  <p class="text-sm text-white/70">
    Completa desafíos diarios y compite en las ligas semanales para mejorar tu clasificación.
  </p>
  <div class="grid grid-cols-2 gap-4 pt-2">
    <div class="p-4 bg-black/20 rounded-xl border border-white/5">
      <div class="text-2xl font-bold text-emerald-400">0</div>
      <div class="text-xs text-white/50">Puntos Elo</div>
    </div>
    <div class="p-4 bg-black/20 rounded-xl border border-white/5">
      <div class="text-2xl font-bold text-amber-400">Bronce</div>
      <div class="text-xs text-white/50">División actual</div>
    </div>
  </div>
</div>
