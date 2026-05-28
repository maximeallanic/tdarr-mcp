import type { TdarrToolDef } from "./tools.js";

export interface ToolResult {
  content: { type: "text"; text: string }[];
  isError?: true;
  [key: string]: unknown;
}

export async function executeTool(
  def: TdarrToolDef,
  input: Record<string, unknown>,
): Promise<ToolResult> {
  try {
    const baseUrl = process.env.TDARR_URL || "http://localhost:8265";
    const apiKey = process.env.TDARR_API_KEY || "";

    // ── Build URL with path parameter substitution ──
    const usedKeys = new Set<string>();
    const path = def.path.replace(/:([a-zA-Z_]+)/g, (_match, param) => {
      usedKeys.add(param);
      const val = input[param];
      if (val === undefined || val === null) {
        throw new Error(`Missing required path parameter: ${param}`);
      }
      return encodeURIComponent(String(val));
    });

    // ── Remaining params (excluding path params) ──
    const remaining: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(input)) {
      if (!usedKeys.has(key) && val !== undefined && val !== null) {
        remaining[key] = val;
      }
    }

    let url = `${baseUrl}${path}`;
    const headers: Record<string, string> = {};
    let body: string | undefined;

    if (apiKey) {
      headers["x-api-key"] = apiKey;
    }

    if (def.method === "GET") {
      const params = new URLSearchParams();
      for (const [key, val] of Object.entries(remaining)) {
        params.set(key, String(val));
      }
      const qs = params.toString();
      if (qs) url += `?${qs}`;
    } else {
      // POST — wrap in {data: ...} unless dataWrapped is explicitly false
      headers["Content-Type"] = "application/json";
      if (def.dataWrapped === false) {
        body = JSON.stringify(remaining);
      } else {
        body = JSON.stringify({ data: remaining });
      }
    }

    const response = await fetch(url, {
      method: def.method,
      headers,
      body,
      signal: AbortSignal.timeout(60_000),
    });

    const text = await response.text();

    let formatted: string;
    try {
      const json = JSON.parse(text);
      formatted = JSON.stringify(json, null, 2);
    } catch {
      formatted = text;
    }

    if (!response.ok) {
      return {
        content: [{ type: "text", text: `HTTP ${response.status}: ${formatted}` }],
        isError: true,
      };
    }

    return {
      content: [{ type: "text", text: formatted }],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const isConnectionError = message.includes("ECONNREFUSED") ||
      message.includes("fetch failed") ||
      message.includes("Unable to connect");
    const prefix = isConnectionError
      ? "Connection error (is Tdarr running?): "
      : "Error: ";
    return {
      content: [{ type: "text", text: `${prefix}${message}` }],
      isError: true,
    };
  }
}
