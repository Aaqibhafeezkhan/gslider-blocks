<h1 align="center">GSlider Blocks</h1>

<p align="center">
  <strong>🎠 The Ultimate Gutenberg Carousel Collection</strong><br>
  High-Performance, React & Swiper.js Powered Slider Blocks for Modern WordPress, Headless Stacks & Native MCP AI Workflows
</p>

<p align="center">
  <a href="https://github.com/noruzzamans/gslider-blocks/actions/workflows/ci.yml">
    <img src="https://github.com/noruzzamans/gslider-blocks/actions/workflows/ci.yml/badge.svg" alt="CI Build Status">
  </a>
  <a href="https://github.com/noruzzamans/gslider-blocks/releases">
    <img src="https://img.shields.io/badge/Version-1.2.0-orange.svg" alt="Version">
  </a>
  <a href="https://github.com/noruzzamans/gslider-blocks/stargazers">
    <img src="https://img.shields.io/github/stars/noruzzamans/gslider-blocks?color=ffb800&label=Stars&logo=github" alt="GitHub Stars">
  </a>
  <a href="https://github.com/noruzzamans/gslider-blocks/network/members">
    <img src="https://img.shields.io/github/forks/noruzzamans/gslider-blocks?color=blue&label=Forks&logo=github" alt="GitHub Forks">
  </a>
  <a href="https://github.com/noruzzamans/gslider-blocks/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22">
    <img src="https://img.shields.io/github/issues/noruzzamans/gslider-blocks/good%20first%20issue?color=7057ff&label=Good%20First%20Issues" alt="Good First Issues">
  </a>
  <a href="https://github.com/noruzzamans/gslider-blocks/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
  </a>
  <a href="https://wordpress.org/">
    <img src="https://img.shields.io/badge/WordPress-6.3+-blue.svg?logo=wordpress" alt="WordPress 6.3+">
  </a>
  <a href="https://php.net/">
    <img src="https://img.shields.io/badge/PHP-7.4--8.5-purple.svg?logo=php" alt="PHP 7.4-8.5">
  </a>
  <a href="http://www.gnu.org/licenses/gpl-2.0.html">
    <img src="https://img.shields.io/badge/License-GPLv2+-green.svg" alt="License">
  </a>
  <a href="https://swiperjs.com/">
    <img src="https://img.shields.io/badge/Engine-Swiper%2011-red.svg" alt="Swiper 11">
  </a>
  <a href="https://noruzzamans.github.io/gslider-blocks/">
    <img src="https://img.shields.io/badge/Storybook-Live%20Explorer-ff4785.svg?logo=storybook" alt="Storybook Design System">
  </a>
  <a href="#-ai-assistant-integration-model-context-protocol---mcp">
    <img src="https://img.shields.io/badge/MCP-Ready-9cf.svg?logo=anthropic" alt="MCP Compatible">
  </a>
</p>

<p align="center">
  <a href="#-about--value-proposition">About</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-design-system--component-storybook">Storybook</a> •
  <a href="#-available-blocks">Blocks</a> •
  <a href="#-ai-assistant-integration-model-context-protocol---mcp">MCP AI Guide</a> •
  <a href="#-headless-wordpress--nextjs-showcase">Headless</a> •
  <a href="#-local-environment-setup">Setup</a> •
  <a href="#-contributing--governance">Contributing</a> •
  <a href="#-support-the-project">Support ⭐</a>
</p>

---

## 📖 About & Value Proposition

**GSlider Blocks** is an enterprise-grade Gutenberg carousel library designed for production WordPress websites. Built with modern React, PSR-4 PHP architecture, and Swiper 11, it delivers fluid hardware-accelerated animations, zero block invalidations, and native Headless/AI support without any jQuery dependencies.

### Why GSlider Blocks?

| Feature | GSlider Blocks | Typical Slider Plugins |
| :--- | :---: | :---: |
| **Gutenberg Native** | ✅ Direct block canvas editing | ❌ Shortcodes or detached builders |
| **Performance & Weight** | ✅ Hardware-accelerated Swiper 11, Zero jQuery | ❌ Heavy jQuery, bloated CSS bundles |
| **Dynamic CSS Pipeline** | ✅ Block-scoped CSS served from a per-page stylesheet instead of `style=""` attributes | ❌ Polluted inline `style=""` attributes |
| **Responsive Architecture** | ✅ Dedicated 3-device controls (Desktop, Tablet, Mobile) | ⚠️ Generic breakpoint guessing |
| **Local AI Integration** | ✅ Model Context Protocol (MCP) server ($0 cloud cost) | ❌ No AI schema support |
| **Headless Ready** | ✅ Dedicated REST API JSON endpoints & serialized blocks | ❌ Shortcode regex parsing needed |
| **Code Stability** | ✅ Backwards-compatible `deprecated.js` migrations | ❌ "Block invalidation" white screens on updates |

