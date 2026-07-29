# ROADMAP.md — Visión a Largo Plazo de WorldExamns

> Hoja de ruta estratégica para la expansión y mejora continua de la plataforma educativa.
> Mundo ideal: Ser el banco de preguntas educativas más grande de Latinoamérica.

---

## 🎯 Visión 2027

WorldExamns será la plataforma educativa multi-país líder en Latinoamérica, con más de **50,000 preguntas** distribuidas en 10+ países, accesibles desde `saberparatodos.space` y aplicaciones móviles, con un modelo freemium sostenible.

---

## 🗺️ Roadmap por Trimestres

### Q3 2026 (Julio - Septiembre) — Consolidación y México
```
🎯 Objetivo: 3 países activos con 2000+ preguntas cada uno
📊 Estado real (auditado 2026-07-28): 0/20 países en KPI 2000 publicadas.
   CO 2447 bundles canónicos (ready); MX 40 (~20%); AR 66; CL 50; CR/HN 200 (dummies/no publicados);
   SV/PR/UY/PY 0 canónicos. Packs JSON: 4868. Geo routing ✅, salones mesh-first 90%, AI Core 60% (stubs),
   vitest/playwright rotos, CORS '*', seguridad #221 diferida (F7).
```

#### Colombia (CO)
- [ ] Completar bundles W01-W40 para todas las materias (G3-G11)
- [ ] Publicar 100% de bundles validados en API
- [ ] Alcanzar meta de 2000 preguntas publicadas
- [ ] Auditoría de calidad de bundles existentes

#### México (MX) — Lanzamiento
- [ ] Reglas de país completas (`rules/MX.md`)
- [ ] Curriculum mapping SEP/NEM por grado y materia
- [ ] Bundles piloto: Matemáticas y Lengua (G3-G9, W01-W20)
- [ ] Validación con expertos en currículo mexicano
- [ ] Publicación con prefijo `mx-` en API
- [ ] Meta: 500 preguntas para fin de Q3

#### Uruguay (UY) — Expansión
- [ ] Bundles para más grados (G3-G10, no solo G11)
- [ ] Meta: 1000 preguntas para fin de Q3

