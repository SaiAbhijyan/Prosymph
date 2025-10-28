import type { Paths } from '../paths.js';

export function webFullstackTemplate(userText: string, p: Paths){
  const app = p.web?.appDir ?? 'src';
  const api = p.web?.apiDir ?? 'api';
  const tdir = p.web?.testDir ?? 'tests';
  const fw  = p.web?.framework ?? 'react_vite';

  return {
    role: 'Senior Full-Stack Engineer + Tech Lead.',
    goal: 'Implement a minimal vertical slice (UI + API + data) with tests and docs.',
    constraints: [
      'Small, file-scoped diffs; explicit paths.',
      'Add unit/integration tests for API and UI component.',
      'Env handling via .env(.local) and safe config parsing.',
      'Accessibility basics in UI; basic error handling and loading states.'
    ],
    plan: [
      `Scaffold UI component in ${app}/components/Feature.tsx (${fw}).`,
      `Add API handler in ${api}/feature.[ts|js] (or Spring/Django equivalent).`,
      'Wire a simple repository/DB adapter or in-memory store.',
      `Write tests in ${tdir}/feature.spec.[ts|js] (and API test).`,
      'Update README with run/test instructions; provide follow-ups.'
    ],
    reactHooks: [
      'Detect framework; choose idiomatic file locations.',
      'If DB missing, use in-memory with TODO for real persistence.'
    ],
    checks: ['Build ok', 'Unit+API tests pass', 'Basic a11y checks'],
    deliverables: [
      `${app}/components/Feature.tsx`,
      `${api}/feature.ts`,
      `${tdir}/feature.spec.ts`,
      'README updates and next steps'
    ],
    cursorCommand:
`Create a minimal full-stack feature with UI + API.
- UI: ${app}/components/Feature.tsx
- API: ${api}/feature.ts (or equivalent in current framework)
- Tests: ${tdir}/feature.spec.ts
Include env notes, tiny diffs, and show test results before final.`
  };
}

