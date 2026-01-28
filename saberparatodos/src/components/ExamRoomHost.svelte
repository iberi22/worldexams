<script lang="ts">
  import { onMount } from 'svelte';
  import FlashlightCard from './FlashlightCard.svelte';
  import PartyPlayer from './PartyPlayer.svelte';

  let viewState = $state<'input' | 'playing'>('input');
  let partyCode = $state<string>('');

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const joinCode = urlParams.get('join');
    if (joinCode) {
      partyCode = joinCode;
      viewState = 'playing';
      // Clean URL
      window.history.replaceState({}, '', '/party');
    }
  });

  function joinParty() {
    if (partyCode.trim().length >= 4) {
      viewState = 'playing';
    } else {
      alert('Ingresa un código válido');
    }
  }
</script>

<div class="min-h-screen bg-[#0a0a0a] text-[#F5F5DC] p-6 flex flex-col items-center justify-center">
  {#if viewState === 'input'}
    <div class="w-full max-w-md animate-fade-in-up">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-2">
          PARTY MODE
        </h1>
        <p class="text-sm uppercase tracking-widest opacity-60">Únete y compite</p>
      </div>

      <FlashlightCard className="p-8">
        <label class="block text-xs uppercase tracking-widest opacity-60 mb-3 text-left">
          Código de la Party
        </label>
        <input
          type="text"
          bind:value={partyCode}
          placeholder="Ej: A1B2C3"
          onkeydown={(e) => e.key === 'Enter' && joinParty()}
          class="w-full px-4 py-4 bg-black/50 border border-white/10 rounded-lg text-white font-mono text-xl text-center uppercase tracking-widest mb-6 focus:outline-none focus:border-emerald-500 transition-colors"
          maxlength="8"
        />
        <button
          onclick={joinParty}
          disabled={!partyCode}
          class="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold uppercase tracking-widest rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Entrar
        </button>
      </FlashlightCard>

      <div class="mt-8 text-center opacity-40 text-xs">
        ¿Eres el host? Crea la party desde la app principal.
      </div>
    </div>
  {:else}
    <PartyPlayer {partyCode} />
  {/if}
</div>
