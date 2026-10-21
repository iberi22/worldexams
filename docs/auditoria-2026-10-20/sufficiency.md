# Auditoría de suficiencia del banco de preguntas — WorldExams / SaberParaTodos

**Fecha:** 2026-10-20 · **Modo:** solo lectura (no se modificó ningún archivo del repo) · **Alcance:** `questions_data/` completo + `apps/worldexams-api/public/v1/packs/` + `src/ranked.ts` + `scripts/build-pack-manifest.mjs` + `scripts/audit-country-readiness.mjs` + `scripts/audit-duplicate-questions.mjs`.

**Artefactos generados** (fuera del repo, en `…/scratchpad/audit/`): `count-bank.mjs` + `bank-matrix.json` (matriz país/materia/grado), `ranked-detail.mjs` + `ranked-detail.json` (pool y packs resueltos por semana), `ranked-mc.mjs` + `ranked-mc.json` (Monte Carlo fiel al sampler de `ranked.ts`, 3 escenarios), `effective.mjs` + `effective.json` (enunciados únicos), `invisible.json` (bundles sin pack indexado), `gaps.json`, `dup-audit.txt` (auditoría oficial de duplicados), `readiness.json` (auditoría oficial de readiness).

**Método y verificación cruzada.** El conteo de preguntas y la validación estructural se hicieron con dos parsers independientes (Node en `count-bank.mjs` y un script Python distinto). Ambos coinciden: **3.027 bundles, 43.408 preguntas, 172.752 opciones**, sin discrepancias. No se inventó ningún dato: lo que no se ejecutó se dice explícitamente (p. ej. no se corrió el gate pedagógico `validate-bundles-v52.mjs` sobre todo el corpus).

---

## Resumen ejecutivo

1. **El banco es grande y estructuralmente sano, pero desigual.** 3.027 bundles canónicos con 43.408 preguntas en 20 países. El 100 % de las preguntas tiene exactamente 4 opciones y exactamente 1 `[x]`; `total_questions` coincide con el número real en 3.027/3.027 bundles; 0 preguntas caen en el filtro de placeholder de `ranked.ts` (`Pregunta de prueba N` / `Explicación detallada de la pregunta`); las 172.752 opciones tienen bloque `<!-- feedback: -->`.
2. **Suficiencia nominal ≠ suficiencia efectiva.** Descontando duplicados exactos (907 preguntas redundantes en 179 grupos, 2,09 % — dato del script oficial `audit-duplicate-questions.mjs`) y preguntas que solo cambian por números, quedan **38.943 enunciados únicos (89,7 %)**. En algunos países la caída es brutal: **Argentina 626/1.208 (51,8 %)**, Perú 72 %, Chile 80,3 %.
3. **Solo 4 países superan las 2.000 preguntas reales** (CO 21.476, SV 2.300, CL 2.100, PE 2.020) y **solo 2 superan 2.000 enunciados únicos** (CO 20.442, SV 2.039). La auditoría oficial (`npm run audit:country-readiness`) declara **13 países “ready”**, pero su métrica suma packs alias idénticos: **1.962 de los 5.141 packs del directorio son duplicados exactos de otro pack** del mismo país/semana/grado (38,2 %).
4. **El manifiesto commiteado está desfasado (producción hoy sirve; preview/local/CI no).** El `_manifest.json` del repo tiene 4.977 entradas frente a 5.141 packs en disco; `node apps/worldexams-api/scripts/build-pack-manifest.mjs --check` **falla con exit 1**. Son **164 packs sin indexar → 125 bundles / 1.196 preguntas** (114 bundles en Colombia grados 3/4/7/8/9 + 11 en Brasil 3.º EM). Verificado en vivo: **producción sí responde 200** para `co-week-1-grade-3-subject-sociales_ciudadanas.json` y `/v1/questions?country=co&grade=3&subject=sociales_ciudadanas&week=1` devuelve preguntas, porque `deploy-production.yml` regenera el manifiesto antes de `wrangler deploy`. El riesgo es para `deploy-preview.yml`, cualquier lectura local del worker y el gate de CI, que sí usan el artefacto commiteado. Además **17 packs** tienen nombre con mayúscula (`…-subject-Matematica.json`) y `resolveWeekPackNames` construye nombres en minúscula; producción también los sirve como asset estático, pero el worker nunca los selecciona.
5. **Ranked CO-11 sí tiene banco, pero el sampler lo desperdicia.** Hay 800 preguntas válidas por área (33 veces el mínimo de 24 de `RANKED_MIN_POOL_PER_AREA`), 40/40 semanas y 40 packs por área. Pero `RANKED_PACKS_PER_AREA = 3` y el `break` al llegar a 24 hacen que **la sesión real trabaje con un pool de 40 preguntas** (2 packs de 20) y **solo 9,0 de 40 semanas al mes**. Repetición medida con 100.000 ensayos: 5 ranked/mes → **39,2 preguntas distintas de 40 servidas por área (2,0 % de repetición)**, pero **45,9 % de probabilidad de repetir al menos una pregunta en el mes**. No es un problema de escasez, es de cobertura curricular.
6. **El defecto más grave de ranked está en matemáticas.** `colombia/matematicas/grado-11` tiene 800 preguntas pero solo **401 enunciados distintos (50,1 %)**: **21 de 40 semanas tienen ≤5 enunciados únicos en 20 preguntas**. Ejemplo exacto: `CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v1` (“…si $x = 1$”) y `-v2` (“…si $x = 2$”) son la misma pregunta con otro número. El **78,1 %** de las sesiones de matemáticas incluye al menos una de esas semanas y el **26,9 %** incluye dos, o sea 8 preguntas que son 1–5 problemas reales.
7. **Suficiencia por país para práctica:** 12 combinaciones país/materia/grado tienen <10 bundles; 2 de ellas son **ausencias totales en Colombia** (`sociales-ciudadanas` grado 8 y grado 10, 0 bundles, 0 semanas). Fuera de Colombia, **57 celdas pierden más de 10 de las 40 semanas**.

