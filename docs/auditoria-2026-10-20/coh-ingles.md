# Auditoría de coherencia pedagógica — Colombia / inglés / grado 11 (ICFES Saber 11)

**Alcance:** `questions_data/colombia/ingles/grado-11/2026/weekly/` — 40 bundles, 800 preguntas (20 por bundle), 40 packs publicados (`apps/worldexams-api/public/v1/packs/co-week-*-grade-11-subject-ingles.json`, 800 preguntas servidas).
**Rol:** auditoría de solo lectura. No se modificó ningún archivo del repo.

**Método (para que el % sea auditable):**
- Lectura completa de 5 bundles: **W01, W10, W20, W30, W40** (100 preguntas, opción por opción).
- Extracción automatizada de **enunciado + opción marcada `[x]` de las 800 preguntas**, y lectura completa de los ~45 ítems marcados como sospechosos por tres filtros (clave que produce oración agramatical, enunciado con hueco sin verbo, enunciado que remite a un texto inexistente).
- Verificación del consumo real en ranked: `apps/worldexams-api/src/ranked.ts` (muestreo, filtros, recuento de letras).
- Verificación de que los defectos están **en producción**: los props del pack JSON conservan el texto tal cual (ej. `co-week-20-grade-11-subject-ingles.json`, `…-bundle-v12`, opción "did").

**Convención de ID:** en todos los bundles el `**ID:**` de la pregunta es el nombre del archivo sin `.md` + `-vNN`. En las tablas se cita el archivo completo y el sufijo `vNN`, que juntos dan el ID exacto (ej. `CO-ING-11-2026-W20-review-p2-001-MASTERY-bundle.md` + `v12` = `CO-ING-11-2026-W20-review-p2-001-MASTERY-bundle-v12`).

---

## Resumen (ingles)

| Métrica | Valor | % |
|---|---|---|
| Preguntas revisadas | 800 / 800 | 100 % |
| Lectura completa opción por opción | 145 (100 de 5 bundles + 45 dirigidas) | 18,1 % |
| Enunciado + clave revisados (todas) | 800 | 100 % |
| **Usables para ranked sin cambios** | **451** | **56,4 %** |
| **Con defecto bloqueante** | **349** | **43,6 %** |
| — sin texto de referencia (irresolubles) | 173 | 21,6 % |
| — duplicado literal + placeholder `{city}` en una opción | 144 | 18,0 % |
| — clave agramatical / sin opción válida / enunciado roto | 30 | 3,8 % |
| — ambigüedad real (dos claves defendibles) | 2 | 0,3 % |
| Defecto **menor** adicional (no bloqueante, sobre ítems contados como usables) | 106 con envoltorio de plantilla + 10 con colocación no estándar + 531 bloques con letras desordenadas | — |

Estructural (sí pasa): 800/800 con 4 opciones, exactamente una `[x]`, letras A–D presentes, feedback en inglés en las 4 opciones, progresión de bandas correcta (D3-D4 160, D5-D6 240, D7-D8 240, D9-D10 160) y claves balanceadas (A 218 / B 206 / C 192 / D 184).

**Lectura de una línea:** el área **no está lista para ranked**. No es un problema de redacción: 2 de cada 5 ítems son irresolubles o repiten otro ítem con un placeholder visible. En un examen ranked de 40 (8 de inglés, 3 packs al azar = 60 candidatos) el valor esperado por examen es **1,7 ítems sin texto que leer, 3,2 ítems con `{city}` en pantalla, 1,4 copias del mismo ítem del árbol y 0,3 ítems con clave rota** — es decir, prácticamente todo examen ranked sale con al menos un ítem imposible de responder.

---

## Defectos bloqueantes

### B1. Clave agramatical, sin opción válida o enunciado roto (32 ítems)

Todos verificados sustituyendo la clave en el hueco y leyendo la oración resultante.

