# Preuniversitario Top 10 Eligibility Matrix

Last update: 2026-03-07
Scope: clasificacion operativa del top 10 entre universidades `exam-first`, universidades `overlay-first` y casos en conflicto.

## 1. Regla de clasificacion

### `exam-first`
La admision regular de pregrado depende de un examen institucional general.

### `overlay-first`
La admision regular depende de `Saber 11` u otro puntaje base, pero existen pruebas especificas por programa que si justifican overlays.

### `hold`
Existe conflicto entre fuentes o no hay evidencia suficiente para diseñar un mock confiable.

## 2. Matriz actual

### 2.1 UNAL
Clasificacion:
- `exam-first`

Estado:
- `verified`

Razon operativa:
- la pagina oficial de prueba de admision publica una estructura general de `120 preguntas` y `3.5 horas`

Fuentes:
- https://admisiones.unal.edu.co/pregrado/
- https://admisiones.unal.edu.co/pregrado/prueba-de-admision/

Decision:
- mantener en flujo completo `profile -> blueprint -> packs -> mock core`

### 2.2 UdeA
Clasificacion:
- `exam-first`

Estado:
- `verified`

Razon operativa:
- la convocatoria 2026-2 publica un examen general con `80 preguntas`, `3 horas` y dos componentes oficiales

Fuentes:
- https://www.udea.edu.co/wps/portal/udea/web/inicio/estudiar-udea/quiero-estudiar-udea/pregrado/
- https://www.udea.edu.co/wps/portal/udea/web/inicio/estudiar-udea/quiero-estudiar-udea/pregrado/calendario-guias-admision/

Decision:
- mantener en flujo completo `profile -> blueprint -> packs -> mock core`

### 2.3 UIS
Clasificacion:
- `overlay-first`

Estado:
- `in_research`

Razon operativa:
- el procedimiento oficial de seleccion de aspirantes a pregrado indica admision regular por ponderaciones y reglas institucionales
- la evidencia localizada solo deja un caso especial claro por programa: `Licenciatura en Musica`

Fuentes:
- https://documentos.uis.edu.co/wp-content/uploads/2024/12/procedimiento-de-seleccion-de-aspirantes-a-pregrado.pdf
- https://uis.edu.co/inscripciones/

Decision:
- sacar a `UIS` del flujo `mock core` general
- conservarla solo si se abre overlay especifico por programa

### 2.4 UTP
Clasificacion:
- `overlay-first`

Estado:
- `in_research`

Razon operativa:
- la evidencia oficial localizada para 2026-1 muestra apertura de inscripciones, calendario y reglamento de admision, pero no un examen institucional general documentado

Fuentes:
- https://utp.edu.co/aspirantes/
- https://registro.utp.edu.co/calendario-vigente/2091/calendario-inscripciones-pregrado-segundo-semestre-2025/
- https://secretariageneral.utp.edu.co/reglamentoestudiantil/titulo-segundo-de-los-estudiantes-de-pregrado/capitulo-iii-de-la-admision/articulo-11/

Decision:
- no abrir `mock core` general
- mantener en observacion para programas con filtro adicional real

### 2.5 Univalle
Clasificacion:
- `overlay-first`

Estado:
- `in_research`

Razon operativa:
- el sitio de admisiones y reglamentos oficiales muestran seleccion por ponderaciones del `Saber 11`
- algunas unidades academicas publican pruebas adicionales de aptitud por programa, por ejemplo en artes o diseno

Fuentes:
- https://admisiones.univalle.edu.co/
- https://admisiones.univalle.edu.co/new/_new/interior/reglamentos/RCA%20196-14-10-2021-Oferta%20pregrado%202022-1_Cali.pdf
- https://diseno.univalle.edu.co/aspirantes

Decision:
- trabajar overlays por programa, no mock institucional general

### 2.6 UPTC
Clasificacion:
- `hold`

Estado:
- `in_research`

Razon operativa:
- hay evidencia de convocatorias e inscripciones 2026, pero no esta cerrada aun la regla de admision para decidir si existe un examen general o solo filtros por programa

Fuentes:
- https://www.uptc.edu.co/sitio/portal/cal_not_eve/noticias/det/UPTC-tiene-abiertas-las-inscripciones-para-programas-de-pregrado-para-el-primer-semestre-de-2026/
- https://www.uptc.edu.co/sitio/portal/sitios/universidad/vic_aca/adm_reg/

Decision:
- no producir blueprint todavia

### 2.7 UniCauca
Clasificacion:
- `hold`

Estado:
- `in_research`

Razon operativa:
- existe una pagina oficial de `examen de admision` que describe una prueba de `100 preguntas` y `3 horas`
- pero el `Manual proceso de admisiones 2026` describe para el periodo vigente un mecanismo de seleccion por ponderaciones de `Saber 11`
- las dos fuentes chocan y no deben mezclarse en un mock

Fuentes:
- https://portal.unicauca.edu.co/versionP/admisiones/admisiones-pregrado/examen-de-admision
- https://www.unicauca.edu.co/wp-content/uploads/2025/12/Manual-proceso-de-admisiones-2026.pdf

Decision:
- congelar perfil y blueprint hasta resolver conflicto normativo

### 2.8 UniCartagena
Clasificacion:
- `hold`

Estado:
- `in_research`

Razon operativa:
- aun no hay evidencia oficial suficiente consolidada en el dossier para afirmar examen general o estructura programatica especifica

Decision:
- seguir auditoria documental

### 2.9 U. de Caldas
Clasificacion:
- `overlay-first`

Estado:
- `in_research`

Razon operativa:
- la pagina oficial de admisiones pregrado presencial usa `Saber 11` e ICFES ponderado como base de seleccion
- algunos programas activan pruebas de aptitud especificas

Fuentes:
- https://viceacademica.ucaldas.edu.co/pregrados-presenciales/

Decision:
- trabajar overlays por programa cuando la prueba especifica tenga huella suficiente

### 2.10 UniAtlantico
Clasificacion:
- `overlay-first`

Estado:
- `verified-for-overlays`

Razon operativa:
- la convocatoria 2026-1 usa `Saber 11` como base de inscripcion general
- una publicacion oficial de atencion a aspirantes 2026-1 anuncia `Pruebas Especificas` para `Bellas Artes`, `Medicina` y `Licenciatura en Cultura Fisica, Recreacion y Deporte`

Fuentes:
- https://www.uniatlantico.edu.co/apertura-inscripciones-de-pregrado-para-el-primer-periodo-academico-2026/
- https://www.uniatlantico.edu.co/atencion-aspirantes-proceso-de-admision-2026-1/

Decision:
- promover `UniAtlantico` como siguiente candidata `overlay-first`
- priorizar `Medicina` como primer caso por selectividad

## 3. Orden actualizado de trabajo
1. `UNAL` y `UdeA` como universidades `exam-first`
2. auditoria de conflictos: `UniCauca`, `UPTC`
3. primer frente `overlay-first`: `UniAtlantico Medicina`
4. siguientes overlays posibles: `Univalle`, `U. de Caldas`, `UIS`, `UTP`

## 4. Regla de publicacion
No se debe publicar un mock institucional general cuando la admision regular del periodo vigente se apoye en:
- `Saber 11` ponderado
- puntaje de admision sin examen propio transversal
- pruebas adicionales solo para un subconjunto de programas

En esos casos, el producto correcto es:
- `overlay por programa`
- no `mock core` institucional general
