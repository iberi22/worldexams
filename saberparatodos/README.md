# 🔒 SaberParaTodos - Backend Privado 🇨🇴

> **⚠️ REPOSITORIO PRIVADO** - Backend con API, preguntas, y configuración sensible

**Plataforma de práctica para exámenes ICFES de Colombia**

Este es el repositorio privado del backend de Saber Para Todos, parte de la organización [World Exams](https://github.com/world-exams).

**Frontend público:** [world-exams/saber-co](https://github.com/world-exams/saber-co)

## ✨ Características

- 📚 **Banco de Preguntas**: Miles de preguntas tipo ICFES organizadas por grado y materia
- 🧮 **Soporte LaTeX**: Renderizado de fórmulas matemáticas con KaTeX
- 🧠 **Sistema de Memoria**: Evita repetición de preguntas ya contestadas
- 🏆 **Leaderboard**: Tabla de posiciones para competir con otros estudiantes
- 🔐 **Autenticación**: Login con Supabase (Google, GitHub, Email)
- 📈 **Puntuación Avanzada**: Sistema de scoring que considera tiempo, dificultad y rachas
- 🌐 **API Externa**: Consume preguntas desde el API de WorldExams

## 🚀 Despliegue en Cloudflare Pages (Manual CLI)

Este proyecto se despliega manualmente por CLI. No usamos GitHub Actions para production deploy.

### Flujo estándar

```bash
# Instalar wrangler
npm install -g wrangler

# Login a Cloudflare
wrangler login

# Sincronizar API estática
npm run sync:api

# Validar contenido (v3 estricto)
npm run validate:strict

# Build
npm run build

# Deploy manual (incluye verify)
npm run deploy:manual
```

Referencia completa: `PROTOCOLO_DEPLOY_CLI.md`.

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de la build
npm run preview

# Testing E2E
npm run test              # Modo headless
npm run test:ui           # Modo visual (Playwright UI)
npm run test:headed       # Modo headed (ver navegador)
npm run test:party        # Solo tests de Party Mode

# Deploys manuales
npm run sync:api
npm run deploy:manual
npm run deploy:fast
npm run verify:deploy
```

## ⚙️ Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
# API de preguntas (WorldExams)
PUBLIC_API_BASE_URL=https://worldexams.pages.dev/api/v1

# Supabase (para auth y leaderboard)
PUBLIC_SUPABASE_URL=your-supabase-url
PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Sentry (opcional - solo producción)
PUBLIC_SENTRY_DSN=your-sentry-dsn

# Environment
NODE_ENV=development
```

### Seguridad de variables

- Frontend: solo variables `PUBLIC_*`.
- Backend/secretos: nunca exponer `SUPABASE_SERVICE_ROLE_KEY` en cliente.

## 📡 Consumo del API

Las preguntas se consumen desde el API de WorldExams:

```
GET /api/v1/CO/icfes/{grade}/{subject}/index.json
GET /api/v1/CO/icfes/{grade}/{subject}/{page}.json
```

### Estructura de respuesta

```json
{
  "questions": [
    {
      "id": "CO-MAT-11-ALG-001-v1",
      "statement": "Si $2x + 5 = 17$, ¿cuál es el valor de $x$?",
      "options": [
        { "letter": "A", "text": "4", "is_correct": false },
        { "letter": "B", "text": "6", "is_correct": true },
        { "letter": "C", "text": "8", "is_correct": false },
        { "letter": "D", "text": "11", "is_correct": false }
      ],
      "correct_answer": "B",
      "explanation": "**Respuesta Correcta: B**\n...",
      "difficulty": "Medium"
    }
  ]
}
```

## 🎨 Tecnologías

- **Astro 5.16.0** - Framework web SSG
- **Svelte 5.44.1** - Componentes reactivos
- **TailwindCSS 3.x** - Estilos utility-first
- **KaTeX** - Renderizado de fórmulas matemáticas
- **Supabase** - Backend as a Service (auth, base de datos, realtime)
- **Playwright 1.57.0** - Testing E2E
- **Sentry 8.40.0** - Error tracking y performance monitoring
- **Cloudflare Pages** - Hosting y deployment

## 🧪 Testing

### Tests E2E con Playwright

Tests completos de Party Mode con 4 estudiantes simulados:

```bash
# Ejecutar tests con script automatizado (recomendado)
.\scripts\run-e2e-tests.ps1 -Headed

# O directamente con npm
npm run test:party
```

Gate mínimo recomendado antes de release:

```bash
npm run validate:strict
npm run lint
npm run build
npx playwright test tests/e2e-smoke-tag.spec.ts
npx playwright test tests/auth-leaderboard-smoke.spec.ts
```

### Monitoring con Sentry

Integración completa de Sentry para producción:

- Error tracking con source maps
- Performance monitoring (tracing + replay)
- Filtrado automático de errores conocidos (WebSocket)
- Tags personalizados por país (country:CO)

**Setup:** Ver `docs/SENTRY_SETUP.md` para configuración completa.

## 📄 Licencia

### Código Fuente
El código fuente (TypeScript, Svelte, Astro) está bajo **MIT License**.

### Contenido Educativo
Las preguntas tienen licencias duales según variante:

| Variante | Licencia | Uso Comercial |
|----------|----------|---------------|
| v1 (original) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | ✅ Permitido |
| v2-v7 (derivadas) | [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) | ❌ No permitido |

**Nota importante:** Las fuentes originales (OpenTDB, OpenTrivia) usan CC BY-SA 4.0, permitiendo uso comercial. Las variantes pedagógicas (v2-v7) tienen licencia más restrictiva (BY-NC-SA 4.0) para proteger el esfuerzo educativo.

**Para más detalles:** Ver [LICENSE.md](../LICENSE.md)

### Atribución Requerida

Si usas estas preguntas, debes dar crédito apropiado:

```markdown
Preguntas adaptadas de SaberParaTodos (https://github.com/world-exams/saberparatodos)
Fuente original: OpenTDB (CC BY-SA 4.0)
Licencia: CC BY-NC-SA 4.0
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir cambios mayores.

---

Hecho con ❤️ para los estudiantes de Colombia 🇨🇴
