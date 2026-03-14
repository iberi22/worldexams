<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { supabase } from '../../lib/supabase';
  import CommentItem from './CommentItem.svelte';

  export let postSlug: string;

  interface CommentData {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    parent_id: string | null;
    profiles?: {
      email?: string;
      displayName?: string;
    };
    replies?: CommentData[];
  }

  let rawComments: CommentData[] = [];
  let rootComments: CommentData[] = [];
  let newCommentText: string = "";
  let isSubmitting = false;
  let isLoading = true;

  let userId: string | null = null;
  let userEmail: string | null = null;

  let replyingToId: string | null = null;
  let replyText: string = "";

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
      const { data, error } = await supabase
        .from('changelog_comments')
        .select('*')
        .eq('post_slug', postSlug)
        .order('created_at', { ascending: true });

      if (error) throw error;
      rawComments = data as CommentData[];
      groupComments();
      isLoading = false;
    } catch (e) {
      console.error('Error fetching comments:', e);
      isLoading = false;
    }
  }

  function groupComments() {
    const map: Record<string, CommentData> = {};
    const roots: CommentData[] = [];

    // First pass: create map
    rawComments.forEach(c => {
      map[c.id] = { ...c, replies: [] };
    });

    // Second pass: attach to parents
    rawComments.forEach(c => {
      if (c.parent_id && map[c.parent_id]) {
        map[c.parent_id].replies?.push(map[c.id]);
      } else {
        roots.push(map[c.id]);
      }
    });

    // Root comments order: newest first
    rootComments = roots.reverse();
  }

  async function addComment(parentId: string | null = null) {
    const text = parentId ? replyText : newCommentText;
    if (!text.trim()) return;
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
          content: text.trim(),
          parent_id: parentId
        });

      if (error) throw error;

      if (parentId) {
        replyText = "";
        replyingToId = null;
      } else {
        newCommentText = "";
      }
    } catch (e: any) {
      console.error('Error posting comment:', e);
      alert('Hubo un error al publicar el comentario: ' + e.message);
    } finally {
      isSubmitting = false;
    }
  }

  async function deleteComment(commentId: string) {
    if (!confirm('¿Seguro de borrar este mensaje?')) return;
    try {
      const { error } = await supabase
        .from('changelog_comments')
        .delete()
        .match({ id: commentId, user_id: userId });
      if (error) throw error;
      fetchComments();
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
    if (interval > 1) return Math.floor(interval) + " d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " m";
    if (seconds < 10) return "justo ahora";
    return Math.floor(seconds) + " s";
  }

  function toggleReply(id: string) {
    if (replyingToId === id) {
      replyingToId = null;
    } else {
      replyingToId = id;
      replyText = "";
    }
  }
</script>

<div class="mt-8">
  <h3 class="text-xl font-bold text-[#F5F5DC] mb-6 flex items-center gap-2">
    Comentarios
    <span class="bg-white/10 text-xs px-2 py-0.5 rounded-full text-white/70">
      {rawComments.length}
    </span>
  </h3>

  <!-- Main Input -->
  {#if userId}
    <div class="mb-10 bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 focus-within:border-[#FCD116]/30 transition-colors shadow-lg shadow-black/20">
      <div class="flex gap-4">
        <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FCD116] to-yellow-600 flex-shrink-0 flex items-center justify-center text-black font-bold text-lg leading-none shadow-inner pt-1">
          {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
        </div>
        <div class="flex-1">
          <textarea
            bind:value={newCommentText}
            placeholder="Añade tu comentario o pregunta sobre esta actualización..."
            class="w-full bg-transparent text-[#F5F5DC] placeholder-white/30 border border-white/10 rounded-lg p-3 min-h-[80px] resize-y focus:outline-none focus:border-[#FCD116]/50 focus:bg-white/[0.02] transition-all font-sans text-sm md:text-base"
          ></textarea>
          <div class="mt-3 flex justify-end">
            <button
              on:click={() => addComment(null)}
              disabled={isSubmitting || !newCommentText.trim()}
              class="px-5 py-2 bg-[#FCD116] hover:bg-yellow-400 text-black font-bold rounded-lg text-sm transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
            >
              {#if isSubmitting && !replyingToId}
                <svg class="animate-spin h-3 w-3 text-black" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Publicando...
              {:else}
                Publicar
              {/if}
            </button>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="mb-10 bg-white/5 border border-dashed border-white/10 rounded-xl p-8 text-center">
      <p class="text-white/50 mb-4 text-sm">Inicia sesión para unirte a la conversación.</p>
      <a href="/login" class="inline-block px-6 py-2 border border-white/20 hover:bg-white/10 hover:border-white/30 font-bold rounded-lg text-white text-sm transition-all">
        Acceder
      </a>
    </div>
  {/if}

  <!-- Threaded Comments -->
  <div class="space-y-8">
    {#if isLoading}
      <div class="animate-pulse space-y-6">
        {#each Array(2) as _}
          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-full bg-white/10 flex-shrink-0"></div>
            <div class="flex-1 space-y-3 py-1">
              <div class="h-4 bg-white/10 rounded w-1/4"></div>
              <div class="h-4 bg-white/10 rounded w-3/4"></div>
            </div>
          </div>
        {/each}
      </div>
    {:else if rootComments.length === 0}
      <div class="text-center py-16 border border-white/5 border-dashed rounded-2xl bg-white/[0.01]">
        <svg class="mx-auto h-12 w-12 text-white/10 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        <p class="text-white/40 text-sm">No hay comentarios todavía. ¡Comparte tu opinión!</p>
      </div>
    {:else}
      {#each rootComments as comment (comment.id)}
        <div class="space-y-4">
          <CommentItem
            {comment}
            {userId}
            {replyingToId}
            {isSubmitting}
            {replyText}
            on:reply={(e) => toggleReply(e.detail)}
            on:delete={(e) => deleteComment(e.detail)}
            on:submitReply={() => addComment(comment.id)}
            on:updateReplyText={(e) => replyText = e.detail}
          />

          {#if comment.replies && comment.replies.length > 0}
            <div class="ml-10 md:ml-14 space-y-4 border-l-2 border-white/5 pl-6">
              {#each comment.replies as reply (reply.id)}
                <CommentItem
                  comment={reply}
                  {userId}
                  {replyingToId}
                  {isSubmitting}
                  {replyText}
                  isReply={true}
                  on:reply={(e) => toggleReply(e.detail)}
                  on:delete={(e) => deleteComment(e.detail)}
                  on:submitReply={() => addComment(reply.id)}
                  on:updateReplyText={(e) => replyText = e.detail}
                />
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  /* Custom scrollbar for textarea */
  textarea::-webkit-scrollbar {
    width: 6px;
  }
  textarea::-webkit-scrollbar-track {
    background: transparent;
  }
  textarea::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
</style>
