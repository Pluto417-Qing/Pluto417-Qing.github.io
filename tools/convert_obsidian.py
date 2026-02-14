#!/usr/bin/env python3
"""
Convert Obsidian-flavored Markdown to Jekyll (Chirpy theme) format.

Handles:
  1. Callout blocks: > [!type] Title → > **Title** ... {: .prompt-xxx }
  2. Cardlink blocks: ```cardlink ... ``` → {% include url-card.html ... %}
  3. Bullet markers: ● → -
  4. Obsidian heading markers: ##### → ###
"""

import re
import sys
from pathlib import Path


# ─────────────────────────────────────────────────────────────
# Callout type → Chirpy prompt class mapping
# ─────────────────────────────────────────────────────────────
CALLOUT_MAP = {
    # → prompt-info
    'note':     'prompt-info',
    'info':     'prompt-info',
    'cite':     'prompt-info',
    'quote':    'prompt-info',
    'summary':  'prompt-info',
    'abstract': 'prompt-info',
    'tldr':     'prompt-info',
    # → prompt-tip
    'tip':      'prompt-tip',
    'hint':     'prompt-tip',
    'example':  'prompt-tip',
    'success':  'prompt-tip',
    'check':    'prompt-tip',
    'done':     'prompt-tip',
    # → prompt-warning
    'warning':  'prompt-warning',
    'caution':  'prompt-warning',
    'attention':'prompt-warning',
    # → prompt-danger
    'danger':   'prompt-danger',
    'error':    'prompt-danger',
    'bug':      'prompt-danger',
    'failure':  'prompt-danger',
    'fail':     'prompt-danger',
    'missing':  'prompt-danger',
}

DEFAULT_PROMPT = 'prompt-info'


# ─────────────────────────────────────────────────────────────
# Cardlink conversion  (same logic as convert_cardlinks.py)
# ─────────────────────────────────────────────────────────────
def convert_cardlinks(content: str) -> str:
    """Convert ```cardlink ... ``` blocks to Jekyll include tags."""
    pattern = r'```cardlink\s*\n(.*?)\n```'

    def _replace(match):
        block = match.group(1)
        props = {}
        for line in block.strip().split('\n'):
            if ':' in line:
                key, value = line.split(':', 1)
                props[key.strip()] = value.strip().strip('"\'')

        parts = []
        for key in ('url', 'title', 'description', 'host', 'favicon', 'image'):
            if key in props:
                val = props[key].replace('"', '&quot;')
                parts.append(f'{key}="{val}"')
        return '{%% include url-card.html %s %%}' % ' '.join(parts)

    return re.sub(pattern, _replace, content, flags=re.DOTALL)


# ─────────────────────────────────────────────────────────────
# Callout conversion
# ─────────────────────────────────────────────────────────────
def _is_callout_start(line: str):
    """Check if a line is the start of an Obsidian callout.
    Returns (callout_type, title) or None.
    """
    m = re.match(r'^>\s*\[!(\w+)\]\s*(.*?)\s*$', line)
    if m:
        return m.group(1).lower(), m.group(2).strip()
    return None


def _is_blockquote_line(line: str) -> bool:
    """Check if a line is part of a blockquote (starts with >)."""
    return bool(re.match(r'^>\s?', line)) or line.strip() == '>'


def _strip_quote_prefix(line: str) -> str:
    """Remove the leading > or > from a line."""
    return re.sub(r'^>\s?', '', line)


def _format_body_line(line: str) -> str:
    """Format a single line inside a callout body."""
    line = line.replace('●', '-')
    return line


