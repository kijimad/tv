#!/bin/bash

set -eu

cd $(dirname $0);
cd ../..

mkdir -p ./backend/internal/oapi

# キャッシュディレクトリをマウントするので先に存在する必要がある
mkdir -p $HOME/go/pkg
mkdir -p $HOME/.cache/go-build

docker run \
       --rm \
       -u "$(id -u):$(id -g)" \
       -w /work \
       -v $PWD:/work \
       -v $HOME/go/pkg:/go/pkg \
       -v $HOME/.cache/go-build:/tmp/go-build \
       --env GOCACHE=/tmp/go-build \
       golang:1.24-bookworm \
       bash -c "go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@v2.4.1 && \
         oapi-codegen --config oas/config/models.yml oas/openapi.yml && \
         oapi-codegen --config oas/config/server.yml oas/openapi.yml && \
         oapi-codegen --config oas/config/spec.yml oas/openapi.yml"
