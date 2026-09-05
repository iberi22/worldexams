<script lang="ts">
  import FlashlightCard from './FlashlightCard.svelte';

  interface Props {
    runtimeCountry: any;
    countryCode: string;
    primaryLandingGrade: number;
    secondaryLandingGrades: number[];
    supportsEnglishDiagnostic: boolean;
    preuEnabled: boolean;
    showExperimental: boolean;
    tenantExperience: any;
    onSelectGrade: (grade: number) => void;
    onStartEnglishDiagnostic: () => void;
    onSelectPreu: () => void;
    onOpenBlog: () => void;
  }

  let {
    runtimeCountry,
    countryCode,
    primaryLandingGrade,
    secondaryLandingGrades = [],
    supportsEnglishDiagnostic = false,
    preuEnabled = false,
    showExperimental = false,
    tenantExperience,
    onSelectGrade,
    onStartEnglishDiagnostic,
    onSelectPreu,
    onOpenBlog,
  }: Props = $props();

  let showAllGrades = $state(false);

  // Balanced secondary grades display
  let displayedSecondaryGrades = $derived(
    showAllGrades ? secondaryLandingGrades : secondaryLandingGrades.slice(0, 5)
  );

  let hasMoreGrades = $derived(secondaryLandingGrades.length > 5);

  function getGradeName(gradeId: number) {
    const found = runtimeCountry?.grades?.find((g: any) => g.id === gradeId);
    return found ? found.name : `Grado ${gradeId}°`;
  }
</script>

