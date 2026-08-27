# [Ola 4.08] feat-maloca-admin-embed — Maloca Embed Administration Panel & GitCore Telemetry

> Ola 4 — Admin / Telemetry.
> Labels: `ola4`, `wave-4`

---

## Current State (MEDIBLE)
- Feature: `feat-maloca-admin-embed` at 0% in `features.json` (references GitCore issue MS-022)
- No admin view exists for developer telemetry / GitCore monitoring within `saberparatodos`.
- Must strictly isolate developer telemetry from student exams (BR-03 / REQ-009).

## Desired State (DELTA)
- **Specific Addition**:
  - Implement `saberparatodos/src/components/admin/MalocaAdminEmbed.svelte`:
    * Consumes `@swal/maloca-embed` (or embedded dashboard iframe / telemetry component).
    * Configured with `app_id="worldexams"`.
    * Displays: GitCore compliance badge, feature pass/fail status, CI/CD feed, recent commits.
  - Implement `saberparatodos/src/pages/admin/maloca.astro`:
    * Protected admin route displaying the telemetry panel.
    * Explicit disclaimer that student exam activity is excluded from telemetry.
- **File Target**: `saberparatodos/src/components/admin/MalocaAdminEmbed.svelte`, `saberparatodos/src/pages/admin/maloca.astro`, and `saberparatodos/tests/e2e/maloca-admin.spec.ts`.

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `/admin/maloca` renders the GitCore / Maloca embed interface cleanly.
- [ ] Verified zero telemetry collector imports in student routes (`src/pages/practica.astro`, `src/pages/leaderboard.astro`).
- [ ] `npm test -- saberparatodos/tests/e2e/maloca-admin.spec.ts` passes 100%.

## Files to Modify / Create
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/admin/MalocaAdminEmbed.svelte` | [NEW] | Svelte component rendering Maloca dev metrics | LOW |
| `saberparatodos/src/pages/admin/maloca.astro` | [NEW] | Admin dashboard page for technical telemetry | LOW |
| `saberparatodos/tests/e2e/maloca-admin.spec.ts` | [NEW] | E2E test verifying admin panel and telemetry isolation | LOW |

## DO NOT touch
- `saberparatodos/src/components/leaderboard/` — assigned to Issue #407
- `saberparatodos/tests/e2e/offline-exam-flow.spec.ts` — assigned to Issue #409
- `features.json` — reconciled at wave end (Issue #410)

## Anti-Hallucination Guard
1. READ before write: inspect `.gitcore/issues/maloca-streaming/MS-022-worldexams-maloca-embed.md`.
2. Follow strict BR-03 isolation: do not expose telemetry in public/student views.

## Merge Order
- **Merge order within wave:** 8
- **Expected effort:** Small (<30m)
- **Parallel with:** All other wave issues (disjoint file islands)
