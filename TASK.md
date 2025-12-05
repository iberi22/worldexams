# Gestión de Tareas: World Exams Organization
_Última actualización: 2025-12-05_

## 🎯 Resumen Ejecutivo y Estado Actual

**Estado General:** 82% - Sitio Colombia (saberparatodos) completamente funcional

**Enfoque Actual:** 🇨🇴 **COLOMBIA FIRST** - Completar todas las features del sitio de Colombia antes de expandir

**Último PR:** [#3 - Guía de Examen ICFES con Infografías](https://github.com/iberi22/saberparatodos/pull/3)

---

## 🇨🇴 FASE ACTUAL: Colombia First (saberparatodos)

**Objetivo:** Completar el sitio de Colombia con TODAS las features antes de replicar en otros países.

### Componentes UI Completados ✅

| Componente | Archivo | Estado |
|------------|---------|--------|
| Layout Principal | `src/layouts/Layout.astro` | ✅ Completado |
| App Principal (Svelte) | `src/components/App.svelte` | ✅ Completado |
| Vista de Examen | `src/components/ExamView.svelte` | ✅ Completado |
| Selector de Grado | `src/components/GradeSelector.svelte` | ✅ Completado |
| Selector de Asignatura | `src/components/SubjectSelector.svelte` | ✅ Completado |
| Tarjeta Flashlight | `src/components/FlashlightCard.svelte` | ✅ Completado |
| Resultados | `src/components/ResultsView.svelte` | ✅ Completado |
| Login | `src/components/Login.svelte` | ✅ Completado |
| Leaderboard | `src/components/Leaderboard.svelte` | ✅ Completado |
| Búsqueda | `src/components/Search.svelte` | ✅ Completado |
| Ad Banner | `src/components/AdBanner.svelte` | ✅ Completado |

### Feature: Guía de Examen ✅

| Componente | Archivo | Estado |
|------------|---------|--------|
| Página principal | `src/pages/guia-examen.astro` | ✅ Completado |
| Infografía ICFES | `src/components/guia/ExamInfographic.astro` | ✅ Completado |
| Tarjeta de Grado | `src/components/guia/GradeCard.astro` | ✅ Completado |
| Lista Competencias | `src/components/guia/CompetencyList.astro` | ✅ Completado |
| Sección Tips | `src/components/guia/TipsSection.astro` | ✅ Completado |

### 🔄 Tareas Pendientes Colombia

| ID | Tarea | Prioridad | Estado |
|----|-------|-----------|--------|
| CO-01 | Crear Navbar/Header global con navegación | 🔴 ALTA | ⬜ Pendiente |
| CO-02 | Crear Footer global reutilizable | 🔴 ALTA | ⬜ Pendiente |
| CO-03 | Agregar iconografía SVG para competencias | MEDIA | ⬜ Pendiente |
| CO-04 | Mejorar Hero section en index.astro | MEDIA | ⬜ Pendiente |
| CO-05 | Agregar schema.org JSON-LD en guía | MEDIA | ⬜ Pendiente |
| CO-06 | Crear página /sobre-nosotros | MEDIA | ⬜ Pendiente |
| CO-07 | Implementar animaciones de scroll | BAJA | ⬜ Pendiente |
| CO-08 | Agregar estadísticas reales ICFES 2024 | BAJA | ⬜ Pendiente |
| CO-09 | Crear página /contacto | BAJA | ⬜ Pendiente |
| CO-10 | Optimizar LCP y Web Vitals | BAJA | ⬜ Pendiente |

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
| CO-SOC-11-ciudadanas-001 | 11° | Sociales | 7 | ✅ Validado |
| CO-ING-11-reading-001 | 11° | Inglés | 7 | ✅ Validado |

**Total:** 10 bundles, **70+ preguntas** validadas para Colombia

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

**Total:** 6 bundles, **42 preguntas nuevas** para Colombia

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

**Contexto Crítico:** La organización `worldexams` fue flagueada por GitHub debido a la creación masiva de repositorios (20+ en corto tiempo). Se envió ticket de soporte explicando el propósito educativo legítimo del proyecto. **NO CREAR MÁS REPOS HASTA QUE SE RESUELVA EL FLAG.**

**Progreso por Componente:**
- [x] 🏗️ Infraestructura: 80% (Supabase configurado, GitHub Actions base)
- [x] 🔗 Backend: 70% (Edge Functions, RLS policies)
- [x] 🎨 Template UI Base: 100% (saber-co como fuente)
- [ ] 🌍 Customización por País: 25% (5/20 repos completos)
- [ ] 🔄 Sistema de Sincronización: 0% (pendiente `question-sync`)
- [ ] 🧪 Testing: 10% (validación básica)
- [ ] 📚 Documentación: 60% (AGENTS.md, MASTER_PLAN.md listos)

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

**Nota:** NO crear estos repos hasta resolver el flag de GitHub. Esto agregaría evidencia negativa al ticket de soporte.

### 🔧 Repos Adicionales Existentes

| Repo | Propósito | Estado |
|------|-----------|--------|
| `serbachiller-ec` | 🇪🇨 Ecuador | ⬜ Pendiente (aplicar template) |
| `atar-au` | 🇦🇺 Australia | ⬜ Pendiente (aplicar template) |
| `gcse-uk` | 🇬🇧 UK | ⬜ Pendiente (aplicar template) |
| `selectividad-es` | 🇪🇸 España | ⬜ Pendiente (aplicar template) |
| `opsu-ve` | 🇻🇪 Venezuela | ⬜ Pendiente (aplicar template) |

---

## 🛠️ Infraestructura y Automatización

| ID    | Tarea                                           | Prioridad | Estado      | Responsable |
|-------|-------------------------------------------------|-----------|-------------|-------------|
| I-01  | Crear repo privado `worldexams/admin`           | 🔴 CRÍTICA | ⬜ Pendiente | Usuario     |
| I-02  | Mover scripts a `admin/scripts/`                | ALTA      | ⬜ Pendiente | Cascade     |
| I-03  | Crear `admin/config/countries.json` centralizado| ALTA      | ⬜ Pendiente | Cascade     |
| I-04  | Crear `.gitignore` para `temp/` en admin        | MEDIA     | ⬜ Pendiente | Cascade     |
| I-05  | Commit actual de worldexams workspace           | ALTA      | ✅ Completado | Cascade     |
| I-06  | Crear `AGENT_CONTEXT.md` para continuación      | ALTA      | ✅ Completado | Cascade     |
| I-07  | Actualizar `.github/copilot-instructions.md`    | ALTA      | ✅ Completado | Cascade     |
| I-08  | Crear repo `question-sync` (sincronización)     | MEDIA     | ❌ Bloqueado | Flag GitHub |
| I-09  | Implementar Event Bus con Supabase Realtime     | MEDIA     | ⬜ Pendiente | Cascade     |

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
