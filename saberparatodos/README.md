# SaberParaTodos

Colombia-focused exam practice platform built by World Exams.

SaberParaTodos is the active Colombia application layer for practice, diagnostics, guides, changelog/news, developer API access, and institutional features around ICFES-style exam preparation.

## Product Scope

- Student practice and simulation flows
- Adaptive English diagnostic
- Results and local reports
- Exam guides and preparation pages
- Developer portal with API keys and API docs
- Institutional dashboards and group flows
- Supporting video/social tooling in progress

Question banks are intended to live in a private repository. This package is part of a private prelaunch workspace and should not be treated as a published public product repository yet.

## Stack

- Astro 5
- Svelte 5
- TailwindCSS
- Supabase
- Cloudflare Pages
- Playwright
- Vitest

## Main Routes

- `/` main practice experience
- `/guia-examen` exam guide
- `/preparacion` preparation and registration guide
- `/manual-plataforma` platform usage manual
- `/novedades` news and release posts
- `/changelog` release timeline
- `/developers/dashboard` API key management
- `/developers/docs` API reference

## Notable Implemented Features

### Learning Experience

- Multi-subject practice flows
- English diagnostic with fallback pack resolution
- Results view with export/download support
- News, changelog, and platform guidance surfaces

### Developer API

- API key generation via developer dashboard
- Personal organization bootstrap for first-time developers
- Bearer-token API gateway
- OpenAPI reference page

### Platform Infrastructure

- Supabase auth and RLS-backed data model
- Edge Functions for questions, exam submission, AI tutor, Telegram bot, and organization flows
- Manual deploy scripts for Cloudflare Pages
- Validation, build, and E2E test commands

## Local Development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Preview:

```bash
npm run preview
```

## Useful Commands

```bash
npm run build
npm run lint
npm run test
npm run test:unit
npm run validate:strict
npm run deploy:manual
```

## Project Areas

- UI components: `src/components/`
- Routes: `src/pages/`
- Content: `src/content/`
- Public assets: `public/`
- Supabase product backend: `supabase/`
- Scripts: `scripts/`
- Video pipeline: `video-pipeline/`

## Environment

Use `.env.example` as the starting point, but keep server-only secrets out of any client/runtime exposure.

Public-safe variables:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `PUBLIC_SITE_URL`
- `PUBLIC_API_BASE_URL`

Server/operator secrets must remain private.

## Deployment

This product is deployed manually via CLI.

```bash
npm run sync:api
npm run build
npm run deploy:manual
```

See `PROTOCOLO_DEPLOY_CLI.md` for the operational flow.

## Documentation

Current important docs:

- `../docs/specs/ACTIVE_PROTOCOLS.md`
- `../docs/specs/MASTER_PLAN.md`
- `PROTOCOLO_DEPLOY_CLI.md`
- `src/pages/manual-plataforma.astro`
- `public/openapi.yaml`

## License

See the workspace-level `LICENSE.md`.