**Veredicto:** el banco alcanza para práctica y para ranked de un mes en Colombia, pero **no es suficiente para ranked sostenido de calidad** (por muestreo estrecho y plantillas de matemáticas) **ni para 13 países** (la cifra real es 4 países con ≥2.000 preguntas). Las tres intervenciones de mayor impacto no requieren escribir contenido nuevo: reindexar el manifest, eliminar los packs con mayúscula y reparar/regenerar las 21 semanas plantilla de CO-MAT-11.

---

## Ranked CO-11 (tabla por área)

Configuración medida en `apps/worldexams-api/src/ranked.ts`: `areas = [matematicas, lectura_critica, sociales_ciudadanas, ciencias_naturales, ingles]`, `target = 8` por área, `RANKED_PACKS_PER_AREA = 3`, `RANKED_MIN_POOL_PER_AREA = 24`, `PLACEHOLDER_RE` para descartar preguntas.

| Área | Dir. canónico | Bundles | Preguntas | Enunciados únicos | Semanas con pack | Pool real por sesión | Semanas alcanzables/mes (5 ranked) |
|---|---|---|---|---|---|---|---|
| matematicas | `colombia/matematicas/grado-11` | 40 | 800 | **401 (50,1 %)** | 40/40 | 40 | 9,0/40 |
| lectura_critica | `colombia/lectura-critica/grado-11` | 44 | 880 | 880 (100 %) | 40/40 | 42 | 8,6/40 |
| sociales_ciudadanas | `colombia/sociales-ciudadanas/grado-11` | 40 | 800 | 800 (100 %) | 40/40 | 40 | 9,0/40 |
| ciencias_naturales | `colombia/ciencias-naturales/grado-11` | 40 | 800 | 799 (99,9 %) | 40/40 | 40 | 9,0/40 |
| ingles | `colombia/ingles/grado-11` | 40 | 800 | 774 (96,8 %) | 40/40 | 40 | 9,0/40 |

**¿Cuántas preguntas válidas por área?** 800 por área (lectura crítica 880, también en packs: 36 packs de 20 + 4 de 40). El umbral de 24 se cumple 33 veces. **¿Cuántas semanas?** 40/40 en las cinco áreas, con 40 packs resueltos por área vía `resolveWeekPackNames`.

**Cómo se llega al pool de 40.** `ranked.ts` recorre las 40 semanas, resuelve un pack por semana y acumula hasta `pool.length >= 24` con tope de 3 packs. Como cada pack de CO-11 trae 20 preguntas (en `lectura_critica`, 4 semanas traen 40 porque dos bundles comparten semana y el generador los fusiona), el bucle corta **tras 2 packs → 40 preguntas**. Verificado leyendo los packs: `co-week-5-grade-11-subject-matematicas.json` = 20 preguntas, 4 opciones cada una.

**Riesgo de repetición para un estudiante que haga 5 ranked al mes** (simulación Monte Carlo fiel a `ranked.ts`: shuffle de los 40 packs del área, recorrer packs hasta `pool >= 24`, sacar 8 preguntas sin reemplazo; 100.000 ensayos por escenario, 20.000 a 150 sesiones):

