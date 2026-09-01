<script lang="ts">
  import type { FullCognitiveProfile } from '../../lib/neurogym/scoring-cognitive';

  interface Props {
    profile: FullCognitiveProfile;
    size?: number;
  }

  let { profile, size = 320 }: Props = $props();

  const center = size / 2;
  const radius = size * 0.38;

  // 5 Ejes cognitivos
  const axes = [
    { label: 'Razonamiento (IQ)', score: profile.overallIQProxy.standardScore },
    { label: 'Memoria Trabajo', score: profile.workingMemory.standardScore },
    { label: 'Velocidad (PSI)', score: profile.processingSpeed.standardScore },
    { label: 'Agilidad Motora', score: profile.motorAgility.standardScore },
    { label: 'Flexibilidad', score: profile.analyticalFlexibility.standardScore }
  ];

  // Mapea standard score (40 - 160) a distancia desde el centro [0, radius]
  function scoreToRadius(score: number): number {
    const clamped = Math.max(40, Math.min(160, score));
    return ((clamped - 40) / 120) * radius;
  }

  function getPoint(angleRad: number, r: number) {
    const x = center + r * Math.sin(angleRad);
    const y = center - r * Math.cos(angleRad);
    return { x, y };
  }

  // Genera polígono para una distancia constante
  function getPolygonPoints(r: number): string {
    return axes.map((_, i) => {
      const angle = (i * 2 * Math.PI) / axes.length;
      const pt = getPoint(angle, r);
      return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    }).join(' ');
  }

  // Polígono del usuario
  let userPolygonPoints = $derived.by(() => {
    return axes.map((axis, i) => {
      const angle = (i * 2 * Math.PI) / axes.length;
      const r = scoreToRadius(axis.score);
      const pt = getPoint(angle, r);
      return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    }).join(' ');
  });

  // Polígono baseline (Score 100)
  const baselineRadius = scoreToRadius(100);
  const baselinePoints = getPolygonPoints(baselineRadius);
</script>

<div class="flex flex-col items-center justify-center p-4 bg-black/60 border border-white/15 rounded-3xl shadow-xl">
  <svg width={size} height={size} viewBox="0 0 {size} {size}" class="overflow-visible">
    <!-- Concentric Background Grid Rings -->
    {#each [0.25, 0.5, 0.75, 1] as fraction}
      <polygon
        points={getPolygonPoints(radius * fraction)}
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
      {@const endPt = getPoint(angle, radius)}
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
      {@const r = scoreToRadius(axis.score)}
      {@const pt = getPoint(angle, r)}
      {@const labelPt = getPoint(angle, radius + 22)}

      <circle
        cx={pt.x}
        cy={pt.y}
        r="4.5"
        fill="#34d399"
        stroke="#000"
        stroke-width="1.5"
      />

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
