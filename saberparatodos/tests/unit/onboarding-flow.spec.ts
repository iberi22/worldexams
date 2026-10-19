import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, fireEvent, cleanup, act } from '@testing-library/svelte/svelte5';
import OnboardingFlow from '../../src/components/OnboardingFlow.svelte';

describe('OnboardingFlow Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    // Stub Element.animate to prevent JSDOM errors with Svelte transitions
    Element.prototype.animate = vi.fn().mockImplementation(() => {
      const anim: any = {
        onfinish: null,
        cancel: vi.fn(),
      };
      setTimeout(() => {
        if (typeof anim.onfinish === 'function') {
          anim.onfinish();
        }
      }, 0);
      return anim;
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it('renders step 1 honest guest content initially if not seen', async () => {
    const { container } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600); // 500ms timeout for appearance
    });

    const flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow).not.toBeNull();

    // Textos honestos: modo invitado, sin cuentas falsas
    expect(flow?.textContent).toContain('Modo invitado sin cuenta');
    expect(flow?.textContent).toContain('La plataforma funciona sin registro ni cuentas en la nube');
    expect(flow?.textContent).not.toContain('crear una cuenta es opcional');
  });

  it('does not render if worldexams_onboarding_seen is true', async () => {
    localStorage.setItem('worldexams_onboarding_seen', 'true');
    const { container } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });

    const flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow).toBeNull();
  });

  it('navigates through offline and honest steps when Siguiente is clicked', async () => {
    const { container, getByText } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });

    let flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Modo invitado sin cuenta');

    // Step 2: Progreso local y honestidad offline
    const nextBtn = getByText('Siguiente');
    await fireEvent.click(nextBtn);

    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Progreso local en tu navegador');
    expect(flow?.textContent).toContain('No hay servidores de sincronización en la nube');

    // Step 3: Caja fuerte cifrada local
    await fireEvent.click(nextBtn);
    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Caja fuerte cifrada local');

    // Step 4: IA y práctica offline
    await fireEvent.click(nextBtn);
    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('IA y práctica offline');

    // Step 5: Control total en el dispositivo
    await fireEvent.click(nextBtn);
    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Control total en tu dispositivo');
    expect(flow?.textContent).toContain('Empezar');
  });

  it('navigates to prev step when Anterior is clicked', async () => {
    const { container, getByText } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });

    const nextBtn = getByText('Siguiente');
    await fireEvent.click(nextBtn);

    let flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Progreso local en tu navegador');

    const prevBtn = getByText('Anterior');
    await fireEvent.click(prevBtn);

    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Modo invitado sin cuenta');
  });

  it('dismisses the overlay, advances timers, and asserts absence before cleanup on Saltar', async () => {
    let dismissed = false;
    const { container, getByText } = render(OnboardingFlow, {
      props: {
        ondismiss: () => {
          dismissed = true;
        },
      },
    });

    await act(() => {
      vi.advanceTimersByTime(600);
    });

    let flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow).not.toBeNull();

    const skipBtn = getByText('Saltar');
    await fireEvent.click(skipBtn);

    // Advance exit transition timers
    await act(() => {
      vi.advanceTimersByTime(500);
    });

    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow).toBeNull();
    expect(localStorage.getItem('worldexams_onboarding_seen')).toBe('true');
    expect(dismissed).toBe(true);

    cleanup();
  });

  it('dismisses dialog on Escape key press (keyboard accessibility)', async () => {
    const { container } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });

    let flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow).not.toBeNull();

    await fireEvent.keyDown(window, { key: 'Escape' });

    await act(() => {
      vi.advanceTimersByTime(500);
    });

    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow).toBeNull();
    expect(localStorage.getItem('worldexams_onboarding_seen')).toBe('true');
  });

  it('has accessible dialog attributes and supports Tab focus trapping', async () => {
    const { container, getByText } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(dialog?.getAttribute('aria-labelledby')).toBe('onboarding-title');
    expect(dialog?.getAttribute('aria-describedby')).toBe('onboarding-body');

    const skipBtn = getByText('Saltar');
    const nextBtn = getByText('Siguiente');

    // Simulate Tab on last button wraps to first
    nextBtn.focus();
    expect(document.activeElement).toBe(nextBtn);

    await fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });
    expect(document.activeElement).toBe(skipBtn);

    // Simulate Shift+Tab on first button wraps to last
    skipBtn.focus();
    expect(document.activeElement).toBe(skipBtn);

    await fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(nextBtn);
  });
});
