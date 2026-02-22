# Gestión de Tareas: World Exams Organization

Última actualización: 2026-01-26

## 🎯 Resumen Ejecutivo y Estado Actual

**✅ COMPLETADO:** **Licenciamiento Source Available** (PolyForm Shield + CC BY-NC-SA).
**✅ COMPLETADO:** **Estrategia API Definida** (Cloudflare Workers + Supabase).
**✅ COMPLETADO:** **Inglés Global** (Fase 1 y 2).

**Estado General:** 🚀 **LISTO PARA IMPLEMENTACIÓN FASE 4 (API & B2B)**

---

## 📋 Tareas Activas (Sprint Actual - API & Monetización)

### 🎨 UX/UI Improvements
- [x] **Mobile Question Card Modal:** Implement modal/overlay view for question cards on mobile when clicked. <!-- id: 20 -->

### 🚀 Deploy & Release
- [x] **Deploy to Production (Main):** Review changelog and deploy via Wrangler. <!-- id: 200 -->


### 🚀 Fase: Expansión de Contenido (Meta 100/Periodo)

#### 1. Redistribución y Limpieza
- [x] **Redistribuir Inglés Grado 3:** Mover exceso de P1 a P2-P4. (P1: Alphabet/Numbers, P2: Colors, P3: Family, P4: Animals) <!-- id: 10 -->
- [x] **Auditoría de "Unknowns":** Completado. 0 bundles sin periodo. Hallazgo: Grados 4 y 5 requieren redistribución (100% en P1). <!-- id: 11 -->
- [/] **Redistribuir Inglés Grados 4 y 5:** Balancear carga P1-P4. <!-- id: 100 -->

#### 2. Generación Prioritaria (Brechas Críticas)
- [/] **Inglés Grados 4-5 (A1):** Generar 800 preguntas (40 bundles/grado). (Prototipos v3.0 creados) <!-- id: 12 -->
- [ ] **Inglés Grados 6-9 (A2):** Generar 1,600 preguntas (40 bundles/grado). <!-- id: 13 -->
- [ ] **Inglés Grado 10 (B1):** Generar 400 preguntas (40 bundles). <!-- id: 14 -->
- [ ] **Lectura Crítica Grado 3:** Generar 400 preguntas (40 bundles). <!-- id: 15 -->

#### 3. Relleno de Contenido (Gap +60)
- [ ] **Grados 4-5 (Math/CN/Soc):** Generar 1,440 preguntas (+240/materia). <!-- id: 16 -->
- [ ] **Grados 6-9 (Math/CN/Soc):** Generar 2,880 preguntas (+240/materia). <!-- id: 17 -->

---

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
- [x] **Fix Report Question Selector:** Fix invisible text in "Reportar Pregunta" dropdown due to white-on-white styling in `ExamView.svelte`. (2026-02-08) <!-- id: 5 -->

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

### 📚 Fase: Generación de Contenido Grados 6°, 7° y 8° (Protocol v3.0)

> **Assignee:** Jules (AI Agent) | **Label:** `jules`
> **Formato:** Protocol v3.0 (10 preguntas/bundle, dificultad 1-5)
> **Referencia:** `skills/create_bundles_manually/SKILL.md`
> **Estructura:** `src/content/questions/colombia/[asignatura]/grado-[N]/[tema]/CO-[SUBJ]-[N]-[tema]-001-v3-bundle.md`

#### 📐 Grado 6 — Matemáticas (16 bundles)

