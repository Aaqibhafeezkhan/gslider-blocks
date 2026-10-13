# @gslider/mcp-server

> Official Model Context Protocol (MCP) server for **GSlider Blocks** — empowering AI assistants (Claude, Cursor, Antigravity) to inspect, scaffold, and generate WordPress slider blocks directly from natural language or Figma designs with **$0 cloud cost**.

---

## ⚡ Overview

The GSlider MCP Server communicates via standard input/output (`stdio`) transport according to the [Anthropic Model Context Protocol specification](https://modelcontextprotocol.io/).

By running locally on the developer's computer:
- **Zero Cloud Cost**: No external servers, hosted proxies, or subscription APIs required.
- **Privacy & Security**: All schemas and generated block content stay local to the project.
- **Full Automation**: Direct tool-calling integration for coding assistants.

---

## 🚀 Quick Start

### 1. Build the MCP Server

```bash
cd packages/mcp-server
npm install
npm run build
```

### 2. Configure in your AI Assistant

#### Claude Desktop (`claude_desktop_config.json`)

On macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "gslider": {
      "command": "node",
      "args": [
        "/path/to/gslider-blocks/packages/mcp-server/dist/index.js"
      ]
    }
  }
}
```

#### Cursor (`.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "gslider": {
      "command": "node",
      "args": [
        "./packages/mcp-server/dist/index.js"
      ]
    }
  }
}
```

---

## 🛠️ Available Tools

| Tool | Description | Status |
| :--- | :--- | :--- |
| `gslider_ping` | Health-check tool verifying server connection and version. | ✅ Available |
| `list_gslider_blocks` | Lists all 6 registered slider blocks and supported attributes. | 🔜 Issue #32 |
| `get_block_schema` | Returns JSON schema and attribute defaults for a specific block. | 🔜 Issue #32 |
| `generate_slider_block` | Generates valid Gutenberg block markup with automated CSS styling. | 🔜 Issue #33 |

---

## 🛡️ License

GPL-2.0-or-later. Excluded from WordPress.org production release packages.
