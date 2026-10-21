<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { qrSvg } from '../../lib/institutions/qr';
  import {
    formatDate,
    isUnauthorized,
    joinUrl,
    teacherErrorMessage,
  } from '../../lib/institutions/teacher-client';
  import type { Group, Student, TeacherApi } from '../../lib/institutions/types';
  import ErrorNotice from './ErrorNotice.svelte';
  import { ui } from './ui';

  let {
    api,
    group,
    institutionName,
    onUnauthorized,
    onCountChange = () => {},
  }: {
    api: TeacherApi;
    group: Group;
    institutionName: string;
    onUnauthorized: () => void;
    onCountChange?: (count: number) => void;
  } = $props();

  let students = $state<Student[]>([]);
  let loading = $state(true);
  let error = $state('');
  let copyStatus = $state('');
  let editing = $state<Record<string, string>>({});
  let savingId = $state('');
  let confirmingId = $state('');

  const link = $derived(joinUrl(group.joinCode));
  const qr = $derived(qrSvg(link, { label: `Código QR para unirse al grupo ${group.name}` }));

  function fail(e: unknown) {
    if (isUnauthorized(e)) return onUnauthorized();
    error = teacherErrorMessage(e);
  }

  async function load() {
    loading = true;
    error = '';
    try {
      students = await api.listStudents(group.id);
      editing = Object.fromEntries(students.map((s) => [s.id, s.studentCode ?? '']));
    } catch (e) {
      fail(e);
    } finally {
      loading = false;
    }
  }

  onMount(load);

  async function copy(text: string, what: string) {
    try {
      await navigator.clipboard.writeText(text);
      copyStatus = `${what} copiado.`;
    } catch {
      copyStatus = `No se pudo copiar. ${what}: ${text}`;
    }
  }

  async function saveCode(student: Student) {
    const value = (editing[student.id] ?? '').trim();
    savingId = student.id;
    error = '';
    try {
      await api.updateStudentCode(group.id, student.id, value || null);
      students = students.map((s) => (s.id === student.id ? { ...s, studentCode: value || null } : s));
    } catch (e) {
      fail(e);
    } finally {
      savingId = '';
    }
  }

  async function askRemove(student: Student) {
    confirmingId = student.id;
    await tick();
    document.getElementById(`inst-confirm-remove-${student.id}`)?.focus();
  }

  async function cancelRemove(student: Student) {
    confirmingId = '';
    await tick();
    document.getElementById(`inst-remove-${student.id}`)?.focus();
  }

  async function remove(student: Student) {
    error = '';
    try {
      await api.removeStudent(group.id, student.id);
      students = students.filter((s) => s.id !== student.id);
      confirmingId = '';
      onCountChange(students.length);
    } catch (e) {
      fail(e);
    }
  }
</script>

