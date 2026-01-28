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
- [ ] **Missing Reference Text:** La pregunta `CO-LEC-05-COMPRENSION-001` no muestra el texto de lectura en la UI. Investigar si es falta de contenido o error de renderizado.
- [x] **Remove Auto-generated Ads:** Eliminar texto "PUBLICIDAD GENERADA AUTOMÁTICAMENTE" de las tarjetas (Feedback usuario).

#### 4.3 Developer Portal (Frontend)
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
