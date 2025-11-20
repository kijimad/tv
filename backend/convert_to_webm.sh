#!/bin/bash

set -eu

# MP4をWebMに変換するスクリプト
# 高圧縮エンコード

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: $0 <input_file> <output_file>"
    exit 1
fi

INPUT_FILE="$1"
OUTPUT_FILE="$2"

if [ ! -f "$INPUT_FILE" ]; then
    echo "Error: Input file does not exist: $INPUT_FILE"
    exit 1
fi

echo "Converting to high-efficiency format..."
ffmpeg -i "$INPUT_FILE" \
    -vf scale=1280:-1 \
    -c:v libvpx-vp9 -b:v 300k -crf 45 -cpu-used 2 \
    -c:a libopus -b:a 64k \
    "$OUTPUT_FILE"

echo "Conversion completed: $OUTPUT_FILE"
