import { FastifyPluginCallback } from "fastify";
import { z } from "zod";
import { rewrite, type RewriteInput, renderPlain, shapeForCursor } from "../../../packages/core/src/rewrite.js";

const bodySchema = z.object({
  raw_prompt: z.string(),
  target: z.enum(["cursor","chatgpt","claude-code","copilot","kiro","lovable"]).default("cursor"),
  mode_flags: z
    .object({
      vs: z.boolean().default(true),
      k: z.number().int().min(1).max(7).default(3),
      self_adapt: z.boolean().default(true)
    })
    .default({ vs: true, k: 3, self_adapt: true }),
  user_prefs: z.record(z.any()).optional()
});

const BEHAVIOR_LITE = process.env.BEHAVIOR_LITE !== 'false';

export const rewriteHandler: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.post("/rewrite", async (req, reply) => {
    const parsed = bodySchema.parse(req.body);
    
    // Behavior Lite: task-intelligent prompts for Cursor
    if (BEHAVIOR_LITE && parsed.target === 'cursor') {
      const shaped = await shapeForCursor(parsed.raw_prompt);
      const liteResult = {
        system: 'Act as Staff Engineer + Prompt Engineer.',
        instructions: 'Follow sections strictly; fix failing checks before final.',
        context_snippets: [],
        plan: shaped.Plan || [],
        checks: shaped.Checks || [],
        deliverables: shaped.Deliverables || [],
        sections: shaped
      };
      const accept = (req.headers["accept"] ?? "") as string;
      const format = (req.query as any)?.format as string | undefined;
      if (format === "text" || accept.includes("text/plain")) {
        reply.header("Content-Type","text/plain; charset=utf-8").send(renderPlain(liteResult, parsed.target));
      } else {
        reply.send(liteResult);
      }
      return;
    }
    
    // Fallback: original behavior for other tools or when BEHAVIOR_LITE=false
    const result = await rewrite(parsed as RewriteInput);
    const accept = (req.headers["accept"] ?? "") as string;
    const format = (req.query as any)?.format as string | undefined;
    if (format === "text" || accept.includes("text/plain")) {
      reply.header("Content-Type","text/plain; charset=utf-8").send(renderPlain(result, parsed.target));
    } else {
      reply.send(result);
    }
  });
  done();
};
