import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { TDARR_TOOLS } from "./tools.js";
import { executeTool } from "./handler.js";

const server = new Server(
  { name: "tdarr-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } },
);

const toolMap = new Map(TDARR_TOOLS.map((t) => [t.name, t]));

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TDARR_TOOLS.map((t) => ({
    name: t.name,
    description: t.description,
    inputSchema: t.inputSchema,
  })),
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const def = toolMap.get(req.params.name);
  if (!def) {
    return {
      content: [{ type: "text" as const, text: `Unknown tool: ${req.params.name}` }],
      isError: true,
    };
  }
  return executeTool(def, (req.params.arguments ?? {}) as Record<string, unknown>);
});

const transport = new StdioServerTransport();
await server.connect(transport);
