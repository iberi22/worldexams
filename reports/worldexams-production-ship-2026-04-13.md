# WorldExams Production Ship Report - 2026-04-13

## Completed Tasks

### 1. Curation Agent - Bundle Review
- **Script:** `node scripts/curation-agent.ts --review --limit=20`
- **Result:** Processed 20 bundles
  - Approved: 3 ✅
  - Rejected: 4 ❌  
  - Needs Human: 13 ⚠️
- **Key issue:** Many bundles have `Expected 20 questions, found 0` — the question count regex doesn't match the bundle format (uses `## Question N` vs `## Question` pattern). Root cause is bundles that follow the 2024-format (no `## Question N` headers visible to the script).
- **Remaining:** 199 bundles still pending review
- **Recommendation:** Update `countQuestions()` in curation-agent.ts to also scan for `### Enunciado` pattern (section-based questions) or count `##` h2 blocks per question.

### 2. Test Coverage
- **Vitest unit tests:** All 113 tests pass (18 test files)
- **New unit tests added:**
  - `filters.unit.test.ts` — tests for `filterBySubject`, `filterByGradeAndDiagnostic`, `filterByCefrLevel`
  - `pool-selection.unit.test.ts` — tests for `dedupeById`, `buildDiagnosticMixPool`
- **Playwright E2E tests:** 26 spec files already exist, covering:
  - Grade 3-11 period selection, English pool, party mode, auth, blog filters, etc.
  - Grade 11 matrix coverage tests (`e2e-matrix.spec.ts`) exist and run (but Grade 11 Period tests have modal visibility assertions that may fail post-deploy)
- **Coverage gap:** `src/lib/questions/filters.ts` line coverage was 27%. Now improved.
- **Known uncovered:** `src/lib/questions/orchestrator.ts`, `src/lib/questions/selection.ts`, `src/lib/questions/lookup.ts`, `src/lib/questions/repository.ts`

### 3. Deployment
- **Cloudflare Pages:** ✅ Configured with `output: 'server'` + `adapter: cloudflare` in `astro.config.mjs`
- **Existing workflow:** `.github/workflows/deploy-production.yml` existed but was `workflow_dispatch` only
- **Updated:** Now auto-triggers on push to `main` + includes `deploy-api` job for `apps/worldexams-api`
- **API Worker:** `apps/worldexams-api` deploys via `wrangler deploy` to `api.saberparatodos.space`

### 4. Questions Data Audit
**Per-grade coverage (Colombia):**
| Grade | Questions | Status |
|-------|-----------|--------|
| G3 | 222 | ✅ |
| G4 | 110 | ⚠️ |
| G5 | 100 | ⚠️ |
| G6 | 400 | ✅ |
| G7 | 408 | ✅ |
| G8 | 400 | ✅ |
| G9 | 8 | ❌ CRITICAL |
| G11 | 2375 | ✅ |

**Gaps (< 50 questions):**
- G3 matematicas: 48
- G3 ciencias-naturales: 40
- G3 sociales-ciudadanas: 40
- G3 tecnologia-informatica: 8
- G7 tecnologia-informatica: 8
- G9 matematicas: 8 (CRITICAL)

**Per-subject coverage:**
- ingles: 1606 total ✅
- lectura-critica: 762 total ✅
- matematicas: 693 total ✅
- sociales-ciudadanas: 566 total ✅
- ciencias-naturales: 380 total ⚠️
- tecnologia-informatica: 16 total ❌ CRITICAL

### 5. Playwright Setup
- **Config:** `saberparatodos/playwright.config.ts` exists ✅
- **Tests:** 26 spec files in `saberparatodos/tests/` ✅
- **Missing:** No root-level `playwright.config.ts` at workspace root (tests workspace has its own)
- **Note:** E2E tests already cover question browsing, answer submission, grade selection, period selection, English diagnostic

## Commits Made
1. `baa6b717` — test: add unit tests for filters.ts
2. `Pending` — ci: add auto-deploy on main + API worker deploy

## Next Steps for Production Ship
1. **Fix curation agent** question counting (use `### Enunciado` pattern or count h2 blocks)
2. **Critical:** Generate G9 math questions (only 8 exist)
3. **Critical:** Generate tecnologia-informatica questions across grades (only 16 total)
4. **Playwright CI:** Add `npx playwright test` to CI pipeline after build step
5. **Coverage:** Write tests for `orchestrator.ts` and `lookup.ts`
6. **Grade 11 Period:** Investigate why `e2e-matrix.spec.ts` Period 1-4 tests show modal visibility but still fail (timeout after 2min waiting for question load)