<script lang="ts">
  let { message = '' }: { message?: string } = $props();
</script>

{#if message}
  <div role="alert" class="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
    {message}
  </div>
{/if}