<div class="space-y-6">
  <section class="{ui.card} inst-print-area" aria-labelledby="inst-join-title">
    <div class="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
      <div class="space-y-3">
        <p class="inst-print-only hidden text-sm font-semibold">{institutionName} · {group.name}</p>
        <h3 id="inst-join-title" class="text-[11px] font-black uppercase tracking-widest text-amber-400">Código para unirse</h3>
        <p
          class="font-mono text-4xl font-black tracking-[0.3em] text-white sm:text-5xl"
          data-testid="join-code"
          aria-label={`Código ${group.joinCode.split('').join(' ')}`}
        >
          {group.joinCode}
        </p>
        <p class="text-sm text-white/60">
          En la app: <strong class="text-white">Unirme a mi colegio</strong> → escribe este código. También pueden escanear el QR.
        </p>
        <p class="inst-print-only hidden break-all text-xs">{link}</p>
        <div class="inst-no-print flex flex-wrap gap-2">
          <button type="button" class={ui.primary} onclick={() => copy(group.joinCode, 'Código')}>Copiar código</button>
          <button type="button" class={ui.secondary} onclick={() => copy(link, 'Enlace')}>Copiar enlace</button>
          <button type="button" class={ui.secondary} onclick={() => window.print()}>Imprimir tarjeta</button>
        </div>
        <p class="inst-no-print text-xs text-emerald-300" aria-live="polite">{copyStatus}</p>
      </div>
      <div class="mx-auto w-40 rounded-xl bg-white p-2 sm:w-44" data-testid="join-qr">
        {@html qr}
      </div>
    </div>
  </section>

  <section aria-labelledby="inst-students-title" class="space-y-3">
    <div class="flex items-center justify-between">
      <h3 id="inst-students-title" class="text-base font-bold text-white">Estudiantes ({students.length})</h3>
      <button type="button" class="{ui.secondary} px-3 py-1.5 text-xs" onclick={load}>Actualizar</button>
    </div>
    <ErrorNotice message={error} />
    {#if loading}
      <p class={ui.muted}>Cargando estudiantes…</p>
    {:else if students.length === 0}
      <p class="rounded-xl border border-dashed border-white/15 p-5 text-sm text-white/60">
        Aún no hay estudiantes. Comparte el código <strong class="font-mono text-amber-300">{group.joinCode}</strong> o imprime la
        tarjeta con el QR.
      </p>
    {:else}
      <ul class="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
        {#each students as student (student.id)}
          <li class="grid gap-3 p-4 sm:flex sm:items-center">
            <div class="min-w-0 flex-1">
              <p class="truncate font-semibold text-white">{student.nickname}</p>
              <p class="text-xs text-white/50">
                Se unió {formatDate(student.joinedAt)} · Última actividad {formatDate(student.lastResultAt)} · Promedio
                {student.avgPct === null ? '—' : `${Math.round(student.avgPct)}%`}
              </p>
            </div>
            <form
              class="flex items-end gap-2"
              onsubmit={(event) => {
                event.preventDefault();
                saveCode(student);
              }}
            >
              <div>
                <label class="mb-1 block text-[10px] font-bold uppercase tracking-widest text-white/50" for="inst-code-{student.id}">
                  Código de estudiante
                </label>
                <input
                  id="inst-code-{student.id}"
                  class="{ui.input} w-32 py-1.5"
                  maxlength="32"
                  bind:value={editing[student.id]}
                />
              </div>
              <button
                type="submit"
                class="{ui.secondary} px-3 py-1.5 text-xs"
                disabled={savingId === student.id || (editing[student.id] ?? '') === (student.studentCode ?? '')}
              >
                Guardar
              </button>
            </form>
            {#if confirmingId === student.id}
              <div role="group" aria-label={`Confirmar quitar a ${student.nickname}`} class="flex flex-wrap items-center gap-2">
                <span class="text-xs text-red-100">¿Quitar a {student.nickname}? Se borran sus resultados.</span>
                <button id="inst-confirm-remove-{student.id}" type="button" class={ui.danger} onclick={() => remove(student)}>
                  Sí, quitar
                </button>
                <button type="button" class="{ui.secondary} px-3 py-2" onclick={() => cancelRemove(student)}>Cancelar</button>
              </div>
            {:else}
              <button
                id="inst-remove-{student.id}"
                type="button"
                class="{ui.danger} self-start sm:self-auto"
                aria-label={`Quitar a ${student.nickname} del grupo`}
                onclick={() => askRemove(student)}
              >
                Quitar
              </button>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</div>

<style>
  @media print {
    :global(body *) {
      visibility: hidden;
    }
    :global(.inst-print-area),
    :global(.inst-print-area *) {
      visibility: visible;
      color: #000 !important;
    }
    :global(.inst-print-area) {
      position: absolute;
      inset: 0 auto auto 0;
      width: 100%;
      background: #fff !important;
      border: 2px dashed #000 !important;
    }
    :global(.inst-no-print) {
      display: none !important;
    }
    :global(.inst-print-only) {
      display: block !important;
    }
  }
</style>
