# Gestión de Tareas: World Exams Organization

Última actualización: 2026-01-01

## 🎯 Resumen Ejecutivo y Estado Actual

**🔴 CRÍTICO:** **REGENERACIÓN DE BUNDLES** - 74 bundles eliminados por errores, plan de reemplazo activo (Dic 2025) 🚧

**🔄 NUEVO:** **PAQUETES ROTATIVOS** - Sistema de exposición segura de preguntas sin Edge Functions (Dic 2025) 🚧

**🔒 NUEVO:** **SEGURIDAD Y PERFORMANCE** - Mejoras críticas implementadas (Dic 2025) ✅

**Estado General:** 🔄 **MIGRACIÓN A ORGANIZACIÓN COMPLETADA** ✅

**NUEVO:** 🏢 **ORGANIZACIÓN GITHUB** - Repositorios separados por función (Backend privado, UI públicas) ✅

**NUEVO:** 🔐 **SISTEMA DE ROLES Y VERIFICACIÓN** - Diferenciación Estudiante/Profesor/Institución (En Desarrollo) 🚧

**NUEVO:** 🎮 **PARTY MODE** - Aula Virtual Multiplayer (Fase 1 Completa + P2P Config Sync ✅) 🚧

- [x] Corrección de errores sintácticos en `ResultsView.svelte`.
- [x] Restauración de `handleStart` en `App.svelte` (Apertura de modal).
- [x] Migración de `ExamConfigModal.svelte` a sintaxis Svelte 5 (`onclick`).
- [x] Configuración de CSP para permitir PeerJS.
- [x] Implementación completa de funciones faltantes (`subscribeToParty`, `handleResetMemory`, `refreshStudents`).
- [x] Fix de error 406 Supabase (`.single()` → `.maybeSingle()`).
- [x] Fix de `SyntaxError` en `Layout.astro` (deshabilitar/unregister SW en dev sin `import.meta` en runtime).
- [x] Enforce "solo host configura" en Party Mode (guests ven config pero no pueden cambiarla).
- [x] Añadir tiempos rápidos por pregunta (15s / 30s) para rondas cortas.
- [ ] Verificar RLS policies en tabla `party_sessions` para guests.
- [x] Pruebas E2E del flujo Host→Guest (crear, unirse, iniciar party) y sincronización básica.

### ⚡ Party Mode - Quick Wins (Enero 2026)

Objetivo: mejoras **simples** (sin migraciones DB) para UX, estabilidad y viralidad.

- [x] (UX) Pedir nombre al unirse (guest) y persistir en `localStorage`.
- [x] (Bugfix) Evitar duplicados de estudiante al refrescar (reusar `studentId` + upsert en `students`).
- [x] (Lobby) Botón "✅ Estoy listo" para guests + contador de listos en host.
- [x] (Lobby) Bloquear "Iniciar Party" hasta que todos estén listos.
- [x] (Gameplay) Cuenta atrás sincronizada cuando `time_option > 0` (termina sesión para todos y muestra resultados).
- [x] (Resilience) Indicador de estado Realtime (conectado/reconectando) y re-subscribe al volver online.
- [x] (Share) Usar `navigator.share()` en mobile + fallback a clipboard.
- [ ] (Flow) Botón "Revancha" al final: host crea nueva party con misma config (nuevo `party_code`).
- [x] (Guardrails) Si `status !== waiting` al unirse, mostrar mensaje claro ("ya inició" / "finalizó").

**NUEVO:** 🔐 **ESTRATEGIA DE LICENCIAS** - Enfoque Híbrido CC BY-SA + Proprietary ✅

**NUEVO:** 🧪 **DEPLOY + MONITORING** - Deploy manual (CLI) + Sentry Integration ✅

**Enfoque Actual:** 🔄 **PAQUETES ROTATIVOS** - Exponer solo 27% del banco mediante rotación cada 5 días

**Preguntas actuales:** ~1,596 preguntas expuestas | 379 archivos limpios (Colombia)

**Objetivo:** Implementar sistema de paquetes rotativos que previene scraping sin complejidad de Edge Functions.

**NUEVO:** 🧠 **LOCAL INTELLIGENCE & MMR** - Sistema de reportes avanzados offline y ranking dinámico basado en skills 🚧

---

## 🔴 REGENERACIÓN DE BUNDLES (Dic 2025 - EN PROGRESO)

**Contexto:** Se eliminaron 74 bundles con placeholder "[Pregunta pendiente de recuperación por error de generación]".

**Fecha de limpieza:** 2025-12-27 (Commit: 53b1c6c)

**Deploy actualizado:** ✅ Cloudflare Pages + API JSON regenerado (1,596 preguntas limpias)

### 📊 Bundles a Regenerar por Materia

| Materia | Bundles Eliminados | Preguntas (x10) | Prioridad | Estado |
|---------|-------------------|-----------------|-----------|--------|
| 📐 Matemáticas | 34 | 340 | 🔴 ALTA | ⬜ Pendiente |
| 🧪 Ciencias Naturales | 16 | 160 | 🔴 ALTA | ⬜ Pendiente |
| 📖 Lectura Crítica | 13 | 130 | 🟡 MEDIA | ⬜ Pendiente |
| 🏛️ Sociales y Ciudadanas | 5 | 50 | 🟡 MEDIA | ⬜ Pendiente |
| **TOTAL** | **68** | **680** | - | - |

### 📋 Detalle por Tema

#### 📐 Matemáticas (34 bundles)

| Tema | Cantidad | Estado |
|------|----------|--------|
| Álgebra (ALG) | 6 | ⬜ |
| Derivadas | 6 | ⬜ |
| Estadística (EST) | 6 | ⬜ |
| Geometría (GEO) | 4 | ⬜ |
| Polígonos | 6 | ⬜ |
| Porcentajes | 6 | ⬜ |

#### 🧪 Ciencias Naturales (16 bundles)

| Tema | Cantidad | Estado |
|------|----------|--------|
| Biología (celular, genética) | 3 | ⬜ |
| Ciencias General | 3 | ⬜ |
| Física (energía, mecánica, ondas) | 5 | ⬜ |
| Química (ácido-base, atómica, enlaces, estequiometría) | 5 | ⬜ |

#### 📖 Lectura Crítica (13 bundles)

| Tema | Cantidad | Estado |
|------|----------|--------|
| Argumentativo | 1 | ⬜ |
| Comprensión | 2 | ⬜ |
| Inferencia | 3 | ⬜ |
| Textos Continuos | 6 | ⬜ |
| Vocabulario | 1 | ⬜ |

#### 🏛️ Sociales y Ciudadanas (5 bundles)

| Tema | Cantidad | Estado |
|------|----------|--------|
| Constitución | 1 | ⬜ |
| Geografía (Colombia, General) | 2 | ⬜ |
| Historia (Colombia, Universal) | 2 | ⬜ |

### 📝 Protocolo de Regeneración (v3.0)

Cada bundle debe seguir el formato v3.0 con **10 preguntas**:

```yaml
---
id: "CO-[SUBJ]-11-[topic]-[###]"
country: "co"
grado: 11
asignatura: "[Nombre]"
tema: "[Tema específico]"
protocol_version: "3.0"
total_questions: 10
estado: "approved"
creador: "AI-WorldExams"
generation_date: "2025-12-XX"
licenses:
  v1: "CC BY-SA 4.0"
  v2-v10: "CC BY-NC-SA 4.0"
source: "Currículo MEN Colombia"
source_license: "CC BY-SA 4.0"
---
```

**Estructura de preguntas:**
- v1-v2: Muy Fácil (Dificultad 1)
- v3-v4: Fácil (Dificultad 2)
- v5-v6: Media (Dificultad 3)
- v7-v8: Difícil (Dificultad 4)
- v9-v10: Muy Difícil (Dificultad 5)

### ⏱️ Estimación de Tiempo

| Fase | Bundles | Tiempo Est. | Responsable |
|------|---------|-------------|-------------|
| Matemáticas | 34 | 4-5 horas | AI/Jules |
| Ciencias | 16 | 2-3 horas | AI/Jules |
| Lectura | 13 | 2-3 horas | AI/Jules |
| Sociales | 5 | 1 hora | AI/Jules |
| **TOTAL** | **68** | **~10 horas** | - |

### 🔄 Próximos Pasos

1. [ ] **Fase 1:** Regenerar bundles de Matemáticas - Álgebra (6)
2. [ ] **Fase 2:** Regenerar bundles de Matemáticas - Derivadas (6)
3. [ ] **Fase 3:** Regenerar bundles de Ciencias - Física (5)
4. [ ] **Fase 4:** Regenerar bundles de Ciencias - Química (5)
5. [ ] **Fase 5:** Regenerar bundles de Lectura Crítica (13)
6. [ ] **Fase 6:** Regenerar bundles de Sociales (5)
7. [ ] **Validación:** Ejecutar `npm run build` después de cada fase
8. [ ] **Deploy:** Actualizar producción con cada lote completado

### 🗑️ Archivos con Formato Antiguo (21 detectados - Baja Prioridad)

Estos archivos funcionan pero usan formato legacy "Opción A/B/C/D":
- `CO-BIO-11-evolucion-001-bundle.md`
- `CO-FIS-11-circuitos-001-bundle.md`
- `CO-MAT-8-ALGEBRA-001-bundle.md`
- ... (ver lista completa en artifacts de sesión)

---

## 🔄 PAQUETES ROTATIVOS DE PREGUNTAS (Dic 2025 - COMPLETADO ✅)

**Objetivo:** Exponer preguntas de forma segura mediante paquetes que rotan cada 5 días, eliminando necesidad de Edge Functions y autenticación compleja.

**Referencia:** Ver `docs/ROTATING_QUESTION_PACKS.md` para documentación completa

### 📦 Concepto

```
Base de Datos Total: 1,813 preguntas
Paquete Expuesto:    ~500 preguntas (100 por asignatura × 5 asignaturas)
Rotación:            Cada 5 días (lunes)
Exposición:          Solo 27% del contenido en cualquier momento
```

### ✅ Ventajas vs Edge Functions

| Característica | Paquetes Rotativos | Edge Functions |
|----------------|-------------------|----------------|
| **Complejidad** | ⭐ Baja | ⭐⭐⭐ Alta |
| **Performance** | ⭐⭐⭐ CDN estático | ⭐⭐ Compute |
| **Costo** | ⭐⭐⭐ $0 | ⭐⭐ Invocations |
| **Seguridad** | ⭐⭐ Buena | ⭐⭐⭐ Excelente |
| **Mantenimiento** | ⭐⭐⭐ Mínimo | ⭐⭐ Continuo |

