# [Ola C5.04] feat-cuentos-auditoria-cierre: final audit 10/10 + e2e PASS + INFORME_CIERRE.md

## 1. Current State (measurable)

- Waves C1–C4 + C5.01–C5.03 are planned dependencies, not yet merged: validator (`scripts/validate_cuentos.js`, C1.02), 10 stories (C3–C4), reader/quiz/progress (C2), logros (C5.01), SEO/sitemap (C5.02), offline SW (C5.03). No consolidated audit exists: `docs/CUENTOS/INFORME_CIERRE.md` does NOT exist (0 files), no wave-level audit script exists.
- Known untested surface on-branch: validator output for 10/10 stories never pasted in one place; e2e (`tests/e2e/cuentos-*.spec.ts`, C2.06) never run against the full 10-story set; copyright grep (C1.06 `audit-cuentos-copyright.sh`) never executed over final content; BR-03 telemetry grep never run across the whole cuentos island; neutral-Spanish veto grep never run across final strings; offline 10/10 matrix (C5.03) never consolidated.
- `docs/CUENTOS/` currently holds exactly 4 files: `00_BIBLIA.md`, `01_DIRECCION_ARTE.md`, `02_COPYRIGHT_Y_FORMATO.md`, `WAVE_PLAN.md`. This issue adds the 5th and final: `INFORME_CIERRE.md`.
- Hard constraints: BR-03 (audit must PROVE zero tokens/karma/telemetry with greps, not prose), BR-07 (prove free reading: no login-gated route in cuentos), copyright §1 (100% tree grep), neutral Spanish §2 (veto grep). This issue WRITES the report — it does not fix content; failures found go to a what-is-missing list, not silent patches.

## 2. Desired State

- New audit script `saberparatodos/scripts/audit-cuentos-cierre.sh` (bash, executable, no deps): runs in order — (1) `validate_cuentos.js` full output, (2) copyright header grep over `questions_data/cuentos/` (every `.md` + `.svg` must carry the header; count==file count), (3) neutral-Spanish veto grep over cuentos content + UI strings (must be empty), (4) BR-03 telemetry grep over `src/lib/cuentos/`, `src/components/cuentos/`, SW files (must be empty), (5) sitemap URL count (≥11), per-page OG/JSON-LD presence loop (10/10), (6) e2e suite invocation for cuentos specs. Exits non-zero on ANY failure with a labeled section so CI log points at the cause.
- E2E: `tests/e2e/cuentos-*.spec.ts` run green on desktop + mobile projects (0 console errors assertion per C2.06). If the C2.06 harness is missing on-branch, the audit records that as missing (criterion 7 fails honestly) instead of inventing results.
- Report `docs/CUENTOS/INFORME_CIERRE.md`: wave-by-wave verdict table (C1–C5, PASS/FAIL per acceptance evidence), pasted command outputs (validator, greps with counts, sitemap count, e2e tail), desktop+mobile screenshot index, and a **what-is-missing** section listing every gap as a checkbox with owner wave + severity (blocker / follow-up). No gap may be silently omitted — an honest FAIL + missing item beats a false PASS.
- Definition of done for the whole cuentos program: validator 0 errors 10/10 AND e2e PASS AND report merged AND what-is-missing triaged (blockers→new issues, follow-ups listed).

## 3. Web Research (4–6 sources)

1. Playwright docs — running specific specs across projects: `npx playwright test tests/e2e/cuentos --project=chromium --project="Mobile Chrome"`, `--reporter=list`, console-error listeners for zero-error assertions. https://playwright.dev/docs/running-tests
2. Google Search Central — post-launch site audit checklist: sitemap fetch, structured-data validation (Rich Results Test), canonical coverage. https://developers.google.com/search/docs/appearance/structured-data
3. Schema.org validator / Rich Results Test — paste one story URL to validate the C5.02 JSON-LD externally; record result in the report. https://validator.schema.org/
4. ripgrep docs — `rg -c`, `--glob`, exit codes for auditable counting greps (`rg --count` + `test` make grep evidence CI-friendly). https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md
5. Conventional Commits / keep-a-changelog — closure-report structure: scope summary, verification evidence, known gaps; the INFORME_CIERRE follows the same honesty rule (gaps listed, not hidden). https://www.conventionalcommits.org/
6. W3C Web Accessibility — final pass on `alt` text presence per scene + `aria-live` announcements (spot-check 2 stories with a screen-reader or `axe` if available; record method honestly).

## 4. Agent Session Prompt

