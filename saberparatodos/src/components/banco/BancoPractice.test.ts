import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte/svelte5';
import BancoPractice from './BancoPractice.svelte';

const question = {
  id: 'CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle-v1',
  correctOptionId: 'B',
  explanation: 'Sumar enteros del mismo signo conserva el signo.',
  options: [
    { id: 'A', text: '-1', feedback: 'Incorrecto. Restaste en lugar de sumar.' },
    { id: 'B', text: '-5', feedback: 'Correcto. -2 + -3 = -5.' },
    { id: 'C', text: '5', feedback: 'Incorrecto. Ignoraste el signo negativo.' },
    { id: 'D', text: '1', feedback: 'Incorrecto. Cambiaste el orden de la resta.' },
  ],
};

function optionById(id: string) {
  return screen.getAllByTestId('banco-option').find((el) => el.dataset.optionId === id)!;
}

describe('BancoPractice', () => {
  it('hides the answer on open', () => {
    render(BancoPractice, { props: { question } });
    const options = screen.getAllByTestId('banco-option');
    expect(options).toHaveLength(4);
    for (const option of options) expect(option.dataset.state).toBe('neutral');
    expect(document.body.textContent).not.toContain('Correcta');
    expect(screen.getByTestId('banco-result').textContent?.trim()).toBe('');
    expect(screen.queryByTestId('banco-explanation')).toBeNull();
    expect(screen.getByTestId('banco-result').getAttribute('aria-live')).toBe('polite');
  });

  it('choosing a wrong option shows its feedback and marks the right one', async () => {
    render(BancoPractice, { props: { question } });
    await fireEvent.click(optionById('C'));

    expect(optionById('C').dataset.state).toBe('wrong');
    expect(optionById('B').dataset.state).toBe('correct');
    const result = screen.getByTestId('banco-result');
    expect(result.textContent).toContain('Incorrecto. La respuesta correcta es la B.');
    expect(screen.getByTestId('banco-feedback').textContent).toContain('Ignoraste el signo negativo');
    expect(screen.getByTestId('banco-explanation').textContent).toContain('conserva el signo');

    // Once answered, other options can't change the result.
    await fireEvent.click(optionById('A'));
    expect(optionById('A').dataset.state).toBe('dimmed');
  });

  it('choosing the right option says so', async () => {
    render(BancoPractice, { props: { question } });
    await fireEvent.click(optionById('B'));
    expect(screen.getByTestId('banco-result').textContent).toContain('¡Correcto!');
  });

  it('reveal shows the answer without answering', async () => {
    render(BancoPractice, { props: { question } });
    await fireEvent.click(screen.getByTestId('banco-reveal'));
    expect(optionById('B').dataset.state).toBe('correct');
    expect(optionById('A').dataset.state).toBe('dimmed');
    expect(screen.getByTestId('banco-result').textContent).toContain('Respuesta correcta: B');
    expect(screen.queryByTestId('banco-feedback')).toBeNull();
    expect(screen.getByTestId('banco-explanation')).toBeTruthy();

    await fireEvent.click(screen.getByTestId('banco-retry'));
    expect(optionById('B').dataset.state).toBe('neutral');
  });

  it('supports arrow-key navigation between options', async () => {
    render(BancoPractice, { props: { question } });
    const first = optionById('A');
    first.focus();
    await fireEvent.keyDown(first, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(optionById('B'));
    await fireEvent.keyDown(optionById('B'), { key: 'ArrowUp' });
    expect(document.activeElement).toBe(first);
    await fireEvent.keyDown(first, { key: 'End' });
    expect(document.activeElement).toBe(optionById('D'));
    expect(optionById('D').getAttribute('tabindex')).toBe('0');
  });
});
