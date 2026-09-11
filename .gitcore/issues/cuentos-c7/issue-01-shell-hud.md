# [Ola C7.01] feat-cuentos-night-shell: night shell + HUD for cuentos reading mode

## 1. Current State (measurable)

- `saberparatodos/src/layouts/Layout.astro` (~line 57) already hides aux client widgets on `/cuentos/*` via `enableAuxClientWidgets`, but `Navbar`, `Footer` and `CountryBanner` still render (`showNavbar`/`showFooter` default `true`): reading mode still shows adult site chrome.
- `saberparatodos/src/components/cuentos/shell/` does NOT exist (0 files): no night wrapper, no HUD component.
- `/cuentos/*` pages render on the default site theme, NOT midnight `#121832`; no cream `#FFF9DC` / gold `#D4A94E` kid-shell styling exists anywhere in the cuentos module.
- Progress stores exist (`src/lib/cuentos/progreso*`, `src/lib/cuentos/logros*` from prior waves) but nothing surfaces estrellas/checks/pins counts visually during reading.
- Evidence: `docs/CUENTOS/REDISENO_STORYCOMET.md` §1.1–1.2 (midnight shell, wooden toy buttons, HUD estrellas /150 + checks /75 + pins /75 + 4 round buttons sonido/idioma/perfil/ajustes, zero nav in reading mode).

## 2. Desired State

- New island `saberparatodos/src/components/cuentos/shell/` containing:
  - `CuentosShell` wrapper (Astro or Svelte): midnight `#121832` background for reading routes, star-dust accent built with pure CSS/inline SVG only (zero image files), centered content slot with kid-readable max-width.
  - `HudCuentos.svelte` (Svelte 5 runes, client-hydrated): left cluster shows ⭐ count `/150`, ✔ count `/75`, 📌 count `/75` read from the existing `progreso` + `logros` stores (SSR-safe: neutral placeholders until browser hydration via `onMount`/`$effect` guards); right cluster has 4 round wooden-toy buttons ≥48px: sonido (read-aloud mute toggle persisted under a `cuentos:sonido:v1`-style local key), idioma (fixed `ES` badge, single neutral-Spanish language, non-navigating), perfil (opens the existing local child-profile switcher), ajustes (popover: reading speed normal/lento + motion preference display — all localStorage, zero network).
  - Wooden toy button style per evidence §1.1: thick tan border + white face + soft shadow + emoji glyph, CSS only.
- `Layout.astro` extension: a `modoCuentos` boolean prop (auto-`true` when `Astro.url.pathname` starts with `/cuentos/`) that hides `Navbar`, `Footer`, `CountryBanner` and aux widgets. Zero nav links rendered in reading mode; the only exit affordance belongs to the door/reader issues (C7.02/C7.03), not this one.
- Non-cuentos routes render exactly as before (no midnight background leak, chrome intact).

## 3. Web Research (4–6 queries)

1. Svelte 5 runes (`$state`, `$derived`, `$props`, `$effect`, `onMount` for browser-only store hydration) — https://svelte.dev/docs/svelte/runes
2. Astro layout props + `<slot />` + conditional rendering with ternaries (no Svelte block syntax in `.astro`) — https://docs.astro.build/en/basics/astro-components/
3. MDN `prefers-reduced-motion`: gate twinkle/float animations, freeze on final pose — https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
4. MDN `aria-live="polite"` + `role="status"` for HUD count updates without focus theft — https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live
5. Touch targets for small children: minimum 44–48px targets with generous spacing — https://web.dev/patterns/ (all 4 round buttons ≥48px)
6. Astro client directives (`client:load` vs `client:only`) for store-backed islands that must not break SSR/prerender — https://docs.astro.build/en/directives-reference/#client-directives

## 4. Agent Session Prompt

