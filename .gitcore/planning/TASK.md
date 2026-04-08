# WorldExams Active Taskboard

Last updated: 2026-03-11

## In Progress

- [x] Establish `apps/landing-worldexams/` as the dedicated workspace for the root site
- [x] Normalize root docs around the site/runtime boundary
- [x] Create `.gitcore/planning/` as the active planning layer
- [x] Move `worldexams-api/` to `apps/worldexams-api/`
- [x] Move `social-orchestrator/` to `services/social-orchestrator/`
- [x] Align premium backend docs with current Worker + Supabase architecture
- [x] Apply pending Supabase SQL from canonical migrations
- [x] Validate pre-production testing path for premium/public API fixes
- [ ] Deploy the corrected `get-questions` and `api-gateway` functions
- [ ] Deploy updated `apps/worldexams-api` to restore public `/v1/questions`
- [ ] Decide whether and when to move `saberparatodos/` into `apps/`
- [ ] Stabilize full workspace build after the package moves

## Next

- [ ] Decide later whether `saberparatodos/` should move into `apps/`; current canonical state keeps it in place
- [ ] Update all package-local READMEs and AGENTS deltas after the remaining moves
- [ ] Archive or retire legacy planning files once the migration is complete

## Known Risks

- `saberparatodos` workspace build still needs separate stabilization.
- Legacy docs can still confuse tools if they are read out of order.
- Root and package-level Supabase material still need a clearer ownership pass.
- Premium backend is implemented, but production still has deploy drift between repo and remote functions.
- `page.dev` is not the valid preview surface for the current `saberparatodos` Worker SSR runtime; use `workers.dev` or local.
- Local E2E confirms the `/v1/questions` regression moved from `401` to upstream `404`, so production deploy is still blocked on remote function drift.
