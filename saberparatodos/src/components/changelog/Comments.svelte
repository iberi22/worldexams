<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '../../lib/supabase';

  export let postSlug: string;

  interface CommentData {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    profiles?: {
      email?: string;
      displayName?: string;
    };
  }

  let comments: CommentData[] = [];
  let newCommentText: string = "";
  let isSubmitting = false;
  let isLoading = true;

  let userId: string | null = null;
  let userEmail: string | null = null;

  onMount(async () => {
    // 1. Setup Auth Listener
    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        userId = session.user.id;
        userEmail = session.user.email || null;
      } else {
        userId = null;
        userEmail = null;
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        userId = session.user.id;
        userEmail = session.user.email || null;
      }
    });

    // 2. Fetch comments initially
    await fetchComments();

    // 3. Setup Supabase Realtime for instant updates
    const subscription = supabase
      .channel(`public:changelog_comments:${postSlug}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'changelog_comments',
          filter: `post_slug=eq.${postSlug}`
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      authSub?.unsubscribe();
      supabase.removeChannel(subscription);
    };
  });

  async function fetchComments() {
    try {
      // Need to join auth.users theoretically for names, but Supabase doesn't allow joining auth schema.
      // We will just show generic anonymous names or email snippet based on a raw fetch.
      // Since this is a public platform, we limit UI PII leakage.
      const { data, error } = await supabase
        .from('changelog_comments')
        .select('*')
        .eq('post_slug', postSlug)
        .order('created_at', { ascending: false });

      if (error) throw error;
      comments = data as CommentData[];
      isLoading = false;
    } catch (e) {
      console.error('Error fetching comments:', e);
      isLoading = false;
    }
  }

  async function addComment() {
    if (!newCommentText.trim()) return;
    if (!userId) {
      alert("Debes iniciar sesión para comentar.");
      return;
    }

    isSubmitting = true;
    try {
      const { error } = await supabase
        .from('changelog_comments')
        .insert({
          post_slug: postSlug,
          user_id: userId,
          content: newCommentText.trim()
        });

      if (error) throw error;

      // Clear input. Realtime subscription will handle updating the list.
      newCommentText = "";
    } catch (e: any) {
      console.error('Error posting comment:', e);
      alert('Hubo un error al publicar el comentario: ' + e.message);
    } finally {
      isSubmitting = false;
    }
  }

  async function deleteComment(commentId: string) {
    if (!confirm('¿Seguro de borrar tu comentario?')) return;
    try {
      const { error } = await supabase
        .from('changelog_comments')
        .delete()
        .match({ id: commentId, user_id: userId });
      if (error) throw error;
      comments = comments.filter(c => c.id !== commentId);
    } catch (e) {
      console.error('Error deleting comment:', e);
    }
  }

  function formatTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " años atrás";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " meses atrás";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " días atrás";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " horas atrás";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " min atrás";
    if (seconds < 10) return "justo ahora";
    return Math.floor(seconds) + " seg atrás";
  }
</script>

<div class="mt-8">
  <h3 class="text-xl font-bold text-[#F5F5DC] mb-6 flex items-center gap-2">
    Comentarios
    <span class="bg-white/10 text-xs px-2 py-0.5 rounded-full text-white/70">
      {comments.length}
    </span>
  </h3>

  <!-- Input Area -->
  <div class="mb-10 bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
    {#if userId}
      <div class="flex gap-4">
        <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FCD116] to-yellow-600 flex-shrink-0 flex items-center justify-center text-black font-bold text-lg leading-none pt-1">
          {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
        </div>
        <div class="flex-1">
          <textarea
            bind:value={newCommentText}
            placeholder="Añade tu comentario o pregunta sobre esta actualización..."
            class="w-full bg-transparent text-[#F5F5DC] placeholder-white/40 border border-white/10 rounded-lg p-3 min-h-[100px] resize-y focus:outline-none focus:border-[#FCD116]/50 focus:bg-black/20 transition-all font-sans"
          ></textarea>
          <div class="mt-3 flex justify-end">
            <button
              on:click={addComment}
              disabled={isSubmitting || !newCommentText.trim()}
              class="px-5 py-2 bg-[#FCD116] hover:bg-yellow-400 text-black font-semibold rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {#if isSubmitting}
                <svg class="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Publicando...
              {:else}
                Publicar comentario
              {/if}
            </button>
          </div>
        </div>
      </div>
    {:else}
      <div class="text-center py-6">
        <p class="text-white/60 mb-4">Debes iniciar sesión para participar en la conversación.</p>
        <a href="/login" class="inline-block px-5 py-2 border border-white/20 hover:bg-white/5 font-semibold rounded-lg text-white transition-colors">
          Iniciar sesión
        </a>
      </div>
    {/if}
  </div>

  <!-- Comments List -->
  <div class="space-y-6">
    {#if isLoading}
      <div class="animate-pulse space-y-6">
        {#each Array(2) as _}
          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-full bg-white/10 flex-shrink-0"></div>
            <div class="flex-1 space-y-3 py-1">
              <div class="h-4 bg-white/10 rounded w-1/4"></div>
              <div class="h-4 bg-white/10 rounded w-3/4"></div>
              <div class="h-4 bg-white/10 rounded w-1/2"></div>
            </div>
          </div>
        {/each}
      </div>
    {:else if comments.length === 0}
      <div class="text-center py-12 border border-white/5 border-dashed rounded-xl">
        <svg class="mx-auto h-12 w-12 text-white/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p class="text-white/50">Aún no hay comentarios. ¡Sé el primero en opinar!</p>
      </div>
    {:else}
      {#each comments as comment (comment.id)}
        <div class="flex gap-3 sm:gap-4 group">
          <div class="w-10 h-10 rounded-full bg-white/10 border border-white/5 flex-shrink-0 flex items-center justify-center text-white/50 font-bold leading-none pt-1">
            U
          </div>
          <div class="flex-1">
            <div class="bg-white/5 border border-white/10 rounded-b-xl rounded-tr-xl p-4 relative">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold text-white/90 text-sm">Estudiante</span>
                <div class="flex items-center gap-3">
                  <span class="text-xs text-white/40 font-mono" title={new Date(comment.created_at).toLocaleString()}>
                    {formatTimeAgo(comment.created_at)}
                  </span>

                  {#if comment.user_id === userId}
                    <button
                      class="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      on:click={() => deleteComment(comment.id)}
                      title="Eliminar comentario"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  {/if}
                </div>
              </div>
              <p class="text-white/80 whitespace-pre-wrap text-[0.95rem] leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>