> You are implementing C7.01 (feat-cuentos-night-shell) in `/home/belal/proyectosSWAL/apps/worldexams`.
> READ FIRST (full files, before any edit): `saberparatodos/src/layouts/Layout.astro`, one existing lector component (`saberparatodos/src/components/cuentos/lector/CuentoReader.svelte`), `docs/CUENTOS/REDISENO_STORYCOMET.md` (§1.1–1.2, §2 C7.01), `docs/CUENTOS/01_DIRECCION_ARTE.md` (§5 animations, §7 checklist), `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` (§1 headers, §2 neutral Spanish), `docs/CUENTOS/WAVE_PLAN.md` (privacy section "Privado no-listado").
> Task: (1) create `saberparatodos/src/components/cuentos/shell/` island — night wrapper (midnight `#121832`, CSS/SVG star dust, centered slot) + `HudCuentos.svelte` (Svelte 5 runes; ⭐/150 ✔/75 📌/75 from existing progreso/logros getters with SSR-safe placeholders; 4 round wooden-toy buttons ≥48px: sonido toggle persisted locally, fixed ES badge, perfil switcher wired to existing local profiles, ajustes popover with speed + motion prefs — all localStorage, zero network). (2) extend `Layout.astro` with a `modoCuentos` flag (auto-on for `/cuentos/*`) hiding Navbar/Footer/CountryBanner/aux widgets; zero nav links in reading mode. (3) add e2e `saberparatodos/tests/e2e/cuentos-shell.spec.ts` (desktop+mobile, screenshots, 0 console errors). (4) run all checks in §11.
> Constraints: BR-03 (zero tokens/telemetry — no fetch/analytics in new files), BR-07 (no login gate), unlisted (keep `noindex`, no sitemap/nav additions), neutral Spanish strings only, copyright header on every new file, `prefers-reduced-motion` respected, CSS/SVG-only art (free assets only, no downloads). Do NOT touch `features.json` or anything under `questions_data/cuentos/`. Svelte 5 runes only; `.astro` files use ternaries/`.map`, never `{#if}`/`{#each}`; absolute import paths from the package root.

## 5. Existing Code Patterns

- `Layout.astro` route-aware predicate (`!Astro.url.pathname.startsWith('/cuentos/')`): extend this exact predicate style for `modoCuentos`; do not invent a second routing mechanism.
- `CuentoReader.svelte` runes reference (`$props()`, `$state`, `$derived`, `$effect`, `window.matchMedia('(prefers-reduced-motion: reduce')` guard): mirror its runes + matchMedia pattern in `HudCuentos.svelte`.
- `src/lib/cuentos/progreso*` + `logros*`: `cuentos:<modulo>:v1` localStorage namespacing, try/catch + JSON guards, identity-free payloads; consume counts through their public getters, never duplicate raw keys.
- `src/components/cuentos/arte/tokens.css`: existing CSS token convention (`--t-bote`, `--t-aparece`); add shell tokens (`--cuento-noche`, `--cuento-crema`, `--cuento-dorado`) in a new scoped `shell.css`, never edit global theme files.
- Unlisted pattern (prior SEO work): cuentos pages render `noindex` and stay out of sitemap/nav; this issue preserves that (asserted in §6).

## 6. Acceptance Criteria (command-verifiable)

1. `ls saberparatodos/src/components/cuentos/shell/` → ≥3 files (shell wrapper, `HudCuentos.svelte`, scoped CSS).
2. `grep -rEn "#121832|#FFF9DC|#D4A94E" saberparatodos/src/components/cuentos/shell/` → ≥3 matches (evidence palette present).
3. Reading route renders zero adult chrome: e2e asserts site nav, footer, and aux widgets are absent on `/cuentos/<slug>` while still present on `/`.
4. HUD shows three counters with `/150`, `/75`, `/75` denominators; e2e seeds known localStorage progress and asserts displayed values match.
5. All 4 round buttons have bounding boxes ≥48px (asserted in e2e); sonido toggles a persisted pref; ES badge does not navigate; perfil + ajustes open local-only UI with zero network calls (fetch spy / `request` listener shows none from the shell).
6. `npx playwright test tests/e2e/cuentos-shell.spec.ts` on the repo's desktop + mobile projects → PASS with `shell-desktop.png` + `shell-mobile.png` screenshots; the spec collects `console` errors and `pageerror` events → asserts 0 on both viewports.
7. `grep -rEn "fetch\(|sendBeacon|analytics|gtag|plausible|posthog|supabase" saberparatodos/src/components/cuentos/shell/` → exit 1 (BR-03).
8. `grep -rEn "noindex" saberparatodos/src/pages/cuentos/*.astro saberparatodos/src/layouts/Layout.astro` → ≥1 match per cuentos route; `grep -rEn "cuentos" saberparatodos/src/components/Navbar.astro` → exit 1 (still unlisted, no nav links).
9. `grep -rEn "prefers-reduced-motion" saberparatodos/src/components/cuentos/shell/` → ≥1; with reduced-motion emulation e2e asserts decorative animations are off.
10. `grep -rEn "vos |tenés|hacé|mirá|che |parce|chido|chévere|bacán|pesos|dólares|euros" saberparatodos/src/components/cuentos/shell/` → exit 1 (neutral Spanish).
11. Homepage regression: smoke/e2e on `/` still PASS (chrome renders, body background is not `#121832`).

## 7. Files + Risk

