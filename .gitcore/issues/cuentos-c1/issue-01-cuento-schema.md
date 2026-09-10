# [Ola C1.01] feat-cuentos-schema — TypeScript schema + types for cuento format v1

## Current State

Measured on repo root (`/home/belal/proyectosSWAL/apps/worldexams`, commit `594d19aee`):

- `saberparatodos/src/lib/cuentos/` does NOT exist (`ls` returns MISSING). Zero TypeScript types exist for cuentos anywhere (`search_files` for `cuento-schema` returns 0 hits).
- The only machine-readable spec of format v1 is prose: `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` (79 lines) plus the live seed `questions_data/cuentos/tana-tucan-comparte/cuento.md` (`wc`: 100 lines, 4171 bytes) with a 12-field frontmatter (`slug, titulo, edad, idioma, eje, habitat, valor, personajes, paginas, license, version` + HTML copyright comment on line 1), 8 `## Pagina N` sections each with one `![alt: ...]` image, and a `## Quiz` block with exactly 3 `### Pregunta N` (3 options A-C, exactly one `- [x]`, each option followed by `<!-- feedback: ... -->`) plus a final `### Explicacion`.
- Validator pattern to imitate: `saberparatodos/scripts/validate_content.js` (545 lines, `gray-matter` based, `--strict-v3 --fail-on-error` flags). Unit-test pattern: colocated `saberparatodos/src/lib/*.test.ts` run with `npm run test:unit` (`vitest run`, vitest `^4.0.16`). Stack: Astro `^7.3.1`, Svelte `^5.55.9`, Tailwind `^4.2.2`.
- Nothing imports a cuento type yet; C1.02–C1.05 all depend on this schema.

## Desired State

Delta: add ONE new island — `saberparatodos/src/lib/cuentos/cuento-schema.ts` exporting readonly TypeScript interfaces (`CuentoFrontmatter`, `CuentoPagina`, `QuizPregunta`, `QuizOpcion`, `CuentoHotspot`, `Cuento`) plus a `parseCuentoMd()` pure function (markdown string → typed `Cuento`, no I/O) that mirrors format v1 exactly, plus colocated `cuento-schema.test.ts`. No runtime behavior changes; downstream issues (validator, pack generator, pages) consume these types.

Hard constraints (apply to this issue and all C1 work): **BR-03/BR-07** — zero `$SWAL` tokens, zero karma, zero telemetry/analytics in any kids flow or cuento type (no such fields in the schema). Copyright headers required on new content files per `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` §1. Neutral Spanish only in any sample strings. Free Web Speech API only for future read-aloud (no paid TTS dependency here). NO Three.js anywhere in cuentos.

## Web Research Required

Agent MUST run at least 4 of these queries and cite results in the PR description:

1. `gray-matter parse YAML frontmatter node ESM usage 2025`
2. `zod vs valibot lightweight validation astro content 2025` (decide: hand-rolled types + guard vs micro-dependency; prefer zero new deps)
3. `TypeScript readonly interfaces discriminated union best practice`
4. `vitest colocated unit test astro project example`
5. `JSON-serialisable props Svelte 5 runes $props constraint`
6. `schema.org Book/CreativeWork JSON-LD children book fields` (reserve optional SEO fields only, do not implement pages here)

## Agent Session Prompt

```text
You are implementing C1.01 (cuento format-v1 schema+types) in the WorldExams monorepo at repo root.
READ FIRST, in this order, before writing any code:
1. docs/CUENTOS/00_BIBLIA.md
2. docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md (§3 format v1 is normative)
3. questions_data/cuentos/tana-tucan-comparte/cuento.md (100-line seed; your parser MUST round-trip it)
4. saberparatodos/scripts/validate_content.js lines 1-120 (gray-matter + error-shape pattern to imitate)
5. saberparatodos/src/components/AdBlock.svelte (Svelte 5 runes $props() pattern)

TASK: create saberparatodos/src/lib/cuentos/cuento-schema.ts with readonly interfaces
CuentoFrontmatter (12 fields incl. license:"PROPRIETARY-FREE-READ", version:1),
CuentoPagina {n, alt, imagen, texto, wordCount}, QuizOpcion {letra, texto, correcta, feedback},
QuizPregunta {n, texto, opciones:[3]}, CuentoHotspot {id, x, y, etiqueta, accion},
Cuento {frontmatter, paginas:[8-10], quiz:[3], explicacion, hotspots} and a pure
parseCuentoMd(md:string): Cuento that parses the seed file exactly (frontmatter via gray-matter
if available in saberparatodos/package.json, else minimal built-in YAML-subset parser — check first,
add NO new dependency without asking). Word count per page 30-80 is EXPOSED as data, not enforced here
(enforcement is C1.02). Write saberparatodos/src/lib/cuentos/cuento-schema.test.ts (>=20 lines,
>=3 describe/it) covering: seed parses to 8 pages + 3 quiz questions, frontmatter fields typed,
malformed input throws a typed CuentoParseError with file/line info. Run npx vitest run on the new test.
Absolute paths from repo root in all docs/comments. Neutral Spanish in sample strings. No $SWAL/karma/telemetry
fields. No Three.js. No paid TTS.
VERIFY: npx vitest run src/lib/cuentos/cuento-schema.test.ts && npx tsc --noEmit -p . (or astro check).
```

