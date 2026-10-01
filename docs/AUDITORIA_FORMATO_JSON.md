# Auditoría: formato de bundles y deuda de feedback

> Fecha: 2026-10-01. Mediciones propias con `validate-bundles-v52.mjs`, lectura de los 67
> scripts que tocan `questions_data`, y las 7 skills de `~/.hermes/skills/worldexams*`.
> Esto es lo que YO medí, para contrastar contra la revisión de Fable.

---

## 1. Tu intuición sobre JSON: correcta, y hay un dato que la refuerza

De 2.714 bundles, **2.714 son `.md` y 200 son `.json`** — y los 200 JSON son
**todos de El Salvador, con cero `.md` gemelo**. La distribución no es un
experimento: es un país entero que ya migió (o que se generó en JSON y nunca
volvió a `.md`).

El esquema JSON que existe ya es **correcto y superior al Markdown**:

```json
{
  "id": "SV-CIE-11-2026-W01-investigacion-cientifica-001-MASTERY",
  "country": "SV", "grade": 11, "subject_code": "CIE", "week": 1,
  "bundle_size": 20, "protocol_version": "5.2",
  "questions": [{
    "order": 1, "difficulty": "D4", "bloom": "Understand",
    "stem": "¿Qué proceso convierte luz solar en energía química?",
    "options": [
      {"letter": "A", "text": "Fotosíntesis", "correct": true, "feedback": "¡Correcto!"}
    ],
    "explanation": "La fotosíntesis usa luz, agua y CO₂ para producir glucosa y oxígeno."
  }]
}
```

Lleva `correct: true` **en la opción**, no una clave aparte. Eso es lo que permite
reescribir letras sin romper nada: `scripts/rebalance_answer_letter.py` mueve
`correct` entre opciones y deja el texto intacto. En Markdown hay que reescribir
el `[x]`, la letra Y el `feedback` juntos.

**Conclusión de tu pregunta: JSON es el formato correcto. Y no es inventar nada —
unificar dos cosas que ya existen.**

## 2. El problema grave que encontré: el JSON no lo lee nadie

Recorrí los **67 ficheros** del repo que referencian `questions_data`. Resultado:

- `saberparatodos/scripts/generate-static-packs.js:321` filtra
  `file.startsWith("questions_data/") && file.endsWith(".md")`.
- `scripts/validate-bundles-v52.mjs` exige `/-001-MASTERY-bundle\.md$/`.
- `saberparatodos/scripts/audit-country-readiness.js:101` → `e.name.endsWith('.md')`.
- De los 5 ficheros que leen JSON, los 5 leen **packs** (`public/v1/packs/`), no bundles.

**Ninguna ruta de código lee los 200 JSON de El Salvador.** Son 4.000 preguntas
que el pipeline no puede validar, no puede re-balancear, no puede regenerar.

Y sin embargo SÍ llegaron a producción: `sv-week-1-grade-11-subject-ciencias.json`
contiene `bundle_id: SV-CIE-11-2026-W01-investigacion-cientifica-001-MASTERY-bundle`
con 4 preguntas, `generated_at: 2026-07-28`. Ese pack no lo pudo crear el generador
actual, que no lee JSON. **Hay un segundo generador, no versionado, o fue un paso
manual.** Esto es lo primero que hay que averiguar.

## 3. La calidad de ese JSON: peor que el Markdown

Los 4 valores de feedback en las 16.000 opciones de El Salvador:

| feedback | opciones |
|---|---|
| `Incorrecto. Revisa el concepto.` | 9.600 |
| `¡Correcto!` | 3.200 |
| `Incorrect. Review the concept.` | 2.400 |
| `Correct!` | 800 |

**16.000 de 16.000 son placeholders.** Cero: cero preguntas con el estándar
de las cuatro opciones. Además:

- `bundle_size: 20` pero el JSON trae **4 preguntas** por fichero. El campo miente.
- `city` está **corrupto**: `de` (120 ficheros), `class` (40), `en` (40). No es una
  ciudad; es texto de una frase colado en el campo.
- Todos grade 11, un solo bloque.

Esto explica por qué el gate nunca lo tocó: **no lo ve**.

## 4. La fragmentación que pediste unificar

Hay **7 skills** de worldexams, y el problema no es de contenido sino de que
**cuatro de las siete nunca mencionan el feedback**:

