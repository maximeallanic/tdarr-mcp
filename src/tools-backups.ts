import type { TdarrToolDef } from "./tools.js";

export const TOOLS_BACKUPS: TdarrToolDef[] = [
  {
    name: "tdarr_create_backup",
    description: "Create a backup of the Tdarr database",
    method: "POST",
    path: "/api/v2/create-backup",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "tdarr_delete_backup",
    description: "Delete a backup of the Tdarr database",
    method: "POST",
    path: "/api/v2/delete-backup",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Backup name to delete" },
      },
      required: ["name"],
    },
  },
  {
    name: "tdarr_get_backup_status",
    description: "Get the status of a Tdarr backup in progress",
    method: "POST",
    path: "/api/v2/get-backup-status",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "tdarr_get_backups",
    description: "Get a list of backups of the Tdarr database",
    method: "POST",
    path: "/api/v2/get-backups",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "tdarr_reset_backup_status",
    description: "Reset the backup status",
    method: "POST",
    path: "/api/v2/reset-backup-status",
    inputSchema: { type: "object", properties: {} },
  },
];
