# 🎯 Instrucciones para @jules - Generación de Packs Colombia

> **Asignación:** Generar packs de preguntas para Colombia (ICFES)
> **Protocolo:** v2.0 (7 preguntas por pack)
> **Fase inicial:** Grado 9° (Saber 9)
> **Tag:** `@jules` para activar

---

## 📋 Contexto

Hemos analizado los packs existentes de Colombia y encontramos que **el Grado 9° necesita urgentemente más contenido**. Actualmente tiene solo 3 packs (1 por asignatura) y le faltan packs de Competencias Ciudadanas.

**Documento de análisis completo:** [colombia-packs-status.md](./colombia-packs-status.md)

---

## 🎯 Tarea Asignada - Fase 1

### Objetivo

Crear **8 nuevos packs** para Grado 9° siguiendo el Protocolo v2.0:

| Asignatura | Pack # | Tema Sugerido | Archivo Output |
|------------|--------|---------------|----------------|
| **Matemáticas** | 2 | Ecuaciones lineales | `CO-MAT-09-ecuaciones-002.json` |
| **Matemáticas** | 3 | Geometría (áreas y perímetros) | `CO-MAT-09-geometria-003.json` |
| **Lenguaje** | 2 | Comprensión inferencial | `CO-LEN-09-inferencial-002.json` |
| **Lenguaje** | 3 | Tipología textual | `CO-LEN-09-tipologia-003.json` |
| **Ciencias Naturales** | 2 | Ecosistemas colombianos | `CO-CNA-09-ecosistemas-002.json` |
| **Ciencias Naturales** | 3 | Reacciones químicas | `CO-CNA-09-quimica-003.json` |
| **Competencias Ciudadanas** | 1 | Derechos fundamentales | `CO-CIU-09-derechos-001.json` |
| **Competencias Ciudadanas** | 2 | Convivencia y paz | `CO-CIU-09-convivencia-002.json` |

**Total:** 8 packs × 7 preguntas = **56 preguntas**

---

## 📖 Protocolo v2.0 - Resumen Ejecutivo

### Estructura de Cada Pack

Cada archivo JSON debe contener **exactamente 7 preguntas** organizadas así:

| # | Tipo | Dificultad | ID Suffix | Descripción |
|---|------|------------|-----------|-------------|
| 1 | Original | 3 | `-v1` | Pregunta base con contexto colombiano |
| 2 | Fácil A | 1 | `-v2` | Versión simplificada - reconocimiento básico |
| 3 | Fácil B | 2 | `-v3` | Versión simplificada - contexto diferente |
| 4 | Media A | 3 | `-v4` | Aplicación práctica con cultura local |
| 5 | Media B | 3 | `-v5` | Análisis o comparación |
| 6 | Difícil A | 4 | `-v6` | Multi-paso o síntesis |
| 7 | Difícil B | 5 | `-v7` | Razonamiento complejo |

### Formato de ID

```
CO-[ASIGNATURA]-09-[TEMA]-[###]-v[1-7]
```

**Ejemplos:**
- `CO-MAT-09-ecuaciones-002-v1` (Matemáticas, pack 2, pregunta 1)
- `CO-LEN-09-inferencial-002-v3` (Lenguaje, pack 2, pregunta 3)
- `CO-CIU-09-derechos-001-v7` (Ciudadanas, pack 1, pregunta 7)

---

## 🇨🇴 Contextualización Cultural - Colombia

### Elementos Obligatorios

Cada pack debe incluir referencias culturales colombianas:

| Categoría | Elementos a Usar |
|-----------|------------------|
| **Ciudades** | Bogotá, Medellín, Cali, Barranquilla, Cartagena, Bucaramanga |
| **Moneda** | Pesos colombianos (COP) - usar símbolo `$` |
| **Personajes** | Gabriel García Márquez, Shakira, James Rodríguez, Mariana Pajón |
| **Comidas** | Bandeja paisa, ajiaco, arepa, empanadas |
| **Fiestas** | Carnaval de Barranquilla, Feria de Cali, Feria de las Flores |
| **Geografía** | Andes, Caribe, Amazonas, Pacífico, Orinoquía |
| **Institución** | ICFES (Instituto Colombiano para la Evaluación de la Educación) |