def _collect_callout_body(lines: list, start_idx: int) -> tuple:
    """Collect lines belonging to a callout body.

    Obsidian callout body patterns:
    1. Standard:  `> content` lines
    2. Continuation without `>` prefix after an empty `>` line:
           > [!type] Title
           >                    ← empty quote line
           content line 1       ← no > prefix, but belongs to callout
           content line 2
        3. Continuation without `>` prefix after a list-item `>` line:
            > [!example] Title
            > ● item 1           ← quoted bullet
            ● item 2             ← unquoted bullet, continuation (legacy behavior)
    4. Immediate continuation after callout marker:
           > [!type]
           content line         ← no > prefix, immediately after marker
    5. Non-continuation: normal text after `> text` without empty `>`:
           > [!cite] Title
           > content             ← quoted content
           1. outside text       ← NOT in callout (no empty > before it)

    The continuation stops at:
    - A blank line (completely empty, no `>`)
    - A `---` horizontal rule
    - A new callout start `> [!type]`
    - A heading line starting with `#`
    - A markdown list item (e.g. `- item`, `* item`, `+ item`)
    - A fenced code block marker (``` or ~~~)

    Returns:
        (body_lines, next_index)
    """
    body_lines = []
    i = start_idx
    allows_continuation = False  # Whether next non-quoted line is a continuation
    is_first_line = True  # Track if this is the first line after callout marker

    while i < len(lines):
        cur = lines[i]

        # If line is a blockquote line (starts with >)
        if _is_blockquote_line(cur):
            # Stop if it's a NEW callout start
            if _is_callout_start(cur) is not None:
                break
            stripped = _strip_quote_prefix(cur)
            body_lines.append(stripped)

            # Determine if non-quoted continuation is allowed after this line:
            # - After an empty `>` line → allows continuation
            # - After a bullet `> ●` or `> -` line → allows continuation
            if stripped.strip() == '':
                allows_continuation = True
            elif re.match(r'^\s*[●\-\*]\s', stripped):
                allows_continuation = True
            else:
                allows_continuation = False
            is_first_line = False
            i += 1

        # Non-quoted, non-blank continuation line
        elif cur.strip() != '':
            # Allow continuation if:
            # 1. Explicitly enabled by previous line, OR
            # 2. This is the first line after callout marker (special case)
            if allows_continuation or is_first_line:
                # Stop conditions:
                if cur.strip() == '---':
                    break
                if cur.startswith('#'):
                    break
                # Numbered list items (1. 2. etc.) are always OUTSIDE the callout
                if re.match(r'^\d+\.\s', cur):
                    break
                # Markdown bullet lists are outside by default to avoid
                # swallowing adjacent normal list content.
                if re.match(r'^\s*[-\*+]\s', cur):
                    break
                # Fenced code blocks should never be absorbed into callout body.
                if re.match(r'^\s*(```|~~~)', cur):
                    break
                # Jekyll prompt markers should not be included
                if cur.strip().startswith('{: .prompt-'):
                    break
                body_lines.append(cur)
                # If this continuation line is also a bullet, keep allowing
                if re.match(r'^\s*[●\-\*]\s', cur):
                    allows_continuation = True
                # Allow continuation for first line content
                elif is_first_line:
                    allows_continuation = False
                # If it's other content after empty >, keep allowing
                # (handles multi-line paragraph continuation)
                is_first_line = False
                i += 1
            else:
                # Not a continuation or blank line — end of callout
                break
        else:
            # Blank line - end of callout
            break

    # Clean up: strip trailing empty lines
    while body_lines and body_lines[-1].strip() == '':
        body_lines.pop()
    # Clean up: strip leading empty lines
    while body_lines and body_lines[0].strip() == '':
        body_lines.pop(0)

    return body_lines, i


def convert_callouts(content: str) -> str:
    """Convert Obsidian callout blocks to Jekyll/Chirpy prompt blocks.

    Obsidian format examples:

    With title:
        > [!type] Title
        > body line 1
        > body line 2

    Without title:
        > [!type]
        > body line

    With continuation (no > prefix after empty >):
        > [!type] Title
        >
        body continues here

    Jekyll Chirpy output:

    With title + body:
        > **Title**
        >
        > body line 1
        > body line 2
        {: .prompt-xxx }

    With title, no body:
        > **Title**
        {: .prompt-xxx }

    Without title:
        > body line
        {: .prompt-xxx }
    """
    lines = content.split('\n')
    result = []
    i = 0

    while i < len(lines):
        line = lines[i]

        callout_info = _is_callout_start(line)
        if callout_info:
            callout_type, callout_title = callout_info
            prompt_class = CALLOUT_MAP.get(callout_type, DEFAULT_PROMPT)

            i += 1  # Move past the callout header

            # Collect body
            body_lines, i = _collect_callout_body(lines, i)

            # Format body lines
            body_lines = [_format_body_line(l) for l in body_lines]

            # Build output
            output_lines = []

            if callout_title:
                # Remove existing ** markers to avoid duplication
                clean_title = callout_title.strip('*').strip()
                output_lines.append(f'> **{clean_title}**')
                if body_lines:
                    output_lines.append('>')
                    for bl in body_lines:
                        if bl.strip() == '':
                            output_lines.append('>')
                        else:
                            output_lines.append(f'> {bl}')
            else:
                # No title
                if body_lines:
                    for bl in body_lines:
                        if bl.strip() == '':
                            output_lines.append('>')
                        else:
                            output_lines.append(f'> {bl}')
                else:
                    output_lines.append('>')

            output_lines.append('{: .' + prompt_class + ' }')
            result.extend(output_lines)
        else:
            result.append(line)
            i += 1

    return '\n'.join(result)


