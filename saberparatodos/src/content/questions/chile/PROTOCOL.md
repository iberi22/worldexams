# 🇨🇱 Protocolo de Generación: Chile (PAES)

> **Versión:** 2.0 (Official DEMRE Alignment)
> **Examen Objetivo:** PAES (Prueba de Acceso a la Educación Superior)
> **Autoridad:** DEMRE (Departamento de Evaluación, Medición y Registro Educacional) + MINEDUC
> **Moneda:** Peso Chileno ($ CLP)
> **Contexto:** Enseñanza Media (I° a IV° Medio)

---

## 📌 Especificaciones Técnicas

| Característica | Regla |
|----------------|-------|
| **Opciones** | **4 Opciones** (A, B, C, D) |
| **Opciones Correctas** | Solo una correcta. 3 Distractores plausibles. |
| **Puntaje** | Escala 100-1000. **Sin descuento** por respuestas incorrectas. |
| **Prefijo ID** | `CL-` |
| **Dialecto** | Español de Chile (voseo informal aceptado en diálogo, formal en enunciado). |
| **Formato de Archivo** | Markdown (`.md`) con Frontmatter YAML. |

---

## 📊 Estructura Oficial PAES (DEMRE 2025-2026)

### Pruebas Obligatorias

#### 1. Competencia Lectora
- **Preguntas:** 65 (60 consideradas para puntaje)
- **Tiempo:** 2 horas y 30 minutos
- **Habilidades:**
  - **Localizar información** (explícita e implícita)
  - **Interpretar y Relacionar** (inferencias, conexiones)
  - **Reflexionar** (evaluar, criticar)
- **Tipos de Textos:** Narrativos, Informativos, Argumentativos

#### 2. Competencia Matemática 1 (M1)
- **Preguntas:** 65
- **Tiempo:** 2 horas y 20 minutos
- **Nivel:** 7° básico a II° medio
- **Ejes Temáticos:**
  - Números (racionales, irracionales, proporcionalidad)
  - Álgebra y Funciones (ecuaciones, función lineal/afín)
  - Geometría (perímetro, área, volumen, Pitágoras)
  - Probabilidad y Estadística (medidas de tendencia, gráficos)

#### 3. Competencia Matemática 2 (M2)
- **Preguntas:** 55
- **Tiempo:** 2 horas y 20 minutos
- **Nivel:** III° y IV° medio (profundización de M1)
- **Requisito:** Obligatoria para carreras técnicas/profesionales con base matemática intensiva
- **Ejes Temáticos:**
  - Trigonometría (razones, identidades, ecuaciones)
  - Funciones avanzadas (cuadrática, exponencial, logarítmica)
  - Geometría analítica (recta, cónicas)
  - Cálculo introductorio (límites, derivadas básicas)

### Pruebas Electivas

#### 4. Ciencias
- **Preguntas:** 80 (54 Módulo Común + 26 Módulo Electivo/TP)
- **Tiempo:** 2 horas y 40 minutos
- **Módulos Electivos:** Biología, Física, Química
- **Habilidades Científicas:** Observar, Plantear preguntas, Procesar evidencia, Analizar, Evaluar

#### 5. Historia y Ciencias Sociales
- **Preguntas:** 65
- **Tiempo:** 2 horas
- **Ejes Temáticos:**
  - Historia en perspectiva (Mundo, América, Chile)
  - Formación Ciudadana (derechos, participación, instituciones)
  - Economía y Sociedad (sistemas económicos, desarrollo)

---

## 🎓 Mapeo de Niveles Escolares

| Grado WorldExams | Curso Chile | Edad Aprox. | PAES Relevante | Enfoque |
|------------------|-------------|-------------|----------------|---------|
| **Grado 9** | **I° Medio** | 14-15 años | M1 (inicio) | Fundamentos M1 |
| **Grado 10** | **II° Medio** | 15-16 años | M1 (completo) | Cierre M1, preparación M2 |
| **Grado 11** | **III° Medio** | 16-17 años | M2 (inicio) | Contenidos avanzados M2 |
| **Grado 12** | **IV° Medio** | 17-18 años | M2 (completo) + PAES final | Preparación intensiva PAES |

---

## 🧪 Estrategia de Generación (Protocol v3.0)

Cada archivo bundle contiene **11 preguntas**:
1. **1 Pregunta Semilla (Original):** Basada en temarios oficiales DEMRE o ejemplos validados.
2. **10 Preguntas Generadas:** Variaciones distribuidas por complejidad cognitiva.

### Distribución de Complejidad (10 Variaciones)

