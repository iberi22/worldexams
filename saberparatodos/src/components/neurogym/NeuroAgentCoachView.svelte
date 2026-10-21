<script lang="ts">
  /**
   * NeuroAgentCoachView.svelte
   * Coach de NeuroGym. Funciona sin conexión con reglas deterministas sobre el
   * historial local. El backend de memoria externo solo aparece si la build lo
   * habilita (PUBLIC_NEUROGYM_REMOTE_COACH) y el estudiante da su consentimiento.
   */
  import { agenticCoach, type AgentPedagogicalAdvice } from '../../lib/neurogym/agentic-neuro-coach';
  import type { FullCognitiveProfile } from '../../lib/neurogym/scoring-cognitive';
  import type { TrainingGameId } from '../../lib/neurogym/training-catalog';
  import { loadLevels, loadTrainingHistory } from '../../lib/neurogym/training-history';

  interface Props {
    /** Perfil de la última evaluación (batería). Opcional. */
    profile?: FullCognitiveProfile | null;
    refreshToken?: number;
    onPlay?: (gameId: TrainingGameId) => void;
  }

  let { profile = null, refreshToken = 0, onPlay }: Props = $props();

  let now = $state(Date.now());
  let history = $state(loadTrainingHistory());

  $effect(() => {
    void refreshToken;
    history = loadTrainingHistory();
    now = Date.now();
  });

  const recommendations = $derived(agenticCoach.recommend(history, loadLevels(), now));
  const advice = $derived<AgentPedagogicalAdvice | null>(profile ? agenticCoach.synthesizeWorkoutPlan(profile) : null);

  const remoteAvailable = agenticCoach.isRemoteAvailable();
  let remoteOptIn = $state(agenticCoach.hasRemoteOptIn());
  let remoteContext = $state<string | null>(null);
  let isQuerying = $state(false);

  function toggleOptIn(event: Event) {
    const checked = (event.currentTarget as HTMLInputElement).checked;
    agenticCoach.setRemoteOptIn(checked);
    remoteOptIn = agenticCoach.hasRemoteOptIn();
    if (!remoteOptIn) remoteContext = null;
  }

  async function consultRemote() {
    const domain = recommendations[0]?.skillLabel;
    if (!domain) return;
    isQuerying = true;
    remoteContext = await agenticCoach.consultXavierContext(domain);
    isQuerying = false;
  }

  const reasonLabel: Record<string, string> = {
    nueva: 'Nueva',
    pendiente: 'Repasar hoy',
    mantenimiento: 'Al día'
  };
</script>

<div class="p-6 bg-gradient-to-br from-[#0c161a] via-black to-[#051510] border border-cyan-500/30 rounded-3xl space-y-6 shadow-2xl">
  <div class="flex items-center gap-3 border-b border-white/10 pb-4">
    <div class="p-3 bg-cyan-500/10 border border-cyan-500/40 rounded-2xl">
      <span class="text-2xl" aria-hidden="true">🤖</span>
    </div>
    <div>
      <div class="flex items-center gap-2">
        <h3 class="text-sm font-bold uppercase tracking-wider text-white">Coach NeuroGym</h3>
        <span class="text-[9px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded">Sin conexión</span>
      </div>
      <p class="text-[10px] text-white/50">
        Reglas locales: habilidad más débil primero, repaso espaciado (1, 2, 4, 7, 14 días) y nivel según tu escalera de dificultad.
      </p>
    </div>
  </div>

  <ol class="space-y-2">
    {#each recommendations as r, i (r.skill)}
      <li class="p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-2xl flex flex-wrap items-start justify-between gap-3">
        <div class="min-w-0 flex-1 space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-bold text-white">{i + 1}. {r.skillLabel}</span>
            <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">{reasonLabel[r.reason]}</span>
          </div>
          <p class="text-xs text-white/70">{r.rationale}</p>
          <p class="text-[10px] text-white/50">Juego: <strong class="text-emerald-300">{r.gameName}</strong> · nivel {r.level}</p>
        </div>
        {#if onPlay}
          <button
            type="button"
            onclick={() => onPlay?.(r.gameId)}
            class="py-2 px-3 bg-cyan-400 hover:bg-cyan-300 text-black text-[10px] font-black uppercase tracking-wider rounded-lg cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Entrenar
          </button>
        {/if}
      </li>
    {/each}
  </ol>

  {#if advice}
    <div class="p-4 bg-black/40 border border-white/10 rounded-2xl space-y-1">
      <span class="text-[10px] uppercase font-bold text-cyan-400">Según tu última evaluación</span>
      <p class="text-xs text-white/70">{advice.rationale}</p>
      <p class="text-[10px] text-white/50">Sugerido: <strong class="text-emerald-300">{advice.recommendedGame}</strong> · {advice.targetDurationMinutes} min/día</p>
    </div>
  {/if}

  {#if remoteAvailable}
    <div class="p-4 bg-black/60 border border-white/10 rounded-2xl space-y-3">
      <label class="flex items-start gap-2 text-xs text-white/80 cursor-pointer">
        <input type="checkbox" checked={remoteOptIn} onchange={toggleOptIn} class="mt-0.5" />
        <span>
          Acepto consultar estrategias en el servidor de memoria. Solo se envía el nombre de la habilidad
          (p. ej. "Atención"); nunca mi historial, puntajes ni datos personales. Puedo desactivarlo cuando quiera.
        </span>
      </label>
      {#if remoteOptIn}
        <button
          type="button"
          onclick={consultRemote}
          disabled={isQuerying}
          class="py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider rounded-xl cursor-pointer disabled:opacity-50"
        >
          {isQuerying ? 'Consultando…' : 'Consultar estrategia'}
        </button>
      {/if}
      {#if remoteContext}
        <p class="p-3 bg-black/60 border border-white/10 rounded-xl text-xs text-white/80">{remoteContext}</p>
      {/if}
    </div>
  {/if}
</div>