| Sesiones/mes | Preguntas distintas servidas (por área) | Repetición | P(2 sesiones consecutivas comparten ≥1 pregunta) | P(el mes repite ≥1 pregunta) | Semanas distintas vistas |
|---|---|---|---|---|---|
| 5 | 39,2 de 40 | 2,0 % | 5,9 % | 45,9 % | 9,0/40 |
| 10 | 76,5 de 80 | 4,4 % | 5,8 % | 94,4 % | 16,1/40 |
| 30 | 208,2 de 240 | 13,2 % | 5,8 % | 100 % | 31,4/40 |
| 150 | 622,9 de 1.200 | 48,1 % | 5,9 % | 100 % | 40/40 |

Lectura: **la repetición entre dos sesiones es baja** (5,9 %), pero **el 45,9 % de los estudiantes repite al menos una pregunta en el mes** y un estudiante de 5 sesiones **solo ve el 22,5 % del currículo (9,0 de 40 semanas)**. El límite de `ranked.ts` es 5 sesiones/día por dispositivo (`deviceCount >= 5`), así que un usuario intensivo (30 sesiones/mes) ve 208 preguntas distintas con 13,2 % de repetición; a 150 sesiones ve 622,9 (77,9 % del banco de 800) con 48,1 % de repetición. Los valores por área están en `ranked-mc.json`; lectura crítica es la única con `pool` de 42 preguntas (packs fusionados de 40) y 8,6 semanas/mes.

**El problema real de ranked es matemáticas.** Distribución de enunciados únicos por semana en `colombia/matematicas/grado-11` (normalizando números y fórmulas):

```
W01:1/20 W02:1/20 W03:1/20 W04:1/20 W05:1/20 W06:1/20 W07:1/20 W08:1/20 W09:3/20 W10:1/20
W11:1/20 W12:4/20 W13:1/20 W14:1/20 W15:1/20 W16:1/20 W17:1/20 W18:1/20 W19:1/20 W20:1/20
W21:1/20 W22:20/20 … W40:20/20
```

Es decir: **W01–W21 son plantillas** (21 semanas), W22–W40 son contenido real. Caso testigo en `questions_data/colombia/matematicas/grado-11/2026/weekly/CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle.md`: `…-v1` pregunta “¿Cuál es la función que representa el modelo lineal $f(x) = 2x + 1$ si $x = 1$?” y `…-v2` la misma con $x = 2$. Probabilidad de que una sesión caiga en plantilla: 78,1 % al menos una semana, 26,9 % las dos.

**Hallazgo adicional de ranked: 3.840 preguntas de lengua son inalcanzables.** `getSubjectPackAliases("lectura_critica")` devuelve `["lectura_critica","lengua","lenguaje","espanol"]` y `resolveWeekPackNames` toma **el primer hit**. Como en Colombia existen packs `…-subject-lectura_critica` para las 40 semanas, el pack `…-subject-lengua` nunca se usa: **340 bundles / 3.840 preguntas de `colombia/lengua` (grados 3–11) quedan sombreados al 100 %** (verificado semana por semana). El diseño asume que los packs alias son “copias idénticas del canónico” (comentario en `index.ts`), pero aquí son materias distintas con IDs distintos (`CO-LEN-…` vs `CO-LC-…`).

**Cobertura de ranked por país (áreas con al menos 1 pack de grado 11):**

| País | Áreas | País | Áreas |
|---|---|---|---|
| colombia | **5/5** | spain | 3/5 |
| el-salvador | **5/5** | peru | 3/5 |
| honduras | **5/5** | ecuador | 3/5 |
| chile | 4/5 | mexico | 3/5 |
| costarica | 4/5 | argentina | 2/5 |
| puerto-rico | 4/5 | brasil, panama, guatemala, dominican_republic, nicaragua, guinea-ecuatorial | 1/5 |

Es decir: ranked completo (40 preguntas, 5 áreas) solo es posible en **3 países**. Con 1/5 el servidor entrega 8 preguntas y no puede cubrir el resto (`deficit` sin candidatos), aunque la sesión no falla.

---

## Cobertura por país

`bundles` y `preguntas` son solo `.md` canónicos bajo `questions_data/{país}/{materia}/grado-{N}/2026/weekly/`. `semanas faltantes` = suma de W01–W40 ausentes por cada celda país/materia/grado (referencia de 40 semanas por celda; por eso es mayor que 40). `enunciados únicos` normaliza números y fórmulas para detectar plantillas.

