import { describe, it, expect } from 'vitest';
import { getBestExplanation, renderBestBannerHTML, type ExplanationLite } from '../../src/components/social/social-helpers';

// WX-302 BestExplanationBanner — selecciona mayor voto

describe('WX-302 BestExplanationBanner — selecciona mayor voto', () => {
  const exps: ExplanationLite[] = [
    { id: 'exp-a', content: 'Explicación A básica', node_hash: 'node-a', vote_count: 2, question_id: 'Q1', created_at: '2026-01-01T00:00:00Z' },
    { id: 'exp-b', content: 'Explicación B detallada con ejemplo de Medellín', node_hash: 'node-b', vote_count: 15, question_id: 'Q1', created_at: '2026-01-02T00:00:00Z' },
    { id: 'exp-c', content: 'Explicación C con diagrama', node_hash: 'node-c', vote_count: 7, question_id: 'Q1', created_at: '2026-01-03T00:00:00Z' },
    { id: 'exp-d', content: 'Explicación D empate 15 pero más nueva', node_hash: 'node-d', vote_count: 15, question_id: 'Q1', created_at: '2026-01-04T00:00:00Z' },
  ];

  it('selecciona la de mayor vote_count', () => {
    const best = getBestExplanation(exps.slice(0, 3)); // sin empate d
    expect(best?.id).toBe('exp-b');
    expect(best?.vote_count).toBe(15);
    expect(best?.content).toContain('Medellín');
  });

  it('desempata por created_at más reciente', () => {
    const best = getBestExplanation(exps);
    // b y d empatadas en 15, d es más nueva
    expect(best?.id).toBe('exp-d');
  });

  it('retorna null si lista vacía', () => {
    expect(getBestExplanation([])).toBeNull();
    expect(getBestExplanation(null as unknown as ExplanationLite[])).toBeNull();
  });

  it('render banner muestra badge Destacada y voto', () => {
    const html = renderBestBannerHTML(exps.slice(0, 3));
    const container = document.createElement('div');
    container.innerHTML = html;
    expect(container.querySelector('[data-testid="best-explanation-banner"]')?.getAttribute('data-has-best')).toBe('true');
    expect(container.querySelector('[data-testid="best-badge"]')?.textContent).toBe('Destacada');
    expect(container.querySelector('[data-testid="best-content"]')?.textContent).toContain('Medellín');
    expect(container.querySelector('[data-testid="best-vote-count"]')?.textContent).toBe('15');
    expect(container.querySelector('[data-testid="best-vote-btn"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="best-vote-btn"]')?.textContent).toContain('Votar');
  });

  it('render banner vacante cuando no hay explicaciones', () => {
    const html = renderBestBannerHTML([]);
    const container = document.createElement('div');
    container.innerHTML = html;
    expect(container.querySelector('[data-testid="best-explanation-banner"]')?.getAttribute('data-has-best')).toBe('false');
    expect(container.querySelector('[data-testid="best-badge"]')?.textContent).toBe('Vacante');
    expect(container.querySelector('[data-testid="best-empty"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="best-content"]')).toBeNull();
  });

  it('badge Sin votos si mejor tiene vote_count <=0', () => {
    const zeroExps: ExplanationLite[] = [
      { id: 'z1', content: 'cero', node_hash: 'n1', vote_count: 0, created_at: '2026-01-01T00:00:00Z' },
      { id: 'z2', content: 'negativo', node_hash: 'n2', vote_count: -2, created_at: '2026-01-02T00:00:00Z' },
    ];
    const html = renderBestBannerHTML(zeroExps);
    const container = document.createElement('div');
    container.innerHTML = html;
    expect(container.querySelector('[data-testid="best-badge"]')?.textContent).toBe('Sin votos');
  });

  it('maneja lista con un solo elemento', () => {
    const single = [{ id: 'only', content: 'única', node_hash: 'n', vote_count: 3 }];
    expect(getBestExplanation(single)?.id).toBe('only');
    const html = renderBestBannerHTML(single);
    const container = document.createElement('div');
    container.innerHTML = html;
    expect(container.querySelector('[data-testid="best-content"]')?.textContent).toBe('única');
  });
});
