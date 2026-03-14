# UNAL Core Blueprint

Last verified: 2026-03-07
Institution: Universidad Nacional de Colombia
Slug: `unal`
Blueprint id: `co-preu-unal-core`
Protocol: `v4.1+`
Status: `draft-ready`

## 1. Objetivo del blueprint
Traducir la huella oficial del examen de admision de la UNAL a una arquitectura de entrenamiento util para aspirantes.

## 2. Principio rector
La preparacion para UNAL debe entrenar:
- lectura analitica
- transferencia entre representaciones
- solucion de problemas contextualizados
- discriminacion visual y semantica

No debe parecer un preicfes generico.

## 3. Componentes del mock core
Distribucion objetivo para la version completa:
- Analisis textual: `25`
- Matematicas: `25`
- Ciencias naturales: `25`
- Ciencias sociales: `25`
- Analisis de la imagen: `20`

Total:
- `120 reactivos`
- `210 minutos`

## 4. Versiones de producto

### Diagnostico corto
- 10 reactivos
- 2 por componente
- 18 a 22 minutos

### Simulacro core compacto
- 40 reactivos
- 8 analisis textual
- 8 matematicas
- 8 ciencias naturales
- 8 ciencias sociales
- 8 analisis de la imagen

### Simulacro core realista
- 120 reactivos
- pesos equivalentes al examen oficial

## 5. Enfoques y packs
Para la UNAL se aprueban estos enfoques:

### 5.1 analisis-textual
Objetivo:
- inferencia
- lectura critica
- interpretacion de relacion entre texto y contexto

Packs:
- pack-01 fundamentos
- pack-02 patrones inferenciales
- pack-03 textos referenciales
- pack-04 textos literarios y argumentativos
- pack-05 presion de tiempo y comparacion de posturas

### 5.2 razonamiento-cuantitativo
Objetivo:
- pensamiento numerico
- pensamiento espacial y metrico
- pensamiento aleatorio
- pensamiento variacional

Packs:
- pack-01 fundamentos
- pack-02 tablas y graficas
- pack-03 modelacion
- pack-04 problemas encadenados
- pack-05 transferencia y deduccion

### 5.3 ciencias-basicas
Objetivo:
- fisica
- quimica
- biologia

Packs:
- pack-01 lectura de fenomenos
- pack-02 relaciones causales
- pack-03 interpretacion experimental
- pack-04 integracion entre disciplinas
- pack-05 analisis de casos complejos

### 5.4 ciencias-sociales
Objetivo:
- geografia
- historia
- filosofia

Packs:
- pack-01 conceptos base
- pack-02 lectura de contexto
- pack-03 causalidad historica
- pack-04 dilemas y posturas
- pack-05 transferencia argumentativa

### 5.5 analisis-de-imagen
Objetivo:
- constancia de formas
- transformaciones
- intencionalidad
- causalidad logica
- asociacion semantica imagen-palabra

Packs:
- pack-01 reconocimiento visual
- pack-02 patrones y secuencias
- pack-03 relaciones espaciales
- pack-04 intencionalidad y sentido
- pack-05 inferencia visual bajo tiempo

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
Para UNAL se recomienda iniciar con:
- `single` como base principal
- `multi-correct` solo en fase posterior si aporta a patrones de integracion
- `weighted` solo cuando queramos medir respuesta parcial en lectura compleja o interpretacion visual

Fase 1:
- mantener fuerte sesgo a `single`

## 9. Reporte al estudiante
El reporte debe devolver:
- componente mas debil
- componente mas fuerte
- tiempo por componente
- precision por componente
- recomendacion de siguiente pack

Ejemplo de salida:
- `Tu mayor brecha para UNAL hoy esta en analisis de la imagen. Repite pack-02 y luego pack-03 antes del simulacro compacto.`

## 10. Secuencia de produccion
1. Crear carpetas de enfoques
2. Escribir `pack-01` a `pack-05` para `analisis-textual`
3. Escribir `pack-01` a `pack-05` para `razonamiento-cuantitativo`
4. Repetir para los tres enfoques restantes
5. Ensamblar simulacro compacto
6. Ensamblar simulacro realista

## 11. Fuentes oficiales
- https://admisiones.unal.edu.co/pregrado/
- https://admisiones.unal.edu.co/pregrado/guia-paso-a-paso-pregrado/
- https://admisiones.unal.edu.co/pregrado/prueba-de-admision/
