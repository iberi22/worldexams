<script>
  import { onMount } from 'svelte';
  import { AppView } from '../types';
  import { fade, fly } from 'svelte/transition';
  import ExamView from './ExamView.svelte';

  import LeaderboardView from './LeaderboardView.svelte';
  import IdentityRegistration from './IdentityRegistration.svelte';
  import FlashlightCard from './FlashlightCard.svelte';
  import GradeSelector from './GradeSelector.svelte';
  import ResultsView from './ResultsView.svelte';
  import AdvancedSearch from './AdvancedSearch.svelte';
  import MemoryStatus from './MemoryStatus.svelte';
  import LocalReportsView from './LocalReportsView.svelte';
  import Login from './Login.svelte';
  import ExamConfigModal from './ExamConfigModal.svelte'; // New import

  import { supabase } from '../lib/supabase';
  import { getLocalIdentity } from '../lib/identity';
  import {
    filterUnansweredQuestions,
    markQuestionsAnswered,
    getMemoryStats
  } from '../lib/question-memory';
  import { saveExamResultLocal } from '../lib/idb-storage'; // Persist local results
  import { clearPackStorage } from '../lib/pack-storage'; // Clear pack storage

  import BlogView from './BlogView.svelte';
  import ArticleView from './ArticleView.svelte';
  import { fetchAllQuestionsForGrade, getAvailableSubjects, fetchEnglishQuestionsAllGrades, fetchBulkQuestions } from '../lib/api-service';
  import { cacheService, generateRandomExam, getRecommendedExamSize } from '../lib/cache-service'; // Cache service
  import { filterByPlan } from '../utils/questionParser';
  import { generateSmartExam } from '../lib/smart-exam-service'; // Smart Service
  import {
    subjectsMatch,
    sanitizeIncomingQuestions,
    prepareSoloExamQuestions,
    prepareRoomQuestions,
    defaultQuestionRepository,
    fetchQuestionsForGrade
  } from '../lib/questions';
  import IntegrityIntro from './IntegrityIntro.svelte'; // New Component
  import { getPWAStatus, getRecommendedCacheSize, getCacheExpiryHours } from '../lib/pwa-detector'; // PWA Detection
  import packageInfo from '../../package.json';
  import { countryConfig } from '../config';
  // Removed static import to avoid Vite warning
  import LocalModeNotice from './LocalModeNotice.svelte';
  import OfflineProfile from './OfflineProfile.svelte';

  import ExamRoomLobby from './ExamRoomLobby.svelte'; // 🆕 Renamed Import
  import SpeedChallengeSetup from '../modules/exam-room/components/SpeedChallengeSetup.svelte';
  import LobbyBrowser from '../modules/exam-room/components/LobbyBrowser.svelte';
  import PeriodTracker from './PeriodTracker.svelte';
  import PeriodTrackerModal from './PeriodTrackerModal.svelte';
  import { roomState } from '../modules/exam-room/stores/roomState.svelte.ts';
  import { p2pService } from '../lib/p2p-service'; // Moved to top

  let { questions = [], universalPool = null } = $props();

  // Internal state that can be updated
  let loadedQuestions = $state(questions || []); // Safety check
  let availableSubjects = $state([]); // New state
  let isLoadingQuestions = $state(false);
  let loadError = $state(null);
  let showExamConfigModal = $state(false); // New state
  let isIntegrityCheck = $state(false); // Integrity check state
  let isPreparingExam = $state(false); // Controls IntegrityIntro loading state
  let generatedExamQuestions = $state(null); // Store smart generated questions
  let examConfig = $state({ count: 10, mode: 'SOLO', useDiagnostic: false, diagnosticMixPercent: 20 }); // New state
  let MAX_EXAM_QUESTIONS = $state(10); // Max questions for exam
  let showLocalReports = $state(false); // Modal for local reports
  let showOfflineProfile = $state(false); // Modal for offline profile
  let blogSubjectFilter = $state(null); // 🆕 Pre-filter for BlogView from LocalReportsView
  let isNavigatingToBlog = $state(false); // 🆕 Loading state for Blog navigation
  let buildInfo = $state(null); // Dynamic build info
    let showUpdateModal = $state(false); // 🆕 New version available modal
  let showLobbyBrowser = $state(false); // Controls Lobby Browser visibility
  let showSpeedChallengeSetup = $state(false); // Controls Speed Challenge Setup visibility
  let showPeriodTrackerModal = $state(false); // 🆕 Controls Period Tracker Modal visibility
  let periodTrackerData = $state(null); // 🆕 Data passed to the modal

  // Adaptive Testing State
  let isAdaptiveMode = $state(false);
  let adaptivePool = $state([]);

  // Exam Room Mode State
  let roomCode = $state('');
  let roomChannel = $state(null);
  let sessionId = $state(''); // 🆕 Room session ID for local tracking
  let initialRoomCode = $state(''); // 🆕 From URL
  let user = $state(null); // Auth user

  // View State
  let view = $state(AppView.LANDING);
  let selectedGrade = $state(null);
  let selectedSubject = $state(null);
  let selectedArticle = $state(null);
  let showRegistrationModal = $state(false);
  let lastExamData = $state(null);
  let userAnswers = $state({});
  let showAllLandingGrades = $state(false); // 🆕 Control for landing grid expansion

  function setView(newView) {
    view = newView;
    // Clear exam cache when going back to landing or selection to avoid stale results
    if (newView === AppView.LANDING || newView === AppView.SUBJECT_SELECTION) {
      generatedExamQuestions = null;
    }
  }

  // 🔄 Notify other components about view changes (e.g. to hide global buttons)
  $effect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('app-view-change', { detail: { view } }));
    }
  });

  // Derived: Filtered questions for current grade
  let filteredLocalQuestions = $derived(
    loadedQuestions.filter(q => selectedGrade ? q.grade === selectedGrade : true)
  );

  // Derived: Exam questions based on generatedExamQuestions or filtered
  let examQuestions = $derived(generatedExamQuestions || filteredLocalQuestions);

  console.log('App received questions:', questions?.length || 0);
  console.log('App received universalPool:', universalPool?.totalQuestions || 0);


  // Auth & Lifecycle
  onMount(async () => {
    // Fetch build info dynamically
    try {
      const res = await fetch('/build-info.json?t=' + Date.now());
      if (res.ok) buildInfo = await res.json();
    } catch (e) {
      console.warn('Failed to load build info', e);
    }

    const { data: { session: currentSession } } = await supabase.auth.getSession();
    user = currentSession?.user || null;

    // 🆕 Check for URL Params (Room Code or Direct Subject)
    const urlParams = new URLSearchParams(window.location.search);
    const joinCode = urlParams.get('join');
    const subjectParam = urlParams.get('subject');
    const gradeParam = urlParams.get('grade');
    const onboardingComplete = urlParams.get('onboarding') === 'complete';

    if (joinCode) {
      initialRoomCode = joinCode;
      showExamConfigModal = true;
      window.history.replaceState({}, '', '/');
    } else if (subjectParam) {
       selectedSubject = subjectParam;
       if (gradeParam) selectedGrade = parseInt(gradeParam);
       showExamConfigModal = true;
       window.history.replaceState({}, '', '/');
    }

    if (currentSession?.user && onboardingComplete) {
      try {
        const pendingCollegeRaw = localStorage.getItem('pending_college_data');
        if (pendingCollegeRaw) {
          const pendingCollege = JSON.parse(pendingCollegeRaw);
          if (pendingCollege?.school_id) {
            const { error: profileError } = await supabase
              .from('profiles')
              .update({ school_id: pendingCollege.school_id })
              .eq('id', session.user.id);
            if (!profileError) {
              localStorage.removeItem('pending_college_data');
            } else {
              console.error('Error linking school_id to profile:', profileError);
            }
          }
        }
      } catch (error) {
        console.error('Error processing onboarding metadata:', error);
      } finally {
        window.history.replaceState({}, '', '/');
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      user = session?.user || null;
    });

    // PWA & Updates Logic (Restored if needed or just minimal)
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
       navigator.serviceWorker.addEventListener('message', (event) => {
         if (event.data && event.data.type === 'NEW_VERSION_AVAILABLE') {
           console.log('✨ New version detected from Service Worker!');
           showUpdateModal = true;
         }
       });
    }

    // 🆕 Global P2P Listener for App (Host Result Aggregation & Guest Sync)
    p2pService.onData((msg) => {
        if (msg.type === 'EXAM_RESULT') {
            const result = msg.payload;
            console.log(`🏆 Result received from ${msg.senderId}:`, result);

            // 1. Store locally (Host or potentially Guest if P2P broadcasted EXAM_RESULT to all)
            const existing = JSON.parse(sessionStorage.getItem('party_results') || '[]');
            // Avoid duplicates
            if (!existing.find(r => r.sessionId === result.sessionId)) {
                existing.push(result);
                sessionStorage.setItem('party_results', JSON.stringify(existing));

                // Notify UI
                window.dispatchEvent(new CustomEvent('party-result-received', { detail: result }));

                // 2. If HOST, broadcast the updated leaderboard to everyone
                if (isHost) {
                    console.log('👑 Host broadcasting updated leaderboard...');
                    p2pService.broadcast('LEADERBOARD_UPDATE', existing);
                }
            }
        }
        else if (msg.type === 'LEADERBOARD_UPDATE') {
            // Guest receives full leaderboard from Host
            const leaderboard = msg.payload;
            console.log('📊 Leaderboard update received:', leaderboard.length);

            sessionStorage.setItem('party_results', JSON.stringify(leaderboard));
            window.dispatchEvent(new CustomEvent('party-leaderboard-update', { detail: leaderboard }));
        }
    });

    return () => subscription.unsubscribe();
  });

  let isHost = $state(false); // 🆕 Track host status

  // ...

  // Open Exam Configuration
  function handleStart() {
    showExamConfigModal = true;
  }

  async function handleExamConfigStart(config) {
    showExamConfigModal = false;
    examConfig = config;
    MAX_EXAM_QUESTIONS = config.count;

    // 🎯 Update App state with values from modal (important!)
    if (config.subject) selectedSubject = config.subject;
    // 🆕 FIX: Use explicit check for undefined, not truthy (grade=0 is valid for English Diagnostic)
    if (config.grade !== undefined) selectedGrade = config.grade;

    // 🆕 FORCE English Diagnostic Mode (Grade 0) if subject matches
    // This overrides potential "Grade 11" default from modal if 0 wasn't in list
    if (config.subject && (config.subject.includes('Diagnóstico') || config.subject.includes('Diagnostico'))) {
        selectedGrade = 0;
        console.log('🇬🇧 Enforcing English Diagnostic Mode (Grade 0)');
    }

    console.log('🎯 Exam config received:', {
      subject: config.subject,
      grade: config.grade,
      mode: config.mode,
      count: config.count,
      diagnosticMixPercent: config.diagnosticMixPercent,
      period: config.period // 🆕 Log period
    });

    // Room Mode - roomCode is already created by modal
    if (config.mode === 'ROOM' && config.roomCode) {
      roomCode = config.roomCode;
      sessionId = config.sessionId || '';
      isHost = config.isHost || false; // Set host state
      roomChannel = supabase.channel(`party:${roomCode}`);
      roomChannel.subscribe();

      // 🆕 Store startedAt for ExamView synchronization
      if (config.startedAt) {
          console.log('🏁 Syncing start time:', config.startedAt);
          // We can use a shared state or just pass it to ExamView if we adjust ExamView props.
          // Let's passed it via examConfig
          examConfig.startedAt = config.startedAt;
      }

      // 🆕 Use synced questions from Modal (Host or Guest)
      if (config.questions && config.questions.length > 0) {
          generatedExamQuestions = sanitizeIncomingQuestions(config.questions);
          console.log('📦 Using synced questions:', generatedExamQuestions.length);
      }

      // Ensure questions are loaded (fallback logic)
      if ((!generatedExamQuestions || generatedExamQuestions.length === 0) && (loadedQuestions.length === 0 || selectedGrade)) {
        await loadQuestionsForExam(selectedGrade || 11, selectedSubject);
      }

      if (config.isHost) {
        // Host starts the exam
        console.log('🎯 Anfitrión detectado, iniciando sala...');
        await handleRoomStart();
        console.log('✅ handleRoomStart() completado');
      } else {
        // Guest waits in player view
        console.log('👥 Invitado detectado, esperando inicio...');
        setView(AppView.EXAM);
      }
      return;
    }

    // SOLO Mode Logic continues below...
    // SOLO Mode: Start Integrity Check + Smart Fetch
    isIntegrityCheck = true;
    isPreparingExam = true;

    // Note: isLoadingQuestions is managed by loadQuestionsForExam internally
    generatedExamQuestions = null; // Reset

    // Minimum time for animation (3.5s to read messages)
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 3500));

    // 🆕 Use pre-filtered questions if provided (e.g. Period Mode)
    if (config.questions && config.questions.length > 0) {
         console.log('📦 Using pre-filtered questions:', config.questions.length);
         try {
             await minTimePromise;
         } catch (e) { /* ignore */ }
         generatedExamQuestions = sanitizeIncomingQuestions(config.questions);
         isPreparingExam = false;
         return;
    }

    try {
      const effectiveGrade = selectedGrade ?? 11;
        const result = await prepareSoloExamQuestions(
          {
            grade: effectiveGrade,
            subject: selectedSubject,
            count: config.count,
            useDiagnostic: Boolean(config.useDiagnostic),
            diagnosticMixPercent: config.diagnosticMixPercent ?? 20,
            examMode: config.examMode || 'simulacro',
            period: config.period,
            englishDiagnostic: selectedGrade === 0,
            minCefrLevel: config.minCefrLevel,
            preuUniversity: config.preuUniversity // 🆕
          },
        {
          repository: defaultQuestionRepository,
          filterUnansweredQuestions
        },
        loadedQuestions
      );

      loadedQuestions = result.pool;
      await minTimePromise;

      generatedExamQuestions = result.selectedQuestions;
      if (result.warnings.length > 0) {
        console.warn('Exam generation warnings:', result.warnings);
      }

      // Check for adaptive mode
      const isEnglish = selectedSubject && subjectsMatch(selectedSubject, 'ingles');
      const limitExceeded = config.count > 10;
      isAdaptiveMode = isEnglish && limitExceeded && (config.examMode === 'simulacro' || !config.examMode);
      if (isAdaptiveMode) {
        console.log('🧠 Adaptive Mode Activated!');
        // Provide the entire filtered pool to the adaptive engine
        adaptivePool = result.pool;
      } else {
        adaptivePool = [];
      }

      isPreparingExam = false;
    } catch (error) {
      console.error('Error generating exam:', error);
      alert(error.message);
      isIntegrityCheck = false;
      isPreparingExam = false;
      setView(AppView.SUBJECT_SELECTION);
    }
  }


  // Handle Host Starting the Room Exam
  async function handleRoomStart() {
      if (!isHost) {
          console.warn('❌ Invitado intentó iniciar la sala (bloqueado)');
          return;
      }

      console.log('🚀🚀🚀 handleRoomStart() INICIADO');
      console.log('📊 generatedExamQuestions:', generatedExamQuestions?.length || 0);

      // 1. Generate Questions using local logic (reusing prepareExamQuestions/filter logic)

      // 🆕 Check if we already have synced questions (from handleExamConfigStart)
      if (generatedExamQuestions && generatedExamQuestions.length > 0) {
          console.log('🚀 Iniciando sala con preguntas sincronizadas:', generatedExamQuestions.length);
      } else {
          console.log('⚠️ No hay preguntas sincronizadas, usando fallback...');
          const roomResult = await prepareRoomQuestions(
            {
              grade: selectedGrade || 11,
              subject: selectedSubject,
              count: examConfig.count,
              useDiagnostic: Boolean(examConfig.useDiagnostic),
              diagnosticMixPercent: examConfig.diagnosticMixPercent ?? 20,
              examMode: examConfig.examMode || 'simulacro',
              period: examConfig.period,
              englishDiagnostic: selectedGrade === 0,
              minCefrLevel: examConfig.minCefrLevel // 🆕
            },
            {
              repository: defaultQuestionRepository,
              filterUnansweredQuestions
            },
            loadedQuestions
          );
          loadedQuestions = roomResult.pool;
          generatedExamQuestions = roomResult.selectedQuestions;
          console.log('📦 Preguntas de fallback generadas:', generatedExamQuestions.length);
      }

      // 2. 🆕 CRÍTICO: Primero obtener exam_config actual, luego actualizar con preguntas
      try {
        const { data: currentData } = await supabase
          .from('party_sessions')
          .select('exam_config')
          .eq('party_code', roomCode)
          .single();

        const startedAt = new Date().toISOString();
        const updatedConfig = {
          ...(currentData?.exam_config || {}),
          questions: generatedExamQuestions // 🎯 Asegurar que las preguntas estén en BD
        };

        // Ahora actualizar status y exam_config juntos
        await supabase.from('party_sessions')
            .update({
              status: 'active',
              current_question: 0,
              started_at: startedAt,
              exam_config: updatedConfig
            })
            .eq('party_code', roomCode);

        console.log('✅ Sala iniciada: status=active, preguntas sincronizadas en BD');

        // 2b. Broadcast via P2P (fallback si Realtime falla)
        p2pService.broadcast('START_EXAM', {
            questions: generatedExamQuestions,
            timeLimitSeconds: examConfig.timeLimitSeconds || 0,
            startedAt: startedAt,
            isEnglishDiagnostic: examConfig.isEnglishDiagnostic || false
        });
      } catch (err) {
        console.error('❌ Error actualizando sesión de sala:', err);
      }

      // 3. Switch View to EXAM
      console.log('🎬 Cambiando a vista EXAM...');
      setView(AppView.EXAM);
      console.log('✅ Vista cambiada a:', AppView.EXAM);

      // 4. Initial broadcast handled by ExamView or here?
      // ExamView will need to handle "Room Mode"
  }



