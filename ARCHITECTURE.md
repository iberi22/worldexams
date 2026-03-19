# Arquitectura de WorldExams - Monorepo

**Última actualización:** 2026-03-18
**Autoridad técnica:** [.gitcore/ARCHITECTURE.md](file:///.gitcore/ARCHITECTURE.md)

## Visión General

WorldExams es una plataforma de generación de exámenes y estudio potenciada por IA, diseñada específicamente para el contexto educativo de Colombia (Pruebas Saber 11) y con capacidad de escalado multi-país. El proyecto utiliza un modelo de **monorepo** para gestionar aplicaciones y servicios compartidos.

## Decisiones Críticas y Protocolo GitCore

Este repositorio sigue el protocolo **GitCore** para la gestión de proyectos y arquitectura:

1.  **Arquitectura Primero:** Las decisiones de infraestructura y diseño mandan sobre las notas de planificación.
2.  **Issue-First:** Todo trabajo nuevo debe estar representado por un GitHub Issue.
3.  **Commits Atómicos:** Un cambio lógico por commit, debidamente documentado.
4.  **Despliegue Manual:** Se utiliza la CLI de `wrangler` para despliegues a Cloudflare; no se usan GitHub Actions.
5.  **Privacidad:** El repositorio es privado/pre-launch por defecto.

## Topología del Monorepo

La estructura del proyecto está organizada para separar las responsabilidades de sitio organizacional y producto en ejecución:

-   **`apps/worldexams-site/`**: El sitio web principal, marketing, directorio de países y navegación institucional. No debe contener lógica de exámenes.
-   **`saberparatodos/`**: El runtime del producto de exámenes (actualmente implementación para Colombia). Esta es la base reutilizable para futuros lanzamientos por país.
-   **`apps/worldexams-api/`**: Gateway de API basado en Cloudflare Workers.
-   **`services/social-orchestrator/`**: Servicio independiente programado en Rust.

## Stack Tecnológico

-   **Frontend:** [Astro](https://astro.build/) + [Svelte](https://svelte.dev/)
-   **Backend:** Cloudflare Workers (Edge Functions)
-   **Base de Datos:** [Supabase](https://supabase.com/) (PostgreSQL + RLS)
-   **IA:** Google Gemini 2.0 Flash (vía API segura)
-   **Estilos:** TailwindCSS (Mobile-first, Premium Dark Mode)

## Roles y Operación (AGENTS.md)

Para los agentes y colaboradores IA, existen roles específicos definidos en [AGENTS.md](file:///AGENTS.md):

-   **🏗️ The Architect:** Decisiones de alto nivel, esquema de DB (RLS) y escalabilidad.
-   **🤖 The Generator:** Creación programática de contenido siguiendo el Protocolo v3.0 (Bundles).
-   **🎨 The Frontend Artist:** UI minimalista, accesible y de alta calidad visual.
-   **🛡️ The Guardian:** Seguridad, validación de tipos y protección de keys.
-   **🌐 The Translator:** Adaptación cultural y localización para nuevos países.

---

> [!NOTE]
> Para detalles técnicos profundos sobre el Event Bus, políticas de RLS específicas o la ruta de migración del monorepo, consulta el documento de autoridad en [.gitcore/ARCHITECTURE.md](file:///.gitcore/ARCHITECTURE.md).
