# 🧭 MISSION.md - WorldExams Mission Control

> Estructura de ejecución basada en POML (Prompt Object Modeling Language) para la coordinación de agentes.

---
mission: "WorldExams 2026: Excelencia en Contenido y Plataforma"
version: "1.0"
status: "Phase 4: Remediation & International Expansion"
authority: "AGENTS.md"

## 🎯 Global Goals

```yaml
goals:
  - id: "G1:REMEDIATION"
    description: "Sanear y modernizar el repositorio de preguntas eliminando contaminación de modelos legacy (minimax-m2.7)."
    kpis:
      - "129+ bundles remediados a Protocolo v5.1"
      - "0% de errores de opciones duplicadas"
      - "Audit script (review-bundle.ts) pasando en 100% de archivos"
    loop:
      step: "Identify contaminated bundle -> Execute Jules Remediation -> Verify with Auditor -> Commit"
      frequency: "Continuo hasta completar .generation_queue.json"

  - id: "G2:EXPANSION"
    description: "Lanzar contenido base para Chile, Perú y Ecuador siguiendo estándares MASTERY."
    kpis:
      - "Bundles iniciales generados para CL, PE, EC"
      - "Contextualización cultural validada (moneda, ciudades, nombres)"
    loop:
      step: "Select pending international topic -> Generate Bundle (v5.1) -> Validate -> Sync"

  - id: "G3:RUNTIME_NEUTRALIZATION"
    description: "Mantener la plataforma agnóstica a países mediante configuración dinámica."
    kpis:
      - "Zero hardcoded country logic in shared-components"
      - "Dynamic theming working for all 21 tenants"
```

## 🛡️ Constraints (POML)

```yaml
constraints:
  - id: "C1:PEDAGOGICAL_INTEGRITY"
    rule: "Toda pregunta debe incluir feedback detallado para las 4 opciones y una explicación pedagógica final."
  - id: "C2:ZERO_DUPLICATES"
    rule: "Prohibido terminantemente repetir enunciados de opciones o distractores dentro de la misma pregunta."
  - id: "C3:AI_CLEANLINESS"
    rule: "Los archivos finales no deben contener bloques <think>, preámbulos de IA o metadatos no autorizados."
  - id: "C4:ATOMIC_COMMITS"
    rule: "Un cambio lógico por commit. Referenciar el issue correspondiente."
```

## 🔄 Execution Loop

1. **Sensing**: Leer `PLANNING.md` y `TASK.md` para identificar la siguiente unidad de trabajo.
2. **Modeling**: Verificar el rol y skill necesario según `AGENTS.md`.
3. **Action**: Ejecutar la tarea siguiendo los constraints de esta misión.
4. **Verification**: Validar el resultado contra el KPI del goal correspondiente.
5. **Next**: Actualizar el estado y pasar al siguiente paso del loop.

---
*Ubicación Canónica: .gitcore/planning/MISSION.md*
