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

---

## 🔍 7. Automated Discovery Protocol: "Additional Good First Issues Find"

This protocol is activated whenever a maintainer requests to find, audit, or discover new good first issues (e.g. prompts: *"additional good first issues find"*, *"find good first issues"*, *"notun good first issue khuje ber koro"*, or any similar request).

### 🎯 Objective
To systematically discover simple, beginner-friendly, 100% safe, single-file contribution opportunities across the repository that are **NOT** already tracked by existing open issues or open pull requests.

---

### 🛡️ Non-Negotiable Safety & Scope Guardrails
1. **Protected Directory Immunity (Rule 8):**
   - **NEVER** inspect or propose issues for `src/components/`. That directory is exclusively maintainer-only.
2. **Zero Block Invalidation Risk:**
   - **NEVER** propose issues modifying `save.js` markup or `block.json` attributes without backward-compatible deprecations.
   - Focus exclusively on: `edit.js`, `inspector.js`, `sortableItem.js`, `view.js`, SCSS, PHP documentation, or unit test coverage.
3. **Single-File Scope Rule:**
   - Every candidate issue MUST be resolvable in exactly **one single file**.
   - The fix should ideally be under 30–50 lines of diff so it is accessible and clean for new community contributors.
4. **Single-Problem Atomicity Rule (One Issue = One Problem):**
   - **NEVER** combine multiple distinct tasks or lint rules into a single issue (e.g. do not combine JSDoc `@param` annotations with `@wordpress/i18n-ellipsis` fixes, or dead JSX with unused attributes).
   - Keep every issue strictly focused on **ONE single, minimal problem** (resolvable in 5–10 minutes).
   - This ensures newcomer contributors are not overwhelmed, PR diffs remain micro-surgical, and the project preserves a healthy pipeline of future good first issues.

---

### 📋 4-Phase Discovery Workflow

#### Phase 1: Query Current Open Issues & PRs (De-duplication)
Before examining code, query GitHub to establish the baseline of all active work:
```bash
gh issue list --state open --limit 100 --json number,title,labels
gh pr list --state open --limit 100 --json number,title
```
Build an in-memory suppression list of all files, functions, and topics already covered by open issues (e.g., tracking issue `#488`, `#478`, `#473`, `#344`, etc.) so that **ZERO duplicate issues** are ever surfaced.

#### Phase 2: Systematic File-by-File Codebase Audit
Execute an exhaustive scan across all block modules:
1. **ESLint Header Suppressions (`eslint-disable` Debt):**
   Search for single-file suppressions across `src/blocks/`:
   ```bash
   git grep "eslint-disable" src/blocks/
   ```
   Check for:
   - `no-unused-vars`: Unused imports or dead destructured variables.
   - `no-nested-ternary`: Nested ternaries in `styling.js` or `inspector.js` that can be refactored into `||` defaults or small helper functions.
   - `jsx-a11y/click-events-have-key-events` & `jsx-a11y/no-static-element-interactions`: Interactive elements missing keyboard handlers (`onKeyDown` with Enter/Space, `role="button"`, `tabIndex={0}`).
   - `@wordpress/no-base-control-with-label-without-id`: `<BaseControl>` components missing an `id` prop.
   - `no-shadow`: Inner callback arguments colliding with component state variables.
   - `@wordpress/i18n-hyphenated-range`: Strings using regular hyphens `(1-5)` instead of en-dashes `(1–5)`.
2. **JSDoc Parameter Completeness:**
   Check helper functions in `view.js`, `edit.js`, or utility files for missing `@param` or `@return` tags.
3. **Accessibility (a11y) & Focus Visibility:**
   Check CSS/SCSS and component markup for missing `aria-label`, missing `:focus-within` selectors on hover-only UI, or missing `prefers-reduced-motion` blocks.
4. **Localization (i18n):**
   Check for untranslated strings or missing `__()` / `_x()` wrappers in editor UI labels.

#### Phase 3: Filtering & Verification
For any candidate found:
1. Verify it is **NOT** already in the Phase 1 suppression list.
2. Verify that resolving the issue touches only **1 file**.
3. Run local lint or tests on the file to confirm the issue is genuine:
   ```bash
   npx wp-scripts lint-js <file-path>
   ```

#### Phase 4: Structured Reporting Format
Present the findings directly to the maintainer in a standardized structure:

- **Case A: Additional Candidates Found:**
  Present each issue ready for creation with:
  - **Proposed Title:** Conventional Commits format (e.g. `refactor(<scope>): ...`, `fix(<scope>): ...`, `docs(<scope>): ...`)
  - **Target File & Lines:** Exact relative file path and line numbers
  - **Problem Statement:** What the current code does and why it is a problem
  - **Audit Snippet:** Exact code snippet showing the issue
  - **Proposed Fix:** Specific code changes required
  - **Verification Steps:** Exact commands for contributor to run (`npx wp-scripts lint-js ...`, `npm run build`, `npm run mcp:test`, `composer test`)
  - **Recommended Labels:** `good first issue`, `help wanted`, `hacktoberfest`, `type: ...`, `focus: ...`

- **Case B: Zero Candidates Found:**
  If every single file in the repository is clean or all opportunities are already tracked:
  - Clearly report that an exhaustive file-by-file audit of all block directories was conducted.
  - State that zero new unaddressed single-file good first issues currently exist in the codebase.
