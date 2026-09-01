<script lang="ts">
  import type { FullCognitiveProfile } from '../../lib/neurogym/scoring-cognitive';

  interface Props {
    profile: FullCognitiveProfile;
    studentAlias?: string;
  }

  let { profile, studentAlias = 'Estudiante-042' }: Props = $props();

  let counselorNotes = $state('');
  let isExported = $state(false);

  function exportClinicalPDF() {
    const reportText = `INFORME PSICOPEDAGÓGICO DE ORIENTACIÓN COGNITIVA
=====================================================
Sujeto / Nodo: ${studentAlias}
Fecha de Evaluación: ${new Date(profile.timestamp).toLocaleDateString('es-CO')}
Herramienta: WorldExams NeuroGym (Baremación Psicométrica Estandarizada)

1. ÍNDICES GENERALES
-------------------
- Razonamiento Abstracto (Proxy CI): ${profile.overallIQProxy.standardScore} (${profile.overallIQProxy.levelDescription}, Percentil ${profile.overallIQProxy.percentile}%)
- Memoria de Trabajo (Span): ${profile.workingMemory.standardScore} (${profile.workingMemory.levelDescription})
- Velocidad de Procesamiento (PSI): ${profile.processingSpeed.standardScore} (${profile.processingSpeed.levelDescription})
- Agilidad Motora & Control: ${profile.motorAgility.standardScore} (${profile.motorAgility.levelDescription})
- Flexibilidad Analítica: ${profile.analyticalFlexibility.standardScore} (${profile.analyticalFlexibility.levelDescription})

2. OBSERVACIONES CLÍNICAS Y DE APRENDIZAJE
------------------------------------------
- Fortalezas Clave: ${profile.strengths.join(', ')}
- Áreas de Oportunidad: ${profile.growthAreas.join(', ')}

3. ESTRATEGIAS DE APOYO ESCOLAR RECOMENDADAS
--------------------------------------------
- Fraccionar tareas de alta carga en memoria de trabajo en pasos secuenciales.
- Aplicar técnicas de discriminación visual para optimizar tiempos de respuesta.
- Incorporar pausas activas motrices de 2 minutos para reducir fatiga inhibitoria.

4. NOTAS DEL PSICORIENTADOR / DOCENTE
--------------------------------------
${counselorNotes || 'Sin notas adicionales registradas.'}
`;

    const blob = new Blob(['\uFEFF' + reportText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Informe_Orientacion_${studentAlias}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    isExported = true;
    setTimeout(() => isExported = false, 2500);
  }
</script>

<div class="max-w-3xl mx-auto p-6 bg-black/70 border border-white/20 rounded-3xl space-y-6 shadow-2xl">
  <div class="border-b border-white/10 pb-4">
    <span class="text-xs uppercase tracking-widest text-purple-400 font-mono font-bold">Gabinete de Psicorientación</span>
    <h2 class="text-2xl font-black text-white mt-1">Informe Psicométrico y de Apoyo Escolar</h2>
    <p class="text-xs text-white/60">Documento técnico para psicólogos escolares, tutores y directores de grupo.</p>
  </div>

  <div class="grid grid-cols-2 gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl text-xs">
    <div>
      <span class="text-white/40 block">Identificador Soberano:</span>
      <strong class="text-emerald-400 font-mono">{studentAlias}</strong>
    </div>
    <div>
      <span class="text-white/40 block">Fecha:</span>
      <strong class="text-white">{new Date(profile.timestamp).toLocaleDateString('es-CO')}</strong>
    </div>
  </div>

  <div>
    <label class="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Notas y Dictamen de Orientación</label>
    <textarea
      bind:value={counselorNotes}
      rows="4"
      placeholder="Escribe recomendaciones individualizadas, adaptaciones curriculares o seguimiento específico..."
      class="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400"
    ></textarea>
  </div>

  <button
    type="button"
    onclick={exportClinicalPDF}
    class="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-wider text-xs rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.4)]"
  >
    {isExported ? '✓ Informe Exportado' : '📄 Descargar Dictamen de Orientación'}
  </button>
</div>
