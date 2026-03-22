---
title: "Supabase Edge Functions Source Of Truth"
type: SPEC
id: "spec-supabase-edge-functions-source-of-truth"
created: 2026-03-21
updated: 2026-03-21
agent: codex
model: gpt-5
requested_by: user
summary: |
  Defines the canonical local source of truth for Supabase Edge Functions,
  the status of legacy function trees, and the minimum audit workflow required
  before deploy or refactor work.
keywords: [supabase, edge-functions, source-of-truth, audit, saberparatodos]
tags: ["#supabase", "#edge-functions", "#operations"]
project: worldexams
status: active
---

# Supabase Edge Functions Source Of Truth

## Canonical Local Tree

For active product work, the canonical local source of truth is:

- `saberparatodos/supabase/functions/`

This tree owns the product-linked Supabase project currently referenced by:

- `saberparatodos/supabase/.temp/project-ref`

Current linked project ref:

- `tzmrgvtptdtsjcugwqyq`

## Legacy Tree

The root-level tree:

- `supabase/functions/`

must be treated as legacy or migration-era material unless a task explicitly states otherwise.

Agents must not assume that changes in `supabase/functions/` affect the linked product project.
Agents must not deploy from the root tree by default.

## Hard Rules

- Use `saberparatodos/supabase/functions/` as the default source for audits, refactors, and production deploy preparation.
- Treat `supabase/functions/` as historical unless the task is specifically about legacy recovery or migration reconciliation.
- Before claiming local and remote Supabase functions are aligned, run the audit script:
  - `pwsh -File scripts/audit-supabase-functions.ps1`
- Do not silently delete a remote-only function until its source-of-truth decision is documented.
- Do not silently deploy a local-only function to production unless the feature owner intends that rollout.

## Current Drift State

Known remote-only functions:

- `process-chat-message`
- `register-student`
- `complete-onboarding`

Known local-only function in the product tree:

- `analyze-party-results`

Known shared overlap between remote and the product tree:

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

Known shared overlap between remote and the root legacy tree:

- `generate-analysis`
- `generate-infographic`
- `generate-key`
- `get-questions`
- `get-questions-bulk`
- `refill-credits`
- `spend-credits`
- `start-training-session`

## Operational Standard

Before any serious Edge Function work, operators should answer:

1. Is this function supposed to live in the canonical product tree?
2. Is it already active in the linked remote project?
3. If remote-only, where is the missing local source?
4. If local-only, is that intentional or drift?

## Audit Standard

The minimum acceptable audit checks are:

1. `supabase projects list`
2. `supabase functions list --output json`
3. `supabase secrets list`
4. `pwsh -File scripts/audit-supabase-functions.ps1`

## Cleanup Goal

The desired steady state is:

- one canonical local Edge Function tree
- zero undocumented remote-only functions
- zero undocumented local-only functions in the canonical tree
- zero duplicated ownership across local trees for production functions

