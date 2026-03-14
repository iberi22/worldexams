<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import ReportModal from './ReportModal.svelte';
  import { supabase } from '../lib/supabase';

  let showModal = false;
  let isVisible = false;
  let isExamMode = false;
  let isLoggedIn = false;

  // Show button after a short delay
  onMount(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      isLoggedIn = !!session;
    });

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      isLoggedIn = !!session;
    });

    const timer = setTimeout(() => {
      isVisible = true;
    }, 2000);

    const handleViewChange = (e: any) => {
      // Hide if current view is EXAM
      isExamMode = e.detail?.view === 'EXAM';
    };

    window.addEventListener('app-view-change', handleViewChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('app-view-change', handleViewChange);
      authListener.subscription.unsubscribe();
    };
  });
</script>

{#if isLoggedIn && isVisible && !isExamMode}
  <div class="fixed bottom-6 right-6 z-40 print:hidden" in:fly={{ y: 20, duration: 500 }}>
    <button
      on:click={() => showModal = true}
      class="group flex items-center gap-2 px-4 py-3 bg-[#121212]/90 backdrop-blur-md border border-white/10 hover:border-emerald-500/50 rounded-full shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-1"
      aria-label="Dejanos tu feedback"
    >
      <div class="relative">
        <span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse group-hover:bg-emerald-400"></span>
        <svg class="w-5 h-5 text-white/80 group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
      <span class="text-xs font-bold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors max-w-0 overflow-hidden group-hover:max-w-xs opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
        Feedback
      </span>
    </button>
  </div>
{/if}

{#if showModal}
  <ReportModal
    show={showModal}
    onClose={() => showModal = false}
    questionId={null}
    userContext="GlobalFeedbackButton"
  />
{/if}
