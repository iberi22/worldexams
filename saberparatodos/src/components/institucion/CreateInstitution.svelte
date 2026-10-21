<script lang="ts">
  import {
    INSTITUTION_COUNTRIES,
    isInstitutionCountry,
    isUnauthorized,
    teacherErrorMessage,
  } from '../../lib/institutions/teacher-client';
  import type { Institution, Teacher, TeacherApi } from '../../lib/institutions/types';
  import ErrorNotice from './ErrorNotice.svelte';
  import { ui, type CountryOption } from './ui';

  let {
    api,
    teacher,
    countries,
    defaultCountry,
    onCreated,
    onUnauthorized,
  }: {
    api: TeacherApi;
    teacher: Teacher;
    countries: CountryOption[];
    defaultCountry: string;
    onCreated: (institution: Institution, teacher: Teacher) => void;
    onUnauthorized: () => void;
  } = $props();

  const allowedCountries = $derived(countries.filter((c) => isInstitutionCountry(c.code)));

  // svelte-ignore state_referenced_locally
  let teacherName = $state(teacher.name ?? '');
  let name = $state('');
  // svelte-ignore state_referenced_locally
  let country = $state(isInstitutionCountry(defaultCountry) ? defaultCountry.toLowerCase() : INSTITUTION_COUNTRIES[0]);
  let city = $state('');
  let saving = $state(false);
  let error = $state('');

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    error = '';
    if (name.trim().length < 2 || city.trim().length < 1) {
      error = 'Escribe el nombre de la institución y la ciudad.';
      return;
    }
    saving = true;
    try {
      let updated = teacher;
      if (teacherName.trim() && teacherName.trim() !== teacher.name) {
        updated = (await api.updateMe({ name: teacherName.trim() })).teacher;
      }
      const institution = await api.createInstitution({ name: name.trim(), country, city: city.trim() });
      onCreated(institution, { ...updated, role: 'owner' });
    } catch (e) {
      if (isUnauthorized(e)) return onUnauthorized();
      error = teacherErrorMessage(e);
    } finally {
      saving = false;
    }
  }
</script>

<section class="{ui.card} mx-auto max-w-lg space-y-5" aria-labelledby="inst-create-title">
  <div class="space-y-2">
    <p class="text-[11px] font-black uppercase tracking-widest text-amber-400">Paso 1 de 3</p>
    <h2 id="inst-create-title" class={ui.h2}>Crea tu institución</h2>
    <p class={ui.muted}>Con esto podrás crear grupos, invitar estudiantes con un código y ver sus resultados.</p>
  </div>
  <form class="space-y-4" onsubmit={submit} novalidate>
    <div>
      <label class={ui.label} for="inst-teacher-name">Tu nombre (opcional)</label>
      <input id="inst-teacher-name" class={ui.input} autocomplete="name" maxlength="80" bind:value={teacherName} />
    </div>
    <div>
      <label class={ui.label} for="inst-name">Nombre de la institución</label>
      <input id="inst-name" class={ui.input} required maxlength="120" placeholder="Colegio San José" bind:value={name} />
    </div>
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label class={ui.label} for="inst-country">País</label>
        <select id="inst-country" class={ui.input} bind:value={country}>
          {#each allowedCountries as option (option.code)}
            <option value={option.code.toLowerCase()}>{option.flag} {option.name}</option>
          {/each}
        </select>
      </div>
      <div>
        <label class={ui.label} for="inst-city">Ciudad</label>
        <input id="inst-city" class={ui.input} required maxlength="80" autocomplete="address-level2" bind:value={city} />
      </div>
    </div>
    <ErrorNotice message={error} />
    <button type="submit" class="{ui.primary} w-full" disabled={saving}>
      {saving ? 'Creando…' : 'Crear institución'}
    </button>
  </form>
</section>
