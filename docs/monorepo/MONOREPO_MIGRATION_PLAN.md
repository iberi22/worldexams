# Monorepo Migration Plan

Last updated: 2026-03-11

## Purpose

This document defines the controlled migration of `worldexams` into an explicit monorepo.
It is intentionally written so another agent or engineer can execute the reorganization in a safe branch without making structural decisions on the fly.

This plan started as documentation-first, but the safe branch has already executed part of the physical reorganization.
`apps/worldexams-site/`, `apps/worldexams-api/`, and `services/social-orchestrator/` now exist as real package locations.
The remaining major package move is `saberparatodos/`.

## Strategic Constraint

The monorepo must support multiple countries without duplicating application logic.
Country growth should be configuration-driven and content-driven by default.

## Current State

The repository already behaves like a pseudo-monorepo, but without a single authority model:

- The root contains executable app code, docs, scripts, Supabase assets, and org-level material.
- `saberparatodos/` is the main Colombia product and has its own app, docs, Supabase folder, tests, and deployment config.
- `apps/worldexams-api/` is a separate Cloudflare Worker package.
- `services/social-orchestrator/` is a separate service package.
- Several authority files overlap or contradict each other:
  - `AGENTS.md`
  - `README.md`
  - `MASTER_PLAN.md`
  - `masterplan.md`
  - `PLANNING.md`
  - multiple `wrangler.toml`

## Target Model

The repository root becomes a metadata and orchestration layer.

### Canonical Structure

```text
worldexams/
├── apps/
│   ├── saberparatodos/
│   ├── worldexams-api/
│   └── legacy-root-site/     # only if the current root app must be preserved
├── services/
│   └── social-orchestrator/
├── packages/
│   └── shared-*              # create only if true shared code/config emerges
├── docs/
│   └── monorepo/
├── data/                     # if non-app assets need a stable shared home
├── package.json              # workspace root only
├── AGENTS.md                 # global authority
└── README.md                 # repo entrypoint
```

### Initial Package Mapping

- `saberparatodos/` -> `apps/saberparatodos/`
- `apps/worldexams-api/` -> already moved
- `services/social-orchestrator/` -> already moved
- current root executable app code -> classify during migration as:
  - `apps/legacy-root-site/`, or
  - archived if confirmed obsolete

### Country Expansion Rule

New countries should default to:

- shared UI shell
- shared domain logic
- country-specific config
- country-specific SEO/branding
- country-specific question bundles

New country packages or forks should be considered only if there is a truly different runtime boundary.

## Decisions Locked

- Workspace tool: `npm workspaces`
- Root role: metadata/orchestration root, not the primary product app
- Agent model: root `AGENTS.md` plus local delta files only
- Lockfile goal: a single root lockfile after migration
- Configuration policy: package-local config by default; only truly shared config may move to `packages/`
- Country policy: countries are configuration/content tenants, not duplicated app logic

## Authority Model

The future implementation must enforce one authority per category.

| Category | Canonical authority after migration | Notes |
|---|---|---|
| Repo overview | `README.md` | Root repo entrypoint |
| Agent rules | `AGENTS.md` | Local AGENTS files must be deltas only |
| Monorepo structure | `docs/monorepo/REPO_MAP.md` | Current vs target layout |
| Migration execution | `docs/monorepo/MONOREPO_MIGRATION_PLAN.md` | This file |
| Documentation authority map | `docs/monorepo/REPO_AUTHORITY_MATRIX.md` | Legacy mapping |
| Product-specific docs | package-local README/docs | Must not redefine root governance |

Legacy planning files are not deleted in this documentation phase, but the migration branch must either consolidate them or mark them as legacy with clear pointers.

## Phased Execution Plan

### Phase 1: Inventory and Freeze

- Confirm all active packages and deployment entrypoints.
- Classify root-level directories as one of:
  - future workspace package
  - shared data/docs
  - archive candidate
- Record old paths that will need compatibility notes.

### Phase 2: Workspace Bootstrap

- Convert root `package.json` into the workspace authority.
- Declare explicit `workspaces` for `apps/*` and `services/*`.
- Define root umbrella scripts for `build`, `dev`, `lint`, and `test`.
- Keep dependencies package-local unless a shared dependency is demonstrably common and stable.

### Phase 3: Physical Reorganization

- Move package directories to their target workspace paths.
- Reclassify the current root app code instead of leaving it ambiguous.
- Preserve git history through moves where possible.

### Phase 4: Documentation Consolidation

- Update root README to describe the workspace layout.
- Reduce local `AGENTS.md` files to delta-only rules.
- Consolidate or explicitly deprecate duplicate planning files.
- Update references in docs and scripts to the new workspace paths.

### Phase 5: Runtime and Deploy Path Repair

- Update import paths and script paths after moves.
- Update Cloudflare and Supabase references that rely on old directory locations.
- Update any path-sensitive deployment scripts or verification scripts.

### Phase 6: Verification

- Run install from the root.
- Run build/test/lint per active workspace.
- Confirm deploy scripts still resolve the right package config.
- Confirm no active docs still point to dead paths without explanation.

## Required Validation in the Safe Branch

The executing agent must validate all of the following before merge:

- `npm install` succeeds from the root workspace
- each active app/service resolves from its new workspace path
- root scripts can delegate into workspaces correctly
- all active README and AGENTS entrypoints point to the correct authorities
- no unresolved references remain to retired paths such as top-level `saberparatodos/` or `worldexams-api/`
- new contributors can identify the main app, API worker, and service packages from the root docs alone

## Known Risks to Capture During Execution

- The worktree has had frequent concurrent edits; migration must happen in an isolated branch.
- Root and package-level Supabase folders can be mistaken for one system if not documented carefully.
- Worker and Edge Function deployment state may drift from local code; runtime verification must happen after path changes.
- Duplicate planning files can mislead agents if they are left in place without a deprecation note.

## Out of Scope for This Documentation Phase

- additional physical moves beyond the ones already completed in the safe branch
- changing import paths
- converting to a shared package architecture
- modifying deployment infrastructure
- deleting legacy files before they are mapped
