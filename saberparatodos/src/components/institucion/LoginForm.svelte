<script lang="ts">
  import { tick } from 'svelte';
  import { teacherErrorMessage } from '../../lib/institutions/teacher-client';
  import type { TeacherApi } from '../../lib/institutions/types';
  import ErrorNotice from './ErrorNotice.svelte';
  import { ui } from './ui';

  let { api }: { api: TeacherApi } = $props();

  let email = $state('');
  let sending = $state(false);
  let sentTo = $state('');
  let devToken = $state('');
  let error = $state('');
  let sentHeading = $state<HTMLHeadingElement | null>(null);
  let emailInput = $state<HTMLInputElement | null>(null);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    error = '';
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      error = 'Escribe un correo válido, por ejemplo docente@colegio.edu.co';
      emailInput?.focus();
      return;
    }
    sending = true;
    try {
      const response = await api.requestLogin(value);
      sentTo = value;
      devToken = response.devToken ?? '';
      await tick();
      sentHeading?.focus();
    } catch (e) {
      error = teacherErrorMessage(e);
    } finally {
      sending = false;
    }
  }

  async function reset() {
    sentTo = '';
    devToken = '';
    await tick();
    emailInput?.focus();
  }
</script>

<section class="{ui.card} mx-auto max-w-md space-y-5" aria-labelledby="inst-login-title">
  {#if sentTo}
    <div class="space-y-3 text-center">
      <div class="text-4xl" aria-hidden="true">📬</div>
      <h2 id="inst-login-title" class={ui.h2} tabindex="-1" bind:this={sentHeading}>Revisa tu correo</h2>
      <p class={ui.muted}>
        Enviamos un enlace de acceso a <strong class="text-amber-200">{sentTo}</strong>. Ábrelo en este dispositivo;
        vence en 15 minutos y sirve una sola vez.
      </p>
      <p class="text-xs text-white/50">¿No llegó? Revisa la carpeta de spam o pide otro enlace.</p>
      {#if devToken}
        <a class={ui.link} href={`/institucion/entrar?token=${encodeURIComponent(devToken)}`}>Entrar (modo desarrollo)</a>
      {/if}
      <div>
        <button type="button" class={ui.secondary} onclick={reset}>Usar otro correo</button>
      </div>
    </div>
  {:else}
    <div class="space-y-2">
      <h2 id="inst-login-title" class={ui.h2}>Entrar al panel para colegios</h2>
      <p class={ui.muted}>Sin contraseñas: te enviamos un enlace de acceso a tu correo institucional o personal.</p>
    </div>
    <form class="space-y-4" onsubmit={submit} novalidate>
      <div>
        <label class={ui.label} for="inst-login-email">Correo electrónico</label>
        <input
          id="inst-login-email"
          class={ui.input}
          type="email"
          name="email"
          autocomplete="email"
          inputmode="email"
          required
          placeholder="docente@colegio.edu"
          bind:value={email}
          bind:this={emailInput}
          aria-invalid={error ? 'true' : undefined}
        />
      </div>
      <ErrorNotice message={error} />
      <button type="submit" class="{ui.primary} w-full" disabled={sending}>
        {sending ? 'Enviando…' : 'Enviarme el enlace'}
      </button>
    </form>
  {/if}
</section>
