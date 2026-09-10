# [Ola C1.03] feat-cuentos-packs — static JSON pack generator + offline

## Current State

Measured on repo root (`/home/belal/proyectosSWAL/apps/worldexams`, commit `594d19aee`):

- `saberparatodos/scripts/generate-cuento-packs.js` does NOT exist. The working precedent `saberparatodos/scripts/generate-static-packs.js` (bundle→JSON, flags `--all-weekly --changed-only --period=N --api-only`, writes to `saberparatodos/public/api/packs` + `apps/worldexams-api/public/v1/packs`, runs on `prebuild`) covers weekly bundles only — zero cuento coverage.
- No JSON pack exists for any cuento: `find questions_data/cuentos -type f` returns exactly 3 files (`LICENSE-CONTENT.md` 17 lines, `cuento.md` 100 lines, `personajes/tana.svg` 30 lines). No `public/v1/cuentos/` directory exists anywhere.
- Offline precedent: `saberparatodos/src/lib/pack-storage.ts` + `pack-fetcher.ts` + `question-cache.ts` + `idb-storage.ts` exist for exam packs (read them as patterns); cuentos have no offline story yet (full PWA service-worker scope is C5.03 — this issue is generator + static files + cacheable fetch only).
- Contract sources: C1.01 `cuento-schema.ts` types, C1.02 `validate_cuentos.js` pass/fail gate, seed `cuento.md` (8 pages, 3 quiz Qs) as the single gold input.

## Desired State

Delta: add ONE new island — `saberparatodos/scripts/generate-cuento-packs.js` (Node ESM, `fs/path` + `gray-matter` only, CLI `--all --changed-only --slug=<slug> --out=<dir>` mirroring `generate-static-packs.js` UX) that reads each validator-clean `questions_data/cuentos/*/cuento.md` and emits: (a) `public/v1/cuentos/<slug>.json` (full cuento: frontmatter, pages with text+alt+image, quiz with options+feedback+correct index, explicacion, hotspots placeholder `[]`), (b) `public/v1/cuentos/index.json` (catalog: slug, titulo, edad, eje, habitat, valor, paginas, license, version, packUrl, coverSvg path), both pretty-printed with stable key order; generator REFUSES to emit packs for validator-failing cuentos (non-zero exit, lists rule IDs). Plus a `Cache-Control: public, max-age=86400, s-maxage=604800` serving note (header or route config, following `[...slug].astro` precedent) so packs are CDN-cacheable and fetchable offline via plain `fetch()` + Cache Storage. Wire into docs only (add `generate:cuentos` script alias); do NOT hook into `prebuild` yet (C5.03 owns the pipeline decision).

Hard constraints (apply to this issue and all C1 work): **BR-03/BR-07** — zero `$SWAL` tokens, zero karma, zero telemetry/analytics in any kids flow; packs must contain NO tracking IDs, NO user fields, NO token balances — content only. Copyright headers required on the generator script per repo convention; pack JSON embeds `license: "PROPRIETARY-FREE-READ"` + `copyright` string per cuento. Neutral Spanish only. Free Web Speech API only for future read-aloud (no audio URLs from paid TTS in packs). NO Three.js anywhere in cuentos.

## Web Research Required

Agent MUST run at least 4 of these queries and cite results in the PR description:

1. `astro public directory static JSON served CDN cache-control headers`
2. `cloudflare workers static assets cache-control s-maxage immutable JSON`
3. `Cache Storage API fetch offline-first JSON versioned URL pattern`
4. `stable JSON.stringify key order deterministic build artifacts node`
5. `generate-static-packs changed-only git diff pattern node script`
6. `JSON schema versioning content packs migration field best practice`

## Agent Session Prompt

