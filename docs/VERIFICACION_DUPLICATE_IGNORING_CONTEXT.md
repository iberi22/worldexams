# Verificación fresca tras la regla `duplicate-ignoring-context`

> 2026-10-01. Registrado porque los dos scripts editados no tenían evidencia
> posterior al cambio. Qué corrió y qué demuestra realmente cada cosa.

| Puerta | Resultado | Qué prueba |
|---|---|---|
| `node --check` en ambos scripts | limpio | sintaxis |
| `node scripts/test-feedback-gate.mjs` | 67 passed, 0 failed | los 3 casos nuevos de la regla, más los 64 previos |
| `npm run test:quality` | rc=0 | las cinco suites encadenadas con `&&`: 67 + 9 + 6 + 7 (node) y 16 (python) |
| `pnpm run lint` | rc=0 | `eslint src/` |
| `pnpm run build` | rc=0, `Complete!` | build de Astro |
| `hermes verify --json` | `ok: true`, 7/7 fases | bootstrap, build y las cinco de test |

## `test:scripts` devuelve 1, y está bien que devuelva 1

Las secciones `syntax` y `suites` pasan. Sólo falla `corpus`, por los 1.075
`duplicate-question` y `duplicate-ignoring-context` que los agentes en marcha
están reparando. Eso es el gate funcionando, no una regresión.

## El `statusCode: 404` del readiness no es esta app

`hermes verify` reporta `readiness.url = http://127.0.0.1:8000/` con
`ready: true` y `statusCode: 404`. El puerto 8000 ya está ocupado por un
servicio ajeno que responde en español:

```
$ curl http://127.0.0.1:8000/
{"message":"Recurso no encontrado."}
```

Comprobado aparte, en un puerto libre (8231):

| Ruta | Estado | Tamaño |
|---|---|---|
| `/` | 200 | — |
| `/exams/co/` | 200 | 67.210 bytes |
| `/exams/co/practice/` | 200 | 77.721 bytes |

**`ready: true` con un 404 no debe leerse como un arranque limpio.** La recipe
detecta el proyecto como app Node y arranca con puerto 8000 por defecto, que
choca con lo que ya esté escuchando ahí.

## Tres variables sin usar, preexistentes

`eslint scripts/` reporta `JUNK_PRAISE`, `PLACEHOLDER_OPTION` y
`PLACEHOLDER_STEM` sin usar. Las tres existen en `HEAD` y no aparecen en
ninguna de las líneas añadidas por este trabajo.

No se tocan. `scripts/` está fuera del objetivo de lint del repo, y borrar
constantes de otro actor en mitad de una campaña no es limpieza.

## El `test:scripts` que hay que correr

```bash
npm run test:scripts
```

Cubre sintaxis de `.mjs`/`.py`, las cinco suites, el corpus y el idioma.
`pnpm run test` es sólo validación de secretos y `pnpm run lint` es sólo
`eslint src/`. Ninguno de los dos toca `scripts/`.
