<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { CURRICULUM_CO, normalizeTopic } from '../config/curriculum';
  import { getAuthorityGuidelines } from '../config/authority-guidelines';
  import type { CountryCode } from '../config';
  import ReportModal from './ReportModal.svelte';

  let {
    grade = 11,
    subject = 'Matemáticas',
    period = 1,
    countryCode = 'CO' as CountryCode
  } = $props();

  const guidelines = $derived(getAuthorityGuidelines(countryCode));

  // ── Derivados ────────────────────────────────────────────────────────────
  let normSubj = $derived(normalizeTopic(subject));

  let periodData = $derived.by(() => {
    if (normSubj === 'simulacrocompleto') {
      return {
        name: `Cobertura global del examen`,
        topics: [
          'No usa un único referente; mezcla competencias de varias áreas',
          'Sirve para practicar distribución real de preguntas por componente',
          'Conviene usarlo como vista general, no como referencia curricular puntual'
        ]
      };
    }
    // Curriculum data currently only available for CO
    if (countryCode !== 'CO') return null;

    const gradeData = CURRICULUM_CO[grade];
    if (!gradeData) return null;
    const subjectData = gradeData[normSubj];
    if (!subjectData) return null;
    return subjectData.periods.find(p => p.id === period) ?? null;
  });

  let competencia = $derived(
    guidelines.competencias[normSubj] ??
    Object.values(guidelines.competencias)[0] ??
    { competencias: [], componentes: [], color: '#3b82f6' }
  );

  let subjectLabel = $derived(guidelines.subjectLabels[normSubj] ?? subject);

  let accentColor = $derived(competencia.color);
  let showReportModal = $state(false);
  let reportQuestionId = $derived(`men-guidelines-${grade}-${normSubj}-${period}`);
</script>

