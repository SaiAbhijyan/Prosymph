import { promises as fs } from "fs";
import path from "path";

async function exists(p: string) {
  try { await fs.access(p); return true; } catch { return false; }
}
async function readJSON(p: string) {
  try { return JSON.parse(await fs.readFile(p, "utf8")); } catch { return null; }
}
async function findWorkspaceRoot(start: string) {
  let cur = start;
  const isRoot = (p: string) => p === path.parse(p).root;
  while (true) {
    if (await exists(path.join(cur, "pnpm-workspace.yaml"))) return cur;
    if (await exists(path.join(cur, ".git"))) return cur;
    if (isRoot(cur)) return start; // fallback
    cur = path.dirname(cur);
  }
}

export async function harvestRepoSummary(): Promise<string> {
  const start = process.cwd();
  const root = await findWorkspaceRoot(start);
  const pkg = await readJSON(path.join(root, "package.json"));
  const tsconfig = await readJSON(path.join(root, "tsconfig.json"));
  const hasEslint = await exists(path.join(root, ".eslintrc.json"));
  const hasPrettier = (await exists(path.join(root, ".prettierrc"))) || (await exists(path.join(root, ".prettierrc.json")));

  const scripts = pkg?.scripts ? Object.keys(pkg.scripts).join(", ") : "none";
  const deps = pkg?.dependencies ? Object.keys(pkg.dependencies).slice(0, 8).join(", ") : "none";
  const devDeps = pkg?.devDependencies ? Object.keys(pkg.devDependencies).slice(0, 8).join(", ") : "none";
  const tsTarget = tsconfig?.compilerOptions?.target ?? "unknown";
  const tsModule = tsconfig?.compilerOptions?.module ?? "unknown";

  const deny = "/legacy/**, /secrets/**, /infra/prod/**";
  return [
    `CTX v2 — root: ${path.basename(root)}; pkg: ${pkg?.name ?? "unknown"} (Node/TypeScript).`,
    `Scripts: ${scripts}.`,
    `Deps: ${deps}. DevDeps: ${devDeps}.`,
    `TypeScript: target=${tsTarget}, module=${tsModule}.`,
    `Lint/Format: eslint=${hasEslint}, prettier=${hasPrettier}.`,
    `Denylist: ${deny}.`
  ].join(" ");
}
