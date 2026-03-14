# MASTER_PLAN.md - SaberParaTodos (CO)

Last update: 2026-02-23
Scope: production release governance and execution for Colombia repository.

## 1. Release Objective
Ship a stable code-first production release focused on authentication, institutional flows, leaderboard, and controlled manual deployment.

## 2. Production Gates (Blocking)
1. `npm run validate:strict` passes.
2. `npm run lint` passes.
3. `npm run build` passes.
4. Playwright smoke passes:
   - `npx playwright test tests/e2e-smoke-tag.spec.ts`
   - `npx playwright test tests/auth-leaderboard-smoke.spec.ts`
5. Manual Cloudflare deploy via Wrangler CLI only.
6. Post-deploy verification passes.

## 3. Non-Blocking for this release
1. Full content expansion across all grades/subjects.
2. Legacy TODOs in non-release paths.
3. Optional CI/CD automation.

## 4. Manual Deploy Governance
1. GitHub Actions deployment workflows are disabled for production deployment.
2. Deploy sequence is documented in `PROTOCOLO_DEPLOY_CLI.md`.
3. Required scripts:
   - `scripts/copy-api.ps1`
   - `scripts/deploy-manual.ps1`
   - `scripts/verify-deployment.ps1`

## 5. Priority Backlog
### Release-blockers
1. Keep auth/onboarding/dashboard/leaderboard smoke green.
2. Maintain strict content validation at release time.
3. Keep manual deploy pipeline deterministic and documented.

### Post-release
1. Content metadata normalization and DBA cleanup waves.
2. Exam-room feature completion (PDF/reporting/real questions).
3. Extended E2E matrix and observability hardening.

## 6. Critical Assumptions
1. Product remains Magic Link oriented auth flow.
2. Deployment target is Cloudflare Pages project `saberparatodos`.
3. Public API artifacts are generated from local scripts before build.

## 7. Preuniversitario Program
1. `Preuniversitario` ships as a dedicated Colombia route, not as a fake school grade.
2. Institutional metadata, calendars, fees, and source documents must live in a separate operational model from school question packs.
3. Admission mocks follow `PREUNIVERSITARIO_PROTOCOL_V4PLUS.md`.
4. The Top 10 pipeline starts from ICFES Saber Pro aggregates and only publishes entries with official admissions evidence.
5. Active production order: `UNAL -> UdeA -> auditoria UIS/UTP -> siguiente universidad realmente exam-first -> resto del top 10`.
6. Current ready states:
   - `UNAL`: institution profile + core blueprint
   - `UdeA`: institution profile + core blueprint + pack scaffolds
7. Immediate pending tasks:
   - author real packs for `UNAL` and `UdeA`
   - resolve current conflict for `UniCauca`
   - open `UniAtlantico Medicina` as first `overlay-first` case
8. Operational source of truth for this stream: `docs/preuniversitario/top-10/ROADMAP.md`.

## 8. Question Access Integrity
1. The `Blog / Articles` feature is deactivated to ensure students access questions only through active exam sessions and history review.
2. Direct browsing of the question bank is disabled to maintain the pedagogical value of the "practice under pressure" environment.
3. PREU questions (Difficulty 5+) follow this same restrictive approach.
