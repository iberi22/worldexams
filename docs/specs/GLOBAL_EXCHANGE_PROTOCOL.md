# 🌎 Protocolo de Intercambio Global de Preguntas (G-QEP)

Este documento define la estrategia para compartir, adaptar y traducir preguntas entre los distintos exámenes nacionales del monorepo `worldexams`.

## 1. Concepto: "El Núcleo Universal"
Muchas ciencias son universales. El Teorema de Pitágoras es igual en Colombia (`saber-co`) que en Estados Unidos (`sat-us`).
Definimos **3 Categorías de Portabilidad**:

*   🟢 **Universales (100% Portables):** Matemáticas, Física, Química, Biología, Inglés (Gramática).
*   🟡 **Adaptables (Requieren Contexto):** Economía (cambiar monedas), Geopolítica (nombres de países), Comprensión Lectora (si los textos son neutros).
*   🔴 **Locales (No Portables):** Historia Nacional, Constitución, Literatura local específica.

## 2. Estrategia de Sincronización: "Symlink Lógico"

En lugar de duplicar archivos físicamente y perder el control, utilizaremos un script de **Sincronización Inteligente** que actúa como un "traductor/adaptador" en tiempo de compilación.

### Flujo de Trabajo

1.  **Banco Fuente (`/saberparatodos`):** Las preguntas se crean aquí (o en cualquier repo "madre") siguiendo el estándar v2.0.
2.  **Identificación:** Si una pregunta es Universal (🟢), se marca en su metadata:
    ```yaml
    universal_id: MATH-ALG-Pythagoras-001
    portable: true
    ```
3.  **El script `sync-questions`:**
    *   Escanea todos los repositorios buscando `portable: true`.
    *   Genera copias en los repositorios destino (ej: `/saber-mx`, `/sat-us`).
    *   **Aplica Transformaciones Automáticas:**
        *   **Moneda:** `COP $2000` -> `MXN $10` -> `USD $0.50`
        *   **Entidades:** `Bogotá` -> `Ciudad de México` -> `New York`
        *   **Idioma:** Si el destino es diferente (ej: `sat-us`), llama a LLM para traducción de alta fidelidad.

## 3. Plan de Implementación

### Paso 1: Limpieza del Monorepo
Eliminar carpetas de infraestructura antigua (como se acaba de hacer con `question-bank`).

### Paso 2: Crear `tools/universal-sync`
Una herramienta centralizada en Rust (para velocidad) o Node.js que orqueste el movimiento.

**Comando:** `npm run sync:questions --source=saber-co --target=saber-mx`

### Paso 3: Diccionarios de Contexto
Crear un archivo `.context.json` en la raíz de cada país:

**saber-mx/.context.json:**
```json
{
  "currency_symbol": "$",
  "currency_code": "MXN",
  "capital": "Ciudad de México",
  "common_names": ["Juan", "Lupita", "Carlos"],
  "exams_name": "EXANI-II"
}
```

### Paso 4: Metadata "Universal"
Actualizar el generador de preguntas para incluir el campo `portable: true` por defecto en Matemáticas y Ciencias.

## 4. Ventajas
*   **Eficiencia:** Una pregunta de geometría creada en Colombia sirve inmediatamente para 15 países.
*   **Calidad:** Al traducir, el LLM puede mejorar la redacción.
*   **Mantenimiento:** Si se corrige un error en la fórmula de la pregunta en Colombia, el script de sincronización puede propagar la corrección (o alertar).

---
*Este protocolo asegura que `worldexams` no sea un archipiélago de islas desconectadas, sino una federación de conocimiento compartido.*
