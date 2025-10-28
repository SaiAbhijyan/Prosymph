import type { Paths } from '../paths.js';

export function dataScienceTemplate(userText: string, p: Paths){
  const ndir = p.data?.notebooksDir ?? 'notebooks';
  const sdir = p.data?.scriptsDir ?? 'src';
  const tdir = p.data?.testDir ?? 'tests';
  return {
    role: 'Senior Data Scientist + MLE.',
    goal: 'Create a reproducible EDA + data loader + metric computation with tests.',
    constraints: [
      'Prefer scripts + optional notebook; pin deps; deterministic seed.',
      'Small datasets mocked in tests; no external downloads by default.',
      'Log shapes and summary stats; handle missing/dup values.'
    ],
    plan: [
      `EDA: ${ndir}/eda.ipynb (optional) or ${sdir}/eda.py`,
      `Data loader: ${sdir}/data_loader.py with schema validation`,
      `Metrics: ${sdir}/metrics.py (e.g., accuracy/f1)`,
      `Tests: ${tdir}/test_data_loader.py and ${tdir}/test_metrics.py (pytest)`
    ],
    reactHooks: ['If notebook unsupported, provide .py equivalent with comments.'],
    checks: ['pytest passes', 'no I/O side-effects', 'seed reproducibility'],
    deliverables: [
      `${sdir}/data_loader.py`,
      `${sdir}/metrics.py`,
      `${tdir}/test_data_loader.py`,
      `${tdir}/test_metrics.py`,
      `${ndir}/eda.ipynb (optional)`
    ],
    cursorCommand:
`Create a small data pipeline (loader+metrics) with tests.
- Scripts in ${sdir}/
- Tests in ${tdir}/ (pytest)
- Optional notebook in ${ndir}/
Run tests and show results; keep I/O mocked.`
  };
}

