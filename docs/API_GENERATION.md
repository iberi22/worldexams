# 🔌 Generación de API Estática (JSON)

> **Versión:** 1.0
> **Fecha:** 2025-12-07
> **Script:** `scripts/generate-questions-api.ps1`

---

## 📌 Propósito

El propósito de este proceso es transformar el banco de preguntas en Markdown (formato humano) a una estructura JSON paginada y optimizada para el consumo por parte de aplicaciones frontend (Web, Móvil). Esto permite un despliegue "Serverless" donde las preguntas se sirven como archivos estáticos.

## ⚙️ Proceso de Generación

El script `generate-questions-api.ps1` escanea todos los archivos `*-bundle.md` en `src/content/questions` y realiza lo siguiente:

1.  **Validación:** Verifica el frontmatter YAML para extraer metadatos (país, examen, grado, asignatura).
2.  **Extracción:** Utiliza un parser basado en *State Machine* y *Splitting* robusto para extraer:
    *   Enunciado (`Use-Case: Statement`)
    *   Opciones con su letra, texto y validación de respuesta correcta (`- [x] A) ...`)
    *   Dificultad normalizada (Low, Medium, High)
3.  **Agrupación:** Organiza las preguntas en una jerarquía de carpetas.
4.  **Paginación:** Genera archivos JSON de máximo 100 preguntas por "página".

## 📂 Estructura de Salida

La API se genera en la carpeta `api/` con la siguiente estructura:

```text
api/
└── {country_iso}/          # ej. co (Colombia)
    └── {exam_type}/        # ej. icfes
        └── {grade}/        # ej. 11
            └── {subject}/  # ej. ciencias_naturales (normalizado)
                ├── 1.json  # Página 1 (preguntas 1-100)
                ├── 2.json  # Página 2 (preguntas 101-200)
                └── ...
```

## 📄 Formato JSON

Cada archivo `N.json` contiene un objeto con metadata y la lista de preguntas:

```json
{
  "metadata": {
    "total_pages": 1,
    "total_questions": 14,
    "current_page": 1,
    "generated_at": "IsoDateString",
    "subject": "Matemáticas"
  },
  "questions": [
    {
      "id": "CO-MAT-11-algebra-001-v1",
      "number": 1,
      "difficulty": "Medium",
      "statement": "¿Texto de la pregunta...",
      "source_url": "https://...",
      "options": [
        {
          "letter": "A",
          "text": "Opción 1",
          "is_correct": false
        },
        {
          "letter": "B",
          "text": "Opción Correcta",
          "is_correct": true
        }
        // ...
      ],
      "correct_answer": "B"
    }
    // ...
  ]
}
```

## 🛠️ Instrucciones de Uso

Para regenerar la API después de añadir o modificar preguntas en Markdown:

1.  Abrir terminal en raíz del proyecto.
2.  Ejecutar el script:
    ```powershell
    ./scripts/generate-questions-api.ps1
    ```
3.  Verificar la salida en `api/`.
4.  Hacer commit de los cambios en `api/` para que se desplieguen.

---

## 🐛 Solución de Problemas

*   **Enunciados Vacíos:** Si el JSON aparece con `statement: ""`, revisar que el Markdown tenga la sección `### Enunciado` correctamente formateada. El script es sensible a la estructura de bloques `## Pregunta`.
*   **Opciones Duplicadas:** Asegurarse de que cada opción esté en una sola línea comenzando con `- [ ] X)`.
*   **Log de Depuración:** Para ver detalles del parseo, modificar la variable `$debug = $true` dentro del script `generate-questions-api.ps1`.
