# World Exams Launch Taskboard

Last updated: 2026-03-09

## Launch Audit Findings

- [x] `saberparatodos` now uses `/` as the main practice entry point instead of a duplicated `/practica` landing flow.
- [x] Developer onboarding no longer blocks first-time token creation: dashboard can bootstrap a personal organization and create the first API key.
- [x] API docs now describe the real gateway flow (`Authorization: Bearer ...`) instead of the outdated static JSON contract.
- [x] `api-gateway` was missing from deployed Supabase Edge Functions and has now been deployed.
- [x] Public-facing platform manual now exists at `saberparatodos/src/pages/manual-plataforma.astro`.
- [ ] Public GitHub target repo is still missing: `https://github.com/world-exams/saberparatodos` does not exist yet.
- [ ] Root repository is not public-ready: mixed Spanish/English docs, duplicate planning files, and contradictory repo narratives.
- [ ] Public/private split is not enforced yet: the questions/content strategy is documented, but the repository boundaries are not cleaned up for open-source publication.
- [ ] Social/video system is not launch-complete: queue scripts exist, but documentation, publishing workflow, and public-safe framing are incomplete.
- [ ] Changelog/novedades content still needs editorial cleanup to remove dead or weak links and align post quality with a public repo standard.

## Must Finish Today

### 1. Public Repo Readiness
- [ ] Decide final public repository structure:
  - `world-exams/world-exams` as organization/meta repo
  - `world-exams/saberparatodos` as public product repo
  - private repo for question banks only
- [ ] Remove or rewrite files that assume the repo must remain private.
- [ ] Consolidate duplicate planning docs (`MASTER_PLAN.md`, `masterplan.md`, `PLANNING.md`) into a public-safe structure.
- [ ] Ensure root README explains the current architecture truthfully and in English.

### 2. Documentation Baseline
- [ ] Publish an English architecture overview with:
  - component map
  - route map
  - Supabase tables/functions map
  - deployment flow
- [ ] Publish an English backlog with launch-critical vs post-launch work.
- [ ] Publish English docs for social/video pipeline status and limitations.
- [ ] Publish an implementation index pointing to real source paths.

### 3. Security and Open-Source Hygiene
- [ ] Audit `.env.example` files and remove any server-only variables from public-facing setup instructions.
- [ ] Verify no real secrets, tokens, or private operational notes remain in tracked files.
- [ ] Mark the question bank as private-only in public docs and remove ambiguity about where content lives.

### 4. Product Release Quality
- [ ] Review all `/novedades` posts and fix broken or misleading links.
- [ ] Verify the developer dashboard flow with a real user session and first API key creation.
- [ ] Verify `/developers/docs`, `/manual-plataforma`, `/guia-examen`, and `/preparacion` as the public documentation surface.
- [ ] Review unfinished UI labels, placeholders, and mixed-language copy.

## Should Finish Next

- [ ] Convert internal Spanish operational docs to English or move them under an `internal/` or private location.
- [ ] Replace static changelog data with a single source of truth from content collections.
- [ ] Add public docs for the video explanation feature, including current status, missing steps, and roadmap.
- [ ] Add a public component inventory for Astro pages, Svelte components, and Supabase functions.

## Verified During This Session

- [x] `npm run build` succeeds in `saberparatodos`.
- [x] English diagnostic flow was repaired and tested previously in this session.
- [x] `/novedades` now exposes the changelog entry point more clearly.
- [x] `api-gateway` is active in Supabase after deployment.

## Immediate Decision Needed

- [ ] Confirm whether today’s launch means:
  - soft launch with current repo cleanup and docs only
  - or full public repo publication under `world-exams/saberparatodos`
