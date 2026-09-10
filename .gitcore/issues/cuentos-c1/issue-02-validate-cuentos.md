# [Ola C1.02] feat-cuentos-validator — validate_cuentos.js enforcing format v1

## Current State

Measured on repo root (`/home/belal/proyectosSWAL/apps/worldexams`, commit `594d19aee`):

- `saberparatodos/scripts/validate_cuentos.js` does NOT exist. `ls saberparatodos/scripts/` shows 20+ scripts including `validate_content.js` (545 lines, `gray-matter`, `--strict-v3 --fail-on-error`, `--only` glob filter) and `generate-static-packs.js` — the two patterns to imitate — but nothing validates cuentos.
- Normative rules exist only as prose in `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` (79 lines: frontmatter v1, 8–10 pages × 30-80 words, quiz exactly 3×3 + `### Explicacion`, mandatory `![alt: ...]`, copyright header, neutral-Spanish veto list: `pesos, dólares, euros, soles, quetzal, guaraní, lempira, córdoba, balboa, colón, vos, tenés, hacé, mirá, che, parce, tío, compa, chido, chévere, bacán`).
- Real fixture: `questions_data/cuentos/tana-tucan-comparte/cuento.md` (`wc`: 100 lines, 4171 bytes, 8 pages, 3 quiz questions, all options with `<!-- feedback: -->`, header comment line 1) MUST pass with 0 errors. `escenas/` does not exist yet (referenced SVGs `p1..p8` are future C3/C4 work — validator must warn, not error, on missing scene files until C3 lands; missing `![alt:]` is always an error).
- `questions_data/cuentos/` holds only 3 files (`LICENSE-CONTENT.md` 17 lines, `cuento.md`, `personajes/tana.svg` 30 lines). Test runner: `npm run test:unit` (`vitest run`) from `saberparatodos/`; script tests precedent: `test-weekly-logic.js`, `verify-grade11-preicfes-policy.js`.

## Desired State

Delta: add ONE new island — `saberparatodos/scripts/validate_cuentos.js` (Node ESM, zero new deps: `fs/path/gray-matter` only) enforcing format v1 with findings shaped `{level: ERROR|WARN, file, rule, message}` and exit codes (`0` clean, `1` on ERROR or with `--fail-on-error` on WARN), supporting `--only <glob>` (imitate `validate_content.js`) and a `--strict` flag; plus a test harness script + case fixtures proving pass/fail. Rules enforced: (a) HTML copyright header line 1 + `license: "PROPRIETARY-FREE-READ"` frontmatter; (b) 12-field frontmatter incl. `version: 1`, `paginas` matches real `## Pagina` count; (c) 8–10 pages, each 30-80 words, exactly one `![alt: ...]` with non-empty alt; (d) quiz exactly 3 `### Pregunta`, 3 options A–C each, exactly one `[x]`, every option with adjacent `<!-- feedback: -->`, plus `### Explicacion`; (e) neutral-Spanish veto list (minimum the 21 tokens from §2) scanned in page text + quiz; (f) no `$SWAL`/karma/telemetry/Three.js/paid-TTS references in content.

Hard constraints (apply to this issue and all C1 work): **BR-03/BR-07** — zero `$SWAL` tokens, zero karma, zero telemetry/analytics in any kids flow; the validator must FLAG such strings as ERROR in cuento content. Copyright headers required (validator REJECTS files without header/frontmatter legal per §1). Neutral Spanish only. Free Web Speech API only (no paid TTS; flag `elevenlabs|google-cloud-tts|azure-speech|polly` keys/refs as ERROR). NO Three.js anywhere in cuentos (flag `three` imports as ERROR).

## Web Research Required

Agent MUST run at least 4 of these queries and cite results in the PR description:

1. `node ESM CLI script argument parsing without dependencies process.argv`
2. `gray-matter parse markdown frontmatter validate required fields example`
3. `word count markdown stripping images frontmatter regex node`
4. `eslint-style findings reporter ERROR WARN exit codes node script pattern`
5. `vitest run node script as child process integration test example`
6. `neutral Spanish panhispánico lista modismos evitar redacción infantil`

## Agent Session Prompt

