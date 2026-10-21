<script lang="ts">
  const steps = [
    { icon: '👥', title: 'Crea un grupo', text: 'Por ejemplo "11-A". Recibes un código de 6 letras para ese grupo.' },
    { icon: '🔑', title: 'Comparte el código', text: 'Tus estudiantes lo escriben en la app (o escanean el QR). No necesitan correo ni contraseña.' },
    { icon: '📊', title: 'Asigna y revisa', text: 'Crea tareas y mira los resultados por estudiante y asignatura. Descárgalos en CSV.' },
  ];
</script>

<section class="rounded-2xl border border-dashed border-amber-500/30 bg-amber-500/[0.04] p-5 sm:p-6" aria-labelledby="inst-empty-title">
  <h2 id="inst-empty-title" class="text-lg font-bold text-[#F5F5DC]">Así funciona, en 3 pasos</h2>
  <ol class="mt-4 grid gap-4 sm:grid-cols-3">
    {#each steps as step, i (step.title)}
      <li class="rounded-xl border border-white/10 bg-black/30 p-4">
        <div class="flex items-center gap-2">
          <span class="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-sm font-black text-black">{i + 1}</span>
          <span class="text-xl" aria-hidden="true">{step.icon}</span>
        </div>
        <h3 class="mt-3 text-sm font-bold text-white">{step.title}</h3>
        <p class="mt-1 text-xs leading-relaxed text-white/60">{step.text}</p>
      </li>
    {/each}
  </ol>
</section>
