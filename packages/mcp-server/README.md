# @gslider/mcp-server

> Official Model Context Protocol (MCP) server for **GSlider Blocks** — lets AI assistants (Claude, OpenAI, Cursor, Antigravity, Copilot, Windsurf, etc.) list the GSlider blocks, read each block's attribute schema and defaults, and load starter templates, locally with **$0 cloud cost**. Generating block markup is planned in [#33](https://github.com/noruzzamans/gslider-blocks/issues/33) and not available yet.

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

All tools follow a uniform `gslider_<verb>_<noun>` namespace pattern for clean separation and zero collisions in multi-server environments:

| Tool | Description | Status |
| :--- | :--- | :--- |
| `gslider_ping` | Health-check tool verifying server connection. Returns the MCP server's own version (`1.0.0`), not the plugin version. | ✅ Available |
| `gslider_list_blocks` | Lists all registered slider blocks and supported features. | ✅ Available |
| `gslider_get_block_schema` | Returns JSON schema, attribute defaults, and slide structure for a block. | ✅ Available |
| `gslider_generate_block` | Generates valid Gutenberg block markup with automated CSS styling. | 🔜 Issue #33 |

> [!NOTE]
> For backwards compatibility, legacy aliases (`list_gslider_blocks`, `get_block_schema`) remain supported as fallback handlers.

---

## 📚 Available Resources (Design Templates)

AI assistants can inspect and load pre-built slider design presets via MCP URI resources:

| Resource URI | Description | Target Block |
| :--- | :--- | :--- |
| `gslider://templates/hero-slider` | Full-width high-impact hero slider with smooth slide transitions. | `image-slider` |
| `gslider://templates/product-carousel` | Responsive 3-column e-commerce card carousel. | `image-slider` |
| `gslider://templates/testimonial-cards` | 2-column client review cards with 5-star ratings. | `testimonial` |
| `gslider://templates/brand-logos` | Partner logo carousel with autoplay off. | `logo-carousel` |
| `gslider://templates/content-hero` | Content slider with titles, buttons, fade transition, and autoplay. | `base` |

Reading a template returns the attribute object for `gslider-blocks/<target block>`. Every key is a real block attribute, and attributes not listed keep their defaults. Testimonial and content slides include every default slide field.

Two attributes are left empty and must be set before the block renders correctly:

| Attribute | Value |
| :--- | :--- |
| `blockId` | A unique class name: the block prefix plus 8 characters. The prefix is `gslider-image-slider`, `gslider-logo-carousel`, or `gslider` (testimonial and base). Example: `gslider-image-slider-1a2b3c4d`. |
| `blockStyle` | The block's generated CSS. The block editor writes it from the block's `styling.js` when the block is opened and saved. |

There is no Flexi Content template yet. Its slides are child `gslider-blocks/flexi-content-item` blocks, not attribute data.

---

## 🛡️ License

GPL-2.0-or-later. Excluded from WordPress.org production release packages.