> You are implementing C5.04 (feat-cuentos-auditoria-cierre) in `/home/belal/proyectosSWAL/apps/worldexams`.
> Context: read ALL of `docs/CUENTOS/` (`00_BIBLIA.md`, `01_DIRECCION_ARTE.md`, `02_COPYRIGHT_Y_FORMATO.md`, `WAVE_PLAN.md`) plus the merged C1–C5 code. This is the LAST issue of the program — you AUDIT, you do not refactor other islands (one-line safe fixes only with justification; anything bigger → what-is-missing entry).
> Task: (1) write `saberparatodos/scripts/audit-cuentos-cierre.sh` — 6 ordered sections per §2, non-zero exit on any failure, labeled output. (2) run it; run `npx playwright test tests/e2e/cuentos --project=chromium --project="Mobile Chrome"` (or the C2.06 equivalent paths found on-branch). (3) write `docs/CUENTOS/INFORME_CIERRE.md` — verdict table C1–C5, FULL pasted outputs, screenshot index, what-is-missing checklist with severity + owner wave. (4) re-run the whole verification block §11 end-to-end and confirm exit 0, or record honest FAILs. Constraints: BR-03/BR-07 proven by grep (not claimed), neutral Spanish throughout the report, copyright header on the new script, absolute paths from root. Do NOT touch `features.json`. Deliver a PR whose body IS the verdict summary + link to the report; attach desktop+mobile screenshots.

## 5. Existing Code Patterns

- C1.02 validator (planned): `saberparatodos/scripts/validate_cuentos.js` — frontmatter v1, 8–10 pages, quiz 3×3, alt text, copyright header, neutral veto. The audit script calls it verbatim and asserts `0 errors` + `10/10` in stdout.
- C1.06 copyright audit (planned): `scripts/audit-cuentos-copyright.sh` — if present on-branch, CALL it from the cierre script instead of duplicating logic; only inline the grep if C1.06 never merged (record which in the report).
- C2.06 e2e (planned): `saberparatodos/tests/e2e/cuentos-lector.spec.ts` (+ possible `cuentos-offline.spec.ts` from C5.03) — run via the repo's `playwright.config.ts` projects; reuse its baseURL/preview-server pattern, don't invent a new harness.
- C1.03/C5.02/C5.03 artifacts: `public/v1/cuentos/` packs, sitemap, SW file — audited read-only (counts + presence), never regenerated here.
- Report docs style: `docs/CUENTOS/*.md` are Spanish-language, header-led, table-heavy — match that voice (report in Spanish; issue body stays English per wave convention).

## 6. Acceptance Criteria (command-verifiable)

1. `ls docs/CUENTOS/INFORME_CIERRE.md saberparatodos/scripts/audit-cuentos-cierre.sh` → both exist; `test -x saberparatodos/scripts/audit-cuentos-cierre.sh` → true.
2. `bash saberparatodos/scripts/audit-cuentos-cierre.sh` → exit 0, with 6 labeled sections in stdout (validator / copyright / neutral-es / BR-03 / seo-sitemap / e2e).
3. Validator section shows `0 errors` and `10/10` stories valid (grep the saved log: `bash .../audit-cuentos-cierre.sh 2>&1 | tee /tmp/cierre.log; grep -cE "0 errors|10/10" /tmp/cierre.log` → ≥1; exact strings per C1.02 output, recorded in report).
4. Copyright: every `.md` + `.svg` under `questions_data/cuentos/` carries the header — `total=$(find questions_data/cuentos -name "*.md" -o -name "*.svg" | wc -l); hit=$(grep -rl "Todos los derechos reservados" questions_data/cuentos | wc -l); test "$total" -eq "$hit"` → true (10 stories × (1 md + 2–4 personajes + 8–10 escenas) + LICENSE).
5. `npx playwright test tests/e2e/cuentos --project=chromium --project="Mobile Chrome"` (in `saberparatodos/`) → all PASS, 0 console errors; tail pasted in report. If harness missing → criterion FAILs and the report's what-is-missing lists it as blocker (honest FAIL, not skipped).
6. Sitemap count ≥11 and per-slug OG/JSON-LD loop 10/10 (reuse C5.02 §11 loop; output pasted in report).
7. Neutral-Spanish veto + BR-03 telemetry greps across final tree → both empty (exit 1), outputs pasted.
8. `INFORME_CIERRE.md` contains a `## Qué falta` (what-is-missing) section with ≥1 triaged entry OR an explicit `Nada pendiente — 0 blockers, 0 follow-ups` line with the audit log hash/date. No silent gaps.
9. `node scripts/validate_cuentos.js` standalone → still 0 errors (audit changed no content).

## 7. Files + Risk

| File | Change | Risk |
|------|--------|------|
| `saberparatodos/scripts/audit-cuentos-cierre.sh` | NEW (~80 lines bash, exec bit) | Low — read-only checks + exit codes; medium risk of brittle string matching → mitigate with tolerant greps + labeled output |
| `docs/CUENTOS/INFORME_CIERRE.md` | NEW (verdict table + pasted evidence + what-is-missing) | None (docs) — but high HONESTY stakes: false PASS is the failure mode |
| E2E specs | READ-ONLY run (no edits; a broken spec → what-is-missing, not a drive-by rewrite) | Avoid scope creep |

Rollback: delete 2 new files. Explicit non-goal: fixing C1–C5 defects found — file them as what-is-missing entries; only typo-level safe fixes allowed inline (each justified in the PR).

