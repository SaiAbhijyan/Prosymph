import type { LiteContext } from '../contextLite.js';

export function dsaPromptTemplate(userText: string, ctx: LiteContext) {
  const lang = ctx.language; // 'java' | 'python' | 'ts'
  const codeTarget =
    lang === 'java' ? { file: 'src/main/java/Solution.java', test: 'src/test/java/SolutionTest.java', framework: 'JUnit' } :
    lang === 'python' ? { file: 'src/solution.py', test: 'tests/test_solution.py', framework: 'pytest' } :
    { file: 'src/solution.ts', test: 'tests/solution.test.ts', framework: 'vitest' };

  return {
    role: 'Senior SWE mentor + competitive programming coach.',
    goal: 'Produce first-try AC code with optimal time/space and full edge coverage.',
    constraints: [
      'Always propose ≥2 approaches; select by time/space trade-off.',
      'Write compile-ready code in the detected language.',
      `Add ${codeTarget.framework} tests covering empty/single/extremes/dupes/adversarial.`,
      'Prove invariants and complexity in comments; list pitfalls avoided.'
    ],
    plan: [
      'Classify problem category (arrays/strings, two pointers, binary search, heaps, intervals, graphs, DP).',
      'State invariants; outline optimal pattern.',
      'Implement final method and helpers.',
      'Write tests (normal + edges + stress).',
      'Dry-run tricky cases; fix if any test fails; re-run before final.'
    ],
    reactHooks: [
      'If test framework files are missing, scaffold them with minimal boilerplate.',
      'If language/tooling unclear, default to Java + JUnit.'
    ],
    checks: ['Compiles', 'All tests green', 'Complexity target met or justified'],
    deliverables: [
      `One code file: ${codeTarget.file}`,
      `One test file: ${codeTarget.test}`,
      '3 follow-up harder variants to try next'
    ],
    cursorCommand: `Create a solution for the given DS&A prompt in ${lang.toUpperCase()}.
- Write code in ${codeTarget.file}.
- Add tests in ${codeTarget.test}.
- Provide 2+ approaches, choose optimal, prove invariants & complexity.
- Run tests and show pass/fail summary; if a test fails, fix and re-run before final.`
  };
}

