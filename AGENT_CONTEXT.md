# 🤖 AGENT CONTEXT - World Exams Continuation

_Fecha: 2025-11-30_
_Workspace: E:\scripts-python\worldexams_

---

## 🚨 ESTADO CRÍTICO ACTUAL

### ⚠️ GitHub Organization Flagged

La organización `worldexams` ha sido **flagueada por GitHub** y está oculta del público.

**Razón probable:** Creación masiva automatizada de 20+ repositorios en corto tiempo (2 días).

**Acciones tomadas:**
- ✅ Enviado ticket de soporte explicando propósito educativo legítimo
- ✅ Detenida creación de nuevos repos
- ✅ Documentada estrategia de crecimiento gradual

**Estado del ticket:** ⏳ Esperando respuesta de GitHub Support (1-5 días hábiles)

**CRÍTICO:** **NO crear más repos hasta que se resuelva el flag.**

---

## 📊 Progreso General del Proyecto

**Estado:** 65% completo

| Componente | Progreso | Estado |
|------------|----------|--------|
| 🏗️ Infraestructura | 80% | Supabase configurado, GitHub Actions base |
| 🔗 Backend | 70% | Edge Functions, RLS policies |
| 🎨 Template UI Base | 100% | saber-co como fuente |
| 🌍 Customización por País | 25% | 5/20 repos completos |
| 🔄 Sistema Sincronización | 0% | Pendiente `question-sync` |
| 🧪 Testing | 10% | Validación básica |
| 📚 Documentación | 60% | AGENTS.md, MASTER_PLAN.md, PLANNING.md, TASK.md |

---

## 🎯 TU MISIÓN: Personalizar Repos con Template UI

Hay **10 repositorios** que tienen el template base aplicado pero necesitan **personalización completa** para reflejar la identidad cultural de cada país.

### Repos que Necesitas Personalizar

| # | Repo | País | Flag Colors | Idioma |
|---|------|------|-------------|--------|
| 1 | `snbt-id` | 🇮🇩 Indonesia | `#CE1126`, `#FFFFFF` | Indonesio |
| 2 | `suneung-kr` | 🇰🇷 Korea | `#003478`, `#CD2E3A`, `#FFFFFF` | Coreano |
| 3 | `thanaweya-eg` | 🇪🇬 Egypt | `#CE1126`, `#FFFFFF`, `#000000` | Árabe |
| 4 | `utme-ng` | 🇳🇬 Nigeria | `#008751`, `#FFFFFF` | Inglés |
| 5 | `ege-ru` | 🇷🇺 Russia | `#0039A6`, `#FFFFFF`, `#D52B1E` | Ruso |
| 6 | `bac-fr` | 🇫🇷 France | `#0055A4`, `#FFFFFF`, `#EF4135` | Francés |
| 7 | `center-jp` | 🇯🇵 Japan | `#BC002D`, `#FFFFFF` | Japonés |
| 8 | `ingreso-ar` | 🇦🇷 Argentina | `#74ACDF`, `#FFFFFF`, `#F6B40E` | Español (voseo) |
| 9 | `admision-pe` | 🇵🇪 Peru | `#D91023`, `#FFFFFF`, `#FFD700` | Español |
| 10 | `paes-cl` | 🇨🇱 Chile | `#D52B1E`, `#FFFFFF`, `#0039A6` | Español |

---

## 📝 Checklist de Personalización por Repo

Para cada repositorio, debes modificar estos archivos:

### 1. `src/layouts/Layout.astro` - Flag Stripe

**Ubicación:** Línea ~15-30 (dentro del `<style>` del header)

**Qué cambiar:**
```astro
<!-- ANTES (template genérico) -->
<style>
  header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, #CCCCCC 33%, #FFFFFF 33%, #FFFFFF 66%, #CCCCCC 66%);
  }
</style>

<!-- DESPUÉS (ejemplo Indonesia) -->
<style>
  header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, #CE1126 50%, #FFFFFF 50%);
  }
</style>
```

