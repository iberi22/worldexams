/**
 * Scroll Animation Utilities
 *
 * Provides multiple ways to add scroll-reveal animations:
 * 1. ScrollReveal.svelte component
 * 2. Svelte action: use:scrollReveal
 * 3. CSS classes for Astro components
 */

export interface ScrollRevealOptions {
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

const defaultOptions: ScrollRevealOptions = {
  animation: 'fade-up',
  delay: 0,
  duration: 600,
  threshold: 0.1,
  once: true
};

/**
 * Svelte action for scroll-reveal animations
 *
 * Usage:
 * <div use:scrollReveal={{ animation: 'fade-up', delay: 100 }}>
 *   Content
 * </div>
 */
export function scrollReveal(node: HTMLElement, options: ScrollRevealOptions = {}) {
  const opts = { ...defaultOptions, ...options };

  // Apply initial styles
  node.style.transition = `opacity ${opts.duration}ms ease, transform ${opts.duration}ms ease`;
  node.style.transitionDelay = `${opts.delay}ms`;
  node.style.opacity = '0';

  // Set initial transform based on animation type
  const transforms: Record<string, string> = {
    'fade-up': 'translateY(2rem)',
    'fade-down': 'translateY(-2rem)',
    'fade-left': 'translateX(2rem)',
    'fade-right': 'translateX(-2rem)',
    'zoom-in': 'scale(0.9)',
    'zoom-out': 'scale(1.1)'
  };

  node.style.transform = transforms[opts.animation || 'fade-up'];

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    node.style.opacity = '1';
    node.style.transform = 'none';
    return { destroy() {} };
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          node.style.opacity = '1';
          node.style.transform = 'none';

          if (opts.once) {
            observer.unobserve(node);
          }
        } else if (!opts.once) {
          node.style.opacity = '0';
          node.style.transform = transforms[opts.animation || 'fade-up'];
        }
      });
    },
    { threshold: opts.threshold, rootMargin: '0px 0px -50px 0px' }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
    update(newOptions: ScrollRevealOptions) {
      Object.assign(opts, newOptions);
    }
  };
}

/**
 * Initialize scroll reveal for elements with data-sr attribute
 * Use in Astro pages with client:load or in a script tag
 *
 * Usage in Astro:
 * <div data-sr="fade-up" data-sr-delay="100">Content</div>
 *
 * Then call initScrollReveal() after DOM is ready
 */
export function initScrollReveal() {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll('[data-sr]');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    elements.forEach(el => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach(el => {
    const htmlEl = el as HTMLElement;
    const animation = el.getAttribute('data-sr') || 'fade-up';
    const delay = el.getAttribute('data-sr-delay') || '0';

    htmlEl.classList.add('sr-init', `sr-${animation}`);
    htmlEl.style.transitionDelay = `${delay}ms`;

    observer.observe(el);
  });
}

/**
 * CSS classes to include in global styles for data-sr usage
 */
export const scrollRevealCSS = `
  /* Scroll Reveal Initial States */
  .sr-init {
    opacity: 0;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .sr-fade-up { transform: translateY(2rem); }
  .sr-fade-down { transform: translateY(-2rem); }
  .sr-fade-left { transform: translateX(2rem); }
  .sr-fade-right { transform: translateX(-2rem); }
  .sr-zoom-in { transform: scale(0.9); }
  .sr-zoom-out { transform: scale(1.1); }

  /* Visible State */
  .sr-visible {
    opacity: 1 !important;
    transform: none !important;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .sr-init {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }
`;
