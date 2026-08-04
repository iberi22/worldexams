# Harvest: jules-11613332943908071455 (scripts de pipeline de contenido)

Rama huérfana de sesión Jules sin PR. Contiene scripts de utilidad para la
pipeline de generación de contenido (PowerShell + Node) que NO están en main:
- audit-supabase-functions.ps1 — auditoría de edge functions
- clean-secrets.ps1 — limpieza de secrets
- country-fix-cron.ps1 — cron de fix por país
- dev-deploy.ps1 / run-generation.ps1 / run-pre-commit.ps1 — pipeline dev
- generate-jules-issue-matrix.mjs — matriz de issues Jules
- sync-issues.ps1 / test-country-detection.ps1 — sync y test

Evaluar si vale la pena portar a la pipeline canónica (main ya tiene
generate-jules-issue-matrix.mjs con otro contenido). metadata.json diff era
derivado (packs) — regenerable.
