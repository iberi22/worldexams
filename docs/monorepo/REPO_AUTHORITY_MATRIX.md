# Repository Authority Matrix

Last updated: 2026-03-11

## Goal

This matrix prevents agents and maintainers from guessing which document is authoritative.
If a file is listed as legacy or overlapping, it must not silently compete with the canonical source.

## Active Authorities

| Topic | Canonical file | Scope | Rule |
|---|---|---|---|
| Repository entrypoint | `README.md` | whole repo | Start here first |
| Global agent instructions | `AGENTS.md` | whole repo | Highest repo-level authority for structure and workflow |
| Documentation index and deprecation rules | `docs/README.md` | whole repo | Start here before trusting older docs |
| Active planning baseline | `.gitcore/planning/PLANNING.md` | whole repo | Current planning truth for ongoing work |
| Active taskboard | `.gitcore/planning/TASK.md` | whole repo | Current execution state and next actions |
| Monorepo migration plan | `docs/monorepo/MONOREPO_MIGRATION_PLAN.md` | whole repo | Execution plan for safe-branch reorganization |
| Current vs target layout | `docs/monorepo/REPO_MAP.md` | whole repo | Path inventory and destination map |
| Authority/deprecation map | `docs/monorepo/REPO_AUTHORITY_MATRIX.md` | whole repo | This file |
| Root site vs product runtime boundary | `docs/monorepo/SITE_BOUNDARIES.md` | whole repo | Use before editing `apps/worldexams-site/` or `saberparatodos/src/` |
| Root site package docs | `apps/worldexams-site/README.md` | package-local | Site-only scope |
| Root site package agent deltas | `apps/worldexams-site/AGENTS.md` | package-local | Site-only delta rules |
| API worker package docs | `apps/worldexams-api/README.md` | package-local | Worker-only scope |
| API worker agent deltas | `apps/worldexams-api/AGENTS.md` | package-local | Worker-only delta rules |
| Product overview | `saberparatodos/README.md` | package-local | Product-specific only |
| Product-local agent deltas | `saberparatodos/AGENTS.md` | package-local | May add local rules, must not redefine root governance |
| Service package docs | `services/social-orchestrator/README.md` | package-local | Service-only scope |
| Service agent deltas | `services/social-orchestrator/AGENTS.md` | package-local | Service-only delta rules |

## Files That Currently Overlap

| File | Current role | Status in migration |
|---|---|---|
| `PLANNING.md` | mixed launch planning, architecture notes, execution log | legacy planning unless consolidated |
| `TASK.md` | mixed launch taskboard, release checklist | legacy planning unless consolidated |
| `MASTER_PLAN.md` | org-level vision and historical architecture | legacy planning unless consolidated |
| `masterplan.md` | historical prompt/spec artifact | legacy planning unless consolidated |
| `docs/specs/MASTER_PLAN.md` | stream-specific plan/spec | valid as root docs content, but not a replacement for repo governance |
| package-local README files | product/service docs | valid, but cannot override root governance |
| package-local AGENTS files | local guidance | must be delta-only |

## Deprecation Rules for the Migration Branch

- No legacy authority file may remain ambiguous.
- If a legacy file is preserved, its header must clearly say one of:
  - `Legacy reference`
  - `Historical context only`
  - `Product-local only`
- Each preserved legacy file must point to the new canonical file.
- The executing agent must not delete planning files until their useful content is either migrated or explicitly retired.

## What Local AGENTS Files May Still Define

Local AGENTS files may define:

- package-specific commands
- package-specific deploy notes
- package-specific product constraints
- package-specific safety constraints

Local AGENTS files must not redefine:

- the root workspace structure
- the root documentation authority
- the active planning authority under `.gitcore/planning/`
- the repo-wide monorepo migration rules
