import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import RankedExamView from '../../src/components/ranked/RankedExamView.svelte';
import * as rankedClient from '../../src/lib/ranked/ranked-client';

vi.mock('../../src/lib/ranked/ranked-client', () => ({
  startRanked: vi.fn(),
  submitRanked: vi.fn(),
  RANKED_MIN_ANSWERED: 31,
  RANKED_TOTAL_QUESTIONS: 40,
  RANKED_DURATION_S: 3600,
  // real implementation (pure helper) so timer math matches production
  expiresAtMs: (v: string | number) =>
    typeof v === 'number' || /^\d+$/.test(String(v)) ? (Number(v) < 1e12 ? Number(v) * 1000 : Number(v)) : new Date(v).getTime(),
  loadActiveRankedSession: vi.fn(),
  clearActiveRankedSession: vi.fn(),
  saveActiveRankedSession: vi.fn()
}));

const MOCK_QUESTIONS = Array.from({ length: 40 }).map((_, i) => ({
  id: `q${i + 1}`,
  subject: 'MATEMÁTICAS',
  statement: `Pregunta ${i + 1}`,
  options: [
    { letter: 'A', text: 'Opción A' },
    { letter: 'B', text: 'Opción B' }
  ]
}));

describe('RankedExamView', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (rankedClient.loadActiveRankedSession as any).mockReturnValue(null);
    (rankedClient.startRanked as any).mockResolvedValue({
      sessionId: 'session-123',
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
      questions: MOCK_QUESTIONS
    });

    // Mock Fullscreen API
    document.documentElement.requestFullscreen = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(document, 'fullscreenElement', {
      value: document.documentElement,
      configurable: true,
      writable: true
    });
  });

  it('renders rules screen initially', () => {
    render(RankedExamView, { nickname: 'testuser', onExit: vi.fn(), onOpenLeaderboard: vi.fn() });

    expect(screen.getByText(/40 preguntas/i)).toBeDefined();
    expect(screen.getByText(/60 minutos/i)).toBeDefined();
    expect(screen.getByText(/más de 30/i)).toBeDefined();
  });

  it('starts exam, triggers fullscreen and renders question', async () => {
    const { getByText, findByText } = render(RankedExamView, { nickname: 'testuser', onExit: vi.fn(), onOpenLeaderboard: vi.fn() });

    const startBtn = getByText('Comenzar ranked');
    await fireEvent.click(startBtn);

    expect(document.documentElement.requestFullscreen).toHaveBeenCalled();
    expect(rankedClient.startRanked).toHaveBeenCalledWith('testuser');

    // Should render first question
    const qText = await findByText(/Pregunta 1/i);
    expect(qText).toBeDefined();
  });

  it('prevents paste events during exam phase via behavior analyzer', async () => {
    const { getByText, findByText } = render(RankedExamView, { nickname: 'testuser', onExit: vi.fn(), onOpenLeaderboard: vi.fn() });

    await fireEvent.click(getByText('Comenzar ranked'));
    await findByText(/Pregunta 1/i);

    const pasteEvent = new Event('paste', { bubbles: true, cancelable: true });
    document.dispatchEvent(pasteEvent);

    expect(pasteEvent.defaultPrevented).toBe(true);
  });

  it('shows warning when submitting with less than 31 answers', async () => {
    const { getByText, findByText, queryByText } = render(RankedExamView, { nickname: 'testuser', onExit: vi.fn(), onOpenLeaderboard: vi.fn() });

    await fireEvent.click(getByText('Comenzar ranked'));
    await findByText(/Pregunta 1/i);

    // Answer first question
    await fireEvent.click(getByText('A'));

    // Go to last question quickly
    for (let i = 0; i < 39; i++) {
       await fireEvent.click(getByText('Siguiente', { exact: false }));
    }

    const terminarBtn = await findByText('Terminar');
    await fireEvent.click(terminarBtn);

    const warningText = await findByText(/No será elegible para el ranking/i);
    expect(warningText).toBeDefined();
  });

  it('submits successfully and shows result screen', async () => {
    (rankedClient.submitRanked as any).mockResolvedValue({
      status: 'valid',
      score: 850,
      correct: 30,
      answered: 35,
      total: 40,
      review: [
        { questionId: 'q1', correctLetter: 'A', feedback: '¡Correcto!', explanation: 'La respuesta es A porque sí.' }
      ]
    });

    const { getByText, findByText } = render(RankedExamView, { nickname: 'testuser', onExit: vi.fn(), onOpenLeaderboard: vi.fn() });

    await fireEvent.click(getByText('Comenzar ranked'));
    await findByText(/Pregunta 1/i);

    // Answer 31 questions to meet min requirements
    for (let i = 0; i < 31; i++) {
       await fireEvent.click(getByText('A'));
       if (i < 30) {
         await fireEvent.click(getByText('Siguiente', { exact: false }));
       }
    }

    // Skip to end
    for (let i = 0; i < 9; i++) {
       await fireEvent.click(getByText('Siguiente', { exact: false }));
    }

    const terminarBtn = await findByText('Terminar');
    await fireEvent.click(terminarBtn);

    // Will just submit without confirmation because answered >= 31
    const resultText = await findByText(/Publicado si estás sobre el promedio/i);
    expect(resultText).toBeDefined();
    expect(await findByText('850')).toBeDefined();

    // Review info
    expect(await findByText('¡Correcto!')).toBeDefined();
  });
});
