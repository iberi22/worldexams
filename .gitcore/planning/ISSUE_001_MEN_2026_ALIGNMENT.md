# Issue: [MEN-2026] Alineación Curricular y Segregación de Grado 11

**Status:** Open
**Priority:** High
**Owner:** Antigravity (Architect/Librarian)
**Reference:** MEN 2026 Extraction (Analysis Results)

## Contexto
La investigación del 13 de abril de 2026 reveló discrepancias entre la malla curricular de World Exams y los nuevos lineamientos del Ministerio de Educación Nacional (MEN 2026). Este issue rastrea la migración del contenido de Grado 11 para cumplir con el estándar oficial de segregación por periodos.

## Fases de Implementación

### Fase 1: Sincronización de la Malla Curricular (Config)
- [x] Refactorizar `saberparatodos/src/config/curriculum.ts`.
- [x] Reordenar los tópicos de Matemáticas, Ciencias, Sociales y Lectura Crítica según el reporte de auditoría.
- [x] Validar que el motor de filtrado reconozca los nuevos IDs de periodo.

### Fase 2: Migración de Metadatos de Bundles (Questions Data)
- [x] Escanear `questions_data/colombia/**/grado-11/`.
- [x] Mover físicamente los bundles afectados (ej. de `periodo-1/limites` a `periodo-2/limites`).
- [x] Parchear el frontmatter de los bundles afectados (cambiar `periodo: 1` a `periodo: 2` para Límites y Continuidad).
- [x] Actualizar `protocol_version` a `5.1` en bundles críticos de G11.

### Fase 3: Reorganización del Sistema de Archivos (Directory Structure)
- [x] Mover físicamente los archivos `.md` a sus nuevas rutas de periodo.
- [x] Limpiar carpetas vacías resultantes (`periodo-1/periodo-1/`, `periodo-2/periodo-2/`).
- [ ] Verificar rutas en `scripts/audit-questions.js` (si aplica).

### Fase 4: Validación y Despliegue Local
- [ ] Ejecutar `npm run dev` y verificar la selección de temas en el `ExamConfigModal`.
- [ ] Realizar una prueba de carga de examen por periodo para confirmar la extracción correcta de preguntas.
- [ ] Generar reporte final de conformidad.

## Criterios de Aceptación
- [ ] Grado 11 muestra los temas exactos del MEN 2026 en el selector de periodos.
- [ ] Al seleccionar un periodo, las preguntas entregadas pertenecen estrictamente a ese periodo según la nueva malla.
- [ ] No hay errores de "File not found" en el cargador de bundles.
