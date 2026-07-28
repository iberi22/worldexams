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

---

## Reglas de Negocio

- **BR-01:** Un solo intento activo por sala de examen. No se permite abrir un segundo intento del mismo examen mientras otro esté en curso en la misma sala.
- **BR-02:** Contenido canónico solo v5.2 en ruta weekly: `questions_data/{country}/{subject}/grado-{N}/2026/weekly/`. Contenido legacy no cuenta para KPIs ni se sirve como contenido principal.

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

---

*Actualizado: 2026-07-28*
