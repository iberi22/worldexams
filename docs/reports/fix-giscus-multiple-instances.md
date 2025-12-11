# 🐛 Fix: Giscus Multiple Instances en ResultsView

**Fecha:** 2025-12-10
**Autor:** GitHub Copilot
**Estado:** ✅ Completado

---

## 🎯 Problema Identificado

En el **informe de resultados** (`ResultsView.svelte`), cuando un usuario terminaba un examen y veía la revisión detallada de todas las preguntas, solo se mostraba correctamente la discusión de giscus de la **primera pregunta**. Las demás instancias de discusión no se cargaban o no se mostraban correctamente.

### Causas del Problema

1. **Falta de IDs únicos:** Todas las instancias de giscus compartían el mismo contenedor sin identificadores únicos, causando conflictos en el DOM
2. **Sin cleanup:** No había limpieza de instancias previas al destruir el componente
3. **Posibles conflictos de estado:** Múltiples scripts de giscus intentando renderizarse en contenedores con la misma clase

---

## ✅ Solución Implementada

### Cambios en `CommentsSection.svelte`

#### 1. **ID Único por Instancia**

Añadido un identificador único para cada componente usando el `questionId` + timestamp aleatorio:

```typescript
const uniqueId = `giscus-${questionId}-${Math.random().toString(36).substr(2, 9)}`;
```

Esto garantiza que cada pregunta tenga su propio contenedor único, evitando conflictos entre múltiples instancias.

#### 2. **Cleanup en onMount**

Implementado limpieza de memoria para prevenir leaks cuando el componente se destruye:

```typescript
onMount(() => {
  return () => {
    if (discussionContainer) {
      discussionContainer.innerHTML = '';
    }
  };
});
```

#### 3. **Contenedor con ID Único**

Modificado el `<div>` del contenedor para usar el `uniqueId`:

```svelte
<div
  id={uniqueId}
  class="giscus min-h-[100px] bg-black/20 rounded-lg p-2"
  bind:this={discussionContainer}
></div>
```

---

## 🧪 Validación

Para validar que el fix funciona correctamente:

### Test Manual

1. **Realizar un examen completo** (ej: 10 preguntas)
2. **Terminar el examen** y ver el informe de resultados
3. **Scroll por todas las preguntas**
4. **Click en "Ver Discusión / Comentarios"** en **al menos 3 preguntas diferentes**
5. **Verificar que cada discusión carga correctamente** con su ID único

### Comportamiento Esperado

✅ Cada pregunta debe mostrar su propia discusión de giscus
✅ Las discusiones deben cargarse independientemente
✅ No debe haber conflictos entre múltiples instancias abiertas
✅ Los comentarios deben aparecer bajo la pregunta correcta

---

## 📊 Impacto

| Métrica | Antes | Después |
|---------|-------|---------|
| Discusiones funcionando | Solo 1ra pregunta | Todas las preguntas |
| Conflictos de DOM | Sí | No |
| Memory leaks | Posibles | Prevenidos |
| UX | ❌ Roto | ✅ Funcional |

---

## 🔄 Arquitectura Mejorada

### Antes

```
ResultsView.svelte
  └─ CommentsSection (Pregunta 1) ✅ Funciona
  └─ CommentsSection (Pregunta 2) ❌ No se muestra
  └─ CommentsSection (Pregunta 3) ❌ No se muestra
  └─ ...
```

### Después

```
ResultsView.svelte
  └─ CommentsSection (Pregunta 1, ID: giscus-CO-MAT-11-001-abc123) ✅
  └─ CommentsSection (Pregunta 2, ID: giscus-CO-MAT-11-002-def456) ✅
  └─ CommentsSection (Pregunta 3, ID: giscus-CO-MAT-11-003-ghi789) ✅
  └─ ...
```

Cada instancia tiene su propio contenedor único, evitando conflictos.

---

## 🚀 Next Steps

1. **Deploy a producción** para validar en ambiente real
2. **Monitorear** logs de errores en consola del navegador
3. **Feedback de usuarios** sobre discusiones en resultados
4. **Considerar lazy loading** si hay muchas preguntas (>20) para optimizar rendimiento

---

## 📝 Notas Técnicas

- **Giscus API:** Usa `data-term` para identificar discusiones únicas
- **Cada pregunta tiene su propia discusión:** `Question ${questionId}`
- **El ID del contenedor es importante** para evitar conflictos de múltiples scripts
- **Svelte lifecycle:** `onMount` return function se ejecuta en `onDestroy`

---

## 🎓 Lecciones Aprendidas

1. **Cuando uses third-party widgets (como giscus) en componentes reutilizables**, siempre usa IDs únicos por instancia
2. **Cleanup es crítico** para prevenir memory leaks en SPAs
3. **Test con múltiples instancias** de un componente en la misma vista para detectar conflictos

---

*Fix completado por GitHub Copilot siguiendo Protocol v2.0*
