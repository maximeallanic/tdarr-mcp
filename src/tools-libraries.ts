import type { TdarrToolDef } from "./tools.js";

export const TOOLS_LIBRARIES: TdarrToolDef[] = [
  {
    name: "tdarr_add_audio_codec_exclude",
    description: "Add an audio codec to be excluded/included in basic audio transcoding settings",
    method: "POST",
    path: "/api/v2/add-audio-codec-exclude",
    inputSchema: {
      type: "object",
      properties: {
        dbID: { type: "string", description: "Library database ID" },
        ele: { type: "string", description: "Audio codec element" },
      },
      required: ["dbID", "ele"],
    },
  },
  {
    name: "tdarr_add_plugin_include",
    description: "Add a plugin to a classic plugin stack",
    method: "POST",
    path: "/api/v2/add-plugin-include",
    inputSchema: {
      type: "object",
      properties: {
        dbID: { type: "string", description: "Library database ID" },
        ele: { type: "string", description: "Plugin element" },
        source: { type: "string", description: "Plugin source" },
        index: { type: "integer", description: "Plugin index in stack" },
      },
      required: ["dbID", "ele", "source", "index"],
    },
  },
  {
    name: "tdarr_add_video_codec_exclude",
    description: "Add a video codec to be excluded/included in basic video transcoding settings",
    method: "POST",
    path: "/api/v2/add-video-codec-exclude",
    inputSchema: {
      type: "object",
      properties: {
        dbID: { type: "string", description: "Library database ID" },
        ele: { type: "string", description: "Video codec element" },
      },
      required: ["dbID", "ele"],
    },
  },
  {
    name: "tdarr_get_filescanner_status",
    description: "Get the status of a file scanner in progress",
    method: "POST",
    path: "/api/v2/get-filescanner-status",
    inputSchema: {
      type: "object",
      properties: {
        dbID: { type: "string", description: "Library database ID" },
      },
      required: ["dbID"],
    },
  },
  {
    name: "tdarr_get_subdirectories",
    description: "Get subdirectories of a folder",
    method: "POST",
    path: "/api/v2/get-subdirectories",
    inputSchema: {
      type: "object",
      properties: {
        folderPath: { type: "string", description: "Folder path to list subdirectories" },
      },
      required: ["folderPath"],
    },
  },
  {
    name: "tdarr_kill_file_scanner",
    description: "Kill a file scanner in progress",
    method: "POST",
    path: "/api/v2/kill-file-scanner",
    inputSchema: {
      type: "object",
      properties: {
        dbID: { type: "string", description: "Library database ID" },
      },
      required: ["dbID"],
    },
  },
  {
    name: "tdarr_remove_audio_codec_exclude",
    description: "Remove an audio codec from the excluded/included list in basic audio transcoding settings",
    method: "POST",
    path: "/api/v2/remove-audio-codec-exclude",
    inputSchema: {
      type: "object",
      properties: {
        dbID: { type: "string", description: "Library database ID" },
        ele: { type: "string", description: "Audio codec element" },
      },
      required: ["dbID", "ele"],
    },
  },
  {
    name: "tdarr_remove_library_files",
    description: "Remove all files from a Tdarr library DB (files on disk are not removed)",
    method: "POST",
    path: "/api/v2/remove-library-files",
    inputSchema: {
      type: "object",
      properties: {
        DB: { type: "string", description: "Library database name" },
      },
      required: ["DB"],
    },
  },
  {
    name: "tdarr_remove_plugin_include",
    description: "Remove a plugin from a classic plugin stack",
    method: "POST",
    path: "/api/v2/remove-plugin-include",
    inputSchema: {
      type: "object",
      properties: {
        dbID: { type: "string", description: "Library database ID" },
        ele: { type: "string", description: "Plugin element" },
      },
      required: ["dbID", "ele"],
    },
  },
  {
    name: "tdarr_remove_video_codec_exclude",
    description: "Remove a video codec from the excluded/included list in basic video transcoding settings",
    method: "POST",
    path: "/api/v2/remove-video-codec-exclude",
    inputSchema: {
      type: "object",
      properties: {
        dbID: { type: "string", description: "Library database ID" },
        ele: { type: "string", description: "Video codec element" },
      },
      required: ["dbID", "ele"],
    },
  },
  {
    name: "tdarr_scan_files",
    description: "Run a scanFresh, scanFindNew or scanFolderWatcher on a library. scanFresh & scanFindNew require a single string dbID inside scanConfig.",
    method: "POST",
    path: "/api/v2/scan-files",
    inputSchema: {
      type: "object",
      properties: {
        scanConfig: { type: "object", description: "Scan configuration object" },
      },
      required: ["scanConfig"],
    },
  },
  {
    name: "tdarr_toggle_folder_watch",
    description: "Enable/disable folder watching on a library",
    method: "POST",
    path: "/api/v2/toggle-folder-watch",
    inputSchema: {
      type: "object",
      properties: {
        auto: { type: "boolean", description: "Auto mode" },
        folder: { type: "string", description: "Folder path" },
        dbID: { type: "string", description: "Library database ID" },
        status: { type: "boolean", description: "Enable (true) or disable (false)" },
      },
      required: ["auto", "folder", "dbID", "status"],
    },
  },
  {
    name: "tdarr_toggle_schedule",
    description: "Update the schedule of a library",
    method: "POST",
    path: "/api/v2/toggle-schedule",
    inputSchema: {
      type: "object",
      properties: {
        dbID: { type: "string", description: "Library database ID" },
        start: { type: "integer", description: "Schedule start hour" },
        end: { type: "integer", description: "Schedule end hour" },
        type: { type: "string", description: "Schedule type" },
      },
      required: ["dbID", "start", "end", "type"],
    },
  },
  {
    name: "tdarr_update_audio_codec_exclude",
    description: "Update an audio codec excluded/included status in basic audio transcoding settings",
    method: "POST",
    path: "/api/v2/update-audio-codec-exclude",
    inputSchema: {
      type: "object",
      properties: {
        dbID: { type: "string", description: "Library database ID" },
        ele: { type: "string", description: "Audio codec element" },
        status: { type: "boolean", description: "Exclude status" },
      },
      required: ["dbID", "ele", "status"],
    },
  },
  {
    name: "tdarr_update_plugin_include",
    description: "Enable/disable a plugin in a classic plugin stack",
    method: "POST",
    path: "/api/v2/update-plugin-include",
    inputSchema: {
      type: "object",
      properties: {
        dbID: { type: "string", description: "Library database ID" },
        ele: { type: "string", description: "Plugin element" },
        status: { type: "boolean", description: "Enable (true) or disable (false)" },
      },
      required: ["dbID", "ele", "status"],
    },
  },
  {
    name: "tdarr_update_schedule_block",
    description: "Update a block in a library schedule",
    method: "POST",
    path: "/api/v2/update-schedule-block",
    inputSchema: {
      type: "object",
      properties: {
        dbID: { type: "string", description: "Library database ID" },
        ele: { type: "string", description: "Schedule block element" },
        status: { type: "boolean", description: "Block status" },
      },
      required: ["dbID", "ele", "status"],
    },
  },
  {
    name: "tdarr_update_video_codec_exclude",
    description: "Update a video codec excluded/included status in basic video transcoding settings",
    method: "POST",
    path: "/api/v2/update-video-codec-exclude",
    inputSchema: {
      type: "object",
      properties: {
        dbID: { type: "string", description: "Library database ID" },
        ele: { type: "string", description: "Video codec element" },
        status: { type: "boolean", description: "Exclude status" },
      },
      required: ["dbID", "ele", "status"],
    },
  },
  {
    name: "tdarr_verify_folder_exists",
    description: "Verify if a folder exists",
    method: "POST",
    path: "/api/v2/verify-folder-exists",
    inputSchema: {
      type: "object",
      properties: {
        folderPath: { type: "string", description: "Folder path to verify" },
      },
      required: ["folderPath"],
    },
  },
  {
    name: "tdarr_verify_plugin",
    description: "Verify if a classic plugin exists",
    method: "POST",
    path: "/api/v2/verify-plugin",
    inputSchema: {
      type: "object",
      properties: {
        pluginID: { type: "string", description: "Plugin ID" },
        community: { type: "boolean", description: "Whether it is a community plugin" },
      },
      required: ["pluginID", "community"],
    },
  },
];
