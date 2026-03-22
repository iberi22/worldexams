# Root Supabase Tree

Status: legacy / shared / migration-era context.

## Rule

Do not treat this folder as the canonical production source of truth for the active `saberparatodos` product.

For active product-linked Edge Function work, use:

- `../saberparatodos/supabase/functions/`

## What This Folder Is For

- historical root-level Supabase assets
- migration-era function source
- shared or legacy SQL/material that has not yet been fully consolidated

## What This Folder Is Not For

- default production deploy source for `saberparatodos`
- default source for remote Edge Function parity claims
- default place to add new product functions

## Required Verification

If a task touches this folder and claims anything about production state, verify against:

- `../saberparatodos/supabase/.temp/project-ref`
- `pwsh -File ../scripts/audit-supabase-functions.ps1`
- `../docs/agent-docs/specs/SPEC_SUPABASE_EDGE_FUNCTIONS_SOURCE_OF_TRUTH.md`

