# [Ola 1.01] feat-neurogym-corsi-3d — Interactive 3D/2D Corsi Block-Tapping Stimulus Component

> Ola 1 — NeuroGym Core Stimuli.
> Labels: `ola1`, `wave-1`, `neurogym` (without `jules` yet)

---

## Current State (MEDIBLE)
- Feature: `feat-neurogym-assessment` at 60% in `.gitcore/features.json`
- File: `saberparatodos/src/lib/neurogym/secure-items-vault.ts` exports `generateCorsiSequence` (lines 106-122).
- Tests: 70 existing, 568 passing.

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/components/neurogym/stimuli/CorsiBlockBoard.svelte` providing an interactive 9-block spatial grid that highlights blocks sequentially with WebAudio feedback and records user reproduction order.
- **File Target**: `saberparatodos/src/components/neurogym/stimuli/CorsiBlockBoard.svelte`

## Web Research Required
1. search: "Corsi block-tapping test visual working memory span psychometrics"
2. search: "Svelte 5 runes spatial sequence component"

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "CorsiBlockBoard" saberparatodos/src/components/neurogym/` >= 1 match
- [ ] Visual highlight sequence animation functions with configurable delayMs and blocks user clicks during presentation phase.

## Files to Modify
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/neurogym/stimuli/CorsiBlockBoard.svelte` | Non-existent | [NEW] Interactive Corsi visual memory board | LOW |

## DO NOT touch
- `saberparatodos/src/lib/neurogym/scoring-cognitive.ts` — assigned to Issue #02
- `.gitcore/features.json` — reconciled at wave end

## Anti-Hallucination Guard
1. READ `saberparatodos/src/lib/neurogym/secure-items-vault.ts` and `audio-synthesizer.ts` before writing.
2. Use Svelte 5 runes (`$props()`, `$state()`, `$effect()`).

## Merge Order
- **Merge order within wave:** 1
- **Expected effort:** Small (<25m)
- **Parallel with:** All other wave-1 issues (disjoint file islands)
