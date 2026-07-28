# Glosario de Términos

**Proyecto:** WorldExams
**Versión:** 3.0
**Fecha:** 2026-07-10

---

## Términos del Dominio Educativo

| Término | Definición |
|---------|------------|
| Bundle | Conjunto de 8-20 preguntas educativas en formato markdown con frontmatter YAML |
| Bundle MASTERY | Bundle de preguntas organizado por tema/competencia para dominio completo |
| Bundle WEEKLY | Bundle semanal que sigue una secuencia curricular interna (W01-W40) |
| Frontmatter | Bloque YAML al inicio de cada bundle con metadatos (país, grado, materia, etc.) |
| DBA (Derechos Básicos de Aprendizaje) | Estándar curricular colombiano del MEN |
| ICFES | Instituto Colombiano para la Evaluación de la Educación (examen Saber) |
| ENEM | Exame Nacional do Ensino Médio (Brasil) |
| SEP/NEM | Secretaría de Educación Pública / Nuevo Marco Curricular (México) |
| Bloom Taxonomy | Taxonomía de habilidades cognitivas: Remember → Understand → Apply → Analyze → Evaluate |
| D3-D10 | Escala de dificultad del proyecto (D3 = básico, D10 = experto) |
| Static Pack | Archivo JSON generado a partir de un bundle .md para servir por API |
| Country Readiness | KPI de 2000 preguntas validadas y publicadas por país soportado |
| Protocolo v5.2 | Versión actual del formato de bundle (naming, frontmatter, estructura, validación) |

## Términos Técnicos

| Término | Definición |
|---------|------------|
| API Gateway | Cloudflare Worker que enruta requests a free (static) o premium (Supabase) |
| Edge Function | Función serverless en Supabase (PostgresML + Deno) |
| SRS | Software Requirements Specification — especificación de requisitos de software |
| RLS | Row Level Security — políticas de seguridad a nivel de fila en PostgreSQL |
| KPI | Key Performance Indicator — indicador clave de rendimiento |
| CDN | Content Delivery Network — red de distribución de contenido (Cloudflare) |
| RTO | Recovery Time Objective — tiempo objetivo de recuperación |
| RPO | Recovery Point Objective — punto objetivo de recuperación |
| SHA-256 | Algoritmo de hash criptográfico usado para almacenar API keys |
| Rate Limit | Límite de requests por minuto/hora según tier |

## Acrónimos

| Acrónimo | Significado |
|----------|-------------|
| SRS | Software Requirements Specification |
| SRC | Source Code Reference (`.gitcore/SRC.md`) |
| API | Application Programming Interface |
| SLA | Service Level Agreement |
| DoD | Definition of Done |
| ADR | Architecture Decision Record |
| KPI | Key Performance Indicator |
| RLS | Row Level Security |
| RTO | Recovery Time Objective |
| RPO | Recovery Point Objective |
| CORS | Cross-Origin Resource Sharing |
| CI/CD | Continuous Integration / Continuous Deployment |
| E2E | End-to-End (tests) |
| UUID | Universally Unique Identifier |
| YAML | YAML Ain't Markup Language |
| JSON | JavaScript Object Notation |
| MD | Markdown |
| ASTRO | Framework web (Astro.build) |
| SSR | Server-Side Rendering |
| DB | Database (Base de Datos) |
| PK | Primary Key |
| FK | Foreign Key |

## Roles de Agentes (Skills)

| Rol | Descripción |
|-----|-------------|
| Jules | Agente autónomo de Google para generación de bundles |
| Claude | Agente de Anthropic para revisión y validación |
| Generator | Skill para generación de preguntas vía Gemini |
| Reviewer | Skill para revisión automática de calidad |
| Creator | Skill para creación manual de bundles |
| Remotion Architect | Skill para videos educativos con Remotion |

---

*Actualizado: 2026-07-10*
