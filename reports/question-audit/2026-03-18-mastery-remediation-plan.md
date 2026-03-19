# Colombia G11 MASTERY Remediation Plan

Date: `2026-03-18`
Scope: `questions_data/colombia/**/grado-11/**/*MASTERY-bundle.md`

## Summary

- Total bundles reviewed: `49`
- Replace whole bundle: `6` pending + `9` completed
- Targeted fixes: `7`
- Keep for now: `27`

This report focuses on style contamination, inappropriate context, and incomplete coverage in the active Colombia Grade 11 `MASTERY` bank. It is a remediation backlog, not a final psychometric certification.

## Priority 0: Replace Immediately

These bundles show systemic contamination or are too incomplete to salvage safely.

### Mathematics

### Ciencias Naturales

### Lectura Crítica

- `questions_data/colombia/lectura-critica/grado-11/periodo-1/ensayo-filosofico/CO-LEC-11-P1-ensayo-001-MASTERY-bundle.md`
- `questions_data/colombia/lectura-critica/grado-11/periodo-2/textos-literarios/CO-LEC-11-P2-literario-001-MASTERY-bundle.md`
- `questions_data/colombia/lectura-critica/grado-11/periodo-3/medios-grafica/CO-LEC-11-P3-medios-001-MASTERY-bundle.md`

### Sociales y Ciudadanas

- `questions_data/colombia/sociales-ciudadanas/grado-11/periodo-1/geopolitica-contemporanea/CO-SOC-11-P1-geopolitica-001-MASTERY-bundle.md`
- `questions_data/colombia/sociales-ciudadanas/grado-11/periodo-2/economia-desarrollo/CO-SOC-11-P2-economia-001-MASTERY-bundle.md`
- `questions_data/colombia/sociales-ciudadanas/grado-11/periodo-3/constitucion-democracia/CO-SOC-11-P3-constitucion-001-MASTERY-bundle.md`

## Priority 1: Targeted Fixes

These bundles appear mostly usable but contain one or a few defective questions.

- `questions_data/colombia/matematicas/grado-11/periodo-1/funciones-economia/CO-MAT-11-P1-funciones-001-MASTERY-bundle.md`
- `questions_data/colombia/matematicas/grado-11/periodo-2/estadistica-inferencial/CO-MAT-11-P2-estadistica-001-MASTERY-bundle.md`
- `questions_data/colombia/matematicas/grado-11/periodo-4/integrales-probabilidad/CO-MAT-11-P4-integrales-001-MASTERY-bundle.md`
- `questions_data/colombia/ciencias-naturales/grado-11/periodo-1/fisicoquimica-genetica/CO-CIE-11-P1-fisicoquimica-002-MASTERY-bundle.md`
- `questions_data/colombia/ciencias-naturales/grado-11/periodo-4/quimica-organica/CO-CN-11-P4-carbono-001-MASTERY-bundle.md`
- `questions_data/colombia/lectura-critica/grado-11/periodo-4/filosofia-etica/CO-LEC-11-P4-filosofia-001-MASTERY-bundle.md`
- `questions_data/colombia/sociales-ciudadanas/grado-11/periodo-4/globalizacion-desarrollo/CO-SOC-11-P4-global-001-MASTERY-bundle.md`

## Completed In This Execution Batch

- `questions_data/colombia/matematicas/grado-11/periodo-2/derivadas/CO-MAT-11-P2-derivadas-001-MASTERY-bundle.md`
- `questions_data/colombia/matematicas/grado-11/periodo-2/aplicaciones-derivada/CO-MAT-11-P2-aplicaciones-001-MASTERY-bundle.md`
- `questions_data/colombia/matematicas/grado-11/periodo-2/estadistica-y-probabilidad/CO-MAT-11-P2-estadistica-probabilidad-001-MASTERY-bundle.md`
- `questions_data/colombia/matematicas/grado-11/periodo-2/probabilidad/CO-MAT-11-P2-probabilidad-001-MASTERY-bundle.md`
- `questions_data/colombia/matematicas/grado-11/periodo-3/calculo-derivadas/CO-MAT-11-P3-calculo-derivadas-001-MASTERY-bundle.md`
- `questions_data/colombia/ciencias-naturales/grado-11/periodo-1/fisicoquimica-genetica/CO-CIE-11-P1-fisicoquimica-001-MASTERY-bundle.md`
- `questions_data/colombia/ciencias-naturales/grado-11/periodo-2/termodinamica/CO-CN-11-P2-termodinamica-001-MASTERY-bundle.md`
- `questions_data/colombia/ciencias-naturales/grado-11/periodo-2/trabajo-energia/CO-CN-11-P2-trabajo-001-MASTERY-bundle.md`
- `questions_data/colombia/ciencias-naturales/grado-11/periodo-3/ondas-y-sonido/CO-CN-11-P3-ondas-001-MASTERY-bundle.md`

