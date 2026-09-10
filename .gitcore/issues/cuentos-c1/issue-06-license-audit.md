# [Ola C1.06] feat-cuentos-license — LICENSE-CONTENT + headers + audit script

## Current State

Measured on repo root (`/home/belal/proyectosSWAL/apps/worldexams`, commit `594d19aee`):

- `questions_data/cuentos/LICENSE-CONTENT.md` EXISTS (`wc`: 17 lines, 861 bytes — code AGPLv3 vs content © 2026 SaberParaTodos/WorldExams split, free-read + reproduction ban, header requirement, validator enforcement note). It is referenced by `docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md` §1 and `docs/CUENTOS/00_BIBLIA.md` but NOTHING enforces it mechanically: no audit script exists (`ls saberparatodos/scripts/audit-cuentos-copyright.sh` → No such file; WAVE_PLAN table names `scripts/audit-cuentos-copyright.sh` as this issue's island).
- Header spot-check on the only 2 content files, both PASS today: `cuento.md` line 1 = `<!-- © 2026 SaberParaTodos / WorldExams... -->`, `tana.svg` line 1 = `<!-- © 2026 SaberParaTodos / WorldExams... -->`. So current compliance is 2/2 files by hand — the audit exists to keep it 100% as C3/C4 add ~10 cuentos × (1 md + 2–4 SVG + 8–10 scenes) ≈ 100+ files.
- Missing coverage: `license: "PROPRIETARY-FREE-READ"` frontmatter presence is unchecked mechanically (only prose in format doc §1.4); no `00`-style checksum/manifest; no CI-invokable single command (`npm run validate` covers bundles only).
- Precedent scripts: `saberparatodos/scripts/audit-country-readiness.js` (states `published_validated/validated_not_published/legacy_or_invalid/missing`, `--json` flag), `verify-neutralization.ts`, `sync_quarantine_manifest.cjs` — imitate report shape + exit codes.

## Desired State

Delta: ONE island — (a) harden `questions_data/cuentos/LICENSE-CONTENT.md` if gaps are found (re-read fully first; at minimum add explicit per-file header templates for `.md` and `.svg`, the `version: 1` + `license` frontmatter requirement, and the regeneration/dataset ban already in §7 of the format doc — small precise edit, not a rewrite); (b) NEW `saberparatodos/scripts/audit-cuentos-copyright.sh` (POSIX bash, no new deps: `grep/wc/find` only) that scans 100% of `questions_data/cuentos/` asserting: every `.md` starts with the exact copyright HTML comment + has `license: "PROPRIETARY-FREE-READ"` in frontmatter; every `.svg` starts with the copyright comment; every generated pack JSON under `saberparatodos/public/v1/cuentos/` carries `license` + `copyright` fields; prints `PASS file=X fail=Y` summary, file list of failures, exit `0` clean / `1` on any failure, `--json` flag for CI; (c) `audit:cuentos-copyright` script alias in `saberparatodos/package.json`. C5.04 reuses this audit for the final 10/10 report.

Hard constraints (apply to this issue and all C1 work): **BR-03/BR-07** — zero `$SWAL` tokens, zero karma, zero telemetry/analytics in any kids flow; the audit additionally FAILS any cuento content file containing `$SWAL`/tracking/telemetry references. Copyright headers required — this issue IS the enforcement mechanism (validator C1.02 rejects, audit C1.06 proves). Neutral Spanish only. Free Web Speech API only (audit fails paid-TTS keys/refs in content). NO Three.js in cuentos (audit fails `three` imports in cuentos trees).

## Web Research Required

Agent MUST run at least 4 of these queries and cite results in the PR description:

1. `bash grep audit script copyright headers exit codes CI pattern`
2. `SPDX license identifiers proprietary content vs code dual licensing`
3. `frontmatter license field gray-matter validation node one-liner`
4. `CI license header check pre-commit hook vs CI job best practice`
5. `creative commons vs all-rights-reserved free-to-read content licensing children`
6. `bash --json output flag convention audit scripts`

## Agent Session Prompt

```text
You are implementing C1.06 (cuento license hardening + copyright audit) in the WorldExams monorepo at repo root.
READ FIRST, in this order, before writing any code:
1. questions_data/cuentos/LICENSE-CONTENT.md (ALL 17 lines — harden precisely, do not rewrite)
2. docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md §1 (7 protection rules incl. dataset/AI-regeneration ban §7)
3. questions_data/cuentos/tana-tucan-comparte/cuento.md line 1 + frontmatter license field (gold header sample)
4. questions_data/cuentos/tana-tucan-comparte/personajes/tana.svg line 1 (gold SVG header sample)
5. saberparatodos/scripts/audit-country-readiness.js (report states + --json precedent — imitate output shape)
6. C1.02 validate_cuentos.js + C1.03 packs IF merged (audit must be CONSISTENT with validator header rule IDs and pack license fields — READ them; on conflict, validator rule wins and audit references its ID)

TASK: (a) Edit questions_data/cuentos/LICENSE-CONTENT.md minimally: add exact copy-paste header templates
for .md (HTML comment) and .svg (XML comment) + frontmatter license/version requirement + dataset/AI-regeneration
ban pointer. Keep it under ~60 lines. (b) Create saberparatodos/scripts/audit-cuentos-copyright.sh (POSIX bash,
chmod +x, grep/find/wc only): scan 100% of questions_data/cuentos/ (.md header-line-1 + frontmatter license;
.svg header-line-1) + packs dir if present (license+copyright fields via grep); also FAIL on $SWAL/telemetry/
tracking/paid-TTS/three strings in content files. Output human summary PASS file=X fail=Y + failure list;
--json emits {pass,fail,files:[{file,checks:[...]}]}. Exit 0/1. (c) Add "audit:cuentos-copyright":
"bash scripts/audit-cuentos-copyright.sh" to saberparatodos/package.json. Prove current tree: 2/2 content files
PASS. Neutral Spanish messages. No new dependencies.
VERIFY: bash scripts/audit-cuentos-copyright.sh (exit 0, PASS) && bash scripts/audit-cuentos-copyright.sh --json && negative test: temp header-stripped copy fails (then delete temp).
```

## Existing Code Patterns

- `questions_data/cuentos/LICENSE-CONTENT.md` (17 lines): code/content license split, free-read + ban, header pointer, validator-enforcement note — harden, don't rewrite.
- `saberparatodos/scripts/audit-country-readiness.js`: canonical audit UX (`npm run audit:country-readiness`, `--json`, `--smoke-public`, 4-state report) — imitate states/summary shape at cuento scale.
- `saberparatodos/scripts/verify-neutralization.ts` + `sync_quarantine_manifest.cjs`: manifest/sync script precedent (exit codes, file lists).
- Gold headers: `cuento.md` line 1 `<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. Lectura gratuita, prohibida su reproducción. -->`; `tana.svg` line 1 `<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. -->` — byte-exact templates for the audit's `head -1` comparison.
- C1.02 validator header rule (CUENTO-E-HEADER or equivalent): audit checks must reference the same rule ID, never a divergent definition of "has header".

## Acceptance Criteria

Command-verifiable (run from repo root unless noted):

1. `test -f saberparatodos/scripts/audit-cuentos-copyright.sh && test -x saberparatodos/scripts/audit-cuentos-copyright.sh && echo OK`
2. `cd saberparatodos && bash scripts/audit-cuentos-copyright.sh; echo "exit=$?"` → `exit=0`, summary shows `fail=0` with `file>=2` (both current content files scanned)
3. `cd saberparatodos && bash scripts/audit-cuentos-copyright.sh --json | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const j=JSON.parse(s); if(j.fail!==0) throw new Error('json-fail'); console.log('JSON-OK files='+j.files.length)})"` → `JSON-OK`
4. Negative test: `mkdir -p /tmp/cuentos-neg && tail -n +2 ../../questions_data/cuentos/tana-tucan-comparte/cuento.md > /tmp/cuentos-neg/cuento.md` then run audit against override dir (support `CUENTOS_DIR=` env or arg) → `exit=1` with the file listed; `rm -rf /tmp/cuentos-neg` after
5. `grep -c 'PROPRIETARY-FREE-READ' questions_data/cuentos/LICENSE-CONTENT.md` → `>= 1` AND `wc -l questions_data/cuentos/LICENSE-CONTENT.md` → `<= 60` lines (hardened, not bloated)
6. `grep -cE '^\s*("|audit:cuentos-copyright")' saberparatodos/package.json` sanity: `grep -c 'audit:cuentos-copyright' saberparatodos/package.json` → `>= 1`
7. Coverage proof: audit's scanned-file count equals `find questions_data/cuentos -name '*.md' -o -name '*.svg' | wc -l` (100% of tree, no skips) — assert in output or via `bash -x` file list diff
8. `grep -riE '\$SWAL|telemetry' questions_data/cuentos/ saberparatodos/scripts/audit-cuentos-copyright.sh | grep -v 'FAIL.*\$SWAL'` → only detection-pattern lines in the script, zero in content

## Files to Modify

| File | Change | Risk |
|------|--------|------|
| `questions_data/cuentos/LICENSE-CONTENT.md` | HARDEN: header templates + frontmatter req + ban pointer, `<= 60` lines | Low — legal text additive; keep existing clauses byte-identical |
| `saberparatodos/scripts/audit-cuentos-copyright.sh` | NEW: POSIX audit, `head -1` + frontmatter + packs + forbidden-string checks, `--json`, `chmod +x` | Low — new file, read-only scanning |
| `saberparatodos/package.json` | ADD `audit:cuentos-copyright` alias only | Low — alias only |

## DO NOT touch

- `.gitcore/features.json` (reconciled at wave end, never inside issues)
- `questions_data/cuentos/tana-tucan-comparte/*` content bytes (gold fixtures; audit must PASS them as-is)
- `saberparatodos/scripts/validate_cuentos.js`, `generate-cuento-packs.js` (C1.02/C1.03 islands — reference rule IDs, never redefine)
- `saberparatodos/src/**` (C1.01/C1.04/C1.05 islands), existing audit scripts (patterns only)
- `clientes/`, `externos/`, `archivo/`, any `.env`/secrets, deploy workflows
- No new dependencies; no paid-TTS/Three.js/analytics content anywhere near this audit

## Anti-Hallucination Guard

1. READ before write: open `LICENSE-CONTENT.md` (all 17 lines), both gold header lines, and the C1.02 header rule ID if merged; header templates in LICENSE must be byte-exact copies of the gold lines — never paraphrase legal text.
2. Svelte 5 runes only (`$props()`/`$state()`/`$effect()`); no Svelte/Astro syntax belongs in this bash + legal-text issue — flag and stop if tempted.
3. Astro `.astro` files have NO `{#if}` syntax — use ternaries/`&&`; irrelevant here except: never generate or parse `.astro` in this audit (content tree is `.md`+`.svg`+packs JSON only).
4. Absolute paths from repo root in audit output (`questions_data/cuentos/<slug>/...`), findings, and PR text; support repo-root-anchored scanning regardless of CWD (resolve script dir via `dirname "$0"`).
5. Svelte props JSON-serialisable: the `--json` output contains only `string|number|boolean|arrays|plain objects` — `jq`-parseable, no bash-isms leaked into JSON.
6. 100% tree coverage is normative: file count in the report MUST equal `find ... -name '*.md' -o -name '*.svg'` count; an audit that silently skips files is worse than none — prove equality in the PR.

## PR Delivery Requirements

ANTI-EMPTY-PR (all must hold, else the PR is invalid):

- `git status --porcelain` non-empty AND diff-stat shows `>= 1` file; key files `audit-cuentos-copyright.sh` AND `LICENSE-CONTENT.md` in the diff (script-only or text-only PRs are invalid for this issue).
- Never open a PR with zero changes; `chmod +x` bit on the `.sh` must be in the diff (`git diff --summary` shows mode change/new file mode `100755` or executable bit set).
- Test evidence `>= 20` lines / `>= 3` checks: a `audit-cuentos-copyright.test.sh` self-test (positive run + header-stripped negative + `--json` parse, each an assertion) OR paste the 3 full command outputs (positive, `--json`, negative-temp) in the PR description.
- PR description cites web-research queries, proves 100% coverage equality (`find | wc -l` vs report count), and confirms zero `$SWAL`/telemetry in content.

## Verification

```bash
cd /home/belal/proyectosSWAL/apps/worldexams
wc -l questions_data/cuentos/LICENSE-CONTENT.md
head -1 questions_data/cuentos/tana-tucan-comparte/cuento.md
head -1 questions_data/cuentos/tana-tucan-comparte/personajes/tana.svg
cd saberparatodos
bash scripts/audit-cuentos-copyright.sh; echo "exit=$?"
bash scripts/audit-cuentos-copyright.sh --json | head -20
mkdir -p /tmp/cuentos-neg && tail -n +2 ../../questions_data/cuentos/tana-tucan-comparte/cuento.md > /tmp/cuentos-neg/cuento.md
CUENTOS_DIR=/tmp/cuentos-neg bash scripts/audit-cuentos-copyright.sh; echo "neg-exit=$? (want 1)"
rm -rf /tmp/cuentos-neg
find ../../questions_data/cuentos -name '*.md' -o -name '*.svg' | wc -l
git status --porcelain && git diff --stat HEAD && git diff --summary HEAD | head -5
```

## Dependencies & Merge Order

Wave C1 merges strictly 1→6 (merge LAST):

1. C1.01 schema — no license surface; independent.
2. C1.02 validator — audit references its header/frontmatter rule IDs (on conflict, validator wins).
3. C1.03 packs — audit covers pack `license`/`copyright` fields; merge before so the packs check is live, else audit notes packs dir absent → skip-with-WARN (document which).
4. C1.04 art system — audit greps SVG headers (piezas + demo scene included).
5. C1.05 pages — footer copyright strings asserted there fall under this audit's philosophy (page files themselves are code, out of scope for the content-tree scan — state the boundary in the PR).
6. **C1.06 (this)** — merge last; C5.04 reuses this exact command for the final 10/10 report.

## Failure Recovery

| Failure | Recovery |
|---------|----------|
| C1.02/C1.03 unmerged (rule IDs / packs dir unknown) | Define audit-local check IDs prefixed `AUDIT-`, map to validator IDs in the PR; packs checks degrade to skip-with-WARN when dir is absent (explicit, counted, visible) |
| Negative-temp test pollutes the real tree | ALWAYS use `/tmp/cuentos-neg` + `CUENTOS_DIR` override (or arg), never copy broken fixtures into `questions_data/`; `rm -rf` in the same command chain |
| `head -1` comparison brittle (trailing whitespace) | Compare with trailing-whitespace-tolerant match but REPORT the exact expected bytes in LICENSE templates; fail on wrong-year/wrong-holder text |
| Executable bit lost in PR (`100644` instead of `100755`) | `git add --chmod=+x scripts/audit-cuentos-copyright.sh` (or `git update-index --chmod=+x`) and confirm via `git diff --summary` before merge |
| Empty-PR risk (LICENSE edit only, no script) | Verify `git diff --stat` lists BOTH `LICENSE-CONTENT.md` and `audit-cuentos-copyright.sh` before opening the PR |
