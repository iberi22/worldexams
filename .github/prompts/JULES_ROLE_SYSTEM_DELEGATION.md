# 🤖 Delegación a Jules: Sistema de Roles y Verificación

**Fecha de Delegación:** 15 de diciembre de 2025
**Delegado por:** GitHub Copilot
**Delegado a:** Jules (AI Agent)
**Prioridad:** 🔴 ALTA
**Estimación Total:** ~25 horas de desarrollo

---

## 📋 Contexto del Proyecto

**World Exams - Saber Para Todos** está implementando un sistema robusto de diferenciación de usuarios con 3 roles principales:

- 🎓 **Estudiante** - Verificación opcional (carnet estudiantil) para acceso a features premium
- 👨‍🏫 **Profesor** - Verificación obligatoria (credencial docente) para Panel de Profesor
- 🏢 **Institución** - Verificación obligatoria (registro mercantil) para Panel Administrativo

### Stack Tecnológico
- **Frontend:** Astro 5.x + Svelte 5
- **Backend:** Supabase (PostgreSQL + Edge Functions)
- **Storage:** Supabase Storage (bucket `verification-docs`)
- **Auth:** Supabase Auth (Magic Link)
- **Styling:** TailwindCSS + Custom Colombia theme

### Repositorio
- **Ubicación:** `e:\scripts-python\worldexams\saberparatodos\`
- **Schema:** `e:\scripts-python\worldexams\supabase\schema-global.sql`
- **Migrations:** `e:\scripts-python\worldexams\supabase\migrations\`

---

## 🎯 Tareas Delegadas (9 Fases)

### 🗄️ **FASE 1: Schema de Base de Datos** (Estimación: 2h)

**Objetivo:** Crear migración SQL completa para el sistema de roles.

#### Subtareas:

1. **Migración: Extender tabla `profiles`**
   - Agregar columnas: `institution_id UUID`, `grade_level INTEGER`, `institution_name TEXT`, `document_verified BOOLEAN DEFAULT FALSE`, `verification_status TEXT DEFAULT 'unverified'`
   - Crear constraint CHECK para `verification_status IN ('unverified', 'pending', 'approved', 'rejected')`
   - Actualizar RLS policies existentes

2. **Tabla: `verification_documents`**
   ```sql
   CREATE TABLE public.verification_documents (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
     document_type TEXT NOT NULL,
     document_url TEXT NOT NULL,
     file_name TEXT,
     mime_type TEXT,
     status TEXT DEFAULT 'pending',
     reviewed_by UUID REFERENCES public.profiles(id),
     reviewed_at TIMESTAMPTZ,
     rejection_reason TEXT,
     uploaded_at TIMESTAMPTZ DEFAULT NOW(),
     CONSTRAINT valid_document_type CHECK (document_type IN ('carnet_estudiante', 'credencial_docente', 'registro_mercantil')),
     CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'rejected'))
   );
   ```

3. **RLS Policies:**
   - Solo el usuario puede ver sus propios documentos
   - Solo `service_role` puede aprobar/rechazar
   - Crear policies para `INSERT` (usuarios autenticados), `SELECT` (owner only), `UPDATE` (service_role only)

4. **Storage Bucket: `verification-docs`**
   - Crear bucket con políticas:
     - Upload: Solo usuarios autenticados
     - Read: Solo owner o service_role
     - Max size: 5MB
     - Allowed MIME types: `image/jpeg`, `image/png`, `application/pdf`

5. **Archivo a Crear:**
   - `supabase/migrations/20251215_role_system_verification.sql`

**Referencias:**
- Schema existente: `supabase/schema-global.sql`
- Migración reciente: `supabase/migrations/20251214_business_model_v2_fix.sql`

---

### 🎨 **FASE 2: UI/UX - Registro Diferenciado** (Estimación: 4h)

**Objetivo:** Crear componentes Svelte 5 para registro diferenciado por rol.

#### Subtareas:

1. **Componente: `RoleSelector.svelte`**
   - **Ubicación:** `saberparatodos/src/components/auth/RoleSelector.svelte`
   - **Features:**
     - Radio buttons con iconos: 🎓 Estudiante, 👨‍🏫 Profesor, 🏢 Institución
     - Transiciones suaves al cambiar selección
     - Emit event `on:roleSelected` con rol seleccionado
   - **Estilo:** TailwindCSS con colores Colombia (#FCD116, #003893, #CE1126)

2. **Componente: `StudentRegistration.svelte`**
   - **Ubicación:** `saberparatodos/src/components/auth/StudentRegistration.svelte`
   - **Campos:**
     - Nombre completo (required)
     - Email (required)
     - Grado (selector 1-11, required)
     - Institución (text, optional)
     - País (dropdown, default: Colombia)
     - Ciudad (text, optional)
   - **Upload:**
     - File input para foto de carnet (optional)
     - Preview de imagen cargada
     - Disclaimer: "Opcional: Sube tu carnet para acceso a análisis IA y certificados"
   - **Validación:** Form validation con mensajes de error

3. **Componente: `TeacherRegistration.svelte`**
   - **Ubicación:** `saberparatodos/src/components/auth/TeacherRegistration.svelte`
   - **Campos:**
     - Nombre completo (required)
     - Email (required)
     - Institución (text, required)
     - Materia que imparte (text, required)
     - País (dropdown, default: Colombia)
   - **Upload:**
     - File input para credencial docente (required)
     - Formatos aceptados: JPG, PNG, PDF
     - Disclaimer: "Obligatorio: Sube tu credencial docente para acceder a Panel de Profesor"
   - **Validación:** No permitir submit sin documento

4. **Componente: `InstitutionRegistration.svelte`**
   - **Ubicación:** `saberparatodos/src/components/auth/InstitutionRegistration.svelte`
   - **Campos:**
     - Nombre de la institución (required)
     - RUT/NIT (required)
     - Representante legal (required)
     - Email corporativo (required)
     - Teléfono (required)
     - País (dropdown, default: Colombia)
   - **Upload:**
     - File input para registro mercantil (required)
     - Disclaimer: "Obligatorio: Certificado de existencia o registro mercantil (no mayor a 30 días)"
   - **Validación:** Validar formato de email corporativo

5. **Actualizar: `Login.svelte`**
   - **Ubicación:** `saberparatodos/src/components/Login.svelte`
   - **Cambios:**
     - Integrar `RoleSelector` al inicio del flow
     - Renderizar formulario específico según rol seleccionado
     - Actualizar `handleLogin()` para incluir datos de rol en `profiles`
     - Redirección post-login según rol:
       - Estudiante → `/dashboard/student`
       - Profesor → `/dashboard/teacher`
       - Institución → `/dashboard/institution`

**Estilo General:**
- Mobile-first responsive
- Dark mode compatible
- Accesibilidad (aria-labels, roles)
- Animaciones suaves (Svelte transitions)

---

### 🛡️ **FASE 3: Backend - Verificación de Documentos** (Estimación: 3h)

**Objetivo:** Crear Edge Functions para gestión de verificación.

#### Subtareas:

1. **Edge Function: `upload-verification-document`**
   - **Ubicación:** `supabase/functions/upload-verification-document/index.ts`
   - **Lógica:**
     - Recibir: `user_id`, `document_type`, `file` (base64 o FormData)
     - Subir archivo a bucket `verification-docs` con path: `{user_id}/{document_type}_{timestamp}.{ext}`
     - Insertar registro en `verification_documents` con `status: 'pending'`
     - Enviar email de confirmación: "Documento recibido, revisaremos en 24-48h"
   - **Validación:**
     - Verificar que user está autenticado
     - Validar tamaño (max 5MB)
     - Validar MIME type (JPG, PNG, PDF)
   - **Response:** `{ success: true, verification_id, status: 'pending' }`

2. **Edge Function: `approve-verification`**
   - **Ubicación:** `supabase/functions/approve-verification/index.ts`
   - **Permisos:** Solo `service_role` o usuarios con `role: 'admin'` en `profiles`
   - **Lógica:**
     - Recibir: `verification_id`
     - Actualizar `verification_documents.status = 'approved'`, `reviewed_at = NOW()`, `reviewed_by = current_user`
     - Actualizar `profiles.document_verified = true`, `verification_status = 'approved'`
     - Enviar email: "¡Verificación aprobada! Ahora tienes acceso a..."
   - **Response:** `{ success: true, message: 'Verification approved' }`

3. **Edge Function: `reject-verification`**
   - **Ubicación:** `supabase/functions/reject-verification/index.ts`
   - **Permisos:** Solo `service_role` o admins
   - **Lógica:**
     - Recibir: `verification_id`, `rejection_reason`
     - Actualizar `verification_documents.status = 'rejected'`, `rejection_reason`, `reviewed_at`, `reviewed_by`
     - Actualizar `profiles.verification_status = 'rejected'`
     - Enviar email: "Tu documento fue rechazado. Motivo: {reason}. Sube un nuevo documento."
     - Opcional: Marcar documento para eliminación automática en 90 días
   - **Response:** `{ success: true, message: 'Verification rejected', reason }`

4. **Helpers comunes:**
   - `sendVerificationEmail(userId, template, data)` - Enviar emails con Resend/SendGrid
   - `validateFileType(file)` - Validar MIME type
   - `generateStoragePath(userId, documentType)` - Generar path consistente

**Testing:**
- Crear tests unitarios con Deno Test
- Mock de Supabase client
- Validar happy path y error cases

---

### 📊 **FASE 4: Paneles Diferenciados** (Estimación: 6h)

**Objetivo:** Crear dashboards específicos para cada rol.

#### Subtareas:

1. **Panel Estudiante: `/dashboard/student`**
   - **Archivo:** `saberparatodos/src/pages/dashboard/student.astro`
   - **Componentes:**
     - `StudentStats.svelte` - Widgets: Progreso por asignatura, racha, próximo examen
     - `ExamHistory.svelte` - Lista de exámenes completados
     - `AIAnalysis.svelte` - Análisis de debilidades (solo si `document_verified`)
     - `Certificates.svelte` - Certificados generados (solo si `document_verified`)
   - **Restricciones:**
     - Sin verificación: Banner "Verifica tu identidad para análisis IA y certificados"
     - Con verificación: Acceso completo

2. **Panel Profesor: `/dashboard/teacher`**
   - **Archivo:** `saberparatodos/src/pages/dashboard/teacher.astro`
   - **Componentes:**
     - `TeacherStats.svelte` - Widgets: Aulas creadas, estudiantes, exámenes
     - `CreatePartyMode.svelte` - Botón para crear Party Mode
     - `StudentResults.svelte` - Tabla con resultados de estudiantes
     - `ExportReports.svelte` - Botón para exportar CSV
   - **Restricciones:**
     - Requiere `document_verified = true` obligatoriamente
     - Si no verificado: Redirect a `/verification-pending`

3. **Panel Institución: `/dashboard/institution`**
   - **Archivo:** `saberparatodos/src/pages/dashboard/institution.astro`
   - **Componentes:**
     - `InstitutionStats.svelte` - Widgets: Total estudiantes, profesores, créditos, plan
     - `UserManagement.svelte` - Tabla para agregar/remover usuarios
     - `LicenseAssignment.svelte` - Asignar licencias a profesores/estudiantes
     - `Analytics.svelte` - Gráficos de uso mensual
     - `Billing.svelte` - Histórico de pagos, próxima renovación
   - **Restricciones:**
     - Solo `role: 'admin'` con `document_verified = true`
     - Mostrar solo miembros de su institución (`institution_id`)

4. **Componente: `DashboardNav.svelte`**
   - **Ubicación:** `saberparatodos/src/components/dashboard/DashboardNav.svelte`
   - **Features:**
     - Navegación lateral dinámica según rol
     - Items para Estudiante: Inicio, Historial, Análisis, Certificados
     - Items para Profesor: Inicio, Party Mode, Estudiantes, Reportes
     - Items para Institución: Inicio, Usuarios, Licencias, Analytics, Facturación
     - Badges de notificaciones: "Verificación pendiente", "Nuevo mensaje"

**Estilo:**
- Layout consistente con tema Colombia
- Sidebar colapsable en móvil
- Widgets con gradientes suaves
- Loading states (Svelte `await` blocks)

---

### 🔐 **FASE 5: Control de Acceso por Features** (Estimación: 2h)

**Objetivo:** Implementar lógica de feature gating basada en roles.

#### Subtareas:

1. **Definir Matriz de Acceso**
   - **Archivo:** `saberparatodos/src/lib/features.ts`
   - **Código:**
     ```typescript
     export const FEATURE_ACCESS = {
       'basic-exams': ['student', 'teacher', 'admin'],
       'ai-analysis': ['student:verified', 'teacher', 'admin'],
       'certificates': ['student:verified', 'teacher', 'admin'],
       'party-mode-host': ['teacher', 'admin'],
       'institution-dashboard': ['admin'],
       'export-reports': ['teacher', 'admin'],
       'user-management': ['admin']
     } as const;

     export type Feature = keyof typeof FEATURE_ACCESS;
     ```

2. **Helper: `hasFeatureAccess()`**
   - **Archivo:** `saberparatodos/src/lib/features.ts`
   - **Función:**
     ```typescript
     import type { User } from '@supabase/supabase-js';

     export function hasFeatureAccess(
       user: User | null,
       profile: Profile | null,
       feature: Feature
     ): boolean {
       if (!user || !profile) return false;

       const allowedRoles = FEATURE_ACCESS[feature];
       const userRole = profile.role;
       const isVerified = profile.document_verified;

       return allowedRoles.some(role => {
         if (role.includes(':verified')) {
           const baseRole = role.split(':')[0];
           return userRole === baseRole && isVerified;
         }
         return userRole === role;
       });
     }
     ```

3. **Middleware: Route Guards**
   - **Archivo:** `saberparatodos/src/middleware.ts`
   - **Lógica:**
     - Proteger `/dashboard/teacher` → solo `role: 'teacher'` con `document_verified`
     - Proteger `/dashboard/institution` → solo `role: 'admin'` con `document_verified`
     - Redirect no autorizados a `/unauthorized` con mensaje específico

4. **Componente: `FeatureGate.svelte`**
   - **Ubicación:** `saberparatodos/src/components/FeatureGate.svelte`
   - **Props:** `feature: Feature`, `fallback?: Component`
   - **Lógica:** Renderiza children solo si `hasFeatureAccess()` retorna `true`
   - **Uso:**
     ```svelte
     <FeatureGate feature="ai-analysis">
       <AIAnalysisWidget />
     </FeatureGate>
     ```

**Testing:**
- Tests unitarios con diferentes combinaciones de roles/verificación
- Verificar que estudiantes no verificados no puedan acceder a AI analysis
- Verificar que profesores sin verificar no puedan hostear Party Mode

---

### 📧 **FASE 6: Comunicación y Notificaciones** (Estimación: 2h)

**Objetivo:** Configurar emails automatizados y notificaciones in-app.

#### Subtareas:

1. **Email Template: Verificación Pendiente**
   - **Servicio:** Resend (recomendado) o SendGrid
   - **Template ID:** `verification-pending`
   - **Variables:** `{userName}`, `{documentType}`, `{estimatedTime}`
   - **Contenido:**
     ```
     Hola {userName},

     Hemos recibido tu {documentType} para verificación.
     Lo revisaremos en las próximas 24-48 horas.

     Te notificaremos por email cuando esté aprobado.

     Gracias,
     Equipo Saber Para Todos
     ```

2. **Email Template: Verificación Aprobada**
   - **Template ID:** `verification-approved`
   - **Variables:** `{userName}`, `{role}`, `{featuresList}`
   - **Contenido:**
     ```
     ¡Felicidades {userName}!

     Tu cuenta ha sido verificada como {role}.
     Ahora tienes acceso a:

     {featuresList}

     Ingresa a tu dashboard: [Link]

     ¡Disfruta Saber Para Todos!
     ```

3. **Email Template: Verificación Rechazada**
   - **Template ID:** `verification-rejected`
   - **Variables:** `{userName}`, `{reason}`, `{retryLink}`
   - **Contenido:**
     ```
     Hola {userName},

     Lamentablemente tu documento no pudo ser verificado.
     Motivo: {reason}

     Por favor sube un nuevo documento aquí: {retryLink}

     Si tienes dudas, contáctanos.

     Equipo Saber Para Todos
     ```

4. **Notificación In-App: Banner de Verificación**
   - **Componente:** `VerificationBanner.svelte`
   - **Ubicación:** `saberparatodos/src/components/VerificationBanner.svelte`
   - **Estados:**
     - `pending`: "Tu verificación está siendo revisada. Te notificaremos pronto."
     - `rejected`: "Tu documento fue rechazado. [Ver motivo] [Subir nuevo]"
     - `unverified` (estudiante): "Verifica tu identidad para desbloquear más features. [Subir carnet]"
   - **Mostrar en:** Top del dashboard correspondiente

**Configuración:**
- Crear cuenta en Resend (tiene free tier)
- Configurar DNS (SPF, DKIM) para deliverability
- Agregar API key a variables de entorno: `RESEND_API_KEY`

---

### 🧪 **FASE 7: Testing y Validación** (Estimación: 3h)

**Objetivo:** Asegurar calidad con tests automatizados y manuales.

#### Subtareas:

1. **Tests E2E con Playwright**
   - **Archivo:** `saberparatodos/tests/role-system.spec.ts`
   - **Casos:**
     - `test('Student registration flow without verification')`
       - Seleccionar "Soy Estudiante"
       - Llenar formulario (sin carnet)
       - Verificar redirect a `/dashboard/student`
       - Verificar que AI analysis esté bloqueado
     - `test('Teacher registration flow with verification')`
       - Seleccionar "Soy Profesor"
       - Llenar formulario + subir PDF de credencial
       - Verificar estado `pending`
       - Simular aprobación de admin
       - Verificar acceso a Panel de Profesor
     - `test('Institution registration flow')`
       - Seleccionar "Institución"
       - Llenar formulario + subir registro mercantil
       - Verificar creación de institución en DB
       - Verificar acceso a dashboard admin

2. **Tests Unitarios con Vitest**
   - **Archivo:** `saberparatodos/tests/unit/features.test.ts`
   - **Casos:**
     - `describe('hasFeatureAccess')`
       - `it('allows student:verified to access ai-analysis')`
       - `it('denies student without verification to access ai-analysis')`
       - `it('allows teacher to host party-mode')`
       - `it('denies student to access institution-dashboard')`

3. **Tests de RLS Policies**
   - **Archivo:** `supabase/tests/rls.test.sql`
   - **Casos:**
     - Verificar que usuario solo puede ver sus propios `verification_documents`
     - Verificar que service_role puede actualizar cualquier `verification_documents`
     - Verificar que estudiante no puede modificar `institution_members`

4. **Pruebas Manuales (Checklist)**
   - [ ] Subir documento JPG válido (< 5MB)
   - [ ] Subir documento PNG válido
   - [ ] Subir documento PDF válido
   - [ ] Intentar subir archivo > 5MB (debe rechazar)
   - [ ] Intentar subir archivo .exe (debe rechazar)
   - [ ] Verificar recepción de email "Verificación pendiente"
   - [ ] Aprobar documento desde panel admin
   - [ ] Verificar recepción de email "Verificación aprobada"
   - [ ] Rechazar documento con motivo
   - [ ] Verificar recepción de email "Verificación rechazada"
   - [ ] Acceder a features premium después de verificación
   - [ ] Intentar acceder a `/dashboard/teacher` como estudiante (debe redirect)

**CI/CD:**
- Configurar GitHub Action para correr tests en cada PR
- Bloquear merge si tests fallan

---

### 📖 **FASE 8: Documentación** (Estimación: 1h)

**Objetivo:** Documentar el sistema completo para desarrolladores y usuarios.

#### Subtareas:

1. **Actualizar `README.md`**
   - **Ubicación:** `saberparatodos/README.md`
   - **Agregar Sección:**
     ```markdown
     ## 🔐 Sistema de Roles y Verificación

     ### Roles Disponibles
     - **Estudiante:** Acceso básico gratuito. Verificación opcional para features premium.
     - **Profesor:** Requiere verificación para acceder a Panel de Profesor.
     - **Institución:** Requiere verificación para gestión administrativa.

     ### Proceso de Verificación
     1. Selecciona tu rol durante el registro
     2. Sube tu documento (carnet, credencial, registro mercantil)
     3. Espera aprobación (24-48h)
     4. Recibe email de confirmación
     5. Accede a features premium

     ### Documentos Aceptados
     - **Carnet Estudiantil:** Foto clara con nombre e institución visibles
     - **Credencial Docente:** Credencial oficial o certificado laboral
     - **Registro Mercantil:** Certificado de existencia (no mayor a 30 días)
     ```

2. **Crear `docs/VERIFICATION_GUIDE.md`**
   - **Ubicación:** `docs/VERIFICATION_GUIDE.md`
   - **Contenido:**
     - **Para Estudiantes:**
       - Cómo tomar foto de carnet válida (iluminación, ángulo, nitidez)
       - Qué hacer si tu carnet está vencido
       - Features que se desbloquean con verificación
     - **Para Profesores:**
       - Documentos aceptados (credencial, certificado laboral)
       - Qué incluir en el certificado laboral
       - Features que se desbloquean (Party Mode, reportes)
     - **Para Instituciones:**
       - Requisitos del registro mercantil
       - Información de contacto requerida
       - Proceso de setup inicial (agregar profesores/estudiantes)

3. **Actualizar `PLANNING.md`**
   - **Ubicación:** `PLANNING.md`
   - **Cambios:**
     - Agregar sección "Sistema de Roles y Verificación" (ya completado por Copilot)
     - Actualizar diagrama de arquitectura con `verification_documents` table
     - Agregar a roadmap: "Q1 2026: Sistema de Roles (Completado)"

4. **Crear `docs/API_VERIFICATION.md`**
   - **Para Desarrolladores:**
     - Endpoints de Edge Functions
     - Request/Response schemas
     - Ejemplos de uso con `curl`
     - Rate limits y errores comunes

---

### 📊 **FASE 9: Métricas y Monitoreo** (Estimación: 1h)

**Objetivo:** Implementar tracking de métricas clave del sistema.

#### Subtareas:

1. **Métricas en Supabase**
   - **Crear Vista:** `analytics.verification_stats`
     ```sql
     CREATE VIEW analytics.verification_stats AS
     SELECT
       COUNT(*) FILTER (WHERE status = 'pending') AS pending_count,
       COUNT(*) FILTER (WHERE status = 'approved') AS approved_count,
       COUNT(*) FILTER (WHERE status = 'rejected') AS rejected_count,
       AVG(EXTRACT(EPOCH FROM (reviewed_at - uploaded_at))) FILTER (WHERE reviewed_at IS NOT NULL) AS avg_review_time_seconds
     FROM public.verification_documents;
     ```

2. **Dashboard Interno para Admins**
   - **Página:** `/admin/verifications`
   - **Componentes:**
     - Tabla de verificaciones pendientes ordenadas por fecha
     - Filtros: Por tipo de documento, por estado
     - Acciones: Aprobar/Rechazar con modal
     - Estadísticas: Total pendientes, promedio de tiempo de revisión

3. **Tracking con Posthog/Mixpanel (Opcional)**
   - Evento: `verification_uploaded` (con properties: `document_type`, `role`)
   - Evento: `verification_approved` (con properties: `document_type`, `review_time`)
   - Evento: `verification_rejected` (con properties: `document_type`, `rejection_reason`)
   - Funnel: Registro → Upload → Aprobación → Uso de Feature Premium

4. **Alertas**
   - Email a admins si hay > 20 verificaciones pendientes
   - Slack notification si tiempo de revisión > 72h

---

## 📚 Referencias y Recursos

### Documentación Clave
- **PLANNING.md:** `e:\scripts-python\worldexams\PLANNING.md` (Sección "Sistema de Roles" ya agregada)
- **TASK.md:** `e:\scripts-python\worldexams\TASK.md` (Tareas actuales)
- **AGENTS.md:** `e:\scripts-python\worldexams\AGENTS.md` (Roles de IA)
- **Schema SQL:** `e:\scripts-python\worldexams\supabase\schema-global.sql`

### Componentes Existentes
- **Login.svelte:** `saberparatodos/src/components/Login.svelte`
- **supabase.ts:** `saberparatodos/src/lib/supabase.ts` (Cliente Supabase)
- **App.svelte:** `saberparatodos/src/components/App.svelte` (Layout principal)

### Migración Reciente
- **Última migración:** `supabase/migrations/20251214_business_model_v2_fix.sql`
- **Contiene:** Tabla `institutions`, `institution_members`, enum `user_role`, `institution_plan`

### Estilo Colombia
- **Colores:** Primary: `#FCD116`, Secondary: `#003893`, Accent: `#CE1126`
- **Tipografía:** System UI, mobile-first
- **Dark Mode:** Background `#121212`, Cards `#1A1A1A`

