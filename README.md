# Gists Finder

## Installation

Requires Node >=16.x

Install Yarn:

```bash
https://yarnpkg.com/lang/en/docs/install/
```

Clone and install Yarn dependencies:

```bash
$ git clone https://github.com/sharjeelahmed99/gists.git
$ cd gists
$ yarn
```

## Development

To lift the dev server with hot module reloading.

```bash
$ yarn dev
```

The output of the command will list the URL to the dev server.

## Build

To bundle the React application

```bash
$ yarn dist
```

## Testing

```bash
$ yarn test
```

## Linting

```bash
$ yarn lint
```

## Improvements

- Create own wrapper components for AntD components
- Helper module for jest unit tests
- Create component props types
- Remove vulnerabilities in npm packages
- Implement husky for precommit hooks ( prettire and eslint)
- Read gist base url from env file
- Add IDE formatter settings
