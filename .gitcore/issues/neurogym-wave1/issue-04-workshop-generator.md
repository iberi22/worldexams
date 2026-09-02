# [Ola 1.04] feat-neurogym-workshops — Neuro-Pedagogical Classroom Workshop & Printable Guide Generator

> Ola 1 — NeuroGym Pedagogical Tools.
> Labels: `ola1`, `wave-1`, `neurogym` (without `jules` yet)

---

## Current State (MEDIBLE)
- Feature: `feat-neurogym-assessment` at 60% in `.gitcore/features.json`
- Tests: 70 existing, 568 passing.

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/components/neurogym/NeuroWorkshopGenerator.svelte` allowing teachers/students to configure and download printable Markdown/HTML workshop guides for classroom brain gymnastics (unplugged puzzles, dual-task memory games, lateral thinking exercises).
- **File Target**: `saberparatodos/src/components/neurogym/NeuroWorkshopGenerator.svelte`

## Web Research Required
1. search: "neuroeducation classroom cognitive stimulation dynamics printable"
2. search: "Markdown export UTF-8 client side blob download"

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "NeuroWorkshopGenerator" saberparatodos/src/components/neurogym/` >= 1 match
- [ ] Supports selecting target grade, cognitive domain (Memory, Analysis, Agility), duration, and generating structured printable guides.

## Files to Modify
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/neurogym/NeuroWorkshopGenerator.svelte` | Non-existent | [NEW] Classroom cognitive workshop builder | LOW |

## DO NOT touch
- `saberparatodos/src/components/neurogym/NeuroScoreCard.svelte`
- `.gitcore/features.json` — reconciled at wave end

## Anti-Hallucination Guard
1. Use client-side download utility with UTF-8 BOM encoding.
2. Clean Svelte 5 component design.

## Merge Order
- **Merge order within wave:** 4
- **Expected effort:** Small (<30m)
- **Parallel with:** All other wave-1 issues (disjoint file islands)
