# 🇨🇴 Plan Maestro de Mejora — Currículo por Grados Colombia (3–11)

> **Versión:** 1.0  
> **Fecha:** 2026-06-04  
> **Autor:** WorldExams Agent  
> **Estado:** Activo — implementación priorizada  

---

## 📋 Resumen Ejecutivo

Actualmente la plataforma **saberparatodos** tiene contenido **solo para grado 11** en los bundles fuente (`questions_data/colombia/`) y packs servidos. Los **grados 3 a 10** carecen de casi todo el contenido requerido por el MEN y el ICFES.

Este plan establece:

1. **Protocolos de generación por grado** alineados con DBA del MEN y marcos de referencia ICFES
2. **Mallas curriculares desglosadas por periodo** (1-4) para cada grado y asignatura
3. **Plan de generación priorizado** para cerrar los gaps de contenido
4. **Estructura de directorios** para organizar los bundles por grado/periodo/tema

---

## 🎯 Diagnóstico Actual (Junio 2026)

### Contenido Existente

| Grado | Asignaturas | Bundles Fuente | Packs Servidos | Preg. Únicas | Estado |
|-------|------------|---------------|----------------|-------------|--------|
| **3** | Inglés, Lectura | ❌ Ninguno | 4 packs | 140 | ❌ CRÍTICO |
| **4** | Inglés | ❌ Ninguno | 2 packs | 110 | ❌ CRÍTICO |
| **5** | Inglés | ❌ Ninguno | 2 packs | 130 | ❌ CRÍTICO |
| **6** | Inglés | ❌ Ninguno | 2 packs | 160 | ❌ CRÍTICO |
| **7** | Inglés | ❌ Ninguno | 2 packs | 240 | ❌ CRÍTICO |
| **8** | Inglés | ❌ Ninguno | 2 packs | 270 | ❌ CRÍTICO |
| **9** | Inglés | ❌ Ninguno | 2 packs | 279 | ❌ CRÍTICO |
| **10** | Inglés | ❌ Ninguno | 2 packs | 396 | ❌ CRÍTICO |
| **11** | 5 materias ICFES | ✅ 184 bundles | 20 packs | 3,844+ | ✅ COMPLETO |

### Gaps Identificados

| Área | Grados Afectados | Severidad |
|------|-----------------|-----------|
| **Matemáticas** (grado 3-10) | 3, 4, 5, 6, 7, 8, 9, 10 | 🔴 ALTA |
| **Lectura Crítica / Lenguaje** (grado 3-10) | 3, 4, 5, 6, 7, 8, 9, 10 | 🔴 ALTA |
| **Ciencias Naturales** (grado 5-10) | 5, 6, 7, 8, 9, 10 | 🔴 ALTA |
| **Sociales / Ciudadanas** (grado 5-10) | 5, 6, 7, 8, 9, 10 | 🔴 ALTA |
| **Inglés** (grado 3-10) | 3, 4, 5, 6, 7, 8, 9, 10 | 🟡 MEDIA (hay algo) |
| **Packs por periodo** (grado 11) | 11 (P2, P3, P4) | 🟡 MEDIA |

---

## 📐 Alineación Curricular MEN + ICFES

### Marco Legal

1. **Ley 115 de 1994** (Ley General de Educación) — Estructura el sistema educativo colombiano
2. **Decreto 1860 de 1994** — Reglamenta la organización curricular
3. **Estándares Básicos de Competencias (EBC)** — MEN, 2006
4. **Derechos Básicos de Aprendizaje (DBA)** — MEN, V2 2017
5. **Lineamientos Curriculares** — MEN, áreas fundamentales
6. **Matrices de Referencia ICFES** — Estructura de las pruebas Saber

### Evaluaciones ICFES por Grado

