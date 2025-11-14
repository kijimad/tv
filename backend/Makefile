.DEFAULT_GOAL := help

DOCKER_TAG := latest

.PHONY: build
build: ## Build go module
	go build -o ../bin/tv .

.PHONY: test
test: ## Execute test
	go test -race -shuffle=on -v ./...

.PHONY: lint
lint: ## Run lint
	docker run --rm -v ${PWD}/..:/app -w /app/backend golangci/golangci-lint:v2.1.6 golangci-lint run ./... -v
	docker run --rm -v ${PWD}/..:/app -w /app/backend golang:1.24 go vet ./...

.PHONY: check
check: build test lint ## Check

.PHONY: migrate
migrate: ## データベースマイグレーション実行する
	go run . migrate

.PHONY: buildimage
build-image: ## Dockerイメージをビルドする
	cd .. && docker build -t kijimad/tv:${DOCKER_TAG} \
	--target release -f backend/Dockerfile backend

.PHONY: updatetbls
updatetbls: migrate ## tblsドキュメントを更新する。DBスキーマを変更した場合はローカル環境で実行してコミットする
	docker run --rm \
	-v $(PWD):/work \
	-w /work \
	--user $(shell id -u):$(shell id -g) \
	--net=host \
	ghcr.io/k1low/tbls \
	doc --rm-dist

.PHONY: sqlc
sqlc: ## sqlcでコード生成する
	sqlc generate

.PHONY: help
help: ## Show help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
