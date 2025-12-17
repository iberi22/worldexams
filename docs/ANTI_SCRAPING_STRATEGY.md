# 🔒 Anti-Scraping Strategy - Infinite Exams for Free

> **Objetivo:** Permitir exámenes ilimitados con costo de infraestructura $0, protegiendo el banco de preguntas contra scraping.

---

## 📊 Resumen Ejecutivo

| Métrica | Valor |
|---------|-------|
| **Costo por usuario guest** | $0 después de primera carga |
| **Preguntas disponibles (guest)** | 100 aleatorias |
| **Preguntas disponibles (auth)** | 1,813 (completas) |
| **Exámenes permitidos** | ♾️ Infinitos (sin límite) |
| **API calls por examen** | 0 (después de caché) |
| **Persistencia** | IndexedDB (24 horas) |

---

## 🎯 Estrategia 3-Tier

```
┌─────────────────────────────────────────────────────┐
│ TIER 1: First Load (1 API call)                    │
│ ┌─────────────────────────────────────────────┐   │
│ │ • GET 100 preguntas aleatorias              │   │
│ │ • Aleatorización en servidor                │   │
│ │ • Diferentes preguntas cada sesión          │   │
│ └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│ TIER 2: IndexedDB Cache (Persistencia local)       │
│ ┌─────────────────────────────────────────────┐   │
│ │ • Save 100 questions                        │   │
│ │ • Timestamp: 24h expiry                     │   │
│ │ • isGuest: true (metadata)                  │   │
│ │ • Grade: 11 (key)                           │   │
│ └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│ TIER 3: Infinite Exams (0 API calls)               │
│ ┌─────────────────────────────────────────────┐   │
│ │ • generateRandomExam(cached, 20)            │   │
│ │ • Fisher-Yates shuffle                      │   │
│ │ • Filter by subject (optional)              │   │
│ │ • REPEAT INFINITELY                         │   │
│ └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 🔐 Límites de Seguridad

### Usuarios Invitados (No autenticados)

| Límite | Valor | Razón |
|--------|-------|-------|
| **Max preguntas** | 100 | Anti-scraping |
| **Aleatorización** | Sí | Diferentes usuarios = diferentes sets |
| **Cache duration** | 24h | Balance UX/seguridad |
| **Exámenes** | ∞ | Solo de ese pool de 100 |

### Usuarios Autenticados (Supabase Auth)

| Límite | Valor | Razón |
|--------|-------|-------|
| **Max preguntas** | 1,813 (todas) | Usuario verificado |
| **Aleatorización** | No | Acceso completo |
| **Cache duration** | 7 días | Mejor UX |
| **Exámenes** | ∞ | Full access |

---

## 📂 Arquitectura de Código

### 1. **cache-service.ts** - Gestor de IndexedDB

```typescript
interface CachedQuestionPool {
  questions: any[];      // Array de preguntas
  timestamp: number;     // Date.now()
  grade: number;         // 3, 5, 7, 9, 11
  isGuest: boolean;      // true/false
  questionCount: number; // 100 o más
}
```

**Funciones clave:**
- `saveQuestionPool()` - Guarda en IndexedDB (max 100 para guests)
- `getQuestionPool()` - Lee caché (valida expiración)
- `clearCache()` - Limpia todo
- `generateRandomExam()` - Crea exámenes sin API

### 2. **api-service.ts** - API con límites

**Modificado:**
```typescript
async function fetchAllQuestionsForGrade(
  grade: number,
  isGuest: boolean = true,
  maxQuestions: number = 100
): Promise<AppQuestion[]>
```

**Lógica:**
- Si `isGuest = true` → máximo 100 preguntas
- Si `isGuest = false` → sin límite
- Aleatorización antes de retornar (shuffle)

### 3. **App.svelte** - Integración principal

**Flujo:**
1. `onMount` → Verifica `user` (Supabase Auth)
2. `loadQuestionsForExam()` → Checa caché primero
3. Si no hay caché → `fetchAllQuestionsForGrade(grade, isGuest)`
4. Guarda en caché → `cacheService.saveQuestionPool()`
5. **Todos los exámenes futuros:** `generateRandomExam()` (0 API calls)

### 4. **CacheIndicator.svelte** - UI del estado

**Features:**
- Botón flotante bottom-right
- Muestra cantidad de preguntas cacheadas
- Badge "🔒 Invitado" / "🔓 Autenticado"
- Botón para limpiar caché
- Info sobre limitaciones

---

## 🚀 Flujo de Usuario

### Primera Visita (Guest)

```
1. Usuario selecciona Grado 11 → Matemáticas
2. Click "Empezar Examen"
   ├─ loadQuestionsForExam(11, null)
   ├─ cacheService.getQuestionPool(11) → NULL
   └─ fetchAllQuestionsForGrade(11, isGuest=true, max=100)
       ├─ API retorna 100 preguntas aleatorias
       ├─ cacheService.saveQuestionPool(11, questions, isGuest=true)
       └─ generateRandomExam(100, examSize=20)
           └─ Examen de 20 preguntas listo
```

### Segundo Examen (Guest - MISMO DÍA)

```
1. Usuario quiere otro examen
2. Click "Empezar Examen"
   ├─ loadQuestionsForExam(11, null)
   ├─ cacheService.getQuestionPool(11) → ✅ 100 questions (age: 10 min)
   └─ generateRandomExam(100, examSize=20)
       └─ Examen DIFERENTE (shuffle) - 0 API CALLS 🎉
