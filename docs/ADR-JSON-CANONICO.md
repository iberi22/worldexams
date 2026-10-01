# ADR: ¿debe el corpus ser JSON canónico?

> Decisión documentada el 2026-10-01. Estado: **aplazada, con criterio**.
> No es "no lo hagas"; es "hazlo sólo cuando se cumplan estas condiciones".

## La pregunta

El usuario preguntó si el formato canónico de un bundle debe ser JSON. El
frontend ya consume JSON; los builders y validadores leen Markdown. ¿Se migra?

## Lo que encontré midiendo (no estimando)

| Dato | Valor | Cómo se obtuvo |
|---|---|---|
| Bundles en Markdown | 2.784 | `glob questions_data/**/*.md` |
| Scripts que leen `questions_data/**.md` | 52 | grep sobre `scripts/*.{py,mjs,ts}` |
| De esos, los que **escriben** bundles | 43 | detectando `open(...,'w')` / `writeFile` |
| Los que sólo **leen y validan** | 11 | el resto |
| Scripts que leen JSON canónico de bundle | **0** | grep en `src/` y `saberparatodos/src/` |
| Packs JSON derivados | 4.900 | `apps/worldexams-api/public/v1/packs/*.json` |

El frontend lee los **packs derivados** (`saberparatodos/src/lib/pack-fetcher.ts`,
`src/pages/api/packs/[...slug].ts`), que se generan desde el Markdown por
`generate-static-packs.js`. No existe un lector de JSON canónico porque no hay
JSON canónico: hay una proyección.

## Por qué no "migrar el formato"

JSON tiene tres propiedades que Markdown no tiene (tipos, sin ambigüedad de
escapado, parseo sin regex) y un coste que aquí es concreto: **43 scripts
escriben** bundles. Cada uno construye el texto con f-strings y concatenaciones.
Migrar exige reescribir 43 escritores y 11 lectores, y el gate de 2.784 bundles
que hoy tarda segundos en correr se volvería un cuello de botella distinto.

El argumento "JSON es mejor formato" es cierto y no es un argumento. La pregunta
correcta es qué gain concreto compra y a qué coste, hoy.

## La decisión

**No se migra el corpus canónico.** Se mantiene Markdown como fuente de verdad y
JSON como proyección para el frontend, que es la arquitectura actual y funciona.

Motivo: el beneficio del formato es marginal para el problema real, y el coste
(43 escritores) es alto y propio. Además, el único formato que hoy garantiza
calidad es el gate que opera sobre Markdown: migrar el formato sin migrar el
gate sería cambiar de dónde se lee sin cambiar qué se verifica.

## Condiciones para reabrirlo

Reabrir sólo si **al menos una** se cumple, y siempre con migración por capas
(dual-write → readers → drop-write), nunca de golpe:

1. **Una regla de calidad no se puede expresses en Markdown.** Hoy no hay
   ninguna: el gate ya atrapa placeholders, feedback sin razón, feedback
   duplicado y filas de opción malformadas.
2. **Un consumidor nuevo necesita campos estructurados** que el Markdown
   representa con convención y no con tipo. Por ejemplo, un discriminante
   tipado para un grafo de ítems.
3. **El parseo por regex se vuelve un riesgo medible.** Señal: un bug nuevo
   causado por ambigüedad de formato en vez de por contenido.

## Si se reabre, el orden

1. Añadir un **lector** de JSON canónico junto al de Markdown. Sin escritura.
   `scripts/read-bundle.mjs` que parsee ambos y falle si difieren.
2. Doble escritura: cada generador escribe Markdown **y** JSON, y el gate
   compara que coinciden. Todavía nadie lee el JSON.
3. Mover los **11 lectores/validadores** al JSON. El gate sigue leyendo ambos.
4. Solo entonces, dejar de escribir Markdown.

El paso 1 es el barato y el que da información: si el JSON parseado no coincide
con el Markdown, ya sabes que hay 2.784 discrepancias lurking y no 0.

## Lo que NO es un motivo

- "JSON es más moderno." La modernity no es un requisito.
- "El frontend ya usa JSON." Usa una *proyección*, no la fuente. Cambiar la
  fuente no cambia el consumidor.
- "Es más fácil de parsear." Con un parser de Markdown escrito a mano, no. Con
  un reader que ya existe y funciona, tampoco.

## Referencia

`docs/AUDITORIA_FORMATO_JSON.md` tiene el detalle de la primera auditoría.
Este ADR actualiza los números con la medición del 2026-10-01 y añade la
condición de reapertura.