| Periodo | Tema (Topic Folder) | Bundle ID Prefix | Estado |
|---------|---------------------|------------------|--------|
| 1 | `numeros-naturales-potencias` | `CO-MAT-6-numeros-naturales-potencias-001` | ⬜ |
| 1 | `multiplos-divisores-mcm-mcd` | `CO-MAT-6-multiplos-divisores-mcm-mcd-001` | ⬜ |
| 1 | `numeros-decimales-operaciones` | `CO-MAT-6-numeros-decimales-operaciones-001` | ⬜ |
| 1 | `problemas-numeros-naturales` | `CO-MAT-6-problemas-numeros-naturales-001` | ⬜ |
| 2 | `fracciones-operaciones` | `CO-MAT-6-fracciones-operaciones-001` | ⬜ |
| 2 | `razones-proporciones` | `CO-MAT-6-razones-proporciones-001` | ⬜ |
| 2 | `numeros-enteros` | `CO-MAT-6-numeros-enteros-001` | ⬜ |
| 2 | `plano-cartesiano` | `CO-MAT-6-plano-cartesiano-001` | ⬜ |
| 3 | `geometria-angulos-triangulos` | `CO-MAT-6-geometria-angulos-triangulos-001` | ⬜ |
| 3 | `perimetro-area-poligonos` | `CO-MAT-6-perimetro-area-poligonos-001` | ⬜ |
| 3 | `transformaciones-geometricas` | `CO-MAT-6-transformaciones-geometricas-001` | ⬜ |
| 3 | `unidades-medida-conversion` | `CO-MAT-6-unidades-medida-conversion-001` | ⬜ |
| 4 | `estadistica-tablas-graficos` | `CO-MAT-6-estadistica-tablas-graficos-001` | ⬜ |
| 4 | `medidas-tendencia-central` | `CO-MAT-6-medidas-tendencia-central-001` | ⬜ |
| 4 | `probabilidad-conteo` | `CO-MAT-6-probabilidad-conteo-001` | ⬜ |
| 4 | `ecuaciones-basicas` | `CO-MAT-6-ecuaciones-basicas-001` | ⬜ |

#### 🔬 Grado 6 — Ciencias Naturales (16 bundles)

| Periodo | Tema (Topic Folder) | Bundle ID Prefix | Estado |
|---------|---------------------|------------------|--------|
| 1 | `celula-estructura-funcion` | `CO-CN-6-celula-estructura-funcion-001` | ⬜ |
| 1 | `niveles-organizacion-seres` | `CO-CN-6-niveles-organizacion-seres-001` | ⬜ |
| 1 | `clasificacion-seres-vivos` | `CO-CN-6-clasificacion-seres-vivos-001` | ⬜ |
| 1 | `nutricion-digestion` | `CO-CN-6-nutricion-digestion-001` | ⬜ |
| 2 | `respiracion-circulacion` | `CO-CN-6-respiracion-circulacion-001` | ⬜ |
| 2 | `excrecion-homeostasis` | `CO-CN-6-excrecion-homeostasis-001` | ⬜ |
| 2 | `reproduccion-celular` | `CO-CN-6-reproduccion-celular-001` | ⬜ |
| 2 | `ecologia-relaciones` | `CO-CN-6-ecologia-relaciones-001` | ⬜ |
| 3 | `materia-propiedades-clasificacion` | `CO-CN-6-materia-propiedades-clasificacion-001` | ⬜ |
| 3 | `mezclas-metodos-separacion` | `CO-CN-6-mezclas-metodos-separacion-001` | ⬜ |
| 3 | `atomo-estructura-basica` | `CO-CN-6-atomo-estructura-basica-001` | ⬜ |
| 3 | `tabla-periodica-introduccion` | `CO-CN-6-tabla-periodica-introduccion-001` | ⬜ |
| 4 | `energia-formas-transformaciones` | `CO-CN-6-energia-formas-transformaciones-001` | ⬜ |
| 4 | `calor-temperatura` | `CO-CN-6-calor-temperatura-001` | ⬜ |
| 4 | `luz-sonido-ondas` | `CO-CN-6-luz-sonido-ondas-001` | ⬜ |
| 4 | `maquinas-simples-movimiento` | `CO-CN-6-maquinas-simples-movimiento-001` | ⬜ |

#### 🌍 Grado 6 — Sociales (16 bundles)