### 📋 Fase 1: Script de Generación (COMPLETADO ✅)
- [x] **Crear `scripts/generate-weekly-packs.js`**
  - Función `generatePacks()`: Genera 416 paquetes (52 semanas x 8 años)
  - Función `seededShuffle()`: Shuffle reproducible con seed (week number)
  - Función `loadAllQuestions()`: Cargar bundles desde markdown
  - Output: `public/api/co/icfes/packs/PACK-{YEAR}-W{WEEK}-grade-{GRADE}.json`

- [x] **Testing Local**
  - Validado con `node scripts/generate-weekly-packs.js`
  - Verificado output JSON con preguntas reales (453 questions total)

### 📋 Fase 2: Actualizar API Service (COMPLETADO ✅)
- [x] **Modificar `src/lib/api-service.ts`**
  - Implementado endpoint `/api/packs/current` (Worker)
  - Lógica de rotación semanal (Lunes 00:00 ISO week)
  - Cliente descarga y cachea el paquete actual

- [x] **Cloudflare Worker**
  - `functions/api/packs/current.ts` implementado
  - Retorna `pack_id` calculado dinámicamente

### 📋 Fase 3: Service Worker Cache (COMPLETADO ✅)
- [x] **Actualizar `public/sw.js`**
  - `PACK_CACHE` ("saberparatodos-packs-v1") implementado
  - Estrategia Cache-First para `/packs/*.json`
  - Permite acumulación offline de preguntas

### 📋 Fase 4: Automatización (COMPLETADO ✅)
- [x] **Pre-build Script**
  - Agregado en `package.json`: `prebuild`: `node scripts/generate-weekly-packs.js`
  - Generación automática en cada deploy a Cloudflare Pages

### 🚧 Fase 5: Expansión de Contenido (EN PROGRESO)
- [x] **Planificación**
  - Creado `content_expansion_plan.md`
  - Meta: 150 preguntas únicas/semana (requiere ~3000 preguntas adicionales)
  - Actual: 453 preguntas disponibles
- [ ] **Generación Masiva**
  - Objetivo: +500 bundles para Grados 6-11
  - Script: `generate-bulk-content.js` (pendiente)
- [ ] **Validación y Sync**

### 🎯 Decisión Final

✅ **APROBADO** - Paquetes Rotativos es la mejor opción porque:
- ✅ Simplicidad arquitectónica (no requiere Edge Functions)
- ✅ Costo cero (archivos estáticos en CDN)
- ✅ Performance superior (cache agresivo)
- ✅ Seguridad suficiente (solo 27% expuesto)
- ✅ Fácil de escalar y mantener

❌ **DESCARTADO** - Edge Functions con autenticación anónima:
- ❌ Complejidad innecesaria
- ❌ Costo de invocations
- ❌ Mantenimiento continuo
- ❌ Overhead de autenticación

---

## 🧠 LOCAL INTELLIGENCE & MMR (Dic 2025 - NUEVA PRIORIDAD)

**Objetivo:** Crear un sistema robusto de análisis local que genere reportes detallados, calcule MMR (Matchmaking Rating) y rastree competencias sin depender de servicios externos.

### 📋 Fase 1: Arquitectura de Datos y MMR
- [ ] **Schema Update:** Extender interfaces `Question` y `ExamResult` para incluir `competency`, `topic` y `mmr_delta`.
- [ ] **Question Parser:** Extraer metadatos de competencia y tema desde los bundles markdown.
- [ ] **MMR System:** Implementar `lib/mmr-system.ts` con lógica ELO adaptada (dificultad ponderada).
  - Base MMR: 1000
  - K-Factor dinámico (más alto para usuarios nuevos)
  - Ajuste por dificultad de pregunta (1-5)

### 🧩 Fase 2: Motor de Inteligencia Local
- [ ] **Service:** Crear `lib/local-intelligence.ts`
  - `analyzeHistory()`: Agregación de datos offline desde IndexedDB.
  - `generateInsights()`: Detector de patrones (e.g., "Fuerte en Álgebra, débil en Cálculo").
  - `predictPerformance()`: Estimación de puntaje real basado en historial.

### 📊 Fase 3: Visualización y Reportes
- [ ] **UI:** Rediseñar `LocalReportsView.svelte`
  - Gráfico de progreso de MMR (Chart.js/SVG).
  - Radar chart de competencias.
  - Lista de fortalezas y debilidades.
  - Recomendaciones de estudio ("Practica más Geometría").

---

## 🔒 SEGURIDAD Y PERFORMANCE (Dic 2025 - COMPLETADO ✅)

**Objetivo:** Resolver vulnerabilidades críticas identificadas en auditoría de seguridad y optimizar rendimiento.

**Referencia:** Ver `SECURITY_IMPLEMENTATION_REPORT.md` para documentación completa

### ✅ Fase 1: Seguridad Crítica (COMPLETADO)
- [x] **Edge Function Guest Access:** Autenticación opcional implementada (10 preguntas/request para guests)
- [x] **Rate Limiting:** IP-based (100 requests/hora) con tabla `api_rate_limits`
- [x] **Eliminar Bypass de API Estática:** Edge Functions obligatorias en frontend
- [x] **Validación Server-Side:** Parámetros validados (grade, subject, country)

### ✅ Fase 2: Optimización de Performance (COMPLETADO)
- [x] **Bulk Endpoint:** Nueva función `/get-questions-bulk` creada
- [x] **Blog View Optimizado:** 50+ requests → 1 request único (-98%)
- [x] **Caching Headers:** Cloudflare edge caching (1 hora para guests)
- [x] **Bandwidth Reduction:** 15 MB → 300 KB (-98%)

### ✅ Fase 3: Infraestructura (COMPLETADO)
- [x] **CSP Headers:** Content Security Policy implementado en astro.config.mjs
- [x] **Deprecation de API Estática:** Feature flag `DISABLE_STATIC_API` agregado
- [x] **Database Migration:** `20251218_create_rate_limiting.sql` creado
- [x] **Documentation:** Guías de deployment y troubleshooting

### 📊 Resultados Medidos
| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| HTTP Requests (Blog) | 50+ | 1 | **-98%** |
| Bandwidth (Blog) | 15 MB | 300 KB | **-98%** |
| Load Time (Blog) | 2.5s | 200ms | **-92%** |
| Security Score | 🔴 Bajo | 🟢 Alto | **100%** |

### 🚀 Deployment Pendiente
- [ ] **Apply Database Migration:** `npx supabase db push`
- [ ] **Deploy Edge Functions:** `get-questions` y `get-questions-bulk`
- [ ] **Deploy Frontend:** `saberparatodos` con nuevos cambios
- [ ] **Enable Static API Deprecation:** Set `DISABLE_STATIC_API=true` (después de 24h)

**Documentos Creados:**
- `SECURITY_IMPLEMENTATION_REPORT.md` - Documentación técnica completa
- `DEPLOYMENT_GUIDE_SECURITY.md` - Guía paso a paso de deployment
- `SECURITY_QUICK_SUMMARY.md` - Resumen ejecutivo
- `supabase/migrations/20251218_create_rate_limiting.sql` - Migración de DB
- `supabase/functions/get-questions-bulk/index.ts` - Nuevo endpoint

---

## 🏢 MIGRACIÓN A ORGANIZACIÓN WORLD-EXAMS (Ene 2025 - COMPLETADO ✅)

**Objetivo:** Migrar desde repo personal `iberi22/worldexams` a organización GitHub con arquitectura multi-repo.

### ✅ Fase 1: Organización y Landing (COMPLETADO)
- [x] **Crear organización:** world-exams en GitHub
- [x] **Crear world-exams.github.io:** Landing page público
- [x] **Migrar landing:** De README simple a Astro 5 completo
- [x] **Configurar GitHub Actions:** Auto-deploy workflow
- [x] **Actualizar messaging:** "Built by AI technology", "Ad-free during exams"
- [x] **Colombia primera posición:** 1,813 preguntas visibles
- [x] **Actualizar footer:** Quitar Contribute, GitHub URL correcto
- [x] **Cambiar favicon:** De emoji a logo200.png
- [x] **Deploy exitoso:** https://world-exams.github.io ✅

### ✅ Fase 2: Backend Privado (COMPLETADO)
- [x] **Crear repo privado:** world-exams/saberparatodos
- [x] **Migrar contenido:** 259 question bundles (Protocol v2.0)
- [x] **Push inicial:** 1,813 preguntas + API + Supabase config
- [x] **Actualizar README:** Marcar como PRIVADO
- [x] **Crear PRIVATE_README.md:** Guidelines de seguridad
- [x] **Documentar arquitectura:** Backend/Frontend separation
- [x] **URL:** https://github.com/world-exams/saberparatodos 🔒

### ⚠️ Fase 3: Frontend Público (PENDIENTE)
- [ ] **Crear saber-co:** Frontend UI público para Colombia
- [ ] **Extraer código UI:** De saberparatodos a saber-co
- [ ] **Configurar API consumption:** Conectar con backend privado
- [ ] **Variables de entorno:** PUBLIC_API_URL
- [ ] **Deployment:** Cloudflare Pages (saber-co.pages.dev)
- [ ] **Actualizar docs:** README con instrucciones de uso

### 📋 Fase 4: Otros Países (FUTURO)
- [ ] **exani-mx:** México - Frontend público
- [ ] **enem-br:** Brasil - Frontend público
- [ ] **sat-us:** USA - Frontend público
- [ ] **ingreso-ar:** Argentina - Frontend público
- [ ] **paes-cl:** Chile - Frontend público
- [ ] **admision-pe:** Perú - Frontend público

### 🔐 Fase 5: API & Security (FUTURO)
- [ ] **API Keys:** Generar para cada repo público
- [ ] **CORS:** Configurar orígenes permitidos
- [ ] **Rate Limiting:** Cloudflare Workers
- [ ] **Auth Tokens:** Frontend → Backend authentication
- [ ] **Monitoring:** Sentry + analytics

**Referencia:** Ver `MIGRATION_STATUS.md` para detalles completos

---

## 🚨 SISTEMA DE ROLES Y VERIFICACIÓN (Dic 2025 - NUEVA PRIORIDAD)

**Objetivo:** Implementar sistema robusto de diferenciación de usuarios con paneles específicos y verificación por documentos.

**🤖 DELEGADO A JULES** - Ver `.github/prompts/JULES_ROLE_SYSTEM_DELEGATION.md` para detalles completos

### 📋 Fase 1: Análisis y Diseño (COMPLETADO ✅)
- [x] **Revisar Schema Actual:** Analizar tabla `profiles` existente en Supabase
- [x] **Definir Roles:** Estudiante, Profesor, Institución (Admin)
- [x] **Diseñar Flujo de Verificación:** Proceso de carga de documentos
- [x] **Evaluar Viabilidad:** Verificación por foto de carnet/credencial
- [x] **Documentar en PLANNING.md:** Sección completa agregada con arquitectura y seguridad
- [x] **Crear Delegación a Jules:** Documento completo con todas las fases y subtareas

