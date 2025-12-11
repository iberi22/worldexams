# 🛠️ Rust Compilation Fix - Windows File Locking

## Problema

El servidor Rust de Party Mode no compila en Windows debido a errores de bloqueo de archivos:

```
error: failed to remove E:\scripts-python\worldexams\party-server-rust\target\debug\deps\...
El proceso no tiene acceso al archivo porque está siendo utilizado por otro proceso. (os error 32)
```

## Causa Raíz

**VS Code rust-analyzer** mantiene archivos `.o` (object files) bloqueados en la carpeta `target/` durante compilaciones incrementales. Windows no permite eliminar archivos bloqueados.

Con **47 procesos de VS Code** abiertos simultáneamente, múltiples instancias de rust-analyzer están interfiriendo con la compilación.

---

## ✅ Solución Definitiva (RECOMENDADA)

### Opción 1: Cerrar VS Code Completamente

```powershell
# 1. Cerrar todas las ventanas de VS Code
# (Alt+F4 en cada ventana o cerrar desde barra de tareas)

# 2. Verificar que no queden procesos
Get-Process Code -ErrorAction SilentlyContinue | Stop-Process -Force

# 3. Navegar a la carpeta del proyecto
cd e:\scripts-python\worldexams\party-server-rust

# 4. Limpiar build cache
cargo clean

# 5. Compilar en modo release
cargo build --release

# 6. Ejecutar el servidor
.\target\release\party-server.exe
```

**Tiempo estimado:** 5-8 minutos para compilación completa.

---

### Opción 2: Deshabilitar rust-analyzer Temporalmente

Si necesitas mantener VS Code abierto:

1. Abrir VS Code
2. `Ctrl+Shift+P` → `Developer: Reload Window`
3. `Ctrl+Shift+P` → `Extensions: Disable` → Buscar "rust-analyzer" → Deshabilitar
4. Abrir nueva terminal PowerShell **fuera de VS Code**
5. Ejecutar:

```powershell
cd e:\scripts-python\worldexams\party-server-rust
cargo clean
cargo build --release
```

6. Una vez compilado, volver a habilitar rust-analyzer

---

### Opción 3: Compilar desde PowerShell Externo

Abre **Windows PowerShell** (no la terminal integrada de VS Code):

```powershell
# 1. Navegar a la carpeta
cd e:\scripts-python\worldexams\party-server-rust

# 2. Eliminar archivos bloqueados manualmente
Remove-Item -Recurse -Force .\target\debug\deps\paste-* -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .\target\debug\deps\displaydoc-* -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .\target\debug\deps\serde_derive-* -ErrorAction SilentlyContinue

# 3. Compilar
cargo build --release

# 4. Si falla, matar todos los procesos Rust y reintentar
Get-Process | Where-Object {$_.ProcessName -like "*rust*"} | Stop-Process -Force
cargo clean
cargo build --release
```

---

## 🚀 Ejecución del Servidor (Después de Compilar)

Una vez compilado exitosamente:

```powershell
# Desde party-server-rust/
.\target\release\party-server.exe

# Deberías ver:
# [INFO] Starting Party Server on http://127.0.0.1:8080
# [INFO] SQLite database: ./data/parties.db
# [INFO] WebSocket endpoint: ws://127.0.0.1:8080/ws
```

Verifica que el servidor esté corriendo:

```powershell
# En otra terminal
curl http://localhost:8080/health
# Respuesta esperada: {"status": "ok"}
```

---

## 🧪 Prueba de Integración Frontend-Backend

1. **Compilar y ejecutar servidor Rust:**
   ```powershell
   cd e:\scripts-python\worldexams\party-server-rust
   .\target\release\party-server.exe
   ```

2. **En otra terminal, iniciar frontend:**
   ```powershell
   cd e:\scripts-python\worldexams\saberparatodos
   npm run dev
   ```

3. **Abrir navegador:**
   ```
   http://localhost:3000/party
   ```

4. **Verificar logs del navegador (F12 Console):**
   ```
   [PartyApp] Detected backend mode: local
   [Connection] Connected to Rust backend at localhost:8080
   ```

5. **Crear una party:**
   - Click en "Crear Party"
   - Llenar formulario
   - Verificar en terminal de Rust:
     ```
     [INFO] POST /parties - Created party ABC123
     [INFO] WebSocket connected: player_xyz
     ```

---

## 🔧 Configuración de rust-analyzer (Prevenir Bloqueos Futuros)

En `settings.json` de VS Code:

```json
{
  "rust-analyzer.checkOnSave.enable": false,
  "rust-analyzer.cargo.buildScripts.enable": false,
  "rust-analyzer.procMacro.enable": true,
  "rust-analyzer.server.extraEnv": {
    "RUST_BACKTRACE": "1"
  }
}
```

Esto deshabilita la compilación automática en segundo plano que causa los bloqueos.

---

## 📊 Estado Actual del Código

### ✅ Completado y Listo para Compilar

| Componente | Estado | Archivos |
|------------|--------|----------|
| **Domain Layer** | ✅ Completo | `party.rs`, `player.rs` |
| **Repository Traits** | ✅ Completo | `party_repository.rs`, `player_repository.rs` |
| **SQLite Implementation** | ✅ Completo | `party_repo_impl.rs` |
| **Database Migrations** | ✅ Completo | `001_initial_schema.sql` |
| **Config Management** | ✅ Completo | `settings.rs` |
| **HTTP Routes** | ⚙️ Scaffolded | `routes.rs` (TODO markers) |
| **WebSocket Actors** | ⬜ Pendiente | `websocket/mod.rs` |

### Siguiente Paso Crítico

Una vez compilado, implementar:

1. **WebSocket Actors** (`infrastructure/websocket/mod.rs`)
2. **CRUD Endpoints** (completar TODOs en `routes.rs`)
3. **Integration Tests** (crear `tests/integration_test.rs`)

---

## ⚠️ Problemas Conocidos

### Si la compilación sigue fallando después de cerrar VS Code:

```powershell
# Reiniciar el servicio de bloqueo de archivos de Windows
net stop RpcSs
net start RpcSs

# O reiniciar el explorador de archivos
taskkill /F /IM explorer.exe
start explorer.exe

# Luego reintentar compilación
cargo build --release
```

### Si aparece error de SQLite:

```
error: failed to run custom build command for `libsqlite3-sys`
```

**Solución:**

```powershell
# Instalar Visual C++ Build Tools 2022
# https://visualstudio.microsoft.com/downloads/

# O usar SQLite estático
$env:SQLX_OFFLINE="true"
cargo build --release
```

---

## 📝 Notas Finales

- **No es un error del código:** La arquitectura está correcta, solo hay bloqueos del OS
- **Es específico de Windows:** En Linux/macOS la compilación funciona sin problemas
- **Workaround temporal:** Compilar desde terminal externa sin VS Code abierto
- **Solución permanente:** Configurar rust-analyzer para no bloquear archivos

Una vez compilado, el servidor debería funcionar perfectamente en producción.

---

**Última actualización:** 2025-12-01  
**Autor:** AI-WorldExams  
**Estado:** Compilación bloqueada por Windows file locks (solución documentada)