### Ejemplo de Contextualización

❌ **MAL (sin contexto):**
```json
{
  "statement": "Si un producto cuesta 200 y tiene un descuento del 15%, ¿cuánto pagas?",
  "options": [...]
}
```

✅ **BIEN (con contexto colombiano):**
```json
{
  "statement": "En una tienda Éxito de Medellín, unos tenis Nike cuestan $200,000 COP. Si hay una promoción del 15% de descuento, ¿cuánto dinero ahorras?",
  "options": [
    {
      "id": "a",
      "text": "$30,000 COP",
      "isCorrect": true
    },
    {
      "id": "b",
      "text": "$170,000 COP",
      "isCorrect": false
    },
    {
      "id": "c",
      "text": "$15,000 COP",
      "isCorrect": false
    },
    {
      "id": "d",
      "text": "$185,000 COP",
      "isCorrect": false
    }
  ],
  "explanation": "El 15% de $200,000 es: 0.15 × 200,000 = $30,000 COP. Este es el ahorro.\n\n**¿Por qué las otras opciones están mal?**\n- **B ($170,000):** Esto es el precio final con descuento, no el ahorro.\n- **C ($15,000):** Error común al calcular 15% de 100 en lugar de 200,000.\n- **D ($185,000):** Suma incorrecta del descuento al precio.\n\n**Competencia evaluada:** Razonamiento cuantitativo - porcentajes y aplicaciones comerciales."
}
```

---

## 📁 Estructura JSON Esperada

### Metadata Global (top del archivo)

```json
{
  "id": "CO-[ASIGNATURA]-09-[TEMA]-[###]",
  "country": "CO",
  "grado": 9,
  "asignatura": "[Asignatura completa en español]",
  "tema": "[Tema específico]",
  "protocol_version": "2.0",
  "total_questions": 7,
  "estado": "draft",
  "creador": "jules",
  "generation_date": "2025-12-09",
  "source": "OpenTDB",
  "source_url": "https://opentdb.com",
  "source_license": "CC BY-SA 4.0",
  "questions": [...]
}
```

### Estructura de Cada Pregunta

```json
{
  "id": "CO-[ASIGNATURA]-09-[TEMA]-[###]-v[1-7]",
  "difficulty": 1-5,
  "type": "multiple_choice",
  "statement": "[Enunciado con contexto colombiano]",
  "options": [
    {
      "id": "a",
      "text": "[Opción A]",
      "isCorrect": true
    },
    {
      "id": "b",
      "text": "[Opción B]",
      "isCorrect": false
    },
    {
      "id": "c",
      "text": "[Opción C]",
      "isCorrect": false
    },
    {
      "id": "d",
      "text": "[Opción D]",
      "isCorrect": false
    }
  ],
  "explanation": "[Explicación detallada de por qué A es correcta y por qué B, C, D están incorrectas]",
  "competencia": "[Competencia específica del currículo ICFES]"
}
```

---

## ✅ Checklist de Validación

Antes de crear el PR, verifica que cada pack cumpla con:

### Formato Técnico
- [ ] Archivo JSON válido (sin errores de sintaxis)
- [ ] Exactamente 7 preguntas por pack
- [ ] IDs únicos con sufijo `-v1` a `-v7`
- [ ] Campo `protocol_version: "2.0"` presente
- [ ] Campo `creador: "jules"` presente
- [ ] Fecha de generación correcta

