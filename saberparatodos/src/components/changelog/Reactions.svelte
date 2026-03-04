<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { supabase } from '../../lib/supabase';

  export let postSlug: string;

  const reactionEmojis = {
    'like': { icon: '👍', label: 'Me gusta' },
    'love': { icon: '❤️', label: 'Me encanta' },
    'celebrate': { icon: '🎉', label: 'Celebrar' }
  };

  type ReactionType = keyof typeof reactionEmojis;

  interface ReactionCounts {
    like: number;
    love: number;
    celebrate: number;
  }

  let counts: ReactionCounts = { like: 0, love: 0, celebrate: 0 };
  let myReactions: Record<string, boolean> = { like: false, love: false, celebrate: false };
  let userId: string | null = null;
  let isLoading = true;

  // Realtime channel
  let subscription: any;

  onMount(async () => {
    // 1. Initial State Load
    await fetchReactions();

    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        userId = session.user.id;
        fetchMyReactions();
      } else {
        userId = null;
        myReactions = { like: false, love: false, celebrate: false };
      }
    });

    // Request initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
       if (session?.user) {
         userId = session.user.id;
         fetchMyReactions();
       }
    });

    // 3. Setup Supabase Realtime
    subscription = supabase
      .channel(`public:changelog_reactions:${postSlug}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'changelog_reactions',
          filter: `post_slug=eq.${postSlug}`
        },
        (payload) => {
          // Simply refetch counts to ensure total accuracy on changes
          fetchReactions();
        }
      )
      .subscribe();

    return () => {
      authSub?.unsubscribe();
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  });

  async function fetchReactions() {
    try {
      // 1. Fetch total counts using a raw query approach or grouped approach
      // Due to RLS, everyone can read. We group counts on client for simplicity since volume is low per post.
      const { data, error } = await supabase
        .from('changelog_reactions')
        .select('reaction_type')
        .eq('post_slug', postSlug);

      if (error) throw error;

      const newCounts = { like: 0, love: 0, celebrate: 0 };
      if (data) {
        data.forEach(r => {
          if (newCounts[r.reaction_type as ReactionType] !== undefined) {
             newCounts[r.reaction_type as ReactionType]++;
          }
        });
      }
      counts = newCounts;
      isLoading = false;
    } catch (e) {
      console.error('Error fetching reactions:', e);
      isLoading = false;
    }
  }

  async function fetchMyReactions() {
    if (!userId) return;
    try {
      const { data, error } = await supabase
        .from('changelog_reactions')
        .select('reaction_type')
        .eq('post_slug', postSlug)
        .eq('user_id', userId);

      if (error) throw error;

      const newMyReactions = { like: false, love: false, celebrate: false };
      if (data) {
        data.forEach(r => {
           if (newMyReactions[r.reaction_type] !== undefined) {
              newMyReactions[r.reaction_type] = true;
           }
        });
      }
      myReactions = newMyReactions;
    } catch (e) {
      console.error('Error fetching user reactions:', e);
    }
  }

  async function toggleReaction(type: ReactionType) {
    if (!userId) {
      // Dispatch event to show login modal (AuthMessageBroker doesn't have a direct 'show modal' command,
      // but usually the app listens to these standard JS events or forces login link)
      window.dispatchEvent(new CustomEvent('require-auth'));
      alert("Debes iniciar sesión para reaccionar.");
      return;
    }

    const isReacted = myReactions[type];

    // Optimistic UI Update
    myReactions[type] = !isReacted;
    counts[type] += isReacted ? -1 : 1;

    try {
      if (isReacted) {
        // Delete reaction
        const { error } = await supabase
          .from('changelog_reactions')
          .delete()
          .match({ post_slug: postSlug, user_id: userId, reaction_type: type });

        if (error) throw error;
      } else {
        // Add reaction
        const { error } = await supabase
          .from('changelog_reactions')
          .insert({
             post_slug: postSlug,
             user_id: userId,
             reaction_type: type
          });

        // Suppress duplicate errors from UI fast-clicking
        if (error && error.code !== '23505') throw error;
      }
    } catch (e) {
      console.error('Error toggling reaction:', e);
      // Revert optimistic update on failure
      myReactions[type] = isReacted;
      counts[type] += isReacted ? 1 : -1;
    }
  }
</script>

<div class="flex flex-wrap items-center gap-3">
  <span class="text-sm font-medium text-white/50 mr-2">¿Qué te pareció?</span>

  {#if isLoading}
    <div class="animate-pulse flex gap-3">
      <div class="h-10 w-16 bg-white/5 rounded-full border border-white/10"></div>
      <div class="h-10 w-16 bg-white/5 rounded-full border border-white/10"></div>
      <div class="h-10 w-16 bg-white/5 rounded-full border border-white/10"></div>
    </div>
  {:else}
    {#each Object.entries(reactionEmojis) as [type, { icon, label }]}
      <button
        class="reaction-btn group {myReactions[type] ? 'active' : ''}"
        on:click={() => toggleReaction(type as ReactionType)}
        aria-label={label}
        title={label}
      >
        <span class="icon group-hover:scale-110 transition-transform duration-200">
          {icon}
        </span>
        <span class="count">
          {counts[type as ReactionType] || 0}
        </span>
      </button>
    {/each}
  {/if}
</div>

<style>
  .reaction-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(245, 245, 245, 0.7);
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .reaction-btn:hover {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  .reaction-btn.active {
    background-color: rgba(252, 209, 22, 0.15); /* #FCD116 with opacity */
    border-color: rgba(252, 209, 22, 0.4);
    color: #FCD116;
  }

  .icon {
    font-size: 1.125rem;
    line-height: 1;
  }

  .count {
    font-family: 'Fira Code', monospace;
    font-weight: 500;
  }
</style>
