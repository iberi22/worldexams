# Hermes × Jules — WorldExams content workflow

> Integrated from SWAL assembly line (`docs/SWAL/ASSEMBLY_LINE.md`) + WorldExams `AGENTS.md` + `.github/ISSUE_TEMPLATE/jules-bundle-generation.md`.
> Authority for new bundles: **protocol v5.2** only (`npm run validate`).

## Roles

| Role | Runtime | WorldExams action |
|------|---------|-------------------|
| Planner | Hermes | Create atomic Jules issues from curriculum maps; write `<agent-state>` |
| Router | Hermes | Labels `ai-agent` + `stage:coding` + `jules`; zero path overlap in wave |
| Implementer | Jules | Generate `.md` bundles only; validate; comment `[OK] Generados N bundles` |
| Reviewer | OpenClaw | PR review (content PRs ≠ code PRs) |
| Guardian | Hermes | Merge if feature-verify / validate OK |
| Evaluator | OpenClaw | `npm run audit:country-readiness` smoke |

## Issue rules (anti-conflict)

1. **One issue = one country + one subject + one grade + week range ≤15 bundles.**
2. Title: `[JULES] {PAIS} - {ASIGNATURA} {GRADO} - W{NN}-W{NN} ({N} bundles)`
3. Labels: `jules`, `generate-questions`, `ai-agent`, `stage:planning` → `stage:coding`
4. Must link: `AGENTS.md`, `skills/worldexams-bundle-generator/SKILL.md`, `skills/bundle-creator/SKILL.md`, `skills/bundle-creator/rules/{CODE}.md`, curriculum map
5. Path ownership: Jules only touches listed files under `questions_data/{pais}/{asignatura}/grado-{N}/2026/weekly/`
6. No regenerate unless issue says `REPLACE`
7. Hermes waves: **14–15 issues/batch**, **zero overlapping paths**
8. State lives in the issue (`<agent-state>`), not Hermes chat

## Wave order

1. Foundation (rules/README/schedules) — Hermes/Cursor, not Jules
2. G11 core subjects per country
3. Mid grades
4. Primary grades
5. Static packs + readiness audit (integrator, not Jules)

## Script

Generate issue markdown locally:

```bash
node scripts/generate-jules-issue-matrix.mjs --country PE --grade 11 --subject matematicas --from 1 --to 10
```

Create on GitHub only after Planner review:

```bash
gh issue create --title "..." --body-file /tmp/jules-issue.md --label jules --label generate-questions --label ai-agent
```
