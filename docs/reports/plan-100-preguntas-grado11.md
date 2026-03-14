# 🎯 Plan de Generación: 100+ Preguntas para Colombia Grado 11

> **Objetivo:** Generar 15 packs × 7 preguntas = **105 preguntas Protocol v2.0**
> **Grado:** 11° (Saber 11)
> **País:** 🇨🇴 Colombia
> **Fecha:** 10 de diciembre de 2025

---

## 📊 Estado Actual Grado 11

| Asignatura | Packs Actuales | Objetivo | Nuevos a Crear |
|------------|---------------|----------|----------------|
| **Matemáticas** | 4 | 7 | +3 |
| **Lectura Crítica** | 1 | 3 | +2 |
| **Ciencias Naturales** | 2 | 4 | +2 |
| **Sociales y Ciudadanas** | 2 | 4 | +2 |
| **Inglés** | 1 | 3 | +2 |
| **Informática** | 1 | 2 | +1 |
| **Ciencias Sociales** | 2 | 5 | +3 |

**Total:** 13 packs existentes → **28 packs** (objetivo) = **+15 packs nuevos**

---

## 🎯 Distribución en PRs

### PR #1: Matemáticas Avanzadas (3 packs = 21 preguntas)

| Pack # | Tema | Archivo | Competencia |
|--------|------|---------|-------------|
| 5 | Trigonometría | `CO-MAT-11-trigonometria-005-bundle.md` | Razonamiento cuantitativo |
| 6 | Probabilidad avanzada | `CO-MAT-11-probabilidad-006-bundle.md` | Resolución de problemas |
| 7 | Cálculo diferencial (límites) | `CO-MAT-11-calculo-007-bundle.md` | Pensamiento matemático |

**Fuentes sugeridas:**
- OpenTDB (Mathematics category)
- Khan Academy (Precálculo, Probabilidad)
- Custom (adaptaciones con contexto colombiano)

---

### PR #2: Lectura Crítica y Lenguaje (2 packs = 14 preguntas)

| Pack # | Tema | Archivo | Competencia |
|--------|------|---------|-------------|
| 2 | Textos argumentativos (editorial) | `CO-LEC-11-argumentativo-002-bundle.md` | Pensamiento crítico |
| 3 | Análisis de fuentes periodísticas | `CO-LEC-11-fuentes-003-bundle.md` | Interpretación textual |

**Fuentes sugeridas:**
- Artículos de periódicos colombianos (El Tiempo, El Espectador)
- Editoriales sobre temas actuales
- Custom (adaptación con licencia CC BY)

---

### PR #3: Ciencias Naturales (2 packs = 14 preguntas)

| Pack # | Tema | Archivo | Competencia |
|--------|------|---------|-------------|
| 3 | Genética (Leyes de Mendel) | `CO-CNA-11-genetica-003-bundle.md` | Uso comprensivo del conocimiento |
| 4 | Termodinámica | `CO-CNA-11-termodinamica-004-bundle.md` | Explicación de fenómenos |

**Fuentes sugeridas:**
- OpenTDB (Science: Nature category)
- Khan Academy (Biología, Física)
- Custom (ejemplos con especies colombianas)

---

### PR #4: Sociales, Ciudadanas e Inglés (5 packs = 35 preguntas)

#### Sociales y Ciudadanas (2 packs)

| Pack # | Tema | Archivo | Competencia |
|--------|------|---------|-------------|
| 3 | Conflicto armado colombiano | `CO-SOC-11-conflicto-003-bundle.md` | Pensamiento social |
| 4 | Derechos laborales en Colombia | `CO-SOC-11-trabajo-004-bundle.md` | Interpretación y análisis |

#### Inglés (2 packs)

| Pack # | Tema | Archivo | Competencia |
|--------|------|---------|-------------|
| 2 | Reading Comprehension (Science) | `CO-ING-11-reading-sci-002-bundle.md` | Reading comprehension |
| 3 | Grammar & Vocabulary | `CO-ING-11-grammar-003-bundle.md` | Language use |

#### Informática (1 pack)

| Pack # | Tema | Archivo | Competencia |
|--------|------|---------|-------------|
| 2 | Seguridad informática | `CO-INF-11-seguridad-002-bundle.md` | Pensamiento computacional |

**Fuentes sugeridas:**
- Sociales: Documentos Centro de Memoria Histórica (público)
- Inglés: OpenTDB (English category), news articles
- Informática: Khan Academy (Computing), Custom

---

### PR #5: Ciencias Sociales (Historia y Geografía) (3 packs = 21 preguntas)

