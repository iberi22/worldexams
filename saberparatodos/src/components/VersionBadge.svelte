<script lang="ts">
  import { onMount } from 'svelte';
  import packageInfo from '../../package.json';

  // Props
  interface Props {
    position?: 'bottom-left' | 'bottom-right';
    showOnlyOnUpdate?: boolean;
  }

  let { position = 'bottom-left', showOnlyOnUpdate = false }: Props = $props();

  // State (Svelte 5 runes)
  let buildInfo = $state<{ version: string; commit: string; buildTime: string; env: string } | null>(null);
  let showUpdateNotification = $state(false);
  let newVersion = $state('');
  let isExpanded = $state(false);
  let isVisible = $state(!showOnlyOnUpdate);

  const LOCAL_VERSION = packageInfo.version;

  // Derived values
  let shortCommit = $derived(buildInfo?.commit?.substring(0, 7) || '');
  let buildDate = $derived(buildInfo?.buildTime
    ? new Date(buildInfo.buildTime).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '');

  let positionClasses = $derived(
    position === 'bottom-right'
      ? 'bottom-4 right-4'
      : 'bottom-4 left-4'
  );

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
          isVisible = true;
        }
      }
    } catch (e) {
      // Silent fail - not critical
    }
  }

  onMount(() => {
    // Initial check for updates
    checkForUpdates();

    // Check for updates every 60 seconds (production-friendly interval)
    const updateInterval = setInterval(checkForUpdates, 60 * 1000);

    // Register service worker message listener
    if (!import.meta.env.DEV && 'serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'NEW_VERSION_AVAILABLE') {
          newVersion = event.data.newVersion;
          showUpdateNotification = true;
          isVisible = true;
        }
      });
    }

    return () => clearInterval(updateInterval);
  });

  function reloadApp() {
    // Clear all caches before reload
    if ('caches' in window) {
      caches.keys().then(names => {
        Promise.all(names.map(name => caches.delete(name))).then(() => {
          window.location.reload();
        });
      });
    } else {
      window.location.reload();
    }
  }

  function dismissUpdate() {
    showUpdateNotification = false;
  }

  function toggleExpand() {
    isExpanded = !isExpanded;
  }
</script>

{#if isVisible}
  <div class="fixed {positionClasses} z-50 flex flex-col gap-2 pointer-events-none">
    <!-- Update Notification Toast -->
    {#if showUpdateNotification}
      <div
        class="pointer-events-auto bg-gradient-to-r from-emerald-600/95 to-teal-600/95 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl max-w-xs animate-slide-up"
      >
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-white text-sm mb-0.5">Nueva versión disponible</h3>
            <p class="text-xs text-white/80 mb-3">
              v{LOCAL_VERSION} → v{newVersion}
            </p>
            <div class="flex gap-2">
              <button
                onclick={reloadApp}
                class="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95"
              >
                Actualizar
              </button>
              <button
                onclick={dismissUpdate}
                class="px-3 py-1.5 text-xs text-white/60 hover:text-white/90 transition-colors"
              >
                Después
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- Minimal Version Badge -->
    <div class="pointer-events-auto">
      <button
        onclick={toggleExpand}
        class="group flex items-center gap-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-full px-3 py-1.5 text-[10px] font-mono transition-all duration-300 {isExpanded ? 'ring-1 ring-emerald-500/30' : ''}"
        title="Información de versión"
      >
        <!-- Status indicator -->
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full {showUpdateNotification ? 'bg-amber-400' : 'bg-emerald-400'} opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 {showUpdateNotification ? 'bg-amber-500' : 'bg-emerald-500'}"></span>
        </span>

        <span class="text-white/70">v{LOCAL_VERSION}</span>

        {#if shortCommit && isExpanded}
          <span class="text-white/30">•</span>
          <span class="text-emerald-400/80">{shortCommit}</span>
        {/if}

        <!-- Expand icon -->
        <svg
          class="w-3 h-3 text-white/40 group-hover:text-white/60 transition-transform duration-300 {isExpanded ? 'rotate-180' : ''}"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Expanded Info Panel -->
      {#if isExpanded && buildInfo}
        <div class="mt-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-3 text-[10px] font-mono animate-fade-in min-w-[200px]">
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-white/50">Versión</span>
              <span class="text-white/90 font-semibold">{LOCAL_VERSION}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-white/50">Commit</span>
              <a
                href="https://github.com/world-exams/saberparatodos/commit/{buildInfo.commit}"
                target="_blank"
                rel="noopener noreferrer"
                class="text-emerald-400 hover:text-emerald-300 hover:underline"
              >
                {shortCommit}
              </a>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-white/50">Build</span>
              <span class="text-white/70">{buildDate}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-white/50">Entorno</span>
              <span class="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider {buildInfo.env === 'production' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}">
                {buildInfo.env === 'production' ? 'Prod' : 'Dev'}
              </span>
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-white/10 my-2"></div>

          <!-- Quick Actions -->
          <div class="flex gap-2">
            <button
              onclick={reloadApp}
              class="flex-1 px-2 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white/90 transition-colors text-center"
              title="Recargar aplicación"
            >
              ↻ Recargar
            </button>
            <button
              onclick={() => checkForUpdates()}
              class="flex-1 px-2 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white/90 transition-colors text-center"
              title="Buscar actualizaciones"
            >
              ⟳ Buscar
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  @keyframes slide-up {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .animate-slide-up {
    animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .animate-fade-in {
    animation: fade-in 0.2s ease-out forwards;
  }
</style>
