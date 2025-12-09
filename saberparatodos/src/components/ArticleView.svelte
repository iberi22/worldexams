<script lang="ts">
  import AdBanner from './AdBanner.svelte';
  import type { Question } from '../types';
  import CommentsSection from './CommentsSection.svelte';
  import { onMount } from 'svelte';
  import { getUser } from '../lib/auth';
  import type { User } from '@supabase/supabase-js';

  export let question: Question;
  export let onBack: () => void;

  let user: User | null = null;

  onMount(async () => {
    user = await getUser();
    const { data: { subscription } } = await import('../lib/supabase').then(m => m.supabase.auth.onAuthStateChange((_event, session) => {
      user = session?.user ?? null;
    }));
    return () => subscription.unsubscribe();
  });

  function getOptionText(q: Question, optionId: string) {
    const opt = q.options.find(o => o.id === optionId);
    return opt ? opt.text : '';
  }
</script>

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
    </div>
  </div>

  <!-- Article Content -->
  <article class="prose prose-invert prose-lg max-w-none">
    <h1 class="text-3xl md:text-4xl font-bold mb-8 leading-tight text-[#F5F5DC]">
      {question.text}
    </h1>

    <div class="bg-[#1E1E1E]/50 border border-white/10 p-6 rounded-lg mb-8">
      <h3 class="text-sm font-bold uppercase tracking-widest opacity-60 mb-4">Opciones de Respuesta</h3>
      <ul class="space-y-4">
        {#each question.options as option}
          <li class="flex items-start space-x-4">
            <span class={`font-bold ${option.id === question.correctOptionId ? 'text-emerald-500' : 'text-white/40'}`}>
              {option.id})
            </span>
            <span class={option.id === question.correctOptionId ? 'text-emerald-500' : 'text-[#F5F5DC]/80'}>
              {option.text}
            </span>
          </li>
        {/each}
      </ul>
    </div>

    {#if question.explanation}
      <div class="mb-12">
        <h3 class="text-xl font-bold text-emerald-500 mb-4">Explicación Detallada</h3>
        <p class="text-[#F5F5DC]/80 leading-relaxed whitespace-pre-line">
          {question.explanation}
        </p>
      </div>
    {/if}
  </article>

  <!-- Ads & Support -->
  <AdBanner {user} className="my-12" />

  <!-- Comments -->
  <CommentsSection questionId={question.id} />
</div>
