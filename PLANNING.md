# PLANNING.md -

## 1. Visión del Proyecto

Crear la plataforma de preparación para pruebas de estado (Saber 3° a 11°) más accesible, transparente y eficiente de Colombia.
**Filosofía:** "Source Available" (Código Público pero Protegido).
**Sostenibilidad:**
1.  **B2C (Gratis):** Freemium con Ads para estudiantes individuales.
2.  **B2B (Institucional):** Planes para Colegios/Academias (Dashboard de Métricas, Gestión de Grupos, Simulacros Controlados).
3.  **B2D (Developers):** API-as-a-Service (Venta de acceso a la base de preguntas).

## 2. Arquitectura Técnica (The Hybrid Stack)

* **Frontend:** Astro 5 (Static Site Generation + Server Islands).
*   **Hosting:** Cloudflare Pages.
*   **Contenido:** Markdown en Git (Single Source of Truth).
* **Backend:**
    *   **BaaS:** Supabase (Auth, DB, Realtime).
    *   **API Gateway:** Cloudflare Workers (para monetización de API y control de acceso).

## 3. Estructura de Datos (Supabase Schema)

* `profiles`: (id, nickname, avatar_url, grade_level, is_premium, school_id).
* `organizations`: (id, name, plan_type, max_students).
* `exam_sessions`: (id, user_id, score, duration, completed_at, json_answers).
* `api_keys`: (key, owner_id, plan, rate_limit, usage_count).

## 4. Estrategia de Monetización

### A. Modelo Institucional (SaaS B2B - Enfoque Colombia)
Venta de suscripciones anuales a **Colegios y Preicfes** basadas en tiers por volumen de estudiantes:

*   **Pricing por Volumen (Tiers Anuales - COP Estimado):**
    *   **Tier 1 (Micro):** Hasta 50 estudiantes (~$500,000 COP/año). Ideal para academias pequeñas o grados únicos.
    *   **Tier 2 (Pyme):** 51 - 200 estudiantes (~$1,500,000 COP/año).
    *   **Tier 3 (Macro):** 201 - 500 estudiantes (~$3,000,000 COP/año).
    *   **Tier 4 (Enterprise):** 500+ estudiantes (Precio a medida).
*   **Gestión y Vinculación de Cuentas (Technical Flow):**
    *   **Base de Datos Oficial:** El colegio se registra seleccionando su institución de nuestra tabla `colleges` (precargada con 50k+ registros del DANE).
    *   **Self-Join (Vinculación):** Un colegio con suscripción activa genera **Códigos de Invitación** o **Magic Links Grupales** (ej. `saberparatodos.space/join/ABC-123`).
    *   Los estudiantes existentes inician sesión y al usar el código, la Edge Function `join-organization` valida el cupo (`max_students` vs count actual) y crea el registro en `organization_students`.
    *   Si el usuario no tiene cuenta, el Magic Link lo lleva por onboarding y lo auto-asigna al grupo.
*   **Dashboard del Rector/Profesor:** Ver progreso detallado por estudiante y grupo.
*   **Simulacros Programados:** El colegio define fecha y hora, y el sistema abre el examen.
*   **Comparativas:** Ranking interno del colegio vs promedio nacional.

### B. API-as-a-Service (Data Monetization)
Exponer el banco de preguntas vía REST API (`api.worldexams.org`):
*   **Free Tier:** 100 req/día, solo preguntas públicas, uso personal/dev.
*   **Pro Tier:** 10k req/día, acceso a preguntas premium, uso comercial permitido.
*   **Enterprise:** Sin límites, soporte, endpoints personalizados.

### C. Usuarios Finales (B2C)
*   **Gratis:** Acceso total a preguntas, con publicidad y funcionalidades básicas.
*   **Premium Pro:** Sin publicidad, estadísticas avanzadas, modo "Sala de Exámenes" ilimitado.
*   **Simulacros Profundos:** Simulacros cerrados con la misma estructura y tiempos reales de los exámenes oficiales (ej. Saber 11) y control anti-cheat básico.
*   **Planes de Mejora IA:** Al terminar un simulacro, un análisis detallado diagnostica debilidades y genera recomendaciones de estudio enlazando bundles específicos.

