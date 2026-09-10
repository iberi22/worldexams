# [Ola C2.04] feat-cuentos-lector: EscenaInteractiva hotspots + reduced-motion

## 2. Current State (measurable)

- Scene SVGs exist per story page (e.g. `questions_data/cuentos/tana-tucan-comparte/escenas/*.svg`, viewBox 0 0 800 450), but they are STATIC: 0 interactive hotspots anywhere in the app.
- Art direction (`docs/CUENTOS/01_DIRECCION_ARTE.md` section 4) requires 2-3 touch zones per scene with a reaction (jump, spin, WebAudio sound), defined in the story JSON (`hotspots`), never hardcoded.
- `saberparatodos/src/components/cuentos/lector/EscenaInteractiva.svelte` does not exist.

## 3. Desired State

- `EscenaInteractiva.svelte` renders the scene SVG with 2-3 keyboard-focusable, >= 48px touch zones driven by the `hotspots` array from the story pack JSON.
- Tapping a hotspot triggers its reaction: CSS jump (`--t-bote` 0.6s) or spin, plus an optional WebAudio blip (OscillatorNode, no audio files, no network).
- Under `prefers-reduced-motion: reduce`, all motion freezes to the final pose and sound is opt-in only; every hotspot has an accessible name in neutral Spanish.

## 4. Web Research Required

The assignee MUST run at least 4 of these queries and cite sources in the PR:
1. `SVG accessible interactive hotspots button role keyboard focus example`
2. `prefers-reduced-motion CSS media query freeze animation final state`
3. `WebAudio OscillatorNode simple blip no audio file children app`
4. `Svelte 5 runes SVG component dynamic elements each block`
5. `touch target size 48px WCAG mobile children fat finger`
6. `inline SVG vs img sprite performance Astro static site`

## 5. Agent Session Prompt

```text
You are an autonomous coding agent in repo /home/belal/proyectosSWAL/apps/worldexams.
Issue C2.04: create saberparatodos/src/components/cuentos/lector/EscenaInteractiva.svelte
(JSON-driven hotspots, CSS + WebAudio reactions, reduced-motion support).
FIRST read: docs/CUENTOS/00_BIBLIA.md, docs/CUENTOS/01_DIRECCION_ARTE.md (sections 4-5:
scenes, reusable pieces, animation tokens), docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md,
docs/CUENTOS/WAVE_PLAN.md (ola C2 table),
saberparatodos/src/components/CacheIndicator.svelte (style reference),
saberparatodos/tests/e2e/pwa-offline-resilience.spec.ts (test conventions).
Constraints: Svelte 5 runes only; hotspots from JSON props, NEVER hardcoded; zero
tokens/telemetry (BR-03/BR-07); free WebAudio only (no audio files, no CDN);
prefers-reduced-motion freezes motion; neutral Spanish labels; art tokens only;
absolute paths from repo root.
Verify with: npm run test -- escena ; npx astro check. Done = tests pass + no empty PR.
```

## 6. Existing Code Patterns

- `saberparatodos/tests/e2e/pwa-offline-resilience.spec.ts` — repo Playwright style to mirror for any interaction test.
- `docs/CUENTOS/01_DIRECCION_ARTE.md` sections 3-5 — reusable pieces (`piezas/`), 800x450 3-plane scenes, animation tokens `--t-bote`/`--t-respira`, reduced-motion rule.
- C1.04 art components (`arte/*`, `EscenaSVG.svelte` if merged) — reuse, do not reimplement scene rendering.
- `saberparatodos/src/components/CacheIndicator.svelte` — Tailwind + component style reference.

## 7. Acceptance Criteria (command-verifiable)

- [ ] Scene renders with hotspots generated from the JSON `hotspots` array (2-3 zones); zero hardcoded coordinates in the component.
- [ ] Tapping each hotspot triggers its defined reaction (jump/spin/sound) — asserted via class/state change in test.
- [ ] Hotspots are keyboard-focusable (`tabindex`/button role) with neutral-Spanish accessible names.
- [ ] With `prefers-reduced-motion` emulated, no motion occurs (final pose only).
- [ ] `npx astro check` passes: `cd saberparatodos && npx astro check`.
- [ ] No external requests for reactions (WebAudio oscillator only; grep for http/audio-file imports returns empty).

## 8. Files to Modify

| File | Action | Risk |
|------|--------|------|
| `saberparatodos/src/components/cuentos/lector/EscenaInteractiva.svelte` | CREATE | Medium (SVG interaction + motion rules) |
| Unit/interaction test for hotspots | CREATE | Low |

## 9. DO NOT Touch

- `.gitcore/features.json` (reconciled at wave end, never inside issues).
- `questions_data/cuentos/**` story content (owned by olas C3/C4).
- C1 files outside this island (`cuento-schema.ts`, `validate_cuentos.js`, `generate-cuento-packs.js`, art pieces) — READ-ONLY reference.
- Secrets: `.env`, `SUPABASE_SERVICE_ROLE_KEY`, any token/key file.
- Deploy/CI config (`wrangler.json`, workflows), `dist/`, `node_modules/`.
- Other countries' bundles or unrelated components/pages.

## 10. Anti-Hallucination Guard

1. READ every file listed in section 6 before writing a single line; cite file paths with line numbers in the PR description.
2. Svelte 5 runes ONLY (`$state`, `$props`, `$derived`, `$effect`); legacy `$:` reactive statements and `export let` are forbidden in new code.
3. NEVER use Svelte template syntax (`{#if}`, `{#each}`, `{#await}`) inside `.astro` files — Astro components use JSX-like expressions only.
4. Use ABSOLUTE paths from the repo root (`saberparatodos/src/...`) in all docs and PR text; verify each path exists with `ls` before referencing it.
5. Do NOT invent APIs: only Web platform / `supabase-js` / Playwright APIs confirmed by the section-3 research may be used; no guessed function names.

## 11. PR Delivery Requirements (anti-empty-PR)

- The PR MUST add real implementation code in the files of section 8 — a docs-only or empty diff will be rejected (`git diff --stat` must show added source lines, not just markdown).
- Include the new test/spec file with passing assertions; CI green (`npm run test`, `npx astro check`) is required before merge.
- UI issues (C2.01/C2.03/C2.04) MUST attach before/after screenshots (desktop 1280px + mobile 390px) in the PR body.
- PR body MUST list: sources consulted (section 3), files changed with absolute paths, verification commands run with output, and confirmation of zero telemetry (BR-03/BR-07).

## 12. Verification, Dependencies & Merge Order, Failure Recovery

### Verification (bash)

```bash
cd saberparatodos && npm run test -- escena && npx astro check
ls src/components/cuentos/lector/EscenaInteractiva.svelte
```

### Dependencies & Merge Order

- Merge order position: **4 of 6** in ola C2.
- Depends on C1.03/C1.04 (pack JSON `hotspots` + art pieces). Independent of C2.01-C2.03 (parallel-safe). Consumed by C2.01 reader page view and C2.06 e2e. Merge FOURTH.

### Failure Recovery

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Hotspots misaligned | Assumed coordinates, never read JSON | Log/READ real pack `hotspots`, use percentage-based positioning |
| Motion plays under reduced-motion | Missing media query | Gate ALL keyframes + JS motion behind the media query + test |
| Sound fails silently | Autoplay policy blocks AudioContext | Resume context on user gesture only, never auto-play |
| SVG too heavy on mobile | >60 nodes per scene | Reuse piezas components, count nodes in review |
