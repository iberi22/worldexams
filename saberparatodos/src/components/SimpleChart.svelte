<script lang="ts">
  export let data: number[] = [];
  export let labels: string[] = [];
  export let height: number = 200;
  export let color: string = '#10b981'; // emerald-500
  export let type: 'bar' | 'line' = 'bar';
  export let referenceValue: number | null = null; // Optional target line

  $: max = Math.max(...data, referenceValue || 0, 1);
  $: barWidth = data.length > 0 ? (100 / data.length) * 0.7 : 0;
  
  // Cubic Bezier path generation for smooth lines
  function generateSmoothPath(data: number[]) {
    if (data.length < 2) return "";
    const points = data.map((v, i) => ({
      x: (i / (data.length - 1)) * 100,
      y: 100 - (v / max) * 85
    }));
    
    let path = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cp1x = p0.x + (p1.x - p0.x) / 2;
      path += ` C ${cp1x},${p0.y} ${cp1x},${p1.y} ${p1.x},${p1.y}`;
    }
    return path;
  }

  $: smoothPath = type === 'line' ? generateSmoothPath(data) : "";
  $: fillPath = type === 'line' ? `${smoothPath} L 100,100 L 0,100 Z` : "";
</script>

<div class="w-full relative group" style="height: {height}px">
  <svg class="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <linearGradient id="chartGradient-{color.replace('#','')}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:{color};stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:{color};stop-opacity:0" />
      </linearGradient>
    </defs>

    {#if referenceValue !== null}
      {@const y = 100 - (referenceValue / max) * 85}
      <line 
        x1="0" y1="{y}" x2="100" y2="{y}" 
        stroke="white" stroke-opacity="0.1" stroke-width="0.5" stroke-dasharray="2 2" 
      />
      <text x="100%" y="{y - 2}" text-anchor="end" class="text-[3px] fill-white/20 font-black uppercase tracking-tighter">Target: {referenceValue}</text>
    {/if}

    {#if type === 'bar'}
      {#each data as value, i}
        {@const barHeight = (value / max) * 85}
        {@const x = (i / data.length) * 100 + ((100 / data.length) * 0.15)}
        <rect
          x="{x}%"
          y="{100 - barHeight}%"
          width="{barWidth}%"
          height="{barHeight}%"
          rx="2"
          fill={color}
          fill-opacity="0.6"
          class="transition-all duration-500 hover:fill-opacity-100 cursor-pointer"
        >
          <title>{labels[i]}: {value}</title>
        </rect>
      {/each}
    {:else}
      <!-- Smooth Line chart -->
      <path
        d={fillPath}
        fill="url(#chartGradient-{color.replace('#','')})"
        class="transition-all duration-1000 ease-out"
      />
      <path
        d={smoothPath}
        fill="none"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_{color}44]"
      />
      
      {#each data as value, i}
        {@const cx = (i / (data.length - 1)) * 100}
        {@const cy = 100 - (value / max) * 85}
        <circle
          cx="{cx}%"
          cy="{cy}%"
          r="1.5"
          fill="#121212"
          stroke={color}
          stroke-width="1"
          class="transition-all duration-500 hover:r-3 cursor-pointer"
        >
          <title>{labels[i]}: {value}</title>
        </circle>
      {/each}
    {/if}
  </svg>
</div>
