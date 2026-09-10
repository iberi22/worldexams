# [Ola C5.03] feat-cuentos-pwa-offline: offline packs + reading without network

## 1. Current State (measurable)

- `public/v1/cuentos/*` static packs (planned C1.03: `generate-cuento-packs.js` output, one JSON per story + index) exist as build artifacts but NOTHING precaches them: 0 service-worker routes reference `v1/cuentos`, 0 offline tests exist.
- Current offline behavior: airplane-mode load of any `/cuentos/<slug>` page → browser network error (verify on-branch with `npm run build && npm run preview`, then offline DevTools). Reading without network is 0% functional.
- App shell context: `saberparatodos` is an Astro static site served from `public/`; check on-branch whether a service worker already exists (`grep -r "service-worker\|workbox\|registerSW" saberparatodos/src saberparatodos/public saberparatodos/astro.config.mjs`) — extend it if present, create a scoped one if absent. Scope must cover ONLY cuentos routes + packs, never the whole app.
- Waves C1–C4 are planned dependencies: C1.03 pack JSON (cache payload), C1.05 story pages (cache shell), C3–C4 SVG scenes referenced by packs (cache asset list). Hard constraints: BR-03 (offline cache stores story content only — zero telemetry, zero tokens, zero karma payloads), BR-07 (offline reading free, no auth gate to populate cache). Neutral Spanish for any offline UI strings (§2); copyright headers where applicable (§1).

## 2. Desired State

- Offline pack strategy: on first visit to `/cuentos` (or per-story opt-in button "Leer sin internet"), the SW precaches `/cuentos/<slug>` HTML + `public/v1/cuentos/<slug>.json` + its SVG scenes/characters. Cache name versioned: `cuentos-v1`. Cache-first for pack JSON + SVGs; network-first with offline fallback for story HTML.
- Offline fallback page: visiting any cached story without network renders the full story (text + scenes + quiz) from cache; visiting an UNCACHED story without network renders a neutral-Spanish offline notice (`Sin internet — los cuentos guardados aparecen en /cuentos`) with a link back to the cached index. No dead browser error pages for cached content.
- Scope discipline: SW scope limited to `/cuentos` subtree + `/v1/cuentos/*` (+ explicitly listed SVG dirs). Registration code lives in the cuentos island only; no changes to global app shell, no Workbox runtime CDN (vendor locally or hand-roll ~80-line SW — zero new `package.json` deps preferred).
- Storage hygiene: versioned cache + `activate` handler deleting old `cuentos-v*` caches; quota-exceeded (`QuotaExceededError`) → catch, keep index + already-cached stories, show notice. No `localStorage` abuse for binary/SVG payloads.
- SVG caching: packs reference scenes under `questions_data`-derived public paths — cache exactly the URLs the reader requests (derive list from pack JSON at runtime, no hardcoded 80-file manifest).

## 3. Web Research (4–6 sources)

1. MDN — Service Worker API + `CacheStorage`: lifecycle (install/activate), `cache.addAll`, versioned cache cleanup on activate. https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
2. web.dev — "Offline fallback page" pattern: cache-first for assets, network-first with cached fallback for HTML. https://web.dev/offline-fallback-page/
3. Google Workbox docs — precaching vs runtime caching + cache expiration (`ExpirationPlugin`); use only if a local Workbox copy is justified, else hand-roll. https://developer.chrome.com/docs/workbox/
4. MDN — Service worker scope & registration: `navigator.serviceWorker.register('/cuentos/sw.js', { scope: '/cuentos/' })` limits interception to the subtree. https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register
5. web.dev — Storage quotas & eviction: `navigator.storage.estimate()`, handle `QuotaExceededError`, persistent vs best-effort boxes. https://web.dev/storage-for-the-web/
6. Astro docs — `public/` passthrough + adapter-agnostic static output: SW file placed under `public/cuentos/` ships verbatim; registration snippet injected from a cuentos-only layout/component. https://docs.astro.build/en/basics/project-structure/#public

## 4. Agent Session Prompt