| Pack # | Tema | Archivo | Competencia |
|--------|------|---------|-------------|
| 3 | Revolución Industrial | `CO-SOC-11-revolucion-003-bundle.md` | Pensamiento histórico |
| 4 | Geografía económica mundial | `CO-SOC-11-geoeconomia-004-bundle.md` | Análisis de datos |
| 5 | Sistemas políticos contemporáneos | `CO-SOC-11-politica-005-bundle.md` | Pensamiento crítico |

**Fuentes sugeridas:**
- Wikipedia (artículos históricos con CC BY-SA)
- OpenTDB (History, Geography categories)
- Custom (contexto latinoamericano)

---

## 📋 Template de Tracking para Jules

Cada PR debe incluir actualización de `docs/sources/questions-registry.json`:

```json
{
  "pack_id": "CO-MAT-11-trigonometria-005",
  "source": "Khan Academy",
  "source_url": "https://www.khanacademy.org/math/trigonometry",
  "source_id": "khan:trig-unit-circle-001",
  "original_question_hash": "sha256:xyz789...",
  "used_date": "2025-12-10",
  "country": "CO",
  "grado": 11,
  "asignatura": "Matemáticas",
  "tema": "Trigonometría",
  "pack_file": "api/v1/CO/icfes/11/matematicas/5.json",
  "question_ids": [
    "CO-MAT-11-trigonometria-005-v1",
    "CO-MAT-11-trigonometria-005-v2",
    "CO-MAT-11-trigonometria-005-v3",
    "CO-MAT-11-trigonometria-005-v4",
    "CO-MAT-11-trigonometria-005-v5",
    "CO-MAT-11-trigonometria-005-v6",
    "CO-MAT-11-trigonometria-005-v7"
  ],
  "notes": "Adaptado con contexto colombiano - problemas de navegación en río Magdalena"
}
```

---

## ✅ Checklist por PR

### Antes de Crear PR

- [ ] Consultar `questions-registry.json` para evitar duplicados
- [ ] Verificar que `source_url` o `source_id` NO existe
- [ ] Generar hash SHA-256 para preguntas custom
- [ ] Validar licencias de fuentes (CC BY, CC BY-SA, CC BY-NC-SA)

### Durante Generación

- [ ] Seguir Protocol v2.0 (7 preguntas por pack)
- [ ] Progresión de dificultad: 1-2-3-3-3-4-5 o 3-1-2-3-3-4-5
- [ ] Contexto cultural colombiano (ciudades, moneda COP, nombres)
- [ ] Explicaciones de 50+ palabras
- [ ] Competencias ICFES identificadas

### Después de Generar

- [ ] Actualizar `questions-registry.json` con todas las fuentes
- [ ] Actualizar `index.json` de cada asignatura
- [ ] Ejecutar `npm run validate` (si disponible)
- [ ] Commit con mensaje: `feat(colombia-11): agregar [N] packs [asignatura]`

### En el PR

- [ ] Título: `feat(colombia-11): PR #[N] - [Asignaturas] ([total] preguntas)`
- [ ] Descripción usando template
- [ ] Tag `@jules` en comentarios
- [ ] Labels: `enhancement`, `content`, `colombia`, `grado-11`, `protocol-v2`, `jules`

---

## 📅 Timeline Sugerido

| Semana | PRs a Completar | Preguntas |
|--------|-----------------|-----------|
| **Semana 1** (10-16 dic) | PR #1 (Matemáticas) | 21 |
| **Semana 2** (17-23 dic) | PR #2 (Lectura Crítica) | 14 |
| **Semana 3** (24-30 dic) | PR #3 (Ciencias Naturales) | 14 |
| **Semana 4** (31 dic - 6 ene) | PR #4 (Sociales/Inglés/Info) | 35 |
| **Semana 5** (7-13 ene) | PR #5 (Ciencias Sociales) | 21 |

**Total:** 5 semanas × 1 PR/semana = **105 preguntas**

---

## 🎯 Objetivo Final

Al completar este plan:

| Métrica | Antes | Después | Cambio |
|---------|-------|---------|--------|
| Packs Grado 11 | 13 | 28 | +115% |
| Preguntas Grado 11 | ~91 | ~196 | +115% |
| Asignaturas completas | 0 | 7 | +7 |
| Cobertura ICFES | 70% | 100% | +30pp |

**Impacto:** Colombia Grado 11 tendrá la **mejor cobertura de preguntas** de todo el sistema World Exams 🚀

---

## 📎 Referencias

- [Protocolo v2.0](../QUESTION_GENERATION_PROTOCOL_V2.md)
- [Sistema de Tracking](./sources/README.md)
- [Instrucciones Jules](./jules-instructions-colombia.md)
- [Validación de Packs](../../scripts/validacion-packs.md)

---

**Creado:** 10 de diciembre de 2025
**Autor:** GitHub Copilot
**Status:** 🟢 Activo
