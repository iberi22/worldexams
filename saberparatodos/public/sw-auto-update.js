// Auto-Update Service Worker
// Detecta nuevos deploys y refresca la app automáticamente

const BUILD_INFO_URL = '/build-info.json';
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
const CACHE_NAME = 'saberparatodos-v1';

let currentBuildInfo = null;
let isEnabled = false; // Deshabilitado por defecto hasta que se cargue buildInfo

// Load current build info
async function loadCurrentBuildInfo() {
  try {
    const response = await fetch(BUILD_INFO_URL);
    if (response.ok) {
      currentBuildInfo = await response.json();
      isEnabled = true; // Habilitar auto-update solo si hay buildInfo
      console.log('[Auto-Update] Enabled with build:', currentBuildInfo);
    } else {
      console.log('[Auto-Update] Disabled (build-info.json not found)');
    }
  } catch (e) {
    console.log('[Auto-Update] Disabled (error loading build info)');
    isEnabled = false;
  }
}

// Check for new build
async function checkForUpdates() {
  if (!currentBuildInfo || !isEnabled) return;

  try {
    const response = await fetch(`${BUILD_INFO_URL}?t=${Date.now()}`, {
      cache: 'no-cache'
    });

    if (response.ok) {
      const newBuildInfo = await response.json();

      // Compare commits
      if (newBuildInfo.commit !== currentBuildInfo.commit) {
        console.log('[Auto-Update] New build detected!');
        console.log('[Auto-Update] Old commit:', currentBuildInfo.commit);
        console.log('[Auto-Update] New commit:', newBuildInfo.commit);

        await handleNewBuild(newBuildInfo);
      }
    }
  } catch (e) {
    console.warn('[Auto-Update] Update check failed', e);
  }
}

// Handle new build detected
async function handleNewBuild(newBuildInfo) {
  // Clear all caches
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(name => caches.delete(name)));
  console.log('[Auto-Update] Caches cleared');

  // Notify all clients about the update
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({
      type: 'NEW_VERSION_AVAILABLE',
      oldVersion: currentBuildInfo.version,
      newVersion: newBuildInfo.version,
      oldCommit: currentBuildInfo.commit,
      newCommit: newBuildInfo.commit
    });
  });

  // Update current build info
  currentBuildInfo = newBuildInfo;

  // Force service worker update
  self.skipWaiting();
}

// Service Worker lifecycle events
self.addEventListener('install', (event) => {
  console.log('[SW] Installing auto-update service worker...');
  event.waitUntil(
    loadCurrentBuildInfo().then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating auto-update service...');
  event.waitUntil(
    loadCurrentBuildInfo().then(() => {
      // Start periodic update checks only if enabled
      if (isEnabled) {
        setInterval(checkForUpdates, CHECK_INTERVAL);
        console.log('[SW] Update checks scheduled');
      } else {
        console.log('[SW] Update checks disabled (no build-info)');
      }
      return self.clients.claim();
    })
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data.type === 'CHECK_FOR_UPDATES') {
    checkForUpdates();
  }
});

// Network-first fetch strategy with cache fallback
self.addEventListener('fetch', (event) => {
  // Skip for build-info.json (always fresh)
  if (event.request.url.includes('build-info.json')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Skip for external resources (Google Ads, fonts, etc)
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return; // Let browser handle external requests normally
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone response for caching only if successful
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }

        return response;
      })
      .catch(() => {
        // Fallback to cache on network failure
        return caches.match(event.request);
      })
  );
});

console.log('[SW] Auto-update service worker loaded');
