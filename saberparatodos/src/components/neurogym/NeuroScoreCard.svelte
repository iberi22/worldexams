<script lang="ts">
  import type { FullCognitiveProfile } from '../../lib/neurogym/scoring-cognitive';

  interface Props {
    profile: FullCognitiveProfile;
    onReset: () => void;
  }

  let { profile, onReset }: Props = $props();

  const domains = [
    { title: 'Proxy CI (Razonamiento Fluido)', data: profile.overallIQProxy, color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
    { title: 'Memoria de Trabajo (Span)', data: profile.workingMemory, color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10' },
    { title: 'Velocidad de Procesamiento (PSI)', data: profile.processingSpeed, color: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10' },
    { title: 'Agilidad Motora & Control', data: profile.motorAgility, color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/10' },
    { title: 'Flexibilidad Analítica', data: profile.analyticalFlexibility, color: 'text-pink-400', border: 'border-pink-500/30', bg: 'bg-pink-500/10' }
  ];
</script>

<div class="max-w-3xl mx-auto space-y-6">
  <!-- Header Card -->
  <div class="p-6 bg-gradient-to-br from-emerald-950/40 via-black to-purple-950/40 border border-white/20 rounded-3xl text-center space-y-3 shadow-2xl">
    <span class="text-xs uppercase tracking-widest text-emerald-400 font-mono font-bold">Perfil Neuropsicológico Baremado</span>
    <h2 class="text-3xl sm:text-4xl font-black text-white">Resultados de Evaluación Cognitiva</h2>
    <p class="text-xs text-white/60 max-w-lg mx-auto">
      Métricas estandarizadas en escala psicométrica normalizada (Media=100, SD=15). Todos los cálculos se generaron de forma soberana on-device.
    </p>

    <!-- Highlight Overall IQ Proxy -->
    <div class="inline-flex flex-col items-center p-4 bg-emerald-500/15 border border-emerald-400/40 rounded-2xl mt-2">
      <span class="text-[10px] uppercase tracking-widest text-emerald-300 font-bold">Puntaje Estándar Compuesto</span>
      <span class="text-5xl font-black text-emerald-400 my-1">{profile.overallIQProxy.standardScore}</span>
      <span class="text-xs text-white/80 font-semibold">
        Nivel: {profile.overallIQProxy.levelDescription} (Percentil {profile.overallIQProxy.percentile}%)
      </span>
    </div>
  </div>

  <!-- Domain Breakdown -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {#each domains as dom}
      <div class="p-4 rounded-2xl border {dom.border} {dom.bg} space-y-2">
        <div class="flex items-center justify-between">
          <h4 class="text-xs font-bold uppercase tracking-wider text-white/90">{dom.title}</h4>
          <span class="text-xs font-mono font-bold {dom.color}">{dom.data.standardScore} pts</span>
        </div>
        <div class="flex items-center justify-between text-[10px] text-white/60">
          <span>Percentil: <strong>{dom.data.percentile}%</strong></span>
          <span>Stanine: <strong>{dom.data.stanine}/9</strong></span>
          <span class="font-bold {dom.color}">{dom.data.levelDescription}</span>
        </div>
        <p class="text-[10px] text-white/50 leading-relaxed border-t border-white/10 pt-2">
          {dom.data.clinicalSummary}
        </p>
      </div>
    {/each}
  </div>

  <!-- Daily Workout Recommendation -->
  <div class="p-6 bg-white/5 border border-white/15 rounded-3xl space-y-4">
    <div class="flex items-center gap-2">
      <span class="text-xl">🏋️‍♂️</span>
      <h3 class="text-sm font-bold uppercase tracking-widest text-white">Plan de Gimnasio Cerebral Recomendado</h3>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {#each profile.recommendedDailyWorkout as w}
        <div class="p-3 bg-black/40 border border-white/10 rounded-xl space-y-1">
          <span class="text-[10px] uppercase font-bold text-emerald-400">{w.domain}</span>
          <p class="text-xs font-semibold text-white">{w.focusExercise}</p>
          <p class="text-[10px] text-white/40">Duración: {w.targetDurationMinutes} min/día</p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Action buttons -->
  <div class="flex gap-4 pt-2">
    <button
      type="button"
      onclick={onReset}
      class="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold uppercase tracking-widest text-white transition-all cursor-pointer"
    >
      Nueva Evaluación
    </button>
  </div>
</div>