### Contenido Pedagógico
- [ ] Distribución de dificultades: 2 fáciles, 3 medias, 2 difíciles
- [ ] Explicaciones de 50+ palabras por pregunta
- [ ] Se explica por qué cada opción incorrecta está mal
- [ ] Competencia ICFES identificada en cada pregunta
- [ ] Distractores representan errores comunes (no opciones absurdas)

### Localización Colombia
- [ ] Al menos 1 referencia cultural por pack (ciudad, comida, personaje)
- [ ] Moneda en COP ($) si hay ejemplos numéricos
- [ ] Lenguaje colombiano (no "vosotros", usar "ustedes")
- [ ] Nombres comunes en Colombia (María, Juan, Camilo, Sofía)
- [ ] Contexto geográfico correcto (ciudades reales, clima apropiado)

### Progresión de Dificultad
- [ ] v1 (Original): Pregunta estándar del tema
- [ ] v2-v3 (Fáciles): Reconocimiento básico, sin pasos complejos
- [ ] v4-v5 (Medias): Aplicación práctica, análisis simple
- [ ] v6-v7 (Difíciles): Multi-paso, síntesis, razonamiento complejo

---

## 📂 Estructura de Directorios

Los archivos generados deben ir en:

```
api/v1/CO/icfes/9/[asignatura]/[numero].json
```

**Mapeo de asignaturas:**

| Asignatura | Directorio | Ejemplo |
|------------|-----------|---------|
| Matemáticas | `matematicas/` | `matematicas/2.json` |
| Lenguaje | `lenguaje/` | `lenguaje/2.json` |
| Ciencias Naturales | `ciencias_naturales/` | `ciencias_naturales/2.json` |
| Competencias Ciudadanas | `competencias_ciudadanas/` | `competencias_ciudadanas/1.json` |

**Nota:** Si el directorio no existe (ej: `competencias_ciudadanas`), créalo.

---

## 🎓 Temas Específicos por Asignatura

### Matemáticas Pack 2 - Ecuaciones Lineales

**Conceptos a evaluar:**
- Resolución de ecuaciones de primer grado
- Despeje de variables
- Problemas verbales traducidos a ecuaciones
- Verificación de soluciones

**Progresión de dificultad:**
1. **v1 (Media):** Ecuación simple tipo `2x + 5 = 13`
2. **v2 (Fácil):** Reconocer si un valor es solución
3. **v3 (Fácil):** Ecuación sin paréntesis
4. **v4 (Media):** Problema verbal con ecuación
5. **v5 (Media):** Ecuación con paréntesis y distribución
6. **v6 (Difícil):** Ecuación con fracciones
7. **v7 (Difícil):** Problema de dos ecuaciones simultáneas

---

### Matemáticas Pack 3 - Geometría

**Conceptos a evaluar:**
- Áreas de figuras planas (triángulo, rectángulo, círculo)
- Perímetros
- Teorema de Pitágoras
- Problemas aplicados con medidas

**Progresión de dificultad:**
1. **v1 (Media):** Área de un rectángulo conocidos base y altura
2. **v2 (Fácil):** Perímetro de un cuadrado
3. **v3 (Fácil):** Identificar fórmula correcta de área de triángulo
4. **v4 (Media):** Calcular área de una cancha de fútbol en Colombia
5. **v5 (Media):** Área de figura compuesta (dos rectángulos)
6. **v6 (Difícil):** Problema con Teorema de Pitágoras
7. **v7 (Difícil):** Optimización de área con perímetro fijo

---

### Lenguaje Pack 2 - Comprensión Inferencial

**Conceptos a evaluar:**
- Inferir información no explícita
- Identificar el propósito del autor
- Deducir significado de palabras por contexto
- Predecir consecuencias

