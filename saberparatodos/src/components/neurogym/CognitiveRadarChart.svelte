<script lang="ts">
  import type { FullCognitiveProfile } from '../../lib/neurogym/scoring-cognitive';

  interface Props {
    profile: FullCognitiveProfile;
    size?: number;
  }

  let { profile, size = 320 }: Props = $props();

  const center = $derived(size / 2);
  const radius = $derived(size * 0.38);

  // 5 Ejes cognitivos
  const axes = $derived([
    { label: 'Razonamiento (IQ)', score: profile.overallIQProxy.standardScore },
    { label: 'Memoria Trabajo', score: profile.workingMemory.standardScore },
    { label: 'Velocidad (PSI)', score: profile.processingSpeed.standardScore },
    { label: 'Agilidad Motora', score: profile.motorAgility.standardScore },
    { label: 'Flexibilidad', score: profile.analyticalFlexibility.standardScore }
  ]);

  // Mapea standard score (40 - 160) a distancia desde el centro [0, radius]
  function scoreToRadius(score: number, rMax: number): number {
    const clamped = Math.max(40, Math.min(160, score));
    return ((clamped - 40) / 120) * rMax;
  }

  function getPoint(angleRad: number, r: number, c: number) {
    const x = c + r * Math.sin(angleRad);
    const y = c - r * Math.cos(angleRad);
    return { x, y };
  }

  // Genera polígono para una distancia constante
  function getPolygonPoints(r: number, c: number): string {
    return axes.map((_, i) => {
      const angle = (i * 2 * Math.PI) / axes.length;
      const pt = getPoint(angle, r, c);
      return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    }).join(' ');
  }

  // Polígono del usuario
  let userPolygonPoints = $derived.by(() => {
    return axes.map((axis, i) => {
      const angle = (i * 2 * Math.PI) / axes.length;
      const r = scoreToRadius(axis.score, radius);
      const pt = getPoint(angle, r, center);
      return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    }).join(' ');
  });

  // Polígono baseline (Score 100)
  let baselineRadius = $derived(scoreToRadius(100, radius));
  let baselinePoints = $derived(getPolygonPoints(baselineRadius, center));

  let chartSummary = $derived(
    axes.map(a => `${a.label}: ${a.score}`).join(', ')
  );
</script>

<div class="flex flex-col items-center justify-center p-4 bg-black/60 border border-white/15 rounded-3xl shadow-xl">
  <svg
    width={size}
    height={size}
    viewBox="0 0 {size} {size}"
    class="overflow-visible"
    role="img"
    aria-label="Gráfico pentagonal de radar cognitivo: {chartSummary}"
  >
    <title>Perfil Cognitivo NeuroGym</title>
    <desc>Gráfico pentagonal con 5 ejes cognitivos: {chartSummary}</desc>

    <!-- Concentric Background Grid Rings -->
    {#each [0.25, 0.5, 0.75, 1] as fraction}
      <polygon
        points={getPolygonPoints(radius * fraction, center)}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="1"
      />
    {/each}

    <!-- Baseline Standard Score 100 Ring -->
    <polygon
      points={baselinePoints}
      fill="none"
      stroke="rgba(16,185,129,0.3)"
      stroke-dasharray="3,3"
      stroke-width="1.5"
    />

    <!-- Radial Axis Lines -->
    {#each axes as _, i}
      {@const angle = (i * 2 * Math.PI) / axes.length}
      {@const endPt = getPoint(angle, radius, center)}
      <line
        x1={center}
        y1={center}
        x2={endPt.x}
        y2={endPt.y}
        stroke="rgba(255,255,255,0.12)"
        stroke-width="1"
      />
    {/each}

    <!-- User Profile Area -->
    <polygon
      points={userPolygonPoints}
      fill="rgba(52,211,153,0.25)"
      stroke="#34d399"
      stroke-width="2.5"
      class="transition-all duration-700 ease-out"
    />

    <!-- User Axis Data Points & Labels -->
    {#each axes as axis, i}
      {@const angle = (i * 2 * Math.PI) / axes.length}
      {@const r = scoreToRadius(axis.score, radius)}
      {@const pt = getPoint(angle, r, center)}
      {@const labelPt = getPoint(angle, radius + 22, center)}

      <circle
        cx={pt.x}
        cy={pt.y}
        r="4.5"
        fill="#34d399"
        stroke="#000"
        stroke-width="1.5"
      >
        <title>{axis.label}: {axis.score} pts</title>
      </circle>

      <text
        x={labelPt.x}
        y={labelPt.y}
        text-anchor="middle"
        dominant-baseline="central"
        class="text-[9px] font-bold uppercase tracking-wider fill-white/80 font-mono"
      >
        {axis.label}
      </text>
    {/each}
  </svg>
  <span class="text-[9px] text-white/40 mt-3 font-mono">Línea discontinua verde = Promedio poblacional (100 pts)</span>
</div>
