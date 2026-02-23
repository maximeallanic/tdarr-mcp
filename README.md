# tdarr-mcp

MCP server for interacting with [Tdarr](https://tdarr.io/) — a distributed transcoding system for video/audio libraries.

Exposes 21 tools for monitoring and controlling Tdarr via the Model Context Protocol.

## Tools

### Core

| Tool | Description |
|------|-------------|
| `get_status` | Get Tdarr server status (version, uptime) |
| `get_workers` | List all workers/nodes with status and progress |
| `get_libraries` | List all configured libraries |
| `get_library_stats` | Get detailed stats for a specific library |
| `scan_library` | Trigger a file scan on a library |
| `get_queue` | Get queue status (pending, processing, error counts) |
| `pause_worker` | Pause a worker by setting its limit to 0 |
| `resume_worker` | Resume a paused worker |

### Flow management

| Tool | Description |
|------|-------------|
| `get_flows` | List all flows |
| `get_flow` | Get a specific flow definition |
| `create_flow` | Create a new flow |
| `update_flow` | Update an existing flow |
| `delete_flow` | Delete a flow |
| `apply_flow_to_library` | Apply a flow to a library |

### Settings & plugins

| Tool | Description |
|------|-------------|
| `get_settings` | Get all global settings |
| `update_settings` | Update global settings |
| `get_plugins` | List all available plugins |
| `get_plugin_details` | Get details of a specific plugin |

### Node management

| Tool | Description |
|------|-------------|
| `get_nodes` | Get all nodes with full details (settings, workers, GPU/CPU, version) |
| `update_node_settings` | Update settings of a specific node |
| `get_node_logs` | Get recent log entries for a node |

## Configuration

| Env var | Default | Description |
|---------|---------|-------------|
| `TDARR_URL` | `http://192.168.0.1:8265` | Tdarr server URL |

No authentication required (local network access).

## Build & Run

```bash
npm install
npm run build
node dist/index.js
```

## Integration — docker-compose (media-manager)

```yaml
mcpServers:
  tdarr:
    command: node
    args: ["/home/agent/tdarr-mcp/dist/index.js"]
    env:
      TDARR_URL: "http://192.168.0.1:8265"
```