#### Infraestructura
- [ ] Mejorar validador v5.2 con más checks
- [ ] Dashboard de métricas de generación
- [ ] CI/CD optimizado con pre-commit hooks
- [ ] Limpieza de secrets expuestos en git history (#221)

---

### Q4 2026 (Octubre - Diciembre) — Argentina y Brasil
```
🎯 Objetivo: 5 países activos, 15,000+ preguntas totales
```

#### Argentina (AR) — Lanzamiento
- [ ] Reglas de país (`rules/AR.md`) con contexto NAP/Aprender
- [ ] Adaptación lingüística (voseo moderado)
- [ ] Bundles piloto: Matemáticas y Lengua (G1-G6 secundaria)
- [ ] Meta: 500 preguntas para fin de año

#### Brasil (BR) — Lanzamiento
- [ ] Reglas de país (`rules/BR.md`) con contexto BNCC/ENEM
- [ ] Contenido en portugués brasileño
- [ ] Bundles piloto: Matemáticas (3o ano EM)
- [ ] Meta: 500 preguntas para fin de año

#### Colombia — Madurez
- [ ] Meta de 3000+ preguntas publicadas
- [ ] Bundles de repaso y recuperación
- [ ] Preuniversitario UNAL completo

#### Producto
- [ ] Modo práctica por tema
- [ ] Leaderboard dinámico
- [ ] Dashboard analytics para CEO (BELA)
- [ ] PWA con Service Worker

---

### Q1 2027 (Enero - Marzo) — Chile, Perú y Expansión
```
🎯 Objetivo: 7 países activos, 25,000+ preguntas totales
```

#### Chile (CL) — Lanzamiento
- [ ] Reglas de país (`rules/CL.md`) con contexto PAES
- [ ] Bundles piloto

#### Perú (PE) — Lanzamiento
- [ ] Reglas de país (`rules/PE.md`) con contexto ECE
- [ ] Bundles piloto

#### México — Madurez
- [ ] Meta de 2000+ preguntas publicadas
- [ ] Bundles para más materias

#### Brasil y Argentina — Crecimiento
- [ ] Meta de 1000+ preguntas cada uno

#### Protocolo
- [ ] Evaluar protocolo v6 (basado en feedback de v5.2)
- [ ] Sistema de revisión por pares (humanos + IA)

---

### Q2 2027 (Abril - Junio) — Centroamérica y Escala
```
🎯 Objetivo: 10+ países activos, 35,000+ preguntas totales
```

#### Nuevos países
- [ ] Ecuador (EC)
- [ ] Panamá (PA)
- [ ] Costa Rica (CR)
- [ ] Guatemala (GT)
- [ ] República Dominicana (DO)
- [ ] El Salvador (SV)
- [ ] Honduras (HN)
- [ ] Nicaragua (NI)

#### Producto Premium
- [ ] Catálogo de preguntas premium exclusivas
- [ ] Premium por nodo SWAL activo (sin Stripe); catálogo premium API
- [ ] Planes Pro y Enterprise (gated por stake/nodo SWAL, no suscripción fiat)

#### App Móvil
- [ ] App Android (React Native / Flutter)
- [ ] App iOS

---

### H2 2027 — España y Global
```
🎯 Objetivo: 15+ países, 50,000+ preguntas
```

- [ ] España (ES) — EBAU/Selectividad
- [ ] Puerto Rico (PR) — College Board
- [ ] Guinea Ecuatorial (GQ)
- [ ] Internacionalización a otros idiomas
- [ ] Partnerships con instituciones educativas

---

## 🏗️ Hitos de Infraestructura

### 2026
- [ ] **Julio:** Validador v5.2 estable con 100% coverage de checks
- [ ] **Agosto:** Dashboard de métricas de generación en tiempo real
- [ ] **Septiembre:** Migración completa a protocolo v5.2 (sin legacy)
- [ ] **Octubre:** API Gateway con rate limiting por tier
- [ ] **Noviembre:** Sistema de caché para packs estáticos
- [ ] **Diciembre:** Infraestructura multi-región (Cloudflare)

### 2027
- [ ] Worker premium separado
- [ ] Base de datos de preguntas premium exclusivas
- [ ] API pública con documentación OpenAPI
- [ ] CDN para distribución de contenido educativo

---

## 📊 Metas de Preguntas por País

| País | Q3 2026 | Q4 2026 | Q1 2027 | Q2 2027 | H2 2027 |
|------|---------|---------|---------|---------|---------|
| 🇨🇴 Colombia | 2,000 | 3,000 | 4,000 | 5,000 | 6,000 |
| 🇲🇽 México | 500 | 1,000 | 2,000 | 3,000 | 4,000 |
| 🇦🇷 Argentina | — | 500 | 1,000 | 2,000 | 3,000 |
| 🇧🇷 Brasil | — | 500 | 1,000 | 2,000 | 3,000 |
| 🇺🇾 Uruguay | 1,000 | 1,500 | 2,000 | 2,500 | 3,000 |
| 🇵🇾 Paraguay | 500 | 1,000 | 1,500 | 2,000 | 2,500 |
| 🇨🇱 Chile | — | — | 500 | 1,000 | 2,000 |
| 🇵🇪 Perú | — | — | 500 | 1,000 | 2,000 |
| Centroamérica | — | — | — | 2,000 | 4,000 |
| 🌍 Global | — | — | — | — | 5,000+ |
| **TOTAL** | **4,000+** | **7,500+** | **12,500+** | **20,500+** | **34,500+** |

---

## 🔬 Investigación y Desarrollo

### Mejora de Calidad
- [ ] Sistema de detección de alucinaciones en preguntas generadas por IA
- [ ] Validación cruzada entre países para temas compartidos
- [ ] Benchmarks de dificultad (Expected_Success vs real)
- [ ] A/B testing de formatos de pregunta

### Automatización
- [ ] Pipeline de generación sin supervisión (con gates de calidad)
- [ ] Revisión automática de PRs de contenido
- [ ] Traducción automática de bundles entre países
- [ ] Detección de duplicados entre países

### Producto
- [ ] Generación de exámenes personalizados por IA
- [ ] Sistema de recomendación de contenido
- [ ] Gamificación y rachas de estudio
- [ ] Reportes de progreso para padres y docentes

---

## 💰 Modelo de Negocio

### Free Tier
- 10 preguntas/día por país
- Acceso a bundles semanales gratuitos
- Leaderboard público

### Pro ($5-10/mes)
- Preguntas ilimitadas
- Exámenes personalizados
- Estadísticas detalladas
- Sin anuncios

### Enterprise ($100-500/mes)
- API key con rate limits altos
- Integración con LMS (Moodle, Canvas)
- Bundles personalizados
- Soporte prioritario

### School/Institution
- Licencias por volumen
- Dashboard de progreso por estudiante
- Contenido adaptado al currículo institucional

---

## 🔗 Dependencias Clave

- [ ] **Gemini API:** Contrato estable con proveedor de IA para generación
- [ ] **Supabase:** Migraciones y Edge Functions estables
- [ ] **Cloudflare:** Workers y Pages para hosting global
- [ ] **GitHub:** Actions para CI/CD
- [ ] **SWAL mesh:** Red de nodos activos para gating premium (reemplaza Stripe)

---

## 📋 Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Costos de API de IA se disparan | Media | Alto | Optimizar prompts, caché, modelo local |
| Calidad de preguntas inconsistente | Media | Alto | Revisión automática cada 6h + humana |
| Competidores (Khan Academy, Quizlet) | Alta | Medio | Diferenciación por contenido localizado |
| Cambios curriculares por país | Alta | Bajo | Arquitectura modular por país |
| Dependencia de un solo proveedor de IA | Media | Medio | Multi-provider (Gemini, Claude, local) |

---

*Este roadmap es vivo. Se actualiza cada trimestre según progreso real y prioridades del negocio.*
*Propietario: BELA (Brahyan Belalcazar, @iberi22)*
*Última actualización: 2026-07-28*
