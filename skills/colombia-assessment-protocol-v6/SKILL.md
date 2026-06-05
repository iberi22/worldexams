---
name: colombia-assessment-protocol-v6
description: Protocolo especializado para la generación y validación de contenido multi-grado (3-11) en Colombia, alineado con DBA del MEN y marcos ICFES.
---

# Colombia Assessment Protocol v6.0

Este skill gobierna la creación de bundles MASTERY para todos los grados en Colombia.

## Protocolo de Generación

### 1. Alineación Curricular (DBA + EBC)
- Cada bundle debe declarar explícitamente el DBA o Estándar al que se alinea en el campo `alignment`.
- El lenguaje y dificultad deben ser apropiados para la edad del grado objetivo.

### 2. Estructura de Bundle por Grado

| Grados | Preguntas | Dificultad | Formato ID |
|--------|-----------|------------|------------|
| 3-4 | 10 | D2-D7 | `CO-[AREA]-[GRADO]-P[P]-[TOPIC]-[IDX]-MASTERY` |
| 5-7 | 15 | D3-D9 | `CO-[AREA]-[GRADO]-P[P]-[TOPIC]-[IDX]-MASTERY` |
| 8-11 | 20 | D3-D10 | `CO-[AREA]-[GRADO]-P[P]-[TOPIC]-[IDX]-MASTERY` |

### 3. Requerimientos Técnicos
- `protocol_version: "6.0"`
- `country: "colombia"`
- Metadata por pregunta: `ID`, `Bloom`, `ICFES`, `Expected_Success`.
- Feedback obligatorio en las 4 opciones (`<!-- feedback: ... -->`).

## Workflow de Validación

1. **Check de Grado vs Tamaño**:
   - Si grado <= 4, bundle_size debe ser 10.
   - Si grado >= 5 y <= 7, bundle_size debe ser 15.
   - Si grado >= 8, bundle_size debe ser 20.
2. **Check de Contexto**:
   - Referencias culturales colombianas obligatorias.
   - Sin referencias directas al nombre del examen en el enunciado.
3. **Check de Calibración**:
   - El `expected_success_rate` debe ser más alto para grados menores (~0.7-0.8 para grado 3) y bajar gradualmente hacia grado 11 (~0.5-0.6).

## Tareas de Automatización
- `scripts/direct-generate.py` debe usar este protocolo cuando `country=colombia`.
- `saberparatodos/scripts/validate_content.js` aplica las reglas de tamaño variable.
