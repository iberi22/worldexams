# 🤖 GitHub Copilot Instructions - World Exams Organization

> Instrucciones globales para todos los repositorios de la organización World Exams.
>
> **IMPORTANTE:** Antes de comenzar cualquier tarea, lee `PLANNING.md` y `TASK.md` para entender la arquitectura y el estado actual del proyecto.

---

## 🔄 Project Awareness & Context

### **SIEMPRE al iniciar una conversación:**
1. **Lee `PLANNING.md`** para entender arquitectura, stack tecnológico, y restricciones
2. **Lee `TASK.md`** para ver tareas pendientes, en progreso, y completadas
3. **Verifica el país del repo actual** (código de país en `config/country.ts`)
4. **Usa consistencia con la arquitectura global** descrita en estos documentos

### **Antes de implementar una tarea:**
- Verifica que la tarea esté en `TASK.md`. Si no está, agrégala con descripción y fecha
- Marca la tarea como "⚙️ En Progreso" antes de comenzar
- Al terminar, marca como "✅ Completado" inmediatamente

---

## 📋 Resumen del Proyecto

**World Exams** es una organización de código abierto que desarrolla plataformas de práctica para exámenes nacionales estandarizados. Arquitectura multi-repo con plataformas independientes por país.

### Arquitectura Multi-Repo

- **Raíz:** Organización global con múltiples plataformas
- **saberparatodos/:** Plataforma principal (Colombia Saber 11)
- **[otros-exams]/:** Cada examen en su propia carpeta
- **src/content/questions/:** Preguntas centralizadas compartidas entre plataformas
- **Deployment:** Cloudflare Pages + Workers (cada plataforma independiente)

### Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Astro** | 5.x | Framework principal (Static Site Generator) |
| **Svelte** | 5.x | Componentes interactivos (Islands) |
| **TailwindCSS** | 3.x | Estilos utility-first, mobile-first, dark mode |
| **Supabase** | Latest | BaaS (PostgreSQL, Auth, Realtime, Edge Functions) |
| **TypeScript** | 5.x | Tipado estricto en todo el proyecto |
| **Cloudflare Pages** | - | Hosting principal (Workers, Edge Runtime) |
| **Wrangler CLI** | Latest | Deploy manual (NO GitHub Actions) |

### 🚨 IMPORTANTE: Deploy Manual Obligatorio

**El proyecto es PRIVADO y NO usa GitHub Actions para evitar consumo de créditos.**

- ✅ **SIEMPRE** usar `wrangler` CLI para deploy
- ❌ **NUNCA** crear workflows de GitHub Actions
- 📖 **Protocolo completo:** Ver `PROTOCOLO_DEPLOY_CLI.md` en raíz

### Repositorios Principales (Top 20 Países)

| Repo | País | Código | Estado |
|------|------|--------|--------|
| `saber-co` | 🇨🇴 Colombia | CO | ✅ Template Base |
| `exani-mx` | 🇲🇽 México | MX | ✅ Completo |
| `enem-br` | 🇧🇷 Brasil | BR | ✅ Completo |
| `sat-us` | 🇺🇸 USA | US | ✅ Completo |
| `gaokao-zh` | 🇨🇳 China | CN | ✅ Completo |
| `jee-in` | 🇮🇳 India | IN | ✅ Completo |
| `ingreso-ar` | 🇦🇷 Argentina | AR | 🔄 Base |
| `paes-cl` | 🇨🇱 Chile | CL | 🔄 Base |
| `admision-pe` | 🇵🇪 Peru | PE | 🔄 Base |
| `question-sync` | Sincronización | - | ⬜ Pendiente |
| `.github` | Templates org | - | ✅ Completo |

---

## 📁 Estructura Multi-Repo

La organización tiene una estructura multi-repo donde cada examen es una carpeta independiente:

