# Calidad de contenido — línea base y reparaciones (W2.10)

Fecha: 2026-10-21 · rama base `develop`.

Fuente de datos: `node scripts/validate-bundles-v52.mjs --strict-quality --all-duplicates --json` sobre
todo `questions_data/`. El resumen legible por máquina (por país y por archivo que falla) está en
`content-baseline.json`, en esta misma carpeta.

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
