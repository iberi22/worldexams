# [Ola 4.04] feat-offline-downloader-ui — Offline Grade Downloader UI & Settings Screen

> Ola 4 — UI / Frontend.
> Labels: `ola4`, `wave-4`

---

## Current State (MEDIBLE)
- Feature: `feat-offline-downloader-ui` at 0% in `features.json`
- `saberparatodos/src/pages/ajustes/` has settings for AI (`ia.astro`), but lacks an offline management screen.
- Students cannot currently trigger full grade downloads with progress visualization.

## Desired State (DELTA)
- **Specific Addition**:
  - Create `saberparatodos/src/components/settings/OfflineGradeDownloader.svelte`:
    * Country and Grade selector (Grados 3°-11°).
    * Status badge (Descargado / No disponible / Descargando).
    * Progress bar with percentage and KB downloaded.
    * Storage usage indicator (MB used in IndexedDB).
    * "Descargar Grado Completo" & "Eliminar Paquete" action buttons.
  - Create `saberparatodos/src/pages/ajustes/offline.astro` embedding `OfflineGradeDownloader.svelte`.
  - Add navigation link to `/ajustes/offline` in the settings menu.
- **File Target**: `saberparatodos/src/components/settings/OfflineGradeDownloader.svelte`, `saberparatodos/src/pages/ajustes/offline.astro`, and `saberparatodos/tests/e2e/offline-download.spec.ts`.

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `/ajustes/offline` renders cleanly with Glassmorphism / Tailwind styling matching design system.
- [ ] Clicking download updates progress bar and calls `offline-grade-storage`.
- [ ] Tests in `saberparatodos/tests/e2e/offline-download.spec.ts` verify UI state transitions.

## Files to Modify / Create
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/settings/OfflineGradeDownloader.svelte` | [NEW] | Svelte downloader component with reactive state | LOW |
| `saberparatodos/src/pages/ajustes/offline.astro` | [NEW] | Astro page hosting the offline manager | LOW |
| `saberparatodos/tests/e2e/offline-download.spec.ts` | [NEW] | Playwright / Vitest test for download flow | LOW |

## DO NOT touch
- `saberparatodos/src/lib/offline-grade-storage.ts` — assigned to Issue #403
- `saberparatodos/src/lib/vault/` — assigned to Issue #405 & #406
- `features.json` — reconciled at wave end (Issue #410)

## Anti-Hallucination Guard
1. READ before write: inspect `saberparatodos/src/pages/ajustes/ia.astro` for styling conventions.
2. Use Svelte 5 runes (`$state`, `$derived`, `$props`) or Svelte 4 reactivity consistently.

## Merge Order
- **Merge order within wave:** 4
- **Expected effort:** Medium (<45m)
- **Parallel with:** All other wave issues (disjoint file islands)
