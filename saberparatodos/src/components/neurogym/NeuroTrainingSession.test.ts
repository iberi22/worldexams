import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import { tick } from 'svelte';
import NeuroTrainingSession from './NeuroTrainingSession.svelte';
import {
  loadLevels,
  loadTrainingHistory,
  saveGameLevel,
  TRAINING_HISTORY_KEY,
  TRAINING_LEVELS_KEY
} from '../../lib/neurogym/training-history';
import { getTrainingGame } from '../../lib/neurogym/training-catalog';

async function press(key: string) {
  await fireEvent.keyDown(window, { key });
  await tick();
}

async function advance(ms: number) {
  await vi.advanceTimersByTimeAsync(ms);
  await tick();
}

/** Tecla 1-4 de StroopColorBoard según el color de tinta mostrado (jsdom lo normaliza a rgb). */
const INK_TO_KEY: Record<string, string> = {
  'rgb(239, 68, 68)': '1',
  'rgb(59, 130, 246)': '2',
  'rgb(16, 185, 129)': '3',
  'rgb(234, 179, 8)': '4'
};

function stroopKey(container: HTMLElement, correct: boolean): string {
  const word = container.querySelector<HTMLElement>('span[aria-live="polite"][style]');
  const key = INK_TO_KEY[word?.style.color ?? ''];
  if (!key) throw new Error(`Color de tinta inesperado: ${word?.style.color}`);
  return correct ? key : key === '1' ? '2' : '1';
}

async function playStroop(container: HTMLElement, trials: number, correct: boolean) {
  for (let i = 0; i < trials; i++) {
    await press(stroopKey(container, correct));
    await advance(800);
  }
}

describe('NeuroTrainingSession', () => {
  beforeEach(() => {
    localStorage.removeItem(TRAINING_HISTORY_KEY);
    localStorage.removeItem(TRAINING_LEVELS_KEY);
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 21, 12));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('muestra instrucciones en español antes de empezar', () => {
    const { getByText } = render(NeuroTrainingSession, { props: { gameId: 'stroop' } });
    expect(getByText('Cómo se juega')).toBeTruthy();
    expect(getByText(/COLOR DE LA TINTA/)).toBeTruthy();
    expect(getByText('▶ Empezar con práctica')).toBeTruthy();
  });

  it('práctica → ronda puntuada → resultados, guarda historial y llama onSessionComplete', async () => {
    const onSessionComplete = vi.fn();
    const def = getTrainingGame('vocabulary');
    const { getByText, findByText } = render(NeuroTrainingSession, {
      props: { gameId: 'vocabulary', onSessionComplete }
    });

    await fireEvent.click(getByText('▶ Empezar con práctica'));
    expect(getByText('Ronda de práctica: no cuenta para tu puntaje.')).toBeTruthy();

    for (let i = 0; i < def.practiceTrials + def.scoredTrials; i++) {
      await press('1');
      await advance(800);
    }

    expect(await findByText('Resultados de la sesión')).toBeTruthy();
    expect(onSessionComplete).toHaveBeenCalledTimes(1);
    const summary = onSessionComplete.mock.calls[0][0];
    expect(summary.gameId).toBe('vocabulary');
    expect(summary.skill).toBe('razonamiento');
    expect(summary.accuracy).toBeGreaterThanOrEqual(0);
    expect(summary.accuracy).toBeLessThanOrEqual(1);

    const history = loadTrainingHistory();
    expect(history).toHaveLength(1);
    expect(history[0].total).toBe(def.scoredTrials);
    expect(loadLevels().vocabulary?.level).toBe(history[0].endLevel);
  });

  it('un ensayo sin respuesta cuenta como fallo al vencer el tiempo', async () => {
    const onSessionComplete = vi.fn();
    const def = getTrainingGame('stroop');
    const { getByText, findByText } = render(NeuroTrainingSession, {
      props: { gameId: 'stroop', onSessionComplete }
    });
    await fireEvent.click(getByText('▶ Empezar con práctica'));
    for (let i = 0; i < def.practiceTrials + def.scoredTrials; i++) {
      await advance(def.deadlineMs(1)! + 800);
    }
    expect(await findByText('Resultados de la sesión')).toBeTruthy();
    expect(onSessionComplete.mock.calls[0][0].accuracy).toBe(0);
    expect(loadTrainingHistory()[0].endLevel).toBe(1);
  });

  it('adapta la dificultad durante la ronda puntuada: aciertos suben el nivel', async () => {
    const def = getTrainingGame('stroop');
    const { getByText, container, findByText } = render(NeuroTrainingSession, { props: { gameId: 'stroop' } });
    await fireEvent.click(getByText('▶ Empezar con práctica'));
    await playStroop(container, def.practiceTrials + def.scoredTrials, true);

    expect(await findByText('Resultados de la sesión')).toBeTruthy();
    const [record] = loadTrainingHistory();
    expect(record.accuracy).toBe(1);
    expect(record.startLevel).toBe(1);
    // 10 aciertos con 2-up/1-down: 1 → 6 (tope del juego).
    expect(record.endLevel).toBe(def.bounds.maxLevel);
    expect(loadLevels().stroop?.level).toBe(def.bounds.maxLevel);
  });

  it('adapta la dificultad durante la ronda puntuada: un error baja el nivel', async () => {
    saveGameLevel('stroop', { level: 4, correctStreak: 1 });
    const def = getTrainingGame('stroop');
    const { getByText, container, findByText } = render(NeuroTrainingSession, { props: { gameId: 'stroop' } });
    await fireEvent.click(getByText('▶ Empezar con práctica'));
    // Práctica correcta (no mueve la escalera), primer ensayo puntuado erróneo.
    await playStroop(container, def.practiceTrials, true);
    await playStroop(container, 1, false);
    expect(getByText('Nivel 3/6')).toBeTruthy();
    // Resto: errores hasta el final, el nivel no baja de 1.
    await playStroop(container, def.scoredTrials - 1, false);

    expect(await findByText('Resultados de la sesión')).toBeTruthy();
    const [record] = loadTrainingHistory();
    expect(record.startLevel).toBe(4);
    expect(record.endLevel).toBe(1);
    expect(record.accuracy).toBe(0);
  });
});

