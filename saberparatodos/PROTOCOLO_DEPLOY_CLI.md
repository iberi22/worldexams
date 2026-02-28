# PROTOCOLO_DEPLOY_CLI.md

Last update: 2026-02-23
Owner: SaberParaTodos engineering

## Policy
Deployment is manual and executed only with Wrangler CLI. GitHub Actions is not used for production deployment.

## Prerequisites
1. Logged into Cloudflare CLI: `npx wrangler login`.
2. Dependencies installed: `npm install`.
3. Valid env available (`.env` / shell env) for public runtime vars.

## Standard Deployment
1. Sync static API artifacts:
   - `pwsh -File scripts/copy-api.ps1`
2. Validate content and schema constraints:
   - `npm run validate:strict`
3. Build production bundle:
   - `npm run build`
4. Deploy to Cloudflare Pages:
   - `npx wrangler pages deploy dist --project-name=saberparatodos`
5. Verify deployment health:
   - `pwsh -File scripts/verify-deployment.ps1 -BaseUrl https://saberparatodos.space`

## Fast Deployment (no API refresh)
Use only if content/static API has not changed:
1. `npm run build`
2. `npx wrangler pages deploy dist --project-name=saberparatodos`

## Rollback
1. Redeploy last known-good commit from local checkout.
2. Re-run full standard deployment and verification sequence.

## Evidence Checklist
1. Save terminal output for build and deploy command.
2. Save verification output with URL/status table.
3. Update `TASK.md` with date and release notes.
