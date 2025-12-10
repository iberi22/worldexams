# 🎯 PR #3: Ciencias Naturales Avanzadas - 2 Packs (14 Preguntas)

> **Asignado a:** @jules  
> **Grado:** 11° (Saber 11)  
> **Asignatura:** Ciencias Naturales  
> **Total preguntas:** 14 (2 packs × 7 preguntas)

---

## 📦 Packs a Generar

| Pack # | Tema | Archivo | Competencia ICFES |
|--------|------|---------|-------------------|
| 3 | Genética (Leyes de Mendel) | `ciencias-naturales/3.json` | Uso del conocimiento científico |
| 4 | Termodinámica | `ciencias-naturales/4.json` | Explicación de fenómenos |

---

## 📋 Especificaciones Detalladas

### Pack 3: Genética - Leyes de Mendel

**Tema:** Dominancia, recesividad, cuadros de Punnett, herencia mendeliana

**Progresión de dificultad:**
1. **v1 (dif. 3):** Predecir fenotipo en cruce monohíbrido (guisantes)
2. **v2 (dif. 1):** Reconocer alelo dominante vs recesivo
3. **v3 (dif. 2):** Completar cuadro de Punnett simple (Aa × Aa)
4. **v4 (dif. 3):** Calcular probabilidad fenotípica en F1
5. **v5 (dif. 3):** Determinar genotipo de padres a partir de hijos
6. **v6 (dif. 4):** Cruce dihíbrido (AaBb × AaBb) con proporción 9:3:3:1
7. **v7 (dif. 5):** Herencia ligada al sexo (daltonismo en familia colombiana)

**Fuentes sugeridas:**
- Khan Academy: https://www.khanacademy.org/science/biology/classical-genetics
- OpenTDB: Science category (adaptar)
- Wikipedia: Leyes de Mendel, herencia

**Contexto cultural obligatorio:**
- Familia colombiana (nombres: Andrés, Camila, Santiago, Valentina)
- Cultivos colombianos (café arábica vs robusta - variabilidad genética)
- Razas bovinas colombianas (cebú, brahman)
- Daltonismo/hemofilia en contexto familiar

---

### Pack 4: Termodinámica

**Tema:** Calor, temperatura, leyes de termodinámica, energía interna

**Progresión de dificultad:**
1. **v1 (dif. 3):** Distinguir calor de temperatura
2. **v2 (dif. 1):** Identificar proceso endotérmico vs exotérmico
3. **v3 (dif. 2):** Calcular calor específico (calentar agua)
4. **v4 (dif. 3):** Aplicar Q = mcΔT (café en Bogotá)
5. **v5 (dif. 3):** Primera ley de termodinámica (ΔU = Q - W)
6. **v6 (dif. 4):** Eficiencia de máquina térmica (motor de bus TransMilenio)
7. **v7 (dif. 5):** Entropía y segunda ley (refrigeración en Medellín vs clima cálido Cartagena)

**Fuentes sugeridas:**
- Khan Academy: https://www.khanacademy.org/science/physics/thermodynamics
- OpenTDB: Physics category
- Custom: Adaptaciones con contexto colombiano

**Contexto cultural obligatorio:**
- Café en Bogotá (altitud afecta punto de ebullición)
- TransMilenio (motor térm ico, contaminación)
- Clima Medellín (15°C promedio) vs Cartagena (30°C)
- Refrigeración en diferentes altitudes (Bogotá 2600m, Cali 1000m)

---

## 🔍 Tracking de Fuentes

**IMPORTANTE:** Antes de generar, consultar `docs/sources/questions-registry.json`

Para cada pack, agregar entrada como:

```json
{
  "pack_id": "CO-CNA-11-genetica-003",
  "source": "Khan Academy",
  "source_url": "https://www.khanacademy.org/science/biology/classical-genetics/mendelian--genetics",
  "source_id": "khan:genetics-mendel-003",
  "original_question_hash": "sha256:...",
  "used_date": "2025-12-24",
  "country": "CO",
  "grado": 11,
  "asignatura": "Ciencias Naturales",
  "tema": "Genética - Leyes de Mendel",
  "pack_file": "api/v1/CO/icfes/11/ciencias-naturales/3.json",
  "question_ids": ["CO-CNA-11-genetica-003-v1", ..., "-v7"],
  "notes": "Adaptado con contexto colombiano - familia colombiana, café arábica/robusta, razas bovinas"
}
```

---

## ✅ Checklist de Validación

### Formato Técnico
- [ ] JSON válido (sin errores de sintaxis)
- [ ] 7 preguntas por pack (total 14 preguntas)
- [ ] IDs únicos: `CO-CNA-11-[tema]-[###]-v[1-7]`
- [ ] `protocol_version: "2.0"` presente
- [ ] `creador: "jules"` presente
- [ ] Fecha: `2025-12-24` o posterior

### Contenido Pedagógico
- [ ] Progresión de dificultad correcta por pack
- [ ] Explicaciones de 60+ palabras con fundamento científico
- [ ] Se explica el razonamiento científico (no solo la respuesta)
- [ ] Competencias ICFES identificadas
- [ ] Distractores = errores conceptuales comunes

### Localización Colombia
- [ ] Referencias culturales (café, TransMilenio, clima regional)
- [ ] Nombres colombianos (Andrés, Camila, Santiago, Valentina)
- [ ] Contexto geográfico (Bogotá 2600m, Medellín, Cartagena)
- [ ] Especies/razas colombianas (café arábica, brahman)
- [ ] Unidades SI (°C, Joules, no Fahrenheit)

