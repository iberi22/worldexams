# TASK.md - Production Execution Backlog (CO)

Last update: 2026-02-23

## Release-Blockers

- [x] Establish master planning document in `../docs/specs/MASTER_PLAN.md` (2026-02-23)
- [x] Establish manual deploy protocol in `PROTOCOLO_DEPLOY_CLI.md` (2026-02-23)
- [x] Create manual deploy scripts:
  - [x] `scripts/copy-api.ps1`
  - [x] `scripts/deploy-manual.ps1`
  - [x] `scripts/verify-deployment.ps1`
- [x] Add npm commands for manual deploy pipeline (`sync:api`, `deploy:manual`, `deploy:fast`, `verify:deploy`) (2026-02-23)
- [ ] Run release gate and store evidence:
  - [x] `npm run validate:strict`
  - [x] `npm run lint`
  - [x] `npm run build`
  - [x] `npx playwright test tests/e2e-smoke-tag.spec.ts`
  - [x] `npx playwright test tests/auth-leaderboard-smoke.spec.ts`
- [ ] Execute production deployment via `npm run deploy:manual`

## Governance and Docs

- [x] Remove duplicate roadmap entries from local task planning (2026-02-23)
- [ ] Keep `README.md` aligned with CLI-only deployment policy
- [ ] Keep `ARQUITECTURA_PROFESIONAL.md` aligned with actual scripts and paths
- [ ] Record post-deploy release notes with date and verification output

## Post-Release (Non-Blocking)

- [ ] Content metadata normalization wave (`asignatura` canonicalization)
- [ ] Resolve bundles with `dba_id: DBA-TODO` in active release catalog
- [ ] Decide production scope for non-colombia content roots in `src/content/questions/*`
- [ ] Complete exam-room TODOs:
  - [ ] `src/modules/exam-room/components/RoomApp.svelte`
  - [ ] `src/modules/exam-room/components/RoomResults.svelte`
  - [ ] `src/modules/exam-room/services/reportGenerator.ts`
  - [ ] `src/modules/exam-room/stores/roomState.svelte.ts`
- [ ] Refactor `src/utils/questionParser.ts` to remove Astro collection coupling
