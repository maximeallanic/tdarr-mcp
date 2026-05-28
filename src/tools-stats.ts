import type { TdarrToolDef } from "./tools.js";

export const TOOLS_STATS: TdarrToolDef[] = [
  {
    name: "tdarr_stats_get_pies",
    description: "Get all or library pie stats",
    method: "POST",
    path: "/api/v2/stats/get-pies",
    inputSchema: {
      type: "object",
      properties: {
        libraryId: { type: "string", description: "Optional library ID to filter" },
      },
    },
  },
  {
    name: "tdarr_stats_get_res_hist",
    description: "Get server resource history",
    method: "POST",
    path: "/api/v2/stats/get-res-hist",
    inputSchema: {
      type: "object",
      properties: {
        timeframe: { type: "string", description: "Timeframe for history" },
      },
    },
  },
  {
    name: "tdarr_stats_get_running_worker_hist",
    description: "Get running worker history",
    method: "POST",
    path: "/api/v2/stats/get-running-worker-hist",
    inputSchema: {
      type: "object",
      properties: {
        timeframe: { type: "string", description: "Timeframe for history" },
      },
    },
  },
  {
    name: "tdarr_stats_get_space_saved",
    description: "Get space saved history",
    method: "POST",
    path: "/api/v2/stats/get-space-saved",
    inputSchema: {
      type: "object",
      properties: {
        libraryId: { type: "string", description: "Optional library ID" },
        timeframe: { type: "string", description: "Timeframe for history" },
        nodeId: { type: "string", description: "Optional node ID" },
        workerType: { type: "string", description: "Optional worker type" },
        pluginId: { type: "string", description: "Optional plugin ID" },
      },
    },
  },
  {
    name: "tdarr_stats_get_streams",
    description: "Get stream stats info",
    method: "POST",
    path: "/api/v2/stats/get-streams",
    inputSchema: {
      type: "object",
      properties: {
        libraryId: { type: "string", description: "Optional library ID" },
      },
    },
  },
  {
    name: "tdarr_stats_get_worker_verdict_hist",
    description: "Get worker verdict history",
    method: "POST",
    path: "/api/v2/stats/get-worker-verdict-hist",
    inputSchema: {
      type: "object",
      properties: {
        timeframe: { type: "string", description: "Timeframe for history" },
        libraryId: { type: "string", description: "Optional library ID" },
        nodeId: { type: "string", description: "Optional node ID" },
        workerType: { type: "string", description: "Optional worker type" },
      },
    },
  },
  {
    name: "tdarr_stats_space_saved_add",
    description: "Add a space saved record",
    method: "POST",
    path: "/api/v2/stats/space-saved-add",
    inputSchema: {
      type: "object",
      properties: {
        libraryId: { type: "string", description: "Library ID" },
        spaceSaved: { type: "number", description: "Space saved value" },
      },
    },
  },
];
