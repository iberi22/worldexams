# SaberParaTodos 🇨🇴

**Plataforma de práctica para exámenes ICFES de Colombia**

Una aplicación web moderna para practicar las pruebas Saber (ICFES) de Colombia, con soporte para todos los grados (3°, 5°, 7°, 9° y 11°) y todas las asignaturas evaluadas.

## ✨ Características

- 📚 **Banco de Preguntas**: Miles de preguntas tipo ICFES organizadas por grado y materia
- 🧮 **Soporte LaTeX**: Renderizado de fórmulas matemáticas con KaTeX
- 🧠 **Sistema de Memoria**: Evita repetición de preguntas ya contestadas
- 🏆 **Leaderboard**: Tabla de posiciones para competir con otros estudiantes
- 🔐 **Autenticación**: Login con Supabase (Google, GitHub, Email)
- 📈 **Puntuación Avanzada**: Sistema de scoring que considera tiempo, dificultad y rachas
- 🌐 **API Externa**: Consume preguntas desde el API de WorldExams

## 🚀 Despliegue en Cloudflare Pages

### Opción 1: GitHub Integration (Recomendado)

1. Sube este repositorio a GitHub
2. Ve a [Cloudflare Pages](https://dash.cloudflare.com/pages)
3. Conecta tu repositorio
4. Configura:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `.` (o la ruta a saberparatodos si es subdirectorio)
5. Agrega las variables de entorno:
   - `PUBLIC_API_BASE_URL`: `https://worldexams.pages.dev/api/v1`
   - `PUBLIC_SUPABASE_URL`: Tu URL de Supabase
   - `PUBLIC_SUPABASE_ANON_KEY`: Tu clave anónima de Supabase

### Opción 2: Wrangler CLI

```bash
# Instalar wrangler
npm install -g wrangler

# Login a Cloudflare
wrangler login

# Construir el proyecto
npm run build

# Desplegar
wrangler pages deploy dist --project-name saberparatodos
```

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
```

## ⚙️ Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
# API de preguntas (WorldExams)
PUBLIC_API_BASE_URL=https://worldexams.pages.dev/api/v1

# Supabase (para auth y leaderboard)
PUBLIC_SUPABASE_URL=your-supabase-url
PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

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

- **Astro** - Framework web
- **Svelte** - Componentes reactivos
- **TailwindCSS** - Estilos
- **KaTeX** - Renderizado de fórmulas matemáticas
- **Supabase** - Backend as a Service (auth, base de datos)

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir cambios mayores.

---

Hecho con ❤️ para los estudiantes de Colombia 🇨🇴
