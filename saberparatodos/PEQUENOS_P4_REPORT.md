# Reporte E2E Fase 4 (P4): Estantería 3D Pequeños (`pequenos-estanteria.spec.ts`)

**Fecha:** 2026-09-26  
**Estado de Ejecución:** **Pendiente de verificación por el orquestador (NO ejecutado localmente)**  
*(Nota: Conforme a las instrucciones dadas por sobrecarga en la máquina host, no se corrieron comandos de shell ni tests).*

---

## 1. Casos Cubiertos

Se implementaron los 3 casos en [`saberparatodos/tests/e2e/pequenos-estanteria.spec.ts`](saberparatodos/tests/e2e/pequenos-estanteria.spec.ts):

1. **Reduced Motion (`prefers-reduced-motion: reduce`) → Fallback accesible, sin 3D pegado**:
   - Emula media con `await page.emulateMedia({ reducedMotion: 'reduce' })`.
   - Navega a `/pequenos`.
   - Verifica que `.pequenos-shelf-3d` esté oculto (`toBeHidden()`), lo que comprueba que `status === 'unsupported'` y se activó la clase Tailwind `hidden`.
   - Verifica que la sección `[data-pequenos-fallback]` permanezca visible (`toBeVisible()`) y contenga enlaces operables (`a[href*="/leer/"]`).

2. **Sin Soporte WebGL (`getContext` interceptado) → Mismo resultado que reduced motion**:
   - Inyecta init script con `page.addInitScript(...)` interceptando `HTMLCanvasElement.prototype.getContext` para retornar `null` ante solicitudes `webgl` / `webgl2`.
   - Navega a `/pequenos`.
   - Verifica que `.pequenos-shelf-3d` esté oculto (`toBeHidden()`).
   - Verifica que `[data-pequenos-fallback]` esté visible con enlaces operables a los cuentos.

3. **Con Soporte Normal → El 3D toma el control**:
   - Navega a `/pequenos` en condiciones estándar.
   - Espera con timeout generoso (10000ms) a que `.pequenos-shelf-3d` esté visible (`toBeVisible()`), soportando el `import('three')` dinámico y el ciclo de vida de Svelte 5.
   - Espera con timeout de 10000ms a que `[data-pequenos-fallback]` reciba el atributo `hidden` y pase a `toBeHidden()`.
   - Verifica que el `<canvas>` esté presente y visible dentro de `.pequenos-shelf-3d`.

---

## 2. Inspección del Código Previa y Ajustes Realizados

Se inspeccionaron minuciosamente:
- [`EstanteriaCuentos.svelte`](saberparatodos/src/components/pequenos/EstanteriaCuentos.svelte)
- [`index.astro`](saberparatodos/src/pages/pequenos/index.astro)

**Conclusiones y Selectores:**
- **Selectores:**
  - El contenedor raíz en Svelte tiene `class="pequenos-shelf-3d ..."` con `class:hidden={status === 'unsupported'}`. Selector: `.pequenos-shelf-3d`.
  - La sección en `index.astro` tiene exactamente el atributo `data-pequenos-fallback`. Selector: `[data-pequenos-fallback]`.
  - Las tarjetas de cuentos en el grid tienen enlaces con la ruta `/cuentos/{slug}/leer/`. Selector: `a[href*="/leer/"]`.
  - El canvas dentro de la estantería existe como `<canvas bind:this={canvasEl} ...>`. Selector: `shelf3d.locator('canvas')`.
- **Timeouts:**
  - Se configuró `{ timeout: 10000 }` en las aserciones de visibilidad del caso 3 para mitigar variaciones de carga en compilación Vite/Astro y descarga asíncrona de Three.js.
- **Tipado TS en `addInitScript`:**
  - En el script inyectado se tiparon los argumentos (`(type: string, ...args: any[])`) para mantener TypeScript estricto sin alertas de linter.

---

## 3. Estado de Cambios y Git

- No se modificaron componentes ni páginas existentes (`EstanteriaCuentos.svelte` e `index.astro` intactos).
- No se hicieron operaciones `git add` ni `git commit`.
- Listo para ser validado por el orquestador cuando baje la carga de la máquina.