---

## ✅ Criterios de Aceptación

### Funcionalidad
- [x] Usuario puede seleccionar rol durante registro
- [x] Formularios específicos se muestran según rol seleccionado
- [x] Documentos se suben correctamente a Supabase Storage
- [x] Estado de verificación se actualiza en `profiles` y `verification_documents`
- [x] Emails se envían en cada cambio de estado
- [x] Paneles diferenciados muestran contenido según rol
- [x] Features premium están bloqueadas sin verificación
- [x] Admins pueden aprobar/rechazar desde dashboard interno

### Seguridad
- [x] RLS policies protegen documentos (solo owner puede ver)
- [x] Solo service_role puede aprobar/rechazar
- [x] Archivos maliciosos se rechazan (validación MIME)
- [x] Rate limiting evita spam de uploads

### UX
- [x] Proceso de registro es intuitivo y guiado
- [x] Estados de verificación son claros (pending/approved/rejected)
- [x] Mensajes de error son descriptivos
- [x] Responsive en móvil y desktop
- [x] Accesibilidad (contraste, aria-labels)

### Performance
- [x] Upload de documentos < 3s para archivos de 2MB
- [x] Dashboards cargan en < 1s
- [x] Queries de verificación usan índices (rápidas)

---

## 🚀 Instrucciones de Ejecución

