# [Ola 1.10] test-neurogym-exhaustive-e2e — Comprehensive Playwright E2E Test Suite for NeuroGym Suite

> Ola 1 — NeuroGym E2E Quality Assurance.
> Labels: `ola1`, `wave-1`, `neurogym` (without `jules` yet)

---

## Current State (MEDIBLE)
- Feature: `feat-neurogym-assessment` at 60% in `.gitcore/features.json`
- File: `saberparatodos/tests/e2e/neurogym-assessment.spec.ts` exists.
- Tests: 70 existing, 568 passing.

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/tests/e2e/neurogym-full-battery.spec.ts` with end-to-end coverage testing the complete battery, timeout handling, invalid input protection, institutional consent toggles and score calculation validity.
- **File Target**: `saberparatodos/tests/e2e/neurogym-full-battery.spec.ts`

## Web Research Required
1. search: "Playwright cross-browser timer manipulation and WebAudio testing"
2. search: "E2E testing interactive canvas SVG game states"

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "neurogym-full-battery" saberparatodos/tests/e2e/` >= 1 match
- [ ] Validates 100% of user pathways from home screen, assessment execution, radar visualization to workout plan generation.

## Files to Modify
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/tests/e2e/neurogym-full-battery.spec.ts` | Non-existent | [NEW] Full E2E matrix testing | LOW |

## DO NOT touch
- `saberparatodos/src/lib/neurogym/`
- `.gitcore/features.json` — reconciled at wave end

## Anti-Hallucination Guard
1. Follow Playwright TypeScript conventions.
2. Use stable locators with data-testid or descriptive accessible labels.

## Merge Order
- **Merge order within wave:** 10
- **Expected effort:** Small (<25m)
- **Parallel with:** All other wave-1 issues (disjoint file islands)
