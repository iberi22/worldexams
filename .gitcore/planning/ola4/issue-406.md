# [Ola 4.06] feat-encrypted-vault-sync — Encrypted Progress & Notes Storage via Vault Bridge

> Ola 4 — Security / Storage.
> Labels: `ola4`, `wave-4`

---

## Current State (MEDIBLE)
- Feature: `feat-encrypted-vault-sync` at 0% in `features.json`
- `saberparatodos/src/lib/idb-storage.ts` provides basic `_encryptedPayload` for `ExamResultRecord`.
- Notes, detailed study analytics, and pedagogical progress are not synced across devices via SWAL Vault encrypted blobs.

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/lib/vault/encrypted-vault-sync.ts`:
  - Serializes student study notes, subject competencies, error logs, and metadata.
  - Encrypts payload with symmetric key derived from Vault session (`AES-256-GCM`).
  - Prepares encrypted sync chunk for mesh broadcast or local vault export.
  - Decrypts chunk transparently when authorized by the student's Vault key.
  - Strict Zero-PII guarantee: Server/relays only see encrypted binary blob + `node_hash`.
- **File Target**: `saberparatodos/src/lib/vault/encrypted-vault-sync.ts` and `saberparatodos/tests/unit/encrypted-vault-sync.test.ts`.

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] Roundtrip encryption -> serialization -> deserialization -> decryption preserves 100% data integrity.
- [ ] Throws `[BR-04]` error if any unencrypted PII field is attached outside ciphertext.
- [ ] `npm run test:unit -- saberparatodos/tests/unit/encrypted-vault-sync.test.ts` passes 100%.

## Files to Modify / Create
| File | Current State | Change | Risk |
|------|--------------|--------|------|
| `saberparatodos/src/lib/vault/encrypted-vault-sync.ts` | [NEW] | Encrypted metadata and notes synchronization module | LOW |
| `saberparatodos/tests/unit/encrypted-vault-sync.test.ts` | [NEW] | Unit tests for AES-GCM encryption/decryption roundtrip and PII guards | LOW |

## DO NOT touch
- `saberparatodos/src/lib/vault/vault-auth-client.ts` — assigned to Issue #405
- `saberparatodos/src/components/leaderboard/` — assigned to Issue #407
- `features.json` — reconciled at wave end (Issue #410)

## Anti-Hallucination Guard
1. READ before write: inspect `saberparatodos/src/lib/encryption.ts` and `saberparatodos/src/lib/idb-storage.ts`.
2. Follow Web Crypto API standards for AES-GCM 256-bit with 12-byte random IV.

## Merge Order
- **Merge order within wave:** 6
- **Expected effort:** Medium (<45m)
- **Parallel with:** All other wave issues (disjoint file islands)
