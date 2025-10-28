// Cross-platform smoke tests for API endpoints.
import { setTimeout as delay } from "node:timers/promises";
import { readFile } from "node:fs/promises";

const prompts = JSON.parse(await readFile(new URL("./seed-prompts.json", import.meta.url), "utf-8"));

const API = process.env.API_URL ?? "http://127.0.0.1:3000";

async function req(path, init){
  const r = await fetch(`${API}${path}`, { ...init, headers:{ "Content-Type":"application/json", ...(init?.headers||{}) } });
  const text = await r.text();
  return { ok:r.ok, status:r.status, text };
}

async function main(){
  console.log("API =", API);
  let r = await req("/healthz");
  console.log("GET /healthz ->", r.status, r.text);
  r = await req("/version");
  console.log("GET /version ->", r.status, r.text);
  // exercise multiple prompts/targets
  const targets = ["cursor","chatgpt","claude-code"];
  for (const p of prompts) {
    for (const t of targets) {
      const body = JSON.stringify({ raw_prompt:p, target:t, mode_flags:{vs:true,k:3,self_adapt:true} });
      r = await req("/rewrite", { method:"POST", body });
      console.log(`[${t}] /rewrite json ->`, r.status, r.text.slice(0,120)+"...");
      r = await req("/rewrite?format=text", { method:"POST", body });
      console.log(`[${t}] /rewrite text ->`, r.status, r.text.slice(0,120)+"...");
      if (!r.ok) process.exitCode = 1;
    }
  }
}
main().catch(e=>{ console.error(e); process.exit(1); });

