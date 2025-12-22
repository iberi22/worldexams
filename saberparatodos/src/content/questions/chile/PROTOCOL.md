# 🇨🇱 Protocolo de Generación: Chile (PAES)

> **Versión:** 1.1 (Pilot Update)
> **Examen Objetivo:** PAES (Prueba de Acceso a la Educación Superior)
> **Moneda:** Peso Chileno ($ CLP)
> **Contexto:** Enseñanza Media (I° a IV° Medio)

## 📌 Especificaciones Técnicas

| Característica | Regla |
|----------------|-------|
| **Opciones** | **4 Opciones** (A, B, C, D) |
| **Opciones Correctas** | Solo una correcta. 3 Distractores. |
| **Prefijo ID** | `CL-` |
| **Dialecto** | Español de Chile (voseo informal aceptado en diálogo, formal en enunciado). |
| **Formato de Archivo** | Markdown (`.md`) con Frontmatter YAML. |

## 🧪 Estrategia Piloto (Nueva)

Para el piloto de secundaria completa, cada archivo de memoria (bundle) debe contener **11 preguntas**:
1. **1 Pregunta Semilla (Original):** Extraída de fuentes oficiales (DEMRE/Mineduc) y validada.
2. **10 Preguntas Generadas:** Variaciones de la semilla distribuidas por complejidad cognitiva.

### Distribución de Complejidad (10 Generadas)

Se deben generar 2 preguntas por cada nivel de complejidad (1 al 5):

| Nivel | Descripción | Cantidad |
|-------|-------------|----------|
| **1** | **Recordar/Conocimiento:** Recordar hechos, términos, conceptos básicos. | 2 |
| **2** | **Comprender:** Entender significados, interpretar gráficos simples, traducir datos. | 2 |
| **3** | **Aplicar:** Usar conceptos en situaciones nuevas, resolver problemas estándar. | 2 |
| **4** | **Analizar:** Descomponer información, encontrar patrones, organizar partes. | 2 |
| **5** | **Evaluar/Crear:** Juzgar valor, combinar elementos, proponer soluciones nuevas. | 2 |

**Total por archivo:** 1 Original + 10 Variaciones = 11 Preguntas.

## 📚 Mapeo de Asignaturas

| Carpeta (`src/content/questions/chile/`) | Nombre Real | Código ID |
|------------------------------------------|-------------|-----------|
| `competencia-matematica` | Competencia Matemática (M1/M2) | `MAT` |
| `competencia-lectora` | Competencia Lectora | `LEC` |
| `historia-cs-sociales` | Historia y Cs. Sociales | `SOC` |
| `ciencias` | Ciencias | `CNAT` |

## 🌍 Contextualización Cultural (Obligatorio)

**Lugares:** Santiago (Metro, Costanera), Valparaíso (Cerros, Puerto), Concepción (UdeC), Norte (Desierto, Minería), Sur (Lagos, Lluvia).
**Instituciones:** DEMRE, Mineduc, Universidades (UChile, PUC, USACH).
**Moneda:** Peso Chileno ($). Precios realistas (ej. Pasaje metro ~$800, Pan ~$2000/kg).
**Nombres Comunes:** Benjamín, Sofía, Matías, Isidora, Agustín, Emilia.
**Modismos:** "Micro" (bus), "Auto" (coche), "Plata" (dinero), "Harto" (mucho).

## 📋 Estructura del Archivo (Bundle)

El archivo debe contener la pregunta original seguida de las 10 variaciones, separadas por `---`.

```yaml
---
id: "CL-MAT-09-numeros-001-v1"
country: "cl"
exam_board: "PAES"
subject: "competencia-matematica"
grade: "grado-9"
topic: "Proporcionalidad"
complexity: 1
type: "original"
question_text: "..."
options: [...]
correct_option: "..."
explanation: "..."
---
id: "CL-MAT-09-numeros-001-v2"
...
complexity: 1
type: "variation"
...
```
