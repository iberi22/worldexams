# SaberParaTodos Agent Deltas

This file adds package-local rules only. Root governance still lives in `../AGENTS.md`.

## Local Context

- Package role: shared exam-product runtime template
- Most complete tenant today: Colombia / ICFES
- Stack: Astro 6 + Svelte 5 + TailwindCSS 4 + Supabase + Cloudflare Workers SSR
- Deploy model: manual CLI deploy

## Package Rules

### Frontend

- Preserve the product/runtime boundary: product UX belongs here, not in `apps/landing-worldexams/`.
- Keep runtime changes tenant-aware through shared config and explicit tenant content modules.
- Do not create country forks of the app when config, content, SEO, or theming is sufficient.
- Maintain mobile-first behavior, accessibility, and the existing product visual language.

### Tenanting

- Shared country metadata comes from `../config/countries.config.ts`.
- `src/config/` may contain runtime adapters, but it must not become a second competing source of truth for countries.
- New tenant behavior should prefer config-driven branching over duplicated page/component trees.

### Questions And Content

- Colombia content remains the most complete operational baseline, but runtime code must stay reusable for other countries.
- Keep naming normalized: lowercase, no accents in slugs, hyphen-separated.
- Treat new country rollout as onboarding of config/content unless the runtime contract truly changes.

### Supabase And Security

- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client.
- Only public-safe environment variables belong in frontend/runtime exposure.
- Validate inputs before insert/update paths.
- Treat `supabase/functions/` inside this package as the canonical product Edge Functions tree.
- Treat `../supabase/functions/` as legacy/shared unless a migration task says otherwise.
- Before deploy audits or parity claims, run `powershell -File ../scripts/audit-supabase-functions.ps1`.

### Deploy

- Do not add GitHub Actions for product deploys.
- Use manual CLI deploys and package-local scripts.
- Do not use `wrangler pages deploy` for production.
- Canonical deploy command: `npx wrangler deploy --config dist/server/wrangler.json --name=saberparatodos`.
- Normalize `dist/server/wrangler.json` before deploy with `node scripts/normalize-wrangler-config.mjs`.
- Preview deploys must use a separate Worker name on `*.workers.dev`, never `saberparatodos.space`.
- `page.dev` is not the default preview surface for this package while the runtime remains Cloudflare Worker SSR.