| País | Materias | Grados | Bundles | Preguntas | Semanas faltantes | Enunciados únicos | Bundles no publicables |
|---|---|---|---|---|---|---|---|
| colombia | 6 carpetas (5 canónicas) | 9 (3–11) | 1.921 | 21.476 | 182 | 20.442 (95,2 %) | **114** |
| el-salvador | 5 | 1 (11) | 115 | 2.300 | 85 | 2.039 (88,7 %) | 0 |
| chile | 5 | 1 (11) | 105 | 2.100 | 105 | 1.687 (80,3 %) | 0 |
| peru | 5 | 1 (11) | 101 | 2.020 | 99 | 1.455 (72,0 %) | 0 |
| mexico | 3 | 4 (3,4,5,11) | 95 | 1.804 | 170 | 1.381 (76,6 %) | 0 |
| costarica | 5 | 1 (11) | 84 | 1.680 | 116 | 1.534 (91,3 %) | 0 |
| puerto-rico | 4 | 1 (11) | 76 | 1.520 | 84 | 1.178 (77,5 %) | 0 |
| ecuador | 3 | 1 (11) | 70 | 1.400 | 50 | 1.206 (86,1 %) | 0 |
| spain | 3 | 1 (11) | 70 | 1.400 | 50 | 1.249 (89,2 %) | 0 |
| argentina | 4 | 3 (6,9,11) | 65 | 1.208 | 175 | **626 (51,8 %)** | 0 |
| bolivia | 4 | 1 (11) | 60 | 1.200 | 100 | 1.068 (89,0 %) | 0 |
| paraguay | 4 | 1 (11) | 60 | 1.200 | 100 | 1.113 (92,8 %) | 0 |
| uruguay | 4 | 1 (11) | 60 | 1.200 | 100 | 1.174 (97,8 %) | 0 |
| brasil | 2 | 2 (11, 3EM) | 51 | 1.020 | 69 | 1.010 (99,0 %) | **11** |
| honduras | 5 | 1 (11) | 44 | 880 | 156 | 840 (95,5 %) | 0 |
| dominican_republic | 1 | 1 (11) | 10 | 200 | 30 | 183 (91,5 %) | 0 |
| guatemala | 1 | 1 (11) | 10 | 200 | 30 | 194 (97,0 %) | 0 |
| guinea-ecuatorial | 1 | 1 (11) | 10 | 200 | 30 | 190 (95,0 %) | 0 |
| nicaragua | 1 | 1 (11) | 10 | 200 | 30 | 188 (94,0 %) | 0 |
| panama | 1 | 1 (11) | 10 | 200 | 30 | 186 (93,0 %) | 0 |
| **TOTAL** | — | — | **3.027** | **43.408** | **1.791** | **38.943 (89,7 %)** | **125 (1.196 preguntas)** |

