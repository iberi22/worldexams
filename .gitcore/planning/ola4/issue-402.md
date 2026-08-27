# [Ola 4.02] feat-api-grade-endpoint — API Gateway Full-Grade Offline Endpoint

> Ola 4 — Infra / API.
> Labels: `ola4`, `wave-4`

---

## Current State (MEDIBLE)
- Feature: `feat-api-grade-endpoint` at 0% in `features.json`
- `apps/worldexams-api/src/index.ts` serves individual weekly packs under `/v1/packs/...` and `/v1/questions`.
- No dedicated endpoint exists for serving full-grade offline packages with proper CDN cache-control headers.

## Desired State (DELTA)
- **Specific Addition**: Extend `apps/worldexams-api/src/index.ts` with route:
  - `GET /v1/grades/:country/:grade/bundle` -> serves `/v1/grades/{country}-grado-{grade}-full.json` from assets.
  - Returns appropriate caching headers (`Cache-Control: public, max-age=86400, s-maxage=604800`).
  - Implements CORS allowlist matching existing security standards.
  - Provides fallback error JSON if grade pack is not yet generated.
- **File Target**: `apps/worldexams-api/src/index.ts` and `apps/worldexams-api/tests/grade-bundles.test.ts`.

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `apps/worldexams-api/src/index.ts` handles `GET /v1/grades/co/11/bundle` correctly.
- [ ] Returns 200 OK with `Content-Type: application/json` and `Cache-Control` header.
- [ ] Returns 404 with standard error body if requested country/grade does not exist.
- [ ] `npm test -- apps/worldexams-api/tests/grade-bundles.test.ts` passes 100%.

## Files to Modify / Create
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `apps/worldexams-api/src/index.ts` | 440 lines | Add `/v1/grades/:country/:grade/bundle` route | LOW |
| `apps/worldexams-api/tests/grade-bundles.test.ts` | [NEW] | Integration tests for grade bundle worker handler | LOW |

## DO NOT touch
- `scripts/build-full-grade-packs.mjs` — assigned to Issue #401
- `saberparatodos/src/lib/` — assigned to Issue #403 & #405
- `features.json` — reconciled at wave end (Issue #410)

## Anti-Hallucination Guard
1. READ before write: inspect `apps/worldexams-api/src/index.ts` existing `fetch` router.
2. Maintain zero regression on `/v1/questions` and `/v1/premium/questions`.

## Merge Order
- **Merge order within wave:** 2
- **Expected effort:** Small (<30m)
- **Parallel with:** All other wave issues (disjoint file islands)