| Prueba | Grados | Áreas Evaluadas |
|--------|--------|-----------------|
| **Saber 3°** | 3° | Lenguaje (Lectura), Matemáticas |
| **Saber 5°** | 5° | Lenguaje (Lectura+Escritura), Matemáticas, Ciencias Naturales, Competencias Ciudadanas |
| **Saber 7°** | 7° | Lenguaje (Lectura+Escritura), Matemáticas, Ciencias Naturales, Competencias Ciudadanas |
| **Saber 9°** | 9° | Lenguaje (Lectura+Escritura), Matemáticas, Ciencias Naturales, Competencias Ciudadanas |
| **Saber 11°** | 11° | Lectura Crítica, Matemáticas, Sociales+Ciudadanas, Ciencias Naturales, Inglés |

### Distribución por Periodos (Estructura Académica Colombiana)

Cada año escolar colombiano tiene **4 periodos académicos** de aproximadamente 10 semanas cada uno:

| Periodo | Meses | Semanas | Enfoque |
|---------|-------|---------|---------|
| **P1** | Febrero - Abril | 10 | Fundamentos, conceptos base |
| **P2** | Abril - Junio | 10 | Desarrollo, aplicación |
| **P3** | Julio - Septiembre | 10 | Profundización |
| **P4** | Septiembre - Noviembre | 10 | Síntesis, evaluación, preparación Saber |

---

## 📚 Mallas Curriculares por Grado (Basadas en DBA + Estándares MEN)

### Grado 3° — Básica Primaria

#### Matemáticas
| Periodo | Temas DBA | Competencias ICFES Saber 3° |
|---------|-----------|------------------------------|
| P1 | Números hasta 10.000, descomposición aditiva, suma y resta | Comunicación, Representación |
| P2 | Multiplicación, división, propiedades, múltiplos | Modelación, Planteamiento |
| P3 | Figuras geométricas, paralelismo, perpendicularidad, desplazamientos | Razonamiento, Argumentación |
| P4 | Medición (longitud, superficie, peso, tiempo), datos, pictogramas, probabilidad | Resolución |

#### Lenguaje (Lectura)
| Periodo | Temas DBA | Competencias ICFES Saber 3° |
|---------|-----------|------------------------------|
| P1 | Comprensión literal, vocabulario, identificación de personajes y acciones | Literal |
| P2 | Inferencias básicas, secuencias narrativas, propósito del texto | Inferencial |
| P3 | Textos discontinuos (tablas, gráficos simples), instrucciones | Interpretativa |
| P4 | Producción textual básica, elementos de la comunicación | Crítica |

#### Inglés (Iniciación)
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Saludos, presentación personal, colores, números 1-50 |
| P2 | Partes del cuerpo, familia, animales, comida básica |
| P3 | Ropa, clima, días de la semana, meses |
| P4 | Verbos básicos (to be, have), presente simple, preguntas simples |

---

### Grado 4° — Básica Primaria

#### Matemáticas
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Números hasta 100.000, suma/resta con decimales (décimos, centésimos) |
| P2 | Fracciones equivalentes, suma/resta de fracciones, comparación |
| P3 | Perímetro y área, figuras 2D y 3D, patrones |
| P4 | Datos, tablas, variación, dependencia entre cantidades |

#### Lenguaje
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Textos narrativos (cuento, fábula, mito), personajes, conflicto |
| P2 | Textos expositivos, idea principal, detalles de apoyo |
| P3 | Poesía, rima, ritmo, lenguaje figurado básico |
| P4 | Textos instructivos, cartas, resúmenes |

#### Inglés
| Periodo | Temas |
|---------|-------|
| P1 | Verb to be (presente), artículos, plurales, números hasta 100 |
| P2 | There is/are, preposiciones de lugar, direcciones |
| P3 | Presente simple (afirmativo, negativo, interrogativo), rutinas |
| P4 | Adjetivos básicos, comparativos simples, descripciones |

---

### Grado 5° — Básica Primaria (Saber 5°)

#### Matemáticas
| Periodo | Temas DBA | Competencias ICFES Saber 5° |
|---------|-----------|------------------------------|
| P1 | Potenciación, factores primos, MCM, MCD | Comunicación |
| P2 | Fraccionarios avanzados, decimales, porcentajes, proporcionalidad | Resolución |
| P3 | Superficies, volúmenes, plano cartesiano, transformaciones | Razonamiento |
| P4 | Estadística (media, mediana, moda, rango), experimentos aleatorios | Modelación |

