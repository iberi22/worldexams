# [Ola C1.04] feat-cuentos-art — art system tokens, piezas, EscenaSVG

## Current State

Measured on repo root (`/home/belal/proyectosSWAL/apps/worldexams`, commit `594d19aee`):

- `saberparatodos/src/components/cuentos/` does NOT exist. The art law exists only as prose: `docs/CUENTOS/01_DIRECCION_ARTE.md` (80 lines — palette bone `#FDF6EC`, ink `#3A2E2A`, mango `#FF9F43`, water-green `#4FB6A3`, comet-blue `#5B6FD6`, terracotta `#E26D5A`; 10 per-cuento signature colors; motion tokens `--t-bote/--t-respira/--t-aparece/--t-meneo`; scenes `viewBox 0 0 800 450`, 3 planes, max 60 nodes; reusable pieces in `piezas/`; read-aloud highlight `#FFE3B3` + scale 1.06; quiz confetti 12 pieces/1.2s; checklist: `< 25 KB` per character, `< 60 KB` per scene, `grep -c "image\|base64" == 0`).
- Only SVG in existence: `questions_data/cuentos/tana-tucan-comparte/personajes/tana.svg` (30 lines, 1559 bytes, copyright comment line 1, `viewBox="0 0 200 200"`, circles+ellipses+2-triangle beak, shared eye template) — the construction pattern to systematize. No `escenas/` dir, no `piezas/` dir, no shared eyes partial.
- Svelte pattern: `src/components/AdBlock.svelte` (`<script lang="ts"> interface Props`, `let {...}: Props = $props()`, Svelte `5.55.9` runes). Styling: Tailwind `^4.2.2`; cuentos are an explicit exception to the dark edge-hive theme (warm bone background, not dark).
- No CSS tokens file for cuentos exists; no component renders a cuento scene yet (reader is C2).

## Desired State

Delta: add ONE new island — `saberparatodos/src/components/cuentos/arte/` containing: (a) `tokens.css` (palette custom props, the 4 motion tokens, read-aloud highlight, `prefers-reduced-motion` freeze-to-final-pose rules); (b) `piezas/` with at least `sol.svg`, `luna.svg`, `nube.svg`, `arbol.svg`, `ola.svg`, `estrella.svg` + shared `ojos.svg` partial, each `< 25 KB`, pure vector, copyright comment line 1, no text inside SVG; (c) `EscenaSVG.svelte` (Svelte 5 runes, JSON-serialisable props `{ escena: { fondo, medio, frente } piezas[], hotspots[], tituloAccesible }`, renders composed `<svg viewBox="0 0 800 450" role="img" aria-label>` with `<title>`, CSS-only motion classes, reduced-motion safe) plus `EscenaSVG.test.ts` (vitest, `>=20` lines, `>=3` cases: renders 3 planes, `aria-label` present, no `image|base64` strings in piezas). One demo scene composed for the seed (selva: sol+nube+arbol) proving composition-over-redrawing. Text stays in HTML, never inside SVG.

Hard constraints (apply to this issue and all C1 work): **BR-03/BR-07** — zero `$SWAL` tokens, zero karma, zero telemetry/analytics in any kids flow; art components must not import analytics, ads (`AdBlock.svelte` is BANNED from cuentos routes), or tracking. Copyright headers required (HTML comment line 1 in every SVG per §1 of format doc). Neutral Spanish only (aria-labels, titles). Free Web Speech API only later (no audio assets from paid TTS here). NO Three.js in cuentos — CSS keyframes + basic SMIL only (explicit reversible decision in art doc §5).

## Web Research Required

Agent MUST run at least 4 of these queries and cite results in the PR description:

1. `Svelte 5 runes $props $state SVG component interactive example`
2. `SVG reusable symbols use href sprite vs inline composition performance`
3. `prefers-reduced-motion CSS animations freeze final pose accessibility`
4. `SVG file size optimize nodes circles ellipses illustration kids`
5. `aria-label role img SVG accessible title desc best practice`
6. `CSS custom properties design tokens theming light warm palette`

