Tarea WX-305 — Rutas jerárquicas /preguntas/ con SEO (issue #1023)

REPO: /home/belal/proyectosSWAL/apps/worldexams (worktree wx/ola3-305)
LEE: AGENTS.md + src/pages/** (patrón de páginas astro existentes).

ISLA (SOLO): src/pages/preguntas/**

CONTEXTO (issue #1023): rutas jerárquicas /preguntas/{country}/{subject}/{week} para que motores de búsqueda indexen por país/asignatura/tema. Cada ruta renderiza un listado de bundles filtrado (via generateStaticPaths de Astro) con metadata SEO completa (title, description, canonical, open-graph).

PASOS:
1. src/pages/preguntas/index.astro: Listado principal de países disponibles. Genera links estáticos por país (/preguntas/colombia, /preguntas/mexico, etc.). SEO: title "Preguntas por País — WorldExams", meta description.
2. src/pages/preguntas/[country]/index.astro: Listado de asignaturas por país (generateStaticParams: coastores, extracto de questions_data/{country}/** para descubrir asignaturas). Links a /preguntas/{country}/{subject}.
3. src/pages/preguntas/[country]/[subject]/index.astro: Listado de semanas/bundles por asignatura (generateStaticParams desde questions_data/{country}/{subject}/**). Cada bundle listado con titulo, semana, jumlah preguntas, dificultad. Links individuales a detalle del bundle (si existe página de detalle; sino, anchor al contenido estático).
4. Metadata SEO en cada nivel: <head> con title, og:title, og:description, canonical, JSON-LD (BreadcrumbsList schema.org con la jerarquía). i18n simple: lang attribute según país (colombia→es-CO, mexico→es-MX, brasil→pt-BR).
5. NO tocar questions_data/ ni src/components/ existentes.

CIERRE:
- git add src/pages/preguntas
- git commit -m "feat(seo): rutas jerárquicas /preguntas/{country}/{subject} con SEO breadcrumbs y metadata (#305)"