### Configuración Inicial
1. **Instalar dependencias:**
   ```powershell
   cd saberparatodos
   npm install
   ```

2. **Configurar variables de entorno:**
   ```env
   PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbG... # Solo para Edge Functions
   RESEND_API_KEY=re_xxx # Para emails
   ```

3. **Correr migraciones:**
   ```powershell
   cd ..
   npx supabase migration up
   ```

4. **Iniciar dev server:**
   ```powershell
   cd saberparatodos
   npm run dev
   ```

### Orden de Implementación Recomendado
1. **Fase 1:** Schema (base sólida)
2. **Fase 2:** UI Components (visible progress)
3. **Fase 3:** Backend (conectar UI con BD)
4. **Fase 5:** Feature Gating (lógica de acceso)
5. **Fase 4:** Dashboards (requiere feature gating)
6. **Fase 6:** Emails (notificaciones)
7. **Fase 7:** Testing (validación)
8. **Fase 8:** Documentación (comunicación)
9. **Fase 9:** Métricas (monitoreo)

### Testing Durante Desarrollo
```powershell
# Tests unitarios
npm run test

# Tests E2E
npm run test:e2e

# Validar RLS policies
npx supabase test db
```

---

## 🎯 Métricas de Éxito

Al completar todas las fases, deberíamos tener:

- **Tasa de Verificación:** > 60% de usuarios completan proceso de verificación
- **Tiempo de Revisión:** < 24h promedio entre upload y aprobación
- **Tasa de Aprobación:** > 80% de documentos aprobados en primer intento
- **Engagement Post-Verificación:** +150% de uso de features premium después de verificación
- **Churn Rate:** < 10% de usuarios abandonan durante proceso de verificación

---

## 📞 Contacto y Soporte

**Delegado por:** GitHub Copilot
**Para Dudas:** Consultar AGENTS.md, PLANNING.md, TASK.md
**Referencia Completa:** `docs/QUESTION_GENERATION_PROTOCOL_V2.md` (para preguntas)

---

*Delegación creada: 15 de diciembre de 2025*
*Estimación Total: ~25 horas*
*Prioridad: 🔴 ALTA*
