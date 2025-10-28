$ErrorActionPreference = "Stop"
Write-Host "Killing Node processes on ports 3000 and 5173 (if any)..."
$pids = @(Get-NetTCPConnection -State Listen -LocalPort 3000,5173 -ErrorAction SilentlyContinue | Select-Object -Expand OwningProcess | Sort-Object -Unique)
foreach ($pid in $pids) { Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue }
Write-Host "Starting dev servers (API + Web)..."
pnpm run dev:all