## Agent Session Prompt

```text
You are implementing C1.04 (cuento art system) in the WorldExams monorepo at repo root.
READ FIRST, in this order, before writing any code:
1. docs/CUENTOS/01_DIRECCION_ARTE.md (ALL of it — it is the visual law; you execute, not reinvent)
2. docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md §1 (copyright header per SVG) + §2 (neutral Spanish)
3. questions_data/cuentos/tana-tucan-comparte/personajes/tana.svg (30 lines — construction pattern: circles+ovals+rounded rects, shared eyes, max 2-stop gradients, signature color)
4. saberparatodos/src/components/AdBlock.svelte (Svelte 5 runes $props() pattern to imitate)
5. C1.01 saberparatodos/src/lib/cuentos/cuento-schema.ts IF merged (CuentoHotspot shape for EscenaSVG props; if unmerged, define hotspot props locally and document mapping)

TASK: create saberparatodos/src/components/cuentos/arte/ with:
(a) tokens.css — :root custom props for the 6 palette colors + 10 signature colors + --t-bote (0.6s bounce),
--t-respira (2.4s loop), --t-aparece (0.5s fade+rises), --t-meneo (±6° 0.8s), read-aloud highlight (#FFE3B3 + scale 1.06,
0.15s), quiz correct/incorrect classes, and a @media (prefers-reduced-motion: reduce) block freezing everything
to final pose. Warm bone #FDF6EC base — NOT the dark edge-hive theme.
(b) piezas/sol.svg, luna.svg, nube.svg, arbol.svg, ola.svg, estrella.svg + ojos.svg partial — each pure vector
(no image/base64), copyright HTML comment line 1, no text elements, complementary to tana.svg construction rules.
(c) EscenaSVG.svelte — <script lang="ts"> interface Props with JSON-serialisable props only
{ piezas: {src: string; x: number; y: number; escala?: number}[], hotspots?: {id,x,y,etiqueta}[], tituloAccesible: string },
renders <svg viewBox="0 0 800 450" role="img" aria-label={tituloAccesible}><title>…</title> 3 <g> planes
(fondo/medio/frente), motion via tokens.css classes only. Hotspots render as <g> markers — interactivity is C2.04,
here only data-driven markers, nothing hardcoded.
(d) EscenaSVG.test.ts (vitest, >=20 lines, >=3 it/describe): 3 planes render, aria-label/<title> present,
all piezas/*.svg pass grep image|base64 == 0 and size < 25 KB. Plus ONE demo selva scene for the seed
(sol+nube+arbol composed, < 60 KB) proving piezas compose. Neutral Spanish labels. No $SWAL/karma/telemetry.
No text inside SVG. No Three.js. No Ads.
VERIFY: wc -c piezas + grep image|base64 == 0 && npx vitest run src/components/cuentos/arte/ && attach desktop+mobile screenshots of the demo scene (regla visual BELA).
```

## Existing Code Patterns

- `questions_data/cuentos/tana-tucan-comparte/personajes/tana.svg`: 30-line construction law (comment-labeled parts, `role="img"` + `aria-label`, shared eye circles, signature color `#FF9F43`, stroke-width 3–4 round caps, no gradients beyond 2 stops).
- `saberparatodos/src/components/AdBlock.svelte`: Svelte 5 `interface Props` + `$props()` destructuring with defaults; `<style>` colocated — imitate for `EscenaSVG.svelte` (but NEVER import AdBlock/ads into cuentos).
- `saberparatodos/src/pages/preguntas/[...slug].astro`: `{cond && (...)}` conditionals, `set:html` JSON-LD — pages that will host `EscenaSVG` in C1.05 must pass only JSON-serialisable props.
- `docs/CUENTOS/01_DIRECCION_ARTE.md` §7: delivery checklist (size caps, vector purity, 48px favicon recognizability, reduced-motion, desktop+mobile captures) — the acceptance backbone.
- Tailwind `^4.2.2` utilities for layout around the SVG; motion itself lives in `tokens.css` keyframes, not Tailwind animate classes (portable to SMIL later).

