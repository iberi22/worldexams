# Requisitos Funcionales

**Proyecto:** WorldExams
**Fecha:** 2026-07-28

---

## Requisitos Funcionales

| ID | Descripción | Prioridad | Estado |
|----|-------------|-----------|--------|
| SRS-FUN-001 | Generación de bundles MASTERY multi-país | Crítica | ✅ Activo |
| SRS-FUN-002 | Validación automática de bundles (npm run validate) | Crítica | ✅ Activo |
| SRS-FUN-003 | API REST pública con tier free/premium | Crítica | ✅ Activo |
| SRS-FUN-004 | Revisión automática de calidad cada 6h | Crítica | ✅ Activo |
| SRS-FUN-005 | Publicación de packs JSON estáticos a producción | Crítica | ✅ Activo |
| SRS-FUN-006 | Auditoría de Country Readiness (2000 preguntas/pais) | Alta | ✅ Activo |
| SRS-FUN-007 | Expansión curricular multi-país (MX, AR, CL, PE, BR) | Alta | 🔄 Desarrollo |
| SRS-FUN-008 | API Premium con API Keys, cuotas y rate limits | Alta | ✅ Activo |
| SRS-FUN-009 | Monitoreo y alertas vía Telegram | Media | ✅ Activo |
| SRS-FUN-010 | Tests E2E con Playwright + CI/CD | Media | ✅ Activo |
| SRS-FUN-011 | Red privada de notas en Xavier + retribución al operador nodal (storage rent) | Crítica | 📋 Planificado |
| SRS-FUN-012 | Leaderboard anónimo de notas/promedios (sin tokens/karma/telemetría) | Crítica | 📋 Planificado |
| SRS-FUN-013 | Gobernanza de red: reglas fundadoras mutables por consejo de nodos | Alta | 📋 Planificado |
| SRS-FUN-014 | Explicaciones comunitarias calificadas por nodos (votos firmados) | Alta | 📋 Planificado |
| SRS-FUN-015 | Estudio de generación local PDF→preguntas v5.2 (LLM on-device) | Alta | 📋 Planificado |
| SRS-FUN-016 | Corrección colaborativa con export de parches v5.2 | Media | 📋 Planificado |

---

## Casos de Uso

### UC-001: Estudiante practica examen semanal

**Actor:** Estudiante (usuario anónimo o autenticado)
**Descripción:** El estudiante selecciona un examen semanal de su país/grado/materia, lo responde y revisa sus resultados con un informe pedagógico.
**Precondiciones:**
- Existe al menos un pack semanal publicado para el país/grado/materia en `apps/worldexams-api/public/v1/packs` con prefijo ISO del país.
- La app puede resolver la geo-ruta del país vía middleware (`saberparatodos/src/middleware.ts`).

**Flujo Principal:**
1. El estudiante entra a `saberparatodos.space/practica`.
2. Selecciona país, grado, materia y semana (W01-W40) en `ExamConfigModal`.
3. La app carga el pack semanal vía `pack-fetcher` (prefiere packs con prefijo de país).
4. El estudiante responde las preguntas del examen (8/10/12/20 según grado, protocolo v5.2).
5. Al finalizar, la app muestra resultados en `ResultsView`: puntaje, feedback por opción y explicación pedagógica.
6. El estudiante puede generar un informe local (`LocalReportsView`) y, opcionalmente, practicar en un salón mesh (`/sala-examenes`).

**Postcondiciones:**
- El intento queda registrado localmente; no se publica contenido nuevo a `questions_data/`.
- Un solo intento activo por sala (BR-01).


### UC-002: Estudiante comparte su nota de forma anónima y aparece en el leaderboard

**Actor:** Estudiante (menor de edad, nodo PWA)
**Descripción:** Tras completar un examen, el estudiante puede opt-in a compartir su nota con la red privada WorldExams; el leaderboard muestra posiciones anónimas y su detalle personal solo en su dispositivo.
**Precondiciones:**
- Examen completado (UC-001).
- Opt-in explícito de compartición (BR-06).
- **BR-07:** El nodo operador que hostea la red worldexams en Xavier SÍ recibe retribución en tokens $SWAL por el servicio de persistencia (`StorageProvided`→`reward_storage_rent_provider`). Esta retribución es capa infraestructura y es completamente independiente de la capa de la app; el estudiante nunca la percibe.

**Flujo Principal:**
1. Al finalizar el examen, la app ofrece "Compartir nota con la red".
2. Si acepta, se envía SOLO `{node_hash, materia, semana, puntaje, promedio}` cifrado por wallet vía Xavier (`/v1/f12/private-mesh/sync`).
3. El nodo recalcula su posición local combinando el estado anónimo de la red con sus datos personales.
4. El leaderboard muestra: posiciones anónimas globales + panel privado con nombre/puesto/métricas del propio nodo.

**Postcondiciones:**
- Ningún dato de identificación personal sale del dispositivo (BR-04).
- No se generan tokens ni karma (BR-03).

---

### UC-003: El consejo de nodos modifica una regla de la red

**Actor:** Nodo miembro del consejo / fundador
**Descripción:** Las reglas de la red WorldExams, creadas por los fundadores, pueden modificarse mediante votación firmada del consejo de nodos.
**Precondiciones:**
- Red WorldExams activa con quorum definido en las reglas vigentes.

**Flujo Principal:**
1. Un nodo propone un cambio de regla (documento versionado).
2. Los miembros del consejo firman su voto (ML-DSA-65/Ed25519).
3. Al alcanzar quorum, la nueva versión de reglas se firma y propaga por la red.
4. Los nodos actualizan su copia local y el op-log registra la transición.

