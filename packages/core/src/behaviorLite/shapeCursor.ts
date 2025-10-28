import { buildLiteContext } from './contextLite.js';
import { detectPaths } from './paths.js';
import { classifyTask } from './classify.js';
import { dsaPromptTemplate } from './templates/dsaCoding.js';
import { webFullstackTemplate } from './templates/webFullstack.js';
import { dataScienceTemplate } from './templates/dataScience.js';
import { devOpsTemplate } from './templates/devOps.js';

export async function shapeForCursor(userText: string) {
  const ctx = await buildLiteContext();
  const paths = await detectPaths();
  const kind = classifyTask(userText);

  if (kind === 'DSA_CODING') {
    const tpl = dsaPromptTemplate(userText, ctx);
    return toSections(tpl);
  }
  if (kind === 'WEB_FULLSTACK') {
    const tpl = webFullstackTemplate(userText, paths);
    return toSections(tpl);
  }
  if (kind === 'DATA_SCIENCE') {
    const tpl = dataScienceTemplate(userText, paths);
    return toSections(tpl);
  }
  if (kind === 'DEVOPS') {
    const tpl = devOpsTemplate(userText, paths);
    return toSections(tpl);
  }

  // Fallback to DS&A-like structure but generic:
  const tpl = dsaPromptTemplate(userText, ctx);
  return toSections(tpl);
}

function toSections(tpl: any) {
  return {
    Role: tpl.role,
    Goal: tpl.goal,
    Constraints: tpl.constraints,
    Plan: tpl.plan,
    'ReAct hooks': tpl.reactHooks,
    Checks: tpl.checks,
    Deliverables: tpl.deliverables,
    'Cursor Command': tpl.cursorCommand
  };
}