### D. Marketplace de Tutorías Online (B2C-to-C)
*   **Registro de Tutores:** Profesores aplican, establecen tarifas (hora), materias y horarios.
*   **Reservas (Booking):** Estudiantes agendan módulos. La plataforma retiene comisión.
*   **Aula Virtual Integrada:** Videollamada (WebRTC via Trystero/Realtime) + Pizarra Interactiva (tldraw/Excalidraw) + Inyección de preguntas directo del banco de WorldExams al canvas.

## 5. Roadmap

* **Fase 1:** Setup de Astro y renderizado de Markdown.
* **Fase 2:** Integración Supabase Auth y RLS.
* **Fase 3:** Lógica de examen y Edge Function `submit-exam`.
* **Fase 4:** **Implementación API Gateway & API Keys.**
* **Fase 5:** **Dashboard Institucional & Gestión de Organizaciones.**

### 5.1.1 Estado de Ejecución (2026-02-22)

- Se ejecutó auditoría técnica E2E en auth/registro/dashboard/leaderboard.
- Se cerró brecha crítica institucional: funciones `get-organization-students` y `create-group` ya no usan `SUPABASE_SERVICE_ROLE_KEY` para operaciones de usuario.
- Se aplicó migración `20260222173000_phase1_institutional_rls_hardening.sql` para endurecer policies de `organizations`, `organization_students` y `organization_groups`.
- Se añadieron rutas de compatibilidad para release:
  - `/leaderboard` redirige a `/ranking`.
  - `/login` redirige a `/`.
- Validación realizada:
  - `npm run build` exitoso.
  - `npx playwright test tests/e2e-smoke-tag.spec.ts` exitoso.
  - `npx playwright test tests/auth-leaderboard-smoke.spec.ts` exitoso.

### 5.1.2 Riesgos abiertos priorizados

1. Queda pendiente de configuración en Supabase Auth: fijar política `Magic Link only` (desactivar Email/Password). En ese modelo, `auth_leaked_password_protection` no aplica.
2. Persisten warnings de build (chunks grandes y warning CSS puntual) que no bloquean release pero afectan mantenibilidad.

### 5.1.3 Cierre de remediación (2026-02-22, continuación)

- Se aplicó `20260222190000_phase2_security_advisor_remediation.sql`:
  - `organizations` ahora exige `owner_user_id = auth.uid()` para INSERT.
  - `institution_members` quedó con políticas RLS explícitas.
  - `leaderboard_global` quedó con `security_invoker=true`.
- Se corrigió inconsistencia de normalización de asignaturas en packs:
  - `socialesyciudadanas` ahora se canoniza a `sociales_y_ciudadanas`.
- Validación posterior:
  - `npm run build` exitoso.
  - `tests/e2e-smoke-tag.spec.ts` exitoso.
  - `tests/auth-leaderboard-smoke.spec.ts` exitoso.

### 5.1.4 Cierre de remediación (2026-02-22, fase 3)

- Se aplicó `20260222194000_phase3_party_rls_search_path_hardening.sql`:
  - Endurecimiento de policies RLS en `party_sessions` y `party_players` (sin romper flujo guest).
  - Remediación de `search_path` mutable en funciones auditadas.
- Resultado de `Supabase Security Advisors`:
  - Se eliminaron hallazgos de RLS permisiva en Party y de funciones con `search_path` mutable.
- Permanece únicamente warning de Auth (`auth_leaked_password_protection`), esperado mientras el advisor evalúa passwords aunque el producto opere passwordless.

---

## 5.1 Party Mode (Aula Virtual Multiplayer)

Objetivo: permitir sesiones en tiempo real (host + invitados) con configuración **autoritativa del host** y sincronización robusta.

### Arquitectura Híbrida (P2P First + Fallback)

1. **Capa Primaria (P2P):**
    * **Librería:** Trystero (WebRTC serverless).
    * **Señalización:** Supabase Realtime (vía `trystero/supabase`).
    * **Topología:** Estrella (Host central).
    * **Soft Cap:** Máximo 30 conexiones P2P por Host para proteger CPU.
    * **Ventaja:** Latencia mínima (<50ms), costo $0 en backend.

