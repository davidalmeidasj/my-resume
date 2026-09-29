# my-portfolio

Personal portfolio built with [Nuxt 4](https://nuxt.com), Tailwind CSS and `@nuxtjs/i18n`,
deployed on Vercel from the `main` branch.

## Setup

Requires Node 24 (see `.nvmrc`).

```sh
yarn
```

| Command | What it does |
| --- | --- |
| `yarn dev` | Dev server with hot reload |
| `yarn build` | Prerenders the site to `.output/public` (`nuxt generate`) |
| `yarn preview` | Serves the generated output |
| `yarn type-check` | `nuxt typecheck` |
| `yarn test:unit` | Vitest |
| `yarn test:e2e` | Playwright against `.output/public` (run `yarn build` first) |
| `yarn lint` | oxlint and ESLint (`@nuxt/eslint`) |

A Husky pre-commit hook runs lint-staged, the type check and the unit tests.

## Rendering and SEO

The site is **prerendered at build time**, not client-rendered. Each language is a
real route with its own static HTML file:

```
/          redirects to /en          (routeRules in nuxt.config.ts)
/en   ->   .output/public/en/index.html   lang="en-US"
/pt   ->   .output/public/pt/index.html   lang="pt-BR"
/es   ->   .output/public/es/index.html   lang="es-ES"
```

Social crawlers (LinkedIn, WhatsApp, Slack) never execute JavaScript, so the content,
the Open Graph tags and the `Person` structured data have to be in the served markup.

| Concern | Handled by |
| --- | --- |
| Locale routes, `lang`, canonical, hreflang, `og:locale` | `@nuxtjs/i18n` (`strategy: 'prefix'`) via `useLocaleHead` |
| Title, description, Open Graph, Twitter, JSON-LD | `app/composables/useSeo.ts` |
| `sitemap.xml` and `robots.txt` | `@nuxtjs/sitemap` and `@nuxtjs/robots` |
| Fonts | `@nuxt/fonts`, self-hosted Inter |
| Tech icons | `@nuxt/icon` with the local Simple Icons collection |
| Redirect and cache headers | `routeRules`, emitted into Vercel's build output |

`SITE_URL` in `app/config/site.ts` is the single source of truth for canonical,
`og:url`, `og:image`, the sitemap and robots.txt.

Page titles are built in `useSeo.ts` instead of stored in the locale files: vue-i18n
reads `|` as a plural-form separator, so a title containing one comes back truncated.

`e2e/` checks the prerendered head of every locale, the sitemap, robots.txt and that
both language switchers change the URL.

Regenerate the social preview image with `yarn resume:build` after editing
`resume-src/og-image.html`.

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
