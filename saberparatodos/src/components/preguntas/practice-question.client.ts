/**
 * Comportamiento cliente de PracticeQuestion.astro: elegir una opción muestra
 * el veredicto, el feedback de esa opción y la explicación; "Intentar de nuevo" reinicia.
 */
export function setup(card: HTMLElement) {
  const buttons = Array.from(card.querySelectorAll<HTMLButtonElement>('button[data-option]'));
  const result = card.querySelector<HTMLElement>('[data-result]');
  const labels = card.querySelector<HTMLElement>('[data-labels]');
  if (!result || !labels || !buttons.length) return;
  const verdict = result.querySelector<HTMLElement>('[data-result-verdict]');
  const feedback = result.querySelector<HTMLElement>('[data-result-feedback]');
  const answer = result.querySelector<HTMLElement>('[data-result-answer]');

  const reset = (focus = true) => {
    for (const b of buttons) {
      b.disabled = false;
      b.removeAttribute('data-state');
      b.setAttribute('aria-pressed', 'false');
    }
    result.hidden = true;
    result.removeAttribute('data-state');
    if (focus) buttons[0].focus();
  };

  // Estado inicial explícito: el panel de resultado nunca se ve antes de elegir.
  reset(false);

  for (const button of buttons) {
    button.addEventListener('click', () => {
      const ok = button.dataset.correct === 'true';
      for (const b of buttons) {
        b.disabled = true;
        if (b === button) b.dataset.state = ok ? 'correct' : 'incorrect';
        else if (b.dataset.correct === 'true') b.dataset.state = 'correct';
        else b.dataset.state = 'dim';
      }
      button.setAttribute('aria-pressed', 'true');
      result.dataset.state = ok ? 'correct' : 'incorrect';
      if (verdict) verdict.textContent = ok ? labels.dataset.correctLabel ?? '' : labels.dataset.incorrectLabel ?? '';
      if (feedback) {
        // Nodo ya renderizado (y escapado) en el servidor dentro de <details>.
        const source = card.querySelector(`[data-feedback-for="${button.dataset.option}"]`);
        feedback.replaceChildren(...(source ? Array.from(source.cloneNode(true).childNodes) : []));
      }
      if (answer) answer.hidden = ok;
      result.hidden = false;
    });
  }
  result.querySelector('[data-retry]')?.addEventListener('click', () => reset());
}
