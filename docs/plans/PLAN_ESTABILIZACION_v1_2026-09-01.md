# PLAN ESTABILIZACION v1 — WorldExams 2026-09-01

Objetivo: version estable que consolida todos los features nuevos mergeados 2026-08-28..31 (NeuroGym waves 2-5, Wave-10 governance exam-room, P2P mesh polish, Comunidad/Docentes, CO bundles W02-W40) y cierra gaps de features.json / tests / CI / packs.

Estado base verificado:
- `npm run validate` (root): 1532 bundles, 1 fallo legacy CO-SOC-6 v3
- `npm run test:unit -w saberparatodos`: 74 suites, 576 PASS, 0 fail
- `features.json`: 18 features, 60% overall / 54.5% weighted, audit 2026-08-26 (desactualizado 5 dias)
- `implementation-score.json`: 77.7 overall
- Git main ya contiene wave-10 + neurogym + p2p + docentes (commits e02d305b9 etc)

## Fase 0 — Sincronizacion y Saneamiento (hoy)
- [ ] F0.1 Mover bundle legacy invalido `CO-SOC-6-civilizaciones-mesopotamia-egipto-001-v3-bundle.md` a `archivo/` o renombrar a `-MASTERY-bundle.md` con frontmatter v5.2 minimo; re-validar 0 failures
- [ ] F0.2 Sincronizar `.gitcore/features.json`: añadir 3 feats faltantes (wave10-governance 100%, neurogym-wave2-5 100%, exam-room-mesh-polish 100%), actualizar tests 20->35% (576 PASS), ci-cd 72->85% (tests verdes), weekly 92->95%; bump metadata updated 2026-09-01 audit_date
- [ ] F0.3 Regenerar `.gitcore/implementation-score.json` con nuevo features_pct
- [ ] F0.4 `npm run validate` 0 failures + `npm run test:unit` 0 errors verificados

## Fase 1 — Tests feat-tests #408 (P1)
- [ ] F1.1 Auditar `saberparatodos/src/lib/ai/` (ai-core-client, exam-generator, chrome-nano-provider, device-capability, tutor-history) — cobertura actual ~35% (74 suites)
- [ ] F1.2 Añadir tests unitarios para `IsarVectorStoreService`/`agent_memory` si aplica; si no existe en este repo, cubrir `saberparatodos/src/lib/neurogym/webgpu-spatial-engine.ts` + `agentic-neuro-coach.ts` + `exam-generator.ts` (3 suites nuevas)
- [ ] F1.3 E2E `saberparatodos/tests/e2e/neurogym-full-battery.spec.ts` (wave1 issue-10) — Playwright matrix que toca los 10 componentes
- [ ] Criterio: `npm run test:unit` >=77 suites PASS, `npm run test:e2e` (o playwright) no regresion

## Fase 2 — CI/CD Estabilizacion
- [ ] F2.1 Verificar `.husky/` pre-commit (validate + secrets) verde
- [ ] F2.2 `npm run lint` (astro check + tsc --noEmit) 0 errors en saberparatodos
- [ ] F2.3 `npm run build -w saberparatodos` 0 errors (prebuild packs)
- [ ] F2.4 Documentar que `.github/workflows.disabled/` es intencional (GitCore private era) en `docs/CI.md` o `.gitcore/ARCHITECTURE.md`

## Fase 3 — Bundles & Packs
- [ ] F3.1 Regen packs CO wave: `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `apps/worldexams-api/public/v1/packs/co-*.json`
- [ ] F3.2 Verificar MX/BR pending publish (1500/620 -> publicar)
- [ ] F3.3 `npm run audit:country-readiness` actualizar KPI

## Fase 4 — Security #221 (sin force-push)
- [ ] F4.1 Verificar `scripts/validate-secrets.sh` PASS + `ALLOW_ORIGINS` restringido
- [ ] F4.2 Crear `scripts/security-221-history-rewrite.sh` (git-filter-repo plan) + `docs/SECURITY_221_PREP.md` actualizado con pasos coordinados, sin ejecutar force-push

## Fase 5 — Stubs D101-D105 (honest 0% -> interfaces)
- [ ] F5.1 Crear `saberparatodos/src/lib/mesh/worldexams-mesh-client.ts` (iface WorldExamsMeshClient: sync notas anonimas, opt-in/revoke, payload {node_hash,subject,week,score,avg})
- [ ] F5.2 Crear `saberparatodos/src/lib/leaderboard-anon.ts` (agregados anonimos, sin PII, sin karma)
- [ ] F5.3 Crear `saberparatodos/src/lib/governance/council-rules.ts` (reglas versionadas firmadas)
- [ ] F5.4 Tests unitarios para F5.1-5.3; features.json bump private-grade-network 0->25% (interface), leaderboard 0->15%
- [ ] Criterio: todo con `status: experimental` no `planned` 0% puro, sin telemetria, sin token a menor

## Criterios de salida v1 estable
- validate 0 failures, test:unit 0 failures, build 0 errors, features.json synced, implementation-score >=82
