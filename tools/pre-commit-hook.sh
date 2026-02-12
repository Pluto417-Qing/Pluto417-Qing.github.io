#!/usr/bin/env bash
#
# Pre-commit hook to automatically convert Obsidian cardlinks to Jekyll format
# Install: Copy this file to .git/hooks/pre-commit and make it executable
# Or run: bash tools/install-hooks.sh

# Find Python executable
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "Warning: Python not found. Skipping cardlink conversion."
    exit 0
fi

# Get the list of staged markdown files
STAGED_MD_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(md|markdown)$')

if [ -z "$STAGED_MD_FILES" ]; then
    # No markdown files staged, nothing to do
    exit 0
fi

echo "Converting Obsidian syntax in staged files..."

# Convert all Obsidian syntax (callouts, cardlinks, bullets, headings)
for file in $STAGED_MD_FILES; do
    if [ -f "$file" ]; then
        $PYTHON_CMD tools/convert_obsidian.py "$file" 2>/dev/null
        # Re-add the file if it was modified
        git add "$file"
    fi
done

echo "✓ Obsidian → Jekyll conversion complete"
exit 0
