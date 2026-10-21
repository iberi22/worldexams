<script lang="ts">
  import type { StudentAssignment } from '../../lib/institutions/student-client';
  import { markAssignmentStarted } from '../../lib/institutions/report-result';

  interface Props {
    assignments: StudentAssignment[];
    loading?: boolean;
    errorMsg?: string | null;
  }

  let { assignments, loading = false, errorMsg = null }: Props = $props();

  let pending = $derived(assignments.filter((a) => !a.done));
  let done = $derived(assignments.filter((a) => a.done));

  /** `dueAt` is an ISO 8601 string (or null). */
  function dueDate(dueAt: string | null): Date | null {
    if (!dueAt) return null;
    const date = new Date(dueAt);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function formatDue(dueAt: string | null): string {
    const date = dueDate(dueAt);
    if (!date) return 'Sin fecha límite';
    return `Entrega: ${date.toLocaleDateString('es', { day: 'numeric', month: 'short' })}`;
  }

  function isOverdue(assignment: StudentAssignment): boolean {
    const date = dueDate(assignment.dueAt);
    return !assignment.done && date !== null && date.getTime() < Date.now();
  }

  /**
   * The practice flow reads `?subject=&grade=` on `/` and opens the exam config
   * modal with them preset (App.svelte). Without a subject, the student picks one
   * on the landing page. Country follows the site the student is on.
   */
  function practiceHref(assignment: StudentAssignment): string {
    if (!assignment.subject) return '/';
    const params = new URLSearchParams({ subject: assignment.subject, grade: String(assignment.grade) });
    return `/?${params.toString()}`;
  }
</script>

<div class="space-y-3">
  <h4 class="text-xs font-bold uppercase tracking-wider text-zinc-400">Tareas de mi grupo</h4>

  {#if loading}
    <p class="text-xs text-zinc-500">Cargando tareas...</p>
  {:else if errorMsg}
    <p class="text-xs text-amber-400">{errorMsg}</p>
  {:else if assignments.length === 0}
    <p class="text-xs text-zinc-500">Tu docente aún no ha asignado tareas.</p>
  {:else}
    <ul class="space-y-2">
      {#each pending as assignment (assignment.id)}
        <li class="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-black/40 px-3 py-2.5">
          <div class="min-w-0">
            <p class="truncate text-sm font-semibold text-white">{assignment.title}</p>
            <p class="text-[11px] {isOverdue(assignment) ? 'text-rose-400' : 'text-zinc-500'}">
              {assignment.subject ?? 'Todas las áreas'} · Grado {assignment.grade} · {assignment.questionCount} preguntas · {formatDue(assignment.dueAt)}
            </p>
          </div>
          <a
            href={practiceHref(assignment)}
            onclick={() => markAssignmentStarted(assignment)}
            class="shrink-0 rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400"
          >
            Empezar
          </a>
        </li>
      {/each}
      {#each done as assignment (assignment.id)}
        <li class="flex items-center justify-between gap-3 rounded-xl border border-zinc-900 bg-black/20 px-3 py-2.5 opacity-70">
          <div class="min-w-0">
            <p class="truncate text-sm font-semibold text-zinc-300">{assignment.title}</p>
            <p class="text-[11px] text-zinc-500">{assignment.subject ?? 'Todas las áreas'} · {formatDue(assignment.dueAt)}</p>
          </div>
          <span class="shrink-0 text-[11px] font-bold uppercase text-emerald-400">✓ Hecha</span>
        </li>
      {/each}
    </ul>
  {/if}
</div>
