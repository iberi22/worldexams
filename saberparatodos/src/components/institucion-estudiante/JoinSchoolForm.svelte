<script lang="ts">
  import {
    joinGroup,
    normalizeJoinCode,
    isValidJoinCode,
    hasAmbiguousChars,
    isValidNickname,
    normalizeNickname,
    suggestNickname,
    InstitutionError,
    INSTITUTION_ERROR_MESSAGES,
    JOIN_CODE_LENGTH,
    type StudentSession
  } from '../../lib/institutions/student-client';

  interface Props {
    onJoined?: (session: StudentSession) => void;
  }

  let { onJoined }: Props = $props();

  let code = $state('');
  let nickname = $state(suggestNickname());
  let submitting = $state(false);
  let errorMsg = $state<string | null>(null);

  let normalizedCode = $derived(normalizeJoinCode(code));
  let codeHint = $derived(
    normalizedCode.length > 0 && hasAmbiguousChars(normalizedCode)
      ? 'Los códigos no usan 0, O, 1, I ni L. Revisa el código con tu docente.'
      : null
  );
  let canSubmit = $derived(
    !submitting && isValidJoinCode(normalizedCode) && isValidNickname(normalizeNickname(nickname))
  );

  function handleCodeInput(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    code = normalizeJoinCode(input.value);
    input.value = code;
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    errorMsg = null;
    if (!isValidJoinCode(normalizedCode)) {
      errorMsg = INSTITUTION_ERROR_MESSAGES.INVALID_CODE;
      return;
    }
    if (!isValidNickname(normalizeNickname(nickname))) {
      errorMsg = INSTITUTION_ERROR_MESSAGES.INVALID_NICKNAME;
      return;
    }
    submitting = true;
    try {
      const session = await joinGroup(normalizedCode, nickname);
      onJoined?.(session);
    } catch (e) {
      errorMsg = e instanceof InstitutionError ? e.message : INSTITUTION_ERROR_MESSAGES.UNKNOWN;
    } finally {
      submitting = false;
    }
  }
</script>

<form class="space-y-4" onsubmit={handleSubmit} novalidate>
  <div class="space-y-1">
    <h3 class="text-base font-bold text-white">Unirme a mi colegio</h3>
    <p class="text-xs text-zinc-400">
      Escribe el código de 6 caracteres que te dio tu docente. No necesitas correo ni tu nombre real.
    </p>
  </div>

  <div class="space-y-1.5">
    <label for="inst-join-code" class="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
      Código del grupo
    </label>
    <input
      id="inst-join-code"
      type="text"
      inputmode="text"
      autocomplete="off"
      autocapitalize="characters"
      spellcheck="false"
      maxlength={JOIN_CODE_LENGTH + 2}
      value={code}
      oninput={handleCodeInput}
      placeholder="ABC234"
      aria-describedby="inst-join-code-hint"
      class="w-full rounded-xl border border-zinc-700 bg-black/60 px-3 py-2.5 text-center font-mono text-lg tracking-[0.4em] text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
    />
    <p id="inst-join-code-hint" class="text-[11px] {codeHint ? 'text-amber-400' : 'text-zinc-500'}">
      {codeHint ?? 'Mayúsculas o minúsculas da igual; los guiones y espacios se ignoran.'}
    </p>
  </div>

  <div class="space-y-1.5">
    <label for="inst-join-nickname" class="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
      Apodo que verá tu docente
    </label>
    <input
      id="inst-join-nickname"
      type="text"
      autocomplete="nickname"
      maxlength="24"
      bind:value={nickname}
      placeholder="Ej. Puma Veloz"
      class="w-full rounded-xl border border-zinc-700 bg-black/60 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
    />
  </div>

  {#if errorMsg}
    <p role="alert" class="rounded-xl border border-rose-500/40 bg-rose-950/40 px-3 py-2 text-xs text-rose-300">{errorMsg}</p>
  {/if}

  <button
    type="submit"
    disabled={!canSubmit}
    class="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {#if submitting}
      <span class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-zinc-950/30 border-t-zinc-950"></span>
      <span>Uniendo...</span>
    {:else}
      <span>Unirme</span>
    {/if}
  </button>

  <p class="text-[11px] leading-relaxed text-zinc-500">
    Al unirte, tus resultados de práctica y NeuroGym se comparten con tu colegio. Puedes apagarlo o salir del grupo cuando quieras. Los exámenes ranked nunca se comparten.
  </p>
</form>
