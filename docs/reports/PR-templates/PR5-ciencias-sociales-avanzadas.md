# 🎯 PR #5: Ciencias Sociales Avanzadas - 3 Packs (21 Preguntas)

> **Asignado a:** @jules  
> **Grado:** 11° (Saber 11)  
> **Asignatura:** Ciencias Sociales  
> **Total preguntas:** 21 (3 packs × 7 preguntas)

---

## 📦 Packs a Generar

| Pack # | Tema | Archivo | Competencia ICFES |
|--------|------|---------|-------------------|
| 3 | Revolución Industrial | `ciencias-sociales/3.json` | Pensamiento histórico |
| 4 | Geografía económica | `ciencias-sociales/4.json` | Pensamiento espacial |
| 5 | Sistemas políticos | `ciencias-sociales/5.json` | Participación democrática |

---

## 📋 Especificaciones Detalladas

### Pack 3: Revolución Industrial

**Tema:** Causas, consecuencias, transformaciones sociales, tecnológicas, económicas

**Progresión de dificultad:**
1. **v1 (dif. 3):** Identificar invención clave (máquina de vapor)
2. **v2 (dif. 1):** Reconocer país donde inició (Inglaterra)
3. **v3 (dif. 2):** Identificar sector transformado (textil)
4. **v4 (dif. 3):** Entender consecuencia social (urbanización)
5. **v5 (dif. 3):** Analizar condiciones laborales (obreros, explotación)
6. **v6 (dif. 4):** Comparar Revolución Industrial con Revolución Digital
7. **v7 (dif. 5):** Evaluar impacto en Colombia (tardío, siglo XX, café)

**Fuentes sugeridas:**
- Wikipedia: https://es.wikipedia.org/wiki/Revolución_Industrial
- Khan Academy: World History (Industrial Revolution)
- Custom: Impacto en Colombia (industria cafetera, ferrocarriles)

**Contexto cultural obligatorio:**
- Impacto tardío en Colombia (siglo XX)
- Ferrocarriles en Colombia (Antioquia, Cundinamarca)
- Industria cafetera como motor económico
- Comparar con industrialización en América Latina

---

### Pack 4: Geografía Económica

**Tema:** Recursos naturales, comercio, sectores económicos, desarrollo regional

**Progresión de dificultad:**
1. **v1 (dif. 3):** Identificar sector económico (primario, secundario, terciario)
2. **v2 (dif. 1):** Reconocer recurso natural de Colombia (petróleo, carbón)
3. **v3 (dif. 2):** Identificar departamento productor de café (Caldas, Quindío)
4. **v4 (dif. 3):** Entender concepto de balanza comercial
5. **v5 (dif. 3):** Analizar exportaciones de Colombia (carbón, café, petróleo)
6. **v6 (dif. 4):** Comparar desarrollo regional (Bogotá vs Chocó)
7. **v7 (dif. 5):** Evaluar impacto de TLC (Colombia-USA, 2012) en agricultura

**Fuentes sugeridas:**
- Wikipedia: Economía de Colombia, recursos naturales
- Khan Academy: Economics (trade, resources)
- Custom: Datos DANE, sectores económicos Colombia

**Contexto cultural obligatorio:**
- Recursos: petróleo (Casanare, Meta), carbón (La Guajira, Cesar), café (Eje Cafetero)
- Exportaciones colombianas (DANE)
- TLC Colombia-USA (2012)
- Desigualdad regional (Bogotá, Medellín vs Chocó, Guainía)
- Ecopetrol, Cerrejón

---

### Pack 5: Sistemas Políticos

**Tema:** Democracia, dictadura, monarquía, separación de poderes

**Progresión de dificultad:**
1. **v1 (dif. 3):** Identificar tipo de sistema político (democracia, dictadura)
2. **v2 (dif. 1):** Reconocer característica de democracia (voto popular)
3. **v3 (dif. 2):** Identificar poder del Estado (ejecutivo, legislativo, judicial)
4. **v4 (dif. 3):** Entender concepto de "checks and balances"
5. **v5 (dif. 3):** Analizar diferencia presidencialismo vs parlamentarismo
6. **v6 (dif. 4):** Comparar sistema colombiano vs venezolano (democracia vs autoritarismo)
7. **v7 (dif. 5):** Evaluar riesgos de concentración de poder (caso Venezuela, Nicaragua)

**Fuentes sugeridas:**
- Wikipedia: Democracia, sistemas políticos, separación de poderes
- Khan Academy: Government (political systems)
- Custom: Constitución de Colombia 1991

**Contexto cultural obligatorio:**
- Constitución Colombia 1991 (separación de poderes)
- Congreso (Senado, Cámara), Presidencia, Corte Constitucional
- Comparar con sistemas latinoamericanos (Chile, Argentina, Venezuela)
- Evitar sesgos políticos (lenguaje neutral)
- Casos recientes sin polarizar (Venezuela como ejemplo de autoritarismo)

---

## 🔍 Tracking de Fuentes

