# Unemployment Guide

This repository contains an Unemployment Guide for Californians to determine what benefits they may be eligible for.

We are developing the repository using Node v.12.16.2 and [React Bootstrap](https://react-bootstrap.github.io/).

## Setup

1. Install NPM dependencies
   ```bash
   npm install
   ```
1. Start the application
   ```bash
   npm start
   ```
1. Open http://localhost:3000/ to see the app

## Running test suite

```bash
npm run test
```

### To update snapshots so tests pass after intentional UI changes

```bash
npm run test:update-snapshots
```

## Style
eslint checks the JS code style and stylelint checks the CSS style.

```bash
npm run lint
```

Additionally, we use [prettier](https://prettier.io/) to format JS and CSS files. You can either [configure it with your editor](https://prettier.io/docs/en/editors.html) or run

```
npm run prettier
```