```text
You are implementing C1.02 (cuento format-v1 validator) in the WorldExams monorepo at repo root.
READ FIRST, in this order, before writing any code:
1. docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md (ALL of it — every rule you enforce comes from here)
2. docs/CUENTOS/00_BIBLIA.md (quiz + beats context)
3. questions_data/cuentos/tana-tucan-comparte/cuento.md (MUST exit 0 with 0 ERRORs — your gold fixture)
4. saberparatodos/scripts/validate_content.js lines 1-120 (CLI shape: --only globs, findings, exit codes — imitate, do not import)
5. C1.01 schema saberparatodos/src/lib/cuentos/cuento-schema.ts IF it exists (reuse its field names; if C1.01 is not merged yet, define rule IDs locally as CUENTO-E###/CUENTO-W### and note the mapping in the PR)

TASK: create saberparatodos/scripts/validate_cuentos.js (Node ESM, deps: fs, path, gray-matter only —
verify gray-matter is already in saberparatodos/package.json; add NOTHING new). CLI:
`node scripts/validate_cuentos.js [--only <glob>] [--strict] [--fail-on-error] [paths...]`
default scope questions_data/cuentos/*/cuento.md. Findings {level,file,rule,message}; exit 0 clean,
exit 1 on any ERROR (or WARN with --fail-on-error/--strict). Enforce rules (a)-(f) from the issue body.
Word count strips frontmatter, image lines, quiz, HTML comments. Veto scan is case-insensitive whole-word
(minimum 21 tokens from §2). Missing escenas/*.svg files => WARN (C3/C4 own scenes), missing alt => ERROR.
Also create saberparatodos/scripts/validate_cuentos.test.js (node:test or vitest-run child-process, your choice —
check how test-weekly-logic.js does it first) with >=3 cases: gold seed passes 0 ERRORs; fixture missing header
fails CUENTO-E-HEADER; fixture with 2 quiz questions fails CUENTO-E-QUIZ-COUNT. Keep fixtures under
saberparatodos/scripts/fixtures/cuentos/. Neutral Spanish messages in validator output. No $SWAL/karma/telemetry.
No Three.js. No paid TTS.
VERIFY: node scripts/validate_cuentos.js (expect 0 ERROR on seed) && node scripts/validate_cuentos.test.js (or vitest equivalent).
```

## Existing Code Patterns

- `saberparatodos/scripts/validate_content.js` (545 lines): `gray-matter` import, `ROOT`/`QUESTIONS_DIR` anchoring via `fileURLToPath`, `--only` multi-glob filter (`globToRegExp`), `findings[]` + `addFinding(level,file,message)`, `--fail-on-error` exit convention. Imitate CLI/UX exactly.
- `saberparatodos/scripts/generate-static-packs.js`: `OUTPUT_DIRS` ensure-exists, `--all-weekly --changed-only` flags, packs as derived artifacts (never hand-edited) — same philosophy: validator output is advisory, source `.md` is fixed.
- `saberparatodos/scripts/test-weekly-logic.js` / `verify-grade11-preicfes-policy.js`: precedent for script-level self-tests runnable from `saberparatodos/`.
- Seed gold fixture: `questions_data/cuentos/tana-tucan-comparte/cuento.md` (100 lines, 4171 bytes); `npm run validate` is the bundle equivalent that must keep passing untouched.

## Acceptance Criteria

Command-verifiable (run from repo root unless noted):

1. `test -f saberparatodos/scripts/validate_cuentos.js && echo OK`
2. `cd saberparatodos && node scripts/validate_cuentos.js; echo "exit=$?"` → `exit=0` with `0 ERROR` on the current tree (gold seed passes)
3. `cd saberparatodos && node scripts/validate_cuentos.js --only tana-tucan-comparte | grep -c ERROR` → `0`
4. Negative fixtures fail: a temp copy of the seed with the line-1 header removed exits `1` and prints `CUENTO-E-HEADER` (or equivalent header rule ID); a copy with one `### Pregunta` deleted exits `1` with quiz-count rule ID
5. `grep -cE 'pesos|tenés|chévere|vos[^a-z]' saberparatodos/scripts/validate_cuentos.js` → `>= 3` (veto list embedded, minimum 21 tokens total — verify with `grep -oE "'[a-záéíóúñ]+'" ... | wc -l` ≥ 21)
6. `cd saberparatodos && (node scripts/validate_cuentos.test.js || npx vitest run <validator-test>)` → exit 0, `>= 3` cases
7. `grep -riE 'three\.js|elevenlabs|azure-speech|polly' saberparatodos/scripts/validate_cuentos.js` → only in FORBIDDEN-string detection lists (validator flags them, never uses them)
8. `npm run validate -- questions_data/cuentos` (bundle validator) still exits as before — no regression to existing validation

## Files to Modify

| File | Change | Risk |
|------|--------|------|
| `saberparatodos/scripts/validate_cuentos.js` | NEW: ESM validator, rules (a)–(f), `--only/--strict/--fail-on-error` | Low — new file, no existing callers |
| `saberparatodos/scripts/validate_cuentos.test.js` (+ `fixtures/cuentos/*`) | NEW: `>=3` pass/fail cases incl. gold seed | Low — test only |
| `saberparatodos/package.json` | OPTIONAL: add `validate:cuentos` script alias only (no dep changes) | Low — script alias, verify `npm run` still parses |

