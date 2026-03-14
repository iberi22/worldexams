---
title: "GitCore Monorepo Governance Specification"
type: SPEC
id: "spec-gitcore-monorepo-governance"
created: 2026-03-10
updated: 2026-03-10
agent: codex
model: gpt-5
requested_by: user
summary: |
  Defines how WorldExams applies GitCore to govern the monorepo migration,
  package boundaries, agent files, and documentation authority.
keywords: [gitcore, governance, monorepo, agents]
tags: ["#spec", "#gitcore", "#monorepo"]
project: worldexams
status: active
---

# GitCore Monorepo Governance

## Objective

Apply GitCore as the project-management protocol for `worldexams` without breaking the current migration state, existing package boundaries, or necessary documentation.

## Scope

This spec governs:

- root authority files
- `.gitcore/*`
- `docs/monorepo/*`
- `docs/agent-docs/*`
- package-local agent files
- new work intake and task management

## Core Rules

### 1. Source of Truth

For repository governance, the reading order is:

1. `README.md`
2. `AGENTS.md`
3. `.gitcore/ARCHITECTURE.md`
4. `.gitcore/AGENT_INDEX.md`
5. `docs/monorepo/REPO_AUTHORITY_MATRIX.md`

### 2. Issue-First for New Work

For new engineering work:

- create or use a GitHub Issue
- avoid ad hoc progress trackers
- keep one branch per task
- keep commits atomic

### 2.1 Private Prelaunch Rule

Until the user explicitly changes release status:

- treat this repository as private/prelaunch
- do not assume public repo synchronization is active
- do not update external/public repos as part of normal workflow

### 3. Allowed Persistent Docs

This repository may create persistent AI-facing docs only in:

- `docs/agent-docs/specs/`
- `docs/agent-docs/research/`
- `docs/agent-docs/prompts/` if later needed explicitly

These docs must use:

- GitCore-style prefixes
- YAML frontmatter
- durable value beyond one chat session

### 4. Agent File Hierarchy

- Root `AGENTS.md` defines repo-wide behavior.
- Package-local `AGENTS.md` files must be deltas only.
- `.github/copilot-instructions.md` must align with root governance and `.gitcore/*`.

### 5. Monorepo Boundary Policy

Until the physical migration is executed:

- `saberparatodos/` remains the main product package
- `worldexams-api/` remains the Worker package
- `social-orchestrator/` remains the service package
- root runtime material remains transitional and must not be treated as the long-term product root

## Operating Rules for Agents

### Before Substantial Work

- read the root authority files
- identify the package boundary
- verify whether the task should become or update an issue

### Before High-Risk Work

Require explicit human confirmation for:

- production deploys
- auth model changes
- destructive migrations
- secret rotation

### During Documentation Work

- prefer updating canonical docs over creating duplicates
- use `docs/agent-docs/` only for protocol-aligned durable docs
- avoid introducing another planning authority outside `.gitcore/` or `docs/monorepo/`

## Acceptance Criteria

- agents can identify the repo authority chain quickly
- new work defaults to issue-first management
- package-local agent files no longer compete with root governance
- GitCore is applied as operating protocol, not as a blind delete-all-docs policy
- agents do not assume public-release behavior by default
