# GEO-ROUTING.md — Geo-Detection & Country Routing for saberparatodos.space

## Status: Mostly Implemented ✅

Geo-detection is already implemented in the middleware pipeline. This doc describes the current architecture and identifies gaps.

---

## 1. IP Country Detection

### Current Implementation (✅ Working)

**Primary:** Cloudflare `CF-IPCountry` header
**Fallback:** Cookie `spt_country` (user preference)
**Hard Default:** `CO` (Colombia)

```typescript
// src/middleware.ts
const cookieCountry = context.cookies.get('spt_country')?.value;
if (cookieCountry) {
  activeCountryCode = cookieCountry.toUpperCase();
} else {
  const ipCountry = context.request.headers.get('cf-ipcountry');
  if (ipCountry) {
    activeCountryCode = ipCountry.toUpperCase();
  }
}
```

**Note:** Since this runs on Cloudflare Workers, the `CF-IPCountry` header is **always present** for real traffic. The ipapi.co fallback is only needed for local dev/testing without Cloudflare.

### ipapi.co Fallback (TODO)

For local development without Cloudflare:

```typescript
// Add to middleware.ts — only when CF-IPCountry is absent/unavailable
async function detectCountryViaApi(clientIP: string): Promise<CountryCode | null> {
  try {
    const res = await fetch(`https://ipapi.co/${clientIP}/country/`);
    if (res.ok) {
      const country = await res.text();
      return country.trim().toUpperCase() as CountryCode;
    }
  } catch {
    // fail silently, keep default
  }
  return null;
}
```

The `clientIP` should come from `request.headers.get('cf-connecting-ip')` or `request.headers.get('x-forwarded-for')`.

---

## 2. Country Configuration

### Supported Countries (7 total)

| Code | Country | Exam | Bundles | Status |
|------|---------|------|---------|--------|
| CO | Colombia | ICFES Saber | 589 | ✅ Primary |
| MX | México | PLANEA/EXANI | 13 | ✅ Secondary |
| AR | Argentina | APRENDER | 2 | ✅ |
| CL | Chile | SIMCE | 2 | ✅ |
| PE | Perú | ECE | 2 | ✅ |
| BR | Brasil | ENEM | 0 | ⚙️ Config only |
| US | USA | SAT | 0 | ⚙️ Config only |
| EC | Ecuador | — | 0 | ❌ Missing config |

> **Note:** `EC` (Ecuador) is referenced in the `CountryCode` type but not configured. Should be added or removed from the type.

### Config Location

`E:\scripts-python\worldexams\config\countries.config.ts`

This is a **shared config** used by both the saberparatodos app and the Python worldexams generator. It lives outside the astro project at `E:\scripts-python\worldexams\config/`.

### Supported Country Codes (Type Definition)

```typescript
// In countries.config.ts
export type CountryCode = 'CO' | 'MX' | 'AR' | 'CL' | 'PE' | 'EC' | 'BR' | 'US';
```

---

## 3. Routing Flow (Current)

```
Request arrives at Cloudflare Workers
         ↓
   [middleware.ts] — onRequest hook
         ↓
   Read CF-IPCountry header
         ↓
   Set Astro.locals.country = getCountryConfig(detectedCountry)
         ↓
   [Layout.astro] — reads Astro.locals.country
         ↓
   Theme CSS vars, locale, site name, SEO metadata applied
         ↓
   [App.svelte] — client-side app with CountrySwitcher
```

### Key Files

| File | Role |
|------|------|
| `src/middleware.ts` | Geo-detection + CSP headers |
| `src/config/index.ts` | RuntimeCountryConfig transform |
| `src/layouts/Layout.astro` | Theme application, SEO |
| `src/components/App.svelte` | Main SPA with country awareness |
| `src/components/CountrySwitcher.svelte` | User-initiated country override |
| `E:\scripts-python\worldexams\config\countries.config.ts` | Shared country definitions |

---

## 4. Gap: Non-Supported Country Landing Page

### Current Behavior

When a visitor comes from a country **not in the supported list** (e.g., France, Spain, Venezuela), the middleware falls back to `CO` (Colombia). The visitor sees the Colombian ICFES experience — which is **confusing** for non-Colombian users.

### Required: Landing Page for Unsupported Countries

**Design:** A static Astro page that:
- Detects the unsupported country (known but content-poor: EC, BR, US — or completely unknown)
- Shows a "We don't have content for your country yet" message
- Lists supported countries with links
- CTA: "Request your country" (GitHub issue or email)
- Does NOT load the full Svelte app (avoid unnecessary JS bundle)

### Implementation Options

#### Option A: Dedicated Astro Page (`/unsupported`)

```typescript
// In middleware.ts — redirect unsupported before rendering
const SUPPORTED: CountryCode[] = ['CO', 'MX', 'AR', 'CL', 'PE'];

