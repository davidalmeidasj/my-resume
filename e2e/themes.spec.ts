import { test, expect, type Page } from '@playwright/test'
import { LOCALES, LOCALE_TAGS, SITE_URL } from '../app/config/site'
import { EXTRA_THEMES, THEMES, themePath } from '../app/config/themes'

const open = async (page: Page, path: string) => {
  await page.goto(path)
  await page.waitForFunction(() =>
    Boolean(document.querySelector('#__nuxt') && '__vue_app__' in document.querySelector('#__nuxt')!),
  )
}

for (const slug of EXTRA_THEMES) {
  for (const locale of LOCALES) {
    test(`/${slug}/${locale} is prerendered and points canonical at the main page`, async ({
      request,
    }) => {
      const response = await request.get(themePath(slug, locale))
      expect(response.status()).toBe(200)
      const html = await response.text()

      expect(html).toMatch(new RegExp(`<html[^>]*lang="${LOCALE_TAGS[locale]}"`))
      expect(html).toMatch(new RegExp(`<html[^>]*class="theme-${slug}"`))
      expect(html).toMatch(new RegExp(`rel="canonical" href="${SITE_URL}/${locale}"`))
    })
  }
}

test('an unknown theme is not served', async ({ request }) => {
  expect((await request.get('/not-a-theme/en')).status()).toBe(404)
})

test('the seasons cards link to every theme in the current locale', async ({ page }) => {
  await open(page, '/pt')
  const cards = page.locator('#themes .card')

  await expect(cards).toHaveCount(THEMES.length)
  await expect(page.locator('#themes .card[aria-current="page"]')).toHaveCount(1)
  for (const slug of EXTRA_THEMES) {
    await expect(page.locator(`#themes a.card[href="${themePath(slug, 'pt')}"]`)).toHaveCount(1)
  }

  await page.locator(`#themes a.card[href="${themePath('bitmap-specimen', 'pt')}"]`).click()
  await expect(page).toHaveURL(/\/bitmap-specimen\/pt$/)
  await expect(page.locator('html')).toHaveClass(/theme-bitmap-specimen/)
})

for (const slug of EXTRA_THEMES) {
  test(`the ${slug} cards mark it as current and open the others`, async ({ page }) => {
    await open(page, themePath(slug, 'en'))
    await expect(page.locator('#themes .card')).toHaveCount(THEMES.length)
    await expect(page.locator('#themes .card[aria-current="page"]')).toHaveCount(1)
    for (const other of THEMES.filter((item) => item.slug !== slug)) {
      await expect(page.locator(`#themes a.card[href="${themePath(other.slug, 'en')}"]`)).toHaveCount(1)
    }

    await page.locator(`#themes a.card[href="${themePath('career-seasons', 'en')}"]`).click()
    await expect(page).toHaveURL(/\/en$/)
    await expect(page.locator('html')).toHaveClass(/theme-career-seasons/)
  })
}

for (const { slug } of THEMES) {
  test(`the ${slug} footer reaches every theme`, async ({ page }) => {
    await open(page, themePath(slug, 'es'))
    const nav = page.locator('footer').getByRole('navigation', { name: 'Temas' })

    await expect(nav.getByRole('link')).toHaveCount(THEMES.length)
    await expect(nav.locator('[aria-current="page"]')).toHaveAttribute('href', themePath(slug, 'es'))
    for (const theme of THEMES) {
      await expect(nav.locator(`a[href="${themePath(theme.slug, 'es')}"]`)).toHaveCount(1)
    }
  })
}

for (const slug of EXTRA_THEMES) {
  test(`switching language on ${slug} keeps the theme`, async ({ page }) => {
    await open(page, themePath(slug, 'pt'))
    await page.locator('header').getByRole('button', { name: 'ES', exact: true }).first().click()

    await expect(page).toHaveURL(new RegExp(`/${slug}/es$`))
    await expect(page.locator('html')).toHaveAttribute('lang', LOCALE_TAGS.es)
  })
}
