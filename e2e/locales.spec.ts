import { test, expect } from '@playwright/test'
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, SITE_URL } from '../app/config/site'

for (const locale of LOCALES) {
  test(`/${locale} is prerendered with its own head`, async ({ request }) => {
    const html = await (await request.get(`/${locale}`)).text()

    expect(html).toMatch(new RegExp(`<html\\s+lang="${LOCALE_TAGS[locale]}"`))
    expect(html).toMatch(new RegExp(`rel="canonical" href="${SITE_URL}/${locale}"`))
    expect(html).toContain(`<meta property="og:url" content="${SITE_URL}/${locale}">`)
    expect(html).toContain(`hreflang="x-default"`)
    for (const other of LOCALES) {
      expect(html).toContain(`href="${SITE_URL}/${other}" hreflang="${LOCALE_TAGS[other]}"`)
    }
  })
}

test('header switches locale through the URL', async ({ page }) => {
  await page.goto(`/${DEFAULT_LOCALE}`)
  await page.locator('header').getByRole('button', { name: 'PT', exact: true }).first().click()

  await expect(page).toHaveURL(/\/pt$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
})

test('footer switches locale through the URL and keeps it on navigation', async ({ page }) => {
  await page.goto(`/${DEFAULT_LOCALE}`)
  await page.locator('footer select').selectOption('es')

  await expect(page).toHaveURL(/\/es$/)
  await page.locator('header nav a[href="#about"]').first().click()

  await expect(page).toHaveURL(/\/es#about$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'es-ES')
})
