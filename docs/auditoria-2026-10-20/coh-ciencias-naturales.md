# Auditoría de coherencia pedagógica — `ciencias-naturales`, grado 11 (Colombia)

**Alcance:** `/home/belal/proyectosSWAL/apps/worldexams/questions_data/colombia/ciencias-naturales/grado-11/2026/weekly/`
**Modo:** solo lectura. No se modificó ni creó nada dentro del repo.
**Fecha:** 2026-10-20

---

## Resumen (ciencias-naturales)

**Qué revisé**

- 40 bundles, 800 preguntas (`total_questions: 20` en cada uno, verificado: 800 bloques `## Question N`).
- **5 bundles leídos completos (100 preguntas, 12,5% del área):** `W01`, `W10`, `W20`, `W30`, `W40`.
- Además verifiqué por script sobre **las 800 preguntas** cuatro cosas que no dependen de leer: LaTeX roto, contexto de plantilla, duplicados entre semanas y orden/etiquetado de opciones.
- Comprobé que **los 40 packs están publicados**: `co-week-{1..40}-grade-11-subject-ciencias_naturales` aparecen en `apps/worldexams-api/public/v1/packs/_manifest.json` (40/40). Es decir, **todo este directorio alimenta el pool de RANKED** (`apps/worldexams-api/src/ranked.ts`, `RANKED_PACKS_PER_AREA = 3`, 8 preguntas por área).

**Números de la muestra (100 preguntas)**

| Categoría | N | % |
|---|---|---|
| Clave incorrecta o ambigua (bloqueante) | 2 | **2%** |
| Error factual grave en el estímulo | 1 (incluida arriba: W20 Q5) | 1% |
| Defecto menor visible, requiere edición | 38 | **38%** |
| **Listas para ranked sin cambios** | **60** | **60%** |
| De esas 60, baja discriminación (distractores absurdos o nivel primaria) | 12 | → **~48% recomendable** |

**Números del corpus (800 preguntas, verificación automática)**

| Defecto medible | N | % |
|---|---|---|
| LaTeX roto en algún campo (`ightarrow`, `cdot`, `^circ`, `$pi$`, `$mu`, TAB, salto de línea dentro de `$…$`) | 57 | 7,1% |
| LaTeX roto en **enunciado u opciones** (lo que el estudiante necesita para responder) | 13 | 1,6% |
| Expresión `$…$` con salto de línea real → **la app no la renderiza** (el regex de `MathRenderer.svelte` es `[^\$\n]+?`) | 21 | 2,6% |
| Contexto generado con plantilla “`sobre <tema>, <Nombre> analiza/resuelve…`” | 181 (en 9 bundles, 20/20 cada uno) | 22,6% |
| Contexto breve “En clase en `<ciudad>`…” (decorativo) | 187 | 23,4% |
| Opciones listadas fuera del orden A→D | 396 | 49,5% (no afecta ranked: se barajan) |
| Duplicados / casi-duplicados entre semanas | 3 pares reales | 0,4% |

**Extrapolación:** ~19 de los 40 bundles son usables sin tocar; ~2 de cada 100 preguntas tienen clave errónea o ambigua. Con el muestreo de ranked (3 semanas al azar de 40, 8 preguntas de ~60), **cada pregunta tiene ≈1% de probabilidad de salir en una sesión dada**: eso deja ~2% de sesiones con al menos un ítem de clave defectuosa. El problema no es masivo en clave, pero es real y erosiona el ranking.

**Lo que NO verifiqué:** no leí los otros 35 bundles. El 2% de bloqueantes es una estimación de muestra (n=100), con intervalo amplio; el resto de cifras sí son sobre las 800.

---

## Defectos bloqueantes