```text
worldexams/
├── .github/
│   ├── copilot-instructions.md    # Instrucciones globales (este archivo)
│   ├── workflows/                 # CI/CD global
│   └── prompts/                   # Prompts compartidos
├── AGENTS.md                      # Roles AI globales
├── docs/
│   └── QUESTION_GENERATION_PROTOCOL_V2.md  # Protocol v2.0
├── src/
│   └── content/
│       └── questions/             # ⭐ PREGUNTAS CENTRALIZADAS
│           ├── _shared/           # Cross-country
│           ├── colombia/          # Por país
│           │   ├── matematicas/grado-11/algebra/
│           │   ├── ciencias-naturales/grado-11/
│           │   └── sociales/grado-11/
│           ├── mexico/
│           ├── brasil/
│           └── usa/
├── saberparatodos/                # ⭐ PLATAFORMA PRINCIPAL (Colombia)
│   ├── astro.config.mjs
│   ├── wrangler.toml              # Cloudflare Workers config
│   ├── src/
│   │   ├── content/
│   │   │   └── questions/     # ⭐ PREGUNTAS (Localizadas por plataforma)
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── styles/
│   ├── public/
│   ├── config/
│   │   └── country.ts             # CO config
│   └── package.json
├── [otros-exams]/                 # Otras plataformas
│   └── [misma estructura que saberparatodos/]
└── scripts/                       # Scripts globales
```

**Nota:** Las preguntas están centralizadas en `src/content/questions/` y son compartidas entre todas las plataformas.

---

## 🧱 Code Structure & Modularity

### Reglas de Arquitectura

- **Nunca crear un archivo mayor a 800 líneas de código.** Si un archivo se acerca a este límite, refactorizar dividiéndolo en módulos o archivos auxiliares.
- **Organizar código en módulos claramente separados**, agrupados por feature o responsabilidad.
- **Usar imports claros y consistentes** (preferir imports relativos dentro de packages).
- **Mantener componentes pequeños y reutilizables** (máximo 300 líneas por componente Svelte).

### Estructura de Componentes Svelte

```typescript
<script lang="ts">
  // 1. Imports
  import type { ComponentType } from './types';

  // 2. Props con tipos
  interface Props {
    title: string;
    data: DataType[];
  }

  let { title, data }: Props = $props();

  // 3. State (Svelte 5 runes)
  let count = $state(0);
  let computed = $derived(count * 2);

  // 4. Funciones
  function handleClick() {
    count++;
  }
</script>

<!-- 5. Template -->
<div class="container">
  <h1>{title}</h1>
  <!-- Usar TailwindCSS utility classes -->
</div>

<style>
  /* Solo si es necesario CSS custom */
</style>
```

---

## 🚫 Reglas Críticas

### 1. NO crear archivos en la raíz

**PROHIBIDO** crear nuevos archivos en la raíz del repositorio.

**Excepciones permitidas:**
- `README.md`, `AGENTS.md`, `PLANNING.md`, `TASK.md`, `LICENSE`
- `package.json`, `tsconfig.json`, `astro.config.mjs`, `tailwind.config.mjs`
- `.gitignore`, `.env.example`

**Ubicaciones correctas:**
- Documentación pública → `docs/`
- Documentación privada → `spec/`
- Prompts → `.github/prompts/`
- Workflows → `.github/workflows/`

### 2. Formato de Preguntas (Protocol v2.0)

**IMPORTANTE:** Desde diciembre 2025, todas las preguntas DEBEN seguir Protocol v2.0 (bundle format).

**Archivo bundle** (`[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[###]-bundle.md`):

```markdown
---
id: "[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[###]"
country: "[CO|MX|AR|CL|PE|BR|US]"
grado: [número según país]
asignatura: "[Asignatura en idioma local]"
tema: "[Tema específico]"
protocol_version: "2.0"
total_questions: 7
estado: "draft"
creador: "[Nombre o AI-WorldExams]"
generation_date: "YYYY-MM-DD"
source: "OpenTDB"
source_license: "CC BY-SA 4.0"
---

# Pregunta Base: [Título]

> **Fuente:** OpenTDB (CC BY-SA 4.0)

---

## Pregunta 1 (Original - Dificultad 3)

**ID:** `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[###]-v1`

### Enunciado
[Pregunta adaptada con contexto cultural]

### Opciones
- [x] A) [Respuesta correcta]
- [ ] B) [Distractor 1 - error común]
- [ ] C) [Distractor 2 - error común]
- [ ] D) [Distractor 3 - error común]

### Explicación Pedagógica
[Justificación detallada]

---

## Pregunta 2 (Fácil A - Dificultad 1)

**ID:** `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[###]-v2`

