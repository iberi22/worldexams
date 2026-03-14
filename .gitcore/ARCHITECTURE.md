---
title: "WorldExams Monorepo Architecture"
type: ARCHITECTURE
id: "arch-worldexams-monorepo"
created: 2026-03-10
updated: 2026-03-11
agent: codex
model: gpt-5
requested_by: user
summary: |
  Critical architectural decisions for the WorldExams monorepo and the
  GitCore-based project management protocol adopted for this repository.
keywords: [architecture, monorepo, gitcore, supabase, cloudflare]
tags: ["#architecture", "#monorepo", "#gitcore"]
project: worldexams
---

# WorldExams Architecture

## Critical Decisions

Read this section before making infrastructure, repository, or workflow changes.
These decisions win over older notes in legacy planning files.

| # | Category | Decision | Rationale | Never Default To |
|---|---|---|---|---|
| 1 | Repo model | `worldexams` is migrating to an explicit monorepo | Current structure already contains multiple packages and shared governance | treating root as a single app forever |
| 2 | Workspace tool | `npm workspaces` | Fits the current Node tooling and existing lockfile direction | introducing pnpm/turbo by default |
| 3 | Root site boundary | `apps/worldexams-site/` is the `worldexams` organization/site layer | Prevents agents from treating the site runtime as the reusable product template | implementing exam runtime features in `apps/worldexams-site/` |
| 4 | Product runtime | `saberparatodos` is the current shared exam-product shell and reference UI | It is the active Colombia implementation and the reusable base for future countries | treating it as Colombia-only forever or as a disposable fork |
| 5 | Country scaling model | New countries must reuse shared UI and shared logic by default | The product should scale through config, content, branding, and SEO, not duplicated runtimes | cloning or forking app logic per country |
| 6 | API layer | `apps/worldexams-api/` is the Worker/API package | It already ships the Cloudflare Worker gateway | mixing Worker concerns into the product app |
| 7 | Service layer | `services/social-orchestrator/` is a separate service | It is operationally distinct and should remain isolated | merging Rust service code into app packages |
| 8 | Backend | Supabase shared backend with package-local functions where appropriate | Existing app and platform flows depend on Supabase Auth, DB, and Edge Functions | replacing with another backend without explicit decision |
| 9 | Deploy model | Manual CLI deploy remains the production path | Current repo and org workflow depend on Wrangler/manual deploys | adding new production GitHub Actions blindly |
| 10 | Project state | New work is managed issue-first under a GitCore-inspired protocol | Reduces drift and gives agents an external state source | using ad hoc markdown trackers for new tasks |
| 11 | Release state | This repo is private/prelaunch until the user explicitly changes that status | Prevents accidental public-repo assumptions and premature publication flows | assuming public launch is active |
| 12 | Documentation authority | Root `README.md`, root `AGENTS.md`, `docs/README.md`, and `docs/monorepo/*` define repo governance | Needed to stop authority drift during migration | trusting any single legacy file as final truth |
| 13 | Feature tracking | `.gitcore/features.json` tracks the current release, tracked features, and changelog linkage | Keeps version, feature inventory, and release notes aligned | managing features only in scattered markdown notes |
| 14 | Planning authority | `.gitcore/planning/PLANNING.md` and `.gitcore/planning/TASK.md` are the active planning layer | Aligns the repo with GitCore without relying on legacy root trackers | treating root `PLANNING.md` / `TASK.md` as active by default |

## Repo Topology

### Current Active Packages

- `apps/worldexams-site/`
  - current `worldexams` organization/site layer
  - country discovery and top-level brand navigation
  - must not absorb product runtime logic
- `saberparatodos/`
  - shared Astro/Svelte exam-product runtime
  - current Colombia implementation
  - reference UI/runtime for future multi-country rendering
  - product-local Supabase functions and migrations
- `apps/worldexams-api/`
  - Cloudflare Worker for API access and premium routing
- `services/social-orchestrator/`
  - Rust-based service package

### Target Layout

```text
worldexams/
├── apps/
│   ├── worldexams-site/
│   ├── saberparatodos/
│   ├── worldexams-api/
├── services/
├── services/
│   └── social-orchestrator/
├── packages/
├── docs/
├── .gitcore/
├── AGENTS.md
├── README.md
└── package.json
```

## Governance Model

This repository adopts GitCore as the project-management protocol with local adaptations.

### Adopted GitCore Principles

- architecture-first decisions
- issue-first workflow for new work
- atomic commits
- branch-per-task
- global agent rules plus local deltas
- planning state under `.gitcore/planning/`
- shared logic first, country variation through configuration and content

## Site Boundary Contract

Current package mapping:

- `apps/worldexams-site/src/` is the site layer
- `saberparatodos/src/` is the shared exam-product layer

Operational meaning:

- root site owns institutional pages, ecosystem navigation, and country discovery
- `saberparatodos` owns exam UX, tenant-aware behavior, question/runtime logic, and future reusable country product work
- if a feature is exam-specific, it belongs in `saberparatodos/`, not `apps/worldexams-site/`

### Local Adaptations

- Historical documentation remains during migration; it is not deleted just because GitCore prefers a smaller doc surface.
- Legacy planning files may remain temporarily, but they are no longer the default source of truth.
- Active planning lives under `.gitcore/planning/`.
- Monorepo migration planning is documented in `docs/monorepo/` until the structure is physically moved.
- The repo must be treated as private/internal by default; do not assume any public-repo synchronization target is active.
- Release tracking uses `.gitcore/features.json` plus `docs/CHANGELOG.md`; the visible app version should match `saberparatodos/package.json`.

## Required Reading Order for Agents

1. `README.md`
2. `AGENTS.md`
3. `.gitcore/ARCHITECTURE.md`
4. `.gitcore/features.json`
5. `.gitcore/planning/PLANNING.md`
6. `.gitcore/planning/TASK.md`
7. `docs/monorepo/REPO_AUTHORITY_MATRIX.md`
8. `docs/monorepo/REPO_MAP.md`
9. `docs/monorepo/SITE_BOUNDARIES.md`

Then load package-local docs only for the package being edited.

## Operational Rules

### For New Work

- Create or use a GitHub Issue.
- Keep one branch per unit of work.
- Keep commits atomic and scoped.
- Update issues/comments instead of creating fresh tracking docs.

### For High-Risk Work

Require explicit confirmation before:

- destructive data operations
- production deploys
- auth/security model changes
- migrations with irreversible effects

## Known Transitional Risks

- root-level code still looks like an app and can confuse agents
- root site vs product runtime boundaries can still be mixed up during migration
- root and package-level Supabase folders can be mistaken for one ownership boundary
- legacy docs still contain valid history but invalid authority assumptions
- deployed Worker/Edge state can drift from local code
