export type TaskKind =
  | 'DSA_CODING'
  | 'WEB_FULLSTACK'
  | 'DATA_SCIENCE'
  | 'DEVOPS'
  | 'DEFAULT';

type KW = { pos: string[]; neg?: string[]; boost?: number };

const KWS: Record<Exclude<TaskKind,'DEFAULT'>, KW> = {
  DSA_CODING: {
    pos: ['leetcode','coding round','testcases','big o','time complexity','two pointers','sliding window','binary search','dp','graph','bfs','dfs','sde','interview'],
    neg: ['react','nextjs','frontend','terraform','kubernetes','helm','docker','pipeline','cicd','notebook','pandas','dataset','model','deploy']
  },
  WEB_FULLSTACK: {
    pos: ['react','nextjs','vite','component','frontend','api','endpoint','controller','spring boot','express','django','fastapi','full stack','ui','page','route'],
    neg: ['leetcode','binary search','dp','notebook','terraform','kubernetes','helm','ecs','eks']
  },
  DATA_SCIENCE: {
    pos: ['pandas','numpy','notebook','jupyter','eda','dataset','sklearn','model','train','evaluate','metrics','confusion matrix','data loader'],
    neg: ['terraform','kubernetes','helm','deployment','cicd','react','nextjs','controller','spring boot','express','leetcode','dp']
  },
  DEVOPS: {
    pos: ['terraform','iac','kubernetes','k8s','helm','deployment','service','manifest','pipeline','cicd','github actions','workflow','infrastructure'],
    neg: ['leetcode','dp','notebook','pandas','react','nextjs']
  }
};

function score(text: string, kw: KW){
  const t = text.toLowerCase();
  let s = 0;
  for (const k of kw.pos) if (t.includes(k)) s += 2;
  for (const k of (kw.neg ?? [])) if (t.includes(k)) s -= 2;
  return s + (kw.boost ?? 0);
}

export function classifyTask(userText: string): TaskKind {
  const entries = Object.entries(KWS) as [Exclude<TaskKind,'DEFAULT'>, KW][];
  const scored = entries.map(([k, kw]) => [k, score(userText, kw)] as const);
  scored.sort((a,b) => b[1]-a[1]);

  const [top, topScore] = scored[0];
  const [second, secondScore] = scored[1];

  // Require margin to avoid false positives; otherwise DEFAULT
  const margin = topScore - (secondScore ?? 0);
  const threshold = 2; // at least one clear positive hit
  if (topScore >= threshold && margin >= 2) return top;

  return 'DEFAULT';
}

