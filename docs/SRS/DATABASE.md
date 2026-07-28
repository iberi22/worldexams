# Modelo de Datos

**Proyecto:** WorldExams
**Versión:** 3.0
**Fecha:** 2026-07-10

---

## Entidades Principales (Supabase PostgreSQL)

### questions

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | UUID PK | Identificador único |
| bundle_id | TEXT | ID del bundle de origen |
| question_number | INTEGER | Número de pregunta en el bundle |
| country | TEXT | Código ISO del país (co, mx, ar, etc.) |
| grade | INTEGER | Grado escolar |
| subject | TEXT | Asignatura |
| difficulty | TEXT | D3-D10 según Bloom taxonomy |
| bloom_level | TEXT | Remember, Understand, Apply, Analyze, Evaluate |
| question_text | TEXT | Enunciado de la pregunta |
| options | JSONB | Array de 4 opciones {option, text, is_correct, feedback} |
| correct_answer | TEXT | Letra de la respuesta correcta (A, B, C, D) |
| pedagogical_explanation | TEXT | Explicación pedagógica |
| context | TEXT | Contexto regional |
| metadata | JSONB | Metadata adicional (competencia_icfes, etc.) |
| created_at | TIMESTAMPTZ | Fecha de creación |
| updated_at | TIMESTAMPTZ | Última actualización |

### users

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | UUID PK | Auth UID (Supabase Auth) |
| email | TEXT | Email del usuario |
| full_name | TEXT | Nombre completo |
| country | TEXT | País de origen |
| role | TEXT | user, admin, superadmin |
| is_premium | BOOLEAN | Tiene suscripción premium |
| created_at | TIMESTAMPTZ | Fecha de registro |
| last_login | TIMESTAMPTZ | Último inicio de sesión |

### sessions

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | UUID PK | ID de sesión de examen |
| user_id | UUID FK → users.id | Usuario que tomó el examen |
| country | TEXT | País del examen |
| grade | INTEGER | Grado evaluado |
| subject | TEXT | Asignatura evaluada |
| question_ids | UUID[] | IDs de preguntas seleccionadas |
| status | TEXT | in_progress, completed, abandoned |
| started_at | TIMESTAMPTZ | Inicio del examen |
| completed_at | TIMESTAMPTZ | Fin del examen |
| time_spent_seconds | INTEGER | Duración total |

### results

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | UUID PK | ID del resultado |
| session_id | UUID FK → sessions.id | Sesión asociada |
| user_id | UUID FK → users.id | Usuario |
| answers | JSONB | Respuestas del usuario {question_id, selected_option, is_correct} |
| total_questions | INTEGER | Total de preguntas |
| correct_count | INTEGER | Respuestas correctas |
| incorrect_count | INTEGER | Respuestas incorrectas |
| score_pct | NUMERIC(5,2) | Porcentaje de aciertos |
| analysis | JSONB | Análisis por competencia (opcional premium) |
| created_at | TIMESTAMPTZ | Fecha del resultado |

### organizations (Premium)

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | UUID PK | ID de organización |
| name | TEXT | Nombre |
| tier | TEXT | free, pro, enterprise |
| max_members | INTEGER | Máximo de miembros |
| created_at | TIMESTAMPTZ | Fecha de creación |

### organization_members (Premium)

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | UUID PK | ID |
| organization_id | UUID FK → organizations.id | Organización |
| user_id | UUID FK → users.id | Miembro |
| role | TEXT | admin, member |
| joined_at | TIMESTAMPTZ | Fecha de ingreso |

### api_keys (Premium)

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | UUID PK | ID |
| organization_id | UUID FK → organizations.id | Organización propietaria |
| key_prefix | TEXT | Prefijo visible `wx_xxxx` |
| key_hash | TEXT | SHA-256 del API key |
| name | TEXT | Nombre descriptivo |
| rate_limit | INTEGER | Requests/minuto |
| is_active | BOOLEAN | Si está activa |
| created_at | TIMESTAMPTZ | Fecha de creación |
| expires_at | TIMESTAMPTZ | Fecha de expiración |
| last_used_at | TIMESTAMPTZ | Último uso |

### usage_logs (Premium)

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | UUID PK | ID |
| api_key_id | UUID FK → api_keys.id | API Key usada |
| endpoint | TEXT | Endpoint consultado |
| request_count | INTEGER | Requests en este log |
| response_time_ms | INTEGER | Tiempo de respuesta |
| ip_address | INET | IP de origen |
| created_at | TIMESTAMPTZ | Fecha del request |

---

## Bundle Data (Markdown + Static JSON)

### Formato de Bundle (questions_data/)

Los bundles no están en la base de datos — se almacenan como archivos markdown:

```
questions_data/{country}/{subject}/grado-{N}/2026/weekly/{COUNTRY}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

### Frontmatter YAML

```yaml
---
id: "CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle"
country: "colombia"
grado: 6
asignatura: "matematicas"
tema: "numeros-enteros"
periodo: "weekly"
week: "W01"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 10
bundle_size: 10
alignment: "DBA MEN Colombia"
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---
```

### Packs JSON Estáticos (para API)

Convertidos a JSON para servir desde CDN:

```
apps/worldexams-api/public/v1/packs/{country}-week-{N}-grade-{G}-subject-{S}.json
```

---

## Relaciones Clave

```
users 1──N sessions 1──1 results
users N──M organizations (via organization_members)
organizations 1──N api_keys
api_keys 1──N usage_logs
users 1──N sessions (exam attempts)
```

## Volumen Estimado

| Entidad | Volumen Actual | Crecimiento Estimado |
|---------|---------------|---------------------|
| questions | ~2000 preguntas | +500/mes por país activo |
| bundles | ~200 bundles | +40/mes |
| users | <100 (prelaunch) | +1000/mes post-lanzamiento |
| sessions | <500 | +5000/mes post-lanzamiento |
| api_keys | <10 | +20/mes |
| usage_logs | <1000/día | +10000/día post-lanzamiento |

---

*Actualizado: 2026-07-10*
