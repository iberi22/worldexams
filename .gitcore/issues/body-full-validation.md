# [Validation] Fix global validate: run full test suite (unit + E2E party) and document mesh functional status

> Validation wave — Full functional validation. Labels: `validation`, `test-run` (sin `jules` todavía)

---

## Current State (MEDIBLE)

- `saberparatodos/package.json` scripts: `test` (playwright), `test:unit` (vitest), `test:coverage`, `test:party`, `smoke:ai`, `validate`.
- Unit tests: `npx vitest run` = **215 passed**, total coverage **24.07%** (mesh at 0%).
- E2E Playwright: 116 tests across `saberparatodos/tests/*.spec.ts`; party-related: party-mode (1), party-mode-real-flow (2), party-focus (1), party-results-e2e (1), party-smoke (2), speed-challenge (1), sw-p2p-recovery (6), lan-discovery (7).
- `saberparatodos/test-results/.last-run.json` shows **`{"status":"failed","failedTests":[2 IDs]}`** — last E2E run FAILED.
- No party-mode run artifacts in `test-results/` — party E2E never verified green.
- `npm run validate` global currently FAILS on 1325 bundles missing `bundle_index` (addressed by the bundle_index issue — merge that first).
- GitHub Actions CI is **blocked by Actions budget** ("Actions budget is preventing further use") — local verification is the only path.
- Repo: `iberi22/worldexams`, run everything from `saberparatodos/`.

## Desired State (DELTA)

1. **Unit suite green**: `npx vitest run` — 0 failures (215+ tests, including new mesh tests from the mesh-tests issue).
2. **E2E party suite green**: `npx playwright test party-mode.spec.ts party-mode-real-flow.spec.ts party-focus.spec.ts party-results-e2e.spec.ts party-smoke.spec.ts speed-challenge.spec.ts sw-p2p-recovery.spec.ts lan-discovery.spec.ts` — all pass (or failures documented with root cause + fixed).
3. **E2E full suite**: run remaining specs; classify failures: env-only vs real bugs; fix real bugs.
4. **Documentation**: update `docs/E2E_PARTY_MODE_TESTS.md` — it references non-existent components (`PartyHost.svelte`, `PartyJoin.svelte`) and has an unchecked "Tests ejecutados exitosamente" item; rewrite to match `src/modules/exam-room/` reality and mark verification status with actual test results.
5. **Smoke AI**: `npm run smoke:ai` passes or documented env-blocker.

## 🔬 Agent Session Prompt

"Before implementing, please:
1. Read `saberparatodos/playwright.config.ts` — note webServer auto-start (port 4321), workers=1, testDir=./tests.
2. Read `docs/E2E_PARTY_MODE_TESTS.md` — note it is stale (PartyHost.svelte/PartyJoin.svelte no longer exist).
3. Read `saberparatodos/src/modules/exam-room/` to understand the CURRENT party architecture (RoomApp, LobbyBrowser, PlayerView, HostControls, SpeedChallengeSetup, StopModeSetup, RoomResults).
4. Run the unit suite: `npx vitest run` — must be green.
5. Run the party E2E suite: `npx playwright test tests/party-mode.spec.ts tests/party-mode-real-flow.spec.ts tests/party-focus.spec.ts tests/party-results-e2e.spec.ts tests/party-smoke.spec.ts tests/speed-challenge.spec.ts tests/sw-p2p-recovery.spec.ts tests/lan-discovery.spec.ts`.
6. For each failure: read the test, read the component it exercises, classify (env vs code), fix code bugs in `saberparatodos/src/` ONLY where the test reveals a real bug.
7. Update `docs/E2E_PARTY_MODE_TESTS.md` with real results and current architecture."

## Acceptance Criteria (VERIFICABLES POR COMANDO)

- [ ] `cd saberparatodos && npx vitest run 2>&1 | grep "Tests "` — 0 failed
- [ ] `cd saberparatodos && npx playwright test tests/party-mode.spec.ts 2>&1 | tail -3` — "passed" (1 test, host + 4 students)
- [ ] `cd saberparatodos && npx playwright test tests/lan-discovery.spec.ts 2>&1 | tail -3` — "passed"
- [ ] `cd saberparatodos && npx playwright test tests/sw-p2p-recovery.spec.ts 2>&1 | tail -3` — "passed"
- [ ] `grep -c "PartyHost.svelte" docs/E2E_PARTY_MODE_TESTS.md` — **0** (stale reference removed)
- [ ] `grep -c "modules/exam-room" docs/E2E_PARTY_MODE_TESTS.md` >= 1 (doc reflects current architecture)
- [ ] `grep -c "PASS\|passed\|✅" docs/E2E_PARTY_MODE_TESTS.md` >= 3 (verification status documented)
- [ ] `git diff --stat HEAD` lists >= 2 files (doc + any fix)

## Files to Modify

| Path | Change | Risk |
|------|--------|------|
| `docs/E2E_PARTY_MODE_TESTS.md` | Rewrite: current architecture + real test results | LOW |
| `saberparatodos/src/**` (only if tests reveal real bugs) | Fix bugs found by E2E | MED |
| `saberparatodos/tests/*.spec.ts` (only if test itself is wrong) | Fix flaky/wrong assertions | MED |

## DO NOT touch (Anti-Regression)

- `questions_data/**` — content is another issue's scope
- `.gitcore/features.json` — reconciled separately
- `saberparatodos/vitest.config.ts` — mesh-tests issue scope
- `saberparatodos/tests/unit/**` — mesh-tests issue scope (vitest unit tests)
- Do NOT delete E2E tests to make them pass — fix code or fix the test to match real behavior
- Do NOT commit test-results artifacts

## Anti-Hallucination Guard ⚠️

1. **Never delete a failing test** to get green — either fix the code (real bug) or fix the test (wrong expectation), and document which
2. **Classify env vs code**: Playwright webServer auto-start may fail on port conflicts — that's env, not code
3. **party-mode.spec.ts uses 5 browser contexts** (host + 4 players) — needs `workers: 1` (already set); do not parallelize
4. **sw-p2p-recovery tests need a Service Worker** — if SW not registered, verify `public/sw.js` exists before blaming code
5. **lan-discovery tests need the mesh relay** — if they require network, mark them as env-dependent in docs instead of deleting
6. **Never open an empty PR**: `git diff --stat HEAD` must list >= 2 files

## Verification

```bash
cd saberparatodos
npx vitest run 2>&1 | tail -4
npx playwright test tests/party-mode.spec.ts tests/party-mode-real-flow.spec.ts 2>&1 | tail -5
npx playwright test tests/lan-discovery.spec.ts tests/sw-p2p-recovery.spec.ts 2>&1 | tail -5
npm run smoke:ai 2>&1 | tail -5
```

## Dependencies & Merge Order

- **Depends on:** bundle_index fix (validate must pass first), mesh-tests issue (unit suite baseline)
- **Blocked by:** those two merges
- **Merge order:** 3 (LAST in this wave)
- **Expected effort:** Large (4h+)

## Failure Recovery

| If this happens | Action |
|----------------|--------|
| Playwright can't start server | Port busy — kill old server, re-run; or set PLAYWRIGHT_BASE_URL |
| party-mode times out (90-120s) | Check edge-mesh relay reachability; document as env |
| sw-p2p-recovery fails on SW | Check public/sw.js registration path |
| lan-discovery needs network | Document as env-dependent in docs, do NOT delete |
| validate fails from bundle_index | Rebase on main after bundle_index fix merged |
