# [Ola 4.01] feat-neurogym-audio-curriculum — Binaural & Isochronic Psychoacoustic Generator

> Ola 4 — NeuroGym Psychoacoustics & Focus Audio.
> Labels: `ola4`, `wave-4`, `neurogym`

---

## Current State (MEDIBLE)
- File: `saberparatodos/src/lib/neurogym/audio-synthesizer.ts` has tone generator.
- Tests: 72 test suites passing (573 tests).

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/lib/neurogym/psychoacoustic-engine.ts` generating real-time binaural beats and isochronic tones for targeted cognitive states (Alpha 10Hz for Calm Focus, Beta 18Hz for Intensive Processing, Gamma 40Hz for Working Memory binding) with Web Audio API.
- **File Target**: `saberparatodos/src/lib/neurogym/psychoacoustic-engine.ts`

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "PsychoacousticEngine" saberparatodos/src/lib/neurogym/` >= 1 match
