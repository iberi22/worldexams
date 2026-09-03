<script lang="ts">
  import { generateStroopTrial, type StroopItem } from '../../lib/neurogym/secure-items-vault';
  import { neuroAudio } from '../../lib/neurogym/audio-synthesizer';

  interface Props {
    roomCode?: string;
    playerName?: string;
    onExitDuel?: () => void;
  }

  let { roomCode = 'NEURO-1', playerName = 'Estudiante A', onExitDuel }: Props = $props();

  // Peer & Local Identifiers
  const myPeerId = `peer_${Math.random().toString(36).substring(2, 9)}`;

  // Reactive State
  let myScore = $state(0);
  let opponentScore = $state(0);
  let opponentName = $state('Rival P2P');
  let opponentTaps = $state(0);
  let peerConnected = $state(false);

  let timeLeft = $state(60);
  let currentTrial = $state<StroopItem>(generateStroopTrial(1));
  let isRunning = $state(false);

  let myTaps = $state(0);
  let correctStroopCount = $state(0);
  let totalStroopAttempts = $state(0);
  let activeTabMode = $state<'stroop' | 'speed'>('stroop');

  let timerInterval: any = null;
  let broadcastChannel: BroadcastChannel | null = null;

  const colorOptions = [
    { label: 'Rojo', key: 'red', bg: 'bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30' },
    { label: 'Azul', key: 'blue', bg: 'bg-blue-500/20 border-blue-500 text-blue-400 hover:bg-blue-500/30' },
    { label: 'Verde', key: 'green', bg: 'bg-emerald-500/20 border-emerald-500 text-emerald-400 hover:bg-emerald-500/30' },
    { label: 'Amarillo', key: 'yellow', bg: 'bg-yellow-500/20 border-yellow-500 text-yellow-400 hover:bg-yellow-500/30' }
  ];

  let accuracyPercentage = $derived.by(() => {
    if (totalStroopAttempts === 0) return 100;
    return Math.round((correctStroopCount / totalStroopAttempts) * 100);
  });

  // BroadcastChannel Setup for P2P Mesh Synchronization
  $effect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channelName = `worldexams_neuro_p2p_duel_${roomCode}`;
      try {
        broadcastChannel = new BroadcastChannel(channelName);
        broadcastChannel.onmessage = (event) => handleIncomingP2PMessage(event.data);

        // Announce presence to peers in room
        broadcastMessage({
          type: 'PEER_HELLO',
          senderId: myPeerId,
          senderName: playerName
        });
      } catch (e) {
        console.warn('[NeuroP2PDuel] BroadcastChannel error:', e);
      }
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
      if (broadcastChannel) {
        broadcastChannel.close();
        broadcastChannel = null;
      }
    };
  });

  function broadcastMessage(payload: any) {
    if (broadcastChannel) {
      try {
        broadcastChannel.postMessage(payload);
      } catch (e) {
        console.error('[NeuroP2PDuel] Error broadcasting P2P message:', e);
      }
    }
  }

  function handleIncomingP2PMessage(data: any) {
    if (!data || data.senderId === myPeerId) return;

    switch (data.type) {
      case 'PEER_HELLO':
        peerConnected = true;
        opponentName = data.senderName || 'Rival P2P';
        // Acknowledge peer hello
        broadcastMessage({
          type: 'PEER_HELLO_ACK',
          senderId: myPeerId,
          senderName: playerName
        });
        break;

      case 'PEER_HELLO_ACK':
        peerConnected = true;
        opponentName = data.senderName || 'Rival P2P';
        break;

      case 'DUEL_START':
        if (!isRunning) {
          startDuelInternal(false);
        }
        break;

      case 'SCORE_UPDATE':
        peerConnected = true;
        if (data.senderName) opponentName = data.senderName;
        if (typeof data.score === 'number') opponentScore = data.score;
        if (typeof data.taps === 'number') opponentTaps = data.taps;
        break;

      case 'DUEL_END':
        if (typeof data.score === 'number') opponentScore = data.score;
        break;

      case 'REMATCH':
        resetDuelState();
        break;

      default:
        break;
    }
  }

  function resetDuelState() {
    myScore = 0;
    opponentScore = 0;
    myTaps = 0;
    opponentTaps = 0;
    correctStroopCount = 0;
    totalStroopAttempts = 0;
    timeLeft = 60;
    isRunning = false;
    currentTrial = generateStroopTrial(Date.now());
    if (timerInterval) clearInterval(timerInterval);
  }

  function startDuel() {
    broadcastMessage({
      type: 'DUEL_START',
      senderId: myPeerId,
      senderName: playerName
    });
    startDuelInternal(true);
  }

  function startDuelInternal(broadcast: boolean = true) {
    resetDuelState();
    isRunning = true;
    currentTrial = generateStroopTrial(Date.now() % 100);

    if (broadcast) {
      broadcastScoreUpdate();
    }

    timerInterval = setInterval(() => {
      timeLeft--;

      // Fallback bot simulation if no real P2P peer connected
      if (!peerConnected && Math.random() > 0.40) {
        opponentScore += Math.random() > 0.3 ? 10 : 2;
        opponentTaps += Math.random() > 0.5 ? 1 : 0;
      }

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        broadcastMessage({
          type: 'DUEL_END',
          senderId: myPeerId,
          senderName: playerName,
          score: myScore
        });
      }
    }, 1000);
  }

  function broadcastScoreUpdate() {
    broadcastMessage({
      type: 'SCORE_UPDATE',
      senderId: myPeerId,
      senderName: playerName,
      score: myScore,
      taps: myTaps,
      accuracy: accuracyPercentage
    });
  }

  function handleStroopSelect(key: string) {
    if (!isRunning) return;

    totalStroopAttempts++;
    if (key === currentTrial.correctColorKey) {
      myScore += 10;
      correctStroopCount++;
      neuroAudio.playSuccess();
    } else {
      myScore = Math.max(0, myScore - 5);
      neuroAudio.playError();
    }

    currentTrial = generateStroopTrial((Date.now() + myScore + totalStroopAttempts) % 500);
    broadcastScoreUpdate();
  }

  function handleSpeedTap() {
    if (!isRunning) return;

    myTaps++;
    myScore += 2;
    neuroAudio.playTap();
    broadcastScoreUpdate();
  }

  function triggerRematch() {
    broadcastMessage({
      type: 'REMATCH',
      senderId: myPeerId,
      senderName: playerName
    });
    resetDuelState();
    startDuel();
  }