#### Lenguaje (Lectura + Escritura)
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Textos narrativos complejos (novela corta, cuento infantil), inferencias avanzadas |
| P2 | Textos expositivos y científicos, jerarquización de información |
| P3 | Textos argumentativos básicos, opinión y evidencia |
| P4 | Escritura: producción de textos coherentes, ortografía, puntuación |

#### Ciencias Naturales
| Periodo | Temas DBA | Competencias ICFES Saber 5° |
|---------|-----------|------------------------------|
| P1 | Seres vivos, clasificación, ecosistemas básicos | Uso comprensivo conocimiento |
| P2 | Materia y sus propiedades, estados, cambios físicos | Explicación de fenómenos |
| P3 | Energía, luz, sonido, magnetismo básico | Indagación |
| P4 | Cuerpo humano (sistemas básicos), salud e higiene | CTS (Ciencia, Tecnología, Sociedad) |

#### Competencias Ciudadanas
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Identidad, emociones, respeto por la diferencia |
| P2 | Convivencia escolar, reglas, acuerdos, derechos del niño |
| P3 | Participación democrática, el gobierno escolar |
| P4 | Diversidad cultural colombiana, patrimonio, símbolos patrios |

#### Inglés
| Periodo | Temas |
|---------|-------|
| P1 | Presente simple vs continuo, adverbios de frecuencia |
| P2 | Pasado simple, verbos regulares/irregulares |
| P3 | Vocabulario ampliado (lugares, profesiones, hobbies), direcciones |
| P4 | Lectura de textos cortos, comprensión inferencial básica |

---

### Grado 6° — Básica Secundaria

#### Matemáticas
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Números enteros (Z), recta numérica, operaciones con enteros |
| P2 | Números racionales (Q), fracciones, decimales, porcentajes |
| P3 | Razones y proporciones, regla de tres, repartos proporcionales |
| P4 | Geometría: prismas, pirámides, área y volumen, plano cartesiano |

#### Lenguaje
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Comprensión lectora literal e inferencial, situación comunicativa |
| P2 | Textos narrativos: cuento, novela, mito, leyenda; contextos históricos |
| P3 | Producción textual: plan textual, coherencia, oraciones complejas |
| P4 | Oralidad: debate, exposición, argumentación oral |

#### Ciencias Naturales
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Clasificación de seres vivos (reinos), célula (estructura básica) |
| P2 | Ecosistemas, cadenas tróficas, relaciones interespecíficas |
| P3 | Materiales, mezclas, separación de mezclas |
| P4 | Sistema solar, movimientos de la Tierra, clima básico |

#### Competencias Ciudadanas
| Periodo | Temas DBA |
|---------|-----------|
| P1 | No discriminación, derechos humanos, igualdad |
| P2 | Democracia escolar, participación, mecanismos de participación |
| P3 | Resolución pacífica de conflictos, empatía |
| P4 | Identidad cultural colombiana, etnias, diversidad |

#### Inglés (CEFR A1-A2)
| Periodo | Temas (CEFR A1+) |
|---------|-----------------|
| P1 | Presente simple (all forms), there is/are, countable/uncountable |
| P2 | Presente continuo, can/can't, must/mustn't, adverbs of manner |
| P3 | Pasado simple (regular), was/were, dates, time expressions |
| P4 | Comparatives and superlatives, going to future, vocabulary expansion |

---

### Grado 7° — Básica Secundaria (Saber 7°)

#### Matemáticas
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Números racionales: operaciones complejas, potencias con enteros |
| P2 | Proporcionalidad directa e inversa, porcentajes avanzados |
| P3 | Figuras geométricas, congruencia, clasificación de triángulos, teorema de Pitágoras |
| P4 | Estadística: tablas de frecuencia, gráficos, probabilidad simple, medidas |

