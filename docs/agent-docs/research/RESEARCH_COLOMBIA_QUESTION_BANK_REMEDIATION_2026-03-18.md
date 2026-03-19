---
title: "Colombia Question Bank Remediation Status"
type: RESEARCH
id: "research-colombia-question-bank-remediation-2026-03-18"
created: 2026-03-18
updated: 2026-03-18
agent: codex
model: gpt-5
requested_by: user
summary: |
  Records the current remediation status for Colombia question-generation and
  audit tooling, including the hardened manual skill, quality-audit extension,
  Grade 11 MASTERY triage, quarantine runtime enforcement, and the remaining
  work needed for bundle rewrite and extension to other grades.
keywords: [colombia, questions, remediation, mastery, audit, handoff]
tags: ["#research", "#questions", "#colombia", "#handoff"]
project: worldexams
status: active
---

# Colombia Question Bank Remediation Status

## Purpose

This document exists so another agent can continue the Colombia question-bank cleanup without depending on chat history.

## Progress Estimate

Estimated implementation progress for the broader remediation task: `60%`.

Interpretation:

- completed: skill hardening, audit hardening, Grade 11 `MASTERY` triage, backlog documentation;
- not completed: full rewrite of quarantined bundles, targeted fixes, extension of the same process to grades `3` to `10`.

## Completed Work

### 1. Manual skill hardened

File:

- `skills/create_bundles_manually/SKILL.md`

Status: `done`

What changed:

- converted into a robust `colombia-assessment-protocol-v6`;
- supports both creation and review/audit workflows;
- expanded scope to grades `3` to `11`;
- enforces MEN + ICFES alignment before drafting;
- added hard rejection rules for:
  - word salad
  - pseudo-technical language
  - absurd distractors
  - decorative or inappropriate context
  - ambiguous answer keys
- added bundle-regeneration policy when contamination is systemic.

### 2. Question-quality auditor hardened

File:

- `saberparatodos/scripts/audit_question_quality.js`

Status: `done`

What changed:

- added explicit flags for:
  - `technobabble-statement`
  - `technobabble-option`
  - `inflated-feedback`
  - `inappropriate-context`
  - `context-noise`
  - `lexical-contamination`
- parsing now reads context and explanation content more explicitly;
- option parsing now separates visible option text from HTML feedback comments.

Note:

- the script is improved, but it still scans broader Grade 11 scope unless called with narrower file-level tooling.
- for future work on other grades, consider adding a `--path-glob` or `--include-pattern` flag to avoid mixing `MASTERY`, `PRO`, `CEFR`, and legacy families in one report.

### 3. Grade 11 Colombia `MASTERY` triage completed

Report file:

- `reports/question-audit/2026-03-18-mastery-remediation-plan.md`

Status: `done`

Current numbers:

- total reviewed: `49`
- replace whole bundle: `15` originally identified, `5` already completed, `10` still pending
- targeted fixes: `7`
- keep as clean base: `27`

### 4. Replacement bundles completed

Files:

- `questions_data/colombia/matematicas/grado-11/periodo-2/derivadas/CO-MAT-11-P2-derivadas-001-MASTERY-bundle.md`
- `questions_data/colombia/matematicas/grado-11/periodo-2/aplicaciones-derivada/CO-MAT-11-P2-aplicaciones-001-MASTERY-bundle.md`
- `questions_data/colombia/matematicas/grado-11/periodo-2/estadistica-y-probabilidad/CO-MAT-11-P2-estadistica-probabilidad-001-MASTERY-bundle.md`
- `questions_data/colombia/matematicas/grado-11/periodo-2/probabilidad/CO-MAT-11-P2-probabilidad-001-MASTERY-bundle.md`
- `questions_data/colombia/matematicas/grado-11/periodo-3/calculo-derivadas/CO-MAT-11-P3-calculo-derivadas-001-MASTERY-bundle.md`

Status: `done`

What changed:

- full rewrite from contaminated content to clean content;
- regenerated IDs where needed to eliminate naming collisions and align bundle identity with the rewritten topic;
- normalized frontmatter to the active baseline;
- verified locally for:
  - `20` questions
  - `4` options per question
  - `1` correct option per question
- repeated the same full rewrite and local structural verification for the additional statistics, probability and calculus bundles.

### 5. Quarantine enforcement implemented in runtime

Files:

- `saberparatodos/scripts/sync_quarantine_manifest.cjs`
- `saberparatodos/src/generated/quarantine-manifest.ts`
- `saberparatodos/src/lib/questions/quarantine-registry.ts`
- `saberparatodos/src/lib/questions/grade11-local-bank.ts`
- `saberparatodos/src/lib/api-service.ts`
- `saberparatodos/src/pages/api/questions.ts`
- `saberparatodos/src/utils/questionParser.ts`
- `saberparatodos/src/utils/universalQuestions.ts`

Status: `done`

What changed:

- quarantine is now a runtime rule, not just an audit annotation;
- bundles flagged by the current audit snapshot are marked directly in frontmatter;
- runtime selection excludes quarantined bundle IDs and question IDs for all grades;
- local Grade 11 bank, shared parser flow, universal-question flow and API aggregation now respect quarantine;
- the generated manifest currently indexes `168` quarantined bundles and `2354` quarantined question IDs.

