# BOOTSTRAP.md — Primera Ejecución para Agentes

> Guía de inicio rápido para agentes de IA que llegan al proyecto WorldExamns / SaberParaTodos.
> Lee esto SIEMPRE en tu primera sesión. Después, usa MEMORY.md y TASK.md.

---

## 🧭 Orden de Lectura Obligatorio

Para entender el proyecto completo, lee estos archivos EN ESTE ORDEN:

```
1. AGENTS.md              ← Protocolo de bundles v5.2 (FUENTE DE VERDAD)
2. CLAUDE.md              ← Instrucciones específicas para Claude/agentes
3. MEMORY.md              ← Memoria persistente y lecciones aprendidas
4. .gitcore/ARCHITECTURE.md  ← Arquitectura del sistema
5. .gitcore/features.json ← Features implementadas
6. .gitcore/planning/PLANNING.md  ← Planificación activa
7. TASK.md                ← Tareas activas (lo que hay que hacer AHORA)
8. README.md              ← Vista general para humanos
```

---

## 🎯 ¿Qué es WorldExamns?

WorldExamns (también conocido como **SaberParaTodos**) es una plataforma educativa que genera y distribuye **bundles de preguntas de examen** para países de Latinoamérica.

**Propietario:** BELA (Brahyan Belalcazar, @iberi22)
**Stack:** Node.js / TypeScript, Cloudflare Workers, Supabase, Astro + Svelte
**Repositorio:** Privado, monorepo con npm workspaces

---

## 📦 ¿Qué es un Bundle?

Un **bundle** es un archivo markdown con frontmatter YAML que contiene un conjunto de preguntas de examen sobre un tema específico, para un grado y país determinados.

**Estructura de un bundle:**
```markdown
---
id: "CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle"
country: "colombia"
grado: 6
asignatura: "matematicas"
tema: "numeros-enteros"
# ... más campos YAML
---

## Question 1 [D3]
**ID:** CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.90
**Contexto:** ...

### Enunciado
...
### Opciones
- [x] A) ...
- [ ] B) ...
### Explicacion Pedagogica
...
```

**Ruta canónica:**
```
questions_data/{country}/{subject}/grado-{N}/2026/weekly/
  {COUNTRY}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

---

## 🔄 Workflow de Generación (Jules)

Cuando recibas una tarea de generar bundles:

```
1. LEER este archivo (BOOTSTRAP.md)
2. LEER AGENTS.md — protocolo v5.2 completo
3. LEER skills/worldexams-bundle-generator/SKILL.md
4. LEER skills/bundle-creator/SKILL.md
5. LEER skills/bundle-creator/rules/{COUNTRY_CODE}.md  ← Reglas del país
6. GENERAR bundles siguiendo el formato exacto
7. VALIDAR con npm run validate
8. CORREGIR errores si los hay
9. PUBLICAR packs con node scripts/generate-static-packs.js
10. VERIFICAR con npm run audit:country-readiness
```

⚠️ **NUNCA** abras un PR si `npm run validate` falla.

---

## ✅ Cómo Validar Bundles

```bash
# Validar todos los bundles
npm run validate

# Validar un bundle específico
npm run validate -- questions_data/colombia/lengua/grado-7/2026/weekly/CO-LEN-7-2026-W14-subordinacion-001-MASTERY-bundle.md
```

El validador comprueba:
1. Frontmatter YAML completo y correcto
2. Formato de preguntas (encabezados, opciones, feedback)
3. Cantidad de preguntas por grado
4. IDs consistentes
5. Sin errores comunes (AI leakage, distractores duplicados, etc.)

---

## 🗺️ Países Soportados

| Código | País | Examen | Estado | Reglas |
|--------|------|--------|--------|--------|
| CO | Colombia | ICFES Saber | ✅ ACTIVO | `rules/CO.md` |
| MX | México | COMIPEMS/PLANEA | 🔄 DESARROLLO | `rules/MX.md` |
| AR | Argentina | APRENDER | 📋 PLANEADO | — |
| BR | Brasil | ENEM | 📋 PLANEADO | — |
| CL | Chile | PAES | 📋 PLANEADO | — |
| PE | Perú | ECE | 📋 PLANEADO | — |
| UY | Uruguay | CBU | ✅ ACTIVO | `rules/UY.md` |
| PY | Paraguay | 3er Ciclo | ✅ ACTIVO | `rules/PY.md` |
| [más] | ... | ... | ❌ No iniciado | — |

---

## 📊 Métricas Clave a Conocer

- **Country Readiness KPI:** 2000 preguntas por país
- **Estructura de preguntas:** G3-G5: 8, G6-G7: 10, G8-G10: 12, G11/3EM: 20
- **Secuencia semanal:** W01-W40 (curricular, no calendario oficial)
- **Protocolo actual:** v5.2

---

## 🛠️ Stack Técnico Rápido

```bash
# Desarrollo local
npm install              # Instalar dependencias
npm run dev              # Dev server (landing)
npm run dev:saberparatodos   # App de exámenes
npm run build            # Build completo
npm run test:e2e         # Tests Playwright
npm run lint             # ESLint

# Validación y auditoría
npm run validate         # Validar bundles v5.2
npm run audit:country-readiness  # KPI readiness

# Publicación de packs
cd saberparatodos && node scripts/generate-static-packs.js --all-weekly
```

---

## 🔗 Enlaces Útiles

- **Producto:** https://saberparatodos.space
- **Bot de Telegram:** @saberparatodoscol_bot
- **Supabase Dashboard:** https://supabase.com/dashboard/project/tzmrgvtptdtsjcugwqyq
- **Skills del agente:** `skills/` (12 skills disponibles)
- **Documentación completa:** `docs/`

---

## ⚠️ Reglas de Oro

1. **Siempre validar antes de commit** — `npm run validate` debe pasar
2. **No mezclar contenido y código** en el mismo PR
3. **No guardar bundles en carpetas temporales** — solo en ruta canónica
4. **No editar JSON manualmente** — corregir el .md y regenerar
5. **Contextualizar al país destino** — leer reglas del país antes de generar
6. **No usar "todas/ninguna de las anteriores"** en opciones
7. **Todas las opciones necesitan feedback** (comentario HTML)
8. **Exactamente una opción correcta** por pregunta (`[x]`)

---

*¡Bienvenido a WorldExamns! Consulte TASK.md para ver qué necesita hacerse.*
