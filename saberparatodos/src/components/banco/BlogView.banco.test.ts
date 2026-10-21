import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte/svelte5';

vi.mock('../../lib/video-manifest', () => ({
  loadVideoManifest: vi.fn(async () => new Map()),
  getVideoManifestDefaults: vi.fn(async () => ({})),
}));

import BlogView from '../BlogView.svelte';

function makeQuestion(n: number) {
  const bundleId = `CO-MAT-11-2026-W0${(n % 9) + 1}-funciones-001-MASTERY-bundle`;
  return {
    id: `${bundleId}-v${n}`,
    bundleId,
    text: `Pregunta número ${n}`,
    category: `Matemáticas :: ${bundleId}`,
    grade: 11,
    difficulty: 3,
    correctOptionId: 'B',
    explanation: `Explicación ${n}`,
    options: [
      { id: 'A', text: 'uno', feedback: 'Incorrecto. Olvidaste sumar el término independiente.' },
      { id: 'B', text: 'dos', feedback: 'Correcto. 1 + 1 = 2.' },
      { id: 'C', text: 'tres', feedback: 'Incorrecto. Confundiste el signo al despejar.' },
      { id: 'D', text: 'cuatro', feedback: 'Incorrecto. Multiplicaste en lugar de sumar.' },
    ],
  };
}

describe('BlogView — Banco social practice-first', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ counts: {} }), { status: 200 })));
  });

  it('cards and modal link to the public page; the answer is hidden on open', async () => {
    const questions = [makeQuestion(1), makeQuestion(2)];
    render(BlogView, { props: { questions, onBack: () => {} } });

    const cards = screen.getAllByTestId('banco-card');
    expect(cards).toHaveLength(2);
    const cardLink = cards[0].querySelector('[data-testid="banco-permalink"]') as HTMLAnchorElement;
    expect(cardLink.getAttribute('href')).toBe(
      '/preguntas/colombia/grado-11/matematicas/CO-MAT-11-2026-W02-funciones-001-MASTERY-bundle/',
    );
    expect(cardLink.textContent).toContain('Abrir página pública');

    await fireEvent.click(cards[0].querySelector('button')!);
    const modal = await screen.findByTestId('banco-modal');
    expect(modal.getAttribute('role')).toBe('dialog');
    expect(modal.getAttribute('aria-modal')).toBe('true');
    for (const option of screen.getAllByTestId('banco-option')) expect(option.dataset.state).toBe('neutral');
    expect(modal.textContent).not.toContain('Correcta');
    expect(modal.textContent).not.toContain('Explicación 1');
    expect(modal.textContent).not.toContain('Video en generación');
    expect(modal.querySelector('.ad-container')).toBeNull();
    expect(screen.getByTestId('banco-modal-permalink').getAttribute('href')).toBe(cardLink.getAttribute('href'));

    const wrong = screen.getAllByTestId('banco-option').find((o) => o.dataset.optionId === 'A')!;
    await fireEvent.click(wrong);
    expect(screen.getByTestId('banco-result').textContent).toContain('Incorrecto');
    expect(modal.textContent).toContain('Olvidaste sumar el término independiente');
    expect(modal.textContent).toContain('Explicación 1');

    await fireEvent.keyDown(modal, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByTestId('banco-modal')).toBeNull());
  });

  it('keeps focus trapped inside the modal', async () => {
    render(BlogView, { props: { questions: [makeQuestion(1)], onBack: () => {} } });
    await fireEvent.click(screen.getByTestId('banco-card').querySelector('button')!);
    const modal = await screen.findByTestId('banco-modal');
    await waitFor(() => expect(modal.contains(document.activeElement)).toBe(true));

    const focusables = modal.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    const last = focusables[focusables.length - 1];
    last.focus();
    await fireEvent.keyDown(modal, { key: 'Tab' });
    expect(document.activeElement).toBe(focusables[0]);
    await fireEvent.keyDown(modal, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it('shows skeleton cards while loading and Spanish empty/error states', async () => {
    const { unmount } = render(BlogView, { props: { questions: [], isLoading: true, onBack: () => {} } });
    expect(screen.getAllByTestId('banco-skeleton').length).toBeGreaterThan(0);
    expect(screen.queryByTestId('banco-empty')).toBeNull();
    unmount();

    const empty = render(BlogView, { props: { questions: [], onBack: () => {} } });
    expect(screen.getByTestId('banco-empty').textContent).toContain('Aún no hay preguntas');
    empty.unmount();

    render(BlogView, { props: { questions: [], loadError: 'Sin conexión', onBack: () => {} } });
    expect(screen.getByTestId('banco-error').textContent).toContain('No pudimos cargar el banco de preguntas');
  });

  it('places ads at most once every 12 cards on mobile', async () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query.includes('max-width: 639px'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    const questions = Array.from({ length: 24 }, (_, i) => makeQuestion(i + 1));
    const { container } = render(BlogView, { props: { questions, onBack: () => {} } });
    await waitFor(() => expect(container.querySelectorAll('.ad-container')).toHaveLength(2));
    vi.unstubAllGlobals();
  });
});
