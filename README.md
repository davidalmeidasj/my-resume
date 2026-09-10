# my-portfolio

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
yarn build

# Runs the end-to-end tests
yarn test:e2e
# Runs the tests only on Chromium
yarn test:e2e --project=chromium
# Runs the tests of a specific file
yarn test:e2e tests/example.spec.ts
# Runs the tests in debug mode
yarn test:e2e --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

### Rebuild the Resume PDFs

The PDFs offered by the hero download button live in `public/` and are generated
from the HTML sources in `resume-src/` (`pt.html`, `en.html`, `es.html`, sharing
`resume.css`). Edit the HTML, then:

```sh
# all three locales
yarn resume:build

# a single locale
node resume-src/build.mjs pt
```

Rendering uses headless Chrome. Set `CHROME_PATH` if the binary is not in a
standard location.

The stylesheet is tuned for ATS parsing: single column, real text layer, no
images or tables, and ligatures disabled so extractors read `fi`/`fl` as two
letters instead of the `ﬁ`/`ﬂ` glyphs, which otherwise break keyword matching on
words like "filas" and "profiling".
