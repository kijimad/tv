###########
# builder #
###########

FROM golang:1.24-bullseye AS builder
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    upx-ucl

WORKDIR /build
COPY ./backend .

RUN GO111MODULE=on CGO_ENABLED=0 go build -o ./bin/tv \
    -ldflags='-w -s -extldflags "-static"' \
    . \
 && upx-ucl --best --ultra-brute ./bin/tv

###########
# release #
###########

FROM gcr.io/distroless/static-debian11:latest AS release

COPY --from=builder /build/bin/tv /bin/
WORKDIR /workdir
ENTRYPOINT ["/bin/tv"]
