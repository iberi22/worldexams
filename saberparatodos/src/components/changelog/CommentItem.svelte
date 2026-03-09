<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let comment: any;
  export let userId: string | null;
  export let replyingToId: string | null;
  export let isSubmitting: boolean;
  export let replyText: string;
  export let isReply: boolean = false;

  const dispatch = createEventDispatcher();

  function formatTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " años atrás";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " meses atrás";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " m";
    if (seconds < 10) return "justo ahora";
    return Math.floor(seconds) + " s";
  }
</script>

<div class="flex gap-3 sm:gap-4 group">
  <!-- Avatar -->
  <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 border border-white/5 flex-shrink-0 flex items-center justify-center text-white/40 font-bold overflow-hidden shadow-md">
    {#if comment.user_id === 'admin-uuid-placeholder'}
        <div class="w-full h-full bg-[#FCD116] flex items-center justify-center text-black">A</div>
    {:else}
        U
    {/if}
  </div>

  <div class="flex-1 min-w-0">
    <!-- Comment Body -->
    <div class="bg-white/[0.03] border border-white/10 {isReply ? 'rounded-xl' : 'rounded-b-xl rounded-tr-xl'} p-3 md:p-4 hover:bg-white/[0.05] transition-colors relative shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <span class="font-bold text-white/90 text-xs md:text-sm tracking-tight">Estudiante</span>
          <span class="text-[10px] md:text-xs text-white/30 font-mono">• {formatTimeAgo(comment.created_at)}</span>
        </div>

        <div class="flex items-center gap-2">
          {#if comment.user_id === userId}
            <button
              class="text-red-400/60 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-all rounded-md hover:bg-red-500/10"
              on:click={() => dispatch('delete', comment.id)}
              title="Eliminar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          {/if}
        </div>
      </div>

      <p class="text-white/80 whitespace-pre-wrap text-sm md:text-[0.95rem] leading-relaxed break-words">
        {comment.content}
      </p>

      <!-- Action Buttons -->
      {#if userId}
        <div class="mt-3 flex items-center gap-4 border-t border-white/5 pt-3">
          <button
            on:click={() => dispatch('reply', comment.id)}
            class="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/40 hover:text-[#FCD116] transition-colors flex items-center gap-1.5"
          >
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
            {replyingToId === comment.id ? 'Cancelar' : 'Responder'}
          </button>
        </div>
      {/if}
    </div>

    <!-- Reply Input -->
    {#if replyingToId === comment.id}
      <div class="mt-3 bg-white/5 border border-white/10 rounded-xl p-3 shadow-inner">
        <textarea
          value={replyText}
          on:input={(e) => dispatch('updateReplyText', (e.target as any).value)}
          placeholder="Escribe tu respuesta..."
          class="w-full bg-transparent text-[#F5F5DC] placeholder-white/20 border-none p-2 min-h-[60px] resize-none focus:outline-none text-sm font-sans"
        ></textarea>
        <div class="mt-2 flex justify-end gap-2">
          <button
            on:click={() => dispatch('submitReply')}
            disabled={isSubmitting || !replyText.trim()}
            class="px-4 py-1.5 bg-[#FCD116] hover:bg-yellow-400 text-black font-bold rounded-lg text-xs transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {#if isSubmitting}
              <svg class="animate-spin h-3 w-3 text-black" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {/if}
            Responder
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>
