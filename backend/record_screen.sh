#!/bin/bash

set -eu

# X11画面をメインに、右下にカメラをキャプチャする動画録画スクリプト

if [ -z "$1" ]; then
    echo "Usage: $0 <output_file>"
    exit 1
fi

OUTPUT_FILE="$1"

ffmpeg \
    -f x11grab -framerate 30 -i :0.0 \
    -f video4linux2 -framerate 30 -i /dev/video0 \
    -f pulse -i default \
    -filter_complex "[1:v]scale=320:180[cam1];[0:v][cam1]overlay=W-w-30:H-h-30,drawtext=fontfile=resources/Jost-Regular.ttf:text='%{localtime}':fontcolor=white@1:fontsize=32:box=1:boxcolor=0x00000000@0.8:x=10:y=10" \
    -c:v libvpx-vp9 -b:v 800k -crf 40 \
    -c:a libopus -b:a 128k \
    -s 1920x1080 \
    "$OUTPUT_FILE"
