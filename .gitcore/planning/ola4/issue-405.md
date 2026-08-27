# [Ola 4.05] feat-vault-auth-bridge — SWAL Vault Decentralized Auth & Passkey Bridge

> Ola 4 — Security / Identity.
> Labels: `ola4`, `wave-4`

---

## Current State (MEDIBLE)
- Feature: `feat-vault-auth-bridge` at 0% in `features.json`
- `saberparatodos/src/lib/encryption.ts` handles local 12-word seed phrase and PBKDF2 key derivation.
- No direct client bridge exists to connect with SWAL Vault (`apps/swal-vault` via WebAuthn Passkeys / Native Messaging Host `com.swal.vault.nm`).

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/lib/vault/vault-auth-client.ts`:
  - Decentralized login without email/password.
  - Generates cryptographic challenge for WebAuthn / Passkey or BIP39 seed signature.
  - Derives deterministic zero-PII `node_hash = sha256(pubkey + salt)`.
  - Supports Native Messaging protocol `com.swal.vault.nm` if running in supported desktop browser environment.
  - Zero PII: Does not store, transmit, or ask for email, student name, or national ID.
- **File Target**: `saberparatodos/src/lib/vault/vault-auth-client.ts`, `saberparatodos/src/lib/vault/types.ts`, and `saberparatodos/tests/unit/vault-auth-client.test.ts`.

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `assertNoPII()` passes on all auth payloads.
- [ ] Derives stable `node_hash` for the same credential.
- [ ] `npm run test:unit -- saberparatodos/tests/unit/vault-auth-client.test.ts` passes 100%.

## Files to Modify / Create
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/lib/vault/types.ts` | [NEW] | Types for Vault auth, credentials, and challenge/response | LOW |
| `saberparatodos/src/lib/vault/vault-auth-client.ts` | [NEW] | Client library bridging PWA with SWAL Vault daemon / Passkeys | LOW |
| `saberparatodos/tests/unit/vault-auth-client.test.ts` | [NEW] | Unit tests for deterministic key derivation and challenge flow | LOW |

## DO NOT touch
- `saberparatodos/src/lib/vault/encrypted-vault-sync.ts` — assigned to Issue #406
- `saberparatodos/src/components/leaderboard/` — assigned to Issue #407
- `features.json` — reconciled at wave end (Issue #410)

## Anti-Hallucination Guard
1. READ before write: inspect `apps/swal-vault/README.md` and `saberparatodos/src/lib/encryption.ts`.
2. Ensure strict Zero-PII adherence (BR-04).

## Merge Order
- **Merge order within wave:** 5
- **Expected effort:** Medium (<45m)
- **Parallel with:** All other wave issues (disjoint file islands)
