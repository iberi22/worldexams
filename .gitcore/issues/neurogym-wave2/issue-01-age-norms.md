# [Ola 2.01] feat-neurogym-age-norms — Pediatric & Developmental Normative Tables (Grades 3°-11° + Adults)

> Ola 2 — NeuroGym Psychometric Calibration.
> Labels: `ola2`, `wave-2`, `neurogym`

---

## Current State (MEDIBLE)
- File: `saberparatodos/src/lib/neurogym/scoring-cognitive.ts` contains basic normal distribution.
- Tests: 71 test suites passing (570 tests).

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/lib/neurogym/normative-tables.ts` providing empirical mean & SD psychometric norms by age groups (8-10y, 11-13y, 14-16y, 17-18y, 19+y) for accurate school grade benchmarking.
- **File Target**: `saberparatodos/src/lib/neurogym/normative-tables.ts`

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "getAgeAdjustedNorms" saberparatodos/src/lib/neurogym/normative-tables.ts` >= 1 match

## Files to Modify
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/lib/neurogym/normative-tables.ts` | Non-existent | [NEW] Developmental age norm tables | LOW |
| `saberparatodos/src/lib/neurogym/normative-tables.test.ts` | Non-existent | [NEW] Unit tests for normative lookup | LOW |
