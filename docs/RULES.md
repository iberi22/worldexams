# RULES.md — Reglas de Codificación y Contenido

> Reglas específicas del proyecto WorldExamns / SaberParaTodos.
> Aplican a todo agente que genere, modifique o revise bundles y código.

---

## 📦 REGLAS DE BUNDLES (Protocolo v5.2)

### R-BUNDLE-001: Ruta Canónica
Los bundles deben guardarse exclusivamente en:
```
questions_data/{country}/{subject}/grado-{N}/2026/weekly/
```
❌ No en: `.worldexams/`, `scratch/`, `temp/`, `reports/`, carpetas de prompts, o cualquier otra ubicación.

### R-BUNDLE-002: Naming Exacto
```
{COUNTRY_CODE}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```
- COUNTRY_CODE, SUBJ, GRADE, WNN en **MAYÚSCULAS**
- `topic` en **kebab-case** ASCII, sin espacios
- Sufijo exacto: `-001-MASTERY-bundle.md`
- El `id` del frontmatter = nombre del archivo sin `.md`

### R-BUNDLE-003: Frontmatter Obligatorio
Todo bundle debe comenzar con YAML válido que contenga:
```yaml
id, country, grado, asignatura, tema, periodo, week, year,
bundle_type, protocol_version, total_questions, bundle_size,
alignment, license, tier, creador
```

### R-BUNDLE-004: Cantidad de Preguntas
| Grados | Preguntas |
|--------|-----------|
| G3-G5 | 8 |
| G6-G7 | 10 |
| G8-G10 | 12 |
| G11 / 3EM Brasil | 20 |

`total_questions`, `bundle_size` y bloques `## Question N` deben coincidir.

### R-BUNDLE-005: Formato de Pregunta
```
## Question N [D#]
**ID:** {id}-v{N}
**Bloom:** {Remember|Understand|Apply|Analyze|Evaluate|Create}
**ICFES:** {competencia}
**Expected_Success:** {0.XX}
**Contexto:** {texto}

### Enunciado
{texto}

### Opciones
- [x] A) {correcta}
  <!-- feedback: {explicación} -->
- [ ] B) {distractor}
  <!-- feedback: {explicación} -->
- [ ] C) {distractor}
  <!-- feedback: {explicación} -->
- [ ] D) {distractor}
  <!-- feedback: {explicación} -->

### Explicacion Pedagogica
{texto}
```

### R-BUNDLE-006: Encabezados en Español
- Usar `## Question N [D#]` (única excepción en inglés)
- Usar `### Enunciado`, `### Opciones`, `### Explicacion Pedagogica`
- ❌ No usar `Context`, `Options`, `Explanation`, `Answer`, `Pregunta`, `Respuesta`

### R-BUNDLE-007: Opciones
- Exactamente **4 opciones** (A, B, C, D)
- Exactamente **1 opción con `[x]`** (la correcta)
- ❌ No usar "Todas las anteriores", "Ninguna de las anteriores", "A y B", o combinaciones equivalentes
- ❌ No distractores duplicados (mismo texto con diferente letra)

### R-BUNDLE-008: Feedback
Todas las opciones deben tener feedback en la línea siguiente:
```html
<!-- feedback: Explica por qué esta opción es correcta o incorrecta -->
```
- El feedback de la opción correcta debe explicar por qué es correcta
- El feedback de los distractores debe explicar el error conceptual

### R-BUNDLE-009: Dificultad Progresiva
Para 10 preguntas:
| Q | Dificultad | Bloom |
|---|------------|-------|
| Q1-Q2 | D3-D4 | Remember/Understand |
| Q3-Q5 | D5-D6 | Apply |
| Q6-Q8 | D7-D8 | Analyze |
| Q9-Q10 | D9-D10 | Evaluate |

Para 20 preguntas: bloques de 4 (D3-D4 → D5-D6 → D7-D8 → D9-D10)
Para 8 o 12: progresión creciente sin saltos bruscos

### R-BUNDLE-010: Explicacion Pedagogica
Toda pregunta debe tener `### Explicacion Pedagogica` al final con:
- Explicación completa del concepto evaluado
- Por qué la respuesta correcta lo es
- Referencia al currículo del país