## Acceptance Criteria

Command-verifiable (run from repo root unless noted):

1. `test -f saberparatodos/src/components/cuentos/arte/tokens.css && test -f saberparatodos/src/components/cuentos/arte/EscenaSVG.svelte && echo OK`
2. `ls saberparatodos/src/components/cuentos/arte/piezas/*.svg | wc -l` → `>= 7` (sol, luna, nube, arbol, ola, estrella, ojos)
3. `for f in saberparatodos/src/components/cuentos/arte/piezas/*.svg; do head -1 "$f" | grep -q '© 2026 SaberParaTodos' || echo "NO-HEADER: $f"; done` → no output (all headers)
4. `grep -lE 'image|base64' saberparatodos/src/components/cuentos/arte/piezas/*.svg` → exit 1 (zero matches, pure vector)
5. `for f in saberparatodos/src/components/cuentos/arte/piezas/*.svg; do wc -c "$f"; done` → each `< 25600` bytes (25 KB); demo scene `< 61440` (60 KB)
6. `grep -cE '<text|three|Three' saberparatodos/src/components/cuentos/arte/EscenaSVG.svelte saberparatodos/src/components/cuentos/arte/piezas/*.svg` → `0` for `<text` and three (no SVG text, no Three.js)
7. `grep -c 'prefers-reduced-motion' saberparatodos/src/components/cuentos/arte/tokens.css` → `>= 1`
8. `cd saberparatodos && npx vitest run src/components/cuentos/arte/` → exit 0, test file `>= 20` lines with `>= 3` describe/it
9. `grep -riE '\$SWAL|karma|telemetry|adsbygoogle|AdBlock' saberparatodos/src/components/cuentos/` → exit 1 (zero matches)

## Files to Modify

| File | Change | Risk |
|------|--------|------|
| `saberparatodos/src/components/cuentos/arte/tokens.css` | NEW: palette + motion + highlight + reduced-motion | Low — new file, opt-in import |
| `saberparatodos/src/components/cuentos/arte/piezas/*.svg` (7+) | NEW: reusable vector pieces + ojos partial | Low — static assets |
| `saberparatodos/src/components/cuentos/arte/EscenaSVG.svelte` | NEW: 3-plane composed scene renderer, runes props | Low — no consumers yet (C1.05/C2.04 consume) |
| `saberparatodos/src/components/cuentos/arte/EscenaSVG.test.ts` | NEW: `>=20` lines, `>=3` cases | Low — test only |
| Demo selva scene SVG | NEW: proves composition, `< 60 KB` | Low — fixture |

## DO NOT touch

- `.gitcore/features.json` (reconciled at wave end, never inside issues)
- `questions_data/cuentos/**` existing content (`tana.svg` is reference, not to redraw; C3 owns characters/scenes)
- `saberparatodos/src/lib/cuentos/*` (C1.01), `scripts/*` (C1.02/C1.03), `src/pages/**` (C1.05)
- Global Tailwind config / edge-hive dark theme (cuentos exception lives in `tokens.css` only)
- `clientes/`, `externos/`, `archivo/`, any `.env`/secrets, deploy workflows
- No Three.js, no paid TTS, no ads/analytics imports in cuentos code

## Anti-Hallucination Guard

1. READ before write: open the full art direction doc, `tana.svg`, and `AdBlock.svelte` first; every color/token/value must match `01_DIRECCION_ARTE.md` exactly (`#FDF6EC`, `#3A2E2A`, `--t-bote` etc.) — never invent palette hexes.
2. Svelte 5 runes only (`$props()`/`$state()`/`$effect()`); `interface Props` + destructuring with defaults; no `export let`, no Svelte 3/4 syntax.
3. Astro `.astro` files have NO `{#if}` syntax — use ternaries/`&&`/`.map()`; `EscenaSVG.svelte` uses Svelte `{#if}`/`{#each}` ONLY inside `.svelte`, never suggest them for `.astro` consumers.
4. Absolute paths from repo root in comments, test fixtures, and PR text (`saberparatodos/src/components/cuentos/arte/...`).
5. Svelte props JSON-serialisable: `EscenaSVG` props are `string|number|boolean|plain arrays/objects` only — no functions, stores, or class instances cross the Astro→Svelte boundary.
6. Never put text inside SVG (`<text>` is an ERROR per art doc §6 — accessibility + translation); never hardcode hotspot behavior (C2.04 owns interactivity; here markers are data-driven only).

