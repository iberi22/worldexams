# PLANNING.md -

## 1. Visión del Proyecto

Crear la plataforma de preparación para pruebas de estado (Saber 3° a 11°) más accesible, transparente y eficiente de Colombia.
**Filosofía:** "Source Available" (Código Público pero Protegido).
**Sostenibilidad:**
1.  **B2C (Gratis):** Freemium con Ads para estudiantes individuales.
2.  **B2B (Institucional):** Planes para Colegios/Academias (Dashboard de Métricas, Gestión de Grupos, Simulacros Controlados).
3.  **B2D (Developers):** API-as-a-Service (Venta de acceso a la base de preguntas).

## 2. Arquitectura Técnica (The Hybrid Stack)

* **Frontend:** Astro 5 (Static Site Generation + Server Islands).
*   **Hosting:** Cloudflare Pages.
*   **Contenido:** Markdown en Git (Single Source of Truth).
* **Backend:**
    *   **BaaS:** Supabase (Auth, DB, Realtime).
    *   **API Gateway:** Cloudflare Workers (para monetización de API y control de acceso).

## 3. Estructura de Datos (Supabase Schema)

* `profiles`: (id, nickname, avatar_url, grade_level, is_premium, school_id).
* `organizations`: (id, name, plan_type, max_students).
* `exam_sessions`: (id, user_id, score, duration, completed_at, json_answers).
* `api_keys`: (key, owner_id, plan, rate_limit, usage_count).

## 4. Estrategia de Monetización

### A. Modelo Institucional (SaaS B2B)
Venta de suscripciones anuales a **Colegios y Preicfes**:
*   **Dashboard del Rector/Profesor:** Ver progreso detallado por estudiante y grupo.
*   **Simulacros Programados:** El colegio define fecha y hora, y el sistema abre el examen.
*   **Comparativas:** Ranking interno del colegio vs promedio nacional.

### B. API-as-a-Service (Data Monetization)
Exponer el banco de preguntas vía REST API (`api.worldexams.org`):
*   **Free Tier:** 100 req/día, solo preguntas públicas, uso personal/dev.
*   **Pro Tier:** 10k req/día, acceso a preguntas premium, uso comercial permitido.
*   **Enterprise:** Sin límites, soporte, endpoints personalizados.

### C. Usuarios Finales (B2C)
*   **Gratis:** Acceso total a preguntas, con publicidad y funcionalidades básicas.
*   **Premium:** Sin publicidad, estadísticas avanzadas, modo "Sala de Exámenes" ilimitado.

## 5. Roadmap

* **Fase 1:** Setup de Astro y renderizado de Markdown.
* **Fase 2:** Integración Supabase Auth y RLS.
* **Fase 3:** Lógica de examen y Edge Function `submit-exam`.
* **Fase 4:** **Implementación API Gateway & API Keys.**
* **Fase 5:** **Dashboard Institucional & Gestión de Organizaciones.**

---

## 5.1 Party Mode (Aula Virtual Multiplayer)

Objetivo: permitir sesiones en tiempo real (host + invitados) con configuración **autoritativa del host** y sincronización robusta.

### Arquitectura Híbrida (P2P First + Fallback)

1. **Capa Primaria (P2P):**
    * **Librería:** Trystero (WebRTC serverless).
    * **Señalización:** Supabase Realtime (vía `trystero/supabase`).
    * **Topología:** Estrella (Host central).
    * **Soft Cap:** Máximo 30 conexiones P2P por Host para proteger CPU.
    * **Ventaja:** Latencia mínima (<50ms), costo $0 en backend.

2. **Capa Secundaria (Fallback):**
    * **Tecnología:** Supabase Realtime Channels (WebSockets).
    * **Uso:** Señalización P2P y fallback automático si P2P falla (redes corporativas/escolares).
    * **Estado:** Fuente de verdad persistente (`party_sessions`).

### Anti-Cheat & Integridad (Focus Tracking)

* **Detección:** `visibilitychange` y `blur` events.
* **Reporte:** Envío inmediato de eventos `FOCUS_LOST` al Host vía P2P.
* **UI Host:** Alertas en tiempo real ("⚠️ Juan perdió el foco").
* **Resultados:** Resumen de integridad en pantalla final (Usuarios concentrados vs distraídos).

### Flujo de Datos

1. **Lobby:** Host genera código -> Guests se unen (P2P handshake).
2. **Config Sync:** Host broadcast `CONFIG_UPDATE` (preguntas, tiempo).
3. **Examen:** Sincronización de reloj y eventos de foco.
4. **Resultados:** Guests envían `EXAM_RESULT` al Host para agregación.

### Guardrails UX

* Unirse solo permite `status=waiting` (si ya inició/finalizó, mostrar mensaje claro).

* Lobby con “✅ Estoy listo” en invitados + contador en host.
* Host no puede iniciar hasta que **todos** estén listos.
* Enlace para compartir: `/?join={partyCode}`.

### Resiliencia

* Indicador de estado Realtime (conectado/reconectando/sin conexión).

* Re-suscripción automática al volver online.

---

