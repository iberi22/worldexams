---
title: "Research: Local GitCore Adaptation for WorldExams"
type: RESEARCH
id: "research-gitcore-local-adaptation"
created: 2026-03-10
updated: 2026-03-10
agent: codex
model: gpt-5
requested_by: user
summary: |
  Analysis of the local GitCore repository and which parts should be adopted,
  adapted, or avoided in WorldExams during the monorepo migration.
keywords: [research, gitcore, adaptation, monorepo]
tags: ["#research", "#gitcore", "#worldexams"]
project: worldexams
status: active
confidence: high
sources:
  - path: "E:/scripts-python/GitCore/AGENTS.md"
  - path: "E:/scripts-python/GitCore/.gitcore/ARCHITECTURE.md"
  - path: "E:/scripts-python/GitCore/docs/templates/plan.md"
  - path: "E:/scripts-python/GitCore/docs/templates/spec.md"
  - path: "E:/scripts-python/GitCore/scripts/generate-workspace-agent.ps1"
---

# Research Summary

## What GitCore Already Solves Well

The local `GitCore` repo provides strong patterns for:

- architecture-first repo governance
- issue-first workflow
- atomic commit discipline
- agent routing via `.gitcore/AGENT_INDEX.md`
- durable AI docs with frontmatter and naming conventions
- workspace-aware automation concepts such as `generate-workspace-agent.ps1`

## What Should Be Adopted in WorldExams

### Adopt directly

- `.gitcore/ARCHITECTURE.md` as architecture authority
- `.gitcore/AGENT_INDEX.md` for routing
- issue-first workflow for new work
- `docs/agent-docs/` naming/frontmatter conventions
- atomic commit rule

### Adopt with adaptation

- GitCore prefers very few markdown files, but WorldExams already has important migration docs.
- WorldExams should keep `docs/monorepo/*` during migration because those documents are still operationally necessary.
- Historical planning docs should be demoted, not deleted blindly.
- GitCore examples that assume public OSS workflows must be adapted because WorldExams remains private/prelaunch today.

### Defer for later

- full `gc-cli` operational integration
- automatic workspace-hub generation
- protocol automation scripts copied from GitCore
- full issue-sync workflow mirroring GitCore

## Gaps Found in WorldExams

- no `docs/agent-docs/` folder existed before this adaptation
- no `.gitcore/` authority layer existed before this adaptation
- existing Copilot rules were tied to legacy planning files instead of an architecture authority
- repo skills were not connected to monorepo governance or GitCore operations

## Recommended Next Improvements

1. Add issue templates aligned to monorepo work types.
2. Decide whether to vendor selected GitCore scripts or call them from the external repo.
3. Add a workspace-level skill for GitCore monorepo operations.
4. When the physical move starts, update `.gitcore/ARCHITECTURE.md` and `docs/monorepo/REPO_MAP.md` in the same commit.
