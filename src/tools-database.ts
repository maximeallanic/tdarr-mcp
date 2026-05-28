import type { TdarrToolDef } from "./tools.js";

export const TOOLS_DATABASE: TdarrToolDef[] = [
  {
    name: "tdarr_cruddb",
    description: "Interact with the database. Modes: insert (requires collection, docID, obj), getById (requires collection, docID), getAll (requires collection), update (requires collection, docID, obj), delete (requires collection, docID), filter (requires collection, filters)",
    method: "POST",
    path: "/api/v2/cruddb",
    inputSchema: {
      type: "object",
      properties: {
        collection: { type: "string", description: "Database collection name" },
        mode: { type: "string", description: "Operation mode: insert, getById, getAll, update, delete, filter", enum: ["insert", "getById", "getAll", "update", "delete", "filter"] },
        docID: { type: "string", description: "Document ID (required for insert, getById, update, delete)" },
        obj: { type: "object", description: "Object with keys/values (required for insert, update)" },
        filters: { type: "array", description: "Array of filter objects (for filter mode)" },
      },
      required: ["collection", "mode"],
    },
  },
  {
    name: "tdarr_search_db",
    description: "Search the file database (legacy endpoint, prefer tdarr_client instead)",
    method: "POST",
    path: "/api/v2/search-db",
    inputSchema: {
      type: "object",
      properties: {
        string: { type: "string", description: "Search string" },
        greaterThanGB: { type: "number", description: "Minimum file size in GB" },
        lessThanGB: { type: "number", description: "Maximum file size in GB" },
      },
      required: ["string", "greaterThanGB", "lessThanGB"],
    },
  },
  {
    name: "tdarr_client",
    description: "Load and update data in various tables found around the Tdarr UI. clientType can be: files, staging, rejected, transcode_success, transcode_error, health_check_success, health_check_error",
    method: "POST",
    path: "/api/v2/client/:clientType",
    inputSchema: {
      type: "object",
      properties: {
        clientType: { type: "string", description: "Table type to query (e.g. files, staging, rejected, transcode_success, transcode_error, health_check_success, health_check_error)" },
        start: { type: "number", description: "Pagination start index" },
        pageSize: { type: "number", description: "Number of items per page" },
        filters: { type: "array", description: "Array of filter objects" },
        sorts: { type: "array", description: "Array of sort objects" },
        opts: { type: "object", description: "Additional options" },
      },
      required: ["clientType", "start", "pageSize", "filters", "sorts", "opts"],
    },
  },
];
