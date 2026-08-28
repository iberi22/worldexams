<!--
  OfflineGradeDownloader.svelte
  Manages downloading and storing full offline grade question packages in IndexedDB.
  Shows country/grade selectors, download progress, status badges, and storage usage.
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import {
    downloadAndStoreGradeBundle,
    getGradeBundle,
    isGradeOfflineAvailable,
    removeGradeBundle,
    type StoredGradeBundle
  } from '../../lib/offline-grade-storage';

  interface Props {
    defaultCountry?: string;
  }

  let { defaultCountry = 'co' }: Props = $props();

  let country = $state(defaultCountry);
  let grade = $state(11);
  let isDownloading = $state(false);
  let downloadProgress = $state(0);
  let currentBundle = $state<StoredGradeBundle | null>(null);
  let isAvailable = $state(false);
  let errorMessage = $state<string | null>(null);
  let successMessage = $state<string | null>(null);

  const countries = [
    { code: 'co', name: 'Colombia (ICFES Saber)' },
    { code: 'mx', name: 'México (SEP / COMIPEMS)' },
    { code: 'ar', name: 'Argentina (Aprender)' },
    { code: 'cl', name: 'Chile (PAES)' },
    { code: 'pe', name: 'Perú (ECE)' },
    { code: 'es', name: 'España (EBAU)' }
  ];

  const grades = [
    { num: 11, label: '11° Grado / Saber 11 / Media' },
    { num: 10, label: '10° Grado' },
    { num: 9, label: '9° Grado / Saber 9' },
    { num: 8, label: '8° Grado' },
    { num: 7, label: '7° Grado / Saber 7' },
    { num: 6, label: '6° Grado' },
    { num: 5, label: '5° Grado / Saber 5' },
    { num: 4, label: '4° Grado' },
    { num: 3, label: '3° Grado / Saber 3' }
  ];

  async function checkBundleStatus() {
    errorMessage = null;
    successMessage = null;
    try {
      isAvailable = await isGradeOfflineAvailable(country, grade);
      if (isAvailable) {
        currentBundle = await getGradeBundle(country, grade);
      } else {
        currentBundle = null;
      }
    } catch (e) {
      console.warn('Error checking offline bundle status:', e);
      currentBundle = null;
      isAvailable = false;
    }
  }

  async function handleDownload() {
    if (isDownloading) return;
    isDownloading = true;
    downloadProgress = 0;
    errorMessage = null;
    successMessage = null;

    try {
      const ok = await downloadAndStoreGradeBundle(country, grade, (pct) => {
        downloadProgress = pct;
      });

      if (ok) {
        successMessage = `¡Paquete de Grado ${grade}° (${country.toUpperCase()}) guardado para estudio sin conexión!`;
        await checkBundleStatus();
      } else {
        errorMessage = 'No se pudo completar la descarga. Verifica tu conexión e intenta de nuevo.';
      }
    } catch (err: any) {
      console.error('Download error:', err);
      errorMessage = err?.message || 'Error inesperado durante la descarga.';
    } finally {
      isDownloading = false;
    }
  }

  async function handleRemove() {
    if (!confirm(`¿Eliminar el paquete offline de Grado ${grade}° (${country.toUpperCase()})?`)) {
      return;
    }
    try {
      await removeGradeBundle(country, grade);
      successMessage = 'Paquete eliminado del almacenamiento local.';
      await checkBundleStatus();
    } catch (err: any) {
      errorMessage = 'Error al eliminar el paquete local.';
    }
  }

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  onMount(() => {
    checkBundleStatus();
  });
</script>

