# [Wave 12.02] feat(curriculum): Vistas de Recursos, Guías y Ayudas por País, Grado y Asignatura con roles Estudiante y Docente

## Summary
Diseñar e implementar la navegación estructurada por País > Grado > Asignatura en `/preguntas/[country]/[grade]/[subject]` que sirva como Hub de Aprendizaje Integral. Cada asignatura presentará un conmutador de perspectiva: **Modo Estudiante** (guías de estudio, conceptos evaluados, simulacros semanales focalizados y resolución colaborativa) y **Modo Docente** (matriz de competencias curriculares, taxonomía de distractores y generador de talleres para aula).

## Contexto Técnico & Archivos Objetivo
- `saberparatodos/src/pages/preguntas/[country]/[grade]/[subject]/index.astro`
- `saberparatodos/src/components/docentes/TeacherToolkit.svelte`
- `saberparatodos/src/config/authority-guidelines.ts`

## Criterios de Aceptación (AC)
1. **Selector de Rol**:
   - Pestaña **"🎓 Para Estudiantes"**: Muestra el mapa de conceptos, errores comunes frecuentes en esa asignatura y acceso directo a los bundles semanales de práctica.
   - Pestaña **"🧑‍🏫 Para Profesores"**: Muestra las competencias del examen (ej. en Colombia: Comunicación, Razonamiento, Resolución; en Argentina: NAP/Aprender; en México: SEP/EXANI), ponderación y botón de exportar taller imprimible.
2. **Navegación Breadcrumb Curricular**:
   - Breadcrumb navegable: `Inicio > [País] > Grado [N]° > [Asignatura]`.
3. **Respaldo Offline & Serverless**:
   - Funciona sin romper SSR en Cloudflare Pages.
4. **Verificación**:
   - `npm run test:unit -w saberparatodos` pasa al 100%.
   - `npm run lint -w saberparatodos` limpio.
