<script lang="ts">
  import { onMount } from 'svelte';
  import {
    dueDateToIso,
    formatDate,
    isUnauthorized,
    teacherErrorMessage,
  } from '../../lib/institutions/teacher-client';
  import type { Assignment, Group, TeacherApi } from '../../lib/institutions/types';
  import ErrorNotice from './ErrorNotice.svelte';
  import { subjectName, ui, type CountryOption } from './ui';

  let {
    api,
    group,
    country,
    countryCode,
    onUnauthorized,
    onCountChange = () => {},
  }: {
    api: TeacherApi;
    group: Group;
    country: CountryOption | undefined;
    countryCode: string;
    onUnauthorized: () => void;
    onCountChange?: (count: number) => void;
  } = $props();

  const MIN_QUESTIONS = 10;
  const MAX_QUESTIONS = 60;

  let assignments = $state<Assignment[]>([]);
  let loading = $state(true);
  let error = $state('');
  let saving = $state(false);
  let created = $state('');

  let title = $state('');
  let subject = $state('');
  let questionCount = $state(20);
  let dueDate = $state('');

  const today = new Date().toISOString().slice(0, 10);

  function fail(e: unknown) {
    if (isUnauthorized(e)) return onUnauthorized();
    error = teacherErrorMessage(e);
  }

  onMount(async () => {
    try {
      assignments = await api.listAssignments(group.id);
    } catch (e) {
      fail(e);
    } finally {
      loading = false;
    }
  });

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    error = '';
    created = '';
    const count = Number(questionCount);
    if (title.trim().length < 2) {
      error = 'Escribe un título para la tarea.';
      return;
    }
    if (!Number.isInteger(count) || count < MIN_QUESTIONS || count > MAX_QUESTIONS) {
      error = `El número de preguntas debe estar entre ${MIN_QUESTIONS} y ${MAX_QUESTIONS}.`;
      return;
    }
    saving = true;
    try {
      const assignment = await api.createAssignment(group.id, {
        title: title.trim(),
        country: countryCode.toLowerCase(),
        grade: group.grade,
        subject: subject || null,
        questionCount: count,
        dueAt: dueDate ? dueDateToIso(dueDate) : null,
      });
      assignments = [...assignments, assignment];
      onCountChange(assignments.length);
      created = `Tarea "${assignment.title}" creada. Tus estudiantes la verán al abrir la app.`;
      title = '';
      dueDate = '';
    } catch (e) {
      fail(e);
    } finally {
      saving = false;
    }
  }
</script>

<div class="space-y-6">
  <section class={ui.card} aria-labelledby="inst-new-assignment-title">
    <h3 id="inst-new-assignment-title" class="text-base font-bold text-white">Nueva tarea</h3>
    <form class="mt-4 grid gap-4 sm:grid-cols-2" onsubmit={submit} novalidate>
      <div class="sm:col-span-2">
        <label class={ui.label} for="inst-assignment-title">Título</label>
        <input id="inst-assignment-title" class={ui.input} maxlength="120" placeholder="Repaso de fracciones" bind:value={title} />
      </div>
      <div>
        <label class={ui.label} for="inst-assignment-subject">Asignatura</label>
        <select id="inst-assignment-subject" class={ui.input} bind:value={subject}>
          <option value="">Todas las asignaturas</option>
          {#each country?.subjects ?? [] as option (option.id)}
            <option value={option.id}>{option.name}</option>
          {/each}
        </select>
      </div>
      <div>
        <label class={ui.label} for="inst-assignment-count">Número de preguntas ({MIN_QUESTIONS}–{MAX_QUESTIONS})</label>
        <input
          id="inst-assignment-count"
          class={ui.input}
          type="number"
          inputmode="numeric"
          min={MIN_QUESTIONS}
          max={MAX_QUESTIONS}
          step="1"
          bind:value={questionCount}
        />
      </div>
      <div>
        <label class={ui.label} for="inst-assignment-due">Fecha límite (opcional)</label>
        <input id="inst-assignment-due" class={ui.input} type="date" min={today} bind:value={dueDate} />
      </div>
      <div class="flex items-end">
        <button type="submit" class="{ui.primary} w-full" disabled={saving}>{saving ? 'Creando…' : 'Crear tarea'}</button>
      </div>
    </form>
    <div class="mt-4 space-y-2">
      <ErrorNotice message={error} />
      {#if created}<p class="text-sm text-emerald-300" role="status">{created}</p>{/if}
    </div>
  </section>

  <section aria-labelledby="inst-assignments-title" class="space-y-3">
    <h3 id="inst-assignments-title" class="text-base font-bold text-white">Tareas ({assignments.length})</h3>
    {#if loading}
      <p class={ui.muted}>Cargando tareas…</p>
    {:else if assignments.length === 0}
      <p class="rounded-xl border border-dashed border-white/15 p-5 text-sm text-white/60">
        Todavía no hay tareas. Crea la primera: elige asignatura, número de preguntas y una fecha límite.
      </p>
    {:else}
      <ul class="grid gap-3 sm:grid-cols-2">
        {#each assignments as assignment (assignment.id)}
          <li class="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p class="font-semibold text-white">{assignment.title}</p>
            <p class="mt-1 text-xs text-white/50">
              {subjectName(country, assignment.subject)} · {assignment.questionCount} preguntas · Vence {formatDate(assignment.dueAt)}
            </p>
            {#if typeof assignment.completedCount === 'number'}
              <p class="mt-2 text-xs text-amber-300">
                {assignment.completedCount} de {group.studentCount ?? 0} estudiantes la completaron
              </p>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</div>
