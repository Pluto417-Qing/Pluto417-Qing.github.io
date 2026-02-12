#!/usr/bin/env python3
"""
Convert Obsidian cardlink blocks to Jekyll URL card includes
"""

import re
import sys
from pathlib import Path


def convert_cardlink_to_include(content):
    """
    Convert Obsidian cardlink blocks to Jekyll include statements

    Obsidian format:
    ```cardlink
    url: https://example.com
    title: "Example Title"
    description: "Example description"
    host: example.com
    favicon: https://example.com/favicon.ico
    image: https://example.com/preview.jpg
    ```

    Jekyll format:
    {% include url-card.html
       url="https://example.com"
       title="Example Title"
       description="Example description"
       host="example.com"
       favicon="https://example.com/favicon.ico"
       image="https://example.com/preview.jpg"
    %}
    """

    # Pattern to match cardlink blocks
    pattern = r'```cardlink\s*\n(.*?)\n```'

    def replace_cardlink(match):
        block_content = match.group(1)

        # Parse the cardlink properties
        properties = {}
        for line in block_content.strip().split('\n'):
            if ':' in line:
                key, value = line.split(':', 1)
                key = key.strip()
                value = value.strip().strip('"\'')
                properties[key] = value

        # Build the Jekyll include statement as a single line
        include_parts = []

        # Add properties in a specific order
        property_order = ['url', 'title', 'description', 'host', 'favicon', 'image']

        for prop in property_order:
            if prop in properties:
                # Escape quotes in the value
                value = properties[prop].replace('"', '&quot;')
                include_parts.append(f'{prop}="{value}"')

        # Return single line format
        return '{% include url-card.html ' + ' '.join(include_parts) + ' %}'

    # Replace all cardlink blocks
    converted = re.sub(pattern, replace_cardlink, content, flags=re.DOTALL)

    return converted


def process_file(file_path):
    """Process a single markdown file"""
    file_path = Path(file_path)

    if not file_path.exists():
        print(f"Error: File not found: {file_path}")
        return False

    # Read the file
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Convert cardlinks
    converted_content = convert_cardlink_to_include(content)

    # Check if any changes were made
    if content == converted_content:
        print(f"No cardlinks found in {file_path}")
        return True

    # Write back the file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(converted_content)

    print(f"✓ Converted cardlinks in {file_path}")
    return True


def main():
    if len(sys.argv) < 2:
        print("Usage: python convert_cardlinks.py <file_path> [file_path2 ...]")
        print("   or: python convert_cardlinks.py --all")
        sys.exit(1)

    if sys.argv[1] == '--all':
        # Process all markdown files in _books, _posts, _projects directories
        base_dir = Path(__file__).parent.parent
        directories = ['_books', '_posts', '_projects']

        files_processed = 0
        for dir_name in directories:
            dir_path = base_dir / dir_name
            if dir_path.exists():
                for md_file in dir_path.glob('*.md'):
                    if process_file(md_file):
                        files_processed += 1

        print(f"\n✓ Processed {files_processed} files")
    else:
        # Process specified files
        for file_path in sys.argv[1:]:
            process_file(file_path)


if __name__ == '__main__':
    main()
