# Active Protocols

Last updated: 2026-07-28

## Purpose

This file defines which product and operational protocols are active by default.
If another protocol document conflicts with this file, **root `AGENTS.md` wins**.

## Active Defaults

| Area | Default authority | Notes |
|---|---|---|
| Question generation | **`AGENTS.md` + protocol v5.2** | Weekly MASTERY bundles; validator: `npm run validate` → `scripts/validate-bundles-v52.mjs` |
| Jules entry skills | `skills/worldexams-bundle-generator/SKILL.md` + `skills/bundle-creator/SKILL.md` | Always read `skills/bundle-creator/rules/{CODE}.md` |
| Hermes × Jules ops | `docs/HERMES_JULES_WORKFLOW.md` | Atomic issues, anti-overlap waves |
| Issue template | `.github/ISSUE_TEMPLATE/jules-bundle-generation.md` | Max 15 bundles/issue |
| Country readiness KPI | `scripts/audit-country-readiness.mjs` | 2000 published validated questions/country |
| Question review | `skills/worldexams-question-reviewer/SKILL.md` | 2+ errors → regenerate |
| Country onboarding | `docs/specs/REPLICACION.md` | Config/content first; no app forks |
| Product deploy | `saberparatodos/PROTOCOLO_DEPLOY_CLI.md` | Manual CLI deploy |
| Repo governance | `README.md`, `AGENTS.md`, `.gitcore/ARCHITECTURE.md` | Root layer wins |
| PREU (Colombia) | `docs/specs/PREU_UNAL_BLUEPRINT.md`, `docs/specs/PREU_UDEA_BLUEPRINT.md` | Institutional mocks; still use v5.2 frontmatter when published as weekly |

## Historical / Non-default (do not use for new LATAM generation)

| File | Role | Rule |
|---|---|---|
| `PROTOCOL_v7.md` | Aspirational / historical | **Not default.** Do not instruct Jules to use v7 validator for new work. |
| `scripts/validate-bundles-v7.mjs` | Historical validator | Prefer `validate-bundles-v52.mjs` |
| `scripts/generate-jules-issues.mjs` | Regen helper that cites v7 | Prefer `scripts/generate-jules-issue-matrix.mjs` + Hermes Planner |
| `skills/colombia-assessment-protocol-v6/SKILL.md` | Colombia-only legacy overlay | Use only when explicitly maintaining v6 Colombia batches |
| `docs/QUESTION_GENERATION_PROTOCOL_V5.md` | Grade-11 periodo-era docs | Superseded by AGENTS weekly path for new work |
| `docs/QUESTION_GENERATION_PROTOCOL_V2.md` … `V4.md` | Migration references | Do not use for new generation |
| `docs/MODERN_QUESTIONS_PROTOCOL.md` | Style overlay | Only if explicitly requested |

## Canonical path (all new weekly bundles)

```text
questions_data/{country}/{subject}/grado-{N}/2026/weekly/
  {CODE}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

Brasil EM exception: `questions_data/brasil/matematica/3o-ano/2026/weekly/` with grade token `3EM`.

## Monorepo Rule

Protocols must support shared app logic/UI; country variation via config, content, branding, localization, and SEO only.
