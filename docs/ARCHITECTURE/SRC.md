# SRC.md - WorldExams

> Plataforma de exámenes y evaluaciones para Colombia (producto SaberParaTodos).

## Proyecto

- **Nombre:** WorldExams
- **Tipo:** Monorepo full-stack (Node.js + React + Supabase)
- **Descripción:** Plataforma educativa monorepo para evaluaciones tipo Saber Pro/ParaTodos en Colombia. Incluye landing, apps de estudiante, backend API, y automatización de reportes.
- **Tech Stack:** Node.js, React, Astro, Supabase, TypeScript, Playwright

## Estructura

```
worldexams/
├── apps/                   # Aplicaciones (workspace npm)
│   └── ...                 # Apps del monorepo
├── config/                  # Configuraciones compartidas
├── docs/                    # Documentación
│   ├── monorepo/           # Docs de migración monorepo
│   └── agent-docs/        # Docs para agentes
├── saberparatodos/         # Producto Saber Para Todos
├── sociales/               # Scripts de redes sociales
├── services/               # Microservicios
├── skills/                 # Skills de agente
├── src/                    # Código fuente principal
├── tools/                  # Herramientas CLI
├── supabase/               # Assets de Supabase
├── scripts/                 # Scripts de automatización
├── questions_data/         # Banco de preguntas
├── reports/                 # Reportes generados
├── test-results/           # Resultados de tests
├── tests/                  # Tests
├── node_modules/
├── .env
├── .mcp.json
├── package.json
├── AGENTS.md
├── LICENSE.md
├── README.md
└── topics_report.txt
```

## Productos y Componentes

| Componente | Descripción |
|------------|-------------|
| **saberparatodos/** | App principal de evaluaciones |
| **landing** | Landing page Astro |
| **apps/** | Aplicaciones del workspace |
| **services/** | Microservicios API |
| **supabase/** | Schema y assets de base de datos |
| **questions_data/** | Banco de preguntas |
| **reports/** | Generación de reportes |

## Gobernanza

Proyecto con GitCore-inspired governance:
- `.gitcore/ARCHITECTURE.md`
- `.gitcore/AGENT_INDEX.md`
- `.gitcore/features.json`
- `.gitcore/planning/PLANNING.md`
- `.gitcore/planning/TASK.md`
- `AGENTS.md`
- `docs/monorepo/REPO_AUTHORITY_MATRIX.md`

## Monorepo Transition

Estado: **En transición activa**
- `npm workspaces` bootstrapped
- Root site y Worker en `apps/`
- Rust service en `services/`
- Pending: mover `saberparatodos/`

Docs: `docs/monorepo/MONOREPO_MIGRATION_PLAN.md`

## Tech Stack

| Capa | Tecnología |
|------|------------|
| Frontend | React, Astro |
| Backend | Node.js services |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Tests | Playwright |
| CI/CD | GitHub Actions |

## Estado

- ✅ Activo (prelaunch privado)
- 🏛️ Monorepo en transición
- 📚 Producto Colombia: SaberParaTodos
- 🔐 private prelaunch workspace
- 🔧 Última comisión: 2026-03-20 (GitCore monitor update)

*Última actualización: 2026-03-20*
