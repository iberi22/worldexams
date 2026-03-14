<script>
  import { fade, fly } from 'svelte/transition';

  let { onClose, today, PERIODS, ALL_EXAMS, nextExam } = $props();

</script>

<div
  class="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
  transition:fade={{ duration: 200 }}
  onclick={(e) => { if (e.target === e.currentTarget) onClose(); }}
  role="presentation"
>
  <div
      class="bg-[#121212] border border-white/10 rounded-xl p-6 max-w-sm w-full shadow-2xl relative overflow-hidden"
      in:fly={{ y: 20, duration: 300 }}
  >
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500"></div>

      <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-bold uppercase tracking-widest text-white">
              Cronograma Escolar
          </h2>
          <button onclick={onClose} class="text-white/40 hover:text-white">
              ✕
          </button>
      </div>

      <div class="space-y-6 text-left">
          <!-- Periods Section -->
          <div>
              <h3 class="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3 flex items-center gap-2">
                  <span>📅</span> Periodos Académicos
              </h3>
              <div class="space-y-2 relative border-l border-white/10 pl-4 ml-1">
                  {#each PERIODS as period}
                      <div class="relative">
                          <!-- Dot -->
                          <div class={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${today >= period.start && today <= period.end ? 'bg-emerald-500 border-emerald-500' : 'bg-[#121212] border-white/20'}`}></div>

                          <div class="flex justify-between items-start">
                              <span class={`text-xs ${today >= period.start && today <= period.end ? 'text-white font-bold' : 'text-white/40'}`}>
                                  {period.name}
                              </span>
                              <span class="text-[10px] text-white/30 font-mono">
                                  {period.start.toLocaleDateString('es-CO', {day: 'numeric', month: 'short'})} - {period.end.toLocaleDateString('es-CO', {day: 'numeric', month: 'short'})}
                              </span>
                          </div>
                      </div>
                  {/each}
              </div>
              <p class="text-[9px] text-white/20 mt-2 italic">
                  * Fechas aproximadas basadas en Calendario A (MinEducación Colombia).
              </p>
          </div>

          <!-- Exam Section -->
          <div>
              <h3 class="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 flex items-center gap-2">
                  <span>🎓</span> Pruebas de Estado
              </h3>
              <div class="space-y-3">
                  {#each ALL_EXAMS as exam}
                      <div class={`p-3 rounded-lg border flex items-center gap-3 transition-colors ${nextExam.id === exam.id ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5 border-white/5'}`}>
                          <div class="text-lg">{exam.id.includes('11') ? '🇨🇴' : '🎓'}</div>
                          <div>
                              <div class={`text-xs font-bold ${nextExam.id === exam.id ? 'text-blue-300' : 'text-white/80'}`}>
                                  {exam.name}
                                  {#if nextExam.id === exam.id}
                                      <span class="ml-2 text-[8px] bg-blue-500/20 text-blue-400 px-1 py-0.5 rounded uppercase font-bold">Próxima</span>
                                  {/if}
                              </div>
                              <div class="text-[10px] text-white/50">
                                  {exam.official ? 'Fecha oficial:' : 'Fecha estimada:'}
                                  <span class="text-white/80">{exam.date.toLocaleDateString('es-CO', { day: 'numeric', month: 'long' })}</span>
                              </div>
                          </div>
                      </div>
                  {/each}
              </div>
          </div>
      </div>

      <button
        onclick={onClose}
        class="w-full mt-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs uppercase tracking-widest transition-colors"
      >
          Cerrar
      </button>
  </div>
</div>
