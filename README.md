# tdarr-mcp

MCP server for interacting with [Tdarr](https://tdarr.io/) — a distributed transcoding system for video/audio libraries.

Exposes 8 tools for monitoring and controlling Tdarr via the Model Context Protocol.

## Tools

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
