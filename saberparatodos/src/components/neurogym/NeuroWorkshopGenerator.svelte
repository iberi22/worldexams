<script lang="ts">
  export type CognitiveDomain = 'all' | 'memory' | 'analysis' | 'agility' | 'inhibition';

  interface WorkshopConfig {
    title: string;
    gradeTarget: string;
    domain: CognitiveDomain;
    durationMinutes: number;
  }

  let config = $state<WorkshopConfig>({
    title: 'Taller de Gimnasia Cerebral y Funciones Ejecutivas',
    gradeTarget: 'Secundaria y Media (Grados 6°-11°)',
    domain: 'all',
    durationMinutes: 45
  });

  let previewMode = $state<'markdown' | 'html'>('markdown');
  let isCopied = $state(false);

  const domainOptions: { id: CognitiveDomain; label: string; icon: string; desc: string }[] = [
    { id: 'all', label: 'Integral / Todas', icon: '🧠', desc: 'Combina memoria, razonamiento y agilidad atencional' },
    { id: 'memory', label: 'Memoria de Trabajo', icon: '💾', desc: 'Juegos de memoria dual y secuencias viso-espaciales' },
    { id: 'analysis', label: 'Análisis y Razonamiento', icon: '🧩', desc: 'Acertijos desenchufados y pensamiento lateral' },
    { id: 'agility', label: 'Agilidad Atencional', icon: '⚡', desc: 'Velocidad de procesamiento y reflejos ejecutivos' },
    { id: 'inhibition', label: 'Control Inhibitorio', icon: '🛑', desc: 'Resistencia a interferencia atencional y auto-control' }
  ];

  const gradePresets = [
    'Primaria Inicial (Grados 1°-3°)',
    'Primaria Superior (Grados 4°-5°)',
    'Secundaria (Grados 6°-8°)',
    'Secundaria y Media (Grados 9°-11°)',
    'Educación Superior / Universitarios'
  ];

  const generatedMarkdown = $derived.by(() => {
    const dateStr = new Date().toLocaleDateString('es-CO');
    const domainLabel = domainOptions.find(d => d.id === config.domain)?.label || 'General';

    let dynamicsSection = '';

    if (config.domain === 'memory' || config.domain === 'all') {
      dynamicsSection += `
### 💾 Dinámica de Memoria: Juego Dual-Task y Matriz Corsi Humana (15 min)
- **Instrucciones:**
  1. El docente dibuja una retícula de 3x3 en el piso o proyecta una cuadrícula numerada.
  2. Un estudiante realiza una secuencia de 5 saltos entre casillas (Corsi Espacial) mientras repite una secuencia inversa de palabras (Dual-Task verbal).
  3. Los compañeros registran la longitud máxima de retención (*Span Atencional*).
- **Habilidad Neurocognitiva:** Retención activa en el bucle fonológico y agenda viso-espacial simultánea.
- **Variante Unplugged:** Parejas con tarjetas de colores donde el receptor debe recordar el orden mientras resuelve restas mentales simples.
`;
    }

    if (config.domain === 'analysis' || config.domain === 'all') {
      dynamicsSection += `
### 🧩 Dinámica de Análisis: Acertijos Desenchufados y Pensamiento Lateral (15 min)
- **Instrucciones:**
  1. Presentación del dilema analítico en tablero: *"Se requiere organizar 9 nodos de red sin que ningún par adyacente comparta el mismo identificador de color, usando un máximo de 3 reglas sintácticas."*
  2. Los estudiantes forman grupos de 3 y construyen árboles de decisión usando fichas en papel antes de proponer la solución verbal.
  3. Debate de estrategias: Evaluación de hipótesis falsas y corrección de sesgos de confirmación.
- **Habilidad Neurocognitiva:** Flexibilidad cognitiva, razonamiento deductivo y abstracción relacional.
`;
    }

    if (config.domain === 'agility' || config.domain === 'all') {
      dynamicsSection += `
### ⚡ Dinámica de Agilidad: Tarea Stroop Social y Reacción Cruzada (15 min)
- **Instrucciones:**
  1. Proyección o tarjetas con palabras de colores escritas en tinta incongruente (Ej: la palabra **ROJO** escrita en azul).
  2. En rondas rápidas de 30 segundos, los estudiantes nombran el **color de la tinta** omitiendo la lectura de la palabra.
  3. **Inversión de Regla (Agilidad Dinámica):** Al escuchar un silbato, la regla cambia a nombrar la palabra leída.
- **Habilidad Neurocognitiva:** Velocidad de procesamiento, conmutación atencional (*task switching*) y tiempo de reacción.
`;
    }

    if (config.domain === 'inhibition') {
      dynamicsSection += `
### 🛑 Dinámica de Control Inhibitorio: Simon Inverso con Tapping Supresor (20 min)
- **Instrucciones:**
  1. El docente emite mandatos motores rápidos (Ej: *"Tocar rodilla derecha"*). El estudiante debe ejecutar la **acción contraria** (*"Tocar hombro izquierdo"*).
  2. Ante el estímulo "No-Go" (doble palmada), todos los participantes deben congelar la postura instantáneamente durante 3 segundos.
  3. Registro de latencia y tasa de inhibición involuntaria por parejas.
- **Habilidad Neurocognitiva:** Supresión de impulsos motores automáticos y resistencia a la interferencia.
`;
    }

    return `# 🧠 ${config.title}
**Población Objetivo:** ${config.gradeTarget} | **Dominio:** ${domainLabel} | **Duración Estimada:** ${config.durationMinutes} minutos | **Fecha:** ${dateStr}
**Framework:** WorldExams NeuroGym (Gobernanza Libre & Psicométrica AGPL-3.0)

---

## 🎯 1. Objetivos Pedagógicos
- Desplegar estímulos cognitivos desconectados (*unplugged*) para fortalecer funciones ejecutivas en el aula.
- Incrementar la **plasticidad cerebral** mediante ejercicios de sincronización hemisférica y memoria de trabajo.
- Evaluar cualitativamente la **resiliencia atencional** y la autorregulación en entornos colaborativos.

---

## ⏱️ 2. Estructura de la Sesión (Paso a Paso)

### Fase 1: Calentamiento & Activación Hemisférica (10 min)
- **Tapping Cruzado Motor:** Los estudiantes realizan marcha estática tocando codo izquierdo con rodilla derecha de forma alternada a ritmo metabólico creciente.
- **Enfoque Atencional:** Respiración diafragmática 4-7-8 para nivelar el arousal cortical previo a la demanda cognitiva.

---

## 🧠 3. Dinámicas Cognitivas Principales
${dynamicsSection}

---

## 📝 4. Rúbrica y Hoja de Observación Docente

| Estudiante / Equipo | Precisión en Dinámica (1-5) | Span / Retención | Control de Impulsos (Bajo/Medio/Alto) | Observaciones Neuro-Pedagógicas |
|---|---|---|---|---|
| 1. | [ ] [ ] [ ] [ ] [ ] | ___ unidades | [ ] Bajo  [ ] Medio  [ ] Alto | |
| 2. | [ ] [ ] [ ] [ ] [ ] | ___ unidades | [ ] Bajo  [ ] Medio  [ ] Alto | |
| 3. | [ ] [ ] [ ] [ ] [ ] | ___ unidades | [ ] Bajo  [ ] Medio  [ ] Alto | |
| 4. | [ ] [ ] [ ] [ ] [ ] | ___ unidades | [ ] Bajo  [ ] Medio  [ ] Alto | |

---

## 💡 5. Recomendaciones de Cierre (Metacognición - 5 min)
- Formular la pregunta de transferencia: *"¿En qué momento de un examen o problema matemático sentiste una interferencia similar a los ejercicios de hoy y qué técnica usaste para superarla?"*.

---
*Documento generado por WorldExams NeuroGym. 100% offline, libre de recolección de PII y datos biométricos.*
`;
  });

  const generatedHTML = $derived.by(() => {
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${config.title}</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      max-width: 800px;
      margin: 0 auto;
      padding: 30px;
      background: #fff;
    }
    h1 { color: #059669; border-bottom: 3px solid #059669; padding-bottom: 8px; margin-top: 0; }
    h2 { color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-top: 24px; }
    h3 { color: #1e293b; margin-top: 18px; }
    .meta-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #166534;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 8px 12px;
      text-align: left;
      font-size: 13px;
    }
    th { background: #f8fafc; font-weight: bold; }
    .footer {
      margin-top: 40px;
      font-size: 11px;
      color: #64748b;
      text-align: center;
      border-top: 1px dashed #cbd5e1;
      padding-top: 12px;
    }
    @media print {
      body { padding: 0; max-width: 100%; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <h1>🧠 ${config.title}</h1>
  <div class="meta-box">
    <strong>Población Objetivo:</strong> ${config.gradeTarget} |
    <strong>Dominio:</strong> ${domainOptions.find(d => d.id === config.domain)?.label} |
    <strong>Duración:</strong> ${config.durationMinutes} minutos
  </div>

  <h2>🎯 1. Objetivos Pedagógicos</h2>
  <ul>
    <li>Desplegar estímulos cognitivos desenchufados (*unplugged*) para fortalecer funciones ejecutivas en el aula.</li>
    <li>Incrementar la plasticidad cerebral mediante ejercicios de sincronización hemisférica y memoria de trabajo.</li>
    <li>Evaluar cualitativamente la resiliencia atencional y la autorregulación.</li>
  </ul>

  <h2>⏱️ 2. Estructura de la Sesión</h2>
  <h3>Fase 1: Calentamiento & Activación Hemisférica (10 min)</h3>
  <p>Tapping Cruzado Motor y respiración diafragmática 4-7-8 para nivelar el arousal cortical.</p>

  <h2>🧠 3. Dinámicas Cognitivas Principales</h2>
  <p><em>(Ver guía de dinámicas seleccionadas para el dominio ${config.domain})</em></p>

  <h2>📝 4. Rúbrica y Hoja de Observación Docente</h2>
  <table>
    <thead>
      <tr>
        <th>Estudiante / Equipo</th>
        <th>Precisión (1-5)</th>
        <th>Span / Retención</th>
        <th>Control de Impulsos</th>
        <th>Observaciones Neuro-Pedagógicas</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>1.</td><td>[ ] [ ] [ ] [ ] [ ]</td><td>___ unidades</td><td>Bajo / Medio / Alto</td><td></td></tr>
      <tr><td>2.</td><td>[ ] [ ] [ ] [ ] [ ]</td><td>___ unidades</td><td>Bajo / Medio / Alto</td><td></td></tr>
      <tr><td>3.</td><td>[ ] [ ] [ ] [ ] [ ]</td><td>___ unidades</td><td>Bajo / Medio / Alto</td><td></td></tr>
      <tr><td>4.</td><td>[ ] [ ] [ ] [ ] [ ]</td><td>___ unidades</td><td>Bajo / Medio / Alto</td><td></td></tr>
    </tbody>
  </table>

  <div class="footer">
    Documento generado por WorldExams NeuroGym. Libre de recolección de PII y datos biométricos.
  </div>
</body>
</html>`;
  });

  function downloadFile(content: string, filename: string, mimeType: string) {
    const blob = new Blob(['\uFEFF' + content], { type: `${mimeType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadMarkdown() {
    downloadFile(generatedMarkdown, `Taller_Gimnasia_Cerebral_${config.domain}_${Date.now()}.md`, 'text/markdown');
  }

  function downloadHTML() {
    downloadFile(generatedHTML, `Taller_Gimnasia_Cerebral_${config.domain}_${Date.now()}.html`, 'text/html');
  }

  function copyToClipboard() {
    const textToCopy = previewMode === 'markdown' ? generatedMarkdown : generatedHTML;
    navigator.clipboard.writeText(textToCopy);
    isCopied = true;
    setTimeout(() => isCopied = false, 2000);
  }
</script>

<div class="max-w-4xl mx-auto p-6 bg-black/60 border border-white/15 rounded-3xl space-y-6 shadow-2xl">
  <div class="border-b border-white/10 pb-4">
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs uppercase tracking-widest text-emerald-400 font-mono font-bold">Generador Neuro-Pedagógico</span>
        <h2 class="text-2xl sm:text-3xl font-black text-white mt-1">Talleres de Gimnasia Cerebral & Estimulación</h2>
      </div>
      <span class="text-2xl">📚</span>
    </div>
    <p class="text-xs text-white/60 mt-1">Configura y descarga guías imprimibles en Markdown y HTML con dinámicas de aula desenchufadas (*unplugged*).</p>
  </div>

  <!-- Configuration Form -->
  <div class="space-y-4">
    <div>
      <label for="workshop-title" class="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Título del Taller</label>
      <input
        id="workshop-title"
        type="text"
        bind:value={config.title}
        class="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="workshop-grade" class="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Población / Grado Objetivo</label>
        <input
          id="workshop-grade"
          type="text"
          bind:value={config.gradeTarget}
          list="grade-presets-list"
          class="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
        />
        <datalist id="grade-presets-list">
          {#each gradePresets as preset}
            <option value={preset}></option>
          {/each}
        </datalist>
      </div>

      <div>
        <label for="workshop-duration" class="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Duración (Minutos)</label>
        <select
          id="workshop-duration"
          bind:value={config.durationMinutes}
          class="w-full px-3 py-2 bg-[#121212] border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
        >
          <option value={15}>15 minutos (Pausa Activa)</option>
          <option value={30}>30 minutos (Sesión Corta)</option>
          <option value={45}>45 minutos (Sesión Estándar)</option>
          <option value={60}>60 minutos (Taller Inmersivo)</option>
        </select>
      </div>
    </div>

    <!-- Domain Selector Cards -->
    <div>
      <span class="text-[10px] uppercase tracking-wider text-white/50 block mb-2">Dominio Cognitivo Principal</span>
      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {#each domainOptions as opt}
          <button
            type="button"
            onclick={() => config.domain = opt.id}
            aria-label={`Seleccionar dominio ${opt.label}`}
            class="p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-full {config.domain === opt.id ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'}"
          >
            <div>
              <span class="text-xl block mb-1">{opt.icon}</span>
              <span class="text-xs font-bold block">{opt.label}</span>
            </div>
            <span class="text-[9px] text-white/50 mt-2 block leading-tight">{opt.desc}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Format Toggle & Preview Header -->
  <div class="flex items-center justify-between pt-2">
    <div class="flex items-center gap-2">
      <span class="text-xs font-bold text-white">Vista Previa:</span>
      <div class="p-1 bg-white/5 border border-white/15 rounded-xl flex gap-1">
        <button
          type="button"
          onclick={() => previewMode = 'markdown'}
          class="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer {previewMode === 'markdown' ? 'bg-emerald-500 text-black' : 'text-white/60 hover:text-white'}"
        >
          Markdown (.md)
        </button>
        <button
          type="button"
          onclick={() => previewMode = 'html'}
          class="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer {previewMode === 'html' ? 'bg-emerald-500 text-black' : 'text-white/60 hover:text-white'}"
        >
          HTML (.html)
        </button>
      </div>
    </div>

    <button
      type="button"
      onclick={copyToClipboard}
      class="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
    >
      <span>{isCopied ? '✓' : '📋'}</span> {isCopied ? 'Copiado' : 'Copiar Texto'}
    </button>
  </div>

  <!-- Content Preview Box -->
  <div class="p-4 bg-black/90 border border-white/10 rounded-2xl max-h-80 overflow-y-auto font-mono text-xs text-emerald-300/90 whitespace-pre-wrap leading-relaxed shadow-inner">
    {previewMode === 'markdown' ? generatedMarkdown : generatedHTML}
  </div>

  <!-- Action Download Buttons -->
  <div class="flex flex-wrap gap-3 pt-2">
    <button
      type="button"
      onclick={downloadMarkdown}
      class="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-wider text-xs rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2"
    >
      <span>📥</span> Descargar Guía Markdown (.md)
    </button>
    <button
      type="button"
      onclick={downloadHTML}
      class="flex-1 py-3 bg-cyan-400 hover:bg-cyan-500 text-black font-black uppercase tracking-wider text-xs rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2"
    >
      <span>🖨️</span> Descargar Guía Imprimible (.html)
    </button>
  </div>
</div>
