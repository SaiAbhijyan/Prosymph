import { describe, it, expect } from 'vitest';
import { detectPaths } from '../../src/behaviorLite/paths.js';

describe('detectPaths', () => {
  it('produces flexible defaults and detects language', async () => {
    const p = await detectPaths(process.cwd());
    expect(p.language).toBeDefined();
    expect(['java','python','ts']).toContain(p.language);
    expect(p.codeFile).toBeDefined();
    expect(p.testFile).toBeDefined();
  });

  it('detects web, data, or devops paths', async () => {
    const p = await detectPaths(process.cwd());
    const hasAny = p.web?.appDir || p.data?.scriptsDir || p.devops?.tfDir;
    expect(hasAny).toBeTruthy();
  });
});

