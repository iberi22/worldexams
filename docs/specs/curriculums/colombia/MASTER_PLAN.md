# 🇨🇴 Plan Maestro de Mejora — Currículo por Grados Colombia (3–11)

Versión: 1.0
Fecha: 2026-06-04
Autor: WorldExams Agent
Estado: Activo — implementación priorizada

## 📋 Resumen Ejecutivo
Actualmente la plataforma saberparatodos tiene contenido solo para grado 11 en los bundles fuente (questions_data/colombia/) y packs servidos. Los grados 3 a 10 carecen de casi todo el contenido requerido por el MEN y el ICFES.
Este plan establece:

- Protocolos de generación por grado alineados con DBA del MEN y marcos de referencia ICFES
- Mallas curriculares desglosadas por periodo (1-4) para cada grado y asignatura
- Plan de generación priorizado para cerrar los gaps de contenido
- Estructura de directorios para organizar los bundles por grado/periodo/tema

## 🎯 Diagnóstico Actual (Junio 2026)
Contenido Existente

| Grado | Asignaturas | Bundles Fuente | Packs Servidos | Preg. Únicas | Estado |
|-------|-------------|----------------|----------------|--------------|--------|
| 3 | Inglés, Lectura | ❌ Ninguno | 4 packs | 140 | ❌ CRÍTICO |
| 4 | Inglés | ❌ Ninguno | 2 packs | 110 | ❌ CRÍTICO |
| 5 | Inglés | ❌ Ninguno | 2 packs | 130 | ❌ CRÍTICO |
| 6 | Inglés | ❌ Ninguno | 2 packs | 160 | ❌ CRÍTICO |
| 7 | Inglés | ❌ Ninguno | 2 packs | 240 | ❌ CRÍTICO |
| 8 | Inglés | ❌ Ninguno | 2 packs | 270 | ❌ CRÍTICO |
| 9 | Inglés | ❌ Ninguno | 2 packs | 279 | ❌ CRÍTICO |
| 10 | Inglés | ❌ Ninguno | 2 packs | 396 | ❌ CRÍTICO |
| 11 | 5 materias ICFES | ✅ 184 bundles | 20 packs | 3,844+ | ✅ COMPLETO |

## 📐 Alineación Curricular MEN + ICFES
### Marco Legal
- Ley 115 de 1994 (Ley General de Educación) — Estructura el sistema educativo colombiano
- Decreto 1860 de 1994 — Reglamenta la organización curricular
- Estándares Básicos de Competencias (EBC) — MEN, 2006
- Derechos Básicos de Aprendizaje (DBA) — MEN, V2 2017
- Lineamientos Curriculares — MEN, áreas fundamentales
- Matrices de Referencia ICFES — Estructura de las pruebas Saber

### Evaluaciones ICFES por Grado
| Prueba | Grados | Áreas Evaluadas |
|--------|--------|-----------------|
| Saber 3° | 3° | Lenguaje (Lectura), Matemáticas |
| Saber 5° | 5° | Lenguaje (Lectura+Escritura), Matemáticas, Ciencias Naturales, Competencias Ciudadanas |
| Saber 7° | 7° | Lenguaje (Lectura+Escritura), Matemáticas, Ciencias Naturales, Competencias Ciudadanas |
| Saber 9° | 9° | Lenguaje (Lectura+Escritura), Matemáticas, Ciencias Naturales, Competencias Ciudadanas |
| Saber 11° | 11° | Lectura Crítica, Matemáticas, Sociales+Ciudadanas, Ciencias Naturales, Inglés |

### Distribución por Periodos (Estructura Académica Colombiana)
Cada año escolar colombiano tiene 4 periodos académicos de aproximadamente 10 semanas cada uno:

| Periodo | Meses | Semanas | Enfoque |
|---------|-------|---------|---------|
| P1 | Febrero - Abril | 10 | Fundamentos, conceptos base |
| P2 | Abril - Junio | 10 | Desarrollo, aplicación |
| P3 | Julio - Septiembre | 10 | Profundización |
| P4 | Septiembre - Noviembre | 10 | Síntesis, evaluación, preparación Saber |

## 📚 Mallas Curriculares por Grado (Basadas en DBA + Estándares MEN)

(Ver mallas completas en skills/bundle-creator/rules/CO.md)

## 📋 Estructura de Directorios Requerida
`questions_data/colombia/`
├── `matematicas/`
│   ├── `grado-3/`
│   │   ├── `periodo-1/`
│   │   │   ├── `numeros-10000/`
│   │   │   ├── `descomposicion-aditiva/`
│   │   │   └── `suma-resta/`
│   │   ├── `periodo-2/`
│   │   ├── `periodo-3/`
│   │   └── `periodo-4/`
│   ├── `grado-4/`
│   ├── ...
│   └── `grado-11/`
├── `lectura-critica/`
├── `ciencias-naturales/`
├── `sociales-ciudadanas/`
├── `ingles/`
└── `LEGACY/`

## 🚀 Plan de Generación Priorizado
### Fase 1 — Urgente: Cerrar gap crítico grados 3-9 (8 semanas)
1. Grado 6° (80 bundles)
2. Grado 3° (48 bundles)
3. Grado 5° (80 bundles)
4. Grado 4° (48 bundles)
5. Grado 7° (80 bundles)
6. Grado 9° (80 bundles)
7. Grado 10° (80 bundles)
8. Grado 8° (80 bundles)

## 📐 Especificaciones de Bundles por Grado

| Grado | Tamaño Bundle | Dificultad | Bloom's recomendado |
|-------|---------------|------------|---------------------|
| 3° | 10 preg | D2-D6 | Remember, Understand, Apply |
| 4° | 10 preg | D2-D7 | Remember, Understand, Apply |
| 5° | 15 preg | D3-D8 | Remember, Understand, Apply, Analyze |
| 6° | 15 preg | D3-D8 | Remember, Understand, Apply, Analyze |
| 7° | 15 preg | D3-D9 | Understand, Apply, Analyze |
| 8° | 20 preg | D3-D9 | Understand, Apply, Analyze, Evaluate |
| 9° | 20 preg | D3-D10 | Apply, Analyze, Evaluate |
| 10° | 20 preg | D4-D10 | Apply, Analyze, Evaluate |
| 11° | 20 preg | D3-D10 | Apply, Analyze, Evaluate, Create |
