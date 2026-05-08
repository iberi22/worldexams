# STATUS: ISSUE_001_MEN_2026_ALIGNMENT.md

**Última actualización:** 2026-04-13
**Estado:** Fase 1-2 Parcial Completadas

---

## Resumen de Cambios Aplicados

### ✅ COMPLETADO: Fase 1 - Curriculum.ts
| Materia | Cambio | Estado |
|---------|--------|--------|
| G11_MATH | `limites`, `continuidad` de P1 → P2 | ✅ Listo |
| G11_SCI | `termodinamica`, `calor`, `gases` de P3 → P2 | ✅ Listo |
| G11_SOC | P1↔P2 intercambiados (Economía→P1, Historia→P2) | ✅ Listo |
| G11_HUM | Orden cronológico verificado | ✅ Sin cambio |

### ✅ COMPLETADO: Fase 2 Parcial - Bundles Físicos
| Acción | Estado |
|--------|--------|
| `periodo-1/limites/` → `periodo-2/limites/` | ✅ Listo |
| `continuidad/` movido a `periodo-2/` | ✅ Listo |
| Limpieza carpetas duplicadas | ✅ Listo |

---

## ✅ COMPLETADO (2026-04-13)

### Frontmatter parcheado (periodo: 1 → periodo: 2)
- `matematicas/grado-11/periodo-2/limites/CO-MAT-11-P1-limites-002` ✅
- `matematicas/grado-11/periodo-2/limites/CO-MAT-11-P1-limites-003` ✅
- `matematicas/grado-11/periodo-2/CO-MAT-11-P1-continuidad-002` ✅
- `matematicas/grado-11/periodo-2/CO-MAT-11-P1-continuidad-003` ✅

### protocol_version actualizado a 5.1
- `matematicas/grado-11/periodo-4/integrales-probabilidad/...` ✅
- `matematicas/grado-11/periodo-2/estadistica-inferencial/...` ✅
- `matematicas/grado-11/periodo-1/inecuaciones/...` ✅
- `matematicas/grado-11/periodo-1/funciones-economia/...` ✅
- `ciencias-naturales/grado-11/periodo-4/quimica-organica/...` ✅
- `sociales-ciudadanas/grado-11/periodo-1/geopolitica-contemporanea/...` ✅
- `lectura-critica/grado-11/periodo-1/textos-continuos/...` ✅

---

## ❌ PENDIENTE

### Validación UI
```bash
cd saberparatodos && npm run dev
```

1. G11 Matemáticas → Por Periodo → P2 → Verificar "Límites y Continuidad"
2. G11 Ciencias → Por Periodo → P2 → Verificar "Termodinámica"
3. G11 Sociales → Por Periodo → P1 → Verificar "Economía y Geopolítica"
4. Realizar simulacro de examen por periodo

---

## Notas
- Quedan bundles con protocol_version: "5.0" en carpetas duplicadas (serán eliminadas en cleanup)
- El frontmatter `periodo: X` es usado por `filterByPeriod()` en `filters.ts`
- `smart-exam-service.ts` usa topic matching via `normalizeTopic()` contra curriculum.ts
