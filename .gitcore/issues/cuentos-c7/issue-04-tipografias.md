# [Ola C7.04] feat-cuentos-tipografias: local Andika + Fredoka via fontsource, zero external font CDN

## 1. Current State (measurable)

- `saberparatodos/package.json` contains ZERO fontsource dependencies (`grep -o '"[^"]*font[^"]*"' package.json` → no matches): all display/body type comes from system stacks or CDN-linked families.
- No `@fontsource/*` import exists anywhere under `saberparatodos/src/` (`grep -rEn "fontsource" saberparatodos/src/` → exit 1): the evidence typefaces (Andika reader body, Fredoka display) are not bundled.
- Art direction `01_DIRECCION_ARTE.md` §6 prescribes a rounded display family (fallback Baloo 2) + rounded body ≥1.35rem/1.7; evidence `REDISENO_STORYCOMET.md` confirms Andika (reader body) + Fredoka (display). Current body copy does not use Andika.
- Any external font `<link>` on cuentos routes would violate the local-fonts rule and add a third-party request inside children flows (BR-03 surface).

## 2. Desired State

- `saberparatodos/package.json` gains exactly two deps: `@fontsource/andika` (reader body) + `@fontsource/fredoka` (display). Static weights only — Andika 400 (+700 if the package ships it), Fredoka 500/600/700 — no variable-font experiments, no extra families.
- CSS imports in the cuentos style entry (alongside `arte/tokens.css` convention, e.g. a new `src/components/cuentos/arte/fuentes.css` imported by cuentos routes/components): `@fontsource/andika/400.css` (+700), `@fontsource/fredoka/500.css`, `/600.css`, `/700.css` — bundled locally by the build, zero runtime CDN calls.
- Font stacks: `--font-cuentos-cuerpo: 'Andika', 'Atkinson Hyperlegible', system-ui, sans-serif` (reader body, consumed by C7.03 spread at 24px) and `--font-cuentos-display: 'Fredoka', 'Baloo 2', system-ui, sans-serif` (titles/door/HUD numbers, honoring the art-direction Baloo 2 fallback). `font-display: swap` behavior (fontsource default) so text never blocks on fonts.
- Proof of locality: no `<link>` to any font CDN in cuentos pages/Layout cuentos path; production build output contains local `*.woff2` chunks served same-origin; e2e asserts computed `font-family` on spread body includes Andika and `document.fonts` shows the faces loaded without external requests (request listener: zero `fonts.googleapis`/`fonts.gstatic`/CDN calls on `/cuentos/*`).
- Non-cuentos typography untouched: new vars are additive; no global `body{font-family}` override.

## 3. Web Research (4–6 queries)

1. Fontsource docs: per-weight CSS imports (`@fontsource/<pkg>/<weight>.css`), self-hosted woff2, `font-display: swap` default — https://fontsource.org/docs/getting-started/install
2. Fontsource Andika package (available weights/subsets) — https://fontsource.org/fonts/andika
3. Fontsource Fredoka package (available weights/subsets) — https://fontsource.org/fonts/fredoka
4. MDN `font-display: swap` + fallback-stack behavior during webfont load — https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
5. Astro + Vite: npm CSS imports bundled to same-origin assets (no runtime CDN) — https://docs.astro.build/en/guides/styling/#import-css-files
6. `document.fonts.check()` / `FontFaceSet` for asserting loaded faces in tests — https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts

## 4. Agent Session Prompt

