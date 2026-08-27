<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { getWorldExamsNode, WorldExamsNode } from '../../lib/mesh/WorldExamsNode';
  import type { PeerStats } from '../../lib/mesh/types';
  import { fetchAggregateStats, type AggregateStat } from '../../lib/mesh/leaderboard-mesh';
  import { getOptIn, setOptIn, revokeOptIn, onOptInChange } from './OptInManager';
  import { escapeHtml } from '../../utils/escapeHtml';

  export let nodeInstance: WorldExamsNode | null = null;

  let optedIn: boolean = false;
  let connectionState: 'conectado' | 'sincronizando' | 'desconectado' = 'desconectado';
  let subjectFilter: string = 'all';

  let rawPeerStats: (PeerStats | AggregateStat)[] = [];
  let displayedStats: AggregateStat[] = [];

  let nodeHash: string = 'wx-anonymous-node';
  let localAvgScore: number | null = null;
  let localRank: number | null = null;
  let localPercentile: number | null = null;

  let unsubscribeNode: (() => void) | null = null;
  let unsubscribeOptIn: (() => void) | null = null;

  const SUBJECTS = [
    { id: 'all', label: 'Todas' },
    { id: 'matematicas', label: 'Matemáticas' },
    { id: 'lectura_critica', label: 'Lectura Crítica' },
    { id: 'ciencias', label: 'Ciencias' },
    { id: 'sociales', label: 'Sociales' },
    { id: 'ingles', label: 'Inglés' }
  ];

  function normalizeSubject(sub: string): string {
    const s = (sub || '').toLowerCase().trim();
    if (s.includes('matem') || s === 'matematicas') return 'matematicas';
    if (s.includes('lectur') || s.includes('lengua') || s === 'lectura_critica') return 'lectura_critica';
    if (s.includes('cienc') || s === 'ciencias') return 'ciencias';
    if (s.includes('social') || s === 'sociales') return 'sociales';
    if (s.includes('ingl') || s === 'ingles') return 'ingles';
    return s;
  }

  function matchesSubjectFilter(itemSubject: string, filter: string): boolean {
    if (filter === 'all') return true;
    return normalizeSubject(itemSubject) === filter;
  }

  function processVectors(items: (PeerStats | AggregateStat)[]): AggregateStat[] {
    const map = new Map<string, AggregateStat>();

    items.forEach((item, idx) => {
      const rawHash = (item as AggregateStat).node_hash || (item as PeerStats).node_hash || `node_${idx.toString(36)}`;
      const subject = item.subject || 'general';
      const week = item.week || 'W01';
      const avg = typeof item.avg === 'number' ? item.avg : 0;
      const score = typeof (item as AggregateStat).score === 'number' ? (item as AggregateStat).score : avg;

      const key = `${rawHash}_${subject}_${week}`;
      const candidate: AggregateStat = {
        node_hash: escapeHtml(rawHash),
        subject: escapeHtml(subject),
        week: escapeHtml(week),
        score,
        avg
      };

      if (!map.has(key) || (map.get(key)!.avg < avg)) {
        map.set(key, candidate);
      }
    });

    const mapped = Array.from(map.values());

    // Zero-PII guarantee (BR-03, BR-04): Strip any non-allowed attributes
    const sanitized = mapped.map(row => ({
      node_hash: String(row.node_hash),
      subject: String(row.subject),
      week: String(row.week),
      score: Number(row.score),
      avg: Number(row.avg)
    }));

    // Sort by avg desc
    sanitized.sort((a, b) => b.avg - a.avg);

    return sanitized;
  }

  async function updateLeaderboardData() {
    connectionState = 'sincronizando';
    try {
      const node = nodeInstance || getWorldExamsNode();
      nodeHash = node.config.nodeHash || 'wx-anonymous-node';
      optedIn = getOptIn();

      let meshPeers: PeerStats[] = [];
      try {
        meshPeers = await node.getPeers();
      } catch {
        meshPeers = [];
      }

      let staticStats: AggregateStat[] = [];
      try {
        staticStats = await fetchAggregateStats();
      } catch {
        staticStats = [];
      }

      const combined = [...meshPeers, ...staticStats];
      rawPeerStats = combined;

      const processed = processVectors(combined);
      displayedStats = processed.slice(0, 50);

      const localIndex = processed.findIndex(p => p.node_hash === nodeHash);
      if (localIndex >= 0) {
        localRank = localIndex + 1;
        localAvgScore = processed[localIndex].avg;
        localPercentile = processed.length > 0
          ? Math.round(((processed.length - localRank) / processed.length) * 100)
          : 100;
      } else {
        localRank = null;
        localAvgScore = null;
        localPercentile = null;
      }

      connectionState = optedIn ? 'conectado' : 'desconectado';
    } catch (e) {
      console.warn('[LeaderboardLiveMesh] update failed', e);
      connectionState = 'desconectado';
    }
  }

  function handleOptInToggle() {
    const newStatus = !optedIn;
    const node = nodeInstance || getWorldExamsNode();
    if (newStatus) {
      setOptIn(true);
      node.setOptIn(true);
    } else {
      revokeOptIn();
      node.setOptIn(false);
    }
    optedIn = newStatus;
    updateLeaderboardData();
  }

  function selectSubjectFilter(id: string) {
    subjectFilter = id;
  }

  onMount(() => {
    const node = nodeInstance || getWorldExamsNode();
    nodeHash = node.config.nodeHash || 'wx-anonymous-node';
    optedIn = getOptIn();

    unsubscribeNode = node.subscribe((vectors: PeerStats[]) => {
      connectionState = 'sincronizando';
      rawPeerStats = vectors;
      const processed = processVectors(rawPeerStats);
      displayedStats = processed.slice(0, 50);
      connectionState = optedIn ? 'conectado' : 'desconectado';
    });

    unsubscribeOptIn = onOptInChange((status: boolean) => {
      optedIn = status;
      updateLeaderboardData();
    });

    const handleMeshShare = () => updateLeaderboardData();
    const handleMeshRevoke = () => {
      displayedStats = [];
      rawPeerStats = [];
      updateLeaderboardData();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('wx:mesh:share', handleMeshShare as EventListener);
      window.addEventListener('wx:mesh:revoke', handleMeshRevoke as EventListener);
    }

    updateLeaderboardData();

    return () => {
      if (unsubscribeNode) unsubscribeNode();
      if (unsubscribeOptIn) unsubscribeOptIn();
      if (typeof window !== 'undefined') {
        window.removeEventListener('wx:mesh:share', handleMeshShare as EventListener);
        window.removeEventListener('wx:mesh:revoke', handleMeshRevoke as EventListener);
      }
    };
  });

  onDestroy(() => {
    if (unsubscribeNode) unsubscribeNode();
    if (unsubscribeOptIn) unsubscribeOptIn();
  });

  $: filteredStats = displayedStats.filter(item => matchesSubjectFilter(item.subject, subjectFilter));
