# @gslider/mcp-server

> Official Model Context Protocol (MCP) server for **GSlider Blocks** — empowering AI assistants (Claude, OpenAI, Cursor, Antigravity, Copilot, Windsurf, etc.) to inspect, scaffold, and generate WordPress slider blocks directly from natural language or Figma designs with **$0 cloud cost**.

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

### 2. Configure in your AI Assistant or IDE

The server is **model-agnostic** and connects seamlessly to any LLM and agentic runtime:

#### 1. Claude Desktop (`claude_desktop_config.json`)
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
```json
{
  "mcpServers": {
    "gslider": {
      "command": "node",
      "args": [
        "/absolute/path/to/gslider-blocks/packages/mcp-server/dist/index.js"
      ]
    }
  }
}
```

#### 2. OpenAI Models & ChatGPT (GPT-4o, o1, o3-mini)
Connect via Node.js OpenAI SDK / Function Calling:
```javascript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import OpenAI from "openai";

const transport = new StdioClientTransport({
  command: "node",
  args: ["/absolute/path/to/gslider-blocks/packages/mcp-server/dist/index.js"]
});
const mcp = new Client({ name: "openai-gslider", version: "1.0.0" }, { capabilities: {} });
await mcp.connect(transport);

const { tools } = await mcp.listTools();
const openai = new OpenAI();
const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "List all GSlider block tools" }],
  tools: tools.map(t => ({
    type: "function",
    function: { name: t.name, description: t.description, parameters: t.inputSchema }
  }))
});
```

#### 3. Cursor (`.cursor/mcp.json`)
```json
{
  "mcpServers": {
    "gslider": {
      "command": "node",
      "args": [
        "/absolute/path/to/gslider-blocks/packages/mcp-server/dist/index.js"
      ]
    }
  }
}
```

#### 4. Antigravity IDE (Google DeepMind Agentic Workflow)
Configure in `.antigravity/mcp.json`:
```json
{
  "mcpServers": {
    "gslider": {
      "command": "node",
      "args": [
        "/absolute/path/to/gslider-blocks/packages/mcp-server/dist/index.js"
      ]
    }
  }
}
```

#### 5. GitHub Copilot & VS Code (Cline / Roo Code)
In `cline_mcp_settings.json`:
```json
{
  "mcpServers": {
    "gslider": {
      "command": "node",
      "args": [
        "/absolute/path/to/gslider-blocks/packages/mcp-server/dist/index.js"
      ]
    }
  }
}
```

#### 6. Windsurf IDE (`~/.codeium/windsurf/mcp_config.json`)
```json
{
  "mcpServers": {
    "gslider": {
      "command": "node",
      "args": [
        "/absolute/path/to/gslider-blocks/packages/mcp-server/dist/index.js"
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
| `gslider://templates/hero-slider` | Full-width high-impact hero slider with smooth slide transitions. | `image-slider` |
| `gslider://templates/product-carousel` | Responsive 3-column e-commerce card carousel. | `image-slider` |
| `gslider://templates/testimonial-cards` | 2-column client review cards with 5-star ratings. | `testimonial` |
| `gslider://templates/brand-logos` | Smooth continuous brand logo ticker. | `logo-carousel` |

---

## 🛡️ License

GPL-2.0-or-later. Excluded from WordPress.org production release packages.
