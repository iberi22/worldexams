# `difficulty_band`: punto de arranque, no techo

> Decisión documentada el 2026-10-01, durante la campaña de deuda de feedback.
> Pendiente de aprobar en `AGENTS.md` — el gate de escritura de archivos protegidos
> expiró sin respuesta, así que esta nota vive aquí hasta que se apruebe.

## El hallazgo

Un subagente regeneró 20 bundles de inglés y reportó, con honestidad, que había
violado una regla que creía existente:

> The repo validator does not check difficulty labels against
> `calibration.difficulty_band`. I violated that on the first pass with D5 labels
> and only caught it by writing my own check.

El validador efectivamente no lo comprueba:

```bash
$ rg -n 'difficulty_band' scripts/validate-bundles-v52.mjs
(sin resultados)
```

`validate-bundles-v52.mjs` no menciona `difficulty_band` en ningún punto. Sólo
valida que `Expected_Success` tenga forma `0.\d+`.

## Lo que el censo muestra

`scripts/audit-difficulty-band.py` recorre las 2.729 bundles y compara cada
etiqueta de pregunta con la banda declarada:

```
bundles scanned      : 2729
bundles without band : 395
questions with header: 32888
bundles out of band  : 1956
questions out of band: 20061
```

Leído como techo, eso parece deuda grave. **No lo es.**

| Etiquetas distintas por bundle | Bundles |
|---|---|
| 1 (una sola dificultad) | 19 |
| 2 | 32 |
| 3 | 71 |
| 4 | 2301 |
| 8 | 295 |

**2.699 de 2.718 bundles usan un ladder deliberado:**

```
CO-MAT-6-2026-W08-mcd-mcm-divisibilidad  ['D3-D4', 'D5-D6', 'D7-D8', 'D9-D10']
CO-LC-7-2026-W04-metafora-y-comparacion ['D3-D4', 'D5-D6', 'D7-D8', 'D9-D10']
CO-CN-6-2026-W16-luna-fases-eclipses    ['D3-D4', 'D5-D6', 'D7-D8', 'D9-D10']
```

Bandas declaradas en el corpus:

| Banda | Bundles |
|---|---|
| `D3-D4` | 1.976 |
| ninguna | 395 |
| `D3-D10` | 338 |
| `D5-D8` | 19 |
| `D1-D6` | 1 |

## La prueba de que el censo funciona

Los 338 bundles que declaran `D3-D10` **salen limpios** bajo la misma prueba, y
`D3-D4` está contenido en `D3-D10`. Si el audit marcara también ésos, estaría
roto. Que no los marque es lo que demuestra que la aritmética es correcta:

```
banda: D3-D10 -> [3, 10]
preguntas: 20  fuera de banda: 0
```

## Conclusión

`calibration.difficulty_band` describe **dónde arranca** el bundle. El ladder
`D3-D4 → D5-D6 → D7-D8 → D9-D10` es el comportamiento correcto de 2.699 bundles,
no una violación.

Por tanto **no se escribe una regla que la haga cumplir**. Reclamaría 20.061
preguntas que están bien. Si en algún momento se quiere un techo real, hay que:

1. Definir la política explicitamente — qué banda admite qué etiquetas.
2. Escribir la regla en `validate-bundles-v52.mjs`.
3. Migrar los 1.976 bundles `D3-D4` o declararles `D3-D10`.

Ese es un proyecto, no un efecto secundario de una campaña de feedback.

## Nota sobre el bug del propio script

La primera versión del script usaba `D(\d)` para extraer los números. Eso
convierte `D3-D10` en `(1, 3)` — el `1` viene de "D10" y el `0` se descarta — y
entonces una etiqueta `D3-D4` parece salirse de una banda `D3-D10`. El censo
salía con 43.712 violaciones, todas falsas.

La corrección es `D(\d+)`. Dos cosas que conviene recordar de este episodio:

- Un rango donde el extremo superior tiene dos dígitos rompe la extracción de un
  solo dígito sin que nada falle visiblemente.
- El primer resultado de un script de auditoría nuevo merece una comprobación
  concreta antes de creérselo: elegir un caso que debe salir limpio y confirmar
  que sale limpio.

## Nota sobre este archivo

La primera versión de este documento se escribió con una línea de 82.580
caracteres de texto repetido, y `write_file` la reportó como `verified: true`
porque el hash sí coincidía. El archivo estaba corrupto y nada lo delató salvo
medir la línea más larga. Vale como recordatorio: el hash confirma lo que se
escribió, no que lo escrito tenga sentido.
