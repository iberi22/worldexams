# Documentation Index

Last updated: 2026-03-10

## Purpose

This file is the entrypoint for repository documentation.
Use it to decide which docs are authoritative and which ones are historical context only.

## Reading Order For Agents

1. `README.md`
2. `AGENTS.md`
3. `.gitcore/ARCHITECTURE.md`
4. `.gitcore/features.json`
5. `.gitcore/planning/PLANNING.md`
6. `docs/monorepo/REPO_AUTHORITY_MATRIX.md`
7. `docs/monorepo/REPO_MAP.md`
8. package-local docs only after the root layer is clear

## Canonical Areas

| Topic | Canonical path |
|---|---|
| Repo governance | `README.md` |
| Agent rules | `AGENTS.md` |
| Architecture | `.gitcore/ARCHITECTURE.md` |
| Agent routing | `.gitcore/AGENT_INDEX.md` |
| Feature and release tracking | `.gitcore/features.json` |
| Active planning | `.gitcore/planning/` |
| Release notes | `docs/CHANGELOG.md` |
| Monorepo migration | `docs/monorepo/` |
| Protocol-aligned agent docs | `docs/agent-docs/` |
| Product/domain specs | `docs/specs/` |

## Historical Docs Policy

Treat a document as historical unless it is part of the canonical areas above or clearly linked from them.

Historical docs:

- may preserve useful implementation context
- must not override root governance
- must not be used as the default source for deploy, repo topology, or release-state decisions

If a historical doc mentions any of the following, validate it against the root layer before using it:

- public repository workflows
- GitHub Actions as the default production deploy path
- dual-repo or submodule content architecture
- country forks as the default scaling model
- legacy paths that no longer match the current repo map

## Monorepo Rule

WorldExams should expand by reusing shared application logic and shared UI.
New countries should normally require configuration, localization, SEO, branding, and question content, not duplicated app logic.

## Site Boundary Rule

This repo currently has:

- `apps/worldexams-site/` as the `worldexams` organization/site layer
- `saberparatodos/src/` as the shared exam-product runtime

Use the root site for:

- organization messaging
- country directory / ecosystem navigation
- top-level brand surface

Use `saberparatodos/` for:

- exam flows
- tenant-aware product behavior
- question/runtime logic
- reusable country product template work

If a task crosses both areas, decide ownership first before editing files.