| archivo | ID | problema | evidencia breve | corrección sugerida |
|---|---|---|---|---|
| `CO-CN-11-2026-W20-repaso-p2-001-MASTERY-bundle.md` | `CO-CN-11-2026-W20-repaso-p2-001-MASTERY-bundle-v5` | **Dato falso en el estímulo**: afirma una equivalencia que es incorrecta por un factor de 4,184. El ítem enseña física mal aunque la clave “sea” la correcta. | `**Contexto:** … se calienta un vaso con 100 g de agua elevando su temperatura en $0.239^\circ\text{C}$ ($100 \text{ cal} \approx 100 \text{ J}$).` — 100 cal = 418,4 J. Y 0,239 °C en 100 g de agua corresponden a **100 J**, no a 100 cal (100 cal darían 1,0 °C). El propio estímulo se contradice. | Sustituir el paréntesis por `$100 \text{ cal} \approx 418 \text{ J}$` y el salto por `$1.0^\circ\text{C}$`; o dejar solo julios: “elevando su temperatura en 0,239 °C (100 J)”. |
| `CO-CN-11-2026-W40-fisica-moderna-atomos-001-MASTERY-bundle.md` | `CO-CN-11-2026-W40-fisica-moderna-atomos-001-MASTERY-bundle-v8` | **Dos opciones defendibles.** La clave B es correcta, pero C también es una afirmación verdadera sobre la diferencia fisión/fusión. El feedback de C se refuta a sí mismo. | Enunciado: “La diferencia entre fisión y fusión nuclear es:”. Clave `- [x] B) La fisión divide núcleos pesados; la fusión une núcleos ligeros.` Distractor `- [ ] C) La fusión produce elementos más pesados; la fisión los produce más ligeros.` — esto **es cierto**. Su feedback dice: “La fusión también puede producir elementos más pesados”, lo que **confirma** C en lugar de descartarlo. | Reescribir C para que sea inequívocamente falsa (p. ej. “La fusión rompe núcleos pesados en fragmentos y la fisión une protones con electrones”) o eliminar la opción y sustituirla por un error real (p. ej. “ambas liberan energía porque destruyen masa en energía luminosa”). Corregir el feedback. |

**Nota sobre un tercer caso, límite:** `CO-CN-11-2026-W10-repaso-p1-001-MASTERY-bundle-v8` (“¿Cuál de las tres especies posee el MENOR tamaño: S, S²⁻, Ca²⁺?”). La clave `Ca²⁺` es defendible (serie isoelectrónica, Z=20), pero el competidor real es el **S neutro**, que no es isoelectrónico y queda a ~4 pm. No es deducible del enunciado: se resuelve por dato tabulado memorizado, no por razonamiento. Lo dejo entre los menores, pero es candidato a retirar por baja discriminación.

---

## Defectos menores (agrupados por patrón)

### 1. LaTeX corrupto por escapado (57 preguntas; 13 en enunciado u opciones)

Patrón inequívoco de que el texto pasó por una capa que interpreta secuencias de escape:

- `\times` → **TAB** + `imes`: `CO-CN-11-2026-W01-diagnostico-saber11-001-MASTERY-bundle-v6` y `…-v13` (en `-v6`, la explicación muestra `$2M <TAB>imes 50mL = C_2 <TAB>imes 100mL$`, que se renderiza como “2M imes 50mL”).
- `\rightarrow` → Salto de línea + `ightarrow`: `CO-CN-11-2026-W01-diagnostico-saber11-001-MASTERY-bundle-v14` (la ecuación `$N_2 + 3H_2 ightarrow 2NH_3$` está en el `**Contexto:**`, que **sí** se muestra en ranked).
- `\nu` → Salto de línea + `u`: `CO-CN-11-2026-W10-repaso-p1-001-MASTERY-bundle-v14`.
- `\neq` → Salto de línea + `eq`: `CO-CN-11-2026-W10-repaso-p1-001-MASTERY-bundle-v15` (`($mu` + LF + `eq 0$)`).
- Barra perdida sin carácter de control: `cdot` (3), `pi` (24), `mu` (5), `circ` (20). Ej.: `CO-CN-11-2026-W10-repaso-p1-001-MASTERY-bundle-v5` → `$v_{y0} = 20 \sin(30^circ) = 10\text{ m/s}$`.

**Consecuencia verificada:** `saberparatodos/src/components/MathRenderer.svelte` usa `INLINE_MATH_REGEX = /(?<![\d\w])\$([^\$\n]+?)\$(?![\d\w])/g`, que **excluye el salto de línea**. Probado en Node: con `\n` dentro de `$…$` hay 0 coincidencias → el estudiante ve el `$…$` crudo, con el salto en medio. Afecta a **21 preguntas en 10 packs** (W04, W05, W06, W07, W10 ×4, W11, W14, W18, W20…).

**Corrección:** regenerar los `.md` desde la fuente, no parchear; y añadir gate: prohibir TAB y salto de línea dentro de `$…$`, y prohibir los tokens `ightarrow`, `cdot`, `^circ`, `$pi$`, `$mu`.

### 2. Contexto-plantilla con personaje (181 preguntas, 22,6%, en 9 bundles)

Nueve bundles usan **un solo nombre × 20 preguntas** con la misma frase:

