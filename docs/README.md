# GSlider Blocks Developer Handbook

Welcome to the **GSlider Blocks Developer Handbook**! This handbook serves as the central documentation repository for developers, contributors, and technical integrators working with GSlider Blocks.

Following the standard [WordPress Gutenberg Documentation Architecture](https://github.com/WordPress/gutenberg/tree/trunk/docs), our documentation is structured into specialized categories to help you quickly find the exact guidance you need.

---

## 🧭 Documentation Map

```text
docs/
├── README.md                          # Developer Handbook Index & Overview
├── explanations/                      # Deep architectural concepts & system design
│   └── architecture.md                # Plugin architecture, style engine & Swiper lifecycle
├── how-to-guides/                     # Practical step-by-step guides for technical tasks
│   ├── custom-block-patterns.md       # Custom Block Patterns registration & best practices
│   ├── headless-rest-api.md           # Decoupled Headless REST API & Next.js integration
│   └── mcp-server-ai-workflows.md     # Local MCP Server & Cursor/Claude integration
├── reference-guides/                  # Exhaustive API specifications & schema references
│   ├── rest-api-schemas.md            # REST API endpoints & JSON response schemas
│   ├── block-attributes.md            # Standardized spacing, typography & color schemas
│   └── php-hooks.md                   # WordPress actions & filters reference
└── getting-started/                   # Onboarding & environment setup guides
    ├── quick-start.md                 # Plugin activation & first slider setup
    └── local-development.md           # Prerequisites, npm scripts & test suite
```

---

## 📚 Core Documentation Categories

### 1. 💡 [Explanations](explanations/)
Conceptual deep dives into the design decisions, runtime lifecycles, and architecture of GSlider Blocks.

- 🏗️ **[Architecture & Engine Design](explanations/architecture.md)**
  Comprehensive overview of the plugin's PSR-4 backend singleton hierarchy, dynamic CSS generation engine (`styling.js` ➔ `blockStyle` ➔ `StyleGenerator.php`), responsive device handling, and Swiper.js editor lifecycle.

---

### 2. 🛠️ [How-to Guides](how-to-guides/)
Actionable recipes and step-by-step technical guides for solving specific real-world integration challenges.

- 🚀 **[Headless WordPress & Decoupled REST API Guide](how-to-guides/headless-rest-api.md)**
  How to fetch, deserialize, and render GSlider Blocks in decoupled React/Next.js (App Router), Astro, and Remix frontends with pre-parsed `swiperConfig` and zero-runtime CSS parsing.
- 🤖 **[Model Context Protocol (MCP) Server & AI Assistant Workflows](how-to-guides/mcp-server-ai-workflows.md)**
  Local stdio MCP server setup, TypeScript build, Cursor/Claude/Antigravity integration, registered tools, and design templates.
- 🎨 **[Custom Block Patterns Guide](how-to-guides/custom-block-patterns.md)**
  Building, customizing, and registering production block pattern collections with local vector SVGs, proper escaping, and zero block invalidations.

---

### 3. 📖 Reference Guides
Exhaustive technical references for APIs, schemas, and extension points.

- 🔌 **[REST API Schemas & Endpoints Reference](reference-guides/rest-api-schemas.md)**
  Complete OpenAPI/JSON schema definitions, parameter types, authentication checks, and `swiperConfig` specifications for `/wp-json/gslider/v1/blocks/{id}` and `gslider_blocks`.
- 📐 **[Block Attributes & Schema Conventions](reference-guides/block-attributes.md)**
  Standardized 8-key spacing pattern, 13-key typography pattern, 3-key color pattern, responsive object rules, and block-specific slide structures across all 5 blocks.
- 🪝 **[PHP Actions & Filters Reference](reference-guides/php-hooks.md)**
  Customization hooks for dynamic CSS delivery, custom post type REST exposure, Google Fonts privacy, and block pattern loaders.

---

### 4. 🚀 Getting Started
Quick onboarding guides for new developers and agencies looking to get up to speed with GSlider Blocks.

- ⚡ **[Quick Start Guide](getting-started/quick-start.md)**
  Installing the plugin, adding your first slider via block inserter or slash commands, using starter patterns, and configuring transitions.
- 💻 **[Local Development Environment Setup](getting-started/local-development.md)**
  Prerequisites (Node.js, PHP, Composer), development workflows (`npm run start`, `npm run build`), running standalone PHP unit tests, and release zip packaging.

---

## 🤝 Contributing to Documentation

We follow the same rigorous standards for documentation as we do for production code:
- Check out our [Contributing Guidelines](../CONTRIBUTING.md) and [Code of Conduct](../CODE_OF_CONDUCT.md).
- Ensure all code snippets and examples are tested, copy-paste ready, and follow modern standards (e.g. Next.js 14/15 App Router, React 18/19, TypeScript).
- All documentation files are strictly excluded from production release archives (`.zip`), ensuring zero asset bloat for end users.
