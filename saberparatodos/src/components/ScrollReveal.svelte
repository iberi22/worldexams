<script lang="ts">
  /**
   * ScrollReveal.svelte
   * Componente para animaciones de scroll reveal usando Intersection Observer
   *
   * Uso:
   * <ScrollReveal animation="fade-up" delay={100}>
   *   <div>Contenido que se animará</div>
   * </ScrollReveal>
   */

  import { onMount } from 'svelte';

  // Props
  export let animation: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out' | 'flip' = 'fade-up';
  export let delay: number = 0;
  export let duration: number = 600;
  export let threshold: number = 0.1;
  export let once: boolean = true;
  export let easing: string = 'cubic-bezier(0.16, 1, 0.3, 1)';

  let element: HTMLDivElement;
  let isVisible = false;

  onMount(() => {
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: mostrar contenido sin animación
      isVisible = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isVisible = true;
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            isVisible = false;
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  });

  // Mapeo de animaciones a clases CSS
  const animationClasses = {
    'fade-up': 'translate-y-8 opacity-0',
    'fade-down': '-translate-y-8 opacity-0',
    'fade-left': 'translate-x-8 opacity-0',
    'fade-right': '-translate-x-8 opacity-0',
    'zoom-in': 'scale-90 opacity-0',
    'zoom-out': 'scale-110 opacity-0',
    'flip': 'rotateX-90 opacity-0'
  };
</script>

<div
  bind:this={element}
  class="scroll-reveal-wrapper"
  style="
    --sr-duration: {duration}ms;
    --sr-delay: {delay}ms;
    --sr-easing: {easing};
  "
  class:is-visible={isVisible}
  data-animation={animation}
>
  <slot />
</div>

<style>
  .scroll-reveal-wrapper {
    transition-property: opacity, transform;
    transition-duration: var(--sr-duration);
    transition-delay: var(--sr-delay);
    transition-timing-function: var(--sr-easing);
    will-change: opacity, transform;
  }

  /* Estado inicial (oculto) */
  .scroll-reveal-wrapper:not(.is-visible) {
    opacity: 0;
  }

  .scroll-reveal-wrapper[data-animation="fade-up"]:not(.is-visible) {
    transform: translateY(2rem);
  }

  .scroll-reveal-wrapper[data-animation="fade-down"]:not(.is-visible) {
    transform: translateY(-2rem);
  }

  .scroll-reveal-wrapper[data-animation="fade-left"]:not(.is-visible) {
    transform: translateX(2rem);
  }

  .scroll-reveal-wrapper[data-animation="fade-right"]:not(.is-visible) {
    transform: translateX(-2rem);
  }

  .scroll-reveal-wrapper[data-animation="zoom-in"]:not(.is-visible) {
    transform: scale(0.9);
  }

  .scroll-reveal-wrapper[data-animation="zoom-out"]:not(.is-visible) {
    transform: scale(1.1);
  }

  .scroll-reveal-wrapper[data-animation="flip"]:not(.is-visible) {
    transform: perspective(1000px) rotateX(20deg);
  }

  /* Estado final (visible) */
  .scroll-reveal-wrapper.is-visible {
    opacity: 1;
    transform: none;
  }

  /* Reducir movimiento si el usuario lo prefiere */
  @media (prefers-reduced-motion: reduce) {
    .scroll-reveal-wrapper {
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
</style>
