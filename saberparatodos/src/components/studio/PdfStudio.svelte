<script lang="ts">
  import { ingestPdfToV52Draft, type V52DraftResult } from '../../lib/ai/pdf-ingest';
  import { generateLocalExam as generateExam, type ExamGenerateResult } from '../../lib/ai/exam-generator';

  // Svelte 5 State
  let selectedFile = $state<File | null>(null);
  let isIngesting = $state(false);
  let ingestProgress = $state(0);
  let ingestInfo = $state('');
  let draftResult = $state<V52DraftResult | null>(null);

  let subject = $state('Matemáticas');
  let grade = $state(11);
  let questionCount = $state(5);
  let topic = $state('');

  let isGenerating = $state(false);
  let generateInfo = $state('');
  let examResult = $state<ExamGenerateResult | null>(null);
  let errorMessage = $state('');

  const subjects = ['Matemáticas', 'Lectura Crítica', 'Sociales y Ciudadanas', 'Ciencias Naturales', 'Inglés'];
  const grades = [3, 5, 7, 9, 10, 11];

  async function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      processFile(input.files[0]);
    }
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        processFile(file);
      } else {
        errorMessage = 'Por favor selecciona un archivo PDF válido.';
      }
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  async function processFile(file: File) {
    errorMessage = '';
    selectedFile = file;
    isIngesting = true;
    ingestProgress = 0;
    ingestInfo = 'Iniciando ingesta local...';

    try {
      const draft = await ingestPdfToV52Draft(file, {
        onProgress: (stage, progress, info) => {
          ingestProgress = Math.round(progress * 100);
          ingestInfo = info || `Procesando (${stage})...`;
        },
      });
      draftResult = draft;
      ingestInfo = 'Ingesta completada exitosamente.';
    } catch (err: any) {
      errorMessage = err.message || 'Error durante la ingesta del PDF.';
    } finally {
      isIngesting = false;
    }
  }

  async function handleGenerateExam() {
    if (!draftResult) return;
    errorMessage = '';
    isGenerating = true;
    generateInfo = 'Sintetizando borrador con RAG local...';

    try {
      const result = await generateExam({
        subject,
        grade,
        count: questionCount,
        topic: topic || draftResult.metadata.fileName,
      });
      examResult = result;
      generateInfo = 'Borrador semanal generado.';
    } catch (err: any) {
      errorMessage = err.message || 'Error al generar borrador de examen.';
    } finally {
      isGenerating = false;
    }
  }

  function clearFile() {
    selectedFile = null;
    draftResult = null;
    examResult = null;
    errorMessage = '';
    ingestProgress = 0;
    ingestInfo = '';
  }

  const creadorTag = $derived('local-llm');
  const draftTypeTag = $derived('weekly-draft');
</script>

