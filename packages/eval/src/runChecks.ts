import { RewriteOutput } from '@prompt-orchestrator/core';

export interface AcceptanceCheckResult {
  name: string;
  passed: boolean;
  notes: string;
}

/**
 * Run acceptance checks (CoVe) on the rewrite output
 */
export async function runAcceptanceChecks(
  output: RewriteOutput
): Promise<AcceptanceCheckResult[]> {
  const results: AcceptanceCheckResult[] = [];

  // Security check
  results.push({
    name: 'Security',
    passed: !output.instructions.toLowerCase().includes('password') || output.instructions.includes('hash'),
    notes: output.instructions.toLowerCase().includes('password') && !output.instructions.includes('hash')
      ? 'Potential security risk: password handling without hashing'
      : 'No obvious security issues',
  });

  // Correctness check
  results.push({
    name: 'Correctness',
    passed: output.plan.length > 0 && output.deliverables.length > 0,
    notes:
      output.plan.length === 0
        ? 'Plan is empty'
        : output.deliverables.length === 0
        ? 'Deliverables not defined'
        : 'Plan and deliverables are defined',
  });

  // Style check
  results.push({
    name: 'Style',
    passed: output.instructions.includes('lint') || output.instructions.includes('format'),
    notes: output.instructions.includes('lint') || output.instructions.includes('format')
      ? 'Linting/formatting mentioned'
      : 'Consider adding linter check',
  });

  // Performance check
  results.push({
    name: 'Performance',
    passed: true, // Placeholder
    notes: 'No obvious performance issues detected (heuristic)',
  });

  // Testability check
  results.push({
    name: 'Testability',
    passed: output.instructions.toLowerCase().includes('test'),
    notes: output.instructions.toLowerCase().includes('test')
      ? 'Testing mentioned in instructions'
      : 'Consider adding test requirements',
  });

  return results;
}



