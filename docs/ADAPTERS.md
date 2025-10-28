# Multi-Tool Adapters

## Overview

The orchestrator is designed to support multiple AI coding tools (Cursor, Windsurf, Copilot, etc.). For this MVP, **only Cursor is enabled**.

## Architecture

```
packages/adapters/
  cursor/
    src/generateRules.ts       # .cursor/rules/*.md
    src/generateCommands.ts    # .cursor/commands/*.md
    src/generateMcpConfig.ts   # .cursor/mcp.json
  windsurf/                    # (stub)
  copilot/                     # (stub)
```

## Cursor Adapter

Generates:
- `.cursor/rules/01-orchestrator.md` — Guardrails (plan-first, small diffs, denylist, VS, Self-Edits)
- `.cursor/commands/orchestrate-prompt.md` — Command definition
- `.cursor/mcp.json` — MCP tool config (`rewritePrompt`)

## Future Adapters

### Windsurf
- Generate `.windsurf/rules.md`
- Emit Windsurf-native prompts

### GitHub Copilot
- Generate `.github/copilot-instructions.md`
- Use Copilot Chat extensions

### Aider
- Generate `.aider/conventions.md`
- Use Aider's edit formats

## Adapter Interface

```typescript
export interface ToolAdapter {
  name: string;
  generateRules(): string;
  generateCommands(): string;
  generateConfig(): string;
  emit(output: RewriteOutput): string; // Tool-native format
}
```

## Enabling a New Adapter

1. Create `packages/adapters/{tool}/src/`
2. Implement `generateRules`, `generateCommands`, `generateConfig`
3. Register in `apps/orchestrator/src/routes/rewrite.ts`
4. Add tests in `packages/adapters/{tool}/test/`

## Current Status

- ✅ **Cursor**: Fully implemented
- ⏳ **Windsurf**: Planned
- ⏳ **Copilot**: Planned
- ⏳ **Aider**: Planned



