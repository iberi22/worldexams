/**
 * SaberParaTodos Service Worker
 * Provides offline functionality and asset caching for PWA
 */

const CACHE_NAME = 'spt-static-v1';
const RUNTIME_CACHE = 'spt-runtime-v1';
const PACKS_CACHE = 'spt-packs-v1';

// Static assets to cache on install (JS, CSS, fonts, images)
const STATIC_ASSETS = [
  '/manifest.json',
  '/favicon.png',
  '/logo.png',
];

// Static file patterns to cache
const STATIC_PATTERNS = [
  '/_astro/',
  '/fonts/',
];

// API endpoints to cache selectively
const API_CACHE_PATTERNS = [
  '/api/packs/',
  '/v1/packs/',
];

function isStaticAsset(url) {
  return url.pathname.startsWith('/_astro/') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.woff2') ||
         url.pathname.endsWith('.woff') ||
         url.pathname.endsWith('.ttf') ||
         url.pathname.endsWith('.png') ||
         url.pathname.endsWith('.jpg') ||
         url.pathname.endsWith('.svg');
}

function isQuestionPackAsset(url) {
  return url.pathname.includes('/api/packs/') ||
         url.pathname.includes('/v1/packs/') ||
         url.pathname.endsWith('-bundle.json') ||
         (url.pathname.endsWith('.json') && url.pathname.includes('/packs/'));
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE && name !== PACKS_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control of all clients immediately
  self.clients.claim();
});

// Fetch event - smart caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle cross-origin requests (fonts, CDN assets)
  if (url.origin !== self.location.origin) {
    if (url.hostname.includes('fonts.googleapis.com') ||
        url.hostname.includes('fonts.gstatic.com')) {
      event.respondWith(
        caches.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((response) => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            return response;
          });
        })
      );
    }
    return;
  }

  // Question packs caching strategy (Network First with Cache Fallback for offline practice)
  if (isQuestionPackAsset(url)) {
    event.respondWith(
      caches.open(PACKS_CACHE).then((cache) => {
        return fetch(request)
          .then((response) => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => {
            return cache.match(request);
          });
      })
    );
    return;
  }

  // Static assets: Cache first, then network
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Dynamic pages (SSR): Network first, cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses with runtime cache
        if (response.ok && !url.pathname.startsWith('/api/')) {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => {
        // Network failed, try runtime cache
        return caches.match(request).then((cached) => {
          if (cached) return cached;
          // For navigation requests, try offline page
          if (request.mode === 'navigate') {
            return caches.match('/offline');
          }
          return new Response('Offline', { status: 503 });
        });
      })
  );
});

// Handle messages from the main app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'NEW_VERSION_AVAILABLE') {
    // Notify all clients about new version
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({ type: 'NEW_VERSION_AVAILABLE' });
      });
    });
  }

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync for offline actions (if supported)
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  // Handle offline sync when connectivity is restored
});
