<script lang="ts">
  export let score: number = 0; // 0 to 100
  export let subject: string = "";
  
  // ICFES Saber 11 standard levels
  // Levels for core subjects (0-100 scale)
  const levels = [
    { id: 1, name: "Insuficiente", min: 0, max: 35, color: "bg-red-500", shadow: "shadow-red-500/20" },
    { id: 2, name: "Mínimo", min: 36, max: 50, color: "bg-orange-500", shadow: "shadow-orange-500/20" },
    { id: 3, name: "Satisfactorio", min: 51, max: 70, color: "bg-yellow-400", shadow: "shadow-yellow-400/20" },
    { id: 4, name: "Avanzado", min: 71, max: 100, color: "bg-emerald-500", shadow: "shadow-emerald-500/20" },
  ];

  // Specific levels for English (A-, A1, A2, B1, B+)
  const englishLevels = [
    { id: "A-", name: "A-", min: 0, max: 30, color: "bg-red-500", shadow: "shadow-red-500/20" },
    { id: "A1", name: "A1", min: 31, max: 45, color: "bg-orange-500", shadow: "shadow-orange-500/20" },
    { id: "A2", name: "A2", min: 46, max: 60, color: "bg-yellow-400", shadow: "shadow-yellow-400/20" },
    { id: "B1", name: "B1", min: 61, max: 80, color: "bg-emerald-500", shadow: "shadow-emerald-500/20" },
    { id: "B+", name: "B+", min: 81, max: 100, color: "bg-emerald-400", shadow: "shadow-emerald-400/30" },
  ];

  $: currentLevels = subject.toLowerCase().includes('inglés') || subject.toLowerCase().includes('english') 
    ? englishLevels 
    : levels;

  $: currentLevel = currentLevels.find(l => score >= l.min && score <= l.max) || currentLevels[0];
</script>

<div class="space-y-3">
  <div class="flex justify-between items-end">
    <div class="flex flex-col">
      <span class="text-[9px] font-black text-white/20 uppercase tracking-widest">Nivel de Desempeño</span>
      <span class="text-xs font-black text-white uppercase tracking-tight">{currentLevel.name}</span>
    </div>
    <div class="text-right">
      <span class="text-2xl font-black {currentLevel.id === 4 || currentLevel.id === 'B+' ? 'text-emerald-400' : 'text-white'}">{Math.round(score)}</span>
      <span class="text-[10px] text-white/20 font-bold">/100</span>
    </div>
  </div>

  <div class="relative h-2 bg-white/5 rounded-full overflow-hidden flex border border-white/5">
    {#each currentLevels as level}
      {@const width = ((level.max - level.min + 1) / 100) * 100}
      <div 
        class="h-full border-r border-black/20 last:border-0 transition-all duration-500"
        style="width: {width}%"
      >
        {#if score >= level.min}
          <div 
            class="h-full {level.color} {level.shadow} transition-all duration-1000 ease-out"
            style="width: {Math.min(100, ((score - level.min) / (level.max - level.min + 1)) * 100)}%"
          ></div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="flex justify-between px-1">
    {#each currentLevels as level}
      <div class="flex flex-col items-center">
        <div class="w-1 h-1 rounded-full mb-1 {score >= level.min ? level.color : 'bg-white/10'}"></div>
        <span class="text-[7px] font-black text-white/10 uppercase tracking-tighter">{level.id}</span>
      </div>
    {/each}
  </div>
</div>
