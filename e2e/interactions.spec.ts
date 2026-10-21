import { test, expect, type Page } from '@playwright/test'
import { DEFAULT_LOCALE } from '../app/config/site'

const open = async (page: Page, path: string) => {
  await page.goto(path)
  await page.waitForFunction(() =>
    Boolean(document.querySelector('#__nuxt') && '__vue_app__' in document.querySelector('#__nuxt')!),
  )
}

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]) {
  test(`opening a project at ${viewport.width}px keeps the others open and the page still`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport)
    await open(page, `/${DEFAULT_LOCALE}`)
    const first = page.locator('#project-0')
    const target = page.locator('#project-4')

    await target.scrollIntoViewIfNeeded()
    const before = await page.evaluate(() => ({
      scroll: window.scrollY,
      top: document.getElementById('project-4')!.getBoundingClientRect().top,
    }))

    await target.click()
    await page.waitForTimeout(800)

    const after = await page.evaluate(() => ({
      scroll: window.scrollY,
      top: document.getElementById('project-4')!.getBoundingClientRect().top,
    }))
    expect(Math.abs(after.scroll - before.scroll)).toBeLessThanOrEqual(1)
    expect(Math.abs(after.top - before.top)).toBeLessThanOrEqual(1)
    await expect(target).toHaveAttribute('aria-expanded', 'true')
    await expect(first).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#project-0-panel')).toBeVisible()
    await expect(page.locator('#project-4-panel')).toBeVisible()

    await target.click()
    await expect(target).toHaveAttribute('aria-expanded', 'false')
    await expect(first).toHaveAttribute('aria-expanded', 'true')
  })
}

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
