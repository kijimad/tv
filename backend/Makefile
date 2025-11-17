.DEFAULT_GOAL := help

DOCKER_TAG := latest

.PHONY: build
build: ## ビルドする
	go build -o ../bin/tv .

.PHONY: test
test: ## テストを実行する
	go test -race -shuffle=on -cover -v ./...

.PHONY: stresstest
stresstest: ## テストを繰り返し実行して競合を検知する
	go test -race -shuffle=on -count=100 ./...

.PHONY: fmt
fmt: ## フォーマットする
	goimports -w .

.PHONY: lint
lint: ## Run lint
	@go build -o /dev/null . # buildが通らない状態でlinter実行するとミスリードなエラーが出るので先に試す
	golangci-lint run -v ./...

.PHONY: toolsinstall
toolsinstall: ## 開発ツールをインストールする
	@go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
	@go install golang.org/x/tools/cmd/goimports@latest
	@which golangci-lint > /dev/null || (echo "Installing golangci-lint..." && \
		curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $$(go env GOPATH)/bin v2.2.2)

.PHONY: check
check: fmt build test lint ## 一気にチェックする

.PHONY: migrate
migrate: ## データベースマイグレーション実行する
	go run . migrate

.PHONY: buildimage
build-image: ## Dockerイメージをビルドする
	cd .. && docker build -t kijimad/tv:${DOCKER_TAG} \
	--target release -f backend/Dockerfile backend

.PHONY: updatetbls
updatetbls: migrate ## tblsドキュメントを更新する。DBスキーマを変更した場合はローカル環境で実行してコミットすること!
	./scripts/tbls.sh lint
	./scripts/tbls.sh doc --rm-dist
	./scripts/tbls.sh diff docs/db

.PHONY: sqlc
sqlc: ## sqlcでコード生成する
	sqlc generate

.PHONY: help
help: ## Show help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
