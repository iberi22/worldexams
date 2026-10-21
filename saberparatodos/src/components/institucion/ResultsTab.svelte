<script lang="ts">
  import { onMount } from 'svelte';
  import { formatDate, isUnauthorized, teacherErrorMessage } from '../../lib/institutions/teacher-client';
  import type { Assignment, Group, ResultRow, TeacherApi } from '../../lib/institutions/types';
  import ErrorNotice from './ErrorNotice.svelte';
  import { SOURCE_LABELS, subjectName, ui, type CountryOption } from './ui';

  let {
    api,
    group,
    country,
    onUnauthorized,
  }: {
    api: TeacherApi;
    group: Group;
    country: CountryOption | undefined;
    onUnauthorized: () => void;
  } = $props();

  type SortKey = 'nickname' | 'studentCode' | 'subject' | 'source' | 'pct' | 'durationS' | 'createdAt';

  let rows = $state<ResultRow[]>([]);
  let assignments = $state<Assignment[]>([]);
  let assignmentId = $state('');
  let subjectFilter = $state('');
  let sortKey = $state<SortKey>('createdAt');
  let sortDir = $state<'asc' | 'desc'>('desc');
  let loading = $state(true);
  let downloading = $state(false);
  let error = $state('');

  const columns: Array<{ key: SortKey; label: string; numeric?: boolean }> = [
    { key: 'nickname', label: 'Estudiante' },
    { key: 'studentCode', label: 'Código' },
    { key: 'subject', label: 'Asignatura' },
    { key: 'source', label: 'Origen' },
    { key: 'pct', label: 'Puntaje', numeric: true },
    { key: 'durationS', label: 'Tiempo', numeric: true },
    { key: 'createdAt', label: 'Fecha', numeric: true },
  ];

  const subjectsInRows = $derived([...new Set(rows.map((r) => r.subject ?? ''))].filter(Boolean).sort());

  const visible = $derived.by(() => {
    const filtered = subjectFilter ? rows.filter((r) => (r.subject ?? '') === subjectFilter) : rows;
    const dir = sortDir === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const x = a[sortKey] ?? '';
      const y = b[sortKey] ?? '';
      if (typeof x === 'number' && typeof y === 'number') return (x - y) * dir;
      return String(x).localeCompare(String(y), 'es', { numeric: true }) * dir;
    });
  });

  const bySubject = $derived.by(() => {
    const acc: Record<string, { sum: number; n: number }> = {};
    for (const r of visible) {
      const key = r.subject ?? '';
      acc[key] = acc[key] ?? { sum: 0, n: 0 };
      acc[key].sum += r.pct;
      acc[key].n += 1;
    }
    return Object.entries(acc)
      .map(([subject, v]) => ({ subject, avgPct: Math.round(v.sum / v.n), n: v.n }))
      .sort((a, b) => b.n - a.n);
  });

  const overall = $derived(visible.length ? Math.round(visible.reduce((acc, r) => acc + r.pct, 0) / visible.length) : null);
  const studentCount = $derived(new Set(visible.map((r) => r.studentId)).size);

  function fail(e: unknown) {
    if (isUnauthorized(e)) return onUnauthorized();
    error = teacherErrorMessage(e);
  }

  async function loadResults() {
    loading = true;
    error = '';
    try {
      rows = (await api.getResults(group.id, assignmentId || undefined)).rows;
    } catch (e) {
      fail(e);
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    try {
      assignments = await api.listAssignments(group.id);
    } catch (e) {
      fail(e);
    }
    await loadResults();
  });

  function sortBy(key: SortKey) {
    if (sortKey === key) {
      sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey = key;
      sortDir = key === 'nickname' || key === 'studentCode' || key === 'subject' || key === 'source' ? 'asc' : 'desc';
    }
  }

  function ariaSort(key: SortKey): 'ascending' | 'descending' | 'none' {
    if (sortKey !== key) return 'none';
    return sortDir === 'asc' ? 'ascending' : 'descending';
  }

  function duration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return m ? `${m} min ${s.toString().padStart(2, '0')} s` : `${s} s`;
  }

  async function downloadCsv() {
    downloading = true;
    error = '';
    try {
      const blob = await api.downloadResultsCsv(group.id, assignmentId || undefined);
      const href = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const slug = group.name.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'grupo';
      a.href = href;
      a.download = `resultados-${slug}-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(href), 1000);
    } catch (e) {
      fail(e);
    } finally {
      downloading = false;
    }
  }
</script>

<div class="space-y-5">
  <div class="grid gap-4 sm:flex sm:items-end">
    <div class="sm:w-64">
      <label class={ui.label} for="inst-results-assignment">Tarea</label>
      <select id="inst-results-assignment" class={ui.input} bind:value={assignmentId} onchange={loadResults}>
        <option value="">Todos los resultados</option>
        {#each assignments as assignment (assignment.id)}
          <option value={assignment.id}>{assignment.title}</option>
        {/each}
      </select>
    </div>
    <div class="sm:w-56">
      <label class={ui.label} for="inst-results-subject">Asignatura</label>
      <select id="inst-results-subject" class={ui.input} bind:value={subjectFilter}>
        <option value="">Todas</option>
        {#each subjectsInRows as subject (subject)}
          <option value={subject}>{subjectName(country, subject)}</option>
        {/each}
      </select>
    </div>
    <div class="sm:ml-auto">
      <button type="button" class={ui.secondary} onclick={downloadCsv} disabled={downloading}>
        {downloading ? 'Descargando…' : 'Descargar CSV'}
      </button>
    </div>
  </div>

  <ErrorNotice message={error} />

  <dl class="grid grid-cols-2 gap-3 sm:grid-cols-4">
    <div class="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <dt class="text-[11px] uppercase tracking-wider text-white/50">Promedio</dt>
      <dd class="text-2xl font-black text-amber-300" data-testid="results-average">{overall === null ? '—' : `${overall}%`}</dd>
    </div>
    <div class="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <dt class="text-[11px] uppercase tracking-wider text-white/50">Estudiantes</dt>
      <dd class="text-2xl font-black text-white">{studentCount}</dd>
    </div>
    {#each bySubject.slice(0, 2) as entry (entry.subject)}
      <div class="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <dt class="truncate text-[11px] uppercase tracking-wider text-white/50">{subjectName(country, entry.subject || null)}</dt>
        <dd class="text-2xl font-black text-white">{entry.avgPct}% <span class="text-xs font-normal text-white/40">({entry.n})</span></dd>
      </div>
    {/each}
  </dl>

  {#if bySubject.length > 2}
    <ul class="flex flex-wrap gap-2 text-xs" aria-label="Promedio por asignatura">
      {#each bySubject.slice(2) as entry (entry.subject)}
        <li class="rounded-full border border-white/10 px-3 py-1 text-white/70">
          {subjectName(country, entry.subject || null)}: <strong class="text-white">{entry.avgPct}%</strong> ({entry.n})
        </li>
      {/each}
    </ul>
  {/if}

  {#if loading}
    <p class={ui.muted}>Cargando resultados…</p>
  {:else if visible.length === 0}
    <p class="rounded-xl border border-dashed border-white/15 p-5 text-sm text-white/60">
      Aún no hay resultados con estos filtros. Aparecen cuando tus estudiantes terminan una tarea o una práctica y la comparten con el colegio.
    </p>
  {:else}
    <div class="overflow-x-auto rounded-2xl border border-white/10">
      <table class="w-full min-w-[640px] text-left text-sm">
        <caption class="sr-only">Resultados del grupo {group.name}. Usa los encabezados para ordenar.</caption>
        <thead class="bg-white/[0.04] text-[11px] uppercase tracking-wider text-white/60">
          <tr>
            {#each columns as column (column.key)}
              <th scope="col" aria-sort={ariaSort(column.key)} class="px-3 py-2 {column.numeric ? 'text-right' : ''}">
                <button
                  type="button"
                  class="inline-flex items-center gap-1 font-bold uppercase hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 rounded"
                  onclick={() => sortBy(column.key)}
                >
                  {column.label}
                  <span aria-hidden="true">{sortKey === column.key ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}</span>
                </button>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          {#each visible as row, i (`${row.studentId}-${row.createdAt}-${i}`)}
            <tr class="hover:bg-white/[0.03]" data-testid="results-row">
              <td class="px-3 py-2 font-semibold text-white">{row.nickname}</td>
              <td class="px-3 py-2 font-mono text-xs text-white/70">{row.studentCode ?? '—'}</td>
              <td class="px-3 py-2 text-white/80">{subjectName(country, row.subject)}</td>
              <td class="px-3 py-2 text-white/60">{SOURCE_LABELS[row.source] ?? row.source}</td>
              <td class="px-3 py-2 text-right">
                <span class="font-bold {row.pct >= 70 ? 'text-emerald-300' : row.pct >= 50 ? 'text-amber-300' : 'text-red-300'}">{Math.round(row.pct)}%</span>
                <span class="text-xs text-white/40">({row.correct}/{row.total})</span>
              </td>
              <td class="px-3 py-2 text-right text-white/60">{duration(row.durationS)}</td>
              <td class="px-3 py-2 text-right text-white/60">{formatDate(row.createdAt)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
