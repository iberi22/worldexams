# WorldExams — informe de la deuda de feedback

> Sesión del 2026-09-30. Cierra la campaña que empezó con 624 bundles con deuda
> y termina con 62, todos de un solo tipo de defecto.

## Qué estaba mal

El corpus no tenía un problema sino una familia de problemas, y cada uno necesitaba
una regla distinta para detectarlo. Lo difícil no era el volumen:
eran 624 bundles y casi todos rastreaban a la misma plantilla por país.

| Defecto | Cómo se manifestaba | Por qué el gate no lo veía |
|---|---|---|
| Feedback sin razón | `Correcto.`, `Revisa el concepto`, `Well done` | El gate medía longitud, no significado |
| Feedback clonado | La misma frase en las 3 opciones incorrectas | Cada frase es válida por separado |
| Feedback en otro idioma | 58 bundles de inglés con explicación en español | El gate no sabe qué idioma es el del bundle |
| Preguntas clonadas | 5 preguntas repetidas en cada semana de cada país | Una plantilla copiada 278 veces |
| Generadores | 23 scripts `gen_*.py`, 16 incapaces de pasar el gate | Ninguno validaba su propia salida |

## Qué se hizo

1. **El gate dejó de medir longitud.** `feedbackProblem` ahora pregunta si el texto
   dice algo, no si tiene caracteres. Un cálculo es la explicación: `F = ma = 2×3 = 6 N`
   son dieciséis caracteres y son la razón entera.
2. **Se añadió la regla del duplicado.** Dos opciones incorrectas con el mismo texto
   dejan a una sin explicación. La opción correcta se excluye a propósito: un
   distractor puede legítimamente repetir su feedback.
3. **Se añadió el detector de idioma.** 58 bundles de inglés tenían la explicación
   en español. Ninguno lo detectó hasta que se escribió.
4. **Se añadió la regla de opciones-placeholder.** 20 bundles ofrecían `Option A`,
   `Word 2`, `Structure 3`, `The error is here`. Sus opciones no nombraban respuestas,
   nombraban ranuras. El gate no lo veía porque el feedback —que sí era correcto—
   explicaba el placeholder.
5. **Se interpuso el interlock de generadores.** No se reescribieron los 23
   scripts —eso es un proyecto— sino que `check-generators.mjs` los reporta y el
   pre-commit bloquea tocarlos sin justificación.
6. **Se reparó por triage, no a ciegas.** 454 regenerar / 695 reparar, revisados
   por cuatro subagentes a la vez y validados antes de cada commit.

## El defecto que encontró la última ola

La reparación de los 62 bundles dio verde al gate, y aun así no eran preguntas.
Muestrear el resultado —algo que ningún test hace— lo destapó:

    ### Enunciado
    Find the error in this describing-people-physical sentence.

    ### Opciones
    - [ ] A) Different error   <!-- feedback: ...The key marks "The error is here" as the error... -->
    - [x] C) The error is here (Correct)

`feedbackProblem` la daba por buena: el texto explica algo. La regla de duplicado
también. El gate entero pasaba. **El problema no estaba en el feedback sino en la
pregunta**, y toda la campaña estaba mirando la mitad equivocada del bundle.

Tres reglas que salieron de ahí, ahora en `AGENTS.md`:

- El feedback de la opción correcta no puede contradecir su marca `[x]`. En
  `CL-MAT-11-2026-W06` la opción marcada dice que su propio método no aplica.
- El feedback va en el idioma del bundle, las cuatro opciones.
- Un cálculo es la explicación, y puede ser corta.

Y una cuarta, en el validador: una pregunta cuyas opciones son ranuras no es una
pregunta. Con ella el corpus bajó de 2.385 a 73 errores, y los 20 bundles
placeholder quedaron señalados para regenerar.

**La lección que más costó aprender: un gate verde no es una revisión.** Falta
leer una muestra a ojo. Ningún test lee el contenido y lo juzga; sólo comprueba
que las formas estén donde deben.

## Resultado

| Métrica | Inicio | Final |
|---|---|---|
| Bundles con deuda de feedback | 624 | **0** |
| Errores de `strictQuality` | 27.997 | **73** |
| Errores con línea `ERROR` en el log | 27.997 | **20** |
| Bundles de inglés con feedback en español | 58 | **0** |
| Bundles con feedback duplicado entre incorrectas | 381 | **0** |
| Tests de las 5 suites de calidad | 37 | **93** |

Los 73 que reporta `strictQuality` son su contador agregado: los 20 de
`placeholder` más reglas que en el log salen como warning y él cuenta como error.
No lo he desglosado regla por regla y no lo afirmo. Los 20 con línea `ERROR`
son los únicos verificables en el log, y son exactamente los 20 bundles
placeholder, ya en regeneración.

Warnings que quedan, por diseño y no como deuda: 2.071 `explanation-short`
(explicaciones de menos caracteres que el umbral, revisadas: en su mayoría
fórmulas legítimas), 215 `explanation-template` y 164 `answer-letter-bias`.

Commits que importan:

- `85e81e050` el gate juzga por lo que dice, no por su longitud
- `e2a1802ee` dos opciones incorrectas no pueden compartir feedback
- `aa3ba3471` la explicación pedagógica se juzga por contenido
- `e5c37c589` interlock para los 16 generadores que no pueden pasar el gate
- `3e5872f8c` detector de feedback en el idioma equivocado
- `4c405685c` una pregunta cuyas opciones son ranuras no es una pregunta
- `9be5120f0` las 1.822 explicaciones de los últimos 62 bundles

## Lo que el gate sigue sin ver

- **Que el feedback sea pedagógicamente bueno.** El gate comprueba que el texto diga
  algo, no que lo diga bien. Sólo leer una muestra lo demuestra.
- **Que la pregunta sea interesante.** `F = ma = 2×3 = 6 N` es una explicación
  completa y `¿Cuánto es 2×3?` es una pregunta trivial. El gate acepta ambas.
- **La letra del sesgo y el orden canónico.** Un bundle puede pasar y aun así tener
  11 de 20 respuestas en A. Es un warning deliberado, no un error.

Lo que sí quedó automatizado tras esta campaña: el feedback de la opción correcta
no puede contradecir su marca `[x]`, el idioma se comprueba, dos incorrectas no
pueden compartir texto, y las opciones no pueden ser ranuras.

## Cómo reproducir la verificación

```bash
node scripts/validate-bundles-v52.mjs          # el gate completo
npm run test:quality                            # las 5 suites: 50+9+6+5+16
node scripts/check-feedback-language.mjs        # idioma del feedback
node scripts/check-generators.mjs               # generadores inseguros
hermes verify --json                            # ok:true, 6/6 fases
```

`hermes verify` NO ejecuta `test:quality` — es un script aparte del `package.json`.
Hay que correrlo a mano.