## 8. DO NOT Touch

- `.gitcore/features.json` and any `features.json`.
- `questions_data/cuentos/**`, all `src/**` islands (C2 reader/quiz, C5.01 logros, C5.02 head tags, C5.03 SW), `public/**` artifacts, validators/generators, sitemap/robots — READ-ONLY during audit.
- E2E spec logic (run, don't rewrite to green — editing tests to pass is forbidden), Supabase/auth, `.env`/secrets, CI workflows, `package.json`.
- No new runtime dependencies; audit script uses bash + node + project tooling only.
- Any files outside the island listed in §7.

## 9. Anti-Hallucination (minimum 4)

1. Do NOT report PASS without the full audit log — the PR must link/paste `audit-cuentos-cierre.sh` stdout end-to-end; selective excerpts are rejected.
2. Do NOT invent e2e results — paste the Playwright tail verbatim; if the harness is missing, write FAIL + blocker entry instead of fabricating a run.
3. Do NOT hide gaps — every anomaly found during the audit MUST appear in `## Qué falta` with severity; a reviewer finding an unlisted gap fails the issue.
4. Do NOT edit tests or content to force green — `git status` must show ONLY the 2 new files (plus justified typo fixes); any other modified file fails review.
5. Do NOT claim counts without commands — every number in the report (file counts, URL counts, 10/10s) must sit next to the command that produced it.

## 10. PR Delivery Requirements (anti-empty-PR + test-nonempty)

- The PR must contain: the executable audit script, the full INFORME_CIERRE.md with pasted evidence, the e2e tail, desktop+mobile screenshots (≥2 stories + index), and the what-is-missing triage.
- The "test-nonempty" bar here = the executed audit itself: a PR with a report but no attached audit log / e2e tail / grep outputs will be rejected as an empty claim.
- PR title: `[C5.04] feat-cuentos-auditoria-cierre: final audit 10/10 + e2e PASS + INFORME_CIERRE.md`. Body: verdict table (C1–C5 × PASS/FAIL), blocker count, follow-up count, links to full log + report.
- No merge if: audit script exits non-zero without triaged entries; e2e missing and unlisted; any unlisted modified file in `git status`; report lacks the what-is-missing section.

## 11. Verification (bash)

```bash
cd /home/belal/proyectosSWAL/apps/worldexams
ls docs/CUENTOS/INFORME_CIERRE.md saberparatodos/scripts/audit-cuentos-cierre.sh
test -x saberparatodos/scripts/audit-cuentos-cierre.sh && echo "EXEC OK"
bash saberparatodos/scripts/audit-cuentos-cierre.sh 2>&1 | tee /tmp/cierre.log; echo "AUDIT EXIT: $?"
grep -nE "0 errors|10/10" /tmp/cierre.log | head
total=$(find questions_data/cuentos -name "*.md" -o -name "*.svg" | wc -l); hit=$(grep -rl "Todos los derechos reservados" questions_data/cuentos | wc -l); echo "COPYRIGHT $hit/$total"; test "$total" -eq "$hit" && echo "COPYRIGHT OK"
cd saberparatodos && npx playwright test tests/e2e/cuentos --project=chromium --project="Mobile Chrome" 2>&1 | tail -15
node scripts/validate_cuentos.js
git status --porcelain
grep -n "Qué falta" ../docs/CUENTOS/INFORME_CIERRE.md || grep -n "Qu[eé] falta\|what-is-missing\|Missing" ../docs/CUENTOS/INFORME_CIERRE.md
```

## 12. Dependencies & Merge Order (C5 after C1–C4 + internal 1–4)

- Wave C5 merges only after C1–C4. **C5.04 merges LAST (position 04 of 1→4)** — hard dependency on merged C5.01 (logros telemetry grep), C5.02 (sitemap/meta counts), C5.03 (offline matrix consolidation). Do NOT start the final report run until all three are on the branch.
- If any of C5.01–C5.03 is late: the audit may run preliminarily but the report must mark the missing island as blocker and the issue stays open until re-run green.
- After C5.04 merges, the cuentos program is closed; remaining what-is-missing follow-ups become standalone issues outside the C-series.

## 13. Failure Recovery

- Validator shows errors → STOP auditing, file blocker entries per story (do not fix content here), re-run after owner wave fixes; the cierre script's non-zero exit is the signal, not a personal failure.
- E2E harness missing or red → record verbatim tail + blocker entry; never rewrite specs to green (forbidden in §8); never mark the wave PASS on partial evidence.
- Copyright grep mismatch (total≠hit) → list exact files missing headers as blocker entries with paths; one-line header fixes are the ONLY allowed inline content touch, each listed in the PR.
- Flaky e2e (passes locally, fails once) → re-run twice, record all 3 tails; 2/3 green = flaky-follow-up entry (not blocker) with the failing assertion quoted.
- Report growing stale before merge (new C5 commits land) → re-run the full §11 block on the final SHA and update pasted outputs; stale evidence fails review.
