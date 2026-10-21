<script lang="ts">
  import {
    leaveGroup,
    setShareWithSchool,
    InstitutionError,
    INSTITUTION_ERROR_MESSAGES,
    type StudentSession
  } from '../../lib/institutions/student-client';

  interface Props {
    session: StudentSession;
    onChange?: (session: StudentSession | null) => void;
  }

  let { session, onChange }: Props = $props();

  let confirmingLeave = $state(false);
  let leaving = $state(false);
  let errorMsg = $state<string | null>(null);

  function toggleShare() {
    const updated = setShareWithSchool(!session.shareWithSchool);
    if (updated) onChange?.(updated);
  }

  async function confirmLeave() {
    leaving = true;
    errorMsg = null;
    try {
      await leaveGroup();
      onChange?.(null);
    } catch (e) {
      errorMsg = e instanceof InstitutionError ? e.message : INSTITUTION_ERROR_MESSAGES.UNKNOWN;
      // Local state is cleared even when the API refuses; reflect that.
      onChange?.(null);
    } finally {
      leaving = false;
      confirmingLeave = false;
    }
  }
</script>

<div class="space-y-4">
  <div class="flex items-start justify-between gap-3">
    <div class="min-w-0 space-y-0.5">
      <span class="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
        <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
        Unido a tu colegio
      </span>
      <p class="truncate text-base font-bold text-white">{session.institution.name}</p>
      <p class="text-xs text-zinc-400">
        Grupo <strong class="text-zinc-200">{session.group.name}</strong> · Grado {session.group.grade}
        · Apodo <strong class="text-zinc-200">{session.student.nickname}</strong>
      </p>
    </div>
    <span class="text-2xl" aria-hidden="true">🏫</span>
  </div>

  <div class="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-black/40 px-3 py-3">
    <div class="space-y-0.5">
      <span id="inst-share-label" class="block text-sm font-semibold text-white">Compartir mis resultados con mi colegio</span>
      <span class="block text-[11px] text-zinc-500">
        {session.shareWithSchool
          ? 'Tu docente ve tus resultados de práctica, tareas y NeuroGym. Nunca los ranked.'
          : 'Apagado: no se envía ningún resultado a tu colegio.'}
      </span>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={session.shareWithSchool}
      aria-labelledby="inst-share-label"
      onclick={toggleShare}
      class="relative h-6 w-11 shrink-0 rounded-full transition-colors {session.shareWithSchool ? 'bg-emerald-500' : 'bg-zinc-700'}"
    >
      <span
        class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all {session.shareWithSchool ? 'left-[22px]' : 'left-0.5'}"
      ></span>
    </button>
  </div>

  {#if errorMsg}
    <p role="alert" class="rounded-xl border border-rose-500/40 bg-rose-950/40 px-3 py-2 text-xs text-rose-300">{errorMsg}</p>
  {/if}

  {#if confirmingLeave}
    <div class="space-y-3 rounded-xl border border-rose-500/40 bg-rose-950/30 p-3">
      <p class="text-xs text-rose-200">
        ¿Salir de <strong>{session.group.name}</strong>? Se borran tu registro y tus resultados en el colegio. Para volver necesitarás el código otra vez.
      </p>
      <div class="flex gap-2">
        <button
          type="button"
          onclick={() => (confirmingLeave = false)}
          disabled={leaving}
          class="flex-1 rounded-xl bg-zinc-800 py-2 text-xs font-bold text-white hover:bg-zinc-700 disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="button"
          onclick={confirmLeave}
          disabled={leaving}
          class="flex-1 rounded-xl bg-rose-500 py-2 text-xs font-bold text-white hover:bg-rose-400 disabled:opacity-50"
        >
          {leaving ? 'Saliendo...' : 'Sí, salir del grupo'}
        </button>
      </div>
    </div>
  {:else}
    <button
      type="button"
      onclick={() => (confirmingLeave = true)}
      class="w-full rounded-xl border border-zinc-800 py-2 text-xs font-semibold text-zinc-400 transition-colors hover:border-rose-500/50 hover:text-rose-300"
    >
      Salir del grupo
    </button>
  {/if}
</div>
