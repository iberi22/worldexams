# 🎯 [ASIGNACIÓN @jules] Generar 8 Packs de Preguntas para Colombia Grado 9°

> Historical context only. Antes de usar este template para trabajo nuevo valida `docs/specs/ACTIVE_PROTOCOLS.md`; la configuración país vigente vive en `config/countries.config.ts`.

## 📋 Contexto

Colombia Grado 9° necesita urgentemente más contenido. Actualmente tiene solo **3 packs** (1 por asignatura) y le falta completamente la asignatura **Competencias Ciudadanas**.

**Análisis completo:** [colombia-packs-status.md](./docs/reports/colombia-packs-status.md)

---

## 🎯 Tarea

Generar **8 nuevos packs** siguiendo el **Protocolo v2.0** (7 preguntas por pack):

| # | Asignatura | Pack # | Tema | Archivo Output |
|---|------------|--------|------|----------------|
| 1 | Matemáticas | 2 | Ecuaciones lineales | ✅ `matematicas/2.json` (ejemplo listo) |
| 2 | Matemáticas | 3 | Geometría (áreas y perímetros) | `matematicas/3.json` |
| 3 | Lenguaje | 2 | Comprensión inferencial | `lenguaje/2.json` |
| 4 | Lenguaje | 3 | Tipología textual | `lenguaje/3.json` |
| 5 | Ciencias Naturales | 2 | Ecosistemas colombianos | `ciencias_naturales/2.json` |
| 6 | Ciencias Naturales | 3 | Reacciones químicas | `ciencias_naturales/3.json` |
| 7 | Competencias Ciudadanas | 1 | Derechos fundamentales | ✅ `competencias_ciudadanas/1.json` (ejemplo listo) |
| 8 | Competencias Ciudadanas | 2 | Convivencia y paz | `competencias_ciudadanas/2.json` |

**Total a generar:** 6 packs nuevos × 7 preguntas = **42 preguntas** (2 packs ya están como ejemplo)

---

## 📖 Instrucciones Completas

**Lee primero:** [jules-instructions-colombia.md](./docs/reports/jules-instructions-colombia.md)

Este documento contiene:
- ✅ Protocolo v2.0 resumido
- ✅ Contexto cultural colombiano obligatorio
- ✅ Estructura JSON esperada
- ✅ Checklist de validación
- ✅ Temas específicos con progresión de dificultad
- ✅ Ejemplos de cada tipo de pregunta
- ✅ Template de PR completo

---

## 📁 Ejemplos de Referencia

Ya generados como plantilla:

1. **Matemáticas - Ecuaciones Lineales:** `api/v1/CO/icfes/9/matematicas/2.json`
   - ✅ Contexto colombiano (Éxito, Parque Explora, heladerías Cartagena)
   - ✅ Moneda en COP
   - ✅ Explicaciones detalladas con verificaciones
   - ✅ Progresión 1-2-3-3-3-4-5

2. **Competencias Ciudadanas - Derechos:** `api/v1/CO/icfes/9/competencias_ciudadanas/1.json`
   - ✅ Referencias a Constitución 1991
   - ✅ Jurisprudencia real de Corte Constitucional
   - ✅ Casos colombianos (libertad religiosa, embarazo adolescente)
   - ✅ Explicaciones con artículos constitucionales

---

## ✅ Checklist Rápido

Antes de crear el PR, verifica:

### Formato Técnico
- [ ] JSON válido (sin errores de sintaxis)
- [ ] 7 preguntas por pack
- [ ] IDs únicos: `CO-[ASIG]-09-[TEMA]-[###]-v[1-7]`
- [ ] `protocol_version: "2.0"` presente
- [ ] `creador: "jules"` presente
- [ ] Fecha: `2025-12-09`

### Contenido Pedagógico
- [ ] Dificultades: 2 fáciles (1-2) + 3 medias (3) + 2 difíciles (4-5)
- [ ] Explicaciones de 50+ palabras
- [ ] Se explica por qué cada opción incorrecta está mal
- [ ] Competencias ICFES identificadas
- [ ] Distractores = errores comunes reales

