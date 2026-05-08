# Documentation Index

**Last updated:** 2026-04-26
**Version:** v1.0 (in progress) — see [PROJECT_STATE.md](./PROJECT_STATE.md) for current pipeline status.

---

## Quick Index

```
docs/
├── agent-docs/         Canonical area — agent protocol specs
├── API/                API reference docs
├── ARCHITECTURE/       System architecture docs and ADRs
├── ARCHIVED/           Historical plans (superseded)
├── DEPLOY/             Deployment guides
├── examples/           Example bundles (markdown)
├── issues/             Issue-specific working docs
├── monorepo/           Monorepo migration and governance
├── preuniversitario/   Preuniversitario product docs
├── prompts/            Prompt templates
├── reports/            Status reports and PR templates
├── sources/            Source registries (questions-registry.json)
├── specs/              Canonical area — product/domain specs
├── SRC/                Source code reference docs
├── PROJECT_STATE.md    Current project state, version, known issues ⚠️ READ THIS FIRST
├── CHANGELOG.md        Release notes
├── README.md           ← you are here
└── [topic files]       Top-level docs (ANTI_SCRAPING_STRATEGY, BUSINESS_MODEL, etc.)
```

---

## Reading Order For Agents

1. `docs/README.md` ← this file
2. `docs/PROJECT_STATE.md` ← current state, version, pipeline, known issues
3. `AGENTS.md` (root)
4. `.gitcore/ARCHITECTURE.md`
5. `.gitcore/features.json`
6. `.gitcore/planning/PLANNING.md`
7. `docs/monorepo/REPO_AUTHORITY_MATRIX.md`
8. `docs/monorepo/REPO_MAP.md`
9. package-local docs only after the root layer is clear

---

## Canonical Areas

| Topic | Canonical path | Status |
|---|---|---|
| Repo governance | `AGENTS.md` (root) | ✅ |
| Agent rules | `AGENTS.md` (root) | ✅ |
| Architecture | `.gitcore/ARCHITECTURE.md` | ✅ |
| Agent routing | `.gitcore/AGENT_INDEX.md` | ⚠️ listed in reading order, add to this table |
| Feature and release tracking | `.gitcore/features.json` | ✅ |
| Active planning | `.gitcore/planning/` | ✅ |
| Release notes | `docs/CHANGELOG.md` | ✅ |
| Monorepo migration | `docs/monorepo/` | ✅ |
| Protocol-aligned agent docs | `docs/agent-docs/` | ✅ |
| Product/domain specs | `docs/specs/` | ✅ |

---

## All Documented Files

### Root-level docs
| File | Description |
|---|---|
| `AGENTS.md` | Agent rules, routing, memory systems |
| `README.md` | Root project readme |
| `CLAUDE.md` | Claude code assistant config |
| `SRC.md` | Source code index |
| `PROJECT_README.md` | Project summary |

### `.gitcore/` — Governance layer
| File | Description |
|---|---|
| `ARCHITECTURE.md` | System architecture |
| `AGENT_INDEX.md` | Agent routing index |
| `features.json` | Feature flags and release tracking |
| `PROJECT_README.md` | Project summary (gitcore copy) |
| `SRC.md` | Source index (gitcore copy) |
| `STATE.md` | Project state |
| `TODO.md` | TODO tracker |
| `planning/PLANNING.md` | Active planning |
| `planning/TASK.md` | Task protocol |
| `planning/TASK_PROTOCOL_5.md` | Phase 5 task protocol |
| `planning/IMPLEMENTATION_STATUS.md` | Implementation tracking |
| `planning/ISSUE_001_MEN_2026_ALIGNMENT.md` | MEN 2026 alignment |
| `planning/ISSUE_228_BUG_direct-generatepy_stalls_after_159_tasks.md` | Generator stall bug |
| `planning/ISSUE_230–236` | Country curriculum issue files (MX, AR, CL, PE, EC, BR, CO) |