| archivo | ID | problema | evidencia breve | corrección sugerida |
|---|---|---|---|---|
| CO-ING-11-2026-W03-technological-breakthroughs-001-MASTERY-bundle.md | v16 | clave produce cláusula relativa sin verbo | `**C) which**` → "the equipment **which** the university two years ago has since been replaced" | quitar el hueco y usar "which the university bought two years ago"; clave `which` |
| CO-ING-11-2026-W06-economic-trends-001-MASTERY-bundle.md | v11 | participio inicial deja la oración principal sin sujeto; ninguna opción lo aporta | `**B) strengthened**` → "Retail sales having fallen for two quarters, **strengthened** the case…" | rehacer: "…, **that** strengthened the case" o eliminar el ítem |
| CO-ING-11-2026-W06-economic-trends-001-MASTERY-bundle.md | v13 | doble sujeto | `**D) it**` → "Output … having recovered, **it** the national figure … still came in below forecast" | rehacer sin hueco de sujeto (p. ej. clave `however`) |
| CO-ING-11-2026-W06-economic-trends-001-MASTERY-bundle.md | v14 | `had` + verbo en forma base | `**D) had**` → "Sooner **had** the statistical office **release** the revised series than have economists debate…" | clave correcta requiere "released"; el enunciado y las 4 opciones deben regenerarse |
| CO-ING-11-2026-W06-economic-trends-001-MASTERY-bundle.md | v15 | oración principal sin sujeto | `**A) carried**` → "The committee having found no error…, **carried** its recommendation…" | rehacer; ninguna opción da sujeto |
| CO-ING-11-2026-W08-human-rights-001-MASTERY-bundle.md | v13 | doble predicado finito | `**C) had**` → "Scarcely **had** the commission **finished** … **did the tribunal set** a date…" | quitar el "did the tribunal set" sobrante del enunciado |
| CO-ING-11-2026-W11-social-justice-001-MASTERY-bundle.md | v11 | clave agramatical y opción correcta presente; el enunciado ya contiene "none of its members" | `**D) having**` → "The committee, **having none of its members had served**…"; `A) none of whose members` también falla por duplicación | quitar "none of its members" del enunciado; clave `A) none of whose members` |
| CO-ING-11-2026-W11-social-justice-001-MASTERY-bundle.md | v15 | clave agramatical; la correcta está entre los distractores | `**A) having**` → "…, **having** three generations of legal titles **had already been sold**…"; `C) after` → "…, **after** three generations of legal titles had already been sold…" ✅ | clave debe ser `C) after` |
| CO-ING-11-2026-W12-philosophy-ethics-001-MASTERY-bundle.md | v14 | do-support + verbo flexionado | `**A) does**` → "Rarely **does** the question … **separated** the question…"; `D) had` → "Rarely **had** the question … separated…" ✅ | clave debe ser `D) had` |
| CO-ING-11-2026-W12-philosophy-ethics-001-MASTERY-bundle.md | v15 | falta el verbo principal; ninguna opción lo aporta | `**D) does**` → "Little **does** ordinary moral intuition **the burden most philosophers put on it**" (sin verbo) | rehacer con verbo explícito ("carry", "bear") |
| CO-ING-11-2026-W12-philosophy-ethics-001-MASTERY-bundle.md | v16 | regla inventada; "However + adverbio" no invierte | `**D) does**` → "However carefully an argument is stated **does it rest** on an unexamined assumption" | eliminar el ítem; la explicación pedagógica afirma una regla falsa |
| CO-ING-11-2026-W13-urban-development-001-MASTERY-bundle.md | v13 | do-support + `be` + participio | `**B) does**` → "Seldom **does** a pedestrianisation scheme **be reinstated**" | rehacer; la forma correcta sería "is … reinstated" (no ofrecida) |
| CO-ING-11-2026-W13-urban-development-001-MASTERY-bundle.md | v14 | do-support + `be` + participio | `**D) did**` → "Only after … regularised **did its residents be eligible**" | rehacer; `must` es la única opción gramatical y es semánticamente absurda |
| CO-ING-11-2026-W14-digital-citizenship-001-MASTERY-bundle.md | v15 | ninguna opción produce oración válida | `**A) or**` → "If the identity requirement had been dropped **or** more people would have used the archive" | eliminar el ítem; el condicional no está "sin if" |
| CO-ING-11-2026-W15-historical-turning-points-001-MASTERY-bundle.md | v12 | clave afirma lo contrario y falta el sustantivo | `**D) had**` → "the 1919 **had been documented** in a single continuous narrative"; su propio feedback dice "'the 1919 had not been documented'" | reescribir con "had not been" y el sustantivo ("the 1919 uprising") |
| CO-ING-11-2026-W20-review-p2-001-MASTERY-bundle.md | v12 | do-support + `be` + participio | `**B) did**` → "Not until the appeal was dismissed … **did the student be informed**" | rehacer; si se mantiene el "be", la única forma válida es un modal (`must`, semánticamente raro) |
| CO-ING-11-2026-W20-review-p2-001-MASTERY-bundle.md | v14 | do-support + `be` + participio | `**C) did**` → "Only after the malpractice hearing concluded **did the candidate be told** the outcome" | rehacer; `might` es la única opción gramatical |
| CO-ING-11-2026-W24-tourism-heritage-001-MASTERY-bundle.md | v8 | premisa falsa: no hay error en la oración | clave `A)` afirma que "barely two nights" "implica una estancia más larga"; la oración es inglés estándar (= "solo dos noches") | eliminar el ítem |
| CO-ING-11-2026-W25-health-bioethics-001-MASTERY-bundle.md | v16 | do-support + `be` + participio | `**D) did**` → "… **did the side effects be reported** honestly" | rehacer (correcto: "were the side effects reported"/"could … be reported") |
| CO-ING-11-2026-W29-space-exploration-001-MASTERY-bundle.md | v12 | do-support + `be` + participio; no hay opción válida | `**D) did**` → "… **did the capsule be cleared** for launch" | rehacer; requiere `could`, ausente |
| CO-ING-11-2026-W30-review-p3-001-MASTERY-bundle.md | v13 | enunciado truncado: falta el verbo principal | `**D) did**` → "Not until the auditors published the full report **did the truth about the spending**." | añadir "come out" al enunciado |
| CO-ING-11-2026-W30-review-p3-001-MASTERY-bundle.md | v16 | do-support + verbo flexionado | `**D) did**` → "Not once … **did the committee managed** to reach a decision"; `A) has` → "… **has the committee managed**…" ✅ | clave debe ser `A) has` |
| CO-ING-11-2026-W31-financial-literacy-001-MASTERY-bundle.md | v12 | choque de tiempos; no hay opción válida | `**B) did**` → "Not until the compound interest **is** shown net of tax **did the projection look** attractive" | clave debe ser `does` (no ofrecida); regenerar opciones |
| CO-ING-11-2026-W32-youth-culture-001-MASTERY-bundle.md | v13 | do-support + verbo flexionado | `**D) did**` → "Not for years **did the school offered** a single course"; `A) has` → "… **has the school offered**…" ✅ | clave debe ser `A) has` |
| CO-ING-11-2026-W33-conflict-resolution-001-MASTERY-bundle.md | v13 | do-support + verbo flexionado | `**C) did**` → "Rarely **did** a mediation session **produced** a lasting agreement"; `A) has` → "Rarely **has** a mediation session produced…" ✅ | clave debe ser `A) has` |
| CO-ING-11-2026-W35-governance-democracy-001-MASTERY-bundle.md | v13 | do-support + verbo flexionado | `**A) did**` → "Not once … **did the prime minister faced** a vote of no confidence"; `B) has` ✅ | clave debe ser `B) has` |
| CO-ING-11-2026-W38-comprehensive-review-1-001-MASTERY-bundle.md | v15 | do-support + `be` + participio; no hay opción válida | `**B) did**` → "… **did any of the figures be considered** official" | rehacer; requiere `could`, ausente |
| CO-ING-11-2026-W39-comprehensive-review-2-001-MASTERY-bundle.md | v12 | do-support + `be` + participio; no hay opción válida | `**A) did**` → "… **did the error be announced** publicly" | rehacer (correcto: "was the error announced") |
| CO-ING-11-2026-W39-comprehensive-review-2-001-MASTERY-bundle.md | v13 | do-support + `be` + participio; no hay opción válida | `**D) did**` → "… **did the case be closed**" | rehacer (correcto: "was the case closed") |
| CO-ING-11-2026-W39-comprehensive-review-2-001-MASTERY-bundle.md | v15 | do-support + participio sin auxiliar | `**B) did**` → "… **did the auditors allowed** to publish their findings" | rehacer (correcto: "were the auditors allowed") |
| CO-ING-11-2026-W39-comprehensive-review-2-001-MASTERY-bundle.md | v16 | doble `had` | `**B) had**` → "Scarcely **had the marking had finished** than the appeals began" | quitar "had" del enunciado |
| CO-ING-11-2026-W27-migration-diaspora-001-MASTERY-bundle.md | v13 | **ambigüedad**: dos claves defendibles | clave `A) had been speaking`; `D) had spoken` → "The elder daughter **had spoken** no Spanish at all when the family landed" también es correcto | fijar la clave con un contexto que fuerce el continuo ("for years before") |

