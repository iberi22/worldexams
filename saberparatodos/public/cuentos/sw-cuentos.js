// © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados.
// Cuentos PWA Offline Service Worker (cuentos-v1)

const CACHE_NAME = 'cuentos-v1';
const PRECACHE_URLS = [
  '/cuentos/',
  '/v1/cuentos/index.json',
  '/cuentos/sin-conexion.html'
];

// Helper: safe put into cache handling QuotaExceededError
async function safeCachePut(cache, request, response) {
  try {
    await cache.put(request, response);
  } catch (err) {
    if (err && (err.name === 'QuotaExceededError' || err.code === 22)) {
      console.warn('[SW-Cuentos] Almacenamiento lleno (QuotaExceededError). Conservando cuentos existentes.');
    } else {
      console.error('[SW-Cuentos] Error al guardar en cache:', err);
    }
  }
}

// Helper: extract asset paths from a pack JSON response
async function precachePackAssets(packResponse, packUrl) {
  try {
    const clone = packResponse.clone();
    const data = await clone.json();
    const urlsToFetch = [];

    const slug = data.slug;
    if (!slug) return;

    // Parse scenes
    if (Array.isArray(data.paginas)) {
      data.paginas.forEach((p) => {
        if (p.imagen) {
          urlsToFetch.push(`/v1/cuentos/${slug}/${p.imagen}`);
        }
      });
    }

    // Parse characters if listed
    if (Array.isArray(data.personajes)) {
      data.personajes.forEach((pj) => {
        if (typeof pj === 'string') {
          urlsToFetch.push(`/v1/cuentos/${slug}/personajes/${pj}.svg`);
        } else if (pj && pj.imagen) {
          urlsToFetch.push(`/v1/cuentos/${slug}/${pj.imagen}`);
        }
      });
    }

    if (urlsToFetch.length > 0) {
      const cache = await caches.open(CACHE_NAME);
      await Promise.all(
        urlsToFetch.map(async (u) => {
          try {
            const cached = await cache.match(u);
            if (!cached) {
              const res = await fetch(u);
              if (res && res.ok) {
                await safeCachePut(cache, u, res);
              }
            }
          } catch (e) {
            // Safe ignore asset fetch errors during precache
          }
        })
      );
    }
  } catch (err) {
    console.warn('[SW-Cuentos] No se pudieron derivar los activos del paquete:', err);
  }
}

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        await cache.addAll(PRECACHE_URLS);
      } catch (err) {
        console.warn('[SW-Cuentos] Precache parcial durante instalacion:', err);
      }
    })
  );
  self.skipWaiting();
});

// Activate event - cleanup old cuentos-v* caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key.startsWith('cuentos-v') && key !== CACHE_NAME) {
            console.log('[SW-Cuentos] Eliminando cache antiguo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Intercept ONLY requests within the cuentos scope or v1 cuentos packs/assets
  const isCuentosHTML = url.pathname.startsWith('/cuentos');
  const isCuentosPack = url.pathname.startsWith('/v1/cuentos');

  if (!isCuentosHTML && !isCuentosPack) {
    return;
  }

  // 1. Pack JSON & SVG Assets: Cache First, Network Fallback
  if (isCuentosPack) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.ok) {
            await safeCachePut(cache, request, networkResponse.clone());

            // If it's a story pack JSON, trigger dynamic precaching of its SVGs
            if (url.pathname.endsWith('.json') && !url.pathname.endsWith('index.json')) {
              event.waitUntil(precachePackAssets(networkResponse.clone(), url.pathname));
            }
          }
          return networkResponse;
        } catch (err) {
          return new Response('Recurso no disponible sin conexión', { status: 503, statusText: 'Offline' });
        }
      })
    );
    return;
  }

  // 2. Story HTML Navigation pages: Network First with Cache Fallback and Offline Page
  if (request.mode === 'navigate' || isCuentosHTML) {
    event.respondWith(
      fetch(request)
        .then(async (networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            await safeCachePut(cache, request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }

          // Fallback to offline notice page
          const offlinePage = await caches.match('/cuentos/sin-conexion.html');
          if (offlinePage) {
            return offlinePage;
          }

          return new Response(
            '<!doctype html><html lang="es"><head><meta charset="UTF-8"><title>Sin conexión</title></head><body style="background:#FDF6EC;font-family:sans-serif;padding:2rem;text-align:center;"><h1>Sin conexión a internet</h1><p>Este cuento no está guardado para lectura sin internet. Los cuentos guardados aparecen en <a href="/cuentos/">/cuentos/</a>.</p></body></html>',
            { headers: { 'Content-Type': 'text/html; charset=utf-8' }, status: 503 }
          );
        })
    );
    return;
  }
});
