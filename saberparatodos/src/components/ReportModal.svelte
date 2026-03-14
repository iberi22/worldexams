<script lang="ts">
  import { fade, scale } from 'svelte/transition';

  export let show = false;
  export let onClose: () => void;
  export let questionId: string | null = null;
  export let userContext: string = 'LocalReportsView';
  export let questionData: any = null; // Optional: pass full question data for context

  let reportType = 'feedback';
  let message = '';
  let loading = false;
  let success = false;
  let error = '';

  const reportTypes = [
    { id: 'feedback', label: '💡 Sugerencia / Feedback', requiresQuestion: false },
    { id: 'error', label: '🐛 Error en Pregunta', requiresQuestion: true },
    { id: 'content', label: '📝 Contenido Confuso', requiresQuestion: true },
    { id: 'technical', label: '⚙️ Problema Técnico', requiresQuestion: false },
    { id: 'other', label: '💬 Otro', requiresQuestion: false }
  ];



  async function handleSubmit() {
    if (!message.trim()) {
      error = 'Por favor escribe un mensaje.';
      return;
    }

    loading = true;
    error = '';

    try {
      // Get the type label
      const typeLabel = reportTypes.find(t => t.id === reportType)?.label || reportType;



      // Send to internal API (Telegram notification)
      const res = await fetch('/api/report_problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reportType: typeLabel,
          questionId,
          message,
          userContext: userContext
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al enviar reporte');
      }

      success = true;
      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);

    } catch (e: any) {
      error = e.message || 'No se pudo enviar el reporte. Intenta más tarde.';
    } finally {
      loading = false;
    }
  }

  function resetForm() {
    success = false;
    message = '';
    reportType = 'feedback';
    error = '';
  }
</script>

{#if show}
  <div class="fixed inset-0 z-[1001] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" transition:fade>
    <div
      class="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl"
      transition:scale={{start: 0.95}}
    >
      <!-- Header -->
      <div class="px-6 py-4 border-b border-white/5 bg-gradient-to-r from-white/5 to-transparent flex justify-between items-center">
        <h3 class="text-white font-bold flex items-center gap-2">
          {#if success}
            <span class="text-emerald-400">✅ Enviado</span>
          {:else}
            <span>{questionId ? '🚩 Reportar Problema' : '💬 Enviar Feedback'}</span>
          {/if}
        </h3>
        <button on:click={onClose} class="text-white/40 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-4">
        {#if success}
          <div class="py-10 flex flex-col items-center text-center space-y-3">
            <div class="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-3xl mb-2">
              🚀
            </div>
            <p class="text-white font-medium">¡Gracias por tu reporte!</p>
            <p class="text-sm text-white/50">Tu feedback nos ayuda a mejorar SaberParaTodos.</p>
          </div>
        {:else}
          <!-- Question ID Display if present -->
          {#if questionId}
            <div class="bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2 text-xs flex items-center gap-2 text-blue-200">
              <span class="font-bold">ID:</span>
              <code class="font-mono bg-black/20 px-1 rounded">{questionId}</code>
            </div>
          {/if}

          <!-- Type Selector -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-white/40 uppercase tracking-widest">Tipo de Reporte</label>
            <div class="grid grid-cols-2 gap-2">
              {#each reportTypes as type}
                {#if questionId || !type.requiresQuestion}
                  <button
                    class={`px-3 py-2 rounded-lg text-xs font-medium border transition-all text-left truncate
                      ${reportType === type.id
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                        : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:border-white/10'
                      }`}
                    on:click={() => reportType = type.id}
                  >
                    {type.label}
                  </button>
                {/if}
              {/each}
            </div>
          </div>

          <!-- Message Input -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-white/40 uppercase tracking-widest">Detalle</label>
            <textarea
              bind:value={message}
              rows="4"
              class="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/5 transition-all resize-none"
              placeholder="Describe el problema o tu sugerencia aquí..."
            ></textarea>
            {#if error}
              <p class="text-red-400 text-xs px-1">{error}</p>
            {/if}
          </div>

          <!-- Notification Info -->
          <div class="flex items-center gap-3 pt-2 pb-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-3 py-2">
            <div class="flex items-center gap-2">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span class="text-[11px] text-emerald-400 font-medium">Directo a los desarrolladores</span>
            </div>
            <div class="ml-auto flex items-center gap-1.5 text-[10px] text-white/30">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.257.257-.527.257l.189-2.83 5.432-4.904c.235-.21-.051-.326-.364-.118l-6.713 4.226-2.744-.858c-.596-.186-.607-.596.124-.882l10.725-4.131c.497-.181.931.118.81.908z"/>
              </svg>
              Notificación Telegram
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="pt-4 flex justify-end gap-3">
            <button
              on:click={onClose}
              class="px-4 py-2 rounded-lg text-xs font-bold text-white/40 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancelar
            </button>
            <button
              on:click={handleSubmit}
              disabled={loading}
              class="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg shadow-emerald-600/20 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {#if loading}
                <div class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Enviando
              {:else}
                Enviar Reporte
              {/if}
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