### B2. Ítem sin texto de referencia — 173 preguntas (21,6 %), en los 40 bundles

El área **no contiene ni un solo pasaje de lectura** (0 archivos con bloque de texto; el `**Contexto:**` mide 55–69 caracteres y siempre es "Discussing <tema> in <ciudad>."). Aun así, 173 ítems empiezan con "According to a recent report on <tema> in <ciudad>, what is implied about…" y su clave es la misma frase comodín.

| archivo | ID (patrón) | problema | evidencia breve | corrección sugerida |
|---|---|---|---|---|
| W01 … W40 (40/40) | `…-bundle-v5` … `v10` (3–6 por bundle; 173 en total) | remite a un "report" que no existe en el bundle; no hay nada que leer | `CO-ING-11-2026-W01-global-issues-001-MASTERY-bundle-v5`: "According to a recent report on global issues in Pereira, what is implied about the role of **Inversion with negative adverbials** in shaping public opinion?" → clave "It serves as a critical tool for nuanced communication." | o bien añadir un pasaje real por bundle, o eliminar los 6 ítems |
| ídem | `…-v9` en W24, W30, W35, W38, W39 | además, el "agente" que supuestamente moldea la opinión pública es una etiqueta gramatical | `CO-ING-11-2026-W30-review-p3-001-MASTERY-bundle-v5`: "…the role of **General Advanced Review** in shaping public opinion" | eliminar: no hay lectura posible |
| ídem | `…-v5` en W01 | etiqueta de currículo en vez de contenido | `…W01-…-v5` habla de "Inversion with negative adverbials"; `…W40-…-v5` de "Final Assessment Prep" | — |

