<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  // Props
  export let questionId: string;
  export let questionText: string = '';
  export let bundleId: string = '';

  // State
  let showReportModal = false;
  let reportType: 'error' | 'improvement' | 'new_question' | null = null;
  let reportDescription = '';
  let isSubmitting = false;
  let submitted = false;

  // Voting state (stored per question in localStorage)
  let userVote: 'up' | 'down' | null = null;

  // Load existing vote
  $: {
    if (typeof window !== 'undefined') {
      const votes = JSON.parse(localStorage.getItem('openicfes_votes') || '{}');
      userVote = votes[questionId] || null;
    }
  }

  function handleVote(vote: 'up' | 'down') {
    if (typeof window === 'undefined') return;

    const votes = JSON.parse(localStorage.getItem('openicfes_votes') || '{}');

    if (userVote === vote) {
      // Remove vote
      delete votes[questionId];
      userVote = null;
    } else {
      // Set new vote
      votes[questionId] = vote;
      userVote = vote;
    }

    localStorage.setItem('openicfes_votes', JSON.stringify(votes));
    dispatch('vote', { questionId, vote: userVote });
  }

  function openReportModal(type: 'error' | 'improvement' | 'new_question') {
    reportType = type;
    showReportModal = true;
    reportDescription = '';
  }

  function closeReportModal() {
    showReportModal = false;
    reportType = null;
    reportDescription = '';
  }

  async function submitReport() {
    if (!reportDescription.trim() || !reportType) return;

    isSubmitting = true;

    // Build GitHub issue URL
    const issueLabels = {
      'error': 'bug,question-error',
      'improvement': 'enhancement,question-improvement',
      'new_question': 'new-question,community-contribution'
    };

    const issueTitle = {
      'error': `[Error] Pregunta ${questionId}`,
      'improvement': `[Mejora] Pregunta ${questionId}`,
      'new_question': `[Nueva Pregunta] Propuesta de la comunidad`
    };

    const issueBody = `
## 📝 Reporte de la Comunidad

**Tipo:** ${reportType === 'error' ? '🐛 Error en pregunta' : reportType === 'improvement' ? '💡 Sugerencia de mejora' : '✨ Nueva pregunta propuesta'}

**ID de Pregunta:** \`${questionId}\`
**Bundle:** \`${bundleId || 'N/A'}\`

### Descripción
${reportDescription}

### Contexto de la Pregunta
> ${questionText.substring(0, 200)}${questionText.length > 200 ? '...' : ''}

---
*Reportado desde OpenIcfes App*
*Fecha: ${new Date().toISOString()}*
    `.trim();

    const issueUrl = `https://github.com/iberi22/saberparatodos/issues/new?` + new URLSearchParams({
      title: issueTitle[reportType],
      body: issueBody,
      labels: issueLabels[reportType]
    }).toString();

    // Open in new tab
    window.open(issueUrl, '_blank');

    submitted = true;
    isSubmitting = false;

    setTimeout(() => {
      closeReportModal();
      submitted = false;
    }, 2000);
  }

  const reportOptions = [
    { type: 'error' as const, icon: '🐛', label: 'Reportar Error', desc: 'Respuesta incorrecta, typo, etc.' },
    { type: 'improvement' as const, icon: '💡', label: 'Sugerir Mejora', desc: 'Mejor explicación, más claridad' },
    { type: 'new_question' as const, icon: '✨', label: 'Proponer Pregunta', desc: 'Contribuye al banco de preguntas' }
  ];
</script>

