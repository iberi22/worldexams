# MEMORY.md — Memoria Persistente del Proyecto

> Registro de decisiones clave de arquitectura, lecciones aprendidas y contexto histórico.
> Este archivo es la memoria institucional de WorldExamns / SaberParaTodos.

---

## 📌 Decisiones Arquitectónicas Clave (ADRs)

### ADR-001: Protocolo de Bundles v5.2
- **Fecha:** 2026-03
- **Decisión:** Adoptar formato MASTERY con frontmatter YAML como estándar único para todos los bundles de preguntas.
- **Contexto:** Se necesitaba un formato que fuera legible por humanos (markdown), validable automáticamente, y publicable como JSON estático.
- **Consecuencias:** Todos los bundles nuevos deben seguir v5.2. Bundles legacy (pre-v5.2) deben migrarse o archivarse.
- **Archivo fuente:** `AGENTS.md`

### ADR-002: Static Packs como Artefacto Derivado
- **Fecha:** 2026-03
- **Decisión:** Los archivos `.md` en `questions_data/` son la fuente de verdad. Los `.json` en `apps/worldexams-api/public/v1/packs` son artefactos derivados.
- **Contexto:** Se intentó editar JSON directamente para corregir contenido, lo que causó desincronización.
- **Consecuencias:** Corregir siempre el `.md` primero, validar, y luego regenerar packs. No editar JSON manualmente.
- **Comando:** `node scripts/generate-static-packs.js --all-weekly --changed-only`

### ADR-003: Monorepo Single-Repo
- **Fecha:** 2026-03
- **Decisión:** Todo el código en un solo repositorio con npm workspaces.
- **Contexto:** Múltiples repositorios dificultaban la coordinación entre frontend, API y contenido.
- **Consecuencias:** Workspaces: `apps/landing-worldexams`, `saberparatodos`, `apps/worldexams-api`, `tests`.
- **Archivo:** `package.json` (workspaces)

### ADR-004: Revisión Automática con Sub-Agentes
- **Fecha:** 2026-04
- **Decisión:** Implementar revisión automática de calidad cada 6 horas vía sub-agente.
- **Contexto:** La generación masiva de bundles requería control de calidad constante.
- **Consecuencias:** Workflow: Revisión de 10 bundles → checklist de 12 checks → 2+ errores → REGENERAR_BUNDLE.
- **Skill:** `skills/worldexams-question-reviewer/`

### ADR-005: Country Readiness KPI = 2000 Preguntas
- **Fecha:** 2026-05
- **Decisión:** La meta operativa para considerar un país "soportado" es 2000 preguntas validadas y publicadas.
- **Contexto:** Se necesitaba un criterio objetivo para priorizar países.
- **Requisitos:** Ruta canónica + validación estricta v5.2 + packs publicados con prefijo ISO.
- **Comando:** `npm run audit:country-readiness`

### ADR-006: Secuencia W01-W40 = Curricular, No Calendario Oficial
- **Fecha:** 2026-05
- **Decisión:** `W01-W40` es una secuencia curricular interna, no una declaración de calendario oficial nacional.
- **Contexto:** Se generaron bundles que afirmaban alineación con calendarios oficiales, causando imprecisiones por país.
- **Consecuencias:** No afirmar que W01-W40 sea calendario SEP, calendario escolar argentino, etc. Es una progresión temática interna.

### ADR-007: Integración SWAL
- **Fecha:** 2026-07-24
- **Decisión:** WorldExams es un nodo activo de la red SWAL
- **Contexto:** El proyecto ya no es standalone — forma parte del ecosistema SWAL con mesh, memoria distribuida y token económico
- **Consecuencias:** Todas las nuevas features deben considerar integración SWAL
- **Nota:** Renumerado de ADR-004 duplicado el 2026-07-28

### ADR-008: Pipeline de Integración Automática
- **Fecha:** 2026-07-24
- **Decisión:** Pipeline cíclico cada 30 min para revisar e integrar PRs
- **Contexto:** Jules genera PRs constantemente; necesitamos integración continua sin intervención manual
- **Consecuencias:** PRs mergeables y no-draft se integran automáticamente. Drafts mergeables se marcan ready.
- **Nota:** Renumerado de ADR-005 duplicado el 2026-07-28

---

## 🧠 Lecciones Aprendidas

### Lección 1: Validación Antes de PR
**Problema:** Se abrieron PRs con bundles que no pasaban validación, causando bloqueos en CI/CD.
**Solución:** Regla estricta: NO abrir PR si `npm run validate` falla. Integrado como gate en el workflow de Jules.
**Referencia:** `AGENTS.md` — sección "Validation Commands"

### Lección 2: Un Solo Formato de Bundle
**Problema:** Existían múltiples formatos legacy (v2, v3, v4, v5, v5.1) que causaban confusión en el validador.
**Solución:** Consolidar todo en v5.2. Los formatos antiguos no pasan validación estricta.
**Archivos legacy:** Se mantienen en `questions_data/` pero no cuentan para el KPI de country readiness.

### Lección 3: No Guardar Bundles en Carpetas Temporales
**Problema:** Bundles finales aparecían en `.worldexams/`, `scratch/`, `temp/`, `reports/` en lugar de la ruta canónica.
**Solución:** Regla explícita en AGENTS.md: solo la ruta `questions_data/{country}/{subject}/grado-{N}/2026/weekly/` es válida.
**Consecuencia:** Los bundles fuera de ruta no existen para el sistema de publicación.

### Lección 4: Contexto Regional por País
**Problema:** Bundles genéricos sin contexto local (ciudades, moneda, exámenes, referencias culturales).
**Solución:** Jules debe leer `skills/bundle-creator/rules/{COUNTRY_CODE}.md` antes de generar.
**Contexto mínimo:** Colombia (DBA MEN, COP), México (SEP/NEM, MXN), Argentina (NAP, ARS, voseo), Brasil (BNCC/ENEM, BRL, portugués).

