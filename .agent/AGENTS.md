# `.agent` Agent Entry

Este directorio es una capa de compatibilidad para herramientas que buscan instrucciones en `.agent/`.

## Fuente de verdad

La fuente de verdad para agentes en este repo es:

1. [AGENTS.md](/E:/scripts-python/worldexams/AGENTS.md)
2. [.gitcore/ARCHITECTURE.md](/E:/scripts-python/worldexams/.gitcore/ARCHITECTURE.md)
3. [.gitcore/AGENT_INDEX.md](/E:/scripts-python/worldexams/.gitcore/AGENT_INDEX.md)
4. [.gitcore/planning/PLANNING.md](/E:/scripts-python/worldexams/.gitcore/planning/PLANNING.md)
5. [.gitcore/planning/TASK.md](/E:/scripts-python/worldexams/.gitcore/planning/TASK.md)
6. [docs/README.md](/E:/scripts-python/worldexams/docs/README.md)
7. [docs/specs/ACTIVE_PROTOCOLS.md](/E:/scripts-python/worldexams/docs/specs/ACTIVE_PROTOCOLS.md)

## Resumen operativo

- Repo privado, prelaunch y gobernado como monorepo.
- Lógica y UI compartidas; variación por país vía configuración y contenido.
- GitCore adaptado como protocolo de gestión.
- Deploy manual por CLI; no GitHub Actions.
- Protocolos legacy no mandan si contradicen la capa raíz.
- GitHub Issues es el estado de largo plazo.
- `.gitcore/planning/` es la ubicación válida del planning operativo.
- `apps/worldexams-site/` es el sitio principal; `saberparatodos/` es la plantilla/runtime reutilizable.

## Archivo de reglas

- [r1.md](/E:/scripts-python/worldexams/.agent/rules/r1.md) es la regla base `always_on`.
- Ese archivo debe permanecer corto y alineado con la autoridad raíz.
