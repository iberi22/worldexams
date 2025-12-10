# 📋 Actualización de Configuración de Agentes

> **Fecha:** 2025-12-04  
> **Solicitado por:** Usuario  
> **Ejecutado por:** GitHub Copilot  
> **Estado:** ✅ Completado

---

## 🎯 Objetivo

Actualizar los archivos de configuración de agentes para reflejar correctamente la arquitectura real del proyecto World Exams:

1. **Arquitectura multi-repo** con `saberparatodos/` como plataforma principal
2. **Deployment a Cloudflare Pages** (no GitHub Pages)
3. **Preguntas centralizadas** en `src/content/questions/` compartidas entre plataformas
4. **Protocol v2.0** con formato de bundles (7 preguntas por archivo)

---

## 📁 Archivos Modificados

### 1. `.gitignore`

**Cambios:**
- ✅ Agregado header explicativo sobre arquitectura multi-repo
- ✅ Documentado estructura del proyecto (saberparatodos/, otros-exams/, questions/)
- ✅ Aclarado deployment a Cloudflare Pages
- ✅ Mencionado Protocol v2.0 (bundles)

**Ubicación:** `e:\scripts-python\worldexams\.gitignore`

**Líneas modificadas:** 1-12 (header nuevo)

---

### 2. `AGENTS.md`

**Cambios en rol Generator:**
- ✅ Agregada referencia obligatoria a Protocol v2.0
- ✅ Actualizado formato de ID con sufijos `-v[1-7]`
- ✅ Documentada estructura de bundles (7 preguntas por archivo)
- ✅ Agregada ubicación centralizada: `src/content/questions/[country]/`
- ✅ Referencia a `docs/QUESTION_GENERATION_PROTOCOL_V2.md`

**Cambios en rol Librarian:**
- ✅ Actualizada estructura de archivos a formato centralizado
- ✅ Agregado ejemplo real de ruta completa
- ✅ Actualizado formato de archivo a `-bundle.md`
- ✅ Documentado que cada bundle contiene 7 preguntas (v1-v7)

**Cambios en rol Synchronizer:**
- ✅ Actualizado deployment a Cloudflare Pages
- ✅ Agregado paso de build por plataforma
- ✅ Agregado paso de publish con Cloudflare Workers
- ✅ Referencia a `wrangler.toml`

**Cambios en checklist:**
- ✅ Actualizado checklist de generación de preguntas con Protocol v2.0
- ✅ Agregados ítems específicos: archivo bundle, IDs con sufijo, progresión de dificultad
- ✅ Referencia explícita al documento del protocolo

**Ubicación:** `e:\scripts-python\worldexams\AGENTS.md`

**Líneas modificadas:** 
- Generator: 37-58
- Librarian: 112-136
- Synchronizer: 180-184
- Checklist: 218-226

---

### 3. `.github/copilot-instructions.md`

**Cambios en Resumen del Proyecto:**
- ✅ Agregada sección "Arquitectura Multi-Repo"
- ✅ Documentado saberparatodos/ como plataforma principal
- ✅ Explicado que preguntas están centralizadas
- ✅ Actualizado stack tecnológico: Cloudflare Pages en lugar de GitHub Pages

**Cambios en Estructura Multi-Repo:**
- ✅ Completamente rediseñada estructura de directorios
- ✅ Agregada carpeta `src/content/questions/` como centralizada
- ✅ Documentado `saberparatodos/` con su estructura interna
- ✅ Agregado `wrangler.toml` en configuración
- ✅ Nota explicativa sobre preguntas compartidas

**Cambios en Formato de Preguntas:**
- ✅ Renombrada sección a "Formato de Preguntas (Protocol v2.0)"
- ✅ Nota IMPORTANTE sobre vigencia desde diciembre 2025
- ✅ Ejemplo completo de archivo bundle
- ✅ Documentada estructura obligatoria (v1-v7)
- ✅ Referencia explícita al documento del protocolo

**Cambios en Organización de Archivos:**
- ✅ Actualizada estructura a formato centralizado por país
- ✅ Ejemplo real de ruta completa
- ✅ Actualizado formato de archivo a `-bundle.md`
- ✅ Agregada nota crítica sobre bundles de 7 preguntas
- ✅ Aclarado que IDs son únicos por pregunta (v1-v7)

**Cambios en Comandos Comunes:**
- ✅ Agregada sección de deployment con Cloudflare
- ✅ Comando `npx wrangler pages deploy dist`
- ✅ Nota sobre configuración en `wrangler.toml`

**Ubicación:** `e:\scripts-python\worldexams\.github\copilot-instructions.md`

