---
title: "WorldExams Agent Docs"
type: INDEX
id: "index-worldexams-agent-docs"
created: 2026-03-10
updated: 2026-03-10
agent: codex
model: gpt-5
requested_by: user
summary: |
  Index for protocol-aligned AI documents used to operate the WorldExams
  monorepo under the adapted GitCore workflow.
keywords: [agent-docs, gitcore, monorepo, protocol]
tags: ["#agent-docs", "#gitcore", "#monorepo"]
project: worldexams
status: active
---

# Agent Docs

This folder stores persistent AI-facing documents that are explicitly useful for operating this repository.
It follows the GitCore naming and frontmatter conventions, adapted to the current WorldExams migration state.

## Layout

- `specs/`
  - durable technical specifications and operating rules
- `research/`
  - source-backed analysis and adoption notes

## Current Documents

- `specs/SPEC_GITCORE_MONOREPO_GOVERNANCE.md`
- `research/RESEARCH_GITCORE_LOCAL_ADAPTATION.md`

## Local Rule

This repo uses GitHub Issues as the default state system for new work, but it still allows protocol-aligned persistent docs in `docs/agent-docs/` when the user explicitly asks for documentation or when durable agent guidance is required.
