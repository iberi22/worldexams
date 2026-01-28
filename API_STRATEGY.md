# 🏗️ API Strategy & Architecture - World Exams

> Estrategia técnica para la implementación de la API pública monetizable ("World Exams Open API").

## 1. Visión del Producto API

Transformar el repositorio de preguntas estáticas en una **API dinámica y administrada** que permita a desarrolladores, otras plataformas educativas e investigadores acceder al banco de preguntas de forma estructurada.

**Propuesta de Valor:** "Thestripe for Standardized Exams". Una sola API para acceder a preguntas tipo ICFES, SAT, ENEM, etc.

## 2. Niveles de Acceso (Tiers)

| Característica | 🌱 Free / Developer | 🚀 Pro / Startup | 🏢 Enterprise / Institution |
| :--- | :--- | :--- | :--- |
| **Audiencia** | Estudiantes, Proyectos Personales | Pequeñas Apps, Academias | Colegios, Gobiernos, Grandes EdTech |
| **Precio** | **Gratis** | **$29 - $99 / mes** | **Custom Pricing** |
| **Rate Limit** | 100 req / día | 10,000 req / día | Ilimitado |
| **Licencia Data** | CC BY-NC-SA (No Comercial) | **Licencia Comercial Incluida** | Licencia Comercial + White Label |
| **SLA** | Best Effort | 99.5% Uptime | 99.9% Uptime |
| **Caché** | Standard | Edge Cache Prioritario | Edge Cache Dedicado |

## 3. Arquitectura Técnica API

Usaremos **Cloudflare Workers** como API Gateway por encima de **Supabase**.

```mermaid
graph TD
    User[Developer / App] -->|API Key| CF[Cloudflare Worker Gateway]
    CF -->|Auth & Rate Limit| KV[Cloudflare KV (Limits)]
    CF -->|Cache Hit?| Cache[Cloudflare Cache]
    CF -->|Cache Miss| SB[Supabase DB (Questions)]

    subgraph "Monetization & Control"
        CF -->|Async Log| STR[Usage Tracking (Stripe/DB)]
    end
```

### Componentes Clave

1.  **API Gateway (Cloudflare Worker):**
    *   Endpoint: `https://api.worldexams.org/v1/questions`
    *   Valida `x-api-key` header.
    *   Maneja **Rate Limiting** usando Cloudflare Rate Limiting o KV.
    *   Maneja **CORS** estrictos para planes gratuitos.

2.  **Gestión de Claves (Supabase):**
    *   Tabla `api_keys` con columnas `tier`, `monthly_limit`, `current_usage`, `is_active`.
    *   El usuario genera su key en el dashboard de developer (`developer.worldexams.org`).

3.  **Endpoints Principales:**

    *   `GET /questions/random?country=CO&subject=math&limit=10`
        *   Obtiene preguntas aleatorias filtradas.
    *   `GET /questions/{id}`
        *   Obtiene detalle de una pregunta.
    *   `GET /subjects`
        *   Lista taxonomía disponible.

## 4. Estrategia de Viabilidad "Public Core"

¿Es viable dejar el proyecto público? **SÍ.**

1.  **El Código (PolyForm Shield):** Es público para transparencia y colaboración, pero legalmente blindado contra clones comerciales.
2.  **Los Datos (CC BY-NC-SA):** Son públicos para el bien común, pero requieren pago (vía API Pro) para uso comercial.
3.  **Valor Agregado (The Moat):**
    *   **Tu API es conveniente:** Nadie quiere parsear miles de markdowns manualmente y mantenerlos actualizados. Pagar por la API es más barato que mantener un scraper.
    *   **Dashboard Institucional:** El valor real para los colegios no son solo las preguntas, sino las *métricas*, el *control de grupos* y la *interfaz de examen*. Eso es lo que vendes.

## 5. Próximos Pasos (Implementation Roadmap)

1.  **Diseño DB:** Crear tabla `organizations` y `api_keys` en Supabase.
2.  **Portal Developer:** Crear una sección en la web `/developers` para generar API Keys gratuitas.
3.  **Deploy Gateway:** Configurar el primer Cloudflare Worker que sirva preguntas desde Supabase.
4.  **Stripe/LemonSqueezy:** Integrar pasarela de pago para el upgrade a Pro.

---
**Conclusión:**
Este modelo es altamente escalable. Permite que la comunidad "mantenga" los datos (Open Source contribution) mientras tú monetizas la "conveniencia" (API) y la "inteligencia" (Dashboard Institucional).
