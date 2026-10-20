import { test, expect, type Page } from '@playwright/test'
import { DEFAULT_LOCALE } from '../app/config/site'

const open = async (page: Page, path: string) => {
  await page.goto(path)
  await page.waitForFunction(() =>
    Boolean(document.querySelector('#__nuxt') && '__vue_app__' in document.querySelector('#__nuxt')!),
  )
}

test('only one project is expanded at a time', async ({ page }) => {
  await open(page, `/${DEFAULT_LOCALE}`)
  const first = page.locator('#project-0')
  const second = page.locator('#project-1')

  await expect(first).toHaveAttribute('aria-expanded', 'true')
  await expect(second).toHaveAttribute('aria-expanded', 'false')

  await second.click()

  await expect(second).toHaveAttribute('aria-expanded', 'true')
  await expect(first).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('#project-1-panel')).toBeVisible()
})

test('mobile menu opens, navigates and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await open(page, `/${DEFAULT_LOCALE}`)
  const toggle = page.locator('button[aria-controls="mobile-menu"]')

  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(page.locator('#mobile-menu')).toHaveCount(0)

  await toggle.click()
  await page.locator('#mobile-menu a[href="#contact"]').click()
  await expect(page).toHaveURL(/#contact$/)
  await expect(page.locator('#mobile-menu')).toHaveCount(0)
})

test('content stays visible with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await open(page, `/${DEFAULT_LOCALE}`)

  await expect(page.locator('#home h1')).toBeVisible()
  await expect(page.locator('#home h1')).toHaveCSS('opacity', '1')
  for (const id of ['about', 'services', 'projects', 'skills', 'contact']) {
    await expect(page.locator(`#${id} h2`)).toBeVisible()
  }
})

test('the pixel name keeps the real heading text', async ({ page }) => {
  await open(page, `/${DEFAULT_LOCALE}`)

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Hi, I'm\s*David Almeida/)
  await expect(page.locator('#home .pixel-name')).toHaveAttribute('aria-hidden', 'true')
})
