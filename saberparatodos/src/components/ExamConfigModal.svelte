<script lang="ts">
  import { fade, fly, slide } from 'svelte/transition';
  import { onDestroy } from 'svelte';
  import FlashlightCard from './FlashlightCard.svelte';
  import { getSubjectMemoryStats, clearAnsweredQuestionsOnly } from '../lib/question-memory';
  import { supabase } from '../lib/supabase';
  import {
    fetchAllQuestionsForGrade,
    fetchQuestions, // 🆕 Import fetchQuestions
    getEffectiveEnglishLevel,
    prefetchEnglishPool, // 🆕
    calculateEnglishProficiency
  } from '../lib/api-service';
  import { getCachedEnglishQuestions, getAnsweredQuestionIds } from '../lib/idb-storage'; // 🆕

  let {
    subject: initialSubject,
    currentGrade: initialGrade = 11,
    onStart,
    onCancel,
    availableQuestions = [],
    initialJoinCode = ''
  } = $props();

  // 🆕 Make subject and grade editable
  let selectedSubject = $state(initialSubject || 'Simulacro Completo');
  let selectedGrade = $state(initialGrade);
  let availableSubjects = $state(['Simulacro Completo', 'Matemáticas', 'Lectura Crítica', 'Ciencias Naturales', 'Sociales y Ciudadanas']);
  let availableGrades = $state([3, 5, 6, 7, 8, 9, 10, 11]);

  // 🆕 Detect English Diagnostic Mode (grade = 0 means cross-grade English assessment)
  let isEnglishDiagnosticMode = $derived(initialGrade === 0 || selectedSubject?.includes('Diagnóstico'));

  // 🆕 Proficiency State
  let englishStats: { level: string; confidence: number; count: number } | null = $state(null);

  $effect(() => {
    if (isEnglishDiagnosticMode) {
      getEffectiveEnglishLevel().then(async stats => {
        if (stats) englishStats = stats;

        // 🆕 Check pool size on load - subtract answered questions
        const cached = await getCachedEnglishQuestions();
        const answeredIds = await getAnsweredQuestionIds(14, false);

        // Calculate fresh (unanswered) questions
        const freshQuestions = cached.filter((q: any) => !answeredIds.has(q.id));
        poolSize = freshQuestions.length;

        // Auto-prefetch if low
        if (cached.length < 400 && !isPrefetching) {
             isPrefetching = true;
             prefetchEnglishPool().then(async () => {
                 const updated = await getCachedEnglishQuestions();
                 const freshUpdated = updated.filter((q: any) => !answeredIds.has(q.id));
                 poolSize = freshUpdated.length;
                 isPrefetching = false;
             });
        }
      });
    }
  });

  let questionCount = $state(10);
  let timeOption = $state(0); // 🆕 0 = unlimited, >0 = seconds per question
  let mode = $state('SOLO'); // 'SOLO' or 'PARTY'
  let useDiagnostic = $state(false);
  let showResetConfirm = $state(false);
  let partyEnabled = $state(false);
  let partyTab = $state('crear'); // 'crear' or 'unirse'
  let partyCode = $state('');
  let joinCode = $state('');
  let connectedUsers = $state([]);
  let partyChannel = $state(null);
  let isHost = $state(false);
  let isCreatingParty = $state(false);
  let partyError = $state('');
  let copied = $state(false);
  let sessionId = $state(''); // 🆕 Local session ID for party tracking
  let isReady = $state(false); // 🆕 Guest ready state
  let syncedQuestions = $state([]); // 🆕 Questions from host
  let playerName = $state('Jugador');
  let studentId = $state('');
  let isUpdatingReady = $state(false);
  let realtimeSubscribeStatus = $state('IDLE');
  let isOnline = $state(true);
  let p2pConnected = $state(false); // 🆕 P2P connection status
  let syncMethod = $state('none'); // 'p2p', 'realtime', or 'none'

  let allStudentsReady = $derived(connectedUsers.length > 0 && connectedUsers.every((u) => Boolean(u?.ready)));
  let canHostStartParty = $derived(!partyEnabled || !partyCode || !isHost || allStudentsReady);
  let readyCount = $derived(connectedUsers.filter((u) => Boolean(u?.ready)).length);

  // 🆕 Sync method label
  let syncMethodLabel = $derived(!partyEnabled || !partyCode
    ? ''
    : p2pConnected
      ? '🔗 P2P'
      : realtimeSubscribeStatus === 'SUBSCRIBED'
        ? '☁️ Realtime'
        : 'conectando…');

  let syncMethodClass = $derived(!partyEnabled || !partyCode
    ? 'text-white/40'
    : p2pConnected
      ? 'text-blue-400'
      : realtimeSubscribeStatus === 'SUBSCRIBED'
        ? 'text-emerald-400'
        : 'text-yellow-400');

  let realtimeLabel = $derived(!partyEnabled || !partyCode
    ? ''
    : !isOnline
      ? 'sin conexión'
      : realtimeSubscribeStatus === 'SUBSCRIBED'
        ? 'conectado'
        : (realtimeSubscribeStatus === 'CHANNEL_ERROR' || realtimeSubscribeStatus === 'TIMED_OUT')
          ? 'reconectando…'
          : realtimeSubscribeStatus === 'CLOSED'
            ? 'desconectado'
            : 'conectando…');

  let realtimeClass = $derived(!partyEnabled || !partyCode
    ? 'text-white/40'
    : !isOnline
      ? 'text-red-400'
      : realtimeSubscribeStatus === 'SUBSCRIBED'
        ? 'text-emerald-400'
        : (realtimeSubscribeStatus === 'CHANNEL_ERROR' || realtimeSubscribeStatus === 'TIMED_OUT')
          ? 'text-yellow-400'
          : realtimeSubscribeStatus === 'CLOSED'
            ? 'text-red-400'
            : 'text-yellow-400');

  const questionOptions = [5, 10, 15, 30, 60];
  let poolSize = $state(0); // 🆕
  let isPrefetching = $state(false); // 🆕

  let diagnosticGrades = $derived([3, 5, 7, 9].filter(g => g < selectedGrade));
  let memoryStats = $derived(getSubjectMemoryStats(availableQuestions, selectedSubject));
  let shareUrl = $derived(partyCode ? `${typeof window !== 'undefined' ? window.location.origin : ''}/party?join=${partyCode}` : '');
  let configLocked = $derived(partyEnabled && partyCode && !isHost);

  // 🆕 Debounce timeouts for P2P and DB broadcasts
  let broadcastTimeout = null;
  let lastBroadcastPayload = '';

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
  let dbUpdateTimeout = null; // 🆕 Debounce for DB updates

  // Cleanup on destroy
  onDestroy(() => {
    if (partyChannel) supabase.removeChannel(partyChannel);

    // Clear sync interval if exists
    if (syncInterval) clearInterval(syncInterval);

    // Clear DB update timeout
    if (dbUpdateTimeout) clearTimeout(dbUpdateTimeout);

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
                 if (msg.payload.subject) selectedSubject = msg.payload.subject;
                 if (msg.payload.grade) selectedGrade = msg.payload.grade;
                 if (msg.payload.questions) {
                     // 🔥 Validate questions before syncing
                     const validQuestions = msg.payload.questions.filter(q =>
                       q &&
                       Array.isArray(q.options) &&
                       q.options.length > 0
                     );
                     syncedQuestions = validQuestions;
                     console.log('✅ Questions synced via P2P:', syncedQuestions.length);

                     if (validQuestions.length < msg.payload.questions.length) {
                       console.warn(`⚠️ P2P filtered ${msg.payload.questions.length - validQuestions.length} invalid questions`);
                     }
                 }
                 // 🆕 Sync English Diagnostic mode from host
                 if (msg.payload.isEnglishDiagnostic !== undefined) {
                     // Update subject to trigger isEnglishDiagnosticMode derivation
                     if (msg.payload.isEnglishDiagnostic && !selectedSubject?.includes('Diagnóstico')) {
                         selectedSubject = 'Inglés Diagnóstico';
                     }
                     console.log('🆕 English Diagnostic Mode synced:', msg.payload.isEnglishDiagnostic);
                 }
                 console.log('🔄 Config synced via P2P:', msg.payload);
             }

             if (msg.type === 'START_EXAM') {
                 console.log('🚀 P2P Start Signal!');

                 // 🆕 Extract config from start signal to ensure perfect sync
                 const startConfig = msg.payload || {};

                 // Sync questions if provided
                 if (startConfig.questions) {
                     // 🔥 Validate questions
                     const validQuestions = startConfig.questions.filter(q =>
                       q &&
                       Array.isArray(q.options) &&
                       q.options.length > 0
                     );
                     syncedQuestions = validQuestions;
                     questionCount = syncedQuestions.length; // Update local count
                     console.log('✅ Questions received via P2P START:', syncedQuestions.length);

                     if (validQuestions.length < startConfig.questions.length) {
                       console.warn(`⚠️ START filtered ${startConfig.questions.length - validQuestions.length} invalid questions`);
                     }
                 }

                 // Sync Time
                 if (startConfig.timeLimitSeconds !== undefined) {
                     // Reverse calculate timeOption if possible for UI consistency
                     // or just trust the total time.
                     if (questionCount > 0) {
                        timeOption = Math.floor(startConfig.timeLimitSeconds / questionCount);
                     }
                     console.log('⏱️ Time sync (START):', startConfig.timeLimitSeconds);
                 }

                 // 🆕 Sync English Diagnostic mode from START signal
                 if (startConfig.isEnglishDiagnostic !== undefined) {
                     if (startConfig.isEnglishDiagnostic && !selectedSubject?.includes('Diagnóstico')) {
                         selectedSubject = 'Inglés Diagnóstico';
                     }
                     console.log('🆕 English Diagnostic Mode (START):', startConfig.isEnglishDiagnostic);
                 }
                 // Force start logic with synced config
                 handleStart(startConfig);
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

  // Broadcast Config Changes (including questions) + Update DB for Realtime fallback
  // 🆕 OPTIMIZED: Unified debounce for P2P and DB updates
  function broadcastConfig() {
     if (!isHost || !partyEnabled || !partyCode) return;

     const payload = {
         subject: selectedSubject,
         grade: selectedGrade,
         num_questions: questionCount,
         time_option: timeOption,
         questions: syncedQuestions, // 🔥 Always include questions
         isEnglishDiagnostic: isEnglishDiagnosticMode // 🆕 Sync English Diagnostic mode to guests
     };

     // 🆕 Skip if payload hasn't changed (prevents duplicate broadcasts)
     const payloadHash = JSON.stringify({
       num: payload.num_questions,
       time: payload.time_option,
       grade: payload.grade,
       subject: payload.subject,
       qCount: payload.questions?.length || 0
     });

     if (payloadHash === lastBroadcastPayload) {
       return; // No changes, skip broadcast
     }

     // 🆕 Clear existing timeout and set new one (debounce 1 second)
     if (broadcastTimeout) clearTimeout(broadcastTimeout);
     broadcastTimeout = setTimeout(async () => {
         lastBroadcastPayload = payloadHash;

         console.log('📤 Broadcasting config via P2P:', {
             questions: payload.questions.length,
             num: payload.num_questions,
             time: payload.time_option
         });

         // P2P Broadcast (primary)
         p2pService.broadcast('CONFIG_UPDATE', payload);

         // DB Update (Realtime fallback)
         try {
             await supabase.from('party_sessions')
               .update({
                 exam_config: {
                   subject: selectedSubject,
                   grade: selectedGrade,
                   num_questions: questionCount,
                   time_option: timeOption,
                   questions: syncedQuestions,
                   host_peer_id: p2pService.isConnected() ? 'connected' : null,
                   isEnglishDiagnostic: isEnglishDiagnosticMode // 🆕 Sync to DB for Realtime fallback
                 }
               })
               .eq('party_code', partyCode);
             console.log('💾 DB config updated');
         } catch (dbErr) {
             console.warn('⚠️ Failed to update DB config:', dbErr);
         }
     }, 1000); // 🆕 Unified 1 second debounce
  }

  // Watch for config changes to broadcast
  $effect(() => {
    if (isHost && partyEnabled && partyCode && (questionCount || timeOption || selectedSubject || selectedGrade)) {
      broadcastConfig();
    }
  });

  // Update createParty to init P2P
  async function createParty() {
    isCreatingParty = true;
    partyError = '';
    try {
      const newPartyCode = generatePartyCode();

      // 🆕 Generate questions - load from API if availableQuestions is empty
      let questionsPool = availableQuestions;

      if (!questionsPool || questionsPool.length === 0) {
        console.log('📥 availableQuestions empty, fetching from API...');
        try {
          questionsPool = await fetchAllQuestionsForGrade(selectedGrade);
          console.log(`✅ Fetched ${questionsPool.length} questions from API`);
        } catch (fetchErr) {
          console.error('❌ Failed to fetch questions:', fetchErr);
          throw new Error('No hay preguntas disponibles. Intenta de nuevo.');
        }
      }

      if (questionsPool.length === 0) {
        throw new Error('No hay preguntas disponibles para este grado.');
      }

      // 🆕 Filter by selected subject if not "Simulacro Completo"
      let filteredPool = questionsPool;
      if (selectedSubject && selectedSubject !== 'Simulacro Completo') {
        const normalizeSubject = (s) => s?.toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/[\s_-]/g, '');

        const targetSubject = normalizeSubject(selectedSubject);

        // 🆕 Special handling for "Inglés Diagnóstico" - match any English question
        const isEnglishDiagnostic = targetSubject.includes('ingles') && targetSubject.includes('diagnostic');

        filteredPool = questionsPool.filter(q => {
          const qSubject = normalizeSubject(q.category?.split(' :: ')[0] || '');

          if (isEnglishDiagnostic) {
            // Match any English subject: "INGLÉS", "INGLÉS B1", "ingles", etc.
            return qSubject.includes('ingles') || qSubject.includes('english');
          }

          return qSubject === targetSubject;
        });

        console.log(`🎯 Filtered by subject "${selectedSubject}": ${filteredPool.length}/${questionsPool.length} questions`);

        if (filteredPool.length === 0) {
          console.warn(`⚠️ No questions found for subject "${selectedSubject}", using full pool`);
          filteredPool = questionsPool;
        }

        // 🆕 Deep Search if insufficient questions
        const requiredQuestions = questionCount * 2; // Safety margin
        if (filteredPool.length < requiredQuestions) {
             console.warn(`⚠️ Insufficient party questions (${filteredPool.length}/${requiredQuestions}). Starting Deep Search...`);

             // Use same variants logic as App.svelte
             const searchSubject = targetSubject.includes('diagnostico') ? 'ingles' : targetSubject;
             const searchGrade = selectedGrade || 11;

             try {
                // Fetch pages 1-3 to get more questions
                const pages = [1, 2, 3];
                const newQuestionsResults = await Promise.all(
                    pages.map(p => fetchQuestions(searchGrade, searchSubject, p))
                );

                const currentIds = new Set(filteredPool.map(q => q.id));
                newQuestionsResults.flat().forEach(q => {
                    if (q && !currentIds.has(q.id)) {
                        filteredPool.push(q);
                        currentIds.add(q.id);
                    }
                });
                console.log(`✅ Deep search added questions. New total: ${filteredPool.length}`);
             } catch (err) {
                console.error('❌ Deep search failed:', err);
             }
        }
      }

      // 🎯 Select MORE questions to compensate for invalid ones (5x the needed amount)
      const oversampleFactor = 5;
      const sampleSize = Math.min(questionCount * oversampleFactor, filteredPool.length);
      const shuffled = [...filteredPool].sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffled.slice(0, sampleSize);

      console.log(`🔍 Sampling ${sampleSize} questions to find ${questionCount} valid ones...`);

      // � DEBUG: Check questions BEFORE filtering
      console.log('🔍 Sample questions before filter:', selectedQuestions.slice(0, 3).map(q => ({
        id: q.id,
        optionsCount: q.options?.length,
        hasText: !!q.text,
        hasCorrectId: !!q.correctOptionId
      })));

      // 🔥 CRITICAL: Validate questions have AT LEAST 4 options
      const validQuestions = selectedQuestions.filter(q => {
        const isValid = q &&
          Array.isArray(q.options) &&
          Array.isArray(q.options) &&
          q.options.length >= 2 && // ✨ RELAXED: Allow True/False or 3-option questions (English/lower grades)
          q.id &&
          q.text &&
          q.correctOptionId;

        if (!isValid && q) {
          console.log('❌ Invalid question:', {
            id: q.id,
            optionsCount: q.options?.length,
            hasText: !!q.text,
            hasCorrectId: !!q.correctOptionId
          });
        }

        return isValid;
      });

      if (validQuestions.length === 0) {
        console.error('❌ All questions were invalid!');
        console.error('Sample from pool:', questionsPool.slice(0, 5).map(q => ({
          id: q.id,
          optionsCount: q.options?.length,
          options: q.options
        })));
        throw new Error('No se encontraron preguntas válidas con 4 opciones. Intenta de nuevo.');
      }

      if (validQuestions.length < selectedQuestions.length) {
        console.warn(`⚠️ Filtered out ${selectedQuestions.length - validQuestions.length} invalid questions (< 4 options)`);
      }

      // 🎯 Take only the amount needed
      syncedQuestions = validQuestions.slice(0, questionCount);

      if (syncedQuestions.length < questionCount) {
        console.warn(`⚠️ Only found ${syncedQuestions.length} valid questions out of ${questionCount} requested`);
      }

      console.log(`📝 Selected ${syncedQuestions.length} valid questions for party`);

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
          subject: selectedSubject,
          grade: selectedGrade,
          num_questions: questionCount,
          time_option: timeOption,
          difficulty: 'NORMAL',
          questions: syncedQuestions, // 🔥 FIX: Use validated questions
          host_peer_id: peerId
        },
        students: [],
        max_students: 50,
        status: 'waiting'
      });

      console.log('📝 Party creado con configuración:', {
        subject: selectedSubject,
        grade: selectedGrade,
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
         // 🔥 Validate and filter questions
         const validQuestions = config.questions.filter(q =>
           q &&
           Array.isArray(q.options) &&
           q.options.length > 0 &&
           q.id &&
           q.text
         );

         syncedQuestions = validQuestions;
         console.log('✅ Preguntas sincronizadas:', syncedQuestions.length);

         if (validQuestions.length < config.questions.length) {
           console.warn(`⚠️ Guest filtered ${config.questions.length - validQuestions.length} invalid questions`);
         }

         if (syncedQuestions.length === 0) {
           console.error('❌ Guest received no valid questions!');
         }
      }

      // Sync configuration (guests mirror host config)
      if (config.num_questions !== undefined) {
        questionCount = config.num_questions;
        console.log('📊 Cantidad de preguntas:', questionCount);
      }
      if (config.time_option !== undefined) {
        timeOption = config.time_option;
      if (config.subject) {
        selectedSubject = config.subject;
        console.log('📚 Materia:', selectedSubject);
      }
      if (config.grade) {
        selectedGrade = config.grade;
        console.log('🎓 Grado:', selectedGrade);
      }
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
  function handleStart(overrideConfig = null) {
    if (partyEnabled && !sessionId) {
      sessionId = crypto.randomUUID();
    }

    // BLOCK Guest from starting if they triggered it manually (should be disabled in UI now anyway)
    if (partyEnabled && partyCode && !isHost && !overrideConfig) {
      console.warn('❌ Guest tried to start manually');
      return;
    }

    if (partyEnabled && partyCode && isHost && !allStudentsReady) {
      partyError = 'Espera a que todos los jugadores marquen “Listo”';
      return;
    }

    // Use payload if provided (for Guest sync), else use local state
    const finalQuestions = overrideConfig?.questions || syncedQuestions;
    const finalTimeLimit = overrideConfig?.timeLimitSeconds !== undefined
        ? overrideConfig.timeLimitSeconds
        : (timeOption > 0 ? timeOption * questionCount : 0);

    // 🆕 P2P Broadcast Start (Only Host sends this)
    if (isHost && partyEnabled) {
        p2pService.broadcast('START_EXAM', {
            questions: finalQuestions,
            timeLimitSeconds: finalTimeLimit,
            isEnglishDiagnostic: isEnglishDiagnosticMode // 🆕 Sync to guests
        });
    }

    onStart({
      count: finalQuestions.length || questionCount,
      mode: partyEnabled ? 'PARTY' : 'SOLO',
      useDiagnostic: useDiagnostic,
      partyCode: partyCode,
      isHost: isHost,
      sessionId: partyEnabled ? sessionId : undefined,
      timeLimitSeconds: finalTimeLimit,
      startedAt: overrideConfig?.startedAt, // 🆕 Pass fixed start time if Guest
      subject: selectedSubject,
      grade: selectedGrade,
      questions: partyEnabled && finalQuestions.length > 0 ? finalQuestions : undefined
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

        // 🆕 CRÍTICO: Sincronizar configuración del host (Realtime fallback)
        if (!isHost && payload.new?.exam_config) {
          const config = payload.new.exam_config;

          // Sync questions if available
          if (config.questions && config.questions.length > 0) {
            syncedQuestions = config.questions;
            console.log('✅ [Realtime] Preguntas sincronizadas:', syncedQuestions.length);
          }

          // Sync config values
          if (config.num_questions !== undefined) {
            questionCount = config.num_questions;
            console.log('📊 [Realtime] Cantidad de preguntas:', questionCount);
          }
          if (config.time_option !== undefined) {
            timeOption = config.time_option;
            console.log('⏱️ [Realtime] Tiempo por pregunta:', timeOption === 0 ? 'Sin límite' : `${timeOption}s`);
          }
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
            console.log('🎯 Auto-iniciando examen para guest (Bypassing guard)...');
            // Re-using local handleStart but providing override to bypass guard
            handleStart({
              questions: syncedQuestions,
              grade: selectedGrade,
              subject: selectedSubject,
              startedAt: payload.new.started_at || new Date().toISOString()
            });
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
      <!-- 🆕 Grade and Subject Selection (Host only, before creating party) -->
      {#if !partyCode || isHost}
        {#if isEnglishDiagnosticMode}
          <!-- 🇬🇧 English Diagnostic Mode Header -->
          <div class="p-5 bg-gradient-to-r from-blue-900/30 via-purple-900/20 to-blue-900/30 border border-blue-500/30 rounded-xl">
            <div class="flex items-center gap-4 mb-3">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center shadow-lg text-2xl">
                🇺🇸
              </div>
              <div>
                <h3 class="text-lg font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                  {#if englishStats}
                    Mejorar Nivel
                  {:else}
                    Inglés Diagnóstico
                  {/if}
                  <span class="px-2 py-0.5 {englishStats?.confidence >= 80 ? 'bg-emerald-500/30 text-emerald-300' : 'bg-purple-500/30 text-purple-300'} text-[9px] font-bold uppercase tracking-widest rounded">
                    {#if englishStats}
                      Nivel {englishStats.level}
                      {#if englishStats.confidence < 80}
                        (Preliminar)
                      {/if}
                    {:else}
                      Evaluación
                    {/if}
                  </span>
                </h3>
                <p class="text-xs text-white/60 mt-0.5 flex items-center gap-2">
                  {#if englishStats}
                    {#if englishStats.count < 60}
                       Diagnóstico en curso: <strong class="text-white">{englishStats.count}/60</strong> preguntas
                    {:else}
                       Nivel validado con {englishStats.count} preguntas
                    {/if}
                  {:else}
                    Niveles A1 a C1 • Grados 3 al 12
                  {/if}
                </p>
              </div>
            </div>

            <div class="bg-white/5 rounded-lg p-3 space-y-2">
              <div class="flex items-start gap-2">
                <span class="text-blue-400 text-sm">📊</span>
                <p class="text-xs text-white/70">
                  {#if englishStats}
                    Tu nivel actual es <strong class="{englishStats.count >= 60 ? 'text-emerald-400' : 'text-purple-400'}">{englishStats.level}</strong>.
                    {#if englishStats.count < 60}
                      Responde más preguntas para un diagnóstico <strong class="text-blue-400">casi exacto</strong> (60 preguntas).
                    {:else}
                      Tu nivel ha sido <strong class="text-emerald-400">validado</strong>. Seguiremos refinando según tus progresos.
                    {/if}
                    <!-- 🆕 Pool Indicator -->
                    <div class="mt-2 text-[10px] text-white/50 flex items-center gap-1.5 bg-black/20 py-1 px-2 rounded-lg w-fit">
                      <span class:animate-spin={isPrefetching}>{isPrefetching ? '⏳' : '💾'}</span>
                      <span>Pool Offline: <strong class="{poolSize >= 400 ? 'text-emerald-400' : 'text-yellow-400'}">{poolSize}/400</strong></span>
                      {#if poolSize >= 240}
                         <span class="text-emerald-500/80 ml-1">✓ {Math.floor(poolSize / 60)} Exámenes Listos</span>
                      {/if}
                    </div>
                  {:else}
                    Este examen evaluará tu <strong class="text-blue-400">nivel real de inglés</strong> usando preguntas de todos los grados.
                  {/if}
                </p>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-emerald-400 text-sm">🎯</span>
                <p class="text-xs text-white/70">
                  Al terminar, recibirás tu <strong class="text-emerald-400">nivel CEFR estimado</strong> (A1-B2+) y recomendaciones personalizadas.
                </p>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-purple-400 text-sm">📈</span>
                <p class="text-xs text-white/70">
                  Los siguientes exámenes se <strong class="text-purple-400">adaptarán a tu nivel</strong> para maximizar tu aprendizaje.
                </p>
              </div>
            </div>
          </div>
        {:else}
          <!-- Normal Grade and Subject Selection -->
          <div class="space-y-4 p-4 bg-white/5 border border-white/10 rounded-lg">
            <h3 class="text-xs uppercase tracking-widest text-emerald-400 font-bold">📚 Configuración del Examen</h3>

            <!-- Grade Selector -->
            <div>
              <label class="block text-xs uppercase tracking-widest opacity-60 mb-2">Grado</label>
              <div class="grid grid-cols-5 gap-2">
                {#each availableGrades as grade}
                  <button
                    onclick={() => selectedGrade = grade}
                    disabled={configLocked}
                    class="px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200 {selectedGrade === grade ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'} {configLocked ? 'opacity-50 cursor-not-allowed' : ''}"
                  >
                    {grade}°
                  </button>
                {/each}
              </div>
            </div>

            <!-- Subject Selector -->
            <div>
              <label class="block text-xs uppercase tracking-widest opacity-60 mb-2">Materia</label>
              <select
                bind:value={selectedSubject}
                disabled={configLocked}
                class="w-full px-4 py-3 bg-gray-900/90 border border-white/10 rounded-lg text-white font-medium focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer hover:bg-gray-900 {configLocked ? 'opacity-50 cursor-not-allowed' : ''}"
                style="background-color: rgb(17 24 39 / 0.9);"
              >
                {#each availableSubjects as subj}
                  <option value={subj} class="bg-gray-900 text-white py-2">{subj}</option>
                {/each}
              </select>
            </div>
          </div>
        {/if}
      {/if}

      <!-- Subject Display (for guests) -->
      {#if partyCode && !isHost}
        <div class="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
          <span class="text-xs uppercase tracking-widest opacity-60">Configuración del Host</span>
          {#if isEnglishDiagnosticMode}
            <h3 class="text-xl font-bold text-blue-400 mt-2">Inglés Diagnóstico</h3>
            <p class="text-sm text-white/60 mt-1">Evaluación de Nivel A1-B2+</p>
          {:else}
            <h3 class="text-xl font-bold text-emerald-500 mt-2">{selectedSubject || 'Simulacro Completo'}</h3>
            <p class="text-sm text-white/60 mt-1">Grado {selectedGrade}</p>
          {/if}
        </div>
      {/if}

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

      <!-- Time Config - Only for Party Mode -->
      {#if partyEnabled}
      <div class="space-y-3" transition:fade>
        <label class="text-xs uppercase tracking-widest opacity-60 block">⏱️ Tiempo por Pregunta</label>
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
      {/if}

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
                    {#if englishStats && isEnglishDiagnosticMode}
                      <div class="text-center mb-4">
                        <div class="stat-value text-accent-400">
                          {englishStats.level}
                          {#if englishStats.cognitiveLabel}
                            <div class="text-[0.6rem] font-bold text-white bg-white/10 px-1.5 py-0.5 rounded mt-1 border border-white/20" title="Based on high-difficulty questions (Critical Thinking)">
                              {englishStats.cognitiveLabel}
                            </div>
                          {/if}
                        </div>
                        <div class="stat-label flex flex-col items-center">
                          <span>NIVEL CEFR</span>
                          {#if englishStats.isEstimate}
                            <span class="text-[0.6rem] text-white/50">(PRELIMINAR)</span>
                          {:else}
                            <span class="text-[0.6rem] text-green-400">(VALIDADO)</span>
                          {/if}
                        </div>
                      </div>
                    {/if}
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

      <!-- Diagnostic Toggle (Only for SOLO without Party AND not in English diagnostic mode) -->
      {#if !partyEnabled && !isEnglishDiagnosticMode}
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
                onclick={() => {
                  useDiagnostic = !useDiagnostic;
                  if (useDiagnostic) {
                    questionCount = 30;
                    timeOption = 0;
                  } else {
                    // When diagnostic is turned off, reset questionCount to 60 (default for non-diagnostic)
                    questionCount = 60;
                  }
                }}
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
            onclick={() => {
              if (partyEnabled && !isHost) return;
              handleStart();
            }}
            disabled={(partyEnabled && !partyCode) || (partyEnabled && partyCode && isHost && !canHostStartParty) || (partyEnabled && partyCode && !isHost)}
          >
            {partyEnabled && partyCode
              ? (isHost
                  ? (canHostStartParty ? '🚀 Iniciar Party' : '⏳ Esperando listos')
                  : '⏳ Esperando al Host')
              : 'Comenzar'}
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>