Recuento por bundle (ítems "recent report"): 3 en W07, W18, W24, W26, W36; 6 en W01, W28, W39; 4–5 en el resto.

### B3. Duplicado literal + placeholder `{city}` visible — 144 preguntas (18,0 %)

El mismo ítem ("barking up the wrong tree"), repetido 3–4 veces por bundle cambiando solo el nombre de pila y la ciudad, con la opción `B) They are literally looking for something in the trees of {city}` — **llave de plantilla sin sustituir, en texto que ve el estudiante**. `{city}` aparece 317 veces en el área y en 317 ítems (39,6 %).

| archivo | ID | problema | evidencia breve | corrección sugerida |
|---|---|---|---|---|
| CO-ING-11-2026-W01-global-issues-001-MASTERY-bundle.md | v17, v18, v19 | 3 copias del mismo ítem en el mismo bundle | "Mateo says / Nicolás says / Daniela says: 'I can't help but feel that we are barking up the wrong tree…'" | conservar 1, borrar 2 |
| CO-ING-11-2026-W10-review-p1-001-MASTERY-bundle.md | v17, v18, v19 | ídem | Mariana / Daniela / Nicolás | ídem |
| CO-ING-11-2026-W20-review-p2-001-MASTERY-bundle.md | v17, v18, v19, v20 | **4 copias** | Mateo / Valentina / Alejandro / Daniela | conservar 1, borrar 3 |
| CO-ING-11-2026-W30-review-p3-001-MASTERY-bundle.md | v17, v18, v19, v20 | **4 copias** | Mateo / Daniela / Alejandro / Valentina | ídem |
| CO-ING-11-2026-W40-comprehensive-review-3-001-MASTERY-bundle.md | v17, v19, v20 | 3 copias | Mateo / Valentina / Isabella | ídem |
| 40/40 bundles | `-v17`…`-v20` | `{city}` literal en opción distractora | `<!-- feedback: This restricts the device to specialists in a single city… -->` sobre una opción que dice "{city}" | sustituir por la ciudad del `**Contexto:**` y dejar 1 ítem por bundle |

