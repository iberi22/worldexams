# [Ola 1.05] feat-neurogym-training-hub — Adaptive Daily Micro-Workout Hub & Streak Tracker

> Ola 1 — NeuroGym Training Loop.
> Labels: `ola1`, `wave-1`, `neurogym` (without `jules` yet)

---

## Current State (MEDIBLE)
- Feature: `feat-neurogym-assessment` at 60% in `.gitcore/features.json`
- File: `saberparatodos/src/pages/neurogym/index.astro` exists.
- Tests: 70 existing, 568 passing.

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/components/neurogym/NeuroDailyWorkoutHub.svelte` managing a 7-minute targeted workout sequence (Rotations, Inversion Stroop, Speed Tap) with adaptive difficulty scaling and daily habit tracking.
- **File Target**: `saberparatodos/src/components/neurogym/NeuroDailyWorkoutHub.svelte`

## Web Research Required
1. search: "neuroplasticity micro-training habit formation 5-10 minutes daily"
2. search: "adaptive staircase method psychometrics difficulty scaling"

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "NeuroDailyWorkoutHub" saberparatodos/src/components/neurogym/` >= 1 match
- [ ] Tracks current day streak and computes adaptive level increment upon >=85% accuracy.

## Files to Modify
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/neurogym/NeuroDailyWorkoutHub.svelte` | Non-existent | [NEW] Daily 7-minute training orchestrator | LOW |

## DO NOT touch
- `saberparatodos/src/components/neurogym/NeuroBatteryRunner.svelte`
- `.gitcore/features.json` — reconciled at wave end

## Anti-Hallucination Guard
1. Coordinate with `neuro-storage.ts` for streak persistence.
2. Svelte 5 runes state management.

## Merge Order
- **Merge order within wave:** 5
- **Expected effort:** Small (<30m)
- **Parallel with:** All other wave-1 issues (disjoint file islands)
