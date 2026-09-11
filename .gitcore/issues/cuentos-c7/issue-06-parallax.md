# [Ola C7.06] feat-cuentos-c7: parallax 2.5D en escenas SVG — CSS/rAF, sin Three.js

> Ola C7 redesign part B — 2.5D parallax. Merge order: AFTER C7.05, parallel with 06-08 (2-4/4) | Risk: MEDIUM | Effort: Large 5-6h
> Disjoint island: `saberparatodos/src/components/cuentos/arte/*` (NEW layered scenes + parallax component) + `saberparatodos/src/components/cuentos/lector/EscenaInteractiva.svelte` (wire-up only). NO Three.js, NO new npm deps (GSAP is NOT installed — pure CSS + rAF).

---

## 1. Current State (MEDIBLE)

- Scenes are FLAT single-file SVGs: `questions_data/cuentos/*/escenas/p*.svg` (viewBox `0 0 800 450`), rendered by `saberparatodos/src/components/cuentos/arte/EscenaSVG.svelte` with zero motion beyond C6-era timelines.
- Interaction exists in `saberparatodos/src/components/cuentos/lector/EscenaInteractiva.svelte` (hotspots + reduced-motion, C2.04) but there is NO depth: no layers, no pointer parallax, no tilt.
- Reusable vector pieces exist: `saberparatodos/src/components/cuentos/arte/piezas/` (`arbol, estrella, luna, nube, ojos, ola, sol` + more) + `tokens.css`.
- Parity target (`docs/CUENTOS/REDISENO_STORYCOMET.md` §1 items 6-7, §2 C7.06): layered diorama scenes with parallax on move/touch + touch reaction + reduced-motion. Key insight from the spec: parity does NOT need Three.js — 2D layers + parallax ARE the effect.

## 2. Desired State (DELTA — layered pilot + reusable mechanism)

1. **NEW `EscenaParallax.svelte`** in `saberparatodos/src/components/cuentos/arte/`: takes exactly 3 layer slots (`fondo`, `medio`, `frente`, each an inline SVG group or `<use>` of piezas), and:
   - Pointer parallax on desktop (pointermove → per-layer `translate3d` with depth factors e.g. 6/12/20px max) + device-tilt (`deviceorientation`, guarded, opt-in) + touch-drag on mobile, all via ONE rAF loop with lerp smoothing.
   - Touch reaction: tap on the scene triggers a one-shot CSS bounce/wiggle on the `frente` layer + an optional WebAudio-synth blip reusing the C2 interaction pattern (free, no audio files).
   - `prefers-reduced-motion`: renders the 3 layers statically composed, zero listeners, zero rAF ( Robertson-tier: no motion at all, not "slower motion").
   - PERF RULE: animate `transform` and `opacity` ONLY. No `left/top/width/filter` animation anywhere in the new files.
2. **Pilot migration:** split ALL 8 scenes of ONE pilot cuento (`tana-tucan-comparte`, the seed) into 3 planes each, reusing `piezas/` shapes (sky/sun/clouds → fondo; trees/characters → medio; grass/foreground props → frente). New files live under `arte/escenas-capas/tana/p<N>-<plano>.svg` (or one file with 3 `<g id="plano-*">` groups — either is acceptable, document the choice in the PR). Other 9 cuentos keep flat scenes (phase 2, same pattern).
3. **Wire-up:** `EscenaInteractiva.svelte` renders `EscenaParallax` when layered planes exist for the page, else falls back to the current flat `EscenaSVG` path (no regression for the other 9 cuentos). Svelte 5 runes (`$props`, `$state`, `$effect`), no Svelte-in-`.astro` violations.
4. **Constraints:** NO Three.js (AC greps for it); NO GSAP (not installed — do NOT add it); zero new npm deps; BR-03/BR-07 (zero tokens/karma/telemetry); reduced-motion; unlisted routes unchanged.

## 3. Web Research Required (4-6 queries, MANDATORY before writing)

1. search: "SVG layered parallax pointermove requestAnimationFrame lerp tutorial"
2. search: "parallax 2.5D CSS transform only 60fps translate3d will-change"
3. search: "deviceorientation parallax mobile web permission iOS guard"
4. search: "prefers-reduced-motion parallax disable best practice accessible animation"
5. search: "Svelte 5 runes pointer events reusable component props children snippet"

## 4. Agent Session Prompt

