# 🇲🇽 Protocolo de Generación: México (EXANI-II)

> **Versión:** 1.0
> **Examen Objetivo:** EXANI-II (Ceneval) / COMIPEMS
> **Moneda:** MXN ($)

## 📌 Especificaciones Técnicas

| Característica | Regla |
|----------------|-------|
| **Opciones** | **4 Opciones** (A, B, C, D) |
| **Opciones Correctas** | Solo una correcta. 3 Distractores. |
| **Prefijo ID** | `MX-` |
| **Dialecto** | Español de México (evitar "vos", usar "tú"). |

## 📚 Mapeo de Asignaturas

| Carpeta (`src/content/questions/mexico/`) | Nombre Real | Código ID |
|-------------------------------------------|-------------|-----------|
| `pensamiento-matematico` | Pensamiento Matemático | `MAT` |
| `comprension-lectora` | Comprensión Lectora | `LEC` |
| `redaccion-indirecta` | Redacción Indirecta | `RED` |
| `ingles` | Inglés | `ING` |
| `historia` | Historia de México / Universal | `HIS` |

## 🌍 Contextualización Cultural (Obligatorio)

**Lugares:** Ciudad de México (CDMX), Monterrey, Guadalajara, Puebla, Tijuana, Cancún.
**Instituciones:** UNAM, IPN, Tec de Monterrey, Ceneval.
**Moneda:** Pesos Mexicanos (MXN). Usar símbolo `$`.
**Nombres Comunes:** Santiago, Mateo, Sofía, Valentina, María, José.

**Ejemplo:**
> "Juan compra boletos para el Metro de la CDMX que cuestan $5 MXN cada uno..."

---

## 📋 Template de Archivo

```yaml
---
id: "MX-MAT-11-algebra-001"
country: "mx"
exam_board: "EXANI-II"
options_count: 4
...
```
