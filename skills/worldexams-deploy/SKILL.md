---
name: worldexams-deploy
description: Protocolo de despliegue WorldExams/SaberParaTodos (skill PROPIO del repo — checklist prod COBRADO en CI, gaps de cobertura Periodo, y smoke con payload real de la UI).
---

# WorldExams Deploy Skill (repo-owned)

Checklist de despliegue del PROYECTO (no del provider global). Complementa `~/.hermes/skills/cloudflare-deploy-protocol/SKILL.md` (genérico de toda la infra Cloudflare), pero este es el que COBRA en los workflows de **este repo** y el que deben leer los agentes Jules asignados a issues de deploy/contenido.

Origen: lecciones 2026-08-29 — periodo 4 filtrando en prod (`10/15`) pese a CI "verde".

## Stack a desplegar

| Pieza | Origen `wrangler.toml` / directorio | Comando canónico CI (`deploy-production.yml`) | Dominio prod |
|-------|--------------------------------------|-----------------------------------------------|--------------|
| Worker API Gateway | `apps/worldexams-api/wrangler.toml` (`[assets] directory = "public"`) | `wrangler deploy` (en `apps/worldexams-api/`) | `api.saberparatodos.space` |
| Worker SSR SaberParaTodos | `saberparatodos/wrangler.toml` → normalizado a `saberparatodos/dist/server/wrangler.json` por `normalize-wrangler-config.mjs` | `wrangler deploy --config dist/server/wrangler.json` | `saberparatodos.space` |
| Packs JSON | artefactos derivados de `questions_data/**` via `generate-static-packs.js` | incorporados en los `public/` de cada worker (assets) | `api.saberparatodos.space/v1/packs/*`, `saberparatodos.space/api/packs/*` |

Fundamental: **los packs NO son fuente de verdad**; la fuente es `.md` en `questions_data/`. Nunca editar packs a mano. Tras todo cambio de bancos, correr `generate-static-packs.js`.

## Gate A — Cobertura de contenido (antes de habilitar un modo en la UI)

> "MODO DE EXAMEN → POR PERIODO → Periodo 4 → 15 preguntas `strictPeriod:true`" no es 200/404: es **cover-count por (país,grado,asignatura,periodo)**. Pide `ceil(W/10) = periodo`.

Estado auditado 2026-08-29 (`CO`):

- `ingles` G3-G11: W01-W40 completos → periodos 1-4 completos.
- `matemáticas/lectura-crítica/ciencias-naturales/sociales` CO G11: **solo W01** (1/10 del periodo 1, periodos 2-4 vacíos). Resto de grados igual (G6/G7/G8 con huecos). El alert `10/15` en prod es exactamente este gap: solo `ingles` aportaba, tope 10 por `pageSize`, periodos 2-4 nada.
- Legado: la purga 2026-07-28 (#876, 5.545 `.md` / 5.601 packs) borró bundles no-v5.2 de TODO el corpus (E1 `ICFES` fuera de CO, E3 `costarica/` vs `costa-rica`, E4 `semana:` vs `week:`, E5 `## Pregunta [D1]` sin rango, E6 opciones duplicadas — `docs/specs/CONTENT_ERRORS.md`). No fue pérdida, pero dejó este hueco que SIEMPRE se recupera regenerando con el protocolo v5.2 actual (rango, `calibration`, `bundle_index`, `## Question`).

Script de matriz (`scripts/generate-jules-issue-matrix.mjs`, max 15 bundles/issue) produce los issues de regeneración. Paridad packs: `saberparatodos/public/api/packs` (13.691, con alias) DIVERGE de `apps/worldexams-api/public/v1/packs` (3.801, canónico API); un pack que existe en uno puede no existir en otro — la Fase C detecta esto.

## Gate B — Validación de contenido (local + CI)

- `npm run validate -- --only questions_data/<pais>` → 0 Errores (ver `saberparatodos/scripts/validate_content.js`). Para CO hoy: `CO 402/402 100%` tras eliminar el zero-byte `CO-MAT-11-2026-W01-numeros-reales-001-MASTERY-bundle.md`.
- `npm run audit:country-readiness` — OkPct por país. No confundir validación (formato) con cobertura (cantidad por periodo).

## Gate C — Pre-deploy publish (CI no-negociable)

Corre en `saberparatodos` dentro de `audit-and-verify` → `pre-deploy-check.js`:

- `questions_data/**` → `expectedPacks` vía `{pais}-week-{W}-grade-{G}-subject-{S}` (deriva `week:"W{NN}"`, fallback `semana:`).
- Verifica que cada `expectedPack` existe en `dist/client/api/packs` o `public/api/packs`.
- Verifica `build-info.json`, `wrangler.toml → api.saberparatodos.space`, y `dist/server/wrangler.json` normalizado.
- **NO verifica que el worker API sirva esos packs** — esa es la lección: un deploy de worker staled pasa verde.

## Gate D — Post-deploy (deploy-production.yml Fase 4)

`scripts/deploy-smoke.sh` con retry (BACKOFF) valida lo QUE USA el front:

1. `saberparatodos.space/` → 200 (Worker SSR).
2. `api.saberparatodos.space/health` → 200 (ruta real `/health`, no `/v1/health`).
3. `api.saberparatodos.space/v1/grades/co/11/bundle` → `total_questions >= 100` (legacy probe).
4. `api.saberparatodos.space/v1/questions?country=co&grade=11&subject={5 materias ICFES G11}` con params idénticos a `pack-fetcher.ts` → ≥1 pregunta c/u.
5. `saberparatodos.space/api/questions?...&subject=lectura_critica` (proxy SSR) → ≥1.
6. `saberparatodos.space/api/packs/co-week-1-grade-11-subject-matematicas.json` → 200.

Previo al fix 2026-08-29 el smoke usaba `/v1/health` y silenciaba con `|| echo` → siempre verde. Complementario: `saberparatodos-post-deploy-smoke.sh` (global skill) chequea además `simulacro_completo` 404 y pack alias.

## Gates que aún faltan (agendados como issues)

- Smoke con payload "PERIODO 4 / 15 preguntas" vía `prepareSoloExamQuestions(strictPeriod:true)` / E2E `ExamConfigModal` (issues #1110/#1111 del análisis de hoy).
- Guard de COBERTURA por matriz (país×grado×asignatura×periodo≥1) en CI — hoy existe solo el check de coherencia (Gate C), no la barra mínima.

## Protocolo de regeneración (cuando Gate A falla)

```bash
node scripts/generate-jules-issue-matrix.mjs --country CO --grade 11 --subject matematicas --from 2 --to 11
# → issue "[JULES] Colombia - matematicas G11 W02-W11 (10 bundles)" con tablas week/topic/file
# Jules: leer AGENTS.md + skills/worldexams-bundle-generator + skills/bundle-creator/rules/CO.md
#        generar → npm run validate -- {archivos} → comment [OK] → PR
# Post-merge:
node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only
npm run audit:country-readiness
```

## Referencias

- `AGENTS.md` Bundle Protocol v5.2 (fuente de verdad que leen los Jules).
- `skills/worldexams-bundle-generator/SKILL.md` (espejo operativo v5.2 con `bundle_index`/`calibration`/rango, § Historial).
- `skills/bundle-creator/rules/CO.md` + `docs/specs/CONTENT_ERRORS.md` (9 clases de error de la purga).
- `saberparatodos/scripts/pre-deploy-check.js`, `scripts/deploy-smoke.sh`, `.github/workflows/deploy-production.yml`.
