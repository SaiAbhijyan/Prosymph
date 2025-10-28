import type { RewriteInput, RewriteOutput, VSAlternative } from "./types.js";
import { harvestRepoSummary } from "../../context/src/harvest.js";
import { renderPlain } from "./render.js";
import { shapeForCursor } from "./behaviorLite/shapeCursor.js";

// Re-export types and functions needed by other modules
export type { RewriteInput, RewriteOutput, VSAlternative } from "./types.js";
export { renderPlain } from "./render.js";
export { shapeForCursor } from "./behaviorLite/shapeCursor.js";

export async function rewrite(input: RewriteInput): Promise<RewriteOutput> {
  const repoSummary = await harvestRepoSummary();

  // Tool-aware system/instructions (concise)
  const systemByTool: Record<string,string> = {
    "cursor": "Act as a senior engineer inside Cursor. Plan first, then small diffs. Use explicit file paths.",
    "chatgpt": "Act as Staff Engineer + Prompt Engineer. Output a Prompt-Pack block (Role, Goal, Constraints, Plan, ReAct hooks, Checks, Deliverables).",
    "claude-code": "Act as Senior Engineer in a terminal coding session. Keep instructions compact and stepwise.",
    "copilot": "Act as a concise coding copilot. Provide a short, file-path specific plan and acceptance tests.",
    "kiro": "Act as a senior LLM coding agent. Provide minimal, verifiable steps and tests.",
    "lovable": "Act as a full-stack builder. Provide clear sections and ready-to-run steps."
  };
  const instructionsByTool: Record<string,string> = {
    "cursor": "If info is missing but non-blocking, state an assumption and continue. Use acceptance checks (security, correctness, style, performance, testability).",
    "chatgpt": "Follow Prompt-Pack sections. If ambiguous, list assumptions. Include acceptance checks and deliverables.",
    "claude-code": "List 3–7 steps, then execute the first. Keep steps small and testable.",
    "copilot": "Return a compact plan + tests and the exact files to edit next.",
    "kiro": "Return a compact plan + tests and name exact files.",
    "lovable": "Return a builder-friendly plan and what to scaffold next."
  };

  const base: Omit<RewriteOutput, "vs" | "self_edits"> = {
    system: systemByTool[input.target] ?? systemByTool["cursor"],
    instructions: instructionsByTool[input.target] ?? instructionsByTool["cursor"],
    context_snippets: [repoSummary],
    plan: [
      "Outline 3–7 steps (Least-to-Most).",
      "Apply first small, testable diff.",
      "If VS enabled, compare candidates and pick winner.",
      "Persist Self-Edits rules before final output."
    ],
    checks: ["security", "correctness", "style", "performance", "testability"],
    deliverables: [
      input.target === "cursor" ? "Cursor-native prompt text" : "Tool-shaped prompt text",
      "Next-diff / next action list"
    ]
  };

  let vsBlock: RewriteOutput["vs"] | undefined;
  if (input.mode_flags.vs) {
    const candidates: VSAlternative[] = [
      {
        prompt: "Plan-first with diffs and tests",
        probability: 0.5,
        rationale: "Best fit for Cursor workflows"
      },
      {
        prompt: "TDD first then implement",
        probability: 0.3,
        rationale: "High quality, slower for exploration"
      },
      {
        prompt: "Spike then refactor",
        probability: 0.2,
        rationale: "Fast exploration, follow with cleanup"
      }
    ];
    vsBlock = { candidates, chosen: 0 };
  }

  const selfEdits = [
    "Always add/update tests when behavior changes.",
    "Prefer explicit file paths and small diffs.",
    "Stop and summarize if checks fail once."
  ];

      return { ...base, vs: vsBlock, self_edits: selfEdits };
    }

    // Re-export functions needed by other modules
    export { renderPlain } from "./render.js";
    export { shapeForCursor } from "./behaviorLite/shapeCursor.js";
