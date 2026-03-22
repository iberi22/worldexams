---
title: "Cloudflare Deploy Rules For SaberParaTodos"
type: SPEC
id: "spec-cloudflare-saberparatodos-deploy"
created: 2026-03-21
updated: 2026-03-21
agent: codex
model: gpt-5
requested_by: user
summary: |
  Canonical operational rules for deploying the SaberParaTodos product to
  Cloudflare without breaking production routing or mixing Pages and Worker
  runtimes.
keywords: [cloudflare, wrangler, deploy, workers, routes, saberparatodos]
tags: ["#cloudflare", "#deploy", "#workers", "#saberparatodos"]
project: worldexams
status: active
---

# Cloudflare Deploy Rules For SaberParaTodos

## Scope

This document governs production deploy behavior for `saberparatodos/`.
It exists because the product currently runs as an Astro SSR application on Cloudflare Workers, while older repository instructions still mention Cloudflare Pages.

## Canonical Runtime

- `saberparatodos/` deploys as a Cloudflare Worker SSR runtime.
- Production hostname is `saberparatodos.space`.
- Secondary hostname is `www.saberparatodos.space`.
- The default Pages project may still exist in the account, but it is not the canonical production runtime for the app.

## Hard Rules

- Do not use `wrangler pages deploy` for `saberparatodos/` production deploys.
- Do not describe the production target as a Pages deploy when editing docs or agent rules.
- Do not use `custom_domain = true` bindings for `saberparatodos.space/*` style patterns.
- Do not publish invalid Worker routes such as:
  - `saberparatodos.space/*` with `custom_domain = true`
  - hostnames without `zone_name` when Wrangler expects Worker routes
- Do not assume that a working DNS setup means the app runtime is correct. The zone can still route traffic to the wrong surface and return `404`.

## Required Deploy Path

Use the package-local scripts and Wrangler Worker deploy:

1. `pwsh -File scripts/copy-api.ps1`
2. `npm run build`
3. `node scripts/normalize-wrangler-config.mjs`
4. `npx wrangler deploy --config dist/server/wrangler.json --name=saberparatodos`
5. `pwsh -File scripts/verify-deployment.ps1 -BaseUrl https://saberparatodos.space`

Preferred shortcut:

- `npm run deploy:manual`

## Route Strategy

The production Worker must deploy with Worker routes, not Pages publish commands.

Expected route shape:

- `saberparatodos.space/*`
- `www.saberparatodos.space/*`

Each route must be attached with the zone name:

- `zone_name = "saberparatodos.space"`

## Route Normalization

The generated Astro `dist/server/wrangler.json` can contain route data that is unsafe for production.
Before every deploy, agents must normalize the generated config with:

- `node scripts/normalize-wrangler-config.mjs`

That script is part of the production safety layer and must not be bypassed casually.

## Failure Signature

If production suddenly returns `404` on:

- `https://saberparatodos.space`
- `https://www.saberparatodos.space`
- `https://saberparatodos.pages.dev`

then check these first:

1. Was a Pages deploy used by mistake?
2. Did the current Worker deploy fail to attach routes?
3. Did `dist/server/wrangler.json` contain invalid route entries?
4. Did Cloudflare keep traffic on Pages while the Worker deploy succeeded separately?

## Verification Standard

Minimum post-deploy verification:

- `/`
- `/novedades`
- `/ranking`
- `/dashboard`

Optional static API verification should only check files that actually exist in `public/api/` or `dist/client/api/`.

## Documentation Rule

When updating deploy instructions for `saberparatodos/`, use this terminology:

- "Cloudflare Worker deploy"
- "Worker routes"
- "Wrangler Worker SSR deploy"

Avoid these outdated phrases unless clearly labeled as historical:

- "Cloudflare Pages production deploy"
- "`wrangler pages deploy dist --project-name=saberparatodos`"