<div class="flex items-center gap-4">
  <!-- Voting Buttons -->
  <div class="flex items-center gap-1">
    <button
      on:click={() => handleVote('up')}
      class={`p-2 rounded-lg transition-all ${
        userVote === 'up'
          ? 'bg-emerald-500/20 text-emerald-400'
          : 'text-white/30 hover:text-emerald-400 hover:bg-white/5'
      }`}
      title="Buena pregunta"
    >
      <svg class="w-5 h-5" fill={userVote === 'up' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    </button>
    <button
      on:click={() => handleVote('down')}
      class={`p-2 rounded-lg transition-all ${
        userVote === 'down'
          ? 'bg-red-500/20 text-red-400'
          : 'text-white/30 hover:text-red-400 hover:bg-white/5'
      }`}
      title="Pregunta mejorable"
    >
      <svg class="w-5 h-5" fill={userVote === 'down' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
      </svg>
    </button>
  </div>

  <!-- Report/Feedback Button -->
  <div class="relative">
    <button
      on:click={() => showReportModal = true}
      class="flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-widest text-white/40 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-all"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
      Feedback
    </button>
  </div>
</div>

<!-- Report Modal -->
{#if showReportModal}
  <div
    class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    on:click|self={closeReportModal}
    transition:fade={{ duration: 200 }}
  >
    <div
      class="w-full max-w-lg bg-[#1a1a1a] border border-emerald-500/30 rounded-2xl overflow-hidden"
      in:fly={{ y: 20, duration: 300 }}
    >
      <!-- Modal Header -->
      <div class="p-4 sm:p-6 border-b border-white/10">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold uppercase tracking-widest text-emerald-500">
            {reportType ? reportOptions.find(r => r.type === reportType)?.label : 'Enviar Feedback'}
          </h3>
          <button
            on:click={closeReportModal}
            class="p-2 text-white/40 hover:text-white transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="p-4 sm:p-6">
        {#if !reportType}
          <!-- Type Selection -->
          <p class="text-sm text-white/60 mb-4">¿Qué tipo de feedback quieres enviar?</p>
          <div class="grid gap-3">
            {#each reportOptions as option}
              <button
                on:click={() => reportType = option.type}
                class="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-xl transition-all text-left group"
              >
                <span class="text-2xl">{option.icon}</span>
                <div>
                  <p class="font-bold text-white group-hover:text-emerald-400">{option.label}</p>
                  <p class="text-xs text-white/40">{option.desc}</p>
                </div>
              </button>
            {/each}
          </div>
        {:else if submitted}
          <!-- Success State -->
          <div class="text-center py-8">
            <div class="text-4xl mb-4">✅</div>
            <p class="text-emerald-500 font-bold">¡Gracias por tu feedback!</p>
            <p class="text-xs text-white/40 mt-2">Se abrirá GitHub para completar el reporte</p>
          </div>
        {:else}
          <!-- Report Form -->
          <div class="space-y-4">
            <div class="p-3 bg-white/5 rounded-lg">
              <p class="text-[10px] uppercase tracking-widest text-white/40 mb-1">Pregunta</p>
              <p class="text-sm text-white/80 line-clamp-2">{questionText}</p>
              <p class="text-[10px] text-white/30 mt-1">ID: {questionId}</p>
            </div>

            <div>
              <label class="block text-xs uppercase tracking-widest text-white/40 mb-2">
                Descripción del {reportType === 'error' ? 'error' : reportType === 'improvement' ? 'cambio sugerido' : 'contenido propuesto'}
              </label>
              <textarea
                bind:value={reportDescription}
                placeholder={
                  reportType === 'error'
                    ? 'Describe el error encontrado...'
                    : reportType === 'improvement'
                    ? 'Describe cómo mejorarías esta pregunta...'
                    : 'Escribe tu propuesta de pregunta con opciones y respuesta correcta...'
                }
                class="w-full h-32 bg-[#121212] border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none resize-none"
              ></textarea>
            </div>

            <div class="flex gap-3">
              <button
                on:click={() => reportType = null}
                class="flex-1 px-4 py-3 border border-white/20 hover:bg-white/10 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors"
              >
                Atrás
              </button>
              <button
                on:click={submitReport}
                disabled={!reportDescription.trim() || isSubmitting}
                class="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/30 disabled:cursor-not-allowed text-black font-bold uppercase tracking-widest text-sm rounded-lg transition-colors"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar a GitHub'}
              </button>
            </div>

            <p class="text-[10px] text-white/30 text-center">
              Se abrirá GitHub para crear un Issue. Necesitas cuenta de GitHub.
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
