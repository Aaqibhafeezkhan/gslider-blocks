# Security Policy

## Supported Versions

We release security updates and patches for the current major/minor release cycle. We encourage all users and administrators to run the latest version of GSlider Blocks.

| Version | Supported          | Security Status |
| :------ | :----------------- | :-------------- |
| 1.1.x   | :white_check_mark: | Actively supported (Current Stable) |
| < 1.1.0 | :x:                | End of Life (Upgrade strongly recommended) |

---

## Reporting a Vulnerability

The GSlider Blocks team takes the security of our plugin, users, and all WordPress sites running our code seriously.

If you believe you have discovered a security vulnerability in GSlider Blocks, please report it to us responsibly. **Do NOT report security vulnerabilities via public GitHub issues, discussions, or pull requests.**

### How to Report

1. **Email Disclosure (Preferred):**
   Send a detailed vulnerability report to **[gsliderblocks@gmail.com](mailto:gsliderblocks@gmail.com)** with the subject line `[SECURITY] GSlider Blocks Vulnerability Report`.
2. **GitHub Security Advisory:**
   Alternatively, you may submit a confidential advisory directly via [GitHub Private Vulnerability Reporting](https://github.com/noruzzamans/gslider-blocks/security/advisories/new).

### What to Include in Your Report

To help us triage and resolve the issue quickly, please include:
- A clear description of the vulnerability and its potential impact.
- Step-by-step reproduction instructions or a Proof of Concept (PoC) script/payload.
- The version(s) of GSlider Blocks and WordPress tested.
- Suggested mitigations or patches (if available).

### Response Timeline & Coordinated Disclosure

- **Acknowledgment:** We will acknowledge receipt of your vulnerability report within **48 hours**.
- **Assessment:** We will confirm the vulnerability, determine its severity, and provide a remediation timeline within **5 business days**.
- **Patch & Release:** A fix will be developed, tested against our PHP 7.4–8.5 test suite, and deployed to WordPress.org SVN.
- **Credit:** We will publicly credit your contribution in the release notes and advisory (unless you prefer to remain anonymous).

---

## Built-In Security Architecture

GSlider Blocks follows strict WordPress Core Security Guidelines:
- **Input Sanitization & Output Escaping:** Every attribute rendered to the frontend is strictly escaped (`esc_html__`, `esc_attr__`, `esc_url`, `wp_kses_post`).
- **SVG Upload Hardening:** SVG uploads undergo multi-layer validation including XML entity expansion defense (`LIBXML_NONET`), MIME-type verification, and strict rejection of files containing dangerous elements (`<script>`, `<foreignobject>`, `<image>`, or SMIL animation tags like `<animate>`, `<set>`, `<animatetransform>`) to eliminate Stored Cross-Site Scripting (XSS) vectors.
- **Style Sanitization:** Dynamic CSS generated from block attributes is sanitized to prohibit arbitrary CSS expressions, `javascript:` URIs, and external stylesheet inclusions.
- **Third-Party Service Disclosures:** The codebase contains zero hidden ad-trackers or covert analytics. Telemetry is handled strictly via the official Appsero Client SDK with explicit, opt-in merchant consent adhering to WordPress.org guidelines. Web font requests via Google Fonts (`//fonts.googleapis.com/css`) are enqueued dynamically via protocol-relative URLs with deduplication.
