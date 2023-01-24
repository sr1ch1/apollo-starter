# Features

This project comes with many features which will be described in categories to provide a better overview.

# Tool Support

### GIT

This project relies on a Git compatible repository. Git hooks are used to enforce consistency and code quality.
To avoid checking in unnecessary code or sensitive data (API keys), a `.gitignore` file is used.

### IDE

No IDE is preferred. That also means there are no IDE-specific project files available.
In fact, they will be ignored by Git. Instead, an `.editorconfig` is provided to ensure basic consistency
across editors and IDEs.

### NODE & NVM

This project works with the latest version of Node LTS (18). It is highly recommended to
use a Node version manager like NVM. A `.nvmrc` file is provided to give NVM a hint of the
node version to be used with this project.

### Yarn

Yarn is preferred as a package manager and a `yarn.lock` file is provided to ensure deterministic builds.
Of course, alternatively NPM can be used.

# Development

This section describes the features that are directly related to the development.

### Typescript

This project is configured to use TypeScript 4.9. Different configuration files are used depending on the use case:

- `tsconfig.json` the commonly used configuration file. This is used to specify the general behaviour of the typescript compiler.
- `tsconfig.prod.json` this configuration file is used for production builds. It excludes test related code.
- `tsconfig.firebase.json` for deployment as firebase function a different structure is used which will be covered by this configuration.

### Prettier

Prettier is used to ensure that code is formatted in a uniform and consistent way. `prettierrc.js` is used to specify formatting options.
Basic editor configuration is set in `.editorconfig` and should not be duplicated in the prettier configuration.

### ESLint

The project file uses ESLint to lint the code and detect code quality issues. `.eslintrs.js` is used to configure ESLint.
ESLint is configured to run with prettier and typescript through plugins. Code formatting rules should not be configured
for ESLint. Prettier is used for that.

### Husky & Conventional Commits

To enforce consistent coding style and basic quality gates Husky and lint-staged is used.
This combination allows formatting source code properly, fixing lint issues and ensuring that unit
tests succeed before allowing changes to be committed.

Also, [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) are used to
enforce a proper structure von commit messages. This helps preparing the proper releases.

### GraphQL file support

This template supports GraphQL on multiple levels. ESLint is configured to process graphql files and
provide information about quality issues.

The graphql files on the project will be parsed and types
to be used with TypeScript will be created. Generation of types will be done automatically when packages
will be installed and can also created manually with `yarn generate`.

### Configuration

Application's environment-specific configuration will be supported through the `dotenv` package.
Validation of the configuration will be done using `zod`. A specific validation schema in
defined in `globalEnvironmentSchema.ts`.
Local schemas are also supported. They will be merged into the global one.
This encourages localization of code and configuration.
The environment-specific configuration is available in the GraphQL context through
the property `env`.

### Testing

Unit, integration and API-tests are supported. The differentiation is opinionated.

Unit are covering functionality on a very low level. These test will also run automatically
before every commit. They have to succeed for a successful commit. They can be started manually
using `yarn test`.

Integration tests are used to test the collaboration of multiple pieces of software.
One example is the GraphQL test that are testing the whole query pipeline. Integration tests
are often slower than unit tests. They will run separately and often in a scheduled manner (i.e. nightly).
The integration tests acn be started with `yarn test:integration`

To validate assumption about 3rd-party APIs other tests are required. These tests
are called API-tests and can be executed with: `yarn test:api`.
Those tests run ideally after each 3rd-party API change.

The partitioning of the tests is done through a package called `jest-runner-group`.
It uses annotations to determine the type of test. Use the following annotations:

- unit test: `@group unit`
- integration test: `@group integration`
- api test: `@group api`

To support test driven development (TDD), jests watch mode is being used. It can be use
through `yarn test:watch`. To have a quicker TDD cycle., SWC is used instead of the typescript compiler (`tsc`).
It does not provide as much diagnosis information as the `tsc`.

Running all test is possible by calling `yarn test:all`
For collecting test coverage run `yarn test:coverage`

# Hosting

To provide flexibility when it comes to hosting several options are provided.
Depending on the use case one or the other option is more preferable:

- Standalone
- As Function
- As Server Application

## Standalone GraphQL Server

This is the Apollo GraphQL Server standalone. It is suitable for development only.
It does not come with any kind of hardening performance and security wise.
It has a very simple setup which is helpful when debugging is necessary.
The standalone server will be used when running `yarn dev:standalone` for development
and `yarn start:standalone` if you only want to provide a backend for a frontend during development.

## GraphQL Server as a Function

This project template supports running Apollo GraphQL as a function. Specifically,
running and deploying it as a Firebase Function is supported.
Building the server for Firebase is done with `yarn build:firebase`.
Deployment is done using firebase-cli with the command: `yarn deploy:firebase`.
It is assumed that a firebase project is properly setup, and you have logged in
with firebase-cli into your firebase account.
The execution as a Firebase function can be simulated with `yarn start:firebase`

Other platforms will be supported in the future. Building a self-contained artifact
is already supported (needed for AWS Lambda) with the command: `yarn build:package`
Behind the scenes `trace.pkg` is used. It can be configured in `trace-pkg.yml`

## GraphQL Server as a Node application

To run Apollo GraphQL server as a node server application you can use: `yarn dev`
during development and in production with `yarn start`.
This project template uses fastify a basis for the GraphQL server.
It is an efficient web framework the helps trimming down infrastructure cost.
To ensure that the GraphQL server behave properly under high load two plugins
are used:

- **Underpressure**
- **rate-limit**

### Underpressue

This plugins denies incoming requests if the load is too high.
It does this to protect the server from failing. The exact behaviour
when the server does not accept requests can be fine-tuned with these parameters:

- `MAX_EVENT_LOOP_DELAY`
  Time between events that may pass before the server refuses new requests
- `MAX_HEAP_USED_BYTES`
  Maximum allowed heap usage in bytes before the server refuses new requests
- `MAX_RSS_BYTES`
  Maximum allowed total memory usage in bytes before the server refuses new requests

### rate-limit

This plugin is similar to the Underpressue but more focussed on a single user.
It prevents a single user from doing to many request in a short period of time.
This can also be configured:

- `MAX_REQUEST`
  Maximum number of request to make before rate limiting kicks in.
- `TIME_WINDOW`
  Time window to look at when counting the number of requests of a user.
  Accepted values as described in the [ms](https://www.npmjs.com/package/ms) package.
  Examples: `1 second`, `5m`, `2.5h`, `20 minutes`

## GraphQL Server in a Container

Having a node application that runs Apollo GraphQL Server, it is apparent that
it could also run in a container. To help with this common use case a [Dockerfile](../Dockerfile)
has been provided.
