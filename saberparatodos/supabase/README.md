# SaberParaTodos Supabase Tree

Status: canonical product-linked Supabase source of truth.

## Rule

This folder is the default local source of truth for active Supabase work related to `saberparatodos`.

Canonical Edge Function tree:

- `functions/`

Canonical migrations tree:

- `migrations/`

## Linked Project

Current linked project ref is stored in:

- `.temp/project-ref`

Current known ref:

- `tzmrgvtptdtsjcugwqyq`

## Operational Expectations

- Use this tree for production-oriented Edge Function audits.
- Use this tree for function deploy preparation.
- Verify local/remote parity with:
  - `pwsh -File ../scripts/audit-supabase-functions.ps1`
- Use `FUNCTIONS_RECONCILIATION.md` as the active reconciliation checklist for drift cleanup.

## Caution

The repository still contains a root-level legacy tree at:

- `../supabase/`

Do not assume both trees are synchronized.
