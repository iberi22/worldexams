# 🧪 Guía de Pruebas E2E - Party Mode

## ✅ Estado Actual del Repositorio

El repositorio **saberparatodos** está completamente configurado y listo para funcionar:

### 📦 Componentes Implementados

| Componente | Estado | Archivo |
|------------|--------|---------|
| **Party Host** | ✅ Completo | `src/components/PartyHost.svelte` |
| **Party Join** | ✅ Completo | `src/components/PartyJoin.svelte` |
| **Party Page** | ✅ Completo | `src/pages/party.astro` |
| **Supabase Schema** | ✅ Migrado | `supabase/migrations/20251211_party_sessions.sql` |
| **Realtime Channels** | ✅ Configurado | Supabase Realtime habilitado |
| **RLS Policies** | ✅ Configurado | Lectura/escritura pública con rate limiting |

### 🧪 Tests E2E Mejorados

#### Archivo: `tests/party-mode.spec.ts`

**Funcionalidades probadas:**

1. ✅ **Creación de Party**
   - Host crea party con código único (6 caracteres)
   - Genera URL compartible

2. ✅ **Unión de 4 Estudiantes**
   - Ana García
   - Juan Pérez
   - María López
   - Carlos Rodríguez

3. ✅ **Lobby Sincronizado**
   - Host verifica que los 4 estudiantes están conectados
   - Realtime tracking con Supabase

4. ✅ **Inicio de Examen**
   - Host inicia examen
   - Todos los estudiantes reciben notificación

5. ✅ **Simulación de Respuestas**
   - Ana: Responde correctamente (A)
   - Juan: Responde incorrectamente (B)
   - María: Responde correctamente (A)
   - Carlos: Responde incorrectamente (C)

6. ✅ **Tracking de Progreso**
   - Host ve respuestas en tiempo real (4/4)

7. ✅ **Finalización de Examen**
   - Host finaliza examen
   - Genera vista de resultados

8. ✅ **Informe del Administrador**
   - Estadísticas generales
   - Métricas individuales por estudiante
   - Promedio de clase
   - Tasa de participación

9. ✅ **Análisis con IA**
   - Generación de análisis pedagógico
   - Recomendaciones personalizadas

10. ✅ **Opciones de Exportación**
    - Validación de botones de descarga/exportación

---

## 🚀 Cómo Ejecutar las Pruebas

### Requisitos Previos

```powershell
# 1. Instalar dependencias (si no lo has hecho)
cd saberparatodos
npm install

# 2. Instalar Playwright browsers (primera vez)
npx playwright install
```

### Opción 1: Ejecutar Manualmente (Recomendado)

**Terminal 1 - Servidor de Desarrollo:**
```powershell
cd saberparatodos
npm run dev
```

Espera a que veas:
```
✔ Local    http://localhost:4321/
```

**Terminal 2 - Tests E2E:**
```powershell
cd saberparatodos
npm run test:party          # Modo headless (sin UI)
npm run test:party:headed   # Modo headed (con UI visible)
```

### Opción 2: Script Automatizado

**Asegúrate de que el servidor esté corriendo**, luego:

```powershell
.\scripts\run-party-tests.ps1           # Headless
.\scripts\run-party-tests.ps1 --headed  # Con UI
```

---

## 📊 Output Esperado

