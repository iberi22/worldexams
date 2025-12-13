# Configure Cloudflare Pages Environment Variables
# Run this script to set up environment variables for saberparatodos

Write-Host "🔧 Configurando variables de entorno en Cloudflare Pages..." -ForegroundColor Cyan

# Project name
$PROJECT_NAME = "saberparatodos"

# Environment variables to set
$env_vars = @{
    "PUBLIC_SUPABASE_URL" = "https://tzmrgvtptdtsjcugwqyq.supabase.co"
    "PUBLIC_SUPABASE_ANON_KEY" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6bXJndnRwdGR0c2pjdWd3cXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMTc0NDYsImV4cCI6MjA3OTY5MzQ0Nn0.sPtxeTyDlF9sdQVrfM1wLp_RLKhI1sFk0W-h8Mc_VIc"
    "PUBLIC_API_BASE_URL" = "https://saberparatodos.pages.dev/api/v1"
    "PUBLIC_SITE_URL" = "https://saberparatodos.pages.dev"
}

Write-Host "`n📝 Variables a configurar:" -ForegroundColor Yellow
$env_vars.Keys | ForEach-Object {
    $value = $env_vars[$_]
    $display_value = if ($value.Length -gt 50) { $value.Substring(0, 50) + "..." } else { $value }
    Write-Host "  - $_=$display_value" -ForegroundColor Gray
}

Write-Host "`n⚠️  INSTRUCCIONES MANUALES (Cloudflare Pages Dashboard):" -ForegroundColor Yellow
Write-Host "1. Ve a: https://dash.cloudflare.com/" -ForegroundColor White
Write-Host "2. Selecciona: Workers & Pages > saberparatodos > Settings > Environment variables" -ForegroundColor White
Write-Host "3. Agrega las siguientes variables para Production Y Preview:" -ForegroundColor White
Write-Host ""

foreach ($key in $env_vars.Keys) {
    Write-Host "   Variable: $key" -ForegroundColor Cyan
    Write-Host "   Valor: $($env_vars[$key])" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "4. Guarda los cambios" -ForegroundColor White
Write-Host "5. Ve a Deployments > ... > Retry deployment" -ForegroundColor White
Write-Host "6. Selecciona: 'Clear build cache and retry'" -ForegroundColor White

Write-Host "`n✅ Una vez configuradas las variables, ejecuta:" -ForegroundColor Green
Write-Host "   npx wrangler pages deployment create" -ForegroundColor Cyan

Write-Host "`n💡 Tip: El error de pnpm-lock.yaml es un problema de cache." -ForegroundColor Yellow
Write-Host "   Se resolverá al hacer 'Clear build cache and retry'." -ForegroundColor Yellow
