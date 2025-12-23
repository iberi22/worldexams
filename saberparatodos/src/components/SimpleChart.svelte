<script lang="ts">
  export let data: number[] = [];
  export let labels: string[] = [];
  export let height: number = 200;
  export let color: string = '#10b981'; // emerald-500
  export let type: 'bar' | 'line' = 'bar';

  $: max = Math.max(...data, 1);
  $: barWidth = data.length > 0 ? (100 / data.length) * 0.8 : 0;
</script>

<div class="w-full" style="height: {height}px">
  <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
    {#if type === 'bar'}
      {#each data as value, i}
        {@const barHeight = (value / max) * 90}
        {@const x = (i / data.length) * 100 + ((100 / data.length) * 0.1)}
        <rect
          x="{x}%"
          y="{100 - barHeight}%"
          width="{barWidth}%"
          height="{barHeight}%"
          fill={color}
          opacity="0.8"
          class="transition-all duration-300 hover:opacity-100"
        />
        <text
          x="{x + barWidth/2}%"
          y="98%"
          text-anchor="middle"
          class="text-[3px] fill-white/40"
        >
          {labels[i] || ''}
        </text>
      {/each}
    {:else}
      <!-- Line chart -->
      {@const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 90}`).join(' ')}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        stroke-width="2"
        opacity="0.8"
      />
      {#each data as value, i}
        <circle
          cx="{(i / (data.length - 1)) * 100}%"
          cy="{100 - (value / max) * 90}%"
          r="2"
          fill={color}
          class="transition-all duration-300"
        />
      {/each}
    {/if}
  </svg>
</div>
