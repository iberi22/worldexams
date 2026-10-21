/**
 * Acción Svelte que mantiene el foco dentro de un diálogo modal, cierra con
 * Escape y devuelve el foco al elemento que lo abrió.
 */

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export interface FocusTrapOptions {
  onEscape?: () => void;
}

function focusableIn(node: HTMLElement): HTMLElement[] {
  return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('inert') && el.getAttribute('aria-hidden') !== 'true',
  );
}

export function focusTrap(node: HTMLElement, options: FocusTrapOptions = {}) {
  let current = options;
  const previouslyFocused = (typeof document !== 'undefined' ? document.activeElement : null) as HTMLElement | null;

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      current.onEscape?.();
      return;
    }
    if (event.key !== 'Tab') return;

    const items = focusableIn(node);
    if (items.length === 0) {
      event.preventDefault();
      node.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement as HTMLElement | null;
    const inside = active ? node.contains(active) : false;

    if (event.shiftKey && (active === first || !inside)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !inside)) {
      event.preventDefault();
      first.focus();
    }
  }

  node.addEventListener('keydown', handleKeydown);
  queueMicrotask(() => {
    if (!node.contains(document.activeElement)) {
      (focusableIn(node)[0] ?? node).focus();
    }
  });

  return {
    update(next: FocusTrapOptions = {}) {
      current = next;
    },
    destroy() {
      node.removeEventListener('keydown', handleKeydown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function' && previouslyFocused.isConnected) {
        previouslyFocused.focus();
      }
    },
  };
}