<div class="offline-downloader-container bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-6">
  <div class="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-4">
    <div>
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span>📦</span>
        <span>Descarga de Grado Completo para Estudio Offline</span>
      </h2>
      <p class="text-xs text-white/60 mt-1">
        Descarga todo el banco curricular de preguntas de tu grado en IndexedDB para practicar en cualquier lugar sin internet.
      </p>
    </div>

    <!-- Status Badge -->
    <div>
      {#if isDownloading}
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono animate-pulse">
          <span class="w-2 h-2 rounded-full bg-amber-400"></span>
          Descargando... {downloadProgress}%
        </span>
      {:else if isAvailable}
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          Disponible Offline
        </span>
      {:else}
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/60 border border-white/15 text-xs font-mono">
          <span class="w-2 h-2 rounded-full bg-white/40"></span>
          No Descargado
        </span>
      {/if}
    </div>
  </div>

  <!-- Selectors -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label for="offline-country-select" class="block text-xs font-mono text-white/70 mb-1.5 uppercase">
        País
      </label>
      <select
        id="offline-country-select"
        bind:value={country}
        onchange={checkBundleStatus}
        disabled={isDownloading}
        class="w-full bg-[#1e1e1e] border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400 transition-colors"
      >
        {#each countries as c}
          <option value={c.code}>{c.name}</option>
        {/each}
      </select>
    </div>

    <div>
      <label for="offline-grade-select" class="block text-xs font-mono text-white/70 mb-1.5 uppercase">
        Grado Escolar
      </label>
      <select
        id="offline-grade-select"
        bind:value={grade}
        onchange={checkBundleStatus}
        disabled={isDownloading}
        class="w-full bg-[#1e1e1e] border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400 transition-colors"
      >
        {#each grades as g}
          <option value={g.num}>{g.label}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- Download Progress Bar -->
  {#if isDownloading}
    <div class="space-y-2 bg-black/30 p-4 rounded-xl border border-white/10">
      <div class="flex justify-between text-xs font-mono text-white/80">
        <span>Sincronizando preguntas e imágenes pedagógicas...</span>
        <span>{downloadProgress}%</span>
      </div>
      <div class="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
        <div
          class="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full transition-all duration-300"
          style="width: {downloadProgress}%"
        ></div>
      </div>
    </div>
  {/if}

  <!-- Current Bundle Info Card -->
  {#if currentBundle && !isDownloading}
    <div class="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
          <span>✓</span> Paquete Listo en tu Dispositivo
        </span>
        <span class="text-xs font-mono text-white/60">
          Guardado: {new Date(currentBundle.downloadedAt).toLocaleDateString()}
        </span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs font-mono text-white/80">
        <div>
          <span class="text-white/40 block">Preguntas:</span>
          <span class="font-bold text-white">{currentBundle.questions.length}</span>
        </div>
        <div>
          <span class="text-white/40 block">Espacio ocupado:</span>
          <span class="font-bold text-white">{formatBytes(currentBundle.sizeBytes)}</span>
        </div>
        <div>
          <span class="text-white/40 block">Almacenamiento:</span>
          <span class="text-emerald-400">IndexedDB local</span>
        </div>
      </div>
    </div>
  {/if}

  <!-- Error / Success feedback messages -->
  {#if errorMessage}
    <div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
      <span>⚠️</span>
      <span>{errorMessage}</span>
    </div>
  {/if}

  {#if successMessage}
    <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
      <span>✓</span>
      <span>{successMessage}</span>
    </div>
  {/if}

  <!-- Action Buttons -->
  <div class="flex items-center justify-end gap-3 pt-2">
    {#if isAvailable && !isDownloading}
      <button
        type="button"
        onclick={handleRemove}
        class="px-4 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-medium transition-colors"
      >
        Eliminar Paquete
      </button>
    {/if}

    <button
      type="button"
      onclick={handleDownload}
      disabled={isDownloading}
      class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-lg shadow-purple-900/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {#if isDownloading}
        <span>Descargando...</span>
      {:else if isAvailable}
        <span>Actualizar Paquete</span>
      {:else}
        <span>Descargar Grado Completo</span>
      {/if}
    </button>
  </div>
</div>
