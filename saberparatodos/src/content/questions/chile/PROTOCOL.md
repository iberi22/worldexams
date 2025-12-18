# 🇨🇱 Protocolo de Generación: Chile (PAES)

> **Versión:** 1.0
> **Examen Objetivo:** PAES (Prueba de Acceso a la Educación Superior)
> **Moneda:** CLP ($)

## 📌 Especificaciones Técnicas

| Característica | Regla |
|----------------|-------|
| **Opciones** | **4 Opciones** (A, B, C, D) |
| **Opciones Correctas** | Solo una correcta. 3 Distractores. |
| **Prefijo ID** | `CL-` |
| **Dialecto** | Español de Chile. |

## 📚 Mapeo de Asignaturas

| Carpeta (`src/content/questions/chile/`) | Nombre Real | Código ID |
|------------------------------------------|-------------|-----------|
| `competencia-matematica` | Competencia Matemática (M1/M2) | `MAT` |
| `competencia-lectora` | Competencia Lectora | `LEC` |
| `historia-cs-sociales` | Historia y Cs. Sociales | `SOC` |
| `ciencias` | Ciencias | `CNAT` |

## 🌍 Contextualización Cultural (Obligatorio)

**Lugares:** Santiago, Valparaíso, Concepción, Desierto de Atacama.
**Instituciones:** DEMRE, Uchile, PUC.
**Moneda:** Peso Chileno (CLP). Usar símbolo `$`.
**Nombres Comunes:** Benjamín, Sofía, Matías, Isidora.

**Ejemplo:**
> "Si viajas en Metro de Santiago desde Baquedano..."

---

## 📋 Template de Archivo

```yaml
---
id: "CL-MAT-11-algebra-001"
country: "cl"
exam_board: "PAES"
options_count: 4
...
```