[...continúa hasta v7]
```

**Estructura obligatoria:**
- v1: Original (dificultad 3)
- v2-v3: Fácil (dificultad 1-2)
- v4-v5: Media (dificultad 3)
- v6-v7: Difícil (dificultad 4-5)

**Referencia completa:** `docs/QUESTION_GENERATION_PROTOCOL_V2.md`

### 3. Sistema de IDs por País

El ID de cada pregunta debe incluir el código de país:

| País | Código | Ejemplo ID |
|------|--------|------------|
| 🇨🇴 Colombia | `CO` | `CO-MAT-05-fracciones-001` |
| 🇲🇽 México | `MX` | `MX-ESP-06-comprension-001` |
| 🇦🇷 Argentina | `AR` | `AR-LEN-09-literatura-001` |
| 🇨🇱 Chile | `CL` | `CL-MAT-08-algebra-001` |
| 🇵🇪 Perú | `PE` | `PE-COM-11-redaccion-001` |
| 🇧🇷 Brasil | `BR` | `BR-POR-09-gramatica-001` |
| 🇺🇸 USA | `US` | `US-ENG-10-reading-001` |
| 🇨🇳 China | `CN` | `CN-MAT-09-algebra-001` |
| 🇮🇳 India | `IN` | `IN-ENG-10-reading-001` |

### 4. Organización de Archivos

**Estructura jerárquica centralizada (Protocol v2.0):**

```text
saberparatodos/src/content/questions/[country]/[asignatura]/grado-[N]/[tema]/[archivo]-bundle.md
```

**Ejemplo real:**
```text
saberparatodos/src/content/questions/colombia/matematicas/grado-11/algebra/CO-MAT-11-algebra-001-bundle.md
```

**Convenciones de nombres:**

| Elemento | Regla | Ejemplo |
|----------|-------|------|
| País | lowercase, carpeta | `colombia/`, `mexico/`, `brasil/` |
| Asignatura | kebab-case, sin tildes | `matematicas`, `lectura-critica` |
| Grado | `grado-N` | `grado-3`, `grado-11` |
| Tema | kebab-case | `algebra`, `revolucion-industrial` |
| Archivo | `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[###]-bundle.md` | `CO-MAT-11-algebra-001-bundle.md` |

**Nota crítica:**
- Cada archivo bundle contiene **7 preguntas** (v1 a v7)
- IDs únicos por pregunta: `CO-MAT-11-algebra-001-v1`, `CO-MAT-11-algebra-001-v2`, etc.
- Ubicación centralizada compartida entre todas las plataformas

### 5. Niveles de Dificultad

| Nivel | Descripción | Ejemplo |
|-------|-------------|---------|
| 1 | Reconocimiento básico | Identificar una figura geométrica |
| 2 | Comprensión simple | Calcular perímetro de rectángulo |
| 3 | Aplicación | Resolver ecuación lineal simple |
| 4 | Análisis | Comparar fracciones con diferente denominador |
| 5 | Síntesis/Evaluación | Problemas multi-paso con razonamiento |

### 6. Distractores de Calidad

Las opciones incorrectas deben ser **plausibles**:

✅ **Correcto:**
- Representan errores comunes de estudiantes
- Error de signo, confusión de operación
- Lectura parcial del problema

❌ **Incorrecto:**
- Opciones obviamente incorrectas
- Opciones absurdas o ridículas
- Números aleatorios sin lógica

---

## 🧪 Testing & Reliability

### Tests Obligatorios

- **Siempre crear tests de validación** para nuevas funciones (parsers, utils, components)
- **Validar formato de preguntas** con script `npm run validate`
- **Tests de integración Supabase** para RLS policies y queries
- **Tests de UI** con Playwright/Cypress para flujos críticos

### Estructura de Tests

```typescript
// tests/questionParser.test.ts
import { describe, it, expect } from 'vitest';
import { parseQuestion } from '../src/utils/questionParser';

describe('Question Parser', () => {
  it('should parse valid question frontmatter', () => {
    // Test esperado
  });

  it('should throw error for invalid ID format', () => {
    // Test edge case
  });

  it('should handle missing explanation gracefully', () => {
    // Test failure case
  });
});
```

---

## ✅ Task Completion

### Gestión de Tareas

- **Marca completed tasks en `TASK.md`** inmediatamente después de terminarlas
- **Agrega nuevas tareas descubiertas** durante el desarrollo a `TASK.md` bajo "Tareas Descubiertas"
- **Actualiza `README.md`** cuando cambies dependencias, features, o setup
- **Actualiza `PLANNING.md`** cuando tomes decisiones de arquitectura

---

## 📎 Style & Conventions

### TypeScript

```typescript
// Siempre tipar explícitamente
interface Question {
  id: string;
  country: CountryCode;
  grado: number;
  asignatura: string;
  tema: string;
  dificultad: 1 | 2 | 3 | 4 | 5;
}

// Usar enums o union types para valores fijos
type CountryCode = 'CO' | 'MX' | 'AR' | 'CL' | 'PE' | 'BR' | 'US' | 'CN' | 'IN';
type QuestionState = 'draft' | 'review' | 'approved';
```

### Astro Components

- Usar TypeScript siempre que sea posible
- Componentes pequeños y reutilizables
- Islands solo cuando hay interactividad
- Props tipadas con interfaces

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="container">
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</div>
```

### Svelte Components

- Svelte 5 con runes (`$state`, `$derived`, `$effect`)
- Props tipadas con `interface Props`
- Estilos con Tailwind, no CSS custom

### TailwindCSS

- Mobile-first siempre (`sm:`, `md:`, `lg:`)
- Usar clases utilitarias, evitar CSS custom
- Accesibilidad obligatoria (contraste, aria-labels, roles)
- Usar variables CSS del tema (`var(--color-primary)`)

```html
<!-- ✅ Correcto -->
<button
  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
         transition-colors duration-200 focus:outline-none focus:ring-2
         focus:ring-blue-500 focus:ring-offset-2"
  aria-label="Submit exam"
>
  Submit
</button>

<!-- ❌ Incorrecto -->
<button class="my-custom-button">Submit</button>
```

---

## 🎨 Sistema de Temas por País

Cada repositorio tiene una paleta de colores única basada en su cultura:

### Variables CSS Estándar

```css
:root {
  /* Colores primarios del país */
  --color-primary: [definido en country.ts];
  --color-secondary: [definido en country.ts];
  --color-accent: [definido en country.ts];

  /* Fondos */
  --bg-dark: #1a1a2e;
  --bg-card: #16213e;

  /* Texto */
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
}
```

### Paletas por País

| País | Primary | Secondary | Accent |
|------|---------|-----------|--------|
| 🇨🇴 Colombia | `#FCD116` | `#003893` | `#CE1126` |
| 🇲🇽 México | `#006847` | `#CE1126` | `#FFD700` |
| 🇦🇷 Argentina | `#74ACDF` | `#FFFFFF` | `#F6B40E` |
| 🇨🇱 Chile | `#D52B1E` | `#FFFFFF` | `#0039A6` |
| 🇵🇪 Perú | `#D91023` | `#FFFFFF` | `#FFD700` |
| 🇧🇷 Brasil | `#009739` | `#FEDD00` | `#002776` |
| 🇺🇸 USA | `#3C3B6E` | `#B22234` | `#FFFFFF` |

---

## 🎭 Roles del Agente

Consulta `AGENTS.md` para la definición completa de roles. Resumen:

| Rol | Trigger | Comportamiento |
|-----|---------|----------------|
| 🏗️ **Architect** | Estructura, Supabase, Schema | Decisiones de alto nivel, DB global |
| 🤖 **Generator** | Generar, Contenido, Preguntas | Crear preguntas con contexto local |
| 🎨 **Frontend Artist** | UI, Diseño, CSS, Theme | Aplicar colores del país |
| 🛡️ **Guardian** | Auth, Seguridad, RLS | Proteger datos y claves |
| 📚 **Librarian** | Organizar, Carpetas | Mantener estructura limpia |
| 🌐 **Translator** | Traducir, Localizar | Adaptar contenido entre países |
| 🔄 **Synchronizer** | Webhook, Sync, Deploy | Gestionar pipelines |

---

## 🔧 Comandos Comunes

```powershell
# === Desarrollo Local ===
npm run dev                 # Astro dev server (localhost:4321)

# === Build para Producción ===
npm run build               # Build estático (dist/)

# === Preview ===
npm run preview             # Preview local del build

# === Validación ===
npm run validate            # Validar formato de preguntas (Protocol v2.0)

# === Deployment Manual (CLI OBLIGATORIO) ===
# ⚠️ NUNCA usar GitHub Actions - Proyecto privado sin créditos

# Opción 1: Deploy completo (con API sync)
cd saberparatodos
pwsh -File scripts\copy-api.ps1 && npm run build && npx wrangler pages deploy dist --project-name=saberparatodos

# Opción 2: Deploy rápido (solo código)
cd saberparatodos
npm run build && npx wrangler pages deploy dist --project-name=saberparatodos

# Opción 3: Script todo-en-uno
cd saberparatodos
pwsh -File scripts\deploy.ps1

# === Sincronización API ===
pwsh -File scripts\generate-questions-api.ps1  # Regenerar JSONs
cd saberparatodos && pwsh -File scripts\copy-api.ps1  # Copiar a public/api/
```

**Nota:** Ver `PROTOCOLO_DEPLOY_CLI.md` para protocolo completo de deployment.

---

## 🗄️ Supabase - Reglas Críticas

### Base de Datos Compartida

Todos los países usan la **misma instancia de Supabase**. Esto significa:

1. **NO** modificar el schema sin coordinación global
2. **SIEMPRE** usar `country_code` para filtrar datos
3. **NUNCA** exponer `SUPABASE_SERVICE_ROLE_KEY`

### Variables de Entorno

En cada repo país, solo se necesita:

```env
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
COUNTRY_CODE=CO
```

El `SERVICE_ROLE_KEY` solo existe en `question-sync` como secret de organización.

### RLS Policies

Todas las tablas tienen RLS habilitado:

- `questions_global`: Lectura pública, escritura via Edge Function
- `exam_results`: Lectura/escritura pública (filtrado por `country_code`)
- `country_config`: Solo lectura pública

---

## 🔄 Sistema de Sincronización

### Flujo de Nueva Pregunta

1. **Crear** pregunta en repo origen (ej: `saber-co`)
2. **Push** a main → Trigger webhook
3. **question-sync** recibe evento
4. **Validar** formato y contenido
5. **Insertar** en `questions_global` (Supabase)
6. **Traducir** a otros idiomas via Gemini/GPT
7. **Insertar** traducciones en `question_translations`
8. **Event Bus** notifica a repos destino
9. **GitHub Actions** en repos destino hacen `pull`
10. **Commit** automático con nuevas preguntas

### Eventos del Event Bus

| Evento | Descripción |
|--------|-------------|
| `question.created` | Nueva pregunta en repo origen |
| `question.translated` | Traducción disponible |
| `question.approved` | Revisión humana completada |
| `sync.completed` | Sincronización exitosa |

---

## 📝 Convenciones de Código

### TypeScript

```typescript
// Siempre tipar explícitamente
interface Question {
  id: string;
  country: CountryCode;
  grado: number;
  asignatura: string;
  // ...
}

// Usar enums para valores fijos
type CountryCode = 'CO' | 'MX' | 'AR' | 'CL' | 'PE' | 'BR' | 'US';
```

### Astro Components

- Usar TypeScript siempre que sea posible
- Componentes pequeños y reutilizables
- Islands solo cuando hay interactividad
- Props tipadas con interfaces

### Svelte Components

- Svelte 5 con runes (`$state`, `$derived`)
- Props tipadas
- Estilos con Tailwind, no CSS custom

### Tailwind CSS

- Mobile-first siempre (`sm:`, `md:`, `lg:`)
- Usar clases utilitarias, evitar CSS custom
- Accesibilidad obligatoria (contraste, aria-labels)
- Usar variables CSS del tema (`var(--color-primary)`)

---

## 🎯 Filosofía del Proyecto

1. **Open Source First:** Todo el código es público y contribuible
2. **Automatización Total:** El contenido se genera por IA
3. **Calidad Pedagógica:** Las preguntas deben ser educativamente válidas
4. **Identidad Cultural:** Cada país tiene su propia estética
5. **Sincronización Global:** Las preguntas se traducen y comparten
6. **Accesibilidad:** Funciona para todos, sin barreras
7. **Gratuito:** Sin costos para estudiantes

---

---

## 🧠 AI Behavior Rules

### **🚨 REGLA CRÍTICA: Deploy Manual Obligatorio**
- ❌ **NUNCA** sugerir crear archivos `.github/workflows/*.yml`
- ❌ **NUNCA** mencionar "GitHub Actions" o "CI/CD automation"
- ✅ **SIEMPRE** usar comandos `wrangler` CLI para deploy
- ✅ **SIEMPRE** recordar ejecutar `copy-api.ps1` antes de build
- ✅ **SIEMPRE** verificar que el usuario esté en la carpeta correcta
- 📖 **Protocolo:** Consultar `PROTOCOLO_DEPLOY_CLI.md` antes de cualquier deploy

**Razón:** Proyecto privado sin cuota de GitHub Actions. Deploy manual ahorra costos.

### **Nunca asumir contexto faltante. Preguntar si hay incertidumbre.**
- Si falta información crítica (país, asignatura, grado), preguntar antes de implementar
- No inventar librerías o funciones que no existen
- Confirmar que archivos y rutas existen antes de referenciarlos

### **Modular Prompting - Una tarea a la vez**
- Enfocarse en una tarea específica por mensaje
- Para cambios complejos, dividir en sub-tareas y ejecutar secuencialmente
- Evitar intentar resolver múltiples problemas no relacionados simultáneamente

### **Testing after every feature**
- Crear tests de validación para nuevas funciones
- Verificar que el código no rompe tests existentes
- Usar `npm run validate` después de cambios en preguntas

### **Documentation as you go**
- Actualizar `README.md` cuando cambien dependencias o features
- Actualizar `TASK.md` al completar tareas
- Actualizar `PLANNING.md` al tomar decisiones de arquitectura
- Comentar código no-obvio con explicaciones del "por qué"

### **Never delete or overwrite existing code**
- A menos que esté explícitamente indicado en `TASK.md`
- Siempre confirmar antes de borrar archivos o funciones

### **Respect the multi-repo architecture**
- Cada país es un repo independiente con contenido localizado
- La base de datos Supabase es compartida (nunca modificar schema sin coordinación)
- Los componentes en `shared-components` son inmutables
- Cambios a la arquitectura global requieren discusión en `.github` repo

---

## 🌐 Contexto Cultural

Al generar contenido, considera el contexto del país:

### 🇨🇴 Colombia
- Moneda: Pesos colombianos (COP)
- Ciudades: Bogotá, Medellín, Cali, Barranquilla
- Cultura: Café, vallenato, cumbia, biodiversidad

### 🇲🇽 México
- Moneda: Pesos mexicanos (MXN)
- Ciudades: CDMX, Guadalajara, Monterrey
- Cultura: Tacos, mariachi, Día de Muertos, aztecas

### 🇦🇷 Argentina
- Moneda: Pesos argentinos (ARS)
- Ciudades: Buenos Aires, Córdoba, Rosario
- Cultura: Tango, asado, mate, **voseo** (usá vos en lugar de tú)

### 🇨🇱 Chile
- Moneda: Pesos chilenos (CLP)
- Ciudades: Santiago, Valparaíso, Concepción
- Cultura: Cueca, empanadas, Andes, mapuche

### 🇵🇪 Perú
- Moneda: Soles (PEN)
- Ciudades: Lima, Arequipa, Cusco
- Cultura: Ceviche, Machu Picchu, incas, quechua

### 🇧🇷 Brasil
- Moneda: Reales (BRL)
- Ciudades: São Paulo, Rio de Janeiro, Brasília
- Cultura: Samba, carnaval, fútbol, Amazonas
- **Idioma:** Portugués brasileño

### 🇺🇸 USA
- Moneda: Dólares (USD)
- Ciudades: New York, Los Angeles, Chicago
- Cultura: Diversa, multicultural
- **Idioma:** Inglés americano

### 🇨🇳 China
- Moneda: Yuan (CNY)
- Ciudades: Beijing, Shanghai, Guangzhou
- Cultura: Gran Muralla, medicina tradicional, 5000 años de historia
- **Idioma:** Mandarín simplificado

### 🇮🇳 India
- Moneda: Rupias (INR)
- Ciudades: Delhi, Mumbai, Bangalore
- Cultura: Diversa, Taj Mahal, Bollywood, yoga
- **Idiomas:** Hindi, Inglés (oficial)

---

## 🎯 Filosofía del Proyecto

1. **Open Source First:** Todo el código es público y contribuible
2. **Automatización Total:** El contenido se genera por IA
3. **Calidad Pedagógica:** Las preguntas deben ser educativamente válidas
4. **Identidad Cultural:** Cada país tiene su propia estética
5. **Sincronización Global:** Las preguntas se traducen y comparten
6. **Accesibilidad:** Funciona para todos, sin barreras
7. **Gratuito:** Sin costos para estudiantes

---

## � Estado de Tareas Delegadas a Jules (Diciembre 2025)

### Regeneración de Preguntas con Errores de Generación

**Problema:** ~390 preguntas con placeholder `[Pregunta pendiente de recuperación por error de generación]` en bundles de Colombia grado 11.

**Solución:** Dividir trabajo en 4 issues separados por materia y delegar a Jules con contexto detallado.

### Issues Activos

| Issue | Materia | Bundles | Estado | Labels |
|-------|---------|---------|--------|--------|
| [#57](https://github.com/iberi22/worldexams/issues/57) | 📐 Matemáticas | ~50 | En progreso | `bug`, `content`, `high-priority`, `matematicas`, `jules` |
| [#58](https://github.com/iberi22/worldexams/issues/58) | 📖 Lectura Crítica | ~14 | En progreso | `bug`, `content`, `high-priority`, `lectura-critica`, `jules` |
| [#60](https://github.com/iberi22/worldexams/issues/60) | 🧪 Ciencias Naturales | ~21 | En progreso | `bug`, `content`, `high-priority`, `ciencias-naturales`, `jules` |
| [#61](https://github.com/iberi22/worldexams/issues/61) | 🏛️ Sociales y Ciudadanas | ~23 | En progreso | `bug`, `content`, `high-priority`, `sociales-ciudadanas`, `jules` |

### Contexto de cada Issue

Cada issue incluye:
- **Protocolo v2.0:** Referencia a `docs/QUESTION_GENERATION_PROTOCOL_V2.md`
- **Estructura de bundles:** 7 preguntas (v1-v7) con progresión pedagógica
- **Fuentes de verificación:** Links a recursos educativos colombianos
- **Contexto cultural:** Referencias locales por materia
- **Checklist de calidad:** Validaciones antes de crear PR

### Instrucciones a Jules

Para cada issue, Jules debe:
1. Leer completamente `docs/QUESTION_GENERATION_PROTOCOL_V2.md`
2. Investigar currículo oficial de Colombia para grado 11
3. Verificar conceptos con fuentes educativas confiables
4. Contextualizar preguntas con referencias colombianas
5. Generar 7 variantes por bundle con progresión de dificultad
6. Validar que distractores representen errores comunes

### Cómo Asignar a Jules

Para delegar nuevas tareas a Jules:
1. Crear issue con contexto detallado y checklist
2. Agregar label `jules` al issue
3. Tagguear `@jules` en comentario del issue
4. Jules detectará automáticamente y comenzará tarea

**Referencias:**
- [Jules Documentation](https://jules.google/docs/)
- [Starting tasks from GitHub issues](https://jules.google/docs/running-tasks/#starting-tasks-from-github-issues)

---

## 📞 Recursos

- **Organización:** [github.com/world-exams](https://github.com/world-exams)
- **PLANNING.md:** Consultar en cada repo para arquitectura detallada
- **TASK.md:** Consultar en cada repo para tareas actuales
- **AGENTS.md:** Consultar para roles de IA detallados
- **Contribuir:** Abrir issue en el repo correspondiente al país
- **Jules Tasks:** Ver issues con label `jules` en repo iberi22/worldexams

---

## 🌐 Dominios de Producción

| Plataforma | Dominio | Hosting |
|------------|---------|---------|
| 🇨🇴 **SaberParaTodos** (Colombia) | **https://saberparatodos.space** | Cloudflare Pages |

> [!IMPORTANT]
> El dominio de producción es `saberparatodos.space` (NO `.com`).
> Para deploy: `npx wrangler pages deploy dist --project-name=saberparatodos`

---

*Versión: 2.3 | Actualizado: 2026-01-06*
*Nota: Agregado dominio de producción saberparatodos.space*