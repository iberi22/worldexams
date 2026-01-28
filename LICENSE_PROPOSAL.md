# Plan de Licenciamiento Open Source - World Exams

## Introducción
Este documento analiza la propuesta de abrir el código del repositorio de World Exams bajo una licencia que proteja el modelo de negocio, permitiendo el uso libre pero prohibiendo la explotación por parte de competidores comerciales (sistemas similares).

## Análisis de Licencias Actuales vs. Objetivo

| Componente | Licencia Actual | Limitación para Competidores |
| :--- | :--- | :--- |
| **Código Fuente** | MIT License | **Ninguna**. Un competidor puede copiar el código y vender el sistema. |
| **Preguntas v1** | CC BY-SA 4.0 | **Ninguna**. Permite uso comercial (siempre que se atribuya y sea SA). |
| **Preguntas v2-v7** | CC BY-NC-SA 4.0 | **Alta**. Prohíbe uso comercial directo. |

### El Problema con BSD Estándar
La licencia **BSD (2 o 3 cláusulas)** es una licencia "Permisiva". Permite a cualquiera (incluyendo competidores) tomar el código, cerrarlo y venderlo. **No tiene cláusulas de no-competencia.**

## Propuestas de Solución

Para lograr el objetivo de "Open Source con protección comercial", recomendamos las siguientes opciones:

### Opción A: BSD + Commons Clause (Recomendada para el Código)
Se usa la licencia BSD como base, pero se añade la **Commons Clause**.
- **Cómo funciona:** Permite ver, modificar y usar el código para casi todo, pero prohíbe explícitamente "vender" el software o servicios que dependan sustancialmente de él si compiten con el original.
- **Ventaja:** Muy común en empresas que pasan de privado a "Source Available" (ej. Redis, antes de su cambio más reciente).

### Opción B: PolyForm Shield 1.0.0 (Más moderna y específica)
Es una licencia diseñada específicamente para el código fuente que quieres compartir pero proteger de la competencia.
- **Cómo funciona:** Permite todos los usos **excepto** aquellos que compitan con el proveedor original del software.
- **Ventaja:** Lenguaje legal muy claro sobre la no-competencia.

### Opción C: Ajuste de Licencias de Contenido (Para las Preguntas)
Para las preguntas, si se desea proteger **incluso la v1** de competidores:
1.  **Cambiar v1 a CC BY-NC-SA:** Así todo el banco de preguntas queda prohibido para uso comercial.
2.  **Licencia de Base de Datos Personalizada:** Crear un archivo `LICENSE-CONTENT.md` que especifique que el banco de preguntas es libre para uso personal, educativo y académico, pero no para plataformas comerciales de exámenes.

## Implementación Propuesta

1.  **Actualizar [LICENSE.md](file:///e:/scripts-python/worldexams/LICENSE.md):**
    - Cambiar la licencia del código de **MIT** a **PolyForm Shield 1.0.0** o **BSD + Commons Clause**.
    - Unificar el contenido educativo bajo una restricción de no-competencia más estricta si es necesario.
2.  **Actualizar [PLANNING.md](file:///e:/scripts-python/worldexams/PLANNING.md):** Reflejar la nueva estrategia de "Source Available / Fair Source".
3.  **Actualizar [README.md](file:///e:/scripts-python/worldexams/README.md):** Añadir una sección de "Licencia y No-Competencia" para que sea visible desde el primer momento.

## Conclusión
La licencia **BSD pura no cumple** con tu requisito de protección contra sistemas similares. La mejor ruta es una licencia de tipo **"Fair Source" o "Source Available"** como **PolyForm Shield** para el código, manteniendo o endureciendo las licencias **CC-NC** para las preguntas.

> [!IMPORTANT]
> Estas licencias no son técnicamente "Open Source" según la OSI (Open Source Initiative) porque discriminan el uso comercial, pero son el estándar de la industria para lo que buscas: **transparencia y uso libre sin canibalización comercial.**
