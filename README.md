# World Exams

Private prelaunch monorepo for the WorldExams organization, product runtime, and shared operating protocols.

This workspace currently contains the Colombia product `SaberParaTodos`, organization-level documentation, Supabase assets, automation scripts, and migration material for an internal prelaunch monorepo.

## Current Release Status

This repository is not launched as a public project yet.

- Treat it as a private prelaunch workspace.
- Do not assume any public repository split is active.
- Do not update or coordinate external/public repositories from this workspace unless the user explicitly asks for that.

## Governance Protocol

This repository now adopts a GitCore-inspired governance model for the monorepo migration and for future engineering work.

Canonical governance files:

- `.gitcore/ARCHITECTURE.md`
- `.gitcore/AGENT_INDEX.md`
- `.gitcore/features.json`
- `.gitcore/planning/PLANNING.md`
- `.gitcore/planning/TASK.md`
- `AGENTS.md`
- `docs/README.md`
- `docs/CHANGELOG.md`
- `docs/monorepo/REPO_AUTHORITY_MATRIX.md`
- `docs/agent-docs/README.md`

For new work, treat GitHub Issues as the default external state inside this private workspace. Historical planning files remain as migration-era context, not as the preferred planning mechanism for new tasks.

## Monorepo Transition

This repository is in an active monorepo transition.

`npm workspaces` is bootstrapped at the root, and the safe branch has already moved the root site and Worker into `apps/`, plus the Rust service into `services/`.
The main remaining package move is `saberparatodos/` when that path churn is acceptable.

Canonical migration docs:

- `docs/monorepo/MONOREPO_MIGRATION_PLAN.md`
- `docs/monorepo/REPO_MAP.md`
- `docs/monorepo/REPO_AUTHORITY_MATRIX.md`

If you are deciding where code should live or which document is authoritative, use those files before relying on older planning artifacts.

## Documentation Guardrails

The repository still contains historical planning and implementation docs.

- `docs/README.md` is the entrypoint for the documentation tree.
- Files marked as historical or legacy are context only.
- If a historical doc suggests public repos, GitHub Actions as the default deploy path, dual-repo content splits, or per-country forks, treat that as superseded unless the root governance files explicitly say otherwise.

## Current Status

- Product in focus: `saberparatodos` for Colombia / ICFES Saber 11
- Root app surface: `apps/worldexams-site/` is the organization-level `worldexams` site
- Frontend stack: Astro + Svelte
- Backend stack: Supabase Auth / DB / Edge Functions
- Hosting: Cloudflare Pages
- API access: developer portal + API key flow
- Content strategy: keep question banks and unreleased operational material private

## Core Product Principle

WorldExams should scale to multiple countries without duplicating application logic.

- shared UI and shared business logic live in the same codebase
- countries vary by question content, localization, branding, SEO metadata, and exam configuration
- adding a new country should default to config/content work, not a new code fork
- new packages should only appear when there is a genuinely different runtime or service boundary

## Runtime Boundary

This repo currently contains two different frontend surfaces and agents must not mix them.

- `apps/worldexams-site/` is the `worldexams` organization/site layer.
- `saberparatodos/src/` is the reusable exam-product runtime and current reference implementation.
- New exam features, question flows, auth changes, tenant logic, and multi-country product behavior belong in `saberparatodos/`, not in the root site.
- Root-site changes should be limited to organization pages, country directory/navigation, ecosystem messaging, and routing toward products.
- If code seems reusable across countries, prefer extracting it from `saberparatodos/` later into a shared package instead of rebuilding it in `apps/worldexams-site/`.

## Repository Direction

The working target structure is still:

- one governed monorepo for active internal work
- one organization/site layer for WorldExams
- one shared exam-product/application layer for all countries
- clear package boundaries for app, worker, and services
- private storage for question banks, source materials, and unreleased operating logic

Country expansion target:

- one shared UI template
- one shared data model
- country-specific configuration, text, SEO, colors, and question bundles

