<script lang="ts">
  interface Props {
    nivel: string;
    fortaleza: string;
    brecha: string;
    accion: string;
    hrefEstudio?: string | null;
  }

  let { nivel, fortaleza, brecha, accion, hrefEstudio = null }: Props = $props();
</script>

<div class="w-full p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3" aria-label="Boletín formativo">
  <div class="flex items-center justify-between gap-2">
    <h3 class="text-sm font-bold text-white/90">Boletín formativo</h3>
    <span class="text-[10px] font-mono px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
      Nivel: {nivel}
    </span>
  </div>

  <dl class="space-y-2 text-xs">
    <div>
      <dt class="font-bold uppercase tracking-wider text-[10px] text-emerald-400">Fortaleza máxima</dt>
      <dd class="text-white/75 mt-0.5">{fortaleza}</dd>
    </div>
    <div>
      <dt class="font-bold uppercase tracking-wider text-[10px] text-red-400">Brecha de aprendizaje</dt>
      <dd class="text-white/75 mt-0.5">{brecha}</dd>
    </div>
    <div>
      <dt class="font-bold uppercase tracking-wider text-[10px] text-yellow-300">Acción recomendada</dt>
      <dd class="text-white/75 mt-0.5">{accion}</dd>
    </div>
  </dl>

  {#if hrefEstudio}
    <a href={hrefEstudio} class="inline-block text-xs font-bold text-emerald-300 hover:text-emerald-200 transition-colors">
      Ir al refuerzo →
    </a>
  {/if}
  <p class="text-[10px] text-white/30">Mapa de navegación, no calificación. Solo vive en tu dispositivo.</p>
</div>
