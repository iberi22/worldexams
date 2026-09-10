# Cuentos Offline & Caching Strategy

## CDN & Edge Caching Headers

Static cuento JSON packs served from `/v1/cuentos/` (e.g. `/v1/cuentos/<slug>.json` and `/v1/cuentos/index.json`) should be served with edge CDN caching headers:

```http
Cache-Control: public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400
```

- **Browser Max-Age (`max-age=86400`)**: 1 day local browser cache.
- **CDN Shared Max-Age (`s-maxage=604800`)**: 7 days CDN edge caching across Cloudflare / Workers.
- **Stale While Revalidate (`stale-while-revalidate=86400`)**: Serves stale cached content while asynchronously revalidating in background.

## Offline Fetch & Cache Storage Pattern

Client applications can fetch and store cuento packs for offline playback using plain `fetch()` and standard browser `caches`:

```javascript
async function fetchCuentoPack(slug) {
  const packUrl = `/v1/cuentos/${slug}.json`;
  const cacheName = 'wx-cuentos-v1';

  // 1. Try cache first if offline or fast load needed
  if ('caches' in window) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(packUrl);
    if (cachedResponse) {
      // Revalidate in background
      fetch(packUrl).then((networkResponse) => {
        if (networkResponse.ok) cache.put(packUrl, networkResponse);
      }).catch(() => {});
      return cachedResponse.json();
    }
  }

  // 2. Fetch from network and cache for offline
  const response = await fetch(packUrl);
  if (!response.ok) throw new Error(`Failed to load cuento pack: ${response.status}`);
  const pack = await response.json();

  if ('caches' in window) {
    const cache = await caches.open(cacheName);
    cache.put(packUrl, new Response(JSON.stringify(pack), {
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  return pack;
}
```
