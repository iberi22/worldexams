# Informe de Estado: Exámenes de Periodo

## Resumen Ejecutivo

Se ha detectado que **NO existen preguntas etiquetadas con información de periodo** en el banco de preguntas actual, lo cual explica por qué no se están generando los exámenes de periodo.

Aunque existen scripts de generación (como `create_v3_period2.cjs`) que contienen la lógica y los datos para crear estos "bundles especiales", **estos scripts no han sido ejecutados o su salida no se ha persistido en el repositorio**.

Adicionalmente, la lógica actual de rotación de exámenes (`current.json.ts`) **no tiene soporte para filtrar o segmentar por periodo**, operando únicamente bajo un esquema de rotación semanal por grado y materia.

---

## 1. Evaluación del Etiquetado (.md)

Se realizó un escaneo automatizado de los 692 archivos de preguntas existentes en `src/content/questions`.

*   **Total de archivos escaneados:** 692
*   **Archivos con etiqueta `periodo`:** 0
*   **Archivos con etiqueta `period`:** 0
*   **Archivos con etiqueta `bimestre`:** 0
*   **Archivos con etiqueta `trimestre`:** 0

**Conclusión:** El sistema no puede identificar preguntas de periodo porque la metadata no existe en los archivos actuales.

## 2. Hallazgos sobre los "Bundles Especiales"

El usuario indicó: *"ya creamos unos bundles especiales de periodo"*.
Al investigar el repositorio, se encontraron los siguientes scripts en `saberparatodos/scripts/`:

*   `create_v3_period2.cjs`
*   `create_v3_period3.cjs`
*   `create_v3_period4.cjs`

Estos scripts definen preguntas con la metadata correcta, por ejemplo:
```javascript
periodo: 2,
title: "Medición de Ángulos"
```
Y están configurados para escribir en rutas como:
`src/content/questions/colombia/matematicas/grado-11/trigonometria/CO-MAT-11-angulos-001-v3-bundle.md`

Sin embargo, **estas carpetas (ej. `trigonometria`) y archivos NO existen en el repositorio actual**. Esto sugiere que los scripts fueron creados pero no ejecutados, o los archivos generados no fueron añadidos al control de versiones.

## 3. Evaluación de la Lógica de Generación

El archivo `src/pages/api/packs/current.json.ts` controla la generación de exámenes.
*   **Lógica Actual:** Filtra por grado (`b.data.grado === grade`) y agrupa por asignatura.
*   **Deficiencia:** Ignora por completo cualquier campo de `periodo`.
*   **Consecuencia:** Incluso si las preguntas existieran y estuvieran etiquetadas, el API actual las mezclaría con el resto o las ignoraría dependiendo de cómo se implemente la segmentación.

## Recomendaciones y Plan de Acción

Para solucionar la anomalía, se requieren los siguientes pasos:

1.  **Generar el Contenido:** Ejecutar los scripts `create_v3_periodX.cjs` para crear los archivos `.md` faltantes.
    *   *Comando sugerido:* `node saberparatodos/scripts/create_v3_period2.cjs` (y los demás).
2.  **Actualizar la Lógica del API:** Modificar `src/pages/api/packs/current.json.ts` (o crear un nuevo endpoint `period.json.ts`) para que acepte un parámetro de periodo y filtre las preguntas:
    ```typescript
    // Pseudo-código
    const periodBundles = allBundles.filter(b => b.data.grado === grade && b.data.periodo === targetPeriod);
    ```
3.  **Verificación:** Una vez generados los archivos y actualizada la lógica, verificar que el endpoint devuelva los paquetes correctos.
