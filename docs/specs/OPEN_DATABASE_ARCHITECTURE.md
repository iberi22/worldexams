# Open Database Architecture

## 1. Visión General

World Exams está evolucionando hacia un ecosistema híbrido:
1. **El Repositorio Principal (Privado):** Contiene el código fuente de la plataforma (`saberparatodos`, `apps/landing-worldexams`), la lógica de SSR, autenticación y despliegue (Cloudflare Workers/Pages). Se mantiene privado por razones de seguridad, propiedad intelectual de la lógica y para proteger operaciones críticas.
2. **La Base de Datos de Preguntas (Pública):** Los bundles de preguntas, que actualmente residen en la carpeta `questions_data/`, se expondrán abiertamente en GitHub. Esto permite crear una comunidad colaborativa ("Open Source") donde estudiantes, docentes e instituciones pueden navegar, auditar, corregir y aportar explicaciones más complejas a las preguntas mediante Pull Requests.

## 2. Estrategia "Zero-Cost CDN" (GitHub Raw)

Para garantizar la gratuidad y el acceso libre de la base de datos de exámenes sin incurrir en costos de procesamiento (Data Transfer) para nuestro backend o base de datos en Supabase:

- Las preguntas existen en formato Markdown (MD) en el repositorio bajo `questions_data/`.
- Un paso de pre-compilación compila estos archivos en índices estructurados JSON.
- **Ruta de compilación:** `.worldexams/open-db/` (y sincronizado con el repo público de preguntas de WorldExams).
- La UI del explorador de la base de datos solicita estos JSONs de solo lectura directamente desde `raw.githubusercontent.com`. Beneficio inmediato de una CDN global.

## 3. Pipeline de Datos (`build-open-db.ts`)

- Ubicación: `saberparatodos/scripts/build-open-db.ts`
- El script recorre todo `questions_data/` y procesa el frontmatter (`gray-matter`).
- Mapea de la estructura: `[country]/[subject]/[grade]/bundle.md`
- Genera un archivo índice `index.json` que registra a nivel global la cantidad de documentos disponibles por país, asignatura y grado.
- Estos archivos JSON son luego expuestos sobre un repositorio público GitHub para ser llamados como APIs Rest estáticas sin servidor.

## 4. UI: El Explorador Open DB (`/explorar`)

La ruta `/explorar` en `saberparatodos` actúa como un Dashboard Front-End para esta base de datos.
- Se integra con la capa "Multi-Tenant" de Astru (`Astro.locals.country`).
- Muestra progresivamente a los visitantes cuántas preguntas públicas hay para su región y los invita a contribuir en GitHub para mejorar explicaciones o reportar fallas.
- La aplicación hace fetch hacia `https://raw.githubusercontent.com/world-exams/worldexams/main/.worldexams/open-db/` minimizando el tráfico de Cloudflare y usando fetch en el cliente/servidor directamente a GitHub.

## 5. Migración Operativa (Roadmap Inmediato)

1. Seguir generando contenido y validándolo (bajo los protocolos actuales v3.0, v4.0 y v5.0). Todo el output se escribe dentro del repo de preguntas (que transicionará a público).
2. Cada PR/Push o iteración de nuevas preguntas correrá (manual o en pipeline) `npm run build:open-db` para mantener actulizado el ecosistema JSON.
3. El código del portal siempre se consumirá localmente a nivel de componente interactivos, pero la página estática `/explorar` conecta directo a GitHub RAW.