### R-BUNDLE-011: Sin AI Leakage
❌ No incluir en el bundle:
- `<think>`, `<process>` u otros tags de razonamiento
- Notas internas, prompts o instrucciones para IA
- Código o markdown fences alrededor del bundle
- Cadenas de texto que parezcan instrucciones de generación

### R-BUNDLE-012: IDs Consistentes
El ID de cada pregunta sigue el formato:
```
{COUNTRY}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle-v{N}
```
Donde `{N}` al final es el número de pregunta (1, 2, 3...).

### R-BUNDLE-013: Contexto Regional
- **Colombia:** Ciudades colombianas, COP en problemas de dinero, referencia a DBA MEN
- **México:** Ciudades mexicanas, MXN, referencia a SEP/NEM
- **Argentina:** Ciudades argentinas, ARS, voseo moderado, NAP/Aprender
- **Brasil:** Ciudades brasileñas, BRL, portugués brasileño, BNCC/ENEM
- Leer `skills/bundle-creator/rules/{COUNTRY_CODE}.md` antes de generar

---

## 📋 REGLAS DE VALIDACIÓN

### R-VALID-001: Validar Siempre
```bash
npm run validate
```
❌ No abrir PR si `npm run validate` falla.

### R-VALID-002: Validación Específica
```bash
npm run validate -- questions_data/colombia/lengua/grado-7/2026/weekly/CO-LEN-7-2026-W14-subordinacion-001-MASTERY-bundle.md
```

### R-VALID-003: Corrección en Fuente
- ❌ No editar JSON manualmente para corregir contenido
- ✅ Corregir el `.md` fuente → validar → regenerar packs
- Comando de regeneración: `node scripts/generate-static-packs.js --all-weekly --changed-only`

---

## 🧪 REGLAS DE PR Y GIT

