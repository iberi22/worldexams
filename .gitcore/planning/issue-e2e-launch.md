# [Wave 5.01] feat-e2e-public-launch-suite — Comprehensive E2E Test Suite for Public Launch Flow

## 📋 Context & Objective
With WorldExams officially open to the public under AGPL-3.0, we require a comprehensive end-to-end integration and smoke test suite verifying all 5 core pre-launch pillars:
1. **Full Grade Offline Downloads (`/ajustes/offline`):** Fetching and persisting consolidated packs in IndexedDB.
2. **Leaderboard Live Mesh (`/leaderboard`):** Real-time subscription to `WorldExamsNode` P2P mesh broadcast with Zero-PII standing.
3. **Encrypted Vault Storage:** AES-256-GCM client-side encryption of student notes and competencies.
4. **Maloca Admin Embed (`/admin/maloca`):** Technical telemetry isolated from student flows (BR-03).
5. **Practice Exam Workflow (`/practica`):** Question rendering, answer selection, timer, and result calculation.

## 🏝️ Disjoint File Island
- `saberparatodos/tests/e2e/public-launch-flow.spec.ts` [NEW]
- `saberparatodos/tests/e2e/offline-grade-downloader.spec.ts` [NEW]
- `saberparatodos/tests/e2e/vault-encrypted-sync.spec.ts` [NEW]

## 🎯 Acceptance Criteria
- [ ] Playwright test validating offline pack download flow and IndexedDB quota calculation.
- [ ] Playwright test validating Leaderboard Live Mesh reactive UI and mock peer standing.
- [ ] Vitest / Playwright test validating AES-256-GCM encryption & decryption roundtrip in browser context.
- [ ] Playwright test validating Maloca Embed presence on `/admin/maloca` and strict absence of trackers on `/practica` (BR-03).
- [ ] All tests execute in headless mode with 0 failures.

## 🧪 Verification Commands
```bash
npm --prefix saberparatodos test
npx --prefix saberparatodos playwright test tests/e2e/public-launch-flow.spec.ts
```
