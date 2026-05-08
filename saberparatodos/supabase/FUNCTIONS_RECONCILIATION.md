# Supabase Functions Reconciliation

Last updated: 2026-03-21
Scope: product-linked Edge Functions for `saberparatodos`

## Canonical Rule

The canonical local source of truth for active product functions is:

- `saberparatodos/supabase/functions/`

The root-level tree:

- `../supabase/functions/`

is legacy and must not be treated as the default deploy source.

## Linked Project

- project ref: `tzmrgvtptdtsjcugwqyq`

## Current Audit Snapshot

Run:

```powershell
pwsh -File ../scripts/audit-supabase-functions.ps1
```

Current known result:

- `remote_only`
  - `complete-onboarding`
  - `process-chat-message`
  - `register-student`
- `product_only`
  - `analyze-party-results`
- `duplicate_local_ownership`
  - `generate-key`
  - `get-questions`

## Function Groups

### Remote and canonical product tree

- `ai-tutor`
- `api-gateway`
- `create-group`
- `generate-key`
- `get-colleges`
- `get-organization-students`
- `get-questions`
- `submit-exam`
- `submit-leaderboard-score`
- `telegram-bot`

### Remote and legacy root tree

- `generate-analysis`
- `generate-infographic`
- `generate-key`
- `get-questions`
- `get-questions-bulk`
- `refill-credits`
- `spend-credits`
- `start-training-session`

### Remote only

- `complete-onboarding`
- `process-chat-message`
- `register-student`

### Product only

- `analyze-party-results`

## Required Decisions

### Duplicate local ownership

These functions exist in both local trees and need a single owner:

1. `generate-key`
2. `get-questions`

Expected outcome:

- keep one canonical implementation under `saberparatodos/supabase/functions/`
- mark or remove duplicate legacy implementation after verification

### Remote-only functions

These must be classified:

1. `complete-onboarding`
2. `process-chat-message`
3. `register-student`

For each one decide exactly one:

- restore source into canonical tree
- intentionally retire from remote
- move to another package and document that move

### Product-only function

`analyze-party-results` must be classified:

- deploy to linked project
- mark experimental/non-production
- remove dead runtime usage

## Safe Next Steps

1. Diff the duplicate implementations for `generate-key` and `get-questions`
2. Choose the canonical version of each
3. Check whether `analyze-party-results` is meant to back the live exam-room flow
4. Recover or retire the three remote-only functions
5. Re-run the audit script and update this file
