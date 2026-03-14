# 🎯 PR #1: Matemáticas Avanzadas - 3 Packs (21 Preguntas)

> **Asignado a:** @jules
> **Grado:** 11° (Saber 11)
> **Asignatura:** Matemáticas
> **Total preguntas:** 21 (3 packs × 7 preguntas)

---

## 📦 Packs a Generar

| Pack # | Tema | Archivo | Competencia ICFES |
|--------|------|---------|-------------------|
| 5 | Trigonometría | `matematicas/5.json` | Razonamiento cuantitativo |
| 6 | Probabilidad avanzada | `matematicas/6.json` | Resolución de problemas |
| 7 | Cálculo diferencial (límites) | `matematicas/7.json` | Pensamiento matemático |

---

## 📋 Especificaciones Detalladas

### Pack 5: Trigonometría

**Tema:** Funciones trigonométricas, identidades, aplicaciones

**Progresión de dificultad:**
1. **v1 (dif. 3):** Evaluar sen, cos, tan en ángulos notables (30°, 45°, 60°)
2. **v2 (dif. 1):** Reconocer valores de seno en círculo unitario
3. **v3 (dif. 2):** Calcular coseno de ángulo usando calculadora
4. **v4 (dif. 3):** Aplicar identidad pitagórica (sen² + cos² = 1)
5. **v5 (dif. 3):** Resolver ecuación trigonométrica simple
6. **v6 (dif. 4):** Problema de altura (edificio Torre Colpatria Bogotá)
7. **v7 (dif. 5):** Navegación en río Magdalena (ángulos de elevación/depresión)

**Fuentes sugeridas:**
- Khan Academy: https://www.khanacademy.org/math/trigonometry
- OpenTDB: Mathematics category (adaptar)
- Custom: Problemas con contexto colombiano

**Contexto cultural obligatorio:**
- Torre Colpatria (Bogotá - 196m)
- Río Magdalena (navegación)
- Ángulos en Puente Pumarejo (Barranquilla)

---

### Pack 6: Probabilidad Avanzada

**Tema:** Probabilidad condicional, eventos independientes, distribuciones

**Progresión de dificultad:**
1. **v1 (dif. 3):** Probabilidad de sacar bola roja de urna
2. **v2 (dif. 1):** Identificar evento seguro vs imposible
3. **v3 (dif. 2):** Calcular probabilidad con monedas
4. **v4 (dif. 3):** Probabilidad de llover en Medellín (datos meteorológicos)
5. **v5 (dif. 3):** Eventos independientes (lanzar 2 dados)
6. **v6 (dif. 4):** Probabilidad condicional (COVID en Colombia 2020)
7. **v7 (dif. 5):** Distribución binomial (votos elecciones colombianas)

**Fuentes sugeridas:**
- OpenTDB: https://opentdb.com (Statistics)
- Khan Academy: Probability
- Custom: Datos reales de Colombia (DANE, Meteorología)

**Contexto cultural obligatorio:**
- Datos meteorológicos de Medellín (lluvia frecuente)
- Estadísticas COVID Colombia (DANE)
- Elecciones presidenciales Colombia

---

### Pack 7: Cálculo Diferencial (Límites)

**Tema:** Concepto de límite, continuidad, límites al infinito

**Progresión de dificultad:**
1. **v1 (dif. 3):** Calcular límite algebraico simple
2. **v2 (dif. 1):** Reconocer gráfica de función continua
3. **v3 (dif. 2):** Evaluar límite por sustitución directa
4. **v4 (dif. 3):** Límite lateral (función partida)
5. **v5 (dif. 3):** Límite al infinito (función racional)
6. **v6 (dif. 4):** Resolver indeterminación 0/0
7. **v7 (dif. 5):** Aplicar L'Hôpital (velocidad de crecimiento población Bogotá)

**Fuentes sugeridas:**
- Khan Academy: https://www.khanacademy.org/math/differential-calculus
- OpenTDB: Advanced Mathematics
- Custom: Modelos de crecimiento poblacional Colombia

