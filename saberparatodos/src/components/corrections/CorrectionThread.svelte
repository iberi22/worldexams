<script lang="ts">
  import { onMount } from 'svelte';
  import {
    createCorrection,
    reviewCorrection,
    generatePatch,
    exportPatch,
    listAllCorrections,
    clearAllCorrections,
    type CorrectionReport,
    type CorrectionStatus,
    type CorrectionErrorType,
    CORRECTION_ERROR_TYPES,
  } from '$lib/corrections';

  interface Props {
    initialQuestionId?: string;
    initialBundlePath?: string;
  }

  let {
    initialQuestionId = 'CO-MAT-11-2026-W01-funciones-001',
    initialBundlePath = 'questions_data/colombia/matematicas/grado-11/2026/weekly/CO-MAT-11-2026-W01-bundle.md',
  }: Props = $props();

  // Form State
  let questionId = $state(initialQuestionId);
  let bundlePath = $state(initialBundlePath);
  let errorType = $state<CorrectionErrorType>('error_factual');
  let description = $state('');
  let originalContent = $state('');
  let proposedContent = $state('');
  let filterStatus = $state<'all' | CorrectionStatus>('all');

  // List & feedback state
  let reports = $state<CorrectionReport[]>([]);
  let selectedReport = $state<CorrectionReport | null>(null);
  let patchPreview = $state('');
  let errorMessage = $state<string | null>(null);
  let successMessage = $state<string | null>(null);
  let isSubmitting = $state(false);

  // Nodal reviewer identity
  let userNodeHash = $state('node-curator-local');

  function getOrGenerateNodeHash(): string {
    if (typeof window === 'undefined') return 'node-curator-local';
    let stored = localStorage.getItem('swal_curator_node_hash');
    if (!stored) {
      stored = 'node-' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem('swal_curator_node_hash', stored);
    }
    return stored;
  }

  async function refresh() {
    try {
      const all = await listAllCorrections();
      reports = all;
      if (selectedReport) {
        const updated = all.find((r) => r.id === selectedReport!.id);
        if (updated) {
          selectedReport = updated;
          if (updated.patches && updated.patches.length > 0) {
            patchPreview = exportPatch(updated);
          }
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al listar correcciones';
      errorMessage = msg;
    }
  }

  let filteredReports = $derived(
    filterStatus === 'all'
      ? reports
      : reports.filter((r) => r.status === filterStatus)
  );

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    errorMessage = null;
    successMessage = null;

    const trimmedDesc = description.trim();
    if (trimmedDesc.length < 100 || trimmedDesc.length > 1000) {
      errorMessage = `La descripción debe tener entre 100 y 1000 caracteres (actual: ${trimmedDesc.length}).`;
      return;
    }

    if (!questionId.trim()) {
      errorMessage = 'El question_id es requerido.';
      return;
    }

    isSubmitting = true;
    try {
      const report = await createCorrection({
        question_id: questionId.trim(),
        question_bundle_path: bundlePath.trim() || 'questions_data/bundle.md',
        error_type: errorType,
        description: trimmedDesc,
        reporter_node_hash: userNodeHash || getOrGenerateNodeHash(),
        original_content: originalContent.trim() || undefined,
        proposed_content: proposedContent.trim() || undefined,
      });

      // Auto-generar diff si se proporcionaron contenidos
      if (originalContent.trim() || proposedContent.trim()) {
        await generatePatch(report);
      }

      description = '';
      originalContent = '';
      proposedContent = '';
      successMessage = `Reporte ${report.id} creado como borrador (draft).`;
      await refresh();
      selectReport(report);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error creando reporte';
      errorMessage = msg;
    } finally {
      isSubmitting = false;
    }
  }

  async function selectReport(report: CorrectionReport) {
    selectedReport = report;
    errorMessage = null;
    successMessage = null;

    // Generar patch si aún no lo tiene
    if (!report.patches || report.patches.length === 0) {
      try {
        await generatePatch(report);
        const updated = (await listAllCorrections()).find((r) => r.id === report.id);
        if (updated) selectedReport = updated;
      } catch {
        // Fallback
      }
    }

    if (selectedReport) {
      patchPreview = exportPatch(selectedReport);
    }
  }

  async function handleReview(vote: 'approve' | 'reject', comment = '') {
    if (!selectedReport) return;
    errorMessage = null;
    successMessage = null;

    try {
      const updated = await reviewCorrection(
        selectedReport.id,
        {
          reviewer_node_hash: userNodeHash || getOrGenerateNodeHash(),
          vote,
          comment: comment || (vote === 'approve' ? 'Revisión técnica aprobada' : 'Rechazado por inconsistencia'),
        },
        selectedReport.question_bundle_path
      );

      selectedReport = updated;
      patchPreview = exportPatch(updated);
      successMessage = `Voto '${vote}' registrado. Estado actual: ${updated.status}.`;
      await refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al registrar voto';
      errorMessage = msg;
    }
  }

  function downloadPatchFile() {
    if (!selectedReport || !patchPreview) return;
    const blob = new Blob([patchPreview], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `patch-${selectedReport.id}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function getStatusBadgeClass(status: CorrectionStatus): string {
    switch (status) {
      case 'approved':
        return 'bg-emerald-900/60 text-emerald-300 border-emerald-700/80';
      case 'rejected':
        return 'bg-red-900/60 text-red-300 border-red-700/80';
      case 'reviewing':
        return 'bg-amber-900/60 text-amber-300 border-amber-700/80';
      case 'draft':
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  }

  onMount(() => {
    userNodeHash = getOrGenerateNodeHash();
    refresh();
  });
</script>

<div class="correction-thread-root bg-zinc-950 border border-zinc-800 rounded-2xl p-5 md:p-6 text-zinc-100 shadow-2xl font-sans space-y-6">
  <!-- Cabecera de la feature -->
  <div class="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
    <div>
      <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-1.5">
        Protocolo v5.2 • Nodal Tally
      </div>
      <h3 class="text-lg md:text-xl font-bold text-[#F5F5DC]">
        Pipeline Colaborativo de Corrección
      </h3>
      <p class="text-xs text-zinc-400">
        Draft → Review Nodal (≥2 aprueban) → Parche exportable sin auto-publicación a questions_data/.
      </p>
    </div>

    <div class="flex items-center gap-2">
      <button
        type="button"
        class="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
        onclick={refresh}
      >
        Refrescar
      </button>
      <button
        type="button"
        class="text-xs px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/60 transition"
        onclick={async () => { await clearAllCorrections(); await refresh(); selectedReport = null; patchPreview = ''; }}
      >
        Limpiar reportes
      </button>
    </div>
  </div>

  <!-- Alertas -->
  {#if errorMessage}
    <div class="p-3 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex justify-between items-center">
      <span>{errorMessage}</span>
      <button type="button" onclick={() => (errorMessage = null)} class="text-red-400 ml-2">✕</button>
    </div>
  {/if}

  {#if successMessage}
    <div class="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs flex justify-between items-center">
      <span>{successMessage}</span>
      <button type="button" onclick={() => (successMessage = null)} class="text-emerald-400 ml-2">✕</button>
    </div>
  {/if}

  <!-- Formulario de creación de corrección -->
  <form onsubmit={handleSubmit} class="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800/80 space-y-4" data-testid="correction-form">
    <h4 class="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
      Reportar corrección o inconsistencia
    </h4>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div>
        <label for="q-id-input" class="block text-[11px] font-mono text-zinc-400 mb-1">ID de Pregunta</label>
        <input
          id="q-id-input"
          class="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 font-mono focus:border-emerald-500 outline-none"
          bind:value={questionId}
          placeholder="CO-MAT-11-2026-..."
          required
        />
      </div>

      <div>
        <label for="bundle-input" class="block text-[11px] font-mono text-zinc-400 mb-1">Ruta del Bundle (.md)</label>
        <input
          id="bundle-input"
          class="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 font-mono focus:border-emerald-500 outline-none"
          bind:value={bundlePath}
          placeholder="questions_data/.../bundle.md"
          required
        />
      </div>

      <div>
        <label for="error-type-select" class="block text-[11px] font-mono text-zinc-400 mb-1">Tipo de Inconsistencia</label>
        <select
          id="error-type-select"
          class="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none"
          bind:value={errorType}
        >
          {#each CORRECTION_ERROR_TYPES as t}
            <option value={t}>{t}</option>
          {/each}
        </select>
      </div>
    </div>

    <div>
      <label for="desc-textarea" class="block text-[11px] font-mono text-zinc-400 mb-1 flex justify-between">
        <span>Descripción pedagógica / técnica (100 - 1000 caracteres)</span>
        <span class={description.trim().length < 100 || description.trim().length > 1000 ? 'text-amber-400' : 'text-emerald-400'}>
          {description.trim().length} / 1000
        </span>
      </label>
      <textarea
        id="desc-textarea"
        rows="3"
        class="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:border-emerald-500 outline-none resize-y placeholder-zinc-600"
        bind:value={description}
        placeholder="Explique detalladamente por qué la formulación, el cálculo matemático o el distractor es incorrecto y cuál es la solución rigurosa..."
        required
      ></textarea>
    </div>

    <!-- Secciones opcionales para generar Diff automático -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
      <div>
        <label for="orig-content-area" class="block text-[10px] font-mono text-zinc-400 mb-1">Contenido original (opcional para diff)</label>
        <textarea
          id="orig-content-area"
          rows="2"
          class="w-full px-2.5 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300 focus:border-emerald-500 outline-none resize-y"
          bind:value={originalContent}
          placeholder="Línea o enunciado original a sustituir..."
        ></textarea>
      </div>
      <div>
        <label for="prop-content-area" class="block text-[10px] font-mono text-zinc-400 mb-1">Contenido propuesto (opcional para diff)</label>
        <textarea
          id="prop-content-area"
          rows="2"
          class="w-full px-2.5 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300 focus:border-emerald-500 outline-none resize-y"
          bind:value={proposedContent}
          placeholder="Línea corregida con la solución correcta..."
        ></textarea>
      </div>
    </div>

    <div class="flex justify-end pt-1">
      <button
        type="submit"
        disabled={isSubmitting || description.trim().length < 100 || description.trim().length > 1000}
        class="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold shadow transition cursor-pointer"
        data-testid="btn-submit-correction"
      >
        {isSubmitting ? 'Registrando...' : 'Registrar borrador (draft)'}
      </button>
    </div>
  </form>

  <!-- Lista de reportes existentes y filtrado -->
  <div class="space-y-3">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h4 class="text-sm font-semibold text-zinc-200">
        Reportes registrados ({filteredReports.length})
      </h4>
      <div class="flex items-center gap-2 text-xs">
        <span class="text-zinc-400">Filtrar por estado:</span>
        <select
          class="bg-zinc-900 border border-zinc-800 text-zinc-200 px-2 py-1 rounded text-xs outline-none"
          bind:value={filterStatus}
        >
          <option value="all">Todos</option>
          <option value="draft">draft</option>
          <option value="reviewing">reviewing</option>
          <option value="approved">approved</option>
          <option value="rejected">rejected</option>
        </select>
      </div>
    </div>

    {#if reports.length === 0}
      <div class="py-6 text-center text-xs text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
        No hay correcciones registradas todavía. Envía un reporte borrador arriba para iniciar el flujo.
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3" data-testid="reports-grid">
        {#each filteredReports as r (r.id)}
          <button
            type="button"
            class={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedReport?.id === r.id
                ? 'bg-zinc-900 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/30'
                : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
            }`}
            onclick={() => selectReport(r)}
            data-testid={`report-card-${r.id}`}
          >
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="font-mono text-emerald-400 font-semibold">{r.id}</span>
              <span class={`px-2 py-0.5 rounded text-[10px] font-mono border ${getStatusBadgeClass(r.status)}`}>
                {r.status}
              </span>
            </div>
            <div class="text-xs text-zinc-300 font-mono mb-1">
              Pregunta: {r.question_id}
            </div>
            <p class="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {r.description}
            </p>
            <div class="mt-2 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span>{r.error_type}</span>
              <span>Votos: {r.reviewers ? r.reviewers.length : 0}</span>
            </div>
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Detalle del reporte seleccionado y flujo de revisión / diff -->
  {#if selectedReport}
    <div class="p-4 md:p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-4" data-testid="selected-report-view">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
        <div class="flex items-center gap-2">
          <h4 class="text-sm md:text-base font-bold text-[#F5F5DC]">
            Reporte: {selectedReport.id}
          </h4>
          <span class={`px-2 py-0.5 rounded text-[11px] font-mono border ${getStatusBadgeClass(selectedReport.status)}`}>
            {selectedReport.status}
          </span>
        </div>

        <!-- Acciones nodales -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="px-3 py-1 text-xs rounded bg-emerald-700 hover:bg-emerald-600 text-white font-medium transition cursor-pointer flex items-center gap-1"
            onclick={() => handleReview('approve')}
            data-testid="btn-approve"
          >
            ✓ Aprobar (+1)
          </button>
          <button
            type="button"
            class="px-3 py-1 text-xs rounded bg-red-800 hover:bg-red-700 text-white font-medium transition cursor-pointer flex items-center gap-1"
            onclick={() => handleReview('reject')}
            data-testid="btn-reject"
          >
            ✕ Rechazar (-1)
          </button>
          <button
            type="button"
            class="px-3 py-1 text-xs rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition cursor-pointer flex items-center gap-1"
            onclick={downloadPatchFile}
            data-testid="btn-download-patch"
          >
            ↓ Descargar .md
          </button>
        </div>
      </div>

      <!-- Metadatos del reporte -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-zinc-400 font-mono bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
        <div><strong class="text-zinc-300">Pregunta:</strong> {selectedReport.question_id}</div>
        <div><strong class="text-zinc-300">Target:</strong> {selectedReport.question_bundle_path}</div>
        <div><strong class="text-zinc-300">Reporter:</strong> {selectedReport.reporter_node_hash}</div>
      </div>

      <!-- Diff visual unificado -->
      {#if selectedReport.patches && selectedReport.patches.length > 0}
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs text-zinc-300">
            <span class="font-semibold text-emerald-400">Unified Diff Visual (v5.2)</span>
            <span class="text-[11px] text-zinc-500 font-mono">{selectedReport.patches[0].file_path}</span>
          </div>

          <div class="diff-container bg-black border border-zinc-800 rounded-lg p-3 font-mono text-xs overflow-x-auto max-h-60 leading-tight">
            {#each selectedReport.patches[0].diff_unified.split('\n') as line}
              {#if line.startsWith('+')}
                <div class="bg-emerald-950/50 text-emerald-300 px-1 py-0.5 rounded">{line}</div>
              {:else if line.startsWith('-')}
                <div class="bg-red-950/50 text-red-300 px-1 py-0.5 rounded">{line}</div>
              {:else if line.startsWith('@@')}
                <div class="text-sky-400 font-bold py-0.5">{line}</div>
              {:else}
                <div class="text-zinc-400 px-1">{line}</div>
              {/if}
            {/each}
          </div>
        </div>
      {/if}

      <!-- Vista previa del parche exportable en Markdown -->
      <div class="space-y-1">
        <span class="text-xs font-semibold text-zinc-400">Contenido exportable listo para PR (.md)</span>
        <pre class="bg-black/90 border border-zinc-800 p-3 rounded-lg text-[11px] font-mono text-zinc-300 overflow-auto max-h-48 leading-normal">{patchPreview}</pre>
      </div>
    </div>
  {/if}
</div>
