#!/bin/bash

set -eu

# X11画面をメインに、右下にカメラをキャプチャする動画録画スクリプト
# リアルタイム録画用の軽量エンコードで、保存/配信用ではない

if [ -z "$1" ]; then
    echo "Usage: $0 <output_file>"
    exit 1
fi

OUTPUT_FILE="$1"

# 一時ファイル
TEMP_FILE="${OUTPUT_FILE%.webm}.temp.mp4"

# 録画
ffmpeg \
    -thread_queue_size 512 -f x11grab -framerate 30 -i :0.0 \
    -thread_queue_size 512 -f video4linux2 -framerate 30 -i /dev/video0 \
    -thread_queue_size 512 -f pulse -ac 2 -ar 48000 -i default \
    -filter_complex "[1:v]scale=320:180[cam1];[0:v][cam1]overlay=W-w-30:H-h-30,drawtext=fontfile=resources/Jost-Regular.ttf:text='%{localtime}(UTC)':fontcolor=white@1:fontsize=32:box=1:boxcolor=0x00000000@0.8:x=10:y=10" \
    -c:v libx264 -preset ultrafast -tune zerolatency -crf 23 \
    -c:a aac -b:a 128k \
    -ar 48000 -ac 2 \
    -s 1920x1080 \
    -vsync cfr \
    "$TEMP_FILE"
