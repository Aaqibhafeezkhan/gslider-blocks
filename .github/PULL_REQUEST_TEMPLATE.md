### 🔗 Related Issue
Closes #
<!-- NOTE: GSlider Blocks enforces an Issue-First Policy. Every PR MUST link to an approved issue. Orphan PRs without an issue will be closed. -->

### 📝 Summary of Changes
<!-- Describe the problem solved and the specific changes proposed in this Pull Request -->

### 🧪 Testing Instructions
<!-- Provide clear, step-by-step instructions to verify and validate this change in the WordPress editor -->
1. Open the WordPress Block Editor (Gutenberg).
2. Insert or inspect the affected GSlider block.
3. Verify behavior matches expectations across Desktop, Tablet, and Mobile.

### 🛡️ Pre-Flight Quality & Safety Checklist
- [ ] **Issue Linked:** PR references an approved GitHub Issue via `Closes #<issue_number>`.
- [ ] **Protected Directory:** Did NOT modify `src/components/` (maintained exclusively by `@noruzzamans`).
- [ ] **Strict Design System:** Uses ONLY approved `@Components/*` controls (Zero raw `@wordpress/components` input controls).
- [ ] **Zero Block Invalidation:** Verified existing blocks load with 0 block invalidation errors.
- [ ] **Deprecation Migrations:** If `save.js` markup changed, registered a migration in `deprecated.js`.
- [ ] **Security Standards:** Complies with WordPress PHP Coding Standards (sanitization, escaping, nonces).
- [ ] **Build & Lints Pass:** Ran `npm run build` locally, and linted the files I changed with `npx wp-scripts lint-js` / `npx wp-scripts lint-style` without adding new errors.
