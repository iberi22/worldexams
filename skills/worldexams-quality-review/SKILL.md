---
name: worldexams-quality-review
version: 1.0
description: Sistema de revisión pedagógica y técnica para bundles WorldExams.
---

# WorldExams Quality Review Skill v1.0

## Dimensión de Evaluación

1. **Revisión Técnica (30%)**:
   - Formato Markdown correcto.
   - IDs de preguntas únicos y consistentes.
   - Estructura Protocolo v5.2 (headers, feedback HTML, explicaciones).
   - Metadatos obligatorios (Bloom, Expected_Success, Competencia/ICFES).

2. **Revisión Curricular (40%)**:
   - Alineación con DBA (Derechos Básicos de Aprendizaje) de Colombia.
   - Coherencia con el grado y periodo escolar.
   - Rigor conceptual.

3. **Revisión de Contexto (20%)**:
   - Nombres, lugares y situaciones colombianos (nacionalización).
   - Ausencia de sesgos o contenidos inapropiados.

4. **Revisión de Redacción (10%)**:
   - Ortografía y gramática.
   - Claridad del enunciado.
   - Distractores plausibles y homogéneos.

## Formato del Reporte de Calidad

Cada bundle generado debe incluir este bloque al final del PR o del archivo (según se solicite):

[//]: # (QUALITY_REVIEW)

| Dimensión | Score | Notas |
|-----------|-------|-------|
| Técnico | XX/30 | |
| Curricular | XX/40 | |
| Contexto | XX/20 | |
| Redacción | XX/10 | |
| **TOTAL** | **XX/100** | |

## Umbrales de Aceptación
- **>= 90**: Auto-merge (Excelente).
- **80-89**: Revisión humana opcional (Bueno).
- **< 80**: Requiere corrección obligatoria (Insuficiente).