### Tracking de Fuentes
- [ ] `questions-registry.json` actualizado con 2 nuevas entradas
- [ ] `source_url` o `source_id` verificados como NO duplicados
- [ ] Licencias validadas (Khan CC BY-NC-SA, OpenTDB CC BY-SA)
- [ ] Hashes SHA-256 generados para preguntas custom

---

## 📁 Archivos a Modificar

```
api/v1/CO/icfes/11/ciencias-naturales/
├── 3.json                    # NUEVO - Genética (Mendel)
├── 4.json                    # NUEVO - Termodinámica
└── index.json                # ACTUALIZAR - agregar packs 3, 4

docs/sources/
└── questions-registry.json   # ACTUALIZAR - agregar 2 entradas
```

---

## 🚀 Workflow

### 1. Preparar Branch
```bash
git checkout -b jules/grado11-pr3-ciencias-naturales
```

### 2. Generar Packs
- Consultar `questions-registry.json` para evitar duplicados
- Usar fuentes sugeridas (Khan Academy, OpenTDB)
- Adaptar con contexto colombiano (geografía, clima, especies)

### 3. Actualizar Registry
```bash
# Agregar 2 entradas a questions-registry.json
# Verificar que source_id sean únicos
```

### 4. Validar
```powershell
# Validar JSON
Get-ChildItem "api/v1/CO/icfes/11/ciencias-naturales/*.json" -Exclude "index.json" | ForEach-Object {
    Get-Content $_.FullName | ConvertFrom-Json | Out-Null
    Write-Host "✅ $($_.Name)"
}

# Contar preguntas
$total = (Get-ChildItem "api/v1/CO/icfes/11/ciencias-naturales/[34].json" | ForEach-Object {
    (Get-Content $_.FullName | ConvertFrom-Json).questions.Count
} | Measure-Object -Sum).Sum

Write-Host "Total: $total preguntas (debe ser 14)"
```

### 5. Commit
```bash
git add api/v1/CO/icfes/11/ciencias-naturales/3.json
git add api/v1/CO/icfes/11/ciencias-naturales/4.json
git add api/v1/CO/icfes/11/ciencias-naturales/index.json
git add docs/sources/questions-registry.json

git commit -m "feat(colombia-11): PR #3 - Ciencias Naturales avanzadas (14 preguntas)

- Pack 3: Genética - Leyes de Mendel (cuadros Punnett, herencia ligada sexo)
- Pack 4: Termodinámica (leyes, calor específico, entropía)

Fuentes: Khan Academy (biology, physics), OpenTDB (science), Custom
Protocol v2.0 (7 preguntas por pack)
Total: 14 preguntas

@jules"
```

### 6. Push y PR
```bash
git push origin jules/grado11-pr3-ciencias-naturales
```

Luego crear PR en GitHub con título:
```
feat(colombia-11): PR #3 - Ciencias Naturales Avanzadas (14 preguntas)
```

---

## 📝 Template de Descripción del PR

```markdown
## 📊 Resumen

Este PR agrega **2 packs de Ciencias Naturales avanzadas** para Colombia Grado 11 siguiendo Protocol v2.0.

### Packs Incluidos

| Pack | Tema | Archivo | Preguntas | Dificultad |
|------|------|---------|-----------|------------|
| 3 | Genética (Mendel) | `ciencias-naturales/3.json` | 7 | 1-2-3-3-3-4-5 |
| 4 | Termodinámica | `ciencias-naturales/4.json` | 7 | 1-2-3-3-3-4-5 |

**Total:** 14 preguntas (2 packs × 7 preguntas)

---

## ✅ Checklist de Validación

### Formato Técnico
- [x] JSON válido (sin errores de sintaxis)
- [x] 7 preguntas por pack
- [x] IDs únicos con sufijos `-v1` a `-v7`
- [x] `protocol_version: "2.0"` presente
- [x] `creador: "jules"` presente
- [x] Fecha de generación: 2025-12-24

### Contenido Pedagógico
- [x] Progresión de dificultades: 1-2-3-3-3-4-5
- [x] Explicaciones de 60+ palabras con fundamento científico
- [x] Razonamiento científico explicado
- [x] Competencias ICFES identificadas
- [x] Distractores = errores conceptuales comunes

### Localización Colombia
- [x] Referencias culturales (café, TransMilenio, clima)
- [x] Nombres colombianos (Andrés, Camila, etc.)
- [x] Contexto geográfico (Bogotá, Medellín, Cartagena)
- [x] Especies colombianas (café arábica, brahman)
- [x] Unidades SI (°C, J)

### Tracking de Fuentes
- [x] `questions-registry.json` actualizado (2 entradas)
- [x] Fuentes verificadas como NO duplicadas
- [x] Licencias validadas (Khan CC BY-NC-SA, OpenTDB CC BY-SA)
- [x] Hashes SHA-256 generados

---

## 🎯 Impacto

Este PR es parte del plan de 100+ preguntas para Grado 11:
- Ciencias Naturales pasa de 2 packs a **4 packs** (+100% contenido)
- Total preguntas Ciencias Naturales: ~14 → **28** (+100%)
- Progreso plan global: **49/105 preguntas** (47%)

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
| **2025-12-24** | Inicio de generación |
| **2025-12-30** | Entrega sugerida (1 semana) |
| **2026-01-03** | Revisión y feedback |
| **2026-01-06** | Merge si aprobado |

---

**Creado:** 10 de diciembre de 2025  
**Autor:** GitHub Copilot  
**Versión:** 1.0
