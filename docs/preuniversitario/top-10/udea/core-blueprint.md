# UdeA Core Blueprint

Last verified: 2026-03-07
Institution: Universidad de Antioquia
Slug: `udea`
Blueprint id: `co-preu-udea-core`
Protocol: `v4.1+`
Status: `draft-ready`

## 1. Objetivo del blueprint
Traducir la huella oficial del examen de admision de la UdeA a una arquitectura de entrenamiento util para aspirantes.

## 2. Principio rector
La preparacion para UdeA debe entrenar:
- lectura bajo tiempo
- inferencia y seguimiento de relaciones
- ordenamiento logico
- consistencia deductiva

No debe parecer una mezcla generica de lenguaje y matematicas.

## 3. Componentes del mock core
Distribucion objetivo para la version completa:
- Razonamiento logico: `40`
- Comprension lectora: `40`

Total:
- `80 reactivos`
- `180 minutos`

## 4. Versiones de producto

### Diagnostico corto
- 10 reactivos
- 5 de razonamiento logico
- 5 de comprension lectora
- 15 a 18 minutos

### Simulacro core compacto
- 20 reactivos
- 10 de razonamiento logico
- 10 de comprension lectora
- 40 a 45 minutos

### Simulacro core realista
- 80 reactivos
- pesos equivalentes al examen oficial

## 5. Enfoques y packs
Para la UdeA se aprueban estos enfoques:

### 5.1 razonamiento-logico
Objetivo:
- series y patrones
- relaciones de orden
- condicionamiento
- consistencia de reglas

Packs:
- pack-01 fundamentos
- pack-02 patrones logicos
- pack-03 deduccion y condicionamiento
- pack-04 problemas encadenados
- pack-05 presion de tiempo y seleccion fina

### 5.2 comprension-lectora
Objetivo:
- idea global
- inferencia local
- relacion entre partes del texto
- intencion discursiva

Packs:
- pack-01 fundamentos
- pack-02 localizacion e inferencia
- pack-03 estructura y cohesion
- pack-04 comparacion de posturas
- pack-05 lectura bajo tiempo y precision

## 6. Reglas de reactivos
- Todos los reactivos deben ser originales.
- Se puede usar internet solo para reconocer patrones de formulacion y tipos de estimulo.
- No se copian preguntas pasadas literalmente.
- Cada reactivo debe marcar:
  - componente
  - enfoque
  - dificultad
  - patron observado
  - fuente base del patron

## 7. Dificultad
Escala operativa:
- 1-2: base
- 3: media
- 4: alta
- 5: muy alta

Para packs de enfoque:
- pack-01 dominante 1-2
- pack-02 dominante 2
- pack-03 dominante 3
- pack-04 dominante 4
- pack-05 dominante 4-5

## 8. Tipo de reactivo
Para UdeA se recomienda iniciar con:
- `single` como formato dominante
- `multi-correct` solo si luego se valida que mejora la medicion de patrones compuestos
- `weighted` no es prioridad en fase 1

Fase 1:
- mantener sesgo total a `single`

## 9. Reporte al estudiante
El reporte debe devolver:
- componente mas debil
- componente mas fuerte
- tiempo por componente
- precision por componente
- recomendacion de siguiente pack

Ejemplo de salida:
- `Tu mayor brecha para UdeA hoy esta en razonamiento logico. Repite pack-02 y luego pack-03 antes del simulacro compacto.`

## 10. Secuencia de produccion
1. Crear carpetas de enfoques
2. Escribir `pack-01` a `pack-05` para `razonamiento-logico`
3. Escribir `pack-01` a `pack-05` para `comprension-lectora`
4. Ensamblar simulacro compacto
5. Ensamblar simulacro realista

## 11. Fuentes oficiales
- https://www.udea.edu.co/wps/portal/udea/web/inicio/estudiar-udea/quiero-estudiar-udea/pregrado/
- https://www.udea.edu.co/wps/portal/udea/web/inicio/estudiar-udea/quiero-estudiar-udea/pregrado/calendario-guias-admision/