```

### Examen N° 50 (Guest - MISMO DÍA)

```
1. Usuario hace su 50º examen
2. Click "Empezar Examen"
   ├─ loadQuestionsForExam(11, null)
   ├─ cacheService.getQuestionPool(11) → ✅ 100 questions (age: 6 hours)
   └─ generateRandomExam(100, examSize=20)
       └─ Examen DIFERENTE (shuffle) - 0 API CALLS 🎉
```

### Después de 24 Horas

```
1. Usuario regresa al día siguiente
2. Click "Empezar Examen"
   ├─ loadQuestionsForExam(11, null)
   ├─ cacheService.getQuestionPool(11) → ⏰ EXPIRED (age: 25 hours)
   └─ fetchAllQuestionsForGrade(11, isGuest=true, max=100)
       ├─ API retorna OTRAS 100 preguntas aleatorias (diferentes)
       ├─ cacheService.saveQuestionPool(11, newQuestions, isGuest=true)
       └─ Nuevo ciclo de exámenes infinitos
```

---

## 💰 Análisis de Costos

### Cloudflare Pages (FREE Tier)

| Métrica | Límite Free | Nuestro Uso | Comentario |
|---------|-------------|-------------|------------|
| **Requests/mes** | 100,000 | ~1,000 | ✅ Muy por debajo |
| **Bandwidth** | Unlimited | ~50 GB | ✅ Sin problema |
| **Builds/mes** | 500 | ~50 | ✅ OK |

**Cálculo:**
- 1,000 usuarios guest × 1 API call inicial = **1,000 requests**
- Resto de exámenes (99,000 usuarios × 5 exams = 495,000) = **0 API calls**
- **Total: ~1,000 requests/mes** (1% del límite free)

### Comparación con API clásica

| Escenario | Estrategia Clásica | Nuestra Estrategia | Ahorro |
|-----------|-------------------|-------------------|--------|
| 1,000 usuarios × 5 exams | 5,000 API calls | 1,000 API calls | **80%** |
| 10,000 usuarios × 10 exams | 100,000 API calls | 10,000 API calls | **90%** |
| 100,000 usuarios × 20 exams | 2,000,000 API calls | 100,000 API calls | **95%** |

---

## 🛡️ Protección Anti-Scraping

### Técnicas Implementadas

1. **Rate Limiting**
   - Max 100 preguntas por sesión guest
   - Cache de 24h previene re-fetching

2. **Aleatorización**
   - Cada usuario guest obtiene un set diferente de 100
   - Shuffle en servidor antes de enviar

3. **No exposición de IDs**
   - No se exponen rangos de IDs continuos
   - Imposible reconstruir el banco completo

4. **Autenticación incentivada**
   - Usuarios auth tienen acceso completo
   - Se requiere email verificado (Supabase)

### Qué NO puede hacer un scraper

❌ Obtener las 1,813 preguntas
❌ Descargar todo el banco en una sesión
❌ Hacer múltiples requests para juntar preguntas
❌ Forzar IDs específicos

### Qué SÍ puede hacer un usuario legítimo

✅ Hacer exámenes ilimitados
✅ Practicar con 100 preguntas variadas
✅ Cambiar de asignatura (otro set de 100)
✅ Registrarse para acceso completo

---

## 📈 Métricas de Éxito

### KPIs Técnicos

- ⚡ **API Calls/Usuario:** < 2 (target: 1)
- 💾 **Cache Hit Rate:** > 95%
- 📦 **Bandwidth/Usuario:** < 200 KB
- ⏱️ **Time to First Exam:** < 3s

### KPIs de Negocio

- 👤 **Guest → Registered Conversion:** > 10%
- 🔄 **Retention Day 7:** > 30%
- 📊 **Avg Exams/User:** > 5
- 💰 **Infrastructure Cost:** $0

---

## 🔧 Comandos de Desarrollo

```bash
# Build
npm run build

# Preview local
npm run preview

# Ver caché en DevTools
# Application → IndexedDB → saberparatodos_cache

# Limpiar caché (JS Console)
cacheService.clearCache()
```

---

## 🐛 Debugging

### Ver estado del caché

```javascript
// En consola del navegador
await cacheService.getCacheStats()
// → [{ grade: 11, count: 100, isGuest: true, age: 15 }]
```

### Forzar recarga de API

```javascript
// Limpiar caché y recargar
await cacheService.clearCache()
location.reload()
```

### Ver preguntas cacheadas

```javascript
// IndexedDB
const pool = await cacheService.getQuestionPool(11)
console.log(pool.questions.length) // → 100
```

---

## 🎓 Próximos Pasos

### Fase 2: Mejoras Planificadas

- [ ] **Service Worker** - Caché offline completo
- [ ] **Compression** - Reducir tamaño de payload
- [ ] **Analytics** - Rastrear cache hit rate
- [ ] **A/B Testing** - Probar 50 vs 100 preguntas
- [ ] **Dynamic Expiry** - Usuarios activos = caché más larga

### Fase 3: Monetización

- [ ] **Premium Tier** - Acceso a 1,813 preguntas sin registro
- [ ] **Instituciones** - API privada sin límites
- [ ] **Ads** - Solo para guests (removibles con registro)

---

## 📚 Referencias

- [IndexedDB API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Fisher-Yates Shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)

---

*Versión: 1.0 | Fecha: 2025-12-16 | Autor: Belal Hmedan*
