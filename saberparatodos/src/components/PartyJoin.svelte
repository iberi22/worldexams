<script lang="ts">
  import PartyPlayer from './PartyPlayer.svelte';

  interface Props {
    code: string;
  }

  let { code }: Props = $props();
</script>

<div class="min-h-screen bg-[#0a0a0a] text-[#F5F5DC]">
  <PartyPlayer partyCode={code} />
</div>