```text
You are implementing C1.03 (cuento static JSON pack generator) in the WorldExams monorepo at repo root.
READ FIRST, in this order, before writing any code:
1. saberparatodos/scripts/generate-static-packs.js lines 1-120 (CLI flags, OUTPUT_DIRS ensure-exists, changed-only via git diff — imitate UX, do not import)
2. docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md §3 (pack JSON must preserve: all page text, alt texts, quiz options + feedback + correct answer, explicacion)
3. questions_data/cuentos/tana-tucan-comparte/cuento.md (gold input: expect 8-page + 3Q JSON out)
4. C1.01 saberparatodos/src/lib/cuentos/cuento-schema.ts IF merged (pack shape SHOULD match its Cuento interface; if unmerged, define the shape in the generator and document the mapping in the PR)
5. saberparatodos/src/lib/pack-fetcher.ts + pack-storage.ts (offline fetch/cache pattern to stay compatible with)
6. saberparatodos/src/pages/preguntas/[...slug].astro lines 16-20 (Cache-Control header precedent)

TASK: create saberparatodos/scripts/generate-cuento-packs.js (Node ESM, zero new deps).
CLI: node scripts/generate-cuento-packs.js [--all] [--changed-only] [--slug=<slug>] [--out=<dir>].
For each questions_data/cuentos/*/cuento.md: run the C1.02 validator gate (shell out to validate_cuentos.js
--only <slug>, or import its core if it exports one — READ C1.02 output first; on validator ERROR, skip that
cuento with a loud WARN and non-zero exit at end). Emit to saberparatodos/public/v1/cuentos/ (default out):
<slug>.json {format:"cuento-v1", slug, titulo, edad, idioma, eje, habitat, valor, personajes, paginas:[{n,imagen,alt,texto}],
quiz:[{n,texto,opciones:[{letra,texto,correcta,feedback}]}], explicacion, hotspots:[], license, version, copyright}
+ index.json catalog array. Stable key order, 2-space indent. Add "generate:cuentos": "node scripts/generate-cuento-packs.js --all"
to saberparatodos/package.json scripts (docs/pipeline hook is C5.03 — do NOT touch prebuild). Add a short
OFFLINE.md note (or header comment) documenting Cache-Control + fetch-then-Cache-Storage usage. Content-only JSON:
no user ids, no tokens, no telemetry. Neutral Spanish. No Three.js. No paid TTS URLs.
VERIFY: node scripts/generate-cuento-packs.js --all && node -e "const p=require('./public/v1/cuentos/tana-tucan-comparte.json'); console.log(p.paginas.length, p.quiz.length)" (expect 8 3) && node scripts/validate_cuentos.js (still 0 ERROR).
```

## Existing Code Patterns

- `saberparatodos/scripts/generate-static-packs.js`: header usage comment, `OUTPUT_DIRS` with `mkdirSync recursive`, `--all-weekly/--changed-only/--period/--api-only` flags, packs-as-derived-artifacts doctrine (fix `.md`, regenerate — same applies: never hand-edit `public/v1/cuentos/*.json`).
- `saberparatodos/scripts/validate_content.js`: `--only` glob filtering + exit-code convention; C1.02 `validate_cuentos.js` is the gate this generator shells out to.
- `saberparatodos/src/lib/pack-fetcher.ts`, `pack-storage.ts`, `idb-storage.ts`: existing offline fetch/cache layer the cuento packs must stay fetch-compatible with (plain JSON over HTTP, no auth).
- `saberparatodos/src/pages/preguntas/[...slug].astro` lines 16–20: `Cache-Control: public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400` precedent.
- `saberparatodos/package.json`: `generate:packs:weekly` / `generate:packs:changed-weekly` script-alias precedent; `prebuild` runs the weekly generator (do NOT add cuentos to `prebuild` here).

## Acceptance Criteria

Command-verifiable (run from repo root unless noted):

1. `test -f saberparatodos/scripts/generate-cuento-packs.js && echo OK`
2. `cd saberparatodos && node scripts/generate-cuento-packs.js --all; echo "exit=$?"` → `exit=0`
3. `test -f public/v1/cuentos/tana-tucan-comparte.json && test -f public/v1/cuentos/index.json && echo OK` (from `saberparatodos/`)
4. `node -e "const p=require('./public/v1/cuentos/tana-tucan-comparte.json'); if(p.paginas.length!==8||p.quiz.length!==3) throw new Error('shape'); console.log('SHAPE-OK')"` (from `saberparatodos/`)
5. `node -e "const p=require('./public/v1/cuentos/tana-tucan-comparte.json'); const q=p.quiz[0]; if(q.opciones.filter(o=>o.correcta).length!==1||!q.opciones.every(o=>o.feedback)) throw new Error('quiz'); console.log('QUIZ-OK')"`
6. `grep -c 'PROPRIETARY-FREE-READ' public/v1/cuentos/tana-tucan-comparte.json` → `>= 1` AND `grep -c 'license' public/v1/cuentos/index.json` → `>= 1`
7. Validator gate: temporarily break a COPY of the seed (remove header) into a scratch slug dir, run generator `--slug=<scratch>` → non-zero exit and no JSON emitted for it; then delete scratch dir (or prove `--changed-only` path skips cleanly)
8. `grep -riE '\$SWAL|karma|telemetry|userId|tracking' public/v1/cuentos/*.json` → exit 1 (zero matches)
9. Idempotence: run generator twice, `sha256sum public/v1/cuentos/*.json` identical across runs (stable key order)

## Files to Modify

| File | Change | Risk |
|------|--------|------|
| `saberparatodos/scripts/generate-cuento-packs.js` | NEW: ESM generator, validator gate, stable JSON emit | Low — new file, no existing callers |
| `saberparatodos/public/v1/cuentos/<slug>.json` + `index.json` | GENERATED artifacts (committed for offline/SEO use) | Low — derived, regenerable; never hand-edit |
| `saberparatodos/package.json` | ADD `generate:cuentos` script alias only | Low — alias only, no `prebuild` change |

## DO NOT touch

