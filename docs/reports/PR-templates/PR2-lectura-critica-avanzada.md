# 🎯 PR #2: Lectura Crítica Avanzada - 2 Packs (14 Preguntas)

> **Asignado a:** @jules
> **Grado:** 11° (Saber 11)
> **Asignatura:** Lectura Crítica
> **Total preguntas:** 14 (2 packs × 7 preguntas)

---

## 📦 Packs a Generar

| Pack # | Tema | Archivo | Competencia ICFES |
|--------|------|---------|-------------------|
| 2 | Textos argumentativos | `lectura-critica/2.json` | Pensamiento crítico |
| 3 | Análisis de fuentes periodísticas | `lectura-critica/3.json` | Interpretación textual |

---

## 📋 Especificaciones Detalladas

### Pack 2: Textos Argumentativos

**Tema:** Identificar tesis, argumentos, falacias, estructura argumentativa

**Progresión de dificultad:**
1. **v1 (dif. 3):** Identificar tesis principal de columna de opinión
2. **v2 (dif. 1):** Reconocer texto argumentativo vs informativo
3. **v3 (dif. 2):** Identificar ejemplo usado como argumento
4. **v4 (dif. 3):** Detectar falacia ad hominem en debate político
5. **v5 (dif. 3):** Evaluar validez de argumento de autoridad
6. **v6 (dif. 4):** Comparar dos tesis opuestas sobre fracking en Colombia
7. **v7 (dif. 5):** Analizar estructura argumentativa de ensayo sobre paz (Acuerdos de La Habana)

**Fuentes sugeridas:**
- Wikipedia: Artículos sobre argumentación, falacias lógicas
- Khan Academy: Reading & Language Arts
- Custom: Textos de El Tiempo, El Espectador (dominio público)

**Contexto cultural obligatorio:**
- Debate sobre fracking en Colombia (Santander, Casanare)
- Acuerdos de Paz de La Habana (2016)
- Columnas de opinión de El Tiempo/El Espectador
- Nombres colombianos (columnista: María Jimena Duzán, etc.)

---

### Pack 3: Análisis de Fuentes Periodísticas

**Tema:** Credibilidad de fuentes, sesgo, fake news, géneros periodísticos

**Progresión de dificultad:**
1. **v1 (dif. 3):** Distinguir noticia de crónica
2. **v2 (dif. 1):** Identificar titular de fake news obvio
3. **v3 (dif. 2):** Reconocer sesgo en titular sobre paro nacional
4. **v4 (dif. 3):** Evaluar credibilidad de fuente (Semana vs blog desconocido)
5. **v5 (dif. 3):** Identificar uso de eufemismo en política
6. **v6 (dif. 4):** Comparar cobertura del mismo evento en El Tiempo vs El Espectador
7. **v7 (dif. 5):** Detectar manipulación estadística en gráfica sobre economía colombiana

**Fuentes sugeridas:**
- Wikipedia: Periodismo, sesgo mediático, fake news
- Custom: Ejemplos reales de titulares colombianos
- Khan Academy: Media literacy

**Contexto cultural obligatorio:**
- Paro nacional Colombia 2021
- Medios colombianos (El Tiempo, El Espectador, Semana, Caracol, RCN)
- Fake news sobre COVID en Colombia
- Eufemismos políticos colombianos ("falsos positivos" → "casos de ejecuciones extrajudiciales")

---

## 🔍 Tracking de Fuentes

**IMPORTANTE:** Antes de generar, consultar `docs/sources/questions-registry.json`

Para cada pack, agregar entrada como:

```json
{
  "pack_id": "CO-LCR-11-textos-argumentativos-002",
  "source": "Wikipedia",
  "source_url": "https://es.wikipedia.org/wiki/Argumento",
  "source_id": "wikipedia:argumento-2025",
  "original_question_hash": "sha256:...",
  "used_date": "2025-12-17",
  "country": "CO",
  "grado": 11,
  "asignatura": "Lectura Crítica",
  "tema": "Textos argumentativos",
  "pack_file": "api/v1/CO/icfes/11/lectura-critica/2.json",
  "question_ids": ["CO-LCR-11-textos-argumentativos-002-v1", ..., "-v7"],
  "notes": "Adaptado con contexto colombiano - Fracking Santander, Acuerdos de Paz 2016"
}
```

---

## ✅ Checklist de Validación

### Formato Técnico
- [ ] JSON válido (sin errores de sintaxis)
- [ ] 7 preguntas por pack (total 14 preguntas)
- [ ] IDs únicos: `CO-LCR-11-[tema]-[###]-v[1-7]`
- [ ] `protocol_version: "2.0"` presente
- [ ] `creador: "jules"` presente
- [ ] Fecha: `2025-12-17` o posterior

### Contenido Pedagógico
- [ ] Progresión de dificultad correcta por pack
- [ ] Explicaciones de 80+ palabras (Lectura Crítica requiere más análisis)
- [ ] Se analiza cada opción (correcta e incorrectas)
- [ ] Competencias ICFES identificadas
- [ ] Fragmentos de texto REALISTAS (no inventados obviamente)

### Localización Colombia
- [ ] Temas colombianos (Fracking, Paz, paro nacional)
- [ ] Medios colombianos (El Tiempo, El Espectador, Semana)
- [ ] Lenguaje colombiano (ustedes, no vosotros)
- [ ] Nombres colombianos (María Jimena Duzán, columnistas reales)
- [ ] Referencias históricas reales (Acuerdos 2016, paro 2021)

### Tracking de Fuentes
- [ ] `questions-registry.json` actualizado con 2 nuevas entradas
- [ ] `source_url` o `source_id` verificados como NO duplicados
- [ ] Licencias validadas (Wikipedia CC BY-SA, Khan CC BY-NC-SA)
- [ ] Hashes SHA-256 generados para textos custom

