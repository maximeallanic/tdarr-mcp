# tdarr-mcp

A [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server for [Tdarr](https://tdarr.io) — the distributed media transcoding/health-check automation platform. It gives AI assistants (Claude Desktop, Claude Code, and any MCP-compatible client) programmatic control over a Tdarr server through its HTTP API.

Speaks MCP over stdio and exposes **105 tools** across **12 categories**.

## Features

| Category | Tools | Examples |
| --- | --- | --- |
| **Libraries** | 19 | scan, create/update/delete libraries, folder & filter settings, transcode/health-check options |
| **Nodes** | 19 | list nodes & workers, pause/resume, set worker limits, reassign jobs |
| **Server** | 18 | server status, settings, schedules, statistics, maintenance |
| **Files** | 11 | search, bulk update/delete, create samples, inspect file records |
| **Plugins** | 9 | list/get plugins, plugin stacks, community plugins |
| **Stats** | 7 | transcode/health stats, space saved, processing history |
| **Users** | 7 | list/create/update/delete users, auth settings |
| **Backups** | 5 | create backup, status, reset |
| **Jobs** | 5 | queue management, job control |
| **Database** | 3 | `cruddb`, search DB, client queries |
| **Automations** | 1 | run an automation |
| **Processes** | 1 | process info |

All tools are prefixed `tdarr_*` (e.g. `tdarr_get_nodes`, `tdarr_search_db`, `tdarr_run_automation`).

## Prerequisites

- **Node.js ≥ 18** (uses the native `fetch` API), or **[Bun](https://bun.sh)**.
- A running **[Tdarr](https://tdarr.io) server** reachable over HTTP.

## Installation & build

```bash
git clone https://github.com/maximeallanic/tdarr-mcp.git
cd tdarr-mcp

# with Bun
bun install
bun run build      # tsc → dist/

# …or with npm
npm install
npm run build
```

This compiles `src/` to `dist/`.

## Configuration

The server reads its target from environment variables:

| Variable | Required | Description |
| --- | --- | --- |
| `TDARR_URL` | ❌ | Base URL of the Tdarr server. Defaults to `http://localhost:8265`. |
| `TDARR_API_KEY` | ❌ | API key, sent as the `x-api-key` header. Only needed if your Tdarr instance has API auth enabled. |

## Usage with an MCP client

Add the server to your MCP client configuration (e.g. Claude Desktop / Claude Code `mcpServers` block):

```json
{
  "mcpServers": {
    "tdarr": {
      "command": "node",
      "args": ["/absolute/path/to/tdarr-mcp/dist/main.js"],
      "env": {
        "TDARR_URL": "http://your-tdarr-host:8265"
      }
    }
  }
}
```

During development you can run the TypeScript entry directly with Bun (no build step):

```bash
TDARR_URL=http://your-tdarr-host:8265 bun run src/main.ts
```

## How it works

Each tool is a thin declarative mapping (`TdarrToolDef`) to a Tdarr API endpoint: HTTP method, path (with `:param` substitution), and an input JSON schema. POST bodies are wrapped in `{ data: ... }` by default (Tdarr's convention) unless a tool sets `dataWrapped: false`. Responses are returned as pretty-printed JSON text.

## License

[MIT](./LICENSE) © Maxime Allanic
