# 🌍 Informe de Estado y Propuesta de Internacionalización

> **Fecha:** 2025-12-17
> **Estado:** 🟢 Listo para Expansión
> **Total Preguntas Colombia:** ~1,813 (259 bundles x 7 variantes)

---

## 📊 1. Estado Actual: Colombia

Actualmente contamos con un banco robusto de preguntas para Colombia, estructurado bajo el Protocolo v2.1. La cobertura es sólida para un lanzamiento inicial o simulacro completo.

| Asignatura (Slug) | Bundles (Archivos) | Total Preguntas (Est.) | Estado |
|-------------------|--------------------|------------------------|--------|
| `sociales-ciudadanas` | 84 | 588 | 🟢 Óptimo |
| `matematicas` | 60 | 420 | 🟢 Muy Bueno |
| `ingles` | 42 | 294 | 🟡 Bueno |
| `ciencias-naturales` | 41 | 287 | 🟡 Bueno |
| `lectura-critica` | 32 | 224 | 🟡 Aceptable |
| **TOTAL** | **259** | **~1,813** | |

**Conclusión:** Tenemos volumen suficiente en Colombia para pausar la generación masiva y enfocarnos en **diversificar a otros países**.

---

## 🕵️ 2. Análisis del Protocolo Actual (v2.1)

El protocolo actual está muy bien diseñado para escalabilidad (bundles de 7 variantes, licencias duales), pero tiene **limitaciones específicas para la internacionalización** que detectamos en la investigación.

### ✅ Fortalezas
- **Estructura Bundle (1 original + 6 variantes):** Excelente para generar volumen rápidamente.
- **Contextualización Cultural:** Obligatoria, lo cual es clave para que se sienta local.
- **Licenciamiento:** Modelo dual inteligente para monetización.

### ⚠️ Debilidades para Expansión (Hallazgos de Investigación)

1.  **Número de Opciones Rígido (4 Opciones):**
    -   El protocolo asume A, B, C, D.
    -   **Problema:** En **Brasil (ENEM)**, el estándar son **5 opciones (A, B, C, D, E)**.
    -   **Solución:** Debemos flexibilizar el template para soportar 4 o 5 opciones según el país.

2.  **Mapeo de Asignaturas:**
    -   Actualmente hay una tabla simple. Se necesita un mapeo más robusto de "Meta-Asignaturas" a "Asignaturas Locales".
    -   Ejemplo: `sociales-ciudadanas` (CO) vs `civismo` (MX) vs `historia/geografia` (CL).

3.  **Competencias Específicas Nacionales:**
    -   Falta un campo de metadatos para el código de competencia oficial del país.
    -   Brasil: códigos BNCC (ej: `EM13CNT201`).
    -   México: Campos formativos NEM.

---

## 🚀 3. Propuesta de Protocolo v3.0 (Internacional)

Para soportar la expansión a México, Brasil, Argentina y Chile, recomiendo actualizar el protocolo con los siguientes cambios antes de empezar a generar.

### A. Soporte Multi-Formato de Opciones
Modificar la estructura del archivo `.md` para permitir `options_count: 4` o `5`.

```yaml
country: "br"
exam_board: "ENEM"
options_count: 5  # NEW
```

### B. Taxonomía de Asignaturas Globales
Definir "Slugs Globales" que se mapean a nombres locales en el UI.

| Slug Global | Colombia | México | Brasil | Chile | Argentina |
|-------------|----------|--------|--------|-------|-----------|
| `math` | Matemáticas | Pensamiento Matemático | Matemática e suas Tecnologias | Competencia Matemática | Matemática |
| `science` | Ciencias Naturales | Ciencias Experimentales | Ciências da Natureza | Ciencias | Ciencias Naturales |
| `social-studies`| Sociales y Ciudadanas | Comprensión Lectora / Historia | Ciências Humanas | Historia y Cs. Sociales | Cs. Sociales |
| `language` | Lectura Crítica | Comprensión Lectora | Linguagens e Códigos | Competencia Lectora | Lengua / Literatura |
| `english` | Inglés | Inglés | Inglés (Espanhol opcional) | Inglés | Idioma Extranjero |

### C. Estrategia de Expansión Sugerida

Recomiendo empezar la expansión en el siguiente orden, basado en similitud de mercado y facilidad de adaptación:

1.  **🇲🇽 México (EXANI-II):** Mercado gigante, formato similar (4 opciones), idioma español.
2.  **🇨🇱 Chile (PAES):** Formato muy estándar (4 opciones), alta digitalización.
3.  **🇦🇷 Argentina:** Menos estandarizado a nivel nacional, pero adaptable.
4.  **🇧🇷 Brasil (ENEM):** **Mayor reto.** Requiere traducción al portugués y cambio de formato a 5 opciones. Dejar para el final de la fase de expansión.

---

## 🛠️ Próximos Pasos Recomendados

1.  **Aprobar Protocolo v3.0** con soporte para 5 opciones (preparando terreno para Brasil).
2.  **Crear carpeta `src/content/questions/mexico`** y probar la generación del primer bundle de "Pensamiento Matemático" (EXANI-II).
3.  **Actualizar `QUESTION_GENERATION_PROTOCOL.md`** con las reglas específicas de México (moneda MXN, ciudades, referencias culturales).