> You are implementing C5.03 (feat-cuentos-pwa-offline) in `/home/belal/proyectosSWAL/apps/worldexams/saberparatodos`.
> Context: read `docs/CUENTOS/00_BIBLIA.md`, `02_COPYRIGHT_Y_FORMATO.md` (§1–§2), `WAVE_PLAN.md` (C5 table). Prior waves provide: `public/v1/cuentos/<slug>.json` static packs (C1.03), `src/pages/cuentos*` story pages (C1.05), 10 stories with SVG scenes (C3–C4), progress/logros in localStorage (C2.05/C5.01 — do NOT move these into SW cache).
> Task: (1) detect existing SW mechanism (`grep service-worker|workbox|registerSW src public astro.config.mjs`) and EXTEND it if present, else create scoped `public/cuentos/sw-cuentos.js` + registration from cuentos layout only. (2) implement versioned `cuentos-v1` cache: precache index + visited-story HTML + pack JSON + pack-referenced SVGs (URL list derived from pack JSON at runtime); cache-first for JSON/SVG, network-first+fallback for HTML, offline fallback notice in neutral Spanish for uncached stories. (3) `activate` cleanup of old `cuentos-v*`; QuotaExceededError degradation. (4) verify: build + preview, DevTools offline — all 10 stories readable after one visit each; uncached-URL offline shows fallback notice; Lighthouse/PWA offline check passes for /cuentos. Constraints: SW scope covers ONLY cuentos subtree + v1/cuentos; BR-03 (zero telemetry in SW — no analytics fetches), BR-07 (no auth gate), neutral Spanish (veto grep), zero new npm deps preferred, absolute paths from root. Do NOT touch `features.json`. Deliver a PR with offline test evidence (curl + DevTools offline checklist + screenshots) and validator green.

## 5. Existing Code Patterns

- C1.03 packs (planned): `public/v1/cuentos/<slug>.json` + index — the single source of truth for WHAT to cache (story JSON lists its SVG assets). Parse, don't hardcode.
- C1.05 pages (planned): `src/pages/cuentos*` Astro static HTML — cacheable as opaque same-origin GETs; register the SW from the cuentos layout/component so no other section pays the cost.
- C2.05/C5.01 storage (planned): progress + logros live in localStorage (`cuentos:*:v1` keys) — SW must NOT duplicate or migrate them; CacheStorage holds fetched HTTP responses only.
- Repo `public/` conventions: verbatim static files (`favicon.svg`, `_headers`) — SW file follows the same rule (plain JS, no bundler magic, copyright header comment line 1).
- E2E convention (C2.06 planned): `saberparatodos/tests/e2e/cuentos-*.spec.ts` Playwright — add offline assertions in the same style if the harness exists on-branch.

## 6. Acceptance Criteria (command-verifiable)

1. SW file exists and is scoped: `ls saberparatodos/public/cuentos/sw-cuentos.js` (or the extended existing SW path, recorded in PR) + `grep -n "scope" <registration>` shows `/cuentos/` scope; `grep -rEn "registerSW|serviceWorker.register" saberparatodos/src --include="*.astro" -l` → only cuentos-layout files.
2. `grep -n "cuentos-v1" <sw-file>` → ≥1 (versioned cache); `grep -n "caches.delete\|delete.*cuentos-v" <sw-file>` → ≥1 (old-version cleanup).
3. `grep -rEn "gtag|analytics|facebook.net|pixel|plausible|posthog|hotjar|sendBeacon" <sw-file> <registration>` → exit 1 (BR-03).
4. Neutral-Spanish veto grep over new offline strings → exit 1.
5. `npm run build` → success; `grep -c "<slug>" public/v1/cuentos/index.json` (or C1.03 index equivalent) → 10 packs present to cache.
6. Offline functional test (manual, evidenced): `npm run preview`, open `/cuentos`, visit all 10 stories online, go offline (DevTools), reload each → 10/10 render full text+scenes+quiz from cache; fresh-profile offline visit to uncached story → fallback notice (screenshot both states).
7. `node scripts/validate_cuentos.js` → 0 errors, 10/10 (no regression).
8. `git diff --stat package.json` → empty (zero new deps; if a dep was unavoidable, PR justifies it and this criterion is explicitly waived with reason).

## 7. Files + Risk

| File | Change | Risk |
|------|--------|------|
| `saberparatodos/public/cuentos/sw-cuentos.js` (or extend existing SW) | NEW/EDIT (~80–120 lines) | Medium — first SW in this area; scope bug could intercept app traffic → mitigate with narrow scope + registration only from cuentos layout |
| Cuentos layout or `[slug].astro` head | EDIT — registration snippet (~5 lines) | Low — additive, guarded by `'serviceWorker' in navigator` |
| Offline fallback markup (inline in SW or `public/cuentos/sin-conexion.html`) | NEW | Low — static neutral-Spanish strings |
| `tests/e2e/cuentos-offline.spec.ts` (only if C2.06 harness exists) | NEW | Low |
| Old-cache cleanup | inside SW `activate` | Low |

Rollback: unregister (remove snippet) + delete SW file + bump-away clients on next deploy; cached clients self-heal on SW update. Risk: stale story HTML served post-C4-fix → mitigate with `cuentos-vN` bump procedure documented in the file header.

