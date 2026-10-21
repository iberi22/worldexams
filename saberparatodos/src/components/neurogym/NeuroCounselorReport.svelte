<script lang="ts">
  import type { FullCognitiveProfile } from '../../lib/neurogym/scoring-cognitive';

  interface Props {
    profile: FullCognitiveProfile;
    /** Evaluación anterior del mismo dispositivo: el informe compara al estudiante consigo mismo. */
    previousProfile?: FullCognitiveProfile | null;
    studentAlias?: string;
  }

  let { profile, previousProfile = null, studentAlias = 'Estudiante-042' }: Props = $props();

  let counselorNotes = $state('');
  let isExported = $state(false);

  type DomainKey = 'overallIQProxy' | 'workingMemory' | 'processingSpeed' | 'motorAgility' | 'analyticalFlexibility';
  const DOMAINS: { key: DomainKey; label: string }[] = [
    { key: 'overallIQProxy', label: 'Razonamiento abstracto (matrices)' },
    { key: 'workingMemory', label: 'Memoria de trabajo' },
    { key: 'processingSpeed', label: 'Velocidad de procesamiento' },
    { key: 'motorAgility', label: 'Agilidad motora y control' },
    { key: 'analyticalFlexibility', label: 'Flexibilidad' }
  ];

  function progressLine(key: DomainKey, label: string): string {
    const now = profile[key].standardScore;
    if (!previousProfile) return `- ${label}: ${now} pts (primera evaluación, punto de partida)`;
    const d = now - previousProfile[key].standardScore;
    const change = d === 0 ? 'sin cambio' : `${d > 0 ? '+' : ''}${d} pts`;
    return `- ${label}: ${now} pts (${change} frente a su evaluación anterior)`;
  }

  function exportReport() {
    const reportText = `INFORME DE PROGRESO Y APOYO ESCOLAR
=====================================================
Estudiante: ${studentAlias}
Fecha de la evaluación: ${new Date(profile.timestamp).toLocaleDateString('es-CO')}
Herramienta: WorldExams NeuroGym (ejercicios de atención, memoria de trabajo y velocidad de procesamiento)

Nota: estos puntos solo sirven para comparar al estudiante consigo mismo en el tiempo.
No se comparan con otras personas y no constituyen un diagnóstico.

1. PROGRESO RESPECTO A SU PROPIO HISTORIAL
------------------------------------------
${DOMAINS.map((d) => progressLine(d.key, d.label)).join('\n')}

2. OBSERVACIONES DE APRENDIZAJE
-------------------------------
- Áreas más fuertes en esta evaluación: ${profile.strengths.join(', ') || 'Sin datos suficientes'}
- Áreas para seguir practicando: ${profile.growthAreas.join(', ') || 'Sin datos suficientes'}

3. ESTRATEGIAS DE APOYO ESCOLAR SUGERIDAS
-----------------------------------------
- Fraccionar tareas con mucha información en pasos secuenciales.
- Practicar ejercicios cortos de búsqueda visual y respuesta rápida.
- Incorporar pausas activas de 2 minutos entre bloques de trabajo.

4. NOTAS DEL ORIENTADOR / DOCENTE
---------------------------------
${counselorNotes || 'Sin notas adicionales registradas.'}
`;

    const blob = new Blob(['\uFEFF' + reportText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Informe_Progreso_${studentAlias}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    isExported = true;
    setTimeout(() => isExported = false, 2500);
  }
</script>

<div class="max-w-3xl mx-auto p-6 bg-black/70 border border-white/20 rounded-3xl space-y-6 shadow-2xl">
  <div class="border-b border-white/10 pb-4">
    <span class="text-xs uppercase tracking-widest text-purple-400 font-mono font-bold">Orientación escolar</span>
    <h2 class="text-2xl font-black text-white mt-1">Informe de progreso y apoyo escolar</h2>
    <p class="text-xs text-white/60">Resumen para orientadores y docentes: compara al estudiante con su propio historial, sin percentiles ni diagnósticos.</p>
  </div>

  <div class="grid grid-cols-2 gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl text-xs">
    <div>
      <span class="text-white/40 block">Estudiante:</span>
      <strong class="text-emerald-400 font-mono">{studentAlias}</strong>
    </div>
    <div>
      <span class="text-white/40 block">Fecha:</span>
      <strong class="text-white">{new Date(profile.timestamp).toLocaleDateString('es-CO')}</strong>
    </div>
  </div>

  <div>
    <label class="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Notas de orientación</label>
    <textarea
      bind:value={counselorNotes}
      rows="4"
      placeholder="Escribe recomendaciones individualizadas, adaptaciones curriculares o seguimiento específico..."
      class="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400"
    ></textarea>
  </div>

  <button
    type="button"
    onclick={exportReport}
    class="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-wider text-xs rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.4)]"
  >
    {isExported ? '✓ Informe Exportado' : '📄 Descargar informe de progreso'}
  </button>
</div>