**IMPORTANTE:** Antes de generar, consultar `docs/sources/questions-registry.json`

Para cada pack, agregar entrada como:

```json
{
  "pack_id": "CO-CSO-11-revolucion-industrial-003",
  "source": "Wikipedia",
  "source_url": "https://es.wikipedia.org/wiki/Revolución_Industrial",
  "source_id": "wikipedia:revolucion-industrial-003",
  "original_question_hash": "sha256:...",
  "used_date": "2026-01-07",
  "country": "CO",
  "grado": 11,
  "asignatura": "Ciencias Sociales",
  "tema": "Revolución Industrial",
  "pack_file": "api/v1/CO/icfes/11/ciencias-sociales/3.json",
  "question_ids": ["CO-CSO-11-revolucion-industrial-003-v1", ..., "-v7"],
  "notes": "Adaptado con contexto colombiano - impacto tardío, café, ferrocarriles"
}
```

---

## ✅ Checklist de Validación

### Formato Técnico
- [ ] JSON válido (sin errores de sintaxis)
- [ ] 7 preguntas por pack (total 21 preguntas)
- [ ] IDs únicos: `CO-CSO-11-[tema]-[###]-v[1-7]`
- [ ] `protocol_version: "2.0"` presente
- [ ] `creador: "jules"` presente
- [ ] Fecha: `2026-01-07` o posterior

### Contenido Pedagógico
- [ ] Progresión de dificultad correcta por pack
- [ ] Explicaciones de 70+ palabras (historia requiere más contexto)
- [ ] Análisis histórico/geográfico/político fundamentado
- [ ] Competencias ICFES identificadas
- [ ] Distractores basados en errores comunes

### Localización Colombia
- [ ] Impacto en Colombia (Revolución Industrial tardía, café)
- [ ] Recursos colombianos (petróleo, carbón, café)
- [ ] Regiones (Eje Cafetero, La Guajira, Casanare)
- [ ] Constitución 1991, separación de poderes
- [ ] Lenguaje neutral (evitar sesgos políticos)

### Tracking de Fuentes
- [ ] `questions-registry.json` actualizado con 3 nuevas entradas
- [ ] `source_url` o `source_id` verificados como NO duplicados
- [ ] Licencias validadas (Wikipedia CC BY-SA, Khan CC BY-NC-SA)
- [ ] Hashes SHA-256 generados para preguntas custom

---

## 📁 Archivos a Modificar

```
api/v1/CO/icfes/11/ciencias-sociales/
├── 3.json                    # NUEVO - Revolución Industrial
├── 4.json                    # NUEVO - Geografía económica
├── 5.json                    # NUEVO - Sistemas políticos
└── index.json                # ACTUALIZAR - agregar packs 3, 4, 5

docs/sources/
└── questions-registry.json   # ACTUALIZAR - agregar 3 entradas
```

---

## 🚀 Workflow

### 1. Preparar Branch
```bash
git checkout -b jules/grado11-pr5-ciencias-sociales
```

### 2. Generar Packs
- Consultar `questions-registry.json` para evitar duplicados
- Usar fuentes sugeridas (Wikipedia, Khan Academy)
- Adaptar con contexto colombiano (historia, geografía, política)
- **Importante:** Lenguaje neutral en sistemas políticos

### 3. Actualizar Registry
```bash
# Agregar 3 entradas a questions-registry.json
# Verificar que source_id sean únicos
```

### 4. Validar
```powershell
# Validar JSON
Get-ChildItem "api/v1/CO/icfes/11/ciencias-sociales/*.json" -Exclude "index.json" | ForEach-Object {
    Get-Content $_.FullName | ConvertFrom-Json | Out-Null
    Write-Host "✅ $($_.Name)"
}

# Contar preguntas
$total = (Get-ChildItem "api/v1/CO/icfes/11/ciencias-sociales/[345].json" | ForEach-Object {
    (Get-Content $_.FullName | ConvertFrom-Json).questions.Count
} | Measure-Object -Sum).Sum

Write-Host "Total: $total preguntas (debe ser 21)"
```

### 5. Commit
```bash
git add api/v1/CO/icfes/11/ciencias-sociales/3.json
git add api/v1/CO/icfes/11/ciencias-sociales/4.json
git add api/v1/CO/icfes/11/ciencias-sociales/5.json
git add api/v1/CO/icfes/11/ciencias-sociales/index.json
git add docs/sources/questions-registry.json

git commit -m "feat(colombia-11): PR #5 - Ciencias Sociales avanzadas (21 preguntas)

- Pack 3: Revolución Industrial (impacto en Colombia, café)
- Pack 4: Geografía económica (recursos, TLC, DANE)
- Pack 5: Sistemas políticos (Constitución 1991, separación poderes)

Fuentes: Wikipedia (historia, economía, política), Khan Academy, Custom
Protocol v2.0 (7 preguntas por pack)
Total: 21 preguntas

@jules"
```

### 6. Push y PR
```bash
git push origin jules/grado11-pr5-ciencias-sociales
```

