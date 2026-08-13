<script lang="ts">
  import { onMount } from 'svelte';

  export let className = "";
  export let isActive = false;
  export let onClick: (() => void) | undefined = undefined;

  let buttonRef: HTMLButtonElement;
  let position = { x: 0, y: 0 };
  let opacity = 0;

  // 🆕 Touch tracking to prevent selection during scroll
  let touchStartPos = { x: 0, y: 0 };
  let isTouchMove = false;
  const SCROLL_THRESHOLD = 10; // pixels of movement before considering it a scroll

  function handleMouseMove(e: MouseEvent) {
    if (!buttonRef) return;
    const rect = buttonRef.getBoundingClientRect();
    position = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handleMouseEnter() {
    opacity = 1;
  }

  function handleMouseLeave() {
    opacity = 0;
  }

  // 🆕 Touch handlers for scroll vs tap differentiation
  function handleTouchStart(e: TouchEvent) {
    touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    isTouchMove = false;
  }

  function handleTouchMove(e: TouchEvent) {
    const dx = Math.abs(e.touches[0].clientX - touchStartPos.x);
    const dy = Math.abs(e.touches[0].clientY - touchStartPos.y);
    if (dx > SCROLL_THRESHOLD || dy > SCROLL_THRESHOLD) {
      isTouchMove = true;
    }
  }

  function handleTouchEnd(e: TouchEvent) {
    // Only trigger click if it wasn't a scroll gesture
    if (!isTouchMove && onClick) {
      e.preventDefault(); // Prevent subsequent click event
      onClick();
    }
    isTouchMove = false;
  }

  function handleClick(e: MouseEvent) {
    if (onClick) {
      onClick();
    }
  }
</script>

<button
  type="button"
  bind:this={buttonRef}
  onmousemove={handleMouseMove}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  onclick={handleClick}
  ontouchstart={handleTouchStart}
  ontouchmove={handleTouchMove}
  ontouchend={handleTouchEnd}
  class={`
    w-full text-left block relative overflow-hidden rounded-xl border transition-all duration-300
    ${isActive ? 'border-emerald-500 bg-emerald-900/10' : 'border-white/10 bg-[#1E1E1E]/40'}
    backdrop-blur-sm group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
    ${className}
  `}
>
  <div
    class="flashlight-effect pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
    style={`
      background: radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.1), transparent 40%);
      opacity: ${opacity};
    `}
  />
  <div class="relative z-10 w-full h-full">
    <slot />
  </div>
</button>

<style>
  /* 🔥 CRITICAL: Disable flashlight effect on touch devices to prevent sticky hover */
  @media (hover: none) {
    .flashlight-effect {
      display: none !important;
      opacity: 0 !important;
    }
  }
</style>
