<script lang="ts">
  import { createCorrection, listAllCorrections, clearAllCorrections } from '$lib/corrections';
  import type { CorrectionReport } from '$lib/corrections/types';

  let questionId = $state('CO-MAT-6-test');
  let description = $state('');
  let list: CorrectionReport[] = $state([]);
  let preview: string = $state('');

  function refresh() {
    list = listAllCorrections();
  }

  function submit() {
    if (description.length < 100 || description.length > 1000) return;
    createCorrection({ questionId, description, author_hash: 'local-node' });
    description = '';
    refresh();
  }

  function approve(id: string) {
    const r = list.find((x) => x.id === id);
    if (!r) return;
    // Simula nodal approve (en prod sería firmado)
    (r as any).status = 'published';
    preview = `---\nid: "CO-CORR-${id.slice(0, 8)}"\nprotocol_version: "5.2"\n---\n## Correction ${id}\n${r.description}\n`;
    refresh();
  }

  $effect(() => refresh());
</script>

<div class="p-4 bg-zinc-900 text-white rounded-xl space-y-3">
  <h3 class="font-bold">Correcciones colaborativas (BR-03, sin tokens)</h3>
  <div class="flex gap-2">
    <input class="flex-1 px-2 py-1 rounded bg-zinc-800" bind:value={questionId} placeholder="question_id (CO-MAT-6-...)" />
    <input class="flex-1 px-2 py-1 rounded bg-zinc-800" bind:value={description} placeholder="Descripción 100-1000 chars" />
    <button class="px-3 py-1 bg-emerald-600 rounded" onclick={submit}>Enviar draft</button>
    <button class="px-3 py-1 bg-zinc-700 rounded" onclick={clearAllCorrections}>Limpiar</button>
  </div>

  {#if preview}
    <pre class="p-2 bg-black rounded text-xs overflow-auto max-h-40">{preview}</pre>
  {/if}

  <ul class="space-y-2 max-h-80 overflow-auto">
    {#each list as c (c.id)}
      <li class="p-2 bg-zinc-800 rounded flex justify-between">
        <span class="text-xs">{c.questionId} — {c.status} — {c.description.slice(0,80)}</span>
        <button class="px-2 py-1 bg-sky-600 rounded text-xs" onclick={() => approve(c.id)}>Aprobar→published</button>
      </li>
    {/each}
  </ul>
  <p class="text-xs opacity-60">Nunca auto-publica a questions_data/ — export .md preview arriba (v5.2).</p>
</div>