**Patrón para colores:**
- 2 colores: `to right, COLOR1 50%, COLOR2 50%`
- 3 colores: `to right, COLOR1 33%, COLOR2 33%, COLOR2 66%, COLOR3 66%`

---

### 2. `src/config/country.ts` - Configuración del País

**Qué cambiar:**
```typescript
// ANTES (template genérico)
export const countryConfig = {
  code: 'XX',
  name: 'Generic Country',
  language: 'en',
  currency: 'USD',
  // ...
}

// DESPUÉS (ejemplo Indonesia)
export const countryConfig = {
  code: 'ID',
  name: 'Indonesia',
  language: 'id',
  currency: 'IDR',
  examName: 'SNBT (Seleksi Nasional Berdasarkan Tes)',
  grades: [10, 11, 12],
  subjects: [
    { id: 'matematika', name: 'Matematika', icon: '📐' },
    { id: 'bahasa-indonesia', name: 'Bahasa Indonesia', icon: '📖' },
    { id: 'bahasa-inggris', name: 'Bahasa Inggris', icon: '🌍' },
    { id: 'fisika', name: 'Fisika', icon: '⚛️' },
    { id: 'kimia', name: 'Kimia', icon: '🧪' },
    { id: 'biologi', name: 'Biologi', icon: '🧬' }
  ],
  colors: {
    primary: '#CE1126',
    secondary: '#FFFFFF',
    accent: '#CE1126'
  }
}
```

**Referencias de asignaturas por país:**
- Usa nombres locales (ej: Matemática vs Mathematics vs Matematika)
- Adapta el currículo nacional (investiga si es necesario)
- Iconos consistentes con los temas

---

### 3. `src/styles/global.css` - Accent Color

**Qué cambiar:**
```css
/* ANTES */
:root {
  --color-accent: #3B82F6; /* Genérico azul */
}

/* DESPUÉS (ejemplo Indonesia) */
:root {
  --color-accent: #CE1126; /* Rojo de la bandera */
}
```

---

### 4. `src/pages/index.astro` - SEO y Textos

**Qué cambiar:**
```astro
---
// ANTES
const title = "Generic Exam Practice";
const description = "Practice for your exams";
---

// DESPUÉS (ejemplo Indonesia)
const title = "SNBT Practice - Latihan Soal SNBT Gratis";
const description = "Platform latihan soal SNBT (Seleksi Nasional Berdasarkan Tes) gratis untuk siswa Indonesia. Ribuan soal Matematika, Bahasa Indonesia, dan mata pelajaran lainnya.";
---
```

**Contenido del `<main>`:**
- Traducir todos los textos al idioma local
- Usar contexto cultural (nombres de ciudades, moneda, ejemplos)
- Mantener la estructura HTML pero cambiar el contenido

---

### 5. `src/pages/questions/[...slug].astro` - SEO Dinámico

**Qué cambiar:**
```astro
// Traducir textos de metadatos
const title = `${question.tema} - ${question.asignatura}`;
const description = `Pregunta de ${question.asignatura} sobre ${question.tema}`;
```

---

### 6. Crear Pregunta de Ejemplo

**Ubicación:** `src/content/questions/[asignatura]/grado-[N]/[tema]/[ID].md`

**Ejemplo para Indonesia:**
```markdown
---
id: "ID-MAT-10-aljabar-001"
country: "ID"
grado: 10
asignatura: "Matematika"
tema: "Aljabar"
dificultad: 3
estado: "draft"
creador: "AI-WorldExams"
source_lang: "id"
---

# Pertanyaan

Jika $x + 2y = 10$ dan $2x - y = 5$, berapa nilai $x$?

# Pilihan

- [ ] A) 2
- [ ] B) 3
- [x] C) 4
- [ ] D) 5

# Penjelasan

Untuk menyelesaikan sistem persamaan ini:
1. Dari persamaan pertama: $x = 10 - 2y$
2. Substitusi ke persamaan kedua: $2(10 - 2y) - y = 5$
3. Sederhanakan: $20 - 4y - y = 5$
4. $20 - 5y = 5$
5. $y = 3$
6. Substitusi kembali: $x = 10 - 2(3) = 4$

Jawaban yang benar adalah C) 4.
```

