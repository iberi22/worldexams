# Sistema de Generación Masiva de Preguntas - WorldExams

**Fecha:** 2026-04-03
**Estado:** DISEÑO FINALIZADO - EJECUCIÓN PENDIENTE
**Versión Protocolo:** 5.1

---

## 1. Visión General

Sistema de generación masiva usando múltiples agentes IA para crear bundles de preguntas siguiendo el **Protocol v5.1**. El sistema genera preguntas en bruto que pasan por un pipeline de curación antes de ser publicadas.

### Objetivos

1. **Escala:** Generar miles de preguntas de alta calidad para ICFES Saber 11
2. **Velocidad:** Usar múltiples agentes en paralelo
3. **Calidad:** Pipeline de curación con revisión humana + agencial
4. **Transparencia:** Tracking completo de origen, calidad y estado de curación

---

## 2. Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────────┐
│                    WORLDEXAMS GENERATION PIPELINE                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐       │
│  │   RESEARCH   │────▶│   GENERATE    │────▶│    REVIEW    │       │
│  │   (Agents)   │     │   (Agents)    │     │   (Agent)    │       │
│  └──────────────┘     └──────────────┘     └──────────────┘       │
│         │                     │                     │               │
│         ▼                     ▼                     ▼               │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐       │
│  │   Context    │     │   Raw Bundle │     │  CURATED     │       │
│  │   Database   │     │   (unrevised)│     │  BUNDLES     │       │
│  └──────────────┘     └──────────────┘     └──────────────┘       │
│                              │                     │               │
│                              ▼                     ▼               │
│                       ┌──────────────┐     ┌──────────────┐        │
│                       │   PENDING    │────▶│   PREMIUM    │        │
│                       │   REVIEW     │     │     API      │        │
│                       │   (human)    │     │             │        │
│                       └──────────────┘     └──────────────┘        │
│                              │                                    │
│                              ▼                                    │
│                       ┌──────────────┐                           │
│                       │   QUESTION   │                           │
│                       │   CURATED    │                           │
│                       │  (opensource)│                           │
│                       └──────────────┘                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Agentes Disponibles

| Agente | Modelo | Capacidad | Uso |
|--------|--------|-----------|-----|
| **OpenCode** | kimi-k2.5 | ★★★★★ | Generación principal de bundles |
| **OpenCode** | glm-5 | ★★★★☆ | Tareas complejas, validación |
| **OpenCode** | minimax-m2.5-free | ★★★☆☆ | Tareas ligeras, gratuitas |
| **Qwen** | qwen-coder | ★★★☆☆ | Investigación, docs |
| **Gemini** | gemini-3.1-pro | ★★★★☆ | Análisis, resúmenes |
| **Claude Code** | o3 | ★★★★★ | Revisión, curación |

### Distribución de Tareas

| Tipo de Tarea | Agente Primary | Agente Secondary |
|--------------|---------------|------------------|
| Investigación de tema | Qwen | Gemini |
| Generación Math | kimi-k2.5 | glm-5 |
| Generación Language | kimi-k2.5 | Claude |
| Generación Science | glm-5 | kimi-k2.5 |
| Revisión bundles | Claude | Gemini |
| Validación calidad | Claude | kimi-k2.5 |

---

## 4. Formato de Bundle Generado

### Frontmatter para Raw (Unrevised) Bundles

```yaml
---
id: "CO-MAT-11-P1-algebra-003-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "algebra"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
bundle_index: 3
alignment: "ICFES Saber 11 + MEN"

# METADATA DE GENERACIÓN
generation:
  agent: "kimi-k2.5"
  model: "opencode-go/kimi-k2.5"
  timestamp: "2026-04-03T10:30:00Z"
  prompt_version: "v1"
  context_used: true
  research_summary: "Based on ICFES 2025 framework + MEN DBA"

# ESTADO DE CALIDAD
quality_status: "UNREVISED"
generation_status: "RAW"
needs_human_review: true

# CURACIÓN
curation:
  human_review_required: true
  human_reviewed: false
  human_reviewer: null
  human_review_date: null
  human_quality_score: null
  community_curated: false
  community_curation_count: 0
  agent_curated: false
  agent_curated_by: null
  agent_curation_date: null

# LICENCIA
license: "CC BY-NC-SA 4.0"
open_source: false
---
```

### Campo `quality_status` - Estados Posibles

| Estado | Descripción | Acceso |
|--------|-------------|--------|
| `UNREVISED` | Recién generado, sin revisar | Solo curadores |
| `PENDING_HUMAN_REVIEW` | En cola para revisión humana | Solo curadores |
| `AGENT_APPROVED` | Aprobado por agente de curacíon | Premium API |
| `HUMAN_APPROVED` | Aprobado por humano | Premium API |
| `REJECTED` | Rechazado, necesita regeneración | Solo curadores |
| `COMMUNITY_CURATED` | Curada por la comunidad | Premium API |
| `OPEN_SOURCE` | Liberada con licencia abierta | Público |