| Periodo | Tema (Topic Folder) | Bundle ID Prefix | Estado |
|---------|---------------------|------------------|--------|
| 1 | `civilizaciones-antiguas-mesopotamia` | `CO-SOC-6-civilizaciones-antiguas-mesopotamia-001` | ⬜ |
| 1 | `antiguo-egipto-nilo` | `CO-SOC-6-antiguo-egipto-nilo-001` | ⬜ |
| 1 | `grecia-antigua-democracia` | `CO-SOC-6-grecia-antigua-democracia-001` | ⬜ |
| 1 | `roma-republica-imperio` | `CO-SOC-6-roma-republica-imperio-001` | ⬜ |
| 2 | `edad-media-feudalismo` | `CO-SOC-6-edad-media-feudalismo-001` | ⬜ |
| 2 | `islam-cruzadas` | `CO-SOC-6-islam-cruzadas-001` | ⬜ |
| 2 | `renacimiento-humanismo` | `CO-SOC-6-renacimiento-humanismo-001` | ⬜ |
| 2 | `descubrimiento-conquista-america` | `CO-SOC-6-descubrimiento-conquista-america-001` | ⬜ |
| 3 | `geografia-continentes-oceanos` | `CO-SOC-6-geografia-continentes-oceanos-001` | ⬜ |
| 3 | `relieve-climas-mundo` | `CO-SOC-6-relieve-climas-mundo-001` | ⬜ |
| 3 | `poblacion-migraciones` | `CO-SOC-6-poblacion-migraciones-001` | ⬜ |
| 3 | `culturas-precolombinas` | `CO-SOC-6-culturas-precolombinas-001` | ⬜ |
| 4 | `organizacion-territorial-colombia` | `CO-SOC-6-organizacion-territorial-colombia-001` | ⬜ |
| 4 | `democracia-participacion` | `CO-SOC-6-democracia-participacion-001` | ⬜ |
| 4 | `derechos-ninos-adolescentes` | `CO-SOC-6-derechos-ninos-adolescentes-001` | ⬜ |
| 4 | `economia-sectores-productivos` | `CO-SOC-6-economia-sectores-productivos-001` | ⬜ |

---

#### 📐 Grado 7 — Matemáticas (16 bundles)

| Periodo | Tema (Topic Folder) | Bundle ID Prefix | Estado |
|---------|---------------------|------------------|--------|
| 1 | `numeros-enteros-operaciones` | `CO-MAT-7-numeros-enteros-operaciones-001` | ⬜ |
| 1 | `numeros-racionales` | `CO-MAT-7-numeros-racionales-001` | ⬜ |
| 1 | `potenciacion-radicacion` | `CO-MAT-7-potenciacion-radicacion-001` | ⬜ |
| 1 | `operaciones-fracciones-decimales` | `CO-MAT-7-operaciones-fracciones-decimales-001` | ⬜ |
| 2 | `proporcionalidad-directa-inversa` | `CO-MAT-7-proporcionalidad-directa-inversa-001` | ⬜ |
| 2 | `porcentajes-aplicaciones` | `CO-MAT-7-porcentajes-aplicaciones-001` | ⬜ |
| 2 | `regla-tres-compuesta` | `CO-MAT-7-regla-tres-compuesta-001` | ⬜ |
| 2 | `magnitudes-conversiones` | `CO-MAT-7-magnitudes-conversiones-001` | ⬜ |
| 3 | `expresiones-algebraicas` | `CO-MAT-7-expresiones-algebraicas-001` | ⬜ |
| 3 | `ecuaciones-lineales` | `CO-MAT-7-ecuaciones-lineales-001` | ⬜ |
| 3 | `polinomios-operaciones` | `CO-MAT-7-polinomios-operaciones-001` | ⬜ |
| 3 | `inecuaciones-lineales` | `CO-MAT-7-inecuaciones-lineales-001` | ⬜ |
| 4 | `transformaciones-plano` | `CO-MAT-7-transformaciones-plano-001` | ⬜ |
| 4 | `semejanza-congruencia` | `CO-MAT-7-semejanza-congruencia-001` | ⬜ |
| 4 | `estadistica-descriptiva` | `CO-MAT-7-estadistica-descriptiva-001` | ⬜ |
| 4 | `probabilidad-experimentos` | `CO-MAT-7-probabilidad-experimentos-001` | ⬜ |

