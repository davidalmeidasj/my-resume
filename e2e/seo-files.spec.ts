import { test, expect } from '@playwright/test'
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, SITE_URL } from '../app/config/site'

test('robots.txt allows crawling and points at the sitemap', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text()

  expect(robots).toMatch(/User-agent:\s*\*/)
  expect(robots).not.toMatch(/Disallow:\s*\/\s*$/m)
  expect(robots).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`)
})

test('sitemap.xml lists every locale with its alternates', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text()
  const entries = sitemap.match(/<url>[\s\S]*?<\/url>/g) ?? []

  expect(entries).toHaveLength(LOCALES.length)
  for (const locale of LOCALES) {
    expect(sitemap).toContain(`<loc>${SITE_URL}/${locale}</loc>`)
  }
  for (const entry of entries) {
    for (const locale of LOCALES) {
      expect(entry).toContain(`hreflang="${LOCALE_TAGS[locale]}"`)
    }
    expect(entry).toContain(`hreflang="x-default" href="${SITE_URL}/${DEFAULT_LOCALE}"`)
  }
})
