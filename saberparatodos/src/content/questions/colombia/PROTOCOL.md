# 🇨🇴 Protocolo de Generación: Colombia (ICFES)

> **Versión:** 2.1
> **Examen Objetivo:** Saber 11 (ICFES)
> **Moneda:** COP ($)

## 📌 Especificaciones Técnicas

| Característica | Regla |
|----------------|-------|
| **Opciones** | **4 Opciones** (A, B, C, D) |
| **Opciones Correctas** | Solo una correcta. 3 Distractores. |
| **Prefijo ID** | `CO-` |
| **Dialecto** | Español de Colombia (neutro). |

## 📚 Mapeo de Asignaturas

| Carpeta (`src/content/questions/colombia/`) | Nombre Real | Código ID |
|---------------------------------------------|-------------|-----------|
| `matematicas` | Matemáticas | `MAT` |
| `lectura-critica` | Lectura Crítica | `LEC` |
| `sociales-ciudadanas` | Sociales y Ciudadanas | `SOC` |
| `ciencias-naturales` | Ciencias Naturales | `CNAT` |
| `ingles` | Inglés | `ING` |

## 🌍 Contextualización Cultural (Obligatorio)

**Lugares:** Bogotá, Medellín, Cali, Barranquilla, Cartagena.
**Instituciones:** Universidad Nacional, Los Andes, SENA.
**Moneda:** Peso Colombiano (COP). Usar símbolo `$`.
**Nombres Comunes:** Juan, María, Carlos, Camila, Andrés.

**Ejemplo:**
> "Pedro va a la tienda en Bogotá y compra un tinto que cuesta $2,000 COP..."

---

## 📋 Template de Archivo

```yaml
---
id: "CO-MAT-11-algebra-001"
country: "co"
exam_board: "ICFES"
options_count: 4
...
```
