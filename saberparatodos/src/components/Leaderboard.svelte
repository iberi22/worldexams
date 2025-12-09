<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '../lib/supabase';
  import type { LeaderboardEntry } from '../types';

  export let onBack: () => void;
  export let onLogin: () => void;

  let leaderboardData: LeaderboardEntry[] = [];
  let loading = true;
  let period = 'all'; // all, weekly, monthly
  let user = null;

  async function fetchLeaderboard() {
    loading = true;

    try {
      let query = supabase
        .from('exam_results')
        .select('user_name, score, total_questions, percentage, subject, created_at')
        .order('percentage', { ascending: false })
        .order('score', { ascending: false })
        .limit(20);

      // Filtrar por periodo
      if (period === 'weekly') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        query = query.gte('created_at', weekAgo.toISOString());
      } else if (period === 'monthly') {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        query = query.gte('created_at', monthAgo.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;

      leaderboardData = (data || []).map((entry, index) => ({
        rank: index + 1,
        user: entry.user_name,
        score: entry.score,
        total: entry.total_questions,
        percentage: entry.percentage,
        subject: entry.subject,
        time: new Date(entry.created_at).toLocaleDateString('es-CO')
      }));
    } catch (e) {
      console.error('Error fetching leaderboard:', e);
      leaderboardData = [];
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    user = session?.user || null;
    fetchLeaderboard();
  });

  function setPeriod(p: string) {
    period = p;
    fetchLeaderboard();
  }
</script>

<div class="w-full max-w-3xl mx-auto p-4 animate-fade-in-up pb-20">
  <div class="flex items-center justify-between mb-8">
    <h2 class="text-4xl font-bold uppercase tracking-tighter text-[#F5F5DC]">
      Mejores_Resultados
    </h2>
    <button
      on:click={onBack}
      class="px-4 py-2 border border-white/20 hover:bg-white/10 transition-colors uppercase text-xs tracking-widest opacity-60 hover:opacity-100"
    >
      [ Volver_Inicio ]
    </button>
  </div>

  <!-- Period Tabs -->
  <div class="flex justify-center gap-4 mb-8">
    {#each ['all', 'monthly', 'weekly'] as p}
      <button
        on:click={() => setPeriod(p)}
        class={`
          px-4 py-2 uppercase text-xs tracking-widest transition-all border-b-2
          ${period === p
            ? 'border-emerald-500 text-emerald-500 font-bold'
            : 'border-transparent text-white/40 hover:text-white/80'}
        `}
      >
        {p === 'all' ? 'Todos' : p === 'monthly' ? 'Mensual' : 'Semanal'}
      </button>
    {/each}
  </div>

  {#if !user}
    <div class="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="text-2xl">🏆</span>
        <p class="text-sm text-blue-200">
          ¿Quieres ver tu nombre aquí? Inicia sesión para guardar tus puntajes.
        </p>
      </div>
      <div class="shrink-0">
        <button
          on:click={onLogin}
          class="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded text-blue-300 text-xs uppercase tracking-widest transition-colors"
        >
          Ingresar
        </button>
      </div>
    </div>
  {/if}

  <div class="w-full border border-white/10 backdrop-blur-md bg-[#121212]/50 min-h-[300px]">
    <div class="grid grid-cols-12 p-4 border-b border-white/10 bg-white/5">
      <div class="text-xs font-bold uppercase tracking-[0.2em] opacity-40 col-span-1">#</div>
      <div class="text-xs font-bold uppercase tracking-[0.2em] opacity-40 col-span-4">Usuario</div>
      <div class="text-xs font-bold uppercase tracking-[0.2em] opacity-40 col-span-3">Asignatura</div>
      <div class="text-xs font-bold uppercase tracking-[0.2em] opacity-40 col-span-2 text-center">Puntaje</div>
      <div class="text-xs font-bold uppercase tracking-[0.2em] opacity-40 col-span-2 text-right">%</div>
    </div>

    {#if loading}
      <div class="p-8 text-center opacity-40 animate-pulse">
        Cargando datos del sistema...
      </div>
    {:else if leaderboardData.length === 0}
      <div class="p-12 text-center opacity-40">
        <p class="mb-2">No hay datos registrados en este periodo.</p>
        <p class="text-xs">¡Sé el primero en aparecer!</p>
      </div>
    {:else}
      {#each leaderboardData as entry (entry.rank)}
        {@const isTop1 = entry.rank === 1}
        {@const isTop2 = entry.rank === 2}
        {@const isTop3 = entry.rank === 3}

        <div
          class={`
            grid grid-cols-12 p-4 border-b border-white/5 hover:bg-white/[0.06] transition-colors duration-200 group cursor-default
            ${isTop1 ? 'bg-yellow-500/5 hover:bg-yellow-500/10' : ''}
            ${isTop2 ? 'bg-gray-400/5 hover:bg-gray-400/10' : ''}
            ${isTop3 ? 'bg-orange-700/5 hover:bg-orange-700/10' : ''}
          `}
        >
          <div class={`
            font-mono font-bold transition-colors col-span-1
            ${isTop1 ? 'text-yellow-500' : ''}
            ${isTop2 ? 'text-gray-400' : ''}
            ${isTop3 ? 'text-orange-500' : ''}
            ${!isTop1 && !isTop2 && !isTop3 ? 'text-emerald-500/80 group-hover:text-emerald-400' : ''}
          `}>
            #{entry.rank}
          </div>
          <div class="col-span-4 font-mono text-[#F5F5DC]/80 group-hover:text-[#F5F5DC] transition-colors truncate pr-2">
            {entry.user}
          </div>
          <div class="col-span-3 font-mono text-xs text-white/50 truncate">
            {entry.subject}
          </div>
          <div class="col-span-2 font-mono text-center text-[#F5F5DC]/60">
            {entry.score}/{entry.total}
          </div>
          <div class={`
            col-span-2 font-mono text-right font-bold
            ${entry.percentage >= 80 ? 'text-emerald-400' : ''}
            ${entry.percentage >= 60 && entry.percentage < 80 ? 'text-yellow-400' : ''}
            ${entry.percentage < 60 ? 'text-red-400' : ''}
          `}>
            {entry.percentage}%
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <div class="mt-4 text-center">
    <p class="text-xs font-mono opacity-30">
      // SINCRONIZACIÓN_DATOS_COMPLETA :: NODO_HK_24
    </p>
  </div>
</div>