if (!SUPPORTED.includes(activeCountryCode as CountryCode)) {
  return context.redirect('/unsupported');
}
```

**Pros:** Clean, separate page.
**Cons:** Requires route file.

#### Option B: Inline Landing in middleware

Inject a static HTML response directly from the Worker:

```typescript
// In middleware.ts
const UNSUPPORTED_HTML = `<!doctype html>...`;
return new Response(UNSUPPORTED_HTML, {
  headers: { 'content-type': 'text/html' }
});
```

**Pros:** Zero page load, fastest possible response.
**Cons:** HTML string in middleware is ugly.

#### Option C (Recommended): Hybrid — redirect to `/` with query param

Let `index.astro` show the landing if `?country=unsupported`:

```typescript
// middleware.ts
if (!SUPPORTED.includes(activeCountryCode as CountryCode)) {
  // Set a header instead of redirecting, so the page can decide
  // Or: pass via cookie for subsequent visits
  context.cookies.set('spt_unsupported', activeCountryCode, { path: '/' });
}
```

Then in `index.astro`, check for the cookie and render a static landing component.

### Landing Page Content

```html
<!-- Landing for unsupported countries -->
<section class="landing-unsupported">
  <h1>🌍 Tu país aún no está en nuestra lista</h1>
  <p>Tenemos contenido para:</p>
  <ul>
    <li>🇨🇴 Colombia (589 bundles)</li>
    <li>🇲🇽 México (13 bundles)</li>
    <li>🇦🇷 Argentina (2 bundles)</li>
    <li>🇨🇱 Chile (2 bundles)</li>
    <li>🇵🇪 Perú (2 bundles)</li>
  </ul>
  <a href="https://github.com/worldexams/worldexams/issues/new?template=country-request.md">
    🚀 Agregar mi país a la lista
  </a>
</section>
```

---

## 5. CountrySwitcher Component

`src/components/CountrySwitcher.svelte` already exists and lets users manually override their country. It sets the `spt_country` cookie.

The cookie-based override means:
1. User switches country → cookie set
2. Next request → middleware reads cookie first
3. No need to re-detect

This is the correct pattern — geo-detection is the **default**, manual selection **overrides**.

---

## 6. Recommended Implementation Checklist

### Phase 1 — Quick Wins
- [x] Geo-detection in middleware (already done ✅)
- [x] Country config shared between projects (already done ✅)
- [x] Theme applied per country in Layout.astro (already done ✅)
- [ ] Add ipapi.co fallback for local dev (see Section 1)
- [ ] Fix `EC` country — either add config or remove from `CountryCode` type
- [ ] Add `BR` and `US` content (EXANI/APRENDER/SAT questions)

### Phase 2 — Non-Supported Country Landing
- [ ] Create `/unsupported` Astro page with static landing content
- [ ] Update middleware to redirect unsupported countries
- [ ] Add "Request country" GitHub issue template

### Phase 3 — SEO & Localization
- [ ] Add `hreflang` tags for country-specific subdomains (future)
- [ ] Localize meta descriptions per country

---

## 7. Wrangler.toml Notes

The `wrangler.toml` uses:
- `compatibility_flags = ["nodejs_compat_v2"]` — needed for Node.js APIs in Workers
- SSR via `@astrojs/cloudflare` with `assets` binding
- No KV namespace for geo-routing needed (cookie + in-memory config is sufficient)

---

## 8. Environment Variables (Relevant)

| Variable | Purpose |
|----------|---------|
| `PUBLIC_COUNTRY` | Build-time country override (not runtime) |
| `CF-IPCountry` | Cloudflare-provided country code (runtime) |
| `spt_country` cookie | User's manual country override |
