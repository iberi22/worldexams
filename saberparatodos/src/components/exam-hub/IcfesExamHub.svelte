<script lang="ts">
  import FlashlightCard from '../FlashlightCard.svelte';

  let {
    grade,
    onStartArea,
    onStartSimulacro,
    onStartEnglish,
    onStartRanked,
    onChangeExam
  } = $props<{
    grade: number;
    onStartArea: (subject: string) => void;
    onStartSimulacro: () => void;
    onStartEnglish: () => void;
    onStartRanked?: () => void;
    onChangeExam: () => void;
  }>();

  const areas = [
    { id: 'matematicas', title: 'Matemáticas', icon: 'M', desc: 'Evalúa tus habilidades numéricas y de resolución de problemas' },
    { id: 'lectura_critica', title: 'Lectura Crítica', icon: 'L', desc: 'Comprensión y análisis de textos' },
    { id: 'sociales_ciudadanas', title: 'Sociales y Ciudadanas', icon: 'S', desc: 'Conocimientos sobre la sociedad y la ciudadanía' },
    { id: 'ciencias_naturales', title: 'Ciencias Naturales', icon: 'C', desc: 'Biología, física y química' }
  ];
</script>

<div class="icfes-exam-hub" data-testid="icfes-hub">
  <div class="header">
    <button class="back-btn" onclick={onChangeExam}>← Atrás</button>
    <h2>ICFES Saber {grade}</h2>
    <button class="change-btn" onclick={onChangeExam}>Cambiar tipo de examen</button>
  </div>

  <div class="areas-grid">
    {#each areas as area}
      <FlashlightCard
        onClick={() => onStartArea(area.id)}
      >
        <div class="p-4">
          <div class="text-2xl mb-2">{area.icon}</div>
          <h3 class="text-lg font-bold">{area.title}</h3>
          <p class="text-sm opacity-80">{area.desc}</p>
        </div>
      </FlashlightCard>
    {/each}

    <!-- Inglés is special as it offers two modes inside -->
    <div class="english-card card-wrapper">
      <FlashlightCard
        onClick={() => onStartArea('ingles')}
      >
        <div class="p-4">
          <div class="text-2xl mb-2">I</div>
          <h3 class="text-lg font-bold">Inglés</h3>
          <p class="text-sm opacity-80">Evalúa tu nivel de inglés. También puedes hacer un diagnóstico.</p>
        </div>
      </FlashlightCard>
      <button class="diagnostic-btn" onclick={onStartEnglish}>Diagnóstico CEFR</button>
    </div>
  </div>

  <div class="special-modes">
    <FlashlightCard
      onClick={onStartSimulacro}
    >
      <div class="p-4">
        <div class="text-2xl mb-2">📝</div>
        <h3 class="text-lg font-bold">Simulacro Completo</h3>
        <p class="text-sm opacity-80">Un examen que cubre todas las áreas</p>
      </div>
    </FlashlightCard>
    {#if onStartRanked}
      <FlashlightCard
        onClick={onStartRanked}
      >
        <div class="p-4">
          <div class="text-2xl mb-2">🏆</div>
          <h3 class="text-lg font-bold">Ranked</h3>
          <p class="text-sm opacity-80">Compite con otros estudiantes</p>
        </div>
      </FlashlightCard>
    {/if}
  </div>
</div>

<style>
  .icfes-exam-hub {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  .back-btn, .change-btn {
    padding: 0.5rem 1rem;
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    cursor: pointer;
  }
  .areas-grid, .special-modes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  .english-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .diagnostic-btn {
    padding: 0.5rem;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
</style>
