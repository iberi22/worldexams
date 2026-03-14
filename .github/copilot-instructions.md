# GitHub Copilot Instructions - WorldExams

## Prime Directive

This repository is governed by an adapted GitCore protocol.
Use external state, not chat memory, for new work whenever practical.

Read in this order before substantial changes:

1. `README.md`
2. `AGENTS.md`
3. `.gitcore/ARCHITECTURE.md`
4. `.gitcore/AGENT_INDEX.md`
5. `docs/monorepo/REPO_AUTHORITY_MATRIX.md`

Then load package-local documentation only for the package you are editing.

## Repo Reality

- This repo is migrating to an explicit monorepo.
- The main active app is `saberparatodos/`.
- The API Worker is `worldexams-api/`.
- The Rust service is `social-orchestrator/`.
- Historical planning docs still exist, but they are no longer the default authority for new work.

## Workflow Rules

### New Work

- Prefer GitHub Issues as the task/state system for new work.
- Do not create new markdown trackers for status, backlog, or progress.
- Keep one branch per task.
- Keep commits atomic and conventionally scoped.

### Architecture First

Before implementing infrastructure, repository, or deploy changes:

1. Read `.gitcore/ARCHITECTURE.md`
2. Check the critical decisions table
3. If an older doc conflicts with that table, the architecture file wins

### Monorepo Migration Guardrail

During the monorepo transition:

- Root governance is defined by `AGENTS.md` and `.gitcore/*`
- Package-local `AGENTS.md` files are delta-only
- `docs/monorepo/*` is allowed and authoritative for the migration itself

## Package Boundaries

### `saberparatodos/`

Use for:

- Astro pages and Svelte components
- product docs
- product-local Supabase functions and migrations
- tests and deploy scripts

### `worldexams-api/`

Use for:

- Cloudflare Worker entrypoint
- worker routing
- Worker-specific TypeScript and Wrangler config

### `social-orchestrator/`

Use for:

- Rust automation service
- service-specific run/build behavior

## Safety Rules

- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client
- Do not invent new production deploy workflows without explicit decision
- Treat deploys, auth changes, and destructive data changes as high-risk
- Stop and ask before irreversible operations

## Documentation Rules

Allowed new documentation for this repo includes:

- root overview docs
- `.gitcore/*`
- `docs/monorepo/*`
- package-local product or technical docs when explicitly needed

Do not create:

- new ad hoc progress trackers
- duplicate authority files
- extra planning docs when an issue or existing canonical doc is the right place

## Commit and Branch Discipline

- One logical change per commit
- Use conventional commit style
- Reference issues when available
- Avoid mixing docs, infra, and product behavior in one commit unless they are inseparable