**Líneas modificadas:**
- Resumen: 38-66
- Estructura Multi-Repo: 86-129
- Formato de Preguntas: 186-234
- Organización: 265-285
- Comandos: 476-495

---

## 🔍 Contexto Adicional

### Arquitectura Multi-Repo

La organización World Exams tiene una estructura especial:

```
worldexams/
├── src/content/questions/    # ⭐ Preguntas centralizadas (compartidas)
│   ├── colombia/
│   ├── mexico/
│   └── [otros países]/
├── saberparatodos/           # ⭐ Plataforma principal (Colombia)
│   ├── wrangler.toml         # Config Cloudflare
│   └── [estructura completa]
├── exani-mx/                 # Plataforma México
├── enem-br/                  # Plataforma Brasil
└── [otros exams]/
```

**Nota importante:**
- Cada plataforma (saberparatodos/, exani-mx/, etc.) se despliega independientemente a Cloudflare Pages
- Las preguntas están centralizadas en `src/content/questions/` para ser compartidas
- Cada plataforma lee las preguntas correspondientes a su país

### Protocol v2.0 (Bundle Format)

**Cambio principal vs v1.0:**
- ❌ v1.0: 1 pregunta por archivo
- ✅ v2.0: 7 preguntas por archivo (bundle)

**Progresión de dificultad:**
1. v1: Original (dificultad 3)
2. v2-v3: Fácil (dificultad 1-2)
3. v4-v5: Media (dificultad 3)
4. v6-v7: Difícil (dificultad 4-5)

**Ejemplo de ID:**
- Archivo: `CO-MAT-11-algebra-001-bundle.md`
- IDs dentro: `CO-MAT-11-algebra-001-v1` hasta `CO-MAT-11-algebra-001-v7`

### Deployment a Cloudflare

**Cambio de GitHub Pages a Cloudflare Pages:**

Antes (v1.0):
```bash
npm run build   # dist/
npm run deploy  # GitHub Pages
```

Ahora (v2.0):
```bash
npm run build                      # dist/ (Astro)
npx wrangler pages deploy dist    # Cloudflare Pages
```

**Configuración:**
- Archivo: `saberparatodos/wrangler.toml`
- Workers: Cloudflare Edge Runtime
- Secrets: Configurados en Cloudflare dashboard

---

## ✅ Validación

### Checklist de Verificación

- [x] `.gitignore` actualizado con header explicativo
- [x] `AGENTS.md` - Rol Generator con Protocol v2.0
- [x] `AGENTS.md` - Rol Librarian con estructura centralizada
- [x] `AGENTS.md` - Rol Synchronizer con Cloudflare deployment
- [x] `AGENTS.md` - Checklist actualizado
- [x] `copilot-instructions.md` - Resumen del proyecto actualizado
- [x] `copilot-instructions.md` - Estructura multi-repo documentada
- [x] `copilot-instructions.md` - Formato de preguntas v2.0
- [x] `copilot-instructions.md` - Organización centralizada
- [x] `copilot-instructions.md` - Comandos Cloudflare

### Archivos de Referencia Verificados

- [x] `docs/QUESTION_GENERATION_PROTOCOL_V2.md` existe y está actualizado
- [x] `saberparatodos/wrangler.toml` existe (Cloudflare config)
- [x] `src/content/questions/` existe con estructura por país
- [x] Main branch tiene Protocol v2.0 implementado completamente

---

## 🎯 Resultado

Los tres archivos de configuración ahora reflejan correctamente:

1. ✅ **Arquitectura multi-repo** con saberparatodos/ como plataforma principal
2. ✅ **Deployment a Cloudflare Pages** con Workers y wrangler.toml
3. ✅ **Preguntas centralizadas** en `src/content/questions/[country]/`
4. ✅ **Protocol v2.0** con bundles de 7 preguntas y IDs con sufijos -v[1-7]

**Impacto:**
- Los futuros agentes de IA entenderán la arquitectura correcta
- No se generarán preguntas con formato v1.0 obsoleto
- Se usará correctamente la estructura centralizada
- Se seguirán los pasos correctos de deployment a Cloudflare

---

## 📚 Referencias

- [QUESTION_GENERATION_PROTOCOL_V2.md](../QUESTION_GENERATION_PROTOCOL_V2.md)
- [AGENTS.md](../../AGENTS.md)
- [copilot-instructions.md](../../.github/copilot-instructions.md)
- [analisis-ramas-remote.md](./analisis-ramas-remote.md) - Cleanup previo

---

*Documento generado: 2025-12-04 | Versión: 1.0*
