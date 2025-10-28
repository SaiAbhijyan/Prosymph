# Orchestrate Prompt (Cursor)
## When to use
Turn a layperson request into a role-aware, context-rich, Cursor-native prompt with plan-first, diff-oriented output.

## Inputs
- {{task}} — plain English request (what the user wants)
- {{mode_flags}} — json (e.g., {"vs":true,"k":3,"self_adapt":true})
- {{constraints}} — optional bullets (perf, security, style)
- {{deliverables}} — optional bullets (diff, tests, docs)

## Prompt
Act as a Staff-level engineer inside Cursor.

**Goal**: Rewrite `{{task}}` into the best-fit **Cursor** prompt, repo-aware, with small verifiable diffs.

**Context engineering (do first)**:
1) Summarize repo signals (package/lock, linters, test runner, tsconfig). If unknown, state assumptions.
2) Identify "negative context": files/areas not to touch.
3) Pull 1–2 high-leverage examples (tests, API calls) as few-shots.

**Planning (Least-to-Most)**:
- Outline 3–7 steps. Group if longer.
- Use **small, verifiable diffs**. Ask only if a blocker is truly ambiguous.

**Verbalized Sampling (if {{mode_flags.vs}})**:
- Generate {{mode_flags.k||3}} candidate prompt designs **with probabilities that sum≈1**.
- One-line rationale per candidate. Run acceptance checks, then select a winner.

**Self-Adapt**:
- Before final, list 3–7 "Self-Edits" (rules to apply next time: tests, invariants, perf/security) and write them to `skills/self-edits.json`.

**Acceptance checks (CoVe)**:
- Security, correctness, style, perf, testability. If any fail, revise once.

**Emit**:
- The final Cursor-native prompt text (plan-first + small diffs + explicit file paths), and a **Next diff** section listing exact files you will edit.