#### 🔬 Grado 7 — Ciencias Naturales (16 bundles)

| Periodo | Tema (Topic Folder) | Bundle ID Prefix | Estado |
|---------|---------------------|------------------|--------|
| 1 | `celula-organelos-funciones` | `CO-CN-7-celula-organelos-funciones-001` | ⬜ |
| 1 | `microscopio-tecnicas-observacion` | `CO-CN-7-microscopio-tecnicas-observacion-001` | ⬜ |
| 1 | `microorganismos-bacterias-virus` | `CO-CN-7-microorganismos-bacterias-virus-001` | ⬜ |
| 1 | `tejidos-vegetales-animales` | `CO-CN-7-tejidos-vegetales-animales-001` | ⬜ |
| 2 | `sistema-oseo-muscular` | `CO-CN-7-sistema-oseo-muscular-001` | ⬜ |
| 2 | `sistema-digestivo-nutricion` | `CO-CN-7-sistema-digestivo-nutricion-001` | ⬜ |
| 2 | `sistema-circulatorio-respiratorio` | `CO-CN-7-sistema-circulatorio-respiratorio-001` | ⬜ |
| 2 | `sistema-excretor-homeostasis` | `CO-CN-7-sistema-excretor-homeostasis-001` | ⬜ |
| 3 | `propiedades-materia-cambios` | `CO-CN-7-propiedades-materia-cambios-001` | ⬜ |
| 3 | `tabla-periodica-elementos` | `CO-CN-7-tabla-periodica-elementos-001` | ⬜ |
| 3 | `enlaces-quimicos-basicos` | `CO-CN-7-enlaces-quimicos-basicos-001` | ⬜ |
| 3 | `reacciones-quimicas-intro` | `CO-CN-7-reacciones-quimicas-intro-001` | ⬜ |
| 4 | `ecosistemas-biomas-colombia` | `CO-CN-7-ecosistemas-biomas-colombia-001` | ⬜ |
| 4 | `cadenas-redes-troficas` | `CO-CN-7-cadenas-redes-troficas-001` | ⬜ |
| 4 | `ciclos-biogeoquimicos` | `CO-CN-7-ciclos-biogeoquimicos-001` | ⬜ |
| 4 | `impacto-ambiental-sostenibilidad` | `CO-CN-7-impacto-ambiental-sostenibilidad-001` | ⬜ |

#### 🌍 Grado 7 — Sociales (16 bundles)

| Periodo | Tema (Topic Folder) | Bundle ID Prefix | Estado |
|---------|---------------------|------------------|--------|
| 1 | `colonia-espanola-america` | `CO-SOC-7-colonia-espanola-america-001` | ⬜ |
| 1 | `sociedad-colonial-castas` | `CO-SOC-7-sociedad-colonial-castas-001` | ⬜ |
| 1 | `economia-colonial-encomienda` | `CO-SOC-7-economia-colonial-encomienda-001` | ⬜ |
| 1 | `iglesia-cultura-colonial` | `CO-SOC-7-iglesia-cultura-colonial-001` | ⬜ |
| 2 | `ilustracion-revoluciones` | `CO-SOC-7-ilustracion-revoluciones-001` | ⬜ |
| 2 | `independencias-latinoamerica` | `CO-SOC-7-independencias-latinoamerica-001` | ⬜ |
| 2 | `revolucion-industrial` | `CO-SOC-7-revolucion-industrial-001` | ⬜ |
| 2 | `formacion-estados-nacionales` | `CO-SOC-7-formacion-estados-nacionales-001` | ⬜ |
| 3 | `geografia-america-latina` | `CO-SOC-7-geografia-america-latina-001` | ⬜ |
| 3 | `recursos-naturales-explotacion` | `CO-SOC-7-recursos-naturales-explotacion-001` | ⬜ |
| 3 | `problemas-ambientales-colombia` | `CO-SOC-7-problemas-ambientales-colombia-001` | ⬜ |
| 3 | `diversidad-cultural-etnica` | `CO-SOC-7-diversidad-cultural-etnica-001` | ⬜ |
| 4 | `derechos-humanos-generaciones` | `CO-SOC-7-derechos-humanos-generaciones-001` | ⬜ |
| 4 | `conflicto-resolucion-pacifica` | `CO-SOC-7-conflicto-resolucion-pacifica-001` | ⬜ |
| 4 | `organismos-internacionales` | `CO-SOC-7-organismos-internacionales-001` | ⬜ |
| 4 | `ciudadania-convivencia` | `CO-SOC-7-ciudadania-convivencia-001` | ⬜ |