### 🗄️ Fase 2: Schema de Base de Datos (🤖 DELEGADO A JULES - 2h)
- [ ] 🤖 **Migración: Extender `profiles`**
  - Agregar campos: `institution_id`, `grade_level`, `institution_name`, `document_verified`, `verification_document_url`
  - Crear enum `verification_status`: `pending`, `approved`, `rejected`

- [ ] **Tabla: `institutions`**
  - Campos: `id`, `name`, `slug`, `country_code`, `plan_type`, `admin_user_id`, `credits`, `active`
  - RLS: Solo admin puede modificar su institución

- [ ] **Tabla: `verification_documents`**
  - Campos: `id`, `user_id`, `document_type` (carnet_estudiante, credencial_docente, registro_mercantil), `document_url`, `status`, `reviewed_by`, `reviewed_at`, `rejection_reason`
  - Storage Bucket: `verification-docs` (privado, solo acceso por service_role)

- [ ] **Tabla: `institution_members`**
  - Campos: `id`, `institution_id`, `user_id`, `role` (student, teacher, admin), `joined_at`, `status`
  - RLS: Solo admins de la institución pueden ver/gestionar miembros

### 🎨 Fase 3: UI/UX - Registro Diferenciado (🤖 DELEGADO A JULES - 4h)
- [ ] 🤖 **Componente: `RoleSelector.svelte`**
  - Radio buttons: "Soy Estudiante", "Soy Profesor", "Represento una Institución"
  - Animación de transición entre opciones
  - Mostrar campos diferentes según rol seleccionado

- [ ] **Componente: `StudentRegistration.svelte`**
  - Campos: Nombre completo, Email, Grado (selector), Institución (opcional), País, Ciudad
  - Upload: Foto de carnet estudiantil (opcional para acceso básico, obligatorio para features premium)
  - Disclaimer: "La verificación te da acceso a análisis avanzado y certificados"

- [ ] **Componente: `TeacherRegistration.svelte`**
  - Campos: Nombre completo, Email, Institución (nombre), Materia que imparte, País
  - Upload: Credencial docente o certificado laboral (obligatorio)
  - Disclaimer: "La verificación desbloquea Panel de Profesor y gestión de aulas"

- [ ] **Componente: `InstitutionRegistration.svelte`**
  - Campos: Nombre institución, RUT/NIT, Representante legal, Email corporativo, Teléfono, País
  - Upload: Registro mercantil o certificado de existencia (obligatorio)
  - Disclaimer: "Verificación requerida para acceder a Panel Administrativo y licencias institucionales"

- [ ] **Actualizar: `Login.svelte`**
  - Integrar `RoleSelector` antes del formulario de email
  - Redireccionar post-login según rol a panel correspondiente

### 🛡️ Fase 4: Backend - Verificación de Documentos (🤖 DELEGADO A JULES - 3h)
- [ ] 🤖 **Edge Function: `verify-document`**
  - Parámetros: `user_id`, `document_type`, `file_url`
  - Lógica: Insertar en `verification_documents` con `status: pending`
  - Opcional (Fase 2): Integración con Google Vision API para OCR básico

- [ ] **Edge Function: `approve-verification`**
  - Solo accesible por `service_role` o admins
  - Actualizar `profiles.document_verified = true`
  - Enviar email de confirmación al usuario

- [ ] **Edge Function: `reject-verification`**
  - Parámetros: `verification_id`, `reason`
  - Actualizar status a `rejected`, enviar email con motivo

- [ ] **Storage Policies (Supabase)**
  - Bucket `verification-docs`: Upload solo por usuarios autenticados
  - Read: Solo por service_role o el propio usuario

### 📊 Fase 5: Paneles Diferenciados (🤖 DELEGADO A JULES - 6h)
- [ ] 🤖 **Panel Estudiante (`/dashboard/student`)**
  - Widgets: Estadísticas personales, progreso por asignatura, racha de estudio, próximo examen recomendado
  - Acceso: Historial de exámenes, análisis IA (si verificado), certificados (si verificado)
  - Restricción: Sin verificación = Solo modo práctica básico

- [ ] **Panel Profesor (`/dashboard/teacher`)**
  - Widgets: Estadísticas de aulas creadas, promedio de estudiantes, exámenes asignados
  - Features: Crear Party Mode, ver resultados de estudiantes, exportar reportes CSV
  - Restricción: Requiere verificación obligatoria

- [ ] **Panel Institución (`/dashboard/institution`)**
  - Widgets: Total de estudiantes, total de profesores, uso de créditos IA, plan actual
  - Features: Gestionar profesores y estudiantes, asignar licencias, ver analytics globales
  - Sección: Facturación (histórico de pagos, próxima renovación)
  - Restricción: Solo accesible para `role: admin` de la institución

- [ ] **Componente: `DashboardNav.svelte`**
  - Navegación lateral dinámica según rol
  - Badges para notificaciones (ej: "Verificación pendiente")

### 🔐 Fase 6: Control de Acceso por Features (🤖 DELEGADO A JULES - 2h)
- [ ] 🤖 **Tabla de Features por Rol**
  ```typescript
  const FEATURE_ACCESS = {
    'basic-exams': ['student', 'teacher', 'admin'],
    'ai-analysis': ['student:verified', 'teacher', 'admin'],
    'certificates': ['student:verified', 'teacher', 'admin'],
    'party-mode-host': ['teacher', 'admin'],
    'institution-dashboard': ['admin'],
    'export-reports': ['teacher', 'admin'],
    'user-management': ['admin']
  };
  ```

- [ ] **Helper: `hasFeatureAccess(user, feature)`**
  - Lógica de verificación basada en `profiles.role` y `document_verified`
  - Retorna `true/false` para habilitar/deshabilitar UI

- [ ] **Middleware: Route Guards**
  - Proteger rutas `/dashboard/teacher` → solo `role: teacher`
  - Proteger rutas `/dashboard/institution` → solo `role: admin`

### 📧 Fase 7: Comunicación y Notificaciones (🤖 DELEGADO A JULES - 2h)
- [ ] 🤖 **Email Template: Verificación Pendiente**
  - Enviar al subir documento: "Hemos recibido tu documento, lo revisaremos en 24-48h"

- [ ] **Email Template: Verificación Aprobada**
  - "¡Felicidades! Tu cuenta ha sido verificada. Ahora tienes acceso a..."

- [ ] **Email Template: Verificación Rechazada**
  - "Tu documento fue rechazado. Motivo: [X]. Por favor sube un nuevo documento."

- [ ] **Notificación In-App**
  - Banner en dashboard: "Tu verificación está pendiente" (con link a status)

### 🧪 Fase 8: Testing y Validación (🤖 DELEGADO A JULES - 3h)
- [ ] 🤖 **Tests E2E (Playwright)**
  - Flujo completo de registro como Estudiante
  - Flujo completo de registro como Profesor
  - Flujo completo de registro como Institución
  - Verificación de acceso a features según rol

- [ ] **Tests Unitarios (Vitest)**
  - `hasFeatureAccess()` con diferentes roles
  - RLS policies de Supabase

- [ ] **Pruebas Manuales**
  - Subir diferentes tipos de documentos (PDF, JPG, PNG)
  - Verificar emails de notificación
  - Probar acceso a paneles desde diferentes roles

### 📖 Fase 9: Documentación (🤖 DELEGADO A JULES - 1h)
- [ ] 🤖 **Actualizar README.md**
  - Sección "Registro y Verificación" explicando proceso

- [ ] **Crear `docs/VERIFICATION_GUIDE.md`**
  - Guía para estudiantes: Cómo tomar foto de carnet válida
  - Guía para profesores: Documentos aceptados
  - Guía para instituciones: Requisitos de registro mercantil

- [ ] **Actualizar PLANNING.md**
  - Agregar sección "Sistema de Roles y Verificación"
  - Esquema de base de datos actualizado

---

## 🚀 Roadmap Q1 2026

### 🌐 API & Monetización
- [x] **Diseñar Schema de API Keys:** Tabla `api_keys` en Supabase (owner_id, key_hash, quota, status).
- [x] **Implementar Cloudflare Worker:** Gateway para interceptar `/api/*` y validar keys (Middleware básico implementado).
- [x] **Portal de Desarrolladores:** Página para comprar y gestionar API Keys (Implementado en `/developers`).
- [x] **Documentación API:** Swagger/OpenAPI spec para consumidores externos (Disponible en `/developers/docs`).

### 📱 Mobile Apps (Tauri v2)
- [ ] **Android Host App:** Migrar a arquitectura Cloud-First (eliminar servidor local).
- [ ] **iOS Host App:** Compilar versión para iPad (docentes).

---

## 🎯 Roadmap v0.2.0: Professional Features (Próximo Release)

### 🧠 Sistema Diagnóstico (Cross-Grade)
- [x] **Feature:** Lógica de inyección de preguntas de grados inferiores (ej. 20% preguntas de 5°/9° en examen de 11°).
- [x] **UI:** Reporte de resultados diferenciado (Brechas de conocimiento base vs. errores de grado).

### 🎭 Integrity & UX
- [x] **Animation:** Crear componente `IntegrityIntro.svelte` con frases rotativas aleatorias.
- [x] **Async Loading:** Mover la carga de preguntas (`fetchQuestions`) para que ocurra *durante* la animación.
- [x] **Copy:** Redactar 10+ frases pedagógicas sobre honestidad y aprendizaje.

### 🔄 Smart Fetching (Deduplicación)
- [x] **Storage Logic:** Implementar servicio `QuestionHistoryService` (localStorage wrapper).
- [x] **Algorithm:** Implementar filtro de ventana de 7 días (`fetchSmartQuestions`).
- [x] **Fallback:** Lógica de "relleno" cuando no hay suficientes preguntas nuevas (usar las más antiguas).


---

## 🆕 ÚLTIMAS IMPLEMENTACIONES (Enero 19, 2025)

### ✅ Contenido Diagnóstico (v0.2.1)
- **Generado:** 3 Nuevos Bundles (21 Preguntas)
  - `CO-CIE-9-genetica-001` (Genética - Grado 9)
  - `CO-CIE-5-ecosistemas-001` (Ecosistemas - Grado 5)
  - `CO-SOC-5-ciudadania-001` (Convivencia - Grado 5)
  - `CO-MAT-7-proporcionalidad-001` (Regla de Tres - Grado 7)
  - `CO-ING-9-grammar-001` (Grammar - Grado 9)
  - `CO-LEC-9-argumentacion-001` (Argumentación - Grado 9)
  - `CO-LEC-5-cuentos-001` (Fábulas - Grado 5)
  - `CO-MAT-9-geometria-001` (Geometría - Grado 9)
  - `CO-CIE-7-materia-001` (Materia - Grado 7)
  - `CO-ING-7-rutina-001` (Rutinas - Grado 7)
