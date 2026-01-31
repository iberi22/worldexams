<script>
  import FlashlightCard from './FlashlightCard.svelte';
  import { fade, fly } from 'svelte/transition';

  // State
  let showModal = false;
  let today = new Date();

  // Constants (Approximate Standard Calendar A)
  // We use current year dynamically
  const currentYear = today.getFullYear();

  // Define Periods for current year (Approximate logic)
  // P1: Feb-Apr, P2: Apr-Jun, P3: Jul-Sep, P4: Sep-Nov
  const PERIODS = [
    { id: 1, start: new Date(currentYear, 1, 3), end: new Date(currentYear, 3, 11), name: '1er Periodo' }, // Feb 3 - Apr 11
    { id: 2, start: new Date(currentYear, 3, 14), end: new Date(currentYear, 5, 13), name: '2do Periodo' }, // Apr 14 - Jun 13
    { id: 3, start: new Date(currentYear, 6, 7), end: new Date(currentYear, 8, 12), name: '3er Periodo' }, // Jul 7 - Sep 12
    { id: 4, start: new Date(currentYear, 8, 15), end: new Date(currentYear, 10, 28), name: '4to Periodo' } // Sep 15 - Nov 28
  ];

  // Logic to find current/next period
  let currentPeriod = PERIODS.find(p => today >= p.start && today <= p.end);
  let nextPeriod = PERIODS.find(p => today < p.start);

  // Exam Date Logic (Approx Aug 10)
  let examDate = new Date(currentYear, 7, 10); // Aug 10
  if (today > examDate) {
      examDate = new Date(currentYear + 1, 7, 10); // Next year if passed
  }

  // Calculate days remaining
  function getDaysDiff(target) {
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  let daysToPeriodEnd = currentPeriod ? getDaysDiff(currentPeriod.end) : 0;
  let daysToNextPeriod = nextPeriod ? getDaysDiff(nextPeriod.start) : 0;
  let daysToExam = getDaysDiff(examDate);

  // Text logic
  let periodStatus = currentPeriod
    ? `Cierra en ${daysToPeriodEnd} días`
    : (nextPeriod ? `Inicia en ${daysToNextPeriod} días` : "Fin de año escolar");

  let periodName = currentPeriod ? currentPeriod.name : (nextPeriod ? `Próximo: ${nextPeriod.name}` : "Receso");

</script>

<div class="mb-4 w-full">
  <FlashlightCard
    className="p-3 flex items-center justify-between gap-4 border-emerald-500/20 bg-emerald-900/10 hover:border-emerald-500/40 transition-all duration-300"
    onClick={() => showModal = true}
  >
     <!-- Left: Period Tracker -->
     <div class="flex items-center gap-3 pl-2">
        <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-lg">
            📅
        </div>
        <div class="flex flex-col text-left">
            <span class="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                {periodName}
            </span>
            <span class="text-[9px] text-white/60">
                {periodStatus}
            </span>
        </div>
     </div>

     <!-- Divider -->
     <div class="h-6 w-px bg-white/10 mx-2 hidden sm:block"></div>

     <!-- Right: Exam Tracker -->
     <div class="flex items-center gap-3 pr-2 text-right">
        <div class="flex flex-col items-end">
            <span class="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                Prueba Saber 11
            </span>
            <span class="text-[9px] text-white/60">
                Faltan {daysToExam} días
            </span>
        </div>
        <div class="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-lg">
            🎓
        </div>
     </div>
  </FlashlightCard>
</div>

<!-- Modal -->
{#if showModal}
  <div
    class="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
    transition:fade={{ duration: 200 }}
    onclick={(e) => { if (e.target === e.currentTarget) showModal = false; }}
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
            <button onclick={() => showModal = false} class="text-white/40 hover:text-white">
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
                    * Fechas aproximadas basadas en Calendario A (MinEducación Colombia). Pueden variar por institución.
                </p>
            </div>

            <!-- Exam Section -->
            <div>
                <h3 class="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 flex items-center gap-2">
                    <span>🎓</span> Pruebas de Estado
                </h3>
                <div class="bg-blue-900/10 border border-blue-500/20 rounded-lg p-3 flex items-center gap-3">
                    <div class="text-2xl">🇨🇴</div>
                    <div>
                        <div class="text-xs font-bold text-blue-300">Saber 11° (Calendario A)</div>
                        <div class="text-[10px] text-white/60">Fecha estimada: <span class="text-white">{examDate.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
                    </div>
                </div>
            </div>
        </div>

        <button
          onclick={() => showModal = false}
          class="w-full mt-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs uppercase tracking-widest transition-colors"
        >
          Cerrar
        </button>
    </div>
  </div>
{/if}
