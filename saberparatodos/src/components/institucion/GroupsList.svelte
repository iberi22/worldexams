<script lang="ts">
  import {
    PLAN_LIMITS,
    canCreateGroup,
    isUnauthorized,
    planUsageLabel,
    teacherErrorMessage,
  } from '../../lib/institutions/teacher-client';
  import type { Group, InstitutionPlan, TeacherApi } from '../../lib/institutions/types';
  import EmptyState from './EmptyState.svelte';
  import ErrorNotice from './ErrorNotice.svelte';
  import { ui } from './ui';

  let {
    api,
    groups,
    plan,
    grades,
    onCreated,
    onSelect,
    onUnauthorized,
  }: {
    api: TeacherApi;
    groups: Group[];
    plan: InstitutionPlan;
    grades: Array<{ id: number; name: string }>;
    onCreated: (group: Group) => void;
    onSelect: (groupId: string) => void;
    onUnauthorized: () => void;
  } = $props();

  let name = $state('');
  // svelte-ignore state_referenced_locally
  let grade = $state<number>(grades.at(-1)?.id ?? 11);
  let saving = $state(false);
  let error = $state('');

  const canCreate = $derived(canCreateGroup(plan, groups.length));
  const usage = $derived(planUsageLabel(plan, groups.length));
  const usagePct = $derived(
    Number.isFinite(PLAN_LIMITS[plan].groups) ? Math.min(100, (groups.length / PLAN_LIMITS[plan].groups) * 100) : 0
  );

  function gradeName(id: number): string {
    return grades.find((g) => g.id === id)?.name ?? `Grado ${id}`;
  }

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    error = '';
    if (name.trim().length < 1) {
      error = 'Ponle un nombre al grupo, por ejemplo "11-A".';
      return;
    }
    saving = true;
    try {
      const group = await api.createGroup({ name: name.trim(), grade: Number(grade) });
      name = '';
      onCreated(group);
    } catch (e) {
      if (isUnauthorized(e)) return onUnauthorized();
      error = teacherErrorMessage(e);
    } finally {
      saving = false;
    }
  }
</script>

<div class="space-y-6">
  <div class="grid gap-3 sm:flex sm:items-end sm:justify-between">
    <div>
      <h2 class={ui.h2}>Tus grupos</h2>
      <p class={ui.muted} data-testid="plan-usage">{usage}</p>
    </div>
    {#if usagePct > 0}
      <div class="h-2 w-full overflow-hidden rounded-full bg-white/10 sm:w-48" aria-hidden="true">
        <div class="h-full rounded-full {usagePct >= 100 ? 'bg-red-400' : 'bg-amber-400'}" style="width: {usagePct}%"></div>
      </div>
    {/if}
  </div>

  {#if groups.length === 0}
    <EmptyState />
  {:else}
    <ul class="grid gap-4 sm:grid-cols-2" aria-label="Grupos">
      {#each groups as group (group.id)}
        <li>
          <button
            type="button"
            class="group w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-colors hover:border-amber-400/50 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            onclick={() => onSelect(group.id)}
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="text-lg font-bold text-white group-hover:text-amber-200">{group.name}</h3>
                <p class="text-xs text-white/50">{gradeName(group.grade)}</p>
              </div>
              <span class="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1 font-mono text-xs tracking-widest text-amber-300">
                {group.joinCode}
              </span>
            </div>
            <dl class="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt class="text-[11px] uppercase tracking-wider text-white/40">Estudiantes</dt>
                <dd class="font-bold text-white">{group.studentCount ?? 0}</dd>
              </div>
              <div>
                <dt class="text-[11px] uppercase tracking-wider text-white/40">Tareas</dt>
                <dd class="font-bold text-white">{group.assignmentCount ?? 0}</dd>
              </div>
            </dl>
          </button>
        </li>
      {/each}
    </ul>
  {/if}

  <section class={ui.card} aria-labelledby="inst-new-group-title">
    <h3 id="inst-new-group-title" class="text-base font-bold text-white">Nuevo grupo</h3>
    {#if canCreate}
      <form class="mt-4 grid gap-4 sm:grid-cols-[1fr_12rem_auto] sm:items-end" onsubmit={submit} novalidate>
        <div>
          <label class={ui.label} for="inst-group-name">Nombre del grupo</label>
          <input id="inst-group-name" class={ui.input} maxlength="60" placeholder="11-A" bind:value={name} />
        </div>
        <div>
          <label class={ui.label} for="inst-group-grade">Grado</label>
          <select id="inst-group-grade" class={ui.input} bind:value={grade}>
            {#each grades as option (option.id)}
              <option value={option.id}>{option.name}</option>
            {/each}
          </select>
        </div>
        <button type="submit" class={ui.primary} disabled={saving}>{saving ? 'Creando…' : 'Crear grupo'}</button>
      </form>
    {:else}
      <p class="mt-2 text-sm text-white/70">
        Usaste todos los grupos de tu plan ({usage}). Escríbenos a
        <a class={ui.link} href="/contacto">contacto</a> para ampliar el plan.
      </p>
    {/if}
    <div class="mt-4"><ErrorNotice message={error} /></div>
  </section>
</div>
