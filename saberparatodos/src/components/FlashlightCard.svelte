<script lang="ts">
  import { onMount } from 'svelte';

  export let className = "";
  export let isActive = false;
  export let onclick: (() => void) | undefined = undefined;

  let divRef: HTMLDivElement;
  let position = { x: 0, y: 0 };
  let opacity = 0;

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

  function handleClick(e: MouseEvent) {
    if (onclick) {
      onclick();
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={divRef}
  onmousemove={handleMouseMove}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  onclick={handleClick}
  role="button"
  tabindex="0"
  class={`
    relative overflow-hidden rounded-xl border transition-all duration-300
    ${isActive ? 'border-emerald-500 bg-emerald-900/10' : 'border-white/10 bg-[#1E1E1E]/40'}
    backdrop-blur-sm group cursor-pointer
    ${className}
  `}
>
  <div
    class="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
    style={`
      background: radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.1), transparent 40%);
      opacity: ${opacity};
    `}
  />
  <div class="relative z-10 w-full h-full">
    <slot />
  </div>
</div>
