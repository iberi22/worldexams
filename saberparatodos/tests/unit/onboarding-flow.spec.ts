import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/svelte/svelte5';
import OnboardingFlow from '../../src/components/OnboardingFlow.svelte';

describe('OnboardingFlow Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    // Stub Element.animate to prevent JSDOM errors with Svelte transitions
    if (!Element.prototype.animate) {
      Element.prototype.animate = vi.fn().mockImplementation(() => ({
        onfinish: vi.fn(),
        cancel: vi.fn(),
      }));
    }
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it('renders step 1 content initially if not seen', async () => {
    const { container } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600); // 500ms timeout for appearance
    });

    const flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow).not.toBeNull();

    expect(flow?.textContent).toContain('Sin cuenta');
    expect(flow?.textContent).toContain('La plataforma se usa sin registro');
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

  it('navigates to next step when Siguiente is clicked', async () => {
    const { container, getByText } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });

    let flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Sin cuenta');

    const nextBtn = getByText('Siguiente');
    await fireEvent.click(nextBtn);

    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Tu progreso vive en este dispositivo');
  });

  it('navigates to prev step when Anterior is clicked', async () => {
    const { container, getByText } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });

    const nextBtn = getByText('Siguiente');
    await fireEvent.click(nextBtn);

    let flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Tu progreso vive en este dispositivo');

    const prevBtn = getByText('Anterior');
    await fireEvent.click(prevBtn);

    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow?.textContent).toContain('Sin cuenta');
  });

  it('dismisses the overlay and writes localStorage on Saltar', async () => {
    const { container, getByText } = render(OnboardingFlow);
    await act(() => {
      vi.advanceTimersByTime(600);
    });

    let flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow).not.toBeNull();

    const skipBtn = getByText('Saltar');
    await fireEvent.click(skipBtn);

    // Unmount explicitly to avoid transition timer issues during test
    cleanup();

    flow = container.querySelector('[data-testid="onboarding-flow"]');
    expect(flow).toBeNull();
    expect(localStorage.getItem('worldexams_onboarding_seen')).toBe('true');
  });
});