# ─────────────────────────────────────────────────────────────
# Bullet marker normalization
# ─────────────────────────────────────────────────────────────
def normalize_bullets(content: str) -> str:
    """Replace ● bullet markers with standard markdown - markers."""
    return re.sub(r'^(\s*)●\s*', r'\1- ', content, flags=re.MULTILINE)


# ─────────────────────────────────────────────────────────────
# Heading level normalization
# ─────────────────────────────────────────────────────────────
def normalize_headings(content: str) -> str:
    """Normalize ##### to ### for Jekyll (Obsidian often uses deeper nesting)."""
    content = re.sub(r'^#####\s+', '### ', content, flags=re.MULTILINE)
    return content


# ─────────────────────────────────────────────────────────────
# Block spacing normalization
# ─────────────────────────────────────────────────────────────
def normalize_block_spacing(content: str) -> str:
    """Ensure empty lines around blockquotes, horizontal rules, and headings.

    In Markdown, blockquotes (> ...), horizontal rules (---), and headings (##)
    need blank lines before/after them to be parsed correctly when adjacent
    to other block elements like lists or paragraphs.
    """
    lines = content.split('\n')
    result = []

    for idx, line in enumerate(lines):
        prev = lines[idx - 1] if idx > 0 else ''
        is_blockquote = line.startswith('>')
        is_hr = line.strip() == '---'
        is_heading = line.startswith('#') and not line.startswith('#!')

        # Add empty line before blockquote/hr/heading if previous line is
        # non-empty and not itself a blockquote or prompt class
        if (is_blockquote or is_hr or is_heading) and prev.strip() != '' \
                and not prev.startswith('>') \
                and not prev.startswith('{: .prompt-') \
                and prev.strip() != '---':
            result.append('')

        result.append(line)

    # Remove consecutive blank lines (keep at most one)
    cleaned = []
    for line in result:
        if line.strip() == '' and cleaned and cleaned[-1].strip() == '':
            continue
        cleaned.append(line)

    return '\n'.join(cleaned)


# ─────────────────────────────────────────────────────────────
# Repair misplaced prompt marker
# ─────────────────────────────────────────────────────────────
def repair_misplaced_prompt_markers(content: str) -> str:
    """Move misplaced `{: .prompt-* }` out of fenced code blocks.

    Sometimes a converted callout is followed by a fenced code block and the
    prompt marker is accidentally placed as the first line *inside* the fence:

        > ...
        ```python
        {: .prompt-danger }
        ...

    It should be:

        > ...
        {: .prompt-danger }

        ```python
        ...

    This fixer is conservative:
    - Only triggers when the line right after a fence opener is a prompt marker.
    - Only moves it when there is a blockquote immediately above the fence
      (ignoring blank lines), indicating it belongs to the callout.
    """
    lines = content.split('\n')
    result = []
    i = 0

    while i < len(lines):
        line = lines[i]

        if re.match(r'^\s*(```|~~~)', line):
            marker_idx = i + 1

            # Skip leading blank lines inside fence header area
            while marker_idx < len(lines) and lines[marker_idx].strip() == '':
                marker_idx += 1

            if marker_idx < len(lines) and re.match(r'^\{:\s*\.prompt-[^}]+\}$', lines[marker_idx].strip()):
                # Find previous non-empty line outside current position
                prev_idx = i - 1
                while prev_idx >= 0 and lines[prev_idx].strip() == '':
                    prev_idx -= 1

                # Only move marker if preceding block is a blockquote/callout
                if prev_idx >= 0 and lines[prev_idx].lstrip().startswith('>'):
                    result.append(lines[marker_idx])
                    result.append('')
                    result.append(line)
                    i += 1
                    while i < marker_idx:
                        result.append(lines[i])
                        i += 1
                    i = marker_idx + 1
                    continue

        result.append(line)
        i += 1

    return '\n'.join(result)


