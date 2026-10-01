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
4. **Se interpuso el interlock de generadores.** No se reescribieron los 23
   scripts —eso es un proyecto— sino que `check-generators.mjs` los reporta y el
   pre-commit bloquea tocarlos sin justificación.
5. **Se reparó por triage, no a ciegas.** 454 regenerar / 695 reparar, revisados
   por cuatro subagentes a la vez y validados antes de cada commit.

## Resultado

| Métrica | Inicio | Final |
|---|---|---|
| Bundles con deuda | 624 | **62** |
| Errores del gate | 27.997 | **1.822** |
| Bundles de inglés con feedback en español | 58 | **0** |
| Bundles con feedback duplicado entre incorrectas | 381 | **0** |
| Errores de gate en las 5 suites de calidad | — | 86 tests, todos verdes |

Commits que importan:

- `85e81e050` el gate juzga por lo que dice, no por su longitud
- `e2a1802ee` dos opciones incorrectas no pueden compartir feedback
- `aa3ba3471` la explicación pedagógica se juzga por contenido
- `e5c37c589` interlock para los 16 generadores que no pueden pasar el gate
- `3e5872f8c` detector de feedback en el idioma equivocado

## Lo que el gate sigue sin ver

- **El feedback de la opción correcta puede contradecir su propia marca.** Hay al
  menos un caso real: en `CL-MAT-11-2026-W06` la opción D está marcada `[x]` y su
  feedback dice que ese método no sirve para el problema. Ninguna regla lo detecta.
- **La letra del sesgo y el orden canónico.** Un bundle puede pasar y aun así tener
  11 de 20 respuestas en A. Es un warning, no un error, y es deliberado.
- **La calidad pedagógica real.** Un gate verde dice que el texto explica algo. No
  dice que explique bien. Sólo leer muestras lo demuestra.

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