Notas de la tabla:
- **Colombia tiene 6 carpetas de materia pero 5 materias canónicas**: `lectura-critica` y `lengua` colisionan en el alias `lectura_critica` (ver Inconsistencias #5).
- **Colombia es el único país con varios grados** (3–11) y el único que se acerca al objetivo de 40 semanas × 5 materias × 9 grados. Aun así le faltan 2 celdas completas y 9 parciales (ver Top 30).
- **`bundles no publicables`**: `.md` cuya semana no tiene pack resoluble en `_manifest.json`. Todos son Colombia grados 3/4/7/8/9 (lengua, sociales, ciencias, matemáticas) y Brasil 3.º EM. Los packs existen **en disco** pero no en el manifiesto → el worker devuelve 404 (comportamiento documentado en `AGENTS.md`, sección *Static Pack Publication*).
- Los 5 países con 200 preguntas tienen **una sola materia y un solo grado**: cobertura testimonial, no banco.
- El conteo de la auditoría oficial (13 países “ready”, 73.728 preguntas publicadas) **no es comparable**: suma packs alias idénticos. Ejemplo: Spain tiene 1.400 preguntas reales y el reporte oficial le atribuye 3.800.

---

## Inconsistencias de estructura/alias

1. **Carpeta de país duplicada: `elsalvador/` vs `el-salvador/`.** `questions_data/elsalvador/` tiene **200 archivos `.json` con 4.000 preguntas** (40 semanas × 5 materias) y **0 `.md`**; `questions_data/el-salvador/` tiene **115 `.md` con 2.300 preguntas**. `getCountryPackPrefixes()` (líneas 139-140 de `src/index.ts`) solo conoce `sv` y `el-salvador`, así que la carpeta sin guion es invisible para la API y para el generador de packs (que solo lee `.md`). Consecuencia doble: (a) El Salvador pierde 85 semanas que ya están escritas; (b) el JSON no es publicable tal cual porque usa otro esquema (`stem`/`correct` en vez de `[x]`) y su feedback es 80 % muerto/vago (`¡Correcto!`, `Incorrecto. Revisa el concepto.` — medido sobre las 16.000 opciones).
2. **`costarica/` (sin guion) no está en el mapa de prefijos.** `getCountryPackPrefixes` define `cr` y `costa-rica`; el fallback devuelve `[normalized]`, o sea `["costarica"]`. Hoy funciona porque los packs se llaman `cr-week-…`, pero cualquier llamada con `country=costarica` no resuelve nada. Mismo patrón de riesgo que `elsalvador`.
3. **17 packs con mayúsculas que el worker nunca selecciona.** `cl-week-{2,3,4,5,6,7,8,9,10}-grade-11-subject-Matematica.json` (9) y `pe-week-{11,12,14,15,16,17,18,19}-grade-11-subject-Matematica.json` (8). `resolveWeekPackNames` concatena alias y prefijos ya normalizados en minúscula, así que `…-subject-Matematica` nunca coincide. En Chile y Perú no hay daño funcional porque existe además el pack en minúscula (`matematicas`), pero son 17 archivos muertos y un riesgo si algún día son el único pack de la semana.
4. **Alias de materias incompleto.** `SUBJECT_PACK_ALIASES` cubre 5 áreas canónicas, pero `questions_data` usa **17 nombres de carpeta**: `matematicas`/`matematica`, `lectura-critica`/`lengua`/`lenguaje`/`espanol`, `sociales-ciudadanas`/`sociales`, `ciencias-naturales`/`ciencias`, `ingles`, y **fuera de alias**: `portugues` (Brasil, 20 bundles), `historia` (Chile, 10), `estudios-sociales` (Costa Rica, 11), `ciencias-sociales` (Perú, 10), `comunicacion` (Perú, 20). Los cinco últimos funcionan en práctica porque el pack se llama igual, pero **ranked nunca los pide** (sus 5 áreas no los incluyen): `comunicacion` de Perú (400 preguntas) y `portugues` de Brasil (400) no entran en ranked jamás.
5. **Sombreado `lengua` → `lectura_critica`.** Ya descrito: 340 bundles / 3.840 preguntas de `colombia/lengua` no se sirven porque el pack `lectura_critica` gana siempre en el orden de alias. El supuesto del código (“alias packs are identical copies”) es falso para Colombia.
6. **`_manifest.json` stale (artefacto commiteado).** 4.977 entradas vs 5.141 packs en disco; `--check` falla (exit 1); 164 packs sin índice → 125 bundles / 1.196 preguntas que, en cualquier entorno que use el manifiesto commiteado (preview, worker local, gate de CI), devuelven 404. Los packs están commiteados (`git ls-files` los lista) y no aparecen en `git status`, así que el desfase está commiteado, no es basura local. En producción **no** hay caída: verificado con `curl` que `co-week-1-grade-3-subject-sociales_ciudadanas.json` y `/v1/questions?country=co&grade=3&subject=sociales_ciudadanas&week=1` responden 200, porque el deploy regenera el manifiesto; lo que falta es el gate que impida commitear el artefacto desfasado. `audit-country-readiness.mjs` **no lee el manifiesto** (la palabra no aparece en el script), por eso reporta `validated_not_published_questions: 0` para Colombia y no detecta el problema.
7. **Packs alias duplicados: 1.962 de 5.141 (38,2 %).** Verificado por hash de IDs: `co-week-5-grade-11-subject-ingles`, `…-ing` y `…-english` son byte-equivalentes; `ar-week-1-grade-6-subject-english`, `…-ing`, `…-ingles` también. Inflan las métricas y gastan cupo de despliegue, pero no aportan preguntas.
8. **Semanas duplicadas en 11 celdas (39 bundles extra).** Chile matematicas 11 (10), México matematicas 11 (15), México lectura-critica 11 (10), Colombia lectura-critica 3 (10) y 11 (4), Colombia ingles 5 (3) y 9 (1), Colombia matematicas 5 (2), Colombia ciencias 5 (1), Colombia sociales 5 (1), Colombia lectura-critica 5 (1). Ejemplo: `CL-MAT-11-2026-W01-numeros-reales-001-MASTERY-bundle.md` y `CL-MAT-11-2026-W01-tema-w01-001-MASTERY-bundle.md` cubren la misma semana. El generador los fusiona en un pack de 40 preguntas, así que no se pierde contenido, pero rompe la regla de 20/bundle y duplica plantillas.
9. **481 bundles (15,9 %) con tema `tema-wNN`.** El `tema` del frontmatter y el nombre del archivo son literalmente `tema-w01`… sin tópico curricular: `argentina/matematicas/grado-11` completo (W01–W10), `chile/matematicas`, `chile/ciencias-naturales`, `mexico/matematicas`, `mexico/lectura-critica`, `peru/comunicacion`, `brasil/portugues`, `puerto-rico/matematicas`, y los 4×15 de Bolivia/Paraguay/Uruguay (lista completa en `effective.json`). Cumplen el validador estructural y violan el espíritu de `AGENTS.md` (“topic en kebab-case” descriptivo).
10. **`questions_data/cuentos/`** contiene 11 `.md` que no son bundles (cuentos + `LICENSE-CONTENT.md`); están dentro del árbol de datos y confunden cualquier conteo ingenuo (3.038 `.md` vs 3.027 bundles).
11. **Formato de opciones**: no hay ninguna inconsistencia — 0 preguntas con ≠4 opciones, 0 con ≠1 `[x]`, 0 con distractores duplicados textualmente, 0 con `total_questions` desalineado. La distribución real es 8 (663 bundles), 10 (460), 12 (572), 20 (1.321), coherente con `AGENTS.md` (G3-G5: 8; G6-G7: 10; G8-G10: 12; G11/3EM: 20).

---

## Top 30 huecos

Criterio: primero Colombia (país prioritario), ordenado por semanas faltantes; luego resto de países. `enunciados únicos/preguntas` mide plantillas (valores bajos = preguntas que solo cambian números).

| # | País | Materia | Grado | Bundles | Preguntas | Semanas | Faltan | Enunciados únicos |
|---|---|---|---|---|---|---|---|---|
| 1 | colombia | sociales-ciudadanas | 10 | 0 | 0 | 0/40 | 40 | **AUSENTE** |
| 2 | colombia | sociales-ciudadanas | 8 | 0 | 0 | 0/40 | 40 | **AUSENTE** |
| 3 | colombia | ingles | 10 | 13 | 156 | 13/40 | 27 | 156/156 |
| 4 | colombia | sociales-ciudadanas | 7 | 14 | 140 | 14/40 | 26 | 138/140 |
| 5 | colombia | sociales-ciudadanas | 3 | 15 | 120 | 15/40 | 25 | 119/120 |
| 6 | colombia | sociales-ciudadanas | 4 | 15 | 120 | 15/40 | 25 | 120/120 |
| 7 | colombia | ingles | 9 | 16 | 192 | 15/40 | 25 | 191/192 |
| 8 | colombia | ingles | 8 | 19 | 228 | 19/40 | 21 | 227/228 |
| 9 | colombia | lengua | 4 | 20 | 160 | 20/40 | 20 | 159/160 |
| 10 | colombia | ciencias-naturales | 3 | 28 | 224 | 28/40 | 12 | 224/224 |
| 11 | colombia | ciencias-naturales | 4 | 39 | 312 | 39/40 | 1 | 311/312 |
| 12 | honduras | ciencias-naturales | 11 | 1 | 20 | 1/40 | 39 | 20/20 |
| 13 | honduras | lengua | 11 | 1 | 20 | 1/40 | 39 | 20/20 |
| 14 | honduras | matematicas | 11 | 1 | 20 | 1/40 | 39 | 20/20 |
| 15 | honduras | sociales | 11 | 1 | 20 | 1/40 | 39 | 20/20 |
| 16 | argentina | ingles | 6 | 2 | 20 | 2/40 | 38 | 20/20 |
| 17 | mexico | matematicas | 3 | 2 | 16 | 2/40 | 38 | 16/16 |
| 18 | mexico | matematicas | 4 | 2 | 16 | 2/40 | 38 | 16/16 |
| 19 | argentina | ciencias-naturales | 6 | 4 | 40 | 4/40 | 36 | 40/40 |
| 20 | argentina | ingles | 9 | 4 | 48 | 4/40 | 36 | 48/48 |
| 21 | mexico | matematicas | 5 | 4 | 32 | 4/40 | 36 | 32/32 |
| 22 | argentina | matematicas | 11 | 10 | 200 | 10/40 | 30 | 199/200 |
| 23 | chile | historia | 11 | 10 | 200 | 10/40 | 30 | 200/200 |
| 24 | chile | lenguaje | 11 | 10 | 200 | 10/40 | 30 | **112/200 (56 %)** |
| 25 | dominican_republic | matematicas | 11 | 10 | 200 | 10/40 | 30 | 183/200 |
| 26 | ecuador | lengua | 11 | 10 | 200 | 10/40 | 30 | 199/200 |
| 27 | el-salvador | lengua | 11 | 10 | 200 | 10/40 | 30 | 200/200 |
| 28 | el-salvador | matematicas | 11 | 10 | 200 | 10/40 | 30 | **50/200 (25 %)** |
| 29 | guatemala | matematicas | 11 | 10 | 200 | 10/40 | 30 | 194/200 |
| 30 | guinea-ecuatorial | matematicas | 11 | 10 | 200 | 10/40 | 30 | 190/200 |

**Combinaciones con <10 bundles en modo práctica (12 en total):** las 2 ausencias de Colombia (sociales 8 y 10), las 4 de Honduras (1 bundle por materia salvo inglés), argentina inglés 6 (2), argentina ciencias 6 (4), argentina inglés 9 (4), méxico matemáticas 3/4 (2 cada una) y 5 (4). Todo el resto tiene ≥10 bundles, pero **57 combinaciones están por debajo de 30/40 semanas**.

**Huecos que no se ven en la tabla por estar “completos” en semanas pero vacíos en diversidad:** `colombia/matematicas/grado-11` (401/800), `colombia/ingles/grado-3` (160/320), `colombia/ingles/grado-6` (293/400), `colombia/ciencias-naturales/grado-6` (368/400), `chile/lenguaje/grado-11` (112/200), `el-salvador/matematicas/grado-11` (50/200), `argentina/ciencias-naturales/grado-11` (91/500 = 18,2 %).

---

## Recomendación

Ordenadas por impacto/esfuerzo. Ninguna de las P0 requiere escribir contenido nuevo.

**P0 — Publicar lo que ya existe (1–2 h, impacto: 1.196 preguntas recuperadas en preview/local y cierre del agujero de CI)**

1. Regenerar y commitear el manifiesto:
   ```bash
   node apps/worldexams-api/scripts/build-pack-manifest.mjs
   node apps/worldexams-api/scripts/build-pack-manifest.mjs --check   # debe salir exit 0
   ```
   Elimina el desfase de 164 packs / 125 bundles / 1.196 preguntas (Colombia grados 3, 4, 7, 8, 9 y Brasil 3.º EM). Añadir `--check` como gate obligatorio en CI **antes** de `wrangler deploy` y en `deploy-preview.yml`: hoy el paso existe en `deploy-production.yml` (por eso producción responde 200) pero el artefacto commiteado está desfasado y nada lo detecta.
2. Borrar o renombrar a minúscula los 17 packs `…-subject-Matematica.json` (CL semanas 2–10, PE semanas 11, 12 y 14–19). Antes de borrar, comprobar que la semana tiene el pack en minúscula (hoy sí en ambos países).

**P1 — Reparar ranked CO-11 (impacto directo en el producto estrella)**

3. **Regenerar `colombia/matematicas/grado-11` W01–W21.** 21 semanas con ≤5 enunciados únicos no son un banco: son una plantilla. Objetivo medible: ≥15 enunciados únicos por pack de 20 (hoy W22–W40 ya cumplen). Gate propuesto en `scripts/`: fallar si `uniqueNormalizedStems / questions < 0.75` en cualquier bundle de matemáticas.
4. **Ampliar el pool por sesión (cobertura, no repetición).** Hoy el `break` en `RANKED_MIN_POOL_PER_AREA = 24` corta tras 2 packs de 20, así que **subir sólo `RANKED_PACKS_PER_AREA` no cambia nada**: hay que subir el corte a 80 y el tope a 4 packs. Medido con `ranked-mc.mjs` (5 sesiones/mes): las semanas vistas pasan de **9,0 a 16,4 de 40**. La repetición mensual incluso sube algo (45,9 % → 53,7 %) porque se sirven más preguntas del mismo pool; el cuello de botella es cuántas preguntas se sirven por sesión y cuánta diversidad hay en cada pack, no el tamaño del pool.
5. **Diversificar por enunciado, no por ID.** El sampler deduplica por `q.id`, y por eso sirve 8 preguntas que son la misma plantilla con otro número. Añadir dedupe por `normalizeStem(statement)` dentro de la sesión (y opcionalmente penalizar semanas con baja diversidad al elegir packs).
6. **Resolver el sombreado `lengua`.** O bien `lengua` deja de ser alias de `lectura_critica` y pasa a ser área propia (con `getSubjectPackAliases` sin colisión), o se concatenan ambos pools. Hoy se pierden 3.840 preguntas de Colombia en ranked y en práctica.

**P1 — Cobertura Colombia (contenido nuevo donde de verdad falta)**

7. Crear `colombia/sociales-ciudadanas/grado-8/2026/weekly/` y `…/grado-10/…` (40 semanas × 20 = 800 preguntas cada una). Son las **únicas dos celdas totalmente ausentes** en el país prioritario.
8. Completar las 9 celdas parciales de Colombia: inglés 10 (27 semanas), sociales 7 (26), sociales 3 y 4 (25 cada una), inglés 9 (25), inglés 8 (21), lengua 4 (20), ciencias 3 (12), ciencias 4 (1). Total ≈ 182 semanas ≈ 2.900 preguntas para dejar Colombia en 40/40 × 5 materias × 9 grados.

**P2 — Higiene estructural y métricas honestas**

9. **Consolidar `elsalvador/` y `el-salvador/`.** Convertir los 85 bundles JSON que faltan en `.md` canónicos **regenerando el feedback** (80 % del actual es muerto/vago y el gate pedagógico lo rechazaría). Ganancia: El Salvador pasa de 2.300 a ~4.000 preguntas. Borrar la carpeta JSON después, para que nadie vuelva a contar 4.000 preguntas fantasmas.
10. **Añadir alias faltantes a `getCountryPackPrefixes`**: `costarica`, `elsalvador`, `dominicanrepublic`, `puertorico`, `guineaecuatorial` (normalizados sin guion). Y a `SUBJECT_PACK_ALIASES`: `portugues`, `historia`, `estudios_sociales`, `ciencias_sociales`, `comunicacion`. Sin esto, 5 países quedan con 1/5 áreas en ranked y `comunicacion`/`portugues` (800 preguntas) no entran nunca.
11. **Corregir la métrica de readiness.** `audit-country-readiness.mjs` debe (a) leer `_manifest.json` para distinguir “publicado” de “en disco”, y (b) deduplicar packs alias por hash de IDs. Con eso el reporte pasaría de “13 países ready” a la realidad: **4 países con ≥2.000 preguntas y 2 con ≥2.000 enunciados únicos**. Publicar además la columna de enunciados únicos: es la que mide si el estudiante ve preguntas distintas.
12. **Eliminar o reescribir los 481 bundles `tema-wNN`.** Prioridad: Argentina (26 bundles, efectividad 51,8 %), El Salvador matemáticas (50/200), Chile lenguaje (112/200), y los 60 de Bolivia/Paraguay/Uruguay por materia.
13. **Deduplicar las 907 preguntas repetidas** (179 grupos). El peor caso es `colombia/ingles/grado-3`: el mismo ítem aparece **51 veces** (grupo `706496fcae097f56`: `CO-ING-3-2026-W01-greetings-farewells-001-MASTERY-bundle-v1` repetido en W01, W08, W09, W12, W13 y 46 ubicaciones más; hay un segundo grupo de 51x con `-v7`/`-v8`). Es el 2,09 % del corpus, pero cae justo en el grado donde el banco es más pequeño (160 enunciados únicos de 320).
14. **Añadir un gate de semanas duplicadas** (11 celdas, 39 bundles) para que dos bundles no compitan por la misma semana: hoy el pack fusiona 40 preguntas y rompe la regla de 20/bundle de `AGENTS.md`.

**Qué NO hacer:** no generar más bundles en países con 1 materia/1 grado (PA, GT, DO, NI, GQ: 200 preguntas cada uno) antes de completar un grado con las 5 materias. Un grado completo (5 × 40 × 20 = 4.000) vale más para ranked y práctica que 20 grados con una sola materia.

**Verificación de cierre sugerida**

```bash
node apps/worldexams-api/scripts/build-pack-manifest.mjs --check          # exit 0
node scripts/audit-duplicate-questions.mjs | head -5                      # redundantes < 1 %
node scripts/audit-country-readiness.mjs --json | jq '.summary'           # con métrica deduplicada
node …/scratchpad/audit/ranked-mc.mjs                                       # semanas/mes y repetición post-cambio
curl -s -o /dev/null -w "%{http_code}\n" \
  https://api.saberparatodos.space/v1/packs/co-week-1-grade-3-subject-sociales_ciudadanas.json   # hoy ya 200; el gate es el --check
```

**Comprobaciones en vivo hechas durante esta auditoría** (no se hizo `POST /v1/ranked/start` para no crear sesiones): `co-week-1-grade-3-subject-sociales_ciudadanas.json` → 200; `co-week-5-grade-11-subject-matematicas.json` → 200; `cl-week-5-grade-11-subject-Matematica.json` → 200 (asset estático, aunque el worker no lo selecciona); `/v1/questions?country=co&grade=11&subject=matematicas&week=1` → 20 preguntas (`source: worker-assets`). El manifiesto **no** es accesible por HTTP público: `GET /v1/packs/_manifest.json` devuelve `{"error":"NOT_FOUND"}`, lo lee el worker vía `env.ASSETS`.