</script>

<div class="w-full max-w-4xl mx-auto p-4 space-y-6" data-testid="leaderboard-live-mesh">
  <!-- Mesh Connection Header & Card -->
  <div class="p-4 bg-[#121212]/80 border border-white/10 rounded-xl backdrop-blur flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div>
      <div class="flex items-center gap-2">
        <h2 class="text-xl font-bold text-[#F5F5DC] tracking-tight">
          📡 Live Mesh Leaderboard
        </h2>
        <!-- Mesh Connection Status Indicator -->
        <span
          class={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border
            ${connectionState === 'conectado' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : ''}
            ${connectionState === 'sincronizando' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : ''}
            ${connectionState === 'desconectado' ? 'bg-white/5 border-white/10 text-white/50' : ''}`}
          data-testid="mesh-connection-indicator"
        >
          <span
            class={`w-2 h-2 rounded-full
              ${connectionState === 'conectado' ? 'bg-emerald-400 animate-pulse' : ''}
              ${connectionState === 'sincronizando' ? 'bg-amber-400 animate-ping' : ''}
              ${connectionState === 'desconectado' ? 'bg-gray-500' : ''}`}
          ></span>
          {connectionState === 'conectado' ? 'Conectado' : connectionState === 'sincronizando' ? 'Sincronizando' : 'Desconectado'}
        </span>
      </div>
      <p class="text-xs text-white/60 mt-1">
        Agregados en tiempo real desde la red privada WorldExams (zero-PII, BR-03/BR-04).
      </p>
    </div>

    <!-- Opt-In Toggle & Local Node Quick Control -->
    <div class="flex items-center gap-3">
      <button
        type="button"
        aria-label="Alternar opt-in para compartir datos anónimos por mesh"
        aria-pressed={optedIn}
        title={optedIn ? 'Compartiendo datos anónimos en la red mesh' : 'Opt-in desactivado. Haz clic para activar'}
        on:click={handleOptInToggle}
        class={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
          ${optedIn
            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30'
            : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white'}`}
        data-testid="optin-toggle-btn"
      >
        {optedIn ? '✓ Opt-in Activo' : '○ Activar Opt-in'}
      </button>
    </div>
  </div>

  <!-- Local Node Status Card -->
  <div class="p-4 bg-white/5 border border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs" data-testid="local-node-card">
    <div class="space-y-1">
      <span class="text-white/40 uppercase text-[10px] tracking-wider font-bold">Tu Nodo (Hash)</span>
      <div class="font-mono text-emerald-400 font-semibold truncate" title={nodeHash} data-testid="local-node-hash">
        {nodeHash.length > 16 ? nodeHash.slice(0, 16) + '…' : nodeHash}
      </div>
    </div>
    <div class="space-y-1">
      <span class="text-white/40 uppercase text-[10px] tracking-wider font-bold">Puntaje / Promedio</span>
      <div class="font-bold text-[#F5F5DC] text-sm" data-testid="local-node-score">
        {localAvgScore !== null ? `${localAvgScore.toFixed(1)} pts` : 'Sin datos'}
      </div>
    </div>
    <div class="space-y-1">
      <span class="text-white/40 uppercase text-[10px] tracking-wider font-bold">Posición / Percentil</span>
      <div class="font-bold text-amber-300 text-sm" data-testid="local-node-standing">
        {localRank !== null ? `#${localRank} (Top ${localPercentile}%)` : 'No clasificado'}
      </div>
    </div>
  </div>

  <!-- Subject Breakdown Filter -->
  <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Filtro por materia">
    <span class="text-xs text-white/40 mr-1 font-medium">Filtrar materia:</span>
    {#each SUBJECTS as subj (subj.id)}
      <button
        type="button"
        aria-label={`Filtrar por ${subj.label}`}
        aria-pressed={subjectFilter === subj.id}
        on:click={() => selectSubjectFilter(subj.id)}
        class={`px-3 py-1 text-xs rounded-lg border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
          ${subjectFilter === subj.id
            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
            : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20'}`}
        data-testid={`filter-btn-${subj.id}`}
      >
        {subj.label}
      </button>
    {/each}
  </div>

  <!-- Top 50 Anonymous Rankings Table -->
  <div class="border border-white/10 rounded-xl overflow-hidden bg-[#121212]/60 backdrop-blur">
    <div class="grid grid-cols-12 gap-2 p-3 border-b border-white/10 bg-white/5 text-[10px] uppercase tracking-widest font-bold text-white/40" role="row">
      <div class="col-span-1">#</div>
      <div class="col-span-4">Nodo (hash)</div>
      <div class="col-span-3 text-center">Materia</div>
      <div class="col-span-2 text-center">Semana</div>
      <div class="col-span-2 text-right">Avg</div>
    </div>

    <div id="wx-live-mesh-body" class="divide-y divide-white/5" data-testid="rankings-table-body">
      {#if filteredStats.length === 0}
        <div class="p-8 text-center text-white/40 text-sm" data-testid="empty-rankings">
          <p class="text-xl mb-1">🛰️</p>
          <p>Sin vectores mesh para este filtro.</p>
          <p class="text-xs text-white/30 mt-1">
            {optedIn ? 'Esperando llegada de nuevos vectores...' : 'Activa el opt-in para sincronizar en tiempo real.'}
          </p>
        </div>
      {:else}
        {#each filteredStats as row, idx (row.node_hash + row.subject + row.week + idx)}
          {@const rank = idx + 1}
          {@const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : String(rank)}
          {@const isLocal = row.node_hash === nodeHash}

          <div
            class={`grid grid-cols-12 gap-2 p-3 text-sm transition-colors ${isLocal ? 'bg-emerald-500/10 border-l-2 border-emerald-400' : 'hover:bg-white/[0.03]'}`}
            role="row"
            data-testid="ranking-row"
          >
            <div class={`col-span-1 font-bold ${rank <= 3 ? 'text-yellow-400' : 'text-white/60'}`}>{medal}</div>
            <div class="col-span-4 font-mono text-xs text-emerald-300 truncate" title={row.node_hash} data-testid="node-hash-cell">
              {row.node_hash.length > 14 ? row.node_hash.slice(0, 14) + '…' : row.node_hash}
              {#if isLocal}
                <span class="ml-1 px-1 py-0.2 text-[9px] bg-emerald-500/20 text-emerald-300 rounded font-sans">Tú</span>
              {/if}
            </div>
            <div class="col-span-3 text-center text-xs text-white/70 truncate">{row.subject}</div>
            <div class="col-span-2 text-center text-xs text-white/50 font-mono">{row.week}</div>
            <div class="col-span-2 text-right font-bold text-[#F5F5DC]">{row.avg.toFixed(1)}</div>
          </div>
        {/each}
      {/if}
    </div>
  </div>

  <p class="text-[10px] text-white/30 text-center">
    Privacidad garantizada: <code class="font-mono bg-white/5 px-1 py-0.5 rounded">node_hash + subject + week + score + avg</code>. Sin PII, sin tokens, sin telemetría (BR-03, BR-04, BR-06).
  </p>
</div>