**Progresión de dificultad:**
1. **v1 (Media):** Leer párrafo sobre Cartagena, inferir clima
2. **v2 (Fácil):** Identificar tono (alegre, triste, serio)
3. **v3 (Fácil):** Propósito básico (informar, entretener, persuadir)
4. **v4 (Media):** Inferir causa de un evento en el texto
5. **v5 (Media):** Deducir significado de palabra desconocida
6. **v6 (Difícil):** Inferir relación entre dos personajes
7. **v7 (Difícil):** Predecir desenlace basado en pistas

---

### Lenguaje Pack 3 - Tipología Textual

**Conceptos a evaluar:**
- Identificar tipo de texto (narrativo, expositivo, argumentativo)
- Reconocer estructura textual
- Identificar recursos literarios
- Diferenciar entre hecho y opinión

**Progresión de dificultad:**
1. **v1 (Media):** Clasificar texto como narrativo/expositivo/argumentativo
2. **v2 (Fácil):** Reconocer un cuento vs una noticia
3. **v3 (Fácil):** Identificar introducción, desarrollo, conclusión
4. **v4 (Media):** Reconocer metáfora en texto literario colombiano
5. **v5 (Media):** Diferenciar hecho de opinión en artículo
6. **v6 (Difícil):** Analizar estructura argumentativa (tesis, argumentos)
7. **v7 (Difícil):** Identificar múltiples recursos literarios

---

### Ciencias Naturales Pack 2 - Ecosistemas Colombianos

**Conceptos a evaluar:**
- Biodiversidad de Colombia (5 regiones naturales)
- Relaciones entre seres vivos (cadenas alimentarias)
- Adaptaciones al medio
- Conservación y amenazas

**Progresión de dificultad:**
1. **v1 (Media):** Identificar productores, consumidores, descomponedores en ecosistema amazónico
2. **v2 (Fácil):** Reconocer animales del Caribe colombiano
3. **v3 (Fácil):** Identificar región natural de Colombia en foto
4. **v4 (Media):** Explicar cadena alimentaria en páramo
5. **v5 (Media):** Comparar ecosistema Andino vs Pacífico
6. **v6 (Difícil):** Predecir efecto de deforestación en Amazonas
7. **v7 (Difícil):** Analizar problema de especies invasoras (ej: hipopótamos de Escobar)

---

### Ciencias Naturales Pack 3 - Reacciones Químicas

**Conceptos a evaluar:**
- Concepto de reacción química
- Reactivos y productos
- Conservación de la masa
- Tipos de reacciones (síntesis, descomposición)

**Progresión de dificultad:**
1. **v1 (Media):** Identificar reactivos y productos en ecuación simple
2. **v2 (Fácil):** Reconocer cambio físico vs químico (cocinar arepas)
3. **v3 (Fácil):** Símbolo químico de elementos comunes (Fe, O, H)
4. **v4 (Media):** Balancear ecuación simple
5. **v5 (Media):** Aplicar conservación de masa en reacción
6. **v6 (Difícil):** Clasificar tipo de reacción
7. **v7 (Difícil):** Problema estequiométrico básico

---

### Competencias Ciudadanas Pack 1 - Derechos Fundamentales

**Conceptos a evaluar:**
- Constitución Política de Colombia (1991)
- Derechos fundamentales (vida, igualdad, libertad)
- Deberes ciudadanos
- Mecanismos de protección (tutela, derecho de petición)

**Progresión de dificultad:**
1. **v1 (Media):** Identificar derecho fundamental vulnerado en caso
2. **v2 (Fácil):** Reconocer año de actual Constitución (1991)
3. **v3 (Fácil):** Listar derechos fundamentales
4. **v4 (Media):** Determinar cuándo usar tutela
5. **v5 (Media):** Relacionar derecho con deber correspondiente
6. **v6 (Difícil):** Analizar conflicto de derechos (libertad vs seguridad)
7. **v7 (Difícil):** Caso complejo con múltiples derechos afectados

---

### Competencias Ciudadanas Pack 2 - Convivencia y Paz

