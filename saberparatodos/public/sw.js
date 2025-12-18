// Service Worker Combined: PWA + Auto-Update
// Version: 4.0.0 (Nuclear cache cleanup)
// Updated: 2025-12-18 20:45 UTC

const CACHE_NAME = 'saberparatodos-v4';
const OFFLINE_URL = '/party';
const BUILD_INFO_URL = '/build-info.json';
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

const STATIC_ASSETS = [
  '/',
  '/party',
  '/offline',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

let currentBuildInfo = null;
let isEnabled = false;

// --- Auto-Update Logic ---

async function loadCurrentBuildInfo() {
  try {
    const response = await fetch(BUILD_INFO_URL);
    if (response.ok) {
      currentBuildInfo = await response.json();
      isEnabled = true;
      console.log('[SW] Auto-Update enabled with build:', currentBuildInfo);
    }
  } catch (e) {
    console.log('[SW] Auto-Update disabled (error loading build info)');
    isEnabled = false;
  }
}

async function checkForUpdates() {
  if (!currentBuildInfo || !isEnabled) return;

  try {
    const response = await fetch(`${BUILD_INFO_URL}?t=${Date.now()}`, {
      cache: 'no-cache'
    });

    if (response.ok) {
      const newBuildInfo = await response.json();
      if (newBuildInfo.commit !== currentBuildInfo.commit) {
        console.log('[SW] New build detected!', newBuildInfo.commit);
        await handleNewBuild(newBuildInfo);
      }
    }
  } catch (e) {
    console.warn('[SW] Update check failed', e);
  }
}

async function handleNewBuild(newBuildInfo) {
  // Clear all caches to ensure fresh content
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(name => caches.delete(name)));
  console.log('[SW] Caches cleared for new build');

  // Notify clients
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

  currentBuildInfo = newBuildInfo;
}

// --- Lifecycle Events ---

self.addEventListener('install', (event) => {
  console.log('[SW] Installing v4...');
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)),
      loadCurrentBuildInfo()
    ]).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating v4...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          console.log('[SW] Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      if (isEnabled) {
        setInterval(checkForUpdates, CHECK_INTERVAL);
      }
      return self.clients.claim();
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data.type === 'CHECK_FOR_UPDATES') {
    checkForUpdates();
  }
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// --- Fetch Strategy: Network First ---

self.addEventListener('fetch', (event) => {
  // Skip non-GET
  if (event.request.method !== 'GET') return;

  // Skip Supabase
  if (event.request.url.includes('supabase.co')) return;

  // Build Info: Network Only
  if (event.request.url.includes('build-info.json')) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // If we get a 404 or error, don't cache it
        if (!response || response.status !== 200) {
          return response;
        }

        // Cache successful responses
        if (response.type === 'basic' || response.url.includes(self.location.origin)) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) return cachedResponse;

            // Fallback to offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            return null;
          });
      })
  );
});
