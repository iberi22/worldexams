import { describe, it, expect, beforeEach } from 'vitest';
import { getTop50Sorted, sortAndPaginate, fetchAggregateStats, type AggregateStat } from '../../lib/mesh/leaderboard-mesh';

function makeMockStats(count: number): AggregateStat[] {
  return Array.from({ length: count }, (_, i) => ({
    node_hash: `node_${String(i).padStart(3, '0')}abc`,
    subject: i % 2 === 0 ? 'matematicas' : 'lengua',
    week: `W${String((i % 4) + 1).padStart(2, '0')}`,
    score: 50 + i,
    avg: 60 + (i % 40) // varied avg to test sorting
  }));
}

describe('LeaderboardGlobal — red privada anonima', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('ordena por avg global descendente y limita top 50', () => {
    const stats = makeMockStats(80);
    const top50 = getTop50Sorted(stats);
    expect(top50.length).toBe(50);
    for (let i = 1; i < top50.length; i++) {
      expect(top50[i - 1].avg).toBeGreaterThanOrEqual(top50[i].avg);
    }
  });

  it('pagainacion: 10 por pagina, 5 paginas para top 50', () => {
    const stats = makeMockStats(50);
    const sorted = getTop50Sorted(stats);
    const page1 = sortAndPaginate(sorted, 1, 10);
    const page2 = sortAndPaginate(sorted, 2, 10);
    const page5 = sortAndPaginate(sorted, 5, 10);
    const page6 = sortAndPaginate(sorted, 6, 10);

    expect(page1.length).toBe(10);
    expect(page2.length).toBe(10);
    expect(page5.length).toBe(10);
    expect(page6.length).toBe(0);
    // paginas no se solapan
    expect(page1[0].node_hash).not.toBe(page2[0].node_hash);
  });

  it('renderiza tabla con datos mock anonimos (solo hashes, sin nombres)', async () => {
    const mock = makeMockStats(12);
    // Simula mesh storage anonimo
    localStorage.setItem('wx-shared-stats', JSON.stringify(mock));

    const fetched = await fetchAggregateStats();

    expect(fetched.length).toBeGreaterThan(0);
    expect(fetched.length).toBeLessThanOrEqual(50);

    // Verificar anonimato: solo node_hash, subject, week, score, avg
    for (const row of fetched) {
      expect(row).toHaveProperty('node_hash');
      expect(row).toHaveProperty('subject');
      expect(row).toHaveProperty('week');
      expect(row).toHaveProperty('score');
      expect(row).toHaveProperty('avg');
      expect((row as any).displayName).toBeUndefined();
      expect((row as any).name).toBeUndefined();
      expect(row.node_hash).toMatch(/^node_/);
    }

    // Verificar orden por avg
    for (let i = 1; i < fetched.length; i++) {
      expect(fetched[i - 1].avg).toBeGreaterThanOrEqual(fetched[i].avg);
    }
  });

  it('fetchAggregateStats retorna top 50 max aunque haya 100', async () => {
    const many = makeMockStats(100);
    localStorage.setItem('wx-shared-stats', JSON.stringify(many));
    const fetched = await fetchAggregateStats();
    expect(fetched.length).toBe(50);
  });

  it('sin datos retorna array vacio (no bloquea UI)', async () => {
    localStorage.clear();
    // mock fetch a api inexistente: debe retornar []
    const fetched = await fetchAggregateStats();
    expect(Array.isArray(fetched)).toBe(true);
    expect(fetched.length).toBe(0);
  });
});
