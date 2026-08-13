# [Validation] Unit tests for exam-room mesh module (roomState, connection, antiCheat, reportGenerator) — target 70% coverage

> Validation wave — Mesh functionality. Labels: `validation`, `mesh-tests` (sin `jules` todavía)

---

## Current State (MEDIBLE)

- Mesh/exam-room module implemented but **0% unit test coverage**:
  - `saberparatodos/src/lib/p2p-edge-mesh.ts` (485 lines) — **0% covered** (vitest)
  - `saberparatodos/src/lib/p2p-service.ts` (333 lines) — **0% covered**
  - `saberparatodos/src/modules/exam-room/stores/roomState.svelte.ts` (865 lines) — no unit tests
  - `saberparatodos/src/modules/exam-room/services/connection.ts` (298 lines) — no unit tests
  - `saberparatodos/src/modules/exam-room/services/antiCheat.ts` (123 lines) — no unit tests
  - `saberparatodos/src/modules/exam-room/services/reportGenerator.ts` (441 lines) — no unit tests
- Existing unit tests: `saberparatodos/tests/unit/` has only 2 files (pool-selection, filters).
- Vitest config: `saberparatodos/vitest.config.ts` — include `src/**/*.{test,spec}.{js,ts}` + `tests/unit/**`, coverage include `src/lib/**` + `src/utils/**` (NOT `src/modules/**`).
- Suite baseline: `npx vitest run` = 215 tests passing, total coverage 24.07% lines.
- Repo: `iberi22/worldexams`, package `saberparatodos/`, run tests from `saberparatodos/`.

## Desired State (DELTA)

- New unit tests (vitest, in `saberparatodos/tests/unit/`) covering:
  1. `antiCheat.ts` — SuspiciousEvent detection: tab_switch, window_blur, page_hidden, long_inactivity (record + query logic)
  2. `reportGenerator.ts` — RoomResults generation: player stats, question stats, average score/time, edge cases (0 players, ties)
  3. `connection.ts` — mode detection (edge-mesh default, supabase mirror gating, local fallback), disconnect cleanup, getCodigoSala
  4. `roomState.svelte.ts` — plan limits enforcement (free 10 players / pro 100 / institutional 1000, weekly exam count), createRoom, answer recording, results assembly
  5. `p2p-edge-mesh.ts` — pure helpers if any (asNodoId, estadoMesh/estadoSalon store transitions) — mock `edge-mesh` import if needed
- **Coverage target**: `src/modules/exam-room/**` + `src/lib/p2p-edge-mesh.ts` + `src/lib/p2p-service.ts` at **>= 70% lines** combined (measure with `npx vitest run --coverage`).
- Tests must run in isolation (mock `edge-mesh`, `supabase`, `svelte/store` where needed) — NO real P2P/network.

## 🔬 Agent Session Prompt

"Before implementing, please:
1. Read `saberparatodos/vitest.config.ts` — note coverage include/exclude paths.
2. Read `saberparatodos/src/modules/exam-room/services/antiCheat.ts`, `reportGenerator.ts`, `connection.ts` and `stores/roomState.svelte.ts` — map the pure logic vs side-effectful code (imports of `edge-mesh`, `supabase`, `svelte/store`).
3. Read existing tests `saberparatodos/tests/unit/pool-selection.unit.test.ts` — follow the same style.
4. Identify which functions are testable without network: antiCheat record/query, reportGenerator assembly, plan-limit math, answer scoring.
5. Write tests with vi.mock for `edge-mesh` and `@supabase/supabase-js` imports; for `roomState.svelte.ts` use `@testing-library/svelte` if needed or extract pure helpers.
6. Run `npx vitest run` until green, then `npx vitest run --coverage` and report per-file %."

## Acceptance Criteria (VERIFICABLES POR COMANDO)

- [ ] `ls saberparatodos/tests/unit/` contains >= 4 new test files (antiCheat, reportGenerator, connection, roomState)
- [ ] `grep -c "describe(" saberparatodos/tests/unit/antiCheat.unit.test.ts` >= 2
- [ ] `cd saberparatodos && npx vitest run 2>&1 | grep "Tests "` — 0 failed, count increased from 215
- [ ] `cd saberparatodos && npx vitest run --coverage 2>&1 | grep "exam-room"` — shows >= 70% line coverage for the module
- [ ] `cd saberparatodos && npx vitest run --coverage 2>&1 | grep "p2p-edge-mesh"` — shows >= 70%
- [ ] No network calls in tests: `grep -rn "peerjs\|0.peerjs" tests/unit/` — 0 matches
- [ ] `wc -l tests/unit/*.unit.test.ts` — each new file >= 30 lines (no empty test files)

## Files to Modify

| Path | Change | Risk |
|------|--------|------|
| `saberparatodos/tests/unit/antiCheat.unit.test.ts` (new) | Test SuspiciousEvent logic | LOW |
| `saberparatodos/tests/unit/reportGenerator.unit.test.ts` (new) | Test RoomResults assembly | LOW |
| `saberparatodos/tests/unit/connection.unit.test.ts` (new) | Test mode detection/disconnect | MED (edge-mesh import mock) |
| `saberparatodos/tests/unit/roomState.unit.test.ts` (new) | Test plan limits + createRoom + answers | MED (svelte runes) |
| `saberparatodos/tests/unit/p2p-edge-mesh.unit.test.ts` (new) | Test pure helpers/store transitions | MED |
| `saberparatodos/vitest.config.ts` | Add `src/modules/**` to coverage include | LOW |

## DO NOT touch (Anti-Regression)

- `saberparatodos/src/modules/exam-room/**` source files — unless a tiny refactor (export pure helper) is strictly required; prefer testing via public API
- `saberparatodos/tests/party-*.spec.ts` and other E2E specs — separate concern (another issue)
- `questions_data/**`, `AGENTS.md`, `.gitcore/features.json`
- No real network/PeerJS connections in tests

## Anti-Hallucination Guard ⚠️

1. **Mock external deps**: `edge-mesh`, `supabase-js`, `rust-backend` imports MUST be vi.mock'd — tests must run offline
2. **Don't fake coverage**: a test file that imports but never calls the SUT does not count — assert real behavior
3. **svelte runes**: `roomState.svelte.ts` uses `$state`/`$derived` (Svelte 5 runes) — if direct import fails, use `@testing-library/svelte` or extract pure functions; do NOT delete runes syntax
4. **Baseline must stay green**: `npx vitest run` — all 215 existing tests must still pass
5. **No empty test files**: each file must have real `describe`/`it` blocks with assertions
6. **Never open an empty PR**: `git diff --stat HEAD` must list >= 5 files

## Verification

```bash
cd saberparatodos
npx vitest run 2>&1 | tail -5                    # all green, 215+ tests
npx vitest run --coverage 2>&1 | grep -E "exam-room|p2p-edge|p2p-service|All files"
```

## Dependencies & Merge Order

- **Depends on:** none
- **Parallel with:** bundle_index fix (disjoint file islands: tests/unit vs questions_data)
- **Merge order:** 2
- **Expected effort:** Large (4h+)

## Failure Recovery

| If this happens | Action |
|----------------|--------|
| `roomState.svelte.ts` import fails (runes) | Use `@testing-library/svelte` render, or extract pure helpers with `export` |
| edge-mesh mock incomplete | Mock the module with `vi.mock('edge-mesh', () => ({...}))` per test |
| coverage below 70% | Add more cases: edge cases, error paths, empty inputs |
| existing tests break | Do NOT change them — fix your new tests/imports instead |
