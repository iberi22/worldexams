<script lang="ts">
  import { onMount } from 'svelte';
  import {
    getStudentSession,
    fetchStudentMe,
    fetchAssignments,
    ensureAutoFlush,
    InstitutionError,
    INSTITUTION_ERROR_MESSAGES,
    type StudentSession,
    type StudentAssignment
  } from '../../lib/institutions/student-client';
  import JoinSchoolForm from './JoinSchoolForm.svelte';
  import JoinedSchoolCard from './JoinedSchoolCard.svelte';
  import StudentAssignmentsList from './StudentAssignmentsList.svelte';

  interface Props {
    /** Hide the assignments list (e.g. inside a modal). */
    showAssignments?: boolean;
    onSessionChange?: (session: StudentSession | null) => void;
  }

  let { showAssignments = true, onSessionChange }: Props = $props();

  let session = $state<StudentSession | null>(null);
  let assignments = $state<StudentAssignment[]>([]);
  let loadingAssignments = $state(false);
  let assignmentsError = $state<string | null>(null);

  function updateSession(next: StudentSession | null) {
    session = next;
    onSessionChange?.(next);
    if (!next) assignments = [];
  }

  async function refresh() {
    if (!getStudentSession()) return;
    try {
      updateSession(await fetchStudentMe());
    } catch (e) {
      // Offline keeps the cached session; a 401 already cleared it.
      if (e instanceof InstitutionError && e.code === 'UNAUTHORIZED') updateSession(null);
    }
    if (showAssignments && getStudentSession()) await loadAssignments();
  }

  async function loadAssignments() {
    loadingAssignments = true;
    assignmentsError = null;
    try {
      assignments = await fetchAssignments();
    } catch (e) {
      if (e instanceof InstitutionError && e.code === 'UNAUTHORIZED') updateSession(null);
      assignmentsError = e instanceof InstitutionError ? e.message : INSTITUTION_ERROR_MESSAGES.UNKNOWN;
    } finally {
      loadingAssignments = false;
    }
  }

  function handleJoined(next: StudentSession) {
    updateSession(next);
    if (showAssignments) void loadAssignments();
  }

  onMount(() => {
    session = getStudentSession();
    ensureAutoFlush();
    void refresh();
  });
</script>

<section class="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-zinc-100" aria-label="Mi colegio">
  {#if session}
    <JoinedSchoolCard {session} onChange={updateSession} />
    {#if showAssignments}
      <div class="border-t border-zinc-800 pt-4">
        <StudentAssignmentsList {assignments} loading={loadingAssignments} errorMsg={assignmentsError} />
      </div>
    {/if}
  {:else}
    <JoinSchoolForm onJoined={handleJoined} />
  {/if}
</section>
