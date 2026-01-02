<script>
  import { fade, fly } from 'svelte/transition';
  import { onDestroy } from 'svelte';
  import FlashlightCard from './FlashlightCard.svelte';
  import { getSubjectMemoryStats, clearAnsweredQuestionsOnly } from '../lib/question-memory';
  import { supabase } from '../lib/supabase';

  export let subject;
  export let currentGrade = 11;
  export let onStart;
  export let onCancel;
  export let availableQuestions = [];
  export let initialJoinCode = ''; // 🆕

  let questionCount = 10;
  let timeOption = 0; // 🆕 0 = unlimited, >0 = seconds per question
  let mode = 'SOLO'; // 'SOLO' or 'PARTY'
  let useDiagnostic = true;
  let showResetConfirm = false;

  // Party Mode State
  let partyEnabled = false;
  let partyTab = 'crear'; // 'crear' or 'unirse'
  let partyCode = '';
  let joinCode = '';
  let connectedUsers = [];
  let partyChannel = null;
  let isHost = false;
  let isCreatingParty = false;
  let partyError = '';
  let copied = false;
  let sessionId = ''; // 🆕 Local session ID for party tracking
  let isReady = false; // 🆕 Guest ready state
  let syncedQuestions = []; // 🆕 Questions from host
  let playerName = 'Jugador';
  let studentId = '';
  let isUpdatingReady = false;

  // 🆕 Realtime connection health (UX-only)
  let realtimeSubscribeStatus = 'IDLE';
  let isOnline = true;
  let p2pConnected = $state(false); // 🆕 P2P connection status
  let syncMethod = $state('none'); // 'p2p', 'realtime', or 'none'

  $: allStudentsReady = connectedUsers.length > 0 && connectedUsers.every((u) => Boolean(u?.ready));
  $: canHostStartParty = !partyEnabled || !partyCode || !isHost || allStudentsReady;
  $: readyCount = connectedUsers.filter((u) => Boolean(u?.ready)).length;

  // 🆕 Sync method label
  $: syncMethodLabel = !partyEnabled || !partyCode
    ? ''
    : p2pConnected
      ? '🔗 P2P'
      : realtimeSubscribeStatus === 'SUBSCRIBED'
        ? '☁️ Realtime'
        : 'conectando…';

  $: syncMethodClass = !partyEnabled || !partyCode
    ? 'text-white/40'
    : p2pConnected
      ? 'text-blue-400'
      : realtimeSubscribeStatus === 'SUBSCRIBED'
        ? 'text-emerald-400'
        : 'text-yellow-400';

  $: realtimeLabel = !partyEnabled || !partyCode
    ? ''
    : !isOnline
      ? 'sin conexión'
      : realtimeSubscribeStatus === 'SUBSCRIBED'
        ? 'conectado'
        : (realtimeSubscribeStatus === 'CHANNEL_ERROR' || realtimeSubscribeStatus === 'TIMED_OUT')
          ? 'reconectando…'
          : realtimeSubscribeStatus === 'CLOSED'
            ? 'desconectado'
            : 'conectando…';

  $: realtimeClass = !partyEnabled || !partyCode
    ? 'text-white/40'
    : !isOnline
      ? 'text-red-400'
      : realtimeSubscribeStatus === 'SUBSCRIBED'
        ? 'text-emerald-400'
        : (realtimeSubscribeStatus === 'CHANNEL_ERROR' || realtimeSubscribeStatus === 'TIMED_OUT')
          ? 'text-yellow-400'
          : realtimeSubscribeStatus === 'CLOSED'
            ? 'text-red-400'
            : 'text-yellow-400';

  const questionOptions = [5, 10, 15];

  $: diagnosticGrades = [3, 5, 7, 9].filter(g => g < currentGrade);
  $: memoryStats = getSubjectMemoryStats(availableQuestions, subject);
  $: shareUrl = partyCode ? `${typeof window !== 'undefined' ? window.location.origin : ''}/party?join=${partyCode}` : '';
  $: configLocked = partyEnabled && partyCode && !isHost;

  async function copyShareUrl() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  async function sharePartyLink() {
    if (!shareUrl) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Únete a mi Party',
          text: `Código: ${partyCode}`,
          url: shareUrl
        });
        return;
      }
    } catch (err) {
      // If user cancels share, do nothing.
      console.warn('Share cancelled/failed, falling back to copy:', err);
    }

    await copyShareUrl();
  }

  // 🆕 Auto-handle Join Code
  import { onMount } from 'svelte';
  onMount(() => {
    try {
      isOnline = navigator.onLine;
    } catch {
      isOnline = true;
    }

    try {
      const storedName = localStorage.getItem('party_player_name');
      if (storedName && storedName.trim()) playerName = storedName.trim();
    } catch {
      // ignore
    }

    function handleOnline() {
      isOnline = true;
      if (partyEnabled && partyCode) {
        // Force re-subscribe to ensure we recover after offline periods
        subscribeToParty({ force: true, reason: 'online' });
      }
    }

    function handleOffline() {
      isOnline = false;
      realtimeSubscribeStatus = 'OFFLINE';
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (initialJoinCode) {
      partyEnabled = true;
      partyTab = 'unirse';
      joinCode = initialJoinCode;
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  });

  function getStudentStorageKey(partyCode) {
    return `party_student_id:${partyCode}`;
  }

  function ensureStudentIdForParty(partyCode) {
    if (studentId) return studentId;

    try {
      const stored = localStorage.getItem(getStudentStorageKey(partyCode));
      if (stored) {
        studentId = stored;
        return studentId;
      }
    } catch {
      // ignore
    }

    studentId = crypto.randomUUID();
    try {
      localStorage.setItem(getStudentStorageKey(partyCode), studentId);
    } catch {
      // ignore
    }
    return studentId;
  }

  async function updateMyReadyState(nextReady) {
    if (!partyEnabled || !partyCode) return;
    const myId = ensureStudentIdForParty(partyCode);

    const { data, error } = await supabase
      .from('party_sessions')
      .select('students')
      .eq('party_code', partyCode)
      .maybeSingle();

    if (error || !data) {
      throw (error ?? new Error('Party no encontrada'));
    }

    const students = data.students || [];
    const idx = students.findIndex((s) => s?.id === myId);
    const now = new Date().toISOString();

    const resolvedName = (playerName || '').trim() || 'Jugador';
    try {
      localStorage.setItem('party_player_name', resolvedName);
    } catch {
      // ignore
    }

    if (idx >= 0) {
      students[idx] = {
        ...students[idx],
        id: myId,
        name: resolvedName,
        ready: nextReady,
        joined_at: students[idx].joined_at || now
      };
    } else {
      students.push({ id: myId, name: resolvedName, ready: nextReady, joined_at: now });
    }

    await supabase.from('party_sessions')
      .update({ students })
      .eq('party_code', partyCode);
  }

  // Generate 6-char alphanumeric code (matches DB constraint)
  function generatePartyCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  import { p2pService } from '../lib/p2p-service';

  // Sync interval for broadcasting config to guests
  let syncInterval = null;

  // Cleanup on destroy
  onDestroy(() => {
    if (partyChannel) supabase.removeChannel(partyChannel);

    // Clear sync interval if exists
    if (syncInterval) clearInterval(syncInterval);

    // 🚨 Only destroy P2P if we are NOT starting the exam (i.e. user cancelled or closed modal)
    // We can infer this by checking if partyEnabled is off OR if we are just closing modal but keeping session active?
    // Actually, App.svelte handles the view switch.
    // If we switch view, this component is destroyed.
    // We need a way to tell if we are proceeding to exam.
    // For now, let's LEAVE P2P active if partyEnabled is true and partyCode exists.
    // App.svelte will handle final cleanup or we rely on page refresh.
    // Better: p2pService is singleton. If we destroy it, it dies for App.svelte too.
    // So we should ONLY destroy it if we are explicitly leaving the party context.
    // If we successfully started (isHost or joined), we want it alive.
    if (!partyEnabled || !partyCode) {
        p2pService.destroy();
    }
  });

  // ... (existing imports)

  // P2P Initialization for Host
  async function initP2PHost() {
    try {
      const peerId = await p2pService.initHost(partyCode);
      await supabase.from('party_sessions')
        .update({ host_peer_id: peerId })
        // We will store it in `exam_config.host_peer_id`.
        .eq('party_code', partyCode);

      console.log('📡 P2P Host registered:', peerId);

      // Listen for data
      p2pService.onData((msg) => {
         if (msg.type === 'READY_STATE') {
             // Update local connectedUsers state if we match a user?
             // Ideally we broadcast this back to everyone so they see the green dot
             console.log('Host received READY:', msg);
             // We can trigger a UI update or relay to Supabase if we really wanted persistence
             // But for current P2P task: just log.
         }
         if (msg.type === 'EXAM_RESULT') {
             console.log('Host received Result:', msg.payload);
             // Store in RAM for Results View
         }
      });

    } catch (e) {
      console.error('P2P Host Init Failed:', e);
    }
  }

  // 🆕 P2P Connection for Guest (Primary sync method)
  async function connectToP2PHost(config) {
     // Trystero migration: We don't need host_peer_id, just partyCode
     try {
         console.log('📡 Attempting P2P connection to room:', partyCode);
         await p2pService.connectToHost(partyCode);

         // Listen for updates (Config, Start, Questions)
         p2pService.onData((msg) => {
             console.log('📥 P2P Message received:', msg.type);

             if (msg.type === 'CONFIG_UPDATE') {
                 // 🆕 Set Host ID for Star Topology filtering
                 if (msg.senderId) {
                     p2pService.setHostId(msg.senderId);
                 }

                 // Update local config
                 if (msg.payload.num_questions) questionCount = msg.payload.num_questions;
                 if (msg.payload.time_option !== undefined) timeOption = msg.payload.time_option;
                 if (msg.payload.questions) {
                     syncedQuestions = msg.payload.questions;
                     console.log('✅ Questions synced via P2P:', syncedQuestions.length);
                 }
                 console.log('🔄 Config synced via P2P:', msg.payload);
             }

             if (msg.type === 'START_EXAM') {
                 console.log('🚀 P2P Start Signal!');
                 // Sync questions if provided
                 if (msg.payload.questions) {
                     syncedQuestions = msg.payload.questions;
                     console.log('✅ Questions received via P2P START:', syncedQuestions.length);
                 }
                 // Force start logic
                 handleStart();
                 }
             });

             console.log('✅ P2P guest connected successfully');
             p2pConnected = true;
             syncMethod = 'p2p';
             return true;
         } catch (e) {
             console.warn('⚠️ P2P Connect Failed, will use Supabase Realtime fallback:', e);
             p2pConnected = false;
             syncMethod = 'realtime';
             // Return false to indicate fallback to Realtime
             return false;
         }
  }

  // Broadcast Config Changes (including questions)
  function broadcastConfig() {
     if (isHost && partyEnabled && partyCode) {
         const payload = {
             num_questions: questionCount,
             time_option: timeOption,
             questions: syncedQuestions // 🔥 Always include questions
         };

         console.log('📤 Broadcasting config via P2P:', {
             questions: payload.questions.length,
             num: payload.num_questions,
             time: payload.time_option
         });

         p2pService.broadcast('CONFIG_UPDATE', payload);
     }
  }

  // Watch for config changes to broadcast
  $: if (isHost && partyEnabled && (questionCount || timeOption)) {
      broadcastConfig();
  }

  // Update createParty to init P2P
  async function createParty() {
    isCreatingParty = true;
    partyError = '';
    try {
      const newPartyCode = generatePartyCode();

      // 🆕 Generate questions
      const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffled.slice(0, questionCount);
      syncedQuestions = selectedQuestions;

      // 🎯 CRITICAL: Initialize P2P as primary method, Realtime as fallback
      let peerId = null;
      let p2pInitialized = false;
      try {
        peerId = await p2pService.initHost(newPartyCode);
        p2pInitialized = true;
        p2pConnected = true;
        syncMethod = 'p2p';
        console.log('✅ P2P Host initialized (PRIMARY):', peerId);
      } catch (p2pError) {
        console.warn('⚠️ P2P init failed, using Realtime fallback:', p2pError);
        p2pConnected = false;
        syncMethod = 'realtime';
        // Continue without P2P - Supabase Realtime will handle sync
      }

      const { error } = await supabase.from('party_sessions').insert({
        party_code: newPartyCode,
        host_name: 'Host',
        exam_config: {
          subject: subject,
          grade: currentGrade,
          num_questions: questionCount,
          time_option: timeOption, // 🔧 Guardar configuración de tiempo
          difficulty: 'NORMAL',
          questions: selectedQuestions,
          host_peer_id: peerId // 🆕 Store PeerID in JSON (null if P2P failed)
        },
        students: [],
        max_students: 50,
        status: 'waiting'
      });

      console.log('📝 Party creado con configuración:', {
        subject,
        grade: currentGrade,
        num_questions: questionCount,
        time_option: timeOption,
        questions_count: selectedQuestions.length
      });

      if (error) throw error;

      partyCode = newPartyCode;

      isHost = true;
      subscribeToParty();

      // Setup P2P listener for host
      p2pService.onData((msg) => {
          console.log('📥 Host received P2P message:', msg.type);

          if (msg.type === 'READY_STATE') {
              console.log('Host received READY from:', msg.senderId, msg.payload);

              // If guest needs questions, send them immediately
              if (msg.payload?.needsQuestions && syncedQuestions.length > 0) {
                  console.log('📤 Sending questions to guest via P2P');
                  p2pService.broadcast('CONFIG_UPDATE', {
                      num_questions: questionCount,
                      time_option: timeOption,
                      questions: syncedQuestions
                  });
              }
          }
      });

      // Periodically broadcast config to ensure all guests are synced
      if (syncInterval) clearInterval(syncInterval);
      syncInterval = setInterval(() => {
          if (partyEnabled && partyCode && syncedQuestions.length > 0) {
              broadcastConfig();
          }
      }, 3000); // Every 3 seconds

    } catch (err) {
      console.error('Error creating party:', err);
      partyError = err instanceof Error ? err.message : 'Error al crear la party. Intenta de nuevo.';
      partyCode = '';
      // Clean up P2P if party creation failed
      p2pService.disconnect();
    } finally {
      isCreatingParty = false;
    }
  }

  // Update joinParty to connect P2P
  async function joinParty() {
    if (joinCode.length !== 6) {
      partyError = 'El código debe tener 6 caracteres';
      return;
    }

    partyError = '';
    try {
      const cleanJoinCode = joinCode.trim().toUpperCase();
      const { data, error } = await supabase
        .from('party_sessions')
        .select('*')
        .eq('party_code', cleanJoinCode)
        .maybeSingle();

      if (error || !data) {
        partyError = 'Party no encontrada o expirada';
        return;
      }

      if (data.status && data.status !== 'waiting') {
        if (data.status === 'active') {
          partyError = 'La party ya inició. Pídele al host un nuevo enlace o espera revancha.';
        } else {
          partyError = 'La party ya finalizó.';
        }
        return;
      }

      partyCode = cleanJoinCode;
      isHost = false;

      const resolvedName = (playerName || '').trim() || 'Jugador';
      try {
        localStorage.setItem('party_player_name', resolvedName);
      } catch {
        // ignore
      }

      const myId = ensureStudentIdForParty(partyCode);

      // Add self
      const students = data.students || [];
      const now = new Date().toISOString();
      const existingIdx = students.findIndex((s) => s?.id === myId);
      if (existingIdx >= 0) {
        students[existingIdx] = {
          ...students[existingIdx],
          id: myId,
          name: resolvedName,
          joined_at: students[existingIdx].joined_at || now,
          ready: Boolean(students[existingIdx].ready)
        };
      } else {
        students.push({ id: myId, name: resolvedName, joined_at: now, ready: false });
      }

      await supabase.from('party_sessions')
        .update({ students })
        .eq('party_code', partyCode);

      // 🔧 CRÍTICO: Sincronizar TODA la configuración del host
      const config = data.exam_config || {};

      // Sync Questions
      if (config.questions) {
         syncedQuestions = config.questions;
         console.log('✅ Preguntas sincronizadas:', syncedQuestions.length);
      }

      // Sync configuration (guests mirror host config)
      if (config.num_questions !== undefined) {
        questionCount = config.num_questions;
        console.log('📊 Cantidad de preguntas:', questionCount);
      }
      if (config.time_option !== undefined) {
        timeOption = config.time_option;
        console.log('⏱️ Tiempo por pregunta:', timeOption === 0 ? 'Sin límite' : `${timeOption}s`);
      }

      console.log('🔄 Configuración inicial sincronizada:', {
        subject: config.subject,
        grade: config.grade,
        num_questions: questionCount,
        time_option: timeOption,
        questions_synced: syncedQuestions.length
      });

      // 🎯 CRITICAL: Try P2P FIRST (primary), then fallback to Realtime
      let p2pConnectedSuccess = false;
      if (data.exam_config?.host_peer_id) {
          p2pConnectedSuccess = await connectToP2PHost(data.exam_config);

          if (p2pConnectedSuccess) {
              console.log('✅ Using P2P as primary sync method');
              // Send initial sync request via P2P
              p2pService.sendToHost('READY_STATE', {
                  ready: false,
                  needsQuestions: syncedQuestions.length === 0
              });
          } else {
              console.log('⚠️ P2P failed, using Realtime fallback');
          }
      }

      // Subscribe to Realtime as fallback or if P2P not available
      subscribeToParty();
      connectedUsers = students;
      isReady = Boolean(students.find((s) => s?.id === myId)?.ready);

    } catch (err) {
      console.error('Error joining party:', err);
      partyError = 'Error al unirse';
    }
  }

  // Update handleStart to P2P Broadcast
  function handleStart() {
    if (partyEnabled && !sessionId) {
      sessionId = crypto.randomUUID();
    }

    if (partyEnabled && partyCode && isHost && !allStudentsReady) {
      partyError = 'Espera a que todos los jugadores marquen “Listo”';
      return;
    }

    // 🆕 P2P Broadcast Start
    if (isHost && partyEnabled) {
        p2pService.broadcast('START_EXAM', {
            questions: syncedQuestions,
            timeLimitSeconds: timeOption > 0 ? timeOption * questionCount : 0
        });
    }

    onStart({
      count: questionCount,
      mode: partyEnabled ? 'PARTY' : 'SOLO',
      useDiagnostic: useDiagnostic,
      partyCode: partyCode,
      isHost: isHost,
      sessionId: partyEnabled ? sessionId : undefined,
      timeLimitSeconds: timeOption > 0 ? timeOption * questionCount : 0,
      questions: partyEnabled && syncedQuestions.length > 0 ? syncedQuestions : undefined
    });
  }

  // Supabase Realtime Subscription for Party
  function subscribeToParty(opts = {}) {
    const { force = false } = opts;

    if (!partyCode) return;

    if (partyChannel) {
      supabase.removeChannel(partyChannel);
    }

    if (force) {
      realtimeSubscribeStatus = 'CONNECTING';
    }

    partyChannel = supabase.channel(`party:${partyCode}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'party_sessions',
        filter: `party_code=eq.${partyCode}`
      }, (payload) => {
        console.log('🔄 Party session updated:', payload);

        if (payload.new && payload.new.students) {
          connectedUsers = payload.new.students;
        }

        // 🆕 CRÍTICO: Detectar cuando el host inicia el examen (status: active)
        if (!isHost && payload.new && payload.new.status === 'active') {
          console.log('🚀 Host ha iniciado el examen! Sincronizando...');

          // Sincronizar preguntas del host
          if (payload.new.exam_config?.questions) {
            syncedQuestions = payload.new.exam_config.questions;
            console.log('✅ Preguntas sincronizadas:', syncedQuestions.length);
          }

          // Auto-iniciar el examen para el guest
          setTimeout(() => {
            console.log('🎯 Auto-iniciando examen para guest...');
            handleStart();
          }, 500); // Pequeño delay para que se apliquen todos los cambios
        }
      })
      .subscribe((status) => {
        realtimeSubscribeStatus = status;
      });
  }

  // Refresh connected users manually
  async function refreshStudents() {
    if (!partyCode) return;
    try {
      const { data, error } = await supabase
        .from('party_sessions')
        .select('students')
        .eq('party_code', partyCode)
        .maybeSingle();

      if (data && Array.isArray(data.students)) {
        connectedUsers = data.students;
      }
    } catch (err) {
      console.error('Error refreshing students:', err);
    }
  }

  // Handle memory reset confirmation
  function handleResetMemory() {
    if (showResetConfirm) {
      clearAnsweredQuestionsOnly();
      showResetConfirm = false;
      // Recalculate stats
      memoryStats = getSubjectMemoryStats(availableQuestions, subject);
    } else {
      showResetConfirm = true;
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => { showResetConfirm = false; }, 3000);
    }
  }
</script>

<div class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" transition:fade>
  <div
    class="bg-[#121212] border border-white/10 rounded-xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
    in:fly={{ y: 20, duration: 300 }}
  >
    <div class="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FCD116] via-[#003893] to-[#CE1126]"></div>

    <h2 class="text-2xl font-bold uppercase tracking-widest text-[#F5F5DC] mb-6 text-center">
      Configurar Examen
    </h2>

    <div class="space-y-6 relative z-10">
      <!-- Subject Display -->
      <div class="text-center mb-6">
        <span class="text-xs uppercase tracking-widest opacity-60">Materia</span>
        <h3 class="text-xl font-bold text-emerald-500">{subject || 'Simulacro Completo'}</h3>
      </div>

      <!-- Question Availability Panel -->
      {#if memoryStats.totalForSubject > 0}
        <div class="p-4 bg-white/5 border border-white/10 rounded-lg mb-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs uppercase tracking-widest opacity-60">Preguntas Disponibles</span>
            <button
              onclick={handleResetMemory}
              class="text-[10px] uppercase tracking-widest px-2 py-1 rounded border transition-all duration-200 {showResetConfirm ? 'bg-red-500/20 border-red-500 text-red-400' : 'border-white/20 text-white/40 hover:text-white/60 hover:border-white/40'}"
            >
              {showResetConfirm ? '¿Confirmar?' : '🔄 Reiniciar'}
            </button>
          </div>

          <div class="grid grid-cols-3 gap-2 mb-3 text-center">
            <div class="p-2 bg-white/5 rounded">
              <p class="text-lg font-bold text-white">{memoryStats.totalForSubject}</p>
              <p class="text-[10px] uppercase tracking-widest text-white/40">Total</p>
            </div>
            <div class="p-2 bg-yellow-500/10 rounded">
              <p class="text-lg font-bold text-yellow-500">{memoryStats.answeredCount}</p>
              <p class="text-[10px] uppercase tracking-widest text-white/40">Vistas</p>
            </div>
            <div class="p-2 bg-emerald-500/10 rounded">
              <p class="text-lg font-bold text-emerald-500">{memoryStats.availableCount}</p>
              <p class="text-[10px] uppercase tracking-widest text-white/40">Frescas</p>
            </div>
          </div>

          <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              class="h-full transition-all duration-500 {memoryStats.percentUsed > 70 ? 'bg-red-500' : memoryStats.percentUsed > 40 ? 'bg-yellow-500' : 'bg-emerald-500'}"
              style="width: {Math.round(memoryStats.percentUsed)}%"
            ></div>
          </div>
          <p class="text-[10px] text-white/30 mt-1 text-center">
            {Math.round(memoryStats.percentUsed)}% del banco visto
          </p>
        </div>
      {/if}

      <!-- Question Count -->
      <div class="space-y-3">
        <label class="text-xs uppercase tracking-widest opacity-60 block">Cantidad de Preguntas</label>
        <div class="grid grid-cols-3 gap-3">
          {#each questionOptions as count}
            <button
              disabled={configLocked}
              class="py-2 px-4 rounded border transition-all duration-200 font-bold {configLocked ? 'opacity-50 cursor-not-allowed' : ''} {questionCount === count ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60'}"
              onclick={() => questionCount = count}
            >
              {count}
            </button>
          {/each}
        </div>
      </div>

      <!-- Time Config -->
      <div class="space-y-3">
        <label class="text-xs uppercase tracking-widest opacity-60 block">Tiempo por Pregunta</label>
        <div class="grid grid-cols-3 gap-3">
          <button
            disabled={configLocked}
            class="py-2 px-2 rounded border transition-all duration-200 text-[10px] font-bold uppercase {configLocked ? 'opacity-50 cursor-not-allowed' : ''} {timeOption === 0 ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60'}"
            onclick={() => timeOption = 0}
          >
            Sin Límite
          </button>

          <button
            disabled={configLocked}
            class="py-2 px-2 rounded border transition-all duration-200 text-[10px] font-bold uppercase {configLocked ? 'opacity-50 cursor-not-allowed' : ''} {timeOption === 15 ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60'}"
            onclick={() => timeOption = 15}
          >
            15 s
          </button>

          <button
            disabled={configLocked}
            class="py-2 px-2 rounded border transition-all duration-200 text-[10px] font-bold uppercase {configLocked ? 'opacity-50 cursor-not-allowed' : ''} {timeOption === 30 ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60'}"
            onclick={() => timeOption = 30}
          >
            30 s
          </button>

          <button
            disabled={configLocked}
            class="py-2 px-2 rounded border transition-all duration-200 text-[10px] font-bold uppercase {configLocked ? 'opacity-50 cursor-not-allowed' : ''} {timeOption === 60 ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60'}"
            onclick={() => timeOption = 60}
          >
            1 min
          </button>
           <button
            disabled={configLocked}
            class="py-2 px-2 rounded border transition-all duration-200 text-[10px] font-bold uppercase {configLocked ? 'opacity-50 cursor-not-allowed' : ''} {timeOption === 90 ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60'}"
            onclick={() => timeOption = 90}
          >
            1.5 min
          </button>
        </div>
      </div>

      <!-- Party Mode Toggle -->
      <div class="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
        <div class="flex items-center gap-3 mb-2">
          <button
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none {partyEnabled ? 'bg-purple-500' : 'bg-white/20'}"
            role="switch"
            aria-checked={partyEnabled}
            onclick={() => { partyEnabled = !partyEnabled; if (!partyEnabled) { partyCode = ''; connectedUsers = []; } }}
          >
            <span
              aria-hidden="true"
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out {partyEnabled ? 'translate-x-5' : 'translate-x-0'}"
            ></span>
          </button>
          <div>
            <h4 class="text-sm font-bold text-purple-400 uppercase tracking-widest">
              🎉 Party Mode
              <span class="ml-2 text-[10px] {partyEnabled ? 'text-purple-300' : 'text-white/30'}">
                {partyEnabled ? 'ACTIVADO' : 'DESACTIVADO'}
              </span>
            </h4>
          </div>
        </div>

        {#if partyEnabled}
          <div class="mt-4 space-y-4" transition:fade>
            <!-- Tabs -->
            <div class="flex gap-2">
              <button
                class="flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded transition-all {partyTab === 'crear' ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}"
                onclick={() => partyTab = 'crear'}
              >
                Crear Party
              </button>
              <button
                class="flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded transition-all {partyTab === 'unirse' ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}"
                onclick={() => partyTab = 'unirse'}
              >
                Unirse
              </button>
            </div>

            {#if partyTab === 'crear'}
              {#if !partyCode}
                <button
                  onclick={createParty}
                  disabled={isCreatingParty}
                  class="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold uppercase tracking-widest rounded transition-all disabled:opacity-50"
                >
                  {isCreatingParty ? 'Creando...' : '✨ Generar Código'}
                </button>
              {:else}
                <!-- Party Created -->
                <div class="space-y-3">
                  <div class="text-center">
                    <span class="text-xs uppercase tracking-widest opacity-60">Código de Sesión</span>
                    <p class="text-4xl font-black text-purple-400 font-mono">{partyCode}</p>
                  </div>

                  <div class="flex gap-2">
                    <input
                      type="text"
                      readonly
                      value={shareUrl}
                      class="flex-1 px-3 py-2 bg-black/50 border border-white/10 rounded text-xs text-purple-300 font-mono"
                    />
                    <button
                      onclick={sharePartyLink}
                      class="px-4 py-2 rounded text-xs font-bold uppercase bg-white/10 hover:bg-white/20"
                      aria-label="Compartir enlace"
                      title="Compartir"
                    >
                      📤
                    </button>
                    <button
                      onclick={copyShareUrl}
                      class="px-4 py-2 rounded text-xs font-bold uppercase {copied ? 'bg-emerald-500' : 'bg-white/10 hover:bg-white/20'}"
                    >
                      {copied ? '✓' : '📋'}
                    </button>
                  </div>

                  <div class="p-3 bg-black/30 rounded">
                    <p class="text-xs uppercase tracking-widest opacity-60 mb-2">
                      Jugadores Conectados ({connectedUsers.length})
                    </p>
                    {#if syncMethodLabel}
                      <p class="text-[10px] uppercase tracking-widest mb-2">
                        Método: <span class={syncMethodClass}>{syncMethodLabel}</span>
                        {#if syncMethod === 'p2p'}
                          <span class="text-[8px] text-white/30 ml-1">(ahorro backend)</span>
                        {/if}
                      </p>
                    {/if}
                    {#if connectedUsers.length > 0}
                      <p class="text-[10px] uppercase tracking-widest text-white/40 mb-2">
                        Listos: {readyCount}/{connectedUsers.length}
                      </p>
                    {/if}
                    {#if connectedUsers.length === 0}
                      <p class="text-xs text-white/40">Esperando jugadores...</p>
                    {:else}
                      <div class="space-y-1">
                        {#each connectedUsers as user}
                          <div class="flex items-center gap-2 text-sm">
                            <span class="w-2 h-2 rounded-full {user.ready ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-white/20'}"></span>
                            <span class="{user.ready ? 'text-emerald-400 font-bold' : 'text-white/60'}">{user.name || 'Jugador'}</span>
                             {#if user.ready} <span class="text-[10px] text-emerald-500 ml-auto uppercase tracking-wider">LISTO</span> {/if}
                          </div>
                        {/each}
                      </div>
                    {/if}
                  </div>
                </div>
              {/if}
            {:else}
              <!-- Join Mode -->
              {#if partyCode}
                 <!-- Waiting Room for Guest -->
                 <div class="text-center space-y-4 py-4">
                    <div class="animate-pulse">
                      <p class="text-xs uppercase tracking-widest opacity-60 mb-1">Conectado a Sala</p>
                      <p class="text-3xl font-black font-mono text-purple-400">{partyCode}</p>
                    </div>

                    {#if syncMethodLabel}
                      <p class="text-[10px] uppercase tracking-widest">
                        Sincronización: <span class={syncMethodClass}>{syncMethodLabel}</span>
                        {#if syncMethod === 'p2p'}
                          <span class="text-[8px] text-emerald-400 ml-1">✓ Directo con host</span>
                        {:else if syncMethod === 'realtime'}
                          <span class="text-[8px] text-yellow-400 ml-1">vía servidor</span>
                        {/if}
                      </p>
                    {/if}

                    <!-- 🆕 Configuración Sincronizada del Host -->
                    <div class="p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg space-y-2">
                      <p class="text-xs uppercase tracking-widest text-purple-300 mb-3">⚙️ Configuración del Anfitrión</p>

                      <div class="grid grid-cols-2 gap-3 text-sm">
                        <div class="p-2 bg-black/30 rounded">
                          <p class="text-[10px] uppercase tracking-wider text-white/40">Preguntas</p>
                          <p class="text-lg font-bold text-emerald-400">{questionCount}</p>
                        </div>

                        <div class="p-2 bg-black/30 rounded">
                          <p class="text-[10px] uppercase tracking-wider text-white/40">Tiempo</p>
                          <p class="text-lg font-bold text-blue-400">
                            {timeOption === 0 ? '∞' : `${timeOption}s`}
                          </p>
                        </div>
                      </div>

                      {#if syncedQuestions.length > 0}
                        <div class="flex items-center justify-center gap-2 mt-2 p-2 bg-emerald-500/10 rounded">
                          <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          <p class="text-emerald-400 text-xs font-bold">
                            {syncedQuestions.length} preguntas sincronizadas
                          </p>
                        </div>
                      {:else}
                        <div class="flex items-center justify-center gap-2 mt-2 p-2 bg-yellow-500/10 rounded">
                          <span class="animate-pulse text-yellow-500">⏳</span>
                          <p class="text-yellow-400 text-xs">
                            Esperando sincronización...
                          </p>
                        </div>
                      {/if}
                    </div>

                    <button
                      onclick={async () => {
                         partyError = '';
                         try {
                           isUpdatingReady = true;
                           const nextReady = !isReady;
                           isReady = nextReady;
                           await updateMyReadyState(nextReady);
                         } catch (e) {
                           console.error('Failed to update ready state:', e);
                           partyError = 'No se pudo actualizar el estado de listo';
                         } finally {
                           isUpdatingReady = false;
                         }
                      }}
                      disabled={isUpdatingReady}
                      class="w-full py-4 rounded-xl border-2 transition-all font-bold uppercase tracking-widest text-sm {isReady ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' : 'border-white/20 hover:border-white/40 text-white/60'}"
                    >
                      {isUpdatingReady ? '⏳ Actualizando...' : (isReady ? '¡Estoy Listo!' : 'Marcar como Listo')}
                    </button>

                    <p class="text-[10px] text-white/30 animate-pulse">
                       El anfitrión iniciará la partida cuando todos estén listos...
                    </p>
                 </div>
              {:else}
              <div class="space-y-3">
              <input
                  type="text"
                  bind:value={playerName}
                  placeholder="Tu nombre"
                  maxlength="30"
                  class="w-full px-4 py-3 bg-black/50 border border-white/10 rounded text-center text-sm uppercase tracking-widest focus:outline-none focus:border-purple-500"
                />
              <input
                  type="text"
                  bind:value={joinCode}
                  placeholder="Código de 6 caracteres"
                  maxlength="6"
                  class="w-full px-4 py-3 bg-black/50 border border-white/10 rounded text-center text-2xl font-mono tracking-[0.3em] uppercase focus:outline-none focus:border-purple-500"
                />
                <button
                  onclick={joinParty}
                  disabled={joinCode.length !== 6}
                  class="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold uppercase tracking-widest rounded transition-all disabled:opacity-50"
                >
                  Unirse
                </button>
              </div>
              {/if}
            {/if}

            {#if partyError}
              <p class="text-xs text-red-400 text-center">{partyError}</p>
            {/if}
          </div>
        {/if}
      </div>

      <!-- Diagnostic Toggle (Only for SOLO without Party) -->
      {#if !partyEnabled}
        <div class="p-4 bg-[#121212]/50 border border-emerald-500/30 rounded-lg relative overflow-hidden group" transition:fade>
          <div class="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
            <svg class="w-12 h-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>

          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-2">
              <button
                class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none {useDiagnostic ? 'bg-emerald-500' : 'bg-white/20'}"
                role="switch"
                aria-checked={useDiagnostic}
                onclick={() => useDiagnostic = !useDiagnostic}
              >
                <span
                  aria-hidden="true"
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out {useDiagnostic ? 'translate-x-5' : 'translate-x-0'}"
                ></span>
              </button>
              <div>
                <h4 class="text-sm font-bold text-emerald-500 uppercase tracking-widest">
                  Panel de Diagnóstico
                  <span class="ml-2 text-[10px] {useDiagnostic ? 'text-emerald-400' : 'text-white/30'}">
                    {useDiagnostic ? 'ACTIVADO' : 'DESACTIVADO'}
                  </span>
                </h4>
              </div>
            </div>

            <p class="text-xs opacity-70 leading-relaxed max-w-[90%]">
              Detecta vacíos fundamentales con preguntas de grados anteriores.
            </p>

            {#if useDiagnostic && diagnosticGrades.length > 0}
              <div class="mt-3 flex gap-2 flex-wrap" transition:fade>
                {#each diagnosticGrades as g}
                  <span class="px-2 py-1.5 rounded-md bg-[#001e10] text-emerald-500 border border-emerald-500/20 text-[10px] font-bold font-mono">G{g}</span>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Actions -->
      <div class="flex gap-3 pt-4">
        {#if !isHost && partyCode}
           <!-- Guest Actions (Already handled in Join Mode view) -->
           <button
            class="w-full py-3 border border-white/20 rounded hover:bg-white/10 transition-colors uppercase text-xs tracking-widest opacity-60 hover:opacity-100"
            onclick={onCancel}
          >
            Salir
          </button>
        {:else}
          <button
            class="flex-1 py-3 border border-white/20 rounded hover:bg-white/10 transition-colors uppercase text-xs tracking-widest opacity-60 hover:opacity-100"
            onclick={onCancel}
          >
            Cancelar
          </button>
          <button
            class="flex-1 py-3 bg-gradient-to-r from-[#FCD116] via-[#003893] to-[#CE1126] text-white font-bold uppercase tracking-widest text-xs rounded hover:opacity-90 transition-opacity shadow-lg"
            onclick={handleStart}
            disabled={(partyEnabled && !partyCode) || (partyEnabled && partyCode && isHost && !canHostStartParty)}
          >
            {partyEnabled && partyCode
              ? (isHost && !canHostStartParty ? '⏳ Esperando listos' : '🚀 Iniciar Party')
              : 'Comenzar'}
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>
