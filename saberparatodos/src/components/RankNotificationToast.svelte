<script lang="ts">
  /**
   * RankNotificationToast.svelte
   * Shows toast notifications for rank changes
   */

  import { onMount } from 'svelte';
  import type { RankChange } from '../lib/rank-notifications';

  export let notification: RankChange | null = null;
  export let onDismiss: () => void = () => {};
  export let autoDismissMs: number = 8000;

  let visible = false;
  let dismissTimeout: ReturnType<typeof setTimeout> | null = null;

  $: if (notification) {
    visible = true;

    // Auto-dismiss after delay
    if (dismissTimeout) clearTimeout(dismissTimeout);
    dismissTimeout = setTimeout(() => {
      visible = false;
      setTimeout(onDismiss, 300); // Wait for animation
    }, autoDismissMs);
  }

  function dismiss() {
    visible = false;
    if (dismissTimeout) clearTimeout(dismissTimeout);
    setTimeout(onDismiss, 300);
  }

  function getBackgroundColor(type: RankChange['type']): string {
    switch (type) {
      case 'improved':
      case 'new_entry':
        return 'bg-emerald-500/20 border-emerald-500/50';
      case 'overtaken':
        return 'bg-amber-500/20 border-amber-500/50';
      case 'dropped':
        return 'bg-red-500/20 border-red-500/50';
      default:
        return 'bg-white/10 border-white/20';
    }
  }

  function getIcon(type: RankChange['type']): string {
    switch (type) {
      case 'improved':
        return '🚀';
      case 'new_entry':
        return '🎉';
      case 'overtaken':
        return '⚠️';
      case 'dropped':
        return '😢';
      default:
        return '📊';
    }
  }

  onMount(() => {
    return () => {
      if (dismissTimeout) clearTimeout(dismissTimeout);
    };
  });
</script>

{#if notification && visible}
  <div
    class={`
      fixed bottom-4 left-1/2 -translate-x-1/2 z-50
      max-w-sm w-full mx-4 p-4
      border rounded-xl shadow-2xl
      transform transition-all duration-300
      ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      ${getBackgroundColor(notification.type)}
    `}
    role="alert"
    aria-live="polite"
  >
    <div class="flex items-start gap-3">
      <span class="text-2xl shrink-0">{getIcon(notification.type)}</span>

      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-white leading-relaxed">
          {notification.message}
        </p>

        {#if notification.currentRank !== null && notification.previousRank !== null}
          <p class="text-xs text-white/60 mt-1">
            #{notification.previousRank} → #{notification.currentRank}
          </p>
        {/if}
      </div>

      <button
        on:click={dismiss}
        class="shrink-0 w-6 h-6 flex items-center justify-center
               text-white/40 hover:text-white/80 transition-colors"
        aria-label="Cerrar notificación"
      >
        ✕
      </button>
    </div>

    <!-- Progress bar -->
    <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-xl overflow-hidden">
      <div
        class="h-full bg-white/30 animate-shrink"
        style={`animation-duration: ${autoDismissMs}ms`}
      />
    </div>
  </div>
{/if}

<style>
  @keyframes shrink {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }

  .animate-shrink {
    animation: shrink linear forwards;
  }
</style>
