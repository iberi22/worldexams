# [Ola 4.01] feat-offline-grade-packs — Full-Grade Offline Packs Generator & Compiler

> Ola 4 — Core / Generation.
> Labels: `ola4`, `wave-4`

---

## Current State (MEDIBLE)
- Feature: `feat-offline-grade-packs` at 0% in `features.json`
- Packs are currently split weekly and by subject in `apps/worldexams-api/public/v1/packs/*.json`.
- No aggregated single bundle exists per grade containing all subjects and weeks for full offline study.
- Files existing: `scripts/generate-static-packs.js` generates individual weekly packs.

## Desired State (DELTA)
- **Specific Addition**: Implement `scripts/build-full-grade-packs.mjs` that traverses `questions_data/{country}/{subject}/grado-{N}/2026/weekly/*.md`, aggregates all questions into a single consolidated JSON per grade: `apps/worldexams-api/public/v1/grades/{country}-grado-{grade}-full.json`.
- **Metadata Structure**: Each full-grade pack must include:
  ```json
  {
    "country": "co",
    "grade": 11,
    "version": "5.2",
    "generated_at": 1756300000000,
    "total_questions": 1200,
    "subjects": ["matematicas", "lectura_critica", "ciencias_naturales", "sociales_ciudadanas", "ingles"],
    "questions": [ ... ]
  }
  ```
- **File Target**: `scripts/build-full-grade-packs.mjs` and `tests/scripts/build-full-grade-packs.test.mjs`.

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `node scripts/build-full-grade-packs.mjs --country co --grade 11` produces valid JSON in `apps/worldexams-api/public/v1/grades/co-grado-11-full.json`.
- [ ] Output JSON passes schema validation with `total_questions` > 0 and deduplicated questions.
- [ ] `node --test tests/scripts/build-full-grade-packs.test.mjs` or `npm test` runs with 0 errors.

## Files to Modify / Create
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `scripts/build-full-grade-packs.mjs` | [NEW] | Full-grade JSON compiler and packager | LOW |
| `tests/scripts/build-full-grade-packs.test.mjs` | [NEW] | Unit tests for aggregation and deduplication logic | LOW |

## DO NOT touch
- `apps/worldexams-api/src/index.ts` — assigned to Issue #402
- `saberparatodos/src/lib/` — assigned to Issue #403 & #405
- `features.json` — reconciled at wave end (Issue #410)

## Anti-Hallucination Guard
1. READ before write: inspect `scripts/generate-static-packs.js` and `questions_data/colombia/` structure.
2. Ensure ESM syntax (`.mjs`) compatible with Node.js 20+.
3. Zero dependencies outside standard node built-ins (`fs`, `path`, `crypto`).

## Merge Order
- **Merge order within wave:** 1
- **Expected effort:** Small (<30m)
- **Parallel with:** All other wave issues (disjoint file islands)
