<script lang="ts">
  export let percentile: number = 0; // 0 to 100
  
  $: rankText = percentile >= 99 ? "Top Global" : 
                percentile >= 90 ? "Élite Nacional" :
                percentile >= 75 ? "Superior" :
                percentile >= 50 ? "Promedio Alto" :
                "En Crecimiento";

  $: description = percentile >= 50 
    ? `Superas al <span class="text-emerald-400 font-black">${Math.round(percentile)}%</span> de los estudiantes.`
    : `Estás en el percentil <span class="text-white font-black">${Math.round(percentile)}</span>.`;
</script>

<div class="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-3xl p-6 relative overflow-hidden group">
  <div class="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-[40px]"></div>
  
  <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-4 flex items-center gap-2">
    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
    Posición Nacional
  </h3>

  <div class="flex items-end gap-3 mb-4">
    <div class="text-5xl font-black text-white drop-shadow-2xl">
      {Math.round(percentile)}
    </div>
    <div class="text-lg font-black text-emerald-500/40 mb-1 tracking-widest">PR</div>
  </div>

  <div class="space-y-4">
    <div class="relative py-4">
      <!-- Bell curve-ish representation -->
      <div class="h-12 w-full flex items-end justify-between gap-1 opacity-20">
        {#each Array(20) as _, i}
          {@const height = Math.exp(-Math.pow(i - 10, 2) / 30) * 100}
          <div class="flex-1 bg-white rounded-t-sm" style="height: {height}%"></div>
        {/each}
      </div>
      
      <!-- Current position marker -->
      <div 
        class="absolute bottom-4 h-16 w-0.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000 ease-out"
        style="left: {percentile}%"
      >
        <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#121212]"></div>
        <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-emerald-400 uppercase whitespace-nowrap">Tú</div>
      </div>
    </div>

    <div class="pt-2">
      <div class="text-[11px] text-white/60 font-medium leading-relaxed">
        {@html description}
      </div>
      <div class="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">
        Rango: {rankText}
      </div>
    </div>
  </div>
</div>