// In the template area:
/*
  {:else if view === AppView.PARTY_LOBBY}
    <PartyLobby
      partyCode={partyCode}
      onStart={handlePartyStart}
      onCancel={() => setView(AppView.SUBJECT_SELECTION)}
    />
*/



  function handleArticleSelect(article) {
    selectedArticle = article;
    setView(AppView.ARTICLE);
  }

  async function handleGradeSelect(grade) {
    console.log(`🎯 handleGradeSelect called for grade ${grade}`);
    selectedGrade = grade;
    isLoadingQuestions = true;
    try {
      const questions = await fetchAllQuestionsForGrade(grade, true, 150);
      loadedQuestions = questions;
      availableSubjects = await getAvailableSubjects(grade);
      // ⚡ UNIFICATION: Skip SubjectSelector, go straight to Exam Config
      // Default to null subject (Simulacro Completo) unless they pick specific in modal
      selectedSubject = null;
      showExamConfigModal = true;
      setView(AppView.LANDING); // Or keep in LANDING mode with modal on top
    } catch (err) {
      console.error('Error loading questions for grade:', err);
      loadError = err;
    } finally {
      isLoadingQuestions = false;
    }
  }

  async function handleSubjectSelect(subject) {
    // Handle special actions
    if (subject === 'CHANGE_GRADE') {
      setView(AppView.GRADE_SELECTION);
      return;
    }

    selectedSubject = subject;
    showExamConfigModal = true;
  }

  async function loadQuestionsForExam(grade, subject) {
    // ⚡ OPTIMIZATION: Check if we already have questions for this grade/subject to avoid re-fetching
    const hasEnough = loadedQuestions.filter(q =>
        q.grade === grade &&
        subjectsMatch(q.category, subject)
    ).length >= 50; // Threshold

    if (hasEnough) {
        console.log(`🚀 Optimization: Using ${grade}/${subject} questions already in memory`);
        return;
    }

    isLoadingQuestions = true;
    try {
      const questions = await fetchAllQuestionsForGrade(grade, true, 200);
      const currentIds = new Set(loadedQuestions.map(q => q.id));
      const newQuestions = questions.filter(q => !currentIds.has(q.id));
      if (newQuestions.length > 0) {
        loadedQuestions = [...loadedQuestions, ...newQuestions];
      }
    } catch (err) {
      console.error('Error loading questions:', err);
    } finally {
      isLoadingQuestions = false;
    }
  }



  // 🆕 State for nickname modal
  let showNicknameModal = $state(false);
  let pendingExamData = $state(null);
  let pendingAnswers = $state(null);
  let nicknameInput = $state('');

  function handleExamFinish(examData, answers) {
    // 🆕 Room Mode: Ask for nickname before showing results
    if (roomCode && sessionId) {
      // Load saved nickname if exists
      const savedNickname = localStorage.getItem('room_player_name');
      nicknameInput = savedNickname || '';

      // Store pending data
      pendingExamData = examData;
      pendingAnswers = answers;

      // Show nickname modal
      showNicknameModal = true;
      return;
    }

    // Solo mode: proceed normally
    finishExamWithNickname(examData, answers, null);
  }

  function finishExamWithNickname(examData, answers, nickname) {
    lastExamData = examData;
    userAnswers = answers;

    // Mark questions as answered in memory
    if (examData?.questions) {
      // 🆕 Calculate total available for this context to prevent premature clearing
      let totalAvailable = loadedQuestions.length;

      if (selectedGrade) {
          totalAvailable = loadedQuestions.filter(q => {
             if (q.grade !== selectedGrade) return false;
             if (selectedSubject && selectedSubject !== 'Simulacro Completo') {
                 return subjectsMatch(q.subject || q.category || '', selectedSubject);
             }
             return true;
          }).length;
      }

      markQuestionsAnswered(examData.questions, totalAvailable || 100, examConfig.period);
    }

    // Save to local storage
    try {
      saveExamResultLocal({
        ...examData,
        completedAt: new Date().toISOString(),
        grade: selectedGrade,
        subject: selectedSubject,
        period: examConfig.period // 🆕 Pass Period
      }, answers); // ⚡ FIXED: Pass answers as second argument
    } catch (err) {
      console.warn('Error saving local exam result:', err);
    }

    // 🆕 Room Mode Result Handling
    if (roomCode && sessionId) {
        const userName = nickname || user?.email || 'Jugador';

        // Save nickname for future use
        if (nickname) {
          localStorage.setItem('room_player_name', nickname);
        }

        const minimalResult = {
             sessionId: sessionId,
             name: userName,
             score: examData.questions.filter(q => q.isCorrect).length,
             total: examData.questions.length,
             time: examData.totalTimeMs,
             focusViolations: examData.focusViolations || 0,
             finishedAt: Date.now()
        };

        // 🔥 BROADCAST to ALL participants (not just host)
        console.log('Broadcasting result to all participants:', minimalResult);
        p2pService.broadcast('EXAM_RESULT', minimalResult);

        // Also save locally for immediate display
        const existing = JSON.parse(sessionStorage.getItem('room_results') || '[]');
        if (!existing.find(r => r.sessionId === minimalResult.sessionId)) {
          existing.push(minimalResult);
          sessionStorage.setItem('room_results', JSON.stringify(existing));
          window.dispatchEvent(new CustomEvent('room-result-received', { detail: minimalResult }));
        }
    } else if (roomCode) {
        roomCode = '';
        roomChannel = null;
    }

    // generatedExamQuestions = null; // 🚨 REMOVED: Clearing too early causes ResultsView to show whole pool (1 de 126 error)
    setView(AppView.RESULTS);
  }

  function handleNicknameSubmit() {
    const finalNickname = nicknameInput.trim() || 'Jugador';
    showNicknameModal = false;
    finishExamWithNickname(pendingExamData, pendingAnswers, finalNickname);
  }

  async function handleCreateSpeedRoom(config) {
    try {
      showSpeedChallengeSetup = false;
      isLoadingQuestions = true;

      const newRoomId = await roomState.createRoom(
        config.hostName,
        config.partyName,
        11, // Default grade for Speed Mode
        'Speed Challenge',
        {
          connectionMode: 'supabase',
          maxPlayers: 100,
          timePerQuestion: 15,
          totalQuestions: config.totalQuestions,
          mode: 'stop',
          stopConfig: {
            includeEnglish: config.includeEnglish,
            difficulty: config.difficulty
          }
        }
      );

      // 🆕 Set Reporting State so results save correctly
      selectedSubject = 'Speed Challenge';
      selectedGrade = 11;

      // 🆕 Initialize Exam Config for correct timer logic (Total Time = 15s * Qs)
      examConfig = {
        count: config.totalQuestions,
        timeLimitSeconds: config.totalQuestions * 15,
        isHost: true,
        mode: 'stop'
      };

      // 🛡️ Ensure roomCode has value even if createRoom returns undefined (Offline Fallback)
      roomCode = newRoomId || roomState.config?.id || 'OFFLINE-' + Math.floor(Math.random()*1000);
      isHost = true;
      setView(AppView.ROOM_LOBBY);

    } catch (error) {
      console.error('Error creating speed room:', error);
      alert('Error al crear la sala Speed.');
    } finally {
      isLoadingQuestions = false;
    }
  }

  async function handleJoinPublicRoom(code, playerName) {
    try {
      showLobbyBrowser = false;
      isLoadingQuestions = true;

      // Fetch the session config
      const { data, error } = await supabase
        .from('party_sessions')
        .select('*')
        .eq('party_code', code)
        .single();

      if (error || !data) throw new Error('No se pudo encontrar la sala.');

      const config = data.exam_config;

      // Join via roomState
      await roomState.joinRoom(code, playerName || 'Jugador', config);

      // Update App state
      roomCode = code;
      isHost = false;
      sessionId = crypto.randomUUID();

      // Setup Reporting
      selectedSubject = config.asignatura || 'Desafío Speed';
      selectedGrade = config.grado || 11;

      examConfig = {
        count: config.totalQuestions,
        timeLimitSeconds: config.totalQuestions * (config.timePerQuestion || 15),
        isHost: false,
        mode: config.mode || 'stop'
      };

      setView(AppView.ROOM_LOBBY);
    } catch (err) {
      console.error('Error joining public room:', err);
      alert('Error al unirse a la sala.');
    } finally {
      isLoadingQuestions = false;
    }
  }
