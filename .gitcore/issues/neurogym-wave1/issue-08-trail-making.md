# [Ola 1.08] feat-neurogym-trail-making — Interactive Trail Making Test A/B (Visual Search & Set Shifting)

> Ola 1 — NeuroGym Processing Speed.
> Labels: `ola1`, `wave-1`, `neurogym` (without `jules` yet)

---

## Current State (MEDIBLE)
- Feature: `feat-neurogym-assessment` at 60% in `.gitcore/features.json`
- Tests: 70 existing, 568 passing.

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/components/neurogym/stimuli/TrailMakingBoard.svelte` rendering sequential connect-the-dots tests: Part A (1-2-3-4...) for visual scanning and Part B (1-A-2-B-3-C...) for dual set-shifting with millisecond precision and SVG line drawing.
- **File Target**: `saberparatodos/src/components/neurogym/stimuli/TrailMakingBoard.svelte`

## Web Research Required
1. search: "Trail Making Test Part A and B neuropsychological normative time"
2. search: "SVG dynamic line connection canvas drag tap event coordination"

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "TrailMakingBoard" saberparatodos/src/components/neurogym/` >= 1 match
- [ ] Renders interactive scatter nodes and draws connection vectors dynamically upon correct sequential node taps.

## Files to Modify
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/neurogym/stimuli/TrailMakingBoard.svelte` | Non-existent | [NEW] Connect-the-dots visual search board | LOW |

## DO NOT touch
- `saberparatodos/src/components/neurogym/stimuli/ReactionMotorPad.svelte`
- `.gitcore/features.json` — reconciled at wave end

## Anti-Hallucination Guard
1. Ensure mobile touch and desktop mouse click compatibility.
2. Svelte 5 runes design.

## Merge Order
- **Merge order within wave:** 8
- **Expected effort:** Small (<30m)
- **Parallel with:** All other wave-1 issues (disjoint file islands)
