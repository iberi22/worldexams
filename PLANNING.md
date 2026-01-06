# PLANNING.md -

## 1. Visión del Proyecto

Crear la plataforma de preparación para pruebas de estado (Saber 3° a 11°) más accesible, transparente y eficiente de Colombia.
**Filosofía:** Plataforma Híbrida (Astro + Supabase)".
**Sostenibilidad:** Freemium (Ads) + Donaciones.

## 2. Arquitectura Técnica (The Hybrid Stack)

* **Frontend:** Astro 5 (Static Site Generation + Server Islands).
* **Estilos:** TailwindCSS.
* **Contenido (Preguntas):** Archivos Markdown (`src/content/questions/`) gestionados vía Git.
* **Backend (BaaS):** Supabase.
  * **Auth:** Email/Password + OAuth (Google/GitHub).
  * **Database:** PostgreSQL.
  * **Logic:** Supabase Edge Functions (Deno/TypeScript) para procesar puntajes y actualizar leaderboards.

## 3. Estructura de Datos (Supabase Schema)

* `profiles`: (id, nickname, avatar_url, grade_level, is_premium).
* `exam_sessions`: (id, user_id, score, duration, completed_at, json_answers).
* `feedback`: (id, question_id, user_id, comment, status).
* `leaderboard_cache`: Tabla materializada para lecturas rápidas sin computar todo el tiempo.

## 4. Estrategia de Monetización

1. **Nivel Gratuito:** Acceso a todos los simulacros + Publicidad en la pantalla de resultados.
2. **Nivel Donante/Premium:** Sin publicidad + Badge "Supporter" en el Leaderboard + Acceso a estadísticas avanzadas (progreso histórico).

## 5. Roadmap

* **Fase 1:** Setup de Astro y renderizado de Markdown.
* **Fase 2:** Integración Supabase Auth y RLS.
* **Fase 3:** Lógica de examen y Edge Function `submit-exam`.
* **Fase 4:** Leaderboard público y sistema de Feedback.
* **Fase 5:** Integración de Ads y Pasarela de donación.

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

- **Protocolo:** `docs/ENGLISH_LEARNING_PROTOCOL.md`
- **Ubicación Central:** `src/content/questions/ingles/`
- **Formato:** Protocol v3.0-GLOBAL

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