**Importante:**
- ID con código del país: `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[###]`
- Idioma local en enunciado, opciones y explicación
- Contexto cultural apropiado (moneda, nombres, ciudades)

---

## 🎨 Paletas de Colores por País

### 🇮🇩 Indonesia (snbt-id)
```css
--flag-1: #CE1126 (Rojo)
--flag-2: #FFFFFF (Blanco)
--accent: #CE1126
```

### 🇰🇷 Korea (suneung-kr)
```css
--flag-1: #003478 (Azul)
--flag-2: #CD2E3A (Rojo)
--flag-3: #FFFFFF (Blanco)
--accent: #003478
```

### 🇪🇬 Egypt (thanaweya-eg)
```css
--flag-1: #CE1126 (Rojo)
--flag-2: #FFFFFF (Blanco)
--flag-3: #000000 (Negro)
--accent: #CE1126
```

### 🇳🇬 Nigeria (utme-ng)
```css
--flag-1: #008751 (Verde)
--flag-2: #FFFFFF (Blanco)
--accent: #008751
```

### 🇷🇺 Russia (ege-ru)
```css
--flag-1: #0039A6 (Azul)
--flag-2: #FFFFFF (Blanco)
--flag-3: #D52B1E (Rojo)
--accent: #0039A6
```

### 🇫🇷 France (bac-fr)
```css
--flag-1: #0055A4 (Azul)
--flag-2: #FFFFFF (Blanco)
--flag-3: #EF4135 (Rojo)
--accent: #0055A4
```

### 🇯🇵 Japan (center-jp)
```css
--flag-1: #BC002D (Rojo)
--flag-2: #FFFFFF (Blanco)
--accent: #BC002D
```

### 🇦🇷 Argentina (ingreso-ar)
```css
--flag-1: #74ACDF (Celeste)
--flag-2: #FFFFFF (Blanco)
--flag-3: #F6B40E (Amarillo/Sol)
--accent: #74ACDF
```

**IMPORTANTE:** Argentina usa **voseo**. Textos deben usar "vos" en lugar de "tú".

### 🇵🇪 Peru (admision-pe)
```css
--flag-1: #D91023 (Rojo)
--flag-2: #FFFFFF (Blanco)
--flag-3: #FFD700 (Amarillo - solo en escudo)
--accent: #D91023
```

### 🇨🇱 Chile (paes-cl)
```css
--flag-1: #D52B1E (Rojo)
--flag-2: #FFFFFF (Blanco)
--flag-3: #0039A6 (Azul - cuadro superior)
--accent: #D52B1E
```

---

## 🛠️ Flujo de Trabajo Recomendado

### Paso 1: Clonar el Repo
```bash
cd E:\scripts-python\worldexams
git clone https://github.com/world-exams/[repo-name].git
cd [repo-name]
```

### Paso 2: Verificar Estructura
```bash
# Verificar que tenga el template base
ls src/layouts/Layout.astro
ls src/config/country.ts
ls src/styles/global.css
```

### Paso 3: Personalizar Archivos
- Usar los ejemplos de arriba como guía
- Investigar contexto cultural si es necesario
- Mantener consistencia con la arquitectura global

### Paso 4: Crear Pregunta de Ejemplo
- Al menos 1 pregunta por asignatura principal
- Usar formato estándar de frontmatter
- ID con código del país

### Paso 5: Commit y Push
```bash
git add .
git commit -m "feat(UI): personalize [country] with flag stripe and cultural identity

- Add flag stripe with [colors]
- Configure country.ts with local exam name and subjects
- Update accent color to [color]
- Translate SEO texts to [language]
- Add example question in [subject]"

git push origin main
```

### Paso 6: Actualizar TASK.md
Marcar la tarea como ✅ Completado en `TASK.md` del workspace principal.

---

## 📋 Referencias Críticas

