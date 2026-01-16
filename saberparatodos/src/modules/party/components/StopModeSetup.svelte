<script lang="ts">
  import FlashlightCard from '../../../components/FlashlightCard.svelte';

  interface Props {
    onBack: () => void;
    onCreate: (config: {
      hostName: string;
      partyName: string;
      totalQuestions: number;
      difficulty: 'easy' | 'medium' | 'hard';
      includeEnglish: boolean;
    }) => void;
  }

  let { onBack, onCreate }: Props = $props();

  let hostName = $state('');
  let partyName = $state('');
  let totalQuestions = $state(20);
  let difficulty = $state<'easy' | 'medium' | 'hard'>('medium');
  let includeEnglish = $state(true);

  function handleSubmit() {
    if (!hostName) return;
    onCreate({
      hostName,
      partyName: partyName || `Stop de ${hostName}`,
      totalQuestions,
      difficulty,
      includeEnglish
    });
  }

  function averageResponseClass(count: number) {
     return totalQuestions === count
        ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-900/20'
        : 'bg-black/30 border-white/10 text-gray-400 hover:border-purple-500/50';
  }
</script>

<div class="container mx-auto px-4 py-12 max-w-2xl">
  <button
    onclick={onBack}
    class="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white"
  >
    ← Volver
  </button>

  <FlashlightCard className="p-8">
    <div class="mb-8 text-center">
      <h2 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
        ⚡ SPEED CHALLENGE
      </h2>
      <p class="text-gray-400">Modo rápido y furioso. 15 segundos por pregunta.</p>
    </div>

    <div class="space-y-8">
      <!-- Host Name -->
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">Tu Nombre (Host)</label>
        <input
          type="text"
          bind:value={hostName}
          placeholder="Ej: Profe Alex"
          class="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
        />
      </div>

      <!-- Party Name -->
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">Nombre de la Sala (Opcional)</label>
        <input
          type="text"
          bind:value={partyName}
          placeholder={`Ej: Stop de ${hostName || '...'}`}
          class="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
        />
      </div>

      <!-- Questions Count -->
      <div>
        <label class="block text-sm font-medium mb-3 text-gray-300">Cantidad de Preguntas</label>
        <div class="grid grid-cols-3 gap-4">
          {#each [10, 20, 40] as count}
            <button
              onclick={() => totalQuestions = count}
              class={`py-3 rounded-lg font-bold border ${totalQuestions === count ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-900/20' : 'bg-black/30 border-white/10 text-gray-400 hover:border-purple-500/50'} transition-all`}
            >
              {count}
            </button>
          {/each}
        </div>
      </div>

      <!-- Difficulty -->
      <div>
        <label class="block text-sm font-medium mb-3 text-gray-300">Dificultad</label>
        <div class="grid grid-cols-3 gap-4">
          <button
            onclick={() => difficulty = 'easy'}
            class={`py-3 rounded-lg font-bold border ${difficulty === 'easy' ? 'bg-green-600 border-green-400 text-white' : 'bg-black/30 border-white/10 text-gray-400 hover:border-green-500/50'}`}
          >
            Facil
          </button>
          <button
            onclick={() => difficulty = 'medium'}
            class={`py-3 rounded-lg font-bold border ${difficulty === 'medium' ? 'bg-yellow-600 border-yellow-400 text-white' : 'bg-black/30 border-white/10 text-gray-400 hover:border-yellow-500/50'}`}
          >
            Medio
          </button>
          <button
            onclick={() => difficulty = 'hard'}
            class={`py-3 rounded-lg font-bold border ${difficulty === 'hard' ? 'bg-red-600 border-red-400 text-white' : 'bg-black/30 border-white/10 text-gray-400 hover:border-red-500/50'}`}
          >
            Difícil
          </button>
        </div>
      </div>

      <!-- English Toggle -->
      <div class="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-white/10">
        <div>
          <span class="block font-medium text-white">Mezclar Inglés</span>
          <span class="text-sm text-gray-400">Incluir preguntas de inglés random</span>
        </div>
        <button
          onclick={() => includeEnglish = !includeEnglish}
          class={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${includeEnglish ? 'bg-purple-600' : 'bg-gray-700'}`}
        >
          <span
            class={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${includeEnglish ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
      </div>

      <!-- Submit -->
      <button
        onclick={handleSubmit}
        disabled={!hostName}
        class="w-full px-6 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold text-xl text-white shadow-lg shadow-purple-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
      >
        🚀 CREAR SALA SPEED
      </button>

    </div>
  </FlashlightCard>
</div>


