# Configuración de Sentry para World Exams

## 🛡️ Sentry - Error Tracking & Performance Monitoring

### 📦 Instalación

Las dependencias ya están agregadas en `package.json`:

```json
{
  "dependencies": {
    "@sentry/astro": "^8.40.0",
    "@sentry/svelte": "^8.40.0"
  }
}
```

Instalar:

```bash
cd saberparatodos
npm install
```

---

## 🔑 Configuración de Secrets

### 1. Crear Proyecto en Sentry

1. Ve a [sentry.io](https://sentry.io)
2. Crea una cuenta (gratis para open source)
3. Crea un nuevo proyecto:
   - Platform: **Astro**
   - Project name: `saberparatodos`
4. Copia el **DSN** que te dan

### 2. Variables de Entorno

**Desarrollo Local** (`.env`):

```env
PUBLIC_SENTRY_DSN=https://your-key@o123456.ingest.sentry.io/7654321
NODE_ENV=development
```

**GitHub Secrets** (para CI/CD):

```bash
# En tu repositorio GitHub:
# Settings > Secrets and variables > Actions > New repository secret

SENTRY_DSN=https://your-key@o123456.ingest.sentry.io/7654321
SENTRY_AUTH_TOKEN=your-auth-token  # Para source maps
SENTRY_ORG=your-org
SENTRY_PROJECT=saberparatodos
```

**Cloudflare Pages** (Environment Variables):

```
PUBLIC_SENTRY_DSN=https://your-key@o123456.ingest.sentry.io/7654321
NODE_ENV=production
```

---

## 📝 Archivos Creados

### 1. `src/lib/sentry.ts`

Inicialización de Sentry con:
- ✅ Browser Tracing Integration
- ✅ Session Replay (10% de sesiones normales, 100% con errores)
- ✅ Performance Monitoring
- ✅ Filtrado de errores conocidos (WebSocket, Network)
- ✅ Tags personalizados (country: CO, platform: web)

### 2. `astro.config.sentry.mjs`

Configuración de Astro con Sentry:
- ✅ Habilitado solo en producción
- ✅ Source maps activados
- ✅ Sampling rates configurados

### 3. `src/layouts/LayoutWithSentry.astro`

Layout que incluye handlers de errores globales.

---

## 🚀 Uso en Componentes

### Capturar Errores Manualmente

```typescript
import { Sentry } from '../lib/sentry';

try {
  // Tu código
  await riskOperation();
} catch (error) {
  // Capturar en Sentry
  Sentry.captureException(error, {
    tags: {
      component: 'PartyHost',
      action: 'create_party',
    },
    extra: {
      partyCode: code,
      studentCount: students.length,
    },
  });

  // Mostrar al usuario
  alert('Error al crear party');
}
```

### Agregar Contexto

```typescript
// En PartyHost.svelte
onMount(() => {
  Sentry.setContext('party', {
    code: partyCode,
    max_students: 10,
    tier: 'free',
  });

  Sentry.setTag('feature', 'party-mode');
});
```

### Capturar Mensajes

```typescript
Sentry.captureMessage('Party created successfully', {
  level: 'info',
  tags: {
    party_code: code,
  },
});
```

---

## 🧪 Testing Sentry

### Forzar Error de Prueba

```typescript
// src/pages/test-sentry.astro
---
import { Sentry } from '../lib/sentry';

if (Astro.url.searchParams.get('test') === 'error') {
  throw new Error('Sentry test error - This is intentional!');
}
---

<h1>Sentry Test Page</h1>
<button onclick="window.location.href='/test-sentry?test=error'">
  Trigger Error
</button>
```

Visita: `http://localhost:4321/test-sentry?test=error`

---

## 📊 Dashboards en Sentry

### Métricas Importantes

1. **Error Rate** por feature:
   - `party-mode`
   - `exam-view`
   - `leaderboard`

2. **Performance**:
   - Page load time
   - API response time (Supabase)
   - Realtime latency

3. **User Feedback**:
   - Session replays de errores
   - Breadcrumbs (navegación antes del error)

### Alertas Recomendadas

```yaml
# En Sentry > Alerts > Create Alert

- Name: "High Error Rate in Party Mode"
  Condition: Error count > 10 in 1 hour
  Filter: tag:feature = party-mode

- Name: "Performance Degradation"
  Condition: P95 response time > 3s

- Name: "Realtime Connection Failures"
  Condition: Error message contains "WebSocket"
  Action: Ignore (ya filtrado)
```

---

## 🔄 Integración con CI/CD

Ya configurado en `.github/workflows/e2e-tests.yml`:

```yaml
- name: 🧪 Run E2E tests
  env:
    PUBLIC_SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
```

### Source Maps Upload (Opcional)

Para mapear errores a código original:

```bash
# Instalar Sentry CLI
npm install --save-dev @sentry/cli

# Agregar a package.json scripts:
"build:sentry": "astro build && sentry-cli sourcemaps upload --org=your-org --project=saberparatodos ./dist"
```

---

## 🎯 Features Específicas de Party Mode

### Tracking de Eventos

```typescript
// PartyHost.svelte
function createParty() {
  Sentry.addBreadcrumb({
    category: 'party',
    message: 'Host creating party',
    level: 'info',
  });

  try {
    // ... create party logic

    Sentry.captureMessage('Party created', {
      level: 'info',
      tags: {
        party_code: code,
        feature: 'party-mode',
      },
    });
  } catch (err) {
    Sentry.captureException(err, {
      tags: { feature: 'party-mode', action: 'create' },
    });
  }
}
```

### Performance Monitoring

```typescript
// Medir tiempo de operaciones críticas
const transaction = Sentry.startTransaction({
  name: 'party.join',
  op: 'realtime.subscribe',
});

try {
  await subscribeToParty();
  transaction.setStatus('ok');
} catch (err) {
  transaction.setStatus('error');
  Sentry.captureException(err);
} finally {
  transaction.finish();
}
```

---

## ✅ Checklist de Configuración

- [ ] Cuenta de Sentry creada
- [ ] Proyecto `saberparatodos` creado en Sentry
- [ ] DSN copiado
- [ ] Variables de entorno configuradas (local + GitHub + Cloudflare)
- [ ] Dependencias instaladas (`npm install`)
- [ ] Sentry verificado en desarrollo (`npm run dev`)
- [ ] Test de error ejecutado (página /test-sentry)
- [ ] CI/CD actualizado con secrets
- [ ] Alertas configuradas en Sentry
- [ ] Source maps habilitados (opcional)

---

## 📞 Soporte

- **Docs:** [docs.sentry.io/platforms/javascript/guides/astro/](https://docs.sentry.io/platforms/javascript/guides/astro/)
- **Sentry for Open Source:** [sentry.io/for/open-source/](https://sentry.io/for/open-source/)

---

**Fecha:** 2025-12-12
**Versión:** 1.0
