# Context Engineering

## Overview

Context Engineering harvests repo structure, dependencies, and examples to inform prompt rewriting.

## Phases

### 1. Harvest

- Read `package.json` to infer stack (React, Next.js, Fastify, etc.)
- Parse `scripts` to identify test/lint/build commands
- Detect linters (ESLint, Prettier) and test runners (Vitest, Jest)
- Scan for high-leverage examples (tests, API usage)

### 2. Curate

- Filter by relevance score
- Compress to top N snippets (default: 5)
- Remove duplicates

### 3. Negative Context (Denylist)

Default denylist:
- `/legacy/**`
- `/secrets/**`
- `/infra/prod/**`

Configure via `.env`:
```env
CONTEXT_DENYLIST=/legacy/**,/secrets/**,/vendor/**
```

### 4. Examples

Mine 1–2 high-leverage examples:
- Test files (`*.test.ts`, `*.spec.js`)
- Example directories (`examples/**`, `usage/**`)

These become few-shot prompts for the rewrite engine.

## Implementation

See `packages/context/src/harvest.ts`:

```typescript
import { harvestContext } from '@prompt-orchestrator/context';

const context = await harvestContext(process.cwd(), ['/legacy/**']);
console.log(context.stack); // "React, Fastify"
console.log(context.testRunner); // "Vitest"
```

## Output Format

```typescript
interface RepoContext {
  stack: string;
  scripts: Record<string, string>;
  linters: string[];
  testRunner?: string;
  examples: ContextSnippet[];
  denylist: string[];
}
```