### Lección 5: No Mezclar Contenido y Código en PRs
**Problema:** PRs que mezclaban cambios de bundles con cambios de código dificultaban la revisión.
**Solución:** PRs de contenido solo agregan o modifican bundles. PRs de código solo tocan `apps/`, `src/`, `scripts/`, `saberparatodos/`.
**Excepción:** Cambios en `scripts/validate-bundles-v52.mjs` o `scripts/audit-country-readiness.mjs` pueden ir con bundles si están relacionados.

### Lección 6: Feedback HTML en Opciones
**Problema:** Preguntas sin feedback o con feedback en formato incorrecto.
**Solución:** El feedback debe ir en la línea siguiente a la opción, como comentario HTML: `<!-- feedback: texto -->`.
**Validación:** El validador v5.2 verifica que todas las opciones tengan feedback.

---

## 📊 Estado de Países (auditado 2026-07-28)

Bundles canónicos weekly v5.2 (`questions_data/{country}/{subject}/grado-*/2026/weekly/`):

| País | Código | Examen | Bundles canónicos | Readiness | Estado |
|------|--------|--------|-------------------|-----------|--------|
| Colombia | CO | ICFES Saber | 2447 | 🟢 ready | ACTIVO |
| Costa Rica | CR | — | 200 | ⚠️ legacy_or_invalid (dummies) | EN DESARROLLO |
| Honduras | HN | — | 200 | 🟡 validated_not_published | EN DESARROLLO |
| Argentina | AR | APRENDER | 66 | 🔴 ~33% | EN DESARROLLO |
| Chile | CL | PAES | 50 | 🔴 ~25% | EN DESARROLLO |
| México | MX | COMIPEMS/PLANEA | 40 | 🔴 ~20% | EN DESARROLLO |
| Perú | PE | ECE | 21 | 🔴 ~11% | EN DESARROLLO |
| España | ES | EBAU | 20 | 🔴 ~10% | EN DESARROLLO |
| Ecuador | EC | — | 12 | 🔴 ~6% | EN DESARROLLO |
| Brasil | BR | ENEM | 11 | 🔴 ~6% | EN DESARROLLO |
| Panamá | PA | — | 10 | 🔴 ~5% | EN DESARROLLO |
| Guatemala | GT | — | 10 | 🔴 ~5% | EN DESARROLLO |
| Rep. Dominicana | DO | — | 10 | 🔴 ~5% | EN DESARROLLO |
| Nicaragua | NI | — | 10 | 🔴 ~5% | EN DESARROLLO |
| Guinea Ecuatorial | GQ | — | 10 | 🔴 ~5% | EN DESARROLLO |
| Bolivia | BO | — | 1 | ⚪ ~1% | PLANEADO |
| El Salvador | SV | — | 0 | ⚪ 0% | PLANEADO |
| Puerto Rico | PR | College Board | 0 | ⚪ 0% | PLANEADO |
| Uruguay | UY | CBU | 0 | ⚪ 0% (solo legacy G11) | PLANEADO |
| Paraguay | PY | 3er Ciclo/Media | 0 | ⚪ 0% (solo legacy G11) | PLANEADO |

KPI global: **0/20 países** con 2000 preguntas publicadas. Packs JSON: 4868.

---

## 🔧 Skills del Ecosistema

| Skill | Propósito |
|-------|-----------|
| `bundle-creator` | Generación de bundles usando reglas por país |
| `worldexams-bundle-generator` | Generación a escala con workflow Jules |
| `worldexams-question-reviewer` | Revisión automática de calidad (cada 6h) |
| `colombia-assessment-protocol-v6` | Protocolo específico para Colombia (legacy) |
| `preu-unal-generator` | Generación para preuniversitario UNAL |
| `social-distribution-manager` | Distribución en redes sociales |
| `video_generation` | Generación de video contenido |

---

## ⚙️ Infraestructura

- **Cloudflare Workers:** API Gateway y Static JSON API
- **Supabase:** PostgreSQL, Auth, Edge Functions
- **Frontend:** Astro 5 + Svelte 5 (SSR en Workers)
- **CI/CD:** GitHub Actions + Playwright E2E (48 tests)
- **Monorepo:** npm workspaces + pnpm (opcional)

---

## 🗓️ Log de Sesiones

### 2026-07-28 — Salones mesh-first + AI Core on-device
- **Implementado:** Salones de examen mesh-first vía edge-mesh `SalonRegistry` integrado en saberparatodos (lobby, player, auth persistence).
- **Implementado:** AI Core base — `edge-mesh/src/ai-core` + UI `/ajustes/ia`, TutorPanel en Results, `exam-generator` local. Generación local NO publica a `questions_data/`.
- **Implementado:** Geo routing por país (middleware + pack-fetcher + `ContentComingSoon` + `npm run smoke:geo`).
- **Pendiente:** sherpa-onnx real (TTS/ASR), LLM worker, VAD, resume de descarga, registry versionado; E2E de salones con 2 peers; PDF report; Pro = nodo SWAL activo gate + Xavier wiring.
- **Auditoría:** Cifras de bundles por país actualizadas al estado real (CO 2447; 0/20 países en KPI 2000). CORS del API sigue en `'*'`. vitest/playwright rotos en checkout.
- **Docs:** `features.json` promovido a v3.0 como fuente canónica única; `detailsFeatures.json` deprecado; ADRs duplicados renumerados (ADR-007/ADR-008).

---

*Última actualización: 2026-07-28*
*Mantenido por agentes del proyecto WorldExamns*
