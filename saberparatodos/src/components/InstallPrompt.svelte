<script lang="ts">
  import { onMount } from 'svelte';
  import { isPWAInstalled, promptPWAInstall } from '../lib/pwa-detector';
  import { recordMejoraInterna } from '../lib/mejora-interna-telemetry';

  const DISMISS_KEY = 'swal.pwa.installPrompt.dismissedAt';
  const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

  let deferredPrompt: any = null;
  let visible = $state(false);
  let installing = $state(false);

  function wasDismissedRecently(): boolean {
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      if (!raw) return false;
      return Date.now() - Number(raw) < DISMISS_COOLDOWN_MS;
    } catch {
      return false;
    }
  }

  function dismiss() {
    visible = false;
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // noop
    }
  }

  async function install() {
    if (!deferredPrompt || installing) return;
    installing = true;
    const accepted = await promptPWAInstall(deferredPrompt);
    installing = false;
    recordMejoraInterna('pwa.install_prompt.result', { accepted });
    visible = false;
    deferredPrompt = null;
  }

  onMount(() => {
    if (isPWAInstalled() || wasDismissedRecently()) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      visible = true;
      recordMejoraInterna('pwa.install_prompt.shown', {});
    };
    const onInstalled = () => {
      visible = false;
      deferredPrompt = null;
      recordMejoraInterna('pwa.installed', {});
    };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  });
</script>

{#if visible}
  <div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,26rem)] rounded-2xl border border-emerald-500/30 bg-slate-950/95 shadow-2xl p-4 flex items-center gap-3 text-white">
    <div class="flex-1">
      <p class="text-sm font-bold">Instala SaberParaTodos</p>
      <p class="text-xs text-white/60">Modo offline, packs locales y tutor IA on-device.</p>
    </div>
    <button
      type="button"
      class="px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 text-xs font-bold disabled:opacity-50"
      disabled={installing}
      onclick={install}
    >{installing ? 'Instalando…' : 'Instalar'}</button>
    <button
      type="button"
      class="px-2 py-2 rounded-lg text-white/40 hover:text-white/80 text-sm"
      aria-label="Cerrar"
      onclick={dismiss}
    >✕</button>
  </div>
{/if}