---

## 🎨 Design System & Component Storybook

GSlider Blocks features an enterprise **23-component design system** modeled directly after the official [WordPress Gutenberg Storybook](https://wordpress.github.io/gutenberg). Every UI control is completely isolated, WCAG 2.1 AA accessible, responsive-aware (Desktop, Tablet, Mobile), and built strictly for the Gutenberg Inspector sidebar (280px–300px width).

👉 **[Launch Interactive Storybook Explorer](https://noruzzamans.github.io/gslider-blocks/)**

### 🧩 What's inside the Storybook:
* **23 Isolated Controls**: Responsive range, spacing, typography, colors, gradients, background images, elevation/shadows, layout preset selector, accessible drag-and-drop slide content reordering (`@dnd-kit`), and more.
* **Full Inspector Benchmark Composition**: Live simulation of the entire Gutenberg block settings sidebar mounting General, Style, and Advanced tabs in an authentic editor harness.
* **Automated Accessibility Testing (`@storybook/addon-a11y`)**: Live Axe-core accessibility auditing on every component state.
* **Architecture Guidelines & MDX Documentation**: Standardized 8-key spacing, 13-key typography, and 3-key color schemas.

---

## 📦 Available Blocks

| # | Block | Description | Status |
| :-: | :--- | :--- | :-: |
| 1 | 🎯 **Base Slider** | High-impact hero sliders with Title, Subtitle, Description & CTA buttons | ✅ Production |
| 2 | 📝 **Flexi Content** | Full creative freedom: nest ANY Gutenberg block inside responsive slides | ✅ Production |
| 3 | 🏢 **Logo Carousel** | Partner/client showcases with hover effects (grayscale-to-color, opacity, scale, move up), links, tooltips, and captions | ✅ Production |
| 4 | 🖼️ **Image Slider** | Image carousels with lightbox, captions, tooltips, and per-image links | ✅ Production |
| 5 | ⭐ **Testimonial Carousel** | Customer reviews with fractional star ratings, author avatars, and quote icons | ✅ Production |
| 6 | 👥 **Team Carousel** | Member profiles with bio, social links, and modal bio triggers | 📋 Roadmap |
| 7 | 🎥 **Video Carousel** | Self-hosted, YouTube, and Vimeo responsive video carousels | 📋 Roadmap |
| 8 | 📊 **Stats Carousel** | Animated milestone counters and metric sliders | 📋 Roadmap |
| 9 | 🏆 **Awards Carousel** | Certification badges and industry recognition carousels | 📋 Roadmap |
| 10 | 📰 **Post Carousel** | Dynamic WordPress posts & custom post type query slider | 📋 Roadmap |

---

## 🤖 AI Assistant Integration (Model Context Protocol - MCP)

GSlider Blocks ships with an official local **Model Context Protocol (MCP)** server located in `packages/mcp-server`. It lets AI assistants and agentic IDEs (Cursor, Claude Desktop, Windsurf, Antigravity, etc.) list the GSlider blocks, read each block's attribute schema and defaults, and load starter templates, locally with **$0 cloud cost**. Generating block markup is planned ([#33](https://github.com/noruzzamans/gslider-blocks/issues/33)) and not available yet.

### 🧠 Model-Agnostic Architecture (OpenAI, Claude, Gemini)

The GSlider MCP Server operates over standard input/output (`stdio`) and is completely **model-agnostic**. You can connect it to any leading foundation model:
- **OpenAI Ecosystem:** GPT-4o, o1, o3-mini, ChatGPT, and OpenAI-compatible developer agents.
- **Anthropic Ecosystem:** Claude 3.7 Sonnet, Claude 3.5 Haiku, Claude Desktop.
- **Google Ecosystem:** Gemini 2.0 Pro, Gemini 2.0 Flash via agentic environments.
- **Open Weights:** DeepSeek-R1, Llama 3.3 via Ollama or local inference runtimes.

---

### 1-Click Client Configurations

#### 1. Claude Desktop (`claude_desktop_config.json`)
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

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

Connect the GSlider MCP server to any OpenAI model via standard Function Calling / Agent SDK:

```javascript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import OpenAI from "openai";

const transport = new StdioClientTransport({
  command: "node",
  args: ["./packages/mcp-server/dist/index.js"]
});
const mcp = new Client({ name: "openai-gslider-agent", version: "1.0.0" }, { capabilities: {} });
await mcp.connect(transport);

// Dynamically expose GSlider MCP tools to OpenAI GPT-4o
const { tools } = await mcp.listTools();
const openai = new OpenAI();
const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Inspect available GSlider block schemas" }],
  tools: tools.map(t => ({
    type: "function",
    function: { name: t.name, description: t.description, parameters: t.inputSchema }
  }))
});
```

#### 3. Cursor IDE (`.cursor/mcp.json`)
*Compatible with Claude 3.7, OpenAI GPT-4o, and Gemini models inside Cursor:*

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

#### 4. Antigravity IDE (Google DeepMind Agentic Workflow)
Configure in your workspace `.antigravity/mcp.json` or global Antigravity MCP settings:

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
In VS Code, add to `cline_mcp_settings.json` or Roo Code MCP Settings:

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
*Compatible with Windsurf Cascade and Codeium agentic workflows:*

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

### Available MCP Tools

| Tool | Purpose | Status |
| :--- | :--- | :---: |
| `gslider_ping` | Verifies the MCP server connection and returns the MCP server's own version (not the plugin version) | ✅ Available |
| `gslider_list_blocks` | Returns all registered blocks and supported visual controls | ✅ Available |
| `gslider_get_block_schema` | Returns exact attribute schemas and slide data structures | ✅ Available |
| `gslider_generate_block` | Generates validated Gutenberg markup with automated CSS | 🔜 In Progress |

---

## 🌐 Headless WordPress & Next.js Showcase

GSlider Blocks provides dedicated machine-readable REST API endpoints for decoupled and headless architectures. Retrieve structured slider data via the dedicated endpoint `GET /wp-json/gslider/v1/blocks/<post_id>` or via the `gslider_blocks` field on standard `/wp/v2/pages/<id>` and `/wp/v2/posts/<id>`.

Each response holds `{ post_id, post_title, total_sliders, blocks }`. Every entry in `blocks` has this shape:

| Field | Contents |
| :--- | :--- |
| `blockId` | The block's scoped class, for example `gslider-1a2b3c4d`. |
| `blockName` | For example `gslider-blocks/image-slider`. |
| `swiperConfig` | Swiper options built by `BlockParser`, with block defaults filled in: `effect`, `loop`, `autoplay`, `keyboard`, `mousewheel`, `navigation.enabled`, `pagination`, and per-breakpoint (`0`, `768`, `1025`) `slidesPerView`, `spaceBetween`, `speed`, and `autoplay.delay`. It has no `navigation.nextEl`/`prevEl` or `pagination.el`; your renderer supplies those. |
| `slides` | Sanitized slide data. Image and logo slides are `{ id, url, alt, caption, link, tooltipText }`. |
| `css` | The block's generated CSS, scoped to the WordPress markup (`.gslider-xxxxxxxx.gslider-image-slider-wrapper …`). It only matches if you reproduce the `save.js` wrapper classes. |
| `attrs` | Every block attribute: the values stored in the block comment, plus the `attributes.js` default for each attribute Gutenberg left out because it was still at its default. Stored values always win. |

On collection requests such as `/wp/v2/posts?per_page=100`, the `gslider_blocks` field parses every post. Use `_fields=` to skip it when you do not need it.

An untouched Base or Testimonial block returns its 3 default slides. The defaults ship as one generated file per block in `includes/RestApi/defaults/`, which `npm run build` regenerates from the MCP schemas. The `gslider_block_attribute_defaults` filter can change them.

### Consuming GSlider in Next.js 14/15 (App Router)

```tsx
// app/components/GSliderImageSlider.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface GSliderImageSlide {
  id: number;
  url: string;
  alt: string;
  caption: string;
  link: string;
  tooltipText: string;
}

export interface GSliderBlock {
  blockId: string;
  blockName: string;
  sliderType: string;
  totalSlides: number;
  swiperConfig: SwiperOptions;
  css: string;
  slides: unknown[];
  attrs: Record<string, unknown>;
}

export default function GSliderImageSlider({ block }: { block: GSliderBlock }) {
  if (block.blockName !== 'gslider-blocks/image-slider') return null;

  const slides = block.slides as GSliderImageSlide[];

  // Swiper React renders its own arrows and bullets when navigation/pagination
  // are set without elements, so swiperConfig can be spread as-is.
  return (
    <Swiper
      modules={[Autoplay, EffectCoverflow, Keyboard, Mousewheel, Navigation, Pagination]}
      {...block.swiperConfig}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <img src={slide.url} alt={slide.alt} loading="lazy" />
          {slide.caption && <p>{slide.caption}</p>}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
```

```tsx
// app/[slug]/page.tsx (server component)
import GSliderImageSlider, { type GSliderBlock } from '../components/GSliderImageSlider';

export default async function Page() {
  const res = await fetch(`${process.env.WP_URL}/wp-json/gslider/v1/blocks/42`, {
    next: { revalidate: 60 },
  });
  const { blocks } = (await res.json()) as { blocks: GSliderBlock[] };

  return blocks.map((block) => <GSliderImageSlider key={block.blockId} block={block} />);
}
```

> [!NOTE]
> - `slides[].link` is always returned. The WordPress frontend only links an image when the block's `enableimageLinks` setting is on. Check `attrs.enableimageLinks` before rendering the link.
> - Treat `css` as content written by post authors. Do not inject it into a `<style>` tag unless you trust everyone who can edit the post.

---

## 💻 Local Environment Setup

We support both GUI-based workflows (LocalWP) and zero-config containerized workflows (Docker via `@wordpress/env`):

### Prerequisites

| Requirement | Minimum Version | Recommended |
| :--- | :--- | :--- |
| **Node.js** | `>= 18.0.0` | `20.x LTS` |
| **npm** | `>= 9.0.0` | `10.x` |
| **PHP** | `>= 7.4.0` | `8.2 / 8.3` |
| **WordPress** | `>= 6.3.0` (required for `apiVersion: 3`) | `6.7+` |

---

### Option A: LocalWP (Recommended GUI Workflow)

1. Open [Local](https://localwp.com/) and create a new WordPress site.
2. Clone this repository directly into the site's plugin directory:
   ```bash
   cd ~/Local\ Sites/<site-name>/app/public/wp-content/plugins/
   git clone https://github.com/noruzzamans/gslider-blocks.git
   cd gslider-blocks
   ```
3. Install dependencies and compile initial block assets (`build/` is gitignored):
   ```bash
   npm install
   npm run build  # Required: compiles block bundles into build/
   npm run start  # Starts development watch mode
   ```
4. Activate **GSlider Blocks** from WP Admin → Plugins.

---

### Option B: Docker via `@wordpress/env` (Zero-Config CLI)

If you have Docker Desktop installed, spin up a complete WordPress instance with GSlider Blocks pre-mounted in one command:

```bash
# 1. Clone repository
git clone https://github.com/noruzzamans/gslider-blocks.git
cd gslider-blocks

# 2. Install dependencies
npm install

# 3. Build block assets into build/ (Required before starting)
npm run build

# 4. Start WordPress in Docker (Port 8888)
npx @wordpress/env start
```

- **Frontend:** [http://localhost:8888](http://localhost:8888)
- **WP Admin:** [http://localhost:8888/wp-admin](http://localhost:8888/wp-admin) (`Username: admin`, `Password: password`)
- **Stop Environment:** `npx @wordpress/env stop`

---

## ⚡ Essential NPM Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run start` | Starts watch mode for Gutenberg blocks development (`wp-scripts start`) |
| `npm run build` | Compiles production assets into `build/` |
| `npm run lint:js` | Runs ESLint across all JavaScript files |
| `npm run lint:css` | Runs Stylelint across all SCSS/CSS stylesheets |
| `npm run admin` | Starts watch mode for admin styles |
| `npm run admin:build` | Compiles admin stylesheets for production |
| `npm run mcp:build` | Builds the TypeScript MCP server in `packages/mcp-server` |
| `npm run zip` | Generates a clean, production-ready WordPress.org distributable zip |

---

## 🛡️ Testing & Code Quality Matrix

Every pull request runs automated GitHub Actions CI (`.github/workflows/ci.yml`):
- **Block Build:** Runs `npm run build` for the Gutenberg block bundles. The admin stylesheet (`npm run admin:build`) is not built in CI.
- **MCP Server Tests:** Installs and builds `packages/mcp-server`, then runs its test suite (`npm test`).
- **Distribution Zip:** Runs `npm run zip`.
- **PHP Matrix Testing:** Runs the stub-based scripts in `tests/` on **7 PHP versions**: `PHP 7.4`, `8.0`, `8.1`, `8.2`, `8.3`, `8.4`, and `8.5`.

ESLint and Stylelint are not part of CI yet. `npm run lint:js` and `npm run lint:css` currently report many existing errors, so run them on the files you change.

`.github/workflows/pr-automation.yml` adds type and size labels. When a PR from anyone other than `@noruzzamans` touches `src/components/`, it adds the `needs: changes` label and posts a warning comment.

---

## 🤝 Contributing & Governance

Contributions from both human engineers and AI assistants are welcome! Please read our contributing documentation before starting:

### 🌟 First-Time Contributors Welcome!
Looking to make your first open-source contribution or build your WordPress / React portfolio? We have curated step-by-step beginner-friendly tasks with ready-to-run commands:
👉 **[Browse Good First Issues](https://github.com/noruzzamans/gslider-blocks/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)**

Every contributor with a merged PR is automatically inducted into our [Contributors](#-contributors) hall of fame and mentioned in our official release notes!

- 📖 **[CONTRIBUTING.md](CONTRIBUTING.md)**: Forking, branching, PR title conventions, and AI contribution policy.
- 📚 **[Developer Handbook](docs/README.md)**: Central developer documentation map and technical guides.
- 🏗️ **[Architecture Guide](docs/explanations/architecture.md)**: Engineering principles, patterns, and pre-flight developer checklist.
- 📜 **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)**: Contributor Covenant v2.1.
- 🛡️ **[SECURITY.md](SECURITY.md)**: Vulnerability disclosure policy and security protections.

> [!IMPORTANT]
> **Issue-First Policy:** GSlider Blocks strictly requires all pull requests to resolve an approved [GitHub Issue](https://github.com/noruzzamans/gslider-blocks/issues) using `Closes #<issue_number>`. The maintainer closes unsolicited PRs submitted without an issue.

> [!CAUTION]
> **Component Lock Policy:** `src/components/` contains 23 core UI controls and is strictly locked to `@noruzzamans`. PRs modifying `src/components/` without maintainer authorization are flagged by CI with a warning comment and will not be merged.

---

## 📄 License

GSlider Blocks is open-source software licensed under the **GNU General Public License v2.0 or later (GPL-2.0-or-later)**.

```
GSlider Blocks - Gutenberg Carousel Collection for WordPress
Copyright (C) 2025-2026 Noruzzaman

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.
```

---

## ⭐ Support the Project

If you find **GSlider Blocks** valuable or use it in your projects, please consider giving it a star on GitHub! It takes just a second and helps the project gain visibility across the WordPress & open-source community, attract more contributors, and motivates ongoing active development.

<p align="center">
  <a href="https://github.com/noruzzamans/gslider-blocks">
    <img src="https://img.shields.io/badge/⭐_Star_on_GitHub-gslider--blocks-yellow?style=for-the-badge&logo=github" alt="Star on GitHub">
  </a>
</p>

- **Star this repository** to bookmark it for future use.
- **Share it** with fellow WordPress developers, agencies, and friends.
- **Contribute** code, docs, or ideas to our open [Good First Issues](https://github.com/noruzzamans/gslider-blocks/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) or [Help Wanted issues](https://github.com/noruzzamans/gslider-blocks/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22).

---

<a id="contributors"></a>
## 👥 Contributors

Thank you to all the amazing people who contribute to GSlider Blocks!

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/noruzzamans"><img src="https://avatars.githubusercontent.com/u/46926901?v=4" width="100px;" alt="Noruzzaman"/><br /><sub><b>Noruzzaman</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/devmuhib009"><img src="https://avatars.githubusercontent.com/u/142894870?v=4" width="100px;" alt="devmuhib009"/><br /><sub><b>devmuhib009</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dbdefault"><img src="https://avatars.githubusercontent.com/u/246079841?v=4" width="100px;" alt="dbdefault"/><br /><sub><b>dbdefault</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Aaqibhafeezkhan"><img src="https://avatars.githubusercontent.com/u/292322256?v=4" width="100px;" alt="Aaqibhafeez Khan"/><br /><sub><b>Aaqibhafeez Khan</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/blank-0007"><img src="https://avatars.githubusercontent.com/u/285468035?v=4" width="100px;" alt="blank-0007"/><br /><sub><b>blank-0007</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Sinkleberg"><img src="https://avatars.githubusercontent.com/u/1676751?v=4" width="100px;" alt="Sgt_Sinky"/><br /><sub><b>Sgt_Sinky</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://portfolio-website.riseinspirethrive2008.workers.dev/"><img src="https://avatars.githubusercontent.com/u/273587221?v=4" width="100px;" alt="Pushkar Shahi"/><br /><sub><b>Pushkar Shahi</b></sub></a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/p00jitha"><img src="https://avatars.githubusercontent.com/u/129841150?v=4" width="100px;" alt="DASARI PUJITHA"/><br /><sub><b>DASARI PUJITHA</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/huzaifaalmesbah"><img src="https://avatars.githubusercontent.com/u/63150399?v=4" width="100px;" alt="Huzaifa Al Mesbah"/><br /><sub><b>Huzaifa Al Mesbah</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ect2000"><img src="https://avatars.githubusercontent.com/u/107069576?v=4" width="100px;" alt="Emilio Castejón"/><br /><sub><b>Emilio Castejón</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linuxhostlab.com/"><img src="https://avatars.githubusercontent.com/u/7321834?v=4" width="100px;" alt="Md Abul Bashar"/><br /><sub><b>Md Abul Bashar</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://devnethsara.com/"><img src="https://avatars.githubusercontent.com/u/110768660?v=4" width="100px;" alt="Sasindu Nethsara Karanayaka"/><br /><sub><b>Sasindu Nethsara Karanayaka</b></sub></a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

Contributions of any kind are welcome! See our [Contributing Guide](CONTRIBUTING.md) to get started.

---

## 👨‍💻 Maintainer & Credits

<p align="center">
  <img src="https://avatars.githubusercontent.com/noruzzamans" alt="Noruzzaman" width="90" height="90" style="border-radius: 50%;">
</p>

<p align="center">
  <strong>Noruzzaman</strong><br>
  WordPress Core & Gutenberg Engineer | Open Source Maintainer
</p>

<p align="center">
  <a href="https://github.com/noruzzamans" title="GitHub">
    <img src="https://img.shields.io/badge/--181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://linkedin.com/in/noruzzaman" title="LinkedIn">
    <img src="https://img.shields.io/badge/--0A66C2?style=for-the-badge&logo=data:image/svg%2Bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xOSAwaC0xNGMtMi43NjIgMC01IDIuMjM4LTUgNXYxNGMwIDIuNzYyIDIuMjM4IDUgNSA1aDE0YzIuNzYyIDAgNS0yLjIzOCA1LTV2LTE0YzAtMi43NjItMi4yMzgtNS01LTV6bS0xMSAxOWgtM3YtMTBoM3YxMHptLTEuNS0xMS4yNjhjLS45NjYgMC0xLjc1LS43OS0xLjc1LTEuNzY0cy43ODQtMS43NjQgMS43NS0xLjc2NCAxLjc1Ljc5IDEuNzUgMS43NjQtLjc4MyAxLjc2NC0xLjc1IDEuNzY0em0xMy41IDExLjI2OGgtM3YtNS42MDRjMC0zLjM2OC00LTMuMTEzLTQtMHY1LjYwNGgtM3YtMTBoM3YxLjMwOWMxLjM5Ni0yLjU4NiA3LTIuNzc3IDcgMi40NzZ2Ni4yMTV6Ii8+PC9zdmc+" alt="LinkedIn">
  </a>
  <a href="https://x.com/Noruzzamanwp" title="X (Twitter)">
    <img src="https://img.shields.io/badge/--000000?style=for-the-badge&logo=x&logoColor=white" alt="X (Twitter)">
  </a>
  <a href="https://profiles.wordpress.org/noruzzaman/" title="WordPress.org Profile">
    <img src="https://img.shields.io/badge/--21759B?style=for-the-badge&logo=wordpress&logoColor=white" alt="WordPress Profile">
  </a>
  <a href="https://wordpress.org/plugins/gslider-blocks/" title="GSlider Blocks on WordPress.org">
    <img src="https://ps.w.org/gslider-blocks/assets/icon-256x256.png" height="28" alt="GSlider Blocks" style="border-radius: 4px; vertical-align: middle;">
  </a>
</p>

### Special Credits
- [Swiper.js](https://swiperjs.com/) — The modern mobile touch slider library.
- [WordPress Gutenberg](https://github.com/WordPress/gutenberg) — Block editor framework.
- [React](https://reactjs.org/) — Declarative UI component engine.
- [Appsero](https://appsero.com/) — Telemetry and analytics.

---

<p align="center">
  Made with ❤️ for the global WordPress Community
</p>
