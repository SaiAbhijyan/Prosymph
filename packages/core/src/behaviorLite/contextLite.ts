import { promises as fs } from 'fs';

export type LiteContext = {
  language: 'java' | 'python' | 'ts';
  test: 'junit' | 'pytest' | 'vitest';
  hasCursorRules: boolean;
  cursorRulesText?: string;
};

export async function buildLiteContext(root = process.cwd()): Promise<LiteContext> {
  const exists = async (p: string) => !!await fs.access(p).then(() => true).catch(() => false);
  const hasCursor = await exists(`${root}/.cursorrules`);
  const cursorRulesText = hasCursor ? await fs.readFile(`${root}/.cursorrules`,'utf8') : undefined;

  // super-simple language/test detection
  const language: LiteContext['language'] =
    await exists(`${root}/pom.xml`) ? 'java' :
    await exists(`${root}/pyproject.toml`) || await exists(`${root}/requirements.txt`) ? 'python' :
    'ts';

  const test: LiteContext['test'] =
    language === 'java' ? 'junit' :
    language === 'python' ? 'pytest' : 'vitest';

  return { language, test, hasCursorRules: hasCursor, cursorRulesText };
}

