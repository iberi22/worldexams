<script lang="ts">
  interface WorkshopConfig {
    title: string;
    gradeTarget: string;
    domain: 'all' | 'memory' | 'reasoning' | 'inhibition' | 'agility';
    durationMinutes: number;
  }

  let config = $state<WorkshopConfig>({
    title: 'Taller de Gimnasia Cerebral y Funciones Ejecutivas',
    gradeTarget: 'Secundaria y Media (Grados 9°-11°)',
    domain: 'all',
    durationMinutes: 45
  });

  let generatedMarkdown = $state<string>('');
  let isCopied = $state(false);

  function generateWorkshopGuide() {
    const dateStr = new Date().toLocaleDateString('es-CO');
    generatedMarkdown = `# 🧠 ${config.title}
**Dirigido a:** ${config.gradeTarget} | **Duración Estimada:** ${config.durationMinutes} minutos | **Fecha:** ${dateStr}
**Framework:** WorldExams NeuroGym (Gobernanza Libre & Psicométrica AGPL-3.0)

---

## 🎯 1. Objetivos Pedagógicos
- Fortalecer el **Control Inhibitorio** y la resistencia a la interferencia automática.
- Expandir la **Memoria de Trabajo viso-espacial y auditiva** para la resolución de problemas de alta complejidad.
- Entrenar la **Flexibilidad Cognitiva** y la capacidad de cambio de estrategias lógicas ante reglas dinámicas.

---

## ⏱️ 2. Estructura de la Sesión (Paso a Paso)

### Fase 1: Calentamiento & Sincronización Hemisférica (10 min)
- **Dinámica 1: Tapping Cruzado con Supresión Motora**:
  - Los estudiantes tocan su rodilla derecha con la mano izquierda y viceversa. Al escuchar la palmada doble ("No-Go"), deben congelar la postura inmediatamente.
  - *Métrica observada:* Tasa de error por impulso motor.

### Fase 2: Desafío de Interferencia Atencional (15 min)
- **Dinámica 2: Tarea Stroop Social en Pizarra**:
  - Proyección de palabras de colores en conflicto. Grupos de 3 estudiantes compiten diciendo el **color real de la tinta** sin leer la palabra.
  - *Evidencia neurocientífica:* Activación de la corteza cingulada anterior y corteza prefrontal dorsolateral.

### Fase 3: Secuencias de Memoria Viso-Espacial (15 min)
- **Dinámica 3: Matriz Corsi Humana**:
  - En una cuadrícula de 9 baldosas en el suelo, el docente realiza una secuencia de 5 a 7 saltos. El estudiante debe reproducirla en orden directo y luego en orden inverso.
  - *Habilidad:* Retención en el bucle fonológico y agenda viso-espacial.

### Fase 4: Cierre y Metacognición (5 min)
- Discusión guiada: "¿Qué estrategias mentales utilizaste para no equivocarte cuando el estímulo era engañoso?".

---

## 📝 3. Hoja de Registro y Observación Docente

| Estudiante / Nodo | Precisión Stroop (1-5) | Span Espacial Corsi | Observaciones Cualitativas |
|---|---|---|---|
| 1. | [ ] [ ] [ ] [ ] [ ] | ___ bloques | |
| 2. | [ ] [ ] [ ] [ ] [ ] | ___ bloques | |
| 3. | [ ] [ ] [ ] [ ] [ ] | ___ bloques | |

---
*Generado automáticamente por WorldExams NeuroGym. Libre de recolección de PII.*
`;
  }

  function downloadMarkdown() {
    if (!generatedMarkdown) generateWorkshopGuide();
    const blob = new Blob(['\uFEFF' + generatedMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Taller_Gimnasia_Cerebral_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyToClipboard() {
    if (!generatedMarkdown) generateWorkshopGuide();
    navigator.clipboard.writeText(generatedMarkdown);
    isCopied = true;
    setTimeout(() => isCopied = false, 2000);
  }

  $effect(() => {
    generateWorkshopGuide();
  });
</script>

<div class="max-w-4xl mx-auto p-6 bg-black/60 border border-white/15 rounded-3xl space-y-6 shadow-2xl">
  <div class="border-b border-white/10 pb-4">
    <span class="text-xs uppercase tracking-widest text-emerald-400 font-mono font-bold">Generador Neuro-Pedagógico</span>
    <h2 class="text-2xl sm:text-3xl font-black text-white mt-1">Talleres de Gimnasia Cerebral & Estimulación</h2>
    <p class="text-xs text-white/60 mt-1">Crea guías imprimibles en Markdown con dinámicas de aula avaladas científicamente.</p>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div>
      <label class="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Título del Taller</label>
      <input
        type="text"
        bind:value={config.title}
        class="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
      />
    </div>
    <div>
      <label class="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Población Objetivo</label>
      <input
        type="text"
        bind:value={config.gradeTarget}
        class="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
      />
    </div>
    <div>
      <label class="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Duración (minutos)</label>
      <input
        type="number"
        bind:value={config.durationMinutes}
        class="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
      />
    </div>
  </div>

  <!-- Preview Area -->
  <div class="p-4 bg-black/90 border border-white/10 rounded-2xl max-h-72 overflow-y-auto font-mono text-xs text-emerald-300/90 whitespace-pre-wrap leading-relaxed">
    {generatedMarkdown}
  </div>

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      onclick={downloadMarkdown}
      class="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-wider text-xs rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)]"
    >
      📥 Descargar Taller (.md)
    </button>
    <button
      type="button"
      onclick={copyToClipboard}
      class="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all cursor-pointer"
    >
      {isCopied ? '✓ Copiado' : '📋 Copiar Texto'}
    </button>
  </div>
</div>