## DO NOT touch

- `.gitcore/features.json` (reconciled at wave end, never inside issues)
- `questions_data/cuentos/**` real content (read-only fixtures; C3 owns content, C1.06 owns LICENSE)
- `saberparatodos/scripts/validate_content.js`, `generate-static-packs.js` (read as patterns, never edit)
- `saberparatodos/src/lib/cuentos/*` (C1.01 island), `src/pages/**`, `src/components/**` (C1.04/C1.05)
- `clientes/`, `externos/`, `archivo/`, any `.env`/secrets, deploy workflows
- Do not add paid TTS SDKs or Three.js to any `package.json`

## Anti-Hallucination Guard

1. READ before write: open `02_COPYRIGHT_Y_FORMATO.md`, the seed `cuento.md`, and `validate_content.js` lines 1–120 first; every enforced rule must cite its `§` source in a code comment.
2. Svelte 5 runes only (`$props()`/`$state()`/`$effect()`); no Svelte syntax of any generation inside this Node script or its docs.
3. Astro `.astro` files have NO `{#if}` syntax — use ternaries/`&&`/`.map()`; this validator must never parse or generate `.astro` constructs.
4. Absolute paths from repo root in all messages, findings `file` fields (relative to repo root, e.g. `questions_data/cuentos/<slug>/cuento.md`), and PR text.
5. Svelte props JSON-serialisable: if the validator emits JSON (e.g. `--json`), values are plain `string|number|boolean|array|object` only.
6. Missing `escenas/*.svg` = WARN, never ERROR (scenes are C3/C4 islands); missing `alt` text or missing header = ERROR, never WARN. Do not invent rule severities.

## PR Delivery Requirements

ANTI-EMPTY-PR (all must hold, else the PR is invalid):

- `git status --porcelain` non-empty AND diff-stat shows `>= 1` file; key source file `saberparatodos/scripts/validate_cuentos.js` in the diff.
- Never open a PR with zero changes, or with fixtures alone and no validator source.
- Test file `>= 20` lines with `>= 3` cases; paste real terminal output of both the validator (0 ERROR on seed) and the test run in the PR description.
- PR description cites web-research queries, maps each rule ID → `02_COPYRIGHT_Y_FORMATO.md` § source, and confirms veto-token count (`>= 21`) with the grep command output.

## Verification

```bash
cd /home/belal/proyectosSWAL/apps/worldexams
test -f saberparatodos/scripts/validate_cuentos.js && echo VALIDATOR-OK
cd saberparatodos
node scripts/validate_cuentos.js; echo "exit=$?"
node scripts/validate_cuentos.js --only tana-tucan-comparte
cp ../../questions_data/cuentos/tana-tucan-comparte/cuento.md /tmp/cuento-noheader.md
tail -n +2 /tmp/cuento-noheader.md > /tmp/cuento-noheader2.md
node scripts/validate_cuentos.js /tmp/cuento-noheader2.md; echo "exit=$? (want 1)"
grep -oE "'[a-záéíóúñ]+'" scripts/validate_cuentos.js | wc -l
git status --porcelain && git diff --stat HEAD
```

## Dependencies & Merge Order

Wave C1 merges strictly 1→6:

1. C1.01 schema — contract this validator consumes (if unmerged, use local `CUENTO-E###` IDs and note mapping).
2. **C1.02 (this)** — blocks C1.03 (only validated packs generate), C1.05 (pages render validated content), C1.06 (audit reuses veto/header logic), and all C3/C4 content issues (definition of done for every cuento).
3. C1.03 pack generator — must call or mirror this validator's pass/fail gate.
4. C1.04 art system — parallel-safe (disjoint island).
5. C1.05 Astro pages — renders only validator-clean cuentos.
6. C1.06 license audit — extends header greps wave-wide.

## Failure Recovery

| Failure | Recovery |
|---------|----------|
| `gray-matter` missing from `saberparatodos/package.json` | Reuse the same minimal frontmatter approach as C1.01 (share code by port, do not duplicate a dep install); flag in PR |
| Gold seed unexpectedly fails a new rule | The seed is normative — fix the RULE (scope it to WARN or refine regex), never edit `cuento.md` |
| Veto regex false-positives on seed words (e.g. substring match) | Switch to whole-word case-insensitive matching with word boundaries incl. accented chars; re-run gold seed to 0 ERROR |
| `--only` glob behaves differently from `validate_content.js` | Copy its `globToRegExp` + candidate-normalization approach verbatim rather than inventing a new one |
| Empty-PR risk (fixtures only) | Verify `git diff --stat` lists `validate_cuentos.js` itself before opening the PR |