### Localización Colombia
- [ ] Referencias culturales (ciudades: Bogotá, Medellín, Cali, Cartagena, etc.)
- [ ] Moneda en COP ($)
- [ ] Lenguaje colombiano (ustedes, no vosotros)
- [ ] Nombres comunes (María, Juan, Camilo, Sofía, Andrés)

---

## 🚀 Workflow

### 1. Crear Branch
```bash
git checkout -b jules/grado9-phase1
```

### 2. Generar Packs

Para cada pack, usa este prompt base:

```
Genera un pack de preguntas v2.0 para Colombia Grado 9°.

Asignatura: [X]
Tema: [Y]
Pack número: [Z]

Requisitos:
- Exactamente 7 preguntas siguiendo protocolo v2.0
- Dificultades: 1, 2, 3, 3, 3, 4, 5
- Contexto cultural colombiano (Bogotá, Medellín, Cali, Cartagena)
- Moneda: pesos colombianos (COP)
- IDs: CO-[ASIG]-09-[TEMA]-[###]-v[1-7]
- Explicaciones de 50+ palabras
- Competencias ICFES identificadas

Formato JSON según estructura en jules-instructions-colombia.md
```

### 3. Validar

```bash
# Validar sintaxis JSON
cat api/v1/CO/icfes/9/matematicas/3.json | jq .

# Contar preguntas (debe ser 7)
cat api/v1/CO/icfes/9/matematicas/3.json | jq '.questions | length'

# Verificar IDs únicos
cat api/v1/CO/icfes/9/matematicas/3.json | jq '.questions[].id'
```

### 4. Commit

```bash
git add api/v1/CO/icfes/9/matematicas/3.json
git add api/v1/CO/icfes/9/lenguaje/2.json
# ... (resto de archivos)

git commit -m "feat(colombia): agregar 6 packs Grado 9 - Fase 1

- Matemáticas: geometría (pack 3)
- Lenguaje: comprensión inferencial, tipología textual (packs 2-3)
- Ciencias Naturales: ecosistemas, reacciones químicas (packs 2-3)
- Competencias Ciudadanas: convivencia y paz (pack 2)

Protocolo v2.0 (7 preguntas por pack)
Total: 42 preguntas generadas

@jules"
```

### 5. Push y PR

```bash
git push origin jules/grado9-phase1
```

Luego crear PR con título:
```
feat(colombia): Agregar 6 packs Grado 9 - Fase 1 by @jules
```

**Descripción del PR:** Usar template en `jules-instructions-colombia.md` (sección "Paso 5: Crear Pull Request")

---

## 📅 Timeline

| Fecha | Hito |
|-------|------|
| **2025-12-09** | Issue creado (hoy) |
| **2025-12-16** | Entrega sugerida (1 semana) |
| **2025-12-20** | Revisión y feedback |
| **2025-12-23** | Merge si aprobado |

---

## 📎 Referencias

- [Protocolo v2.0](./docs/QUESTION_GENERATION_PROTOCOL_V2.md)
- [Análisis de packs](./docs/reports/colombia-packs-status.md)
- [Instrucciones completas](./docs/reports/jules-instructions-colombia.md)
- [Configuracion Colombia vigente](./config/countries.config.ts)

---

## 💬 Preguntas o Dudas

Si tienes dudas sobre:
- **Protocolo v2.0:** Revisa ejemplos en `matematicas/2.json` y `competencias_ciudadanas/1.json`
- **Contexto cultural:** Consulta `config/countries.config.ts`
- **Temas específicos:** Ve sección completa en `jules-instructions-colombia.md`

Deja comentarios en este issue y te responderemos.

---

## 🎯 Objetivo Final

Al completar esta tarea:
- Grado 9° pasa de **3 packs** a **11 packs** (+267% de contenido)
- Se crea la asignatura **Competencias Ciudadanas** (antes 0 packs)
- Cobertura balanceada de todas las asignaturas ICFES

**Impacto:** ~150 preguntas totales para estudiantes de Grado 9° en Colombia 🇨🇴

---

/cc @jules

---

**Labels:** `enhancement`, `content`, `colombia`, `grado-9`, `protocol-v2`, `jules`
