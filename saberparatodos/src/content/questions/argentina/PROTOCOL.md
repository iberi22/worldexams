# 🇦🇷 Protocolo de Generación: Argentina

> **Versión:** 1.0
> **Examen Objetivo:** Ingreso Universitario (CBC/UBA) / Aprender
> **Moneda:** ARS ($)

## 📌 Especificaciones Técnicas

| Característica | Regla |
|----------------|-------|
| **Opciones** | **4 Opciones** (A, B, C, D) |
| **Opciones Correctas** | Solo una correcta. 3 Distractores. |
| **Prefijo ID** | `AR-` |
| **Dialecto** | Español Rioplatense (**Voseo obligatorio**: "vos tenés", "calculá"). |

## 📚 Mapeo de Asignaturas

| Carpeta (`src/content/questions/argentina/`) | Nome Real | Código ID |
|----------------------------------------------|-----------|-----------|
| `matematica` | Matemática | `MAT` |
| `practicas-lenguaje` | Prácticas del Lenguaje | `LEC` |
| `ciencias-sociales` | Ciencias Sociales | `SOC` |
| `ciencias-naturales` | Ciencias Naturales | `CNAT` |
| `../../ingles` (Centralizado) | Inglés (**Global Standard**) | `ING` | Ver `docs/ENGLISH_LEARNING_PROTOCOL.md` |

## 🌍 Contextualización Cultural (Obligatorio)

**Lugares:** Buenos Aires (CABA), Córdoba, Rosario, Mendoza, La Pampa.
**Instituciones:** UBA, CONICET.
**Moneda:** Peso Argentino (ARS). Usar símbolo `$`.
**Nombres Comunes:** Santiago, Martina, Lionel, Sofía, Fernández.

**Exemplo:**
> "Vos tenés que calcular la distancia entre el Obelisco y..."

---

## 📋 Template de Archivo

```yaml
---
id: "AR-MAT-11-algebra-001"
country: "ar"
exam_board: "Nacional"
options_count: 4
...
```
