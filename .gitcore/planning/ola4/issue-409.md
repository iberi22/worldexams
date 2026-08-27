# [Ola 4.09] feat-e2e-offline-mesh-suite — E2E Integration Suite for Offline & Mesh Exam Flow

> Ola 4 — Testing / E2E.
> Labels: `ola4`, `wave-4`

---

## Current State (MEDIBLE)
- Feature: `feat-tests` at 20% in `features.json`
- Existing Playwright / Vitest test files have legacy broken mocks in checkout.
- No unified E2E test covers the offline grade download -> offline practice -> encrypted save -> mesh score publish sequence.

## Desired State (DELTA)
- **Specific Addition**: Implement comprehensive integration test suites:
  - `saberparatodos/tests/e2e/offline-exam-flow.spec.ts`:
    * Downloads Grade 11 pack offline.
    * Sets browser to offline mode.
    * Completes full exam with timer and answers.
    * Checks results screen and feedback rendering.
    * Verifies encrypted record saved in IndexedDB.
  - `saberparatodos/tests/e2e/mesh-leaderboard.spec.ts`:
    * Connects to mock mesh node.
    * Publishes anonymous score with opt-in enabled.
    * Verifies zero PII in network requests.
    * Verifies leaderboard updates with anonymized node hash.
- **File Target**: `saberparatodos/tests/e2e/offline-exam-flow.spec.ts` and `saberparatodos/tests/e2e/mesh-leaderboard.spec.ts`.

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npx playwright test saberparatodos/tests/e2e/offline-exam-flow.spec.ts` passes 100%.
- [ ] `npx playwright test saberparatodos/tests/e2e/mesh-leaderboard.spec.ts` passes 100%.
- [ ] Zero unhandled rejections or console errors during test run.

## Files to Modify / Create
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/tests/e2e/offline-exam-flow.spec.ts` | [NEW] | End-to-end test for offline exam experience | LOW |
| `saberparatodos/tests/e2e/mesh-leaderboard.spec.ts` | [NEW] | End-to-end test for mesh leaderboard publication & Zero-PII | LOW |

## DO NOT touch
- `saberparatodos/src/` — all feature files handled by respective issues
- `features.json` — reconciled at wave end (Issue #410)

## Anti-Hallucination Guard
1. READ before write: inspect `saberparatodos/playwright.config.ts`.
2. Use standard Playwright page fixtures with proper timeouts and network interception.

## Merge Order
- **Merge order within wave:** 9
- **Expected effort:** Medium (<45m)
- **Parallel with:** All other wave issues (disjoint file islands)