"Before writing, please: 1. Read `docs/CUENTOS/REDISENO_STORYCOMET.md` FULL (§1 items 6-7, §2 C7.06, §4 parity definition) + `docs/CUENTOS/01_DIRECCION_ARTE.md` (§3-4 palettes/shapes) + `docs/CUENTOS/WAVE_PLAN.md` (hard constraints: BR-03/BR-07, Svelte 5 runes, no JSX in .astro). 2. Read `saberparatodos/src/components/cuentos/arte/EscenaSVG.svelte` + `piezas/*.svg` + `tokens.css` + `saberparatodos/src/components/cuentos/lector/EscenaInteractiva.svelte` COMPLETOS and reuse their patterns. 3. Research the queries above (rAF parallax + reduced-motion). 4. Build EscenaParallax + migrate the 8 Tana scenes + wire the fallback. 5. Run every command in §11 including desktop+mobile screenshots."

## 5. Existing Code Patterns (MUST follow)

- `arte/EscenaSVG.svelte` → how scenes are loaded/sized (viewBox `0 0 800 450`); keep its props contract for the flat fallback.
- `arte/piezas/*.svg` → reusable shapes via `<use>`; layered scenes MUST reuse piezas before drawing new shapes (consistent art direction, less weight).
- `arte/tokens.css` → night/cream/gold palette (`#121832`, `#FFF9DC`, `#D4A94E` per REDISENO_STORYCOMET.md §1.1).
- `lector/EscenaInteractiva.svelte` → hotspot + reduced-motion pattern (C2.04); extend the same `matchMedia('(prefers-reduced-motion: reduce)')` guard, do not invent a second one.
- `lector/EscenaInteractiva.test.ts` → component test style; add parallax tests in the same harness (vitest).

## 6. Acceptance Criteria (VERIFICABLES POR COMANDO)

- [ ] `test -f saberparatodos/src/components/cuentos/arte/EscenaParallax.svelte` + `ls saberparatodos/src/components/cuentos/arte/escenas-capas/tana/ | wc -l` >= 8 (one layered asset per pilot page; 8 files with 3 groups OR 24 plane files — either counts if every page resolves 3 planes).
- [ ] `grep -riE "three|webgl|@types/three|threejs" saberparatodos/src/components/cuentos/ | wc -l` == 0 (NO Three.js anywhere in the island).
- [ ] `git diff HEAD --stat -- saberparatodos/package.json` empty (zero new deps; GSAP must NOT appear).
- [ ] Motion hygiene: `grep -nE "animate\ Sassoon|left|top *(anim)|width *(anim)"` — concretely: `grep -nE "\.(left|top|width|height|filter)[[:space:]]*:" saberparatodos/src/components/cuentos/arte/EscenaParallax.svelte | wc -l` == 0 AND `grep -c "translate3d\|translate(" .../EscenaParallax.svelte` >= 1 (transform-only motion).
- [ ] Reduced-motion: component source contains `prefers-reduced-motion` AND a unit test forces `matchMedia reduce` and asserts no rAF loop / no listeners (test name contains `reduced-motion`).
- [ ] `cd saberparatodos && npm run test:unit -- src/components/cuentos` green (new + existing tests).
- [ ] `cd saberparatodos && npm run lint` green (astro check + tsc).
- [ ] E2E: extend or add a spec (e.g. `tests/e2e/cuentos-parallax.spec.ts`) that opens a Tana page, asserts 3 plane nodes exist, taps the scene, asserts the frente reaction class, emulates `prefers-reduced-motion` and asserts static render; `npm run test -- <spec>` green on chromium.
- [ ] Visual captures (committed under `docs/CUENTOS/review/`): desktop + mobile screenshots of one layered Tana spread (mid-parallax state is fine) + one reduced-motion screenshot. Review with vision PASS = planes visibly composed, no overlap glitches.
- [ ] Fallback: a non-pilot cuento page (e.g. Bruno p1) still renders the flat scene — e2e or manual screenshot proves no regression.
- [ ] Zero console errors during the e2e run.

## 7. Files to Modify

| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/cuentos/arte/EscenaParallax.svelte` | NEW | 3-layer parallax component (pointer/tilt/touch + reaction + reduced-motion) | MEDIUM — new motion core |
| `saberparatodos/src/components/cuentos/arte/escenas-capas/tana/*` | NEW | 8 layered scenes reusing piezas | LOW |
| `saberparatodos/src/components/cuentos/arte/EscenaParallax.test.ts` | NEW | Unit tests (planes render, reduced-motion, fallback) | LOW |
| `saberparatodos/src/components/cuentos/lector/EscenaInteractiva.svelte` | C2.04 version | Conditional wire-up: layered → Parallax, else flat path untouched | MEDIUM — shared reader file |
| `saberparatodos/tests/e2e/cuentos-parallax.spec.ts` | NEW | E2E (planes, tap reaction, reduced-motion, fallback) | LOW |
| `docs/CUENTOS/review/parallax-*.png` | NEW | desktop + mobile + reduced-motion captures | LOW |

## 8. DO NOT touch (Anti-Regression)

- `questions_data/cuentos/**` — content frozen after C7.05 (this issue reads scenes, never edits them).
- `saberparatodos/scripts/validate_cuentos.js`, `cuento-schema.ts`, `generate-cuento-packs.js` — C7.05 island.
- `saberparatodos/src/components/cuentos/lector/CuentoReader.svelte`, `QuizCuento.svelte`, `read-aloud.ts` — sibling islands (C7.07/C7.08, part A).
- `saberparatodos/src/pages/cuentos/**` — part-A shell/door/spread island.
- `saberparatodos/public/audio/**`, `public/v1/cuentos/**` (regenerate only if the generator changes — it doesn't here).
- `.gitcore/features.json` — orchestrator reconciles at wave end.
- No new npm deps (especially no `gsap`, no `three`); no CDN scripts; no paid APIs; no `$SWAL`/karma/telemetry (BR-03); kids routes stay unlisted (`noindex`, out of sitemap).

## 9. Anti-Hallucination Guard ⚠️

1. **READ before write**: `EscenaInteractiva.svelte` + `EscenaSVG.svelte` + 2-3 piezas COMPLETOS. The wire-up must match the real props, not imagined ones.
2. **No ghost libraries**: GSAP and Three.js are NOT in `package.json` — verify with `grep -i "gsap\|three" saberparatodos/package.json` (expect 0) and never import them.
3. **Planes must be real**: every pilot page resolves fondo+medio+frente at runtime — assert all 3 nodes in e2e, never assume the split worked.
4. **Reduced-motion is off, not slow**: `reduce` = static composition, zero rAF. A "slower parallax" implementation FAILS the AC.
5. **60fps means transform/opacity**: if a frame profiler isn't available, the §6 grep (no layout-property animation) + a manual 10s interaction soak with zero jank observed on mobile emulation is the evidence; state honestly what was measured.
6. **One cuento only**: do NOT "improve" other cuentos' scenes — 9 flat fallbacks must keep rendering pixel-identical.

## 10. PR Delivery Requirements (ANTI-EMPTY-PR) — OBLIGATORIO

- [ ] `git status --porcelain` shows new/modified files BEFORE opening PR.
- [ ] `git diff --stat HEAD` non-empty; PR contains ≥12 files (component + test + wire-up + spec + ≥8 layered assets + screenshots).
- [ ] PR body: §6 checklist with commands + outputs pasted (three-grep == 0, package.json diff empty, vitest + playwright results).
- [ ] Screenshots embedded or linked (desktop + mobile + reduced-motion).
- [ ] If work incomplete: NO PR — comment blocker on issue.

## 11. Verification

```bash
grep -i "gsap\|three" saberparatodos/package.json | wc -l  # expect 0
grep -riE "three|webgl" saberparatodos/src/components/cuentos/ | wc -l  # expect 0
ls saberparatodos/src/components/cuentos/arte/escenas-capas/tana/ | wc -l  # expect >= 8
grep -n "prefers-reduced-motion" saberparatodos/src/components/cuentos/arte/EscenaParallax.svelte
cd saberparatodos && npm run test:unit -- src/components/cuentos && npm run lint
npm run test -- cuentos-parallax
```

## 12. Dependencies & Merge Order

- **Depends on:** C7.05 merged FIRST (this issue rebases onto it; no code overlap but wave discipline) + part-A C7.01-C7.04 merged (shell/door/spread the scenes render inside).
- **Parallel with:** C7.07, C7.08 after C7.05 (disjoint islands, verified: arte+EscenaInteractiva vs lector-audio vs quiz/loader).
- **Merge order within wave:** 2-4/4 (any order among 06/07/08 once 05 is in).
- **Expected effort:** Large 5-6h (component + 8 layered scenes + tests + e2e + captures).

## 13. Failure Recovery

| If this happens | Action |
|----------------|--------|
| Tilt API needs permission (iOS) or is absent | Guard with feature-detect; pointer/touch parallax is the baseline, tilt is progressive enhancement only |
| Layered planes misalign (overlap glitches) | Fix viewBox/group coordinates in the layered asset; never scale via CSS to hide it |
| e2e tap reaction flakes | Assert the reaction CLASS on frente, not pixel positions; add rAF settle wait |
| `EscenaInteractiva` conflicts with sibling C7 branches | Rebase on main; keep the wire-up a minimal conditional so merges stay trivial |
| Jank on mobile emulation | Reduce max translate distances, confirm `will-change: transform` only on the 3 layers, re-soak 10s |
