import type { TdarrToolDef } from "./tools.js";

export const TOOLS_PLUGINS: TdarrToolDef[] = [
  {
    name: "tdarr_copy_community_to_local",
    description: "Copy a community plugin to local plugins",
    method: "POST",
    path: "/api/v2/copy-community-to-local",
    inputSchema: {
      type: "object",
      properties: {
        pluginID: { type: "string", description: "Plugin ID to copy" },
        forceOverwrite: { type: "boolean", description: "Force overwrite if exists" },
      },
      required: ["pluginID", "forceOverwrite"],
    },
  },
  {
    name: "tdarr_create_plugin",
    description: "Create a basic classic plugin using the classic plugin creator",
    method: "POST",
    path: "/api/v2/create-plugin",
    inputSchema: {
      type: "object",
      properties: {
        details: { type: "object", description: "Plugin details" },
        conditionalsString: { type: "string", description: "Conditionals string" },
        conditionalNotes: { type: "string", description: "Conditional notes" },
        action: { type: "object", description: "Plugin action" },
      },
      required: ["details", "conditionalsString", "conditionalNotes", "action"],
    },
  },
  {
    name: "tdarr_delete_plugin",
    description: "Delete a plugin",
    method: "POST",
    path: "/api/v2/delete-plugin",
    inputSchema: {
      type: "object",
      properties: {
        pluginSource: { type: "string", description: "Plugin source (local/community)" },
        pluginID: { type: "string", description: "Plugin ID" },
      },
      required: ["pluginSource", "pluginID"],
    },
  },
  {
    name: "tdarr_read_plugin_text",
    description: "Read a plugin file for the classic plugin editor",
    method: "POST",
    path: "/api/v2/read-plugin-text",
    inputSchema: {
      type: "object",
      properties: {
        pluginSource: { type: "string", description: "Plugin source (local/community)" },
        pluginID: { type: "string", description: "Plugin ID" },
      },
      required: ["pluginSource", "pluginID"],
    },
  },
  {
    name: "tdarr_save_plugin_text",
    description: "Save plugin text for the classic plugin editor",
    method: "POST",
    path: "/api/v2/save-plugin-text",
    inputSchema: {
      type: "object",
      properties: {
        pluginSource: { type: "string", description: "Plugin source (local/community)" },
        pluginID: { type: "string", description: "Plugin ID" },
        text: { type: "string", description: "Plugin text content" },
      },
      required: ["pluginSource", "pluginID", "text"],
    },
  },
  {
    name: "tdarr_search_flow_plugins",
    description: "Search flow plugins",
    method: "POST",
    path: "/api/v2/search-flow-plugins",
    inputSchema: {
      type: "object",
      properties: {
        string: { type: "string", description: "Search string" },
        pluginType: { type: "string", description: "Plugin type filter" },
      },
      required: ["string", "pluginType"],
    },
  },
  {
    name: "tdarr_search_flow_templates",
    description: "Search flow templates",
    method: "POST",
    path: "/api/v2/search-flow-templates",
    inputSchema: {
      type: "object",
      properties: {
        string: { type: "string", description: "Search string" },
        pluginType: { type: "string", description: "Plugin type filter" },
      },
      required: ["string", "pluginType"],
    },
  },
  {
    name: "tdarr_search_plugins",
    description: "Search classic plugins",
    method: "POST",
    path: "/api/v2/search-plugins",
    inputSchema: {
      type: "object",
      properties: {
        string: { type: "string", description: "Search string" },
        pluginType: { type: "string", description: "Plugin type filter" },
      },
      required: ["string", "pluginType"],
    },
  },
  {
    name: "tdarr_update_plugins",
    description: "Request the server to update community plugins",
    method: "POST",
    path: "/api/v2/update-plugins",
    inputSchema: {
      type: "object",
      properties: {
        force: { type: "boolean", description: "Force update" },
      },
      required: ["force"],
    },
  },
];
