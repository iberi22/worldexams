<script>
  import FlashlightCard from './FlashlightCard.svelte';
  import { fade, fly } from 'svelte/transition';

  // State
  let { onOpenModal } = $props();
  let today = new Date();

  // Constants (Approximate Standard Calendar A)
  // We use current year dynamically
  const currentYear = today.getFullYear();

  // Define Periods for current year (Approximate logic)
  const PERIODS = [
    { id: 1, start: new Date(currentYear, 1, 3), end: new Date(currentYear, 3, 11), name: '1er Periodo' },
    { id: 2, start: new Date(currentYear, 3, 14), end: new Date(currentYear, 5, 13), name: '2do Periodo' },
    { id: 3, start: new Date(currentYear, 6, 7), end: new Date(currentYear, 8, 12), name: '3er Periodo' },
    { id: 4, start: new Date(currentYear, 8, 15), end: new Date(currentYear, 10, 28), name: '4to Periodo' }
  ];

  // Logic to find current/next period
  let currentPeriod = PERIODS.find(p => today >= p.start && today <= p.end);
  let nextPeriod = PERIODS.find(p => today < p.start);

  // Expanded Exam Dates Logic (2026)
  const ALL_EXAMS = [
    { id: '11B', name: 'Saber 11° (Cal. B)', date: new Date(currentYear, 2, 15), official: true },
    { id: 'PRO', name: 'Saber Pro / TyT', date: new Date(currentYear, 3, 26), official: true },
    { id: '11A', name: 'Saber 11° (Cal. A)', date: new Date(currentYear, 6, 26), official: true },
    { id: '3579', name: 'Saber 3°, 5°, 7°, 9°', date: new Date(currentYear, 9, 15), official: false }
  ];

  // Logic to find the NEXT upcoming exam
  let nextExam = ALL_EXAMS.find(e => today <= e.date) || ALL_EXAMS[0];
  if (!ALL_EXAMS.find(e => today <= e.date)) {
      nextExam = { ...ALL_EXAMS[0], date: new Date(currentYear + 1, 2, 15) };
  }

  // Calculate days remaining
  function getDaysDiff(target) {
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  let daysToPeriodEnd = currentPeriod ? getDaysDiff(currentPeriod.end) : 0;
  let daysToNextPeriod = nextPeriod ? getDaysDiff(nextPeriod.start) : 0;
  let daysToExam = getDaysDiff(nextExam.date);

  // Text logic
  let periodStatus = currentPeriod
    ? `Cierra en ${daysToPeriodEnd} días`
    : (nextPeriod ? `Inicia en ${daysToNextPeriod} días` : "Fin de año escolar");

  let periodName = currentPeriod ? currentPeriod.name : (nextPeriod ? `Próximo: ${nextPeriod.name}` : "Receso");

  function handleOpen() {
    if (onOpenModal) {
      onOpenModal({
        today,
        PERIODS,
        ALL_EXAMS,
        nextExam
      });
    }
  }

</script>

<div class="mb-8 w-full max-w-lg mx-auto">
  <FlashlightCard
    className="p-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 border-emerald-500/20 bg-emerald-900/10 hover:border-emerald-500/40 transition-all duration-300"
    onClick={handleOpen}
  >
     <!-- Left: Period Tracker -->
     <div class="flex items-center gap-3 sm:pl-2">
        <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-xl shrink-0">
            📅
        </div>
        <div class="flex flex-col text-center sm:text-left">
            <span class="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                {periodName}
            </span>
            <span class="text-[9px] text-white/60">
                {periodStatus}
            </span>
        </div>
     </div>

     <!-- Divider -->
     <div class="h-8 w-px bg-white/10 mx-2 hidden sm:block"></div>
     <div class="w-16 h-px bg-white/10 my-1 sm:hidden"></div>

     <!-- Right: Exam Tracker -->
     <div class="flex items-center gap-3 sm:pr-2 text-center sm:text-right">
        <div class="flex flex-col items-center sm:items-end order-2 sm:order-1">
            <span class="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                {nextExam.name}
            </span>
            <span class="text-[9px] text-white/60">
                Faltan {daysToExam} días
            </span>
        </div>
        <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-xl shrink-0 order-1 sm:order-2">
            🎓
        </div>
     </div>
  </FlashlightCard>
</div>
