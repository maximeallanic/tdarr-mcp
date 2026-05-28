import type { TdarrToolDef } from "./tools.js";

export const TOOLS_FILES: TdarrToolDef[] = [
  {
    name: "tdarr_bulk_delete_files",
    description: "Bulk delete selected files from disk and remove them from the database",
    method: "POST",
    path: "/api/v2/bulk-delete-files",
    inputSchema: {
      type: "object",
      properties: {
        fileIds: { type: "array", items: { type: "string" }, description: "Array of file IDs to delete" },
      },
      required: ["fileIds"],
    },
  },
  {
    name: "tdarr_bulk_update_files",
    description: "Bulk update specific files by their IDs",
    method: "POST",
    path: "/api/v2/bulk-update-files",
    inputSchema: {
      type: "object",
      properties: {
        fileIds: { type: "array", items: { type: "string" }, description: "Array of file IDs to update" },
        updatedObj: { type: "object", description: "Object with updated fields" },
      },
      required: ["fileIds", "updatedObj"],
    },
  },
  {
    name: "tdarr_create_sample",
    description: "Create a 30 second sample of a file",
    method: "POST",
    path: "/api/v2/create-sample",
    inputSchema: {
      type: "object",
      properties: {
        filePath: { type: "string", description: "Path to the file" },
      },
      required: ["filePath"],
    },
  },
  {
    name: "tdarr_delete_cache_file",
    description: "Delete a cache file",
    method: "POST",
    path: "/api/v2/delete-cache-file",
    inputSchema: {
      type: "object",
      properties: {
        file: { type: "string", description: "Cache file to delete" },
      },
      required: ["file"],
    },
  },
  {
    name: "tdarr_delete_file",
    description: "Delete a file on disk of a file in Tdarr DB",
    method: "POST",
    path: "/api/v2/delete-file",
    inputSchema: {
      type: "object",
      properties: {
        file: { type: "object", description: "File object to delete" },
      },
      required: ["file"],
    },
  },
  {
    name: "tdarr_delete_unhealthy_files",
    description: "Delete files which have failed to transcode (table3) or unhealthy files (table6)",
    method: "POST",
    path: "/api/v2/delete-unhealthy-files",
    inputSchema: {
      type: "object",
      properties: {
        table: { type: "string", description: "Table to delete from (table3 or table6)" },
      },
      required: ["table"],
    },
  },
  {
    name: "tdarr_find_duplicates",
    description: "Start the find duplicates process",
    method: "POST",
    path: "/api/v2/find-duplicates",
    inputSchema: {
      type: "object",
      properties: {
        threshold: { type: "number", description: "Similarity threshold" },
        count: { type: "number", description: "Maximum number of duplicates to find" },
      },
      required: ["threshold", "count"],
    },
  },
  {
    name: "tdarr_rescan_file",
    description: "Rescan a file",
    method: "POST",
    path: "/api/v2/rescan-file",
    inputSchema: {
      type: "object",
      properties: {
        _id: { type: "string", description: "File ID" },
        DB: { type: "string", description: "Database name" },
      },
      required: ["_id", "DB"],
    },
  },
  {
    name: "tdarr_scan_individual_file",
    description: "Scan an individual file with various tools",
    method: "POST",
    path: "/api/v2/scan-individual-file",
    inputSchema: {
      type: "object",
      properties: {
        scanTypes: { type: "object", description: "Object specifying which scan types to run" },
        file: { type: "object", description: "File object to scan" },
      },
      required: ["scanTypes", "file"],
    },
  },
  {
    name: "tdarr_set_all_status",
    description: "Requeue files for transcode or health check for a specific library",
    method: "POST",
    path: "/api/v2/set-all-status",
    inputSchema: {
      type: "object",
      properties: {
        dbID: { type: "string", description: "Library database ID" },
        mode: { type: "string", description: "Mode (e.g. transcode, health_check)" },
        table: { type: "string", description: "Table name" },
        processStatus: { type: "string", description: "Process status to set" },
      },
      required: ["dbID", "mode", "table", "processStatus"],
    },
  },
  {
    name: "tdarr_transcode_user_verdict",
    description: "Take action on a staged item",
    method: "POST",
    path: "/api/v2/transcode-user-verdict",
    inputSchema: {
      type: "object",
      properties: {
        obj: { type: "object", description: "File object" },
        verdict: { type: "string", description: "User verdict (accept/reject)" },
      },
      required: ["obj", "verdict"],
    },
  },
];
