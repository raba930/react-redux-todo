# todo-app

# Global commands
execute in application root folder

### Install backend & frontend deps
    make install
## Start development env
### Install deps with
    make install
### In first terminal window start backend with
    make start-backend
### In second terminal window start frontend with
    make start-frontend
### In third terminal window start frontend tests in watch mode with
    make start-frontend-tests


## Backend
execute in application `/backend` folder
### Mongo shell setup
`$ mongo`

`> use firstApp`

### Server start
`$ npm install && npm start`

### Run tests
`$ npm test`

### Build frontend
`$ make build-dev`
### minified "production"
`$ make build-prod`

## Frontend
execute in application `/frontend` folder
### run app in dev mode
    npm install
    npm start
### run tests
    npm test
### build
    npm run build

### Sys Dependencies
* nodejs (https://github.com/nodesource/distributions#debmanual)
* mongoDB (https://docs.mongodb.com/master/administration/install-on-linux/)
* yarn (https://yarnpkg.com/lang/en/docs/install/)

### stack
* express.js
* mongodb
* passport.js
* react
* create-react-app
* redux
* jest
* enzyme
* materialize-css