---

## 📁 Archivos a Modificar

```
api/v1/CO/icfes/11/lectura-critica/
├── 2.json                    # NUEVO - Textos argumentativos
├── 3.json                    # NUEVO - Fuentes periodísticas
└── index.json                # ACTUALIZAR - agregar packs 2, 3

docs/sources/
└── questions-registry.json   # ACTUALIZAR - agregar 2 entradas
```

---

## 🚀 Workflow

### 1. Preparar Branch
```bash
git checkout -b jules/grado11-pr2-lectura-critica
```

### 2. Generar Packs
- Consultar `questions-registry.json` para evitar duplicados
- Usar fuentes sugeridas (Wikipedia, Khan Academy)
- Adaptar con contexto colombiano (medios, debates, temas actuales)

### 3. Actualizar Registry
```bash
# Agregar 2 entradas a questions-registry.json
# Verificar que source_id sean únicos
```

### 4. Validar
```powershell
# Validar JSON
Get-ChildItem "api/v1/CO/icfes/11/lectura-critica/*.json" -Exclude "index.json" | ForEach-Object {
    Get-Content $_.FullName | ConvertFrom-Json | Out-Null
    Write-Host "✅ $($_.Name)"
}

# Contar preguntas
$total = (Get-ChildItem "api/v1/CO/icfes/11/lectura-critica/[23].json" | ForEach-Object {
    (Get-Content $_.FullName | ConvertFrom-Json).questions.Count
} | Measure-Object -Sum).Sum

Write-Host "Total: $total preguntas (debe ser 14)"
```

### 5. Commit
```bash
git add api/v1/CO/icfes/11/lectura-critica/2.json
git add api/v1/CO/icfes/11/lectura-critica/3.json
git add api/v1/CO/icfes/11/lectura-critica/index.json
git add docs/sources/questions-registry.json

git commit -m "feat(colombia-11): PR #2 - Lectura Crítica avanzada (14 preguntas)

- Pack 2: Textos argumentativos (fracking, Acuerdos de Paz)
- Pack 3: Fuentes periodísticas (El Tiempo, sesgo, fake news)

Fuentes: Wikipedia (argumentación, periodismo), Khan Academy, Custom
Protocol v2.0 (7 preguntas por pack)
Total: 14 preguntas

@jules"
```

### 6. Push y PR
```bash
git push origin jules/grado11-pr2-lectura-critica
```

Luego crear PR en GitHub con título:
```
feat(colombia-11): PR #2 - Lectura Crítica Avanzada (14 preguntas)
```

---

## 📝 Template de Descripción del PR

```markdown
## 📊 Resumen

Este PR agrega **2 packs de Lectura Crítica avanzada** para Colombia Grado 11 siguiendo Protocol v2.0.

### Packs Incluidos

| Pack | Tema | Archivo | Preguntas | Dificultad |
|------|------|---------|-----------|------------|
| 2 | Textos argumentativos | `lectura-critica/2.json` | 7 | 1-2-3-3-3-4-5 |
| 3 | Fuentes periodísticas | `lectura-critica/3.json` | 7 | 1-2-3-3-3-4-5 |

**Total:** 14 preguntas (2 packs × 7 preguntas)

---

## ✅ Checklist de Validación

### Formato Técnico
- [x] JSON válido (sin errores de sintaxis)
- [x] 7 preguntas por pack
- [x] IDs únicos con sufijos `-v1` a `-v7`
- [x] `protocol_version: "2.0"` presente
- [x] `creador: "jules"` presente
- [x] Fecha de generación: 2025-12-17

### Contenido Pedagógico
- [x] Progresión de dificultades: 1-2-3-3-3-4-5
- [x] Explicaciones de 80+ palabras con análisis textual
- [x] Análisis de cada opción (correcta e incorrectas)
- [x] Competencias ICFES identificadas
- [x] Fragmentos de texto realistas

### Localización Colombia
- [x] Temas colombianos (Fracking, Paz, paro)
- [x] Medios colombianos (El Tiempo, El Espectador, Semana)
- [x] Lenguaje colombiano (ustedes)
- [x] Nombres colombianos (María Jimena Duzán, etc.)
- [x] Referencias históricas reales (2016, 2021)

### Tracking de Fuentes
- [x] `questions-registry.json` actualizado (2 entradas)
- [x] Fuentes verificadas como NO duplicadas
- [x] Licencias validadas (Wikipedia CC BY-SA, Khan CC BY-NC-SA)
- [x] Hashes SHA-256 generados

---

## 🎯 Impacto

Este PR es parte del plan de 100+ preguntas para Grado 11:
- Lectura Crítica pasa de 1 pack a **3 packs** (+200% contenido)
- Total preguntas Lectura Crítica: ~7 → **21** (+200%)
- Progreso plan global: **35/105 preguntas** (33%)

---

## 📎 Referencias

- [Plan 100+ Preguntas](../../docs/reports/plan-100-preguntas-grado11.md)
- [Protocolo v2.0](../../docs/QUESTION_GENERATION_PROTOCOL_V2.md)
- [Sistema de Tracking](../../docs/sources/README.md)
- [Questions Registry](../../docs/sources/questions-registry.json)

---

cc: @jules
```

---

## 📅 Timeline

| Fecha | Hito |
|-------|------|
| **2025-12-17** | Inicio de generación |
| **2025-12-23** | Entrega sugerida (1 semana) |
| **2025-12-27** | Revisión y feedback |
| **2025-12-30** | Merge si aprobado |

---

**Creado:** 10 de diciembre de 2025
**Autor:** GitHub Copilot
**Versión:** 1.0
