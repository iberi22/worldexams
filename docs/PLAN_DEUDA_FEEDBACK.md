# Plan: deuda de feedback de WorldExams — reparar, no regenerar

> Fecha: 2026-10-01. Datos medidos con `node scripts/validate-bundles-v52.mjs` sobre los 2.699 bundles de `main`.

---

## 1. La conclusión, primero

**No hay que regenerar nada, y no hay nada que generar.** La respuesta pedagógica de las 23.329 opciones que fallan **ya está escrita dentro de su propio archivo**, en la sección `### Explicacion Pedagogica`. Lo verifiqué una por una:

| Medición | Resultado |
|---|---|
| Opciones que fallan | 23.329 |
| Con `Explicacion Pedagogica` usable en el mismo bundle | **23.329 (100%)** |
| Bundles que fallan | 622 (el validador reporta 638: 16 tienen además otro defecto) |
| Bundles que fallan **solo** por feedback | 566 (90%) |
| Autor de todos | `Jules-Agent`, uno solo |

Regenerar 622 bundles significa tirar 12.440 preguntas ya escritas, validadas y balanceadas para volver a escribir lo mismo con la misma información a la vista. **La opción correcta es reparar el feedback in situ.**

---

## 2. Por qué el plan anterior (borrar/generar) era el peor de los tres

En la sesión anterior borré 109 bundles porque su feedback no explicaba. Con la hindsight de hoy, esa decisión fue correcta solo por descarte: el problema no era el contenido, era el feedback, y el contenido de esos 109 bundles se habría podido salvar igual que los 622 de hoy.

Tres opciones, con su coste real:

| Opción | Qué se pierde | Tiempo | Veredicto |
|---|---|---|---|
| **Reparar in situ** | nada | 16 olas | **Elegida** |
| Regenerar los 622 | 12.440 preguntas + todo el trabajo de balanceo de letras | 16 olas + riesgo de repetir el sesgo A | descartada |
| Cuarentena (retirar de producción) | 1.950 preguntas publicadas (~2.8% del catálogo) | inmediata | solo como red de seguridad |

La cuarentena tiene un argumento real a su favor: mientras se repara, esos 622 bundles no se sirven. Pero como la deuda es de 2.639 preguntas de 40.338 (6.6%) y 13 de 20 países ya superan la meta, retirarlas no compra nada que valga el coste. **La cuarentena solo tiene sentido como herramienta de una ola, no como destino.**

---

## 3. El diagnóstico real: no son 622 bundles malos

La deuda está extremadamente concentrada. Esto cambia el plan:

| Materia | Bundles | % |
|---|---|---|
| **ingles** | **486** | **78%** |
| matematicas | 45 | 7% |
| sociales | 40 | 6% |
| ciencias-naturales | 22 | 4% |
| matematica | 19 | 3% |
| lectura-critica | 9 | 1% |
| lengua | 6 | 1% |

Y dentro de inglés, los países clonan el mismo patrón: CO 175, y luego ES/PR/CR/EC/PE/SV en exactamente 40 cada uno, HN 39, CL 30. Eso no son 486 bundles fallidos de forma independiente: es **una plantilla de generación de inglés que produce feedback vacío**, replicada por país.

Los tres modos de fallo, con su peso:

| Modo | Opciones | Qué es |
|---|---|---|
| Solo veredicto | 18.555 (80%) | `Correct.` / `Incorrect.` sin razón, o `Incorrect. Review the concept.` |
| Cadena sin espacios | 1.255 (5%) | `Well done` (400 ocurrencias), `Not mentioned`, `2⁴ é 16` |
| Corto con cita (≤15 chars) | 881 (4%) | `Missing 'to'`, `Too broad`, `Error de signo` |
| Etiqueta de categoría | ~2.638 (11%) | `Correcto.` / `Incorrecto.` ya tratados por el gate |

Ejemplo real de la plantilla defectuosa:

```markdown
What does 'benevolent' mean?

- [x] C) Kind and generous
  <!-- feedback: Correct! -->
- [ ] A) Mean and cruel
  <!-- feedback: Incorrect. Review the concept. -->

### Explicacion Pedagogica
'Benevolent' means kind, generous, or charitable.
```

La respuesta está dos líneas más abajo. Solo falta conectarla.

### Un punto que hay que corregir antes de empezar

De los 881 casos citados por longitud, **muchos son buenos y mi gate los rechaza mal**: `Missing 'to'` (4), `2⁴ é 16` (2), `Not mentioned` (18), `Error de signo` (9), `2⁶ é 64`, `49² não é 49`. Son razones reales de 9-15 caracteres. El mismo problema que ya corregí con `GRAMMAR_LABEL` y con las fórmulas, en otra ronda.

**Antes de la ola 1 hay que arreglar el gate**, o se va a "reparar" feedback que ya era correcto y a estropearlo. Es la cuarta iteración de este gate y el patrón se repite: cada vez que uso un umbral o una lista de palabras, rechazo contenido bueno. La regla que queda debe ser *semántica*, y el filtro por longitud solo debe aplicarse a feedback que no sea ni fórmula ni etiqueta ni cantidad.

---

## 4. Los modelos

Verifiqué cuáles responden ahora mismo (`opencode run "OK"`):

