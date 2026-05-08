# Plan Operativo: Preuniversitario Mastery 1000

Este documento detalla la hoja de ruta para alcanzar el hito de las 1000 preguntas institucionales curadas bajo el Protocolo v5.2.

## Fase 1: Piloto de Alta Densidad (UNAL / UdeA)
- **Meta**: 200 preguntas (100 por universidad).
- **Estructura**: 5 bundles de 20 preguntas (Mastery Packs).
- **Foco**: Diagnóstico Core, Análisis de Imagen, Razonamiento Lógico.
- **Deadline sugerido**: 1 semana.

## Fase 2: Expansión Regional (Zonificados)
- **Meta**: 400 preguntas.
- **Universidades**: Univalle, UIS, UTP, Unicartagena (100 c/u).
- **Foco**: Adaptación de componentes ICFES a pesos institucionales específicos.

## Fase 3: Consolidación y Audit (Resto del país)
- **Meta**: 400 preguntas.
- **Universidades**: UPTC, Unicauca, UCaldas, UniAtlantico.
- **Foco**: Completar el catálogo nacional.

## Reglas de Ejecución
1. **Shadow Node First**: Todo bundle nuevo nace en `Shadow Pool` (directorio `temp/` o similar) hasta que pase el script de validación.
2. **Quarantine Logic**: Ningún bundle se sube a producción sin `quarantine: false`.
3. **Feedback Meritocrático**: Se activará un sistema para que los testers marquen la calidad de los feedbacks del agente.
