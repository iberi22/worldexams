---
title: "[JULES] Uruguay - lengua 11 - W01-W10 (10 bundles)"
labels: ["jules", "generate-questions", "ai-agent", "stage:planning"]
---

## Reglas criticas para Jules

- Maximo 15 bundles; este lote tiene **10**.
- No regenerar existentes salvo `REPLACE`.
- Solo archivos `.md` en `questions_data/uruguay/lengua/grado-11/2026/weekly/`.
- Validar: `npm run validate -- {archivos}`.
- Comentar: `[OK] Generados N bundles: ...`.

## Skills y protocolo (obligatorio)

1. `AGENTS.md` (v5.2)
2. `skills/worldexams-bundle-generator/SKILL.md`
3. `skills/bundle-creator/SKILL.md`
4. `skills/bundle-creator/rules/UY.md`
5. `docs/specs/curriculums/uruguay/README.md` (si existe)
6. `docs/HERMES_JULES_WORKFLOW.md`
7. `docs/specs/ACTIVE_PROTOCOLS.md`

## Configuracion

| Campo | Valor |
|-------|-------|
| Pais | Uruguay |
| Codigo | UY |
| Asignatura | lengua |
| Subject code | LEN |
| Grado | 11 |
| Ano | 2026 |
| Protocolo | v5.2 |
| Preguntas/bundle | 20 |
| Ruta | `questions_data/uruguay/lengua/grado-11/2026/weekly/` |

## Bundles a generar

| # | Week | Tema | Archivo |
|---|------|------|---------|
| 1 | W01 | tema-w01 | `UY-LEN-11-2026-W01-tema-w01-001-MASTERY-bundle.md` |
| 2 | W02 | tema-w02 | `UY-LEN-11-2026-W02-tema-w02-001-MASTERY-bundle.md` |
| 3 | W03 | tema-w03 | `UY-LEN-11-2026-W03-tema-w03-001-MASTERY-bundle.md` |
| 4 | W04 | tema-w04 | `UY-LEN-11-2026-W04-tema-w04-001-MASTERY-bundle.md` |
| 5 | W05 | tema-w05 | `UY-LEN-11-2026-W05-tema-w05-001-MASTERY-bundle.md` |
| 6 | W06 | tema-w06 | `UY-LEN-11-2026-W06-tema-w06-001-MASTERY-bundle.md` |
| 7 | W07 | tema-w07 | `UY-LEN-11-2026-W07-tema-w07-001-MASTERY-bundle.md` |
| 8 | W08 | tema-w08 | `UY-LEN-11-2026-W08-tema-w08-001-MASTERY-bundle.md` |
| 9 | W09 | tema-w09 | `UY-LEN-11-2026-W09-tema-w09-001-MASTERY-bundle.md` |
| 10 | W10 | tema-w10 | `UY-LEN-11-2026-W10-tema-w10-001-MASTERY-bundle.md` |

## Ownership path (anti-conflicto)

Jules solo toca archivos listados bajo `questions_data/uruguay/lengua/grado-11/2026/weekly/`. No mezclar otros paises/materias/grados.

<agent-state>
  <intent>Generate UY lengua G11 W01-W10</intent>
  <step>planning</step>
  <plan>
    - [pending] Read skills + country rule
    - [pending] Generate 10 weekly MASTERY bundles
    - [pending] npm run validate
    - [pending] Comment [OK] and open PR
  </plan>
</agent-state>