## PR Delivery Requirements

ANTI-EMPTY-PR (all must hold, else the PR is invalid):

- `git status --porcelain` non-empty AND diff-stat shows `>= 1` file; key source file `EscenaSVG.svelte` AND `tokens.css` in the diff (SVG-only PRs without the component are invalid for this issue).
- Never open a PR with zero changes or with only test/screenshot files.
- Test file `>= 20` lines with `>= 3` `describe/it`; attach desktop + mobile screenshots of the demo scene (regla visual BELA) in the PR description.
- PR description cites web-research queries, pastes the size/purity grep outputs, and confirms zero `$SWAL`/karma/telemetry/ads/Three.js strings.

## Verification

```bash
cd /home/belal/proyectosSWAL/apps/worldexams
ls saberparatodos/src/components/cuentos/arte/ saberparatodos/src/components/cuentos/arte/piezas/
for f in saberparatodos/src/components/cuentos/arte/piezas/*.svg; do wc -c "$f"; head -1 "$f"; done
grep -lE 'image|base64' saberparatodos/src/components/cuentos/arte/piezas/*.svg && echo IMPURE || echo PURE-VECTOR
grep -c '<text' saberparatodos/src/components/cuentos/arte/piezas/*.svg saberparatodos/src/components/cuentos/arte/EscenaSVG.svelte || echo NO-SVG-TEXT
grep -c 'prefers-reduced-motion' saberparatodos/src/components/cuentos/arte/tokens.css
cd saberparatodos && npx vitest run src/components/cuentos/arte/
grep -riE '\$SWAL|karma|telemetry|adsbygoogle' src/components/cuentos/ && echo FORBIDDEN-FOUND || echo CLEAN
git status --porcelain && git diff --stat HEAD
```

## Dependencies & Merge Order

Wave C1 merges strictly 1→6:

1. C1.01 schema — `CuentoHotspot` shape informs `EscenaSVG` hotspot props.
2. C1.02 validator — will later enforce scene size/purity rules (this issue defines the checkable facts).
3. C1.03 packs — `imagen`/`hotspots` JSON fields point at piezas/scenes built here.
4. **C1.04 (this)** — parallel-safe island; blocks C1.05 (pages embed `EscenaSVG`), C2.04 (hotspot interactivity), C3/C4 (characters/scenes follow this system).
5. C1.05 Astro pages — first consumer of `tokens.css` + `EscenaSVG`.
6. C1.06 license audit — greps SVG headers wave-wide.

## Failure Recovery

| Failure | Recovery |
|---------|----------|
| A pieza exceeds 25 KB | Simplify paths (fewer nodes, 2-stop gradients max), split detail into a second composable pieza — never rasterize or base64-embed |
| `grep image\|base64` false-positive (e.g. word "imagery" in a comment) | Rename the comment wording; the purity grep is normative for the audit (C1.06 reuses it) |
| Svelte 5 runes API mismatch (`$props` typing errors) | Re-read `AdBlock.svelte` + installed Svelte `^5.55.9` types; keep props flat and JSON-serialisable; do not downgrade to legacy `export let` |
| Reduced-motion test hard to automate | Assert the media-query block EXISTS in `tokens.css` + final-pose classes apply without animation classes; manual screenshot check covers the rest |
| Empty-PR risk (only SVGs, no component) | Verify `git diff --stat` lists `EscenaSVG.svelte` + `tokens.css` before opening the PR |
