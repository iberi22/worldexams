import { describe, it, expect } from 'vitest';
import { renderThreadHTML, flattenThreads, countAllReplies, type ThreadNode, type ExplanationLite } from '../../../src/components/social/social-helpers';

// WX-302 capa 3: hilos por explicación — test render con respuestas mock

describe('WX-302 ExplanationThread — renderiza thread con respuestas mock', () => {
  const mockExplanation: ExplanationLite = {
    id: 'exp-001',
    content: 'Explicación base de fracciones: 1/2 + 1/3 = 5/6',
    node_hash: 'nodehash-abc1234567890',
    vote_count: 12,
    question_id: 'CO-MAT-6-test',
    created_at: new Date().toISOString(),
  };

  const mockThreads: ThreadNode[] = [
    {
      id: 'thr-1',
      content: 'Muy buena explicación, pero faltó mencionar el mcm',
      node_hash: 'nodehash-thr1',
      vote_count: 3,
      replies: [
        {
          id: 'rep-1-1',
          content: 'Sí, el mcm de 2 y 3 es 6, por eso 3/6 + 2/6 = 5/6',
          node_hash: 'nodehash-rep11',
          vote_count: 5,
          replies: [],
        },
        {
          id: 'rep-1-2',
          content: 'Ampliar: también se puede visualizar con regletas',
          node_hash: 'nodehash-rep12',
          vote_count: 1,
          replies: [
            {
              id: 'rep-1-2-1',
              content: 'Deep nested reply para probar 3 niveles',
              node_hash: 'nodehash-deep',
              vote_count: 0,
              replies: [],
            },
          ],
        },
      ],
    },
    {
      id: 'thr-2',
      content: 'Citar: ¿podrías ampliar con un ejemplo de la vida cotidiana en Bogotá?',
      node_hash: 'nodehash-thr2',
      vote_count: 2,
      replies: [],
    },
  ];

  it('renderiza explicación + hilos con botones Citar/Ampliar', () => {
    const html = renderThreadHTML(mockExplanation, mockThreads);
    // Verificar DOM básico via jsdom
    const container = document.createElement('div');
    container.innerHTML = html;

    // Explicación
    expect(container.querySelector('[data-explanation-id="exp-001"]')).not.toBeNull();
    expect(container.querySelector('[data-role="content"]')?.textContent).toContain('1/2 + 1/3');
    expect(container.querySelector('[data-vote-count]')?.textContent).toContain('12');

    // Botones Citar/Ampliar presentes
    const citeBtns = container.querySelectorAll('[data-action="cite"]');
    const expandBtns = container.querySelectorAll('[data-action="expand"]');
    expect(citeBtns.length).toBeGreaterThanOrEqual(3); // explicación + 2 threads + replies
    expect(expandBtns.length).toBeGreaterThanOrEqual(3);
    expect(citeBtns[0].textContent).toBe('Citar');
    expect(expandBtns[0].textContent).toBe('Ampliar');
  });

  it('renderiza hilos anidados recursivamente (3 niveles)', () => {
    const html = renderThreadHTML(mockExplanation, mockThreads);
    const container = document.createElement('div');
    container.innerHTML = html;

    const nodes = container.querySelectorAll('[data-thread-node]');
    // thr-1 + rep-1-1 + rep-1-2 + deep + thr-2 = 5
    expect(nodes.length).toBe(5);

    // Contenido de cada nivel
    expect(container.textContent).toContain('faltó mencionar el mcm');
    expect(container.textContent).toContain('el mcm de 2 y 3 es 6');
    expect(container.textContent).toContain('visualizar con regletas');
    expect(container.textContent).toContain('Deep nested reply');
    expect(container.textContent).toContain('vida cotidiana en Bogotá');

    // vote_count en cada nodo
    expect(container.textContent).toContain('3'); // thr-1
    expect(container.textContent).toContain('5'); // rep-1-1
  });

  it('helpers flatten y count funcionan', () => {
    const flat = flattenThreads(mockThreads);
    expect(flat.length).toBe(5);
    expect(countAllReplies(mockThreads)).toBe(5);
    expect(flat.map((f) => f.id)).toEqual(['thr-1', 'rep-1-1', 'rep-1-2', 'rep-1-2-1', 'thr-2']);
  });

  it('muestra placeholder cuando no hay hilos', () => {
    const html = renderThreadHTML(mockExplanation, []);
    const container = document.createElement('div');
    container.innerHTML = html;
    expect(container.querySelector('[data-testid="no-threads"]')).not.toBeNull();
    expect(container.querySelector('[data-thread-list]')).toBeNull();
  });

  it('cada hilo respeta estructura { content, node_hash, vote_count, replies }', () => {
    for (const thr of mockThreads) {
      expect(typeof thr.content).toBe('string');
      expect(typeof thr.node_hash).toBe('string');
      expect(typeof thr.vote_count).toBe('number');
      expect(Array.isArray(thr.replies)).toBe(true);
      for (const rep of thr.replies) {
        expect(typeof rep.content).toBe('string');
        expect(Array.isArray(rep.replies)).toBe(true);
      }
    }
  });
});
