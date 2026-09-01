<script lang="ts">
  import { generateStroopTrial, type StroopItem } from '../../lib/neurogym/secure-items-vault';
  import { neuroAudio } from '../../lib/neurogym/audio-synthesizer';

  interface Props {
    roomCode?: string;
    playerName?: string;
    onExitDuel?: () => void;
  }

  let { roomCode = 'NEURO-1', playerName = 'Estudiante A', onExitDuel }: Props = $props();

  let myScore = $state(0);
  let opponentScore = $state(0);
  let timeLeft = $state(60);
  let currentTrial = $state<StroopItem>(generateStroopTrial(1));
  let isRunning = $state(false);
  let timerInterval: any = null;

  const colorOptions = [
    { label: 'Rojo', key: 'red', bg: 'bg-red-500/20 border-red-500 text-red-400' },
    { label: 'Azul', key: 'blue', bg: 'bg-blue-500/20 border-blue-500 text-blue-400' },
    { label: 'Verde', key: 'green', bg: 'bg-emerald-500/20 border-emerald-500 text-emerald-400' },
    { label: 'Amarillo', key: 'yellow', bg: 'bg-yellow-500/20 border-yellow-500 text-yellow-400' }
  ];

  function startDuel() {
    isRunning = true;
    timeLeft = 60;
    myScore = 0;
    opponentScore = 0;
    currentTrial = generateStroopTrial(Date.now() % 50);

    timerInterval = setInterval(() => {
      timeLeft--;
      // Simular progreso de oponente P2P
      if (Math.random() > 0.45) {
        opponentScore += 10;
      }
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
      }
    }, 1000);
  }

  function handleSelect(key: string) {
    if (!isRunning) return;

    if (key === currentTrial.correctColorKey) {
      myScore += 10;
      neuroAudio.playSuccess();
    } else {
      myScore = Math.max(0, myScore - 5);
      neuroAudio.playError();
    }

    currentTrial = generateStroopTrial((Date.now() + myScore) % 100);
  }
</script>

<div class="max-w-2xl mx-auto p-6 bg-gradient-to-br from-[#0c051a] via-black to-[#051510] border border-white/20 rounded-3xl space-y-6 shadow-2xl">
  <!-- Duel Header -->
  <div class="flex items-center justify-between border-b border-white/10 pb-4">
    <div class="flex items-center gap-2">
      <span class="text-2xl">⚔️</span>
      <div>
        <h3 class="text-sm font-bold uppercase tracking-wider text-white">Duelo P2P de Agilidad Mental</h3>
        <p class="text-[10px] text-white/50">Sala Mesh: <code class="text-cyan-400 font-mono">{roomCode}</code></p>
      </div>
    </div>

    <div class="text-right">
      <span class="text-[10px] uppercase tracking-widest text-white/40 block">Tiempo Restante</span>
      <span class="text-2xl font-black font-mono {timeLeft < 10 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}">{timeLeft}s</span>
    </div>
  </div>

  <!-- Live Scoreboard -->
  <div class="grid grid-cols-2 gap-4">
    <div class="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-1">
      <span class="text-[10px] uppercase font-bold text-emerald-400">Tú ({playerName})</span>
      <p class="text-3xl font-black text-emerald-300 font-mono">{myScore} pts</p>
    </div>
    <div class="p-4 bg-purple-500/10 border border-purple-500/30 rounded-2xl text-center space-y-1">
      <span class="text-[10px] uppercase font-bold text-purple-400">Rival (Peer P2P)</span>
      <p class="text-3xl font-black text-purple-300 font-mono">{opponentScore} pts</p>
    </div>
  </div>

  {#if !isRunning && timeLeft === 60}
    <div class="text-center py-6 space-y-4">
      <p class="text-xs text-white/70">Responde los estímulos Stroop a máxima velocidad. Gana quien acumule más puntos en 60s.</p>
      <button
        type="button"
        onclick={startDuel}
        class="py-3 px-8 bg-gradient-to-r from-emerald-500 to-purple-500 text-black font-black uppercase tracking-wider text-xs rounded-xl transition-all shadow-[0_0_25px_rgba(168,85,247,0.4)] cursor-pointer"
      >
        ⚔️ Comenzar Duelo
      </button>
    </div>
  {:else if isRunning}
    <!-- Active Duel Stimulus -->
    <div class="space-y-4">
      <div class="py-10 bg-black/80 border border-white/10 rounded-2xl flex items-center justify-center">
        <span class="text-5xl font-black tracking-widest" style="color: {currentTrial.displayColor};">
          {currentTrial.wordText}
        </span>
      </div>

      <div class="grid grid-cols-2 gap-3">
        {#each colorOptions as btn}
          <button
            type="button"
            onclick={() => handleSelect(btn.key)}
            class="py-3.5 px-4 rounded-xl border-2 font-bold uppercase tracking-wider text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer {btn.bg}"
            style="min-height: 48px;"
          >
            {btn.label}
          </button>
        {/each}
      </div>
    </div>
  {:else}
    <!-- Duel Result -->
    <div class="text-center py-6 space-y-3">
      <div class="text-4xl">
        {myScore > opponentScore ? '🏆 ¡VICTORIA!' : myScore === opponentScore ? '🤝 ¡EMPATE!' : '🥈 ¡BUEN INTENTO!'}
      </div>
      <p class="text-xs text-white/60">Puntaje Final: <strong>{myScore}</strong> vs <strong>{opponentScore}</strong></p>

      <button
        type="button"
        onclick={startDuel}
        class="py-2.5 px-6 bg-emerald-500 text-black font-bold uppercase tracking-wider text-xs rounded-xl cursor-pointer"
      >
        Revancha
      </button>
    </div>
  {/if}
</div>