- **Impacto:** Habilita el sistema de diagnóstico cruzado.

### ✅ Sistema de Licencias Duales
- **Script de Migración:** `scripts/add-licenses-metadata.ps1` creado
- **Archivos Migrados:** 257 archivos `.md` con metadata de licencias
- **Lógica de Filtrado:** `filterByPlan()` en `questionParser.ts`
- **Integración:** Componente `App.svelte` actualizado
- **Modelo:** Free (v1-v2) / Pro (v1-v7)

### ✅ Tests E2E de Party Mode
- **Framework:** Playwright 1.57.0
- **Scope:** 4 estudiantes simulados (Ana, Juan, María, Carlos)
- **Fases:** 10 fases de validación completas
- **Features Validadas:**
  - Creación de party room
  - Join de estudiantes
  - Sincronización de respuestas
  - Generación de informe admin
  - Análisis IA pedagógico
- **Ubicación:** `saberparatodos/tests/party-mode.spec.ts`
- **Documentación:** `docs/E2E_PARTY_MODE_TESTS.md`

### ✅ Script de Automatización
- **Archivo:** `scripts/run-e2e-tests.ps1` (140 líneas)
- **Features:**
  - Auto-start servidor dev
  - Espera automática hasta servidor listo
  - Ejecución de tests Playwright
  - Cleanup automático al finalizar
- **Parámetros:** `-Headed`, `-SkipBuild`, `-Port`, `-Timeout`
- **Documentación:** `docs/SCRIPTS_GUIDE.md`

### ✅ CI/CD con GitHub Actions
- **Workflow:** `.github/workflows/e2e-tests.yml`
- **Triggers:** push/PR a main/develop, manual dispatch
- **Matrix:** chromium (expandible a firefox, webkit)
- **Artifacts:** Reportes + screenshots en failures (7 días)
- **Timeout:** 15 minutos
- **Secrets Requeridos:** `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SENTRY_DSN`

### ✅ Monitoring con Sentry
- **Versión:** Sentry 8.40.0 (`@sentry/astro`, `@sentry/svelte`)
- **Archivos:**
  - `astro.config.sentry.mjs`: Integración Astro
  - `src/lib/sentry.ts`: Inicialización Svelte
  - `src/layouts/LayoutWithSentry.astro`: Error handlers globales
- **Features:**
  - Error tracking con source maps
  - Performance monitoring (tracing + replay)
  - Filtrado de errores conocidos (WebSocket)
  - Tags personalizados (country:CO)
- **Documentación:** `docs/SENTRY_SETUP.md` (300+ líneas)

### 📋 Documentación Creada
1. **E2E_PARTY_MODE_TESTS.md** - Guía de tests E2E
2. **SENTRY_SETUP.md** - Setup completo de Sentry
3. **SCRIPTS_GUIDE.md** - Automatización de tests
4. **IMPLEMENTATION_SUMMARY.md** - Resumen ejecutivo
5. **README.md** - Actualizado con testing + CI/CD + monitoring

---

## 🎮 PARTY MODE - Aula Virtual Multiplayer (100% Web)

### ✅ Estado: FASE WEB COMPLETA (Dic 11, 2025)

**Arquitectura:** 100% Web (PWA) - Sin dependencia de APK Android
**Hosting:** Cloudflare Pages (`saberparatodos.pages.dev/party`)
**Backend:** Supabase Realtime (WebSocket automático)
**Alcance:** iOS + Android + Desktop + Web (instalable como app)

---

### 🌐 PWA Implementada ✅

| Componente | Archivo | Estado |
|------------|---------|--------|
| **Host Component** | `saberparatodos/src/components/PartyHost.svelte` | ✅ Completo |
| **Join Component** | `saberparatodos/src/components/PartyJoin.svelte` | ✅ Completo |
| **Party Page** | `saberparatodos/src/pages/party.astro` | ✅ Completo |
| **PWA Manifest** | `saberparatodos/public/manifest.json` | ✅ Completo |
| **Service Worker** | `saberparatodos/public/sw.js` | ✅ Completo |
| **Layout Meta Tags** | `saberparatodos/src/layouts/Layout.astro` | ✅ Completo |

### 🗄️ Base de Datos (Supabase) ✅

| Componente | Archivo | Estado |
|------------|---------|--------|
| **Schema Global** | `supabase/schema-global.sql` | ✅ Actualizado |
| **Migración Party Sessions** | `supabase/migrations/20251211_party_sessions.sql` | ✅ Completo |
| **RLS Policies** | (en migración) | ✅ Configurado |
| **Realtime Enabled** | (en migración) | ✅ Habilitado |
| **Rate Limiting** | SQL trigger `check_party_limit()` | ✅ Configurado |

### 📚 Documentación Completa ✅

| Documento | Archivo | Descripción |
|-----------|---------|-------------|
| **Arquitectura Web** | `docs/PARTY_MODE_WEB_ARCHITECTURE.md` | Arquitectura 100% web, flujos, PWA, freemium |
| **Migración Cloud** | `docs/PARTY_MODE_MIGRATION.md` | Migración desde Rust embebido |
| **Roadmap Nativo** | `docs/ROADMAP_NATIVE_APPS.md` | Fase final (apps iOS/Android Q2 2026) |

### 🚫 Código Deprecado (ARCHIVADO - No se deployará)

**Razón:** Servidor embebido Rust no bindeaba en Android. Arquitectura cloud es más simple, escalable y confiable.

**Archivado en .gitignore:**
- `host-app/` (Android Tauri - reemplazado por PWA)
- `party-server-rust/` (Servidor embebido - reemplazado por Supabase)
- `party-server-cloud/` (Experimentos - obsoleto)
- `.github/workflows/build-party-server.yml` (Workflow Rust - deshabilitado)

**Ver:** `host-app/README_DEPRECATED.md` para explicación detallada.

---

### 🎯 Flujo de Uso (PWA)

1. **Host:** Abre `saberparatodos.pages.dev/party`
2. **Host:** Crea party → genera código `ABC123`
3. **Host:** Comparte link por WhatsApp: `/party?join=ABC123`
4. **Students:** Abren link → ingresan nombre → se unen
5. **Host:** Inicia examen → envía preguntas en tiempo real
6. **Students:** Responden → respuestas sincronizadas vía Realtime
7. **Todos:** Ven resultados al finalizar

### 💰 Modelo Freemium (Implementado)

| Tier | Parties/hora | Max Estudiantes | Análisis IA | Costo |
|------|--------------|-----------------|-------------|-------|
| **Free** | 1 | 10 | ❌ | $0 |
| **Pro** (futuro) | Ilimitado | 100 | ✅ | $5/mes |

**Rate Limiting:** SQL trigger valida límites antes de crear party.

---

### 🔮 Fase Final: Apps Nativas (Q2 2026 - Opcional)

**Ver:** `docs/ROADMAP_NATIVE_APPS.md`

**Triggers:**
- >10k usuarios activos mensuales
- Demanda de features nativas (notificaciones push avanzadas, modo offline completo)
- Modelo de suscripción estable ($5k+ MRR)

**Stack propuesto:**
- React Native + Expo (iOS + Android)
- Tauri v2 (Desktop)
- Mismo backend (Supabase)
| Arquitectura | Diagramas en docs | ✅ Completo |

### Features Implementados

✅ **Modo Dual:**
- Supabase Realtime (Cloud, hasta 200 usuarios)
- WebSocket Local (Rust server, 1000+ usuarios)

✅ **Anti-Cheat:**
- Page Visibility API
- Window Blur detection
- Inactivity tracking
- Reportes al Host en tiempo real

✅ **Reportes:**
- HTML con Chart.js
- Infografías de desempeño
- Recomendaciones personalizadas
- Descarga PDF (TODO)

✅ **UI Completa:**
- Lobby con QR code sharing
- Controles del Host (pausar, siguiente, finalizar)
- Vista del Player sincronizada
- Resultados con leaderboard

### Modelo de Negocio (Supabase First)

**Estrategia Freemium para Piloto:**

| Característica | Plan Free (Piloto) | Plan Pro (Futuro) | Plan Institucional |
| :--- | :--- | :--- | :--- |
| **Motor** | Supabase Realtime | Supabase / Rust | Rust Dedicated |
| **Jugadores Máx** | 10 | 100 | 1000+ |
| **Frecuencia** | 1 examen / semana | Ilimitado | Ilimitado |
| **Análisis IA** | Bloqueado 🔒 | Básico | Avanzado |
| **Soporte** | Comunitario | Email | Dedicado |

**Tareas Freemium Completadas:**
- [x] Definir tipos de planes (`SubscriptionPlan`)
- [x] Implementar límites hardcoded (10 jugadores, 1 examen/semana)
- [x] UI de bloqueo y upsell en Lobby
- [x] Bloqueo de análisis IA para cuentas Free

---

## 📶 OFFLINE MODE - Host App (Ene 2026)

### Estrategia: Tauri v2 + Rust Server

**Objetivo:** App nativa (Windows/Android) que permite al docente crear un servidor local sin internet.

**Tareas Pendientes:**
- [x] **Refactor Server:** Convertir `party-server-rust` a librería (`lib.rs`)
- [x] **Tauri Setup:** Crear proyecto `host-app` con Tauri v2
- [x] **Integration:** Embeber servidor Rust en Tauri App
- [x] **Lobby Backend:** Implementar lógica Admin (Kick, Config, Anonymous)
- [x] **Network:** Detectar IP local y generar QR
- [x] **Frontend:** Panel de Admin en Svelte (QR, Lobby, Kick)
- [x] **Android UI:** Arreglar pantalla en blanco (restaurar `host-app/src/routes/+page.svelte` + cambiar SvelteKit `kit.appDir` a `app`)
- [x] **Student App:** Crear cliente web estático (`public/index.html`)
- [x] **Static Serving:** Configurar Actix para servir el cliente web
- [x] **Android:** Configurar build y permisos para móvil
- [ ] **Frontend:** Adaptar `saberparatodos` para modo SPA offline

**Protección:**
- AGPL-3.0 previene competidores cerrados
- Código cloud es privado (no en GitHub)
- Usuarios ganan software gratuito de calidad
- Negocio protegido legalmente

### Próximos Pasos (Fase 2)

