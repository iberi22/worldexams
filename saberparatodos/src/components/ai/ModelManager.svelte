<script lang="ts">
  import { onMount } from 'svelte';
  import { getAiCore } from '../../lib/ai/ai-core-client';
  import type { DeviceCapabilities, ModelRecommendation, DownloadedModel } from 'edge-mesh';
  import { recordMejoraInterna } from '../../lib/mejora-interna-telemetry';

  let scanning = $state(true);
  let caps = $state<DeviceCapabilities | null>(null);
  let recommendation = $state<ModelRecommendation | null>(null);
  let downloaded = $state<DownloadedModel[]>([]);
  let progress = $state<Record<string, number>>({});
  let busyId = $state<string | null>(null);
  let error = $state<string | null>(null);
  let asrEnabled = $state(true);

  onMount(async () => {
    try {
      const ai = getAiCore();
      caps = await ai.scan();
      recommendation = ai.recommend(caps);
      downloaded = await ai.listDownloaded();
      asrEnabled = localStorage.getItem('swal.ai.asr') !== '0';
      recordMejoraInterna('ai.model_manager.scan', { tier: caps.tier });
    } catch (e) {
      error = e instanceof Error ? e.message : 'Error al escanear dispositivo';
    } finally {
      scanning = false;
    }
  });

  async function refreshDownloaded() {
    downloaded = await getAiCore().listDownloaded();
  }

  async function ensure(modelId: string) {
    busyId = modelId;
    error = null;
    try {
      await getAiCore().ensureModel(modelId, (p) => {
        const ratio =
          typeof p.percent === 'number'
            ? p.percent / 100
            : typeof p.loadedBytes === 'number' && typeof p.totalBytes === 'number' && p.totalBytes > 0
              ? p.loadedBytes / p.totalBytes
              : 0;
        progress = { ...progress, [modelId]: ratio };
      });
      recordMejoraInterna('ai.model_manager.download', { modelId });
      await refreshDownloaded();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Error de descarga';
    } finally {
      busyId = null;
    }
  }

  async function remove(modelId: string) {
    busyId = modelId;
    try {
      await getAiCore().removeModel(modelId);
      recordMejoraInterna('ai.model_manager.remove', { modelId });
      await refreshDownloaded();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Error al borrar';
    } finally {
      busyId = null;
    }
  }

  function toggleAsr() {
    asrEnabled = !asrEnabled;
    localStorage.setItem('swal.ai.asr', asrEnabled ? '1' : '0');
  }

  function fmtBytes(n: number): string {
    if (n >= 1e9) return `${(n / 1e9).toFixed(1)} GB`;
    if (n >= 1e6) return `${(n / 1e6).toFixed(0)} MB`;
    return `${n} B`;
  }

  function isDownloaded(id: string): boolean {
    return downloaded.some((d) => d.modelId === id);
  }
</script>

<section class="rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-6 space-y-6 text-white">
  <header class="space-y-1">
    <h1 class="text-xl sm:text-2xl font-black tracking-tight">IA on-device (SWAL)</h1>
    <p class="text-sm text-white/60">
      Escanea tu dispositivo, descarga solo lo que necesites y gestiona modelos localmente.
      Sin APIs hosted — el fallback es otro modelo on-device o plantillas.
    </p>
  </header>

  {#if scanning}
    <p class="text-sm text-amber-200 animate-pulse">Escaneando capacidades…</p>
  {:else if caps}
    <div class="grid sm:grid-cols-3 gap-3 text-sm">
      <div class="rounded-xl border border-white/10 bg-white/5 p-3">
        <div class="text-[10px] uppercase tracking-widest text-white/40">Tier</div>
        <div class="text-lg font-bold text-emerald-300">{caps.tier}</div>
      </div>
      <div class="rounded-xl border border-white/10 bg-white/5 p-3">
        <div class="text-[10px] uppercase tracking-widest text-white/40">WebGPU</div>
        <div class="text-lg font-bold">{caps.webgpu ? 'Sí' : 'No'}</div>
      </div>
      <div class="rounded-xl border border-white/10 bg-white/5 p-3">
        <div class="text-[10px] uppercase tracking-widest text-white/40">Núcleos / mem</div>
        <div class="text-lg font-bold">{caps.cores} / {caps.estimatedMemoryMB != null ? `${(caps.estimatedMemoryMB / 1024).toFixed(0)} GB` : '—'}</div>
      </div>
    </div>
  {/if}

  {#if recommendation}
    <div class="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-2">
      <h2 class="font-bold text-emerald-200">Recomendación</h2>
      <p class="text-sm text-white/80">
        Tu dispositivo soporta <strong>{recommendation.primary.id}</strong>
        {#if recommendation.primary.sizeBytes}
          (~{fmtBytes(recommendation.primary.sizeBytes)})
        {/if}
        . Fallbacks: {recommendation.fallbacks.map((m) => m.id).join(' → ') || 'plantillas + pool'}.
      </p>
      <p class="text-xs text-white/50">La descarga nunca es automática: tú eliges cuándo.</p>
    </div>
  {/if}

  {#if error}
    <p class="text-sm text-red-300 border border-red-500/30 rounded-lg px-3 py-2">{error}</p>
  {/if}

  <div class="space-y-3">
    <h2 class="font-bold">Catálogo aprobado</h2>
    {#if recommendation}
      {#each [recommendation.primary, ...recommendation.fallbacks] as model (model.id)}
        <div class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div>
            <div class="font-semibold text-sm">{model.id}</div>
            <div class="text-xs text-white/50">{model.kind} · {fmtBytes(model.sizeBytes || 0)}</div>
            {#if progress[model.id] != null && busyId === model.id}
              <div class="mt-2 h-1.5 w-40 rounded bg-white/10 overflow-hidden">
                <div class="h-full bg-emerald-400" style={`width: ${Math.round((progress[model.id] || 0) * 100)}%`}></div>
              </div>
            {/if}
          </div>
          <div class="flex gap-2">
            {#if isDownloaded(model.id)}
              <button
                type="button"
                class="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500/20 border border-red-400/30 text-red-200"
                disabled={busyId === model.id}
                onclick={() => remove(model.id)}
              >Borrar</button>
              <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 border border-emerald-400/30 text-emerald-200">Descargado</span>
            {:else}
              <button
                type="button"
                class="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-500/20 border border-sky-400/30 text-sky-100"
                disabled={busyId !== null}
                onclick={() => ensure(model.id)}
              >{busyId === model.id ? 'Descargando…' : 'Descargar'}</button>
            {/if}
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <label class="flex items-center gap-3 text-sm cursor-pointer">
    <input type="checkbox" checked={asrEnabled} onchange={toggleAsr} class="rounded border-white/20" />
    Habilitar reconocimiento de voz (ASR) en el tutor
  </label>
</section>