- `CO-CN-11-2026-W30-repaso-p3-001-MASTERY-bundle.md` — 20/20: “En un simulacro de preparación Saber 11 en Colombia sobre repaso: **cinética y temperatura**, **Daniela** resuelve el siguiente caso de estudio.”
- `CO-CN-11-2026-W26-estequiometria-001-MASTERY-bundle.md` — 20/20: “En un cálculo estequiométrico en Colombia sobre **reactivo límite en síntesis de agua**, **Andrés** analiza la siguiente transformación química.”
- `CO-CN-11-2026-W28-ph-soluciones-001-MASTERY-bundle.md` — 20/20 con “**Mariana**”.

Nombres detectados (20 usos cada uno): Mateo, Valentina, Santiago, Sofía, Andrés, Camilo, Mariana, Daniela, Alejandro (bundles W22, W23, W24, W25, W26, W27, W28, W30, W31).

**Por qué importa:** el `context` **se envía al cliente y se muestra** en ranked (`ranked.ts` línea 356; `RankedExamView.svelte` línea 397). Verificado en el pack publicado: `co-week-30-grade-11-subject-ciencias_naturales.json`, `-v4`, `context: "En un simulacro … sobre repaso: reactivo límite, Daniela resuelve el siguiente caso de estudio."` El estudiante ve un artefacto de generación en un examen oficial.

### 3. Contexto redundante: repite el enunciado (2 casos)

- `CO-CN-11-2026-W10-repaso-p1-001-MASTERY-bundle-v6`: el `**Contexto:**` termina en “…¿cuál es el valor de la fuerza $F$?” y el `### Enunciado` vuelve a preguntar. En ranked se muestran ambos → la pregunta aparece dos veces.
- `CO-CN-11-2026-W10-repaso-p1-001-MASTERY-bundle-v16`: mismo patrón (“Si se quadruplica la longitud…” en el contexto y otra vez en el enunciado).
- Métrica: solo 2 de 800 contextos contienen `?`; el patrón está contenido, pero es un defecto de construcción.

### 4. Distractores absurdos (≥2 opciones imposibles de defender)

Convierte el ítem en “elegir la única frase con sentido”, sin evaluar ciencia:

- `CO-CN-11-2026-W20-repaso-p2-001-MASTERY-bundle-v17`: “viola la Ley de Carnot generando energía infinita”, “los paneles solares se destruyen de noche”, “el agua de río no contiene átomos de carbono”.
- `CO-CN-11-2026-W30-repaso-p3-001-MASTERY-bundle-v5`: “reduce la masa de los átomos a la mitad”, “la masa molar se convierte en luz”, “anula la constante de velocidad k”.
- `CO-CN-11-2026-W40-fisica-moderna-atomos-001-MASTERY-bundle-v11`: “monopolos magnéticos”, “la relatividad general”, “la masa del neutrino”.

Concentración: W20 (Q17, Q18, Q19, Q20, Q10), W30 (Q5, Q8, Q16), W40 (Q11, Q17, Q19, Q20). W01 y W10 casi no lo tienen (sus distractores son errores conceptuales plausibles: “olvidó multiplicar por g”, “confundió seno con coseno”). Es el patrón que más separa a los bundles buenos de los malos.

### 5. Erratas y calcos

- “fuerza **aplada**” → `CO-CN-11-2026-W10-repaso-p1-001-MASTERY-bundle-v6`.
- “Se **quadruplica** (factor 4)” → `CO-CN-11-2026-W20-repaso-p2-001-MASTERY-bundle-v3` (dos veces: opción y explicación).
- “Si se **quadruplica** la longitud” → `CO-CN-11-2026-W10-repaso-p1-001-MASTERY-bundle-v16` (contexto y enunciado).
- “comprimiendo su radio **por encima de** todas las demás especies” (redacción rota) → `CO-CN-11-2026-W10-repaso-p1-001-MASTERY-bundle-v8`.
- “covalentes no polares **pura**” → `CO-CN-11-2026-W10-repaso-p1-001-MASTERY-bundle-v12`.

### 6. Feedback de distractor que enseña algo falso

- `CO-CN-11-2026-W40-fisica-moderna-atomos-001-MASTERY-bundle-v1` (opción B, “Una nube difusa de protones solamente”): el feedback dice “**No incluía electrones en su esquema**”. El modelo de Thomson **sí** tiene electrones incrustados (es su rasgo definitorio). El feedback correcto sería “el modelo de Thomson no tenía protones; los electrones eran parte central del modelo”. Un estudiante que lee la corrección se lleva una idea falsa.

