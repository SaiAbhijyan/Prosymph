import { promises as fs } from 'fs';
import { loadConfig } from './config.js';

export type Paths = {
  codeFile?: string;
  testFile?: string;
  // Web:
  web?: { appDir?: string; apiDir?: string; testDir?: string; framework?: 'next'|'react_vite'|'spring'|'express'|'django'|'fastapi' };
  // Data:
  data?: { notebooksDir?: string; scriptsDir?: string; testDir?: string };
  // DevOps:
  devops?: { tfDir?: string; k8sDir?: string; ciDir?: string };
  language: 'java'|'python'|'ts';
  test: 'junit'|'pytest'|'vitest'|'jest';
};

async function exists(p: string){ try{ await fs.access(p); return true; }catch{ return false; } }

export async function detectPaths(root = process.cwd()): Promise<Paths> {
  const cfg = await loadConfig(root);

  // Language/test heuristic:
  const language =
    cfg.language ? cfg.language :
    await exists(`${root}/pom.xml`) ? 'java' :
    (await exists(`${root}/pyproject.toml`) || await exists(`${root}/requirements.txt`)) ? 'python' : 'ts';

  const test =
    cfg.test ? cfg.test :
    (language === 'java' ? 'junit' : language === 'python' ? 'pytest' : (await exists(`${root}/jest.config.js`) ? 'jest' : 'vitest'));

  // DS&A defaults (overridable):
  const codeFile = cfg.paths?.code ??
    (language === 'java' ? 'src/main/java/Solution.java' :
     language === 'python' ? 'src/solution.py' : 'src/solution.ts');

  const testFile = cfg.paths?.test ??
    (language === 'java' ? 'src/test/java/SolutionTest.java' :
     language === 'python' ? 'tests/test_solution.py' :
     (test === 'jest' ? '__tests__/solution.test.ts' : 'tests/solution.test.ts'));

  // WEB detection:
  const isNext = await exists(`${root}/next.config.js`) || await exists(`${root}/app`) || await exists(`${root}/pages`);
  const isVite = await exists(`${root}/vite.config.ts`) || await exists(`${root}/vite.config.js`);
  const isExpress = await exists(`${root}/src/server.ts`) || await exists(`${root}/src/index.ts`) || await exists(`${root}/src/app.ts`);
  const isSpring = await exists(`${root}/pom.xml`);
  const isDjango = await exists(`${root}/manage.py`);
  const isFastAPI = await exists(`${root}/main.py`) && await exists(`${root}/requirements.txt`);

  const web = {
    appDir: cfg.paths?.web?.app ??
      (isNext ? (await exists(`${root}/app`) ? 'app' : 'pages') :
       isVite ? 'src' : (isSpring ? 'src/main/java' : (isExpress ? 'src' : undefined))),
    apiDir: cfg.paths?.web?.api ??
      (isSpring ? 'src/main/java' :
       isExpress ? 'src/routes' :
       isDjango ? 'project' :
       isFastAPI ? 'src' : 'api'),
    testDir: cfg.paths?.web?.test ?? (await exists(`${root}/__tests__`) ? '__tests__' : 'tests'),
    framework: isNext ? 'next' as const : isVite ? 'react_vite' as const : (isSpring ? 'spring' as const : (isExpress ? 'express' as const : (isDjango ? 'django' as const : (isFastAPI ? 'fastapi' as const : undefined))))
  };

  // DATA detection:
  const data = {
    notebooksDir: cfg.paths?.data?.notebooks ?? (await exists(`${root}/notebooks`) ? 'notebooks' : undefined),
    scriptsDir: cfg.paths?.data?.scripts ?? (await exists(`${root}/src`) ? 'src' : 'analysis'),
    testDir: cfg.paths?.data?.test ?? (await exists(`${root}/tests`) ? 'tests' : 'tests')
  };

  // DEVOPS detection:
  const devops = {
    tfDir: cfg.paths?.devops?.terraform ?? (await exists(`${root}/terraform`) ? 'terraform' : (await exists(`${root}/infra/terraform`) ? 'infra/terraform' : 'infra')),
    k8sDir: cfg.paths?.devops?.k8s ?? (await exists(`${root}/k8s`) ? 'k8s' : (await exists(`${root}/deploy/k8s`) ? 'deploy/k8s' : 'infra/k8s')),
    ciDir: cfg.paths?.devops?.ci ?? (await exists(`${root}/.github/workflows`) ? '.github/workflows' : '.ci')
  };

  return { codeFile, testFile, web, data, devops, language, test };
}