**Conceptos a evaluar:**
- Resolución pacífica de conflictos
- Empatía y manejo de emociones
- Acuerdos y normas de convivencia
- Diversidad y pluralidad

**Progresión de dificultad:**
1. **v1 (Media):** Identificar estrategia de resolución de conflicto
2. **v2 (Fácil):** Reconocer emoción en situación dada
3. **v3 (Fácil):** Elegir comportamiento empático
4. **v4 (Media):** Evaluar consecuencias de acciones en conflicto
5. **v5 (Media):** Proponer acuerdo para convivencia en colegio
6. **v6 (Difícil):** Analizar dilema moral en contexto colombiano
7. **v7 (Difícil):** Evaluar política pública de paz en Colombia

---

## 🚀 Workflow de Generación

### Paso 1: Preparar Prompt

Para cada pack, usa este template de prompt:

```
Genera un pack de preguntas v2.0 para Colombia Grado 9°.

**Asignatura:** [Matemáticas/Lenguaje/Ciencias/Ciudadanas]
**Tema:** [Tema específico]
**Pack número:** [#]

Requisitos:
- Exactamente 7 preguntas siguiendo protocolo v2.0
- Dificultades: 1, 2, 3, 3, 3, 4, 5
- Contexto cultural colombiano (ciudades: Bogotá, Medellín, Cali)
- Moneda en pesos colombianos (COP)
- IDs: CO-[ASIG]-09-[TEMA]-[###]-v[1-7]
- Explicaciones de 50+ palabras
- Competencias ICFES identificadas

Formato JSON según estructura especificada.
```

---

### Paso 2: Generar Contenido

Usa tu herramienta de generación preferida (Claude, GPT-4, Gemini) con el protocolo completo como contexto.

---

### Paso 3: Validar

Ejecuta checklist de validación (ver arriba).

---

### Paso 4: Crear PR

```bash
# Crear branch
git checkout -b jules/grado9-phase1

# Agregar archivos
git add api/v1/CO/icfes/9/matematicas/2.json
git add api/v1/CO/icfes/9/matematicas/3.json
git add api/v1/CO/icfes/9/lenguaje/2.json
# ... (resto de archivos)

# Commit
git commit -m "feat(colombia): agregar 8 packs Grado 9 - Fase 1

- Matemáticas: ecuaciones lineales, geometría
- Lenguaje: comprensión inferencial, tipología textual
- Ciencias Naturales: ecosistemas colombianos, reacciones químicas
- Competencias Ciudadanas: derechos fundamentales, convivencia y paz

Protocolo v2.0 (7 preguntas por pack)
Total: 56 preguntas generadas

@jules"

# Push
git push origin jules/grado9-phase1
```

---

### Paso 5: Crear Pull Request

**Título del PR:**
```
feat(colombia): Agregar 8 packs Grado 9 - Fase 1 by @jules
```

**Descripción del PR:**

