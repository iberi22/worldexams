# Contribuyendo a WorldExamns / SaberParaTodos

¡Gracias por tu interés en contribuir a WorldExamns! Este documento describe cómo participar en el desarrollo de la plataforma educativa multi-país.

---

## 📋 Índice

- [Código de Conducta](#código-de-conducta)
- [¿Cómo Contribuir?](#cómo-contribuir)
- [Reportar Issues](#reportar-issues)
- [Contribuir con Bundles (Preguntas)](#contribuir-con-bundles-preguntas)
- [Contribuir con Código](#contribuir-con-código)
- [Guía de Desarrollo](#guía-de-desarrollo)
- [Proceso de PR](#proceso-de-pr)
- [Estándares de Calidad](#estándares-de-calidad)

---

## 🤝 Código de Conducta

- Sé respetuoso y constructivo
- Enfócate en el problema, no en la persona
- Las contribuciones son bienvenidas independientemente de experiencia o background
- Este es un proyecto educativo con impacto en estudiantes latinoamericanos

---

## 🎯 ¿Cómo Contribuir?

### Formas de contribuir:

1. **Reportar erratas pedagógicas** — Reporta directamente desde la app en el botón de corrección de la pregunta (`/api/corrections`).
2. **Soporte técnico y dudas comunitarias** — A través de la red de soporte de **Maloca Support** (`app_id="worldexams"`).
3. **Crear bundles** — Generar preguntas para países soportados (¡la contribución más valiosa!).
4. **Revisar bundles** — Ayudar con control de calidad y revisión pedagógica de preguntas existentes.
5. **Escribir código** — Frontend, API Gateway, adaptadores SSR, scripts de validación, tests.
6. **Mejorar documentación** — Correcciones, especificaciones, ejemplos de despliegue.

---

## 🐛 Reportar Issues y Soporte Comunitario (Maloca)

Para mantener una atención organizada y contextualizada:

* **Para errores en preguntas específicas:** Usa el reporte directo in-app en la interfaz de práctica. La corrección se asocia de forma atómica al ID de la pregunta y pasa al flujo de revisión editorial.
* **Para soporte técnico, arquitectura o colaboración:** Participa en la red **Maloca** o consulta el panel administrativo [`/admin/maloca`](file:///home/belal/proyectosSWAL/apps/worldexams/saberparatodos/src/pages/admin/maloca.astro) con `@swal/maloca-embed`.
* **Para contribuciones de código en GitHub:** Usa las plantillas de GitHub Issues configuradas en el repositorio.

---

## 📚 Contribuir con Bundles (Preguntas)

Esta es la forma más importante de contribuir. WorldExamns vive de su contenido educativo.

### Requisitos para Contribuir Bundles

1. **Lee el protocolo:** `AGENTS.md` — especificación completa v5.2
2. **Lee las reglas del país:** `skills/bundle-creator/rules/{COUNTRY_CODE}.md`
3. **Sigue el formato exacto** descrito en `RULES.md`
4. **Valida** con `npm run validate` antes de enviar

### Flujo para Contribuir Bundles

```
1. Fork del repositorio
2. Crea una rama: content/{pais}-{materia}-{grado}-semana-{W}
3. Genera los bundles en la ruta canónica
4. Valida: npm run validate
5. Commit: feat(contenido): {descripción}
6. PR con descripción detallada
```

### Checklist para PRs de Bundles

- [ ] Los bundles están en la ruta canónica (`questions_data/{country}/{subject}/grado-{N}/2026/weekly/`)
- [ ] El naming sigue exactamente el formato `{COUNTRY}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md`
- [ ] El frontmatter YAML es válido y completo
- [ ] La cantidad de preguntas coincide con el grado (8, 10, 12 o 20)
- [ ] Las preguntas tienen dificultad progresiva
- [ ] Exactamente 4 opciones por pregunta con 1 `[x]`
- [ ] Todas las opciones tienen feedback
- [ ] Todas las preguntas tienen `Explicacion Pedagogica`
- [ ] No hay AI leakage ni artefactos de generación
- [ ] El contexto está adaptado al país destino
- [ ] `npm run validate` pasa sin errores
- [ ] El PR solo contiene cambios de contenido

---

## 💻 Contribuir con Código

### Requisitos Técnicos

- Node.js 20+
- npm o pnpm
- Conocimientos de TypeScript
- Familiaridad con Astro, Svelte o Cloudflare Workers (según el área)

### Configuración Local

```bash
# Clonar repositorio
git clone https://github.com/iberi22/worldexams.git
cd worldexams

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con valores reales

# Iniciar desarrollo
npm run dev
```

### Áreas de Código

| Área | Tecnología | Ubicación |
|------|-----------|-----------|
| Frontend (sitio global) | Astro + Svelte | `apps/landing-worldexams/` |
| App de exámenes | Astro + Svelte | `saberparatodos/` |
| API Gateway | Cloudflare Workers | `apps/worldexams-api/` |
| Base de datos | Supabase (PostgreSQL) | `supabase/` |
| Automatización | Rust | `services/social-orchestrator/` |
| Scripts | Node.js / TypeScript | `scripts/` |

---

## 🔄 Proceso de PR

### Pull Requests

1. **Ramas:**
   - `content/*` — para bundles y preguntas
   - `feat/*` — para nuevas funcionalidades
   - `fix/*` — para correcciones
   - `docs/*` — para documentación

2. **Título:** `tipo(alcance): descripción breve`
   - `feat(content): agregar bundles MX matemáticas G6 W01-W10`
   - `fix(api): corregir rate limiting en GET questions`
   - `docs(protocol): actualizar especificación v5.2`

3. **Descripción:** Incluir qué, por qué y cómo. Referenciar issues (#N).

4. **Rebase:** Mantener historia limpia. Hacer rebase contra `main` antes del merge.

5. **Revisión:** Mínimo 1 aprobación de un mantenedor.

### CI/CD

Todos los PRs pasan por:
- ✅ `npm run validate` (bundles)
- ✅ `npm run lint` (código)
- ✅ `npm run test:e2e` (tests E2E)
- ✅ GitHub Actions

Si algún check falla, el PR no se mergea.

---

## 📏 Estándares de Calidad

### Código
- TypeScript strict mode
- ESLint + Prettier
- Tests para código nuevo
- Comentarios en español o inglés (consistente por archivo)

### Bundles
- Validación estricta v5.2
- Sin errores de validación
- Contexto regional preciso
- Dificultad progresiva
- Sin alucinaciones

### Documentación
- En español (principal) o inglés (técnico)
- Actualizada con cada cambio relevante
- Clara y concisa

---

## ❓ Preguntas Frecuentes

**Q: ¿Puedo contribuir si no soy programador?**
A: ¡Sí! Las contribuciones de contenido (bundles) son las más valiosas. Necesitamos expertos en educación de cada país.

**Q: ¿Cómo sé qué temas generar?**
A: Revisa `TASK.md` para ver las prioridades actuales. También puedes consultar `questions_data/` para ver qué falta.

**Q: ¿Hay compensación económica?**
A: Actualmente el proyecto es pre-launch y las contribuciones son voluntarias. A largo plazo planeamos un programa de contribución.

**Q: ¿Puedo usar mis preguntas en otros proyectos?**
A: El contenido de WorldExamns se publica bajo licencia MIT. Puedes usarlo libremente.

**Q: ¿Cómo contacto al equipo?**
A: Abre un issue en GitHub o contacta a BELA (@iberi22) en Telegram.

---

## 📬 Contacto

- **Propietario:** BELA (Brahyan Belalcazar) — @iberi22
- **Producto:** https://saberparatodos.space
- **Issues:** GitHub Issues del repositorio
- **Discord:** Próximamente

---

*¡Gracias por hacer que la educación en Latinoamérica sea más accesible!*