| Nivel | Habilidad Cognitiva | Descripción | Cantidad |
|-------|---------------------|-------------|----------|
| **1** | **Recordar** | Hechos, definiciones, fórmulas básicas | 2 |
| **2** | **Comprender** | Interpretar, ejemplificar, clasificar | 2 |
| **3** | **Aplicar** | Usar procedimientos en situaciones nuevas | 2 |
| **4** | **Analizar** | Descomponer, encontrar patrones, comparar | 2 |
| **5** | **Evaluar/Crear** | Juzgar, criticar, diseñar soluciones | 2 |

**Total:** 1 Original + 10 Variaciones = **11 Preguntas**

---

## 📚 Mapeo de Asignaturas y Carpetas

| Carpeta | Nombre Oficial PAES | Código ID | Tipo |
|---------|---------------------|-----------|------|
| `competencia-matematica/` | Competencia Matemática (M1/M2) | `MAT` | Obligatoria |
| `competencia-lectora/` | Competencia Lectora | `LEC` | Obligatoria |
| `ciencias/` | Ciencias (Biología, Física, Química) | `CNAT` | Electiva |
| `../../ingles` (Centralizado) | Inglés (**Global Standard**) | `ING` | Obligatoria (M2) / Electiva |

### Estructura de Directorios

```
chile/
├── competencia-matematica/
│   ├── grado-9/    (I° Medio - M1 inicio)
│   ├── grado-10/   (II° Medio - M1 completo)
│   ├── grado-11/   (III° Medio - M2 inicio)
│   └── grado-12/   (IV° Medio - M2 completo)
├── competencia-lectora/
│   ├── grado-9/
│   ├── grado-10/
│   ├── grado-11/
│   └── grado-12/
├── ciencias/
│   ├── biologia/
│   ├── fisica/
│   └── quimica/
└── historia-cs-sociales/
    ├── historia/
    ├── formacion-ciudadana/
    └── economia/
```

---

## 🌍 Contextualización Cultural (Obligatorio)

**Lugares:**
- **Norte:** Desierto de Atacama, Antofagasta, Iquique (minería, astronomía)
- **Centro:** Santiago (Metro, Costanera Center), Valparaíso (puerto, cerros), Viña del Mar
- **Sur:** Concepción, Puerto Montt, Chiloé (lagos, lluvia, cultura mapuche)

**Instituciones:**
- **Educación:** DEMRE, Mineduc, UChile, PUC, USACH, UdeC
- **Públicas:** Fonasa, AFP, Registro Civil, Municipalidades

**Moneda:** Peso Chileno ($)
- Pasaje Metro: ~$800
- Pan: ~$2.000/kg
- Almuerzo: ~$5.000-8.000

**Nombres Comunes:** Benjamín, Sofía, Matías, Isidora, Agustín, Emilia, Martín, Valentina

**Modismos Chilenos:**
- "Micro" (bus), "Auto" (coche), "Plata" (dinero)
- "Harto" (mucho), "Cachai" (entiendes), "Al tiro" (inmediatamente)

---

## 📋 Template de Archivo Bundle

```yaml
---
id: "CL-MAT-09-numeros-001-v1"
country: "cl"
exam_board: "PAES"
subject: "competencia-matematica"
grade: "grado-9"
topic: "Proporcionalidad"
complexity: 3
type: "original"
source: "DEMRE Temario Oficial 2025"
---

# Pregunta 1 (Original - Complejidad 3)

**ID:** `CL-MAT-09-numeros-001-v1`

## Enunciado

Sofía compra 3 kg de manzanas en la feria de Santiago por $4.500. Si mantiene la misma proporción, ¿cuánto pagará por 5 kg?

## Opciones

- [ ] A) $6.000
- [x] B) $7.500
- [ ] C) $8.000
- [ ] D) $9.000

## Explicación Pedagógica

**Respuesta correcta: B) $7.500**

Este es un problema de proporcionalidad directa. Si 3 kg cuestan $4.500, entonces 1 kg cuesta $4.500 ÷ 3 = $1.500. Por lo tanto, 5 kg cuestan $1.500 × 5 = $7.500.

**Análisis de distractores:**
- A) $6.000: Error al sumar $1.500 en vez de multiplicar
- C) $8.000: Aproximación incorrecta
- D) $9.000: Duplicar el precio original sin considerar la proporción

---

# Pregunta 2 (Variación - Complejidad 1)

**ID:** `CL-MAT-09-numeros-001-v2`

[... continúa hasta v11]
```

---

## 🔗 Referencias Oficiales

- [Temarios DEMRE 2025-2026](https://demre.cl/la-prueba/pruebas-y-temarios/)
- [Currículum Nacional](https://www.curriculumnacional.cl/)
- [Ministerio de Educación](https://mineduc.cl/)
- [Agencia de Calidad de la Educación](https://www.agenciaeducacion.cl/)
