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

## 🎯 2. Issue-First Policy (Zero Orphan PRs & Automated Labeling)

> [!IMPORTANT]
> **No Pull Request without an approved issue:**
> GSlider Blocks strictly enforces an **Issue-First Policy**. Every pull request **MUST** link to an open, approved GitHub Issue. Unsolicited or "orphan" PRs submitted without an existing issue will be rejected and closed.
>
> **Workflow:**
> 1. Open an Issue first (or be assigned to an existing issue). Always supply `--label "type: <type>,focus: <scope>"` during `gh issue create`.
>    Example:
>    ```bash
>    gh issue create --title "feat(headless): add REST API block parser" --body "..." --label "type: enhancement,focus: headless"
>    ```
> 2. Agree on the technical approach.
> 3. Open the PR linking to that issue using `Closes #<issue_number>`.
>
> **Automated Issue Labeler:**
> GitHub Actions automatically runs `.github/workflows/issue-automation.yml` on every opened/edited issue, parsing Conventional Commits prefixes and scopes to guarantee consistent labels across all issues.

---

## 📝 3. Pull Request Description Standard

Every PR must strictly provide an in-depth, technical description following `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
### 🔗 Related Issue
Closes #<issue_number>

### 📋 Overview & Technical Architecture
<!-- Concise technical context, design rationale, and architecture overview. -->

### 🔍 Changes Implemented (In-Details)
<!-- In-depth, file-by-file or component-by-component breakdown:
- Exact components/services touched or created.
- Story variants, state harnesses, mock props, or API schemas.
- Responsive breakpoint configurations, fallback handling, and edge cases.
- NO generic checklists, NO safety checklists, NO marketing fluff.
-->

### 🧪 Verification & Testing Instructions
<!-- Exact step-by-step CLI commands and browser instructions:
1. Exact CLI commands to run (e.g. npm run test:php, npm run storybook:build).
2. Step-by-step UI actions in Gutenberg editor or Storybook sidebar.
3. Expected results and observable state transitions across Desktop, Tablet, and Mobile.
-->
```

> [!IMPORTANT]
> **Zero Checklist Policy:** Never include generic checklists (such as `🛡️ Quality & Safety Checklist`) or boilerplate self-attestations in PR descriptions. Focus 100% on concrete, senior-level technical details and verification steps.

---

## 🤖 4. Use of AI Policy (AI-Assisted Contributions)

GSlider Blocks welcomes contributions assisted by modern AI tooling (Cursor, Claude, GitHub Copilot, OpenAI Codex/ChatGPT, Gemini, Windsurf, Antigravity, etc.) to accelerate development, subject to non-negotiable enterprise quality standards:

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

## 👥 5. Assignees and Code Review Flow

1. **Assignees:** When working on an issue, assign yourself to signal active development and avoid duplicate work.
2. **Reviewers:** Code ownership is universal (`* @noruzzamans`). All PRs require at least **1 approving review** from `@noruzzamans` before merging into `main`.

---

## 🌿 6. Branch Preservation Rule (Zero Branch Deletion)

> [!IMPORTANT]
> **Never Delete Merged Branches:**
> - Contributors and AI agents must **NEVER** delete local or remote branches after a Pull Request is merged.
> - Preserving all branches maintains the full commit provenance, historical traceability, and allows easy reference or rollback.
> - **Forbidden actions/flags:**
>   - `git branch -d <branch>` or `git branch -D <branch>`
>   - `git push origin --delete <branch>`
>   - `gh pr merge --delete-branch`
> - Always leave the feature branch intact after switching back to `main`.