**Contexto cultural obligatorio:**
- Crecimiento poblacional Bogotá (DANE)
- Velocidad de expansión urbana Medellín
- Límites de capacidad TransMilenio

---

## 🔍 Tracking de Fuentes

**IMPORTANTE:** Antes de generar, consultar `docs/sources/questions-registry.json`

Para cada pack, agregar entrada como:

```json
{
  "pack_id": "CO-MAT-11-trigonometria-005",
  "source": "Khan Academy",
  "source_url": "https://www.khanacademy.org/math/trigonometry/unit-circle-trig-func",
  "source_id": "khan:trig-005",
  "original_question_hash": "sha256:...",
  "used_date": "2025-12-10",
  "country": "CO",
  "grado": 11,
  "asignatura": "Matemáticas",
  "tema": "Trigonometría",
  "pack_file": "api/v1/CO/icfes/11/matematicas/5.json",
  "question_ids": ["CO-MAT-11-trigonometria-005-v1", ..., "CO-MAT-11-trigonometria-005-v7"],
  "notes": "Adaptado con contexto colombiano - Torre Colpatria, río Magdalena"
}
```

---

## ✅ Checklist de Validación

### Formato Técnico
- [ ] JSON válido (sin errores de sintaxis)
- [ ] 7 preguntas por pack (total 21 preguntas)
- [ ] IDs únicos: `CO-MAT-11-[tema]-[###]-v[1-7]`
- [ ] `protocol_version: "2.0"` presente
- [ ] `creador: "jules"` presente
- [ ] Fecha: `2025-12-10` o posterior

### Contenido Pedagógico
- [ ] Progresión de dificultad correcta por pack
- [ ] Explicaciones de 50+ palabras con verificaciones matemáticas
- [ ] Se explica por qué cada opción incorrecta está mal
- [ ] Competencias ICFES identificadas
- [ ] Distractores = errores comunes reales (no opciones absurdas)

### Localización Colombia
- [ ] Referencias culturales (Torre Colpatria, río Magdalena, TransMilenio)
- [ ] Moneda en COP ($) si hay ejemplos numéricos
- [ ] Lenguaje colombiano (ustedes, no vosotros)
- [ ] Nombres comunes (María, Juan, Camilo, Sofía, Andrés)
- [ ] Datos reales de Colombia (DANE, meteorología)

### Tracking de Fuentes
- [ ] `questions-registry.json` actualizado con 3 nuevas entradas
- [ ] `source_url` o `source_id` verificados como NO duplicados
- [ ] Licencias validadas (CC BY, CC BY-SA, CC BY-NC-SA)
- [ ] Hashes SHA-256 generados para preguntas custom

---

## 📁 Archivos a Modificar

```
api/v1/CO/icfes/11/matematicas/
├── 5.json                    # NUEVO - Trigonometría
├── 6.json                    # NUEVO - Probabilidad
├── 7.json                    # NUEVO - Cálculo
└── index.json                # ACTUALIZAR - agregar packs 5, 6, 7

docs/sources/
└── questions-registry.json   # ACTUALIZAR - agregar 3 entradas
```

---

## 🚀 Workflow

### 1. Preparar Branch
```bash
git checkout -b jules/grado11-pr1-matematicas
```

### 2. Generar Packs
- Consultar `questions-registry.json` para evitar duplicados
- Usar fuentes sugeridas (Khan Academy, OpenTDB)
- Adaptar con contexto colombiano

### 3. Actualizar Registry
```bash
# Agregar 3 entradas a questions-registry.json
# Verificar que source_id sean únicos
```

### 4. Validar
```powershell
# Validar JSON
Get-ChildItem "api/v1/CO/icfes/11/matematicas/*.json" -Exclude "index.json" | ForEach-Object {
    Get-Content $_.FullName | ConvertFrom-Json | Out-Null
    Write-Host "✅ $($_.Name)"
}

# Contar preguntas
$total = (Get-ChildItem "api/v1/CO/icfes/11/matematicas/[567].json" | ForEach-Object {
    (Get-Content $_.FullName | ConvertFrom-Json).questions.Count
} | Measure-Object -Sum).Sum

Write-Host "Total: $total preguntas (debe ser 21)"
```