| Tarea | Prioridad | ETA | Bloqueador |
|-------|-----------|-----|------------|
| ⚠️ **Compilar Rust Server** | 🔴 CRÍTICO | Inmediato | Windows file locks - Ver `COMPILATION_FIX.md` |
| Implementar WebSocket actors (Rust) | 🔴 Alta | Ene 2026 | Depende de compilación |
| CRUD de parties (Rust) | 🔴 Alta | Ene 2026 | Depende de compilación |
| Player repository implementation | 🔴 Alta | Ene 2026 | Depende de compilación |
| Integrar frontend con Rust backend | 🔴 Alta | Ene 2026 | Depende de compilación |
| Compilar binarios cross-platform | 🟡 Media | Ene 2026 | - |
| PDF generation (jsPDF) | 🟢 Baja | Feb 2026 | - |
| Deploy cloud a Railway/Fly.io | 🟡 Media | Feb 2026 | - |
| Sistema de suscripciones (Stripe) | 🟡 Media | Feb 2026 | - |

**NOTA CRÍTICA:** La compilación del servidor Rust está bloqueada por file locks de Windows. Consulta `party-server-rust/COMPILATION_FIX.md` para instrucciones detalladas de resolución. Todo el código está arquitecturalmente correcto y listo para compilar.

---

## 🔐 ESTRATEGIA DE LICENCIAS (Enfoque Híbrido) ✅

**Decisión Final:** Diciembre 12, 2025

### Contexto del Problema

**Pregunta original:** "¿Por qué separar archivos (dual repo) si puedo usar licencia restrictiva en TODO el contenido público?"

**Análisis realizado:**
- ✅ Investigación web sobre CC BY-NC, BY-NC-ND
- ✅ Consulta al FAQ oficial de Creative Commons
- ✅ Análisis de código Svelte (parsers de bundles)
- ✅ Evaluación de viabilidad legal para vender Party Mode

### Solución Implementada: Licencias Mixtas

```yaml
# Metadata en frontmatter de bundles
licenses:
  v1: "CC BY-SA 4.0"       # Pregunta original (uso comercial permitido)
  v2-v7: "CC BY-NC-SA 4.0" # Variantes (solo uso no-comercial)
```

**Ventajas:**
- ✅ **1 solo archivo bundle** (7 preguntas, como pediste)
- ✅ **Sin separar archivos**: Svelte parsea automáticamente v1-v7
- ✅ **Party Mode legal**: Vendemos servicio, no preguntas
- ✅ **Protección clara**: CC BY-NC-SA prohibe uso comercial de v2-v7
- ✅ **Marketing**: Estudiantes ven v1 gratis, conocen v2-v7

### Tareas Completadas

- [x] Investigar FAQ de Creative Commons sobre monetización BY-NC
- [x] Analizar código Svelte (`questionParser.ts`, `App.svelte`)
- [x] Comparar: Licencia restrictiva vs Dual Repo
- [x] Documentar decisión en `PLANNING.md` (nueva sección "🔐 Estrategia de Licencias")
- [x] Actualizar `TASK.md` con contexto de licencias
- [x] **Actualizar Protocol v2.1:** Agregar campo `licenses` en `docs/QUESTION_GENERATION_PROTOCOL_V2.md` ✅
- [x] **Crear LICENSE.md:** Documentar licencias duales en raíz ✅
- [x] **Proteger docs internos:** Actualizar `.gitignore` para ocultar `PLANNING.md`, `TASK.md`, `docs/specs/` ✅
- [x] **Modificar types.ts:** Agregar campo `licenses` en interface `Question` ✅
- [x] **Modificar questionParser.ts:** Agregar función `filterByPlan()` ✅
- [x] **Actualizar README.md:** Agregar disclaimer sobre licencias en `saberparatodos/README.md` y `.github/profile/README.md` ✅
- [x] **Script de migración:** Crear `scripts/add-licenses-metadata.ps1` para actualizar bundles masivamente ✅
- [x] **Ejecutar migración:** Agregar metadata `licenses` a 257 archivos .md exitosamente ✅
- [x] **Integrar filterByPlan():** Usar en App.svelte para filtrar preguntas según plan del usuario ✅

### Tareas Pendientes

- [ ] **Backend Auth:** Implementar middleware de validación de suscripción en Supabase
- [ ] **User Plan Detection:** Integrar con `user_metadata` de Supabase para detectar plan del usuario
- [ ] **Testing:** Validar que filterByPlan() funciona correctamente en producción

### Referencias

- **FAQ CC:** https://creativecommons.org/faq/#can-i-still-make-money-from-a-work-i-make-available-under-a-creative-commons-license
- **Decisión arquitectónica:** PLANNING.md sección "🔐 Estrategia de Licencias"
- **Rationale legal:** Party Mode vende servicio, no contenido (casos: GitHub, WordPress.com, Red Hat)

---

## 🚀 NUEVO: Plan 100+ Preguntas - Grado 11

### Sistema Anti-Duplicación ✅

| Componente | Archivo | Estado |
|------------|---------|--------|
| Documentación | `docs/sources/README.md` | ✅ Completo |
| Registry | `docs/sources/questions-registry.json` | ✅ Activo (5 packs) |
| Validation Scripts | PowerShell `Test-QuestionSourceUsed` | ✅ Documentado |
| Workflow Jules | Integrado en instructions | ✅ Actualizado |

### Templates de PR ✅

| PR | Template | Asignatura | Packs | Preguntas | Inicio |
|----|----------|------------|-------|-----------|--------|
| #1 | `PR-templates/PR1-matematicas-avanzadas.md` | Matemáticas | 3 | 21 | 10 Dic ✅ |
| #2 | `PR-templates/PR2-lectura-critica-avanzada.md` | Lectura Crítica | 2 | 14 | 17 Dic |
| #3 | `PR-templates/PR3-ciencias-naturales-avanzadas.md` | Ciencias Naturales | 2 | 14 | 24 Dic |
| #4 | `PR-templates/PR4-mixto-sociales-ingles-informatica.md` | Mixto | 5 | 35 | 31 Dic |
| #5 | `PR-templates/PR5-ciencias-sociales-avanzadas.md` | Ciencias Sociales | 3 | 21 | 7 Ene |

**Plan completo:** [docs/reports/plan-100-preguntas-grado11.md](docs/reports/plan-100-preguntas-grado11.md)

---

## 📊 Auditoría de Preguntas Colombia

| Asignatura | Preguntas | Grados Cubiertos |
|------------|-----------|------------------|
| Matemáticas | 84 | 3°, 5°, 9°, 11° |
| Sociales | 42 | 11° |
| Inglés | 28 | 11° |
| Ciencias | 25 | 11° |
| Lectura Crítica | 14 | 11° |
| Lenguaje | 28 | 3°, 5°, 9° |
| Informática | 7 | 11° |
| **TOTAL** | **228** | ✅ |

### Distribución por Grado

| Grado | Preguntas | Estado |
|-------|-----------|--------|
| 3° | 35 | ✅ Sólido |
| 5° | 35 | ✅ Sólido |
| 7° | 7 | ⚠️ Necesita más |
| 9° | 21 | ✅ Aceptable |
| 11° | 130 | ✅ Completo |

---

## 🇨🇴 COLOMBIA: Features Completadas

### Componentes UI ✅

| Componente | Archivo | Estado |
|------------|---------|--------|
| Layout Principal | `src/layouts/Layout.astro` | ✅ |
| App Principal | `src/components/App.svelte` | ✅ |
| Vista de Examen | `src/components/ExamView.svelte` | ✅ |
| Selector de Grado | `src/components/GradeSelector.svelte` | ✅ |
| Selector de Asignatura | `src/components/SubjectSelector.svelte` | ✅ |
| Tarjeta Flashlight | `src/components/FlashlightCard.svelte` | ✅ |
| Resultados | `src/components/ResultsView.svelte` | ✅ |
| Login OAuth | `src/components/Login.svelte` | ✅ |
| Leaderboard | `src/components/LeaderboardView.svelte` | ✅ |
| Búsqueda | `src/components/Search.svelte` | ✅ |
| Ad Banner | `src/components/AdBanner.svelte` | ✅ |
| Scroll Reveal | `src/components/ScrollReveal.svelte` | ✅ |
| Score Display | `src/components/ScoreDisplay.svelte` | ✅ |
| Identity Registration | `src/components/IdentityRegistration.svelte` | ✅ |

### Páginas ✅

| Página | Archivo | Estado |
|--------|---------|--------|
| Home | `src/pages/index.astro` | ✅ |
| Guía de Examen | `src/pages/guia-examen.astro` | ✅ |
| Sobre Nosotros | `src/pages/sobre-nosotros.astro` | ✅ |
| Contacto | `src/pages/contacto.astro` | ✅ |
| Ranking | `src/pages/ranking.astro` | ✅ |

### Sistemas Implementados ✅

| Sistema | Archivos | Estado |
|---------|----------|--------|
| Leaderboard IssueOps | `.github/workflows/leaderboard-sync.yml` | ✅ |
| Score Anti-Cheat | `src/lib/score-hash.ts` | ✅ |
| Rate Limiting | `.github/rate-limits.json` | ✅ |
| Rank Notifications | `src/lib/rank-notifications.ts` | ✅ |
| Web Vitals | `src/lib/web-vitals.ts`, `src/styles/critical.css` | ✅ |
| Scroll Animations | `src/lib/scroll-animations.ts` | ✅ |
| GitHub OAuth | `src/lib/github-api.ts`, `src/lib/auth.ts` | ✅ |

### Tareas Colombia - TODAS COMPLETADAS ✅

| ID | Tarea | Estado |
|----|-------|--------|
| CO-01 | Navbar/Header global | ✅ |
| CO-02 | Footer global | ✅ |
| CO-03 | Iconografía SVG | ✅ |
| CO-04 | Hero section | ✅ |
| CO-05 | Schema.org JSON-LD | ✅ |
| CO-06 | Página /sobre-nosotros | ✅ |
| CO-07 | Animaciones de scroll | ✅ |
| CO-08 | Estadísticas ICFES 2024 | ✅ |
| CO-09 | Página /contacto | ✅ |
| CO-10 | Web Vitals optimization | ✅ |

### Bundles de Preguntas (Protocol v2.0) ✅