## 8. DO NOT Touch

- `.gitcore/features.json` and any `features.json`.
- `questions_data/cuentos/**`, `scripts/validate_cuentos.js`, `scripts/generate-cuento-packs.js`, `public/v1/cuentos/**` artifacts (read-only as cache payload).
- C5.01 island (`logros*`, `CelebracionLogro.svelte`), C5.02 island (head tags, sitemap, robots), global app shell / root layout / root SW if one serves other sections, auth/Supabase/RLS, `.env`/secrets, CI workflows, `package.json` (no new deps).
- No runtime CDN imports inside the SW (offline code must itself work offline); no analytics in SW; no widening scope beyond cuentos.
- Any files outside the island listed in §7.

## 9. Anti-Hallucination (minimum 4)

1. Do NOT assume a SW exists or doesn't — paste the §4 detection grep output in the PR and state extend-vs-create with paths.
2. Do NOT hardcode the 10-slug/80-SVG manifest from memory — derive cache URLs from pack JSON at runtime; paste the derivation code + one pack excerpt proving the field names.
3. Do NOT claim "works offline" without evidence — attach the 10/10 offline checklist (per-story reload results) + fallback-notice screenshot + preview server log excerpt.
4. Do NOT claim zero telemetry without the §6 criterion-3 grep output (exit 1) pasted in the PR.
5. Do NOT report validator green without pasting full stdout (10/10).

## 10. PR Delivery Requirements (anti-empty-PR + test-nonempty)

- The PR must contain: the SW file with real caching logic (no stub `fetch` passthrough), the registration snippet, the fallback notice, and offline evidence (10/10 checklist, screenshots online-vs-offline for ≥2 stories, validator stdout, no-tracker grep).
- A PR that only adds an empty SW shell, only docs, or skips the offline walkthrough will be rejected — the "test" for this issue IS the executed 10/10 offline matrix; paste it as a table (story × online-visit × offline-reload PASS/FAIL).
- PR title: `[C5.03] feat-cuentos-pwa-offline: offline packs + reading without network`. Body: extend-vs-create decision, cache strategy table (route × strategy), version-bump procedure, quota behavior, full evidence, validator output.
- No merge if any of the 10 stories fails offline reload, scope covers non-cuentos routes, or a tracker string appears in the diff.

## 11. Verification (bash)

```bash
cd /home/belal/proyectosSWAL/apps/worldexams/saberparatodos
grep -rEn "service-worker|serviceWorker|workbox|registerSW" src public astro.config.mjs | head -20
ls public/cuentos/sw-cuentos.js
grep -n "cuentos-v1" public/cuentos/sw-cuentos.js
grep -rEn "gtag|analytics|facebook.net|pixel|plausible|posthog|hotjar|sendBeacon" public/cuentos/sw-cuentos.js; test $? -eq 1 && echo "BR-03 OK"
npm run build
ls public/v1/cuentos/ | head -15
node scripts/validate_cuentos.js
git status --porcelain
# затем: npm run preview → visit /cuentos + 10 stories online → DevTools offline → reload 10/10 → screenshot
```

## 12. Dependencies & Merge Order (C5 after C1–C4 + internal 1–4)

- Wave C5 merges only after C1–C4 (needs C1.03 packs as cache payload, C1.05 HTML shell, C3–C4 final SVGs — caching draft SVGs would bake stale art).
- Internal C5 order: **C5.03 is position 03 (1→4)** — independent of C5.01/C5.02, may run in parallel; must merge before C5.04 (final audit tests offline matrix + greps SW for telemetry). If C5.02 edits the same story template `<head>`, C5.03 keeps its hunk to the registration snippet only.
- Cache version note: if any C4 content fix lands after C5.03, bump `cuentos-v1` → `cuentos-v2` in the same PR so clients drop stale HTML.

## 13. Failure Recovery

- Scope too wide (SW intercepts non-cuentos traffic) → narrow `{ scope }` + `if (!url.pathname.startsWith(...)) return` guard at handler top; verify with a non-cuentos page load test.
- Quota exceeded on low-end devices → catch per-`addAll` failure, fall back to caching index + current story only, surface the neutral-Spanish notice; never crash the install handler (a rejected install kills the SW).
- Stale content after C4 fixes → version bump procedure (§12); document it in the SW header so future waves follow it.
- Same-file collision with C5.02 in story template → rebase, keep registration hunk disjoint from head-tag hunks; never "fix" SEO or SW issues by editing the other island.
- More than 3 rewrites of the SW without a passing offline matrix → stop, post handler-by-handler diff summary, switch strategy (hand-rolled ↔ extend-existing).
