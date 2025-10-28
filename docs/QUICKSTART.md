# Quick Start

## Installation

```bash
pnpm install
```

## Run the Service

```bash
pnpm dev
```

The orchestrator will start on `http://localhost:3000`.

## Test the Rewrite Endpoint

```bash
curl -X POST http://localhost:3000/rewrite \
  -H "Content-Type: application/json" \
  -d '{
    "task": "Add user authentication with JWT",
    "mode_flags": {
      "vs_enabled": true,
      "vs_k": 3,
      "self_adapt": true
    },
    "constraints": ["Use PostgreSQL", "No external auth providers"],
    "deliverables": ["API endpoints", "Unit tests", "Migration script"]
  }'
```

## Response Format

```json
{
  "system": "You are a engineer. Follow the Cursor-native workflow below.",
  "instructions": "...",
  "context_snippets": [...],
  "plan": ["Step 1", "Step 2", ...],
  "checks": ["security", "correctness", ...],
  "deliverables": ["API endpoints", "Tests"],
  "vs_candidates": [
    {
      "id": "candidate-1",
      "prompt": "...",
      "probability": 0.5,
      "rationale": "..."
    },
    ...
  ],
  "selected_candidate": "candidate-1",
  "self_edits": [...]
}
```

## Using in Cursor

1. Start the orchestrator: `pnpm dev`
2. In Cursor, use the command: `@orchestrate-prompt "your task"`
3. The MCP tool will call `/rewrite` and return a Cursor-native prompt

## Configuration

Edit `.env`:

```env
PORT=3000
VS_ENABLED=true
VS_K=3
SELF_ADAPT_ENABLED=true
CONTEXT_DENYLIST=/legacy/**,/secrets/**
```