```markdown
## 📋 Resumen

Este PR agrega **8 nuevos packs de preguntas** para Colombia Grado 9° siguiendo el Protocolo v2.0.

### Packs Incluidos

| Asignatura | Pack # | Tema | Archivo | Preguntas |
|------------|--------|------|---------|-----------|
| Matemáticas | 2 | Ecuaciones lineales | `matematicas/2.json` | 7 |
| Matemáticas | 3 | Geometría | `matematicas/3.json` | 7 |
| Lenguaje | 2 | Comprensión inferencial | `lenguaje/2.json` | 7 |
| Lenguaje | 3 | Tipología textual | `lenguaje/3.json` | 7 |
| Ciencias Naturales | 2 | Ecosistemas colombianos | `ciencias_naturales/2.json` | 7 |
| Ciencias Naturales | 3 | Reacciones químicas | `ciencias_naturales/3.json` | 7 |
| Competencias Ciudadanas | 1 | Derechos fundamentales | `competencias_ciudadanas/1.json` | 7 |
| Competencias Ciudadanas | 2 | Convivencia y paz | `competencias_ciudadanas/2.json` | 7 |

**Total:** 56 preguntas (8 packs × 7 preguntas)

---

## ✅ Checklist de Validación

### Formato Técnico
- [x] JSON válido (sin errores de sintaxis)
- [x] 7 preguntas por pack
- [x] IDs únicos con sufijos `-v1` a `-v7`
- [x] `protocol_version: "2.0"` presente
- [x] `creador: "jules"` presente
- [x] Fecha de generación: 2025-12-09

### Contenido Pedagógico
- [x] Distribución de dificultades: 2-3-2 (fácil-media-difícil)
- [x] Explicaciones de 50+ palabras
- [x] Explicación de opciones incorrectas
- [x] Competencias ICFES identificadas
- [x] Distractores plausibles (errores comunes)

### Localización Colombia
- [x] Referencias culturales (ciudades, comida, personajes)
- [x] Moneda en COP ($)
- [x] Lenguaje colombiano (ustedes, no vosotros)
- [x] Nombres comunes en Colombia
- [x] Contexto geográfico correcto

---

## 🎯 Impacto

Este PR completa la **Fase 1** del plan de contenido para Colombia:
- Grado 9° pasa de 3 packs a **11 packs** (+267% de contenido)
- Se crea nueva asignatura: Competencias Ciudadanas (antes 0 packs)
- Cobertura balanceada de todas las asignaturas oficiales ICFES

---

## 👀 Revisión Solicitada

Por favor revisar:
1. **Calidad pedagógica:** ¿Las preguntas evalúan correctamente los conceptos?
2. **Contextualización:** ¿Las referencias culturales son apropiadas y precisas?
3. **Progresión de dificultad:** ¿La escalera 1-2-3-3-3-4-5 se respeta?
4. **Distractores:** ¿Representan errores comunes de estudiantes colombianos de 9°?

---

## 📎 Referencias

- [Protocolo v2.0](../../docs/QUESTION_GENERATION_PROTOCOL_V2.md)
- [Análisis de packs](../../docs/reports/colombia-packs-status.md)
- [Configuración Colombia](../../saberparatodos/config/country.ts)

---

cc: @jules
```

---

## 🎓 Recursos Adicionales

### Ejemplos de Packs Existentes (para referencia)

Revisa estos packs bien formados:

- `api/v1/CO/icfes/11/matematicas/1.json` (pack grande, bien estructurado)
- `api/v1/CO/icfes/11/lectura_critica/1.json` (explicaciones detalladas)
- `api/v1/CO/icfes/11/sociales_y_ciudadanas/1.json` (buen contexto colombiano)

### Herramientas de Validación

```bash
# Validar sintaxis JSON
cat api/v1/CO/icfes/9/matematicas/2.json | jq .

# Contar preguntas
cat api/v1/CO/icfes/9/matematicas/2.json | jq '.questions | length'

# Verificar IDs únicos
cat api/v1/CO/icfes/9/matematicas/2.json | jq '.questions[].id'
```

---

## 🤝 Soporte

Si tienes dudas o necesitas clarificación:
1. **Revisa el [Protocolo v2.0](../QUESTION_GENERATION_PROTOCOL_V2.md)** completo
2. **Consulta el [análisis de packs](./colombia-packs-status.md)**
3. **Pregunta en el PR** o issue correspondiente

---

## 📅 Timeline

| Fecha | Hito |
|-------|------|
| **2025-12-09** | Inicio de Fase 1 (este documento) |
| **2025-12-16** | Entrega de 8 packs Grado 9 |
| **2025-12-23** | Revisión y merge (si aprobado) |
| **2026-01-06** | Inicio Fase 2 (Grado 5) |

---

¡Buena suerte con la generación, @jules! 🚀

---

*Documento generado por GitHub Copilot*
*Versión: 1.0 | Fecha: 2025-12-09*
