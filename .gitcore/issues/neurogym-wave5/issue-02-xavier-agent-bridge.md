# [Ola 5.02] feat-neurogym-xavier-agentic-layer — Sovereign Agentic Layer & Xavier Fast Context Bridge

> Ola 5 — NeuroGym Agentic Intelligence.
> Labels: `ola5`, `wave-5`, `neurogym`, `agentic`, `xavier`

---

## Current State (MEDIBLE)
- Xavier Vector & Context API active at `:8006`.
- Tests: 73 test suites passing (575 tests).

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/lib/neurogym/agentic-neuro-coach.ts` connecting NeuroGym to the local Xavier runtime (`http://localhost:8006/v1/memories`) to:
  1. Retrieve student historical cognitive trajectories without exposing PII.
  2. Dynamically synthesize personalized micro-challenges and adaptive cognitive workouts.
  3. Emit structured pedagogical recommendations through an agentic loop.
- **File Target**: `saberparatodos/src/lib/neurogym/agentic-neuro-coach.ts`

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "AgenticNeuroCoach" saberparatodos/src/lib/neurogym/` >= 1 match
