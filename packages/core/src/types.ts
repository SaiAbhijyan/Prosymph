export type TargetTool = "cursor" | "chatgpt" | "claude-code" | "copilot" | "kiro" | "lovable";
export type RewriteInput = {
  raw_prompt: string;
  target: TargetTool;
  mode_flags: { vs: boolean; k: number; self_adapt: boolean };
  user_prefs?: Record<string, any>;
};

export type VSAlternative = {
  prompt: string;
  probability: number;
  rationale: string;
};

export type RewriteOutput = {
  system: string;
  instructions: string;
  context_snippets: string[];
  plan: string[];
  checks: string[];
  deliverables: string[];
  vs?: { candidates: VSAlternative[]; chosen: number };
  self_edits?: string[];
  sections?: any; // Behavior Lite: structured sections for task-specific prompts
};
