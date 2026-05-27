# WorldExams — Dev Deploy Guide

## Prerrequisitos

- Node.js >= 20
- npm
- PowerShell 7+
- Variables de entorno configuradas

## Dev Deploy Rápido

```powershell
cd E:\scripts-python\worldexams
.\scripts\dev-deploy.ps1
```

Esto hará:
1. Verificar cambios sin commit
2. Instalar dependencias
3. Generar build info
4. Build de saberparatodos
5. Iniciar preview server en `http://localhost:4321`

## Opciones

### Build only (sin preview server)
```powershell
.\scripts\dev-deploy.ps1 -BuildOnly
```

### Clean install + deploy
```powershell
.\scripts\dev-deploy.ps1 -Clean
```

### Puerto personalizado
```powershell
.\scripts\dev-deploy.ps1 -Port 3000
```

## Variables de Entorno

Para dev, usa `.env.development` (no tocar `.env` de production):

```
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_API_URL=http://localhost:8788
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

## Estructura de Archivos

```
saberparatodos/
├── dist/           ← Build output
├── public/         ← Static assets
└── src/            ← Source code
```

## Testing Local

Después del dev deploy:

1. Abrir `http://localhost:4321`
2. Probar con `?country=co` (Colombia/ICFES)
3. Probar con `?country=mx` (México/EXANI)
4. Probar con `?country=cl` (Chile/PAES)
5. Probar `/guia-examen?country=...`
6. Probar `/api/questions?country=...&exam=...&grade=...&subject=...`

## Troubleshooting

### Build falla por node_modules corruptos
```powershell
.\scripts\dev-deploy.ps1 -Clean
```

### Error de wrangler config
Correr normalize manual:
```powershell
cd saberparatodos
node scripts/normalize-wrangler-config.mjs --target preview
```

### Preview server no responde
Verificar que el build fue exitoso y que `dist/` existe.