Operational rule:

- after any audit run that updates `reports/question-audit/latest-summary.csv`, re-run:
  - `node saberparatodos/scripts/sync_quarantine_manifest.cjs`

### 6. Astro/Svelte workspace issue diagnosed and repaired

Status: `done`

Problem:

- `astro check` / `npm run lint` in `saberparatodos` was failing with `Cannot find module 'svelte/compiler'`;
- `saberparatodos/node_modules/svelte` existed, but the monorepo root `node_modules/svelte` was missing;
- Astro language-server resolution was traversing through the workspace root and failing there.

Resolution:

- ran `npm install --include-workspace-root` at repo root;
- this restored root-level `svelte` installation and fixed compiler resolution;
- `npm run lint` in `saberparatodos` now passes without errors.

## Grade 11 Execution Backlog

### Replace whole bundle

These should be treated as full regeneration targets:

- `ciencias-naturales / periodo-1 / fisicoquimica-genetica` (`001`)
- `ciencias-naturales / periodo-2 / termodinamica`
- `ciencias-naturales / periodo-2 / trabajo-energia`
- `ciencias-naturales / periodo-3 / ondas-y-sonido`
- `lectura-critica / periodo-1 / ensayo-filosofico` (`001`)
- `lectura-critica / periodo-2 / textos-literarios`
- `lectura-critica / periodo-3 / medios-grafica`
- `sociales-ciudadanas / periodo-1 / geopolitica-contemporanea`
- `sociales-ciudadanas / periodo-2 / economia-desarrollo`
- `sociales-ciudadanas / periodo-3 / constitucion-democracia`

### Targeted fixes

These appear salvageable with localized edits:

- `matematicas / periodo-1 / funciones-economia`
- `matematicas / periodo-2 / estadistica-inferencial`
- `matematicas / periodo-4 / integrales-probabilidad`
- `ciencias-naturales / periodo-1 / fisicoquimica-genetica` (`002`)
- `ciencias-naturales / periodo-4 / quimica-organica`
- `lectura-critica / periodo-4 / filosofia-etica`
- `sociales-ciudadanas / periodo-4 / globalizacion-desarrollo`

## Coverage Gaps That Will Need New Clean Generation

After replacement, these themes still need clean regenerated coverage and should be treated as active generation priorities:

- `matematicas / periodo-2 / estadistica-y-probabilidad`
- `matematicas / periodo-2 / probabilidad`
- `matematicas / periodo-3 / calculo-derivadas`
- `ciencias-naturales / periodo-2 / termodinamica`
- `ciencias-naturales / periodo-2 / trabajo-energia`
- `ciencias-naturales / periodo-3 / ondas-y-sonido`
- `sociales-ciudadanas / periodo-2 / economia-desarrollo`
- `sociales-ciudadanas / periodo-3 / constitucion-democracia`
- `lectura-critica / periodo-2 / textos-literarios`
- `lectura-critica / periodo-3 / medios-grafica`

## Remaining Work

### For Grade 11

1. Rewrite remaining `replace whole bundle` items.
2. Repair all `targeted fixes`.
3. Re-run:
   - `node saberparatodos/scripts/validate_content.js --scope=colombia --grade=11`
   - `node saberparatodos/scripts/audit_question_quality.js --scope=colombia --grade-min=11 --grade-max=11`
4. Produce an updated remediation report after rewrites.
5. Keep the quarantine manifest synchronized whenever the audit snapshot changes.

### For Grades 3 to 10

Recommended continuation path:

1. Reuse the same `v6` skill and audit heuristics.
2. Scan one grade at a time, not all grades at once.
3. Start with subjects that already showed contamination patterns in Grade 11:
   - matemáticas
   - sociales-ciudadanas
   - lectura-critica
   - ciencias-naturales
4. For each grade:
   - inventory bundles
   - classify `replace / targeted fix / keep`
   - note coverage gaps by period/topic
   - regenerate only after triage is stable
5. Keep durable handoff docs in `docs/agent-docs/` and operational reports in `reports/question-audit/`.

## Suggested Next Agent Actions

If another agent resumes this work, the safest next sequence is:

1. open `skills/create_bundles_manually/SKILL.md`
2. open `reports/question-audit/2026-03-18-mastery-remediation-plan.md`
3. rewrite the next highest-risk science bundles:
- `CO-CIE-11-P1-fisicoquimica-001-MASTERY-bundle.md`
- `CO-CN-11-P2-termodinamica-001-MASTERY-bundle.md`
- `CO-CN-11-P2-trabajo-001-MASTERY-bundle.md`
- `CO-CN-11-P3-ondas-001-MASTERY-bundle.md`
4. re-run validators
5. then expand the same workflow to lower grades

## Important Constraints

- Do not downgrade the local skill version label from `v6`.
- The repo still treats `v5.1` as the bundle-structure baseline where active.
- Persistent documentation for agents should remain under `docs/agent-docs/`.
- Operational audit outputs should remain under `reports/question-audit/`.
