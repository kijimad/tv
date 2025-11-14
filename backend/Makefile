.DEFAULT_GOAL := help

DOCKER_TAG := latest

.PHONY: build
build: ## Build go module
	go build -o ../bin/tv .

.PHONY: run
run: ## Run
	go run .

.PHONY: lint
lint: ## Run lint
	docker run --rm -v ${PWD}/..:/app -w /app/backend golangci/golangci-lint:v2.1.6 golangci-lint run ./... -v
	docker run --rm -v ${PWD}/..:/app -w /app/backend golang:1.24 go vet ./...

.PHONY: test
test: ## Execute test
	go test -race -shuffle=on -v ./...

.PHONY: gen
gen: ## Execute go generate
	go generate ./...

.PHONY: check
check: build test lint ## Check

.PHONY: build-image
build-image: ## Build image for deploy
	cd .. && docker build -t kijimad/tv:${DOCKER_TAG} \
	--target release -f backend/Dockerfile backend

.PHONY: help
help: ## Show help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
