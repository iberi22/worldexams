# Gestión de Tareas: World Exams Organization

Última actualización: 2026-01-26

## 🎯 Resumen Ejecutivo y Estado Actual

**✅ COMPLETADO:** **Licenciamiento Source Available** (PolyForm Shield + CC BY-NC-SA).
**✅ COMPLETADO:** **Estrategia API Definida** (Cloudflare Workers + Supabase).
**✅ COMPLETADO:** **Inglés Global** (Fase 1 y 2).

**Estado General:** 🚀 **LISTO PARA IMPLEMENTACIÓN FASE 4 (API & B2B)**

---

## 📋 Tareas Activas (Sprint Actual - API & Monetización)

### 🚀 Fase 4: API Gateway & Monetización (Prioridad Alta)

#### 4.1 Base de Datos & Auth (Supabase)
- [x] **Schema Migration:** Crear tablas `organizations`, `api_keys`, `usage_logs`. (2026-01-26)
- [x] **RLS Policies:** Configurar seguridad para que solo el dueño vea sus API Keys. (2026-01-26)
- [x] **Edge Function `generate-key`:** Lógica segura para crear/revocar keys. (2026-01-26)

#### 4.2 API Gateway (Cloudflare Workers)
- [x] **Worker Setup:** Inicializar proyecto `worldexams-api` con Wrangler. (2026-01-26)
- [x] **Middleware Auth:** Validar `x-api-key` contra Supabase. (2026-01-26)
- [x] **Rate Limiting:** Implementar lógica de límites mensuales (Free vs Pro). (2026-01-26)
- [ ] **Endpoints Core:**
    - [x] `GET /v1/questions/random` (Implementado Proxy inicial).
    - [ ] `GET /v1/questions/:id` (Detalle).
    - [ ] `GET /v1/subjects` (Taxonomía).
- [ ] **Developer Portal (Frontend)**: Dashboard de gestión de llaves y consumo.
- [ ] **CORS Policy:** Restringir acceso browser-side para keys Pro.

### 🐛 Bugs & Deuda Técnica
- [x] **Limpieza de errores de Tipado y Linting:** Revisar y corregir errores/warnings reportados por `npm run lint`. (2026-02-04)
- [x] Fix Missing Reference Text (`CO-LEC-05-COMPRENSION-001`) <!-- id: 2 -->
- [x] Enhance Logging for Period Exams <!-- id: 3 -->
- [x] Analyze Period Metrics & Exams <!-- id: 4 -->
    - [x] Verify `QuestionStats` structure for period data (Implemented)
    - [x] Check `LocalReportsView` for period analysis (Implemented)
    - [x] Check if pre-defined period exams exist (Confirmed: Dynamic only)
- [x] **Remove Auto-generated Ads:** Eliminar texto "PUBLICIDAD GENERADA AUTOMÁTICAMENTE" de las tarjetas (Feedback usuario).
- [x] **Fix Period Exam Logic:** Relax topic filtering and fix subject fallback to prevent cross-subject contamination. (2026-02-07)
- [x] **Fix TypeError in question-memory.ts & App.svelte Memory Logic:** Corrected `updateStats` call signature and fixed aggressive memory clearing. Verified with E2E test. (2026-02-08)

### 📦 Fase: Recatalogación de Contenido (Period Metadata)

> **Audit Date:** 2026-02-08 | **Script:** `scripts/audit_periods.js`
> **Reports:** `period_audit_report.csv`, `period_audit_report.json`

#### Resumen del Audit
| Métrica               | Valor        |
|-----------------------|--------------|
| Total Bundles         | 1,222        |
| Total Preguntas       | 10,988       |
| Con `periodo`         | 511 (41.8%)  |
| Sin `periodo`         | **711** (58.2%) |

#### Brechas Críticas por Grado
| Grado | Bundles | Con Periodo | Sin Periodo | Cobertura |
|-------|---------|-------------|-------------|-----------|
| 3     | 211     | 150         | 61          | 71%       |
| 4     | 55      | 40          | 15          | 73%       |
| 5     | 50      | 0           | **50**      | 0% ⚠️     |
| 6     | 62      | 0           | **62**      | 0% ⚠️     |
| 7     | 50      | 0           | **50**      | 0% ⚠️     |
| 8     | 57      | 0           | **57**      | 0% ⚠️     |
| 9     | 80      | 0           | **80**      | 0% ⚠️     |
| 10    | 200     | 120         | 80          | 60%       |
| 11    | 442     | 201         | 241         | 45%       |

#### Tareas de Recatalogación

- [x] **5.1 Normalizar Asignaturas** (Alta Prioridad)
    - [x] Unificar `matemáticas` → `matematicas` (126 bundles)
    - [x] Unificar `ciencias naturales` → `ciencias-naturales`
    - [x] Unificar `sociales y ciudadanas` → `sociales-ciudadanas`
    - [x] Unificar `inglés` → `ingles`
    - [x] Unificar `lectura crítica` → `lectura-critica`
    - [x] Crear script `scripts/normalize_subjects.js`