## 6. Estrategia de Replicación Multi-País

Este proyecto está diseñado como **plantilla base** para crear bancos de preguntas nacionales.

### Trigger de Replicación

* **Mínimo:** 10,000 preguntas en el banco base (Colombia)

* **Estabilidad:** 3 meses de operación sin bugs críticos

### Países Target (Orden de Prioridad)

| País | Prueba Nacional | Población Estudiantil | Prioridad |
|------|-----------------|----------------------|-----------|
| 🇲🇽 México | ENLACE / PLANEA | 25M+ | Alta |
| 🇦🇷 Argentina | APRENDER | 10M+ | Alta |
| 🇨🇱 Chile | SIMCE | 3M+ | Media |
| 🇵🇪 Perú | ECE | 8M+ | Media |
| 🇪🇨 Ecuador | Ser Bachiller | 4M+ | Media |
| 🇧🇴 Bolivia | PSA | 2M+ | Baja |

### Proceso de Fork por País

1. Fork del repositorio base
2. Renombrar: `saber-[pais]` (ej: `saber-mexico`, `saber-argentina`)
3. Adaptar:
   * Estructura de grados según sistema educativo local
   * Asignaturas según currículo nacional
   * Nombre de la prueba (ICFES → ENLACE, etc.)
4. Migrar estructura de preguntas vacía
5. Reclutar colaboradores locales

### Adaptaciones Necesarias por País

```yaml
# config/country.yaml (ejemplo para México)
country:
  name: México
  code: MX
  exam_name: PLANEA
  grades: [3, 6, 9, 12]  # Diferente a Colombia
  subjects:
    - Español
    - Matemáticas
    - Ciencias
    - Formación Cívica
  currency: MXN
  timezone: America/Mexico_City
```

---

## 8. Estrategia de Contenido Inglés (Global)

### Estado Actual (Enero 2026)

| Métrica | Valor |
|---------|-------|
| **Bundles Totales** | 258 |
| **Preguntas Totales** | ~2,580 (10 preguntas/bundle) |
| **Bundles UNI-ENG (Universales)** | 8 |
| **Bundles CO-ING (Colombia)** | 250 |

### Meta: 500 Bundles por País

**Objetivo:** Crear una base sólida de 500 bundles de inglés por país hispanohablante, donde:
- 100 bundles son **universales** (`UNI-ENG-*`)
- 400 bundles son **país-específicos** (`[COUNTRY]-ING-*`)

### Plan de Expansión Gradual

| Fase | Bundles | Tipo | Timeline | Estado |
|------|---------|------|----------|--------|
| **Fase 1** | 8 | UNI-ENG (A1-B2) | Ene 2026 | ✅ Completado |
| **Fase 2** | 92 | UNI-ENG (Expansión) | Feb 2026 | ⬜ Pendiente |
| **Fase 3** | 150 | CO-ING (Migración) | Mar 2026 | ⬜ Pendiente |
| **Fase 4** | 250 | País-específicos | Q2 2026 | ⬜ Pendiente |

### Distribución por Nivel CEFR

| Nivel | Grados | Bundles Target |
|-------|--------|----------------|
| A1 | 3-5 | 100 |
| A2 | 6-8 | 150 |
| B1 | 9-10 | 150 |
| B2 | 11-12 | 100 |

### Compatibilidad Multi-País

| País | Sistema | Inglés Obligatorio | Bundles Recomendados |
|------|---------|-------------------|---------------------|
| 🇨🇴 Colombia | ICFES | Grado 11 (B1) | UNI-ENG + CO-ING |
| 🇲🇽 México | EXANI | Preparatoria | UNI-ENG + MX-ING |
| 🇨🇱 Chile | PAES | IV° Medio | UNI-ENG + CL-ING |
| 🇦🇷 Argentina | - | Secundaria | UNI-ENG + AR-ING |

### Referencia Técnica

- **Formato:** Protocol v3.0-GLOBAL

### 8.1 Mejoras Técnicas Q1 2026

Se han implementado mejoras críticas para potenciar la pedagogía y el seguimiento del aprendizaje de idiomas:

- **Extracción Automática de Metadatos:** El `questionParser.ts` ahora detecta y extrae la "Parte" del examen (ej: Parte 1 - Vocabulario) y el nivel CEFR directamente de los bundles.
- **Visualización con Badges:** La interfaz de resultados (`ResultsView.svelte`) ahora muestra badges visuales para cada pregunta, indicando su parte y nivel.
- **Seguimiento de Progreso (Memory Tracking):** Se ha habilitado el componente `MemoryStatus` para rastrear preguntas vistas y dominadas a largo plazo.
- **NotebookLM Integration:** Reforzada la generación de planes de estudio personalizados exportables para tutores de IA.
- **Verificación E2E:** Implementado suite de pruebas en Playwright para asegurar la integridad del flujo de diagnóstico de inglés.


---

## 7. Credenciales y Configuración Sensible

### Supabase (Colombia - Producción)

* Project ID: `tzmrgvtptdtsjcugwqyq`

* Dashboard: <https://supabase.com/dashboard/project/tzmrgvtptdtsjcugwqyq>