Notes:

- all nine completed bundles were fully rewritten;
- contamination was removed;
- frontmatter was normalized to the active `v5.1` baseline;
- the four new science rewrites replaced systemic pseudo-tecnicismo, placeholder sections and incomplete tails with full 20-question bundles aligned to the active skill;
- the nine completed files passed local structural verification (`20` preguntas, `4` opciones por pregunta, `1` correcta por pregunta).

## Quarantine Runtime Enforcement

Status: `done`

What changed:

- quarantine is now enforced in runtime selection, not only in audit reports;
- quarantined bundles are now marked directly in frontmatter with:
  - `quarantine: true`
  - `bundle_status: "quarantined"`
- runtime filtering was added to:
  - `saberparatodos/src/lib/questions/grade11-local-bank.ts`
  - `saberparatodos/src/lib/api-service.ts`
  - `saberparatodos/src/pages/api/questions.ts`
  - `saberparatodos/src/utils/questionParser.ts`
  - `saberparatodos/src/utils/universalQuestions.ts`
- sync and registry files were added:
  - `saberparatodos/scripts/sync_quarantine_manifest.cjs`
  - `saberparatodos/src/generated/quarantine-manifest.ts`
  - `saberparatodos/src/lib/questions/quarantine-registry.ts`

Current sync snapshot:

- quarantined bundles synced from audit report: `168`
- quarantined questions indexed for runtime exclusion: `2354`

Operational note:

- current quarantine source of truth is `reports/question-audit/latest-summary.csv`;
- after any new audit refresh, re-run `node saberparatodos/scripts/sync_quarantine_manifest.cjs`.

## Tooling Health

Status: `repaired`

What changed:

- Astro/Svelte validation had been failing with `Cannot find module 'svelte/compiler'`;
- root cause was a broken workspace-root install state: `saberparatodos` resolved `svelte`, but the monorepo root did not have `node_modules/svelte`;
- running `npm install --include-workspace-root` at repo root restored root-level `svelte` resolution;
- after reinstall, `npm run lint` in `saberparatodos` completed without errors.

## Priority 2: Keep As Clean Base

These bundles can serve as reference material or remain active for now.

### Mathematics

- `questions_data/colombia/matematicas/grado-11/periodo-1/continuidad/CO-MAT-11-P1-continuidad-002-MASTERY-bundle.md`
- `questions_data/colombia/matematicas/grado-11/periodo-1/continuidad/CO-MAT-11-P1-continuidad-003-MASTERY-bundle.md`
- `questions_data/colombia/matematicas/grado-11/periodo-1/funciones/CO-MAT-11-P1-funciones-002-MASTERY-bundle.md`
- `questions_data/colombia/matematicas/grado-11/periodo-1/inecuaciones/CO-MAT-11-P1-inecuaciones-002-MASTERY-bundle.md`
- `questions_data/colombia/matematicas/grado-11/periodo-1/limites/CO-MAT-11-P1-limites-002-MASTERY-bundle.md`
- `questions_data/colombia/matematicas/grado-11/periodo-1/limites/CO-MAT-11-P1-limites-003-MASTERY-bundle.md`

### Ciencias Naturales

- `questions_data/colombia/ciencias-naturales/grado-11/periodo-1/fisica-cinematica/CO-CN-11-P1-fisica-cinematica-002-MASTERY-bundle.md`
- `questions_data/colombia/ciencias-naturales/grado-11/periodo-1/fisica-dinamica/CO-CN-11-P1-fisica-dinamica-001-MASTERY-bundle.md`
- `questions_data/colombia/ciencias-naturales/grado-11/periodo-1/quimica-carbono/CO-CN-11-P1-quimica-carbono-001-MASTERY-bundle.md`
- `questions_data/colombia/ciencias-naturales/grado-11/periodo-1/quimica-organica/CO-CN-11-P1-quimica-organica-002-MASTERY-bundle.md`

### Lectura Crítica

