.PHONY: build-frontend install start-prod

help:
	@echo "_____________ INSTALATION _____________ \n"
	@echo "To install all deps run: make install"
	@echo "To install frontend deps run: make install-frontend"
	@echo "To install backend deps run: make install-backend"
	@echo "\n________________ BUILD ________________ \n"
	@echo "For building frontend run: make build-frontend"
	@echo "\n________________ START ________________ \n"
	@echo "To start production version run: make start-prod"
	@echo "To start development version run:"
	@echo "-- In first terminal: make start-backend"
	@echo "-- In second terminal: make start-frontend"
	@echo "-- In third terminal: make start-frontend-tests"


build-frontend:
	rm -rf backend/public
	mkdir -p backend/public
	export TD_ENV=prod && cd frontend && yarn run build
	cp -a frontend/build/. backend/public/

install:
	$(MAKE) install-frontend
	$(MAKE) install-backend

install-frontend:
	cd frontend && yarn

install-backend:
	cd backend && yarn

start-prod:
	export TD_ENV=prod && \
	$(MAKE) install && \
	$(MAKE) build-frontend && \
	cd backend && \
	yarn run start

start-backend:
	export TD_ENV=dev && \
	cd backend && \
	yarn run start

start-frontend:
	export TD_ENV=dev && \
	cd frontend && \
	PORT=3001 yarn run start

start-frontend-tests:
	export TD_ENV=test && \
	cd frontend && \
	yarn run test

start-backend-tests:
	export TD_ENV=test && \
	cd backend && \
	yarn run test