| skill | bytes | ¿menciona feedback? | ¿prescribe ejemplo? | scripts |
|---|---|---|---|---|
| `worldexams-bundle-tick` | 21.240 | sí | **sí** | — |
| `worldexams-question-reviewer` | 2.109 | sí | no | — |
| `worldexams-pipeline` | 5.654 | no | no | — |
| `worldexams-generator` | 1.980 | no | no | `generator.py` |
| `worldexams-curator` | 1.325 | no | no | `curator.py` |
| `worldexams-validator` | 4.251 | no | no | — |
| `worldexams-validator` | 1.519 | no | no | `validator.py` |

Dos hallazgos que no son Cosmic Duck:

**a) Hay dos `worldexams-validator` distintas.** Una de 4.251b que documenta
validación con frontmatter, y otra de 1.519b que habla de un "Esquema JSON".
Se contradicen. Un agente que cargue la primera no sabe que existe la segunda.

**b) Las tres skills con scripts son stubs, y son JSON-based.**

```python
# worldexams-generator/scripts/generator.py
# In a real scenario, this would call MiniMax MCP web_search and then
# generate content
# For now, we simulate the output structure
```

`generator.py` (1.631b), `curator.py` (1.301b) y `validator.py` (2.145b) leen y
escriben **JSON**, no Markdown. Nadie los ejecuta — están ahí como ejemplo.

**Ironía útil: las skills que sí son JSON no funcionan, y las que funcionan
(Markdown) nunca mencionan el estándar de feedback.** El estándar vive solo en
`AGENTS.md` y en un ejemplo concreto de `worldexams-bundle-tick`.

## 5. Los renderizadores: dos parsers distintos para el mismo campo

El feedback se parsea en dos sitios, con dos regex distintas:

```ts
// apps/worldexams-api/src/index.ts:253  (normaliza; acepta JSON o Markdown)
const feedbackMatch = rawText.match(/<!--\s*feedback:\s*([\s\S]*?)\s*-->/);
feedback: String(option?.feedback || feedbackMatch?.[1] || "").trim(),
```

```ts
// saberparatodos/src/lib/preguntas/bundle-fetcher.ts:242  (solo Markdown)
const optionRegex = /^- \[( |x)\] ([A-D])\)\s*([^\n]+)(?:\n\s*<!--\s*feedback:\s*([\s\S]*?)\s*-->)?/gm;
```

La API ya contempla el campo `feedback` estructurado primero y el regex como
respaldo. El frontend no: **si mañana los bundles pasan a JSON, el frontend
recibe `feedback: ''` en silencio y el estudiante nunca ve la explicación.**

Ese es el bug concreto que justifica la migración, y no es teórico.

## 6. El coste real de no migrar

Cada uno de estos es una decisión que ya se tomó 60 veces y hoy se paga:

| Decisión | Consecuencia |
|---|---|
| Plantilla de Jules en inglés con feedback vacío | 486 de 579 fallos |
| `<!-- feedback: -->` en Markdown y no JSON | 4.000 preguntas huérfanas |
| 7 skills, 4 sin el estándar | el agente que cargue cualquiera de ellas genera mal |
| regex en el frontend | el JSON no llegaría al estudiante |
| gate que sólo mira `.md` | 200 ficheros sin control de calidad |

## 7. Lo que propongo, en orden

1. **Averiguar quién generó los packs SV del 2026-07-28.** Sin eso, la migración
   no tiene destinatario conocido.
2. **Arreglar `bundle-fetcher.ts`** para leer `feedback` estructurado antes del
   regex. Es una línea y elimina la trampa silenciosa.
3. **Convertir el gate a JSON como fuente de verdad**, manteniendo `.md` como
   formato de importación. El validador pasa a validar un esquema, no un regex.
4. **Migrar SV (200 ficheros, 4.000 preguntas)** como piloto, porque es el único
   país que ya está en JSON y por tanto el que menos riesgo tiene.
5. **Fusionar las 2 `worldexams-validator`** y poner el estándar de las cuatro
   opciones en las skills que hoy no lo tienen.
6. **Solo entonces** la campaña de reparación de 579 bundles, que es lo que
   bloquea al estudiante hoy.

El orden importa: reparar 579 bundles en Markdown y luego migrar a JSON es
hacer el trabajo dos veces.