#### Lenguaje
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Textos literarios: narrativa, poesía, mitología, romances |
| P2 | Textos argumentativos básicos, identificación de tesis y argumentos |
| P3 | Producción: textos argumentativos, coherencia, conectores |
| P4 | Literatura: intertextualidad, géneros literarios, ciencia ficción |

#### Ciencias Naturales (Saber 7°)
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Nutrición, respiración, fotosíntesis, cadenas alimenticias |
| P2 | Fuerzas, movimiento, máquinas simples, palancas |
| P3 | Materia: átomo, elementos, compuestos, tabla periódica básica |
| P4 | Ecosistemas colombianos, biodiversidad, conservación |

#### Competencias Ciudadanas
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Edad Media: sociedad feudal, cultura medieval (historia universal) |
| P2 | Culturas precolombinas: mayas, aztecas, incas — organización social |
| P3 | Colombia: geografía, regiones naturales, recursos |
| P4 | Mecanismos de participación ciudadana, democracia |

#### Inglés (CEFR A2)
| Periodo | Temas |
|---------|-------|
| P1 | Past simple (regular/irregular), used to, time sequencers |
| P2 | Past continuous, when/while, comparatives, superlatives |
| P3 | Future (will/going to), predictions, plans, invitations |
| P4 | Present perfect, ever/never, experiences, vocabulary topics |

---

### Grado 8° — Básica Secundaria

#### Matemáticas
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Números irracionales, reales (R), notación científica, potenciación, radicación |
| P2 | Expresiones algebraicas, polinomios, operaciones, productos notables |
| P3 | Factorización, ecuaciones lineales, desigualdades |
| P4 | Funciones lineales, plano cartesiano, probabilidad (regla de la adición) |

#### Lenguaje
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Literatura precolombina, Descubrimiento y Conquista, contexto histórico |
| P2 | Textos argumentativos: estructura, tesis, argumentos, contraargumentos |
| P3 | Medios de comunicación: noticia, artículo de opinión, análisis crítico |
| P4 | Producción de textos argumentativos, citación, fuentes |

#### Ciencias Naturales
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Biología celular: célula eucariota/procariota, orgánulos, mitosis |
| P2 | Física: cinemática (MRU, MRUV), velocidad, aceleración |
| P3 | Química: tabla periódica, enlaces químicos (iónico, covalente, metálico) |
| P4 | Genética básica: ADN, genes, cromosomas, herencia mendeliana |

#### Sociales y Ciudadanas
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Independencia de América (s. XVIII-XIX), causas y consecuencias |
| P2 | Colombia s. XIX: formación de la república, federalismo vs centralismo |
| P3 | Economía colombiana s. XIX, minería, agricultura, comercio |
| P4 | Constitución de 1886, derechos y deberes, organización del Estado |

#### Inglés (CEFR A2-B1)
| Periodo | Temas |
|---------|-------|
| P1 | Present perfect vs past simple, for/since, already/yet |
| P2 | Modal verbs: should, must, have to, can/could (ability/permission) |
| P3 | First conditional, if/when clauses, zero conditional |
| P4 | Passive voice (present/past simple), reading comprehension B1 |

---

### Grado 9° — Básica Secundaria (Saber 9°)

#### Matemáticas
| Periodo | Temas DBA | Competencias ICFES Saber 9° |
|---------|-----------|------------------------------|
| P1 | Función lineal, ecuación de la recta, sistemas de ecuaciones 2x2 | Interpretación, Formulación |
| P2 | Sucesiones aritméticas y geométricas, series, notación sumatoria | Ejecución, Argumentación |
| P3 | Funciones cuadráticas, parábolas, transformaciones | Modelación |
| P4 | Probabilidad (regla de Laplace), estadística (diagramas de caja, medidas) | Razonamiento |

#### Lenguaje (Lectura + Escritura)
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Análisis crítico de medios de comunicación, punto de vista del autor |
| P2 | Literatura colombiana s. XIX-XX, realismo, modernismo |
| P3 | Ensayo: estructura, tesis, argumentación, contraargumentación |
| P4 | Producción: ensayo argumentativo, investigación, fuentes |