2. **Capa Secundaria (Fallback):**
    * **Tecnología:** Supabase Realtime Channels (WebSockets).
    * **Uso:** Señalización P2P y fallback automático si P2P falla (redes corporativas/escolares).
    * **Estado:** Fuente de verdad persistente (`party_sessions`).

### Anti-Cheat & Integridad (Focus Tracking)

* **Detección:** `visibilitychange` y `blur` events.
* **Reporte:** Envío inmediato de eventos `FOCUS_LOST` al Host vía P2P.
* **UI Host:** Alertas en tiempo real ("⚠️ Juan perdió el foco").
* **Resultados:** Resumen de integridad en pantalla final (Usuarios concentrados vs distraídos).

### Flujo de Datos

1. **Lobby:** Host genera código -> Guests se unen (P2P handshake).
2. **Config Sync:** Host broadcast `CONFIG_UPDATE` (preguntas, tiempo).
3. **Examen:** Sincronización de reloj y eventos de foco.
4. **Resultados:** Guests envían `EXAM_RESULT` al Host para agregación.

### Guardrails UX

* Unirse solo permite `status=waiting` (si ya inició/finalizó, mostrar mensaje claro).

* Lobby con “✅ Estoy listo” en invitados + contador en host.
* Host no puede iniciar hasta que **todos** estén listos.
* Enlace para compartir: `/?join={partyCode}`.

### Resiliencia

* Indicador de estado Realtime (conectado/reconectando/sin conexión).

* Re-suscripción automática al volver online.

---

## 6. Estrategia de Replicación Multi-País

Este proyecto está diseñado como **plantilla base** para crear bancos de preguntas nacionales.

### Trigger de Replicación

* **Mínimo:** 10,000 preguntas en el banco base (Colombia)

* **Estabilidad:** 3 meses de operación sin bugs críticos

### Países Target (Orden de Prioridad)

| País | Prueba Nacional | Población Estudiantil | Prioridad |
|------|-----------------|----------------------|-----------|
| 🇲🇽 México | ENLACE / PLANEA | 25M+ | Alta |
| 🇦🇷 Argentina | APRENDER | 10M+ | Alta |
| 🇨🇱 Chile | SIMCE | 3M+ | Media |
| 🇵🇪 Perú | ECE | 8M+ | Media |
| 🇪🇨 Ecuador | Ser Bachiller | 4M+ | Media |
| 🇧🇴 Bolivia | PSA | 2M+ | Baja |

### Proceso de Fork por País

1. Fork del repositorio base
2. Renombrar: `saber-[pais]` (ej: `saber-mexico`, `saber-argentina`)
3. Adaptar:
   * Estructura de grados según sistema educativo local
   * Asignaturas según currículo nacional
   * Nombre de la prueba (ICFES → ENLACE, etc.)
4. Migrar estructura de preguntas vacía
5. Reclutar colaboradores locales

### Adaptaciones Necesarias por País

```yaml
# config/country.yaml (ejemplo para México)
country:
  name: México
  code: MX
  exam_name: PLANEA
  grades: [3, 6, 9, 12]  # Diferente a Colombia
  subjects:
    - Español
    - Matemáticas
    - Ciencias
    - Formación Cívica
  currency: MXN
  timezone: America/Mexico_City
```

---

## 8. Estrategia de Contenido Inglés (Global)

### Estado Actual (Enero 2026)

| Métrica | Valor |
|---------|-------|
| **Bundles Totales** | 258 |
| **Preguntas Totales** | ~2,580 (10 preguntas/bundle) |
| **Bundles UNI-ENG (Universales)** | 8 |
| **Bundles CO-ING (Colombia)** | 250 |

### Meta: 500 Bundles por País

**Objetivo:** Crear una base sólida de 500 bundles de inglés por país hispanohablante, donde:
- 100 bundles son **universales** (`UNI-ENG-*`)
- 400 bundles son **país-específicos** (`[COUNTRY]-ING-*`)

### Plan de Expansión Gradual

