# 🇨🇴 Plan de Mejora y Migración: Exámenes de Colombia

> **Fecha:** 2025-12-07
> **Objetivo:** Preparar el repositorio de Colombia para producción (Protocolo v2.0)
> **Estado Actual:** 🔴 NO APTO PARA PRODUCCIÓN

---

## 1. Diagnóstico Actual

Despues de realizar una auditoría completa del directorio `src/content/questions/colombia` y revisar el estado del repositorio (Issues/PRs), se han encontrado los siguientes hallazgos:

### 📊 Métricas de Auditoría
*   **Total Archivos Analizados:** 157
*   **Archivos Legacy (v1.0):** 157 (100%)
*   **Archivos Bundle (v2.0):** 0 (0%)
*   **Estado de Issues:** Existen Issues abiertos (#39, #1) solicitando la generación, pero el trabajo no se ha reflejado en el `master` correctamente o se hizo en formato antiguo.

### 🚫 Bloqueantes para Producción
1.  **Formato Obsoleto**: Los archivos son preguntas individuales, no "Universal Bundles" de 7 preguntas como exige el Protocolo v2.0.
2.  **Falta de Contexto Cultural**: Las preguntas actuales son genéricas y carecen de referencias locales (COP, Ciudades, Cultura Colombiana).
3.  **Metadatos Incorrectos**: Los archivos declaran `protocol_version: "2.0"` pero estructuralmente son v1.0, lo que romperá el build.
4.  **Trazabilidad Nula**: Falta el campo `source_url` obligatorio para atribución de derechos.

---

## 2. Plan de Acción Inmediato

Para llevar los exámenes de Colombia a producción, propongo la siguiente hoja de ruta:

### Fase 1: Limpieza y Preparación (Prioridad Alta)
*   [ ] **Depurar Issues**: Mantener abiertos #39 y #1 como referencia, pero centralizar el trabajo en este plan.
*   [ ] **Backup**: Mover los 157 archivos legacy a una carpeta `_archive/legacy-v1` para referencia.

### Fase 2: Migración a Bundles v2.0 (La Solución)
En lugar de editar los archivos existentes, generaremos nuevos **Bundles** desde cero utilizando las preguntas legacy como "semilla" (Pregunta Original).

**Estrategia de Agrupación:**
Agruparemos las 157 preguntas sueltas en aproximadamente **25 Bundles Temáticos**.

*Ejemplo de Transformación:*
*   *Entrada:* 7 archivos legacy de álgebra (ej. `mat-algebra-001.md` a `007.md`).
*   *Salida:* 1 Bundle `CO-MAT-11-algebra-001-bundle.md` que contenga:
    *   1 Pregunta "Original" (seleccionada de los legacy).
    *   6 Variaciones generadas por IA (2 Fáciles, 2 Medias, 2 Difíciles).
    *   Contexto cultural aplicado a todas.

### Fase 3: Ejecución de Migración (Por Lotes)
Ejecutaremos la migración por asignaturas para asegurar calidad:
1.  **Matemáticas (Lote Piloto)**: ~45 preguntas legacy -> ~6 Bundles.
2.  **Ciencias Naturales**: ~34 preguntas legacy -> ~5 Bundles.
3.  **Otras Áreas**: Sociales, Inglés, etc.

---

## 3. Propuesta Técnica: Script de Migración

Crearé un script `scripts/migrate-legacy-to-bundle.ps1` que:
1.  Lea un directorio de archivos legacy.
2.  Extraiga el par "Pregunta/Respuesta".
3.  Genere el esqueleto del archivo Bundle v2.0.
4.  (Opcional) Se conecte a una API o espere input manual para llenar las variaciones.

---

## 4. Definición de "Listo para Producción" (DoD)

Para marcar Colombia como "Green / Ready", debemos cumplir:
*   [ ] 0 archivos sueltos en `src/content/questions/colombia/*`.
*   [ ] Al menos 20 Bundles (140 preguntas totales) en formato v2.0.
*   [ ] Build exitoso sin errores de parsing YAML.
*   [ ] Verificación visual de referencias culturales (Pesos, Ciudades).

## Recomendación al Usuario
Autorizar el inicio de la **Fase 2 (Migración de Matemáticas)** inmediatamente.
