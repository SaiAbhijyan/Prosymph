#!/usr/bin/env bash
set -euo pipefail
for port in 3000 5173; do
  pid=$(lsof -ti :"$port" || true)
  if [[ -n "${pid}" ]]; then kill -9 "$pid" || true; fi
done
pnpm run dev:all