### 7. Enunciado que no concuerda con la opción correcta

- `CO-CN-11-2026-W20-repaso-p2-001-MASTERY-bundle-v9`: pide “¿Qué **modificaciones simultáneas** de temperatura y presión aumentarán el rendimiento?” y la clave responde con **una sola** modificación (“Disminuir la temperatura (la presión no influye…)”). La redacción induce a buscar un par de acciones.

### 8. Nivel por debajo de grado 11 / ICFES

Ítems de recordatorio puro de básica secundaria, ubicados en el tramo [D3-D4] de cada bundle:

- `CO-CN-11-2026-W01-diagnostico-saber11-001-MASTERY-bundle-v1` (pared celular vegetal), `-v3` (fórmula de la sal de mesa).
- `CO-CN-11-2026-W20-repaso-p2-001-MASTERY-bundle-v3` (si v se duplica, ¿cuánto crece $E_k$?).
- `CO-CN-11-2026-W40-fisica-moderna-atomos-001-MASTERY-bundle-v3` y `-v4` (modelo de Bohr; qué indica $n$).

No son falsos, pero Saber 11 casi no usa recordatorio literal; en un examen competitivo son relleno.

### 9. Duplicados / casi-duplicados entre semanas (3 pares)

| par | relación |
|---|---|
| `CO-CN-11-2026-W26-estequiometria-001-MASTERY-bundle-v3` ↔ `CO-CN-11-2026-W30-repaso-p3-001-MASTERY-bundle-v4` | Misma reacción `2H2 + O2 -> 2H2O`; cambian los moles (2+2 → límite) vs (4+1 → exceso). Similitud 0,87. |
| `CO-CN-11-2026-W28-ph-soluciones-001-MASTERY-bundle-v3` ↔ `CO-CN-11-2026-W39-ph-acidos-bases-001-MASTERY-bundle-v1` | “Según la teoría de Brønsted-Lowry, un ácido se define como…” — misma pregunta, dos semanas. |
| `CO-CN-11-2026-W28-ph-soluciones-001-MASTERY-bundle-v9` ↔ `CO-CN-11-2026-W39-ph-acidos-bases-001-MASTERY-bundle-v13` | “A 25 °C, el producto iónico del agua Kw es igual a…” — misma pregunta. |

(Descarté un falso positivo del detector: W03 Q10 y W06 Q9 comparten enunciado genérico pero son sistemas físicos distintos —Atwood vs mesa+polea—.)

### 10. Metadatos de calibración falsos (los 40 bundles)

Todos declaran `calibration: {difficulty_band: "D3-D4", expected_success: 0.8}` en el frontmatter, mientras el propio bundle etiqueta ítems como [D9-D10] con `Expected_Success: 0.25–0.35` (p. ej. `CO-CN-11-2026-W20-…-v20` = 0.25). El `difficulty_band` global no describe el bundle. No afecta la clave, pero invalida cualquier analítica que use ese campo.

### 11. Orden de opciones no A→D (396/800)

Los bundles listan las opciones desordenadas (p. ej. `CO-CN-11-2026-W40-…-v1` aparece A, D, B, C). **En ranked no se nota** porque `ranked.ts` baraja y reetiqueta A–D (líneas 330-349), y la distribución de claves está equilibrada (A 202 / B 220 / C 200 / D 178). Sí se nota en las superficies que renderizan el markdown tal cual (estudio, blog, revisión). No es bloqueante.

### 12. Fuera del marco ICFES

- `CO-CN-11-2026-W20-repaso-p2-001-MASTERY-bundle-v16`: mutarrotación de la glucosa y polarimetría. Correcto, pero no es contenido evaluable por Saber 11 ciencias naturales; sesga el examen hacia química universitaria.

---

## Patrones sistémicos

1. **Generación por lotes con esqueleto fijo.** Se distinguen tres familias de bundles por su “firma” de contexto: (a) plantilla con personaje (W22-W28, W30, W31), (b) “En clase en `<ciudad>`…” de una línea (W32-W40), (c) contexto temático más trabajado (W01-W21). La familia (a) es la que produce artefactos visibles al estudiante.

2. **Bug de escapado en la cadena de contenido.** No es un error aislado: `\t`→TAB, `\r`→salto, `\n`→salto, y pérdida de barra en `\cdot/\pi/\mu/\circ`. El mismo defecto aparece en 20 bundles distintos, así que vive en el pipeline (o en el paso de serialización), no en un archivo. **Mientras no se corrija el origen, regenerar reproduce el bug.**

