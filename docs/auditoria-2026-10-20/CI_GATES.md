# CI Gates — WorldExams / SaberParaTodos

Mapa de qué gate corre en qué workflow.

## deploy-preview.yml (PRs y ramas no main)

- `validate-and-build`:
  - Lint & type check (`npm run lint`, `tsc` API y app).
  - Unit tests (`npm test`).
  - Validate changed bundles (protocol v5.2) — `scripts/validate-bundles-v52.mjs`.
  - Language gate (anti English leakage) — `scripts/check-feedback-language.mjs`.
  - Pack manifest freshness (bloqueante) — `build-pack-manifest.mjs --check`.
  - Vitest API worker + question pipeline.
  - Vitest app unit suite.
  - Astro check (bloqueante; con `npm ci` limpio da 0 errores).
- `deploy-preview`: deploy SSR worker preview.
- `deploy-api-preview`: deploy API worker preview (continue-on-error).
- `smoke-test`: `scripts/deploy-smoke.sh` contra URL preview.
- `e2e-preview`: Playwright `tests/e2e/student-exam-journey.spec.ts --project=chromium` contra URL preview (solo si el spec existe; continúa en error).
- `delete-preview-workers`: limpia workers en PR cerrado.

## deploy-production.yml (main)

- `audit-and-verify`: secrets, language gate, lint, wave4 readiness, grade pack tests, vitest.
- `deploy-api`: build pack manifest + `--check`, type check, deploy.
- `deploy-saberparatodos`: build, pre-deploy check, deploy.
- `smoke-test`: post-deploy smoke.
- `version-tag`: tagging.

## Manifest

- `apps/worldexams-api/public/v1/packs/_manifest.json` regenerado por `build-pack-manifest.mjs`; `--check` debe dar exit 0.