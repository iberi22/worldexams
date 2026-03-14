---
name: gitcore-monorepo-governance
description: Use when tasks involve monorepo structure, GitCore governance, repo authority files, agent instructions, or protocol-aligned docs in WorldExams.
---

# GitCore Monorepo Governance

Use this skill when the task is about:

- monorepo layout or package boundaries
- `.gitcore/*` files
- `AGENTS.md` or `.github/copilot-instructions.md`
- documentation authority cleanup
- GitCore-style process adoption
- protocol-aligned docs in `docs/agent-docs/`

## Required reading order

1. `README.md`
2. `AGENTS.md`
3. `.gitcore/ARCHITECTURE.md`
4. `.gitcore/AGENT_INDEX.md`
5. `docs/monorepo/REPO_AUTHORITY_MATRIX.md`

## Workflow

1. Identify whether the task is governance, package-local, or documentation-only.
2. Keep root governance changes separate from product behavior changes.
3. Prefer updating canonical files over adding new authority files.
4. For durable AI-facing docs, write only inside `docs/agent-docs/` using:
   - GitCore-style prefixes such as `SPEC_` or `RESEARCH_`
   - YAML frontmatter
5. For new work planning, prefer GitHub Issues over ad hoc tracking docs.
6. Treat the repository as private/prelaunch unless the user explicitly changes that status.

## Hard rules

- Do not create duplicate repo-governance files outside `.gitcore/`, `AGENTS.md`, or `docs/monorepo/`.
- Do not let package-local `AGENTS.md` override root governance.
- Do not treat historical planning docs as the architecture source of truth.
- Keep commits atomic: governance/protocol changes should not be mixed with unrelated product edits.
- Do not operate external/public repositories from this workspace unless the user explicitly requests it.