No public repository split should be treated as active until the launch decision is made explicitly.

## What Has Been Built

### Product Surface

- Main practice experience now starts at `/`
- Adaptive English diagnostic flow refined and stabilized
- Exam guidance, preparation pages, changelog, and news surface are live
- Developer portal includes dashboard, API docs, and token generation flow
- Public platform manual exists for student/support onboarding

### Platform and Backend

- Supabase-based auth, leaderboard, organizations, and API-key infrastructure
- Edge Functions for exam submission, questions, AI tutor, Telegram bot, groups, and analytics-related flows
- API gateway with rate limiting, quota checks, and usage logging
- Manual deploy pipeline for Cloudflare Pages

### Quality and Operations

- Playwright and Vitest coverage across core flows
- Build pipeline and manual verification scripts
- Video pipeline and social publishing scaffolding
- Extensive planning/specification documents accumulated during product evolution, with active planning now normalized under `.gitcore/planning/`

## Repository Map

```text
worldexams/
├── apps/worldexams-site/         # Organization-level worldexams site
├── apps/worldexams-api/          # Cloudflare Worker package
├── saberparatodos/               # Main Colombia product
├── services/social-orchestrator/ # Auxiliary Rust service
├── docs/                     # Organization and protocol documentation
├── supabase/                 # Org-level / legacy / shared Supabase material
├── scripts/                  # Automation and generation scripts
├── questions_data/           # Local question-related assets
└── .gitcore/planning/        # Canonical planning and execution state
```

## Where To Start

### Product App

- Org site code: `apps/worldexams-site/`
- App code: `saberparatodos/`
- Worker code: `apps/worldexams-api/`
- Service code: `services/social-orchestrator/`
- Product README: `saberparatodos/README.md`
- Active taskboard: `.gitcore/planning/TASK.md`
- Active planning baseline: `.gitcore/planning/PLANNING.md`
- GitCore architecture: `.gitcore/ARCHITECTURE.md`
- Agent routing: `.gitcore/AGENT_INDEX.md`
- Feature registry: `.gitcore/features.json`
- Workspace changelog: `docs/CHANGELOG.md`
- Monorepo authority map: `docs/monorepo/REPO_AUTHORITY_MATRIX.md`
- Protocol-aligned agent docs: `docs/agent-docs/README.md`

### Key Product Areas

- Root site pages: `apps/worldexams-site/src/pages/`
- Root site data: `apps/worldexams-site/src/data/`
- Pages: `saberparatodos/src/pages/`
- Components: `saberparatodos/src/components/`
- Developer portal: `saberparatodos/src/pages/developers/`
- Supabase functions: `saberparatodos/supabase/functions/`
- Supabase migrations: `saberparatodos/supabase/migrations/`
- Scripts: `saberparatodos/scripts/`
- Video pipeline: `saberparatodos/video-pipeline/`

## Local Development

```bash
npm install
```

Root workspace commands:

```bash
npm run dev:worldexams-site
npm run dev:saberparatodos
npm run dev:worldexams-api
npm run build
npm run build:workspaces
npm run test:e2e
```

Direct package commands:

```bash
cd saberparatodos
npm install
npm run dev
```

Build:

```bash
cd saberparatodos
npm run build
```

## Documentation Priorities

The prelaunch monorepo still requires documentation cleanup. The current priorities are:

- English-first architecture docs
- explicit boundary docs between root site and shared exam runtime
- route/component/function inventory
- private/internal repository boundary docs
- social/video feature status docs
- launch backlog and release notes

## Legacy Planning Files

Root-level `PLANNING.md` and `TASK.md` remain as migration-era historical context only.
Do not use them as the default operational state; the active planning layer now lives in `.gitcore/planning/`.

## Security Notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client code
- Shared docs should only include environment variables that are safe for the intended audience
- Question banks and source materials are intended to stay private

## License

See `LICENSE.md`.

## Contact

- Product site: https://saberparatodos.space
