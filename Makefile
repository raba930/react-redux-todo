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
	npm run build --prefix frontend/
	cp -a frontend/build/. backend/public/

install:
	$(MAKE) install-frontend
	$(MAKE) install-backend

install-frontend:
	npm install --prefix frontend/

install-backend:
	npm install --prefix backend/

start-prod:
	$(MAKE) install
	$(MAKE) build-frontend
	npm run start --prefix backend/

start-backend:
	npm run start --prefix backend/

start-frontend:
	PORT=3001 npm run start --prefix frontend/

start-frontend-tests:
	npm run test --prefix frontend/