---

#### 📐 Grado 8 — Matemáticas (16 bundles)

| Periodo | Tema (Topic Folder) | Bundle ID Prefix | Estado |
|---------|---------------------|------------------|--------|
| 1 | `numeros-reales-irracionales` | `CO-MAT-8-numeros-reales-irracionales-001` | ⬜ |
| 1 | `factorizacion-algebraica` | `CO-MAT-8-factorizacion-algebraica-001` | ⬜ |
| 1 | `productos-notables` | `CO-MAT-8-productos-notables-001` | ⬜ |
| 1 | `fracciones-algebraicas` | `CO-MAT-8-fracciones-algebraicas-001` | ⬜ |
| 2 | `ecuaciones-lineales-sistemas` | `CO-MAT-8-ecuaciones-lineales-sistemas-001` | ⬜ |
| 2 | `funciones-lineales-graficas` | `CO-MAT-8-funciones-lineales-graficas-001` | ⬜ |
| 2 | `desigualdades-inecuaciones` | `CO-MAT-8-desigualdades-inecuaciones-001` | ⬜ |
| 2 | `relaciones-funciones` | `CO-MAT-8-relaciones-funciones-001` | ⬜ |
| 3 | `teorema-pitagoras` | `CO-MAT-8-teorema-pitagoras-001` | ⬜ |
| 3 | `figuras-planas-area-perimetro` | `CO-MAT-8-figuras-planas-area-perimetro-001` | ⬜ |
| 3 | `solidos-volumen-superficie` | `CO-MAT-8-solidos-volumen-superficie-001` | ⬜ |
| 3 | `trigonometria-introductoria` | `CO-MAT-8-trigonometria-introductoria-001` | ⬜ |
| 4 | `estadistica-bivariada` | `CO-MAT-8-estadistica-bivariada-001` | ⬜ |
| 4 | `probabilidad-compuesta` | `CO-MAT-8-probabilidad-compuesta-001` | ⬜ |
| 4 | `diagramas-arbol-conteo` | `CO-MAT-8-diagramas-arbol-conteo-001` | ⬜ |
| 4 | `analisis-datos-graficos` | `CO-MAT-8-analisis-datos-graficos-001` | ⬜ |

#### 🔬 Grado 8 — Ciencias Naturales (16 bundles)