3. **El gate actual no lo detecta.** `validate-bundles-v52.mjs` valida estructura, conteo, una sola `[x]` y calidad del feedback, pero no: LaTeX roto, salto de línea dentro de `$…$`, contexto de plantilla, duplicados entre semanas ni ambigüedad de clave. Los 800 ítems están publicados y validados; ninguna de las 57 preguntas con LaTeX roto fue frenada.

4. **Deuda de discriminación concentrada en los “repaso”.** W20, W30 y W40 (los repaso) acumulan los distractores absurdos y los ítems triviales; W01 y W10 son sustancialmente mejores. Un repaso generado por plantilla (“repaso-p1/p2/p3”) tiende a producir ítems de una línea en vez de situaciones problema.

5. **Ranked amplifica el riesgo de forma no uniforme.** `RANKED_PACKS_PER_AREA = 3` sobre 40 semanas: cada sesión sortea 3 semanas y toma 8 preguntas de ~60. Un bundle malo no “contamina” siempre, pero entra ~7,5% de las sesiones y aporta ~2,7 preguntas cuando entra. En un leaderboard mensual, eso es suficiente para mover posiciones.

---

## Recomendación

### Retirar del pool ranked ya (sin esperar corrección)

| bundle | motivo | acción |
|---|---|---|
| `CO-CN-11-2026-W30-repaso-p3-001-MASTERY-bundle.md` | 0/20 listas. 20/20 con contexto-plantilla visible (“Daniela”), 3 ítems con distractores absurdos, varios triviales. | Retirar del pool y **regenerar desde cero** con contexto situacional real. No vale la pena parchear 20 contextos. |

### Corregir antes de volver a servir (2 ediciones puntuales)

| bundle | pregunta | acción |
|---|---|---|
| `W20` | `-v5` | Corregir la equivalencia 100 cal ≈ 100 J (es 418 J) y el salto de 0,239 °C (corresponde a 100 J). |
| `W40` | `-v8` | Reescribir la opción C; hoy es verdadera y compite con la clave. Corregir también el feedback de `-v1`. |

### Regenerar contextos (no bloqueante, pero visible)

Los 9 bundles con plantilla de personaje: `W22`, `W23`, `W24`, `W25`, `W26`, `W27`, `W28`, `W30`, `W31`. Reemplazar “`En un … en Colombia sobre <tema>, <Nombre> analiza/resuelve…`” por un estímulo con datos que el ítem necesite (o dejar el campo vacío: mejor sin contexto que con contexto de plantilla).

### Arreglar el pipeline (prioridad alta, es la causa raíz)

1. Corregir el escapado en el generador/serializador: ningún `\times`, `\rightarrow`, `\nu`, `\neq` puede convertirse en TAB/salto.
2. Gate nuevo en `validate-bundles-v52.mjs`:
   - fallar si hay TAB o `\n` dentro de `$…$`;
   - fallar con los tokens `ightarrow`, `cdot`, `^circ`, `$pi$`, `$mu`, `vec{mu}`;
   - fallar si el `**Contexto:**` contiene `?` (pregunta duplicada) o si coincide con la plantilla `sobre .*, (Nombre) (analiza|resuelve|determina)`;
   - advertir si dos `### Enunciado` de semanas distintas superan 0,85 de similitud.
3. Añadir al gate una comprobación de discriminación mínima: si 2 o más distractores contienen términos como “infinit”, “se destruye”, “se convierte en `<elemento>`”, “masa de la Tierra”, marcar para revisión humana.

### Veredicto por bundle de la muestra

| bundle | listas tal cual | menores | bloqueantes | veredicto |
|---|---|---|---|---|
| W01 | 14/20 | 6 | 0 | Usable; limpiar LaTeX (Q5, Q6, Q13, Q14, Q16, Q19). |
| W10 | 14/20 | 6 | 0 | Usable; limpiar LaTeX (Q5, Q7, Q14, Q15), erratas (Q6, Q16). |
| W20 | 15/20 | 4 | 1 | Usable tras corregir Q5; revisar Q17-Q20 por distractores absurdos. |
| W30 | 0/20 | 20 | 0 | **Retirar.** |
| W40 | 17/20 | 2 | 1 | Usable tras corregir Q8; corregir feedback de Q1. |
| **Total** | **60/100** | **38** | **2** | **60% usable sin cambios; ~48% recomendable para ranked.** |
