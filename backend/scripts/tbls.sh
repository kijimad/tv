#!/bin/bash

set -eu

cd $(dirname $0);
cd ../

COMMAND="$1"
shift

docker run --rm \
  -v $(pwd):/work \
  -w /work \
  --user $(id -u):$(id -g) \
  --net=host \
  ghcr.io/k1low/tbls \
  "$COMMAND" "$@"