### `docs/agent-docs/`
| File | Description |
|---|---|
| `agent-docs/README.md` | Agent docs index |
| `agent-docs/research/README.md` | Research index |
| `agent-docs/research/RESEARCH_COLOMBIA_QUESTION_BANK_REMEDIATION_2026-03-18.md` | Colombia question bank remediation |
| `agent-docs/research/RESEARCH_GITCORE_LOCAL_ADAPTATION.md` | Gitcore local adaptation |
| `agent-docs/specs/README.md` | Specs index |
| `agent-docs/specs/SPEC_CLOUDFLARE_SABERPARATODOS_DEPLOY.md` | Cloudflare deployment spec |
| `agent-docs/specs/SPEC_GITCORE_MONOREPO_GOVERNANCE.md` | Gitcore monorepo governance |
| `agent-docs/specs/SPEC_PRODUCT_TEMPLATE_BOUNDARY.md` | Product template boundary |
| `agent-docs/specs/SPEC_SUPABASE_EDGE_FUNCTIONS_SOURCE_OF_TRUTH.md` | Supabase edge functions |

### `docs/monorepo/`
| File | Description |
|---|---|
| `MONOREPO_MIGRATION_PLAN.md` | Migration plan |
| `REPO_AUTHORITY_MATRIX.md` | Authority matrix |
| `REPO_MAP.md` | Repository map |
| `SITE_BOUNDARIES.md` | Site boundary definitions |

### `docs/specs/` (canonical — full listing)
| File | Description |
|---|---|
| `README.md` | Specs index |
| `ACTIVE_PROTOCOLS.md` | Active protocol list |
| `BOT_ECOSYSTEM.md` | Bot ecosystem spec |
| `BUNDLE_MIGRATION_PLAN.md` | Bundle migration |
| `COLOMBIA_MIGRATION_PLAN.md` | Colombia migration |
| `COMMUNITY_CURATION_PROTOCOL.md` | Community curation |
| `EXPANSION_MX_US.md` | MX/US expansion |
| `GLOBAL_EXCHANGE_PROTOCOL.md` | Global exchange |
| `ICFES_CURRICULUM.md` | ICFES curriculum spec |
| `JULES_TASK_RETRY.md` | Jules retry protocol |
| `LANZAMIENTO.md` | Launch spec |
| `MASIVE_GENERATION_SYSTEM.md` | Mass generation system |
| `MASTER_PLAN.md` | Master plan |
| `OPEN_DATABASE_ARCHITECTURE.md` | Open database |
| `PREUNIVERSITARIO_PACKS_V41.md` | Preuniversitario packs |
| `PREUNIVERSITARIO_PROTOCOL_V4PLUS.md` | Preuniversitario protocol |
| `PREU_MASTERY_1000_PLAN.md` | Preu mastery 1000 plan |
| `QUESTION_DOMAIN_REFACTOR_PHASE1.md` | Domain refactor phase 1 |
| `QUESTION_DOMAIN_REFACTOR_PHASE2.md` | Domain refactor phase 2 |
| `QUESTION_GENERATION_PLAN.md` | Question generation plan |
| `QUESTION_SOURCES.md` | Question sources |
| `REPLICACION.md` | Replication spec |
| `ROADMAP.md` | Roadmap |
| `SCORING_SYSTEM.md` | Scoring system |
| `SOURCES_REGISTRY.md` | Sources registry |
| `TASK.md` | Task spec |

### `docs/reports/`
| File | Description |
|---|---|
| `PR-templates/PR1–PR5*.md` | PR templates for subject areas |
| `ISSUE_TEMPLATE_JULES.md` | Jules issue template |
| `JULES_REVIEW_2025_12_08.md` | Jules review |
| `actualizacion-agentes-config.md` | Agent config update |
| `analisis-ramas-remote.md` | Branch analysis |
| `colombia-packs-status.md` | Colombia packs status |
| `fix-giscus-multiple-instances.md` | Giscus fix |
| `jules-instructions-colombia.md` | Jules Colombia instructions |
| `jules-pr43-analisis.md` | Jules PR43 analysis |
| `party-mode-status.md` | Party mode status |
| `plan-100-preguntas-grado11.md` | 100 questions plan |
| `PRODUCTION_READINESS_REPORT.md` | Production readiness |
| `README_RESUMEN_EJECUTIVO.md` | Executive summary |
| `RESUMEN_EJECUTIVO_SISTEMA_TRACKING.md` | Tracking executive summary |
| `RESUMEN_TRABAJO_COMPLETADO.md` | Work completed summary |