<div class="w-full max-w-5xl mx-auto px-4">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
    <!-- 1. HERO PRIMARY ROUTE CARD (Col-span 2 on desktop / full-width on mobile) -->
    <div class="col-span-1 md:col-span-2 flex">
      <FlashlightCard
        onClick={() => onSelectGrade(primaryLandingGrade)}
        className="p-6 md:p-8 flex flex-col justify-between group h-full transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500/50 bg-gradient-to-br from-emerald-950/40 via-emerald-900/15 to-[#121212] border-emerald-500/30 shadow-lg shadow-emerald-950/20"
      >
        <div class="flex items-start justify-between gap-4 mb-4">
          <div class="flex items-center gap-3">
            <span class="text-3xl sm:text-4xl">{runtimeCountry.flag}</span>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  {runtimeCountry.examAuthority || 'Oficial'}
                </span>
                <span class="px-2 py-0.5 bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  {getGradeName(primaryLandingGrade)}
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight mt-1 text-left">
                {runtimeCountry.examName}
              </h2>
            </div>
          </div>
          <div class="text-4xl sm:text-5xl font-black text-emerald-500 opacity-90 group-hover:scale-105 transition-transform shrink-0">
            {primaryLandingGrade}°
          </div>
        </div>

        <p class="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-6 text-left">
          {runtimeCountry.examFullName || runtimeCountry.product?.defaultDescription || 'Ruta principal de preparación y evaluación.'}
        </p>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/10 mt-auto">
          <div class="flex items-center gap-2 text-[10px] sm:text-xs text-emerald-400 font-mono">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Ruta Principal · {runtimeCountry.name}</span>
          </div>
          <span
            class="px-5 py-2.5 bg-emerald-500 group-hover:bg-emerald-400 text-slate-950 font-bold uppercase text-xs tracking-wider rounded-lg transition-all shadow-md flex items-center justify-center gap-2 group-hover:shadow-emerald-500/20"
          >
            <span>Iniciar Examen</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </FlashlightCard>
    </div>

    <!-- 2. CROSS-GRADE ENGLISH DIAGNOSTIC CARD (If enabled) -->
    {#if supportsEnglishDiagnostic}
      <div class="col-span-1 flex">
        <FlashlightCard
          onClick={onStartEnglishDiagnostic}
          className="p-5 sm:p-6 flex flex-col justify-between group h-full transition-all duration-300 hover:scale-[1.01] hover:border-blue-500/50 bg-gradient-to-br from-blue-950/30 via-purple-950/15 to-[#121212] border-blue-500/30"
        >
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] font-bold uppercase tracking-widest rounded-full">
                Diagnóstico MCER
              </span>
              <span class="text-2xl">🇬🇧</span>
            </div>

            <h3 class="text-xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors uppercase tracking-wider text-left">
              Inglés A1-B2+
            </h3>
            <p class="text-xs text-white/60 mt-1 leading-relaxed text-left">
              Evaluación multinivel para determinar tu dominio real en el marco europeo.
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-blue-300/80">
            <span>Todos los niveles</span>
            <span class="font-bold flex items-center gap-1 group-hover:text-blue-200">
              Evaluar →
            </span>
          </div>
        </FlashlightCard>
      </div>
    {/if}

    <!-- 3. PREUNIVERSITARIO CARD (solo superficie experimental) -->
    {#if preuEnabled && showExperimental}
      <div class="col-span-1 flex">
        <FlashlightCard
          onClick={onSelectPreu}
          className="p-5 sm:p-6 flex flex-col justify-between group h-full transition-all duration-300 hover:scale-[1.01] hover:border-[#FCD116]/60 bg-gradient-to-br from-amber-950/30 via-yellow-950/10 to-[#121212] border-[#FCD116]/30"
        >
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="px-2 py-0.5 bg-[#FCD116]/20 text-[#FCD116] border border-[#FCD116]/30 text-[9px] font-bold uppercase tracking-widest rounded-full">
                Express / Preu
              </span>
              <span class="text-2xl">🎓</span>
            </div>

            <h3 class="text-xl font-bold text-[#FCD116] group-hover:text-yellow-300 transition-colors uppercase tracking-wider text-left">
              Preuniversitario
            </h3>
            <p class="text-xs text-white/60 mt-1 leading-relaxed text-left">
              Módulos de entrenamiento intensivo y preparación universitaria.
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-[#FCD116]">
            <span>Acceso Libre</span>
            <span class="font-bold flex items-center gap-1 group-hover:underline">
              Explorar →
            </span>
          </div>
        </FlashlightCard>
      </div>
    {/if}

    <!-- 4. REVISAR / BANCO SOCIAL CARD (solo superficie experimental) -->
    {#if runtimeCountry?.features?.blog && showExperimental}
      <div class="col-span-1 flex">
        <FlashlightCard
          onClick={onOpenBlog}
          className="p-5 sm:p-6 flex flex-col justify-between group h-full transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500/40 bg-gradient-to-br from-slate-900/60 to-[#121212] border-white/10"
        >
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold uppercase tracking-widest rounded-full">
                Banco Social
              </span>
              <span class="text-2xl">📖</span>
            </div>

            <h3 class="text-xl font-bold text-[#F5F5DC] group-hover:text-emerald-400 transition-colors uppercase tracking-wider text-left">
              Revisar
            </h3>
            <p class="text-xs text-white/60 mt-1 leading-relaxed text-left">
              Banco social de preguntas, explicaciones y discusiones.
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40 group-hover:text-white/70">
            <span>Explorar banco</span>
            <span class="font-bold flex items-center gap-1">
              Entrar →
            </span>
          </div>
        </FlashlightCard>
      </div>
    {/if}

    <!-- 5. COMUNIDAD / HILOS COLABORATIVOS CARD (solo superficie experimental) -->
    {#if showExperimental}
    <div class="col-span-1 flex">
      <a
        href="/community/co-math-11-001"
        class="block w-full focus:outline-none"
      >
        <FlashlightCard
          className="p-5 sm:p-6 flex flex-col justify-between group h-full transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500/50 bg-gradient-to-br from-emerald-950/30 via-teal-950/15 to-[#121212] border-emerald-500/20"
        >
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold uppercase tracking-widest rounded-full font-mono">
                P2P Social · v5.2
              </span>
              <span class="text-2xl">💬</span>
            </div>

            <h3 class="text-xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors uppercase tracking-wider text-left">
              Comunidad
            </h3>
            <p class="text-xs text-white/60 mt-1 leading-relaxed text-left">
              Hilos de argumentación pedagógica, contraejemplos y debate recursivo auditado.
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-emerald-400/80">
            <span>Discusión abierta</span>
            <span class="font-bold flex items-center gap-1 group-hover:text-emerald-300">
              Participar →
            </span>
          </div>
        </FlashlightCard>
      </a>
    </div>
    {/if}

    <!-- 6. AUDITORÍA & CORRECCIONES CARD (solo superficie experimental) -->
    {#if showExperimental}
    <div class="col-span-1 flex">
      <a
        href="/corrections"
        class="block w-full focus:outline-none"
      >
        <FlashlightCard
          className="p-5 sm:p-6 flex flex-col justify-between group h-full transition-all duration-300 hover:scale-[1.01] hover:border-amber-500/50 bg-gradient-to-br from-amber-950/30 via-orange-950/15 to-[#121212] border-amber-500/20"
        >
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold uppercase tracking-widest rounded-full font-mono">
                Calidad Nodal
              </span>
              <span class="text-2xl">🛠️</span>
            </div>

            <h3 class="text-xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors uppercase tracking-wider text-left">
              Correcciones
            </h3>
            <p class="text-xs text-white/60 mt-1 leading-relaxed text-left">
              Reporte colaborativo de inconsistencias, diff unificado y consenso de parches v5.2.
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-amber-400/80">
            <span>Pipeline nodal</span>
            <span class="font-bold flex items-center gap-1 group-hover:text-amber-300">
              Auditar →
            </span>
          </div>
        </FlashlightCard>
      </a>
    </div>
    {/if}

    <!-- 5. SECONDARY GRADES SUB-GRID -->
    {#if secondaryLandingGrades.length > 0}
      <div class="col-span-1 md:col-span-2 lg:col-span-3 bg-[#121212]/60 border border-white/10 rounded-2xl p-5 sm:p-6 mt-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xs font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
            <span>Grados Secundarios</span>
            <span class="px-1.5 py-0.5 bg-white/10 text-white/70 text-[9px] rounded font-mono">
              {secondaryLandingGrades.length} disponibles
            </span>
          </h3>

          {#if hasMoreGrades}
            <button
              type="button"
              onclick={() => showAllGrades = !showAllGrades}
              class="text-[10px] font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              {showAllGrades ? 'Ver menos' : 'Ver todos'}
            </button>
          {/if}
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {#each displayedSecondaryGrades as grade}
            <FlashlightCard
              onClick={() => onSelectGrade(grade)}
              className="p-3 sm:p-4 flex flex-col items-center justify-center group hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 h-20 sm:h-24 bg-white/5 border-white/10"
            >
              <div class="text-xl sm:text-2xl font-bold text-emerald-500 group-hover:text-emerald-400 transition-colors">
                {grade}°
              </div>
              <div class="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/40 group-hover:text-white/70 mt-0.5 text-center truncate max-w-full px-1">
                {getGradeName(grade)}
              </div>
            </FlashlightCard>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
