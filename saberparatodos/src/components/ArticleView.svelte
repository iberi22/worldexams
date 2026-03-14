<script lang="ts">
  import AdBanner from './AdBanner.svelte';
  import MathRenderer from './MathRenderer.svelte';
  import QuestionVersionCarousel from './QuestionVersionCarousel.svelte';
  import type { Question } from '../types';
  import CommentsSection from './CommentsSection.svelte';
  import { onMount } from 'svelte';
  import { getUser } from '../lib/auth';
  import type { User } from '@supabase/supabase-js';
  import { getVideoMeta, getVideoManifestDefaults, type VideoManifestEntry } from '../lib/video-manifest';

  // Props
  export let question: Question;
  export let versions: Question[] = []; // Optional: all versions of this bundle
  export let onBack: () => void;

  let user: User | null = null;
  let videoMeta: VideoManifestEntry | null = null;
  let videoDefaults: { youtube_channel_url?: string; instagram_url?: string; tiktok_url?: string } = {};

  async function hydrateVideoMeta(questionId: string | number | undefined) {
    if (!questionId) {
      videoMeta = null;
      return;
    }
    const resolved = await getVideoMeta(String(questionId));
    videoMeta = resolved.entry || null;
  }

  // Determine if we should show carousel (when multiple versions are available)
  $: showCarousel = versions.length > 1;
  $: bundleId = question.bundleId || question.category.split(' :: ')[1] || '';

  onMount(async () => {
    user = await getUser();
    videoDefaults = await getVideoManifestDefaults();
    const { data: { subscription } } = await import('../lib/supabase').then(m => m.supabase.auth.onAuthStateChange((_event, session) => {
      user = session?.user ?? null;
    }));
    await hydrateVideoMeta(question?.id);
    return () => subscription.unsubscribe();
  });

  $: if (question?.id) {
    void hydrateVideoMeta(question.id);
  }
</script>

{#if showCarousel}
  <!-- Version Carousel Mode -->
  <QuestionVersionCarousel
    {versions}
    bundleId={bundleId}
    {onBack}
  />
{:else}
  <!-- Single Question Mode (original view) -->
  <div class="w-full max-w-4xl mx-auto p-4 animate-fade-in-up pb-20">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <button
          on:click={onBack}
          class="px-4 py-2 border border-white/20 hover:bg-white/10 transition-colors uppercase text-xs tracking-widest opacity-60 hover:opacity-100"
        >
          [ Volver al Blog ]
        </button>
        <div class="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">
          {question.category}
        </div>
      </div>

      <div class="flex flex-wrap justify-end gap-4 text-[10px] uppercase tracking-widest text-white/40 border-b border-white/10 pb-4">
        <span class="bg-white/5 px-2 py-1 rounded">ID: {question.id}</span>
        <span class="bg-white/5 px-2 py-1 rounded">Grado: {question.grade}°</span>
        <span class="bg-white/5 px-2 py-1 rounded">Nivel: {question.difficulty}</span>
        {#if bundleId}
          <span class="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded">Bundle: {bundleId}</span>
        {/if}
      </div>
    </div>

    <!-- Article Content -->
    <article class="prose prose-invert prose-lg max-w-none">
      <div class="text-3xl md:text-4xl font-bold mb-8 leading-tight text-[#F5F5DC]">
        <MathRenderer content={question.text} />
      </div>

      <div class="bg-[#1E1E1E]/50 border border-white/10 p-6 rounded-lg mb-8">
        <h3 class="text-sm font-bold uppercase tracking-widest opacity-60 mb-4">Opciones de Respuesta</h3>
        <ul class="space-y-4">
          {#each question.options as option}
            <li class="flex items-start space-x-4">
              <span class={`font-bold ${option.id === question.correctOptionId ? 'text-emerald-500' : 'text-white/40'}`}>
                {option.id})
              </span>
              <span class={option.id === question.correctOptionId ? 'text-emerald-500' : 'text-[#F5F5DC]/80'}>
                <MathRenderer content={option.text} />
              </span>
            </li>
          {/each}
        </ul>
      </div>

      {#if question.explanation}
        <div class="mb-12">
          <h3 class="text-xl font-bold text-emerald-500 mb-4">Explicación Detallada</h3>
          <div class="text-[#F5F5DC]/80 leading-relaxed whitespace-pre-line">
            <MathRenderer content={question.explanation} />
          </div>
        </div>
      {/if}

      <div class="mb-12 bg-red-500/10 border border-red-500/20 p-5 rounded-xl">
        <h3 class="text-xl font-bold text-red-300 mb-4">Explicación en Video</h3>
        {#if true}
          {@const youtubeTarget = videoMeta?.youtube_url || videoDefaults.youtube_channel_url}
          {#if youtubeTarget}
            <div class="flex flex-wrap items-center gap-3">
              <a
                href={youtubeTarget}
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
              >
                {videoMeta?.youtube_url ? 'Ver en YouTube' : 'Ver Canal en YouTube'}
              </a>
              {#if videoMeta?.instagram_url || videoDefaults.instagram_url}
                <a
                  href={videoMeta?.instagram_url || videoDefaults.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-4 py-2 bg-pink-600/80 hover:bg-pink-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                >
                  Instagram
                </a>
              {/if}
              {#if videoMeta?.tiktok_url || videoDefaults.tiktok_url}
                <a
                  href={videoMeta?.tiktok_url || videoDefaults.tiktok_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-4 py-2 bg-black/70 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-white/20 transition-colors"
                >
                  TikTok
                </a>
              {/if}
            </div>
          {:else}
            <p class="text-sm text-white/60">Video en generación para esta pregunta.</p>
          {/if}
        {/if}
      </div>
    </article>

    <!-- Ads & Support -->
    <AdBanner {user} className="my-12" />

    <!-- Comments -->
    <CommentsSection questionId={question.id} />
  </div>
{/if}

