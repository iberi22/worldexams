# [Ola 4.03] feat-offline-grade-storage — PWA Offline Grade Storage & Sync Service

> Ola 4 — Client / Storage.
> Labels: `ola4`, `wave-4`

---

## Current State (MEDIBLE)
- Feature: `feat-offline-grade-storage` at 0% in `features.json`
- `saberparatodos/src/lib/pack-storage.ts` manages weekly packs in `localStorage` with a limit of 8 packs.
- `saberparatodos/src/lib/idb-storage.ts` has stores for results, answers, party sessions, but lacks a dedicated store for complete offline grade packages.

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/lib/offline-grade-storage.ts`:
  - Uses IndexedDB database `worldexams_offline_grades_db` (or store `offline_grade_bundles` in `idb-storage.ts`).
  - Methods:
    * `downloadAndStoreGradeBundle(country: string, grade: number, onProgress?: (pct: number) => void): Promise<boolean>`
    * `getGradeBundle(country: string, grade: number): Promise<StoredGradeBundle | null>`
    * `isGradeOfflineAvailable(country: string, grade: number): Promise<boolean>`
    * `removeGradeBundle(country: string, grade: number): Promise<void>`
    * `getOfflineQuestionsBySubject(country: string, grade: number, subject: string): Promise<APIQuestion[]>`
- **File Target**: `saberparatodos/src/lib/offline-grade-storage.ts` and `saberparatodos/tests/unit/offline-grade-storage.test.ts`.

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] IndexedDB store saves and retrieves grade bundles > 5MB without data corruption.
- [ ] Fallback gracefully when quota exceeded or network fails mid-download.
- [ ] `npm run test:unit -- saberparatodos/tests/unit/offline-grade-storage.test.ts` passes 100%.

## Files to Modify / Create
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/lib/offline-grade-storage.ts` | [NEW] | Grade-level offline IndexedDB storage manager | LOW |
| `saberparatodos/tests/unit/offline-grade-storage.test.ts` | [NEW] | Unit tests for storage, retrieval, and quota handling | LOW |

## DO NOT touch
- `saberparatodos/src/components/settings/` — assigned to Issue #404
- `saberparatodos/src/lib/vault/` — assigned to Issue #405 & #406
- `features.json` — reconciled at wave end (Issue #410)

## Anti-Hallucination Guard
1. READ before write: inspect `saberparatodos/src/lib/idb-storage.ts` and `saberparatodos/src/lib/pack-storage.ts`.
2. Ensure browser and SSR safety (`typeof window !== 'undefined'`).

## Merge Order
- **Merge order within wave:** 3
- **Expected effort:** Medium (<45m)
- **Parallel with:** All other wave issues (disjoint file islands)