| Fase | Bundles | Tipo | Timeline | Estado |
|------|---------|------|----------|--------|
| **Fase 1** | 8 | UNI-ENG (A1-B2) | Ene 2026 | ✅ Completado |
| **Fase 2** | 92 | UNI-ENG (Expansión) | Feb 2026 | ⬜ Pendiente |
| **Fase 3** | 150 | CO-ING (Migración) | Mar 2026 | ⬜ Pendiente |
| **Fase 4** | 250 | País-específicos | Q2 2026 | ⬜ Pendiente |

### Distribución por Nivel CEFR

| Nivel | Grados | Bundles Target |
|-------|--------|----------------|
| A1 | 3-5 | 100 |
| A2 | 6-8 | 150 |
| B1 | 9-10 | 150 |
| B2 | 11-12 | 100 |

### Compatibilidad Multi-País

| País | Sistema | Inglés Obligatorio | Bundles Recomendados |
|------|---------|-------------------|---------------------|
| 🇨🇴 Colombia | ICFES | Grado 11 (B1) | UNI-ENG + CO-ING |
| 🇲🇽 México | EXANI | Preparatoria | UNI-ENG + MX-ING |
| 🇨🇱 Chile | PAES | IV° Medio | UNI-ENG + CL-ING |
| 🇦🇷 Argentina | - | Secundaria | UNI-ENG + AR-ING |

### Referencia Técnica

- **Formato:** Protocol v3.0-GLOBAL

### 8.1 Mejoras Técnicas Q1 2026

Se han implementado mejoras críticas para potenciar la pedagogía y el seguimiento del aprendizaje de idiomas:

- **Extracción Automática de Metadatos:** El `questionParser.ts` ahora detecta y extrae la "Parte" del examen (ej: Parte 1 - Vocabulario) y el nivel CEFR directamente de los bundles.
- **Visualización con Badges:** La interfaz de resultados (`ResultsView.svelte`) ahora muestra badges visuales para cada pregunta, indicando su parte y nivel.
- **Seguimiento de Progreso (Memory Tracking):** Se ha habilitado el componente `MemoryStatus` para rastrear preguntas vistas y dominadas a largo plazo.
- **NotebookLM Integration:** Reforzada la generación de planes de estudio personalizados exportables para tutores de IA.
- **Verificación E2E:** Implementado suite de pruebas en Playwright para asegurar la integridad del flujo de diagnóstico de inglés.


---

## 7. Credenciales y Configuración Sensible

### Supabase (Colombia - Producción)

* Project ID: `tzmrgvtptdtsjcugwqyq`

* Dashboard: <https://supabase.com/dashboard/project/tzmrgvtptdtsjcugwqyq>

### Telegram Bot

* Bot: @saberparatodoscol_bot

* Webhook URL: <https://tzmrgvtptdtsjcugwqyq.supabase.co/functions/v1/telegram-bot>

### Variables de Entorno Requeridas

```bash
# .env.local (NUNCA commitear)
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=  # 🚫 Nunca usar en frontend/cliente
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
FUNCTION_SECRET=
```

---

## 8. Dominio de Producción

| Plataforma | URL | Hosting |
|------------|-----|---------|
| 🇨🇴 **SaberParaTodos** | **https://saberparatodos.space** | Cloudflare Pages |

**Comando de Deploy:**
```bash
cd saberparatodos
npm run build && npx wrangler pages deploy dist --project-name=saberparatodos
```

---

## 9. Avance Producción de Contenido (Grados 10°-11°)

Se ha completado la generación masiva de contenido base (Protocol v3.0) para fortalecer el banco de `saber-co`.

### Hitos Recientes (Enero 2026)
*   **Grado 11:** 100% Cobertura (Matemáticas, Lectura, Naturales, Sociales, Inglés).
*   **Grado 10:**
    *   ✅ Matemáticas (400 preguntas)
    *   ✅ Naturales (400 preguntas: Química/Física)
    *   ✅ Sociales (400 preguntas: Historia/Política)

### Producción de Contenido: Grados 3°-5° (Febrero 2026)
*   **Grado 3:** ✅ 100% Cobertura (Matemáticas, Ciencias, Sociales — Protocol v3.0)
*   **Grado 4:** ✅ 100% Cobertura (Matemáticas, Ciencias, Sociales — Protocol v3.0)
*   **Grado 5:** ✅ 100% Cobertura (Matemáticas, Ciencias, Sociales — Protocol v3.0)

