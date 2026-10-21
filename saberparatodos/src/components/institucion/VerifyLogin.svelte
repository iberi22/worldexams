<script lang="ts">
  import { onMount } from 'svelte';
  import { saveTeacherSession, teacherErrorMessage } from '../../lib/institutions/teacher-client';
  import { getTeacherApi } from '../../lib/institutions';
  import type { TeacherApi } from '../../lib/institutions/types';
  import { ui } from './ui';

  let {
    api = getTeacherApi(),
    redirectTo = '/institucion',
    navigate = (url: string) => window.location.replace(url),
  }: { api?: TeacherApi; redirectTo?: string; navigate?: (url: string) => void } = $props();

  let status = $state<'verifying' | 'error' | 'done'>('verifying');
  let error = $state('');

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token')?.trim() ?? '';
    // Drop the single-use token from the address bar and history.
    try {
      window.history.replaceState(null, '', window.location.pathname);
    } catch {
      // Ignore: some embedded browsers disallow replaceState.
    }
    if (!token) {
      status = 'error';
      error = 'Este enlace no trae un código de acceso. Pide uno nuevo desde el panel.';
      return;
    }
    try {
      const { sessionToken } = await api.verify(token);
      saveTeacherSession(sessionToken);
      status = 'done';
      navigate(redirectTo);
    } catch (e) {
      status = 'error';
      error = teacherErrorMessage(e);
    }
  });
</script>

<section class="{ui.card} mx-auto max-w-md space-y-4 text-center" aria-live="polite">
  {#if status === 'verifying'}
    <div class="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" aria-hidden="true"></div>
    <h1 class={ui.h2}>Verificando tu enlace…</h1>
  {:else if status === 'done'}
    <h1 class={ui.h2}>¡Listo! Abriendo tu panel…</h1>
    <a class={ui.link} href={redirectTo}>Ir al panel</a>
  {:else}
    <h1 class={ui.h2}>No pudimos abrir tu sesión</h1>
    <p role="alert" class="text-sm text-red-100">{error}</p>
    <a class={ui.primary} href={redirectTo}>Pedir un enlace nuevo</a>
  {/if}
</section>
