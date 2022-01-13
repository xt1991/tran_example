## Environment variables to be passed in pipeline

```
MONGO_PASSWORD
```

## Version specification
- node: v12.16.0
- TypeScript v3.5

## IDE recommendations and setup

- VSCode IDE
- Eslint vscode plugin
- Prettier vscode plugin for linting warnings (auto fix on save)
- Add the following setting in vscode settings.json 
```json
"eslint.autoFixOnSave": true
```

## Dev setup
- Install all the dependencies using `npm install`
- To run the server with watch use `npm run dev-watch`
- To run the test cases in watch mode use `npm run test-watch`
- To run the test cases without watch mode use `npm run test`
- To run docker compose `docker-compose -f docker-compose.dev.yml up -d`
- To build docker image only :
`
 npm tsc &&
 docker build -t ${your image name} .
`
## Run the API with a specific environment

Follow document https://www.npmjs.com/package/nconf please check the environment under configs folder . Default NODE_ENV is local environment (default.json)

  ```bash
    NODE_ENV=dev npm run dev:watch
  ```

## Test

- Unit Test: We are using Jest for assertion and mocking

## Git Hooks
The seed uses `husky` to enable commit hook.

### Pre commit
Whenever there is a commit, there will be check on lint, on failure commit fails.

### Pre push
Whenever there is a push, there will be check on test.

## Internal Module dependencies
The following are module dependecies:
- logger: for all the logging
- http: for making http calls
- common: for common function
- config: for loading environment configs

## ENV variables

### Optional
- LOG_FILE: path to log file, default console log

## Misc

Swagger API is at http://localhost:8080/documentation

## Mongodb auto reconnect
New version of `mongoose` will use new `mongodb` engine that already have auto reconnect feature by default. To use this feature in current mongoose we have to add flag `useUnifiedTopology` https://mongoosejs.com/docs/deprecations.html#useUnifiedTopology