</script>

<div class="min-h-screen bg-[#121212] text-[#F5F5DC] font-mono selection:bg-emerald-500/30 overflow-x-hidden">
  <LocalModeNotice />

  {#if showLocalReports}
    <LocalReportsView
      onClose={() => showLocalReports = false}
      onStartExam={handleStart}
      onNavigateToBlog={async (subject) => {
        isNavigatingToBlog = true;
        const startTime = Date.now();

        try {
          // 🆕 Load all grades by default so all subjects are available in the blog
          if (loadedQuestions.length === 0) {
            loadedQuestions = await fetchBulkQuestions([3, 5, 6, 7, 8, 9, 10, 11], 200);
          }
          // 🆕 Save subject filter to pass to BlogView
          blogSubjectFilter = subject || null;
          showLocalReports = false;
          setView(AppView.BLOG);
        } finally {
          // Ensure spinner is visible for at least 400ms
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, 400 - elapsed);
          if (remaining > 0) {
            await new Promise(resolve => setTimeout(resolve, remaining));
          }
          isNavigatingToBlog = false;
        }
      }}
    />
  {/if}

  {#if showOfflineProfile}
    <OfflineProfile onClose={() => showOfflineProfile = false} />
  {/if}

  <!-- Noise Overlay -->
  <div class="bg-noise"></div>

  <!-- Global Header -->
  {#if view !== AppView.EXAM && view !== AppView.RESULTS}
  <header class="fixed top-0 left-0 right-0 z-50 border-b border-white/5">
    <!-- Header Background with Blur -->
    <div class="absolute inset-0 bg-[#121212]/80 backdrop-blur-sm pointer-events-none"></div>

    <div class="container mx-auto px-4 py-3 flex items-center justify-between relative z-10">
      <div class="flex items-center gap-3">
        <button
          onclick={() => setView(AppView.LANDING)}
          class="text-sm font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors"
        >
          SaberParaTodos
        </button>
        <div class="hidden sm:flex items-center gap-1.5 text-[10px] font-mono border border-white/10 px-2 py-0.5 rounded">
          <span class="text-yellow-400/80">v{packageInfo.version}</span>
          {#if buildInfo}
            <span class="text-white/20">|</span>
            <span class="text-emerald-500/70" title="Git commit">{buildInfo.commit?.substring(0, 7) || '?'}</span>
            <span class="text-white/20">|</span>
            <span class="text-white/50">{new Date(buildInfo.buildTime).toLocaleDateString('es-CO', { month: 'short', day: 'numeric' })}</span>
          {/if}
        </div>

        <a
          href="/guia-examen"
          class="hidden md:flex ml-4 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 transition-colors rounded items-center gap-1"
        >
          <span>📚</span> Volver a la Guía Principal
        </a>
        <a href="/guia-examen" class="md:hidden ml-2 px-2 py-1 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/50 text-emerald-500 rounded">
          📚 Guía
        </a>
      </div>
      <div class="flex items-center gap-4">
        {#if user}
          <div class="text-xs text-emerald-500 opacity-80 hidden sm:block">
            {user.email}
          </div>
          <button
            onclick={() => supabase.auth.signOut()}
            class="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-red-400 transition-colors"
          >
            Salir
          </button>
        {:else}
        <!--
          <button
            disabled
            class="px-3 py-1.5 text-xs uppercase tracking-widest border border-emerald-500/50 text-emerald-500 opacity-50 cursor-not-allowed rounded"
          >
            Pronto
          </button>
        -->
        {/if}
        <!-- Header Icons -->
        <div class="flex items-center gap-2">
          <!-- Profile Icon - Opens OfflineProfile modal -->
          <button
            onclick={() => showOfflineProfile = true}
            class="p-2 text-white/40 hover:text-indigo-400 transition-colors"
            title="Mi Perfil Offline"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <!-- Local Reports Icon - Opens LocalReportsView modal -->
          <button
            onclick={() => showLocalReports = true}
            class="p-2 text-white/40 hover:text-emerald-500 transition-colors"
            title="Ver Historial Local"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <!-- <AdvancedSearch questions={loadedQuestions} /> -->
      </div>
    </div>
  </header>
  {/if}

  <!-- Main Content -->
  <main class="relative z-10 container mx-auto px-4 py-8 pt-20">
    <!-- 🚧 MODO PROTOTIPO: Oculto temporalmente hasta que el backend esté listo -->
    {#if false && user}
      <!-- Training Room Announcement Banner (Logged in only) -->
      <div class="mb-8 bg-gradient-to-r from-[#fcd116] to-[#ff6b6b] rounded-lg p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-black font-mono border border-white/10">
        <div class="flex items-center gap-3 text-center sm:text-left">
          <span class="text-2xl">🚀</span>
          <div class="text-sm md:text-base">
            <strong>¡Nuevo!</strong> Sala de Entrenamiento con IA Adaptativa
          </div>
        </div>
        <a href="/training" class="bg-[#003893] text-white px-6 py-2 rounded-lg hover:bg-[#0052cc] transition-colors text-sm font-bold whitespace-nowrap shadow-md">
          Probar ahora →
        </a>
      </div>
    {/if}

    {#if view === AppView.LANDING}
      <div
        in:fly={{ y: 20, duration: 500, delay: 200 }}
        out:fade={{ duration: 200 }}
        class="flex flex-col items-center min-h-screen text-center px-4 pt-8 pb-32 w-full overflow-hidden relative"
      >
        <!-- Colombia Flag Gradient Background -->
        <div class="hero-gradient"></div>

        <!-- Floating Particles -->
        <div class="particles">
          <div class="particle particle-1"></div>
          <div class="particle particle-2"></div>
          <div class="particle particle-3"></div>
        </div>

        <div class="space-y-4 relative z-10">
          <div class="flex items-center justify-center gap-2 mb-4">
            <!-- Colombia Flag SVG -->
            <svg class="w-8 h-5" viewBox="0 0 32 20" fill="none">
              <rect y="0" width="32" height="10" fill="#FCD116"/>
              <rect y="10" width="32" height="5" fill="#003893"/>
              <rect y="15" width="32" height="5" fill="#CE1126"/>
            </svg>
            <span class="text-xs font-bold uppercase tracking-[0.3em] text-[#FCD116]">Colombia</span>
          </div>
          <p class="text-xs font-bold uppercase tracking-[0.4em] text-emerald-500 animate-pulse-slow">
            Beta Abierta :: v{packageInfo.version}
          </p>
          <h1 class="text-6xl md:text-8xl font-bold tracking-tighter uppercase text-[#F5F5DC] relative">
            Saber <span class="text-white/20">Para Todos</span>
            <span class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#FCD116] via-[#003893] to-[#CE1126] rounded-full"></span>
          </h1>
          <p class="max-w-md mx-auto text-sm font-light leading-relaxed opacity-60 mt-6">
            Interfaz preparatoria avanzada para pruebas estandarizadas.
            Entorno minimalista optimizado para enfoque y eficiencia.
          </p>

          <!-- Quick Stats -->
          <div class="flex items-center justify-center gap-6 mt-6 text-xs opacity-50 relative z-20">
            <!-- Dynamic Questions Counter with Tooltip -->
            <div class="flex items-center gap-1 group relative cursor-help">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>4000+ preguntas</span>

              <!-- Updates tooltip -->
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 bg-[#0a0a0a]/95 text-emerald-100 text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 pointer-events-none border border-emerald-500/20 shadow-2xl z-50 w-64 text-center backdrop-blur-xl">
                 <div class="font-bold text-emerald-400 mb-1.5 uppercase tracking-wider text-[10px]">Banco Dinámico</div>
                 <p class="leading-relaxed mb-2 text-white/90">
                   Las preguntas rotan <span class="text-white font-bold border-b border-emerald-500/50">semanalmente</span>.
                 </p>
                 <div class="bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/10 text-left relative overflow-hidden">
                   <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent"></div>
                   <p class="text-[10px] text-emerald-200/90 leading-tight relative z-10">
                     <strong class="text-emerald-400">💡 Tip:</strong> Si no borras la app, acumularás todas las preguntas en tu dispositivo <strong class="text-white">GRATIS</strong>.
                   </p>
                 </div>
                 <div class="mt-2 text-[10px] text-white/20 font-mono uppercase tracking-widest">Total Global: 1,800+</div>

                 <!-- Arrow -->
                 <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0a]/95 border-r border-b border-emerald-500/20 rotate-45 backdrop-blur-xl"></div>
              </div>
            </div>

            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>5 asignaturas</span>
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>100% gratis</span>
            </div>
          </div>
        </div>

        <!-- Grade Selection Cards -->
        <div class="w-full max-w-4xl relative z-10 mt-12">
          <!-- 🆕 Period Tracker -->
          <PeriodTracker onOpenModal={(data) => {
            periodTrackerData = data;
            showPeriodTrackerModal = true;
          }} />

          <h3 class="text-center text-xs font-bold uppercase tracking-widest text-white/40 mb-6">
            Exámenes tipo saber
          </h3>

          <!-- 🆕 English Card - Cross-Grade Diagnostic Mode -->
          <div class="mb-6">
            <FlashlightCard
              onClick={async () => {
                // 🇬🇧 English Diagnostic Mode: Fetch from ALL grades
                isLoadingQuestions = true;
                try {
                  console.log('🇬🇧 Loading English questions from all grades (A1-B2+)...');
                  const englishQuestions = await fetchEnglishQuestionsAllGrades(100, true);

                  if (englishQuestions.length === 0) {
                    console.error('❌ No English questions found');
                    loadError = new Error('No se encontraron preguntas de inglés.');
                    return;
                  }

                  // Store in loadedQuestions for the modal to use
                  loadedQuestions = englishQuestions;
                  availableSubjects = ['Inglés']; // Only English for this mode

                  // Set config for English diagnostic
                  selectedGrade = 0; // Special: 0 = Cross-grade mode
                  selectedSubject = 'Inglés Diagnóstico';

                  console.log(`✅ Loaded ${englishQuestions.length} English questions across all levels`);
                  showExamConfigModal = true;
                } catch (err) {
                  console.error('Error loading English questions:', err);
                  loadError = err;
                } finally {
                  isLoadingQuestions = false;
                }
              }}
              className="p-4 flex flex-col items-center justify-center gap-3 group hover:border-blue-500/50 transition-transform duration-300 hover:scale-[1.02] bg-gradient-to-r from-blue-900/20 via-purple-900/10 to-blue-900/20 border border-blue-500/20"
            >
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10 mb-2">
                <img src="/favicon.png" alt="SaberParaTodos" class="w-9 h-9 object-contain" />
              </div>
              <div class="text-center flex-1 w-full">
                <div class="text-xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors uppercase tracking-wider flex items-center justify-center gap-2">
                  Inglés
                  <span class="px-1.5 py-0.5 bg-purple-500/20 text-purple-400 text-[8px] font-bold uppercase tracking-widest rounded">
                    Diagnóstico
                  </span>
                </div>
                <div class="text-[10px] uppercase tracking-wider text-white/40 group-hover:text-white/60 mt-0.5">
                  Niveles A1 a B2+ • Evalúa tu nivel real
                </div>
              </div>
              <div class="flex flex-col items-center gap-1 w-full mt-2">
                <div class="flex items-center gap-1.5">
                  <span class="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[9px] font-bold uppercase tracking-widest rounded-full">
                    Sala ✓
                  </span>
                </div>
                <div class="flex items-center justify-center gap-1 text-[9px] text-white/30">
                  <span>Grados 3-11</span>
                  <svg class="w-4 h-4 text-white/30 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </FlashlightCard>
          </div>

          <!-- Grade Cards Section -->
          <div class="flex flex-col gap-4 max-w-2xl mx-auto w-full">
            <!-- 🔝 Main Grade 11 Card (Always First & Big) -->
            <FlashlightCard
              onClick={() => {
                selectedGrade = 11;
                showExamConfigModal = true;
              }}
              className="p-4 flex flex-col items-center justify-center group transition-all duration-300 hover:scale-105 hover:border-emerald-500/50 h-32 bg-emerald-500/5 border-emerald-500/30"
            >
              <div class="font-bold text-emerald-500 group-hover:text-emerald-400 transition-all duration-300 text-5xl drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                11°
              </div>
              <div class="uppercase tracking-wider text-white/40 group-hover:text-white/60 mt-1 transition-all duration-300 text-xs">
                Grado
              </div>
              <div class="mt-2 px-2 py-0.5 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                <span class="text-[8px] text-emerald-400 font-bold uppercase tracking-widest animate-pulse">Examen Principal</span>
              </div>
            </FlashlightCard>

            <!-- 🔢 Other Grade Cards (Centered Below) -->
            <div class="flex flex-wrap justify-center gap-4">
              {#each (showAllLandingGrades ? [10, 9, 8, 7, 6, 5, 4, 3] : [9, 5, 3]) as grade}
                <FlashlightCard
                  onClick={() => {
                    selectedGrade = grade;
                    showExamConfigModal = true;
                  }}
                  className="p-4 flex flex-col items-center justify-center group h-24 w-full max-w-[124px] sm:max-w-[140px] hover:border-emerald-500/50 transition-transform duration-300 hover:scale-105 overflow-hidden"
                >
                  <div class="text-2xl font-bold text-emerald-500 group-hover:text-emerald-400 transition-colors">
                    {grade}°
                  </div>
                  <div class="text-[10px] uppercase tracking-wider text-white/40 group-hover:text-white/60 mt-1">
                    Grado
                  </div>
                </FlashlightCard>
              {/each}

              {#if showAllLandingGrades}
                <!-- 🎓 Preuniversitario Card -->
                <FlashlightCard
                  onClick={() => {
                    selectedSubject = 'Preuniversitario';
                    selectedGrade = 11;
                    showExamConfigModal = true;
                  }}
                  className="p-4 flex flex-col items-center justify-center group h-24 w-full max-w-[124px] sm:max-w-[144px] hover:border-[#FCD116]/50 transition-transform duration-300 hover:scale-105 bg-[#FCD116]/5 border border-[#FCD116]/10"
                >
                  <div class="text-2xl font-bold text-[#FCD116] group-hover:text-[#FCD116]/80 transition-colors">
                    PREU
                  </div>
                  <div class="text-[8px] sm:text-[10px] uppercase tracking-wider text-white/40 group-hover:text-white/60 mt-1 text-center font-bold">
                    Preuniversitario
                  </div>
                </FlashlightCard>
              {/if}
            </div>
          </div>

          {#if !showAllLandingGrades}
            <div class="mt-6 flex justify-center">
              <button
                onclick={() => showAllLandingGrades = true}
                class="px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-[#FCD116]/60 hover:text-[#FCD116] border border-white/5 hover:border-[#FCD116]/20 rounded-full transition-all"
              >
                Ver más exámenes y Preuniversitario
              </button>
            </div>
          {/if}
        </div>

        <!-- Action Cards Grid -->
        <div class="flex flex-col items-center justify-center gap-6 w-full max-w-2xl relative z-10 mt-8">

          {#if false}
          <FlashlightCard
            onClick={() => showLocalReports = true}
            className="p-8 flex flex-col items-center justify-center group h-48 hover:border-emerald-500/50 transition-transform duration-300 hover:scale-105"
          >
            <div class="mb-4 text-[#FCD116] opacity-60 group-hover:opacity-100">
              <svg class="w-10 h-10" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="14" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M30 10l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold uppercase tracking-widest mb-2">Mis Métricas</h3>
            <p class="text-xs opacity-40">Ver rendimiento local</p>
          </FlashlightCard>
          {/if}

          <!-- Stop Mode Section (Comentado por ahora)
          <div class="w-full flex flex-col sm:flex-row gap-6">
              <FlashlightCard
                onClick={() => showStopSetup = true}
                className="flex-1 p-8 flex flex-col items-center justify-center group h-48 hover:border-pink-500/50 transition-transform duration-300 hover:scale-105 relative overflow-hidden"
              >
                 <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div class="mb-4 text-pink-500 opacity-80 group-hover:opacity-100 transform group-hover:rotate-12 transition-all">
                  <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 data-testid="create-stop-party-btn" class="text-xl font-bold uppercase tracking-widest mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  DESAFÍO SPEED
                </h3>
                <p class="text-xs opacity-40">Modo multijugador rápido (15s)</p>
              </FlashlightCard>

              <FlashlightCard
                onClick={() => showLobbyBrowser = true}
                className="flex-1 p-8 flex flex-col items-center justify-center group h-48 hover:border-blue-500/50 transition-transform duration-300 hover:scale-105 relative overflow-hidden"
              >
                 <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div class="mb-4 text-blue-400 opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-all">
                  <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold uppercase tracking-widest mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Ver Partidas
                </h3>
                <p class="text-xs opacity-40">Busca salas creadas por otros</p>
              </FlashlightCard>
          </div>
          -->

          <!-- 
          {#if countryConfig.features?.blog}
          <FlashlightCard
            onClick={async () => {
              isNavigatingToBlog = true;
              try {
                // 🆕 Use NEW grade-specific endpoint for Blog view
                // Load only grade 11 by default (1 small request instead of 1 large request with all grades)
                if (loadedQuestions.length === 0) {
                  console.log('📚 Loading questions for Blog view using grade-specific endpoint...');
                  // Single request for grade 11 only (default for ICFES)
                  loadedQuestions = await fetchQuestionsForGrade(11, 150);

                  console.log(`✅ Loaded ${loadedQuestions.length} questions for grade 11`);
                  console.log(`📊 Performance: ~40KB instead of ~150KB (73% smaller)`);

                  // Pre-fetch all other grades in background for instant switching
                  fetchBulkQuestions([3, 5, 6, 7, 8, 9, 10], 150).catch(e => console.warn('Background prefetch error:', e));
                }
                setView(AppView.BLOG);
              } finally {
                // Use a small delay for smoother transition
                setTimeout(() => { isNavigatingToBlog = false; }, 300);
              }
            }}
            className="p-8 flex flex-col items-center justify-center group h-48 hover:border-[#003893]/40 transition-transform duration-300 hover:scale-105"
          >
            <div class="mb-4 text-[#003893] opacity-60 group-hover:opacity-100">
              <svg class="w-10 h-10" viewBox="0 0 40 40" fill="none">
                <path d="M6 8h28v28H6V8z" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M6 8l14 10 14-10" stroke="currentColor" stroke-width="2" fill="none"/>
                <rect x="12" y="22" width="16" height="2" fill="currentColor" opacity="0.5"/>
                <rect x="12" y="27" width="12" height="2" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold uppercase tracking-widest mb-2">Blog / Artículos</h3>
            <p class="text-xs opacity-40">Explorar banco de preguntas</p>
          </FlashlightCard>
          {/if}
          -->
        </div>

        <!-- CTA Button -->
        <div class="flex flex-col items-center gap-4 relative z-10 mt-10">
          <a
            href="/guia-examen"
            class="px-6 py-3 bg-gradient-to-r from-[#FCD116] via-[#003893] to-[#CE1126] text-white font-bold uppercase tracking-widest text-sm rounded hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Guía Completa ICFES
          </a>
          <p class="text-xs opacity-30">Conoce la estructura del examen y tips de estudio</p>
        </div>
        <!-- Footer - Fixed at Bottom -->
        <footer class="fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-white/5 z-50">
          <div class="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs">
            <!-- Left: Country Flag -->
            <span class="flex items-center gap-1 text-white/40">
              <span>🇨🇴</span>
            </span>

            <!-- Center/Middle Links -->
            <div class="flex items-center gap-3 sm:gap-4">
              <!-- <a
                href="https://github.com/world-exams"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1 text-white/40 hover:text-emerald-500 transition-colors"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span class="hidden sm:inline">GitHub</span>
              </a> -->
            </div>

            <!-- Right: Copyright -->
            <span class="text-white/20 text-center">
              © {new Date().getFullYear()} World Exams
            </span>
          </div>

          <!-- Colombian flag stripe -->
          <div class="w-full h-0.5 flex">
            <div class="flex-[2] bg-[#FCD116]"></div>
            <div class="flex-1 bg-[#003893]"></div>
            <div class="flex-1 bg-[#CE1126]"></div>
          </div>
        </footer>
      </div>
    {:else if view === AppView.LOGIN}
      <div in:fly={{ x: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <Login
          onBack={() => setView(AppView.LANDING)}
        />
      </div>
    {:else if view === AppView.GRADE_SELECTION}
      <div in:fly={{ x: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <GradeSelector
          onSelect={handleGradeSelect}
          onBack={() => setView(AppView.LANDING)}
        />
      </div>
    {:else if view === AppView.SUBJECT_SELECTION}
      <!-- 🗑️ DEPRECATED: Unified with ExamConfigModal
      <div in:fly={{ x: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <SubjectSelector
          questions={filteredLocalQuestions}
          availableSubjects={availableSubjects}
          onSelect={handleSubjectSelect}
          onBack={() => setView(AppView.LANDING)}
        />
      </div>
      -->
    {:else if view === AppView.EXAM}
      <div in:fly={{ x: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <ExamView
          onFinish={handleExamFinish}
          questions={examQuestions}
          grade={selectedGrade}
          subject={selectedSubject}
          roomCode={roomCode}
          roomChannel={roomChannel}
          isHost={examConfig?.isHost || false}
          sessionId={sessionId}
          timeLimitSeconds={examConfig?.timeLimitSeconds}
          startedAt={examConfig?.startedAt}
          totalQuestions={examConfig?.count || 0}
          isAdaptiveMode={isAdaptiveMode}
          adaptivePool={adaptivePool}
        />
      </div>
    {:else if view === AppView.LEADERBOARD}
      <div in:fly={{ x: -50, duration: 500 }} out:fade={{ duration: 200 }}>
        <LeaderboardView
          onBack={() => setView(AppView.LANDING)}
        />
      </div>
    {:else if view === AppView.RESULTS}
      <div in:fly={{ y: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <ResultsView
          examData={lastExamData}
          questions={generatedExamQuestions || examQuestions}
          {userAnswers}
          onHome={() => setView(AppView.LANDING)}
          onLeaderboard={() => setView(AppView.LEADERBOARD)}
          onViewReports={() => showLocalReports = true}
          onLogin={() => setView(AppView.LOGIN)}
        />
      </div>
    {:else if view === AppView.BLOG}
      <div in:fly={{ x: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <BlogView
          questions={loadedQuestions}
          onSelect={handleArticleSelect}
          onBack={() => { blogSubjectFilter = null; setView(AppView.LANDING); }}
          initialSubjectFilter={blogSubjectFilter}
          isLoading={isNavigatingToBlog}
          onGradeChange={async (grade) => {
            // 🆕 Always show spinner for feedback (prevents "blocked" feel)
            isNavigatingToBlog = true;
            const startTime = Date.now();

            try {
              let newToStore = [];
              if (grade === null) {
                newToStore = await fetchBulkQuestions([3, 5, 6, 7, 8, 9, 10, 11], 300);
              } else {
                newToStore = await fetchQuestionsForGrade(grade, 150);
              }

              // Merge only if we found new questions to avoid redundant reactivity
              const existingIds = new Set(loadedQuestions.map(q => q.id));
              const uniqueNew = newToStore.filter(q => !existingIds.has(q.id));

              if (uniqueNew.length > 0) {
                loadedQuestions = [...loadedQuestions, ...uniqueNew];
                console.log(`✅ Added ${uniqueNew.length} new questions to pool (${loadedQuestions.length} total)`);
              }
            } catch (err) {
              console.error('Error changing grade:', err);
            } finally {
              // Ensure spinner is visible for at least 300ms for solid feedback
              const elapsed = Date.now() - startTime;
              const remaining = Math.max(0, 300 - elapsed);
              if (remaining > 0) {
                await new Promise(resolve => setTimeout(resolve, remaining));
              }
              isNavigatingToBlog = false;
            }
          }}
        />
      </div>
    {:else if view === AppView.ARTICLE}
      <div in:fly={{ x: 50, duration: 500 }} out:fade={{ duration: 200 }}>
        <ArticleView
          question={selectedArticle}
          onBack={() => setView(AppView.BLOG)}
        />
      </div>
    {/if}

  </main>

  <!-- Registration Modal (Commented out)
  {#if showRegistrationModal}
    <div
      class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 outline-none"
      onclick={(e) => { if (e.target === e.currentTarget) showRegistrationModal = false; }}
      onkeydown={(e) => { if (e.key === 'Escape') showRegistrationModal = false; }}
      role="presentation"
      tabindex="-1"
      transition:fade={{ duration: 200 }}
    >
      <div class="max-w-md w-full cursor-default" in:fly={{ y: 20, duration: 300 }}>
        <IdentityRegistration
          onComplete={handleRegistrationComplete}
          onCancel={() => showRegistrationModal = false}
        />
      </div>
    </div>
  {#if showRegistrationModal}
  {/if}
  -->

  <!-- Exam Config Modal -->
  {#if showExamConfigModal}
    <ExamConfigModal
      subject={selectedSubject}
      currentGrade={selectedGrade || 11}
      isLoggedIn={Boolean(user)}
      availableQuestions={loadedQuestions}
      initialRoomCode={initialRoomCode}
      onStart={handleExamConfigStart}
      onCancel={() => { showExamConfigModal = false; selectedSubject = null; }}
    />
  {/if}

  <!-- Period Tracker Modal -->
  {#if showPeriodTrackerModal && periodTrackerData}
    <PeriodTrackerModal
      {...periodTrackerData}
      onClose={() => showPeriodTrackerModal = false}
    />
  {/if}

  <!-- 🆕 Nickname Modal (Room Mode) -->
  {#if showNicknameModal}
    <div
      class="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      transition:fade={{ duration: 200 }}
    >
      <div class="bg-[#121212] border border-emerald-500/30 rounded-xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden" in:fly={{ y: 20, duration: 300 }}>
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"></div>

        <div class="text-center mb-6">
          <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <h2 class="text-2xl font-bold uppercase tracking-widest text-emerald-400 mb-2">
            ¡Examen Completado!
          </h2>
          <p class="text-sm text-white/60">
            Ingresa tu nombre para aparecer en el tablero de resultados
          </p>
        </div>

        <div class="mb-6">
          <label class="block text-xs uppercase tracking-widest text-white/60 mb-2">Tu Nombre o Apodo</label>
          <input
            type="text"
            bind:value={nicknameInput}
            placeholder="Ej: Juan, Campeón, Pro Player..."
            maxlength="20"
            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            onkeydown={(e) => { if (e.key === 'Enter') handleNicknameSubmit(); }}
            autofocus
          />
          <div class="text-xs text-white/40 mt-1">
            {nicknameInput.length}/20 caracteres
          </div>
        </div>

        <button
          onclick={handleNicknameSubmit}
          class="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 active:scale-95"
        >
          Ver Resultados
        </button>

        <div class="text-center mt-4">
          <button
            onclick={() => handleNicknameSubmit()}
            class="text-xs text-white/40 hover:text-white/60 underline transition-colors"
          >
            Continuar sin nombre
          </button>
        </div>
      </div>
    </div>
  {/if}

  {#if isIntegrityCheck}
    <IntegrityIntro loading={isPreparingExam} on:complete={() => {
      isIntegrityCheck = false;
      if (generatedExamQuestions && generatedExamQuestions.length > 0) {
        setView(AppView.EXAM);
      }
    }} />
  {/if}

  <!-- Loading Overlay -->
  {#if isLoadingQuestions || isNavigatingToBlog}
    <div class="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center text-center px-6" transition:fade>
      <div class="relative w-24 h-24 mb-8">
        <div class="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-2xl">{isNavigatingToBlog ? '🔍' : '⚡'}</span>
        </div>
      </div>
      <h2 class="text-2xl font-bold uppercase tracking-widest text-emerald-500 animate-pulse">
        {isNavigatingToBlog ? 'Accediendo al Banco' : 'Generando Examen'}
      </h2>
      <p class="text-white/40 mt-2 text-sm max-w-xs">
        {isNavigatingToBlog ? 'Preparando artículos y categorizando temas...' : 'Descargando preguntas y calibrando dificultad...'}
      </p>
    </div>
  {/if}

  <!-- Speed Challenge Setup Modal -->
  {#if showSpeedChallengeSetup}
    <div class="fixed inset-0 z-[150] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="w-full max-w-2xl bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden relative">
        <SpeedChallengeSetup
          onBack={() => showSpeedChallengeSetup = false}
          onCreate={handleCreateSpeedRoom}
        />
      </div>
    </div>
  {/if}

  <!-- Lobby Browser Modal -->
  {#if showLobbyBrowser}
    <LobbyBrowser
      onJoin={handleJoinPublicRoom}
      onClose={() => showLobbyBrowser = false}
    />
  {/if}

  <!-- 🆕 Update Notification Modal -->
  {#if showUpdateModal}
    <div class="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 text-black" transition:fade>
      <div
        class="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl text-center transform scale-100"
        transition:fly={{ y: 20, duration: 500 }}
      >
        <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>

        <h2 class="text-2xl font-black uppercase tracking-tight mb-2">Nueva Versión</h2>
        <p class="text-gray-600 mb-8 leading-relaxed">
          Hay una actualización disponible con mejoras críticas para el modo Sala y rendimiento.
        </p>

        <button
          onclick={() => window.location.reload(true)}
          class="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
        >
          ACTUALIZAR AHORA
        </button>

        <p class="mt-4 text-[10px] text-gray-400 uppercase tracking-widest font-medium">
          Tus datos y progreso se mantendrán a salvo
        </p>
      </div>
    </div>
  {/if}
</div>
