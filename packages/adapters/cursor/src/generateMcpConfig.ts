/**
 * Generate .cursor/mcp.json (MCP stub for rewritePrompt tool)
 */
export function generateMcpConfig(port: number = 3000): string {
  return JSON.stringify(
    {
      mcpServers: {
        'prompt-orchestrator': {
          command: 'node',
          args: ['--loader', 'tsx', 'apps/orchestrator/src/index.ts'],
          env: {
            PORT: port.toString(),
          },
          tools: [
            {
              name: 'rewritePrompt',
              description:
                'Rewrite a user task into a Cursor-native prompt using Context Engineering, VS, and Self-Adapt',
              inputSchema: {
                type: 'object',
                properties: {
                  task: {
                    type: 'string',
                    description: 'The user request to rewrite',
                  },
                  mode_flags: {
                    type: 'object',
                    properties: {
                      vs_enabled: { type: 'boolean', default: true },
                      vs_k: { type: 'number', default: 3 },
                      self_adapt: { type: 'boolean', default: true },
                    },
                  },
                  constraints: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                  deliverables: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                },
                required: ['task'],
              },
            },
          ],
        },
      },
    },
    null,
    2
  );
}


