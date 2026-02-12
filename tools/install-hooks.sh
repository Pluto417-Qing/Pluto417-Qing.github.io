#!/usr/bin/env bash
#
# Install Git hooks for automatic cardlink conversion

HOOKS_DIR=".git/hooks"
HOOK_FILE="$HOOKS_DIR/pre-commit"

# Check if .git directory exists
if [ ! -d ".git" ]; then
    echo "Error: Not a git repository. Run this script from the repository root."
    exit 1
fi

# Create hooks directory if it doesn't exist
mkdir -p "$HOOKS_DIR"

# Copy pre-commit hook
echo "Installing pre-commit hook..."
cp tools/pre-commit-hook.sh "$HOOK_FILE"

# Make it executable
chmod +x "$HOOK_FILE"

echo "✓ Git hooks installed successfully!"
echo ""
echo "Now cardlinks will be automatically converted when you:"
echo "  1. Run 'git commit' (via pre-commit hook)"
echo "  2. Run './tools/run.sh' (Jekyll dev server)"
echo "  3. Run './tools/test.sh' (Jekyll build)"
echo ""
echo "To uninstall, simply run: rm .git/hooks/pre-commit"