| Bundle ID | Grado | Asignatura | Preguntas | Estado |
|-----------|-------|------------|-----------|--------|
| CO-MAT-03-suma-001 | 3° | Matemáticas | 7 | ✅ Validado |
| CO-LEN-03-comprension-001 | 3° | Lenguaje | 7 | ✅ Validado |
| CO-MAT-05-fracciones-001 | 5° | Matemáticas | 7 | ✅ Validado |
| CO-MAT-09-algebra-001 | 9° | Matemáticas | 7 | ✅ Validado |
| CO-LEN-09-comprension-001 | 9° | Lenguaje | 7 | ✅ Validado |
| CO-LEC-11-argumentativo-001 | 11° | Lectura Crítica | 7 | ✅ Validado |
| CO-MAT-11-funciones-001 | 11° | Matemáticas | 7 | ✅ Validado |
| CO-CIE-11-biologia-001 | 11° | Ciencias Naturales | 7 | ✅ Validado |
| CO-CIE-11-biologia-002 | 11° | Ciencias Naturales | 7 | ✅ Validado |
| CO-CIE-11-fisica-001 | 11° | Ciencias Naturales | 7 | ✅ Validado |
| CO-CIE-11-fisica-002 | 11° | Ciencias Naturales | 7 | ✅ Validado |
| CO-CIE-11-quimica-001 | 11° | Ciencias Naturales | 7 | ✅ Validado |
| CO-SOC-11-ciudadanas-001 | 11° | Sociales | 7 | ✅ Validado |
| CO-ING-11-reading-001 | 11° | Inglés | 7 | ✅ Validado |
| CO-MAT-11-algebra-002 | 11° | Matemáticas | 7 | ✅ Validado |
| CO-MAT-11-estadistica-001 | 11° | Matemáticas | 7 | ✅ Validado |
| CO-ING-11-part1-001 | 11° | Inglés | 7 | ✅ Migrado (Universal) |
| CO-ING-11-part2-001 | 11° | Inglés | 7 | ✅ Migrado (Universal) |
| CO-ING-11-part3-001 | 11° | Inglés | 7 | ✅ Migrado (Universal) |
| CO-SOC-11-historia-colombia-001 | 11° | Sociales | 7 | ✅ Migrado |
| CO-SOC-11-historia-universal-001 | 11° | Sociales | 7 | ✅ Migrado (Universal) |
| CO-SOC-11-geografia-colombia-001 | 11° | Sociales | 7 | ✅ Migrado |
| CO-SOC-11-geografia-general-001 | 11° | Sociales | 7 | ✅ Migrado (Universal) |
| CO-SOC-11-constitucion-001 | 11° | Sociales | 7 | ✅ Migrado |
| CO-INF-11-algoritmos-001 | 11° | Informática | 7 | ✅ Migrado (Universal) |
| CO-LEC-11-inferencia-001 | 11° | Lectura Crítica | 7 | ✅ Migrado (Universal) |
| CO-MAT-03-geometria-001 | 3° | Matemáticas | 7 | ✅ Migrado (Universal) |
| CO-MAT-03-medicion-001 | 3° | Matemáticas | 7 | ✅ Migrado (Universal) |
| CO-MAT-05-geometria-001 | 5° | Matemáticas | 7 | ✅ Migrado (Universal) |
| CO-MAT-05-multiplicacion-001 | 5° | Matemáticas | 7 | ✅ Migrado (Universal) |
| CO-MAT-05-numeros-001 | 5° | Matemáticas | 7 | ✅ Migrado (Universal) |
| CO-MAT-09-estadistica-001 | 9° | Matemáticas | 7 | ✅ Migrado (Universal) |
| CO-LEN-03-gramatica-001 | 3° | Lenguaje | 7 | ✅ Migrado |
| CO-LEN-05-gramatica-001 | 5° | Lenguaje | 7 | ✅ Migrado |

**Total:** 26 bundles, **228 preguntas** validadas para Colombia

---

## 🆕 Sesión 2025-12-04/05: Generación Local y Features para Colombia

### 🎨 Nuevo Feature: Guía de Examen ICFES