- `.gitcore/features.json` (reconciled at wave end, never inside issues)
- `questions_data/cuentos/**` source content (read-only input; C3 owns content)
- `saberparatodos/scripts/generate-static-packs.js`, `validate_content.js` (patterns only)
- `prebuild` pipeline and service-worker/PWA scope (C5.03 owns it)
- `saberparatodos/src/pages/**`, `src/components/**` (C1.04/C1.05 islands)
- `clientes/`, `externos/`, `archivo/`, any `.env`/secrets, deploy workflows
- No paid TTS endpoints, no Three.js, no analytics SDKs

## Anti-Hallucination Guard

1. READ before write: open `generate-static-packs.js` (flags/output dirs), `pack-fetcher.ts` (fetch shape), and the C1.01/C1.02 outputs if merged; never assume their APIs — shell out to the validator CLI rather than importing internals you have not read.
2. Svelte 5 runes only (`$props()`/`$state()`/`$effect()`); no Svelte code belongs in this issue at all — flag any temptation to build UI here and stop.
3. Astro `.astro` files have NO `{#if}` syntax — use ternaries/`&&`; this generator emits JSON only and must not template `.astro` strings.
4. Absolute paths from repo root in CLI help, logs, findings, and PR text (e.g. `saberparatodos/public/v1/cuentos/<slug>.json`).
5. Svelte props JSON-serialisable: pack JSON is plain data (`string|number|boolean|array|object`) so it stays directly passable as component props later — no functions, `Date`s, or class instances in emitted JSON.
6. Never hand-edit generated JSON to make a check pass — fix the `.md` or the generator and re-run; verify idempotence with `sha256sum` before opening the PR.

## PR Delivery Requirements

ANTI-EMPTY-PR (all must hold, else the PR is invalid):

- `git status --porcelain` non-empty AND diff-stat shows `>= 1` file; key source file `saberparatodos/scripts/generate-cuento-packs.js` in the diff (generated JSON alone is not a valid PR).
- Never open a PR with zero changes or with only generated JSON and no generator.
- Include a acceptance-test snippet: a `>= 20`-line test or verify script with `>= 3` assertions covering shape (8 pages/3Q), quiz integrity (one correct + all feedback), and license presence; paste real `node -e` outputs in the PR description.
- PR description cites web-research queries, shows `sha256sum` idempotence proof, and confirms zero `$SWAL`/karma/telemetry/user-tracking strings via the grep command output.

## Verification

```bash
cd /home/belal/proyectosSWAL/apps/worldexams/saberparatodos
node scripts/generate-cuento-packs.js --all; echo "exit=$?"
ls -la public/v1/cuentos/
node -e "const p=require('./public/v1/cuentos/tana-tucan-comparte.json'); console.log('pages='+p.paginas.length,'quiz='+p.quiz.length)"
node -e "const p=require('./public/v1/cuentos/tana-tucan-comparte.json'); console.log('correct-per-q='+p.quiz.map(q=>q.opciones.filter(o=>o.correcta).length).join(','))"
grep -riE '\$SWAL|karma|telemetry|userId' public/v1/cuentos/ && echo FORBIDDEN-FOUND || echo CLEAN
sha256sum public/v1/cuentos/*.json > /tmp/cuentos1.sha && node scripts/generate-cuento-packs.js --all && sha256sum -c /tmp/cuentos1.sha
node scripts/validate_cuentos.js; echo "validator-exit=$?"
git status --porcelain && git diff --stat HEAD
```

## Dependencies & Merge Order

Wave C1 merges strictly 1→6:

1. C1.01 schema — pack JSON shape SHOULD match its `Cuento` interface.
2. C1.02 validator — the gate; generator refuses validator-failing cuentos.
3. **C1.03 (this)** — blocks C1.05 (pages fetch packs), C5.02 (SEO per cuento), C5.03 (PWA offline scope).
4. C1.04 art system — parallel-safe; scene/pieza SVGs referenced by `imagen` fields later.
5. C1.05 Astro pages — consumes `index.json` + `<slug>.json` (may stub-fetch until this merges, in order).
6. C1.06 license audit — covers generated JSON license fields too.

## Failure Recovery

| Failure | Recovery |
|---------|----------|
| C1.01/C1.02 not merged yet | Shell out to validator CLI if present; else implement the gate as `--skip-validation` flag (default OFF) + document; never silently emit packs for unchecked content |
| `public/` output conflicts with Astro build cleaning it | Emit under `saberparatodos/public/` (copied verbatim to dist by Astro — verify with `astro build` file presence); if the build wipes it, move default `--out` under `public/` anyway and flag to C5.03 |
| Non-deterministic JSON (key order/timestamps) | No timestamps in output; construct objects with fixed key insertion order; prove with double-run `sha256sum` |
| Validator gate false-negatives block the gold seed | Seed is normative — fix gate invocation (check `--only <slug>` semantics), never bypass the gate for the real tree |
| Empty-PR risk (JSON only, no generator diff) | Ensure `generate-cuento-packs.js` is tracked and in `git diff --stat` before opening the PR |