### `docs/preuniversitario/top-10/`
| File | Description |
|---|---|
| `README.md` | Preuniversitario index |
| `ROADMAP.md` | Roadmap |
| `ELIGIBILITY_MATRIX.md` | Eligibility matrix |
| `SESSION_HANDOFF_2026-03-07.md` | Session handoff |
| `udea/core-blueprint.md` | UDEA core blueprint |
| `udea/institution-profile.md` | UDEA institution profile |
| `udea/comprension-lectora/pack-01–05.md` | UDEA comprensión投标人 packs |
| `udea/razonamiento-logico/pack-01–05.md` | UDEA razonamiento投标 packs |
| `unal/core-blueprint.md` | UNAL core blueprint |
| `unal/institution-profile.md` | UNAL institution profile |
| `_templates/pack-template.md` | Pack template |

### `docs/ARCHITECTURE/`
| File | Description |
|---|---|
| `OVERVIEW.md` | Architecture overview |
| `ADR/README.md` | ADR index |

### `docs/ARCHIVED/`
| File | Description |
|---|---|
| `IMPLEMENTATION_PLAN_2025-12.md` | Archived implementation plan |

### `docs/sources/`
| File | Description |
|---|---|
| `README.md` | Sources index |
| `questions-registry.json` | Questions registry |

### `docs/src/`
| File | Description |
|---|---|
| `index.md` | SRC index |
| `DATABASE.md` | Database reference |
| `GLOSSARY.md` | Glossary |
| `INTERFACES.md` | Interfaces |
| `NON-FUNCTIONAL.md` | Non-functional requirements |
| `REQUIREMENTS.md` | Requirements |

### `docs/issues/`
| File | Description |
|---|---|
| `jules-video-qa-and-refinement.md` | Jules video QA |
| `LEGACY_BUNDLE_MIGRATION_TRACKER.md` | Legacy bundle migration |

### `docs/prompts/`
| File | Description |
|---|---|
| `jules_creation_plan_prompt.md` | Jules creation plan prompt |

### `docs/API/`
| File | Description |
|---|---|
| `README.md` | API index |

### `docs/DEPLOY/`
| File | Description |
|---|---|
| `README.md` | Deploy index |

### `docs/examples/`
| File | Description |
|---|---|
| `ENG-TEST-001-bundle.md` | English test bundle example |
| `MX-MAT-11-angulos-001-bundle.md` | Mexican math bundle example |

### Top-level docs/ files (not in subdirectories)
| File | Description |
|---|---|
| `ANTI_SCRAPING_STRATEGY.md` | Anti-scraping strategy |
| `API_GENERATION.md` | API generation guide |
| `API_REAL_SETUP.md` | Real API setup |
| `AUTHENTICATION_MAGIC_LINK.md` | Magic link auth |
| `BUSINESS_MODEL.md` | Business model |
| `CHANGELOG.md` | Changelog (canonical) |
| `DEBUG_SESSION_PARTY_MODE.md` | Party mode debug |
| `E2E_PARTY_MODE_TESTS.md` | E2E party mode tests |
| `ENGLISH_CURRICULUM_MATRIX.md` | English curriculum matrix |
| `ENGLISH_LEARNING_PROTOCOL.md` | English learning protocol |
| `ENGLISH_REPORT_TEMPLATE.md` | English report template |
| `IMPLEMENTATION_CHECKLIST.md` | Implementation checklist |
| `IMPLEMENTATION_PLAN.md` | Implementation plan |
| `IMPLEMENTATION_PLAN_QUESTION_SYSTEM.md` | Question system implementation |
| `INFOGRAPHIC_GENERATION_PLAN.md` | Infographic generation plan |
| `INTERNATIONALIZATION_REPORT.md` | i18n report |
| `MODERN_QUESTIONS_PROTOCOL.md` | Modern questions protocol |
| `MONETIZATION_STRATEGY.md` | Monetization strategy |
| `OFFLINE_STRATEGY.md` | Offline strategy |
| `PARTY_MODE.md` | Party mode |
| `PARTY_MODE_CONFIG_SYNC_FIX.md` | Party mode config sync fix |
| `PARTY_MODE_MIGRATION.md` | Party mode migration |
| `PARTY_MODE_SYNC_FIX.md` | Party mode sync fix |
| `PARTY_MODE_WEB_ARCHITECTURE.md` | Party mode web architecture |
| `QUESTION_GENERATION_PROTOCOL_V2.md` | QGP v2 |
| `QUESTION_GENERATION_PROTOCOL_V3.md` | QGP v3 |
| `QUESTION_GENERATION_PROTOCOL_V4.md` | QGP v4 |
| `QUESTION_GENERATION_PROTOCOL_V5.md` | QGP v5 |
| `REFINEMENT_PLAN.md` | Refinement plan |
| `REMAINING_CVES.md` | Remaining CVEs |
| `ROADMAP_NATIVE_APPS.md` | Native apps roadmap |
| `ROTATING_QUESTION_PACKS.md` | Rotating question packs |
| `SCRIPTS_GUIDE.md` | Scripts guide |
| `SECRETS_SETUP_GUIDE.md` | Secrets setup |
| `SENTRY_SETUP.md` | Sentry setup |
| `SOCIAL_MEDIA_BOTS_ARCHITECTURE.md` | Social bots architecture |
| `SUPABASE_SECRETS_SETUP.md` | Supabase secrets |
| `SYNC_QUESTIONS_ARCHITECTURE.md` | Sync questions architecture |
| `TESTING_PROTOCOL_V2.md` | Testing protocol v2 |
| `TESTING_TRAINING_ROOM.md` | Testing training room |
| `V1_PLAN.md` | v1 plan |
| `VIDEO_V41_PIPELINE.md` | Video v41 pipeline |
| `PROJECT_STATE.md` | **Current project state ⚠️** |