| File | Change | Risk |
|------|--------|------|
| `saberparatodos/src/components/cuentos/shell/CuentosShell.*` | NEW (~60 lines, midnight wrapper + slot) | Low — new island |
| `saberparatodos/src/components/cuentos/shell/HudCuentos.svelte` | NEW (~180 lines, counters + 4 buttons) | Medium — store wiring must stay SSR-safe; keep reads in browser guards |
| `saberparatodos/src/components/cuentos/shell/shell.css` | NEW (~120 lines, night tokens + wooden buttons + star dust) | Low — scoped to shell namespace |
| `saberparatodos/src/layouts/Layout.astro` | EDIT — `modoCuentos` flag + conditional chrome (≤25 lines) | Medium — touches global layout; default behavior outside `/cuentos/*` must be untouched |
| `saberparatodos/tests/e2e/cuentos-shell.spec.ts` | NEW (~120 lines) | None |
| `saberparatodos/src/lib/cuentos/progreso*`, `logros*` | READ-ONLY reference | Must not refactor stores |

## 8. DO NOT Touch

- `features.json` (wave reconciliation happens outside issues — never edit it here).
- Anything under `questions_data/cuentos/` (story texts, quizzes, SVGs, LICENSE-CONTENT): zero content changes.
- `saberparatodos/scripts/validate_cuentos.js`, pack generator, static packs under `public/v1/cuentos/`.
- Quiz scoring, read-aloud logic, hotspot logic, Supabase/RLS code.
- Global theme CSS outside the shell namespace; `Navbar.astro` / `Footer.astro` internals (only their inclusion in Layout may be gated).
- Sitemap, robots, or anything that could list `/cuentos` publicly; do NOT add nav links.

## 9. Anti-Hallucination Rules

1. READ-first: no shell code before reading `Layout.astro` (full), `CuentoReader.svelte` (≥120 lines for runes/store patterns), and `REDISENO_STORYCOMET.md` §1–§2; cite the Layout flag line number you extend in the PR description.
2. Svelte 5 runes only (`$state`/`$derived`/`$props`/`$effect`): zero `export let`, `$:` labels, or `createEventDispatcher` in new `.svelte` files (grep-verified).
3. `.astro` files use ternaries and `.map()`; Svelte-only block syntax (`{#if}`, `{#each}`, `{#await}`) inside any `.astro` file is a hard FAIL.
4. Absolute import paths from the package root (or the repo's configured alias); no invented aliases, no `../../../` chains beyond existing convention.
5. No new npm dependencies, no CDN/font/image downloads — CSS + inline SVG only. If a store getter you need does not exist, report it as a blocker in the PR instead of inventing an API.

## 10. PR Delivery Requirements (anti-empty-PR)

- One PR from feature branch `feat/c7-01-night-shell`; no review-ready push without the island + Layout edit + e2e spec + screenshots all present.
- Description includes: linked issue, files changed, §11 commands with pasted outputs, `shell-desktop.png` + `shell-mobile.png` attached, and the Layout flag line-number citation.
- Rebased on the current default branch; CI green; no unrelated files; review checklist (BR-03/BR-07, unlisted, neutral Spanish, copyright headers, reduced-motion) ticked with evidence.

## 11. Verification (bash — run inside `saberparatodos/` unless noted)

```bash
ls src/components/cuentos/shell/
grep -rEn "#121832|#FFF9DC|#D4A94E" src/components/cuentos/shell/
grep -rEn "export let|\\$:|createEventDispatcher" src/components/cuentos/shell/*.svelte; test $? -eq 1
grep -rEn "{#if}|{#each}|{#await}" src/components/cuentos/shell/*.astro src/layouts/Layout.astro 2>/dev/null; test $? -eq 1
grep -rEn "fetch\(|sendBeacon|analytics|gtag|plausible|posthog|supabase" src/components/cuentos/shell/; test $? -eq 1
node scripts/validate_cuentos.js
npx astro check
npx playwright test tests/e2e/cuentos-shell.spec.ts
```

## 12. Dependencies & Merge Order

- Depends on waves C1–C5 merged (progreso/logros stores, reader, quiz, 10 stories, noindex baseline) — verify presence before starting.
- C7A order: merge C7.01 FIRST (C7.02/C7.03 render inside the shell). C7.04 (fonts) is independent but shares `Layout.astro` proximity — keep the Layout diff minimal to avoid conflicts.

## 13. Failure Recovery

- If the Layout edit breaks non-cuentos routes: revert the Layout hunk only (`git checkout <base> -- saberparatodos/src/layouts/Layout.astro`), keep the shell island, re-apply behind the route predicate with a `/` snapshot assertion first.
- If store hydration flashes or warns during SSR: fall back to `client:only="svelte"` for `HudCuentos`, keeping static placeholders server-rendered.
- If console errors come from third-party widgets on cuentos routes: extend the existing route gate (same predicate), never patch vendor code; document in the PR.
