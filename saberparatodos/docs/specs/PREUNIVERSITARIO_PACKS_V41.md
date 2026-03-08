# PREUNIVERSITARIO_PACKS_V41.md

Last update: 2026-03-07
Scope: Top 10 universidades de Colombia para el modulo preuniversitario.

## 1. Objetivo
Definir como se crean `packs de 5 .md` por enfoque academico, alineados con cada universidad y compatibles con la logica del protocolo `v4.1+`.

Cada `pack` no es un examen completo. Es una unidad corta de entrenamiento intensivo.

## 2. Regla de producto
Para cada universidad del Top 10 se deben crear 3 niveles de experiencia:
1. Diagnostico corto
2. Practica por enfoque academico
3. Simulacro realista completo

Los `packs de 5 .md` pertenecen al nivel 2: practica por enfoque academico.

## 3. Estructura por universidad
Cada universidad debe tener:
- 1 `institution profile`
- 1 `core blueprint`
- N `packs de enfoque`
- 1 `mock core` final

## 4. Enfoques academicos
Los enfoques se definen por la huella real del examen de la universidad.

Ejemplos:
- `lectura-critica`
- `razonamiento-logico`
- `razonamiento-cuantitativo`
- `ciencias-basicas`
- `analisis-textual`
- `analisis-de-imagen`

No todas las universidades comparten los mismos enfoques.

## 5. Regla de packs
Por cada enfoque academico validado se crean `5 archivos .md`.

Cada archivo debe representar una sesion corta y util:
- Pack 1: fundamentos
- Pack 2: reconocimiento de patrones
- Pack 3: dificultad media
- Pack 4: dificultad alta
- Pack 5: transferencia y presion de tiempo

## 6. Estructura sugerida de carpetas
```text
docs/preuniversitario/top-10/[universidad-slug]/[enfoque]/
  pack-01.md
  pack-02.md
  pack-03.md
  pack-04.md
  pack-05.md
```

Ejemplo:
```text
docs/preuniversitario/top-10/udea/razonamiento-logico/pack-01.md
```

## 7. Contrato de cada pack
Cada `.md` debe incluir:
- universidad
- enfoque
- pack_number
- objetivo
- blueprint_ref
- source_refs
- dificultad dominante
- tiempo sugerido
- reactivos originales

## 8. Regla de autoria
Los reactivos deben ser:
- originales
- inspirados en estructura y competencias observadas en fuentes publicas
- no copiados literalmente de examenes anteriores

No esta permitido:
- reproducir en bloque preguntas de examenes pasados
- copiar verbatim enunciados u opciones de materiales protegidos
- usar blogs no oficiales como fuente primaria de blueprint

## 9. Regla de fuentes
Se permiten como fuente base:
- portales oficiales de admision
- guias oficiales
- simulacros oficiales
- modelos o preguntas ejemplo publicados por la universidad

Si existe un reactivo historico publicado publicamente:
- se puede usar solo como referencia de patron
- no como texto a replicar

## 10. Forma util para el estudiante
El orden recomendado dentro de cada universidad es:
1. Ver huella del examen
2. Hacer diagnostico corto
3. Trabajar packs por enfoque
4. Presentar simulacro core
5. Entrar a overlay por carrera, si aplica

## 11. Plantilla minima
```yaml
---
track: "preuniversitario"
protocol_version: "4.1+"
institution_slug: "udea"
focus_slug: "razonamiento-logico"
pack_number: 1
pack_role: "fundamentos"
timebox_minutes: 18
question_count: 5
blueprint_ref: "co-preu-udea-core"
source_refs:
  - "https://www.udea.edu.co/admisionespregrado"
---
```

## 12. Convencion de nombres
Formato:
`CO-PREU-[UNIV]-[FOCUS]-[###]-pack-[NN].md`

Ejemplo:
`CO-PREU-UDEA-razonamiento-logico-001-pack-01.md`

## 13. Siguiente capa
Cuando los packs ya existan:
- se seleccionan reactivos de varios packs
- se ensamblan en un `mock core`
- el mock respeta pesos y tiempos del blueprint institucional
