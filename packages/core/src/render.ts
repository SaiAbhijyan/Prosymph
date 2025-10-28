import type { RewriteOutput } from "./types.js";

export function renderPlain(out: RewriteOutput, tool: string): string {
  const sep = "—".repeat(48);
  const plan = out.plan.map((s,i)=>`${i+1}. ${s}`).join("\n");
  const checks = out.checks.map(c=>`- ${c}`).join("\n");
  const ctx = out.context_snippets?.[0] ?? "";
  const vs = out.vs
    ? `\n\n[VS candidates]\n` +
      out.vs.candidates.map((c,i)=>`${i===out.vs!.chosen?"* ":"  "}[p=${c.probability}] ${c.prompt} — ${c.rationale}`).join("\n")
    : "";
  const self = out.self_edits?.length ? `\n\n[Self-Edits]\n- ${out.self_edits.join("\n- ")}` : "";
  return `Prompt Orchestrator → ${tool.toUpperCase()}
${sep}
System:
${out.system}

Instructions:
${out.instructions}

Context:
${ctx}

Plan:
${plan}

Acceptance checks:
${checks}

Deliverables:
- ${out.deliverables.join("\n- ")}${vs}${self}
`;
}