def bind_prompt_markers_to_blockquotes(content: str) -> str:
    """Ensure `{: .prompt-* }` lines are directly attached to blockquotes.

    Kramdown only applies block attributes when the attribute line immediately
    follows the block. If there is a blank line between the blockquote and the
    prompt marker, Chirpy prompt styles will not render.
    """
    lines = content.split('\n')
    result = []

    for line in lines:
        if re.match(r'^\{:\s*\.prompt-[^}]+\}$', line.strip()):
            # If marker belongs to the preceding blockquote, remove any blank
            # lines accidentally inserted between them.
            j = len(result) - 1
            while j >= 0 and result[j].strip() == '':
                j -= 1

            if j >= 0 and result[j].lstrip().startswith('>'):
                while result and result[-1].strip() == '':
                    result.pop()

        result.append(line)

    return '\n'.join(result)


# ─────────────────────────────────────────────────────────────
# Main conversion pipeline
# ─────────────────────────────────────────────────────────────
def convert_obsidian_to_jekyll(content: str) -> str:
    """Run the full conversion pipeline."""
    content = convert_callouts(content)
    content = convert_cardlinks(content)
    content = normalize_bullets(content)
    content = normalize_headings(content)
    content = normalize_block_spacing(content)
    content = repair_misplaced_prompt_markers(content)
    content = bind_prompt_markers_to_blockquotes(content)
    return content


def process_file(file_path: str, dry_run: bool = False) -> bool:
    """Process a single markdown file.

    Args:
        file_path: Path to the markdown file.
        dry_run: If True, print the converted content instead of writing.

    Returns:
        True if the file was processed successfully.
    """
    path = Path(file_path)

    if not path.exists():
        print(f"Error: File not found: {path}")
        return False

    with open(path, 'r', encoding='utf-8') as f:
        original = f.read()

    converted = convert_obsidian_to_jekyll(original)

    if original == converted:
        print(f"  No Obsidian syntax found in {path}")
        return True

    if dry_run:
        print(f"--- Converted {path} ---")
        print(converted)
        print(f"--- End ---")
    else:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(converted)
        print(f"  ✓ Converted {path}")

    return True


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description='Convert Obsidian-flavored Markdown to Jekyll (Chirpy) format.'
    )
    parser.add_argument(
        'files', nargs='*',
        help='Markdown files to convert. Use --all to process all content dirs.'
    )
    parser.add_argument(
        '--all', action='store_true',
        help='Process all .md files in _books, _posts, _projects directories.'
    )
    parser.add_argument(
        '--dry-run', action='store_true',
        help='Print the converted content without modifying files.'
    )
    args = parser.parse_args()

    if not args.files and not args.all:
        parser.print_help()
        sys.exit(1)

    if args.all:
        base_dir = Path(__file__).parent.parent
        directories = ['_books', '_posts', '_projects', '_book_notes']
        count = 0
        for dir_name in directories:
            dir_path = base_dir / dir_name
            if dir_path.exists():
                # Use rglob for recursive search in _book_notes to handle subdirectories
                if dir_name == '_book_notes':
                    for md_file in sorted(dir_path.rglob('*.md')):
                        process_file(str(md_file), dry_run=args.dry_run)
                        count += 1
                else:
                    for md_file in sorted(dir_path.glob('*.md')):
                        process_file(str(md_file), dry_run=args.dry_run)
                        count += 1
        print(f"\n✓ Processed {count} files")
    else:
        for fp in args.files:
            process_file(fp, dry_run=args.dry_run)


if __name__ == '__main__':
    main()