### 5. Commit
```bash
git add api/v1/CO/icfes/11/matematicas/5.json
git add api/v1/CO/icfes/11/matematicas/6.json
git add api/v1/CO/icfes/11/matematicas/7.json
git add api/v1/CO/icfes/11/matematicas/index.json
git add docs/sources/questions-registry.json

git commit -m "feat(colombia-11): PR #1 - Matemáticas avanzadas (21 preguntas)

- Pack 5: Trigonometría (Torre Colpatria, río Magdalena)
- Pack 6: Probabilidad avanzada (datos DANE, meteorología)
- Pack 7: Cálculo diferencial (crecimiento Bogotá, TransMilenio)

Fuentes: Khan Academy (trig, calculus), OpenTDB (stats), Custom
Protocol v2.0 (7 preguntas por pack)
Total: 21 preguntas

@jules"
```

### 6. Push y PR
```bash
git push origin jules/grado11-pr1-matematicas
```

Luego crear PR en GitHub con título:
```
feat(colombia-11): PR #1 - Matemáticas Avanzadas (21 preguntas)
```

---

## 📝 Template de Descripción del PR

```markdown
## 📊 Resumen

Este PR agrega **3 packs de Matemáticas avanzadas** para Colombia Grado 11 siguiendo Protocol v2.0.

### Packs Incluidos

| Pack | Tema | Archivo | Preguntas | Dificultad |
|------|------|---------|-----------|------------|
| 5 | Trigonometría | `matematicas/5.json` | 7 | 1-2-3-3-3-4-5 |
| 6 | Probabilidad avanzada | `matematicas/6.json` | 7 | 1-2-3-3-3-4-5 |
| 7 | Cálculo diferencial | `matematicas/7.json` | 7 | 1-2-3-3-3-4-5 |

**Total:** 21 preguntas (3 packs × 7 preguntas)

---

## ✅ Checklist de Validación

### Formato Técnico
- [x] JSON válido (sin errores de sintaxis)
- [x] 7 preguntas por pack
- [x] IDs únicos con sufijos `-v1` a `-v7`
- [x] `protocol_version: "2.0"` presente
- [x] `creador: "jules"` presente
- [x] Fecha de generación: 2025-12-10

### Contenido Pedagógico
- [x] Progresión de dificultades: 1-2-3-3-3-4-5
- [x] Explicaciones de 50+ palabras con verificaciones
- [x] Explicación de opciones incorrectas
- [x] Competencias ICFES identificadas
- [x] Distractores plausibles (errores comunes)

### Localización Colombia
- [x] Referencias culturales (Torre Colpatria, río Magdalena, TransMilenio)
- [x] Moneda en COP ($)
- [x] Lenguaje colombiano (ustedes)
- [x] Nombres comunes en Colombia
- [x] Datos reales (DANE, meteorología)

### Tracking de Fuentes
- [x] `questions-registry.json` actualizado (3 entradas)
- [x] Fuentes verificadas como NO duplicadas
- [x] Licencias validadas (Khan Academy CC BY-NC-SA, OpenTDB CC BY-SA)
- [x] Hashes SHA-256 generados

---

## 🎯 Impacto

Este PR es parte del plan de 100+ preguntas para Grado 11:
- Matemáticas pasa de 4 packs a **7 packs** (+75% contenido)
- Total preguntas Matemáticas: ~28 → **49** (+75%)
- Progreso plan global: **21/105 preguntas** (20%)

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
| **2025-12-10** | Inicio de generación |
| **2025-12-16** | Entrega sugerida (1 semana) |
| **2025-12-20** | Revisión y feedback |
| **2025-12-23** | Merge si aprobado |

---

**Creado:** 10 de diciembre de 2025
**Autor:** GitHub Copilot
**Versión:** 1.0
