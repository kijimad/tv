###########
# builder #
###########

FROM golang:1.24-bullseye AS builder
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    upx-ucl

WORKDIR /build

# 依存関係をキャッシュする
COPY ./backend/go.mod ./backend/go.sum ./
RUN go mod download

COPY ./backend .

RUN GO111MODULE=on CGO_ENABLED=0 go build -o ./bin/tv \
    -ldflags='-w -s -extldflags "-static"' \
    . \
 && upx-ucl -1 ./bin/tv

###########
# release #
###########

FROM gcr.io/distroless/static-debian11:latest AS release

COPY --from=builder /build/bin/tv /bin/
WORKDIR /workdir
ENTRYPOINT ["/bin/tv"]

############
# recorder #
############

FROM debian:bullseye-slim AS recorder

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    emacs-nox \
    ffmpeg \
    bc

# UID 1000のユーザーを作成する
RUN groupadd -g 1000 appuser && \
    useradd -m -s /bin/bash -u 1000 -g appuser appuser && \
    usermod -aG video appuser

WORKDIR /workdir

COPY --from=builder /build/bin/tv /bin/
COPY --from=builder /build/*.sh /workdir/

# 所有権を変更する
RUN chown -R appuser:appuser /workdir

# non-rootユーザーに切り替える
USER appuser

ENTRYPOINT ["/bin/tv"]

################
# frontend-dev #
################

FROM node:22-slim AS frontend-dev

WORKDIR /app

# 依存関係をインストールする
COPY ./frontend/package*.json ./
RUN npm ci

# ソースコードをコピーする（開発時はボリュームマウントで上書きされる）
COPY ./frontend .

# Vite開発サーバを起動する
# 0.0.0.0 をリッスンしてコンテナ外からのアクセスを許可する
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
