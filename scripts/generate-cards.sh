#!/bin/bash
set -o pipefail

# Path to the cards directory and output file
CARDS_DIR="contributors"
OUTPUT_FILE="scripts/contributors.js"

# Check if the cards directory exists
if [ ! -d "$CARDS_DIR" ]; then
  echo "Error: Directory $CARDS_DIR does not exist."
  exit 1
fi

# Start generating the JavaScript array
echo "const contributorFiles = [" > "$OUTPUT_FILE"

# List all HTML files in a stable order
find "$CARDS_DIR" -type f -name "*.html" | LC_ALL=C sort | sed "s|^$CARDS_DIR/|  \"|; s|$|\",|" >> "$OUTPUT_FILE"

# Close the JavaScript array
echo "];" >> "$OUTPUT_FILE"

card_count=$(awk '/^  "/ { count++ } END { print count + 0 }' "$OUTPUT_FILE")
echo "$OUTPUT_FILE generated successfully with $card_count files."
