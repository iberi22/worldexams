<script lang="ts">
  import { onMount } from 'svelte';
  import packageInfo from '../../package.json';

  let buildInfo: any = null;
  let showUpdateNotification = false;
  let newVersion = '';
  const CACHE_BUST = "v6-auto-refresh";
  const LOCAL_VERSION = packageInfo.version;

  // Compare semantic versions (returns true if v1 < v2)
  function isNewerVersion(local: string, remote: string): boolean {
    const localParts = local.split('.').map(Number);
    const remoteParts = remote.split('.').map(Number);

    for (let i = 0; i < Math.max(localParts.length, remoteParts.length); i++) {
      const l = localParts[i] || 0;
      const r = remoteParts[i] || 0;
      if (r > l) return true;
      if (r < l) return false;
    }
    return false;
  }

  async function checkForUpdates() {
    try {
      const response = await fetch('/build-info.json?t=' + Date.now(), {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (response.ok) {
        const serverInfo = await response.json();
        buildInfo = serverInfo;

        // Compare versions
        if (serverInfo.version && isNewerVersion(LOCAL_VERSION, serverInfo.version)) {
          console.log(`[Update] New version detected: ${LOCAL_VERSION} → ${serverInfo.version}`);
          newVersion = serverInfo.version;
          showUpdateNotification = true;
        } else {
          console.log(`[Version] Current: ${LOCAL_VERSION}, Server: ${serverInfo.version}`);
        }
      }
    } catch (e) {
      console.warn('Could not check for updates:', e);
    }
  }

  onMount(async () => {
    // Initial check for updates
    await checkForUpdates();

    // Check for updates every 30 seconds (faster than before)
    const updateInterval = setInterval(checkForUpdates, 30 * 1000);

    // Register service worker for auto-updates
    // In dev we disable SW to avoid stale cached HTML/CSP.
    if (!import.meta.env.DEV && 'serviceWorker' in navigator) {
      try {
        // Note: SW is registered in Layout.astro
        const registration = await navigator.serviceWorker.ready;
        console.log('[PWA] Using existing SW registration');

        // Listen for new version messages
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data.type === 'NEW_VERSION_AVAILABLE') {
            console.log('[Update] New version available:', event.data);
            newVersion = event.data.newVersion;
            showUpdateNotification = true;
          }
        });

        // Check for updates immediately
        registration.update();

        // Check for updates every 2 minutes via SW
        setInterval(() => {
          registration.update();
          // Also send message to SW to check build-info
          if (registration.active) {
            registration.active.postMessage({ type: 'CHECK_FOR_UPDATES' });
          }
        }, 2 * 60 * 1000);
      } catch (error) {
        console.error('[PWA] SW interaction failed:', error);
      }
    }

    return () => clearInterval(updateInterval);
  });

  function reloadApp() {
    // Clear all caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }

    // Clear localStorage (preserving auth)
    const authToken = localStorage.getItem('auth_token');
    localStorage.clear();
    if (authToken) {
      localStorage.setItem('auth_token', authToken);
    }

    // Hard reload
    window.location.reload();
  }

  function dismissUpdate() {
    showUpdateNotification = false;
  }

  $: shortCommit = buildInfo?.commit?.substring(0, 7) || '?';
  $: buildDate = buildInfo?.timestamp ? new Date(buildInfo.timestamp).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : '';
</script>

<div class="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
  <!-- Version Badge -->
  <div class="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-xs font-mono">
    <span class="text-yellow-400/80">v{packageInfo.version}</span>
    {#if buildInfo}
      <span class="text-white/40">|</span>
      <span class="text-emerald-500/70" title="Git commit">{shortCommit}</span>
      {#if buildDate}
        <span class="text-white/40">|</span>
        <span class="text-white/50">{buildDate}</span>
      {/if}
    {/if}
  </div>

  <!-- Update Notification -->
  {#if showUpdateNotification}
    <div
      class="bg-gradient-to-r from-emerald-500/90 to-blue-500/90 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl max-w-sm animate-slide-in-right"
      style="animation: slideInRight 0.3s ease-out"
    >
      <div class="flex items-start gap-3">
        <div class="text-2xl">🚀</div>
        <div class="flex-1">
          <h3 class="font-bold text-white mb-1">Nueva versión disponible</h3>
          <p class="text-sm text-white/80 mb-3">
            Versión {newVersion} lista. Actualiza para obtener las últimas mejoras.
          </p>
          <div class="flex gap-2">
            <button
              onclick={reloadApp}
              class="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold text-white transition-colors"
            >
              Actualizar ahora
            </button>
            <button
              onclick={dismissUpdate}
              class="px-4 py-2 bg-black/20 hover:bg-black/30 rounded-lg text-sm text-white/60 hover:text-white/80 transition-colors"
            >
              Más tarde
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
