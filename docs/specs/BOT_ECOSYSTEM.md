# 🤖 Ecosistema de Bots (Telegram & Discord)

> **Visión:** Extender la plataforma World Exams a las aplicaciones de mensajería más populares, ofreciendo acceso rápido, económico y omnipresente a la práctica de exámenes.

---

## 🎯 Objetivos

1.  **Acceso Universal:** Permitir estudiar desde Telegram/Discord sin abrir el navegador.
2.  **Costo Mínimo:** Ser la opción más barata del mercado para práctica de exámenes.
3.  **Soporte Automatizado:** Chatbot IA para atención al cliente y reporte de bugs.
4.  **Engagement:** Notificaciones push, "Pregunta del Día", y rachas.

---

## 🏗️ Arquitectura

### Stack Tecnológico
-   **Framework:** `grammy` (Telegram) / `discord.js` (Discord)
-   **Runtime:** Cloudflare Workers (Serverless)
-   **Database:** Supabase (Compartida con la web)
-   **AI:** Gemini Flash (Rápido y económico)

### Flujo de Autenticación
1.  Usuario en Web (`/dashboard`) genera un "Link de Vinculación".
2.  Usuario hace clic y abre el Bot.
3.  Bot recibe token y vincula `telegram_id` o `discord_id` al `user_id` en Supabase.

---

## 💡 Funcionalidades

### 1. Modo Práctica (Bot)
-   **Comando:** `/practicar [asignatura]`
-   **Flujo:**
    1.  Bot envía pregunta (imagen/texto).
    2.  Usuario responde con botones (A, B, C, D).
    3.  **Feedback Inmediato:** ✅ Correcto / ❌ Incorrecto.
    4.  **Explicación:** Breve justificación (IA).
-   **Costo:**
    -   **Free:** 5 preguntas diarias.
    -   **Pro:** Ilimitado.
    -   **Créditos:** 1 crédito por pregunta extra (muy barato).

### 2. Soporte & Reportes (AI Triage)
-   **Comando:** `/soporte [mensaje]` o DM directo.
-   **IA Agent:**
    -   Clasifica el mensaje: Bug, Reclamo, Duda Académica, Billing.
    -   **Respuesta Automática:** Intenta resolver dudas frecuentes (FAQ).
    -   **Escalamiento:** Si es complejo, crea ticket en sistema interno para humanos.
    -   **Prioridad:** Usuarios Pro tienen prioridad en la cola.

### 3. Notificaciones
-   📅 **Pregunta del Día:** Push diario gratuito.
-   📉 **Alertas de Rendimiento:** "Llevas 3 días sin practicar".
-   📢 **Novedades:** Nuevos simulacros disponibles.

---

## 💰 Modelo de Negocio (Low-Cost)

**Filosofía:** "El sitio más barato para estudiar".

### Créditos (Micro-pagos)
-   **Paquete Básico:** 1,000 créditos por $1 USD (aprox).
-   **Uso:**
    -   1 Pregunta = 1 Crédito.
    -   1 Explicación IA detallada = 5 Créditos.

### Suscripción Pro (Estudiantes)
-   **Precio:** ~$2-3 USD/mes (ajustado por PPP del país).
-   **Beneficios:**
    -   Preguntas ilimitadas en Bot y Web.
    -   Sin publicidad.
    -   Soporte prioritario.
    -   Acceso a "Salas de Entrenamiento" (Web).

### Suscripción Pro (Profesores)
-   **Precio:** ~$5-9 USD/mes.
-   **Beneficios:**
    -   Todo lo de Estudiante.
    -   **Generación de Guías:** PDF con ejercicios y teoría (IA).
    -   **Planes de Mejora:** Reportes grupales para su clase.
    -   **Informes Detallados:** Análisis de brechas de aprendizaje de sus alumnos.

---

## 🛠️ Roadmap de Implementación

1.  **Fase 1: Telegram Bot MVP**
    -   Vinculación de cuenta.
    -   Responder preguntas (Base de datos existente).
    -   Feedback básico.
2.  **Fase 2: Sistema de Créditos**
    -   Integración pasarela de pagos (Web) para recarga.
    -   Consumo de créditos en Bot.
3.  **Fase 3: Soporte IA**
    -   Integración Gemini para chat de soporte.
4.  **Fase 4: Discord Bot**
    -   Replicar funcionalidades en Discord.
