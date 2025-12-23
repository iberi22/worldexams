# 🧪 Protocolo de Pruebas E2E (v2.0) - Inteligencia Local

> **Objetivo:** Asegurar que el sistema de reportes inteligentes y cálculo de MMR funciona correctamente mediante simulaciones de usuario completas.

---

## 🏗️ Filosofía de Pruebas "Black Box"
Para evaluar el **Sistema de Inteligencia Local**, no probamos unidades de código aisladas. En su lugar, simulamos ser un estudiante ("Jules") que toma un examen con respuestas conocidas de antemano.

Esto nos permite verificar:
1.  La **Experiencia de Usuario (UX)** completa.
2.  La **Integración** de componentes (API -> Frontend -> IndexedDB -> MMR Engine).
3.  La **Lógica de Negocio** (¿Subió el MMR al responder bien preguntas difíciles?).

## 🛠️ Herramientas
*   **Framework:** Playwright
*   **Navegador:** Chromium (Headless por defecto)
*   **Entorno:** Local (`npm run dev`)

## 🤖 El Agente de Prueba (Simulador)
El test `tests/local-intelligence.spec.ts` actúa como un agente inteligente que:
1.  **Intercepta la Red:** Bloquea las llamadas reales a la API y devuelve un "Mock Exam" predefinido.
2.  **Conoce las Respuestas:** Sabe que la pregunta con ID `MOCK-Q1` tiene la respuesta "A".
3.  **Ejecuta Estrategias:**
    *   *Estrategia "Perfecta":* Responde todo correctamente para verificar ganancia máxima de MMR.
    *   *Estrategia "Aleatoria":* (Pendiente) Para probar estabilidad.

## 📋 Cómo Ejecutar las Pruebas

### 1. Iniciar Entorno de Desarrollo
El servidor debe estar corriendo para que Playwright acceda a la UI.
```bash
npm run dev
```

### 2. Ejecutar Pruebas E2E
En una nueva terminal:
```bash
# Ejecutar todas las pruebas
npm run test

# Ejecutar SOLO las pruebas de inteligencia local (con interfaz visible para debug)
npx playwright test local-intelligence.spec.ts --headed
```

## 🔍 Escenarios Cubiertos

| Escenario | Descripción | Resultado Esperado |
|-----------|-------------|--------------------|
| **Perfect Game** | Usuario responde correctamente preguntas difíciles | MMR aumenta (+Delta verde), Rango sube |
| **Dashboard Access** | Usuario accede al reporte local desde el header | Se visualizan gráficas y estadísticas calculadas |

## 🧬 Mantenimiento
Si cambia la lógica de MMR o la UI del examen:
1.  Actualizar `MOCK_QUESTIONS_RESPONSE` en `local-intelligence.spec.ts` si cambia la estructura de `AppQuestion`.
2.  Actualizar los selectores de texto (ej. "Iniciar Examen") si cambia el idioma o copy.

---
**World Exams Organization** | *Testing Standard 2025*
