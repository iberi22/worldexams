# SaberParaTodos

Shared exam-product runtime for WorldExams. Colombia is the most complete tenant today, but this package is intended to serve as the reusable template for future country products.

## Role In The Monorepo

- Owns the tenant-aware product runtime.
- Hosts exam UX, guides, diagnostics, results, developer portal, and product-local integrations.
- Provides the canonical product-side Supabase Functions tree at `saberparatodos/supabase/functions/`.
- Must stay reusable across countries through configuration, localization, branding, and content layers rather than app forks.

## Stack

- Astro 6
- Svelte 5
- TailwindCSS 4
- Supabase
- Cloudflare Workers SSR
- Playwright
- Vitest

## Main Routes

- `/` main practice experience
- `/guia-examen` tenant-aware exam guide
- `/preparacion` preparation and registration guide
- `/manual-plataforma` platform usage manual
- `/novedades` news and release posts
- `/changelog` release timeline
- `/developers/dashboard` API key management
- `/developers/docs` API reference

## Tenanting Model

- Shared country metadata lives in `../config/countries.config.ts`.
- `src/config/index.ts` adapts that shared catalog for runtime consumption via `PUBLIC_COUNTRY`.
- Runtime UI, theming, SEO, and product labels must derive from shared config or explicit tenant content modules.
- Country onboarding should extend config/content layers instead of duplicating the app.

## Useful Commands

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run test:unit
npm run validate:strict
npm run deploy:manual
npm run deploy:preview
```

## Project Areas

- UI components: `src/components/`
- Routes: `src/pages/`
- Runtime config: `src/config/`
- Public assets: `public/`
- Product backend: `supabase/`
- Product scripts: `scripts/`
- Video pipeline: `video-pipeline/`

## Deployment

This product deploys manually through Wrangler Workers, not Cloudflare Pages:

```bash
npm run sync:api
npm run build
npm run deploy:manual
```

Canonical production deploy uses `wrangler deploy --config dist/server/wrangler.json --name=saberparatodos`.
Preview deploys should use a separate Worker name and `*.workers.dev`, not `page.dev` and not `saberparatodos.space`.

## Docs

- `../docs/specs/ACTIVE_PROTOCOLS.md`
- `../docs/specs/REPLICACION.md`
- `PROTOCOLO_DEPLOY_CLI.md`
- `../docs/agent-docs/specs/SPEC_CLOUDFLARE_SABERPARATODOS_DEPLOY.md`

## Environment

Public-safe variables:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `PUBLIC_SITE_URL`
- `PUBLIC_API_BASE_URL`
- `PUBLIC_COUNTRY`

Keep server-only secrets private.
