import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, unmount } from 'svelte';
import LeaderboardLiveMesh from '../../src/components/leaderboard/LeaderboardLiveMesh.svelte';
import { WorldExamsNode } from '../../src/lib/mesh/WorldExamsNode';
import type { PeerStats } from '../../src/lib/mesh/types';
import { setOptIn, getOptIn } from '../../src/components/leaderboard/OptInManager';

function createMockNode(nodeHash = 'wx-testnode-1234'): WorldExamsNode {
  let subscribers = new Set<(peers: PeerStats[]) => void>();
  let peersCache: PeerStats[] = [
    { subject: 'matematicas', week: 'W01', count: 5, avg: 92, node_hash: 'node_alpha' },
    { subject: 'lectura_critica', week: 'W01', count: 3, avg: 85, node_hash: 'node_beta' },
    { subject: 'ciencias', week: 'W02', count: 4, avg: 78, node_hash: 'node_gamma' },
    { subject: 'sociales', week: 'W02', count: 2, avg: 70, node_hash: 'node_delta' },
    { subject: 'ingles', week: 'W03', count: 6, avg: 95, node_hash: 'node_epsilon' }
  ];

  return {
    config: {
      xavierUrl: 'http://127.0.0.1:8006',
      walletPrivateKey: 'mock-key',
      nodeHash,
      optIn: true,
      encrypted: true
    },
    isOptedIn: () => true,
    setOptIn: vi.fn(),
    publish: vi.fn().mockResolvedValue([]),
    getPeers: vi.fn().mockResolvedValue(peersCache),
    getPeersSync: () => peersCache,
    subscribe: (cb: (peers: PeerStats[]) => void) => {
      subscribers.add(cb);
      cb(peersCache);
      return () => subscribers.delete(cb);
    },
    triggerNewVectors: (newVectors: PeerStats[]) => {
      peersCache = [...newVectors, ...peersCache];
      for (const cb of subscribers) {
        cb(peersCache);
      }
    }
  } as unknown as WorldExamsNode & { triggerNewVectors: (v: PeerStats[]) => void };
}

describe('LeaderboardLiveMesh.svelte', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    localStorage.clear();
    setOptIn(true);
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container && container.parentNode) {
      document.body.removeChild(container);
    }
    localStorage.clear();
  });

  it('renders Top 50 anonymous rankings cleanly without PII (BR-03, BR-04)', async () => {
    const mockNode = createMockNode();
    const component = mount(LeaderboardLiveMesh, {
      target: container,
      props: { nodeInstance: mockNode }
    });

    await new Promise(r => setTimeout(r, 50));

    const html = container.innerHTML;
    expect(html).toContain('Live Mesh Leaderboard');
    expect(html).toContain('node_alpha');
    expect(html).toContain('node_beta');
    expect(html).toContain('node_epsilon');

    // Zero PII guarantees
    expect(html).not.toContain('email');
    expect(html).not.toContain('student_id');
    expect(html).not.toContain('student_name');

    unmount(component);
  });

  it('reacts dynamically when new vectors arrive from WorldExamsNode.subscribe()', async () => {
    const mockNode = createMockNode() as any;
    const component = mount(LeaderboardLiveMesh, {
      target: container,
      props: { nodeInstance: mockNode }
    });

    await new Promise(r => setTimeout(r, 50));

    let rows = container.querySelectorAll('[data-testid="ranking-row"]');
    expect(rows.length).toBe(5);

    // Emit new vectors from mesh
    mockNode.triggerNewVectors([
      { subject: 'matematicas', week: 'W04', count: 10, avg: 99, node_hash: 'node_new_champion' }
    ]);

    await new Promise(r => setTimeout(r, 50));

    rows = container.querySelectorAll('[data-testid="ranking-row"]');
    expect(rows.length).toBe(6);
    expect(container.innerHTML).toContain('node_new_champion');

    unmount(component);
  });

  it('filters rankings by subject (Matemáticas, Lectura Crítica, Ciencias, Sociales, Inglés)', async () => {
    const mockNode = createMockNode();
    const component = mount(LeaderboardLiveMesh, {
      target: container,
      props: { nodeInstance: mockNode }
    });

    await new Promise(r => setTimeout(r, 50));

    // Filter by Matemáticas
    const filterBtnMath = container.querySelector('[data-testid="filter-btn-matematicas"]') as HTMLButtonElement;
    expect(filterBtnMath).not.toBeNull();
    filterBtnMath.click();

    await new Promise(r => setTimeout(r, 50));

    let rows = container.querySelectorAll('[data-testid="ranking-row"]');
    expect(rows.length).toBe(1);
    expect(container.innerHTML).toContain('node_alpha');
    expect(container.innerHTML).not.toContain('node_beta');

    // Filter by Inglés
    const filterBtnEng = container.querySelector('[data-testid="filter-btn-ingles"]') as HTMLButtonElement;
    expect(filterBtnEng).not.toBeNull();
    filterBtnEng.click();

    await new Promise(r => setTimeout(r, 50));

    rows = container.querySelectorAll('[data-testid="ranking-row"]');
    expect(rows.length).toBe(1);
    expect(container.innerHTML).toContain('node_epsilon');

    unmount(component);
  });

  it('toggles opt-in status via button and updates local node status card', async () => {
    const mockNode = createMockNode();
    const component = mount(LeaderboardLiveMesh, {
      target: container,
      props: { nodeInstance: mockNode }
    });

    await new Promise(r => setTimeout(r, 50));

    const toggleBtn = container.querySelector('[data-testid="optin-toggle-btn"]') as HTMLButtonElement;
    expect(toggleBtn).not.toBeNull();
    expect(toggleBtn.getAttribute('aria-pressed')).toBe('true');

    toggleBtn.click();
    await new Promise(r => setTimeout(r, 50));

    expect(getOptIn()).toBe(false);
    expect(toggleBtn.getAttribute('aria-pressed')).toBe('false');

    unmount(component);
  });

  it('displays real-time mesh connection status indicator', async () => {
    const mockNode = createMockNode();
    const component = mount(LeaderboardLiveMesh, {
      target: container,
      props: { nodeInstance: mockNode }
    });

    await new Promise(r => setTimeout(r, 50));

    const indicator = container.querySelector('[data-testid="mesh-connection-indicator"]');
    expect(indicator).not.toBeNull();
    expect(indicator?.textContent).toContain('Conectado');

    unmount(component);
  });
});
