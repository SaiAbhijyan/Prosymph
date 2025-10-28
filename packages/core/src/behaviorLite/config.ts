import { promises as fs } from 'fs';

export type ProsymphConfig = {
  paths?: {
    code?: string;       // fallback code file
    test?: string;       // fallback test file
    web?: { app?: string; api?: string; test?: string };
    data?: { notebooks?: string; scripts?: string; test?: string };
    devops?: { terraform?: string; k8s?: string; ci?: string };
  };
  language?: 'java' | 'python' | 'ts';
  test?: 'junit' | 'pytest' | 'vitest' | 'jest';
};

export async function loadConfig(root = process.cwd()): Promise<ProsymphConfig> {
  const cfgFile = `${root}/prosymph.config.json`;
  try {
    const raw = await fs.readFile(cfgFile, 'utf8');
    const json = JSON.parse(raw);
    return json;
  } catch {
    return {};
  }
}

