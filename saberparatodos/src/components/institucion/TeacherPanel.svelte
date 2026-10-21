<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { getTeacherApi, isMockMode } from '../../lib/institutions';
  import {
    PLAN_LABELS,
    clearTeacherSession,
    isUnauthorized,
    loadTeacherSession,
    teacherErrorMessage,
  } from '../../lib/institutions/teacher-client';
  import type { Group, Institution, Teacher, TeacherApi } from '../../lib/institutions/types';
  import CreateInstitution from './CreateInstitution.svelte';
  import ErrorNotice from './ErrorNotice.svelte';
  import GroupDetail from './GroupDetail.svelte';
  import GroupsList from './GroupsList.svelte';
  import LoginForm from './LoginForm.svelte';
  import { findCountry, ui, type CountryOption } from './ui';

  let {
    countries,
    defaultCountry,
    api = getTeacherApi(),
  }: { countries: CountryOption[]; defaultCountry: string; api?: TeacherApi } = $props();

  type View = 'loading' | 'login' | 'onboarding' | 'groups' | 'error';

  let view = $state<View>('loading');
  let teacher = $state<Teacher | null>(null);
  let institution = $state<Institution | null>(null);
  let groups = $state<Group[]>([]);
  let selectedId = $state<string | null>(null);
  let error = $state('');
  let notice = $state('');
  let mainHeading = $state<HTMLElement | null>(null);

  const selected = $derived(groups.find((g) => g.id === selectedId) ?? null);
  const country = $derived(findCountry(countries, institution?.country) ?? findCountry(countries, defaultCountry));
  const grades = $derived(country?.grades?.length ? country.grades : Array.from({ length: 9 }, (_, i) => ({ id: i + 3, name: `Grado ${i + 3}` })));

  function gradeName(id: number): string {
    return grades.find((g) => g.id === id)?.name ?? `Grado ${id}`;
  }

  async function focusMain() {
    await tick();
    mainHeading?.focus();
  }

  async function load() {
    error = '';
    if (!loadTeacherSession()) {
      view = 'login';
      return;
    }
    view = 'loading';
    try {
      const me = await api.me();
      teacher = me.teacher;
      institution = me.institution;
      if (!institution) {
        view = 'onboarding';
        return;
      }
      groups = await api.listGroups();
      view = 'groups';
    } catch (e) {
      if (isUnauthorized(e)) return expire();
      error = teacherErrorMessage(e);
      view = 'error';
    }
  }

  onMount(load);

  function reset() {
    clearTeacherSession();
    teacher = null;
    institution = null;
    groups = [];
    selectedId = null;
    view = 'login';
  }

  function expire() {
    reset();
    notice = 'Tu sesión expiró. Vuelve a entrar con tu correo.';
  }

  async function logout() {
    try {
      await api.logout();
    } catch {
      // The local session is cleared either way.
    }
    notice = '';
    reset();
  }

  function institutionCreated(created: Institution, updated: Teacher) {
    institution = created;
    teacher = updated;
    groups = [];
    view = 'groups';
    focusMain();
  }

  function groupCreated(group: Group) {
    groups = [...groups, { studentCount: 0, assignmentCount: 0, ...group }];
    selectedId = group.id;
    focusMain();
  }

  function patchGroup(patch: Partial<Group>) {
    groups = groups.map((g) => (g.id === selectedId ? { ...g, ...patch } : g));
  }

  function selectGroup(id: string | null) {
    selectedId = id;
    focusMain();
  }
</script>

<div class="w-full space-y-8">
  <header class="grid gap-4 sm:flex sm:items-center sm:justify-between">
    <div class="space-y-1">
      <p class="text-[11px] font-black uppercase tracking-widest text-amber-400">Panel para colegios</p>
      <h1 class="text-2xl font-black tracking-tight text-[#F5F5DC] sm:text-4xl" tabindex="-1" bind:this={mainHeading}>
        {institution ? institution.name : 'Tu colegio en SaberParaTodos'}
      </h1>
      {#if institution}
        <p class={ui.muted}>
          {country?.flag ?? ''} {institution.city}{country ? `, ${country.name}` : ''} · {PLAN_LABELS[institution.plan]}
        </p>
      {:else}
        <p class={ui.muted}>Grupos, códigos de ingreso, tareas y resultados de tus estudiantes. Gratis.</p>
      {/if}
    </div>
    {#if teacher}
      <div class="flex items-center gap-3 text-sm">
        <span class="truncate text-white/60" title={teacher.email}>{teacher.name || teacher.email}</span>
        <button type="button" class="{ui.secondary} px-3 py-1.5 text-xs" onclick={logout}>Cerrar sesión</button>
      </div>
    {/if}
  </header>

  {#if isMockMode()}
    <p class="rounded-lg border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs text-sky-100">
      Modo demostración: los datos viven solo en esta pestaña.
    </p>
  {/if}

  {#if view === 'loading'}
    <p class={ui.muted} aria-live="polite">Cargando tu panel…</p>
  {:else if view === 'login'}
    {#if notice}<div class="mx-auto max-w-md"><ErrorNotice message={notice} /></div>{/if}
    <LoginForm {api} />
  {:else if view === 'onboarding' && teacher}
    <CreateInstitution
      {api}
      {teacher}
      {countries}
      {defaultCountry}
      onCreated={institutionCreated}
      onUnauthorized={expire}
    />
  {:else if view === 'groups' && institution}
    {#if selected}
      <GroupDetail
        {api}
        group={selected}
        gradeName={gradeName(selected.grade)}
        {country}
        countryCode={institution.country}
        institutionName={institution.name}
        onBack={() => selectGroup(null)}
        onUnauthorized={expire}
        onGroupChange={patchGroup}
      />
    {:else}
      <GroupsList
        {api}
        {groups}
        plan={institution.plan}
        {grades}
        onCreated={groupCreated}
        onSelect={selectGroup}
        onUnauthorized={expire}
      />
    {/if}
  {:else}
    <div class="mx-auto max-w-md space-y-4">
      <ErrorNotice message={error} />
      <button type="button" class={ui.primary} onclick={load}>Reintentar</button>
    </div>
  {/if}
</div>
