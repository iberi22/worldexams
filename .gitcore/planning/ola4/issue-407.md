# [Ola 4.07] feat-leaderboard-live-mesh — Mesh Leaderboard Aggregates Consumer & Live UI

> Ola 4 — UI / Mesh.
> Labels: `ola4`, `wave-4`

---

## Current State (MEDIBLE)
- Feature: `feat-leaderboard-live-mesh` at 50% in `features.json`
- `saberparatodos/src/lib/mesh/leaderboard-mesh.ts` and `src/lib/mesh/WorldExamsNode.ts` implement the sync logic.
- UI in `saberparatodos/src/pages/leaderboard.astro` needs a live reactive Svelte component subscribing to `WorldExamsNode.subscribe()`.

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/components/leaderboard/LeaderboardLiveMesh.svelte`:
  - Subscribes to `WorldExamsNode.subscribe()` for real-time mesh vector updates.
  - Displays:
    * Global Percentile / Average table (Top 50 anonymous nodes).
    * Subject breakdown filter (Matemáticas, Lectura Crítica, Ciencias, Sociales, Inglés).
    * Local Node Status Card: Current node's standing, personal score, opt-in toggle button.
    * Real-time mesh connection indicator (Connected / Syncing / Offline).
  - Integrates seamlessly into `saberparatodos/src/pages/leaderboard.astro`.
- **File Target**: `saberparatodos/src/components/leaderboard/LeaderboardLiveMesh.svelte` and `saberparatodos/tests/unit/LeaderboardLiveMesh.test.ts`.

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] Renders Top 50 anonymous rankings cleanly without displaying student personal identifiers.
- [ ] Reacts dynamically when new vectors arrive from `WorldExamsNode`.
- [ ] `npm run test:unit -- saberparatodos/tests/unit/LeaderboardLiveMesh.test.ts` passes 100%.

## Files to Modify / Create
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/leaderboard/LeaderboardLiveMesh.svelte` | [NEW] | Reactive Svelte 5 component for live mesh leaderboard | LOW |
| `saberparatodos/tests/unit/LeaderboardLiveMesh.test.ts` | [NEW] | Component unit test with mock mesh peer vectors | LOW |

## DO NOT touch
- `saberparatodos/src/lib/mesh/leaderboard-mesh.ts` — stable baseline
- `saberparatodos/src/pages/admin/` — assigned to Issue #408
- `features.json` — reconciled at wave end (Issue #410)

## Anti-Hallucination Guard
1. READ before write: inspect `saberparatodos/src/lib/mesh/leaderboard-mesh.ts` and `src/lib/mesh/types.ts`.
2. Enforce BR-03 and BR-04 in UI: no karma, no tokens, no PII.

## Merge Order
- **Merge order within wave:** 7
- **Expected effort:** Medium (<45m)
- **Parallel with:** All other wave issues (disjoint file islands)
