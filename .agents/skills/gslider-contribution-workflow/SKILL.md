---
name: gslider-contribution-workflow
description: >-
  Standardized international open-source workflow for GSlider Blocks: PR title & description standards,
  Conventional Commits, locked core components policy, Use of AI guidelines, and maintainer review flow.
---

# GSlider Contribution & Workflow Standards

This skill documents the complete open-source workflow, PR conventions, AI usage policies, and directory protections for **GSlider Blocks**.

---

> [!CAUTION]
> ## 🔒 PROTECTED CORE DIRECTORY: `src/components/` (Maintainer-Only)
> **The 23 UI controls in `src/components/` form the foundational Design System of GSlider Blocks.**
> All 4+ Gutenberg blocks (`image-slider`, `testimonial`, `logo-carousel`, `flexi-content`, `post-carousel`) depend directly on these components. Any uncontrolled edit will cause cascading regressions across 2,000+ live websites.
>
> 1. **Modification Lock:** **NO ONE EXCEPT `@noruzzamans` IS PERMITTED TO EDIT OR ADD CODE TO `src/components/`.**
> 2. **Automatic Rejection:** Any external PR or AI-generated contribution that modifies files in `src/components/` without explicit, prior written approval from `@noruzzamans` **WILL BE AUTOMATICALLY REJECTED**.
> 3. **Usage Only:** Contributors and AI agents may **USE** these components in blocks via `@Components/...`, but must **NEVER ALTER** their internal implementation.

---

## 🏷️ 1. Pull Request Title Convention (Conventional Commits)

All PR titles must strictly follow the **Conventional Commits** specification:

```text
<type>(<scope>): <short description in present tense>
```

### Approved Types
| Type | Purpose | Example |
| :--- | :--- | :--- |
| `feat` | New feature, block capability, or REST endpoint | `feat(headless): add REST API block parser` |
| `fix` | Bug fix, CSS regression, or compatibility patch | `fix(swiper): prevent layout jump before initialization` |
| `refactor` | Architecture overhaul with zero behavior change | `refactor(core): introduce Registrable interface` |
| `docs` | Documentation, skills, rules, or changelog updates | `docs(contributing): document PR title and AI policy` |
| `ci` | GitHub Actions workflows and automation | `ci: add automated PR linting workflow` |
| `test` | PHPUnit, Jest, or smoke test additions | `test(core): add service bootstrap smoke tests` |
| `chore` | Build config, dependency updates, or zip scripts | `chore(deps): update @wordpress/scripts to latest` |

### Approved Scopes
`core` · `blocks` · `design-system` · `headless` · `mcp` · `swiper` · `ci-cd` · `deps`

### Title Formatting Rules
1. Always start with lowercase letter after colon.
2. Use imperative present tense (`add`, `fix`, `refactor` — NEVER `added`, `fixes`, `refactoring`).
3. NEVER end the title with a period (`.`).

---

## 📝 2. Pull Request Description Standard

Every PR must strictly follow `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
Closes #<issue_number>

### Changes proposed in this Pull Request:
- Concise, bulleted list of specific changes made.

### Testing instructions:
1. Open the WordPress Block Editor (Gutenberg).
2. Insert the affected block.
3. Verify behavior matches expectations.

### 🛡️ GSlider Quality & Safety Checklist:
- [x] **Protected Directory:** Did NOT modify `src/components/` (maintained exclusively by @noruzzamans).
- [x] **Strict Design System:** Uses ONLY approved `@Components/*` controls.
- [x] **Zero Regressions:** Existing blocks load with 0 block invalidation errors.
- [x] **PHP Standards:** Sanitization, escaping, and nonces are 100% compliant.
- [x] **2,000+ Sites Protection:** Zero breaking changes to database schemas or attributes.
```

---

## 🤖 3. Use of AI Policy (AI-Assisted Contributions)

GSlider Blocks welcomes modern AI tooling (Cursor, Claude, Copilot, Antigravity) to accelerate development, subject to non-negotiable enterprise quality standards:

1. **Human Ownership:** AI is an accelerator, but the committer takes 100% responsibility for the code. Blind copy-pasting of AI output without manual verification is strictly forbidden.
2. **Zero Hallucinations:** Every function, filter, hook, and npm/composer package must exist and be legitimate. Never introduce imaginary dependencies.
3. **Zero Block Invalidation:** AI agents must never modify `save.js` markup or attribute schemas of existing blocks without backward-compatible deprecation migrations.
4. **Authentic Senior Engineer Tone (Zero Chatbot Fluff):** PR descriptions and comments must be concise and technical. Avoid generic AI phrases (*"I am thrilled to present this robust solution..."*, *"seamlessly enhances..."*). Speak directly about technical trade-offs.
5. **100% Local Validation:** Before opening a PR, the contributor must run and pass:
   ```bash
   npm run lint:js
   npm run lint:css
   npm run build
   ```
6. **Codebase-First Rule (Zero Redundancy):** Always inspect related traits, interfaces, and classes before writing code. Never guess architecture or recreate methods already provided by base classes/traits.
7. **Surgical Minimal Diffs:** PRs must only change lines strictly necessary for the assigned issue. Never inject unprompted methods, speculative boilerplate, or unrelated reformatting.
8. **Git Cleanliness:** Never stage untracked files (`vendor/`, dev dependencies, logs, caches). Keep PR diffs 100% atomic and focused.

---

## 👥 4. Assignees and Code Review Flow

1. **Assignees:** When working on an issue, assign yourself to signal active development and avoid duplicate work.
2. **Reviewers:** Code ownership is universal (`* @noruzzamans`). All PRs require at least **1 approving review** from `@noruzzamans` before merging into `main`.
