# [Ola 1.06] feat-neurogym-radar-chart — Pure SVG Vector Cognitive Radar & Pentagon Trajectory Chart

> Ola 1 — NeuroGym Visualization.
> Labels: `ola1`, `wave-1`, `neurogym` (without `jules` yet)

---

## Current State (MEDIBLE)
- Feature: `feat-neurogym-assessment` at 60% in `.gitcore/features.json`
- Tests: 70 existing, 568 passing.

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/components/neurogym/CognitiveRadarChart.svelte` rendering a dynamic 5-axis SVG pentagon radar (Fluid Reasoning, Working Memory, Processing Speed, Motor Agility, Analytical Flexibility) with smooth CSS transitions and benchmark baseline overlay (Standard Score 100).
- **File Target**: `saberparatodos/src/components/neurogym/CognitiveRadarChart.svelte`

## Web Research Required
1. search: "SVG polygon radar spider chart parametric polar coordinates calculation"
2. search: "accessible data visualization ARIA labels SVG chart"

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "CognitiveRadarChart" saberparatodos/src/components/neurogym/` >= 1 match
- [ ] Correctly plots polar coordinates for 5 axes mapped from standard scores [40, 160].

## Files to Modify
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/neurogym/CognitiveRadarChart.svelte` | Non-existent | [NEW] Pure SVG 5-axis cognitive radar chart | LOW |

## DO NOT touch
- `saberparatodos/src/components/neurogym/NeuroScoreCard.svelte`
- `.gitcore/features.json` — reconciled at wave end

## Anti-Hallucination Guard
1. Pure SVG without external charting libraries (zero bundle bloat).
2. Fully responsive and accessible.

## Merge Order
- **Merge order within wave:** 6
- **Expected effort:** Small (<25m)
- **Parallel with:** All other wave-1 issues (disjoint file islands)