### R-GIT-001: Commits Atómicos
- Un commit = un cambio lógico
- Formato: `type(scope): description (closes #N)`
- Tipos: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`

### R-GIT-002: PRs de Contenido vs Código
- PR de contenido: solo bundles (archivos `.md` en `questions_data/`)
- PR de código: solo código (`apps/`, `src/`, `scripts/`, `saberparatodos/`)
- ❌ No mezclar contenido y código en el mismo PR

### R-GIT-003: Sin Bundles No Solicitados
- Un PR solo debe agregar o modificar los bundles especificados en la tarea
- ❌ No borrar bundles no solicitados

### R-GIT-004: Sin Artefactos Auxiliares
- ❌ No incluir scripts, logs, temporales o artefactos de generación en PRs de contenido
- Usar `temp/` para archivos temporales locales (está en .gitignore)

---

## 🏗️ REGLAS DE ARQUITECTURA

### R-ARCH-001: Static Packs Son Derivados
- Fuente de verdad = archivos `.md` en `questions_data/`
- Archivos `.json` en `apps/worldexams-api/public/v1/packs` = artefactos derivados
- No editar JSON manualmente

### R-ARCH-002: API Prefiere Packs con Prefijo de País
- El API debe servir packs con prefijo ISO (`co-`, `mx-`, `ar-`, `br-`) antes que packs genéricos
- `co-week-1-grade-7-subject-lengua.json` > `week-1-grade-7-subject-lengua.json`

### R-ARCH-003: Country Readiness
Solo cuentan para el KPI de 2000 preguntas los bundles que cumplen:
1. Ruta canónica ✅
2. Validación estricta v5.2 ✅
3. Pack publicado con prefijo ISO ✅

---

## 🚫 ANTI-ERROR RULES (No Negociables)

| # | Regla | Consecuencia |
|---|-------|-------------|
| 1 | No distractores duplicados | Bundle inválido |
| 2 | No opciones "todas/ninguna de las anteriores" | Bundle inválido |
| 3 | No AI leakage (think, process, notes) | Bundle inválido |
| 4 | No alucinaciones científicas, históricas o legales | Bundle rechazado |
| 5 | Exactamente una opción `[x]` por pregunta | Bundle inválido |
| 6 | Todas las opciones tienen feedback | Bundle inválido |
| 7 | Todas las preguntas tienen Explicacion Pedagogica | Bundle inválido |
| 8 | Contextualizar al país destino | Bundle marcado |

---

## 📝 REGLAS DE CÓDIGO

### R-CODE-001: TypeScript Strict
- Usar TypeScript strict mode en todo el código nuevo
- ❌ No usar `any` — preferir `unknown` si es necesario

### R-CODE-002: ESLint + Prettier
- Correr `npm run lint` antes de commit de código
- Seguir configuración de ESLint en `eslint.config.js`

### R-CODE-003: Tests
- Todo código nuevo debe tener tests (unitarios o E2E)
- Tests E2E con Playwright en `tests/`
- Correr `npm run test:e2e` para verificar

### R-CODE-004: Secrets
- ❌ Nunca commitear `.env`, API keys, tokens
- ✅ Usar variables de entorno para configuración sensible
- ✅ `.env.example` para documentar variables necesarias

---

## 🌍 REGLAS POR PAÍS

### Colombia
- Alineación: DBA MEN + ICFES Saber
- Moneda: COP ($)
- Ciudades: Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, etc.
- Exámenes: Saber 11, Saber Pro

### México
- Alineación: SEP (Plan de Estudios) / NEM (Nueva Escuela Mexicana)
- Moneda: MXN ($)
- Ciudades: CDMX, Guadalajara, Monterrey, Puebla, etc.
- Exámenes: COMIPEMS, EXANI-I/II/III

### Argentina
- Alineación: NAP (Núcleos de Aprendizaje Prioritarios)
- Moneda: ARS ($)
- Ciudades: Buenos Aires, Córdoba, Rosario, Mendoza, etc.
- Voseo moderado en enunciados
- Exámenes: APRENDER

### Brasil
- Alineación: BNCC (Base Nacional Comum Curricular)
- Moneda: BRL (R$)
- Ciudades: São Paulo, Rio de Janeiro, Belo Horizonte, etc.
- Portugués brasileño
- Exámenes: ENEM

---

## 📂 REGLAS DE DOCUMENTACIÓN Y RUTAS

### R-DOC-001: Distinción SRC vs SRS
- **`docs/SRS/`** = Software Requirements Specification (requisitos del sistema: qué debe hacer, modelo de datos, API, rendimiento)
- **`.gitcore/SRC.md`** = Source Code Reference (mapa técnico del código: dónde está cada módulo, cómo construir, cómo desplegar)
- ❌ **No usar SRC como abreviatura de SRS ni viceversa** — son conceptos distintos:
  - `SRS` → S de **Software** (software)
  - `SRC` → S de **Source** (fuente/código)
- ✅ En el GLOSSARY.md están ambas definiciones documentadas con sus expansiones completas

#### 📖 Guía rápida: ¿SRC o SRS?

| Pregunta | Responde | Lee |
|----------|----------|-----|
| ¿Qué requisitos funcionales debe cumplir el sistema? | **QUÉ** | `docs/SRS/REQUIREMENTS.md` |
| ¿Cuántas preguntas por país debe tener? | **QUÉ** | `docs/SRS/REQUIREMENTS.md` |
| ¿Dónde está el código del API Gateway? | **DÓNDE** | `.gitcore/SRC.md` |
| ¿Cómo se despliega a producción? | **CÓMO** (técnico) | `.gitcore/SRC.md` |
| ¿Qué endpoints expone la API? | **QUÉ** (interfaz) | `docs/SRS/INTERFACES.md` |
| ¿Cuál es el modelo de datos? | **QUÉ** (datos) | `docs/SRS/DATABASE.md` |
| ¿Cuál es el entry point del Worker? | **DÓNDE** (código) | `.gitcore/SRC.md` |
| ¿Qué SLA de rendimiento debe cumplir? | **QUÉ** (calidad) | `docs/SRS/NON-FUNCTIONAL.md` |

> 💡 **Regla de oro:** Si preguntas QUÉ requisitos → SRS. Si preguntas DÓNDE está el código o CÓMO construirlo → SRC.

### R-DOC-002: Árbol de documentación
Cada tipo de documento va en su ubicación canónica:

| Tipo | Ruta | Ejemplo |
|------|------|---------|
| Requirements | `docs/SRS/` | `docs/SRS/REQUIREMENTS.md` |
| Arquitectura | `.gitcore/ARCHITECTURE.md` | — |
| Código fuente | `.gitcore/SRC.md` | — |
| Planning | `.gitcore/planning/` | `PLANNING.md`, `TASK.md` |
| Features | `.gitcore/` | `features.json`, `detailsFeatures.json` |
| Skills | `skills/` | `skills/bundle-creator/SKILL.md` |
| Bundles | `questions_data/` | `questions_data/colombia/matematicas/` |

### R-DOC-003: Agentes — orden de lectura obligatorio
Todo agente debe leer en este orden antes de actuar:
1. `AGENTS.md`
2. `.gitcore/SRC.md`
3. `.gitcore/ARCHITECTURE.md`
4. `.gitcore/features.json`
5. `.gitcore/planning/PLANNING.md`
6. `.gitcore/planning/TASK.md`
7. `docs/SRS/index.md` (si aplica)
8. Consultar Xavier (`/memory/search`) para contexto de sesiones anteriores

### R-DOC-004: No duplicar documentación
- La información de arquitectura vive SOLO en `.gitcore/ARCHITECTURE.md`
- El mapa del código vive SOLO en `.gitcore/SRC.md`
- Los requisitos viven SOLO en `docs/SRS/`
- ❌ No copiar contenido entre estos archivos
- ✅ Referenciar con enlaces relativos cuando se necesite cross-reference

### R-DOC-005: Fechas en documentos
- Todo archivo de documentación debe tener `last_updated` o fecha de actualización
- Si un documento tiene más de 60 días sin actualizar, marcarlo como `STALE`
- La fecha debe estar en los primeros 5 lines del archivo

### R-DOC-006: Xavier es la memoria — no archivos locales
- ❌ **No crear directorio `memory/` ni archivos `MEMORY.md` locales** para almacenar contexto de sesiones
- ✅ Xavier (http://192.168.1.2:8006) es el sistema de memoria persistente
- ✅ Usar `/memory/add` para guardar decisiones y `/memory/search` para consultar
- 📁 **Excepciones — archivos locales que SÍ debe tener el proyecto (son rieles del arnés):**
  - `.gitcore/features.json` — Feature registry con % real validado por tests
  - `.gitcore/detailsFeatures.json` — Detalle técnico de cada feature
  - `.gitcore/planning/TASK.md` — Tareas activas de la sesión
  - `.gitcore/planning/PLANNING.md` — Prioridades y dirección
  - `.gitcore/ARCHITECTURE.md` — Decisiones arquitectónicas
  - `docs/SRS/` — Software Requirements Specification
- 🔄 Xavier se consulta al inicio de cada sesión; `.gitcore/` se lee para entender la estructura y reglas

---

*Última actualización: 2026-07-10*
*Incumplir estas reglas puede resultar en bundles rechazados o PRs bloqueados.*

---

## 📋 REGLAS DE COMPLETITUD (Definition of Done)

### R-DoD-001: Bundle completado
- [ ] Archivo en ruta canónica v5.2
- [ ] Frontmatter YAML completo con todos los campos
- [ ] `npm run validate` pasa sin errores
- [ ] PR creado con título convencional
- [ ] Jules agent revisó calidad (12 checks)

### R-DoD-002: Feature completada
- [ ] features.json actualizado con % real
- [ ] Tests E2E pasan para esa feature
- [ ] Código mergeado a main
- [ ] Pack JSON generado y publicado (si aplica)
- [ ] Country Readiness audit refleja el cambio

### R-DoD-003: Código nuevo
- [ ] TypeScript strict mode
- [ ] ESLint sin errores
- [ ] Tests unitarios o E2E incluidos
- [ ] Pre-commit hooks pasan
- [ ] Sin secrets expuestos
