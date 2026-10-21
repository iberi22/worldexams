<script lang="ts">
  import { tick } from 'svelte';
  import type { Group, TeacherApi } from '../../lib/institutions/types';
  import AssignmentsTab from './AssignmentsTab.svelte';
  import ResultsTab from './ResultsTab.svelte';
  import StudentsTab from './StudentsTab.svelte';
  import { ui, type CountryOption } from './ui';

  let {
    api,
    group,
    gradeName,
    country,
    countryCode,
    institutionName,
    onBack,
    onUnauthorized,
    onGroupChange = () => {},
  }: {
    api: TeacherApi;
    group: Group;
    gradeName: string;
    country: CountryOption | undefined;
    countryCode: string;
    institutionName: string;
    onBack: () => void;
    onUnauthorized: () => void;
    onGroupChange?: (patch: Partial<Group>) => void;
  } = $props();

  const tabs = [
    { id: 'estudiantes', label: 'Estudiantes' },
    { id: 'tareas', label: 'Tareas' },
    { id: 'resultados', label: 'Resultados' },
  ] as const;
  type TabId = (typeof tabs)[number]['id'];

  let active = $state<TabId>('estudiantes');

  async function onTabKey(event: KeyboardEvent, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    active = tabs[next].id;
    await tick();
    document.getElementById(`inst-tab-${tabs[next].id}`)?.focus();
  }
</script>

<div class="space-y-6">
  <div class="grid gap-3 sm:flex sm:items-center sm:justify-between">
    <div>
      <button type="button" class="{ui.link} text-sm" onclick={onBack}>← Volver a los grupos</button>
      <h2 class="{ui.h2} mt-2">{group.name}</h2>
      <p class={ui.muted}>{gradeName} · {group.studentCount ?? 0} estudiantes · {group.assignmentCount ?? 0} tareas</p>
    </div>
  </div>

  <div role="tablist" aria-label="Secciones del grupo" class="flex gap-1 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-1">
    {#each tabs as tab, i (tab.id)}
      <button
        id="inst-tab-{tab.id}"
        type="button"
        role="tab"
        aria-selected={active === tab.id}
        aria-controls="inst-panel-{tab.id}"
        tabindex={active === tab.id ? 0 : -1}
        class="flex-1 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 {active === tab.id
          ? 'bg-amber-500 text-black'
          : 'text-white/70 hover:bg-white/5 hover:text-white'}"
        onclick={() => (active = tab.id)}
        onkeydown={(event) => onTabKey(event, i)}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <div id="inst-panel-{active}" role="tabpanel" aria-labelledby="inst-tab-{active}" tabindex="0" class="focus:outline-none">
    {#if active === 'estudiantes'}
      <StudentsTab
        {api}
        {group}
        {institutionName}
        {onUnauthorized}
        onCountChange={(count) => onGroupChange({ studentCount: count })}
      />
    {:else if active === 'tareas'}
      <AssignmentsTab
        {api}
        {group}
        {country}
        {countryCode}
        {onUnauthorized}
        onCountChange={(count) => onGroupChange({ assignmentCount: count })}
      />
    {:else}
      <ResultsTab {api} {group} {country} {onUnauthorized} />
    {/if}
  </div>
</div>
