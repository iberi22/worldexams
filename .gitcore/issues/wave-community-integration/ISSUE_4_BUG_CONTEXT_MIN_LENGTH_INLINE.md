## Descripción del Bug (Bug Report)
En la interfaz de examen (`ExamView.svelte`), el componente `SharedContextLayout.svelte` activa el layout de pantalla dividida (Split-Pane en Desktop) y el botón flotante *"📖 Ver Lectura"* (en Mobile) ante cualquier string no vacío (`context && context.trim().length > 0`).

### Comportamiento Erróneo Detectado
En miles de reactivos (especialmente en Inglés y Matemáticas), el campo `context` es solo una etiqueta contextual corta de un renglón (ejemplo: `"Discussing innovation & startups in Medellín."` de 40 a 50 caracteres).
- **En Desktop**: Activa el panel lateral izquierdo completo (*"📖 Contexto de Lectura • Panel de Lectura"*), reservando el 50% de la pantalla para una sola oración breve, reduciendo innecesariamente el espacio de las preguntas y opciones.
- **En Mobile**: Muestra un botón flotante llamativo *"📖 Ver Lectura"* que al pulsarse abre un Drawer a pantalla completa para mostrar sólo 7 palabras.

---

### Comportamiento Esperado
1. **Umbral Mínimo de Contexto Extenso (Reading Passages)**:
   - Solo activar `SharedContextLayout` (split-pane en desktop y botón flotante en móvil) si el `context` representa una **lectura o pasaje real** (`context.trim().length >= 140` caracteres o contiene saltos de línea `\n`).
2. **Renderizado Inline para Contextos Cortos**:
   - Si `context.trim().length > 0` pero `< 140` caracteres, **no abrir el panel lateral ni el drawer móvil**.
   - En su lugar, renderizarlo limpiamente como un badge o bloque sutil justo arriba del enunciado de la pregunta:
     ```html
     <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-3">
       <span>📖</span> <span>{question.context}</span>
     </div>
     ```
3. Esto garantiza que:
   - Lecturas extensas (comprensión de lectura de 300 a 2000 palabras) utilicen el split-pane y drawer dedicados.
   - Contextos de una sola línea queden integrados orgánicamente sin forzar la apertura de modales vacíos.

---

### Archivos Involucrados
- `saberparatodos/src/components/SharedContextLayout.svelte`
- `saberparatodos/src/components/ExamView.svelte`
- `saberparatodos/src/components/ResultsView.svelte`
- `saberparatodos/tests/unit/` (añadir prueba de umbral de contexto)

---

### Acceptance Criteria (AC)
- [ ] Contextos cortos (< 140 caracteres) no disparan el botón flotante móvil *"Ver Lectura"* ni dividen la pantalla en dos mitades en Desktop.
- [ ] Los contextos cortos se muestran integrados sobre la pregunta de forma compacta y elegante.
- [ ] Lecturas extensas (>= 140 caracteres) conservan el Split-Pane en Desktop y el Drawer móvil.
- [ ] `npm run test:unit -w saberparatodos` pasa al 100%.
- [ ] `npx playwright test tests/e2e/english-c1-context-responsive.spec.ts` pasa al 100%.