---

## Historical Docs Policy

Treat a document as historical unless it is part of the canonical areas above or clearly linked from them.

Historical docs:
- may preserve useful implementation context
- must not override root governance
- must not be used as the default source for deploy, repo topology, or release-state decisions

If a historical doc mentions any of the following, validate it against the root layer before using:
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
- `apps/landing-worldexams/` as the `worldexams` organization/site layer
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

---

## Pre-Commit Hooks

The repo uses [pre-commit](https://pre-commit.com/) to run automated checks before every commit.

### Install

```bash
pre-commit install --config .pre-commit-config.yaml
```


### Update hook versions

```bash
pre-commit autoupdate
```

### Skip hooks (emergency)

```bash
git commit --no-verify -m "your message"
```

### Run manually

```bash
# All files
pre-commit run --all-files --config .pre-commit-config.yaml

# Or use the helper script
.\scripts\run-pre-commit.ps1
```

### What each hook checks

| Hook | What it does |
|---|---|
| `gitleaks` | Scans for secrets, API keys, tokens, passwords |
| `bandit` | Python security scanner |
| `black` | Formats Python files (line-length: 120) |
| `isort` | Sorts Python import statements |
| `check-yaml` | Validates YAML syntax |
| `check-json` | Validates JSON syntax |
| `check-merge-conflict` | Detects merge conflict markers |
| `check-case-conflict` | Detects case conflicts across files |
| `detect-private-key` | Blocks private SSH key files |
| `end-of-file-fixer` | Ensures files end with a newline |
| `trailing-whitespace` | Removes trailing whitespace |
| `mixed-line-ending` | Normalizes line endings to LF |
| `tsc-compile` | TypeScript type check via `npx tsc --noEmit` |
| `markdownlint` | Lints markdown files (config: `.markdownlintrc.json`) |
| `npm-audit-fast` | Runs `npm audit --audit-level=high` in saberparatodos |
| `no-main-commit` | Blocks commits directly to `main`/`master` |

---

## Known Issues (audit 2026-04-26)

| # | Issue | Severity | Ref |
|---|---|---|---|
| 1 | `.gitcore/AGENT_INDEX.md` referenced in reading order but missing from canonical areas table | low | above |
| 2 | `docs/issues/`, `docs/reports/`, `docs/sources/`, `docs/src/`, `docs/API/`, `docs/DEPLOY/`, `docs/prompts/`, `docs/examples/`, `docs/preuniversitario/` not listed in README canonical areas | medium | above |
| 3 | Pipeline paused — cronjob disabled pending fixes | high | PROJECT_STATE.md |
| 4 | `direct-generate.py` stalls after ~159 tasks | high | `.gitcore/planning/ISSUE_228*.md` |
| 5 | Live secrets exposed in saberparatodos | critical | `.gitcore/planning/ISSUE_196*.md` |
| 6 | Security: smol-toml DoS via thousands of comments | moderate | `.gitcore/planning/ISSUE_216*.md` |
| 7 | Security: exposed secrets detected in git history | critical | `.gitcore/planning/ISSUE_221*.md` |
