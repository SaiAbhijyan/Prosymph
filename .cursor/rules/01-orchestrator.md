# Orchestrator Guardrails
- Plan first; then make **small, testable diffs**.
- Prefer reading repo context over guessing. If a fact is unknown and not critical, state the assumption and proceed.
- Respect **denylist**: `/legacy/**`, `/secrets/**`, `/infra/prod/**`.
- Always add/update tests when behavior changes.
- If acceptance checks fail, self-correct once; then stop and summarize risks/next steps.
- When multiple designs exist, use **Verbalized Sampling** (k=3) and pick the winner against checks.
- Before final, add **Self-Edits** to `skills/self-edits.json` and cite any rule you used.

## Behavior Lite (Task Intelligence)
- Classifier-guided behavior: choose template by task (DS&A, Web Full-Stack, Data Science, DevOps).
- Always propose at least two approaches and state the chosen one with reason.
- Always use explicit paths from detector or prosymph.config.json; do not hardcode if config exists.
- Keep diffs small and file-scoped; show run/test/validate outputs before final.