<div class="space-y-6 p-1">

  <!-- ── Header contextual ──────────────────────────────────────── -->
  <div class="w-full flex flex-col items-center text-center" in:fade={{ duration: 200 }}>
    <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
      <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
        Grado {grade}° · {subjectLabel} · Periodo {period}
      </span>
    </div>
    <div class="inline-block p-3 rounded-2xl mb-3 border border-white/10" style="background: {accentColor}15;">
      <span class="text-3xl">🏛️</span>
    </div>
    <h2 class="text-2xl font-black uppercase tracking-tight text-white mb-1 text-center w-full">
      Lineamientos <span style="color: {accentColor}">{guidelines.authorityName}</span>
    </h2>
    <p class="text-white/40 text-xs max-w-xs text-center leading-relaxed">
      {guidelines.badgeLabel}
    </p>
  </div>

  <!-- ── Periodo activo ────────────────────────────────────────── -->
  {#if periodData}
    <div
      class="p-4 rounded-2xl border text-center"
      style="background: {accentColor}10; border-color: {accentColor}30;"
      in:fly={{ y: 12, duration: 300, delay: 50 }}
    >
      <p class="text-[9px] font-black uppercase tracking-[0.2em] mb-2" style="color: {accentColor};">
        Periodo activo
      </p>
      <h3 class="text-sm font-black text-white mb-3 leading-tight">{periodData.name}</h3>

      <div class="space-y-1.5">
        {#each periodData.topics as topic, i}
          <div
            class="flex items-center gap-2"
            in:fly={{ x: -8, duration: 200, delay: i * 40 }}
          >
            <span class="w-1 h-1 rounded-full shrink-0" style="background: {accentColor};"></span>
            <span class="text-[11px] text-white/70 capitalize">{topic.replace(/-/g, ' ')}</span>
          </div>
        {/each}
      </div>
    </div>
  {:else if countryCode === 'CO'}
    <div class="p-4 rounded-2xl border border-white/10 bg-white/5 text-center space-y-2">
      <p class="text-[11px] text-white/40">Sin datos curriculares para esta combinación</p>
      {#if normSubj === 'simulacrocompleto'}
        <p class="text-[10px] text-white/30 leading-relaxed">
          El simulacro completo no tiene referentes propios. Si quieres ver lineamientos por contenido, cambia a una materia concreta.
        </p>
      {/if}
    </div>
  {/if}

  <!-- ── Competencias ────────────────────────────────────── -->
  <div class="text-center" in:fly={{ y: 12, duration: 300, delay: 100 }}>
    <p class="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-3">
      Competencias evaluadas
    </p>
    <div class="space-y-2">
      {#each competencia.competencias as comp, i}
        <div
          class="flex items-start gap-2 p-2.5 bg-white/5 border border-white/5 rounded-xl"
          in:fly={{ x: -8, duration: 200, delay: 150 + i * 50 }}
        >
          <span class="text-xs font-black shrink-0" style="color: {accentColor};">{i + 1}</span>
          <span class="text-[11px] text-white/70 leading-relaxed">{comp}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- ── Componentes curriculares ─────────────────────────────── -->
  <div class="text-center" in:fly={{ y: 12, duration: 300, delay: 160 }}>
    <p class="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-3">
      Componentes curriculares
    </p>
    <div class="flex flex-wrap gap-2">
      {#each competencia.componentes as comp}
        <span
          class="px-2.5 py-1 text-[10px] font-bold rounded-full border"
          style="color: {accentColor}; border-color: {accentColor}40; background: {accentColor}10;"
        >
          {comp}
        </span>
      {/each}
    </div>
  </div>

  <!-- ── Cómo usar esto para crear bundles ────────────────────── -->
  <div
    class="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center"
    in:fly={{ y: 12, duration: 300, delay: 200 }}
  >
    <p class="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">
      Guía para crear bundles
    </p>
    <ul class="space-y-1.5">
      <li class="flex items-start gap-2">
        <span class="text-emerald-400 text-xs shrink-0">→</span>
        <span class="text-[10px] text-emerald-200/70 leading-relaxed">Cada pregunta debe cubrir al menos uno de los tópicos listados arriba.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-emerald-400 text-xs shrink-0">→</span>
        <span class="text-[10px] text-emerald-200/70 leading-relaxed">Los distractores deben reflejar errores conceptuales alineados con las competencias de {guidelines.authorityName}.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-emerald-400 text-xs shrink-0">→</span>
        <span class="text-[10px] text-emerald-200/70 leading-relaxed">El nivel de dificultad progresa v1–v10 por bundle, siguiendo la progresión evaluativa local.</span>
      </li>
    </ul>
  </div>

  <!-- ── Referencias oficiales ────────────────────────────────── -->
  <div in:fly={{ y: 12, duration: 300, delay: 240 }}>
    <div class="flex items-center justify-between gap-3 mb-4">
      <p class="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 text-center">
        Referencias oficiales
      </p>
      <span class="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/25">
        Abrir en nueva pestaña
      </span>
    </div>
    <div class="space-y-3">
      {#each guidelines.references as group}
        <details class="group rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden" open={group.open}>
          <summary class="cursor-pointer list-none p-4 flex items-start justify-between gap-3 hover:bg-white/[0.03] transition-colors">
            <div class="min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="w-2 h-2 rounded-full shrink-0" style="background: {group.accent};"></span>
                <h4 class="text-xs font-black uppercase tracking-[0.18em] text-white/80">{group.title}</h4>
              </div>
              <p class="text-[10px] leading-relaxed text-white/40">{group.description}</p>
            </div>
            <svg class="w-4 h-4 shrink-0 mt-0.5 text-white/35 transition-transform duration-200 group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </summary>
          <div class="px-4 pb-4 pt-1 space-y-2">
            {#each group.links as link}
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-black/20 text-white/55 hover:text-white hover:bg-white/[0.07] hover:border-white/20 transition-all group/link"
              >
                <span class="text-[10px] font-bold leading-tight pr-3">{link.label}</span>
                <svg class="w-4 h-4 shrink-0 text-white/35 transform group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            {/each}
          </div>
        </details>
      {/each}
    </div>
  </div>

  <!-- ── Badge sync ────────────────────────────────────────────── -->
  <div class="flex items-center justify-center gap-2 pt-4 mb-4">
    <div class="w-1.5 h-1.5 rounded-full animate-pulse" style="background: {accentColor};"></div>
    <p class="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
      Sincronizado con World Exams Core v1.2
    </p>
  </div>

</div>

<div class="mt-4 flex items-center justify-start">
  <div class="relative group/report inline-flex">
    <button
      onclick={() => showReportModal = true}
      class="flex items-center justify-center gap-2 px-3 py-2 bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/45 transition-all duration-300 uppercase tracking-widest text-[9px] font-bold active:scale-95 rounded-lg"
      title="Reportar una anomalía"
      aria-label="Reportar una anomalía"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4v16m0-16c5.5 0 5.5 3 11 3v9c-5.5 0-5.5-3-11-3V4z" />
      </svg>
      <span class="hidden sm:inline">Reportar</span>
    </button>
    <div class="absolute bottom-full left-0 mb-2 px-3 py-2 bg-[#0a0a0a]/95 text-yellow-100 text-[10px] rounded-xl opacity-0 group-hover/report:opacity-100 transition-all duration-200 pointer-events-none border border-yellow-500/20 shadow-2xl z-50 whitespace-nowrap">
      Reportar una anomalía
    </div>
  </div>
</div>

{#if showReportModal}
  <ReportModal
    show={showReportModal}
    onClose={() => showReportModal = false}
    questionId={reportQuestionId}
    userContext="MenGuidelinesContent"
    availableReportTypes={['feedback', 'guideline_disagree', 'other']}
    questionData={{
      title: `Lineamientos ${guidelines.authorityName}`,
      grade,
      subject,
      period,
      subjectLabel,
      normSubj
    }}
  />
{/if}
