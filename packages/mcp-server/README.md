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
| `list_gslider_blocks` | Lists all registered slider blocks and supported features. | ✅ Available |
| `get_block_schema` | Returns JSON schema, attribute defaults, and slide structure for a block. | ✅ Available |
| `generate_slider_block` | Generates valid Gutenberg block markup with automated CSS styling. | 🔜 Issue #33 |

---

## 📚 Available Resources (Design Templates)

AI assistants can inspect and load pre-built slider design presets via MCP URI resources:

| Resource URI | Description | Target Block |
| :--- | :--- | :--- |
| `gslider://templates/hero-slider` | Full-width high-impact hero slider with fade transitions. | `image-slider` |
| `gslider://templates/product-carousel` | Responsive 3-column e-commerce card carousel. | `image-slider` |
| `gslider://templates/testimonial-cards` | 2-column client review cards with 5-star ratings. | `testimonial` |
| `gslider://templates/brand-logos` | Smooth continuous brand logo ticker. | `logo-carousel` |

---

## 🛡️ License

GPL-2.0-or-later. Excluded from WordPress.org production release packages.