| Periodo | Tema (Topic Folder) | Bundle ID Prefix | Estado |
|---------|---------------------|------------------|--------|
| 1 | `reproduccion-humana` | `CO-CN-8-reproduccion-humana-001` | ⬜ |
| 1 | `sistema-endocrino-hormonas` | `CO-CN-8-sistema-endocrino-hormonas-001` | ⬜ |
| 1 | `genetica-herencia-basica` | `CO-CN-8-genetica-herencia-basica-001` | ⬜ |
| 1 | `salud-sexual-prevencion` | `CO-CN-8-salud-sexual-prevencion-001` | ⬜ |
| 2 | `sistema-nervioso-sentidos` | `CO-CN-8-sistema-nervioso-sentidos-001` | ⬜ |
| 2 | `sistema-inmunologico` | `CO-CN-8-sistema-inmunologico-001` | ⬜ |
| 2 | `enfermedades-prevencion` | `CO-CN-8-enfermedades-prevencion-001` | ⬜ |
| 2 | `drogas-sustancias-psicoactivas` | `CO-CN-8-drogas-sustancias-psicoactivas-001` | ⬜ |
| 3 | `reacciones-quimicas-tipos` | `CO-CN-8-reacciones-quimicas-tipos-001` | ⬜ |
| 3 | `estequiometria-basica` | `CO-CN-8-estequiometria-basica-001` | ⬜ |
| 3 | `acidos-bases-ph` | `CO-CN-8-acidos-bases-ph-001` | ⬜ |
| 3 | `soluciones-concentracion` | `CO-CN-8-soluciones-concentracion-001` | ⬜ |
| 4 | `movimiento-velocidad-aceleracion` | `CO-CN-8-movimiento-velocidad-aceleracion-001` | ⬜ |
| 4 | `leyes-newton-fuerzas` | `CO-CN-8-leyes-newton-fuerzas-001` | ⬜ |
| 4 | `energia-trabajo-potencia` | `CO-CN-8-energia-trabajo-potencia-001` | ⬜ |
| 4 | `ondas-sonido-luz` | `CO-CN-8-ondas-sonido-luz-001` | ⬜ |

#### 🌍 Grado 8 — Sociales (16 bundles)

| Periodo | Tema (Topic Folder) | Bundle ID Prefix | Estado |
|---------|---------------------|------------------|--------|
| 1 | `revolucion-francesa` | `CO-SOC-8-revolucion-francesa-001` | ⬜ |
| 1 | `independencia-eeuu` | `CO-SOC-8-independencia-eeuu-001` | ⬜ |
| 1 | `napoleon-imperialismo` | `CO-SOC-8-napoleon-imperialismo-001` | ⬜ |
| 1 | `revoluciones-liberales-s19` | `CO-SOC-8-revoluciones-liberales-s19-001` | ⬜ |
| 2 | `primera-guerra-mundial` | `CO-SOC-8-primera-guerra-mundial-001` | ⬜ |
| 2 | `revolucion-rusa-comunismo` | `CO-SOC-8-revolucion-rusa-comunismo-001` | ⬜ |
| 2 | `segunda-guerra-mundial` | `CO-SOC-8-segunda-guerra-mundial-001` | ⬜ |
| 2 | `guerra-fria-bipolaridad` | `CO-SOC-8-guerra-fria-bipolaridad-001` | ⬜ |
| 3 | `geografia-politica-fronteras` | `CO-SOC-8-geografia-politica-fronteras-001` | ⬜ |
| 3 | `globalizacion-economia-mundial` | `CO-SOC-8-globalizacion-economia-mundial-001` | ⬜ |
| 3 | `desarrollo-subdesarrollo` | `CO-SOC-8-desarrollo-subdesarrollo-001` | ⬜ |
| 3 | `medio-ambiente-cambio-climatico` | `CO-SOC-8-medio-ambiente-cambio-climatico-001` | ⬜ |
| 4 | `constitucion-colombiana-aplicada` | `CO-SOC-8-constitucion-colombiana-aplicada-001` | ⬜ |
| 4 | `mecanismos-participacion-ciudadana` | `CO-SOC-8-mecanismos-participacion-ciudadana-001` | ⬜ |
| 4 | `conflicto-armado-colombiano` | `CO-SOC-8-conflicto-armado-colombiano-001` | ⬜ |
| 4 | `paz-justicia-transicional` | `CO-SOC-8-paz-justicia-transicional-001` | ⬜ |

---

#### 📊 Resumen de Generación Grados 6-8

| Grado | Matemáticas | Ciencias | Sociales | **Total** |
|-------|:-----------:|:--------:|:--------:|:---------:|
| **6** | 16 | 16 | 16 | **48** |
| **7** | 16 | 16 | 16 | **48** |
| **8** | 16 | 16 | 16 | **48** |
| **TOTAL** | **48** | **48** | **48** | **144 bundles (1,440 preguntas)** |

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
