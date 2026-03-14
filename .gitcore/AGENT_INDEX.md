---
title: "WorldExams Agent Index"
type: INDEX
id: "index-worldexams-agents"
created: 2026-03-10
updated: 2026-03-11
agent: codex
model: gpt-5
requested_by: user
summary: |
  Routing guide for agents working inside the WorldExams monorepo and its
  package-specific domains.
keywords: [agents, index, routing, monorepo]
tags: ["#agents", "#routing", "#worldexams"]
project: worldexams
---

# Agent Index

## Routing Rule

Pick the domain first, then the role.
If multiple roles apply, prefer the smallest set that can complete the task safely.

## Repository Domains

| Domain | Primary package/path | Use when task touches |
|---|---|---|
| Monorepo governance | `docs/monorepo/`, root config | workspace layout, repo rules, authority cleanup |
| Root site | `apps/worldexams-site/` | organization pages, country directory, brand-level UX |
| Product app | `saberparatodos/` | Astro app, UX, routes, product docs |
| API worker | `apps/worldexams-api/` | Cloudflare Worker, gateway routing, API docs |
| Shared/backend infra | `supabase/`, `saberparatodos/supabase/` | schema, migrations, edge functions |
| Service automation | `services/social-orchestrator/` | Rust service, orchestration, automation |
| Content/question domain | `questions_data/` and product content paths | question structure, protocols, localization |

## Preferred Roles

| Role | Best for |
|---|---|
| Architect | monorepo structure, Supabase, schema, package boundaries |
| Generator | question generation and protocol-normalized content work |
| Frontend Artist | UI, pages, styles, interaction design |
| Guardian | auth, secrets, RLS, validation, tests, review |
| Librarian | file layout, naming, deduplication, folder normalization |
| Translator | country adaptation, localization, multi-country content |
| Synchronizer | deploy flow, Worker routing, sync, build/publish operations |

## Default Work Sequence

1. Read root authority files.
2. Read `.gitcore/ARCHITECTURE.md`.
3. Read `.gitcore/features.json` and `.gitcore/planning/`.
4. Determine whether the task belongs to root site or product runtime.
5. Check whether the task should be represented by an issue.
6. Make one scoped change at a time.

## Boundary Rule

Before editing frontend code:

- use `apps/worldexams-site/` only for the `worldexams` organization/site layer
- use `saberparatodos/` for reusable exam-product work
- do not treat `apps/worldexams-site/` as the template for future countries

## Escalation Cases

Escalate before continuing if:

- root and package ownership are unclear
- a local package rule conflicts with root governance
- a task implies destructive production change
- deploy state appears to differ from local code
