// Service Worker Combined: PWA + Auto-Update + Rotating Packs
// Version: 5.0.0 (Rotating Packs)
// Updated: 2025-12-23

const CACHE_NAME = 'saberparatodos-v5';
const PACK_CACHE = 'saberparatodos-packs-v1'; // 🆕 Persistent pack cache (survives updates)
const OFFLINE_URL = '/party';
const BUILD_INFO_URL = '/build-info.json';
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

// 🆕 Disable verbose logs in production
const DEBUG = false;
const log = (...args) => DEBUG && console.log(...args);

const STATIC_ASSETS = [
  '/',
  '/party',
  '/offline',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// 🆕 P2P State Management
const P2P_DB_NAME = 'p2p-state-db';
const P2P_STORE_NAME = 'connection-state';
const P2P_SYNC_TAG = 'p2p-reconnect';

let currentBuildInfo = null;
let isEnabled = false;

// --- P2P State IndexedDB Helpers ---

async function openP2PDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(P2P_DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(P2P_STORE_NAME)) {
        db.createObjectStore(P2P_STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

async function saveP2PStateToDb(state) {
  try {
    const db = await openP2PDatabase();
    const tx = db.transaction(P2P_STORE_NAME, 'readwrite');
    const store = tx.objectStore(P2P_STORE_NAME);
    await store.put({ id: 'current', ...state });
    log('[SW] 📡 P2P state saved to IndexedDB');
    return true;
  } catch (e) {
    console.warn('[SW] Failed to save P2P state:', e);
    return false;
  }
}

async function loadP2PStateFromDb() {
  try {
    const db = await openP2PDatabase();
    const tx = db.transaction(P2P_STORE_NAME, 'readonly');
    const store = tx.objectStore(P2P_STORE_NAME);
    return new Promise((resolve) => {
      const request = store.get('current');
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  } catch (e) {
    console.warn('[SW] Failed to load P2P state:', e);
    return null;
  }
}

async function clearP2PStateFromDb() {
  try {
    const db = await openP2PDatabase();
    const tx = db.transaction(P2P_STORE_NAME, 'readwrite');
    const store = tx.objectStore(P2P_STORE_NAME);
    store.delete('current');
    log('[SW] 📡 P2P state cleared');
  } catch (e) {
    console.warn('[SW] Failed to clear P2P state:', e);
  }
}


// --- Auto-Update Logic ---

async function loadCurrentBuildInfo() {
  try {
    const response = await fetch(BUILD_INFO_URL);
    if (response.ok) {
      currentBuildInfo = await response.json();
      isEnabled = true;
      log('[SW] Auto-Update enabled with build:', currentBuildInfo);
    }
  } catch (e) {
    log('[SW] Auto-Update disabled (error loading build info)');
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
        log('[SW] New build detected!', newBuildInfo.commit);
        await handleNewBuild(newBuildInfo);
      }
    }
  } catch (e) {
    console.warn('[SW] Update check failed', e);
  }
}

async function handleNewBuild(newBuildInfo) {
  // 🆕 Clear all caches EXCEPT pack cache (preserve accumulated packs)
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter(name => name !== PACK_CACHE) // Preserve pack cache
      .map(name => caches.delete(name))
  );
  log('[SW] Caches cleared for new build (pack cache preserved)');

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
  log('[SW] Installing v5 (Rotating Packs)...');
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)),
      loadCurrentBuildInfo()
    ]).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  log('[SW] Activating v5...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME && name !== PACK_CACHE) // 🆕 Keep pack cache
          .map(cacheName => {
            log('[SW] Deleting old cache:', cacheName);
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

  // 🆕 P2P State Management Messages
  if (event.data.type === 'P2P_SAVE_STATE') {
    saveP2PStateToDb(event.data.payload);
  }
  if (event.data.type === 'P2P_CLEAR_STATE') {
    clearP2PStateFromDb();
  }
  if (event.data.type === 'P2P_GET_STATE') {
    loadP2PStateFromDb().then(state => {
      event.source?.postMessage({
        channel: 'p2p-sync',
        type: 'P2P_STATE_LOADED',
        payload: state
      });
    });
  }
});

// --- Fetch Strategy: Network First with Pack Exceptions ---

self.addEventListener('fetch', (event) => {
  // Skip non-GET and non-HTTP schemes (fixes chrome-extension errors)
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

  // Skip Supabase
  if (event.request.url.includes('supabase.co')) return;

  // Build Info: Network Only
  if (event.request.url.includes('build-info.json')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 🆕 PACK FILES: Cache First (persistent storage)
  if (event.request.url.includes('/packs/') && event.request.url.endsWith('.json')) {
    event.respondWith((async () => {
      const cache = await caches.open(PACK_CACHE);
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        log('[SW] 📦 Serving pack from cache:', event.request.url);
        return cachedResponse;
      }

      try {
        const networkResponse = await fetch(event.request);
        if (networkResponse.ok) {
          log('[SW] 📦 Caching new pack:', event.request.url);
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      } catch (e) {
        return new Response('Offline and not in cache', { status: 503 });
      }
    })());
    return;
  }

  // 🆕 CURRENT PACK METADATA: Network First
  if (event.request.url.includes('current-pack.json')) {
    event.respondWith((async () => {
      try {
        const response = await fetch(event.request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, response.clone());
        }
        return response;
      } catch (e) {
        log('[SW] Network failed for current-pack, using cache');
        return await caches.match(event.request);
      }
    })());
    return;
  }

  // Default: Network First
  event.respondWith((async () => {
    try {
      const response = await fetch(event.request);
      if (response && response.status === 200) {
        if (response.type === 'basic' || response.url.includes(self.location.origin)) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, response.clone());
        }
      }
      return response;
    } catch (e) {
      // Network failed, try cache
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) return cachedResponse;

      // Fallback to offline page
      if (event.request.mode === 'navigate') {
        return await caches.match(OFFLINE_URL);
      }
      return new Response('Offline and not in cache', { status: 503 });
    }
  })());
});

// --- 🆕 Background Sync for P2P Reconnection ---

self.addEventListener('sync', (event) => {
  if (event.tag === P2P_SYNC_TAG) {
    log('[SW] 📡 Background Sync triggered for P2P reconnection');
    event.waitUntil(handleP2PReconnectSync());
  }
});

async function handleP2PReconnectSync() {
  const state = await loadP2PStateFromDb();
  if (!state) {
    log('[SW] No P2P state to reconnect');
    return;
  }

  // Check if state is recent (within 30 minutes)
  const age = Date.now() - (state.timestamp || 0);
  if (age > 30 * 60 * 1000) {
    log('[SW] P2P state too old, clearing');
    await clearP2PStateFromDb();
    return;
  }

  // Notify all clients to attempt reconnection
  const clients = await self.clients.matchAll({ type: 'window' });
  log('[SW] 📡 Notifying', clients.length, 'clients to reconnect');

  for (const client of clients) {
    client.postMessage({
      channel: 'p2p-sync',
      type: 'P2P_RECONNECT_REQUEST',
      payload: state
    });
  }
}
