# [Ola 1.09] feat-neurogym-institution-agreement — Institutional P2P Cognitive Progress Export & Privacy Handshake

> Ola 1 — NeuroGym Governance.
> Labels: `ola1`, `wave-1`, `neurogym` (without `jules` yet)

---

## Current State (MEDIBLE)
- Feature: `feat-institution-p2p-agreement` at 100% in `.gitcore/features.json`
- File: `saberparatodos/src/lib/institution-handshake.ts` exists.
- Tests: 70 existing, 568 passing.

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/components/neurogym/NeuroInstitutionalShareModal.svelte` integrating the P2P consent handshake so students can explicitly authorize sharing only aggregated cognitive indices (IQ Proxy, WMI, PSI) with their verified school node without exposing raw reaction times or PII.
- **File Target**: `saberparatodos/src/components/neurogym/NeuroInstitutionalShareModal.svelte`

## Web Research Required
1. search: "FERPA GDPR student cognitive data privacy sovereign consent"
2. search: "cryptographic consent agreement UI token sharing modal"

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "NeuroInstitutionalShareModal" saberparatodos/src/components/neurogym/` >= 1 match
- [ ] Binds with `createAgreement()` from `institution-handshake.ts` and displays current active agreement status with instant revocation button.

## Files to Modify
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/components/neurogym/NeuroInstitutionalShareModal.svelte` | Non-existent | [NEW] Sovereign institutional cognitive consent modal | LOW |

## DO NOT touch
- `saberparatodos/src/lib/institution-handshake.ts`
- `.gitcore/features.json` — reconciled at wave end

## Anti-Hallucination Guard
1. Import `getActiveAgreementForInstitution`, `createAgreement`, `revokeAgreement` from `../../lib/institution-handshake`.
2. Svelte 5 runes strict typing.

## Merge Order
- **Merge order within wave:** 9
- **Expected effort:** Small (<25m)
- **Parallel with:** All other wave-1 issues (disjoint file islands)