---

## Defectos menores (agrupados por patrón)

**1. Envoltorio de plantilla sin sentido en el enunciado (151 ítems; 106 con "review pN" como si fuera un tema).**
El estudiante lee "In the context of review p1, which word best completes…" o "Complete the following sentence about comprehensive review 2:". No aporta contexto y delata el generador.
- `CO-ING-11-2026-W10-review-p1-001-MASTERY-bundle-v1`: "In the context of review p1, which word best completes…"
- `CO-ING-11-2026-W30-review-p3-001-MASTERY-bundle-v13`: "Complete the following sentence about review p3: …"
- `CO-ING-11-2026-W39-comprehensive-review-2-001-MASTERY-bundle-v16`: "…about comprehensive review 2: 'Scarcely…'"

**2. Etiqueta "(Topic: …)" entre paréntesis, irrelevante o falsa (210 ítems cloze).**
- `…W10-…-v11`: "(Topic: General Advanced Review)" sobre una inversión con "Hardly".
- `…W30-…-v15`: "(Topic: 'only when' with an inverted past clause)" sobre "Only after".
- `…W24-…-v11`: "(Topic: Adjectives & Adverbs)" sobre "Hardly ___ the new policy been implemented".
No debería verse en un examen; si se conserva, filtra la respuesta.

**3. Colocación no estándar "scarcely … than / … before" (10 ítems en 7 archivos).**
- `CO-ING-11-2026-W22-ai-future-work-001-MASTERY-bundle-v13`: "Scarcely ___ the model finished retraining… **than** its accuracy fell apart".
- `CO-ING-11-2026-W30-review-p3-001-MASTERY-bundle-v14`: "Scarcely ___ the committee finished reading the draft **before** the deadline arrived".
- `CO-ING-11-2026-W17-psychology-wellbeing-001-MASTERY-bundle-v13`: "Scarcely … than the discrepancy…".
Lo estándar es "scarcely … when" o "no sooner … than".

**4. Opciones listadas fuera del orden alfabético (531 de 800 bloques; 40/40 archivos).**
- `…W01-…-v1` lista `[x] B)`, luego `A)`, `C)`, `D)`; `…W02-…-v2` lista `C)` antes de `A)`.
- **Impacto:** ranked reletrea A–D (`ranked.ts`, `String.fromCharCode(65 + i)`), así que ahí no se nota; los packs JSON sí conservan el orden original (`co-week-20-…ingles.json` → `"letter": "B"` primero), y cualquier consumidor de `/v1/questions` lo verá desordenado.

**5. Encabezado inconsistente de la explicación (8 archivos mezclan los dos).**
- `CO-ING-11-2026-W40-comprehensive-review-3-001-MASTERY-bundle.md`: `### Explicacion Pedagogica` en v1 y `### Explicación Pedagógica` desde v2.
- Lo mismo en W02, W03, W04, W31, W37 y otros.

**6. Calibración del bundle fija y contradictoria con su contenido (40/40).**
Los 40 bundles declaran `calibration: {difficulty_band: "D3-D4", expected_success: 0.8}` mientras contienen bloques D9-D10 con `Expected_Success: 0.25–0.34`. Si ranked usa la calibración del pack para ponderar dificultad, está midiendo mal.

**7. Mezcla de niveles incompatible con Saber 11 (varios).**
Triviales para grado 11: `…W40-…-v4` ("reliable = trustworthy"), `…W10-…-v4` ("Although" como concesión), `…W01-…-v4` ("¿qué significa mitigation?"). Y en el otro extremo, gramática C1+ (`cefr_level: "C1+"` en los 40 bundles) muy por encima de lo que evalúa la prueba de inglés de Saber 11 (conviene contrastarlo con el marco publicado del ICFES antes de fijar el techo).

