[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/sr1ch1/apollo-starter/test.yml)](https://github.com/sr1ch1/apollo-starter/actions?query=branch%3Amain)
[![Coverage Status](https://coveralls.io/repos/github/sr1ch1/apollo-starter/badge.svg?branch=main)](https://coveralls.io/github/sr1ch1/apollo-starter?branch=main)
[![GitHub](https://img.shields.io/github/license/sr1ch1/apollo-starter)](https://opensource.org/licenses/MIT)
## Getting started

This project provides a starting point for developing a GraphQL server based on Apollo Server.
The project comes with working resolvers and an exemplary implementation of a data source.

Also, unit, integration and API tests are available. Implemented [features](docs/features.md) are documented
and you can find a high-level overview of the [application architecture](docs/architecture.md)

### Prerequisites

- [Git](https://github.com/git-guides/install-git) Install the latest version.
- [Node.js](https://nodejs.org/en/download/) Install LTS or Current version.

**Recommended**

- [NVM](https://github.com/nvm-sh/nvm) / [NVM for Windows](https://github.com/coreybutler/nvm-windows) For easy switching the node version.
- [Yarn](https://yarnpkg.com/getting-started/install) A faster NPM alternative

**Optional**

- Firebase Tools for deployment to Firebase. (`yarn --global firebase-tools`)
- Docker to build and run container

## Installation

To install the project dependencies run

```sh
yarn
```

On Linux/macOS set git hooks to executable:

```sh
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

## [➤ Configuration](docs/configuration.md)

## Development

To start development simply run

```sh
yarn dev
```

Code quality checks are included in the project (Prettier, Eslint).
Staged code will be checked on commit via git commit hooks but can be started at any time with:

```sh
yarn lint
```

Smaller fixes can be applied automatically with

```sh
yarn lint:fix
```

**Note:** [Conventional Commits](https://conventionalcommits.org) are used and enforced.

## Testing

For executing the unit tests run

```sh
yarn test
```
Start integration test with
```sh
yarn test:integration
```
and API tests with
```sh
yarn test:api
```
Running all tests:
```sh
yarn test:all
```

For running tests continuously (TDD) do

```sh
yarn test:watch
```

Test coverage can be obtained with

```sh
yarn test:coverage
```

## Building

To build the project run

```sh
yarn build
```

The built project will be available in the folder `build`

To create a self-contained build (i.e. for Docker) run:
```sh
yarn build:self-contained
```

### Cleanup

Automatically created directories (`build`/`coverage`) can be cleaned up with

```sh
yarn clean
```