### Producción de Contenido: Grados 6°-8° (En Progreso — Asignado a Jules)

> **Agente:** Jules (AI Coding Agent)
> **Protocolo:** v3.0 (10 preguntas/bundle, dificultad 1-5)
> **Meta:** 144 bundles = 1,440 preguntas nuevas

| Grado | Mate | CN | Soc | Total | Estado |
|:-----:|:----:|:--:|:---:|:-----:|:------:|
| **6°** | 16 | 16 | 16 | 48 | ⬜ Pendiente |
| **7°** | 16 | 16 | 16 | 48 | ⬜ Pendiente |
| **8°** | 16 | 16 | 16 | 48 | ⬜ Pendiente |

**Estructura de archivos:**
```
src/content/questions/colombia/[asignatura]/grado-[N]/[tema]/
  CO-[SUBJ]-[N]-[tema]-001-v3-bundle.md
```

---

## 10. Sistema Institucional (SaaS B2B) — EN DESARROLLO

### Estado: ✅ Beta (Febrero 2026)

El sistema institucional permite a colegios y academias gestionar estudiantes y grupos con seguimiento de progreso.

### Componentes Implementados

| Componente | Descripción | Estado |
|------------|-------------|--------|
| **Tabla `colleges`** | 50,000+ colegios de Colombia (Datos Abiertos) | ✅ |
| **Tabla `organization_students`** | Estudiantes por organización | ✅ |
| **Tabla `organization_groups`** | Grupos/Grados por organización | ✅ |
| **Edge Function `get-colleges`** | Búsqueda de colegios por nombre | ✅ |
| **Edge Function `get-organization-students`** | Lista estudiantes por grupo | ✅ |
| **Edge Function `create-group`** | Crear grupos nuevos | ✅ |
| **Frontend Register** | Selector de colegio en registro | ✅ |

### Schema SQL (Existente & Extensiones)

```sql
-- Colleges (imported from Datos Abiertos Colombia)
CREATE TABLE colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo_dane VARCHAR(20) UNIQUE,
  nombre VARCHAR(255),
  departamento VARCHAR(100),
  municipio VARCHAR(100),
  naturaleza VARCHAR(50),
  zona VARCHAR(20)
);

-- Extensiones de la Organizacion para Pagos
-- (Se asume tabla organizations existente)
ALTER TABLE organizations
ADD COLUMN plan_type VARCHAR(50) DEFAULT 'free', -- 'free', 'micro', 'pyme', 'macro', 'enterprise'
ADD COLUMN max_students INT DEFAULT 0,
ADD COLUMN subscription_status VARCHAR(50) DEFAULT 'inactive',
ADD COLUMN stripe_customer_id VARCHAR(255);

-- Organization Students (Cuentas Vinculadas)
CREATE TABLE organization_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES auth.users(id), -- Vinculación con cuenta real del estudiante
  student_name VARCHAR(255),
  email VARCHAR(255),
  grade_level INTEGER,
  group_id UUID REFERENCES organization_groups(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Organization Groups
CREATE TABLE organization_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  name VARCHAR(100), -- ej. '11-A', 'Sabatino'
  grade_level INTEGER,
  invite_code VARCHAR(20) UNIQUE, -- Código para self-join
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Archivos Clave

| Archivo | Descripción |
|---------|-------------|
| `we_populate_colleges.py` | Script para importar CSV de colegios |
| `register.astro` | Página de registro con selector de colegio |
| `supabase/functions/get-colleges/` | Edge Function para búsqueda |
| `supabase/migrations/20260222020000_seed_colleges.sql` | Seed data |

### Próximos Pasos

- [ ] Dashboard institucional para rectores
- [ ] Panel de progreso por estudiante/grupo
- [ ] Integración con exámenes existentes

---

## 11. E2E Testing Suite (Playwright)

### Estado: ✅ Configurado y Ejecutando

Suite de tests end-to-end para garantizar la calidad del producto antes de cada release.

### Configuración

| Config | Valor |
|--------|-------|
| Framework | Playwright |
| Puerto | 4321 |
| Timeout | 120s por test |
| Reporter | list |
| Workers | 1 |

### Tests Incluidos (56 total)

| Test File | Cobertura |
|-----------|-----------|
| `blog-filters.spec.ts` | Filtros de materia, grado, dificultad |
| `e2e-grade3-periods.spec.ts` | Exámenes por periodo grado 3 |
| `e2e-matrix.spec.ts` | Matriz de exámenes |
| `e2e-period-selector.spec.ts` | Selector de periodos |
| `e2e-smoke-tag.spec.ts` | Smoke tests |
| `party-mode.spec.ts` | Modo sala multiplayer |
| `party-results-e2e.spec.ts` | Resultados de sala |
| `period-metrics-e2e.spec.ts` | Métricas por periodo |
| `prod-verification.spec.ts` | Verificación producción |

### Ejecución

```bash
# Todos los tests
npm run test