### Documentos que Debes Leer PRIMERO:
1. **`PLANNING.md`** - Arquitectura global y decisiones de diseño
2. **`TASK.md`** - Estado actual y tareas pendientes
3. **`AGENTS.md`** - Roles y responsabilidades de IA

### Archivos de Referencia:
- **Template exitoso:** `exani-mx` (México) - repo completamente personalizado
- **Colores:** Ver tabla en `PLANNING.md` o este documento
- **Estructura de preguntas:** Ver formato en `.github/copilot-instructions.md`

---

## 🚫 Restricciones Importantes

### NO HACER:
- ❌ NO crear nuevos repos hasta que se resuelva el flag
- ❌ NO modificar el schema de Supabase sin coordinación
- ❌ NO exponer `SUPABASE_SERVICE_ROLE_KEY`
- ❌ NO crear archivos en la raíz de los repos (excepto README, AGENTS, etc.)
- ❌ NO usar CSS custom (solo Tailwind)
- ❌ NO modificar `shared-components`

### SÍ HACER:
- ✅ Usar contexto cultural apropiado (moneda, ciudades, nombres locales)
- ✅ Traducir TODO al idioma local
- ✅ Mantener estructura de archivos estándar
- ✅ Crear al menos 1 pregunta de ejemplo por repo
- ✅ Actualizar `TASK.md` después de completar cada repo
- ✅ Commits descriptivos con prefijo `feat(UI):`

---

## 🎯 Orden de Prioridad Sugerido

Personalizar en este orden (de mayor a menor importancia):

1. **🇦🇷 Argentina** (ingreso-ar) - Gran mercado hispanohablante, voseo
2. **🇨🇱 Chile** (paes-cl) - Mercado hispanohablante importante
3. **🇵🇪 Peru** (admision-pe) - Mercado hispanohablante importante
4. **🇮🇩 Indonesia** (snbt-id) - Gran población, mercado asiático
5. **🇰🇷 Korea** (suneung-kr) - Mercado tecnológico importante
6. **🇫🇷 France** (bac-fr) - Mercado francófono
7. **🇯🇵 Japan** (center-jp) - Mercado tecnológico avanzado
8. **🇷🇺 Russia** (ege-ru) - Gran mercado ruso
9. **🇪🇬 Egypt** (thanaweya-eg) - Mercado árabe
10. **🇳🇬 Nigeria** (utme-ng) - Mercado africano anglófono

**Razón:** Priorizar hispanohablantes primero (Argentina, Chile, Peru) ya que el contenido base está en español y es más fácil adaptar. Luego otros idiomas.

---

## 📊 Métricas de Éxito

Al completar esta fase, deberías tener:

- ✅ 15/20 repos personalizados (75%)
- ✅ Cada repo con flag stripe único
- ✅ Cada repo con configuración cultural completa
- ✅ Al menos 1 pregunta de ejemplo por repo
- ✅ Todos los textos traducidos al idioma local

---

## 🆘 Si Encuentras Problemas

1. **Falta información cultural:** Investiga el examen nacional del país (Wikipedia, sitios oficiales)
2. **Colores incorrectos:** Verifica banderas en Wikipedia
3. **Estructura faltante:** Revisa `exani-mx` como referencia
4. **Dudas de idioma:** Usa Google Translate + contexto educativo

---

## 📞 Contacto y Soporte

- **Usuario:** Monitorea el ticket de GitHub Support
- **Workspace:** `E:\scripts-python\worldexams`
- **Repos locales:** Clonados en subcarpetas del workspace

---

## 🎉 Mensaje Final

Este es un proyecto educativo ambicioso con impacto real para millones de estudiantes. Cada repo personalizado acerca el objetivo de democratizar el acceso a práctica de exámenes de calidad.

**Tu misión es clara:** Personalizar 10 repos con identidad cultural única. Cada uno es un paso hacia un mundo donde todos los estudiantes tienen acceso gratuito a herramientas de preparación.

**¡Adelante! 🚀**

---

_Generado: 2025-11-30_
_Para: Agente de IA de continuación_
_Contexto completo en: PLANNING.md, TASK.md, AGENTS.md_
