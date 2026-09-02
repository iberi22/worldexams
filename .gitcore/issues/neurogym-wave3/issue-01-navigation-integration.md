# [Ola 3.01] feat-neurogym-nav-hub — Complete Navigation, Layout & Section Routing Integration

> Ola 3 — NeuroGym Ecosystem Integration.
> Labels: `ola3`, `wave-3`, `neurogym`

---

## Current State (MEDIBLE)
- Route: `/neurogym` has basic standalone runner.
- Tests: 72 test suites passing (573 tests).

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/components/neurogym/NeuroGymApp.svelte` unifying tabs:
  1. `Evaluación Psicométrica` (`NeuroBatteryRunner`)
  2. `Gimnasio Diario` (`NeuroDailyWorkoutHub`)
  3. `Duelo P2P` (`NeuroP2PDuelBoard`)
  4. `Talleres de Aula` (`NeuroWorkshopGenerator`)
  5. `Dictamen Orientación` (`NeuroCounselorReport`)
  6. `Radar & Historial Local` (`CognitiveRadarChart` + `getNeuroSessionsHistory`)
- **File Target**: `saberparatodos/src/components/neurogym/NeuroGymApp.svelte`

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "NeuroGymApp" saberparatodos/src/components/neurogym/` >= 1 match