> You are implementing C7.04 (feat-cuentos-tipografias) in `/home/belal/proyectosSWAL/apps/worldexams/saberparatodos`.
> READ FIRST (before any edit): `saberparatodos/package.json` (deps section), `saberparatodos/src/components/cuentos/arte/tokens.css` (token convention), `saberparatodos/src/styles/global.css` (where NOT to put global overrides), `saberparatodos/src/layouts/Layout.astro` (head section — verify no font CDN links exist on the cuentos path), `docs/CUENTOS/REDISENO_STORYCOMET.md` (§2 C7.04), `docs/CUENTOS/01_DIRECCION_ARTE.md` (§6–§7), `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` (§1–§2), `docs/CUENTOS/WAVE_PLAN.md` (privacy section).
> Task: (1) add `@fontsource/andika` + `@fontsource/fredoka` to `package.json` (lockfile updated via the repo's package manager, exact versions pinned by the lockfile). (2) create `saberparatodos/src/components/cuentos/arte/fuentes.css` with per-weight fontsource imports + `--font-cuentos-cuerpo` / `--font-cuentos-display` stacks (Baloo 2 + system fallbacks, swap behavior). (3) wire the import into the cuentos style path (routes/components) WITHOUT a global `body` override and WITHOUT any external font `<link>`. (4) add e2e `saberparatodos/tests/e2e/cuentos-fuentes.spec.ts` (desktop+mobile, screenshots, 0 console errors; asserts Andika computed on reader body, Fredoka on display title, zero external font requests). (5) run all checks in §11.
> Constraints: BR-03 (zero tokens/telemetry — fonts are local files, no third-party request), BR-07 (no login gate), unlisted (no sitemap/nav changes; keep noindex wherever present), neutral Spanish (no UI strings expected in this issue — any added comment/string stays neutral), copyright header on new CSS, reduced-motion N/A (no animation in this issue — state that in the PR), free assets only (fontsource OFL packages, no paid foundries). Do NOT touch `features.json` or anything under `questions_data/cuentos/`. Absolute import paths from the package root.

## 5. Existing Code Patterns

- `lector/CuentoReader.svelte` line ~7 (`import '../arte/tokens.css'`): colocated CSS-import convention for the cuentos module — `fuentes.css` follows the same import path style.
- `arte/tokens.css` (`--t-*` tokens): CSS-custom-property convention — font stacks land there as `--font-cuentos-*`, not as hardcoded `font-family` values scattered per component.
- `Layout.astro` head: existing meta/link conventions — this issue ADDS nothing external there; verify-only.
- C7.03 spread consumes `var(--font-cuentos-cuerpo, <fallback>)`: this issue makes the var resolve to real Andika; the fallback keeps C7.03 green with or without this merge (either order works, prefer C7.04 before visual sign-off of C7.03).
- Repo package-manager + lockfile convention (check for `package-lock.json`/`pnpm-lock.yaml`/`bun.lockb` first): install with the repo's manager so the lockfile updates in the same PR.

## 6. Acceptance Criteria (command-verifiable)

1. `grep -En '"@fontsource/(andika|fredoka)"' saberparatodos/package.json` → 2 matches; lockfile updated in the same diff (`git status --short` shows lockfile modified).
2. `grep -rEn "@fontsource/andika|@fontsource/fredoka" saberparatodos/src/` → ≥4 matches (per-weight CSS imports, local paths only).
3. `grep -rEn "fonts\.googleapis|fonts\.gstatic|fontsource.*https?://|use\.typekit" saberparatodos/src/ saberparatodos/astro.config.* 2>/dev/null` → exit 1 (zero external font CDN).
4. `grep -rEn "font-cuentos-cuerpo|font-cuentos-display" saberparatodos/src/` → ≥2 (both stacks defined and consumed); `grep -rEn "^body\s*{[^}]*font-family|body{font-family" saberparatodos/src/components/cuentos/ saberparatodos/src/styles/global.css` → exit 1 or unchanged vs base (no global body override — prove with `git diff --stat` showing only cuentos-scoped CSS + package files).
5. Production build emits local font files: `npm run build` → PASS and `grep -rEl "woff2" dist/` (or the repo's output dir) → ≥1 with font URLs same-origin (no `https://` font URLs in built CSS: `grep -rEoh "https?://[^)\"']*woff2?" dist/ | head` → empty).
6. `npx playwright test tests/e2e/cuentos-fuentes.spec.ts` on desktop + mobile → PASS with `fuentes-desktop.png` + `fuentes-mobile.png`; asserts: computed `font-family` of spread/door body text contains `Andika`, display title contains `Fredoka` (with `document.fonts.check()` true after load), request listener records zero font-CDN requests on `/cuentos/*`, console-error + `pageerror` collectors → 0 on both viewports.
7. `npx astro check` → PASS; `node scripts/validate_cuentos.js` → 0 errors, 10/10.
8. Bundle discipline: PR adds no font files outside the package manager flow (no hand-committed `*.woff2/ttf` under `src/` or `public/` — `git status` shows none).

## 7. Files + Risk

| File | Change | Risk |
|------|--------|------|
| `saberparatodos/package.json` + lockfile | EDIT — 2 deps | Low — additive; risk is manager/lockfile mismatch (use the repo's manager) |
| `saberparatodos/src/components/cuentos/arte/fuentes.css` | NEW (~40 lines: imports + 2 stacks + usage classes) | Low — additive tokens |
| cuentos style wiring (route/component import line(s)) | EDIT — 1–3 import lines | Low — must be cuentos-scoped, never global `body` |
| `saberparatodos/tests/e2e/cuentos-fuentes.spec.ts` | NEW (~90 lines) | None |
| `src/styles/global.css`, `Layout.astro` head | VERIFY-ONLY (no external font links) | Must show zero diff unless removing a CDN link (allowed, documented) |

## 8. DO NOT Touch

- `features.json` (never edit it here).
- Anything under `questions_data/cuentos/` (no content changes of any kind).
- Validator, pack generator, static packs, reader/quiz/hotspot/progreso code, Supabase/RLS.
- Global typography: no `body{font-family}` override, no heading reset changes, no Tailwind config font edits outside cuentos scope (prefer plain CSS vars; config edits only if the repo convention requires it — justify in PR).
- Sitemap, robots, nav: no additions; keep `/cuentos/*` unlisted.

## 9. Anti-Hallucination Rules

1. READ-first: no `package.json` edit before reading it (deps + manager/lockfile evidence), `tokens.css` (convention), `global.css` (no-override boundary), and the Layout head section; name the package manager + lockfile in the PR description.
2. Exact package names only (`@fontsource/andika`, `@fontsource/fredoka`): verify each weight file exists in `node_modules/@fontsource/<pkg>/` after install and paste `ls` proof — never guess weight filenames (e.g. do not assume `700.css` ships for Andika; import only weights that exist on disk).
3. No external font URLs anywhere in `src/` (grep-verified); no hand-committed binary font files; fonts arrive ONLY via the fontsource npm packages.
4. Absolute import paths from the package root; per-weight CSS imports (not whole-package barrels) to keep the cuentos CSS payload minimal.
5. If a needed weight does not exist in the installed package version, use the closest shipped weight + system fallback — do not fabricate CSS files, do not invent `@font-face` URLs, report the gap in the PR.

## 10. PR Delivery Requirements (anti-empty-PR)

- One PR from `feat/c7-04-tipografias`; review-ready push contains deps + lockfile + CSS + wiring + e2e + screenshots — dependency-only PRs with no wired usage are empty PRs and will be rejected.
- Description includes: linked issue, package manager + lockfile evidence, `ls` proof of installed weight files, §11 outputs pasted, `fuentes-desktop.png` + `fuentes-mobile.png` attached.
- Rebased on default branch; CI green (including `astro check` + production build); no unrelated files; checklist (BR-03/BR-07, unlisted, copyright header, free OFL assets, no global override) ticked with evidence.

## 11. Verification (bash — run inside `saberparatodos/` unless noted)

```bash
grep -En '"@fontsource/(andika|fredoka)"' package.json
ls node_modules/@fontsource/andika/ node_modules/@fontsource/fredoka/
grep -rEn "@fontsource/andika|@fontsource/fredoka" src/
grep -rEn "fonts\.googleapis|fonts\.gstatic" src/ astro.config.* 2>/dev/null; test $? -eq 1
grep -rEn "font-cuentos-cuerpo|font-cuentos-display" src/
git status --short | grep -E "woff2|ttf|otf"; test $? -eq 1
node scripts/validate_cuentos.js
npx astro check
npm run build
npx playwright test tests/e2e/cuentos-fuentes.spec.ts
```

## 12. Dependencies & Merge Order

- Depends on waves C1–C5 merged (cuentos routes + CSS conventions exist). Independent of C7.01–C7.03 logic; visual sign-off of C7.02/C7.03 ideally happens after this merges (real Andika/Fredoka instead of fallbacks).
- C7A order: may merge any time after C7.01; preferred order C7.01 → C7.04 → C7.03 → C7.02. No shared-file conflicts expected (only file near C7.01 is `Layout.astro`, which this issue should not need to modify).

## 13. Failure Recovery

- If the package manager / lockfile fights back (version conflicts, offline registry): retry with the repo's pinned manager version; if still blocked, vendor NOTHING by hand — mark the PR blocked with the install log pasted, do not commit binaries or CDN links as a workaround.
- If a guessed weight CSS file 404s the build: `ls node_modules/@fontsource/<pkg>/`, import only shipped weights, rebuild; keep system fallbacks so rendering never breaks.
- If `npm run build` font-chunk output differs (inline base64 vs files): assert same-origin + no external requests in e2e rather than a specific emit shape; document the actual emit in the PR.
