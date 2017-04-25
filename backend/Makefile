test:
	@./node_modules/.bin/mocha

.PHONY: all test clean build-dev build-prod

build-dev: all
	rm -rf dist
	mkdir -p dist
	webpack

build-prod: all
	rm -rf dist
	mkdir -p dist
	PROD_ENV=1 webpack