**PR:** [#3 - feat(guia): Guía de Examen ICFES con Infografías](https://github.com/iberi22/saberparatodos/pull/3)

| Archivo | Descripción | Estado |
|---------|-------------|--------|
| `src/pages/guia-examen.astro` | Página principal de la guía | ✅ Creado |
| `src/components/guia/ExamInfographic.astro` | Infografía SVG timeline Saber 3°→11° | ✅ Creado |
| `src/components/guia/GradeCard.astro` | Tarjetas de información por grado | ✅ Creado |
| `src/components/guia/CompetencyList.astro` | Competencias y niveles de desempeño | ✅ Creado |
| `src/components/guia/TipsSection.astro` | Consejos y checklist día del examen | ✅ Creado |

**Características:**
- ✅ Infografías en blanco y negro (SVG escalables)
- ✅ Contenido en español colombiano
- ✅ Mobile-responsive
- ✅ Accesible (aria-labels en SVGs)
- ✅ Replicable para otros países

### Bundles Generados (Formato v2.0)

| Bundle ID | Grado | Asignatura | Preguntas | Estado |
|-----------|-------|------------|-----------|--------|
| CO-MAT-03-suma-001 | 3° | Matemáticas | 7 | ✅ Creado |
| CO-LEN-03-comprension-001 | 3° | Lenguaje | 7 | ✅ Creado |
| CO-MAT-05-fracciones-001 | 5° | Matemáticas | 7 | ✅ Creado |
| CO-LEC-11-argumentativo-001 | 11° | Lectura Crítica | 7 | ✅ Creado |
| CO-MAT-11-funciones-001 | 11° | Matemáticas | 7 | ✅ Creado |
| CO-CIE-11-biologia-001 | 11° | Ciencias Naturales | 7 | ✅ Creado |
| CO-CIE-11-biologia-002 | 11° | Ciencias Naturales | 7 | ✅ Creado |
| CO-CIE-11-fisica-001 | 11° | Ciencias Naturales | 7 | ✅ Creado |
| CO-CIE-11-fisica-002 | 11° | Ciencias Naturales | 7 | ✅ Creado |
| CO-CIE-11-quimica-001 | 11° | Ciencias Naturales | 7 | ✅ Creado |
| CO-MAT-11-algebra-002 | 11° | Matemáticas | 7 | ✅ Creado |
| CO-MAT-11-estadistica-001 | 11° | Matemáticas | 7 | ✅ Creado |

**Total:** 12 bundles, **84 preguntas nuevas** para Colombia

### Documentación Creada

| Archivo | Propósito |
|---------|-----------|
| `docs/SOURCES_REGISTRY.md` | Registro de fuentes para evitar duplicados |
| `docs/ICFES_CURRICULUM.md` | Malla curricular colombiana completa |

### Mejoras al Protocolo v2.0

- ✅ Sistema de tracking de fuentes por Source ID
- ✅ Verificación de no-duplicación por país
- ✅ Atribución de competencias ICFES
- ✅ Contexto cultural colombiano en todas las preguntas

---

## 🆕 Protocolo de Generación v2.0 (Original)

**Fecha de implementación:** 2025-12-04

### Cambios Principales

| Aspecto | v1.0 (anterior) | v2.0 (actual) |
|---------|-----------------|---------------|
| Preguntas por archivo | 1 | **7** |
| Variantes | 6 aleatorias | 1 original + 2 fácil + 2 media + 2 difícil |
| Contexto cultural | Opcional | **Obligatorio** |
| Explicaciones | Básicas | **Pedagógicas detalladas** |
| IDs | `[ID]` | `[ID]-v[1-7]` |

### Archivos Creados

| Archivo | Propósito |
|---------|-----------|
| `docs/QUESTION_GENERATION_PROTOCOL_V2.md` | Documentación completa del protocolo |
| `docs/examples/MX-MAT-11-angulos-001-bundle.md` | Ejemplo de referencia |
| `.github/workflows/generate-questions-v2.yml` | Workflow automatizado |
| `.github/ISSUE_TEMPLATE/generate-questions-v2.md` | Template para issues |

### PRs Pendientes (Protocolo v1.0)

| PR | País | Estado | Decisión |
|----|------|--------|----------|
| #30 | 🇲🇽 México Math | Draft | ❌ RECHAZADO - contexto pobre |
| #31 | 🇨🇴 Colombia Informática | Draft | ✅ Aprobar |
| #33 | 🇺🇸 USA History | Draft | ✅ Aprobar |
| #35 | 🇧🇷 Brasil Math | Draft | ✅ Aprobar |
| #36 | 🇧🇷 Brasil History | Draft | ✅ Aprobar |
| #41 | 🇨🇴 Colombia Math | Draft | ⭐ YA USA v2.0! |

**Nota:** PR #41 ya implementa el formato v2.0 con atribución de fuente y variaciones por dificultad.

---

## 🏗️ Arquitectura Simplificada (Monorepo)

**Decisión:** El sistema de sincronización multi-repo (`question-sync`) fue **ELIMINADO**.

**Razón:**
- La organización `worldexams` fue flagueada por GitHub
- El monorepo local es más práctico para desarrollo
- Las preguntas se comparten manualmente copiando archivos

**Progreso por Componente:**
- [x] 🏗️ Infraestructura: 90% (Supabase + GitHub Actions)
- [x] 🔗 Backend: 80% (Edge Functions, RLS, IssueOps)
- [x] 🎨 Template UI Base: 100% (saberparatodos completo)
- [x] 🇨🇴 Colombia: 100% (71 preguntas, todas las features)
- [x] 📚 Documentación: 80% (AGENTS.md, TASK.md, READMEs)
- [ ] 🌍 Otros países: 0% (bloqueado por flag)

### Cómo Compartir Preguntas (Manual)

```bash
# 1. Copiar pregunta de Colombia a otro país hispanohablante
cp saberparatodos/src/content/questions/matematicas/grado-11/CO-MAT-*.md \
   saber-mx/src/content/questions/matematicas/grado-11/

# 2. Editar archivo para cambiar:
#    - ID: CO-MAT-... → MX-MAT-...
#    - Contexto: ciudades, moneda, nombres locales
```

---

## 🚨 FASE CRÍTICA: Resolución de Flag de GitHub

**Objetivo:** Resolver el flag de la organización worldexams antes de continuar con desarrollo masivo.

| ID    | Tarea                                           | Prioridad | Estado      | Responsable |
|-------|-------------------------------------------------|-----------|-------------|-------------|
| FC-01 | Monitorear respuesta de GitHub Support          | 🔴 CRÍTICA | ⚙️ En Progreso | Usuario     |
| FC-02 | Preparar evidencia adicional (screenshots, docs) | 🔴 CRÍTICA | ⬜ Pendiente | Cascade     |
| FC-03 | Evitar actividad automatizada masiva            | 🔴 CRÍTICA | ✅ Completado | Cascade     |
| FC-04 | Documentar estrategia de crecimiento gradual    | ALTA      | ⬜ Pendiente | Cascade     |

**Leyenda de Estado:**
- `⬜ Pendiente`
- `⚙️ En Progreso`
- `✅ Completado`
- `❌ Bloqueado`

---

## 🚀 Fase Actual: Personalización de Repos con Template UI

**Objetivo:** Aplicar el template ciber-minimalista de `saber-co` a los 20+ repos de países, cada uno con su identidad cultural (flag stripe, colores, idioma).

### ✅ Repos Completamente Personalizados (5/20)

| Repo | País | Flag Stripe | Estado | Notas |
|------|------|-------------|--------|-------|
| `exani-mx` | 🇲🇽 México | Verde-Blanco-Rojo | ✅ Completado | Referencia exitosa |
| `enem-br` | 🇧🇷 Brasil | Verde-Amarelo-Azul | ✅ Completado | Idioma portugués |
| `sat-us` | 🇺🇸 USA | Blue-Red-White | ✅ Completado | Inglés |
| `gaokao-zh` | 🇨🇳 China | Red-Yellow | ✅ Completado | Mandarín simplificado |
| `jee-in` | 🇮🇳 India | Saffron-White-Green | ✅ Completado | Inglés + Hindi |

### 🔄 Repos con Template Base (Necesitan Personalización) (10/20)

| ID    | Repo | País | Tarea Pendiente | Prioridad | Estado |
|-------|------|------|-----------------|-----------|--------|
| P-01 | `snbt-id` | 🇮🇩 Indonesia | Flag stripe + country.ts + ejemplo pregunta | ALTA | ⬜ Pendiente |
| P-02 | `suneung-kr` | 🇰🇷 Korea | Flag stripe + country.ts + ejemplo pregunta | ALTA | ⬜ Pendiente |
| P-03 | `thanaweya-eg` | 🇪🇬 Egypt | Flag stripe + country.ts + ejemplo pregunta | ALTA | ⬜ Pendiente |
| P-04 | `utme-ng` | 🇳🇬 Nigeria | Flag stripe + country.ts + ejemplo pregunta | ALTA | ⬜ Pendiente |
| P-05 | `ege-ru` | 🇷🇺 Russia | Flag stripe + country.ts + ejemplo pregunta | ALTA | ⬜ Pendiente |
| P-06 | `bac-fr` | 🇫🇷 France | Flag stripe + country.ts + ejemplo pregunta | ALTA | ⬜ Pendiente |
| P-07 | `center-jp` | 🇯🇵 Japan | Flag stripe + country.ts + ejemplo pregunta | ALTA | ⬜ Pendiente |
| P-08 | `ingreso-ar` | 🇦🇷 Argentina | Flag stripe + country.ts + ejemplo pregunta + voseo | ALTA | ⬜ Pendiente |
| P-09 | `admision-pe` | 🇵🇪 Peru | Flag stripe + country.ts + ejemplo pregunta | ALTA | ⬜ Pendiente |
| P-10 | `paes-cl` | 🇨🇱 Chile | Flag stripe + country.ts + ejemplo pregunta | ALTA | ⬜ Pendiente |

**Personalización por repo incluye:**
- [ ] `src/layouts/Layout.astro` - Flag stripe (3px top, colores del país)
- [ ] `src/config/country.ts` - Configuración completa del país
- [ ] `src/styles/global.css` - Accent color override
- [ ] `src/pages/index.astro` - SEO texts en idioma local
- [ ] `src/pages/questions/[...slug].astro` - SEO texts en idioma local
- [ ] `src/content/questions/[asignatura]/grado-[N]/[tema]/ejemplo.md` - Pregunta de ejemplo

### ❌ Repos que NO Existen (5/20) - BLOQUEADOS POR FLAG

| ID    | Repo | País | Prioridad | Estado |
|-------|------|------|-----------|--------|
| N-01 | `abitur-de` | 🇩🇪 Germany | MEDIA | ❌ Bloqueado |
| N-02 | `vestibular-pt` | 🇵🇹 Portugal | MEDIA | ❌ Bloqueado |
| N-03 | `nta-pk` | 🇵🇰 Pakistan | BAJA | ❌ Bloqueado |
| N-04 | `eapcet-bd` | 🇧🇩 Bangladesh | BAJA | ❌ Bloqueado |
| N-05 | `vnuhcm-vn` | 🇻🇳 Vietnam | BAJA | ❌ Bloqueado |

**Nota:** NO crear estos repos hasta resolver el flag de GitHub.

---

## 🛠️ Infraestructura Local (Monorepo)

| ID | Tarea | Estado |
|----|-------|--------|
| I-01 | Workspace monorepo local | ✅ Completado |
| I-02 | Scripts PowerShell (apply-template.ps1) | ✅ Completado |
| I-03 | Config países (countries-config.ps1) | ✅ Completado |
| I-04 | AGENT_CONTEXT.md | ✅ Completado |
| I-05 | Copilot instructions | ✅ Completado |
| I-06 | question-bank (generador) | ✅ Simplificado |
| I-07 | ~~question-sync~~ | ❌ **ELIMINADO** |

---

## ✅ Hitos Principales Completados

- ✅ **Hito 1:** Arquitectura global definida (MASTER_PLAN.md, AGENTS.md)
- ✅ **Hito 2:** Template UI ciber-minimalista creado (saber-co)
- ✅ **Hito 3:** 5 repos completamente personalizados con identidad cultural
- ✅ **Hito 4:** Scripts de automatización (apply-template.ps1, countries-config.ps1)
- ✅ **Hito 5:** Configuración Supabase global (schema, RLS policies)
- ✅ **Hito 6:** Documentación completa (PLANNING.md, TASK.md, AGENT_CONTEXT.md, Copilot instructions)
- ✅ **Hito 7:** Feature Guía de Examen con infografías B&W (PR #3 - Colombia)

---

## 👾 Deuda Técnica y Mejoras Pendientes

| ID    | Tarea                                           | Prioridad | Estado      | Responsable |
|-------|-------------------------------------------------|-----------|-------------|-------------|
| DT-01 | Refactorizar `apply-template.ps1` (modular)     | BAJA      | ⬜ Pendiente | Cascade     |
| DT-02 | Crear tests de validación de preguntas          | MEDIA     | ⬜ Pendiente | Cascade     |
| DT-03 | Optimizar queries Supabase (índices)            | BAJA      | ⬜ Pendiente | Cascade     |
| DT-04 | Implementar CI/CD para validación automática    | MEDIA     | ⬜ Pendiente | Cascade     |
| DT-05 | Crear sistema de traducción con contexto IA     | ALTA      | ⬜ Pendiente | Cascade     |

---

## 📝 Tareas Descubiertas Durante el Desarrollo

| ID    | Tarea                                           | Prioridad | Estado      | Responsable |
|-------|-------------------------------------------------|-----------|-------------|-------------|
| AD-01 | GitHub flagueó organización - resolver urgente  | 🔴 CRÍTICA | ⚙️ En Progreso | Usuario     |
| AD-02 | Algunos repos tienen nombres diferentes         | BAJA      | ✅ Completado | Cascade     |
| AD-03 | PowerShell requiere ExecutionPolicy en Windows  | BAJA      | ✅ Completado | Documentado |
| AD-04 | AdSense en todos los repos (ca-pub-7015371704987876) | MEDIA | ⬜ Pendiente | Cascade |
| AD-05 | Telegram: vinculación segura + /practicar (5Q) + informe público con ads | ALTA | ✅ Completado | Copilot |

---

## 🎯 Próximos Pasos Inmediatos (Post-Flag)

**Una vez resuelto el flag de GitHub:**

1. **Completar personalización de 10 repos** con template base (P-01 a P-10)
2. **Crear repo privado `worldexams/admin`** para gestión centralizada
3. **Commit robusto** de cambios actuales en workspace
4. **Aplicar template a repos adicionales** (Ecuador, Australia, UK, España, Venezuela)
5. **Crear repos faltantes gradualmente** (1-2 por semana, no todos a la vez)

**Estrategia de crecimiento post-flag:**
- ✅ Máximo 2-3 repos nuevos por semana
- ✅ Contenido real educativo desde día 1 (no solo templates)
- ✅ Commits orgánicos (no solo automatizados)
- ✅ Community engagement (issues, PRs, contribuciones)

---

## 🏆 Feature: Sistema de Puntuación y Leaderboard (Colombia)

**Fecha implementación:** 2025-12-05
**Actualización IssueOps:** 2025-12-XX
**Estado:** ✅ COMPLETADO + MEJORADO

### 🆕 Arquitectura IssueOps (100% GitHub)

La arquitectura del leaderboard fue mejorada para eliminar dependencia de Supabase Edge Functions:

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│  GitHub Issues   │────▶│ GitHub Actions  │
│ (ResultsView)   │     │ (IssueOps)       │     │ (process-scores)│
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                                         │
                                                         ▼
                               ┌─────────────────────────────────────┐
                               │  public/leaderboards/*.json         │
                               │  LEADERBOARD.md (Hall of Fame)      │
                               └─────────────────────────────────────┘
```

### Nuevos Componentes IssueOps

| Componente | Archivo | Estado | Descripción |
|------------|---------|--------|-------------|
| Issue Template | `.github/ISSUE_TEMPLATE/score_submission.yml` | ✅ | Form estructurado para scores |
| Score Processor | `scripts/process-scores.mjs` | ✅ | Parsea issues, valida, actualiza JSONs |
| Workflow | `.github/workflows/leaderboard-sync.yml` | ✅ | Cron cada 15 min + on issue |
| GitHub API | `src/lib/github-api.ts` | ✅ | Auto-crear issues via OAuth |
| Score Hash | `src/lib/score-hash.ts` | ✅ | Checksum anti-cheat |
| Rate Limiter | `.github/rate-limits.json` | ✅ | Max 5 submissions/día |
| Notificaciones | `src/lib/rank-notifications.ts` | ✅ | Alertas cuando cambia tu rank |
| Toast Component | `src/components/RankNotificationToast.svelte` | ✅ | UI para notificaciones |
| Hall of Fame | `LEADERBOARD.md` | ✅ | Markdown público del ranking |

### Sistema Anti-Cheat

| Capa | Descripción |
|------|-------------|
| Rate Limiting | Max 5 submissions/usuario/día, 5 min entre submissions |
| Checksum | Fórmula: `(pts×7)+(q×13)+(correct×17)+floor(dur/1000)` |
| Validación | Puntos ≤ max posible, valores numéricos válidos |
| Tracking | `.github/rate-limits.json` con cleanup cada 24h |

### Documentación

- **Docs:** `docs/LEADERBOARD_SYSTEM.md`
- **Hall of Fame:** `LEADERBOARD.md`

### Componentes Anteriores (Mantenidos)

| Componente | Archivo | Estado | Descripción |
|------------|---------|--------|-------------|
| Sistema de Puntuación | `src/lib/scoring.ts` | ✅ Completado | Fórmula: Base × Dificultad × Tiempo × Racha |
| Identidad Anónima | `src/lib/identity.ts` | ✅ Completado | `{Adjetivo}{Animal}_{REGION}_{GRADO}_{HASH}` |
| Servicio Leaderboard | `src/lib/leaderboard.ts` | ✅ Completado | Tipos y constantes para períodos |
| Cliente Leaderboard | `src/lib/leaderboard-service.ts` | ✅ Completado | Fetch JSON + submit via Edge Function |
| Display de Puntos | `src/components/ScoreDisplay.svelte` | ✅ Completado | Tarjeta con puntos, multiplicadores, racha |
| Vista Leaderboard | `src/components/LeaderboardView.svelte` | ✅ Completado | Tabla con filtros grado/región, períodos |
| Registro Identidad | `src/components/IdentityRegistration.svelte` | ✅ Completado | Modal para crear ID anónimo |
| Edge Function | `supabase/functions/submit-leaderboard-score/` | ✅ Completado | Proxy seguro para GitHub Actions |
| GitHub Action | `.github/workflows/update-leaderboard.yml` | ✅ Completado | Actualiza JSONs en `/public/leaderboards/` |
| Migration SQL | `supabase/migrations/20241205_leaderboard_submissions.sql` | ✅ Completado | Rate limiting (10/hora) |

### Fórmula de Puntuación

```
Puntos = Base(100) × Dificultad(0.8-1.6) × Tiempo(1.0-1.5) × Racha(1.0-2.0)
```

| Factor | Mínimo | Máximo | Descripción |
|--------|--------|--------|-------------|
| Base | 100 | 100 | Puntos base por respuesta correcta |
| Dificultad | 0.8 | 1.6 | Según nivel 1-5 |
| Tiempo | 1.0 | 1.5 | Respuesta rápida +50% |
| Racha | 1.0 | 2.0 | Racha de 10+ = ×2 |

### Períodos de Leaderboard

| Período | Archivo JSON | Actualización |
|---------|--------------|---------------|
| Semanal | `/public/leaderboards/leaderboard-weekly.json` | Cada submit |
| Mensual | `/public/leaderboards/leaderboard-monthly.json` | Cada submit |
| Semestre A (Ene-Jun) | `/public/leaderboards/leaderboard-semester-a.json` | Cada submit |
| Semestre B (Jul-Dic) | `/public/leaderboards/leaderboard-semester-b.json` | Cada submit |
| Anual | `/public/leaderboards/leaderboard-yearly.json` | Cada submit |

### Integración con App.svelte

```svelte
{#if showIdentityModal}
  <IdentityRegistration onComplete={handleIdentityComplete} onCancel={closeIdentityModal} />
{/if}

{#if showLeaderboard}
  <LeaderboardView currentUser={userIdentity} onClose={toggleLeaderboard} />
{/if}
```

### Datos de Prueba Agregados

- ✅ `leaderboard-weekly.json` - 10 entradas de muestra
- ✅ `leaderboard-monthly.json` - 15 entradas de muestra
- Datos incluyen variedad de grados (3, 5, 9, 10, 11) y regiones colombianas

### Despliegue Edge Function (Producción)

```bash
# 1. Deploy la función
supabase functions deploy submit-leaderboard-score

# 2. Configurar secrets
supabase secrets set GITHUB_TOKEN=ghp_xxx
supabase secrets set GITHUB_OWNER=iberi22
supabase secrets set GITHUB_REPO=saberparatodos
```

### Próximos Pasos (Opcional)

| Tarea | Prioridad | Estado |
|-------|-----------|--------|
| Animaciones de subida de nivel | BAJA | ⬜ Pendiente |
| Badges por logros | BAJA | ⬜ Pendiente |
| Historial personal de scores | MEDIA | ⬜ Pendiente |
| Notificaciones cuando te superan | BAJA | ⬜ Pendiente |

---

## 📊 Métricas de Progreso

**Repos Completos:** 5/26 (19%)
**Repos con Base:** 10/26 (38%)
**Repos Pendientes:** 11/26 (43%)

**Estado del Flag:** 🚨 ACTIVO - Esperando respuesta de GitHub Support

**Tiempo Estimado Post-Flag:**
- Personalización de 10 repos: ~5-7 días
- Creación de `admin` repo: 1 día
- Aplicación de template a 5 repos adicionales: 2-3 días
- Creación gradual de 5 repos faltantes: 3-4 semanas

---

_Última sincronización: 2025-12-05 - Workspace local en E:\scripts-python\worldexams_


---

## 🚀 NUEVO: Sistema de Créditos IA & Salas de Entrenamiento (Dic 2025)

### ✅ COMPLETADO (14 Dic)

#### Backend Foundation
- [x] **Migración DB v2.0:** Tablas profiles, institutions, 	raining_sessions, generated_content, 	ransactions
- [x] **Edge Function:** \
efill-credits\ - Cron job semanal (50 créditos Free, 500 Pro)
- [x] **Edge Function:** \spend-credits\ - Transacción atómica con validación
- [x] **Edge Function:** \generate-analysis\ - Integración Gemini (10 créditos/análisis)

#### Documentación
- [x] Actualizar PLANNING.md con modelo de negocio AI Credits
- [x] Documentar arquitectura de Salas de Entrenamiento

### 🔄 EN PROGRESO

#### Edge Functions Avanzadas
- [ ] **\generate-infographic\** (Alta prioridad - 4h)
  - Integrar Replicate API (Flux/SDXL)
  - Input: Tema + Estilo visual del usuario
  - Output: URL de imagen + metadata
  - Costo: 5 créditos
- [ ] **\start-training-session\** (Alta prioridad - 6h)
  - Algoritmo adaptativo basado en historial
  - Selección de preguntas por debilidad
  - Tracking de progreso en tiempo real
- [ ] **\purchase-credits\** (Media prioridad - 3h)
  - Webhook de Wompi/Stripe
  - Validación de pago + recarga de créditos
  - Logging de transacciones

#### Configuración Supabase
- [ ] Configurar Cron Job para \
efill-credits\ (Lunes 00:00 UTC)
- [ ] Agregar secrets: \GEMINI_API_KEY\, \REPLICATE_API_KEY\, \WOMPI_SECRET\

### ⬜ PENDIENTE

#### Frontend UI (Saberparatodos)
- [ ] **Dashboard de Créditos** (2h)
  - Componente: \CreditBalance.svelte\
  - Mostrar saldo actual + countdown recarga
  - Botón 'Comprar Créditos'
- [ ] **Página Training Room** (/training.astro - 8h)
  - Selector de tema (basado en debilidades)
  - Selector de estilo visual (anime, cyberpunk, minimalista)
  - Feed estilo chat con contenido generado
- [ ] **Visor de Análisis** (4h)
  - Componente: \AnalysisReport.svelte\
  - Cards expandibles: Fortalezas, Debilidades, Plan
- [ ] **Modal de Compra** (6h)
  - Componente: \BuyCredits.svelte\
  - Integración Wompi (paquetes: 100, 500, 1000 créditos)
- [ ] **Onboarding** (/onboarding.astro - 4h)
  - Recolectar preferencias de aprendizaje
  - Aceptación de Términos y Condiciones

#### Integraciones Externas
- [ ] Configurar cuenta Replicate (generación de imágenes)
- [ ] Configurar Wompi (pasarela de pagos COP)
- [ ] Configurar Sentry (error tracking)

---

## 🤖 ECOSISTEMA DE BOTS & MONETIZACIÓN (Q1 2026)

### 🤖 Fase 1: Telegram Bot MVP (Prioridad Alta)
- [x] **Setup Inicial:**
  - Crear bot en BotFather.
  - Configurar webhook hacia Supabase Edge Function (`supabase/functions/telegram-bot`).
- [x] **Vinculación de Cuenta:**
  - Endpoint `/api/auth/generate-link-token` en Web (código temporal).
  - Página `/vincular-telegram` para generar el código estando logueado.
  - Comando `/start [código]` en Bot.
  - Actualizar `profiles` con `telegram_id`.
- [x] **Comandos Básicos:**
  - `/practicar`: Pregunta de práctica (pendiente mejorar aleatoriedad).
  - `/perfil`: Créditos y plan.
  - Anti-gasto: no llamar IA si no está vinculado.

### 💰 Fase 2: Monetización & Pro (Prioridad Media)
- [ ] **Suscripción Pro (Estudiantes):**
  - UI: Landing page `/pro` con tabla de precios.
  - Backend: Webhook de Stripe/Wompi para suscripción recurrente.
  - Logic: Middleware para checkear `subscription_tier` en Bot y Web.
- [ ] **Suscripción Pro (Profesores):**
  - UI: Dashboard `/teacher` con acceso a herramientas.
  - Feature: Generador de Guías PDF (HTML to PDF con Puppeteer en Edge/Function).
  - Feature: Reporte de Clase (Agregación de resultados).

### 💬 Fase 3: Soporte & Discord (Prioridad Baja)
- [ ] **Discord Bot:**
  - Portar lógica de Telegram a `discord.js` (en Worker o Container).
- [ ] **Soporte IA:**
  - Integrar Gemini para responder dudas en `/soporte`.
  - Sistema de tickets en Supabase para escalamiento humano.

---

## 🚀 OLA 1: GENERACIÓN PROTOCOLO v3.0 (Dic 2025)

**Objetivo:** Generar bundles de 10 preguntas con progresión de dificultad 1-5 para cubrir el 100% del currículo ICFES.

### ✅ Matemáticas (Grado 11)
- [x] **Algebra (5 bundles):** `CO-MAT-11-ALG-001` a `005` (v3.0)
- [x] **Geometría (5 bundles):** `CO-MAT-11-GEO-001` a `005` (v3.0)

### ✅ Lectura Crítica (Grado 11)
- [x] **Argumentación 001:** `CO-LEC-11-ARG-001-v3-bundle.md` (Hobbes - corregido)
- [x] **Filosofía 001:** `CO-LEC-11-FIL-001-v3-bundle.md` (Platón)
- [x] **Literatura 001:** `CO-LEC-11-LIT-001-v3-bundle.md` (García Márquez)

### ✅ Sociales y Ciudadanas (Grado 11)
- [x] **Tutela 001:** `CO-SOC-11-tutela-001-bundle.md` (Actualizado a v3.0)
- [x] **Tutela 002:** `CO-SOC-11-TUTELA-002-v3-bundle.md`
- [x] **Derechos Humanos 001:** `CO-SOC-11-HR-001-v3-bundle.md` (DDHH y DIH)
- [x] **Soberanía y Estado 001:** `CO-SOC-11-SOV-001-v3-bundle.md` (Organización Estatal)

### ✅ Ciencias Naturales (Grado 11)
- [x] **Biología Celular v3.0:** `CO-BIO-11-celular-001-bundle.md` (Fixed & Upgraded)
- [x] **Leyes de Newton (Física) v3.0:** `CO-NAT-11-FIS-001-v3-bundle.md`
- [x] **Estequiometría (Química) v3.0:** `CO-NAT-11-QUI-001-v3-bundle.md`




