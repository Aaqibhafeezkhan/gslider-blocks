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

def get_pr_diff(pr_number=None):
    # Strategy 1: Fetch directly using GitHub CLI for the specific PR number
    # Works seamlessly for both automated pull_request events and manual workflow_dispatch
    if pr_number:
        try:
            diff = run_cmd(["gh", "pr", "diff", str(pr_number)])
            if diff:
                filtered_lines = []
                skip_file = False
                excluded_exts = ('.md', '.txt', '.zip', '.lock', 'package-lock.json', 'composer.lock')
                excluded_dirs = ('build/', 'vendor/', 'node_modules/', 'assets/')

                for line in diff.splitlines(keepends=True):
                    if line.startswith('diff --git'):
                        parts = line.strip().split()
                        raw_path = parts[-1] if len(parts) >= 4 else ""
                        filepath = raw_path[2:] if raw_path.startswith('b/') else raw_path
                        if any(filepath.startswith(d) or f"/{d}" in filepath for d in excluded_dirs) or filepath.endswith(excluded_exts):
                            skip_file = True
                        else:
                            skip_file = False
                    if not skip_file:
                        filtered_lines.append(line)

                return "".join(filtered_lines).strip()
        except Exception as err:
            print(f"gh pr diff notice: {err}. Falling back to git diff...")

    # Strategy 2: Fallback to local git diff against base branch
    base_branch = os.environ.get("GITHUB_BASE_REF", "main")
    args = [
        "git", "diff", f"origin/{base_branch}...HEAD", "--", ".",
        ":!package-lock.json", ":!composer.lock", ":!*.md", ":!*.txt", ":!*.zip",
        ":!build/", ":!vendor/", ":!node_modules/", ":!assets/"
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
    diff = get_pr_diff(pr_number)
    
    if not diff:
        print("No relevant code changes found to review.")
        sys.exit(0)

    # Truncate if diff is exceptionally large to fit within context safety bounds
    max_chars = 150000
    if len(diff) > max_chars:
        diff = diff[:max_chars] + "\n\n...[Diff truncated due to size]..."

    client = genai.Client(api_key=api_key)

    prompt = f"""You are an elite, concise Senior Code Reviewer for the WordPress Gutenberg plugin 'gslider-blocks'.
Review the following Pull Request git diff.

### STRICT TONE & FORMAT RULES:
1. **Zero Fluff & Zero Boilerplate**: Do NOT include conversational introductions, polite greetings, or lengthy narrative essays. Go directly to the review findings.
2. **Concise Status**:
   - If defects or improvements are found: `### Status: ⚠️ Action Required`
   - If clean and meets all standards: `### Status: ✅ Approved`
3. **Action-Oriented Defect List**:
   - List each defect as a concise bullet specifying the exact file path and line number/context.
   - Focus strictly on real defects: WordPress security (sanitization, escaping), Gutenberg/React lifecycle (Swiper destruction on unmount), and logical bugs.
4. **1-Click GitHub Code Suggestions**:
   - Whenever proposing code changes, format them using GitHub Markdown suggestion blocks:
     ```suggestion
     exact_replacement_code
     ```
     so the author can review and accept them with one click.
5. **If Approved (Clean Code)**:
   - Provide a 2 to 3 bullet-point summary explaining why it passes, with zero filler text.

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