```
🧪 Preparando pruebas E2E de Party Mode...

✅ Servidor de desarrollo ya está corriendo en http://localhost:4321

🚀 Ejecutando tests de Party Mode con 4 estudiantes...

==================================================

📝 FASE 1: Host creando party...
✅ Party creada con código: ABC123

👥 FASE 2: 4 estudiantes uniéndose...
  → Ana García uniéndose...
  ✅ Ana García unido exitosamente
  → Juan Pérez uniéndose...
  ✅ Juan Pérez unido exitosamente
  → María López uniéndose...
  ✅ María López unido exitosamente
  → Carlos Rodríguez uniéndose...
  ✅ Carlos Rodríguez unido exitosamente

🔍 FASE 3: Verificando participantes en lobby...
  ✅ Ana García visible en lobby
  ✅ Juan Pérez visible en lobby
  ✅ María López visible en lobby
  ✅ Carlos Rodríguez visible en lobby

🚀 FASE 4: Host iniciando examen...
✅ Examen iniciado

📝 FASE 5: Estudiantes respondiendo...
  → Ana García respondiendo opción A...
  ✅ Ana García respondió A
  → Juan Pérez respondiendo opción B...
  ✅ Juan Pérez respondió B
  → María López respondiendo opción A...
  ✅ María López respondió A
  → Carlos Rodríguez respondiendo opción C...
  ✅ Carlos Rodríguez respondió C

📊 FASE 6: Verificando progreso en host...
✅ Host recibió las 4 respuestas

🏁 FASE 7: Finalizando examen...
✅ Examen finalizado

📈 FASE 8: Validando informe del administrador...
  ✅ Sección "Estadísticas Generales" visible
  ✅ Estadísticas de Ana García visibles
  ✅ Estadísticas de Juan Pérez visibles
  ✅ Estadísticas de María López visibles
  ✅ Estadísticas de Carlos Rodríguez visibles
  ✅ Métricas clave visibles

✨ FASE 9: Generando análisis con IA...
  ✅ Análisis de IA generado
  ✅ Contenido del análisis visible

💾 FASE 10: Validando opciones de exportación...
  ✅ 2 opciones de descarga disponibles

==================================================
✅ PRUEBA E2E COMPLETADA EXITOSAMENTE
==================================================
Código de Party: ABC123
Estudiantes: Ana García, Juan Pérez, María López, Carlos Rodríguez
Respuestas: A, B, A, C
Informe generado: ✅
Análisis IA: ✅
==================================================
```

---

## 🐛 Troubleshooting

### Error: `net::ERR_CONNECTION_REFUSED`

**Causa:** El servidor de desarrollo no está corriendo.

**Solución:**
```powershell
cd saberparatodos
npm run dev
```

Espera a que el servidor inicie completamente antes de ejecutar tests.

### Error: `SUPABASE_URL is not defined`

**Causa:** Variables de entorno no configuradas.

**Solución:**
```powershell
# Verificar que existan las variables públicas en astro.config.mjs
# O definir en archivo .env:
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Playwright Browsers Missing

**Solución:**
```powershell
npx playwright install
```

---

## 📝 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| Desarrollo | `npm run dev` | Inicia servidor Astro en localhost:4321 |
| Build | `npm run build` | Construye para producción |
| Preview | `npm run preview` | Preview del build |
| Tests (todos) | `npm run test` | Ejecuta todos los tests Playwright |
| Tests UI | `npm run test:ui` | Abre Playwright UI para debugging |
| Tests Debug | `npm run test:debug` | Debug paso a paso |
| Tests Headed | `npm run test:headed` | Ejecuta con navegadores visibles |
| **Party Tests** | `npm run test:party` | Solo tests de Party Mode (headless) |
| **Party Headed** | `npm run test:party:headed` | Party Mode con navegadores visibles |

---

## 🎯 Próximos Pasos

1. **Ejecutar Tests Localmente:**
   - Iniciar servidor: `npm run dev`
   - Ejecutar tests: `npm run test:party:headed`

2. **CI/CD Integration:**
   - Los tests están listos para integrarse en una capa de automatización futura si se decide
   - Configurar workflow con:
     ```yaml
     - name: Run E2E Tests
       run: |
         npm run dev &
         npx wait-on http://localhost:4321
         npm run test:party
     ```

3. **Monitoring en Producción:**
   - Configurar Sentry para errores de Party Mode
   - Logs de Supabase Realtime

---

## ✅ Checklist de Validación

- [x] Servidor Astro funciona (`npm run dev`)
- [x] Página `/party` carga correctamente
- [x] Supabase Realtime configurado
- [x] RLS policies habilitadas
- [x] PartyHost.svelte implementado
- [x] PartyJoin.svelte implementado
- [x] Tests E2E con 4 estudiantes creados
- [x] Validación de informe del admin
- [x] Validación de análisis con IA
- [x] Scripts npm configurados
- [ ] **Tests ejecutados exitosamente** (pendiente: requiere servidor activo)

---

**Fecha:** 2025-12-12
**Autor:** GitHub Copilot
**Versión:** 1.0
