# [Ola 1.02] feat-neurogym-dual-nback — Dual N-Back Audio-Visual Synchronous Task Engine

> Ola 1 — NeuroGym Core Stimuli.
> Labels: `ola1`, `wave-1`, `neurogym` (without `jules` yet)

---

## Current State (MEDIBLE)
- Feature: `feat-neurogym-assessment` at 60% in `.gitcore/features.json`
- File: `saberparatodos/src/lib/neurogym/audio-synthesizer.ts` has `playNBackLetterTone(index)`.
- Tests: 70 existing, 568 passing.

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/components/neurogym/stimuli/DualNBackStimulus.svelte` allowing simultaneous 3x3 visual position matches and synthesized audio letter matches for $N \in [1, 4]$.
- **File Target**: `saberparatodos/src/components/neurogym/stimuli/DualNBackStimulus.svelte`

## Web Research Required
1. search: "Jaeggi Dual N-Back working memory fluid intelligence protocol"
2. search: "WebAudio synchronized visual stimuli millisecond timer"

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "DualNBackStimulus" saberparatodos/src/components/neurogym/` >= 1 match
- [ ] Dual response buttons ("Posición Coincide", "Sonido Coincide") compute precision & recall accurately.

## Files to Modify
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/neurogym/stimuli/DualNBackStimulus.svelte` | Non-existent | [NEW] Synchronous Audio-Visual Dual N-Back Component | LOW |

## DO NOT touch
- `saberparatodos/src/components/neurogym/stimuli/CorsiBlockBoard.svelte` — assigned to Issue #01
- `.gitcore/features.json` — reconciled at wave end

## Anti-Hallucination Guard
1. Import and utilize `neuroAudio.playNBackLetterTone` from `../../lib/neurogym/audio-synthesizer`.
2. Follow Svelte 5 runes strict syntax.

## Merge Order
- **Merge order within wave:** 2
- **Expected effort:** Small (<30m)
- **Parallel with:** All other wave-1 issues (disjoint file islands)