**8. Retroalimentación que contradice su propia clave.**
- `…W05-…-v16`: tema "subjunctive after 'essential that'", feedback "the bare form in the that-clause", clave `B) consults` (indicativa).
- `…W12-…-v14`: el feedback de `D) had` dice "would need the past participle 'separated'" cuando el enunciado ya trae "separated".
- `…W24-…-v8`: feedback "inserting a comparative between them reverses the effect" sobre una oración sin comparativo.
- `…W10-…-v12` (opción B): "'Had the candidates seen' would leave the subject first", afirmación falsa.

**9. Etiqueta de componente ICFES mal asignada.**
`…W10-…-v7` (condicional) y `…W10-…-v9` (estilo indirecto) declaran `**ICFES:** Reading Comprehension` siendo gramática; `…W30-…-v12` declara `Structural Cloze` con una respuesta de tres palabras.

---

## Patrones sistémicos

1. **Generación por plantilla con variables `{tema}`, `{ciudad}`, `{nombre}`.** Cada bundle repite 8 casillas fijas: 1 léxico "social divide", 2–3 léxicos distintos, 1 concesión/condicional, 3–6 "recent report", 1 "Hardly ___ the new policy", 5–6 inversión, 3–4 "barking up the wrong tree", 1–2 "rule of thumb". Tras normalizar ciudad y nombre de pila quedan **526 enunciados únicos de 800**: **34,2 % del corpus es repetición**, y la repetición no es variación: es el mismo ítem con el nombre cambiado.
2. **Un "report" fantasma en el 21,6 % de los ítems.** La plantilla de comprensión asume un texto fuente que el generador nunca produce. Es el defecto más caro: 173 ítems imposibles, y son justo los que ranked etiqueta como `Reading Comprehension`.
3. **Reglas gramaticales inventadas para justificar la clave.** "did … be + participio" ("did the capsule be cleared"), "however + adverbio invierte" ("does it rest"), "'or' introduce el condicional sin if". No es un error de conjugación aislado: el feedback construye una explicación plausible sobre una regla que no existe, así que el ítem además enseña mal.
4. **El defecto mecánico dominante es "auxiliar + verbo ya flexionado".** 14 de los 32 defectos de clave son de esta familia (`did + V-ed`, `does + V-ed`, `did/does + be + participio`, `had + had`). Apunta a que la clave se eligió por la etiqueta del constructo y no leyendo la oración completa.
5. **No hay gate de gramaticalidad.** El validador v5.2 comprueba estructura (4 opciones, una `[x]`, feedback presente) y el gate de feedback comprueba que el feedback explique; **ninguno sustituye la clave en el hueco y comprueba que la oración resultante sea gramatical**. Por eso 32 ítems con clave imposible pasaron todos los gates y están en producción.
6. **El filtro de ranked no cubre estos casos.** `apps/worldexams-api/src/ranked.ts` (líneas ~288–290) descarta si `options.length !== 4`, si no hay exactamente una correcta, y si `PLACEHOLDER_RE` casa en `statement + explanation`. `PLACEHOLDER_RE` solo reconoce `Pregunta de prueba \d+` y `Explicación detallada…` (residuos en español), **no `{city}`, no "recent report", y no mira el texto de las opciones**. Resultado verificado: los 317 ítems con `{city}` y los 173 sin texto entran al pool.
7. **Ausencia total de comprensión de lectura real.** 0 pasajes en 800 preguntas. Para un simulacro de Saber 11 inglés —donde la comprensión es el eje— el área no representa el examen, aunque declare `alignment: "ICFES Saber 11 2026 + DBA MEN 2026"`.
8. **El esquema de opciones está sano; el contenido no.** 800/800 con 4 opciones, una sola `[x]`, letras A–D y feedback en inglés en las 4: el problema no es de formato, es de sustancia. Eso significa que las reparaciones son de contenido, no de pipeline.

---

## Recomendación

