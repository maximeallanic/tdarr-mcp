export interface TdarrToolDef {
  name: string;
  description: string;
  method: "GET" | "POST";
  path: string;
  inputSchema: {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
  };
  dataWrapped?: boolean; // default true for POST, set false for direct-body endpoints
}

import { TOOLS_AUTOMATIONS } from "./tools-automations.js";
import { TOOLS_BACKUPS } from "./tools-backups.js";
import { TOOLS_DATABASE } from "./tools-database.js";
import { TOOLS_FILES } from "./tools-files.js";
import { TOOLS_JOBS } from "./tools-jobs.js";
import { TOOLS_LIBRARIES } from "./tools-libraries.js";
import { TOOLS_NODES } from "./tools-nodes.js";
import { TOOLS_PLUGINS } from "./tools-plugins.js";
import { TOOLS_PROCESSES } from "./tools-processes.js";
import { TOOLS_SERVER } from "./tools-server.js";
import { TOOLS_STATS } from "./tools-stats.js";
import { TOOLS_USERS } from "./tools-users.js";

export const TDARR_TOOLS: TdarrToolDef[] = [
  ...TOOLS_AUTOMATIONS,
  ...TOOLS_BACKUPS,
  ...TOOLS_DATABASE,
  ...TOOLS_FILES,
  ...TOOLS_JOBS,
  ...TOOLS_LIBRARIES,
  ...TOOLS_NODES,
  ...TOOLS_PLUGINS,
  ...TOOLS_PROCESSES,
  ...TOOLS_SERVER,
  ...TOOLS_STATS,
  ...TOOLS_USERS,
];