## Existing Code Patterns

- `saberparatodos/scripts/validate_content.js` (545 lines): `import matter from 'gray-matter'`, `ROOT = path.join(__dirname,'..')`, findings array with `{level, file, message}`, `--fail-on-error` exit-code convention. Imitate error shape, not the bundle logic.
- `saberparatodos/src/components/AdBlock.svelte`: `<script lang="ts"> interface Props {...} let {...}: Props = $props();` — Svelte 5 runes; keep any future component props JSON-serialisable.
- `saberparatodos/src/pages/preguntas/[...slug].astro` (426 lines): frontmatter imports + `Astro.params`, `Astro.site` canonical, `{cond && (...)}` conditional rendering (never `{#if}`), inline JSON-LD via `<script is:inline type="application/ld+json" set:html={...}>`.
- Unit tests colocated: `saberparatodos/src/lib/adaptive-engine.test.ts`, `api-service.test.ts` — run via `npm run test:unit` (`vitest run`) from `saberparatodos/`.
- Seed format v1: `questions_data/cuentos/tana-tucan-comparte/cuento.md` (100 lines); SVG pattern: `personajes/tana.svg` (30 lines, copyright HTML comment on line 1, `viewBox="0 0 200 200"`).

## Acceptance Criteria

Command-verifiable (run from repo root unless noted):

1. `test -f saberparatodos/src/lib/cuentos/cuento-schema.ts && test -f saberparatodos/src/lib/cuentos/cuento-schema.test.ts && echo OK`
2. `wc -l saberparatodos/src/lib/cuentos/cuento-schema.test.ts` → `>= 20` lines AND `grep -cE '^\s*(describe|it|test)\(' saberparatodos/src/lib/cuentos/cuento-schema.test.ts` → `>= 3`
3. `grep -c 'CuentoFrontmatter\|CuentoPagina\|QuizPregunta\|parseCuentoMd' saberparatodos/src/lib/cuentos/cuento-schema.ts` → `>= 4`
4. `cd saberparatodos && npx vitest run src/lib/cuentos/cuento-schema.test.ts` → exit 0, all tests pass
5. Seed round-trip: a one-liner node/vitest check parses `../../questions_data/cuentos/tana-tucan-comparte/cuento.md` → 8 pages, 3 quiz questions, `slug === "tana-tucan-comparte"` (covered by test reading the real seed file)
6. `grep -riE '\$SWAL|karma|telemetry|three\.js|threejs' saberparatodos/src/lib/cuentos/` → exit 1 (zero matches)
7. `grep -c 'readonly' saberparatodos/src/lib/cuentos/cuento-schema.ts` → `>= 3`

## Files to Modify

| File | Change | Risk |
|------|--------|------|
| `saberparatodos/src/lib/cuentos/cuento-schema.ts` | NEW: types + `parseCuentoMd()` + `CuentoParseError` | Low — new island, no importers yet |
| `saberparatodos/src/lib/cuentos/cuento-schema.test.ts` | NEW: `>=20` lines, `>=3` describe/it, parses real seed | Low — test only |
| `saberparatodos/package.json` | ONLY if a validator dep is strictly needed (prefer none); note in PR | Medium — must not break install; prefer zero new deps |

## DO NOT touch

