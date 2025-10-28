import { describe, it, expect } from 'vitest';
import { classifyTask } from '../../src/behaviorLite/classify.js';

describe('classifyTask', () => {
  it('detects DS&A coding tasks', () => {
    expect(classifyTask('amazon sde2 coding round pass all testcases')).toBe('DSA_CODING');
    expect(classifyTask('solve this leetcode problem with optimal time complexity')).toBe('DSA_CODING');
  });

  it('detects WEB_FULLSTACK tasks', () => {
    expect(classifyTask('build a React component with API endpoint and database')).toBe('WEB_FULLSTACK');
    expect(classifyTask('create a Next.js page with API route and Prisma')).toBe('WEB_FULLSTACK');
  });

  it('blocks false positives with negative keywords', () => {
    const txt = 'build a React component with an API endpoint, not leetcode';
    expect(classifyTask(txt)).not.toBe('DSA_CODING');
  });

  it('detects DATA_SCIENCE tasks', () => {
    expect(classifyTask('create a pandas data loader with EDA notebook')).toBe('DATA_SCIENCE');
    expect(classifyTask('build a model training pipeline with sklearn metrics')).toBe('DATA_SCIENCE');
  });

  it('detects DEVOPS tasks', () => {
    expect(classifyTask('add terraform and kubernetes manifests with CI pipeline')).toBe('DEVOPS');
    expect(classifyTask('create GitHub Actions workflow for infrastructure deployment')).toBe('DEVOPS');
  });

  it('falls back to DEFAULT when unclear', () => {
    expect(classifyTask('hello world')).toBe('DEFAULT');
    expect(classifyTask('generic task with no clear indicators')).toBe('DEFAULT');
  });
});

