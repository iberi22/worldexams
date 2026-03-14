# Repository Map

Last updated: 2026-03-11

## Current Layout

```text
worldexams/
├── AGENTS.md
├── README.md
├── MASTER_PLAN.md
├── masterplan.md
├── PLANNING.md
├── apps/
│   ├── worldexams-site/
│   └── worldexams-api/
├── docs/
├── supabase/
├── scripts/
├── tests/
├── questions_data/
├── saberparatodos/
├── services/
│   └── social-orchestrator/
└── package.json
```

## Current Classification

| Path | Current role | Target classification |
|---|---|---|
| `apps/worldexams-site/` | current `worldexams` organization/site runtime | keep as app package |
| `saberparatodos/` | main Colombia product | `apps/saberparatodos/` |
| `apps/worldexams-api/` | Cloudflare Worker/API package | keep as app package |
| `services/social-orchestrator/` | auxiliary automation service | keep as service package |
| `docs/` | shared documentation | keep at root |
| `questions_data/` | question-related assets | keep at root for now, later confirm `data/` move if needed |
| `supabase/` | root-level Supabase assets and historical/shared material | keep at root until ownership is clarified |
| `scripts/` | root-level scripts | keep at root until package ownership is clarified |
| root tests and leftover runtime-specific files | ambiguous root app/runtime material | audit and classify during migration |

## Target Layout

```text
worldexams/
├── apps/
│   ├── worldexams-site/
│   └── worldexams-api/
├── saberparatodos/
├── services/
│   └── social-orchestrator/
├── docs/
├── AGENTS.md
├── README.md
└── package.json
```

## Package Boundaries to Preserve

- `apps/worldexams-site`
  - organization-level site
  - country directory and top-level navigation
  - no exam runtime ownership
- `saberparatodos`
  - shared exam-product runtime
  - current Colombia implementation
  - tenant-based base template for future countries
  - product-local Supabase functions and migrations
  - product tests and scripts
- `apps/worldexams-api`
  - Cloudflare Worker
  - worker-local TypeScript config and deploy config
- `services/social-orchestrator`
  - Rust service
  - service-local dependencies and run scripts

## Country Boundary Rule

Countries should be added through:

- shared UI/template reuse
- country config
- localized copy/SEO
- country-specific question content

Countries should not be added by copying the whole application package unless a new runtime is genuinely required.

## Root Site vs Product Runtime

Interpret paths like this:

- `apps/worldexams-site/src/` = current organization/site frontend
- `saberparatodos/src/` = current reusable exam-product frontend

This means:

- root site owns organization pages and cross-country discovery
- `saberparatodos` owns the reusable exam experience
- exam/runtime features should not be implemented in `apps/worldexams-site/`

## Files That Must Be Audited During the Move

- every `wrangler.toml`
- every `package.json`
- every `tsconfig.json`
- every Supabase folder
- every script with hard-coded repo-relative paths
- every doc that references `saberparatodos/` or the old top-level `worldexams-api/` path directly
