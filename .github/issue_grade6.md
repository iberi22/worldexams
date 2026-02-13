## 🎯 Objective

Generate **48 question bundles** for **Grade 6** (Grado 6°) following **Protocol v3.0**.
Each bundle = 10 questions (difficulty 1-5), totaling **480 new questions**.

## 📖 Context

- **Country:** Colombia (CO)
- **Source:** [DBA Mineducación](https://www.mineducacion.gov.co/portal/men/Publicaciones/Guias/340021:Derechos-Basicos-de-Aprendizaje-DBA)
- **Protocol:** v3.0 — See `skills/create_bundles_manually/SKILL.md`
- **File Location:** `src/content/questions/colombia/[asignatura]/grado-6/[tema]/CO-[SUBJ]-6-[tema]-001-v3-bundle.md`
- **Reference Example:** See any `grado-5` bundle for structure

## 📐 Matemáticas (16 bundles)

| P | Topic Folder | ID Prefix |
|---|---|---|
| 1 | `numeros-naturales-potencias` | `CO-MAT-6-numeros-naturales-potencias-001` |
| 1 | `multiplos-divisores-mcm-mcd` | `CO-MAT-6-multiplos-divisores-mcm-mcd-001` |
| 1 | `numeros-decimales-operaciones` | `CO-MAT-6-numeros-decimales-operaciones-001` |
| 1 | `problemas-numeros-naturales` | `CO-MAT-6-problemas-numeros-naturales-001` |
| 2 | `fracciones-operaciones` | `CO-MAT-6-fracciones-operaciones-001` |
| 2 | `razones-proporciones` | `CO-MAT-6-razones-proporciones-001` |
| 2 | `numeros-enteros` | `CO-MAT-6-numeros-enteros-001` |
| 2 | `plano-cartesiano` | `CO-MAT-6-plano-cartesiano-001` |
| 3 | `geometria-angulos-triangulos` | `CO-MAT-6-geometria-angulos-triangulos-001` |
| 3 | `perimetro-area-poligonos` | `CO-MAT-6-perimetro-area-poligonos-001` |
| 3 | `transformaciones-geometricas` | `CO-MAT-6-transformaciones-geometricas-001` |
| 3 | `unidades-medida-conversion` | `CO-MAT-6-unidades-medida-conversion-001` |
| 4 | `estadistica-tablas-graficos` | `CO-MAT-6-estadistica-tablas-graficos-001` |
| 4 | `medidas-tendencia-central` | `CO-MAT-6-medidas-tendencia-central-001` |
| 4 | `probabilidad-conteo` | `CO-MAT-6-probabilidad-conteo-001` |
| 4 | `ecuaciones-basicas` | `CO-MAT-6-ecuaciones-basicas-001` |

## 🔬 Ciencias Naturales (16 bundles)

| P | Topic Folder | ID Prefix |
|---|---|---|
| 1 | `celula-estructura-funcion` | `CO-CN-6-celula-estructura-funcion-001` |
| 1 | `niveles-organizacion-seres` | `CO-CN-6-niveles-organizacion-seres-001` |
| 1 | `clasificacion-seres-vivos` | `CO-CN-6-clasificacion-seres-vivos-001` |
| 1 | `nutricion-digestion` | `CO-CN-6-nutricion-digestion-001` |
| 2 | `respiracion-circulacion` | `CO-CN-6-respiracion-circulacion-001` |
| 2 | `excrecion-homeostasis` | `CO-CN-6-excrecion-homeostasis-001` |
| 2 | `reproduccion-celular` | `CO-CN-6-reproduccion-celular-001` |
| 2 | `ecologia-relaciones` | `CO-CN-6-ecologia-relaciones-001` |
| 3 | `materia-propiedades-clasificacion` | `CO-CN-6-materia-propiedades-clasificacion-001` |
| 3 | `mezclas-metodos-separacion` | `CO-CN-6-mezclas-metodos-separacion-001` |
| 3 | `atomo-estructura-basica` | `CO-CN-6-atomo-estructura-basica-001` |
| 3 | `tabla-periodica-introduccion` | `CO-CN-6-tabla-periodica-introduccion-001` |
| 4 | `energia-formas-transformaciones` | `CO-CN-6-energia-formas-transformaciones-001` |
| 4 | `calor-temperatura` | `CO-CN-6-calor-temperatura-001` |
| 4 | `luz-sonido-ondas` | `CO-CN-6-luz-sonido-ondas-001` |
| 4 | `maquinas-simples-movimiento` | `CO-CN-6-maquinas-simples-movimiento-001` |

## 🌍 Sociales (16 bundles)

| P | Topic Folder | ID Prefix |
|---|---|---|
| 1 | `civilizaciones-antiguas-mesopotamia` | `CO-SOC-6-civilizaciones-antiguas-mesopotamia-001` |
| 1 | `antiguo-egipto-nilo` | `CO-SOC-6-antiguo-egipto-nilo-001` |
| 1 | `grecia-antigua-democracia` | `CO-SOC-6-grecia-antigua-democracia-001` |
| 1 | `roma-republica-imperio` | `CO-SOC-6-roma-republica-imperio-001` |
| 2 | `edad-media-feudalismo` | `CO-SOC-6-edad-media-feudalismo-001` |
| 2 | `islam-cruzadas` | `CO-SOC-6-islam-cruzadas-001` |
| 2 | `renacimiento-humanismo` | `CO-SOC-6-renacimiento-humanismo-001` |
| 2 | `descubrimiento-conquista-america` | `CO-SOC-6-descubrimiento-conquista-america-001` |
| 3 | `geografia-continentes-oceanos` | `CO-SOC-6-geografia-continentes-oceanos-001` |
| 3 | `relieve-climas-mundo` | `CO-SOC-6-relieve-climas-mundo-001` |
| 3 | `poblacion-migraciones` | `CO-SOC-6-poblacion-migraciones-001` |
| 3 | `culturas-precolombinas` | `CO-SOC-6-culturas-precolombinas-001` |
| 4 | `organizacion-territorial-colombia` | `CO-SOC-6-organizacion-territorial-colombia-001` |
| 4 | `democracia-participacion` | `CO-SOC-6-democracia-participacion-001` |
| 4 | `derechos-ninos-adolescentes` | `CO-SOC-6-derechos-ninos-adolescentes-001` |
| 4 | `economia-sectores-productivos` | `CO-SOC-6-economia-sectores-productivos-001` |

## 📝 Bundle Template (Metadata)

```yaml
---
id: "CO-[SUBJ]-6-[tema]-001"
country: "co"
grado: 6
asignatura: "[subject]"
tema: "[Topic Name]"
periodo: [1-4]
protocol_version: "3.0"
total_questions: 10
estado: "approved"
creador: "Jules-Agent"
generation_date: "2026-02-12"
licenses:
  v1: "CC BY-SA 4.0"
  v2-v10: "CC BY-NC-SA 4.0"
source: "Mineducacion Colombia - DBA"
source_url: "https://www.mineducacion.gov.co/portal/men/Publicaciones/Guias/340021:Derechos-Basicos-de-Aprendizaje-DBA"
source_license: "CC BY-SA 4.0"
search_query: "[query used]"
---
```

## ✅ Acceptance Criteria

- [ ] 48 bundle files created in correct directories
- [ ] Each bundle has exactly 10 questions (v1 to v10)
- [ ] Difficulty spread: v1-v2 (1), v3-v4 (2), v5-v6 (3), v7-v8 (4), v9-v10 (5)
- [ ] All metadata fields present and correct
- [ ] Questions written in neutral Colombian Spanish
- [ ] Distractors are plausible (common student errors)
- [ ] Explanations are pedagogical (teaching WHY)
- [ ] Content aligns with DBA Mineducacion standards
