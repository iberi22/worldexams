# [Validation] Add missing bundle_index to all v5.2 MASTERY bundles + document field in AGENTS.md

> Validation wave — Content integrity. Labels: `validation`, `content-fix` (sin `jules` todavía)

---

## Current State (MEDIBLE)

- `npm run validate` global FAILS: **1325 of 1328** MASTERY bundles lack required frontmatter field `bundle_index`.
- Affected countries (count missing): colombia 397, el-salvador 115, peru 90, chile 90, costarica 82, puerto-rico 80, mexico 75, ecuador 70, spain 60, honduras 43, brasil 41, uruguay 40, bolivia 40, argentina 32, paraguay 20.
- Validator requirement: `saberparatodos/scripts/validate_content.js` line ~243: `const requiredV5 = ['country', 'grado', 'asignatura', 'tema', 'bundle_index'];`
- Only **39** bundles have `bundle_index` (all with value `1`).
- `AGENTS.md` frontmatter section does NOT mention `bundle_index` — root cause: generated bundles omit it.
- Repo: `iberi22/worldexams`, branch `main`, monorepo root at repo root.

## Desired State (DELTA)

- **All 1325 bundles** (`.md` files matching `questions_data/{country}/{subject}/grado-{N}/2026/{weekly|periodos}/*MASTERY-bundle.md`) have `bundle_index: 1` in frontmatter, inserted after the `tier:` line (or after `license:` if no `tier:`).
- `AGENTS.md` "Frontmatter Exacto" section updated to include `bundle_index: 1` (after `tier`).
- `npm run validate` global reports **0 errors of type "Bundle v5 sin frontmatter obligatorio: bundle_index"**.

## 🔬 Agent Session Prompt

"Before implementing, please:
1. Read `saberparatodos/scripts/validate_content.js` around line 243 to confirm the exact required field list.
2. Read `AGENTS.md` → "Frontmatter Exacto" section to see the current documented fields.
3. Read one bundle WITH `bundle_index` (e.g. `grep -rl 'bundle_index:' questions_data/ | head -1`) to confirm the canonical position.
4. Write a small script (node or bash, committed under `scripts/`) that adds `bundle_index: 1` to every MASTERY bundle missing it, then run it.
5. Update `AGENTS.md` frontmatter docs.
6. Run `npm run validate` (from `saberparatodos/`) and confirm 0 bundle_index errors."

## Acceptance Criteria (VERIFICABLES POR COMANDO)

- [ ] `find questions_data -name "*MASTERY-bundle.md" | wc -l` >= 1300
- [ ] `grep -rl "MASTERY-bundle.md" questions_data/ | xargs grep -L "bundle_index:" 2>/dev/null | wc -l` — **0** files missing bundle_index (NOTE: use a loop, `grep -L` on dirs is unreliable)
- [ ] `cd saberparatodos && npm run validate 2>&1 | grep -c "bundle_index"` — **0**
- [ ] `grep -c "bundle_index" AGENTS.md` >= 1
- [ ] PR contains the fix script + modified bundles: `git diff --stat HEAD` shows `N files changed` with N >= 100

## Files to Modify

| Path | Change | Risk |
|------|--------|------|
| `questions_data/**/*MASTERY-bundle.md` (~1325 files) | Add `bundle_index: 1` after `tier:` in frontmatter | LOW (mechanical) |
| `AGENTS.md` | Document `bundle_index: 1` in Frontmatter Exacto | LOW |
| `scripts/add-bundle-index.js` (new) | Idempotent batch fixer script | LOW |

## DO NOT touch (Anti-Regression)

- `saberparatodos/src/**` — no source code changes
- `.gitcore/features.json` — reconciled separately
- Do NOT change `protocol_version`, `total_questions`, `bundle_size` or question content of any bundle
- Do NOT delete or rename any bundle file
- Do NOT touch the 39 bundles that already have `bundle_index` (verify idempotency)

## Anti-Hallucination Guard ⚠️

1. **Idempotency**: the script MUST skip files that already have `bundle_index:` (run twice = same result)
2. **Insert position**: `bundle_index: 1` goes AFTER `tier:` (or `license:` if no tier), BEFORE `creador:` — keep YAML valid
3. **Only .md files**: never modify `.py`, `.json`, or other files under questions_data
4. **Preserve content**: byte-for-byte identical except the added line
5. **Verify with validate**: `npm run validate` is the source of truth — if it still errors, keep fixing
6. **Never open an empty PR**: verify `git status --porcelain | wc -l` >= 50 before push

## Verification

```bash
cd saberparatodos
npm run validate 2>&1 | grep -c "bundle_index"   # must be 0
# Spot check 3 random countries:
for c in colombia chile spain; do
  grep -c "bundle_index:" ../questions_data/$c/*/*/*/weekly/*.md | head -2
done
```

## Dependencies & Merge Order

- **Depends on:** none
- **Blocked by:** none
- **Merge order:** 1 (unblocks global validate for all other work)
- **Expected effort:** Medium (1-4h, mostly script + run)

## Failure Recovery

| If this happens | Action |
|----------------|--------|
| validate still errors on bundle_index | grep which files still lack it, fix, re-run |
| YAML breaks in some bundle | run validate, fix only the broken files |
| PR too large (>2000 files) | split by country in 2 commits within same PR |
| Script not allowed to run | commit script + run instructions, execute with node |
