import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { setup } from './practice-question.client';

// Misma estructura que PracticeQuestion.astro, sin el atributo `hidden` en
// [data-result]: setup() debe ocultarlo por sí mismo.
const fixture = `
<article data-practice-question>
  <button type="button" data-option="A" data-correct="true" aria-pressed="false">A) 4</button>
  <button type="button" data-option="B" data-correct="false" aria-pressed="false">B) 2</button>
  <button type="button" data-option="C" data-correct="false" aria-pressed="false">C) 0</button>
  <div data-result>
    <p data-result-verdict></p>
    <p data-result-feedback></p>
    <p data-result-answer hidden>Respuesta correcta: A) 4</p>
    <button type="button" data-retry>Intentar de nuevo</button>
  </div>
  <details data-answer-key>
    <span data-feedback-for="A">Correcto. <strong>2+2</strong> = 4.</span>
    <span data-feedback-for="B">Evaluaste sin cancelar la indeterminación.</span>
    <span data-feedback-for="C">Restaste en lugar de sumar.</span>
  </details>
  <template data-labels data-correct-label="¡Correcto!" data-incorrect-label="Incorrecto"></template>
</article>`;

describe('PracticeQuestion client behaviour', () => {
  let card: HTMLElement;
  const q = <T extends Element>(sel: string) => card.querySelector<T>(sel)!;
  const option = (letter: string) => q<HTMLButtonElement>(`button[data-option="${letter}"]`);

  beforeEach(() => {
    document.body.innerHTML = fixture;
    card = document.querySelector<HTMLElement>('[data-practice-question]')!;
    setup(card);
  });

  it('keeps the result panel hidden until an option is chosen', () => {
    expect(q<HTMLElement>('[data-result]').hidden).toBe(true);
    expect([...card.querySelectorAll('button[data-option]')].every((b) => !(b as HTMLButtonElement).disabled)).toBe(true);
  });

  it('server markup also ships [data-result] hidden (no flash, readable without JS)', () => {
    const source = readFileSync(resolve(__dirname, 'PracticeQuestion.astro'), 'utf8');
    expect(source).toMatch(/<div data-result hidden\b/);
  });

  it('a wrong choice shows its own feedback, marks the right option and reveals the answer', () => {
    option('B').click();
    const result = q<HTMLElement>('[data-result]');
    expect(result.hidden).toBe(false);
    expect(result.dataset.state).toBe('incorrect');
    expect(q('[data-result-verdict]').textContent).toBe('Incorrecto');
    expect(q('[data-result-feedback]').textContent).toBe('Evaluaste sin cancelar la indeterminación.');
    expect(q<HTMLElement>('[data-result-answer]').hidden).toBe(false);
    expect(option('B').dataset.state).toBe('incorrect');
    expect(option('B').getAttribute('aria-pressed')).toBe('true');
    expect(option('A').dataset.state).toBe('correct');
    expect(option('C').dataset.state).toBe('dim');
    expect(option('A').disabled && option('B').disabled && option('C').disabled).toBe(true);
  });

  it('a right choice keeps rich feedback markup and hides the redundant answer line', () => {
    option('A').click();
    expect(q('[data-result-verdict]').textContent).toBe('¡Correcto!');
    expect(q('[data-result-feedback]').innerHTML).toContain('<strong>2+2</strong>');
    expect(q<HTMLElement>('[data-result-answer]').hidden).toBe(true);
  });

  it('"Intentar de nuevo" resets the question', () => {
    option('B').click();
    q<HTMLButtonElement>('[data-retry]').click();
    expect(q<HTMLElement>('[data-result]').hidden).toBe(true);
    expect(q<HTMLElement>('[data-result]').dataset.state).toBeUndefined();
    for (const letter of ['A', 'B', 'C']) {
      expect(option(letter).disabled).toBe(false);
      expect(option(letter).dataset.state).toBeUndefined();
      expect(option(letter).getAttribute('aria-pressed')).toBe('false');
    }
    expect(document.activeElement).toBe(option('A'));
  });
});