Luego crear PR en GitHub con título:
```
feat(colombia-11): PR #5 - Ciencias Sociales Avanzadas (21 preguntas) - 🎉 COMPLETO 105 PREGUNTAS
```

---

## 📝 Template de Descripción del PR

```markdown
## 📊 Resumen

Este PR agrega **3 packs de Ciencias Sociales avanzadas** para Colombia Grado 11 siguiendo Protocol v2.0.

🎉 **¡Este PR completa el objetivo de 100+ preguntas!**

### Packs Incluidos

| Pack | Tema | Archivo | Preguntas | Dificultad |
|------|------|---------|-----------|------------|
| 3 | Revolución Industrial | `ciencias-sociales/3.json` | 7 | 1-2-3-3-3-4-5 |
| 4 | Geografía económica | `ciencias-sociales/4.json` | 7 | 1-2-3-3-3-4-5 |
| 5 | Sistemas políticos | `ciencias-sociales/5.json` | 7 | 1-2-3-3-3-4-5 |

**Total:** 21 preguntas (3 packs × 7 preguntas)

---

## ✅ Checklist de Validación

### Formato Técnico
- [x] JSON válido (sin errores de sintaxis)
- [x] 7 preguntas por pack
- [x] IDs únicos con sufijos `-v1` a `-v7`
- [x] `protocol_version: "2.0"` presente
- [x] `creador: "jules"` presente
- [x] Fecha de generación: 2026-01-07

### Contenido Pedagógico
- [x] Progresión de dificultades: 1-2-3-3-3-4-5
- [x] Explicaciones de 70+ palabras con contexto histórico
- [x] Análisis histórico/geográfico/político
- [x] Competencias ICFES identificadas
- [x] Distractores basados en errores comunes

### Localización Colombia
- [x] Impacto en Colombia (Revolución Industrial, café)
- [x] Recursos colombianos (petróleo, carbón, café)
- [x] Regiones (Eje Cafetero, La Guajira, Casanare)
- [x] Constitución 1991, separación de poderes
- [x] Lenguaje neutral (evitar sesgos)

### Tracking de Fuentes
- [x] `questions-registry.json` actualizado (3 entradas)
- [x] Fuentes verificadas como NO duplicadas
- [x] Licencias validadas (Wikipedia CC BY-SA, Khan CC BY-NC-SA)
- [x] Hashes SHA-256 generados

---

## 🎯 Impacto

Este PR **COMPLETA** el plan de 100+ preguntas para Grado 11:

### Ciencias Sociales
- Packs: 2 → **5** (+150%)
- Preguntas: ~14 → **35** (+150%)

### Global Grado 11
- **Progreso plan global:** 105/105 preguntas (100%) ✅
- **Total packs:** 13 → 28 (+115%)
- **Total preguntas:** ~91 → ~196 (+115%)

### Desglose por PR
| PR | Asignatura | Packs | Preguntas | Estado |
|----|------------|-------|-----------|--------|
| #1 | Matemáticas | 3 | 21 | ✅ Merged |
| #2 | Lectura Crítica | 2 | 14 | ✅ Merged |
| #3 | Ciencias Naturales | 2 | 14 | ✅ Merged |
| #4 | Sociales/Inglés/Info | 5 | 35 | ✅ Merged |
| #5 | Ciencias Sociales | 3 | 21 | 🔄 Este PR |
| **TOTAL** | **7 asignaturas** | **15** | **105** | **🎉 COMPLETO** |

---

## 📎 Referencias

- [Plan 100+ Preguntas](../../docs/reports/plan-100-preguntas-grado11.md)
- [Protocolo v2.0](../../docs/QUESTION_GENERATION_PROTOCOL_V2.md)
- [Sistema de Tracking](../../docs/sources/README.md)
- [Questions Registry](../../docs/sources/questions-registry.json)

---

cc: @jules

🎉 **¡Objetivo cumplido!** Este PR cierra el plan de 105 preguntas para Colombia Grado 11.
```

---

## 📅 Timeline

| Fecha | Hito |
|-------|------|
| **2026-01-07** | Inicio de generación |
| **2026-01-13** | Entrega sugerida (1 semana) |
| **2026-01-17** | Revisión y feedback |
| **2026-01-20** | Merge si aprobado - 🎉 OBJETIVO CUMPLIDO |

---

## 🎊 Celebración Final

Al completar este PR:
- ✅ 105 preguntas generadas bajo Protocol v2.0
- ✅ 15 packs nuevos agregados
- ✅ 7 asignaturas cubiertas
- ✅ 5 PRs completados en 5 semanas
- ✅ Sistema de tracking anti-duplicación implementado
- ✅ 100% de preguntas con contexto cultural colombiano
- ✅ Todas las fuentes documentadas y validadas

**¡Gracias @jules por este trabajo!** 🚀

---

**Creado:** 10 de diciembre de 2025  
**Autor:** GitHub Copilot  
**Versión:** 1.0
