#!/bin/bash

set -eu

# 動画からサムネイルを生成するスクリプト

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

# 動画の長さを取得する（秒）
DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$INPUT_FILE")

# 中間地点の時刻を計算する
MIDDLE_TIME=$(echo "$DURATION / 2" | bc)

echo "Generating thumbnail at ${MIDDLE_TIME}s..."
ffmpeg -ss "$MIDDLE_TIME" -i "$INPUT_FILE" -vframes 1 -q:v 2 "$OUTPUT_FILE"

echo "Thumbnail generated: $OUTPUT_FILE"