# Tests específicos
npx playwright test tests/blog-filters.spec.ts

# Con UI
npm run test:ui

#headed (visibles)
npm run test:headed
```

### Coverage Target: 90%

Los tests están en proceso de ejecución y cobertura. Algunos tests requieren ajustes de timeout para completar.


---

## 10. Plan de Expansión (Q1 2026): Meta 100/Materia

**Objetivo:** Alcanzar una cobertura mínima de **100 preguntas por materia y periodo** para todos los grados (3°-11°), asegurando la viabilidad del modo "Por Periodo" sin repetición de preguntas.

### Análisis de Brechas (Feb 14, 2026)

| Grado | Asignatura | P1 | P2 | P3 | P4 | Estado | Acción Requerida |
|-------|------------|----|----|----|----|--------|------------------|
| **3** | Inglés | 500| 0 | 0 | 0 | ⚠️ Mal distribuido | Redistribuir P1 -> P2, P3, P4 |
| **3** | Lectura/Tech | 0 | 0 | 0 | 0 | ❌ Crítico | Crear 400 preguntas (100/periodo) |
| **4-9** | Inglés | 0 | 0 | 0 | 0 | ❌ Crítico | Crear 2,400 preguntas (400/grado) |
| **4-9** | Math/CN/Soc | 40 | 40 | 40 | 40 | ⚠️ Insuficiente | Añadir +60 preguntas/periodo (+240/materia) |
| **10** | Inglés | 0 | 0 | 0 | 0 | ❌ Crítico | Crear 400 preguntas |
| **11** | TODAS | >100| >100| >100| >100| ✅ Óptimo | Mantenimiento |

### Estrategia de Ejecución

#### Paso 1: Redistribución y Limpieza (Inmediato)
*   **Grado 3 Inglés:** Mover preguntas de P1 a otros periodos basándose en temas (Vocabulary -> P1, Grammar -> P2, Reading -> P3/P4).
*   **Asignación de "Unknowns":** Clasificar las ~2,000 preguntas de Inglés que actualmente no tienen periodo asignado.

#### Paso 2: Generación Prioritaria (Inglés 4-10)
*   **Meta:** 400 preguntas por grado (2,800 total).
*   **Enfoque:** Uso de `Question Generator` con prompts ajustados por nivel CEFR (A1 para G4-5, A2 para G6-8, B1 para G9-10).

#### Paso 3: Relleno de Brechas (Math/CN/Soc 4-9)
*   **Meta:** +60 preguntas por periodo (GAP actual: 240 por materia/grado).
*   **Total a generar:** ~4,320 preguntas (6 grados * 3 materias * 240 preguntas).
*   **Método:** Automatización masiva por "Topic Folder" existente.

---

## 11. Plan de Salida y Lanzamiento (Auth/Registro/Dashboard/Leaderboard) — 2026-02-22

### Estado real de la plataforma (cierre de sesión actual)

**Completado:**
- Flujo base de login/registro funcional.
- Endurecimiento de `submit-exam` con token de usuario válido.
- Unificación del payload de persistencia en resultados (`score/max_score/duration/mode/exam_id/metadata`).
- Correcciones de onboarding institucional (`profiles.school_id`) y guardas de acceso de dashboard.
- Pipeline de leaderboard migrado a Edge Function.
- Migración RLS institucional aplicada en Supabase producción.
- Redeploy de `submit-exam` en Supabase producción con cambios de hardening.

**Riesgos abiertos:**
- Inconsistencia de modelo de score entre componentes.
- Cobertura E2E insuficiente en auth institucional y leaderboard end-to-end.
- Falta observabilidad mínima para incidentes de funciones edge en release.

### Plan de release por fases (ejecutable)

1. **Fase 0 — Hardening (Día 1)**
   - Cerrar pendientes de schema/policies.
   - Validar rutas: `/login`, `/register`, `/dashboard`, `/leaderboard`.
   - Agregar/ajustar E2E críticos de autenticación y ranking.

2. **Fase 1 — Staging Controlado (Día 2)**
   - Pruebas con 2 perfiles institucionales y 3 estudiantes.
   - Verificar guardas RBAC + envío de resultados + leaderboard.
   - Confirmar rollback táctico (revert migration + redeploy function previo).

3. **Fase 2 — Producción Progresiva (Día 3)**
   - Activación por cohortes.
   - Monitoreo activo de errores de edge functions y auth events.
   - Congelar cambios no críticos durante ventana de despliegue.

4. **Fase 3 — Post-Launch (24h)**
   - Auditoría de logs, tasa de éxito de login y persistencia de resultados.
   - Hotfixes solo para incidentes P0/P1.
   - Cierre con informe técnico y backlog residual priorizado.

### Handoff para próximo agente/sesión

- **Repositorio foco:** `E:\scripts-python\worldexams\saberparatodos`
- **Supabase proyecto:** `tzmrgvtptdtsjcugwqyq`
- **Migración reciente:** `20260222140000_phase0_secure_institutional_rls.sql`
- **Funciones edge activas:** `submit-exam`, `submit-leaderboard-score`

### Integración de skill externo (`claude-seo`)

Objetivo: usar el skill para optimización de contenido y discoverability sin romper seguridad/auth.

Secuencia recomendada:
1. Instalar skill desde `https://github.com/AgriciDaniel/claude-seo`.
   - Estado actual: instalado (`seo-plan`, `seo-technical`, `seo-content`).