#### Ciencias Naturales (Saber 9°)
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Reproducción celular (mitosis, meiosis), reproducción humana |
| P2 | Física: dinámica (leyes de Newton), fuerzas, equilibrio |
| P3 | Química: reacciones químicas, estequiometría básica, pH |
| P4 | Ecología avanzada: biomas, flujo de energía, ciclos biogeoquímicos |

#### Sociales y Ciudadanas
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Colombia s. XX: modernización, industrialización, conflictos sociales |
| P2 | Violencia en Colombia (s. XX): causas, actores, consecuencias |
| P3 | Constitución de 1991: derechos fundamentales, mecanismos constitucionales |
| P4 | Globalización, economía mundial, crisis económicas, migración |

#### Inglés (CEFR B1)
| Periodo | Temas |
|---------|-------|
| P1 | Second conditional, wish/if only, giving advice |
| P2 | Reported speech, say/tell, questions in reported speech |
| P3 | Relative clauses, defining/non-defining, connectors |
| P4 | Reading comprehension B1, text organization, main idea, inference |

---

### Grado 10° — Educación Media

#### Matemáticas
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Trigonometría: ángulos (sexagesimal, radianes), razones trigonométricas |
| P2 | Funciones trigonométricas: seno, coseno, tangente; gráficas, dominio, rango |
| P3 | Solución de triángulos rectángulos y oblicuángulos, teorema del seno y coseno |
| P4 | Estadística: variables aleatorias, probabilidad condicionada, técnicas de conteo |

#### Lenguaje / Lectura Crítica
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Lectura crítica: análisis de textos argumentativos, falacias |
| P2 | Literatura universal: clásicos, Renacimiento, Barroco |
| P3 | Medios masivos de comunicación, análisis de discursos |
| P4 | Producción de ensayo crítico, textos audiovisuales, guiones |

#### Ciencias Naturales
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Química: estructura atómica, configuración electrónica, enlaces |
| P2 | Física: movimiento en 2D, tiro parabólico, fuerzas |
| P3 | Biología: evolución, selección natural, especiación |
| P4 | Química orgánica: hidrocarburos, grupos funcionales, nomenclatura |

#### Sociales y Ciudadanas
| Periodo | Temas DBA |
|---------|-----------|
| P1 | Organismos internacionales (ONU, OEA, FMI, BM), geopolítica |
| P2 | Conflictos bélicos contemporáneos (Guerra Fría, Medio Oriente, Balcanes) |
| P3 | Demografía, urbanización, migración global, desarrollo sostenible |
| P4 | Economía: mercado, oferta/demanda, inflación, desempleo, desarrollo |

