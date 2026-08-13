# Reality Audit — WorldExams (Mesh / Salones / Exámenes Grupales + GitCore)

**Fecha:** 2026-08-05
**Auditor:** Hermes (deepseek-v4-flash)
**Protocolo:** GitCore 3.8.0 · feature-reality-audit Modalidad 1/5
**Repo:** ~/proyectosSWAL/worldexams (main @ e18e2b190)
**Pregunta del usuario:** ¿El sistema mesh para salones y exámenes grupales está 100% funcional, testeado E2E con cobertura del 100%? ¿SRS y features details .json están completos y definidos totalmente?

---

## RESUMEN EJECUTIVO

| Área | Claim declarado | Real verificado | Veredicto |
|------|----------------|-----------------|-----------|
| Mesh salones (edge-mesh) | Implementado (PR #877) | Implementación real y sustancial (~1,900 L módulo + 485 L adapter) | ✅ CÓDIGO EXISTE |
| Tests E2E party mode | "48 tests E2E" / docs dicen listo | 21 tests party escritos; último run global FAILED; 0 runs de party en test-results | 🔴 NO VERIFICADO |
| Cobertura unitaria mesh | — | p2p-edge-mesh.ts 0%, p2p-service.ts 0%, exam-room sin unit tests | 🔴 0% |
| features.json (GitCore) | 8 features, 7 passing | 8 features pero TODAS sin implemented_in/req_ids/user_stories/tests/last_tested | 🔴 INCOMPLETO |
| verify-pipeline.sh | 8/8 PASS | PASS por vacuidad (valida campos vacíos) | 🔴 FALSO POSITIVO |
| SRS REQUIREMENTS.md | "Cubre todo" | 10 SRS-FUN + UC-001 + BR-01/02 + REQ-001..007; mesh SOLO mencionado en UC-001 paso 6 | 🔴 INCOMPLETO |
| USER-STORIES.md | Requerido por pipeline | NO EXISTE | 🔴 FALTANTE |
| docs/SWAL/ | Canónico (AGENTS.md, SRC.md, REQ-006) | NO EXISTE en disco | 🔴 DRIFT |
| detailsFeatures.json | DEPRECATED → "merged into features.json v3.0" | El raíz es v1.0 con solo 8 features; 12 del detalle no absorbidas | 🔴 PROMESA ROTA |
| features.details/ | 10 features indexadas | Solo 4 directorios reales | 🔴 INCOMPLETO |

**Conclusión:** El sistema mesh NO está demostrado como 100% funcional (falta ejecución E2E y cobertura). La documentación GitCore NO está completa: features.json sin trazabilidad, pipeline verifica vacíos, USER-STORIES.md y docs/SWAL inexistentes, SRS sin requisitos dedicados al mesh.

---

## PARTE 1 — SISTEMA MESH / SALONES / EXÁMENES GRUPALES

### 1.1 Implementación (existe y es real)

| Archivo | Líneas | Rol |
|---------|--------|-----|
| `saberparatodos/src/modules/exam-room/types.ts` | 147 | RoomConfig, Player, GameState, RoomResults, PLAN_LIMITS (free 10 / pro 100 / institutional 1000 jugadores) |
| `saberparatodos/src/modules/exam-room/services/connection.ts` | 298 | Triple modo: edge-mesh (default, PeerJS+Yjs CRDT), supabase (mirror opt-in), local (rust legacy) |
| `saberparatodos/src/modules/exam-room/stores/roomState.svelte.ts` | 865 | Store central: createRoom, plan limits, anti-cheat, AI analysis, persistencia |
| `saberparatodos/src/modules/exam-room/services/antiCheat.ts` | 123 | tab_switch / window_blur / page_hidden / long_inactivity |
| `saberparatodos/src/modules/exam-room/services/reportGenerator.ts` | 441 | Informe admin: estadísticas, métricas individuales, promedio |
| `saberparatodos/src/modules/exam-room/services/authPersistence.ts` | — | Supabase mirror + persistencia de sesión |
| 10 componentes | — | RoomApp, LobbyBrowser, RoomBrowser, PlayerView, HostControls, SpeedChallengeSetup, StopModeSetup, RoomResults, etc. |
| `saberparatodos/src/lib/p2p-edge-mesh.ts` | 485 | Adapter edge-mesh → worldexams: EdgeMesh + SalonesManager + SalonRegistry + ExamenCompartido; discovery mesh-first |
| `saberparatodos/src/lib/p2p-service.ts` | 333 | Legacy Trystero (mantenido por compatibilidad) |
| `saberparatodos/src/lib/rust-backend.ts` | 241 | Modo local legacy |
| `saberparatodos/src/pages/party.astro` + `sala-examenes.astro` | — | Rutas activas; Navbar enlaza `/sala-examenes` (label "Salones") |

- edge-mesh vendored local: `"edge-mesh": "file:../../edge-mesh"` (instalado en node_modules)
- Última actividad del módulo: commit `152a79054` (2026-07-28, PR #877 "mesh-first salones, on-device AI Core, Pro/node gates")
- Latencia declarada en connection.ts: <50ms LAN, <150ms WAN, 1-100 dispositivos

### 1.2 Tests existentes (escritos pero NO ejecutados recientemente)

E2E Playwright en `saberparatodos/tests/` (21 tests party/mesh de 116 totales):

| Spec | Tests | Cubre |
|------|-------|-------|
| party-mode.spec.ts | 1 | Host + 4 estudiantes, lobby, respuestas, informe admin, IA, exportación |
| party-mode-real-flow.spec.ts | 2 | Host crea vía UI, guest se une |
| party-focus.spec.ts | 1 | Enfoque/ventana durante examen |
| party-results-e2e.spec.ts | 1 | Resultados |
| party-smoke.spec.ts | 2 | Acceso a /party y join con código |
| speed-challenge.spec.ts | 1 | Modo Speed Challenge |
| sw-p2p-recovery.spec.ts | 6 | Service Worker + P2P recovery (localStorage fallback) |
| lan-discovery.spec.ts | 7 | Descubrimiento LAN |

**Evidencia de que NO están verificados:**
- `saberparatodos/test-results/.last-run.json` → `{"status": "failed", "failedTests": [2 IDs]}` (último run global FALLÓ)
- NO hay directorios de run party en test-results (solo english-module y production-cefr-filtering)
- `docs/E2E_PARTY_MODE_TESTS.md` (2025-12-12): checklist final "- [ ] Tests ejecutados exitosamente (pendiente: requiere servidor activo)" SIN marcar
- Ese doc está desactualizado: menciona `PartyHost.svelte` / `PartyJoin.svelte` que ya NO existen (reemplazados por `modules/exam-room/`)

### 1.3 Cobertura unitaria — 🔴 0% para el mesh

`npx vitest run --coverage` (215 tests, 26 files, ALL PASS):
- **Total: 24.07% líneas | 25.55% funciones | 20.94% branches**
- `p2p-edge-mesh.ts`: **0%** (40-485 sin cubrir)
- `p2p-service.ts`: **0%** (22-333 sin cubrir)
- Módulo `exam-room/`: **NO aparece en el coverage** — no tiene tests unitarios (roomState, connection, antiCheat, reportGenerator no cubiertos)
- El coverage config incluye solo `src/lib/**` y `src/utils/**` — `src/modules/**` queda fuera por config

### 1.4 Veredicto mesh

**NO se puede afirmar "100% funcional, testeado E2E con cobertura 100%".** Real:
- Código: implementado y sustancial (✅)
- E2E: escritos pero sin run verde reciente documentado; último run global FAILED (🔴)
- Cobertura unitaria: 0% en el núcleo mesh (🔴)
- Requisito de cobertura: no hay gate de cobertura en CI para el mesh (🔴)

---

## PARTE 2 — DOCUMENTACIÓN GITCORE / SRS / FEATURES

### 2.1 features.json (`.gitcore/features.json`) — 🔴 INCOMPLETO

8 features: mastery-colombia 100%, mastery-uruguay 100%, mastery-paraguay 100%, weekly-packs 95%, multi-country 100%, ci-cd 100%, security 0% (issue #221), tests 20% (issue #408).

**Todas sin trazabilidad GitCore 3.8:**
```
implemented_in: MISSING (en las 8)
req_ids:        MISSING (en las 8)
user_stories:   MISSING (en las 8)
tests:          MISSING (en las 8)
last_tested:    MISSING (en las 8)
```
- metadata: total_features=8, passing=7, failing=0 → **inconsistencia**: hay 8 features, 7 passing y 1 "failing" implícito (security 0%, tests 20% no son passes=true) — passing+failing ≠ total
- **El mesh/exam-room NO está registrado como feature** — la funcionalidad más grande del producto no tiene entrada en features.json

### 2.2 verify-pipeline.sh — 🔴 FALSO POSITIVO (PASS por vacuidad)

`bash .gitcore/scripts/verify-pipeline.sh` → "8/8 features verified (FAIL=0), build: skipped, test: skipped"

Por qué es falso: los 4 checks (implemented_in paths, req_ids en SRS, user_stories en USER-STORIES.md, tests refs) iteran sobre campos **vacíos** → nada que validar → PASS. Además:
- `--check` (build) y `--test` (suite) NO se pasan → "skipped" (no valida compilación ni tests)
- `docs/SRS/USER-STORIES.md` no existe → check 3 desactivado silenciosamente (`if [ -f ]`)
- Detección de stack dice "pnpm" (hay pnpm-workspace.yaml) pero el repo real usa npm en saberparatodos

### 2.3 detailsFeatures.json — 🔴 DEPRECATED con merge prometido y no realizado

- Header: `"deprecated": true, "merged_into": "features.json v3.0", "deprecated_at": "2026-07-28"`
- Pero el features.json raíz es `"version": "1.0"` con solo 8 features
- Las 12 features del detalle NO se absorbieron: feat-pais-mexico, feat-pais-argentina, feat-pais-brasil, feat-premium-api, feat-country-readiness, feat-telegram-monitoring NO existen en el raíz

### 2.4 features.details/ — 🔴 4 de 10 directorios

El README indexa 10 features; solo existen directorios para: feat-mastery-colombia, feat-pais-mexico, feat-premium-api, feat-weekly-packs. Faltan: feat-multi-country, feat-pais-argentina, feat-pais-brasil, feat-ci-cd, feat-tests, feat-security.

### 2.5 SRS (docs/SRS/) — 🔴 INCOMPLETO para el mesh

| Archivo | Estado |
|---------|--------|
| REQUIREMENTS.md (70 L) | Existe. 10 SRS-FUN + UC-001 + BR-01/02 + REQ-001..007 |
| ARCHITECTURE.md | Existe (GitCore 3.8.0, 2026-07-17) |
| INTERFACES.md | Existe (v3.0, 2026-07-28) |
| DATABASE.md | Existe |
| NON-FUNCTIONAL.md | Existe (v3.0, 2026-07-10) |
| GLOSSARY.md / DECISIONS / index.md | Existen |
| **USER-STORIES.md** | **🔴 NO EXISTE** (el pipeline lo espera; REQ-005 del SRS no lo lista) |

**El mesh solo se menciona en:**
- UC-001 paso 6: "...opcionalmente, practicar en un salón mesh (`/sala-examenes`)"
- BR-01: "Un solo intento activo por sala de examen"
- REQ-004: "Mesh namespace `swal/worldexams/{instanceId}`"

**NO hay requisitos funcionales dedicados** para: creación/unión de salas, lobby sincronizado, anti-cheat, modos stop/speed challenge, límites por plan (free/pro/institutional), informe admin, AI analysis, modos de conexión (edge-mesh/supabase/local), discovery regional. El SRS está desactualizado respecto a la feature más grande del producto.

### 2.6 docs/SWAL/ — 🔴 REFERENCIADO PERO INEXISTENTE

- AGENTS.md: "Canonical: `docs/SWAL/GOAL.md` · `docs/SWAL/PROJECT_MAP.md`"
- SRC.md: "docs/SWAL/ # Documentación del ecosistema SWAL"
- SRS REQ-006: "AGENTS.md apunta a docs/SWAL/GOAL.md" (acceptance: el canonical GOAL.md existe)
- **En disco: `docs/SWAL/` NO EXISTE** → REQ-006 falla
- El contenido SWAL está disperso en `.gitcore/docs/` (SWAL_GOAL.md, SWAL_GOAL_CANONICAL.md, SWAL_AI_CORE.md, SWAL_PRIVATE_ERA.md) — nadie lo movió a docs/SWAL/

### 2.7 Otros archivos desactualizados

| Archivo | Fecha | Problema |
|---------|-------|----------|
| STATE.md | 2026-06-05 | Dice "48 tests E2E", no menciona mesh; PRs abiertos desactualizados |
| TODO.md | 2026-06-05 | Idem |
| PROJECT_STATE.md | 2026-04-26 | "Pipeline PAUSED", bundle count 791 — muy viejo |
| E2E_PARTY_MODE_TESTS.md | 2025-12-12 | Componentes inexistentes (PartyHost.svelte), checklist sin marcar |
| .gitcore/ARCHITECTURE.md | 2026-04-02 | No menciona edge-mesh/exam-room |

---

## PARTE 3 — HALLAZGOS PRIORIZADOS

| ID | Severidad | Hallazgo |
|----|-----------|----------|
| F-01 | 🔴 CRÍTICO | verify-pipeline.sh da PASS por vacuidad — la "verificación" GitCore no verifica nada |
| F-02 | 🔴 CRÍTICO | features.json sin implemented_in/req_ids/user_stories/tests/last_tested en las 8 features |
| F-03 | 🔴 CRÍTICO | Mesh/exam-room sin feature entry en features.json ni requisitos en SRS (la feature más grande del producto es invisible para GitCore) |
| F-04 | 🔴 CRÍTICO | Cobertura unitaria del mesh = 0% (p2p-edge-mesh 0%, p2p-service 0%, exam-room sin tests) |
| F-05 | 🔴 ALTO | Último run E2E global FAILED (.last-run.json); 0 runs de party en test-results |
| F-06 | 🔴 ALTO | docs/SWAL/ inexistente pero referenciado como canónico (AGENTS.md, SRC.md, REQ-006) |
| F-07 | 🔴 ALTO | USER-STORIES.md inexistente (check 3 del pipeline desactivado silenciosamente) |
| F-08 | 🟡 MEDIO | detailsFeatures.json dice "merged into v3.0" pero el raíz es v1.0 (12 features perdidas) |
| F-09 | 🟡 MEDIO | features.details/ 4 de 10 directorios |
| F-10 | 🟡 MEDIO | metadata features.json inconsistente (passing+failing ≠ total) |
| F-11 | 🟡 MEDIO | STATE.md/TODO.md/PROJECT_STATE.md desactualizados (abril-junio) |
| F-12 | 🟡 MEDIO | docs/E2E_PARTY_MODE_TESTS.md desactualizado (componentes que ya no existen) |
| F-13 | 🟢 BAJO | Detección de stack del pipeline dice pnpm pero el paquete usa npm |

---

## PARTE 4 — PLAN DE ACCIÓN RECOMENDADO

### Fase A — Verificar el mesh de verdad (inmediato)
1. Arrancar servidor dev y ejecutar `npm run test:party` (party-mode + real-flow + smoke + speed + lan-discovery)
2. Si fallan: clasificar fallos (entorno vs código) y arreglar
3. Ejecutar `npm run test` completo para confirmar estado global
4. Registrar run verde + evidencia en features.json

### Fase B — Reconciliación GitCore (documentación)
1. Reescribir `.gitcore/features.json` v3.0: 8 features existentes + NUEVAS (feat-mesh-salones, feat-exam-room, feat-anti-cheat, feat-reportes, feat-ai-analysis, feat-premium-api, feat-country-readiness, feat-telegram-monitoring) — cada una con implemented_in, req_ids, user_stories, tests, last_tested
2. Crear `docs/SRS/USER-STORIES.md` (US-001..US-NNN)
3. Añadir SRS-FUN dedicados al mesh (creación/unión de sala, lobby, anti-cheat, modos, límites plan, reportes)
4. Crear `docs/SWAL/` y mover GOAL.md/PROJECT_MAP.md (o corregir referencias)
5. Corregir verify-pipeline.sh: fallar si campos vacíos, activar --check/--test por defecto, stack npm
6. Actualizar STATE.md/TODO.md/PROJECT_STATE.md/E2E_PARTY_MODE_TESTS.md
7. Añadir cobertura unitaria mínima para exam-room (roomState, connection, antiCheat) — target ≥70%

### Fase C — Prevenir re-inflación
- El pipeline debe ser la ÚNICA fuente de verdad para cerrar PRs (FAIL=0 requerido, sin campos vacíos)
- Regla: features.json se actualiza en el MISMO PR que el código, nunca en issue de reconciliación separado

---

## VERIFICACIÓN EJECUTADA (comandos)

```bash
bash .gitcore/scripts/verify-pipeline.sh                    # 8/8 PASS por vacuidad
npx vitest run --coverage                                   # 215 tests PASS, 24.07% total, p2p 0%
git log --oneline -8 -- saberparatodos/src/modules/exam-room/  # último toque 2026-07-28 (#877)
cat saberparatodos/test-results/.last-run.json              # {"status":"failed"}
ls saberparatodos/test-results/                             # sin runs de party
grep -c "test(" tests/*.spec.ts                             # 116 tests, 21 party/mesh
find docs -name "GOAL.md" -o -name "PROJECT_MAP.md"         # vacío → docs/SWAL no existe
python3 -c "...features.json..."                            # implemented_in/req_ids/user_stories MISSING ×8
```

*Nota: los E2E party NO se ejecutaron en esta auditoría (servidor dev no arrancado por decisión del usuario). La verificación funcional del mesh queda pendiente como Fase A.*