2. Ejecutar auditoría SEO técnica en rutas públicas y contenido markdown.
3. Mantener fuera de alcance del skill: migraciones SQL, políticas RLS, secrets y auth backend.
4. Registrar cambios SEO en backlog separado para no mezclar con hotfixes de plataforma.

### Continuidad operativa (siguiente sesión)

Prioridad técnica:
1. Cerrar brechas E2E de autenticación e institucional.
2. Validar consistencia end-to-end del leaderboard.
3. Completar auditoría RLS institucional con evidencia SQL.
4. Ejecutar afinaciones SEO técnicas y de contenido con skills instalados.

Definición de terminado para esta fase:
- `npm run build` en verde.
- Smoke test principal en verde.
- Sin regresión de login/registro/onboarding/dashboard.
- Documentación (`TASK.md`, `PLANNING.md`) actualizada con pendientes reales.

Prompt corto recomendado para próximo agente:

```text
Continúa desde TASK.md y PLANNING.md (2026-02-22) en E:\scripts-python\worldexams.
Prioriza hardening y afinaciones de auth/registro/dashboard/leaderboard.
Usa Guardian+Architect para seguridad y RLS; usa skills seo-technical, seo-plan y seo-content solo en SEO.
Implementa fixes pequeños, valida build + e2e smoke, despliega funciones/migraciones necesarias con Supabase MCP/CLI y deja evidencia en la documentación de handoff.
```



## 12. Update de ejecucion (2026-02-22, continuidad)

### Resultado de la auditoria tecnica (Guardian + Architect)

**Rutas auditadas:** `/login`, `/register`, `/dashboard`, `/leaderboard`
- `/login`: alias activo hacia `/`.
- `/register`: formulario y flujo institucional disponibles.
- `/dashboard`: mantiene gating institucional (sin membresia redirige/limita acceso).
- `/leaderboard`: alias activo hacia `/ranking`.

