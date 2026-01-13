<script lang="ts">
  export let data: { label: string; value: number; fullMark: number }[] = [];
  export let size = 300;
  export let color = '#10b981'; // Emerald-500

  // Config
  const padding = 40;
  const levels = 4; // Number of concentric webs

  $: radius = (size - padding * 2) / 2;
  $: center = size / 2;
  $: angleSlice = (Math.PI * 2) / data.length;

  // Helpers
  function getCoordinates(value: number, index: number, max: number) {
    const angle = index * angleSlice - Math.PI / 2; // Start from top (-90deg)
    const r = (value / max) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  }

  $: points = data.map((d, i) => {
    const coords = getCoordinates(d.value, i, d.fullMark);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  // Generate web levels
  $: webPoints = Array.from({ length: levels }).map((_, l) => {
    const levelFactor = (l + 1) / levels;
    return data.map((d, i) => {
      const coords = getCoordinates(d.fullMark * levelFactor, i, d.fullMark);
      return `${coords.x},${coords.y}`;
    }).join(' ');
  });

  // Generate axes
  $: axes = data.map((d, i) => {
    const coords = getCoordinates(d.fullMark, i, d.fullMark);
    return { x1: center, y1: center, x2: coords.x, y2: coords.y };
  });

  // Generate labels
  $: labels = data.map((d, i) => {
    const angle = i * angleSlice - Math.PI / 2;
    const labelRadius = radius + 20; // Push label out
    return {
      name: d.label,
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
      anchor: Math.cos(angle) > 0.1 ? 'start' : Math.cos(angle) < -0.1 ? 'end' : 'middle',
      baseline: Math.sin(angle) > 0.1 ? 'hanging' : 'baseline' // Simplified alignment
    };
  });
</script>

<div class="relative flex items-center justify-center p-4">
  <svg width={size} height={size} viewBox="0 0 {size} {size}" class="overflow-visible">
    <!-- Background Webs -->
    {#each webPoints as points, i}
      <polygon
        {points}
        fill="none"
        stroke="white"
        stroke-opacity={i === levels - 1 ? 0.2 : 0.1}
        stroke-width="1"
        stroke-dasharray={i === levels - 1 ? "0" : "4 4"}
      />
    {/each}

    <!-- Axes -->
    {#each axes as axis}
      <line
        x1={axis.x1}
        y1={axis.y1}
        x2={axis.x2}
        y2={axis.y2}
        stroke="white"
        stroke-opacity="0.1"
        stroke-width="1"
      />
    {/each}

    <!-- Data Area -->
    <polygon
      {points}
      fill={color}
      fill-opacity="0.2"
      stroke={color}
      stroke-width="2"
      class="drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-1000 ease-out"
    />

    <!-- Data Points -->
    {#each data as d, i}
      {@const coords = getCoordinates(d.value, i, d.fullMark)}
      <circle
        cx={coords.x}
        cy={coords.y}
        r="4"
        fill={color}
        class="transition-all duration-1000 ease-out hover:r-6 cursor-crosshair"
      >
        <title>{d.label}: {Math.round(d.value)}%</title>
      </circle>
    {/each}

    <!-- Labels -->
    {#each labels as label}
      <text
        x={label.x}
        y={label.y}
        text-anchor={label.anchor}
        dominant-baseline={label.baseline}
        fill="white"
        fill-opacity="0.7"
        font-size="10"
        font-weight="bold"
        class="uppercase tracking-wide"
      >
        {label.name.length > 15 ? label.name.substring(0, 12) + '...' : label.name}
      </text>
    {/each}
  </svg>
</div>