| Modelo | Estado |
|---|---|
| `opencode/longcat-2.5-preview-free` | ✅ responde |
| `opencode/mimo-v2.6-flash-free` | ✅ responde (es el `small_model` por defecto) |
| `opencode-go/deepseek-v4.1-flash` | ❌ `Invalid API key` |
| `opencode-go/muse-spark-1.3-contributor` | ❌ `Invalid API key` |

Los dos de `opencode-go` están caídos por la key. Se pueden usar los dos `opencode/*-free`, pero conviene arreglar la key de `opencode-go` porque `muse-spark` es el mejor modelo para redacción pedagógica y ahí no hay alternativa gratuita.

### ¿Puedo hacerlo yo?

Sí, y es la vía principal, por una razón concreta: **esta tarea no necesita generación de contenido, necesita redacción con la respuesta a la vista.** Yo tengo el bundle completo en contexto —enunciado, las 4 opciones, la Explicación Pedagógica— y puedo escribir el feedback en el mismo turno sin ida y vuelta. Delegar a un subagente por bundle costaría 622 idas y vueltas de prompt para una tarea donde el contexto ya está.

Donde sí delegaría: la revisión de calidad tras cada ola, porque comparar es más barato que producir.

División que propongo:

| Trabajo | Quién |
|---|---|
| Reescribir los 4 feedbacks de una pregunta | yo, en este turno, con el bundle en contexto |
| Verificar que el validador baja y nada más se rompe | yo, con `node scripts/validate-bundles-v52.mjs` |
| Auditar que el feedback nuevo es de verdad una explicación | subagente, 1 por ola, leyendo el diff |
| Regenerar los packs | `node scripts/generate-static-packs.js` |

---

## 5. El plan, por olas

16 olas de ~40 bundles. Cada ola es un commit, reversible, y se valida antes de pasar a la siguiente.

**Ola 0 — arreglar el gate (prerrequisito).** Cuarta corrección del validador: reconocer razón corta real (`Missing 'to'`, `2⁴ é 16`, `Not mentioned`). Con tests tomados del corpus real, como las 3 veces anteriores. Sin esto, la ola 1 va a damagear feedback bueno.

**Olas 1-16 — reparación, por país, inglés primero.** El orden no es por tamaño de deuda sino por rendimiento por bundle reparado. Empiezo por inglés porque:
1. es 78% de la deuda
2. los países están clonados (40 y 40 y 40), así que arreglar el patrón en uno y replicar el criterio es barato
3. la `Explicacion Pedagogica` de inglés suele ser una definición directa, lo que hace la redacción mecánica y fiable

Orden: SV (40, mismo tamaño que el resto; uno prueba el patrón) → CR/EC/PE/PR (40 c/u, el mismo bug exacto) → HN (39) → CL (30) → CO (175, el más grande, en 5 sub-olas) → ES (40) → después las materias de Colombia y el resto.

**Cuarentena como red, no como destino.** Si una ola no baja el contador de errores al menos un 80% de lo esperado, ese lote va a cuarentena: se retiran sus packs y se documenta. Así una plantilla nueva que produzca basura no llega a producción por el camino.

---

## 6. Qué NO voy a hacer

- **No regenerar bundles que solo tienen feedback flojo.** El enunciado, las opciones y la explicación son buenos. Regenerar es tirar trabajo y además reintroduce el sesgo de letra: los 1.621 bundles que rebalanceé volverían a A si la plantilla no cambia.
- **No tocar los 65 bundles con la clave inclinada (2%).** Es residuo del rebalanceo y no tiene relación con esto.
- **No meter a Jules en esto.** Su plantilla de inglés es la causa; pedirle más bundles de inglés sin arreglar el generador solo agranda la deuda.
- **No usar el bypass de hooks.** Cada commit pasa por el gate, como hasta ahora.

---

## 7. Cómo se mide que terminó

```bash
node scripts/validate-bundles-v52.mjs
# hoy:  Failures: 638,  feedback-no-reason: 23329
# meta: Failures: 0,     feedback-no-reason: 0

node scripts/test-feedback-gate.mjs        # gate tests, incluidos los casos de reason corta
npx vitest run                             # suite del monorepo
node scripts/generate-static-packs.js --all-weekly --api-only
```

Y una comprobación de producción, porque el objetivo es que el estudiante vea la razón:

```bash
curl "https://api.saberparatodos.space/v1/questions?country=sv&grade=11&subject=ingles"
# feedback_deficiente debe bajar de 80/80 a 0/80
```

---

## 8. Lo que necesito de vos

Una decisión, no cinco: **¿arranco con la Ola 0 (arreglar el gate) y luego inglés por países, o prefieres que empieza por Colombia que es lo que más duele en tu mercado?**

Mi recomendación es SV primero, no Colombia: son 40 bundles con el bug idéntico al de CR/EC/PE/PR, así que el primer lote es el que valida el criterio de redacción. Si empiezo por los 175 de Colombia y mi criterio tiene un sesgo, lo repito 175 veces en vez de 40.

Y un dato que no bloquea pero conviene saber: la key de `opencode-go` está muerta. Si la arreglas, `muse-spark` queda disponible para la auditoría de calidad, que es donde un modelo mejor paga. Si no, la hago yo leyendo el diff, que es más lenta pero no bloquea.
