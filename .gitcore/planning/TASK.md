# WorldExams Active Taskboard

Last updated: 2026-03-11

## In Progress

- [x] Establish `apps/worldexams-site/` as the dedicated workspace for the root site
- [x] Normalize root docs around the site/runtime boundary
- [x] Create `.gitcore/planning/` as the active planning layer
- [x] Move `worldexams-api/` to `apps/worldexams-api/`
- [x] Move `social-orchestrator/` to `services/social-orchestrator/`
- [ ] Decide whether and when to move `saberparatodos/` into `apps/`
- [ ] Stabilize full workspace build after the package moves

## Next

- [ ] Decide timing for moving `saberparatodos/` into `apps/saberparatodos/`
- [ ] Update all package-local READMEs and AGENTS deltas after the remaining moves
- [ ] Archive or retire legacy planning files once the migration is complete

## Known Risks

- `saberparatodos` workspace build still needs separate stabilization.
- Legacy docs can still confuse tools if they are read out of order.
- Root and package-level Supabase material still need a clearer ownership pass.
