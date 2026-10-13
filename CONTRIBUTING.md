# Contributing to GSlider Blocks

Thank you for your interest in contributing to **GSlider Blocks**! This project powers carousels and sliders on **2,000+ active WordPress websites**. 

To maintain stability, security, and world-class code quality, all contributors (human and AI) must adhere strictly to these guidelines.

---

## 🔒 Protected Core Directory: `src/components/` (Maintainer-Only)

> [!CAUTION]
> **NO ONE EXCEPT `@noruzzamans` IS PERMITTED TO EDIT OR ADD FILES TO `src/components/`.**
> All blocks depend on these 23 foundational components. Any arbitrary edit can break live websites.
> - **Use only:** You are encouraged to **use** these components via `@Components/...` in blocks.
> - **Never alter:** PRs modifying `src/components/` without explicit maintainer pre-approval will be **automatically rejected**.

---

## 📋 Pull Request Title Convention

All pull requests must follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <short description in present tense>
```

- **Types:** `feat`, `fix`, `docs`, `refactor`, `test`, `ci`, `chore`.
- **Scopes:** `blocks`, `design-system`, `core`, `headless`, `mcp`, `swiper`, `ci-cd`.
- **Examples:**
  - `feat(headless): implement REST API block parser`
  - `fix(swiper): prevent layout jump before slide initialization`
  - `docs(contributing): update AI policy and component lock`

---

## 🤖 Use of AI Policy

We welcome AI-assisted contributions (using Cursor, Claude, GitHub Copilot, Antigravity) with the following mandatory guardrails:

1. **Human Ownership:** You are 100% responsible for all code submitted. Blind copy-pasting of AI output without manual testing is prohibited.
2. **Zero Hallucinations:** Do not introduce non-existent npm/composer dependencies or WordPress core functions.
3. **Strict Design System:** AI agents must use the 23 approved `@Components/*` controls. Never generate raw `@wordpress/components` inputs.
4. **Zero Block Invalidation:** Do not modify `save.js` markup or attribute schemas of existing blocks without backward-compatible migrations.
5. **No Robotic / Chatbot Phrasing:** Write PR descriptions in clear, concise senior-engineer prose. Avoid generic AI praise or fluff.
6. **Local Verification:** All checks must pass before opening a PR:
   ```bash
   npm run lint:js
   npm run lint:css
   npm run build
   ```

---

## 🛡️ Pull Request Quality Checklist

Every PR must verify:
- [ ] Did NOT modify `src/components/` (or changes were pre-authorized by @noruzzamans).
- [ ] Used ONLY approved `@Components/*` controls (Zero raw Gutenberg input controls).
- [ ] Tested on existing blocks with 0 block invalidation errors.
- [ ] Follows WordPress PHP & React coding standards.
- [ ] PHP changes maintain backward compatibility for 2,000+ active sites.

---

## 👥 Code Review Process

1. **Assignee:** Assign yourself to an issue before starting work.
2. **Reviewer:** All PRs require at least **1 approving review** from `@noruzzamans` to merge.