- [x] **5.2 Agregar Metadato `periodo` a Bundles Faltantes**
    - [x] **Wave 1: Grado 11** (241 bundles) - Prioridad Saber 11
        - [x] Matemáticas 11
        - [x] Lectura Crítica 11
        - [x] Ciencias Naturales 11 (Física/Química/Biología)
        - [x] Sociales y Ciudadanas 11
        - [x] Inglés 11
    - [x] **Wave 2: Grados 5-9** (299 bundles) - Cobertura 0%
        - [x] Grado 9 (80 bundles)
        - [x] Grado 8 (57 bundles)
        - [x] Grado 7 (50 bundles)
        - [x] Grado 6 (62 bundles)
        - [x] Grado 5 (50 bundles)
    - [ ] **Wave 3: Grados 3-4 y 10** (156 bundles restantes)

- [x] **5.3 Validar Curriculum Mapping**
    - [x] Verificar que los `tema` de cada bundle coincidan con `curriculum.ts`
    - [x] Actualizar `curriculum.ts` si faltan temas

- [x] **5.4 Automatización**
    - [x] Crear script `scripts/add_period_metadata.js` para inferir periodo desde `tema` usando `curriculum.ts`
    - [x] Ejecutar script en modo dry-run primero
    - [x] Commit por waves

- [ ] **5.5 Delegación a Jules: Recatalogación Manual de Gaps**
    - [ ] Asignar Packet #1: Grade 11 (159 bundles) <!-- tag: jules -->
    - [ ] Asignar Packet #2: Grade 10 (80 bundles) <!-- tag: jules -->
    - [ ] Asignar Packet #3: Grades 8-9 (105 bundles) <!-- tag: jules -->
    - [ ] Asignar Packet #4: Grades 3-5 (107 bundles) <!-- tag: jules -->
    - [ ] Asignar Packet #5: Grades 6-7 (92 bundles) <!-- tag: jules -->
    - [ ] Ver detalle en [jules_packets.md](file:///C:/Users/belal/.gemini/antigravity/brain/f5f0f6bc-2c1d-4d13-a331-05d829249183/jules_packets.md)

---


- [ ] **Pagina `/developers`:** Landing page con documentación y precios.
- [ ] **Dashboard Dev:**
    - [ ] Vista de mis API Keys.
    - [ ] Gráfica de consumo diario (Chart.js / Recharts).
    - [ ] Botón "Upgrade to Pro" (Stripe Link).

---

## 🔮 Roadmap Futuro (Q1 2026)

### 🏢 Fase 5: Plataforma Institucional (SaaS B2B)

#### 5.1 Gestión de Organizaciones
- [ ] **Onboarding Colegio:** Flujo de registro para Rectores/Coordinadores.
- [ ] **Gestión de Estudiantes:** Bulk upload (CSV) o códigos de invitación por grupo.
- [ ] **Roles RBAC:** Admin, Profesor, Estudiante.

#### 5.2 Autenticación de Estudiantes & Leaderboard (Nuevo)
- [x] **Schema Migration:** (2026-01-26)
    - [x] Tabla `profiles` (username, avatar, privacy_settings).
    - [x] Tabla `exam_results` (history of scores).
    - [x] RLS Policies para privacidad "Anonymous by Default".
- [ ] **Auth Pages:**
    - [ ] `/login`: Página unificada (Tabs: Estudiante / Institución).
    - [ ] `/register`: Registro de estudiantes con Magic Link / Social (futuro).
- [ ] **Onboarding Flow:**
    - [ ] Generador de Nicknames aleatorios (e.g. "CosmicCapybara").
    - [ ] Selector de Avatar.
- [ ] **Leaderboard UI:**
    - [ ] `/leaderboard`: Tabla de clasificación global (filtrada por privacidad).
    - [ ] Componente `UserRankCard` en el dashboard del estudiante.

#### 5.3 Reportes y Analítica (Instituciones)
- [ ] **Reportes PDF:** Generar boletines individuales o grupales.

#### 5.3 Simulacros Controlados
- [ ] **Examen Programado:** Configurar fecha inicio/fin estricta.
- [ ] **Modo Seguro:** Bloquear navegación o detectar pérdida de foco (fase beta).

### 💰 Fase 6: Sistema de Pagos (Stripe/LemonSqueezy)
- [ ] **Integration Backend:** Webhooks para activar/desactivar planes.
- [ ] **Customer Portal:** Permitir al usuario cancelar/cambiar tarjeta.
- [ ] **Facturación:** Emisión automática de invoices para colegios.

---

## ✅ Tareas Completadas (Histórico Reciente)

- [x] **Licenciamiento:** Definir PolyForm Shield + CC BY-NC-SA. (2026-01-26)
- [x] **Estrategia API:** Documento `API_STRATEGY.md` creado. (2026-01-26)
- [x] **Refactor terminology:** "Party" -> "Sala de Exámenes". (2026-01-26)
- [x] **UI Refinement:** Mejoras en selector de periodos y modal de examen.
- [x] **Bundle Scaffolding:** Generados 250 bundles (10 por materia/grado, v3.0). (2026-01-26)
- [x] **Gold Standard:** Creado ejemplo `CO-MAT-11-CALCULO-001` (10 preguntas). (2026-01-26)
- [x] **Fase 9 (NatSci 10):** Generados 400 preguntas (Química P1-P2, Física P3-P4). (2026-01-27)
- [x] **Fase 10 (SocSci 10):** Generados 400 preguntas (Geografía, Historia, Cívica, DDHH). (2026-01-27)
- [x] **UI/UX:** Integración Period Tracker y Countdown Examen (PR #72). (2026-01-30)
