export default {
  defaultTargetTools: ["cursor"],
  vs: { enabled: true, k: 3 },
  selfAdapt: true,
  constraints: ["Node 20","TypeScript","Fastify","pnpm workspace","no secrets committed"],
  deliverables: ["POST /rewrite","Cursor Rules+Commands","MCP stub","Unit tests","Docs"]
};
