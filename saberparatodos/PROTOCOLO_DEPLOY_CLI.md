# PROTOCOLO_DEPLOY_CLI.md

Last updated: 2026-03-21
Scope: manual deploy and preview rules for `saberparatodos/`.

## Runtime Canonical

`saberparatodos/` is deployed as an Astro SSR application on Cloudflare Workers.
Production is not published with `wrangler pages deploy`.
Preview should use a separate Worker on `*.workers.dev`, not `page.dev`.

## Mandatory Rules

1. Use Wrangler Worker deploy only.
2. Use the package scripts before touching Cloudflare manually.
3. Normalize `dist/server/wrangler.json` before deploy.
4. Deploy production from `main` only unless the operator explicitly overrides the guard.
5. Verify the live domain after deployment.
6. Preview deploys must not publish routes for `saberparatodos.space`.
7. Post-deploy verification must include `/guia-examen?country=co`, `/guia-examen?country=mx`, one generic tenant fallback, `/api/questions` and `/build-info.json`.

## Standard Flow

```powershell
cd saberparatodos
pwsh -File scripts\copy-api.ps1
npm run build
node scripts\normalize-wrangler-config.mjs
npx wrangler deploy --config dist/server/wrangler.json --name=saberparatodos
pwsh -File scripts\verify-deployment.ps1 -BaseUrl https://saberparatodos.space
```

## Preferred Shortcut

```powershell
cd saberparatodos
npm run deploy:manual
```

## Preview Flow

```powershell
cd saberparatodos
$env:CLOUDFLARE_WORKERS_SUBDOMAIN="<your-subdomain>"
npm run deploy:preview
```

Preview requirements:

- Worker name different from production, for example `saberparatodos-preview`
- URL on `*.workers.dev`
- no production routes
- no `PUBLIC_SITE_URL=https://saberparatodos.space`

## Expected Cloudflare Routing

The Worker must attach these production routes:

- `saberparatodos.space/*`
- `www.saberparatodos.space/*`

They must be deployed as Worker routes with `zone_name = "saberparatodos.space"`.

## Do Not Use

```powershell
npx wrangler pages deploy dist --project-name=saberparatodos
```

Do not use Pages deploy for this app unless the architecture is explicitly changed and the canonical docs are updated first.
Do not use `page.dev` as the default preview surface for the current Worker SSR runtime.

## Failure Pattern

If `saberparatodos.space` returns `404` after deploy:

1. Inspect the latest Worker deploy in Wrangler.
2. Confirm Worker routes are active on both hostnames.
3. Confirm `dist/server/wrangler.json` was normalized.
4. Confirm no one used `wrangler pages deploy` for the production app.
5. Confirm `/build-info.json` matches the local commit and that MX no longer renders ICFES guide blocks.
