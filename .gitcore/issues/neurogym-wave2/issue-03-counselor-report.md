# [Ola 2.03] feat-neurogym-counselor-report — Psychopedagogical Clinical & School Counselor Report Generator

> Ola 2 — NeuroGym Psychopedagogy.
> Labels: `ola2`, `wave-2`, `neurogym`

---

## Current State (MEDIBLE)
- File: `saberparatodos/src/lib/neurogym/scoring-cognitive.ts` contains `FullCognitiveProfile`.
- Tests: 71 test suites passing (570 tests).

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/components/neurogym/NeuroCounselorReport.svelte` generating detailed psychopedagogical reports formatted for school psychologists, including learning style recommendations, attentional fatigue flags and compensatory strategies.
- **File Target**: `saberparatodos/src/components/neurogym/NeuroCounselorReport.svelte`

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "NeuroCounselorReport" saberparatodos/src/components/neurogym/` >= 1 match

## Files to Modify
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/neurogym/NeuroCounselorReport.svelte` | Non-existent | [NEW] School psychologist cognitive report exporter | LOW |
