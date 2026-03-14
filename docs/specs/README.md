# 📁 docs/specs - Especificaciones de Producto y Arquitectura

Esta carpeta reúne especificaciones activas o históricas que siguen siendo útiles para operar el monorepo.

## Rol de esta carpeta

- Documentar dominios funcionales y protocolos del producto
- Guardar planes o specs de streams concretos
- Servir como referencia técnica para iniciativas específicas

No es la autoridad global del repositorio. Para gobernanza del repo, la autoridad vive en:

- `README.md`
- `AGENTS.md`
- `.gitcore/ARCHITECTURE.md`
- `docs/monorepo/*`

## Principio Multi-País

WorldExams debe crecer con:

- lógica compartida
- UI compartida
- configuración por país
- contenido/preguntas por país

No se deben crear forks o duplicaciones completas de lógica por país salvo que exista una frontera técnica real.

## Documentos Relevantes

- `ACTIVE_PROTOCOLS.md`
- `MASTER_PLAN.md`
- `PREUNIVERSITARIO_PACKS_V41.md`
- `PREUNIVERSITARIO_PROTOCOL_V4PLUS.md`
- `QUESTION_DOMAIN_REFACTOR_PHASE1.md`
- `QUESTION_DOMAIN_REFACTOR_PHASE2.md`
- `REPLICACION.md`

## Regla de uso

Si una decisión de esta carpeta contradice `.gitcore/ARCHITECTURE.md`, manda `.gitcore/ARCHITECTURE.md`.
Si necesitas decidir qué protocolo funcional está activo por defecto, empieza por `ACTIVE_PROTOCOLS.md`.
