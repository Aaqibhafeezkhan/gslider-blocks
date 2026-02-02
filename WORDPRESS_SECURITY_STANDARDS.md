# WordPress Security Standards & Checklist

This document serves as a comprehensive reference for auditing WordPress plugins and themes for security vulnerabilities. It is based on the official WordPress Security APIs and best practices.

## 1. The Security Mindset
- **Don't trust any data**: Treat all input (User, API, Database) as untrusted.
- **Rely on WordPress APIs**: Use built-in functions for validation, sanitization, and escaping.
- **Escape Late**: Escape data as close to output as possible.
- **Validation > Sanitization**: Prefer rejecting invalid data over trying to clean it.

## 2. Input Sanitization (Cleaning Data)
*Process of cleaning input data.*

**Common Functions:**
- `sanitize_text_field($str)`: Strips tags, tabs, newlines. **Use for single-line inputs.**
- `sanitize_textarea_field($str)`: Preserves newlines but strips unsafe HTML. **Use for bio, comments, messages.**
- `sanitize_email($email)`: Cleans email characters.
- `sanitize_file_name($name)`: Removes illegal characters from filenames. (New)
- `sanitize_hex_color($color)`: Ensures string is a valid hex color code. (New)
- `sanitize_hex_color_no_hash($color)`: Valid hex color without the hash. (New)
- `sanitize_html_class($class)`: Sanitize a string for use as a CSS class name. (New)
- `sanitize_key($key)`: Lowercases, allows only `a-z0-9_-`. Use for internal keys/slugs.
- `sanitize_meta($meta_key, $meta_value, $object_type)`: Sanitize meta value. (New)
- `sanitize_mime_type($mime)`: Checks that a MIME type is valid. (New)
- `sanitize_option($option, $value)`: Sanitize option value. (New)
- `sanitize_sql_orderby($orderby)`: Validates SQL ORDER BY clause. (New)
- `sanitize_term($term, $taxonomy)`: Sanitizes a term. (New)
- `sanitize_term_field($field, $value, $term_id, $taxonomy, $context)`: Sanitizes a term field. (New)
- `sanitize_title($title)`: Prepares strings for use as slugs.
- `sanitize_title_for_query($title)`: Sanitizes a title for use in a query. (New)
- `sanitize_title_with_dashes($title)`: Sanitizes a title and replaces spaces with dashes. (New)
- `sanitize_user($username)`: Sanitizes a username. (New)
- `sanitize_url($url)`: Sanitizes a URL for database/redirects (use `esc_url` for display). ~~(New)~~
- `wp_kses($html, $allowed)`: Custom allowed HTML tags.
- `wp_kses_post($html)`: Allows safe HTML (like posts).
- `absint($int)`: Converts to non-negative integer.
- `map_deep($array, 'callback')`: Recursively sanitizes arrays.

**Checklist:**
- [ ] Are all `$_POST` and `$_GET` variables sanitized?
- [ ] Is `sanitize_text_field` used ONLY for single-line text (not JSON, Arrays, or HTML)?
- [ ] Is `map_deep` used for array inputs?
- [ ] Is `wp_kses` used for rich text instead of stripping tags?

## 3. Input Validation (Checking Data)
*Process of checking if data fits a pattern or allowed set.*

**Common Techniques:**
- **Safelist**: `in_array($input, ['allowed_1', 'allowed_2'], true)`
- **Type Casting**: `(int) $input`, `(bool) $input`
- **Format**: `is_email()`, `ctype_alnum()`

**Checklist:**
- [ ] Are strictly typed comparisons (`===`, `true` strict mode) used?
- [ ] Are numeric IDs cast to `int` or checked with `absint()`?
- [ ] Are enums/options checked against a whitelist?

## 4. Output Escaping (Securing Display)
*Process of stripping unwanted data before rendering to browser.*

**Common Functions:**
- `esc_html($str)`: Escape HTML inside tags (e.g. `<h1><?php echo esc_html($title); ?></h1>`).
- `esc_attr($str)`: Escape string inside HTML attributes (e.g. `value="<?php echo esc_attr($val); ?>"`).
- `esc_url($url)`: Escape URLs in `href` or `src`.
- `esc_js($str)`: Escape data inside `<script>` blocks or `onclick` attributes.
- `esc_textarea($str)`: Escape data inside `<textarea>`.

**Checklist:**
- [ ] Is EVERY variable inside an `echo` or `print` wrapped in an escaping function?
- [ ] Is `esc_url()` used for all links?
- [ ] Is `esc_attr()` used for all HTML attributes?
- [ ] Is `esc_html()` used for plain text content?

## 5. Database Security (ARC & SQL Injection)
*Preventing malicious SQL commands.*

**Best Practices:**
- Always use `$wpdb->prepare()` for variable inputs.
- Use placeholders: `%s` (string), `%d` (integer), `%f` (float).
- **NEVER** pass variables directly into SQL strings.

**Checklist:**
- [ ] Are all `$wpdb->query`, `get_results`, `get_row`, `get_var` calls using `prepare()`?
- [ ] Are dynamic table names or columns whitelisted (not just escaped)?
- [ ] Are LIMIT/OFFSET integers cast with `(int)` or `absint()`?

## 6. CSRF Protection (Nonces)
*Ensuring intent.*

**Best Practices:**
- Use `wp_nonce_field()` in forms.
- Use `wp_create_nonce()` for AJAX/Links.
- Verify with `check_admin_referer()` (standard admin reqs) or `check_ajax_referer()` (AJAX).

**Checklist:**
- [ ] Do all forms include a nonce field?
- [ ] Do all AJAX handlers verify the nonce immediately?
- [ ] Are nonces properly scoped (unique action names)?

## 7. Authorization (Capabilities)
*Ensuring permission.*

**Best Practices:**
- Check `current_user_can('capability')` before performing ANY action.
- Common capabilities: `manage_options` (Admin), `edit_posts` (Editor/Author).

**Checklist:**
- [ ] Do all AJAX handlers check permissions?
- [ ] Do admin menu pages check permissions?
- [ ] Are capability checks specific enough (e.g., don't just check `read`)?

## Audit Log
*(Append your findings here)*
