# World Exams

Private prelaunch monorepo for the WorldExams organization, shared exam-product runtime, and supporting operational tooling.

## Current Shape

- `saberparatodos/` is the canonical product runtime and template for future country products.
- `apps/landing-worldexams/` is the global organization site and country directory surface.
- `apps/worldexams-api/` is the Cloudflare Worker gateway.
- `services/social-orchestrator/` is the auxiliary automation service.
- `supabase/` remains root-level historical/shared infra; active product Edge Functions live under `saberparatodos/supabase/`.

This workspace is private and prelaunch. Do not assume any public repo split or public release workflow is active.

## Governance

Start here when you need repo truth:

- `AGENTS.md`
- `.gitcore/ARCHITECTURE.md`
- `.gitcore/AGENT_INDEX.md`
- `.gitcore/planning/PLANNING.md`
- `.gitcore/planning/TASK.md`
- `docs/README.md`
- `docs/monorepo/REPO_AUTHORITY_MATRIX.md`

Historical planning files remain context only unless the root governance layer explicitly revives them.

## Runtime Boundary

These two frontend surfaces must stay separate:

- `apps/landing-worldexams/`: marketing, organization messaging, country discovery, institutional routing.
- `saberparatodos/`: shared product runtime, tenant-aware exam UX, product auth, runtime configuration, country-localized product rendering.

New country rollout should default to configuration, localization, theming, SEO, and content work inside the shared product runtime. Do not clone the landing site as a product base.

## Product Direction

WorldExams should scale by reusing one application template across countries.

- Shared UI and shared business logic stay in one codebase.
- Countries vary by tenant config, copy, cultural context, SEO, curriculum metadata, and question content.
- New packages should only appear when there is a true runtime or service boundary.

## Repository Map

```text
worldexams/
├── apps/
│   ├── landing-worldexams/       # Global organization site
│   └── worldexams-api/           # Cloudflare Worker gateway
├── saberparatodos/               # Shared exam-product runtime template
├── services/social-orchestrator/ # Auxiliary automation service
├── docs/                         # Canonical docs, protocols, agent docs
├── supabase/                     # Shared/legacy Supabase material
├── scripts/                      # Root automation and verification scripts
├── questions_data/               # Question-related assets
└── .gitcore/planning/            # Active planning authority
```

## Local Development

Install from the root:

```bash
npm install
```

Root workspace commands:

```bash
npm run dev:landing-worldexams
npm run dev:saberparatodos
npm run dev:worldexams-api
npm run build
npm run build:workspaces
npm run test:e2e
```

Direct product runtime commands:

```bash
cd saberparatodos
npm run dev
npm run build
```

## Security Notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client code.
- Keep question banks, source materials, and unreleased operational content private.
- Validate any legacy deploy or repo-topology docs against the root governance layer before acting.

## Contact

- Product site: [saberparatodos.space](https://saberparatodos.space)
