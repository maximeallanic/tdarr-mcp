import type { TdarrToolDef } from "./tools.js";

export const TOOLS_PROCESSES: TdarrToolDef[] = [
  {
    name: "tdarr_get_process_info",
    description: "Get process information from server and nodes with child process relationships",
    method: "POST",
    path: "/api/v2/get-process-info",
    inputSchema: { type: "object", properties: {} },
  },
];
