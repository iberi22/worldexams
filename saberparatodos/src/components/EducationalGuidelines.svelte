<script lang="ts">
  import { fade, fly } from 'svelte/transition';

  export interface GuidelineTopic {
    name: string;
    topics: string[];
  }

  export interface GuidelineCompetence {
    competencias: string[];
    componentes: string[];
    color: string;
  }

  export interface ReferenceLink {
    label: string;
    url: string;
    note?: string;
  }

  export interface ReferenceGroup {
    title: string;
    description: string;
    tone: string;
    accent: string;
    links: ReferenceLink[];
    open?: boolean;
  }

  let {
    grade = 11,
    subjectLabel = '',
    period = 1,
    authorityName = 'M.E.N.',
    alignmentYear = '2026',
    periodData = null as GuidelineTopic | null,
    competence = null as GuidelineCompetence | null,
    referenceGroups = [] as ReferenceGroup[],
    guideShortcutDescription = '',
    onReport = () => {}
  } = $props();

  let accentColor = $derived(competence?.color || '#10b981');
</script>

<div class="space-y-6 p-1">
  <!-- Header -->
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
      Lineamientos <span style="color: {accentColor}">{authorityName}</span>
    </h2>
    <p class="text-white/40 text-xs max-w-xs text-center leading-relaxed">
      Alineación curricular {alignmentYear} — Estándares vigentes
    </p>
  </div>

  <!-- Period Data -->
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
  {:else}
    <div class="p-4 rounded-2xl border border-white/10 bg-white/5 text-center space-y-2">
      <p class="text-[11px] text-white/40">Sin datos específicos para esta combinación</p>
    </div>
  {/if}

  <!-- Competencias -->
  {#if competence}
  <div class="text-center" in:fly={{ y: 12, duration: 300, delay: 100 }}>
    <p class="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-3">
      Competencias evaluadas
    </p>
    <div class="space-y-2">
      {#each competence.competencias as comp, i}
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

  <!-- Componentes -->
  <div class="text-center" in:fly={{ y: 12, duration: 300, delay: 160 }}>
    <p class="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-3">
      Componentes curriculares
    </p>
    <div class="flex flex-wrap gap-2 justify-center">
      {#each competence.componentes as comp}
        <span
          class="px-2.5 py-1 text-[10px] font-bold rounded-full border"
          style="color: {accentColor}; border-color: {accentColor}40; background: {accentColor}10;"
        >
          {comp}
        </span>
      {/each}
    </div>
  </div>
  {/if}

  <!-- Guide -->
  <div
    class="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center"
    in:fly={{ y: 12, duration: 300, delay: 200 }}
  >
    <p class="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">
      Guía de uso
    </p>
    <p class="text-[10px] text-emerald-200/70 leading-relaxed">
      {guideShortcutDescription || 'Utiliza estos lineamientos para orientar tu práctica y entender el enfoque de evaluación.'}
    </p>
  </div>

  <!-- References -->
  {#if referenceGroups.length > 0}
  <div in:fly={{ y: 12, duration: 300, delay: 240 }}>
    <div class="flex items-center justify-between gap-3 mb-4">
      <p class="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 text-center">
        Referencias oficiales
      </p>
    </div>
    <div class="space-y-3">
      {#each referenceGroups as group}
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
  {/if}

  <!-- Footer Info -->
  <div class="flex items-center justify-center gap-2 pt-4 mb-4">
    <div class="w-1.5 h-1.5 rounded-full animate-pulse" style="background: {accentColor};"></div>
    <p class="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
      Información de referencia educativa
    </p>
  </div>

  <!-- Report Button -->
  <div class="mt-4 flex items-center justify-start">
    <button
      onclick={onReport}
      class="flex items-center justify-center gap-2 px-3 py-2 bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/45 transition-all duration-300 uppercase tracking-widest text-[9px] font-bold active:scale-95 rounded-lg"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4v16m0-16c5.5 0 5.5 3 11 3v9c-5.5 0-5.5-3-11-3V4z" />
      </svg>
      <span>Reportar anomalía</span>
    </button>
  </div>
</div>