**Postcondiciones:**
- Historial de reglas auditable e inmutable (op-log).
---

## Reglas de Negocio

- **BR-01:** Un solo intento activo por sala de examen. No se permite abrir un segundo intento del mismo examen mientras otro esté en curso en la misma sala.
- **BR-02:** Contenido canónico solo v5.2 en ruta weekly: `questions_data/{country}/{subject}/grado-{N}/2026/weekly/`. Contenido legacy no cuenta para KPIs ni se sirve como contenido principal.
- **BR-03:** WorldExams queda EXCLUIDA de tokens $SWAL, karma y recolección de telemetría (protección de menores). Ningún flujo puede invocar wallets, bridges de karma (maloca) ni collectors.
- **BR-04:** El leaderboard solo publica datos anónimos (puntaje, promedio, materia, semana). Nombre, puesto y métricas detalladas visibles ÚNICAMENTE en el propio dispositivo.
- **BR-05:** Las reglas de la red las crean los fundadores; toda modificación posterior requiere aprobación del consejo de nodos mediante votación firmada registrada en el op-log.
- **BR-06:** La participación en la red de notas es opt-in y revocable; al revocar, el nodo deja de aportar datos nuevos y los agregados históricos no son atribuibles.

---

## Requisitos Baseline SWAL

| ID | Descripción | Files | Acceptance |
|----|-------------|-------|-----------|
| REQ-001 | App gratuita usable sin paywall fiat | `saberparatodos/src/pages/practica.astro`, `apps/worldexams-api/public/v1/packs/` | Un estudiante anónimo completa UC-001 end-to-end sin pago ni API key |
| REQ-002 | Pro = nodo SWAL activo, sin Stripe | `docs/SWAL/GOAL.md`, `saberparatodos/src/lib/p2p-edge-mesh.ts` | Ninguna referencia a Stripe/suscripciones externas en código de gating; Pro se activa por nodo SWAL activo |
| REQ-003 | Xavier namespace `app/worldexams/instance/{instanceId}` | `saberparatodos/src/lib/swal-instance-id.ts` | La app genera/reutiliza un instanceId estable y lo usa como namespace de memoria Xavier |
| REQ-004 | Mesh namespace `swal/worldexams/{instanceId}` | `saberparatodos/src/lib/p2p-edge-mesh.ts` | Los salones mesh-first se registran bajo el namespace `swal/worldexams/{instanceId}` en edge-mesh |
| REQ-005 | GitCore 3.8: SRC + SRS sincronizados | `.gitcore/SRC.md`, `docs/SRS/index.md` | SRC.md refleja estructura real auditada; SRS cubre REQUIREMENTS/INTERFACES/DATABASE/ARCHITECTURE/NON-FUNCTIONAL |
| REQ-006 | AGENTS.md apunta a docs/SWAL/GOAL.md | `AGENTS.md`, `docs/SWAL/GOAL.md` | La sección "SWAL ecosystem" de AGENTS.md referencia el canonical GOAL.md y PROJECT_MAP.md |
| REQ-007 | AI Core on-device vía `createAiCore` | `saberparatodos/src/lib/ai/ai-core-client.ts`, `saberparatodos/src/pages/ajustes/ia.astro` | `createAiCore({ mesh, instanceId })` monta tutor y exam-generator on-device; `npm run smoke:ai` pasa |
| REQ-008 | Red de notas WorldExams separada de la red SWAL | `apps/xavier/src/mesh/private_mesh.rs`, decisión D-102 | La app se registra como red propia en Xavier; ningún flujo escribe en namespaces/registros de la red SWAL |
| REQ-009 | Exclusión económica y de telemetría (BR-03) | grep en `saberparatodos/src/`: sin `swal-credits`, `maloca`, `telemetry_collector` en flujos de examen | 0 referencias a tokens/karma/telemetría en los flujos de examen y leaderboard |
| REQ-010 | Leaderboard solo-agregados anónimos (BR-04) | `WX-301`, tabla/ancla Supabase | Esquema del ancla no contiene columnas de identidad; payload mesh solo `{node_hash, subject, week, score, avg}` |
| REQ-011 | Gobernanza: reglas fundadoras → consejo (BR-05) | `docs/DECISIONS_2026-08-25-REDES-XAVIER-Y-ETICA.md` | Cambio de reglas requiere votación firmada con quorum registrada en op-log |
| REQ-012 | Persistencia de datos worldexams vía nodos Xavier (storage rent) | `apps/xavier/src/data_commons/mesh_bridge.rs`, `apps/xavier/src/mesh/tokenomics/` | WorldExams persiste su red y datos en nodos Xavier; el nodo operador recibe retribución vía `reward_storage_rent_provider()` → `ResourceAccounting.record_contribution(StorageProvided)` → `RewardEngine.calculate_reward()`. La retribución del operador es independiente de la capa de la app (BR-07) |
| REQ-013 | Capa económica bifurcada: infra vs app (BR-07) | `DECISIONS_2026-08-25-REDES-XAVIER-Y-ETICA.md`, grep en `saberparatodos/src/` | El flujo de tokens $SWAL NO puede llegar al usuario final (estudiante); solo el operador nodal recibe retribución por el servicio de persistencia. El app NO puede invocar `swal-credits`, `maloca` o `telemetry` en flujos de examen/leaderboard (ya cubierto por REQ-009) |

---

*Actualizado: 2026-07-28*
