$ErrorActionPreference = "Stop"
param([string]$ApiUrl = "http://localhost:3000")
Write-Host "API =" $ApiUrl
Invoke-WebRequest -UseBasicParsing "$ApiUrl/healthz"  | Select-Object -ExpandProperty Content
Invoke-WebRequest -UseBasicParsing "$ApiUrl/version"  | Select-Object -ExpandProperty Content
$body = @{ raw_prompt="hello"; target="cursor"; mode_flags=@{vs=$true;k=3;self_adapt=$true} } | ConvertTo-Json
Invoke-WebRequest -UseBasicParsing -Method Post -Uri "$ApiUrl/rewrite" -Body $body -ContentType "application/json" | Select-Object -ExpandProperty Content
Invoke-WebRequest -UseBasicParsing -Method Post -Uri "$ApiUrl/rewrite?format=text" -Body $body -ContentType "application/json" | Select-Object -ExpandProperty Content

