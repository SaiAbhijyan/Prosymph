import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { readFile } from "fs/promises";
import { rewriteHandler } from "./routes/rewrite.js";
import { fastifyLogger } from "./logger.js";

const app = Fastify({ logger: fastifyLogger });
// CORS allowlist from env (comma-separated). Fallback covers localhost + 127.0.0.1.
const corsOrigins = (process.env.CORS_ORIGINS ?? "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000").split(",").map(s=>s.trim()).filter(Boolean);
// Optional regex matcher for deployments (e.g., *.vercel.app, *.netlify.app)
const corsRegex = process.env.CORS_REGEX ? new RegExp(process.env.CORS_REGEX) : null;
await app.register(fastifyCors, {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (corsOrigins.includes(origin)) return cb(null, true);
    if (corsRegex && corsRegex.test(origin)) return cb(null, true);
    return cb(null, false);
  },
  methods: ["GET","POST","OPTIONS"]
});

// API key preHandler
app.addHook("preHandler", async (req, reply) => {
  if (req.routerPath === "/healthz" || req.routerPath === "/version") return;
  const required = process.env.ORCH_API_KEY;
  if (!required) return;
  const got = req.headers["x-api-key"];
  if (got !== required) {
    reply.code(401).send({ error: "Unauthorized" });
  }
});

app.get("/healthz", async () => ({ status: "ok" }));
app.get("/version", async () => {
  try {
    const pkg = JSON.parse(await readFile(new URL("../../../package.json", import.meta.url), "utf-8"));
    return { name: pkg.name, version: pkg.version };
  } catch {
    return { name: "orchestrator", version: "unknown" };
  }
});
app.register(rewriteHandler, { prefix: "/" });

const port = Number(process.env.PORT || 3000);

try {
  await app.listen({ port, host: "0.0.0.0" });
  console.log(`[orchestrator] listening on http://localhost:${port}`);
} catch (err) {
  console.error(err);
  process.exit(1);
}
