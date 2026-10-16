#!/usr/bin/env python3
"""
Native Gemini Code Reviewer for GSlider Blocks.
100% Native implementation with zero 3rd-party GitHub Action dependencies.
Powered by Google Gemini 3.8 Flash with High Reasoning.
"""

import os
import sys
import time
import tempfile
import subprocess
from google import genai
from google.genai import types

def run_cmd(args):
    result = subprocess.run(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return result.stdout.strip()

def get_pr_diff():
    # Diff against target base branch (main, develop, etc.)
    base_branch = os.environ.get("GITHUB_BASE_REF", "main")
    args = [
        "git", "diff", f"origin/{base_branch}...HEAD", "--", ".",
        ":!build", ":!vendor", ":!node_modules", ":!assets",
        ":!package-lock.json", ":!composer.lock", ":!*.zip", ":!*.md", ":!*.txt"
    ]
    return run_cmd(args)

def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    pr_number = os.environ.get("PR_NUMBER")
    
    if not api_key:
        print("::warning::GEMINI_API_KEY is missing (fork PR or unconfigured secret). Skipping review gracefully.")
        sys.exit(0)

    if not pr_number:
        print("::warning::PR_NUMBER is missing. Skipping review.")
        sys.exit(0)

    print(f"Fetching code diff for PR #{pr_number}...")
    diff = get_pr_diff()
    
    if not diff:
        print("No relevant code changes found to review.")
        sys.exit(0)

    # Truncate if diff is exceptionally large to fit within context safety bounds
    max_chars = 150000
    if len(diff) > max_chars:
        diff = diff[:max_chars] + "\n\n...[Diff truncated due to size]..."

    client = genai.Client(api_key=api_key)

    prompt = f"""You are a Principal WordPress Core & React/Gutenberg Senior Code Reviewer.
Carefully analyze the following Pull Request git diff for the WordPress plugin 'gslider-blocks'.

### Key Review Focus Areas:
1. **WordPress Security & Standards**:
   - Proper input sanitization (`sanitize_text_field`, `sanitize_key`, `wp_strip_all_tags`).
   - Output escaping (`esc_html__`, `esc_attr__`, `esc_url`, `wp_kses_post`).
   - Strict adherence to WordPress.org guidelines: NO arbitrary user-defined custom CSS inputs or script injection.
   - PHP 7.4+ compatibility.
2. **React & Gutenberg Block Lifecycle**:
   - Attribute schema consistency in `attributes.js`.
   - `useEffect` hooks: ensure Swiper.js instances are cleaned up with `swiper.destroy(true, true)` on unmount/re-init.
   - Responsive attribute handling (Desktop, Tablet, Mobile).
   - No direct DOM mutations outside Swiper refs.
3. **Performance & Clean Code**:
   - Redundant re-renders, memory leaks, and unbounded REST queries.

Provide structured, actionable feedback with exact file names, line references, and code suggestions where appropriate.
If the code is clean and follows all standards, give a brief positive summary approving the changes.

---
### Pull Request Diff:
```diff
{diff}
```
"""

    # Hierarchy: Ordered from highest reasoning capability down to fast flash
    candidate_models = [
        "gemini-4-argon",
        "gemini-3.1-pro-preview",
        "gemini-3.8-flash",
        "gemini-3.7-flash",
        "gemini-3.6-flash",
        "gemini-3.5-flash-lite",
        "gemini-2.5-pro",
        "gemini-2.5-flash",
        "gemini-2.0-flash",
    ]
    response = None
    used_model = None

    for model_name in candidate_models:
        print(f"Attempting review with {model_name}...")
        for attempt in range(1, 3):
            try:
                # Use thinking_level or thinking_budget depending on model generation
                config = types.GenerateContentConfig(
                    thinking_config=types.ThinkingConfig(thinking_level=types.ThinkingLevel.HIGH)
                ) if "3" in model_name or "4" in model_name else types.GenerateContentConfig(
                    thinking_config=types.ThinkingConfig(thinking_budget=2048)
                )
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=config
                )
                used_model = model_name
                break
            except Exception as err:
                err_str = str(err)
                print(f"Attempt {attempt} on {model_name} encountered: {err_str}")
                if "404" in err_str or "NOT_FOUND" in err_str:
                    break
                time.sleep(2 * attempt)

        if response and response.text:
            print(f"Successfully generated review using: {used_model}")
            break

    if not response or not response.text:
        print("::error::All candidate Gemini models failed to generate a review.")
        sys.exit(1)

    review_text = response.text
    header = f"## 🤖 ⚡ Gemini Code Review ({used_model})\n\n"
    footer = f"\n\n---\n*Automated review powered natively by Google Gemini ({used_model}).*"
    full_comment = header + review_text + footer

    with tempfile.NamedTemporaryFile("w", encoding="utf-8", delete=False) as f:
        f.write(full_comment)
        comment_file = f.name

    try:
        print(f"Posting review comment to Pull Request #{pr_number}...")
        subprocess.run(["gh", "pr", "comment", str(pr_number), "--body-file", comment_file], check=True, text=True)
        print("Review posted successfully!")
    finally:
        if os.path.exists(comment_file):
            os.remove(comment_file)

if __name__ == "__main__":
    main()