### Telegram Bot

* Bot: @saberparatodoscol_bot

* Webhook URL: <https://tzmrgvtptdtsjcugwqyq.supabase.co/functions/v1/telegram-bot>

### Variables de Entorno Requeridas

```bash
# .env.local (NUNCA commitear)
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=  # 🚫 Nunca usar en frontend/cliente
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
FUNCTION_SECRET=
```

---

## 8. Dominio de Producción

| Plataforma | URL | Hosting |
|------------|-----|---------|
| 🇨🇴 **SaberParaTodos** | **https://saberparatodos.space** | Cloudflare Pages |

**Comando de Deploy:**
```bash
cd saberparatodos
npm run build && npx wrangler pages deploy dist --project-name=saberparatodos
```

---

## 9. Avance Producción de Contenido (Grados 10°-11°)

Se ha completado la generación masiva de contenido base (Protocol v3.0) para fortalecer el banco de `saber-co`.

### Hitos Recientes (Enero 2026)
*   **Grado 11:** 100% Cobertura (Matemáticas, Lectura, Naturales, Sociales, Inglés).
*   **Grado 10:**
    *   ✅ Matemáticas (400 preguntas)
    *   ✅ Naturales (400 preguntas: Química/Física)
    *   ✅ Sociales (400 preguntas: Historia/Política)

### Producción de Contenido: Grados 3°-5° (Febrero 2026)
*   **Grado 3:** ✅ 100% Cobertura (Matemáticas, Ciencias, Sociales — Protocol v3.0)
*   **Grado 4:** ✅ 100% Cobertura (Matemáticas, Ciencias, Sociales — Protocol v3.0)
*   **Grado 5:** ✅ 100% Cobertura (Matemáticas, Ciencias, Sociales — Protocol v3.0)

### Producción de Contenido: Grados 6°-8° (En Progreso — Asignado a Jules)

> **Agente:** Jules (AI Coding Agent)
> **Protocolo:** v3.0 (10 preguntas/bundle, dificultad 1-5)
> **Meta:** 144 bundles = 1,440 preguntas nuevas

| Grado | Mate | CN | Soc | Total | Estado |
|:-----:|:----:|:--:|:---:|:-----:|:------:|
| **6°** | 16 | 16 | 16 | 48 | ⬜ Pendiente |
| **7°** | 16 | 16 | 16 | 48 | ⬜ Pendiente |
| **8°** | 16 | 16 | 16 | 48 | ⬜ Pendiente |

**Estructura de archivos:**
```
src/content/questions/colombia/[asignatura]/grado-[N]/[tema]/
  CO-[SUBJ]-[N]-[tema]-001-v3-bundle.md
```


---

## 10. Plan de Expansión (Q1 2026): Meta 100/Materia

**Objetivo:** Alcanzar una cobertura mínima de **100 preguntas por materia y periodo** para todos los grados (3°-11°), asegurando la viabilidad del modo "Por Periodo" sin repetición de preguntas.

### Análisis de Brechas (Feb 14, 2026)

| Grado | Asignatura | P1 | P2 | P3 | P4 | Estado | Acción Requerida |
|-------|------------|----|----|----|----|--------|------------------|
| **3** | Inglés | 500| 0 | 0 | 0 | ⚠️ Mal distribuido | Redistribuir P1 -> P2, P3, P4 |
| **3** | Lectura/Tech | 0 | 0 | 0 | 0 | ❌ Crítico | Crear 400 preguntas (100/periodo) |
| **4-9** | Inglés | 0 | 0 | 0 | 0 | ❌ Crítico | Crear 2,400 preguntas (400/grado) |
| **4-9** | Math/CN/Soc | 40 | 40 | 40 | 40 | ⚠️ Insuficiente | Añadir +60 preguntas/periodo (+240/materia) |
| **10** | Inglés | 0 | 0 | 0 | 0 | ❌ Crítico | Crear 400 preguntas |
| **11** | TODAS | >100| >100| >100| >100| ✅ Óptimo | Mantenimiento |

### Estrategia de Ejecución

#### Paso 1: Redistribución y Limpieza (Inmediato)
*   **Grado 3 Inglés:** Mover preguntas de P1 a otros periodos basándose en temas (Vocabulary -> P1, Grammar -> P2, Reading -> P3/P4).
*   **Asignación de "Unknowns":** Clasificar las ~2,000 preguntas de Inglés que actualmente no tienen periodo asignado.

#### Paso 2: Generación Prioritaria (Inglés 4-10)
*   **Meta:** 400 preguntas por grado (2,800 total).
*   **Enfoque:** Uso de `Question Generator` con prompts ajustados por nivel CEFR (A1 para G4-5, A2 para G6-8, B1 para G9-10).

#### Paso 3: Relleno de Brechas (Math/CN/Soc 4-9)
*   **Meta:** +60 preguntas por periodo (GAP actual: 240 por materia/grado).
*   **Total a generar:** ~4,320 preguntas (6 grados * 3 materias * 240 preguntas).
*   **Método:** Automatización masiva por "Topic Folder" existente.

---

