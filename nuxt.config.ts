import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, SITE_URL } from './app/config/site'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-29',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxt/fonts'],
  fonts: {
    families: [{ name: 'Inter', provider: 'google', weights: [400, 600, 700] }],
  },
  site: {
    url: SITE_URL,
  },
  sitemap: {
    sitemaps: false,
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
    '/assets/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    ...Object.fromEntries(
      LOCALES.map((locale) => [
        `/david-almeida-resume-${locale}.pdf`,
        { headers: { 'cache-control': 'public, max-age=3600' } },
      ]),
    ),
  },
  nitro: {
    prerender: {
      routes: LOCALES.map((locale) => `/${locale}`),
    },
  },
})