<div class="space-y-8 max-w-4xl mx-auto">
  <!-- Header Card -->
  <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-3">
    <div class="flex items-center gap-3">
      <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 text-xl">📄</span>
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-white">Studio PDF & Generador de Borradores v5.2</h2>
        <p class="text-xs sm:text-sm text-white/60">
          Procesamiento 100% en el dispositivo (WebGPU / local-llm). Ningún archivo o pregunta sale de tu navegador.
        </p>
      </div>
    </div>
  </div>

  <!-- Dropzone / File Picker -->
  {#if !selectedFile}
    <div
      class="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/20 bg-white/[0.02] px-6 py-12 text-center transition hover:border-emerald-400/50 hover:bg-emerald-400/[0.03] cursor-pointer"
      onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && document.getElementById('pdf-studio-file')?.click()}
      tabindex="0"
      role="button"
      aria-label="Seleccionar archivo PDF para ingesta local"
      ondrop={handleDrop}
      ondragover={handleDragOver}
    >
      <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-2xl text-emerald-400 mb-3">
        📥
      </div>
      <p class="text-base font-bold text-white">Sube o arrastra tu PDF educativo</p>
      <p class="mt-1 text-xs text-white/50">
        Extracción de texto, fragmentación RAG y generación con LLM local
      </p>
      <input
        id="pdf-studio-file"
        type="file"
        accept="application/pdf,.pdf"
        class="sr-only"
        onchange={handleFileSelect}
      />
      <label
        for="pdf-studio-file"
        class="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-black uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 cursor-pointer transition-all active:scale-95"
      >
        Seleccionar PDF
      </label>
    </div>
  {:else}
    <!-- Selected File & Ingestion Status -->
    <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-6 space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div class="flex items-center gap-3">
          <span class="text-2xl">📋</span>
          <div>
            <h3 class="text-sm font-bold text-white">{selectedFile.name}</h3>
            <p class="text-xs text-white/50">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · Creador: {creadorTag} · Tipo: {draftTypeTag}
            </p>
          </div>
        </div>
        <button
          type="button"
          onclick={clearFile}
          class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
          aria-label="Quitar archivo PDF seleccionado"
        >
          Quitar
        </button>
      </div>

      {#if isIngesting}
        <div class="space-y-2">
          <div class="flex justify-between text-xs text-white/70">
            <span>{ingestInfo}</span>
            <span class="font-mono font-bold text-emerald-400">{ingestProgress}%</span>
          </div>
          <div class="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              class="h-full bg-emerald-400 transition-all duration-300"
              style="width: {ingestProgress}%"
            ></div>
          </div>
        </div>
      {/if}

      {#if draftResult}
        <!-- Extracted Draft Preview / Skeleton Excerpt -->
        <div class="space-y-4 pt-2">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Fragmento v5.2 Extraído ({draftResult.numPages} páginas)
            </h4>
            <span class="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
              Formato v5.2 Listo
            </span>
          </div>

          <div class="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs text-white/80 max-h-48 overflow-y-auto leading-relaxed">
            {draftResult.excerpt}
          </div>

          <!-- Exam Generator Configuration -->
          <div class="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-amber-300">
              Configuración de Borrador de Examen
            </h4>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label for="subject-select" class="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
                  Asignatura
                </label>
                <select
                  id="subject-select"
                  bind:value={subject}
                  class="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-400 focus:outline-none"
                >
                  {#each subjects as sub}
                    <option value={sub}>{sub}</option>
                  {/each}
                </select>
              </div>

              <div>
                <label for="grade-select" class="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
                  Grado Escolar
                </label>
                <select
                  id="grade-select"
                  bind:value={grade}
                  class="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-400 focus:outline-none"
                >
                  {#each grades as g}
                    <option value={g}>Grado {g}°</option>
                  {/each}
                </select>
              </div>

              <div>
                <label for="count-select" class="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
                  N° Preguntas
                </label>
                <select
                  id="count-select"
                  bind:value={questionCount}
                  class="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-400 focus:outline-none"
                >
                  <option value={3}>3 preguntas (Muestra)</option>
                  <option value={5}>5 preguntas (Quiz)</option>
                  <option value={10}>10 preguntas (Prueba corta)</option>
                </select>
              </div>
            </div>

            <div>
              <label for="topic-input" class="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
                Tema / Enfoque Específico (Opcional)
              </label>
              <input
                id="topic-input"
                type="text"
                bind:value={topic}
                placeholder="Ej. Funciones cuadráticas, Geometría analítica..."
                class="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div class="flex justify-end pt-2">
              <button
                type="button"
                onclick={handleGenerateExam}
                disabled={isGenerating}
                class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-wider text-xs transition-all shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50"
                aria-label="Generar borrador de examen"
              >
                {isGenerating ? 'Generando...' : '⚡ Generar borrador'}
              </button>
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Error Alert -->
  {#if errorMessage}
    <div class="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-200">
      ⚠️ {errorMessage}
    </div>
  {/if}

  <!-- Generated Exam Preview -->
  {#if examResult}
    <div class="rounded-2xl border border-amber-500/30 bg-white/[0.03] p-6 space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span class="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-400">
            Borrador Generado ({draftTypeTag})
          </span>
          <h3 class="text-lg font-bold text-white">
            Evaluación de {examResult.metadata.subject} — Grado {examResult.metadata.grade}°
          </h3>
        </div>
        <div class="flex items-center gap-2">
          <span class="rounded bg-amber-500/20 px-2.5 py-1 text-xs font-mono text-amber-300 border border-amber-500/30">
            creador: {examResult.metadata.creador}
          </span>
        </div>
      </div>

      {#if examResult.warning}
        <p class="text-xs text-amber-300 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
          ℹ️ {examResult.warning}
        </p>
      {/if}

      <div class="space-y-4">
        {#each examResult.questions as q, index}
          <div class="rounded-xl border border-white/10 bg-black/40 p-5 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-amber-400">Pregunta {index + 1} ({q.difficulty})</span>
              <span class="text-[10px] font-mono text-white/40">ID: {q.id}</span>
            </div>

            {#if q.context}
              <p class="text-xs text-white/70 bg-white/5 p-3 rounded-lg italic">
                {q.context}
              </p>
            {/if}

            <p class="text-sm font-semibold text-white">{q.statement}</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {#each q.options as opt}
                <div class={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${opt.is_correct ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200 font-semibold' : 'bg-white/5 border-white/10 text-white/80'}`}>
                  <span class="font-mono font-bold">{opt.letter})</span>
                  <div class="flex-1">
                    <span>{opt.text}</span>
                    {#if opt.feedback}
                      <p class="text-[10px] text-white/50 mt-0.5">{opt.feedback}</p>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>

            <div class="text-xs text-white/60 bg-white/[0.02] p-3 rounded-lg border border-white/5">
              <strong class="text-amber-300">Explicación:</strong> {q.explanation}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
