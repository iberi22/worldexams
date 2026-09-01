# 🔐 Política de Seguridad y Manejo de Secrets — WorldExamns / SaberParaTodos

> WorldExamns / SaberParaTodos se compromete a mantener seguros los datos de usuarios, contribuyentes y la plataforma.
> Este documento describe cómo reportar vulnerabilidades, nuestras prácticas de seguridad y políticas de manejo de secrets.

---

## 🚨 Reportar una Vulnerabilidad

Si encuentras una vulnerabilidad de seguridad en WorldExamns, **no abras un issue público**. En su lugar:

1. **Contacta directamente a BELA** vía Telegram: @iberi22
2. **O envía un email** a la dirección asociada al repositorio de GitHub
3. **O crea un issue privado** en GitHub si tienes acceso

### Expectativas

- **Reconocimiento:** Recibirás confirmación dentro de **48 horas**
- **Evaluación:** Evaluaremos el reporte en **5 días hábiles**
- **Parche:** Trabajaremos en una corrección antes de divulgar públicamente
- **Crédito:** Te acreditaré como descubridor (si lo deseas)

### Programa de Recompensas

Actualmente **no** contamos con un programa formal de recompensas por bugs. Como proyecto pre-launch educativo, agradecemos sinceramente las contribuciones responsables.

---

## 🔐 Prácticas de Seguridad y Manejo de Secrets

### API Keys y Secrets

- ❌ **NUNCA** publicar `SUPABASE_SERVICE_ROLE_KEY` en frontend o repositorios públicos.
- ✅ Usar `SUPABASE_URL` + `SUPABASE_ANON_KEY` en frontend.
- ✅ API keys con prefijo `wx_` hasheadas con SHA-256 en storage.
- ✅ Rate limits implementados en Edge Functions.
- ✅ `.env` en `.gitignore` — nunca se commitea.

### Rotación de Secrets y API Keys

1. **Cuándo rotar:**
   - Cada 90 días como medida preventiva.
   - Inmediatamente ante cualquier sospecha de compromiso o exposición.
   - Cuando un desarrollador o colaborador con acceso a producción sale del proyecto.

2. **Procedimiento de Rotación:**
   - Generar nuevas credenciales en los proveedores de servicios (Supabase, OpenAI, Anthropic, Telegram, etc.).
   - Actualizar los valores en los repositorios o entornos de ejecución correspondientes (p.ej. GitHub Actions, Wrangler secrets, bases de datos).
   - Monitorear el correcto funcionamiento de los sistemas tras la rotación.
   - Revocar los secretos antiguos después de un periodo prudencial (normalmente 24 horas).

### Rate Limiting

| Tier | Requests |
|------|----------|
| Guest | 100 requests/hora |
| Free | 10 preguntas/hora |
| Pro | 60 requests/minuto |
| Enterprise | 300 requests/minuto |

### CORS

- Actual: `*` (permisivo — en revisión)
- Recomendado: `https://saberparatodos.space`, `https://www.saberparatodos.space`

### Base de Datos (Supabase)

- Row Level Security (RLS) activo en todas las tablas
- Políticas de acceso por usuario autenticado
- Edge Functions con validación de tokens
- Migraciones versionadas

---

## 🛡️ Buenas Prácticas para Contribuidores

### Para Desarrolladores

1. **Nunca commitees:**
   - Tokens, API keys o contraseñas.
   - Archivos `.env` con valores reales.
   - Archivos de configuración con secrets.
   - Logs con información sensible.

2. **Usa variables de entorno:**
   - Todas las configuraciones sensibles via `process.env`.
   - Documenta en `.env.example` (sin valores reales).

3. **Auditoría de git history:**
   - Si accidentalmente commiteas un secret, **notifica inmediatamente**.
   - Usa herramientas de filtrado de git (como `git-filter-repo` o scripts automáticos) para limpiar history.
   - El issue #221 trackea la limpieza de secrets expuestos.

### Para Contribuidores de Contenido

1. **No incluyas información personal** en bundles o documentación.
2. **No uses contenido con copyright** sin permiso explícito.
3. **Contextos educativos:** Usa ejemplos ficticios, no datos reales de estudiantes.

---

## 🧹 History Rewrite (221)

Para remediar y depurar completamente tokens, llaves o secrets expuestos en commits antiguos dentro del historial de Git (referenciado en el issue #221), se sigue el procedimiento estandarizado con `git-filter-repo`.

### Script y Ejecución en Seco (`scripts/security-221-history-rewrite.sh`)

1. **Modo Dry-Run (Verificación sin modificación):**
   Antes de reescribir el historial o aplicar cambios irreversibles en las ramas, se debe ejecutar el script `scripts/security-221-history-rewrite.sh` en modo `--dry-run` para auditar la presencia de patrones o archivos sensibles:
   ```bash
   bash scripts/security-221-history-rewrite.sh --dry-run
   ```

2. **Reescritura de Historial con `git-filter-repo`:**
   Tras validar los hallazgos en modo dry-run, el proceso elimina de forma permanente cualquier string de credenciales o archivo sensible del árbol de commits.

3. **Nota de Coordinación con BELA:**
   > ⚠️ **IMPORTANTE:** Ninguna reescritura de historial real (`force-push`) se debe ejecutar directamente en `main` sin la coordinación y aprobación explícita previa con BELA (@iberi22). Todo test de reescritura en ramas o entornos locales debe ser estrictamente dry-run.

---

## 🔍 Alcance de Seguridad

### Incluido

- API Gateway (`apps/worldexams-api/`)
- Edge Functions de Supabase
- Frontend (`saberparatodos/`, `apps/landing-worldexams/`)
- Scripts de validación y automatización
- Bundles de preguntas (integridad de contenido)

### Excluido

- Dependencias de terceros (npm packages) — reportar a sus respectivos mantenedores.
- Infraestructura de Cloudflare/Supabase — sus respectivos programas de bug bounty.
- Servicios externos (Gemini API, GitHub Actions).

---

## 📋 Historial de Vulnerabilidades

| # | Fecha | Descripción | Estado | Reportado por |
|---|-------|-------------|--------|---------------|
| — | — | Sin incidentes reportados hasta la fecha | ✅ | — |

---

## 📞 Contacto de Seguridad

- **Telegram:** @iberi22 (respuesta más rápida)
- **GitHub:** @iberi22
- **Tiempo de respuesta esperado:** < 48 horas para reportes iniciales

---

*Última actualización: 2026-07-28*
*Esta política se actualiza según evolucionan las prácticas de seguridad del proyecto.*
