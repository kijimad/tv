.DEFAULT_GOAL := help

.PHONY: install
install: ## Install TypeSpec dependencies
	cd typespec && npm install

.PHONY: compile
compile: ## Compile TypeSpec to OpenAPI
	cd typespec && npx tsp compile .

.PHONY: gen
gen: ## Generate Go server code from OpenAPI
	./scripts/generate-api.sh

.PHONY: help
help: ## Show help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
