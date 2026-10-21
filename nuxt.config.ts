import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, SITE_URL } from './app/config/site'
import { EXTRA_THEMES, themePath } from './app/config/themes'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-29',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/eslint',
  ],
  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/themes/seasons/components', prefix: 'Seasons', pathPrefix: false },
    { path: '~/themes/bitmap/components', prefix: 'Bitmap', pathPrefix: false },
    { path: '~/themes/daylight/components', prefix: 'Daylight', pathPrefix: false },
    { path: '~/themes/wake/components', prefix: 'Wake', pathPrefix: false },
  ],
  fonts: {
    families: [
      { name: 'Bricolage Grotesque', provider: 'google', weights: [400, 500, 600, 700, 800] },
      { name: 'Figtree', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Pixelify Sans', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Atkinson Hyperlegible Next', provider: 'google', weights: [400, 700] },
      { name: 'Silkscreen', provider: 'google', weights: [400] },
      { name: 'Chakra Petch', provider: 'google', weights: [300, 400, 500] },
      { name: 'B612', provider: 'google', weights: [400, 700] },
      { name: 'B612 Mono', provider: 'google', weights: [400] },
      { name: 'Sora', provider: 'google', weights: [200, 300, 400, 600] },
    ],
  },
  icon: {
    clientBundle: { scan: true },
  },
  site: {
    url: SITE_URL,
  },
  sitemap: {
    sitemaps: false,
    exclude: EXTRA_THEMES.map((slug) => `/${slug}/**`),
    zeroRuntime: true,
    credits: false,
    discoverImages: false,
    xsl: false,
  },
  tailwindcss: {
    cssPath: '~/assets/main.css',
  },
  i18n: {
    baseUrl: SITE_URL,
    strategy: 'prefix',
    defaultLocale: DEFAULT_LOCALE,
    detectBrowserLanguage: false,
    locales: LOCALES.map((code) => ({ code, language: LOCALE_TAGS[code], file: `${code}.json` })),
  },
  routeRules: {
    '/': { redirect: { to: `/${DEFAULT_LOCALE}`, statusCode: 301 } },
    ...Object.fromEntries(
      LOCALES.map((locale) => [
        `/david-almeida-resume-${locale}.pdf`,
        { headers: { 'cache-control': 'public, max-age=3600' } },
      ]),
    ),
  },
  nitro: {
    prerender: {
      routes: [
        ...LOCALES.map((locale) => `/${locale}`),
        ...EXTRA_THEMES.flatMap((slug) => LOCALES.map((locale) => themePath(slug, locale))),
      ],
    },
  },
})
