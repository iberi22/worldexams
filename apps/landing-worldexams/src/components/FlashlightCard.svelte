<script lang="ts">
  /**
   * FlashlightCard.svelte
   *
   * Interactive card with flashlight hover effect.
   * Used for answer options in ExamView.
   */
  import type { FlashlightCardProps } from '../lib/types';

  let {
    className = "",
    isActive = false,
    isCorrect = false,
    isWrong = false,
  }: FlashlightCardProps = $props();

  let divRef: HTMLDivElement;
  let position = $state({ x: 0, y: 0 });
  let opacity = $state(0);

  function handleMouseMove(e: MouseEvent) {
    if (!divRef) return;
    const rect = divRef.getBoundingClientRect();
    position = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handleMouseEnter() {
    opacity = 1;
  }

  function handleMouseLeave() {
    opacity = 0;
  }

  // Dynamic border/background based on state
  const borderClass = $derived(
    isCorrect ? 'border-emerald-500 bg-emerald-900/10' :
    isWrong ? 'border-red-500 bg-red-900/10' :
    isActive ? 'border-accent-cyan bg-accent-cyan/10' :
    'border-white/10 bg-bg-card/40'
  );

  // Glow color based on state
  const glowColor = $derived(
    isCorrect ? 'rgba(16, 185, 129, 0.15)' :
    isWrong ? 'rgba(239, 68, 68, 0.15)' :
    'rgba(0, 255, 255, 0.1)'
  );
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={divRef}
  onmousemove={handleMouseMove}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  class={`
    relative overflow-hidden rounded-xl border transition-all duration-300
    ${borderClass}
    backdrop-blur-sm group
    ${className}
  `}
>
  <!-- Flashlight effect layer -->
  <div
    class="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
    style={`
      background: radial-gradient(600px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%);
      opacity: ${opacity};
    `}
  ></div>

  <!-- Content slot -->
  <div class="relative z-10 w-full h-full">
    <slot />
  </div>
</div>