---

## 5. Pipeline de Generación

### Fase 1: Planificación de Topics

```
GRADO 11 - SABER 11 (ICFES)
├── MATEMÁTICAS
│   ├── P1: funciones, limites, continuidad, inecuaciones
│   ├── P2: derivadas, aplicaciones, estadistica
│   ├── P3: calculo integral, derivadas
│   └── P4: integrales, probabilidad
├── LECTURA CRÍTICA
│   ├── P1: textos-continuos, textos-discontinuos, ensayo-filosofico
│   ├── P2: textos-literarios, argumentacion
│   ├── P3: medios-grafica, interpretacion
│   └── P4: filosofia-etica, pensamiento-critico
├── CIENCIAS NATURALES
│   ├── P1: fisicoquimica-genetica, fisica, quimica-organica
│   ├── P2: termodinamica, trabajo-energia
│   ├── P3: ondas-sonido, electromagnetismo
│   └── P4: quimica-organica, bioquimica
├── SOCIALES CIUDADANAS
│   ├── P1: pensamiento-social, geopolitica, multiperspectivismo
│   ├── P2: economia-desarrollo, politica
│   ├── P3: constitucion-democracia, derechos
│   └── P4: globalizacion-desarrollo
└── INGLÉS
    ├── P1: global-issues, uso-del-lenguaje
    ├── P2: tech-society, comunicacion
    ├── P3: health-psychology, temas-globales
    └── P4: global-citizens-art, cultura
```

### Fase 2: Tareas de Generación (Batches)

Cada tanda genera 5-10 bundles por agente.

| Batch | Agente | Topics | Objetivo |
|-------|--------|--------|----------|
| G11-MAT-001 | kimi-k2.5 | P1 matematicas | 10 bundles |
| G11-MAT-002 | glm-5 | P2-P3 matematicas | 10 bundles |
| G11-LEC-001 | kimi-k2.5 | P1-P2 lectura-critica | 10 bundles |
| G11-CIEN-001 | glm-5 | P1-P2 ciencias | 10 bundles |
| G11-SOC-001 | Claude | P1-P2 sociales | 8 bundles |
| G11-ING-001 | kimi-k2.5 | P1-P2 ingles | 10 bundles |

### Fase 3: Revisión Agencial

El **Agente de Curación** revisa cada bundle:

```
Review Checklist:
□ Frontmatter completo y válido
□ 20 preguntas presentes
□ Formato MASTERY v5.1
□ Sin patrones prohibidos
□ Distractores plausibles
□ Alineación ICFES correcta
□ Dificultad progresiva (3-10)
□ Sin errores de idioma
□ Sin contenido problemático

Resultado: APPROVE / REJECT / NEEDS_HUMAN
```

### Fase 4: Revisión Humana (Sesión de Revisión)

Las preguntas se acceden **solo al ser respondidas** en la plataforma.

En la vista de resultados, el usuario ve:
- Información de la pregunta
- Caracterización pedagógica
- Protocolo y versión de creación
- Estado de curación

El usuario puede calificar la pregunta:
- ✅ Útil
- ❌ Problema con la pregunta
- 💡 Mejorar explicación

---

## 6. Sistema de Curación Progresiva

```
PREGUNTA GENERADA
       │
       ▼
┌─────────────────┐
│    UNREVISED    │ ◀── Sin revisar
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ PENDING_HUMAN   │ ◀── En cola para revisión
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐  ┌────────┐
│AGENT  │  │AGENT   │
│REJECT │  │APPROVE │
└───┬───┘  └────┬───┘
    │           │
    ▼           ▼
┌───────┐  ┌─────────────────┐
│REGEN- │  │ PREMIUM API     │
│ERATE  │  │ (visible only   │
└───────┘  │ after answer)   │
           └────────┬────────┘
                    │
                    ▼
           ┌─────────────────┐
           │ COMMUNITY_       │
           │ CURATED          │
           │ (user ratings)   │
           └────────┬────────┘
                    │
         10+ ratings positive
                    │
                    ▼
           ┌─────────────────┐
           │   OPEN_SOURCE   │
           │   (CC BY-SA)    │
           └─────────────────┘
```

---

## 7. Acceso a Preguntas

### Modelo de Acceso

| Tipo | Cómo se Accede | Visible en Resultados |
|------|----------------|----------------------|
| **UNREVISED** | Solo curadores | Sí (marcado como "pendiente") |
| **PENDING_HUMAN** | Solo curadores | Sí (marcado como "pendiente") |
| **AGENT_APPROVED** | Solo al responder examen | Sí (con badge "verificado IA") |
| **HUMAN_APPROVED** | Solo al responder examen | Sí (con badge "verificado humano") |
| **COMMUNITY_CURATED** | Solo al responder examen | Sí (con badge "curada por comunidad") |
| **OPEN_SOURCE** | Acceso libre | Sí (con badge "open source") |