- `questions_data/colombia/lectura-critica/grado-11/periodo-1/ensayo-filosofico/CO-LEC-11-P1-ensayo-002-MASTERY-bundle.md`
- `questions_data/colombia/lectura-critica/grado-11/periodo-1/textos-continuos/CO-LC-11-P1-continuos-001-MASTERY-bundle.md`
- `questions_data/colombia/lectura-critica/grado-11/periodo-1/textos-continuos/CO-LC-11-P1-continuos-002-MASTERY-bundle.md`
- `questions_data/colombia/lectura-critica/grado-11/periodo-1/textos-discontinuos/CO-LC-11-P1-discontinuos-001-MASTERY-bundle.md`
- `questions_data/colombia/lectura-critica/grado-11/periodo-1/textos-discontinuos/CO-LC-11-P1-discontinuos-002-MASTERY-bundle.md`

### Sociales y Ciudadanas

- `questions_data/colombia/sociales-ciudadanas/grado-11/periodo-1/multiperspectivismo/CO-SC-11-P1-multi-001-MASTERY-bundle.md`
- `questions_data/colombia/sociales-ciudadanas/grado-11/periodo-1/multiperspectivismo/CO-SC-11-P1-multi-002-MASTERY-bundle.md`
- `questions_data/colombia/sociales-ciudadanas/grado-11/periodo-1/pensamiento-social/CO-SC-11-P1-psoc-001-MASTERY-bundle.md`
- `questions_data/colombia/sociales-ciudadanas/grado-11/periodo-1/pensamiento-social/CO-SC-11-P1-psoc-002-MASTERY-bundle.md`
- `questions_data/colombia/sociales-ciudadanas/grado-11/periodo-1/pensamiento-social/CO-SC-11-P1-psoc-003-MASTERY-bundle.md`

### English

- `questions_data/colombia/ingles/grado-11/periodo-1/global-issues/CO-ING-11-P1-global-issues-001-MASTERY-bundle.md`
- `questions_data/colombia/ingles/grado-11/periodo-1/uso-del-lenguaje/CO-IN-11-P1-gram-001-MASTERY-bundle.md`
- `questions_data/colombia/ingles/grado-11/periodo-1/uso-del-lenguaje/CO-IN-11-P1-gram-002-MASTERY-bundle.md`
- `questions_data/colombia/ingles/grado-11/periodo-1/uso-del-lenguaje/CO-IN-11-P1-gram-003-MASTERY-bundle.md`
- `questions_data/colombia/ingles/grado-11/periodo-2/tech-society/CO-ING-11-P2-tech-001-MASTERY-bundle.md`
- `questions_data/colombia/ingles/grado-11/periodo-3/health-psychology/CO-ING-11-P3-health-001-MASTERY-bundle.md`
- `questions_data/colombia/ingles/grado-11/periodo-4/global-citizens-art/CO-ING-11-P4-citizens-001-MASTERY-bundle.md`

## New Generation Required By Coverage Gap

These topics currently do not have a clean and sufficient base, so they should be treated as new generation priority after quarantine or replacement:

- `matematicas / periodo-2 / derivadas`
- `matematicas / periodo-2 / aplicaciones-derivada`
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

## Execution Order

1. Replace `Priority 0` bundles.
2. Fix `Priority 1` bundles.
3. Re-run validators.
4. Fill topic coverage gaps with new generation where replacement still leaves fewer than the desired clean bundles for that topic.

## Next Priority

The next immediate replacement target should be:

- `questions_data/colombia/lectura-critica/grado-11/periodo-1/ensayo-filosofico/CO-LEC-11-P1-ensayo-001-MASTERY-bundle.md`

Then continue with:

- `questions_data/colombia/lectura-critica/grado-11/periodo-2/textos-literarios/CO-LEC-11-P2-literario-001-MASTERY-bundle.md`
- `questions_data/colombia/lectura-critica/grado-11/periodo-3/medios-grafica/CO-LEC-11-P3-medios-001-MASTERY-bundle.md`
- `questions_data/colombia/sociales-ciudadanas/grado-11/periodo-1/geopolitica-contemporanea/CO-SOC-11-P1-geopolitica-001-MASTERY-bundle.md`
- `questions_data/colombia/sociales-ciudadanas/grado-11/periodo-2/economia-desarrollo/CO-SOC-11-P2-economia-001-MASTERY-bundle.md`
- `questions_data/colombia/sociales-ciudadanas/grado-11/periodo-3/constitucion-democracia/CO-SOC-11-P3-constitucion-001-MASTERY-bundle.md`
