import type { TdarrToolDef } from "./tools.js";

export const TOOLS_JOBS: TdarrToolDef[] = [
  {
    name: "tdarr_search_job_reports",
    description: "Search job reports",
    method: "POST",
    path: "/api/v2/search-job-reports",
    inputSchema: {
      type: "object",
      properties: {
        searchTerms: { type: "string", description: "Search terms" },
      },
      required: ["searchTerms"],
    },
  },
  {
    name: "tdarr_read_job_file",
    description: "Read a job report",
    method: "POST",
    path: "/api/v2/read-job-file",
    inputSchema: {
      type: "object",
      properties: {
        footprintId: { type: "string", description: "Footprint ID" },
        jobId: { type: "string", description: "Job ID" },
        jobFileId: { type: "string", description: "Job file ID" },
      },
      required: ["footprintId", "jobId", "jobFileId"],
    },
  },
  {
    name: "tdarr_delete_job_report",
    description: "Delete a single job report from both database and disk",
    method: "POST",
    path: "/api/v2/delete-job-report",
    inputSchema: {
      type: "object",
      properties: {
        jobId: { type: "string", description: "Job ID to delete" },
      },
      required: ["jobId"],
    },
  },
  {
    name: "tdarr_delete_job_reports",
    description: "Delete multiple job reports from both database and disk (with optional filters)",
    method: "POST",
    path: "/api/v2/delete-job-reports",
    inputSchema: {
      type: "object",
      properties: {
        filters: { type: "array", description: "Optional array of filter objects" },
      },
    },
  },
  {
    name: "tdarr_list_footprint_reports",
    description: "List all job reports for a specific footprintId",
    method: "POST",
    path: "/api/v2/list-footprintId-reports",
    inputSchema: {
      type: "object",
      properties: {
        footprintId: { type: "string", description: "Footprint ID" },
      },
      required: ["footprintId"],
    },
  },
];
