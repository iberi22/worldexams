# [Ola 1.07] feat-neurogym-card-sorting — Wisconsin-Proxy Rule-Switching Task (Executive Flexibility)

> Ola 1 — NeuroGym Executive Function.
> Labels: `ola1`, `wave-1`, `neurogym` (without `jules` yet)

---

## Current State (MEDIBLE)
- Feature: `feat-neurogym-assessment` at 60% in `.gitcore/features.json`
- Tests: 70 existing, 568 passing.

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/components/neurogym/stimuli/CardSortingStimulus.svelte` providing a simplified Wisconsin Card Sorting Task proxy (cards with variation in color, shape and number, with unseen shifting rules every 5 correct trials) to test perseverative errors and mental flexibility.
- **File Target**: `saberparatodos/src/components/neurogym/stimuli/CardSortingStimulus.svelte`

## Web Research Required
1. search: "Wisconsin Card Sorting Test perseverative error rate rule switching"
2. search: "executive function computerized test card sorting"

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "CardSortingStimulus" saberparatodos/src/components/neurogym/` >= 1 match
- [ ] Accurately tracks rule switch latency and perseveration attempts upon rule changes.

## Files to Modify
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/neurogym/stimuli/CardSortingStimulus.svelte` | Non-existent | [NEW] Rule-switching executive function board | LOW |

## DO NOT touch
- `saberparatodos/src/components/neurogym/stimuli/RavenMatrixCanvas.svelte`
- `.gitcore/features.json` — reconciled at wave end

## Anti-Hallucination Guard
1. Use WebAudio feedback (`neuroAudio.playSuccess()`, `neuroAudio.playError()`).
2. Svelte 5 runes strict typing.

## Merge Order
- **Merge order within wave:** 7
- **Expected effort:** Small (<30m)
- **Parallel with:** All other wave-1 issues (disjoint file islands)