**Edge functions auditadas:** `submit-exam`, `submit-leaderboard-score`, `get-organization-students`, `create-group`
- Hardening confirmado en `get-organization-students` y `create-group` (JWT obligatorio, sin service_role, controles de membresia/rol).
- `submit-exam` y `submit-leaderboard-score` operativas en flujo E2E validado.

**RLS y seguridad DB (migraciones aplicadas):**
- `20260222173000_phase1_institutional_rls_hardening.sql`
- `20260222190000_phase2_security_advisor_remediation.sql`
- `20260222194000_phase3_party_rls_search_path_hardening.sql`
- Estado advisor security: solo queda `auth_leaked_password_protection` (no bloqueante bajo política Magic Link only).
- Verificación operacional (2026-02-23): `SELECT` por membresía confirmado en `pg_policies` para `organizations`, `organization_members`, `organization_students` y `organization_groups`.

### Evidencia de validacion

- `npm run build` -> OK
- `npx playwright test tests/e2e-smoke-tag.spec.ts` -> OK
- `npx playwright test tests/auth-leaderboard-smoke.spec.ts` -> OK

### Riesgos abiertos

1. Confirmar en Supabase Auth `Magic Link only` (Email OTP activo y Email/Password deshabilitado) y registrar evidencia de configuración.
2. Warning de minificacion CSS (`Expected identifier but found "-"`) aun presente, no bloqueante; requiere trazado de fuente para dejar build totalmente limpio.

### Proximos pasos priorizados (siguiente sesion)

1. Validar en entorno Supabase la política `Magic Link only` y marcar `auth_leaked_password_protection` como no aplicable en el contexto actual.
2. Aislar y corregir el warning CSS de minify (sin introducir cambios funcionales de UI).
3. Mantener smoke de release (`build + e2e-smoke-tag + auth-leaderboard-smoke`) como gate minimo de despliegue.

## 13. Update continuidad (Magic Link only + estabilidad E2E)

### Cambios aplicados

1. Auth passwordless consistente:
- `Login.svelte` e `InstitutionalLogin.svelte` usan `shouldCreateUser: false` en login.
- Registro mantiene `signInWithOtp` como unico flujo de alta.

2. Robustez de rutas auditadas:
- `register.astro`: formulario renderizado en SSR para no depender de hidratacion.
- `dashboard.astro`: redirect server-side a `/instituciones` cuando no hay cookie de auth.

3. Resiliencia tecnica:
- `supabase.ts`: fallback controlado cuando faltan env PUBLIC, evitando romper scripts cliente.
- `playwright.config.ts`: limpieza de `node_modules/.vite` y reinicio limpio del webServer para evitar `Outdated Optimize Dep`.

### Resultado de validacion final

- `npm run build` -> OK
- `tests/e2e-smoke-tag.spec.ts` -> OK
- `tests/auth-leaderboard-smoke.spec.ts` -> OK

### Riesgo vigente

1. Warning de minificacion CSS (`Expected identifier but found "-"`) persiste como no bloqueante.
2. Advisory `auth_leaked_password_protection` se mantiene no aplicable bajo politica confirmada de producto: Magic Link only (sin Email/Password).

## 14. Update continuidad (2026-02-23, release hardening)

### Hallazgo y corrección aplicada

- Se detectó regresión en `src/lib/api-service.ts` durante smoke E2E:
  - Error de hidratación por exports faltantes (`fetchQuestions`, `fetchBulkQuestions`, `fetchAllQuestionsForGrade`, `getAvailableSubjects`).
- Corrección aplicada:
  - Restauración de implementación estable de `api-service.ts`.
  - Conservación del fix de compatibilidad de subject keys (`socialesyciudadanas` canonizado a `sociales_y_ciudadanas`).

### Validación post-fix

- `npm run build` -> OK
- `npx playwright test tests/e2e-smoke-tag.spec.ts tests/auth-leaderboard-smoke.spec.ts` -> 4/4 OK

### Estado actual de riesgo

1. Security advisor: solo permanece `auth_leaked_password_protection` (WARN), pendiente de cierre operativo al confirmar `Magic Link only` en configuración Auth de Supabase.
2. Warning de minificación CSS (`Expected identifier but found "-"`) se mantiene no bloqueante; requiere aislamiento adicional para limpieza total del build.
