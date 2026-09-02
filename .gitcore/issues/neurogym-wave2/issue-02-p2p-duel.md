# [Ola 2.02] feat-neurogym-p2p-duel — P2P Real-Time Cognitive Speed Duel (WebRTC Mesh)

> Ola 2 — NeuroGym Multiplayer.
> Labels: `ola2`, `wave-2`, `neurogym`

---

## Current State (MEDIBLE)
- File: `saberparatodos/src/lib/local-mesh-pairing.ts` handles LAN mesh discovery.
- Tests: 71 test suites passing (570 tests).

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/components/neurogym/NeuroP2PDuelBoard.svelte` enabling two peers in a local room to compete synchronously in a 60-second Stroop & Speed tapping duel with peer-to-peer score streaming and zero server lag.
- **File Target**: `saberparatodos/src/components/neurogym/NeuroP2PDuelBoard.svelte`

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "NeuroP2PDuelBoard" saberparatodos/src/components/neurogym/` >= 1 match

## Files to Modify
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/neurogym/NeuroP2PDuelBoard.svelte` | Non-existent | [NEW] P2P real-time cognitive duel board | LOW |
