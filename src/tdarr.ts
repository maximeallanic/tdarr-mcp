import { randomUUID } from "node:crypto";
import pino from "pino";

const logger = pino({ name: "tdarr-client" });

const TDARR_URL = process.env.TDARR_URL || "http://192.168.0.1:8265";
const TIMEOUT_MS = 10_000;

export class TdarrApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "TdarrApiError";
  }
}

async function request<T>(
  path: string,
  method: "GET" | "POST" = "POST",
  body?: unknown,
): Promise<T> {
  const url = `${TDARR_URL}${path}`;
  logger.debug({ url, method }, "Tdarr API request");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new TdarrApiError(
        `Tdarr API error ${res.status}: ${text || res.statusText}`,
        res.status,
      );
    }

    return (await res.json()) as T;
  } catch (err: unknown) {
    if (err instanceof TdarrApiError) throw err;

    const error = err as Error;
    if (error.name === "AbortError") {
      throw new TdarrApiError(`Tdarr request timeout after ${TIMEOUT_MS}ms`);
    }
    if (
      error.message?.includes("ECONNREFUSED") ||
      error.cause?.toString().includes("ECONNREFUSED")
    ) {
      throw new TdarrApiError(
        `Cannot connect to Tdarr at ${TDARR_URL} — is the server running?`,
      );
    }
    throw new TdarrApiError(`Tdarr request failed: ${error.message}`);
  } finally {
    clearTimeout(timeout);
  }
}

export async function getStatus(): Promise<unknown> {
  return request("/api/v2/status", "GET");
}

export async function getWorkers(): Promise<unknown> {
  return request("/api/v2/get-nodes", "POST");
}

export async function getLibraries(): Promise<unknown> {
  return request("/api/v2/cruddb", "POST", {
    data: {
      collection: "LibrarySettingsJSONDB",
      mode: "getAll",
      docID: "table1",
      obj: {},
    },
  });
}

export async function getLibraryStats(libraryId: string): Promise<unknown> {
  return request("/api/v2/cruddb", "POST", {
    data: {
      collection: "StatisticsJSONDB",
      mode: "getById",
      docID: libraryId,
      obj: {},
    },
  });
}

export async function scanLibrary(libraryId: string): Promise<unknown> {
  return request("/api/v2/scan-files", "POST", {
    data: {
      libraryId,
      mode: "scanFolderWatcher",
    },
  });
}

export async function getQueue(): Promise<unknown> {
  return request("/api/v2/cruddb", "POST", {
    data: {
      collection: "StatisticsJSONDB",
      mode: "getById",
      docID: "table1",
      obj: {},
    },
  });
}

export async function pauseWorker(
  nodeId: string,
  workerType: string,
): Promise<unknown> {
  return request("/api/v2/alter-worker-limit", "POST", {
    data: {
      nodeId,
      workerType,
      numberToAdd: -99,
    },
  });
}

export async function resumeWorker(
  nodeId: string,
  workerType: string,
  count: number = 1,
): Promise<unknown> {
  return request("/api/v2/alter-worker-limit", "POST", {
    data: {
      nodeId,
      workerType,
      numberToAdd: count,
    },
  });
}

// --- Flow management ---

export async function getFlows(): Promise<unknown> {
  return request("/api/v2/cruddb", "POST", {
    data: {
      collection: "FlowEditorJSONDB",
      mode: "getAll",
      docID: "table1",
      obj: {},
    },
  });
}

export async function getFlow(flowId: string): Promise<unknown> {
  return request("/api/v2/cruddb", "POST", {
    data: {
      collection: "FlowEditorJSONDB",
      mode: "getById",
      docID: flowId,
      obj: {},
    },
  });
}

export async function createFlow(
  name: string,
  nodes: Record<string, unknown> = {},
  edges: unknown[] = [],
): Promise<{ id: string; flow: unknown }> {
  const id = randomUUID();
  const result = await request("/api/v2/cruddb", "POST", {
    data: {
      collection: "FlowEditorJSONDB",
      mode: "insert",
      docID: id,
      obj: { name, nodes, edges },
    },
  });
  return { id, flow: result };
}

export async function updateFlow(
  flowId: string,
  updates: Record<string, unknown>,
): Promise<unknown> {
  return request("/api/v2/cruddb", "POST", {
    data: {
      collection: "FlowEditorJSONDB",
      mode: "update",
      docID: flowId,
      obj: updates,
    },
  });
}

export async function deleteFlow(flowId: string): Promise<unknown> {
  return request("/api/v2/cruddb", "POST", {
    data: {
      collection: "FlowEditorJSONDB",
      mode: "delete",
      docID: flowId,
      obj: {},
    },
  });
}

export async function applyFlowToLibrary(
  libraryId: string,
  flowId: string,
): Promise<unknown> {
  return request("/api/v2/cruddb", "POST", {
    data: {
      collection: "LibrarySettingsJSONDB",
      mode: "update",
      docID: libraryId,
      obj: { flowId },
    },
  });
}

// --- Global settings ---

export async function getSettings(): Promise<unknown> {
  return request("/api/v2/cruddb", "POST", {
    data: {
      collection: "SettingsGlobalJSONDB",
      mode: "getAll",
      docID: "table1",
      obj: {},
    },
  });
}

export async function updateSettings(
  settingId: string,
  updates: Record<string, unknown>,
): Promise<unknown> {
  return request("/api/v2/cruddb", "POST", {
    data: {
      collection: "SettingsGlobalJSONDB",
      mode: "update",
      docID: settingId,
      obj: updates,
    },
  });
}

// --- Plugins ---

export async function getPlugins(): Promise<unknown> {
  return request("/api/v2/cruddb", "POST", {
    data: {
      collection: "PluginsJSONDB",
      mode: "getAll",
      docID: "table1",
      obj: {},
    },
  });
}

export async function getPluginDetails(pluginId: string): Promise<unknown> {
  return request("/api/v2/cruddb", "POST", {
    data: {
      collection: "PluginsJSONDB",
      mode: "getById",
      docID: pluginId,
      obj: {},
    },
  });
}

// --- Node management ---

export async function getNodes(): Promise<unknown> {
  return request("/api/v2/get-nodes", "POST");
}

export async function updateNodeSettings(
  nodeId: string,
  settings: Record<string, unknown>,
): Promise<unknown> {
  return request("/api/v2/update-node", "POST", {
    data: { nodeId, ...settings },
  });
}

export async function getNodeLogs(
  nodeId: string,
  limit: number = 100,
): Promise<unknown> {
  return request("/api/v2/get-node-log", "POST", {
    data: { nodeId, limit },
  });
}
