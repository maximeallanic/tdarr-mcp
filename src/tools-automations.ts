import type { TdarrToolDef } from "./tools.js";

export const TOOLS_AUTOMATIONS: TdarrToolDef[] = [
  {
    name: "tdarr_run_automation",
    description: "Manually trigger an automation",
    method: "POST",
    path: "/api/v2/run-automation",
    inputSchema: {
      type: "object",
      properties: {
        configId: { type: "string", description: "Automation config ID" },
        payload: { type: "object", description: "Optional payload object" },
        libraryIds: { type: "array", items: { type: "string" }, description: "Library IDs to run on" },
        targetNodeNames: { type: "array", items: { type: "string" }, description: "Target node names" },
        targetNodeIds: { type: "array", items: { type: "string" }, description: "Target node IDs" },
        executeImmediately: { type: "boolean", description: "Execute immediately" },
        bypassWorkerLimits: { type: "boolean", description: "Bypass worker limits" },
        bypassStagedFileLimit: { type: "boolean", description: "Bypass staged file limit" },
      },
      required: ["configId"],
    },
  },
];
