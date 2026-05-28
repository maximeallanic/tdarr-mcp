import type { TdarrToolDef } from "./tools.js";

export const TOOLS_NODES: TdarrToolDef[] = [
  {
    name: "tdarr_alter_worker_limit",
    description: "Change the number of running workers of a specific type on a specific node",
    method: "POST",
    path: "/api/v2/alter-worker-limit",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "Node ID" },
        process: { type: "string", description: "Process type" },
        workerType: { type: "string", description: "Worker type" },
      },
      required: ["nodeID", "process", "workerType"],
    },
  },
  {
    name: "tdarr_cancel_worker_item",
    description: "Cancel a running worker item on a specific node",
    method: "POST",
    path: "/api/v2/cancel-worker-item",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "Node ID" },
        workerID: { type: "string", description: "Worker ID" },
        cause: { type: "string", description: "Cancellation cause" },
      },
      required: ["nodeID", "workerID", "cause"],
    },
  },
  {
    name: "tdarr_disconnect_node",
    description: "Forcefully disconnect a node",
    method: "POST",
    path: "/api/v2/disconnect-node",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "Node ID to disconnect" },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "tdarr_download_plugins",
    description: "Download the latest plugins zip (used by nodes)",
    method: "GET",
    path: "/api/v2/download-plugins",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "tdarr_file_download",
    description: "Download a file",
    method: "POST",
    path: "/api/v2/file/download",
    dataWrapped: false,
    inputSchema: {
      type: "object",
      properties: {
        filePath: { type: "string", description: "Path to the file to download" },
      },
    },
  },
  {
    name: "tdarr_file_upload",
    description: "Upload a file",
    method: "POST",
    path: "/api/v2/file/upload",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "tdarr_get_new_task",
    description: "Request a new task for a node",
    method: "POST",
    path: "/api/v2/get-new-task",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "Node ID" },
        workerID: { type: "string", description: "Worker ID" },
        workerType: { type: "string", description: "Worker type" },
        automation: { type: "object", description: "Automation config object" },
      },
      required: ["nodeID", "workerID", "workerType"],
    },
  },
  {
    name: "tdarr_get_node_log",
    description: "Get the log of a node",
    method: "POST",
    path: "/api/v2/get-node-log",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "Node ID" },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "tdarr_get_nodes",
    description: "Get connected nodes information",
    method: "GET",
    path: "/api/v2/get-nodes",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "tdarr_item_proc_end",
    description: "Signal that a node completed processing an item",
    method: "POST",
    path: "/api/v2/item-proc-end",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "Node ID" },
        obj: { type: "object", description: "Processing result object" },
      },
      required: ["nodeID", "obj"],
    },
  },
  {
    name: "tdarr_kill_worker",
    description: "Kill a worker on a node",
    method: "POST",
    path: "/api/v2/kill-worker",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "Node ID" },
        workerID: { type: "string", description: "Worker ID" },
      },
      required: ["nodeID", "workerID"],
    },
  },
  {
    name: "tdarr_log_job_report",
    description: "Update a job report",
    method: "POST",
    path: "/api/v2/log-job-report",
    inputSchema: {
      type: "object",
      properties: {
        date: { type: "number", description: "Timestamp" },
        job: { type: "object", description: "Job object" },
        text: { type: "string", description: "Report text" },
      },
      required: ["date", "job", "text"],
    },
  },
  {
    name: "tdarr_nodes_version_check",
    description: "Verify the server version before establishing a full node connection",
    method: "POST",
    path: "/api/v2/nodes/version-check",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "Node ID" },
        nodeName: { type: "string", description: "Node name" },
        nodeVersion: { type: "string", description: "Node version" },
        nodeType: { type: "string", description: "Node type" },
        inDocker: { type: "boolean", description: "Whether node is in Docker" },
        processPid: { type: "integer", description: "Process PID" },
      },
      required: ["nodeVersion"],
    },
  },
  {
    name: "tdarr_poll_worker_limits",
    description: "Get worker limits for a node and check if there's anything in the queue",
    method: "POST",
    path: "/api/v2/poll-worker-limits",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "Node ID" },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "tdarr_read_plugin",
    description: "Read a plugin (used by nodes)",
    method: "POST",
    path: "/api/v2/read-plugin",
    inputSchema: {
      type: "object",
      properties: {
        plugin: { type: "object", description: "Plugin object" },
      },
      required: ["plugin"],
    },
  },
  {
    name: "tdarr_restart_node",
    description: "Restart a specific node",
    method: "POST",
    path: "/api/v2/restart-node",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "Node ID to restart" },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "tdarr_sync_plugins",
    description: "Sync plugins from server to all nodes",
    method: "POST",
    path: "/api/v2/sync-plugins",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "tdarr_update_node",
    description: "Update a connected node from the UI",
    method: "POST",
    path: "/api/v2/update-node",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "Node ID" },
        nodeUpdates: { type: "object", description: "Object with node updates" },
      },
      required: ["nodeID", "nodeUpdates"],
    },
  },
  {
    name: "tdarr_update_node_relay",
    description: "Update the server with node status (used by nodes)",
    method: "POST",
    path: "/api/v2/update-node-relay",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "Node ID" },
        resStats: { type: "object", description: "Resource stats object" },
        workers: { type: "object", description: "Workers status object" },
      },
      required: ["nodeID", "resStats", "workers"],
    },
  },
];
