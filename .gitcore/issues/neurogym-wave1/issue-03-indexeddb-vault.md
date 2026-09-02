# [Ola 1.03] feat-neurogym-storage — Sovereign IndexedDB & Local Storage Manager for Longitudinal Neuro Profiles

> Ola 1 — NeuroGym Storage & Privacy.
> Labels: `ola1`, `wave-1`, `neurogym` (without `jules` yet)

---

## Current State (MEDIBLE)
- Feature: `feat-neurogym-assessment` at 60% in `.gitcore/features.json`
- File: `saberparatodos/src/lib/neurogym/scoring-cognitive.ts` contains `FullCognitiveProfile`.
- Tests: 70 existing, 568 passing.

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/lib/neurogym/neuro-storage.ts` with local IDB database `worldexams_neurogym` storing sessions history, longitudinal radar evolutions, streak counts and daily training timestamps.
- **File Target**: `saberparatodos/src/lib/neurogym/neuro-storage.ts`

## Web Research Required
1. search: "IndexedDB TypeScript lightweight wrapper for time-series sessions"
2. search: "Longitudinal cognitive tracking standard deviation metrics"

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "saveNeuroSession" saberparatodos/src/lib/neurogym/neuro-storage.ts` >= 1 match
- [ ] Exports `saveNeuroSession`, `getNeuroSessionsHistory`, `getLatestCognitiveRadar`, `clearNeuroHistory`.

## Files to Modify
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/lib/neurogym/neuro-storage.ts` | Non-existent | [NEW] Sovereign IDB local storage engine | LOW |
| `saberparatodos/src/lib/neurogym/neuro-storage.test.ts` | Non-existent | [NEW] Unit tests validating CRUD & aggregation | LOW |

## DO NOT touch
- `saberparatodos/src/lib/neurogym/scoring-cognitive.ts`
- `.gitcore/features.json` — reconciled at wave end

## Anti-Hallucination Guard
1. Ensure full SSR safety (`typeof window !== 'undefined'`).
2. Zero external dependencies; use native IndexedDB + localStorage fallback.

## Merge Order
- **Merge order within wave:** 3
- **Expected effort:** Small (<25m)
- **Parallel with:** All other wave-1 issues (disjoint file islands)
