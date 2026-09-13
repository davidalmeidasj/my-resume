import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { LOCALES, LOCALE_TAGS, SITE_URL, DEFAULT_LOCALE } from '../site'

/**
 * robots.txt and sitemap.xml are static files, so they cannot import SITE_URL.
 * These tests are what keeps them from drifting out of sync with it: change the
 * domain in site.ts without updating them and the suite fails instead of the
 * sitemap quietly pointing search engines at a dead host.
 */
const read = (file: string) => readFileSync(resolve(__dirname, '../../../public', file), 'utf-8')

describe('robots.txt', () => {
  const robots = read('robots.txt')

  it('allows crawling', () => {
    expect(robots).toMatch(/User-agent:\s*\*/)
    expect(robots).toMatch(/Allow:\s*\//)
  })

  it('points at the sitemap on the configured origin', () => {
    expect(robots).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`)
  })
})

describe('sitemap.xml', () => {
  const sitemap = read('sitemap.xml')

  it.each(LOCALES)('lists /%s', (locale) => {
    expect(sitemap).toContain(`<loc>${SITE_URL}/${locale}</loc>`)
  })

  it('declares every hreflang alternate on each entry', () => {
    const entries = sitemap.match(/<url>[\s\S]*?<\/url>/g) ?? []
    expect(entries).toHaveLength(LOCALES.length)

    for (const entry of entries) {
      for (const locale of LOCALES) {
        expect(entry).toContain(`hreflang="${LOCALE_TAGS[locale]}"`)
      }
      expect(entry).toContain(`hreflang="x-default" href="${SITE_URL}/${DEFAULT_LOCALE}"`)
    }
  })

  it('never points at a host other than the configured one', () => {
    const hosts = [...sitemap.matchAll(/https?:\/\/[^/"<]+/g)].map((m) => m[0])
    const external = hosts.filter((h) => h !== SITE_URL && !h.includes('sitemaps.org') && !h.includes('w3.org'))
    expect(external).toEqual([])
  })
})
