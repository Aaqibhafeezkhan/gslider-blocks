# Contributing to GSlider Blocks

Thank you for your interest in contributing to **GSlider Blocks**! This project powers carousels and sliders on **2,000+ active WordPress websites**. 

To maintain stability, security, and world-class code quality, all contributors (human and AI) must adhere strictly to these guidelines.

---

## 🧭 Foundational Standards & Architecture

Before submitting code, please review our core architectural documents:
- 🏗️ **[ARCHITECTURE.md](ARCHITECTURE.md)** — Architectural principles, patterns, and checklists.
- 📜 **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** — Contributor Covenant v2.1.
- 🛡️ **[SECURITY.md](SECURITY.md)** — Security disclosure process and built-in protections.

---

## 🔒 Protected Core Directory: `src/components/` (Maintainer-Only)

> [!CAUTION]
> **NO ONE EXCEPT `@noruzzamans` IS PERMITTED TO EDIT OR ADD FILES TO `src/components/`.**
> All blocks depend on these 23 foundational components. Any arbitrary edit can break live websites.
> - **Use only:** You are encouraged to **use** these components via `@Components/...` in blocks.
> - **Never alter:** PRs modifying `src/components/` without explicit maintainer pre-approval will be **automatically rejected**.

---

## 💻 Local Development Setup

Choose the environment setup that matches your local workflow:

### Option A: LocalWP (Recommended GUI Workflow)
1. Install [Local](https://localwp.com/) (Mac, Windows, or Linux).
2. Create a fresh WordPress site.
3. Open terminal in the site's plugin directory:
   ```bash
   cd ~/Local\ Sites/<site-name>/app/public/wp-content/plugins/
   git clone https://github.com/noruzzamans/gslider-blocks.git
   cd gslider-blocks
   npm install
   npm run start
   ```
4. Activate **GSlider Blocks** in WordPress Admin → Plugins.

### Option B: Docker via `@wordpress/env` (Zero-Config CLI)
Requirements: [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
```bash
# Clone the repository
git clone https://github.com/noruzzamans/gslider-blocks.git
cd gslider-blocks

# Install dependencies
npm install

# Start local WordPress environment (runs on port 8888)
npx @wordpress/env start

# Open site in browser: http://localhost:8888
# WP Admin credentials:
# Username: admin
# Password: password
```
To stop the environment:
```bash
npx @wordpress/env stop
```

---

## 🌿 Branching & Development Workflow

1. **Fork & Branch:** Create a dedicated branch off `main`:
   ```bash
   git checkout -b fix/issue-55-pagination-spacing
   # or
   git checkout -b feat/testimonial-carousel-layout
   ```
2. **Watch Mode:** Run development bundler:
   ```bash
   npm run start
   ```
3. **Admin Styles (if modifying SCSS):**
   ```bash
   npm run admin:build
   ```

---

## 📋 Pull Request Title & Commit Conventions

All commits and pull requests must follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <short description in present tense>
```

- **Types:** `feat`, `fix`, `docs`, `refactor`, `test`, `ci`, `chore`.
- **Scopes:** `blocks`, `design-system`, `core`, `headless`, `mcp`, `swiper`, `ci-cd`.
- **Examples:**
  - `feat(headless): implement REST API block parser`
  - `fix(swiper): prevent layout jump before slide initialization`
  - `docs(contributing): update AI policy and component lock`

> [!IMPORTANT]
> **Mandatory PR Description Rule:** Every pull request description **MUST** start with `Closes #<issue_number>` (e.g. `Closes #35`). This ensures GitHub automatically links and closes resolved issues upon merge.

---

## 🤖 Use of AI Policy

We welcome AI-assisted contributions (using Cursor, Claude, GitHub Copilot, Antigravity) with the following mandatory guardrails:

1. **Human Ownership:** You are 100% responsible for all code submitted. Blind copy-pasting of AI output without testing is prohibited.
2. **Zero Block Invalidation:** Never alter `save.js` markup or attribute defaults of existing blocks without backward-compatible migrations in `deprecated.js`.
3. **Strict Design System:** AI agents must use the 23 approved `@Components/*` controls. Never generate raw `@wordpress/components` inputs.
4. **Zero Hallucinations:** Do not introduce non-existent npm/composer dependencies or WordPress core functions.
5. **No Robotic / Fluff Phrasing:** Write PR descriptions in clear, senior-engineer prose. Avoid generic AI fluff.

---

## 🛡️ Pull Request Quality Checklist

Before submitting a PR, ensure all checks pass:

```bash
# 1. Lint JavaScript
npm run lint:js

# 2. Lint CSS/SCSS
npm run lint:css

# 3. Production Build
npm run build

# 4. MCP Server Build (if modified)
npm run mcp:build
```

Ensure your PR satisfies:
- [ ] Did **NOT** modify `src/components/` (or changes were pre-authorized by `@noruzzamans`).
- [ ] Used **ONLY** approved `@Components/*` controls (Zero raw Gutenberg input controls).
- [ ] Tested on existing blocks with **0 block invalidation errors**.
- [ ] Follows WordPress PHP & React coding standards.
- [ ] Verified on PHP 7.4 through PHP 8.5 matrix.
- [ ] PR description starts with `Closes #<issue_number>`.

---

## 👥 Code Review Process

1. **Assignee:** Assign yourself to an issue before starting work.
2. **Reviewer:** All PRs require at least **1 approving review** from `@noruzzamans` to merge.