</script>

<div class="max-w-2xl mx-auto p-6 bg-gradient-to-br from-[#0c051a] via-black to-[#051510] border border-white/20 rounded-3xl space-y-6 shadow-2xl">
  <!-- Duel Header -->
  <div class="flex items-center justify-between border-b border-white/10 pb-4">
    <div class="flex items-center gap-3">
      <span class="text-2xl">⚔️</span>
      <div>
        <h3 class="text-sm font-bold uppercase tracking-wider text-white">Duelo P2P de Agilidad Mental</h3>
        <div class="flex items-center gap-2 mt-0.5">
          <span class="text-[10px] text-white/50">Sala Mesh: <code class="text-cyan-400 font-mono">{roomCode}</code></span>
          {#if peerConnected}
            <span class="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              🟢 P2P Conectado
            </span>
          {:else}
            <span class="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
              🟡 Red Local (Simulación / Esperando Rival)
            </span>
          {/if}
        </div>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="text-right">
        <span class="text-[10px] uppercase tracking-widest text-white/40 block">Tiempo</span>
        <span class="text-2xl font-black font-mono {timeLeft < 10 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}">{timeLeft}s</span>
      </div>

      {#if onExitDuel}
        <button
          type="button"
          onclick={onExitDuel}
          aria-label="Salir del duelo"
          class="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          ✕
        </button>
      {/if}
    </div>
  </div>

  <!-- Live Scoreboard -->
  <div class="grid grid-cols-2 gap-4">
    <div class="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-1">
      <div class="flex items-center justify-between text-[10px] uppercase font-bold text-emerald-400">
        <span>Tú ({playerName})</span>
        <span>{myTaps} taps</span>
      </div>
      <p class="text-3xl font-black text-emerald-300 font-mono">{myScore} pts</p>
      {#if totalStroopAttempts > 0}
        <span class="text-[10px] text-emerald-400/70 block">Precisión Stroop: {accuracyPercentage}%</span>
      {/if}
    </div>

    <div class="p-4 bg-purple-500/10 border border-purple-500/30 rounded-2xl text-center space-y-1">
      <div class="flex items-center justify-between text-[10px] uppercase font-bold text-purple-400">
        <span>{opponentName}</span>
        <span>{opponentTaps} taps</span>
      </div>
      <p class="text-3xl font-black text-purple-300 font-mono">{opponentScore} pts</p>
      <span class="text-[10px] text-purple-400/70 block">Transmisión P2P en vivo</span>
    </div>
  </div>

  {#if !isRunning && timeLeft === 60}
    <!-- Pre-game Lobby -->
    <div class="text-center py-6 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-6">
      <div class="space-y-2">
        <h4 class="text-base font-bold text-white">Desafío Cognitivo 60s: Stroop + Velocidad Tapping</h4>
        <p class="text-xs text-white/70 max-w-md mx-auto">
          Responde estímulos de interferencia de color (Stroop) y realiza pulsaciones ultrarrápidas de velocidad. Gana quien obtenga más puntos en 60s sin desfase de servidor.
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onclick={startDuel}
          class="py-3 px-8 bg-gradient-to-r from-emerald-500 to-purple-500 text-black font-black uppercase tracking-wider text-xs rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(168,85,247,0.4)] cursor-pointer"
        >
          ⚔️ Comenzar Duelo P2P
        </button>
      </div>
    </div>
  {:else if isRunning}
    <!-- Active Duel View: Mode Switcher & Stimuli -->
    <div class="space-y-4">
      <!-- Mode Tabs -->
      <div class="flex bg-black/40 border border-white/10 p-1 rounded-xl gap-1">
        <button
          type="button"
          onclick={() => activeTabMode = 'stroop'}
          class="flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all cursor-pointer {activeTabMode === 'stroop' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-white/50 hover:text-white'}"
        >
          🎨 Interferencia Stroop (+10 pts)
        </button>
        <button
          type="button"
          onclick={() => activeTabMode = 'speed'}
          class="flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all cursor-pointer {activeTabMode === 'speed' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-white/50 hover:text-white'}"
        >
          ⚡ Tapping Velocidad (+2 pts/tap)
        </button>
      </div>

      {#if activeTabMode === 'stroop'}
        <!-- Stroop Color Stimulus -->
        <div class="space-y-4">
          <div class="py-10 bg-black/80 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner">
            <span class="text-5xl font-black tracking-widest transition-transform transform hover:scale-105" style="color: {currentTrial.displayColor};">
              {currentTrial.wordText}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-3">
            {#each colorOptions as btn}
              <button
                type="button"
                onclick={() => handleStroopSelect(btn.key)}
                class="py-3.5 px-4 rounded-xl border-2 font-bold uppercase tracking-wider text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer {btn.bg}"
                style="min-height: 48px;"
              >
                {btn.label}
              </button>
            {/each}
          </div>
        </div>
      {:else}
        <!-- Speed Tapping Pad -->
        <div class="py-12 bg-black/80 border border-amber-500/30 rounded-2xl flex flex-col items-center justify-center space-y-4 shadow-inner">
          <span class="text-[10px] text-amber-400 uppercase font-mono tracking-widest">Pulsaciones de Múltiple Tapping</span>
          <button
            type="button"
            onclick={handleSpeedTap}
            class="w-36 h-36 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-black font-black text-lg uppercase tracking-wider shadow-[0_0_35px_rgba(245,158,11,0.5)] transition-all transform active:scale-90 hover:scale-105 cursor-pointer flex flex-col items-center justify-center gap-1"
          >
            <span class="text-3xl">⚡</span>
            <span>¡TAP!</span>
            <span class="text-[9px] font-mono font-bold text-black/70">{myTaps} taps</span>
          </button>
          <p class="text-[11px] text-white/50 font-mono">Toca repetidamente para sumar +2 pts por toque</p>
        </div>
      {/if}
    </div>
  {:else}
    <!-- Duel Result Screen -->
    <div class="text-center py-8 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-6">
      <div class="space-y-1">
        <div class="text-4xl font-black tracking-wide">
          {myScore > opponentScore ? '🏆 ¡VICTORIA!' : myScore === opponentScore ? '🤝 ¡EMPATE!' : '🥈 ¡BUEN INTENTO!'}
        </div>
        <p class="text-xs text-white/60">
          Resultado Final: <strong>{myScore} pts</strong> ({myTaps} taps) vs <strong>{opponentScore} pts</strong> ({opponentTaps} taps de {opponentName})
        </p>
      </div>

      <div class="p-4 bg-black/40 border border-white/10 rounded-xl max-w-sm mx-auto grid grid-cols-2 gap-3 text-center text-xs">
        <div>
          <span class="text-[10px] text-white/40 block">Precisión Stroop</span>
          <span class="font-bold text-emerald-400 font-mono">{accuracyPercentage}%</span>
        </div>
        <div>
          <span class="text-[10px] text-white/40 block">Taps Totales</span>
          <span class="font-bold text-amber-400 font-mono">{myTaps}</span>
        </div>
      </div>

      <div class="flex items-center justify-center gap-3">
        <button
          type="button"
          onclick={triggerRematch}
          class="py-3 px-6 bg-emerald-500 text-black font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-emerald-400 transition-all cursor-pointer"
        >
          ⚔️ Revancha P2P
        </button>
        {#if onExitDuel}
          <button
            type="button"
            onclick={onExitDuel}
            class="py-3 px-6 bg-white/10 border border-white/20 text-white font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-white/20 transition-all cursor-pointer"
          >
            Salir del Duelo
          </button>
        {/if}
      </div>
    </div>
  {/if}
</div>
