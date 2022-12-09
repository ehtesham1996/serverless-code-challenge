# Serverless User TODO Code Challenge

A Simple user todo CRUD in serverless framework done for Serverless Guru Code Challenge

## API DOCS

- API Docs are published on the following url:
[API DOCUMENT SERVERLESS TODO](https://ehtesham1996-docs.stoplight.io/docs/serverless-todo-challenge)

- More details for api docs are [here](docs/api-docs.yml)

## Project structure
```
.
├── serverless
│   ├── resource             # Contains IAC cloudformation of all required resources
│   ├── iam
│   │   └── index.ts         # IAM policy and role configurations
├── docs
│   └── api-docs.yml         # Api documentation in open api 3.0 
├── src
│   ├── functions            # Lambda configuration and source code folder
│   │   ├── [function-name]
│   │   │   ├── handler.ts   # lambda source code
│   │   │   ├── index.ts     # lambda function Serverless  configuration
│   │   │   └──dto
│   │   │      └── *.dto.ts # zod validations for lambda function
│   │   │
│   │   └── index.ts         # Import/export of all lambda configurations
├── tests                    # Units test for different modules
├── package.json
├── serverless.ts            # Serverless service file
├── tsconfig.json            # Typescript compiler configuration
```
## CI/CD

The ci/cd setup has been done using the github actions.
Upon push into the `main` branch the pipeline get triggered

The pipeline has two stages

- **Test**: runs the unit test before actually deploying the code
```yaml
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x]
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - name: Install dependencies
        run: npm ci
      - run: npm test
```

- **Deploy**: deploy to the production using sls deploy comman
```yaml
    deploy:
        name: deploy
        runs-on: ubuntu-latest
        needs: test
        strategy:
        matrix:
            node-version: [16.x]
        steps:
        - uses: actions/checkout@v3
        - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
            node-version: ${{ matrix.node-version }}
        - run: npm ci
        - name: serverless deploy
        uses: serverless/github-action@v3.1
        with:
            args: deploy --stage prod
        env:
            AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
            AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### Install 

1. clone repo
2. npm install or yarn install
3. cp .env.sample .env
4. change the .env config to setup for your local environment

### Local development

For local developement please use the command npm run start:dev to start server in development mode.
#### Start

```bash 
npm run start:dev
```

### Tech
TypeScript, Nodejs, MongoDB, Serverless Framework, AWS

### Packages Used
- [Middy](https://www.npmjs.com/package/middy) A useful lambda framework to gey over DRY concepts
- [Zod.dev](https://zod.dev/) TypeScript-first schema validation with static type inference

### Usefull Comands

1. npm run start:dev
2. npm run lint
3. npm run coverage
4. sls deploy (don't use this until you know what it does)
