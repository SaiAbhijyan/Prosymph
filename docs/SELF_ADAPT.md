# Self-Adapt Loop (SEAL)

## Overview

Self-Adapt generates **improvement rules** (Self-Edits) after each task and persists them to `skills/self-edits.json`. On future runs, these rules are ingested to improve prompt quality.

## Algorithm

1. **Generate Self-Edits**: After task completion, create 3–7 short rules (e.g., "Always add tests on behavior change").
2. **Persist**: Append to `skills/self-edits.json`, deduplicating by rule text.
3. **Ingest**: On next run, load existing Self-Edits and incorporate them into the prompt template.
4. **Iterate**: Over time, the system learns repo-specific best practices.

## Example Self-Edits

```json
[
  {
    "rule": "Always add tests on behavior change",
    "context": "Generated for task: Add dark mode toggle",
    "createdAt": "2025-10-23T12:34:56Z"
  },
  {
    "rule": "Stop and summarize if acceptance checks fail once",
    "context": "Prevent infinite revision loops",
    "createdAt": "2025-10-23T12:34:56Z"
  },
  {
    "rule": "Use explicit file paths (no relative paths like ./)",
    "context": "Cursor works best with full paths",
    "createdAt": "2025-10-23T12:34:56Z"
  }
]
```

## Configuration

```env
SELF_ADAPT_ENABLED=true
SELF_EDITS_PATH=./skills/self-edits.json
```

## Implementation

See `packages/core/src/rewrite.ts`:

```typescript
import { generateSelfEdits, persistSelfEdits, loadSelfEdits } from './rewrite.js';

// Load existing
const existingEdits = await loadSelfEdits(selfEditsPath);

// Generate new
const newEdits = await generateSelfEdits(task, output);

// Persist
await persistSelfEdits(newEdits, selfEditsPath);
```

## Benefits

- **Continuous improvement**: System learns from each task.
- **Repo-specific**: Adapts to your codebase's conventions.
- **Transparent**: All rules are human-readable in `skills/self-edits.json`.



