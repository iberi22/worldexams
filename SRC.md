# SRC.md - WorldExams

> Documentación de análisis de estructura de proyecto

## Información General

| Campo | Valor |
|-------|-------|
| **Nombre** | worldexams |
| **Tipo** | Monorepo SaaS Educativo |
| **Descripción** | Plataforma educativa para Colombia - Producto "SaberParaTodos" |
| **Stack** | TypeScript, Node.js, Supabase, Rust |
| **Último análisis** | 2026-03-17 |

## Estructura

```
worldexams/
├── apps/              # Aplicaciones principales
├── services/         # Servicios Rust
├── saberparatodos/   # Producto Colombia
├── supabase/         # Configuración Supabase
├── scripts/          # Scripts de automatización
├── docs/             # Documentación
├── config/           # Configuración
├── skills/          # Skills de agentes
└── AGENTS.md         # Definición de agentes
```

## Módulos Detectados

- lib
- middleware
- question-generator

## Productos/Servicios

- **SaberParaTodos**: Producto educativo Colombia
- **WorldExams Landing**: Sitio web principal
- **Servicios API**: Backend en Rust

## Características

- Monorepo con npm workspaces
- Supabase para backend (Auth, DB, Realtime)
- Integración con agentes AI
- Migración activa a estructura monorepo

## Estado

🔒 Proyecto privado - Pre-lanzamiento
⚙️ En transición activa a monorepo