### Interfaz de Resultados

```
┌─────────────────────────────────────────────────────────────┐
│ RESULTADOS DEL EXAMEN                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Pregunta 15: Límites y Continuidad          ⭐ Verificada IA │
│ ──────────────────────────────────────────────────────────── │
│ Topic: CO-MAT-11-P1-continuidad-001-MASTERY                 │
│ Protocolo: v5.1 | Generada por: kimi-k2.5 | 2026-04-03     │
│ Estado: AGENT_APPROVED                                      │
│                                                             │
│ Tu respuesta: B                                             │
│ Respuesta correcta: B                                      │
│                                                           │
│ ¿Esta pregunta fue útil?  👍 45  👎 2                       │
│                                                             │
│ [Marcar como problema]                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Frontend - Página de Revisión

### Acceso

- URL: `/revisar` o `/curar`
- Solo usuarios con rol `curator` o `admin`

### Vista de Curador

```
┌─────────────────────────────────────────────────────────────┐
│ PANEL DE CURACIÓN DE PREGUNTAS                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Filtros:                                                    │
│ [Estado: PENDING_HUMAN ▼] [Grado: 11 ▼] [Materia: ▼]       │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 📋 CO-MAT-11-P1-continuidad-003-MASTERY                 │ │
│ │ Grado 11 | Matemáticas | Periodo 1 | 20 preguntas       │ │
│ │ Generada: kimi-k2.5 @ 2026-04-03                        │ │
│ │ Agente: APPROVED                                        │ │
│ │                                                         │ │
│ │ [Ver Preguntas] [Aprobar] [Rechazar] [Regenerar]        │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 📋 CO-LEC-11-P2-textos-literarios-001-MASTERY           │ │
│ │ Grado 11 | Lectura Crítica | Periodo 2 | 20 preguntas   │ │
│ │ Generada: glm-5 @ 2026-04-03                            │ │
│ │ Agente: REJECT (needs human review)                     │ │
│ │ Razón: 3 distractors implausible                       │ │
│ │                                                         │ │
│ │ [Ver Preguntas] [Apropar] [Rechazar] [Regenerar]        │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. Comandos de Ejecución

### Generar Lote Completo Grado 11

```bash
# Usando el orchestrator
node scripts/massive-generation.js --grade=11 --batch=all

# Generar solo Matemáticas P1
node scripts/massive-generation.js --grade=11 --subject=matematicas --period=1

# Generar con agente específico
node scripts/massive-generation.js --grade=11 --agent=kimi-k2.5 --batch=mat-lect
```

### Revisar Bundles Pendientes

```bash
# Revisar todos los pending
node scripts/review-pending.js --status=PENDING_HUMAN

# Revisar por materia
node scripts/review-pending.js --subject=matematicas --limit=20
```

### Actualizar Estados

```bash
# Marcar como community curated
node scripts/update-curation.js --id=CO-MAT-11-P1-xxx --community-curated

# Liberar a open source
node scripts/update-curation.js --id=CO-MAT-11-P1-xxx --open-source
```

---

## 10. Métricas del Sistema

| Métrica | Target 30 días | Target 90 días |
|---------|---------------|---------------|
| Preguntas generadas | 2,000 | 10,000 |
| Preguntas aprobadas agente | 1,600 (80%) | 8,000 (80%) |
| Preguntas aprobadas humano | 800 (40%) | 4,000 (40%) |
| Preguntas community curated | 200 (10%) | 2,000 (20%) |
| Preguntas open source | 50 (2.5%) | 500 (5%) |
| Bundles completos | 100 | 500 |

---

## 11. Estructura de Archivos

```
questions_data/
└── colombia/
    └── [subject]/
        └── grado-11/
            └── [period]/
                └── [topic]/
                    ├── CO-[SUB]-11-P[N]-[TOPIC]-[ID]-MASTERY-bundle.md
                    ├── CO-[SUB]-11-P[N]-[TOPIC]-[ID]-REVIEW.md
                    └── metadata.json

.worldexams/
├── generation/
│   ├── queue.json           # Cola de generación
│   ├── history/
│   │   ├── 2026-04/
│   │   │   ├── batch-001.json
│   │   │   └── batch-002.json
│   │   └── ...
│   └── agents/
│       └── agent-status.json
├── curation/
│   ├── pending.json         # Cola de revisión
│   ├── approved.json
│   ├── rejected.json
│   └── community-ratings.json
└── audit/
    └── ...
```

---

## 12. Sécurité y Permisos

| Rol | Permisos |
|-----|----------|
| `system` | Generar, aprobar, rechazar |
| `curator` | Ver pending, aprobar, rechazar |
| `admin` | Todo lo anterior + liberar open source |
| `user` | Responder, calificar (visible post-respuesta) |

---

*Documento generado: 2026-04-03*
*Última actualización: 2026-04-03*
