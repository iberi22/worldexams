import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, unmount } from 'svelte';
import RankedLeaderboard from '../../src/components/leaderboard/RankedLeaderboard.svelte';
import { RankedError } from '../../src/lib/ranked/ranked-client';

// Mock the client fetch function
vi.mock('../../src/lib/ranked/ranked-client', async () => {
  const actual = await vi.importActual<typeof import('../../src/lib/ranked/ranked-client')>('../../src/lib/ranked/ranked-client');
  return {
    ...actual,
    fetchLeaderboard: vi.fn(),
  };
});

import { fetchLeaderboard } from '../../src/lib/ranked/ranked-client';

describe('RankedLeaderboard.svelte', () => {
  let target: HTMLElement;
  let component: Record<string, any>;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    target = document.createElement('div');
    document.body.appendChild(target);
  });

  afterEach(() => {
    if (component) {
      unmount(component);
    }
    document.body.removeChild(target);
  });

  // A tiny helper to await Svelte's render updates and async operations
  const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

  it('renders entries in order and shows average note', async () => {
    (fetchLeaderboard as ReturnType<typeof vi.fn>).mockResolvedValue({
      season: '2026-09',
      average: 450,
      entries: [
        { rank: 1, nickname: 'Estudiante1', score: 600, correct: 35, answered: 40, createdAt: '2026-09-01T10:00:00Z' },
        { rank: 2, nickname: 'Estudiante2', score: 550, correct: 32, answered: 40, createdAt: '2026-09-02T10:00:00Z' },
      ],
    });

    component = mount(RankedLeaderboard, { target, props: { hasRankedData: false } });

    await flushPromises();

    const text = target.innerHTML;
    expect(text).toContain('Estudiante1');
    expect(text).toContain('Estudiante2');
    expect(text).toContain('600');
    expect(text).toContain('550');
    expect(text).toContain('promedio actual: 450');
  });

  it('shows empty state note when there are no entries', async () => {
    (fetchLeaderboard as ReturnType<typeof vi.fn>).mockResolvedValue({
      season: '2026-09',
      average: 450,
      entries: [],
    });

    component = mount(RankedLeaderboard, { target, props: { hasRankedData: false } });

    await flushPromises();

    const text = target.innerHTML;
    expect(text).toContain('Aún no hay puntajes publicados este mes — ¡sé el primero!');
    expect(text).toContain('promedio actual: 450');
  });

  it('shows unavailable state when API returns 503 UNAVAILABLE', async () => {
    (fetchLeaderboard as ReturnType<typeof vi.fn>).mockRejectedValue(
      new RankedError('Ranked module unavailable', 'UNAVAILABLE')
    );

    component = mount(RankedLeaderboard, { target, props: { hasRankedData: false } });

    await flushPromises();

    const text = target.innerHTML;
    expect(text).toContain('El ranking se está activando, vuelve pronto');
  });

  it('highlights the current user nickname based on localStorage', async () => {
    localStorage.setItem('worldexams_ranked_nickname', 'EstudianteLocal');

    (fetchLeaderboard as ReturnType<typeof vi.fn>).mockResolvedValue({
      season: '2026-09',
      average: 450,
      entries: [
        { rank: 1, nickname: 'EstudianteLocal', score: 600, correct: 35, answered: 40, createdAt: '2026-09-01T10:00:00Z' },
        { rank: 2, nickname: 'EstudianteOtro', score: 550, correct: 32, answered: 40, createdAt: '2026-09-02T10:00:00Z' },
      ],
    });

    component = mount(RankedLeaderboard, { target, props: { hasRankedData: false } });

    await flushPromises();

    const text = target.innerHTML;
    expect(text).toContain('EstudianteLocal');

    // We check if the border highlight class is present in the rendered HTML string
    // "bg-emerald-500/10 border-l-2 border-l-emerald-500" is applied to the active row
    expect(text).toContain('border-l-emerald-500');
  });
});