#### Inglés (CEFR B1+)
| Periodo | Temas |
|---------|-------|
| P1 | Third conditional, mixed conditionals, expressing regret |
| P2 | Passive voice (all tenses), causative have/get |
| P3 | Modals of deduction (must, might, can't, could), speculation |
| P4 | Reading comprehension B1-B2, inference, author purpose, organization |

---

### Grado 11° — Educación Media (Saber 11°) — ❌ Ya EXISTE

✅ **Estado actual:** Contenido completo MASTERY (184 bundles) para las 5 áreas ICFES.
✅ Pendiente: **Packs servidos para P2, P3, P4** (solo existe week-1/P1).

| Periodo | Bundles Existentes | Packs Servidos |
|---------|-------------------|----------------|
| P1 | ✅ 71 bundles | ✅ week-1 (P1) |
| P2 | ✅ 54 bundles | ❌ No servidos |
| P3 | ✅ 31 bundles | ❌ No servidos |
| P4 | ✅ 25 bundles | ❌ No servidos |

Ver `docs/specs/curriculums/colombia/CURRICULUM_GRADE_11.md` para detalle completo.

---

## 📋 Estructura de Directorios Requerida

```
questions_data/colombia/
├── matematicas/
│   ├── grado-3/              ← NUEVO
│   │   ├── periodo-1/
│   │   │   ├── numeros-10000/
│   │   │   ├── descomposicion-aditiva/
│   │   │   └── suma-resta/
│   │   ├── periodo-2/
│   │   ├── periodo-3/
│   │   └── periodo-4/
│   ├── grado-4/              ← NUEVO
│   ├── grado-5/              ← NUEVO
│   ├── grado-6/              ← NUEVO
│   ├── grado-7/              ← NUEVO
│   ├── grado-8/              ← NUEVO
│   ├── grado-9/              ← NUEVO
│   ├── grado-10/             ← NUEVO
│   └── grado-11/             ← ✅ EXISTE
├── lectura-critica/          ← (misma estructura)
├── ciencias-naturales/       ← (misma estructura)
├── sociales-ciudadanas/      ← (misma estructura)
├── ingles/                   ← (misma estructura)
└── LEGACY/
```

---

## 🚀 Plan de Generación Priorizado

### Fase 1 — Urgente: Cerrar gap crítico grados 3-9 (8 semanas)

| Prioridad | Grado | Asignaturas | Bundles | Cobertura objetivo |
|-----------|-------|------------|---------|--------------------|
| 🔴 P1 | **6°** | Matemáticas, Lenguaje, Cs. Naturales, Ss. Ciudadanas, Inglés | 80 bundles | 1600 preg |
| 🔴 P2 | **3°** | Matemáticas, Lenguaje, Inglés | 48 bundles | 960 preg |
| 🔴 P3 | **5°** | Matemáticas, Lenguaje, Cs. Naturales, Ss. Ciudadanas, Inglés | 80 bundles | 1600 preg |
| 🔴 P4 | **4°** | Matemáticas, Lenguaje, Inglés | 48 bundles | 960 preg |
| 🟡 P5 | **7°** | Matemáticas, Lenguaje, Cs. Naturales, Ss. Ciudadanas, Inglés | 80 bundles | 1600 preg |
| 🟡 P6 | **9°** | Matemáticas, Lenguaje, Cs. Naturales, Ss. Ciudadanas, Inglés | 80 bundles | 1600 preg |
| 🟢 P7 | **10°** | Matemáticas, Lenguaje, Cs. Naturales, Ss. Ciudadanas, Inglés | 80 bundles | 1600 preg |
| 🟢 P8 | **8°** | Matemáticas, Lenguaje, Cs. Naturales, Ss. Ciudadanas, Inglés | 80 bundles | 1600 preg |

### Fase 2 — Generar packs por periodo (2 semanas)

| Prioridad | Grado | Periodos | Tipo |
|-----------|-------|---------|------|
| 🔴 P1 | 11° | P2, P3, P4 | Convertir MASTERY existente a packs |
| 🟡 P2 | 3-10 | P1-P4 | Generar desde nuevos bundles |

### Fase 3 — Simulacros completos (1 semana)

| Objetivo | Descripción |
|----------|-------------|
| 5 simulacros de 60 preg/grado | Mezclar todas las materias según estructura ICFES |
| Sin repetición entre simulacros | Pool mínimo de 300 preg únicas por grado |

---

## 📐 Especificaciones de Bundles por Grado

### Tamaño de Bundle por Grado

| Grado | Tamaño Bundle | Dificultad | Bloom's recomendado |
|-------|-------------|-----------|---------------------|
| 3° | 10 preg | D2-D6 | Remember, Understand, Apply |
| 4° | 10 preg | D2-D7 | Remember, Understand, Apply |
| 5° | 15 preg | D3-D8 | Remember, Understand, Apply, Analyze |
| 6° | 15 preg | D3-D8 | Remember, Understand, Apply, Analyze |
| 7° | 15 preg | D3-D9 | Understand, Apply, Analyze |
| 8° | 20 preg | D3-D9 | Understand, Apply, Analyze, Evaluate |
| 9° | 20 preg | D3-D10 | Apply, Analyze, Evaluate |
| 10° | 20 preg | D4-D10 | Apply, Analyze, Evaluate |
| 11° | 20 preg | D3-D10 | Apply, Analyze, Evaluate, Create |

### Frontmatter Estándar

```yaml
---
id: "CO-[AREA]-[GRADO]-P[PERIOD]-[TOPIC]-[INDEX]-MASTERY"
country: "colombia"
grado: 3-11
asignatura: "[asignatura-kebab]"
tema: "[tema-kebab]"
periodo: 1-4
protocol_version: "5.2"
bundle_index: 1-3
bundle_size: 10-20
alignment: "MEN DBA + Estándares Básicos"
target_cefr: "A1-C2"  # solo para ingles
modern_context: true
distractor_profile: "plausible_peer_set"
---
```

---

## 📊 Métricas Objetivo

| Métrica | Actual | Objetivo (3 meses) |
|---------|--------|-------------------|
| Bundles totales Colombia | 184 | 800+ |
| Preguntas totales Colombia | ~4,000 | 16,000+ |
| Grados cubiertos | Solo 11° | 3° a 11° |
| Asignaturas por grado (media) | 1 (inglés) | 5 (ICFES completas) |
| Periodos servidos | P1 | P1, P2, P3, P4 |
| Simulacros 60 preg (grado 6) | 0 | 5 |
| Packs servidos totales | 20 | 156+ |

---

## 🧩 Issues Relacionados

- #385: Generate MASTERY bundles for Spain, Panama, Guatemala, El Salvador, Honduras, Nicaragua, Dominican Republic
- #384: Expand MASTERY bundles: Mexico, Argentina, Brazil Grade 11
- #221: SECURITY: Exposed secrets in git history
- **#387**: [NUEVO] Implementar protocolos de generación por grado (3-11) con mallas curriculares MEN
- **#388**: [NUEVO] Generar bundles MASTERY para grado 6 (5 asignaturas, 4 periodos)
- **#389**: [NUEVO] Generar bundles MASTERY para grado 3 (3 asignaturas, 4 periodos)
- **#390**: [NUEVO] Generar bundles MASTERY para grado 5 (5 asignaturas, 4 periodos)
- **#391**: [NUEVO] Generar packs por periodo P2, P3, P4 para grado 11
- **#392**: [NUEVO] Generar packs servidos para todos los grados 3-10
- **#393**: [NUEVO] Generar 5 simulacros de 60 preg sin repetición para grado 6

---

## 🛠 Herramientas de Generación

1. **Direct Generate Script:** `scripts/direct-generate.py`
2. **Static Packs Generator:** `saberparatodos/scripts/generate-static-packs.js`
3. **Protocolo Activo:** `docs/QUESTION_GENERATION_PROTOCOL_V5.md` (actualizar a v6 para grados 3-10)
4. **Skill de Validación:** `skills/worldexams-question-reviewer/SKILL.md`
5. **Skill de Protocolo Colombia:** `skills/colombia-assessment-protocol-v6/SKILL.md`

---

## ✅ Checklist de Implementación

- [ ] **1.** Publicar y aprobar este plan maestro (#387)
- [ ] **2.** Actualizar protocolo V5 a V6 con soporte multi-grado
- [ ] **3.** Generar ~80 bundles para grado 6 (prioridad máxima)
- [ ] **4.** Validar bundles con `validate_content.js`
- [ ] **5.** Generar packs servidos para grado 6 (periodos 1-4)
- [ ] **6.** Generar bundles para grado 3 y 5
- [ ] **7.** Generar packs P2-P4 para grado 11 desde MASTERY existentes
- [ ] **8.** Continuar con grados 4, 7, 9, 10, 8 en ese orden
- [ ] **9.** Crear simulacros combinados para cada grado
- [ ] **10.** Ejecutar tests E2E y validación completa
- [ ] **11.** Deploy a producción

---

*Este plan se actualiza automáticamente al completar cada fase. Última revisión: 2026-06-04.*
