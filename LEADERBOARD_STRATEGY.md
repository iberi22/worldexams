# 🏆 Estrategia de Leaderboard & Privacidad (Phase 5.2)

## 1. Visión General
El objetivo es permitir que los estudiantes compitan en un ranking público global sin comprometer su privacidad ni data personal sensible (PII), cumpliendo con regulaciones de protección de datos de menores.

## 2. Arquitectura de Privacidad: "Pseudonym by Default"

### 2.1 Perfil de Estudiante (`public.profiles`)
Cada estudiante registrado tendrá un perfil con dos "identidades":
1.  **Identidad Privada:** Nombre Real, Correo, Colegio (Solo visible para el estudiante y su institución vinculada).
2.  **Identidad Pública:** Alias/Nickname, Avatar Genérico, Nivel (Visible en el Leaderboard).

**Regla de Oro:** El `display_name` público NUNCA revela el nombre real por defecto. Se genera un alias aleatorio al registro (ej. *"Cosmic Capybara 23"*).

### 2.2 Configuración de Privacidad
El usuario tendrá un toggle en su perfil:
*   `public_ranking_enabled`: `true`/`false`.
    *   **TRUE:** Aparece en el leaderboard con su `display_name`.
    *   **FALSE:** Sus puntajes se registran para historial personal pero NO aparecen en el ranking público.

## 3. Esquema de Base de Datos (Supabase)

### Tabla: `public.profiles`
| Columna | Tipo | Descripción | Visibilidad |
|---------|------|-------------|-------------|
| `id` | uuid | PK, ref `auth.users` | System |
| `username` | text | Alias único (ej. "ProMath99") | Público |
| `full_name` | text | Nombre real | Privado (RLS: Owner/School) |
| `avatar_idx` | int | ID de avatar predefinido | Público |
| `school_id` | uuid | FK `organizations` | Privado/Público (Opcional) |
| `privacy_settings` | jsonb | `{ "show_school": false, "public_ranking": true }` | Owner |

### Tabla: `public.exam_results`
Registro inmutable de resultados para evitar manipulación de puntajes en cliente.
| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | uuid | PK |
| `user_id` | uuid | FK `profiles` |
| `score` | int | Puntaje obtenido |
| `subject` | text | Asignatura |
| `mode` | text | 'practice', 'simulacro', 'ranked' |
| `verified` | bool | True si fue en entorno controlado (futuro) |

### Vista: `public.leaderboard_global`
Vista materializada o consulta optimizada que:
1.  Filtra `privacy_settings->public_ranking = true`.
2.  Agrupa por `user_id`.
3.  Calcula `max(score)` o `sum(score)` según la temporada.
4.  Retorna: `username`, `avatar_idx`, `score`, `rank`.

## 4. Flujo de Usuario

### A. Registro (Sign Up)
1.  Estudiante ingresa con Google/Email.
2.  **Onboarding:**
    *   Se le asigna un `username` aleatorio (e.g., *FastDolphin*).
    *   Se le permite cambiarlo si está disponible.
    *   Selecciona un Avatar 3D (emoji/memoji style).
    *   (Opcional) Vincula código de Institución.

### B. Login
1.  **Unificación:** Crear página `/login` que detecte si es Estudiante o Institución, o tener tabs.
2.  **Redirección:**
    *   Estudiantes -> `/app/home` (Nuevo Dashboard de Estudiante).
    *   Instituciones -> `/dashboard` (Ya creado).

### C. Competencia
1.  Al finalizar un examen en "Modo Ranking" o "Simulacro", se guarda en `exam_results`.
2.  Se muestra su nueva posición en el Leaderboard.

## 5. Implementación Inmediata
1.  **Schema Migration:** Crear tablas `profiles` y `exam_results`.
2.  **Auth UI:** Crear `/login` unificado y Componente de Registro.
3.  **Onboarding UI:** Modal para elegir Username/Avatar.
4.  **Leaderboard UI:** Página `/leaderboard` conectada a la vista.
