# [Ola C7.02] feat-cuentos-puerta-libro: per-story book door (cover + blurb + open + back to shelf)

## 1. Current State (measurable)

- `saberparatodos/src/pages/cuentos/[slug].astro` renders the full story text inline as a web article (verify by reading the file): there is no door/gate step between the shelf (`/cuentos/`) and the reading experience.
- `saberparatodos/src/components/cuentos/` contains no door component (0 files matching `Puerta*`): no spotlight cover, no blurb block, no "open the book" primary action.
- Pack metadata per story (`slug`, `titulo`, `edad`, `valor`, `habitat`, scene SVGs) exists via the static-pack pipeline, but no page surfaces it as a door (cover + meta chips + progress state).
- Evidence: `docs/CUENTOS/REDISENO_STORYCOMET.md` §1.3 + §2 C7.02 (puerta por libro: portada spotlight + blurb + botón "Abrir el cuento" + "Volver al estante"; full text lives at `/cuentos/<slug>/leer/` built in C7.03).

## 2. Desired State

- New component `saberparatodos/src/components/cuentos/PuertaLibro.svelte` (Svelte 5 runes): spotlight cover (reuses the story's existing scene/cover SVG via `EscenaSVG`/piezas — no new art files), title, meta chips (edad, valor, hábitat from pack fields), blurb composed ONLY from existing metadata (titulo/valor/edad/hábitat + neutral-Spanish template strings — no invented plot text), reading-progress state from the existing progreso store ("Empezar el cuento" vs "Seguir en la página N"), primary wooden-toy button "Abrir el cuento" linking to `/cuentos/<slug>/leer/`, secondary link "Volver al estante" linking to `/cuentos/`.
- `saberparatodos/src/pages/cuentos/[slug].astro` reworked into the door: renders inside the night shell (C7.01), keeps `noindex`, shows `PuertaLibro` only — the full text moves to the `/leer/` route (C7.03 owns that route; see §12 for merge order so the primary button never 404s).
- Door keeps working with zero JS (cover, blurb, links server-rendered); progress label enhances on hydration only.
- Copy is playful-neutral Spanish per evidence tone ("Tidying the table…" style → neutral-Spanish equivalent, e.g. "Acomodando la mesa…"), respectful of the veto list.

## 3. Web Research (4–6 queries)

1. Svelte 5 runes (`$props` for `slug`/pack input, `$derived` for progress label) — https://svelte.dev/docs/svelte/runes
2. Astro dynamic routes + `getStaticPaths` for `[slug]` prerender (existing pattern in `src/pages/cuentos/`) — https://docs.astro.build/en/guides/routing/#dynamic-routes
3. Astro `<slot />` layout composition + prop-driven `noindex` (existing Layout pattern) — https://docs.astro.build/en/basics/astro-components/
4. MDN: accessible link-buttons — primary action as a real `<a href>` (works with zero JS), styled as button — https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#accessibility
5. `prefers-reduced-motion` for the spotlight shimmer/float (static final pose) — https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
6. Cumulative Layout Shift: fixed aspect-ratio box for the cover so the door does not jump while art loads — https://web.dev/articles/cls

## 4. Agent Session Prompt

> You are implementing C7.02 (feat-cuentos-puerta-libro) in `/home/belal/proyectosSWAL/apps/worldexams`.
> READ FIRST (full files, before any edit): `saberparatodos/src/pages/cuentos/[slug].astro`, `saberparatodos/src/pages/cuentos/index.astro`, one existing lector component (`saberparatodos/src/components/cuentos/lector/CuentoReader.svelte` — runes/store patterns only), `docs/CUENTOS/REDISENO_STORYCOMET.md` (§1.3, §2 C7.02), `docs/CUENTOS/01_DIRECCION_ARTE.md` (§4 escenas, §5 animaciones, §7 checklist), `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` (§1–§2), `docs/CUENTOS/WAVE_PLAN.md` (privacy section).
> Task: (1) create `saberparatodos/src/components/cuentos/PuertaLibro.svelte` (Svelte 5 runes; spotlight cover reusing existing scene/cover SVG, meta chips from pack fields, blurb from existing metadata only, progress-aware CTA label from the progreso store, primary link "Abrir el cuento" → `/cuentos/<slug>/leer/`, secondary "Volver al estante" → `/cuentos/`). (2) rework `saberparatodos/src/pages/cuentos/[slug].astro` into the door (night shell, `noindex` kept, zero-JS baseline). (3) add e2e `saberparatodos/tests/e2e/cuentos-puerta.spec.ts` (desktop+mobile, screenshots, 0 console errors). (4) run all checks in §11.
> Constraints: BR-03 (zero tokens/telemetry), BR-07 (no login gate), unlisted (keep `noindex`, no sitemap/nav additions), neutral Spanish only, copyright header on every new file, `prefers-reduced-motion` respected, free assets only (reuse existing SVGs, zero downloads). Do NOT touch `features.json`, any file under `questions_data/cuentos/`, or the pack/validator scripts. Svelte 5 runes only; `.astro` files use ternaries/`.map`, never `{#if}`/`{#each}`; absolute import paths from the package root.

## 5. Existing Code Patterns

- `src/pages/cuentos/[slug].astro` + `index.astro`: existing `getStaticPaths` + pack-loading pattern for cuentos pages — reuse it verbatim for the door's data (slug → pack JSON), do not invent a loader.
- `src/components/cuentos/arte/EscenaSVG.svelte` + `piezas/`: scene-art rendering convention (SVG-only, alt text outside the SVG in HTML) — the spotlight cover reuses this, never embeds text inside SVG.
- `src/lib/cuentos/progreso*`: public getters for per-slug page/progress — the CTA label ("Empezar" vs "Seguir en la página N") reads these; never raw localStorage keys.
- `CuentoReader.svelte`: runes + reduced-motion matchMedia guard — mirror in `PuertaLibro.svelte`.
- Night shell (C7.01): the door renders inside `CuentosShell` + HUD; if C7.01 is not merged yet, render the door markup so it works standalone and note the dependency in the PR (no duplicated shell code).

## 6. Acceptance Criteria (command-verifiable)

1. `ls saberparatodos/src/components/cuentos/PuertaLibro.svelte` → exists; `grep -c "leer" saberparatodos/src/components/cuentos/PuertaLibro.svelte` → ≥1 (primary target `/cuentos/<slug>/leer/`); `grep -c "/cuentos" ...` → ≥2 (back-to-shelf link present).
2. Door shows cover + title + blurb + meta chips + exactly one primary "Abrir el cuento" action + "Volver al estante": asserted in e2e selectors on `/cuentos/tana-tucan-comparte` (or any merged slug).
3. Full story text is NOT on the door: e2e asserts a page-5 sentence from the pack JSON is absent from `[slug]` HTML (reading lives in `/leer/` per C7.03).
4. CTA label is progress-aware: e2e seeds progreso at page 4 → label reads "Seguir…"; with empty progress → "Empezar…" (neutral-Spanish wording, exact strings asserted).
5. Zero-JS baseline: with `javaScriptEnabled: false` the door still shows cover/title/blurb and both links navigate (playwright context test).
6. `npx playwright test tests/e2e/cuentos-puerta.spec.ts` on desktop + mobile projects → PASS with `puerta-desktop.png` + `puerta-mobile.png`; console-error + `pageerror` collectors → 0 on both viewports.
7. `grep -rEn "fetch\(|sendBeacon|analytics|gtag|plausible|posthog|supabase" saberparatodos/src/components/cuentos/PuertaLibro.svelte` → exit 1 (BR-03).
8. `grep -rEn "noindex" saberparatodos/src/pages/cuentos/\[slug\].astro` → ≥1; `grep -rEn "cuentos" saberparatodos/src/components/Navbar.astro` → exit 1 (still unlisted).
9. `grep -rEn "prefers-reduced-motion" saberparatodos/src/components/cuentos/PuertaLibro.svelte saberparatodos/src/components/cuentos/*.css` → ≥1.
10. `grep -rEn "vos |tenés|hacé|mirá|che |parce|chido|chévere|bacán|pesos|dólares|euros" saberparatodos/src/components/cuentos/PuertaLibro.svelte saberparatodos/src/pages/cuentos/\[slug\].astro` → exit 1 (neutral Spanish).
11. `node scripts/validate_cuentos.js` → 0 errors, 10/10 (no content touched, no regression).

## 7. Files + Risk

| File | Change | Risk |
|------|--------|------|
| `saberparatodos/src/components/cuentos/PuertaLibro.svelte` | NEW (~160 lines) | Medium — cover reuse + progress label; must not invent blurb plot text |
| `saberparatodos/src/pages/cuentos/[slug].astro` | REWORK (~80 lines: door data + shell + component) | Medium — preserves `getStaticPaths`/pack loading; keeps `noindex`; must not break shelf links |
| `saberparatodos/tests/e2e/cuentos-puerta.spec.ts` | NEW (~130 lines) | None |
| `src/components/cuentos/arte/*`, `src/lib/cuentos/progreso*` | READ-ONLY | No art/store refactors |
| `saberparatodos/src/pages/cuentos/[slug]/leer/` | NOT this issue (C7.03) | See §12 — do not scaffold it here |

## 8. DO NOT Touch

- `features.json` (never edit it here).
- Anything under `questions_data/cuentos/`: no text/quiz/SVG/metadata edits — the blurb MUST be derived from existing pack fields, never written into content files.
- Validator, pack generator, static packs, quiz/read-aloud/hotspot logic, Supabase/RLS.
- The shelf page `src/pages/cuentos/index.astro` (links to doors stay as-is).
- Sitemap, robots, nav: do NOT add links; keep `/cuentos/*` unlisted.

## 9. Anti-Hallucination Rules

1. READ-first: no door code before reading `[slug].astro` (full), `index.astro` (data-loading section), and `REDISENO_STORYCOMET.md` §1.3 + §2 C7.02; quote the existing `getStaticPaths`/pack-loader lines you reuse in the PR description.
2. Svelte 5 runes only: zero `export let`, `$:` labels, `createEventDispatcher` in `PuertaLibro.svelte` (grep-verified).
3. `.astro` files use ternaries and `.map()`; `{#if}`/`{#each}`/`{#await}` inside any `.astro` file is a hard FAIL.
4. Absolute import paths from the package root or repo alias; no invented aliases; cover art path must resolve to an existing file (prove with `ls` in the PR).
5. No new npm dependencies, no asset downloads; blurb strings come from existing metadata + neutral template — inventing plot sentences is a FAIL. If a metadata field you need is missing from packs, report it as a blocker instead of hardcoding story text.

## 10. PR Delivery Requirements (anti-empty-PR)

- One PR from `feat/c7-02-puerta-libro`; review-ready push contains component + page rework + e2e + screenshots — no empty/scaffold PRs.
- Description includes: linked issue, files changed, §11 outputs pasted, `puerta-desktop.png` + `puerta-mobile.png` attached, reused loader lines quoted, cover-asset `ls` proof.
- Rebased on default branch; CI green; no unrelated files; checklist (BR-03/BR-07, unlisted, neutral Spanish, copyright headers, reduced-motion) ticked with evidence.

## 11. Verification (bash — run inside `saberparatodos/` unless noted)

```bash
ls src/components/cuentos/PuertaLibro.svelte
grep -rEn "export let|\\$:|createEventDispatcher" src/components/cuentos/PuertaLibro.svelte; test $? -eq 1
grep -rEn "{#if}|{#each}|{#await}" "src/pages/cuentos/[slug].astro"; test $? -eq 1
grep -rEn "fetch\(|sendBeacon|analytics|gtag|plausible|posthog|supabase" src/components/cuentos/PuertaLibro.svelte; test $? -eq 1
grep -rEn "noindex" "src/pages/cuentos/[slug].astro"
node scripts/validate_cuentos.js
npx astro check
npx playwright test tests/e2e/cuentos-puerta.spec.ts
```

## 12. Dependencies & Merge Order

- Depends on waves C1–C5 merged (packs, pages, progreso, SEO baseline) + C7.01 shell (renders inside it; standalone-safe fallback required).
- C7A order: merge AFTER C7.03 — the primary button targets `/cuentos/<slug>/leer/`, which only exists once C7.03 lands. Merging out of order ships a dead primary action. Order: C7.01 → C7.04 → C7.03 → C7.02.

## 13. Failure Recovery

- If C7.03 slips: keep this PR unmerged (do NOT retarget the button to the old inline reader — that reverts the spec); mark the PR blocked-by C7.03.
- If the rework breaks shelf links or static paths: revert the page file only (`git checkout <base> -- "saberparatodos/src/pages/cuentos/[slug].astro"`), keep the component, re-apply preserving the original `getStaticPaths` block verbatim.
- If progress-label hydration mismatches SSR text: render the CTA label statically ("Abrir el cuento") server-side and enhance the "Seguir en la página N" suffix client-side only.
