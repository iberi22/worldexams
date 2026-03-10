# World Exams

Open-source exam-practice infrastructure for localized education products.

This workspace currently contains the Colombia product `SaberParaTodos`, organization-level documentation, Supabase assets, automation scripts, and migration material that is being prepared for a cleaner public split.

## Current Status

- Product in focus: `saberparatodos` for Colombia / ICFES Saber 11
- Frontend stack: Astro + Svelte
- Backend stack: Supabase Auth / DB / Edge Functions
- Hosting: Cloudflare Pages
- API access: developer portal + API key flow
- Content strategy: application code public, question bank private

## Public Repository Direction

The target public structure is:

- `world-exams/world-exams`
  - organization-level standards
  - architecture docs
  - public roadmap
  - cross-country protocols
- `world-exams/saberparatodos`
  - public Colombia application code
  - frontend
  - public-safe Supabase schema/functions
  - tests
  - product documentation
- private question repository
  - question bundles
  - generation inputs
  - review workflows
  - source materials

At the moment, this repository is still a launch workspace and not yet the final public split.

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
- Extensive planning/specification documents accumulated during product evolution

## Repository Map

```text
worldexams/
├── saberparatodos/           # Main Colombia product
├── docs/                     # Organization and protocol documentation
├── supabase/                 # Org-level / legacy / shared Supabase material
├── scripts/                  # Automation and generation scripts
├── social-orchestrator/      # Social automation work
├── questions_data/           # Local question-related assets
└── TASK.md / PLANNING.md     # Launch planning and execution notes
```

## Where To Start

### Product App

- App code: `saberparatodos/`
- Product README: `saberparatodos/README.md`
- Launch planning: `TASK.md`
- Launch architecture and repo strategy: `PLANNING.md`

### Key Product Areas

- Pages: `saberparatodos/src/pages/`
- Components: `saberparatodos/src/components/`
- Developer portal: `saberparatodos/src/pages/developers/`
- Supabase functions: `saberparatodos/supabase/functions/`
- Supabase migrations: `saberparatodos/supabase/migrations/`
- Scripts: `saberparatodos/scripts/`
- Video pipeline: `saberparatodos/video-pipeline/`

## Local Development

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

The public launch still requires documentation cleanup. The current priorities are:

- English-first architecture docs
- route/component/function inventory
- public/private repository boundary docs
- social/video feature status docs
- launch backlog and release notes

## Security Notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client code
- Public docs should only include public-safe environment variables
- Question banks and source materials are intended to stay private

## License

See `LICENSE.md`.

## Contact

- GitHub organization: https://github.com/world-exams
- Product site: https://saberparatodos.space