**1. Mitigación inmediata (hoy, sin tocar contenido): filtro defensivo en ranked.**
En `apps/worldexams-api/src/ranked.ts`, junto al filtro actual, descartar también:
- `/\{city\}/` sobre `q.statement + q.explanation +` **el texto de cada opción** (hoy las opciones no se revisan);
- `/according to a recent report/i` sobre el enunciado;
- `/review p\d|comprehensive review \d/i` sobre el enunciado (envoltorio de plantilla).
Efecto: el pool de inglés baja de 800 a ~451 por área y, con `RANKED_PACKS_PER_AREA = 3`, quedan ~36 candidatos por examen (por encima de los 8 necesarios y del `RANKED_MIN_POOL_PER_AREA = 24`). Es la única corrección que se puede desplegar sin regenerar contenido y elimina, de golpe, los 317 ítems rotos por plantilla.

**2. Retirar del pool ranked hasta regenerar (18 bundles con clave rota).**
Orden de prioridad por densidad de defectos:
- **Regeneración completa (≥3 defectos):** `W39` (v12, v13, v15, v16), `W06` (v11, v13, v14, v15), `W12` (v14, v15, v16).
- **Reparación puntual (1–2 defectos):** `W03 v16`, `W08 v13`, `W11 v11 y v15`, `W13 v13 y v14`, `W14 v15`, `W15 v12`, `W20 v12 y v14`, `W24 v8`, `W25 v16`, `W29 v12`, `W30 v13 y v16`, `W31 v12`, `W32 v13`, `W33 v13`, `W35 v13`, `W38 v15`, `W27 v13` (ambigüedad).
Los 22 bundles restantes pueden quedarse **solo si** se aplica el filtro del punto 1, porque su aporte limpio es de 11–14 ítems por bundle.

**3. Regenerar los 144 ítems "barking up the wrong tree": 1 por bundle, no 3–4.**
Sustituir `{city}` por la ciudad del `**Contexto:**` y borrar las copias. Esto recupera 40 ítems usables y elimina 104 duplicados; es la corrección mecánica de mejor relación coste/beneficio del área.

**4. Eliminar (no reparar) los 173 ítems "recent report".**
Sin texto fuente no hay ítem. Repararlos exige escribir un pasaje por bundle: eso es contenido nuevo, no una corrección. Si se decide escribirlo, que sea **un pasaje por bundle** con 4–6 preguntas encadenadas, no 6 pasajes imaginarios con la misma clave comodín.

**5. Regenerar el banco con cinco condiciones de entrada** (para que este informe no se repita):
- un texto fuente real por bundle y preguntas que solo se puedan responder con él;
- gate de gramaticalidad: sustituir la clave en el hueco y verificar la oración completa (habría cazado los 32 de B1);
- dedupe por enunciado normalizado (ciudad y nombres sustituidos) contra todo el corpus del área; máximo 1 copia por constructo;
- prohibir `{…}` y "(Topic: …)" en cualquier texto visible (regex en el validador);
- revisión humana de la clave en los ítems de inversión/condicional, que es donde se concentra el 100 % de los errores de B1.

**6. No usar la calibración actual para ranked.** Los 40 bundles declaran D3-D4/0,8 con ítems D9-D10 de 0,25; si el muestreo pondera por dificultad, está midiendo mal. Recalcular por bundle o ignorar el campo.

**7. Cobertura.** Con 451 ítems usables (11,3 por bundle) el área alcanza para ranked solo después del filtro del punto 1; para que el examen de 40 preguntas (8 de inglés) sea defendible hacen falta ~150–200 ítems limpios y distintos, hoy hay ~451 usables pero con 106 marcados por el envoltorio de plantilla. La meta realista es regenerar W01–W10 desde cero y reutilizar W11–W40 solo tras los puntos 2 y 3.

---

*Auditoría de solo lectura. No se modificó ningún archivo en `apps/worldexams`. Los recuentos (800 preguntas, 173 "recent report", 317 `{city}`, 144 "wrong tree", 526 enunciados únicos, 32 defectos de clave) salen de recorrer los 40 archivos y los 40 packs publicados, no de una muestra.*
