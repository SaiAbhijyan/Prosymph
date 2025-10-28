# Verbalized Sampling (VS)

## Overview

VS generates **k candidate prompt designs** (default k=3) with probabilities (sum≈1) and one-line rationales. Acceptance checks score each candidate; the highest-scoring one is selected.

## Algorithm

1. **Generate k candidates**: Each candidate proposes a different approach (e.g., plan-first vs. TDD vs. spike).
2. **Assign probabilities**: Based on task type, repo context, and historical success.
3. **Rationale**: One-sentence explanation of why this approach fits.
4. **Run checks**: Apply acceptance checks (security, correctness, style, perf, testability) to each.
5. **Select winner**: Highest score wins.
6. **Retain alts**: Store alternatives in `vs_candidates` for debugging.

## Example

```json
{
  "vs_candidates": [
    {
      "id": "candidate-1",
      "prompt": "Plan-first: 5-7 steps, iterate with tests",
      "probability": 0.5,
      "rationale": "Most aligned with Cursor + staff-level eng"
    },
    {
      "id": "candidate-2",
      "prompt": "TDD: tests first, minimal code to pass",
      "probability": 0.3,
      "rationale": "High quality but slower for exploration"
    },
    {
      "id": "candidate-3",
      "prompt": "Spike: quick prototype, refactor later",
      "probability": 0.2,
      "rationale": "Fast for research but needs discipline"
    }
  ],
  "selected_candidate": "candidate-1"
}
```

## Configuration

```env
VS_ENABLED=true
VS_K=3
```

Or per-request:

```json
{
  "task": "...",
  "mode_flags": {
    "vs_enabled": true,
    "vs_k": 5
  }
}
```

## Implementation

See `packages/core/src/rewrite.ts`:

```typescript
const candidates = await generateVSCandidates(task, context, vsK);
candidates.sort((a, b) => b.probability - a.probability);
const winner = candidates[0];
```

## Benefits

- **Diverse strategies**: Explores multiple approaches.
- **Transparency**: Probabilities + rationales make decisions auditable.
- **Quality gate**: Acceptance checks prevent bad prompts.



