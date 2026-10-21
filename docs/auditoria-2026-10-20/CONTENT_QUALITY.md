# Calidad de contenido — línea base y reparaciones (W2.10)

Fecha: 2026-10-21 · rama base `develop`.

Fuente de datos: `node scripts/validate-bundles-v52.mjs --strict-quality --all-duplicates --json` sobre
todo `questions_data/`. El resumen legible por máquina (por país y por archivo que falla) está en
`content-baseline.json`, en esta misma carpeta (claves `baseline_develop` y `after_w2_10`).

Columnas:

- **Fallan strict**: bundles con al menos un ERROR bajo `--strict-quality`.
- **Enunciados únicos**: enunciados distintos tras normalizar espacios y mayúsculas.
- **Plantillas únicas**: lo mismo, pero sustituyendo cada número por `#`. Detecta los clones
  "misma pregunta con otro número" que el validador no ve (p. ej. CO-MAT-11 W01–W21).

## Línea base (develop, antes de este cambio)

| País | Bundles | Fallan strict | Preguntas | Enunciados únicos | % únicos | Plantillas únicas (dígitos→#) | Errores por regla |
|---|---:|---:|---:|---:|---:|---:|---|
| argentina | 65 | 14 | 1208 | 1141 | 94.5 | 826 (68.4%) | answer-letter-bias 10, explanation-template 3, explanation-short 1 |
| bolivia | 60 | 8 | 1200 | 1174 | 97.8 | 1070 (89.2%) | explanation-short 5, answer-letter-bias 2, explanation-template 2 |
| brasil | 51 | 20 | 1020 | 1020 | 100.0 | 1016 (99.6%) | explanation-short 23, answer-letter-bias 13, explanation-template 1 |
| chile | 105 | 64 | 2100 | 1849 | 88.0 | 1708 (81.3%) | duplicate-question 318, explanation-short 194, answer-letter-bias 13, explanation-template 1 |
| colombia | 1921 | 490 | 21475 | 20858 | 97.1 | 20460 (95.3%) | explanation-short 543, answer-letter-bias 271, duplicate-question 168, explanation-template 58 |
| costarica | 84 | 14 | 1680 | 1603 | 95.4 | 1547 (92.1%) | duplicate-question 20, explanation-template 11, answer-letter-bias 6 |
| dominican_republic | 10 | 10 | 200 | 192 | 96.0 | 192 (96.0%) | explanation-short 155 |
| ecuador | 70 | 16 | 1400 | 1234 | 88.1 | 1234 (88.1%) | duplicate-question 100, explanation-short 13, explanation-template 10, answer-letter-bias 1 |
| el-salvador | 115 | 30 | 2300 | 2189 | 95.2 | 2040 (88.7%) | explanation-short 57, explanation-template 10, answer-letter-bias 5 |
| guatemala | 10 | 1 | 200 | 200 | 100.0 | 200 (100.0%) | answer-letter-bias 1 |
| guinea-ecuatorial | 10 | 1 | 200 | 200 | 100.0 | 200 (100.0%) | answer-letter-bias 1 |
| honduras | 44 | 3 | 880 | 840 | 95.5 | 840 (95.5%) | duplicate-question 60 |
| mexico | 95 | 10 | 1804 | 1711 | 94.8 | 1409 (78.1%) | explanation-short 8, answer-letter-bias 7 |
| nicaragua | 10 | 2 | 200 | 200 | 100.0 | 200 (100.0%) | explanation-short 2, answer-letter-bias 1 |
| panama | 10 | 6 | 200 | 200 | 100.0 | 200 (100.0%) | explanation-short 21 |
| paraguay | 60 | 17 | 1200 | 1188 | 99.0 | 1118 (93.2%) | explanation-short 52, answer-letter-bias 10, explanation-template 3 |
| peru | 101 | 27 | 2020 | 1768 | 87.5 | 1457 (72.1%) | duplicate-question 160, explanation-template 13, answer-letter-bias 6 |
| puerto-rico | 76 | 11 | 1520 | 1391 | 91.5 | 1180 (77.6%) | duplicate-question 120, answer-letter-bias 5 |
| spain | 70 | 11 | 1400 | 1275 | 91.1 | 1275 (91.1%) | duplicate-question 140, answer-letter-bias 5 |
| uruguay | 60 | 6 | 1200 | 1198 | 99.8 | 1198 (99.8%) | answer-letter-bias 4, explanation-short 2 |
| **Total** | 3027 | 761 | 43407 | | | | duplicate-question 1086, explanation-short 1076, answer-letter-bias 361, explanation-template 112 |

## Después de W2.10

Misma medición tras los cambios de esta rama (`--strict-quality --all-duplicates` sobre todo `questions_data/`).

| País | Fallan strict (antes → después) | Plantillas únicas antes | Plantillas únicas después | Errores restantes |
|---|---|---:|---:|---|
| argentina | 14 → 1 | 826 (68.4%) | 1172 (97.0%) | explanation-short 1 |
| bolivia | 8 → 6 | 1070 (89.2%) | 1070 (89.2%) | explanation-short 5, explanation-template 2 |
| brasil | 20 → 9 | 1016 (99.6%) | 1016 (99.6%) | explanation-short 23, explanation-template 1 |
| chile | 64 → 54 | 1708 (81.3%) | 1708 (81.3%) | duplicate-question 318, explanation-short 194, explanation-template 1 |
| colombia | 490 → 204 | 20460 (95.3%) | 21005 (97.8%) | explanation-short 543, explanation-template 18 |
| costarica | 14 → 12 | 1547 (92.1%) | 1547 (92.1%) | duplicate-question 20, explanation-template 11 |
| dominican_republic | 10 → 10 | 192 (96.0%) | 192 (96.0%) | explanation-short 155 |
| ecuador | 16 → 15 | 1234 (88.1%) | 1234 (88.1%) | duplicate-question 100, explanation-short 13, explanation-template 10 |
| el-salvador | 30 → 27 | 2040 (88.7%) | 2040 (88.7%) | explanation-short 57, explanation-template 10 |
| guatemala | 1 → 0 | 200 (100.0%) | 200 (100.0%) | — |
| guinea-ecuatorial | 1 → 0 | 200 (100.0%) | 200 (100.0%) | — |
| honduras | 3 → 3 | 840 (95.5%) | 840 (95.5%) | duplicate-question 60 |
| mexico | 10 → 3 | 1409 (78.1%) | 1409 (78.1%) | explanation-short 8 |
| nicaragua | 2 → 1 | 200 (100.0%) | 200 (100.0%) | explanation-short 2 |
| panama | 6 → 6 | 200 (100.0%) | 200 (100.0%) | explanation-short 21 |
| paraguay | 17 → 15 | 1118 (93.2%) | 1118 (93.2%) | explanation-short 52, explanation-template 3 |
| peru | 27 → 21 | 1457 (72.1%) | 1457 (72.1%) | duplicate-question 160, explanation-template 13 |
| puerto-rico | 11 → 6 | 1180 (77.6%) | 1180 (77.6%) | duplicate-question 120 |
| spain | 11 → 7 | 1275 (91.1%) | 1275 (91.1%) | duplicate-question 140, answer-letter-bias 1 |
| uruguay | 6 → 2 | 1198 (99.8%) | 1198 (99.8%) | explanation-short 2 |
| **Total** | **761 → 402** | | | antes: duplicate-question 1086, explanation-short 1076, answer-letter-bias 361, explanation-template 112 · después: explanation-short 1076, duplicate-question 918, explanation-template 69, answer-letter-bias 1 |

Los 402 bundles que siguen fallando son deuda previa que esta rama no tocó en contenido. Ninguno de los bundles
reescritos o reparados falla: el validador estricto da 0 errores y `check-feedback-language.mjs` 0 violaciones
sobre todos ellos.

## Qué se hizo

| Paso | Alcance | Resultado |
|---|---|---|
| 2. CO-ING-3 | W01, W08, W09, W12, W13, W16, W17, W20, W23, W25, W27–W29, W31–W33, W35–W37, W39, W40 (21 bundles, 168 preguntas) | Eran copias byte a byte de un set de vocabulario de viajes para adultos. Ahora tienen 8 ítems A1 originales sobre el tema de la semana, contexto colombiano, feedback en inglés por opción, explicación en español y clave balanceada distinta por bundle. Los otros 19 bundles ya eran propios y no se tocaron. |
| 3. CO-MAT-11 | W01–W21 (21 bundles, 420 preguntas) | Cada semana era una sola plantilla repetida 20 veces con otro número (W01 preguntaba "¿cuál es la función…?" y respondía con un número). Ahora tiene 20 ítems estilo Saber 11 de un único tema coherente: cálculo, interpretación, análisis de errores y modelación. Las claves y distractores se verificaron con sympy y el LaTeX es compatible con KaTeX. |
| 4. Claves factuales | SPRINT_ESTABILIDAD C4–C6 | Las claves de C4 (SOC W40 v1/v7/v10), C5 (CN W20 v5, CN W40 v8) y C6 (LC W31 v12) ya estaban corregidas en develop (c2c23b2). Se corrigieron los residuos de los informes: feedback de Thomson (CN W40), curules FARC (SOC W10 Q16: Acto Legislativo 03 de 2017), erratas y cláusula ilegible en SOC W40, y letras A–D ordenadas sin líneas en blanco dobles en SOC W34–W40. |
| 4. Letras | 351 bundles con `answer-letter-bias` | Se reetiquetó la opción correcta de 1–2 ítems por bundle para que ninguna letra quede sin usar ni supere el 50 %. Texto, clave y feedback quedan intactos y las opciones se ordenan A–D. Se comprobó por script que el contenido de cada pregunta y su respuesta correcta no cambiaron. Los bundles que compartían una clave publicada (CO-LC-4 W33/W37–W40, CO-SOC-6 W25–W27) ahora tienen claves distintas. |
| 5a. Argentina | AR-MAT-11 W12–W20 y AR-CIE-11 W11–W20 (19 bundles, 380 preguntas) | Eran una plantilla numérica repetida 20 veces por bundle (o 4 plantillas × 5 en W18 y W20 de ciencias). Ahora tienen 20 ítems originales por bundle, contexto argentino, `**EJE:**` y ARS, con claves verificadas. Las plantillas únicas de Argentina pasan de 68,4 % a 97,0 %. |
| 5b. CO-ING-11 | W01–W40 (40 bundles) | 173 ítems "According to a recent report…" sin texto que leer ahora tienen un pasaje original de 60–110 palabras. El ítem "barking up the wrong tree" se conserva una vez por bundle; las ~100 copias se reemplazaron por diálogos con modismos y phrasal verbs distintos. Se rehicieron los 32 ítems B1 con clave agramatical o sin opción válida de `coh-ingles.md`. Cada bundle conserva su letra de clave original. |
| Packs | `apps/worldexams-api/public/v1/packs` | Se regeneraron con el comando documentado (`--changed-only`) más el manifiesto. `build-pack-manifest.mjs --check` pasa con 5142 packs. |

## Lo que queda

- **Clon de vocabulario de viajes en ING-11 de otros países**: CR, EC, HN, PE, PR y ES (unos 45 bundles) comparten
  las mismas preguntas ("accommodation", "itinerary"…). Esto explica la mayor parte de los 918 `duplicate-question`
  restantes junto con Chile (318), Perú (160) y España (140). ES-ING-11 W19 se dejó como en develop para no meter
  esos clones en el alcance de CI de esta rama.
- **`explanation-short` (1076)**: las explicaciones de menos de 80 caracteres siguen sin tocar. Se concentran en
  Colombia (543), Chile (194) y República Dominicana (155). Hay que escribirlas a mano o regenerarlas; alargarlas
  automáticamente no aporta nada.
- **CO-ING-11, detalles no bloqueantes**: algunos ítems conservados empiezan con "The same report…" sin pasaje
  (W32, W33, W35, W36, W38); Q1 ("exacerbate") y Q11 ("Hardly…") son iguales en W31–W40; hay etiquetas
  "(Topic: …)" que no corresponden al ítem; W38 Q13 usa "Scarcely … than".
- **CO-CN-11 W30**: el contexto de plantilla con "Daniela" sigue en los 20 ítems; el informe recomienda regenerarlo.
- **Verificación humana**: los pasajes de CO-ING-11 citan hechos colombianos reales (9-abr-1948, Constitución de
  1991, Ley 2101 de 2021 de 48 a 42 h, vallenato en la lista de salvaguardia urgente de la UNESCO en 2015). Los
  revisó el orquestador, pero conviene una lectura humana antes de pasarlos a ranked.