- `.gitcore/features.json` (reconciled at wave end, never inside issues)
- `questions_data/cuentos/**` content files (seed is read-only fixture here; C3 owns content)
- `saberparatodos/scripts/validate_content.js`, `generate-static-packs.js` (C1.02/C1.03 islands)
- `saberparatodos/src/pages/**`, `src/components/**` (C1.04/C1.05 islands)
- `clientes/`, `externos/`, `archivo/`, any `.env`/secrets, CI deploy workflows
- Do not add the `jules` label mechanics or discuss labels; just do the work

## Anti-Hallucination Guard

1. READ before write: open and quote all 5 files in the Agent Session Prompt before creating anything; never assume APIs (check `gray-matter` is in `saberparatodos/package.json` before importing it).
2. Svelte 5 runes only (`$props()`/`$state()`/`$effect()`); no legacy `export let` or Svelte 3/4 store auto-subscription syntax in any example code.
3. Astro `.astro` files have NO `{#if}`/`{#each}` Svelte syntax — use `{cond && (...)}` / `.map()`; do not reference `.astro` conditionals in this schema issue at all.
4. Absolute paths from repo root (`saberparatodos/src/lib/...`) in every comment, error message path, and PR text — never relative `../../..` chains presented as canonical.
5. Svelte props must stay JSON-serialisable: schema types contain only `string|number|boolean|arrays|plain objects` — no `Map/Set/Date/class instances/functions` in exported interfaces.
6. If `parseCuentoMd` cannot handle a construct, throw `CuentoParseError` — never silently drop pages/quiz items to make counts pass.

## PR Delivery Requirements

ANTI-EMPTY-PR (all must hold, else the PR is invalid):

- `git status --porcelain` is non-empty AND `git diff --stat HEAD` (or PR diff-stat) shows `>= 1` file changed.
- The key source file `saberparatodos/src/lib/cuentos/cuento-schema.ts` appears in the diff (not tests alone).
- Never open a PR with zero file changes or with only docs/comments and no source+test.
- Test file `>= 20` lines with `>= 3` `describe/it/test()` blocks; full suite green: `cd saberparatodos && npm run test:unit`.
- PR description cites the web-research queries used, lists verification commands with real output pasted, and confirms zero `$SWAL`/karma/telemetry/Three.js strings.

## Verification

```bash
cd /home/belal/proyectosSWAL/apps/worldexams
test -f saberparatodos/src/lib/cuentos/cuento-schema.ts && echo SCHEMA-OK
test -f saberparatodos/src/lib/cuentos/cuento-schema.test.ts && echo TEST-OK
wc -l saberparatodos/src/lib/cuentos/cuento-schema.test.ts
grep -cE '^\s*(describe|it|test)\(' saberparatodos/src/lib/cuentos/cuento-schema.test.ts
cd saberparatodos && npx vitest run src/lib/cuentos/cuento-schema.test.ts
grep -riE '\$SWAL|karma|telemetry|three\.js' src/lib/cuentos/ && echo FORBIDDEN-FOUND || echo CLEAN
git status --porcelain && git diff --stat HEAD
```

## Dependencies & Merge Order

Wave C1 merges strictly 1→6 (islands are disjoint, so work may proceed in parallel but merge in order):

1. **C1.01 (this)** — no dependencies; blocks C1.02–C1.05 (types contract).
2. C1.02 validator — consumes `parseCuentoMd`/types from C1.01.
3. C1.03 pack generator — consumes types + validated seed.
4. C1.04 art system — independent files, parallel-safe; needs schema `CuentoHotspot` shape for interactive pieces.
5. C1.05 Astro pages — needs schema + packs contract.
6. C1.06 license audit — greps headers; independent, merge last.

## Failure Recovery

| Failure | Recovery |
|---------|----------|
| `gray-matter` not installed in `saberparatodos/` | Write a minimal frontmatter parser for the known 12-field subset; do NOT add a dependency silently — flag it in the PR |
| Vitest cannot resolve the seed path | Load seed via `fs.readFileSync` with path anchored at the test file's `__dirname` → repo-root `questions_data/`; assert 8 pages to catch path drift |
| `tsc --noEmit` reports pre-existing errors elsewhere | Scope check to new files only (`npx tsc --noEmit <files>`) and report pre-existing errors without fixing unrelated code |
| Counts mismatch (pages ≠ 8) on real seed | Fix the parser, never edit `cuento.md` (content is read-only in C1.01) |
| Empty-PR risk (only test passes, no source) | Re-check `git status --porcelain`; both source + test must be new-tracked files in the diff |
