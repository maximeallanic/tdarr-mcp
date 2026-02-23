import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import pino from "pino";

import {
  getStatus,
  getWorkers,
  getLibraries,
  getLibraryStats,
  scanLibrary,
  getQueue,
  pauseWorker,
  resumeWorker,
  TdarrApiError,
} from "./tdarr.js";

const logger = pino({ name: "tdarr-mcp" });

function errorResult(error: unknown) {
  const message =
    error instanceof TdarrApiError
      ? error.message
      : error instanceof Error
        ? error.message
        : String(error);
  return {
    isError: true as const,
    content: [{ type: "text" as const, text: message }],
  };
}

const server = new McpServer({
  name: "tdarr-mcp",
  version: "1.0.0",
});

// 1. get_status
server.tool("get_status", "Get Tdarr server status (version, uptime)", {}, async () => {
  try {
    const result = await getStatus();
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  } catch (err) {
    logger.error(err, "get_status failed");
    return errorResult(err);
  }
});

// 2. get_workers
server.tool(
  "get_workers",
  "List all Tdarr workers/nodes with status and progress",
  {},
  async () => {
    try {
      const result = await getWorkers();
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } catch (err) {
      logger.error(err, "get_workers failed");
      return errorResult(err);
    }
  },
);

// 3. get_libraries
server.tool(
  "get_libraries",
  "List all configured Tdarr libraries",
  {},
  async () => {
    try {
      const result = await getLibraries();
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } catch (err) {
      logger.error(err, "get_libraries failed");
      return errorResult(err);
    }
  },
);

// 4. get_library_stats
server.tool(
  "get_library_stats",
  "Get detailed statistics for a specific Tdarr library",
  {
    library_id: z.string().describe("The ID of the library to get stats for"),
  },
  async ({ library_id }) => {
    try {
      const result = await getLibraryStats(library_id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } catch (err) {
      logger.error(err, "get_library_stats failed");
      return errorResult(err);
    }
  },
);

// 5. scan_library
server.tool(
  "scan_library",
  "Trigger a file scan on a Tdarr library",
  {
    library_id: z.string().describe("The ID of the library to scan"),
  },
  async ({ library_id }) => {
    try {
      const result = await scanLibrary(library_id);
      return {
        content: [
          {
            type: "text",
            text: `Scan triggered for library ${library_id}.\n${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    } catch (err) {
      logger.error(err, "scan_library failed");
      return errorResult(err);
    }
  },
);

// 6. get_queue
server.tool(
  "get_queue",
  "Get Tdarr queue status (pending, processing, error counts)",
  {},
  async () => {
    try {
      const result = await getQueue();
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } catch (err) {
      logger.error(err, "get_queue failed");
      return errorResult(err);
    }
  },
);

// 7. pause_worker
server.tool(
  "pause_worker",
  "Pause a Tdarr worker by setting its limit to 0",
  {
    node_id: z.string().describe("The ID of the node/worker to pause"),
    worker_type: z
      .enum(["transcodeCpu", "transcodeGpu", "healthCheckCpu", "healthCheckGpu"])
      .describe("Type of worker to pause"),
  },
  async ({ node_id, worker_type }) => {
    try {
      const result = await pauseWorker(node_id, worker_type);
      return {
        content: [
          {
            type: "text",
            text: `Worker ${worker_type} on node ${node_id} paused.\n${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    } catch (err) {
      logger.error(err, "pause_worker failed");
      return errorResult(err);
    }
  },
);

// 8. resume_worker
server.tool(
  "resume_worker",
  "Resume a paused Tdarr worker by restoring its limit",
  {
    node_id: z.string().describe("The ID of the node/worker to resume"),
    worker_type: z
      .enum(["transcodeCpu", "transcodeGpu", "healthCheckCpu", "healthCheckGpu"])
      .describe("Type of worker to resume"),
    count: z
      .number()
      .int()
      .positive()
      .optional()
      .default(1)
      .describe("Number of worker slots to add (default: 1)"),
  },
  async ({ node_id, worker_type, count }) => {
    try {
      const result = await resumeWorker(node_id, worker_type, count);
      return {
        content: [
          {
            type: "text",
            text: `Worker ${worker_type} on node ${node_id} resumed (+${count}).\n${JSON.stringify(result, null, 2)}`,
          },
        ],
      };
    } catch (err) {
      logger.error(err, "resume_worker failed");
      return errorResult(err);
    }
  },
);

// Start server
async function main() {
  logger.info("Starting Tdarr MCP server...");
  logger.info(`Tdarr URL: ${process.env.TDARR_URL || "http://192.168.0.1:8265"}`);

  const transport = new StdioServerTransport();
  await server.connect(transport);

  logger.info("Tdarr MCP server connected and ready.");
}

main().catch((err) => {
  logger.fatal(err, "Failed to start Tdarr MCP server");
  process.exit(1);
});
